import { useEffect, useRef } from "react";
import { C } from "../../constants";

export default function Timer({ running, secs, onTick }) {
  const ref = useRef(null);
  useEffect(() => {
    if (running) ref.current = setInterval(() => onTick(s => s + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div style={{ background: C.accentLight, borderRadius: 8, padding: "4px 12px", color: C.accentText, fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 600, letterSpacing: 2, border: `1px solid ${C.accent}22` }}>
      {m}:{s}
    </div>
  );
}
