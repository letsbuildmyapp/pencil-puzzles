import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import TileSheet from "../game/TileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";
import { computeFilteredClaimableTiles } from "../../lib/tiles";

// Turn-based chess clock: shared puzzle, alternating moves. Each player gets a
// 3-minute time bank. The ACTIVE player's clock ticks down continuously the
// moment their turn starts — sheet open or closed doesn't matter. A turn ends
// only when the active player successfully submits a tile, at which point the
// turn passes and the new active player's bank starts ticking. Hit zero on
// your turn → you lose. Place the tile that completes the puzzle → you win.
const TOTAL_MS = 180_000;

const emptyGrid = () =>
  Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      Array.from({ length: 5 }, () => Array(5).fill(0))
    )
  );

export default function ChessClockGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId, isHost } = match;
  const myId = session.userId;
  const oppId = opponent.userId;
  // Both clients agree on the host (lex-smaller userId) — that player goes
  // first. Each client computes the same hostId from its own perspective.
  const hostId = isHost ? myId : oppId;

  // Shared state — synced via chess_turn broadcasts. Both clients converge on
  // the same userGrid because every submitted tile carries its full pixel data.
  const [userGrid, setUserGrid] = useState(emptyGrid);
  const [submitted, setSubmitted] = useState(() => new Set());
  const [tileOwners, setTileOwners] = useState({}); // "r,c" -> userId who placed it

  // Local-only — which tile this player currently has the sheet open on.
  const [selected, setSelected] = useState(null);
  // Mirror userGrid into a ref so handleTileSubmit reads the freshest paint
  // data (the 700ms TileSheet flash delay can outrun a state closure).
  const userGridRef = useRef(userGrid);
  useEffect(() => {
    userGridRef.current = userGrid;
  }, [userGrid]);

  // Active turn — both state (for re-render) and ref (for tick interval reads).
  const [activeUserId, setActiveUserId] = useState(null);
  const activeUserIdRef = useRef(null);
  // Local Date.now() at the moment the current active player's clock started.
  // Reset every time a turn changes hands.
  const activeAnchorRef = useRef(null);

  // Each player's remaining bank, updated only on turn handover. The displayed
  // value for the active player is computed live as bank - (now - anchor).
  const myMsLeftRef = useRef(TOTAL_MS);
  const oppMsLeftRef = useRef(TOTAL_MS);

  // Tick driver — bumps every 200ms so the clock UI re-renders smoothly.
  const [, setTickNonce] = useState(0);

  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);

  // End-condition flags. The end-game effect picks the first one that fires.
  const [iLostTimeout, setILostTimeout] = useState(false);
  const [oppLostTimeout, setOppLostTimeout] = useState(false);
  const [iCompleted, setICompleted] = useState(false);
  const [oppCompleted, setOppCompleted] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);

  const isMyTurn = activeUserId === myId;

  // Only ink tiles that pass the fair-difficulty filter count toward winning.
  // Filtered-out tiles (blank, too easy, too hard) are "auto-done" from the
  // game's perspective — neither player has to submit them.
  const claimableTiles = useMemo(() => computeFilteredClaimableTiles(puzzle), [puzzle]);
  const totalClaimable = claimableTiles.size;

  const isTileDone = useCallback(
    (grid, r, c) => {
      const sol = puzzle.solution[r][c];
      const usr = grid[r][c];
      for (let y = 0; y < 5; y++)
        for (let x = 0; x < 5; x++)
          if (sol[y][x] !== usr[y][x]) return false;
      return true;
    },
    [puzzle]
  );

  // Puzzle is complete when every claimable (filtered) tile has been drawn
  // correctly by one of the players. Non-claimable tiles are ignored.
  const checkAllDone = useCallback(
    (grid) => {
      for (const key of claimableTiles) {
        const [r, c] = key.split(",").map(Number);
        if (!isTileDone(grid, r, c)) return false;
      }
      return true;
    },
    [isTileDone, claimableTiles]
  );

  // Live-computed clock readouts. The active player's clock subtracts
  // elapsed time since the turn anchor; the inactive player's clock is the
  // static bank.
  const computeMsLeft = (forUserId) => {
    const isActive = activeUserIdRef.current === forUserId;
    const bank =
      forUserId === myId ? myMsLeftRef.current : oppMsLeftRef.current;
    if (!isActive || activeAnchorRef.current == null) return bank;
    return Math.max(0, bank - (Date.now() - activeAnchorRef.current));
  };
  const myMsLeft = computeMsLeft(myId);
  const oppMsLeft = computeMsLeft(oppId);

  // Subscribe to the match channel on mount.
  useEffect(() => {
    let cancelled = false;
    let ch = null;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const channelOptions = {
        matchId,
        userId: myId,
        botUserId: oppId,
        puzzle,
        mode: "chess-clock",
        isHost,
        onStart: ({ startAt: incomingStartAt }) => {
          setStartAt((prev) => prev ?? incomingStartAt);
        },
        onChessTurn: ({
          userId: byUserId,
          tileR,
          tileC,
          tileData,
          msLeftAfter,
        }) => {
          // Apply the submitted tile to the shared grid AND check for puzzle
          // completion against the freshly-built grid in a single functional
          // updater. Doing the check inside the updater guarantees we read
          // the latest React-tracked state (not a stale ref mirror).
          setUserGrid((prev) => {
            const next = prev.map((row, ri) =>
              row.map((tile, ci) =>
                ri === tileR && ci === tileC ? tileData : tile
              )
            );
            if (checkAllDone(next)) {
              if (byUserId === myId) setICompleted(true);
              else setOppCompleted(true);
            }
            return next;
          });
          setSubmitted((prev) => {
            const next = new Set(prev);
            next.add(`${tileR},${tileC}`);
            return next;
          });
          setTileOwners((prev) => ({ ...prev, [`${tileR},${tileC}`]: byUserId }));

          // Bank the submitter's remaining time.
          if (byUserId === myId) myMsLeftRef.current = msLeftAfter;
          else oppMsLeftRef.current = msLeftAfter;

          // Hand off the turn. The receiver's local Date.now() becomes the
          // new anchor — both clients independently anchor at receipt, which
          // bounds drift to network jitter rather than absolute clock skew.
          const nextActive = byUserId === myId ? oppId : myId;
          activeUserIdRef.current = nextActive;
          setActiveUserId(nextActive);
          activeAnchorRef.current = Date.now();
        },
        onPresenceSync: (count) => {
          setOpponentPresent(count >= 2);
        },
        onOpponentLeft: () => {
          if (gameOverRef.current) return;
          setOpponentQuit(true);
        },
      };
      ch = match.isBot ? createBotMatchChannel(channelOptions) : joinTerritoryMatch(channelOptions);
      ch.subscribe().catch(() => {});
      channelRef.current = ch;
    }, 40);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      try {
        ch?.leave();
      } catch {
        /* ignore */
      }
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once both players are present, race to broadcast a shared start time.
  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

  // Countdown driver: 3, 2, 1, GO! and gameStarted gate.
  useEffect(() => {
    if (!startAt) return;
    const tick = () => {
      const now = Date.now();
      const msUntilStart = startAt - now;
      if (msUntilStart > 500) {
        setCountdown(Math.ceil(msUntilStart / 1000));
        setGameStarted(false);
      } else if (msUntilStart > -500) {
        setCountdown(0);
        setGameStarted(true);
      } else {
        setCountdown(null);
        setGameStarted(true);
      }
    };
    tick();
    const iv = setInterval(tick, 200);
    return () => clearInterval(iv);
  }, [startAt]);

  // First-turn initialization: when gameStarted flips true, seat the host
  // as the active player and anchor their clock at startAt.
  useEffect(() => {
    if (!gameStarted || activeUserIdRef.current != null) return;
    activeUserIdRef.current = hostId;
    setActiveUserId(hostId);
    activeAnchorRef.current = startAt || Date.now();
  }, [gameStarted, hostId, startAt]);

  // 200ms tick: re-render clocks and check whether the active player's bank
  // has hit zero. Both clients run this independently — whichever player's
  // clock is active will have it observed by both sides at roughly the same
  // moment because both extrapolate from the same anchor.
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const iv = setInterval(() => {
      setTickNonce((n) => n + 1);
      const active = activeUserIdRef.current;
      if (active == null || activeAnchorRef.current == null) return;
      const bank =
        active === myId ? myMsLeftRef.current : oppMsLeftRef.current;
      const liveLeft = bank - (Date.now() - activeAnchorRef.current);
      if (liveLeft <= 0) {
        if (active === myId && !iLostTimeout) setILostTimeout(true);
        else if (active === oppId && !oppLostTimeout) setOppLostTimeout(true);
      }
    }, 200);
    return () => clearInterval(iv);
  }, [gameStarted, gameOver, iLostTimeout, oppLostTimeout, myId, oppId]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // End-game resolver. Priority: forfeit > completion > timeout. First win
  // condition reached locks the result (endScheduledRef).
  useEffect(() => {
    if (!gameStarted || endScheduledRef.current) return;

    let winner = null;
    let reason = null;

    if (opponentQuit) {
      winner = "me";
      reason = "forfeit";
    } else if (iCompleted) {
      winner = "me";
      reason = "finish";
    } else if (oppCompleted) {
      winner = "opponent";
      reason = "opponent_finish";
    } else if (iLostTimeout) {
      winner = "opponent";
      reason = "timeout";
    } else if (oppLostTimeout) {
      winner = "me";
      reason = "opponent_timeout";
    }

    if (!winner) return;

    endScheduledRef.current = true;
    setGameOver(true);
    const delayMs = reason === "forfeit" ? 1400 : 1800;
    setTimeout(() => {
      onGameEnd({
        winner,
        myScore: Math.max(0, Math.ceil(myMsLeft / 1000)),
        oppScore: Math.max(0, Math.ceil(oppMsLeft / 1000)),
        opponentName: opponent.displayName,
        reason,
        puzzle,
        mode: "chess-clock",
      });
    }, delayMs);
  }, [
    gameStarted,
    opponentQuit,
    iCompleted,
    oppCompleted,
    iLostTimeout,
    oppLostTimeout,
    myMsLeft,
    oppMsLeft,
    onGameEnd,
    opponent.displayName,
    puzzle,
  ]);

  // Tile interactions — only available on my turn.
  const handleTileClick = (r, c) => {
    if (!gameStarted || gameOver || !isMyTurn) return;
    if (submitted.has(`${r},${c}`)) return;
    setSelected({ r, c });
  };

  const handleSheetClose = () => {
    setSelected(null);
  };

  const handlePaint = useCallback(
    (r, c, py, px, mode) => {
      if (gameOver || activeUserIdRef.current !== myId) return;
      setUserGrid((prev) =>
        prev.map((row, ri) =>
          row.map((tile, ci) => {
            if (ri !== r || ci !== c) return tile;
            if (tile[py][px] === mode) return tile;
            return tile.map((trow, ty) =>
              trow.map((v, tx) => (ty === py && tx === px ? mode : v))
            );
          })
        )
      );
    },
    [gameOver, myId]
  );

  const handleClear = (r, c) => {
    if (gameOver || activeUserIdRef.current !== myId) return;
    setUserGrid((g) =>
      g.map((row, ri) =>
        row.map((tile, ci) =>
          ri === r && ci === c
            ? Array.from({ length: 5 }, () => Array(5).fill(0))
            : tile
        )
      )
    );
  };

  // Tile submission ends my turn. Compute my new bank by subtracting elapsed
  // time, then broadcast — local state updates apply via the self-echo of
  // chess_turn so both clients converge through the same code path. If my
  // bank has already hit zero, refuse the submit so the timeout resolution
  // wins (chess "flag fall on your move = you lose" rule).
  const handleTileSubmit = (r, c) => {
    if (
      gameOver ||
      activeUserIdRef.current !== myId ||
      activeAnchorRef.current == null
    )
      return;
    const elapsed = Date.now() - activeAnchorRef.current;
    const newMsLeft = myMsLeftRef.current - elapsed;
    if (newMsLeft <= 0) return;
    const tileData = userGridRef.current[r][c];
    channelRef.current?.sendChessTurn(r, c, tileData, newMsLeft);
    setSelected(null);
  };

  const fmtClock = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleQuitPress = () => {
    if (opponentPresent && startAt && !gameOver) {
      setConfirmForfeit(true);
    } else {
      onBack();
    }
  };

  // Only count claimable tiles that have actually been submitted — matches
  // the new win condition that only fair-difficulty tiles need to be drawn.
  let submittedCount = 0;
  for (const key of claimableTiles) if (submitted.has(key)) submittedCount++;
  const totalTiles = totalClaimable;

  // Color cues: active player's clock highlights gold; sub-30s flips red.
  const myActiveStyle = isMyTurn;
  const oppActiveStyle = activeUserId === oppId;
  const myClockColor =
    myMsLeft <= 30_000 ? "#F87171" : myActiveStyle ? "#FBBF24" : "#fff";
  const oppClockColor =
    oppMsLeft <= 30_000 ? "#F87171" : oppActiveStyle ? "#FBBF24" : "#fff";

  return (
    <div
      style={{
        fontFamily: "'Nunito',sans-serif",
        background: C.bg,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxWidth: "100vw",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: C.sheetBg,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={handleQuitPress}
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "none",
            color: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
            fontSize: 12,
            fontWeight: 800,
            padding: "6px 12px",
            borderRadius: 12,
          }}
        >
          ← Quit
        </button>
        <div
          style={{
            color: "#fff",
            fontFamily: "'Fredoka One',cursive",
            fontSize: 20,
            letterSpacing: 0.5,
          }}
        >
          ⏱ Chess Clock
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Dual clocks */}
      <div
        style={{
          background: C.paper,
          padding: "10px 14px",
          display: "flex",
          alignItems: "stretch",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #3B82F6, #818CF8)",
            borderRadius: 12,
            padding: "10px 14px",
            color: "#fff",
            boxShadow: myActiveStyle
              ? "0 0 0 3px #FBBF24, 0 4px 14px rgba(59,130,246,0.45)"
              : "0 4px 12px rgba(59,130,246,0.25)",
            opacity: myActiveStyle ? 1 : 0.65,
            transition: "box-shadow 0.2s, opacity 0.2s",
          }}
        >
          <div
            style={{
              fontSize: 9,
              letterSpacing: 2,
              opacity: 0.85,
              textTransform: "uppercase",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>You</span>
            {myActiveStyle && <span style={{ fontSize: 13, lineHeight: 1 }}>⏱️</span>}
          </div>
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 26,
              lineHeight: 1,
              color: myClockColor,
              transition: "color 0.2s",
            }}
          >
            {fmtClock(myMsLeft)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "'Fredoka One',cursive",
            color: C.muted,
            fontSize: 14,
            letterSpacing: 1,
          }}
        >
          VS
        </div>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #F43F5E, #FB923C)",
            borderRadius: 12,
            padding: "10px 14px",
            color: "#fff",
            textAlign: "right",
            boxShadow: oppActiveStyle
              ? "0 0 0 3px #FBBF24, 0 4px 14px rgba(244,63,94,0.45)"
              : "0 4px 12px rgba(244,63,94,0.25)",
            opacity: oppActiveStyle ? 1 : 0.65,
            transition: "box-shadow 0.2s, opacity 0.2s",
          }}
        >
          <div
            style={{
              fontSize: 9,
              letterSpacing: 2,
              opacity: 0.85,
              textTransform: "uppercase",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
              overflow: "hidden",
            }}
          >
            {oppActiveStyle && <span style={{ fontSize: 13, lineHeight: 1 }}>⏱️</span>}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
              {opponent.displayName || "Opponent"}
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 26,
              lineHeight: 1,
              color: oppClockColor,
              transition: "color 0.2s",
            }}
          >
            {fmtClock(oppMsLeft)}
          </div>
        </div>
      </div>

      {/* Turn indicator banner */}
      <div
        style={{
          background: isMyTurn
            ? "linear-gradient(90deg, #3B82F6, #818CF8)"
            : "linear-gradient(90deg, #F43F5E, #FB923C)",
          color: "#fff",
          padding: "8px 14px",
          textAlign: "center",
          fontFamily: "'Fredoka One',cursive",
          fontSize: 14,
          letterSpacing: 1,
          flexShrink: 0,
          borderBottom: `2px solid ${C.border}`,
        }}
      >
        {gameStarted
          ? isMyTurn
            ? "Your Turn — pick a tile"
            : `${opponent.displayName || "Opponent"}'s Turn`
          : "Waiting…"}
      </div>

      {/* Shared puzzle board */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 0 12px",
        }}
      >
        {(() => {
          const PAD = 8;
          const LABEL = 22;
          const GAP = 0;
          const tSz = Math.floor(
            (Math.min(window.innerWidth, 480) - PAD * 2 - LABEL - GAP * 7) / 8
          );
          const dotSz = Math.max(4, Math.floor(tSz / 8));
          return (
            <div style={{ flexShrink: 0, paddingLeft: PAD, paddingRight: PAD }}>
              <div
                style={{
                  display: "flex",
                  marginLeft: LABEL + GAP,
                  marginBottom: 4,
                }}
              >
                {COLS.map((c) => (
                  <div
                    key={c}
                    style={{
                      width: tSz,
                      textAlign: "center",
                      fontSize: 9,
                      color: C.muted,
                      fontWeight: "bold",
                      letterSpacing: 1,
                      marginRight: GAP,
                      paddingBottom: 6,
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              {ROWS.map((row, ri) => (
                <div
                  key={row}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: GAP,
                  }}
                >
                  <div
                    style={{
                      width: LABEL,
                      fontSize: 9,
                      color: C.muted,
                      fontWeight: "bold",
                      textAlign: "right",
                      marginRight: GAP,
                      paddingRight: 6,
                    }}
                  >
                    {row}
                  </div>
                  {COLS.map((_, ci) => {
                    const key = `${ri},${ci}`;
                    const isSubmitted = submitted.has(key);
                    const owner = tileOwners[key];
                    const ownedByMe = owner === myId;
                    const ownedByOpp = owner === oppId;
                    const claimable = claimableTiles.has(key);
                    const isPartialMine =
                      !isSubmitted &&
                      isMyTurn &&
                      userGrid[ri][ci].flat().some(Boolean);
                    const tappable =
                      gameStarted && !gameOver && isMyTurn && !isSubmitted && claimable;
                    const bg = ownedByMe
                      ? "#DBEAFE"
                      : ownedByOpp
                      ? "#FEE2E2"
                      : claimable
                      ? "#FFFFFF"
                      : "#F4F4F5";
                    const border = ownedByMe
                      ? "2px solid #3B82F6"
                      : ownedByOpp
                      ? "2px solid #F43F5E"
                      : isPartialMine
                      ? "2px dashed #6366F1"
                      : claimable
                      ? "1px solid #D4D4D8"
                      : "1px dashed #D4D4D8";
                    return (
                      <div
                        key={ci}
                        onClick={claimable ? () => handleTileClick(ri, ci) : undefined}
                        className={isSubmitted || !claimable ? "" : "tile-slot"}
                        style={{
                          width: tSz,
                          height: tSz,
                          flexShrink: 0,
                          borderTopLeftRadius:
                            ri === 0 && ci === 0 ? 8 : 0,
                          borderTopRightRadius:
                            ri === 0 && ci === 7 ? 8 : 0,
                          borderBottomLeftRadius:
                            ri === 7 && ci === 0 ? 8 : 0,
                          borderBottomRightRadius:
                            ri === 7 && ci === 7 ? 8 : 0,
                          background: bg,
                          border,
                          boxSizing: "border-box",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          marginRight: GAP,
                          boxShadow: isSubmitted || !claimable
                            ? "none"
                            : "inset 0 0 0 0.5px rgba(255,160,80,0.35)",
                          cursor: tappable ? "pointer" : "default",
                          opacity: claimable ? 1 : 0.55,
                          overflow: "hidden",
                          transition: "background 0.3s, border 0.2s",
                        }}
                      >
                        {!isSubmitted && claimable &&
                          !userGrid[ri][ci].flat().some(Boolean) && (
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `radial-gradient(circle, ${C.border} 1.2px, transparent 1.2px)`,
                                backgroundSize: `${dotSz + 2}px ${
                                  dotSz + 2
                                }px`,
                                backgroundPosition: "center",
                                opacity: 0.6,
                                borderRadius: "inherit",
                              }}
                            />
                          )}
                        <MiniTilePreview tile={userGrid[ri][ci]} />
                      </div>
                    );
                  })}
                </div>
              ))}
              <div
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 10,
                  color: C.muted,
                  letterSpacing: 2,
                  fontWeight: 700,
                }}
              >
                {submittedCount} / {totalTiles} TILES PLACED
              </div>
            </div>
          );
        })()}
      </div>

      {/* Tile sheet — only opens on my turn */}
      {selected && gameStarted && !gameOver && isMyTurn && (
        <TileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected}
          puzzle={puzzle}
          userGrid={userGrid}
          onClose={handleSheetClose}
          onNavigate={(next) => setSelected(next)}
          onPaint={handlePaint}
          onClear={handleClear}
          onSubmit={handleTileSubmit}
          submitted={submitted}
        />
      )}

      {/* Waiting overlay */}
      {(!opponentPresent || !startAt) && !gameOver && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 350,
            background: "rgba(8,30,45,0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>⏱️</div>
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: 24,
              letterSpacing: 0.5,
            }}
          >
            Connecting to opponent…
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              border: "3px solid rgba(255,255,255,0.12)",
              borderTop: "3px solid #A855F7",
              borderRadius: "50%",
              animation: "spin 0.9s linear infinite",
              marginTop: 18,
            }}
          />
        </div>
      )}

      {/* Countdown overlay */}
      {countdown !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            background: "rgba(0,0,0,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            pointerEvents: "none",
          }}
        >
          <div
            key={countdown}
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: countdown === 0 ? 110 : 150,
              color: countdown === 0 ? "#FBBF24" : "#fff",
              textShadow: "0 10px 50px rgba(6,182,212,0.7)",
              animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1)",
              letterSpacing: 2,
            }}
          >
            {countdown === 0 ? "GO!" : countdown}
          </div>
        </div>
      )}

      {/* Opponent quit banner */}
      {opponentQuit && !gameOver && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 380,
            background: "linear-gradient(135deg,#16A34A,#4ADE80)",
            color: "#fff",
            padding: "18px 32px",
            borderRadius: 20,
            fontFamily: "'Fredoka One',cursive",
            fontSize: 22,
            letterSpacing: 0.5,
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          🏃 Opponent fled — you win!
        </div>
      )}

      {/* Forfeit confirmation modal */}
      {confirmForfeit && (
        <>
          <div
            onClick={() => setConfirmForfeit(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 500,
              background: "rgba(10,6,2,0.72)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 501,
              background: C.paper,
              borderRadius: 20,
              padding: "26px 24px 18px",
              width: "calc(100vw - 48px)",
              maxWidth: 340,
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>
              🏳️
            </div>
            <div
              style={{
                fontFamily: "'Fredoka One',cursive",
                fontSize: 22,
                color: C.ink,
                textAlign: "center",
                marginBottom: 6,
                letterSpacing: 0.3,
              }}
            >
              Forfeit the match?
            </div>
            <div
              style={{
                fontSize: 13,
                color: C.muted,
                textAlign: "center",
                fontWeight: 600,
                lineHeight: 1.45,
                marginBottom: 20,
              }}
            >
              Your opponent will be awarded the win.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setConfirmForfeit(false)}
                style={{
                  flex: 1,
                  padding: "13px 0",
                  background: "none",
                  border: `2px solid ${C.border}`,
                  borderRadius: 12,
                  color: C.muted,
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 2,
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                Keep Playing
              </button>
              <button
                onClick={onBack}
                style={{
                  flex: 1,
                  padding: "13px 0",
                  background: "linear-gradient(135deg,#F43F5E,#C026D3)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(244,63,94,0.35)",
                }}
              >
                Forfeit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
