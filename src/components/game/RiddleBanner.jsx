import { C } from "../../constants";

export default function RiddleBanner({ riddle }) {
  return (
    <div style={{ margin: "0 12px 12px", background: C.sheetBg, borderRadius: 16, padding: "14px 18px", border: `2px solid ${C.border}`, boxShadow: C.shadowMd, flexShrink: 0 }}>
      <div style={{ fontSize: 11, color: C.gold, fontFamily: "'Nunito',sans-serif", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
        🕯 Riddle
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", fontFamily: "'Nunito',sans-serif", fontWeight: 600, fontStyle: "italic", lineHeight: 1.7, whiteSpace: "pre-line" }}>
        {riddle}
      </div>
    </div>
  );
}
