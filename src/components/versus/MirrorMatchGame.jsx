import { useState, useEffect, useRef, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import TerritoryTileSheet from "./TerritoryTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";

// Mirror Match: both players solve the same shared grid. Unlike Territory,
// opponents can open and draw on the *same* tile simultaneously — the
// submission isn't locked, it's a pure race for credit. The finished board
// becomes a "mosaic" of both players' contributions. A 4-minute safety cap
// prevents stalls; normal games end when every claimable tile is taken.
const SAFETY_TIME = 240;

export default function MirrorMatchGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;
  const oppId = opponent.userId;

  const [tileOwners, setTileOwners] = useState({}); // { "r,c": userId }
  const [oppActiveTile, setOppActiveTile] = useState(null); // "r,c" — non-blocking hint
  const [selected, setSelected] = useState(null);
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SAFETY_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);

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

  const myScore = useMemo(
    () => Object.entries(tileOwners).filter(([k, id]) => id === myId && claimableTiles.has(k)).length,
    [tileOwners, myId, claimableTiles]
  );
  const oppScore = useMemo(
    () => Object.entries(tileOwners).filter(([k, id]) => id === oppId && claimableTiles.has(k)).length,
    [tileOwners, oppId, claimableTiles]
  );
  const claimedCount = myScore + oppScore;

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
        mode: "mirror",
        isHost: match.isHost,
        onClaim: ({ tileR, tileC, userId: claimerId }) => {
          const key = `${tileR},${tileC}`;
          setTileOwners(prev => {
            if (prev[key]) return prev; // first claim wins — broadcasts are ordered
            return { ...prev, [key]: claimerId };
          });
          setOppActiveTile(prev => (prev === key ? null : prev));
        },
        onReserve: ({ tileR, tileC, userId: reserverId }) => {
          // Reuse reserve broadcasts as a non-blocking "opponent is drawing here"
          // hint. In Mirror Match this never locks — both players are free to
          // work on the same tile; it's purely visual feedback.
          if (reserverId === myId) return;
          setOppActiveTile(`${tileR},${tileC}`);
        },
        onUnreserve: ({ tileR, tileC, userId: reserverId }) => {
          if (reserverId === myId) return;
          const key = `${tileR},${tileC}`;
          setOppActiveTile(prev => (prev === key ? null : prev));
        },
        onStart: ({ startAt: incomingStartAt }) => {
          setStartAt(prev => prev ?? incomingStartAt);
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

  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

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
        setTimeLeft(Math.max(0, SAFETY_TIME - elapsedSec));
      }
    };
    tick();
    const iv = setInterval(tick, 200);
    return () => clearInterval(iv);
  }, [startAt]);

  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  useEffect(() => {
    if (!gameStarted || endScheduledRef.current) return;
    let winnerReason = null;
    if (opponentQuit) winnerReason = "forfeit";
    else if (claimedCount === totalClaimable && totalClaimable > 0) winnerReason = "all_claimed";
    // Mercy rule: once one side has strictly more than half the tiles, the
    // outcome is locked — no amount of opponent claims can overtake. End the
    // match early so the reveal + result screen can kick in.
    else if (totalClaimable > 0 && (myScore * 2 > totalClaimable || oppScore * 2 > totalClaimable)) winnerReason = "decided";
    else if (timeLeft === 0) winnerReason = "time";
    if (!winnerReason) return;

    endScheduledRef.current = true;
    setGameOver(true);
    const delayMs = winnerReason === "forfeit" ? 1400 : 2200;
    setTimeout(() => {
      let winner;
      if (winnerReason === "forfeit") winner = "me";
      else if (myScore > oppScore) winner = "me";
      else if (oppScore > myScore) winner = "opponent";
      else winner = "tie";
      onGameEnd({
        winner,
        myScore,
        oppScore,
        opponentName: opponent.displayName,
        reason: winnerReason,
        puzzle,
        mode: "mirror",
      });
    }, delayMs);
  }, [opponentQuit, timeLeft, claimedCount, totalClaimable, gameStarted, myScore, oppScore, onGameEnd, opponent.displayName, puzzle]);

  const handleTileClick = (r, c) => {
    if (!gameStarted || gameOver) return;
    const key = `${r},${c}`;
    if (tileOwners[key]) return;
    if (!claimableTiles.has(key)) return;
    if (navigator.vibrate) navigator.vibrate(8);
    channelRef.current?.sendReserve(r, c);
    setSelected({ r, c });
  };

  const handleSheetClose = () => {
    if (!selected) return;
    const key = `${selected.r},${selected.c}`;
    if (!tileOwners[key]) {
      channelRef.current?.sendUnreserve(selected.r, selected.c);
    }
    setSelected(null);
  };

  const handleClaim = (r, c) => {
    channelRef.current?.sendClaim(r, c);
  };

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

  const handleQuitPress = () => {
    if (opponentPresent && startAt && !gameOver) {
      setConfirmForfeit(true);
    } else {
      onBack();
    }
  };

  // Only CLAIMS lock the sheet in Mirror Match — both players can legitimately
  // be drawing on the same tile at the same moment.
  const selectedLocked = selected && !!tileOwners[`${selected.r},${selected.c}`];

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
        <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 20, letterSpacing: 0.5 }}>🪞 Mirror Match</div>
        <div style={{
          color: timeLeft <= 30 ? "#FBBF24" : "#fff",
          fontFamily: "'Fredoka One',cursive", fontSize: 20, minWidth: 60, textAlign: "right",
        }}>
          {fmtTime(timeLeft)}
        </div>
      </div>

      {/* Score bar */}
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
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700 }}>You</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, lineHeight: 1 }}>{myScore}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontFamily: "'Fredoka One',cursive", color: C.muted, fontSize: 12, letterSpacing: 1 }}>MOSAIC</div>
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
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {opponent.displayName || "Opponent"}
          </div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, lineHeight: 1 }}>{oppScore}</div>
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
                    const owner = tileOwners[key];
                    const isMine = owner === myId;
                    const isTheirs = owner === oppId;
                    const oppHere = !owner && oppActiveTile === key;
                    const imHere = !owner && selected && selected.r === ri && selected.c === ci;
                    const claimable = claimableTiles.has(key);
                    const revealUnclaimed = gameOver && claimable && !owner;

                    const baseStyle = {
                      width: tSz, height: tSz, flexShrink: 0,
                      borderTopLeftRadius: (ri === 0 && ci === 0) ? 8 : 0,
                      borderTopRightRadius: (ri === 0 && ci === 7) ? 8 : 0,
                      borderBottomLeftRadius: (ri === 7 && ci === 0) ? 8 : 0,
                      borderBottomRightRadius: (ri === 7 && ci === 7) ? 8 : 0,
                      boxSizing: "border-box",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      cursor: gameStarted && claimable && !owner && !gameOver ? "pointer" : "default",
                      opacity: claimable ? 1 : 0.55,
                      overflow: "hidden",
                      transition: "background 0.3s, border 0.3s",
                    };

                    let tileStyle;
                    if (isMine) {
                      tileStyle = { ...baseStyle, background: "#DBEAFE", border: "2px solid #3B82F6" };
                    } else if (isTheirs) {
                      tileStyle = { ...baseStyle, background: "#FEE2E2", border: "2px solid #F43F5E" };
                    } else if (revealUnclaimed) {
                      tileStyle = { ...baseStyle, background: "#F5F0E8", border: `1px solid #D4D4D8` };
                    } else if (oppHere && imHere) {
                      // Contested — both players drawing on this tile. Diagonal
                      // split: blue top-left, red bottom-right + split borders.
                      tileStyle = {
                        ...baseStyle,
                        background: "linear-gradient(135deg, #DBEAFE 0%, #DBEAFE 50%, #FEE2E2 50%, #FEE2E2 100%)",
                        borderTop: "2px dashed #3B82F6",
                        borderLeft: "2px dashed #3B82F6",
                        borderRight: "2px dashed #F43F5E",
                        borderBottom: "2px dashed #F43F5E",
                      };
                    } else if (oppHere) {
                      tileStyle = { ...baseStyle, background: "#FEE2E2", border: "2px dashed #F43F5E" };
                    } else if (imHere) {
                      tileStyle = { ...baseStyle, background: "#DBEAFE", border: "2px dashed #3B82F6" };
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
                        {(owner || revealUnclaimed) && (
                          <MiniTilePreview tile={puzzle.solution[ri][ci]} />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: C.muted, letterSpacing: 2, fontWeight: 700 }}>
                {claimedCount} / {totalClaimable} CLAIMED
              </div>
            </div>
          );
        })()}
      </div>

      {/* Tile sheet */}
      {selected && gameStarted && !gameOver && (
        <TerritoryTileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected}
          puzzle={puzzle}
          onClose={handleSheetClose}
          onClaim={handleClaim}
          locked={selectedLocked}
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
          <div style={{ fontSize: 56, marginBottom: 16 }}>🪞</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Connecting to opponent…</div>
          <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #8B5CF6", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginTop: 18 }} />
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
              textShadow: "0 10px 50px rgba(139,92,246,0.7)",
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
                  background: "linear-gradient(135deg,#8B5CF6,#EC4899)",
                  border: "none", borderRadius: 12, color: "#fff",
                  fontFamily: "'Fredoka One',cursive", fontSize: 14,
                  letterSpacing: 0.5, cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(139,92,246,0.35)",
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
