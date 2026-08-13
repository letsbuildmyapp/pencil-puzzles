import { useState, useEffect, useRef, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import TerritoryTileSheet from "./TerritoryTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";

const TOTAL_TIME = 180; // 3 minutes

export default function TerritoryGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;
  const oppId = opponent.userId;

  const [tileOwners, setTileOwners] = useState({}); // { "r,c": userId }
  const [reservations, setReservations] = useState({}); // { "r,c": userId } — tiles someone is currently drawing on
  const [selected, setSelected] = useState(null);
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null); // wall-clock ms when game starts (end of countdown)
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1 | 0 ("GO!")
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);

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

  // Subscribe to the match channel on mount. Deferred so React StrictMode's dev
  // double-mount can unmount before we touch Supabase Realtime (otherwise the
  // first mount leaks a ghost presence that never clears).
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
        mode: match.mode || "territory",
        onClaim: ({ tileR, tileC, userId: claimerId }) => {
          const key = `${tileR},${tileC}`;
          setTileOwners(prev => {
            if (prev[key]) return prev; // first claim wins — broadcasts are ordered
            return { ...prev, [key]: claimerId };
          });
          // Claiming implicitly clears any reservation on that tile.
          setReservations(prev => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
          });
        },
        onReserve: ({ tileR, tileC, userId: reserverId }) => {
          const key = `${tileR},${tileC}`;
          setReservations(prev => {
            if (prev[key]) return prev; // first reserve wins — broadcasts are ordered
            return { ...prev, [key]: reserverId };
          });
        },
        onUnreserve: ({ tileR, tileC, userId: reserverId }) => {
          const key = `${tileR},${tileC}`;
          setReservations(prev => {
            if (prev[key] !== reserverId) return prev; // only reserver can clear
            const next = { ...prev };
            delete next[key];
            return next;
          });
        },
        onStart: ({ startAt: incomingStartAt }) => {
          // First start broadcast wins — both clients agree because broadcasts are server-ordered.
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

  // Once both players are in the match channel, broadcast a `start` event with
  // a shared wall-clock timestamp. Both clients race to send; first one wins
  // because broadcasts are server-ordered and we only accept the first start
  // we see. This is what keeps the countdown + game timer perfectly in sync
  // even if one client joined a few hundred ms earlier than the other.
  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

  // Unified game clock: derives countdown, GO!, gameStarted, and timeLeft from
  // startAt so both clients are perfectly in sync. A single interval ticks at
  // 200ms for smooth updates on the visible 1s boundary transitions.
  useEffect(() => {
    if (!startAt) return;
    const tick = () => {
      const now = Date.now();
      const msUntilStart = startAt - now;
      if (msUntilStart > 500) {
        setCountdown(Math.ceil(msUntilStart / 1000));
        setGameStarted(false);
      } else if (msUntilStart > -500) {
        setCountdown(0); // "GO!" window
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

  // Keep gameOver ref in sync so the presence-leave handler can read it without stale closure.
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // End conditions: time runs out, all tiles claimed, or opponent quits.
  // endScheduledRef guards against re-running once we've committed to ending,
  // and we deliberately do NOT return a cleanup for the setTimeout — otherwise
  // the effect re-run triggered by setGameOver(true) would clear it before it fires.
  useEffect(() => {
    if (!gameStarted || endScheduledRef.current) return;
    let winnerReason = null;
    if (opponentQuit) winnerReason = "forfeit";
    else if (timeLeft === 0) winnerReason = "time";
    else if (claimedCount === totalClaimable && totalClaimable > 0) winnerReason = "all_claimed";
    if (!winnerReason) return;

    endScheduledRef.current = true;
    setGameOver(true);
    // Give the player a beat to see the full puzzle reveal before transitioning
    // to the result screen. Forfeit is snappier since the banner telegraphs it.
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
      });
    }, delayMs);
  }, [opponentQuit, timeLeft, claimedCount, totalClaimable, gameStarted, myScore, oppScore, onGameEnd, opponent.displayName]);

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
    if (reservations[key]) return; // someone (maybe us) is already drawing on it
    if (!claimableTiles.has(key)) return;
    if (navigator.vibrate) navigator.vibrate(8);
    // Claim the reservation immediately (optimistic) and broadcast it so the
    // opponent sees it highlighted in yellow and can't open the same tile.
    setReservations(prev => ({ ...prev, [key]: myId }));
    channelRef.current?.sendReserve(r, c);
    setSelected({ r, c });
  };

  const handleSheetClose = () => {
    if (!selected) return;
    const key = `${selected.r},${selected.c}`;
    // If we never actually claimed the tile, release the reservation so the
    // opponent (or we) can try again.
    if (!tileOwners[key] && reservations[key] === myId) {
      setReservations(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      channelRef.current?.sendUnreserve(selected.r, selected.c);
    }
    setSelected(null);
  };

  const handleClaim = (r, c) => {
    // Send broadcast — local state updates when we receive the echo (broadcast:self=true).
    channelRef.current?.sendClaim(r, c);
  };

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

  const handleQuitPress = () => {
    // If the game is actually underway, confirm before forfeiting. Otherwise
    // (still waiting for opponent, game over, etc.) go back directly.
    if (opponentPresent && startAt && !gameOver) {
      setConfirmForfeit(true);
    } else {
      onBack();
    }
  };

  // Sheet is "locked" if the tile got claimed OR reserved by someone else
  // (e.g., the opponent beat us to it while we were drawing).
  const selectedLocked = selected && (
    !!tileOwners[`${selected.r},${selected.c}`] ||
    (reservations[`${selected.r},${selected.c}`] && reservations[`${selected.r},${selected.c}`] !== myId)
  );

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100vw" }}>
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
                    const reservedBy = reservations[key];
                    const reservedByMe = !owner && reservedBy === myId;
                    const reservedByOpp = !owner && reservedBy && reservedBy !== myId;
                    const claimable = claimableTiles.has(key);
                    // On game end, reveal all unclaimed claimable tiles in a neutral tone
                    // so the full finished puzzle is visible before the result screen.
                    const revealUnclaimed = gameOver && claimable && !owner;
                    const bg = isMine
                      ? "#DBEAFE"
                      : isTheirs
                      ? "#FEE2E2"
                      : revealUnclaimed
                      ? "#F5F0E8"
                      : reservedByOpp
                      ? "#FEE2E2"
                      : reservedByMe
                      ? "#DBEAFE"
                      : claimable
                      ? "#FFFFFF"
                      : "#F4F4F5";
                    const border = isMine
                      ? "2px solid #3B82F6"
                      : isTheirs
                      ? "2px solid #F43F5E"
                      : revealUnclaimed
                      ? `1px solid #D4D4D8`
                      : reservedByOpp
                      ? "2px dashed #F43F5E"
                      : reservedByMe
                      ? "2px dashed #3B82F6"
                      : claimable
                      ? "1px solid #D4D4D8"
                      : "1px dashed #D4D4D8";
                    const locked = !!owner || !!reservedBy;
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
                          cursor: gameStarted && claimable && !locked && !gameOver ? "pointer" : "default",
                          opacity: claimable ? 1 : 0.55,
                          overflow: "hidden",
                          transition: "background 0.3s, border 0.3s",
                        }}
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

      {/* Waiting overlay — shown until both clients are in the match channel AND
          a synced start time has been agreed on. */}
      {(!opponentPresent || !startAt) && !gameOver && (
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

      {/* Forfeit confirmation modal */}
      {confirmForfeit && (
        <>
          <div
            onClick={() => setConfirmForfeit(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 500,
              background: "rgba(10,6,2,0.72)",
              backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
            }}
          />
          <div
            style={{
              position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
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
