import { C } from "../../constants";

// Shown the first time the user lands on the authenticated "app" stage each
// calendar day, when the streak credit bonus was actually granted.
export default function DailyLoginBonusModal({ bonus, onDismiss }) {
  if (!bonus) return null;
  const { credits, streak } = bonus;

  // Tier label tracks the streak reward curve from pvpRewards.js
  const tier = streak >= 7 ? "🔥 On fire!" : streak >= 4 ? "⚡ Heating up" : "👋 Welcome back";

  return (
    <>
      <div
        onClick={onDismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(10,6,2,0.72)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          zIndex: 1001,
          background: C.paper,
          borderRadius: 24,
          padding: "32px 28px 24px",
          width: "calc(100vw - 48px)", maxWidth: 340,
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          fontFamily: "'Nunito',sans-serif",
          textAlign: "center",
          animation: "celebrationPop 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 8, lineHeight: 1 }}>🎁</div>
        <div style={{
          fontSize: 11, letterSpacing: 3, fontWeight: 900,
          color: C.muted, textTransform: "uppercase", marginBottom: 4,
        }}>
          Daily Login Bonus
        </div>
        <div style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: 28,
          color: C.ink,
          letterSpacing: 0.3,
          marginBottom: 2,
        }}>
          Day {streak} Streak
        </div>
        <div style={{ fontSize: 13, color: C.muted, fontWeight: 700, marginBottom: 20 }}>
          {tier}
        </div>

        <div style={{
          background: "linear-gradient(135deg, #FBBF24, #F97316)",
          borderRadius: 16,
          padding: "16px 14px",
          color: "#fff",
          marginBottom: 22,
          boxShadow: "0 6px 20px rgba(251,191,36,0.4)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.9, fontWeight: 800, textTransform: "uppercase" }}>
            Credits Earned
          </div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 42, lineHeight: 1, marginTop: 4 }}>
            +{credits}
          </div>
        </div>

        <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 18, lineHeight: 1.5 }}>
          {streak < 4
            ? "Log in 4 days in a row to earn +2 per day."
            : streak < 7
            ? "3 more days for +3 credits every day!"
            : "Keep it up! Max streak bonus unlocked."}
        </div>

        <button
          onClick={onDismiss}
          style={{
            width: "100%",
            padding: "14px 0",
            background: "linear-gradient(135deg, #C026D3, #818CF8)",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontFamily: "'Fredoka One',cursive",
            fontSize: 16,
            letterSpacing: 0.5,
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(192,38,211,0.35)",
          }}
        >
          Let's Go!
        </button>
      </div>
    </>
  );
}
