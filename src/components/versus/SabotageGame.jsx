import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { C, COLS, ROWS } from "../../constants";
import SabotageTileSheet from "./SabotageTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";

const TOTAL_TIME = 180; // 3 minutes
const EMPTY_TILE = () => Array.from({ length: 5 }, () => Array(5).fill(0));

export default function SabotageGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;

  // My local 8x8 grid of 5x5 tiles. Each player has their own copy of the puzzle.
  const [userGrid, setUserGrid] = useState(() =>
    Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => EMPTY_TILE()))
  );
  const [submitted, setSubmitted] = useState(() => new Set()); // "r,c" of my submitted tiles
  const [selected, setSelected] = useState(null);

  const [opponentSubmittedCount, setOpponentSubmittedCount] = useState(0);
  const [opponentSubmitted, setOpponentSubmitted] = useState(() => new Set()); // "r,c" of tiles opponent has submitted
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);
  const [finishedBy, setFinishedBy] = useState(null); // userId of whoever fully completed first

  // Sabotage state
  const [sabotagedTile, setSabotagedTile] = useState(null); // { r, c } briefly highlighted red on incoming
  const [sentBanner, setSentBanner] = useState(null); // text shown briefly when I send a sabotage
  const [incomingBanner, setIncomingBanner] = useState(null); // text shown when I'm sabotaged

  const channelRef = useRef(null);
  const completedRowsRef = useRef(new Set()); // track which rows are currently fully submitted
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);
  const finishedByRef = useRef(null); // mirrors finishedBy so handlers/effects can read latest synchronously
  const submittedRef = useRef(submitted); // mirrors submitted so the sabotage handler can read it without an updater

  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);
  useEffect(() => { finishedByRef.current = finishedBy; }, [finishedBy]);
  useEffect(() => { submittedRef.current = submitted; }, [submitted]);

  // Compute the set of "claimable" tiles (only ink-bearing tiles count toward win).
  const claimableTiles = useMemo(() => {
    const keys = new Set();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (puzzle.solution[r][c].flat().some(Boolean)) keys.add(`${r},${c}`);
      }
    }
    return keys;
  }, [puzzle]);
  const totalClaimable = claimableTiles.size;

  // How many of the *claimable* tiles I've submitted.
  const mySubmittedCount = useMemo(() => {
    let n = 0;
    for (const k of submitted) if (claimableTiles.has(k)) n++;
    return n;
  }, [submitted, claimableTiles]);

  // Pick one of my submitted ink tiles at random and un-submit it.
  // Reads from submittedRef so React state updaters stay pure.
  const handleIncomingSabotage = useCallback(() => {
    const candidates = [...submittedRef.current].filter(k => claimableTiles.has(k));
    if (candidates.length === 0) return; // sabotage wasted — no submitted tiles to hit
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    const [r, c] = pick.split(",").map(Number);
    setUserGrid(grid =>
      grid.map((row, ri) => row.map((t, ci) => (ri === r && ci === c ? EMPTY_TILE() : t)))
    );
    setSubmitted(prev => {
      if (!prev.has(pick)) return prev;
      const next = new Set(prev);
      next.delete(pick);
      return next;
    });
    // Tell the opponent I lost this tile so their view of my progress updates.
    channelRef.current?.sendUnclaim(r, c);
    setSabotagedTile({ r, c });
    setIncomingBanner("💣 Incoming sabotage!");
    if (navigator.vibrate) navigator.vibrate([60, 30, 60]);
    setTimeout(() => setSabotagedTile(null), 1400);
    setTimeout(() => setIncomingBanner(null), 1800);
  }, [claimableTiles]);

  // Subscribe to match channel.
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
        mode: "sabotage",
        isHost: match.isHost,
        onStart: ({ startAt: incomingStartAt }) => {
          setStartAt(prev => prev ?? incomingStartAt);
        },
        onClaim: ({ tileR, tileC, userId: fromId }) => {
          if (fromId === myId) return; // we track our own submitted set separately
          setOpponentSubmitted(prev => {
            const key = `${tileR},${tileC}`;
            if (prev.has(key)) return prev;
            const next = new Set(prev);
            next.add(key);
            return next;
          });
        },
        onUnclaim: ({ tileR, tileC, userId: fromId }) => {
          if (fromId === myId) return;
          setOpponentSubmitted(prev => {
            const key = `${tileR},${tileC}`;
            if (!prev.has(key)) return prev;
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
        },
        onProgress: ({ userId: fromId, submittedCount }) => {
          if (fromId !== myId) setOpponentSubmittedCount(submittedCount);
        },
        onSabotage: ({ fromUserId }) => {
          if (fromUserId === myId) return; // ignore self-echo
          handleIncomingSabotage();
        },
        onPuzzleDone: ({ userId: finisherId }) => {
          if (finishedByRef.current) return;
          finishedByRef.current = finisherId;
          setFinishedBy(finisherId);
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

  // Send synced start once both players are present.
  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

  // Unified game clock — countdown → game timer.
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
        const elapsedSec = Math.floor((now - startAt) / 1000);
        setTimeLeft(Math.max(0, TOTAL_TIME - elapsedSec));
      }
    };
    tick();
    const iv = setInterval(tick, 200);
    return () => clearInterval(iv);
  }, [startAt]);

  // After every submission, check for newly-completed rows and puzzle completion.
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Broadcast progress on every change.
    channelRef.current?.sendProgress(mySubmittedCount, totalClaimable);

    // Detect rows that are currently complete (only counting claimable tiles).
    const newCompleted = new Set();
    for (let r = 0; r < 8; r++) {
      let allDone = true;
      let hasAny = false;
      for (let c = 0; c < 8; c++) {
        const key = `${r},${c}`;
        if (!claimableTiles.has(key)) continue;
        hasAny = true;
        if (!submitted.has(key)) { allDone = false; break; }
      }
      if (allDone && hasAny) newCompleted.add(r);
    }
    // Newly transitioned rows trigger a sabotage.
    for (const r of newCompleted) {
      if (!completedRowsRef.current.has(r)) {
        channelRef.current?.sendSabotage(r);
        showSentBanner(r);
      }
    }
    completedRowsRef.current = newCompleted;

    // Did I just complete the whole puzzle?
    if (mySubmittedCount === totalClaimable && totalClaimable > 0 && !finishedByRef.current) {
      finishedByRef.current = myId;
      setFinishedBy(myId);
      channelRef.current?.sendPuzzleDone();
    }
  }, [submitted, mySubmittedCount, totalClaimable, claimableTiles, gameStarted, gameOver, myId]);

  // End conditions.
  useEffect(() => {
    if (!gameStarted || endScheduledRef.current) return;
    let reason = null;
    let winner = null;
    if (opponentQuit) {
      reason = "forfeit";
      winner = "me";
    } else if (finishedBy === myId) {
      reason = "completed";
      winner = "me";
    } else if (finishedBy && finishedBy !== myId) {
      reason = "opponent_completed";
      winner = "opponent";
    } else if (timeLeft === 0) {
      reason = "time";
      if (mySubmittedCount > opponentSubmittedCount) winner = "me";
      else if (opponentSubmittedCount > mySubmittedCount) winner = "opponent";
      else winner = "tie";
    }
    if (!reason) return;

    endScheduledRef.current = true;
    setGameOver(true);
    const delayMs = reason === "forfeit" ? 1400 : 1800;
    setTimeout(() => {
      onGameEnd({
        winner,
        myScore: mySubmittedCount,
        oppScore: opponentSubmittedCount,
        opponentName: opponent.displayName,
        reason,
        puzzle,
        mode: "sabotage",
      });
    }, delayMs);
  }, [opponentQuit, timeLeft, gameStarted, finishedBy, mySubmittedCount, opponentSubmittedCount, onGameEnd, opponent.displayName, puzzle, myId]);

  function showSentBanner(row) {
    setSentBanner(`💥 Sabotage sent — Row ${ROWS[row]}!`);
    setTimeout(() => setSentBanner(null), 1600);
  }

  // Tap a tile → open the sheet (whether or not it's already submitted).
  const handleTileClick = (r, c) => {
    if (!gameStarted || gameOver) return;
    if (!claimableTiles.has(`${r},${c}`)) return;
    if (navigator.vibrate) navigator.vibrate(8);
    setSelected({ r, c });
  };

  // Called by the tile sheet on a successful submit.
  const handleTileSubmit = useCallback((r, c, tile) => {
    setUserGrid(prev =>
      prev.map((row, ri) => row.map((t, ci) => (ri === r && ci === c ? tile : t)))
    );
    setSubmitted(prev => {
      const next = new Set(prev);
      next.add(`${r},${c}`);
      return next;
    });
    // Broadcast so the opponent can see which tiles I've completed.
    channelRef.current?.sendClaim(r, c);
  }, []);

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

  const handleQuitPress = () => {
    if (opponentPresent && startAt && !gameOver) setConfirmForfeit(true);
    else onBack();
  };

  const myProgressPct = totalClaimable > 0 ? Math.round((mySubmittedCount / totalClaimable) * 100) : 0;
  const oppProgressPct = totalClaimable > 0 ? Math.round((opponentSubmittedCount / totalClaimable) * 100) : 0;

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
        <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 20, letterSpacing: 0.5 }}>💣 Sabotage</div>
        <div style={{
          color: timeLeft <= 30 ? "#FBBF24" : "#fff",
          fontFamily: "'Fredoka One',cursive", fontSize: 18, minWidth: 60, textAlign: "right",
        }}>
          {fmtTime(timeLeft)}
        </div>
      </div>

      {/* Score / progress bars */}
      <div style={{ background: C.paper, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, borderBottom: `2px solid ${C.border}`, flexShrink: 0 }}>
        <ProgressBar
          label="You"
          color="linear-gradient(135deg, #3B82F6, #818CF8)"
          shadow="0 4px 12px rgba(59,130,246,0.25)"
          submitted={mySubmittedCount}
          total={totalClaimable}
          pct={myProgressPct}
        />
        <ProgressBar
          label={opponent.displayName || "Opponent"}
          color="linear-gradient(135deg, #F43F5E, #FB923C)"
          shadow="0 4px 12px rgba(244,63,94,0.25)"
          submitted={opponentSubmittedCount}
          total={totalClaimable}
          pct={oppProgressPct}
        />
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
                    const isMine = submitted.has(key);
                    const isOpp = opponentSubmitted.has(key);
                    const isBoth = isMine && isOpp;
                    const claimable = claimableTiles.has(key);
                    const isSabotaged = sabotagedTile && sabotagedTile.r === ri && sabotagedTile.c === ci;

                    // Base style — gets overridden for the combined / sabotaged states below.
                    const baseStyle = {
                      width: tSz, height: tSz, flexShrink: 0,
                      borderTopLeftRadius: (ri === 0 && ci === 0) ? 8 : 0,
                      borderTopRightRadius: (ri === 0 && ci === 7) ? 8 : 0,
                      borderBottomLeftRadius: (ri === 7 && ci === 0) ? 8 : 0,
                      borderBottomRightRadius: (ri === 7 && ci === 7) ? 8 : 0,
                      boxSizing: "border-box",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      cursor: gameStarted && claimable && !gameOver ? "pointer" : "default",
                      opacity: claimable ? 1 : 0.35,
                      overflow: "hidden",
                      transition: "background 0.3s, border 0.3s",
                      animation: isSabotaged ? "wrongShake 0.4s ease" : undefined,
                    };

                    let tileStyle;
                    if (isSabotaged) {
                      // Purple flash so it doesn't collide with the opp-red
                      // state. Combined with the shake animation it reads
                      // unmistakably as "you just took damage".
                      tileStyle = { ...baseStyle, background: "#F3E8FF", border: "2px solid #A855F7" };
                    } else if (isBoth) {
                      // Both players have submitted this tile — diagonal split:
                      // blue top-left (mine), red bottom-right (opponent).
                      tileStyle = {
                        ...baseStyle,
                        background: "linear-gradient(135deg, #DBEAFE 0%, #DBEAFE 50%, #FEE2E2 50%, #FEE2E2 100%)",
                        borderTop: "2px solid #3B82F6",
                        borderLeft: "2px solid #3B82F6",
                        borderRight: "2px solid #F43F5E",
                        borderBottom: "2px solid #F43F5E",
                      };
                    } else if (isMine) {
                      tileStyle = { ...baseStyle, background: "#DBEAFE", border: "2px solid #3B82F6" };
                    } else if (isOpp) {
                      tileStyle = { ...baseStyle, background: "#FEE2E2", border: "2px solid #F43F5E" };
                    } else if (claimable) {
                      tileStyle = { ...baseStyle, background: "#FFFFFF", border: "1px solid #D4D4D8" };
                    } else {
                      tileStyle = { ...baseStyle, background: "#F4F4F5", border: "1px dashed #D4D4D8" };
                    }

                    return (
                      <div
                        key={ci}
                        onClick={() => handleTileClick(ri, ci)}
                        style={tileStyle}
                      >
                        {(isMine || isOpp) && <MiniTilePreview tile={puzzle.solution[ri][ci]} />}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: C.muted, letterSpacing: 2, fontWeight: 700 }}>
                {mySubmittedCount} / {totalClaimable} TILES
              </div>
            </div>
          );
        })()}
      </div>

      {/* Tile sheet */}
      {selected && gameStarted && !gameOver && (
        <SabotageTileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected}
          puzzle={puzzle}
          initialTile={userGrid[selected.r][selected.c]}
          onClose={() => setSelected(null)}
          onSubmit={(r, c, tile) => { handleTileSubmit(r, c, tile); setSelected(null); }}
        />
      )}

      {/* Sabotage banners */}
      {sentBanner && (
        <div style={{
          position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)",
          zIndex: 380, background: "linear-gradient(135deg,#3B82F6,#818CF8)",
          color: "#fff", padding: "12px 22px", borderRadius: 16,
          fontFamily: "'Fredoka One',cursive", fontSize: 16, letterSpacing: 0.3,
          boxShadow: "0 8px 24px rgba(59,130,246,0.45)",
          animation: "celebrationPop 0.4s cubic-bezier(0.16,1,0.3,1)",
          whiteSpace: "nowrap",
        }}>
          {sentBanner}
        </div>
      )}
      {incomingBanner && (
        <div style={{
          position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)",
          zIndex: 380, background: "linear-gradient(135deg,#DC2626,#F59E0B)",
          color: "#fff", padding: "12px 22px", borderRadius: 16,
          fontFamily: "'Fredoka One',cursive", fontSize: 16, letterSpacing: 0.3,
          boxShadow: "0 8px 24px rgba(220,38,38,0.45)",
          animation: "celebrationPop 0.4s cubic-bezier(0.16,1,0.3,1)",
          whiteSpace: "nowrap",
        }}>
          {incomingBanner}
        </div>
      )}

      {/* Waiting overlay */}
      {(!opponentPresent || !startAt) && !gameOver && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 350,
          background: "rgba(30,18,69,0.92)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: "#fff", backdropFilter: "blur(4px)",
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💣</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Connecting to opponent…</div>
          <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #A855F7", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginTop: 18 }} />
        </div>
      )}

      {/* Countdown */}
      {countdown !== null && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 400,
          background: "rgba(0,0,0,0.72)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
          pointerEvents: "none",
        }}>
          <div
            key={countdown}
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: countdown === 0 ? 110 : 150,
              color: countdown === 0 ? "#FBBF24" : "#fff",
              textShadow: "0 10px 50px rgba(220,38,38,0.7)",
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
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          zIndex: 380, background: "linear-gradient(135deg,#16A34A,#4ADE80)",
          color: "#fff", padding: "18px 32px", borderRadius: 20,
          fontFamily: "'Fredoka One',cursive", fontSize: 22, letterSpacing: 0.5,
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          🏃 Opponent fled — you win!
        </div>
      )}

      {/* Forfeit confirm */}
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
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            zIndex: 501, background: C.paper, borderRadius: 20,
            padding: "26px 24px 18px", width: "calc(100vw - 48px)", maxWidth: 340,
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            fontFamily: "'Nunito',sans-serif",
          }}>
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

function ProgressBar({ label, color, shadow, submitted, total, pct }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 70, fontSize: 10, color: C.muted, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 18, background: C.surface, borderRadius: 99, position: "relative", overflow: "hidden", border: `1px solid ${C.border}` }}>
        <div style={{
          position: "absolute", inset: 0, width: `${pct}%`, background: color,
          borderRadius: 99, transition: "width 0.3s ease", boxShadow: shadow,
        }} />
      </div>
      <div style={{ minWidth: 46, textAlign: "right", fontFamily: "'Fredoka One',cursive", fontSize: 14, color: C.ink }}>
        {submitted}/{total}
      </div>
    </div>
  );
}
