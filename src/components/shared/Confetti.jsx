import { C } from "../../constants";

const pieces = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 1.5,
  dur: 2 + Math.random() * 2,
  color: [C.accent, C.gold, C.correct, "#E8D5A3", C.accentLight][Math.floor(Math.random() * 5)],
  size: 5 + Math.random() * 9,
  round: Math.random() > 0.5,
}));

export default function Confetti() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.left}%`, top: -20,
          width: p.size, height: p.size, background: p.color,
          borderRadius: p.round ? "50%" : 2,
          animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}
