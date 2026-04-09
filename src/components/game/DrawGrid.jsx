import { useRef } from "react";
import { C } from "../../constants";

export default function DrawGrid({ userTile, refTile, showFeedback, onPaint, onInteract, done }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const paintMode = useRef(1);
  const lastKey = useRef(null);

  const cellAt = (clientX, clientY) => {
    const el = containerRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const rx = clientX - rect.left;
    const ry = clientY - rect.top;
    if (rx < 0 || ry < 0 || rx >= rect.width || ry >= rect.height) return null;
    return {
      py: Math.min(4, Math.floor((ry / rect.height) * 5)),
      px: Math.min(4, Math.floor((rx / rect.width) * 5)),
    };
  };

  const paint = (clientX, clientY) => {
    const cell = cellAt(clientX, clientY);
    if (!cell) return;
    const key = `${cell.py},${cell.px}`;
    if (key === lastKey.current) return;
    lastKey.current = key;
    onPaint?.(cell.py, cell.px, paintMode.current);
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    if (showFeedback) onInteract?.();
    isDragging.current = true;
    lastKey.current = null;
    containerRef.current?.setPointerCapture(e.pointerId);
    const cell = cellAt(e.clientX, e.clientY);
    if (cell) paintMode.current = userTile[cell.py][cell.px] === 1 ? 0 : 1;
    paint(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    paint(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    isDragging.current = false;
    lastKey.current = null;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        gridTemplateRows: "repeat(5,1fr)",
        gap: 7,
        width: "min(300px, 80vw)",
        aspectRatio: "1 / 1",
        touchAction: "none",
        userSelect: "none",
        cursor: "crosshair",
        WebkitUserSelect: "none",
        flexShrink: 0,
      }}
    >
      {userTile.map((trow, py) => trow.map((v, px) => {
        const ref = refTile[py][px];
        const isWrong = showFeedback && v && !ref;
        const isMissing = showFeedback && !v && ref;
        const isCorrect = showFeedback && v && ref;
        const isDone = done && v && ref;
        let bg;
        if (isDone) bg = C.correctLight;
        else if (isWrong) bg = C.wrongLight;
        else if (isMissing) bg = "rgba(251,191,36,0.22)";
        else if (isCorrect) bg = C.correctLight;
        else if (v) bg = "rgba(255,255,255,0.3)";
        else bg = "rgba(255,255,255,0.04)";
        const glow = isDone
          ? `0 0 0 2px ${C.correct}`
          : isWrong ? `0 0 0 2px ${C.wrong}`
          : isMissing ? `0 0 0 2px #FBBF24`
          : isCorrect ? `0 0 0 2px ${C.correct}`
          : "none";
        return (
          <div key={`${py}-${px}`} style={{
            background: bg, borderRadius: 8,
            border: isDone ? `1.5px solid ${C.correct}` : isWrong ? `1.5px solid ${C.wrong}` : isMissing ? `1.5px dashed #FBBF24` : isCorrect ? `1.5px solid ${C.correct}` : v ? `1.5px solid rgba(255,255,255,0.35)` : `1.5px solid ${C.sheetBorder}`,
            boxShadow: glow,
            transition: "background 0.1s, box-shadow 0.1s, transform 0.08s",
            transform: v ? "scale(1)" : "scale(0.92)",
            animation: isWrong ? "wrongShake 0.3s ease" : undefined,
            position: "relative", overflow: "hidden",
            pointerEvents: "none",
          }} />
        );
      }))}
    </div>
  );
}
