import { useState } from "react";
import { C } from "../../constants";

const slides = [
  { icon: "✏️", title: "Welcome to\nPencil Puzzles", body: "Fill in pixel mosaics tile by tile to reveal a hidden image. Simple to learn, satisfying to master." },
  { icon: "🔲", title: "How it works", body: "The canvas is split into an 8×8 grid. Tap any cell to open its 5×5 drawing tile. Fill in the pattern to match the reference." },
  { icon: "🕯", title: "Use the riddle", body: "Every puzzle comes with a riddle hint. Reveal it when you're stuck — or challenge yourself to solve it blind." },
  { icon: "🔥", title: "Build your streak", body: "A new Daily Puzzle drops every day. Come back each day to keep your streak alive and climb the ranks." },
];

export default function OnboardingScreen({ onContinue }) {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  const isLast = slide === slides.length - 1;
  return (
    <div style={{ minHeight: "100vh", background: C.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, fontFamily: "'Courier Prime',monospace", backgroundImage: "radial-gradient(ellipse at 50% 20%, rgba(212,96,26,0.18) 0%, transparent 60%)" }}>
      <div style={{ display: "flex", gap: 6, position: "absolute", top: 56 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: i === slide ? 22 : 6, height: 6, borderRadius: 3, background: i === slide ? C.accent : "rgba(255,255,255,0.15)", transition: "all 0.3s ease" }} />
        ))}
      </div>
      <div style={{ textAlign: "center", maxWidth: 320, width: "100%" }}>
        <div style={{ fontSize: 72, marginBottom: 24, lineHeight: 1 }}>{s.icon}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: "#F5F0E8", marginBottom: 16, lineHeight: 1.2, whiteSpace: "pre-line" }}>{s.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 48 }}>{s.body}</div>
      </div>
      <div style={{ position: "absolute", bottom: 48, left: 32, right: 32, display: "flex", gap: 10 }}>
        {slide > 0 && (
          <button onClick={() => setSlide(s => s - 1)} style={{ flex: 1, padding: "14px 0", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, fontFamily: "'Courier Prime',monospace", fontSize: 12, letterSpacing: 2, cursor: "pointer" }}>BACK</button>
        )}
        <button onClick={() => isLast ? onContinue() : setSlide(s => s + 1)} style={{ flex: 2, padding: "14px 0", background: isLast ? C.correct : C.accent, color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Courier Prime',monospace", fontSize: 12, fontWeight: "bold", letterSpacing: 2, cursor: "pointer", boxShadow: isLast ? "0 4px 20px rgba(58,125,68,0.4)" : "0 4px 20px rgba(212,96,26,0.4)" }}>
          {isLast ? "GET STARTED →" : "NEXT"}
        </button>
      </div>
    </div>
  );
}
