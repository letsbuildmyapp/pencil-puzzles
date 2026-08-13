import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { C, COLS, ROWS } from "../../constants";
import Timer from "./Timer";
import TileSheet from "./TileSheet";
import RiddleBanner from "./RiddleBanner";
import MiniTilePreview from "../shared/MiniTilePreview";
import FullPreview from "../shared/FullPreview";
import Confetti from "../shared/Confetti";

const PARTICLE_COLORS = ['#4ADE80', '#86EFAC', '#FBBF24', '#818CF8', '#C026D3', '#FB923C'];

function ParticleBurst({ x, y }) {
  const [active, setActive] = useState(false);
  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const dist = 44 + (i % 4) * 12;
    return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, color: PARTICLE_COLORS[i % 6], size: 6 + (i % 3) * 2 };
  }), []);
  useEffect(() => { const raf = requestAnimationFrame(() => setActive(true)); return () => cancelAnimationFrame(raf); }, []);
  return (
    <>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'fixed', left: x, top: y, width: p.size, height: p.size,
          borderRadius: '50%', background: p.color, zIndex: 260, pointerEvents: 'none',
          transform: active ? `translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px))` : 'translate(-50%, -50%)',
          opacity: active ? 0 : 1,
          transition: active ? 'transform 0.7s cubic-bezier(0.2,0,0.3,1), opacity 0.55s 0.15s ease' : 'none',
        }} />
      ))}
    </>
  );
}

function FloatingStar({ x, y }) {
  return (
    <div style={{ position: 'fixed', left: x, top: y, fontSize: 28, zIndex: 261, pointerEvents: 'none', animation: 'floatUpFade 0.9s cubic-bezier(0.2,0,0.4,1) forwards' }}>
      ⭐
    </div>
  );
}

