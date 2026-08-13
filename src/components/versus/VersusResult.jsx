import { C } from "../../constants";
import Confetti from "../shared/Confetti";
import SolutionPreview from "../shared/SolutionPreview";

export default function VersusResult({ result, onPlayAgain, onBack }) {
  const {
    winner, myScore, oppScore, opponentName, reason, puzzle, mode,
    xpEarned = 0, leveledUp = false, newLevel, prevLevel,
    matchBonusCredit = 0, winBonusCredit = 0,
  } = result;
  const totalCreditsEarned = matchBonusCredit + winBonusCredit;
  const isWin = winner === "me";
  const isTie = winner === "tie";
  const isRowRumble = mode === "row-rumble";
  const isSurvival = mode === "survival";
  const isChessClock = mode === "chess-clock";

  const title = isWin ? "Victory!" : isTie ? "Draw!" : "Defeat";
  const emoji = isWin ? "🏆" : isTie ? "🤝" : "😔";
  const titleColor = isWin ? "#22C55E" : isTie ? "#FBBF24" : "#F43F5E";

  const subtitle =
    reason === "forfeit"
      ? "Opponent forfeited"
      : reason === "time"
      ? "Time's up!"
      : reason === "rounds"
      ? "Match complete"
      : reason === "completed"
      ? "You finished the puzzle!"
      : reason === "opponent_completed"
      ? "Opponent finished first"
      : reason === "dead"
      ? "You ran out of hearts"
      : reason === "opponent_dead"
      ? "Opponent ran out of hearts"
      : reason === "both_completed"
      ? "Both finished together"
      : reason === "both_dead"
      ? "Both ran out of hearts"
      : reason === "finish"
      ? "You solved it first!"
      : reason === "opponent_finish"
      ? "Opponent solved it first"
      : reason === "timeout"
      ? "Your clock ran out"
      : reason === "opponent_timeout"
      ? "Opponent's clock ran out"
      : reason === "decided"
      ? "Match decided early!"
      : "All tiles claimed";

  const unitLabel = isRowRumble
    ? "rounds"
    : isSurvival
    ? "hearts"
    : isChessClock
    ? "sec left"
    : "tiles";

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {isWin && <Confetti />}
      <div
        style={{
          background: C.paper,
          borderRadius: 24,
          padding: "40px 32px",
          maxWidth: 380,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
          animation: "celebrationPop 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ fontSize: 84, marginBottom: 10 }}>{emoji}</div>
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 40,
            color: titleColor,
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>
          {subtitle}
        </div>

        {puzzle && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
            <SolutionPreview puzzle={puzzle} size={96} />
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 15, color: C.ink, marginTop: 8, letterSpacing: 0.3 }}>
              {puzzle.title}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <div
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #3B82F6, #818CF8)",
              borderRadius: 16,
              padding: "16px 10px",
              color: "#fff",
              boxShadow: "0 6px 18px rgba(59,130,246,0.3)",
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>You</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 38, lineHeight: 1 }}>{myScore}</div>
            <div style={{ fontSize: 10, opacity: 0.8, fontWeight: 600, marginTop: 4 }}>{unitLabel}</div>
          </div>
          <div
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #F43F5E, #FB923C)",
              borderRadius: 16,
              padding: "16px 10px",
              color: "#fff",
              boxShadow: "0 6px 18px rgba(244,63,94,0.3)",
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.85, textTransform: "uppercase", fontWeight: 700, marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {opponentName || "Opponent"}
            </div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 38, lineHeight: 1 }}>{oppScore}</div>
            <div style={{ fontSize: 10, opacity: 0.8, fontWeight: 600, marginTop: 4 }}>{unitLabel}</div>
          </div>
        </div>

        {/* Rewards earned from this match — credits on the left, XP on the right.
            Leveled-up games get an extra celebration line above. */}
        {(totalCreditsEarned > 0 || xpEarned > 0) && (
          <>
            {leveledUp && (
              <div style={{
                background: "linear-gradient(135deg,#FBBF24,#F97316)",
                color: "#fff",
                borderRadius: 12,
                padding: "8px 14px",
                marginBottom: 10,
                fontFamily: "'Fredoka One',cursive",
                fontSize: 14,
                letterSpacing: 0.5,
                textAlign: "center",
                boxShadow: "0 4px 14px rgba(251,191,36,0.4)",
              }}>
                ⭐ LEVEL UP! Now Level {newLevel}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              {totalCreditsEarned > 0 && (
                <div style={{
                  flex: 1,
                  background: C.surface,
                  border: `2px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 2 }}>
                    Credits
                  </div>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: "#F59E0B", lineHeight: 1 }}>
                    +{totalCreditsEarned}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, fontWeight: 600, marginTop: 2 }}>
                    {matchBonusCredit && winBonusCredit
                      ? "1st match + 1st win"
                      : matchBonusCredit
                      ? "1st match today"
                      : "1st win today"}
                  </div>
                </div>
              )}
              {xpEarned > 0 && (
                <div style={{
                  flex: 1,
                  background: C.surface,
                  border: `2px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 2 }}>
                    XP
                  </div>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: "#6366F1", lineHeight: 1 }}>
                    +{xpEarned}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, fontWeight: 600, marginTop: 2 }}>
                    Level {newLevel}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <button
          onClick={onPlayAgain}
          style={{
            width: "100%",
            padding: "16px 0",
            background: "linear-gradient(135deg, #C026D3, #818CF8)",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontFamily: "'Fredoka One',cursive",
            fontSize: 18,
            letterSpacing: 0.5,
            cursor: "pointer",
            boxShadow: "0 6px 24px rgba(192,38,211,0.4)",
            marginBottom: 10,
          }}
        >
          ⚔ Play Again
        </button>
        <button
          onClick={onBack}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "none",
            color: C.muted,
            border: `2px solid ${C.border}`,
            borderRadius: 14,
            fontFamily: "'Nunito',sans-serif",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 2,
            cursor: "pointer",
          }}
        >
          BACK TO MENU
        </button>
      </div>
    </div>
  );
}
