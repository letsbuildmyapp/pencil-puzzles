import { useState, useEffect, useRef } from "react";
import { C, ROWS, COLS } from "../../constants";
import DrawGrid from "../game/DrawGrid";

// Survival tile sheet: wrong submissions cost a heart and keep the sheet open.
// Drawing is persisted in the parent's userGrid so closing/reopening a tile
// doesn't wipe in-progress work.
export default function SurvivalTileSheet({
  sel,
  puzzle,
  userTile,
  onPaint,
  onClear,
  onCorrect,
  onWrong,
  onClose,
  heartsLeft,
}) {
  const [closing, setClosing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctFlash, setCorrectFlash] = useState(false);
  const [heartShake, setHeartShake] = useState(false);
  const feedbackTimer = useRef(null);

  const refTile = puzzle.solution[sel.r][sel.c];
  const inkCount = refTile.flat().filter(Boolean).length;
  const filledCount = userTile.flat().filter(Boolean).length;
  const isTileDone = refTile.flat().every((v, i) => v === userTile.flat()[i]);

  useEffect(() => () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); }, []);

  const handlePaint = (py, px, mode) => onPaint(sel.r, sel.c, py, px, mode);

  const clearFeedback = () => {
    if (showFeedback) setShowFeedback(false);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
  };

  const handleSubmit = () => {
    if (correctFlash) return;
    if (isTileDone) {
      setCorrectFlash(true);
      setShowFeedback(true);
      if (navigator.vibrate) navigator.vibrate([12, 40, 12]);
      feedbackTimer.current = setTimeout(() => {
        onCorrect(sel.r, sel.c);
        setClosing(true);
        setTimeout(onClose, 280);
      }, 400);
    } else {
      setShowFeedback(true);
      setHeartShake(true);
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
      feedbackTimer.current = setTimeout(() => setShowFeedback(false), 1800);
      setTimeout(() => setHeartShake(false), 600);
      onWrong();
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const heartRow = Array.from({ length: 3 }, (_, i) => i < heartsLeft);

  return (
    <>
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(10,6,2,0.72)", zIndex: 50,
          animation: "backdropIn 0.22s ease forwards",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, height: "82%",
          background: C.sheetBg, borderRadius: "22px 22px 0 0", zIndex: 51,
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: closing
            ? "sheetDown 0.28s cubic-bezier(0.4,0,1,1) forwards"
            : "sheetUp 0.38s cubic-bezier(0.16,1,0.3,1) forwards",
          boxShadow: "0 -12px 50px rgba(0,0,0,0.55)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 2, flexShrink: 0 }}>
          <div style={{ width: 44, height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 2 }} />
        </div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, fontWeight: 900, color: "#F5F0E8", letterSpacing: 1, lineHeight: 1 }}>
            Cell&nbsp;<span style={{ color: C.accentLight }}>{ROWS[sel.r]}{COLS[sel.c]}</span>
          </div>
          <div
            style={{
              display: "flex", gap: 3, alignItems: "center",
              animation: heartShake ? "tile-shake 0.5s" : "none",
            }}
          >
            {heartRow.map((alive, i) => (
              <span key={i} style={{ fontSize: 18, opacity: alive ? 1 : 0.2, filter: alive ? "none" : "grayscale(1)" }}>
                {alive ? "❤️" : "🖤"}
              </span>
            ))}
            <button
              onClick={handleClose}
              style={{
                marginLeft: 8,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.4)", borderRadius: 8, padding: "6px 12px",
                fontFamily: "'Nunito',sans-serif", fontSize: 11, cursor: "pointer", letterSpacing: 1,
              }}
            >
              ✕
            </button>
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
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", fontFamily: "'Nunito',sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 3 }}>
                Reference
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito',sans-serif", lineHeight: 1.5 }}>
                {inkCount > 0 ? (
                  <><span style={{ color: C.gold, fontWeight: "bold" }}>{inkCount}</span> cells · <span style={{ color: "#4ADE80" }}>{filledCount}</span> filled</>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>Leave this tile blank</span>
                )}
              </div>
              <div style={{ fontSize: 9, color: "#F87171", marginTop: 3, fontWeight: 800, letterSpacing: 1, fontFamily: "'Nunito',sans-serif" }}>
                ❤ WRONG COSTS A HEART
              </div>
            </div>
          </div>
          <DrawGrid
            userTile={userTile}
            refTile={refTile}
            showFeedback={showFeedback}
            onPaint={handlePaint}
            onInteract={correctFlash ? undefined : clearFeedback}
          />
          {showFeedback && !isTileDone && !correctFlash && (
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito',sans-serif", letterSpacing: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(244,63,94,0.35)", border: "1.5px solid #F43F5E" }} />
                <span>ERASE THIS</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "'Nunito',sans-serif", letterSpacing: 1 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(251,191,36,0.22)", border: "1.5px dashed #FBBF24" }} />
                <span>FILL THIS IN</span>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ display: "flex", gap: 8, padding: "10px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <button
            onClick={() => onClear(sel.r, sel.c)}
            style={{
              padding: "11px 18px", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
              fontFamily: "'Nunito',sans-serif", fontSize: 10, letterSpacing: 1, cursor: "pointer",
            }}
          >
            CLEAR
          </button>
          <button
            onClick={handleSubmit}
            disabled={correctFlash}
            className="submit-btn"
            style={{
              flex: 1, padding: "11px 0",
              background: correctFlash ? C.correct : showFeedback && !isTileDone ? C.wrong : C.correct,
              color: "#fff", border: "none", borderRadius: 8,
              fontFamily: "'Nunito',sans-serif", fontSize: 12, fontWeight: "bold", letterSpacing: 2,
              cursor: correctFlash ? "default" : "pointer",
              boxShadow: correctFlash
                ? "0 4px 24px rgba(58,125,68,0.7)"
                : showFeedback && !isTileDone
                ? "0 4px 14px rgba(244,63,94,0.4)"
                : "0 4px 14px rgba(58,125,68,0.4)",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
              transform: correctFlash ? "scale(1.03)" : "scale(1)",
            }}
          >
            {correctFlash ? "✓ CORRECT!" : showFeedback && !isTileDone ? "💔 WRONG — HEART LOST" : "✓ SUBMIT"}
          </button>
        </div>
      </div>
    </>
  );
}