export default function PuzzleGame({ puzzle, isAdmin, onBack, onComplete }) {
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
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`pp_grid_${puzzle.id}`) || "null");
      return !!saved?.hintRevealed;
    } catch (e) { return false; }
  });
  const [done, setDone] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
      if (saved?.done === true) return true;
      if (saved?.grid) {
        for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
          const sol = puzzle.solution[r][c], usr = saved.grid[r][c];
          for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++)
            if (sol[y][x] !== usr[y][x]) return false;
        }
        return true;
      }
    } catch (e) {}
    return false;
  });
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [popRows, setPopRows] = useState(new Set());
  const [popCols, setPopCols] = useState(new Set());
  const [flashGreen, setFlashGreen] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [floaters, setFloaters] = useState([]);
  const [banner, setBanner] = useState(null);
  const [revealingTiles, setRevealingTiles] = useState(new Set());
  const prevGreen = useRef(new Set());
  const submittedRef = useRef(submitted);
  useEffect(() => { submittedRef.current = submitted; }, [submitted]);
  const tileRefs = useRef({});
  const totalInk = useMemo(() => {
    let n = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++)
      if (puzzle.solution[r][c][y][x] === 1) n++;
    return n;
  }, [puzzle]);
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
    try { localStorage.setItem(SAVE_KEY, JSON.stringify({ grid: userGrid, submitted: [...submitted], timerSecs: timerSecsRef.current, done, hintRevealed })); } catch (e) {}
  }, [userGrid, submitted, done, hintRevealed]);

  useEffect(() => {
    return () => {
      try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || "null") || {};
        localStorage.setItem(SAVE_KEY, JSON.stringify({ ...saved, timerSecs: timerSecsRef.current }));
      } catch (e) {}
    };
  }, []);


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
        const finalScore = calcScore(timerSecsRef.current, hintRevealed);
        setScore(finalScore);
        setDone(true); setShowCompleteModal(true); setSelected(null);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        onComplete && onComplete(finalScore, hintRevealed);
      }
      return newGrid;
    });
  }, [done, isTileDone]);

  const handleAutoComplete = useCallback(() => {
    if (done) return;
    const solGrid = puzzle.solution.map(row => row.map(tile => tile.map(trow => [...trow])));
    setUserGrid(solGrid);
    const allKeys = new Set();
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) allKeys.add(`${r},${c}`);
    setSubmitted(allKeys);
    const finalScore = calcScore(timerSecsRef.current, hintRevealed);
    setScore(finalScore);
    setDone(true);
    setShowCompleteModal(true);
    setSelected(null);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    onComplete && onComplete(finalScore, hintRevealed);
  }, [done, puzzle, hintRevealed, onComplete]);

  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false);

  const handleStartOver = () => {
    setUserGrid(Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Array.from({ length: 5 }, () => Array(5).fill(0)))));
    setSubmitted(new Set());
    setDone(false);
    setTimerSecs(0);
    setScore(0);
    setSelected(null);
    setShowCompleteModal(false);
    setShowStartOverConfirm(false);
    setHintRevealed(false);
    prevGreen.current = new Set();
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  };

  const handleClear = (r, c) => {
    setUserGrid(g => g.map((row, ri) => row.map((tile, ci) =>
      ri === r && ci === c ? Array.from({ length: 5 }, () => Array(5).fill(0)) : tile
    )));
  };

  const handleTileSubmit = (r, c) => {
    setSubmitted(prev => { const next = new Set(prev); next.add(`${r},${c}`); return next; });
    const hasInk = puzzle.solution[r][c].flat().some(Boolean);
    // TileSheet already verified correctness before calling onSubmit — no
    // redundant check needed. All side effects stay outside state updaters.
    if (navigator.vibrate) navigator.vibrate([12, 30, 8]);
    triggerAnim(r, c, "tile-glow", 800);

    // Green flash + cell reveal
    if (hasInk) {
      setFlashGreen(true);
      setTimeout(() => setFlashGreen(false), 450);
      setRevealingTiles(prev => new Set([...prev, `${r},${c}`]));
      setTimeout(() => setRevealingTiles(prev => { const n = new Set(prev); n.delete(`${r},${c}`); return n; }), 25 * 38 + 400);
    }

    // Particles + floating star after tile sheet closes
    if (hasInk) {
      const rect = tileRefs.current[`${r},${c}`]?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      setTimeout(() => {
        const id = Date.now() + Math.random();
        setBursts(prev => [...prev, { id, x: cx, y: cy }]);
        setFloaters(prev => [...prev, { id, x: cx, y: cy }]);
        setTimeout(() => {
          setBursts(prev => prev.filter(b => b.id !== id));
          setFloaters(prev => prev.filter(f => f.id !== id));
        }, 1100);
      }, 350);
    }

    // Row/column completion check — a row/column is complete when all 8
    // tiles are in the submitted set. Uses submittedRef for the latest
    // value (the closure `submitted` could be stale). Requires at least
    // one ink tile to avoid celebrating all-blank rows/columns.
    setTimeout(() => {
      const sub = submittedRef.current;
      const newPopRows = new Set(), newPopCols = new Set();

      let rowDone = true, rowHasInk = false;
      for (let c2 = 0; c2 < 8; c2++) {
        if (puzzle.solution[r][c2].flat().some(Boolean)) rowHasInk = true;
        if (!sub.has(`${r},${c2}`)) { rowDone = false; break; }
      }
      if (rowDone && rowHasInk && !prevGreen.current.has(`row${r}`)) {
        prevGreen.current.add(`row${r}`); newPopRows.add(r);
      }

      let colDone = true, colHasInk = false;
      for (let r2 = 0; r2 < 8; r2++) {
        if (puzzle.solution[r2][c].flat().some(Boolean)) colHasInk = true;
        if (!sub.has(`${r2},${c}`)) { colDone = false; break; }
      }
      if (colDone && colHasInk && !prevGreen.current.has(`col${c}`)) {
        prevGreen.current.add(`col${c}`); newPopCols.add(c);
      }

      if (newPopRows.size || newPopCols.size) {
        if (navigator.vibrate) navigator.vibrate([15, 20, 15, 20, 60]);
        setPopRows(p => new Set([...p, ...newPopRows]));
        setPopCols(p => new Set([...p, ...newPopCols]));
        const bannerText = newPopRows.size && newPopCols.size
          ? `Row ${ROWS[r]} & Col ${COLS[c]} Done!`
          : newPopRows.size ? `Row ${ROWS[r]} Complete!`
          : `Column ${COLS[c]} Complete!`;
        setBanner(bannerText);
        setTimeout(() => setBanner(null), 2200);
        setTimeout(() => {
          setPopRows(p => { const n = new Set(p); newPopRows.forEach(x => n.delete(x)); return n; });
          setPopCols(p => { const n = new Set(p); newPopCols.forEach(x => n.delete(x)); return n; });
        }, 400);
      }
    }, 50);
  };

  const progress = totalInk > 0 ? filledCorrect(userGrid) / totalInk : 0;
  const multiplier = timerSecs < 300 ? 3 : timerSecs < 600 ? 2 : 1;
  const BASE_SCORE = 1000;
  const calcScore = (secs, hintRevealed) => {
    const mult = secs < 300 ? 3 : secs < 600 ? 2 : 1;
    const raw = BASE_SCORE * mult;
    return hintRevealed ? Math.floor(raw / 2) : raw;
  };

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", maxWidth: "100vw", userSelect: "none", WebkitUserSelect: "none" }}>
      {/* Header */}
      <div style={{ background: C.sheetBg, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 16px rgba(0,0,0,0.2)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 800, padding: "6px 12px", borderRadius: 12 }}>← Back</button>
          <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 22, letterSpacing: 0.5 }}>{puzzle.title}</div>
          {isAdmin && !done && (
            <button onClick={handleAutoComplete} style={{ background: "rgba(192,38,211,0.5)", border: "1px solid rgba(192,38,211,0.8)", color: "#fff", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 8, letterSpacing: 0.5 }}>AUTO</button>
          )}
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
          const PAD = 8, LABEL = 22, GAP = 0;
          const tSz = Math.floor((Math.min(window.innerWidth, 480) - PAD * 2 - LABEL - GAP * 7) / 8);
          const dotSz = Math.max(4, Math.floor(tSz / 8));
          return (
            <div style={{ flexShrink: 0, paddingLeft: PAD, paddingRight: PAD }}>
              <div style={{ display: "flex", marginLeft: LABEL + GAP, marginBottom: 4 }}>
                {COLS.map(c => (
                  <div key={c} style={{ width: tSz, textAlign: "center", fontSize: 9, color: C.muted, fontFamily: "'Nunito',sans-serif", fontWeight: "bold", letterSpacing: 1, marginRight: GAP, paddingBottom: 6, flexShrink: 0 }}>{c}</div>
                ))}
              </div>
              {ROWS.map((row, ri) => (
                <div key={row} className={popRows.has(ri) ? "row-pop" : ""} style={{ display: "flex", alignItems: "center", marginBottom: GAP }}>
                  <div style={{ width: LABEL, fontSize: 9, color: C.muted, fontFamily: "'Nunito',sans-serif", fontWeight: "bold", textAlign: "right", marginRight: GAP, paddingRight: 6, flexShrink: 0 }}>{row}</div>
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
                        onClick={() => {
                          if (navigator.vibrate) navigator.vibrate(8);
                          triggerAnim(ri, ci, "tile-bounce", 400);
                          setSelected({ r: ri, c: ci });
                        }}
                        style={{
                          width: tSz, height: tSz, flexShrink: 0,
                          borderTopLeftRadius: (ri === 0 && ci === 0) ? 8 : 0,
                          borderTopRightRadius: (ri === 0 && ci === 7) ? 8 : 0,
                          borderBottomLeftRadius: (ri === 7 && ci === 0) ? 8 : 0,
                          borderBottomRightRadius: (ri === 7 && ci === 7) ? 8 : 0,
                          border: "none",
                          background: isGreen ? "#FFFFFF" : C.surface,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", marginRight: GAP,
                          outline: isColPop ? `1.5px solid ${C.accent}` : "none",
                          outlineOffset: "-1px",
                          boxShadow: isGreen ? "none" : "inset 0 0 0 0.5px rgba(255,160,80,0.35)",
                          cursor: "pointer",
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
                        <MiniTilePreview tile={userGrid[ri][ci]} animateReveal={revealingTiles.has(`${ri},${ci}`)} />
                      </div>
                    );
                  })}
                </div>
              ))}
              {!done && (
                <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: C.muted, letterSpacing: 2, fontFamily: "'Nunito',sans-serif", fontWeight: 700 }}>TAP A CELL TO DRAW</div>
              )}
              <div style={{ textAlign: "center", marginTop: done ? 14 : 8 }}>
                <button onClick={() => setShowStartOverConfirm(true)} style={{ background: "none", border: `2px solid ${C.border}`, borderRadius: 12, padding: "10px 24px", fontSize: 13, color: C.muted, fontFamily: "'Fredoka One',cursive", fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>Start Over</button>
              </div>
            </div>
          );
        })()}
      </div>
      {puzzle.riddle && <RiddleBanner riddle={puzzle.riddle} revealed={hintRevealed} onReveal={() => setHintRevealed(true)} />}
      {selected && !done && (
        <TileSheet
          key={`${selected.r},${selected.c}`}
          sel={selected} puzzle={puzzle} userGrid={userGrid}
          onClose={() => setSelected(null)}
          onNavigate={next => setSelected(next)}
          onPaint={handlePaint}
          onClear={handleClear}
          onSubmit={handleTileSubmit}
          submitted={submitted}
        />
      )}
      {showConfetti && <Confetti />}
      {/* Green flash */}
      {flashGreen && <div style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(34,197,94,0.18)', pointerEvents: 'none', animation: 'greenFlash 0.45s ease forwards' }} />}
      {/* Particle bursts */}
      {bursts.map(b => <ParticleBurst key={b.id} x={b.x} y={b.y} />)}
      {/* Floating stars */}
      {floaters.map(f => <FloatingStar key={f.id} x={f.x} y={f.y} />)}
      {/* Row/col complete banner */}
      {banner && (
        <div style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 270, pointerEvents: 'none', animation: 'bannerPop 2.2s cubic-bezier(0.16,1,0.3,1) forwards' }}>
          <div style={{ background: 'linear-gradient(135deg,#16A34A,#4ADE80)', color: '#fff', fontFamily: "'Fredoka One',cursive", fontSize: 26, padding: '14px 32px', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.35)', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
            🎉 {banner}
          </div>
        </div>
      )}
      {done && showCompleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(12,8,4,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.paper, borderRadius: 16, padding: "36px 32px", maxWidth: 360, width: "88%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", animation: "celebrationPop 0.5s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div style={{ fontSize: 60, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>{puzzle.title}</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, fontWeight: 900, color: C.ink, marginBottom: 4 }}>Puzzle Complete!</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
              <FullPreview puzzle={puzzle} userGrid={userGrid} size={150} />
            </div>
            <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 44, fontWeight: "bold", color: C.gold, margin: "6px 0 2px" }}>{score.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 22 }}>points</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowCompleteModal(false)} style={{ flex: 1, padding: "14px 0", background: "none", color: C.muted, border: `2px solid ${C.border}`, borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer" }}>CLOSE</button>
              <button onClick={onBack} style={{ flex: 1, padding: "14px 0", background: C.accent, color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer", boxShadow: "0 6px 20px rgba(212,96,26,0.4)" }}>MENU</button>
            </div>
          </div>
        </div>
      )}
      {showStartOverConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(12,8,4,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 310, backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.paper, borderRadius: 16, padding: "32px 28px", maxWidth: 320, width: "85%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔄</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, marginBottom: 8 }}>Start Over?</div>
            <div style={{ fontSize: 14, color: C.muted, fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>This will erase all your progress on this puzzle.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowStartOverConfirm(false)} style={{ flex: 1, padding: "14px 0", background: "none", color: C.muted, border: `2px solid ${C.border}`, borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer" }}>CANCEL</button>
              <button onClick={handleStartOver} style={{ flex: 1, padding: "14px 0", background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer", boxShadow: "0 4px 14px rgba(239,68,68,0.4)" }}>RESET</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
