import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { C, COLS, ROWS } from "../../constants";
import SurvivalTileSheet from "./SurvivalTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";
import { computeFilteredClaimableTiles } from "../../lib/tiles";

const MAX_HEARTS = 3;

function blankGrid() {
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      Array.from({ length: 5 }, () => Array(5).fill(0))
    )
  );
}

export default function SurvivalGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;

  // My puzzle state — ephemeral, never persisted.
  const [userGrid, setUserGrid] = useState(blankGrid);
  const [submitted, setSubmitted] = useState(new Set()); // keys of correctly-submitted tiles
  const [selected, setSelected] = useState(null);
  const [myHearts, setMyHearts] = useState(MAX_HEARTS);

  // Opponent view
  const [oppHearts, setOppHearts] = useState(MAX_HEARTS);
  const [oppSubmittedCount, setOppSubmittedCount] = useState(0);
  const [oppState, setOppState] = useState("playing"); // playing | finished | dead
  const [incomingHit, setIncomingHit] = useState(false); // brief "you got hit" flash

  // Match/clock state (mirrors TerritoryGame)
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);
  const myStateRef = useRef("playing");

  // Claimable = ink tiles passing the "fair difficulty" filter (floor of 3,
  // per-puzzle median window of ±4). See src/lib/tiles.js for the details.
  const claimableTiles = useMemo(() => computeFilteredClaimableTiles(puzzle), [puzzle]);
  const totalClaimable = claimableTiles.size;

  const mySubmittedCount = submitted.size;
  const iDead = myHearts <= 0;

  const broadcastUpdate = useCallback((heartsLeft, subCount, state) => {
    channelRef.current?.sendSurvivalUpdate(heartsLeft, subCount, totalClaimable, state);
  }, [totalClaimable]);

  // Subscribe to match channel (deferred, StrictMode-safe).
  useEffect(() => {
    let cancelled = false;
    let ch = null;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const channelOptions = {
        matchId,
        userId: myId,
        botUserId: match.opponent?.userId,
        puzzle,
        mode: "survival",
        isHost: match.isHost,
        onStart: ({ startAt: incomingStartAt }) => {
          setStartAt(prev => prev ?? incomingStartAt);
        },
        onSurvivalUpdate: (payload) => {
          if (!payload || payload.userId === myId) return;
          if (typeof payload.heartsLeft === "number") setOppHearts(payload.heartsLeft);
          if (typeof payload.submittedCount === "number") setOppSubmittedCount(payload.submittedCount);
          if (payload.state) setOppState(payload.state);
        },
        onSurvivalAttack: (payload) => {
          if (!payload || payload.attackerId === myId) return;
          // Opponent submitted a correct tile — they deal 1 damage to me.
          setMyHearts(prev => Math.max(0, prev - 1));
          setIncomingHit(true);
          if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
          setTimeout(() => setIncomingHit(false), 700);
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
      try { ch?.leave(); } catch { /* ignore */ }
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Broadcast a synced start once both players are present.
  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

  // Drive countdown → GO → playing off startAt.
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

  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // Broadcast our snapshot whenever hearts or submitted count change so the
  // opponent's score bar stays in sync.
  const lastBroadcastRef = useRef(null);
  useEffect(() => {
    if (!gameStarted) return;
    const state = iDead ? "dead" : "playing";
    myStateRef.current = state;
    const snapshot = `${myHearts}|${mySubmittedCount}|${state}`;
    if (lastBroadcastRef.current === snapshot) return;
    lastBroadcastRef.current = snapshot;
    broadcastUpdate(myHearts, mySubmittedCount, state);
  }, [gameStarted, myHearts, mySubmittedCount, iDead, broadcastUpdate]);

  // End conditions:
  //   - opponent quit  → I win (forfeit)
  //   - I'm dead + opp also dead → tie (rare simultaneous)
  //   - I'm dead → I lose
  //   - Opp dead → I win
  useEffect(() => {
    if (!gameStarted || endScheduledRef.current) return;
    let outcome = null;
    if (opponentQuit) outcome = { winner: "me", reason: "forfeit" };
    else if (iDead && oppState === "dead") outcome = { winner: "tie", reason: "both_dead" };
    else if (iDead) outcome = { winner: "opponent", reason: "dead" };
    else if (oppState === "dead") outcome = { winner: "me", reason: "opponent_dead" };
    if (!outcome) return;

    endScheduledRef.current = true;
    setGameOver(true);
    const delayMs = outcome.reason === "forfeit" ? 1400 : 1800;
    setTimeout(() => {
      onGameEnd({
        winner: outcome.winner,
        myScore: Math.max(0, myHearts),
        oppScore: Math.max(0, oppHearts),
        opponentName: opponent.displayName,
        reason: outcome.reason,
        puzzle,
        mode: "survival",
      });
    }, delayMs);
  }, [gameStarted, opponentQuit, iDead, oppState, myHearts, oppHearts, onGameEnd, opponent.displayName, puzzle]);

  const handleTileClick = (r, c) => {
    if (!gameStarted || gameOver) return;
    const key = `${r},${c}`;
    if (submitted.has(key)) return; // already done
    if (!claimableTiles.has(key)) return; // blank tile — no need to open
    if (navigator.vibrate) navigator.vibrate(8);
    setSelected({ r, c });
  };

  const handlePaint = useCallback((r, c, py, px, mode) => {
    setUserGrid(prev =>
      prev.map((row, ri) =>
        row.map((tile, ci) => {
          if (ri !== r || ci !== c) return tile;
          if (tile[py][px] === mode) return tile;
          return tile.map((trow, ty) => trow.map((v, tx) => (ty === py && tx === px ? mode : v)));
        })
      )
    );
  }, []);

  const handleClearTile = useCallback((r, c) => {
    setUserGrid(prev =>
      prev.map((row, ri) =>
        row.map((tile, ci) =>
          ri === r && ci === c ? Array.from({ length: 5 }, () => Array(5).fill(0)) : tile
        )
      )
    );
  }, []);

  // Correct submission: mark the tile done. Heal yourself FIRST if you're
  // below max lives; only attack the opponent if you're already at full
  // hearts. That way "solving a tile" always helps you, but only converts to
  // damage once you can't benefit from the heal yourself.
  const handleCorrect = useCallback((r, c) => {
    const key = `${r},${c}`;
    let isNew = false;
    setSubmitted(prev => {
      if (prev.has(key)) return prev;
      isNew = true;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    if (!isNew) return; // no effect on duplicate submissions
    setMyHearts(prev => {
      if (prev < MAX_HEARTS) return prev + 1; // heal first
      // Already at max — convert the correct submission into an attack.
      channelRef.current?.sendSurvivalAttack();
      return prev;
    });
  }, []);

  // Wrong submission: self-damage so the draw phase stays risky.
  const handleWrong = useCallback(() => {
    setMyHearts(prev => Math.max(0, prev - 1));
  }, []);

  const handleSheetClose = () => setSelected(null);

  const handleQuitPress = () => {
    if (opponentPresent && startAt && !gameOver) {
      setConfirmForfeit(true);
    } else {
      onBack();
    }
  };

  const myProgressPct = totalClaimable > 0 ? Math.round((mySubmittedCount / totalClaimable) * 100) : 0;
  const oppProgressPct = totalClaimable > 0 ? Math.round((oppSubmittedCount / totalClaimable) * 100) : 0;

  const renderHearts = (count) => (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <span key={i} style={{ fontSize: 16, opacity: i < count ? 1 : 0.25, filter: i < count ? "none" : "grayscale(1)" }}>
          {i < count ? "❤️" : "🖤"}
        </span>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100vw", position: "relative" }}>
      {/* Header */}
      <div style={{ background: C.sheetBg, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 16px rgba(0,0,0,0.2)", flexShrink: 0 }}>
        <button
          onClick={handleQuitPress}
          style={{
            background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.8)",
            cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: 800,
            padding: "6px 12px", borderRadius: 12,
          }}
        >
          ← Quit
        </button>
        <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 20, letterSpacing: 0.5 }}>❤ Survival</div>
        <div style={{ width: 48 }} />
      </div>

      {/* Score bar — you vs opponent, hearts + progress */}
      <div style={{ background: C.paper, padding: "10px 14px", display: "flex", alignItems: "stretch", gap: 8, borderBottom: `2px solid ${C.border}`, flexShrink: 0 }}>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #3B82F6, #818CF8)",
            borderRadius: 12,
            padding: "8px 14px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(59,130,246,0.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700 }}>You</div>
            {renderHearts(myHearts)}
          </div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, lineHeight: 1, marginTop: 4 }}>{myProgressPct}%</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontFamily: "'Fredoka One',cursive", color: C.muted, fontSize: 14, letterSpacing: 1 }}>VS</div>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #F43F5E, #FB923C)",
            borderRadius: 12,
            padding: "8px 14px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(244,63,94,0.25)",
            textAlign: "right",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {opponent.displayName || "Opponent"}
            </div>
            {renderHearts(oppHearts)}
          </div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, lineHeight: 1, marginTop: 4 }}>{oppProgressPct}%</div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0 12px" }}>
        {(() => {
          const PAD = 8, LABEL = 22, GAP = 0;
          const tSz = Math.floor((Math.min(window.innerWidth, 480) - PAD * 2 - LABEL - GAP * 7) / 8);
          return (
            <div style={{ flexShrink: 0, paddingLeft: PAD, paddingRight: PAD }}>
              <div style={{ display: "flex", marginLeft: LABEL + GAP, marginBottom: 4 }}>
                {COLS.map(c => (
                  <div key={c} style={{ width: tSz, textAlign: "center", fontSize: 9, color: C.muted, fontWeight: "bold", letterSpacing: 1, marginRight: GAP, paddingBottom: 6 }}>{c}</div>
                ))}
              </div>
              {ROWS.map((row, ri) => (
                <div key={row} style={{ display: "flex", alignItems: "center", marginBottom: GAP }}>
                  <div style={{ width: LABEL, fontSize: 9, color: C.muted, fontWeight: "bold", textAlign: "right", marginRight: GAP, paddingRight: 6 }}>{row}</div>
                  {COLS.map((_, ci) => {
                    const key = `${ri},${ci}`;
                    const isDone = submitted.has(key);
                    const claimable = claimableTiles.has(key);
                    // On game end, reveal unclaimed ink tiles in a neutral tone.
                    const revealUnclaimed = gameOver && claimable && !isDone;
                    const bg = isDone
                      ? "#DBEAFE"
                      : revealUnclaimed
                      ? "#F5F0E8"
                      : claimable
                      ? "#FFFFFF"
                      : "#F4F4F5";
                    const border = isDone
                      ? "2px solid #3B82F6"
                      : revealUnclaimed
                      ? `1px solid #D4D4D8`
                      : claimable
                      ? "1px solid #D4D4D8"
                      : "1px dashed #D4D4D8";
                    return (
                      <div
                        key={ci}
                        onClick={() => handleTileClick(ri, ci)}
                        style={{
                          width: tSz, height: tSz, flexShrink: 0,
                          borderTopLeftRadius: (ri === 0 && ci === 0) ? 8 : 0,
                          borderTopRightRadius: (ri === 0 && ci === 7) ? 8 : 0,
                          borderBottomLeftRadius: (ri === 7 && ci === 0) ? 8 : 0,
                          borderBottomRightRadius: (ri === 7 && ci === 7) ? 8 : 0,
                          background: bg,
                          border,
                          boxSizing: "border-box",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative",
                          cursor: gameStarted && claimable && !isDone && !gameOver ? "pointer" : "default",
                          opacity: claimable ? 1 : 0.55,
                          overflow: "hidden",
                          transition: "background 0.3s, border 0.3s",
                        }}
                      >
                        {(isDone || revealUnclaimed) && (
                          <MiniTilePreview tile={puzzle.solution[ri][ci]} />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: C.muted, letterSpacing: 2, fontWeight: 700 }}>
                {mySubmittedCount} / {totalClaimable} SUBMITTED
              </div>
            </div>
          );
        })()}
      </div>

      {/* Incoming hit flash — opponent scored a correct submission, you lost a heart */}
      {incomingHit && (
        <div style={{
          position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)",
          zIndex: 380, background: "linear-gradient(135deg,#DC2626,#F59E0B)",
          color: "#fff", padding: "12px 22px", borderRadius: 16,
          fontFamily: "'Fredoka One',cursive", fontSize: 16, letterSpacing: 0.3,
          boxShadow: "0 8px 24px rgba(220,38,38,0.45)",
          animation: "celebrationPop 0.3s cubic-bezier(0.16,1,0.3,1)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}>
          💥 Took a hit!
        </div>
      )}

      {/* Tile sheet */}
      {selected && gameStarted && !gameOver && (
        <SurvivalTileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected}
          puzzle={puzzle}
          userTile={userGrid[selected.r][selected.c]}
          onPaint={handlePaint}
          onClear={handleClearTile}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onClose={handleSheetClose}
          heartsLeft={myHearts}
        />
      )}

      {/* Waiting overlay */}
      {(!opponentPresent || !startAt) && !gameOver && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 350,
            background: "rgba(30,18,69,0.92)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: "#fff", backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>❤️</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Connecting to opponent…</div>
          <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #A855F7", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginTop: 18 }} />
        </div>
      )}

      {/* Countdown overlay */}
      {countdown !== null && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 400,
            background: "rgba(0,0,0,0.72)",
            display: "flex", alignItems: "center", justifyContent: "center",
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
              textShadow: "0 10px 50px rgba(192,38,211,0.7)",
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
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            zIndex: 380, background: "linear-gradient(135deg,#16A34A,#4ADE80)",
            color: "#fff", padding: "18px 32px", borderRadius: 20,
            fontFamily: "'Fredoka One',cursive", fontSize: 22, letterSpacing: 0.5,
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
              position: "absolute", inset: 0, zIndex: 500,
              background: "rgba(10,6,2,0.72)",
              backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
            }}
          />
          <div
            style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              zIndex: 501, background: C.paper, borderRadius: 20,
              padding: "26px 24px 18px", width: "calc(100vw - 48px)", maxWidth: 340,
              boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 8 }}>🏳️</div>
            <div style={{
              fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink,
              textAlign: "center", marginBottom: 6, letterSpacing: 0.3,
            }}>
              Forfeit the match?
            </div>
            <div style={{
              fontSize: 13, color: C.muted, textAlign: "center",
              fontWeight: 600, lineHeight: 1.45, marginBottom: 20,
            }}>
              Your opponent will be awarded the win.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setConfirmForfeit(false)}
                style={{
                  flex: 1, padding: "13px 0",
                  background: "none", border: `2px solid ${C.border}`,
                  borderRadius: 12, color: C.muted,
                  fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: 800,
                  letterSpacing: 2, cursor: "pointer", textTransform: "uppercase",
                }}
              >
                Keep Playing
              </button>
              <button
                onClick={onBack}
                style={{
                  flex: 1, padding: "13px 0",
                  background: "linear-gradient(135deg,#F43F5E,#C026D3)",
                  border: "none", borderRadius: 12, color: "#fff",
                  fontFamily: "'Fredoka One',cursive", fontSize: 14,
                  letterSpacing: 0.5, cursor: "pointer",
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
