import { useState } from "react";
import { C } from "../../constants";

export default function RiddleBanner({ riddle, revealed, onReveal }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div style={{ margin: "0 12px calc(env(safe-area-inset-bottom, 0px) + 20px)", background: C.sheetBg, borderRadius: 16, padding: "14px 18px", border: `2px solid ${C.border}`, boxShadow: C.shadowMd, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: C.gold, fontFamily: "'Nunito',sans-serif", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
          🕯 Riddle
        </div>
        {revealed ? (
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontStyle: "italic", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {riddle}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontStyle: "italic", flex: 1 }}>
              Need a hint? Revealing the riddle will cut your final score in half.
            </div>
            <button onClick={() => setShowConfirm(true)} style={{ background: "linear-gradient(135deg, #C026D3, #818CF8)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontFamily: "'Fredoka One',cursive", fontSize: 12, letterSpacing: 0.5, cursor: "pointer", flexShrink: 0, boxShadow: "0 2px 10px rgba(168,85,247,0.4)" }}>
              Reveal
            </button>
          </div>
        )}
      </div>
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 320, background: "rgba(12,8,4,0.85)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.paper, borderRadius: 16, padding: "32px 28px", maxWidth: 320, width: "85%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🕯</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, marginBottom: 8 }}>Reveal Riddle?</div>
            <div style={{ fontSize: 14, color: C.muted, fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>Your final score will be <span style={{ color: "#EF4444", fontWeight: 900 }}>cut in half</span>. Are you sure?</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: "14px 0", background: "none", color: C.muted, border: `2px solid ${C.border}`, borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer" }}>CANCEL</button>
              <button onClick={() => { setShowConfirm(false); onReveal(); }} style={{ flex: 1, padding: "14px 0", background: "linear-gradient(135deg, #C026D3, #818CF8)", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer", boxShadow: "0 4px 14px rgba(168,85,247,0.4)" }}>REVEAL</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
