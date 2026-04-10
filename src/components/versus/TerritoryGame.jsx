import { useState, useEffect, useRef, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import TerritoryTileSheet from "./TerritoryTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";

const TOTAL_TIME = 180; // 3 minutes

export default function TerritoryGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;
  const oppId = opponent.userId;

  const [tileOwners, setTileOwners] = useState({}); // { "r,c": userId }
  const [selected, setSelected] = useState(null);
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1 | 0 ("GO!")
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);

  // Compute the set of "claimable" tile keys — only tiles that contain ink in the solution.
  // Blank tiles are excluded so the game rewards puzzle skill over instant-submit spam.
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

  // Derived scores (only count claimable tiles, even if a blank tile somehow got claimed).
  const myScore = useMemo(
    () => Object.entries(tileOwners).filter(([k, id]) => id === myId && claimableTiles.has(k)).length,
    [tileOwners, myId, claimableTiles]
  );
  const oppScore = useMemo(
    () => Object.entries(tileOwners).filter(([k, id]) => id === oppId && claimableTiles.has(k)).length,
    [tileOwners, oppId, claimableTiles]
  );
  const claimedCount = myScore + oppScore;

  // Subscribe to the match channel on mount.
  useEffect(() => {
    const ch = joinTerritoryMatch({
      matchId,
      userId: myId,
      onClaim: ({ tileR, tileC, userId: claimerId }) => {
        setTileOwners(prev => {
          const key = `${tileR},${tileC}`;
          if (prev[key]) return prev; // first claim wins — broadcasts are ordered
          return { ...prev, [key]: claimerId };
        });
      },
      onPresenceSync: (count) => {
        setOpponentPresent(count >= 2);
      },
      onOpponentLeft: () => {
        if (gameOverRef.current) return;
        setOpponentQuit(true);
      },
    });
    ch.subscribe().catch(() => {});
    channelRef.current = ch;
    return () => {
      try { ch.leave(); } catch { /* ignore */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start the 3-2-1 countdown once both players are connected.
  useEffect(() => {
    if (!opponentPresent || countdown !== null || gameStarted) return;
    setCountdown(3);
    let t = 3;
    const iv = setInterval(() => {
      t -= 1;
      if (t < 0) {
        clearInterval(iv);
        setCountdown(null);
      } else if (t === 0) {
        setCountdown(0);
        setGameStarted(true);
      } else {
        setCountdown(t);
      }
    }, 900);
    return () => clearInterval(iv);
  }, [opponentPresent, countdown, gameStarted]);

  // Main game timer.
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const iv = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [gameStarted, gameOver]);

  // Keep gameOver ref in sync so the presence-leave handler can read it without stale closure.
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // End conditions: time runs out, all tiles claimed, or opponent quits.
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    let winnerReason = null;
    if (opponentQuit) winnerReason = "forfeit";
    else if (timeLeft === 0) winnerReason = "time";
    else if (claimedCount === totalClaimable && totalClaimable > 0) winnerReason = "all_claimed";
    if (!winnerReason) return;

    setGameOver(true);
    const delayMs = winnerReason === "forfeit" ? 600 : 1200;
    const timer = setTimeout(() => {
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
      });
    }, delayMs);
    return () => clearTimeout(timer);
  }, [opponentQuit, timeLeft, claimedCount, totalClaimable, gameStarted, gameOver, myScore, oppScore, onGameEnd, opponent.displayName]);

  // If a tile I'm currently drawing on gets claimed, close the sheet.
  useEffect(() => {
    if (selected && tileOwners[`${selected.r},${selected.c}`]) {
      // TerritoryTileSheet closes itself via `locked` prop.
    }
  }, [tileOwners, selected]);

  const handleTileClick = (r, c) => {
    if (!gameStarted || gameOver) return;
    const key = `${r},${c}`;
    if (tileOwners[key]) return;
    if (!claimableTiles.has(key)) return;
    if (navigator.vibrate) navigator.vibrate(8);
    setSelected({ r, c });
  };

  const handleClaim = (r, c) => {
    // Send broadcast — local state updates when we receive the echo (broadcast:self=true).
    channelRef.current?.sendClaim(r, c);
  };

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

  const selectedLocked = selected && !!tileOwners[`${selected.r},${selected.c}`];

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100vw" }}>
      {/* Header */}
      <div style={{ background: C.sheetBg, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 16px rgba(0,0,0,0.2)", flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.8)",
            cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: 800,
            padding: "6px 12px", borderRadius: 12,
          }}
        >
          ← Quit
        </button>
        <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 20, letterSpacing: 0.5 }}>⚔ Territory</div>
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
                    const claimable = claimableTiles.has(key);
                    const bg = isMine
                      ? "#DBEAFE"
                      : isTheirs
                      ? "#FEE2E2"
                      : claimable
                      ? C.surface
                      : "#F5F3FA";
                    const border = isMine
                      ? "2px solid #3B82F6"
                      : isTheirs
                      ? "2px solid #F43F5E"
                      : "none";
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
                          cursor: gameStarted && claimable && !owner ? "pointer" : "default",
                          opacity: claimable ? 1 : 0.35,
                          overflow: "hidden",
                          transition: "background 0.2s, border 0.2s",
                        }}
                      >
                        {owner && <MiniTilePreview tile={puzzle.solution[ri][ci]} />}
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
          onClose={() => setSelected(null)}
          onClaim={handleClaim}
          locked={selectedLocked}
        />
      )}

      {/* Waiting overlay */}
      {!opponentPresent && !gameOver && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 350,
            background: "rgba(30,18,69,0.92)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: "#fff", backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚔️</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Connecting to opponent…</div>
          <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #A855F7", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginTop: 18 }} />
        </div>
      )}

      {/* Countdown overlay */}
      {countdown !== null && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 400,
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
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
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
    </div>
  );
}
