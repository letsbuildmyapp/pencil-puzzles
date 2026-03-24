import { useState, useEffect, useRef, useCallback } from "react";
import { C, COLS, ROWS } from "../../constants";
import Timer from "./Timer";
import TileSheet from "./TileSheet";
import RiddleBanner from "./RiddleBanner";
import MiniTilePreview from "../shared/MiniTilePreview";
import FullPreview from "../shared/FullPreview";
import Confetti from "../shared/Confetti";

export default function PuzzleGame({ puzzle, onBack, onComplete }) {
  const SAVE_KEY = `pp_grid_${puzzle.id}`;
  const [userGrid, setUserGrid] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
      if (saved?.grid) return saved.grid;
    } catch (e) {}
    return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Array.from({ length: 5 }, () => Array(5).fill(0))));
  });
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
      if (saved?.submitted) return new Set(saved.submitted);
    } catch (e) {}
    return new Set();
  });
  const [timerSecs, setTimerSecs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "null")?.timerSecs || 0; } catch (e) { return 0; }
  });
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [popRows, setPopRows] = useState(new Set());
  const [popCols, setPopCols] = useState(new Set());
  const prevGreen = useRef(new Set());
  const tileRefs = useRef({});
  const totalInk = useRef(0);
  const timerSecsRef = useRef(timerSecs);
  useEffect(() => { timerSecsRef.current = timerSecs; }, [timerSecs]);

  const triggerAnim = (r, c, animName, durationMs = 500) => {
    const el = tileRefs.current[`${r},${c}`];
    if (!el) return;
    el.classList.remove("tile-bounce", "tile-glow", "tile-shake");
    void el.offsetWidth;
    el.classList.add(animName);
    setTimeout(() => { if (el) el.classList.remove(animName); }, durationMs);
  };

  useEffect(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ grid: userGrid, submitted: [...submitted], timerSecs: timerSecsRef.current })); } catch (e) {}
  }, [userGrid, submitted]);

  useEffect(() => {
    return () => {
      try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null") || {};
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...saved, timerSecs: timerSecsRef.current }));
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    let n = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++)
      if (puzzle.solution[r][c][y][x] === 1) n++;
    totalInk.current = n;
  }, [puzzle]);

  const isTileDone = useCallback((grid, r, c) => {
    const sol = puzzle.solution[r][c], usr = grid[r][c];
    for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if (sol[y][x] !== usr[y][x]) return false;
    return true;
  }, [puzzle]);

  const filledCorrect = useCallback((grid) => {
    let n = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++)
      if (grid[r][c][y][x] === 1 && puzzle.solution[r][c][y][x] === 1) n++;
    return n;
  }, [puzzle]);

  const handlePaint = useCallback((r, c, py, px, mode) => {
    if (done) return;
    setUserGrid(prev => {
      const newGrid = prev.map((row, ri) => row.map((tile, ci) => {
        if (ri !== r || ci !== c) return tile;
        if (tile[py][px] === mode) return tile;
        return tile.map((trow, ty) => trow.map((v, tx) => ty === py && tx === px ? mode : v));
      }));
      let allDone = true;
      outer: for (let rr = 0; rr < 8; rr++) for (let cc = 0; cc < 8; cc++) {
        if (!isTileDone(newGrid, rr, cc)) { allDone = false; break outer; }
      }
      if (allDone) {
        setScore(100);
        setDone(true); setSelected(null);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        onComplete && onComplete(100);
      }
      return newGrid;
    });
  }, [done, isTileDone]);

  const handleClear = (r, c) => {
    setUserGrid(g => g.map((row, ri) => row.map((tile, ci) =>
      ri === r && ci === c ? Array.from({ length: 5 }, () => Array(5).fill(0)) : tile
    )));
  };

  const handleTileSubmit = (r, c) => {
    setSubmitted(prev => { const next = new Set(prev); next.add(`${r},${c}`); return next; });
    const hasInk = puzzle.solution[r][c].flat().some(Boolean);
    const correct = isTileDone(userGrid, r, c);
    if (correct || !hasInk) {
      if (navigator.vibrate) navigator.vibrate([12, 30, 8]);
      triggerAnim(r, c, "tile-glow", 800);
      setTimeout(() => {
        setUserGrid(grid => {
          const newPopRows = new Set(), newPopCols = new Set();
          let rowDone = true;
          for (let c2 = 0; c2 < 8; c2++) {
            const hInk = puzzle.solution[r][c2].flat().some(Boolean);
            const green = (isTileDone(grid, r, c2) && hInk) || !hInk;
            if (!green) { rowDone = false; break; }
          }
          if (rowDone && !prevGreen.current.has(`row${r}`)) { prevGreen.current.add(`row${r}`); newPopRows.add(r); }
          let colDone = true;
          for (let r2 = 0; r2 < 8; r2++) {
            const hInk = puzzle.solution[r2][c].flat().some(Boolean);
            const green = (isTileDone(grid, r2, c) && hInk) || !hInk;
            if (!green) { colDone = false; break; }
          }
          if (colDone && !prevGreen.current.has(`col${c}`)) { prevGreen.current.add(`col${c}`); newPopCols.add(c); }
          if (newPopRows.size || newPopCols.size) {
            if (navigator.vibrate) navigator.vibrate([15, 20, 15, 20, 60]);
            setPopRows(p => new Set([...p, ...newPopRows]));
            setPopCols(p => new Set([...p, ...newPopCols]));
            setTimeout(() => {
              setPopRows(p => { const n = new Set(p); newPopRows.forEach(x => n.delete(x)); return n; });
              setPopCols(p => { const n = new Set(p); newPopCols.forEach(x => n.delete(x)); return n; });
            }, 400);
          }
          return grid;
        });
      }, 50);
    } else {
      if (navigator.vibrate) navigator.vibrate([40, 20, 40]);
      triggerAnim(r, c, "tile-shake", 500);
    }
  };

  const progress = totalInk.current > 0 ? filledCorrect(userGrid) / totalInk.current : 0;
  const multiplier = Math.max(1, 3 - Math.floor(timerSecs / 60));

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100vw" }}>
      {/* Header */}
      <div style={{ background: C.sheetBg, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 16px rgba(0,0,0,0.2)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 800, padding: "6px 12px", borderRadius: 12 }}>← Back</button>
          <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 22, letterSpacing: 0.5 }}>{puzzle.title}</div>
        </div>
        <Timer running={!done} secs={timerSecs} onTick={setTimerSecs} />
      </div>
      {/* Progress strip */}
      <div style={{ height: 4, background: "rgba(0,0,0,0.08)", flexShrink: 0 }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #C026D3, #818CF8)", width: `${progress * 100}%`, transition: "width 0.5s ease", borderRadius: "0 4px 4px 0" }} />
      </div>
      {/* Stats */}
      <div style={{ background: C.paper, padding: "7px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, borderBottom: `2px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Progress</span>
          <span style={{ color: C.accent, fontWeight: 900, fontSize: 16 }}>{Math.round(progress * 100)}%</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: C.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Multiplier</span>
          <span style={{ color: C.gold, fontWeight: 900, fontSize: 16 }}>×{multiplier}</span>
        </div>
      </div>
      {/* Grid */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 0 0" }}>
        {(() => {
          const PAD = 8, LABEL = 22, GAP = 2;
          const tSz = Math.floor((Math.min(window.innerWidth, 480) - PAD * 2 - LABEL - GAP * 7) / 8);
          const dotSz = Math.max(4, Math.floor(tSz / 8));
          return (
            <div style={{ flexShrink: 0, paddingLeft: PAD, paddingRight: PAD }}>
              <div style={{ display: "flex", marginLeft: LABEL + GAP, marginBottom: 4 }}>
                {COLS.map(c => (
                  <div key={c} style={{ width: tSz, textAlign: "center", fontSize: 9, color: C.muted, fontFamily: "monospace", fontWeight: "bold", letterSpacing: 1, marginRight: GAP, flexShrink: 0 }}>{c}</div>
                ))}
              </div>
              {ROWS.map((row, ri) => (
                <div key={row} className={popRows.has(ri) ? "row-pop" : ""} style={{ display: "flex", alignItems: "center", marginBottom: GAP }}>
                  <div style={{ width: LABEL, fontSize: 9, color: C.muted, fontFamily: "monospace", fontWeight: "bold", textAlign: "right", marginRight: GAP, flexShrink: 0 }}>{row}</div>
                  {COLS.map((_, ci) => {
                    const d = isTileDone(userGrid, ri, ci);
                    const hasInk = puzzle.solution[ri][ci].flat().some(Boolean);
                    const subKey = `${ri},${ci}`;
                    const isGreen = (d && hasInk) || (!hasInk && submitted.has(subKey));
                    const isColPop = popCols.has(ci);
                    return (
                      <div
                        key={ci}
                        ref={el => { tileRefs.current[`${ri},${ci}`] = el; }}
                        className={isGreen ? "" : "tile-slot"}
                        onClick={isGreen ? undefined : () => {
                          if (navigator.vibrate) navigator.vibrate(8);
                          triggerAnim(ri, ci, "tile-bounce", 400);
                          setSelected({ r: ri, c: ci });
                        }}
                        style={{
                          width: tSz, height: tSz, flexShrink: 0,
                          borderRadius: Math.max(5, tSz * 0.16),
                          border: isGreen ? "1.5px solid transparent" : `1.5px solid ${isColPop ? C.accent : C.line}`,
                          background: isGreen ? "#FFFFFF" : C.surface,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", marginRight: GAP,
                          outline: "none",
                          boxShadow: isGreen ? "none" : "0 2px 5px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.07)",
                          cursor: isGreen ? "default" : "pointer",
                          overflow: "hidden",
                          transition: "border-color 0.2s, box-shadow 0.3s",
                        }}
                      >
                        {!isGreen && !userGrid[ri][ci].flat().some(Boolean) && (
                          <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: `radial-gradient(circle, ${C.border} 1.2px, transparent 1.2px)`,
                            backgroundSize: `${dotSz + 2}px ${dotSz + 2}px`,
                            backgroundPosition: "center", opacity: 0.6, borderRadius: "inherit",
                          }} />
                        )}
                        <MiniTilePreview tile={userGrid[ri][ci]} isDone={isGreen} />
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: C.muted, letterSpacing: 2, fontFamily: "'Nunito',sans-serif", fontWeight: 700 }}>TAP A CELL TO DRAW</div>
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button onClick={() => {
                  setUserGrid(puzzle.solution.map(row => row.map(tile => tile.map(r => [...r]))));
                  const allKeys = new Set();
                  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) allKeys.add(`${r},${c}`);
                  setSubmitted(allKeys);
                  setScore(100); setDone(true); setSelected(null);
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 4000);
                  onComplete && onComplete(100);
                }} style={{ background: "transparent", border: `1.5px dashed ${C.muted}`, borderRadius: 8, padding: "5px 14px", fontSize: 10, color: C.muted, fontFamily: "'Nunito',sans-serif", fontWeight: 700, letterSpacing: 2, cursor: "pointer" }}>✓ Complete</button>
              </div>
            </div>
          );
        })()}
      </div>
      {puzzle.riddle && <RiddleBanner riddle={puzzle.riddle} />}
      {selected && !done && (
        <TileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected} puzzle={puzzle} userGrid={userGrid}
          onClose={() => setSelected(null)}
          onNavigate={next => setSelected(next)}
          onPaint={handlePaint}
          onClear={handleClear}
          onSubmit={handleTileSubmit}
        />
      )}
      {showConfetti && <Confetti />}
      {done && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(12,8,4,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.paper, borderRadius: 16, padding: "36px 32px", maxWidth: 360, width: "88%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div style={{ fontSize: 60, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>{puzzle.title}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: C.ink, marginBottom: 4 }}>Puzzle Complete!</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
              <FullPreview puzzle={puzzle} userGrid={userGrid} size={150} />
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 44, fontWeight: "bold", color: C.gold, margin: "6px 0 2px" }}>{score.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 22 }}>points</div>
            <button onClick={onBack} style={{ width: "100%", padding: "14px 0", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Courier Prime',monospace", fontSize: 13, fontWeight: "bold", letterSpacing: 3, cursor: "pointer", boxShadow: "0 6px 20px rgba(212,96,26,0.4)" }}>NEXT PUZZLE</button>
          </div>
        </div>
      )}
    </div>
  );
}
