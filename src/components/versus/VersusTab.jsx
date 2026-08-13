import { C } from "../../constants";

const MODES = [
  {
    id: "territory",
    title: "Territory Battle",
    icon: "⚔️",
    tagline: "Race to claim tiles on a shared puzzle. Whoever owns the most wins!",
    gradient: "linear-gradient(135deg, #F43F5E 0%, #C026D3 50%, #818CF8 100%)",
    glow: "0 10px 32px rgba(192,38,211,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
  {
    id: "survival",
    title: "Survival",
    icon: "❤️",
    tagline: "3 lives each. Solve a tile to heal yourself, or strike your opponent once you're at full health. First to 0 loses.",
    gradient: "linear-gradient(135deg, #BE123C 0%, #E11D48 50%, #F87171 100%)",
    glow: "0 10px 32px rgba(225,29,72,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
  {
    id: "chess-clock",
    title: "Chess Clock",
    icon: "⏱️",
    tagline: "3 minutes each. Your clock ticks while the tile sheet is open. Run out → lose. Finish first → win.",
    gradient: "linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #A855F7 100%)",
    glow: "0 10px 32px rgba(6,182,212,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
  {
    id: "row-rumble",
    title: "Row Rumble",
    icon: "🏁",
    tagline: "8 rounds, one row per round. First to win 5 rows takes the match.",
    gradient: "linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)",
    glow: "0 10px 32px rgba(16,185,129,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
  {
    id: "mirror",
    title: "Mirror Match",
    icon: "🪞",
    tagline: "Paint the same picture together. Whoever colors more tiles wins the mosaic.",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)",
    glow: "0 10px 32px rgba(139,92,246,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
  {
    id: "sabotage",
    title: "Sabotage",
    icon: "💣",
    tagline: "Race solo on your own puzzle. Complete a row to knock out one of your opponent's tiles!",
    gradient: "linear-gradient(135deg, #7C2D12 0%, #DC2626 50%, #F59E0B 100%)",
    glow: "0 10px 32px rgba(220,38,38,0.4)",
    ctaBg: "#FBBF24",
    ctaShadow: "0 4px 14px rgba(251,191,36,0.5)",
  },
];

export default function VersusTab({ onStartVersus }) {
  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>
        ⚔️ Player vs Player
      </div>

      {MODES.map((m) => (
        <div
          key={m.id}
          onClick={() => onStartVersus(m.id)}
          className="puzzle-card"
          style={{
            background: m.gradient,
            borderRadius: 24,
            padding: "26px 22px",
            marginBottom: 16,
            boxShadow: m.glow,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -20, right: -20, fontSize: 140, opacity: 0.12 }}>{m.icon}</div>
          <div style={{ position: "relative" }}>
            <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 28, letterSpacing: 0.5, marginBottom: 6 }}>
              {m.title}
            </div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 600, lineHeight: 1.5, marginBottom: 18 }}>
              {m.tagline}
            </div>
            <div
              style={{
                background: m.ctaBg,
                color: "#2D1B69",
                borderRadius: 14,
                padding: "13px 20px",
                fontSize: 17,
                fontWeight: 900,
                fontFamily: "'Fredoka One',cursive",
                textAlign: "center",
                letterSpacing: 0.5,
                boxShadow: m.ctaShadow,
              }}
            >
              {m.icon} FIND MATCH
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 18, marginBottom: 8, fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: 1 }}>
        ✨ More PvP modes coming soon
      </div>
    </div>
  );
}
