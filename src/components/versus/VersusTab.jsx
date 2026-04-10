import { C } from "../../constants";

export default function VersusTab({ onStartVersus }) {
  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>
        ⚔️ Player vs Player
      </div>

      {/* Hero card / Find Match button */}
      <div
        onClick={onStartVersus}
        className="puzzle-card"
        style={{
          background: "linear-gradient(135deg, #F43F5E 0%, #C026D3 50%, #818CF8 100%)",
          borderRadius: 24,
          padding: "26px 22px",
          marginBottom: 22,
          boxShadow: "0 10px 32px rgba(192,38,211,0.4)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 140, opacity: 0.12 }}>⚔️</div>
        <div style={{ position: "relative" }}>
          <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 28, letterSpacing: 0.5, marginBottom: 6 }}>
            Territory Battle
          </div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600, lineHeight: 1.5, marginBottom: 18 }}>
            Race a real opponent to claim tiles on a shared puzzle. Whoever owns the most wins!
          </div>
          <div
            style={{
              background: "#FBBF24",
              color: "#2D1B69",
              borderRadius: 14,
              padding: "13px 20px",
              fontSize: 17,
              fontWeight: 900,
              fontFamily: "'Fredoka One',cursive",
              textAlign: "center",
              letterSpacing: 0.5,
              boxShadow: "0 4px 14px rgba(251,191,36,0.5)",
            }}
          >
            ⚔️ FIND MATCH
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>
        How it works
      </div>
      <div style={{ background: C.paper, border: `2px solid ${C.border}`, borderRadius: 20, padding: "18px 18px 6px", boxShadow: C.shadowMd }}>
        {[
          { n: "1", t: "Get Instantly Matched", d: "Tap Find Match and you'll be auto-paired with another player — no room codes." },
          { n: "2", t: "Race to Claim Tiles", d: "Both players share one puzzle. Solve a tile correctly to claim it in your color." },
          { n: "3", t: "Most Tiles Wins", d: "When the grid is full, whoever owns the most tiles is crowned the champion!" },
        ].map(({ n, t, d }) => (
          <div key={n} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#C026D3,#818CF8)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontFamily: "'Fredoka One',cursive",
                flexShrink: 0,
                fontSize: 15,
                boxShadow: "0 4px 10px rgba(192,38,211,0.3)",
              }}
            >
              {n}
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 15, color: C.ink, marginBottom: 2, letterSpacing: 0.2 }}>{t}</div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, lineHeight: 1.5 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 18, marginBottom: 8, fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1 }}>
        ✨ More PvP modes coming soon
      </div>
    </div>
  );
}
