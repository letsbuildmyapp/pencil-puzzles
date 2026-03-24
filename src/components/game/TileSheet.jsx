import { useState, useEffect } from "react";
import { C, ROWS, COLS } from "../../constants";
import DrawGrid from "./DrawGrid";

export default function TileSheet({ sel, puzzle, userGrid, onClose, onPaint, onClear, onNavigate, onSubmit }) {
  const [closing, setClosing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  useEffect(() => { setShowFeedback(false); }, [sel.r, sel.c]);

  const getPrev = () => { const { r, c } = sel; return c > 0 ? { r, c: c - 1 } : r > 0 ? { r: r - 1, c: 7 } : { r: 7, c: 7 }; };
  const getNext = () => { const { r, c } = sel; return c < 7 ? { r, c: c + 1 } : r < 7 ? { r: r + 1, c: 0 } : { r: 0, c: 0 }; };

  const refTile = puzzle.solution[sel.r][sel.c];
  const userTile = userGrid[sel.r][sel.c];
  const hasTileInk = refTile.flat().some(Boolean);
  const inkCount = refTile.flat().filter(Boolean).length;
  const filledCount = userTile.flat().filter(Boolean).length;
  const isTileDone = refTile.flat().every((v, i) => v === userTile.flat()[i]);

  const handleSubmit = () => {
    if (isTileDone) {
      onSubmit(sel.r, sel.c);
      setClosing(true);
      setTimeout(onClose, 300);
    } else {
      setShowFeedback(true);
      if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
    }
  };

  const handleClose = () => { setClosing(true); setTimeout(onClose, 300); };

  const handleNav = (next) => {
    if (isTileDone || !hasTileInk) {
      onSubmit(sel.r, sel.c);
      onNavigate(next);
    } else {
      setShowFeedback(true);
      if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
    }
  };

  return (
    <>
      <div onClick={handleClose} style={{ position: "fixed", inset: 0, background: "rgba(10,6,2,0.72)", zIndex: 50, animation: "backdropIn 0.22s ease forwards", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }} />
      <div style={{
        position: "fixed", left: 0, right: 0, bottom: 0, height: "82%",
        background: C.sheetBg, borderRadius: "22px 22px 0 0", zIndex: 51,
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: closing ? "sheetDown 0.28s cubic-bezier(0.4,0,1,1) forwards" : "sheetUp 0.38s cubic-bezier(0.16,1,0.3,1) forwards",
        boxShadow: "0 -12px 50px rgba(0,0,0,0.55)",
      }}>
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 2, flexShrink: 0 }}>
          <div style={{ width: 44, height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 2 }} />
        </div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, color: "#F5F0E8", letterSpacing: 1, lineHeight: 1 }}>
            Cell&nbsp;<span style={{ color: C.accentLight }}>{ROWS[sel.r]}{COLS[sel.c]}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {hasTileInk && isTileDone && (
              <div style={{ background: C.correct, color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 10, fontFamily: "'Courier Prime',monospace", fontWeight: "bold", letterSpacing: 2, display: "flex", alignItems: "center", gap: 5 }}>
                <span>✓</span><span>PERFECT</span>
              </div>
            )}
            <button onClick={handleClose} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: 8, padding: "6px 12px", fontFamily: "'Courier Prime',monospace", fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>✕</button>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 20px", gap: 14 }}>
          {/* Reference tile */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", maxWidth: 320, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,16px)", gridTemplateRows: "repeat(5,16px)", gap: 2, flexShrink: 0 }}>
              {refTile.flat().map((v, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: 2, background: v ? "#E8D5A3" : "rgba(255,255,255,0.03)" }} />
              ))}
            </div>
            <div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: "'Courier Prime',monospace", letterSpacing: 3, textTransform: "uppercase", marginBottom: 3 }}>Reference</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'Courier Prime',monospace", lineHeight: 1.5 }}>
                {hasTileInk ? <><span style={{ color: C.gold, fontWeight: "bold" }}>{inkCount}</span> cells to fill</> : <span style={{ color: "rgba(255,255,255,0.3)" }}>Leave this tile blank</span>}
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "'Courier Prime',monospace", marginTop: 2 }}>
                {filledCount} / {inkCount} filled
              </div>
            </div>
          </div>
          <DrawGrid userTile={userTile} refTile={refTile} showFeedback={showFeedback} onPaint={(py, px, mode) => onPaint(sel.r, sel.c, py, px, mode)} />
          {showFeedback && !isTileDone && (
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier Prime',monospace", letterSpacing: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(244,63,94,0.35)", border: "1.5px solid #F43F5E" }} />
                <span>ERASE THIS</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Courier Prime',monospace", letterSpacing: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(251,191,36,0.22)", border: "1.5px dashed #FBBF24" }} />
                <span>FILL THIS IN</span>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onClear(sel.r, sel.c)} style={{ padding: "11px 18px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}>CLEAR</button>
            <button className="submit-btn" onClick={handleSubmit} style={{
              flex: 1, padding: "11px 0",
              background: showFeedback && !isTileDone ? C.wrong : C.correct,
              color: "#fff", border: "none", borderRadius: 8,
              fontFamily: "'Courier Prime',monospace", fontSize: 12, fontWeight: "bold", letterSpacing: 2, cursor: "pointer",
              boxShadow: showFeedback && !isTileDone ? "0 4px 14px rgba(244,63,94,0.4)" : "0 4px 14px rgba(58,125,68,0.4)",
              transition: "background 0.2s, box-shadow 0.2s",
            }}>
              {showFeedback && !isTileDone ? "✗ NOT QUITE" : "✓ SUBMIT"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "space-between", alignItems: "center" }}>
            <button className="nav-btn" onClick={() => handleNav(getPrev())} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.4)", borderRadius: 7, padding: "7px 0", fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer", textAlign: "center" }}>◀ PREV</button>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", fontFamily: "'Courier Prime',monospace", letterSpacing: 1, whiteSpace: "nowrap" }}>{ROWS[sel.r]}{COLS[sel.c]}</div>
            <button className="nav-btn" onClick={() => handleNav(getNext())} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.4)", borderRadius: 7, padding: "7px 0", fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer", textAlign: "center" }}>NEXT ▶</button>
          </div>
        </div>
      </div>
    </>
  );
}
