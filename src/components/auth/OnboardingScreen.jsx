import { useState } from "react";
import { C } from "../../constants";

const slides = [
  {
    icon: "✏️",
    title: "Welcome to\nPencil Puzzles",
    body: "Reveal hidden pixel art by filling in tiles on an 8×8 grid. Simple to learn, satisfying to master.",
  },
  {
    icon: "🧩",
    title: "Tap, draw,\nsubmit",
    body: "Tap a cell to open it. Fill in the pixels to match the reference pattern, then hit Submit. Get it right and the cell locks in!",
  },
  {
    icon: "🕯",
    title: "Follow\nthe riddle",
    body: "Every puzzle has a riddle at the bottom that hints at the hidden image. Use it to guide which cells to fill.",
  },
  {
    icon: "🔥",
    title: "Play every day",
    body: "A free Daily Puzzle drops each day. Come back daily to keep your streak alive!",
  },
];

export default function OnboardingScreen({ onContinue }) {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  const isLast = slide === slides.length - 1;
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px", fontFamily: "'Nunito',sans-serif" }}>
      {/* Dots */}
      <div style={{ display: "flex", gap: 8, position: "absolute", top: 64 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 4, background: i === slide ? C.accent : C.border, transition: "all 0.3s ease" }} />
        ))}
      </div>
      {/* Content */}
      <div style={{ textAlign: "center", maxWidth: 340, width: "100%" }}>
        <div style={{ fontSize: 80, marginBottom: 28, lineHeight: 1 }}>{s.icon}</div>
        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 32, color: C.ink, marginBottom: 16, lineHeight: 1.25, whiteSpace: "pre-line", letterSpacing: 0.3 }}>{s.title}</div>
        <div style={{ fontSize: 17, color: C.inkMid, lineHeight: 1.7, fontWeight: 600 }}>{s.body}</div>
      </div>
      {/* Buttons */}
      <div style={{ position: "absolute", bottom: 48, left: 28, right: 28, display: "flex", gap: 10 }}>
        {slide > 0 && (
          <button onClick={() => setSlide(s => s - 1)} style={{ flex: 1, padding: "16px 0", background: C.paper, color: C.muted, border: `2px solid ${C.border}`, borderRadius: 14, fontFamily: "'Fredoka One',cursive", fontSize: 15, letterSpacing: 1, cursor: "pointer" }}>Back</button>
        )}
        <button onClick={() => isLast ? onContinue() : setSlide(s => s + 1)} style={{ flex: 2, padding: "16px 0", background: isLast ? C.correct : "linear-gradient(135deg, #C026D3, #818CF8)", color: "#fff", border: "none", borderRadius: 14, fontFamily: "'Fredoka One',cursive", fontSize: 17, letterSpacing: 0.5, cursor: "pointer", boxShadow: isLast ? "0 6px 24px rgba(34,197,94,0.35)" : "0 6px 24px rgba(168,85,247,0.35)" }}>
          {isLast ? "Let's Go!" : "Next"}
        </button>
      </div>
    </div>
  );
}
