import { C } from "../../constants";

// Cache cell positions per puzzle — computed once, reused forever
const cellsCache = new Map();
function getCells(puzzle) {
  if (cellsCache.has(puzzle.id)) return cellsCache.get(puzzle.id);
  const cells = [];
  for (let gr = 0; gr < 8; gr++) for (let gc = 0; gc < 8; gc++) {
    const sol = puzzle.solution[gr][gc];
    for (let py = 0; py < 5; py++) for (let px = 0; px < 5; px++) {
      if (sol[py][px] === 1) cells.push(gc * 5 + px, gr * 5 + py);
    }
  }
  cellsCache.set(puzzle.id, cells);
  return cells;
}

export default function SolutionPreview({ puzzle, size = 56, hidden = false }) {
  const cells = getCells(puzzle);
  const cellSize = size / 40;
  const w = cellSize + 0.3;

  // Build a single SVG path instead of individual rects — 1 DOM node vs 1000+
  let d = "";
  for (let i = 0; i < cells.length; i += 2) {
    const x = cells[i] * cellSize;
    const y = cells[i + 1] * cellSize;
    d += `M${x},${y}h${w}v${w}h${-w}z`;
  }

  const lockSize = size * 0.36;
  const lx = (size - lockSize) / 2;
  const ly = (size - lockSize) / 2;

  const filterId = `blur-${puzzle.id}`;
  const useBlur = hidden && size >= 40;
  const borderRadius = size < 24 ? 4 : 8;
  const showBorder = size >= 24;

  return (
    <svg width={size} height={size} style={{ display: "block", borderRadius, border: showBorder ? `1.5px solid ${C.border}` : "none", flexShrink: 0 }}>
      {useBlur && (
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      )}
      <rect width={size} height={size} fill={hidden ? "#EDE9F6" : C.paper} />
      <g filter={useBlur ? `url(#${filterId})` : undefined} opacity={hidden ? 0.5 : 1}>
        <path d={d} fill={hidden ? "rgba(109,40,217,0.9)" : C.pencil} />
      </g>
      {hidden && size >= 40 && (
        <g transform={`translate(${lx}, ${ly})`}>
          <rect x={lockSize * 0.18} y={lockSize * 0.44} width={lockSize * 0.64} height={lockSize * 0.48} rx={lockSize * 0.1} fill="rgba(109,40,217,0.7)" />
          <path
            d={`M${lockSize*0.32},${lockSize*0.44} L${lockSize*0.32},${lockSize*0.26} A${lockSize*0.18},${lockSize*0.18} 0 0 1 ${lockSize*0.68},${lockSize*0.26} L${lockSize*0.68},${lockSize*0.44}`}
            fill="none" stroke="rgba(109,40,217,0.7)" strokeWidth={lockSize * 0.13} strokeLinecap="round"
          />
          <circle cx={lockSize * 0.5} cy={lockSize * 0.66} r={lockSize * 0.09} fill="rgba(255,255,255,0.75)" />
          <rect x={lockSize*0.455} y={lockSize*0.66} width={lockSize*0.09} height={lockSize*0.14} rx={lockSize*0.03} fill="rgba(255,255,255,0.75)" />
        </g>
      )}
    </svg>
  );
}
