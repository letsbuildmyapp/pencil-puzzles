import { useState, useEffect, useRef, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import TerritoryTileSheet from "./TerritoryTileSheet";
import MiniTilePreview from "../shared/MiniTilePreview";
import { joinTerritoryMatch } from "../../lib/versus";
import { createBotMatchChannel } from "../../lib/versus-bot";

const ROUND_PAUSE_MS = 5000; // 2s "ROUND ENDED" banner + 3s 3-2-1 countdown into the next round
const ROUND_BANNER_MS = 2000;

export default function RowRumbleGame({ match, session, onBack, onGameEnd }) {
  const { puzzle, opponent, matchId } = match;
  const myId = session.userId;

  // Playable rows = rows that have at least one inked cell. Empty rows would
  // be trivially "won" with no drawing, so we skip them entirely.
  const playableRows = useMemo(() => {
    const rows = [];
    for (let r = 0; r < 8; r++) {
      let hasInk = false;
      for (let c = 0; c < 8; c++) {
        if (puzzle.solution[r][c].flat().some(Boolean)) { hasInk = true; break; }
      }
      if (hasInk) rows.push(r);
    }
    return rows;
  }, [puzzle]);
  const totalRounds = playableRows.length;
  const winsNeeded = Math.floor(totalRounds / 2) + 1;

  const [roundIdx, setRoundIdx] = useState(0); // index into playableRows
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [myClaimed, setMyClaimed] = useState(new Set()); // keys "r,c" I've claimed in current row
  const [oppClaimedCount, setOppClaimedCount] = useState(0); // opponent's claim count for current round
  const [roundWinners, setRoundWinners] = useState([]); // index-by-round: "me" | "opp", used to color-code the puzzle overview
  const [selected, setSelected] = useState(null);
  const [opponentPresent, setOpponentPresent] = useState(false);
  const [startAt, setStartAt] = useState(null); // match start (round 0 countdown anchor)
  const [roundStartAt, setRoundStartAt] = useState(null); // current round begins (derived)
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1 | 0
  const [gameStarted, setGameStarted] = useState(false);
  const [roundBanner, setRoundBanner] = useState(null); // { winner: "me"|"opp", round }
  const [gameOver, setGameOver] = useState(false);
  const [opponentQuit, setOpponentQuit] = useState(false);
  const [confirmForfeit, setConfirmForfeit] = useState(false);

  const channelRef = useRef(null);
  const gameOverRef = useRef(false);
  const endScheduledRef = useRef(false);
  // Dedupe row_won events keyed by round — first one received wins.
  const roundResolvedRef = useRef(new Set());
  // Ref mirror of roundIdx so the row_progress handler (set up once at mount)
  // reads the latest value without a stale closure.
  const roundIdxRef = useRef(0);
  useEffect(() => { roundIdxRef.current = roundIdx; }, [roundIdx]);

  const currentRow = totalRounds > 0 ? playableRows[roundIdx] : null;

  // Set of columns in current row that have ink (the ones you must claim).
  const currentRowClaimable = useMemo(() => {
    if (currentRow == null) return new Set();
    const keys = new Set();
    for (let c = 0; c < 8; c++) {
      if (puzzle.solution[currentRow][c].flat().some(Boolean)) keys.add(`${currentRow},${c}`);
    }
    return keys;
  }, [puzzle, currentRow]);

  // When I've claimed every claimable tile in the current row, I win the round.
  // Broadcast row_won with my userId and a shared nextStartAt so both clients
  // begin the next round at the same wall-clock time.
  useEffect(() => {
    if (!gameStarted || gameOver || currentRow == null) return;
    if (roundResolvedRef.current.has(roundIdx)) return;
    if (currentRowClaimable.size === 0) return;
    let allMine = true;
    for (const key of currentRowClaimable) {
      if (!myClaimed.has(key)) { allMine = false; break; }
    }
    if (allMine) {
      const nextStartAt = Date.now() + ROUND_PAUSE_MS;
      channelRef.current?.sendRowWon(roundIdx, nextStartAt);
    }
  }, [myClaimed, currentRowClaimable, gameStarted, gameOver, roundIdx, currentRow]);

  // Subscribe to the match channel on mount.
  useEffect(() => {
    let cancelled = false;
    let ch = null;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const channelOptions = {
        matchId,
        userId: myId,
        botUserId: opponent.userId,
        puzzle,
        mode: "row-rumble",
        onStart: ({ startAt: incomingStartAt }) => {
          setStartAt(prev => prev ?? incomingStartAt);
          setRoundStartAt(prev => prev ?? incomingStartAt);
        },
        onRowWon: ({ round, userId: winnerId, nextStartAt }) => {
          if (roundResolvedRef.current.has(round)) return;
          roundResolvedRef.current.add(round);
          const iWon = winnerId === myId;
          setRoundBanner({ winner: iWon ? "me" : "opp", round });
          if (iWon) setMyScore(s => s + 1);
          else setOppScore(s => s + 1);
          setRoundWinners(prev => {
            const next = [...prev];
            next[round] = iWon ? "me" : "opp";
            return next;
          });
          // Flash the "ROUND ENDED" banner for ROUND_BANNER_MS, then hand off
          // to the unified clock: setting roundStartAt to nextStartAt (which is
          // still in the future at that moment) triggers the 3-2-1 countdown
          // automatically via the clock effect.
          setTimeout(() => {
            setRoundBanner(null);
            setMyClaimed(new Set());
            setOppClaimedCount(0);
            setSelected(null);
            setRoundIdx(prev => prev + 1);
            setRoundStartAt(nextStartAt);
          }, ROUND_BANNER_MS);
        },
        onRowProgress: ({ round, claimedCount, userId: senderId }) => {
          if (senderId === myId) return; // ignore my own echo
          if (round !== roundIdxRef.current) return; // ignore stale rounds
          setOppClaimedCount(claimedCount);
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

  // Broadcast the shared match start time once both clients are in the channel.
  useEffect(() => {
    if (!opponentPresent || startAt) return;
    const timer = setTimeout(() => {
      if (!channelRef.current) return;
      channelRef.current.sendStart(Date.now() + 2500);
    }, 100);
    return () => clearTimeout(timer);
  }, [opponentPresent, startAt]);

  // Unified clock: derive countdown and gameStarted from the current round's start time.
  useEffect(() => {
    if (!roundStartAt) return;
    const tick = () => {
      const now = Date.now();
      const msUntilStart = roundStartAt - now;
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
  }, [roundStartAt]);

  // Keep gameOver ref in sync for the presence-leave handler.
  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);

  // End conditions: someone reaches winsNeeded, rounds exhausted, or forfeit.
  // Also bail if the puzzle somehow had zero playable rows so the match can't hang.
  useEffect(() => {
    if (endScheduledRef.current) return;
    let reason = null;
    let winner = null;
    if (totalRounds === 0) { reason = "rounds"; winner = "tie"; }
    else if (opponentQuit) { reason = "forfeit"; winner = "me"; }
    else if (myScore >= winsNeeded) { reason = "rounds"; winner = "me"; }
    else if (oppScore >= winsNeeded) { reason = "rounds"; winner = "opponent"; }
    else if (roundIdx >= totalRounds) {
      reason = "rounds";
      if (myScore > oppScore) winner = "me";
      else if (oppScore > myScore) winner = "opponent";
      else winner = "tie";
    }
    if (!reason) return;

    endScheduledRef.current = true;
    setGameOver(true);
    const delayMs = reason === "forfeit" ? 1400 : 2000;
    setTimeout(() => {
      onGameEnd({
        winner,
        myScore,
        oppScore,
        opponentName: opponent.displayName,
        reason,
        puzzle,
        mode: "row-rumble",
        totalRounds,
      });
    }, delayMs);
  }, [opponentQuit, myScore, oppScore, roundIdx, totalRounds, winsNeeded, onGameEnd, opponent.displayName, puzzle]);

  const handleTileClick = (c) => {
    if (!gameStarted || gameOver || roundBanner) return;
    if (currentRow == null) return;
    const key = `${currentRow},${c}`;
    if (myClaimed.has(key)) return;
    if (!currentRowClaimable.has(key)) return;
    if (navigator.vibrate) navigator.vibrate(8);
    setSelected({ r: currentRow, c });
  };

  const handleClaim = (r, c) => {
    // Row Rumble claims are local — each player has their own independent row —
    // but we still broadcast a lightweight row_progress event so the opponent
    // sees a live count of how close we are to winning the row.
    const key = `${r},${c}`;
    if (myClaimed.has(key)) return;
    const next = new Set(myClaimed);
    next.add(key);
    setMyClaimed(next);
    channelRef.current?.sendRowProgress(roundIdx, next.size);
  };

  const handleSheetClose = () => setSelected(null);

  const handleQuitPress = () => {
    if (opponentPresent && startAt && !gameOver) {
      setConfirmForfeit(true);
    } else {
      onBack();
    }
  };

  const selectedLocked = false; // no tile-level opponent interaction in Row Rumble

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
        <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 20, letterSpacing: 0.5 }}>🏁 Row Rumble</div>
        <div style={{
          color: "#fff",
          fontFamily: "'Fredoka One',cursive", fontSize: 16, minWidth: 60, textAlign: "right",
        }}>
          {totalRounds > 0 ? `${Math.min(roundIdx + 1, totalRounds)}/${totalRounds}` : ""}
        </div>
      </div>

      {/* Score bar — with live current-round progress for both players */}
      <div style={{ background: C.paper, padding: "10px 14px", display: "flex", alignItems: "stretch", gap: 8, borderBottom: `2px solid ${C.border}`, flexShrink: 0 }}>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #3B82F6, #818CF8)",
            borderRadius: 12, padding: "8px 14px", color: "#fff",
            boxShadow: "0 4px 12px rgba(59,130,246,0.25)",
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700 }}>You</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, lineHeight: 1 }}>{myScore}</div>
            {currentRowClaimable.size > 0 && !roundBanner && (
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>
                · {myClaimed.size}/{currentRowClaimable.size} row
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontFamily: "'Fredoka One',cursive", color: C.muted, fontSize: 12, letterSpacing: 1, textAlign: "center" }}>
          FIRST<br />TO {winsNeeded}
        </div>
        <div
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #F43F5E, #FB923C)",
            borderRadius: 12, padding: "8px 14px", color: "#fff",
            boxShadow: "0 4px 12px rgba(244,63,94,0.25)",
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {opponent.displayName || "Opponent"}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "flex-end" }}>
            {currentRowClaimable.size > 0 && !roundBanner && (
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>
                {oppClaimedCount}/{currentRowClaimable.size} row ·
              </div>
            )}
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, lineHeight: 1 }}>{oppScore}</div>
          </div>
        </div>
      </div>

      {/* Two stacked rows — "YOU" on top (interactive) and opponent below
          (live progress filled left-to-right by oppClaimedCount). Same row,
          two mirrors, so the player can feel the opponent racing them. */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0 12px" }}>
        {currentRow != null && (() => {
          const PAD = 16;
          const tSz = Math.min(Math.floor((Math.min(window.innerWidth, 480) - PAD * 2) / 8), 56);

          // Build a left-to-right fill order across the row's claimable columns
          // so we can show the opponent's progress as tiles filling in from the
          // left, even though we only know their *count*, not which tiles.
          const claimableCols = [];
          for (let ci = 0; ci < 8; ci++) {
            if (currentRowClaimable.has(`${currentRow},${ci}`)) claimableCols.push(ci);
          }
          const oppFilledCols = new Set(claimableCols.slice(0, oppClaimedCount));

          // Neutral cool-gray borders for all unclaimed tiles so nothing reads
          // as "needs filling" except by intent. Row ownership comes from the
          // header label colors and the filled tile colors (blue / red).
          const NEUTRAL_BORDER = "#D4D4D8";
          const NEUTRAL_DASH = "#D4D4D8";

          const renderRow = ({ isMine }) => (
            <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
              {COLS.map((_, ci) => {
                const key = `${currentRow},${ci}`;
                const claimable = currentRowClaimable.has(key);
                const filled = isMine ? myClaimed.has(key) : oppFilledCols.has(ci);
                const accent = isMine ? "#3B82F6" : "#F43F5E";
                const fillBg = isMine ? "#DBEAFE" : "#FEE2E2";
                const bg = filled
                  ? fillBg
                  : claimable
                  ? "#FFFFFF"
                  : "#F4F4F5";
                const border = filled
                  ? `2px solid ${accent}`
                  : claimable
                  ? `2px solid ${NEUTRAL_BORDER}`
                  : `2px dashed ${NEUTRAL_DASH}`;
                return (
                  <div
                    key={ci}
                    onClick={isMine ? () => handleTileClick(ci) : undefined}
                    style={{
                      width: tSz, height: tSz, flexShrink: 0,
                      borderRadius: 10,
                      background: bg,
                      border,
                      boxSizing: "border-box",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: isMine && gameStarted && claimable && !filled && !gameOver && !roundBanner ? "pointer" : "default",
                      opacity: claimable || filled ? 1 : 0.6,
                      boxShadow: isMine && claimable && !filled ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                      transition: "background 0.2s, border 0.2s",
                    }}
                  >
                    {filled && <MiniTilePreview tile={puzzle.solution[currentRow][ci]} />}
                  </div>
                );
              })}
            </div>
          );

          const sectionLabel = (text, color) => (
            <div style={{ textAlign: "center", fontSize: 10, color, letterSpacing: 2, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
              {text}
            </div>
          );

          return (
            <div style={{ flexShrink: 0, padding: `0 ${PAD}px`, width: "100%", maxWidth: 480 }}>
              <div style={{ textAlign: "center", fontSize: 11, color: C.muted, letterSpacing: 3, fontWeight: 800, textTransform: "uppercase", marginBottom: 20 }}>
                Round {roundIdx + 1} · Row {ROWS[currentRow]}
              </div>

              {sectionLabel(`You · ${myClaimed.size}/${currentRowClaimable.size}`, "#3B82F6")}
              {renderRow({ isMine: true })}

              {/* VS divider — separates the two battleground rows */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                margin: "28px 0 22px",
              }}>
                <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2 }} />
                <div style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 16,
                  color: C.muted,
                  letterSpacing: 3,
                  padding: "4px 14px",
                  background: C.paper,
                  border: `2px solid ${C.border}`,
                  borderRadius: 999,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  VS
                </div>
                <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 2 }} />
              </div>

              {sectionLabel(`${opponent.displayName || "Opponent"} · ${oppClaimedCount}/${currentRowClaimable.size}`, "#F43F5E")}
              {renderRow({ isMine: false })}
            </div>
          );
        })()}
      </div>

      {/* Puzzle progress — compact 8×8 mini overview. Rows that have already
          been played reveal their solution tiles; the current row gets an amber
          highlight; future rows stay empty. A thin colored accent on the left
          of each played row shows who won it. */}
      <div style={{
        flexShrink: 0,
        padding: "14px 16px 22px",
        borderTop: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.4)",
      }}>
        <div style={{
          fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
          color: C.muted, fontWeight: 800, textAlign: "center", marginBottom: 10,
        }}>
          Puzzle Progress
        </div>
        {(() => {
          const miniTSz = 22;
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {ROWS.map((rowLabel, ri) => {
                const roundForRow = playableRows.indexOf(ri);
                const isPlayable = roundForRow !== -1;
                // Only rounds that have actually been *completed* show tiles
                // in the overview — strictly historical. Current and future
                // rounds remain empty placeholders.
                const isPast = isPlayable && roundForRow < roundIdx;
                const revealed = isPast || gameOver;
                const winner = isPast ? roundWinners[roundForRow] : null;
                const accentColor =
                  winner === "me" ? "#3B82F6" :
                  winner === "opp" ? "#F43F5E" :
                  "transparent";
                return (
                  <div key={rowLabel} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{
                      width: 3, height: miniTSz,
                      background: accentColor,
                      borderRadius: 2,
                    }} />
                    {COLS.map((_, ci) => {
                      const tile = puzzle.solution[ri][ci];
                      const tileHasInk = tile.flat().some(Boolean);
                      const show = revealed && tileHasInk;
                      const border = revealed
                        ? `1px solid ${C.border}`
                        : `1px dashed ${C.border}`;
                      return (
                        <div
                          key={ci}
                          style={{
                            width: miniTSz, height: miniTSz,
                            background: "transparent",
                            border,
                            borderRadius: 3,
                            boxSizing: "border-box",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: revealed ? 1 : 0.35,
                          }}
                        >
                          {show && <MiniTilePreview tile={tile} />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* Tile sheet */}
      {selected && gameStarted && !gameOver && !roundBanner && (
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
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏁</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Connecting to opponent…</div>
          <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.12)", borderTop: "3px solid #10B981", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginTop: 18 }} />
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
            key={`${roundIdx}-${countdown}`}
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: countdown === 0 ? 110 : 150,
              color: countdown === 0 ? "#FBBF24" : "#fff",
              textShadow: "0 10px 50px rgba(16,185,129,0.7)",
              animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1)",
              letterSpacing: 2,
            }}
          >
            {countdown === 0 ? "GO!" : countdown}
          </div>
        </div>
      )}

      {/* Round banner */}
      {roundBanner && !gameOver && (
        <div
          style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            zIndex: 380,
            background: roundBanner.winner === "me"
              ? "linear-gradient(135deg,#16A34A,#4ADE80)"
              : "linear-gradient(135deg,#F43F5E,#FB923C)",
            color: "#fff", padding: "28px 44px", borderRadius: 24,
            fontFamily: "'Fredoka One',cursive", letterSpacing: 0.5,
            boxShadow: "0 18px 60px rgba(0,0,0,0.4)", textAlign: "center",
            animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1)",
            minWidth: 260,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 6, lineHeight: 1 }}>
            {roundBanner.winner === "me" ? "🏆" : "💔"}
          </div>
          <div style={{
            fontSize: 12, letterSpacing: 4, fontWeight: 900, opacity: 0.9,
            fontFamily: "'Nunito',sans-serif", textTransform: "uppercase",
            marginBottom: 6,
          }}>
            Round {roundBanner.round + 1} Ended
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.1 }}>
            {roundBanner.winner === "me"
              ? "YOU WIN!"
              : `${(opponent.displayName || "Opponent").toUpperCase()} WINS`}
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
