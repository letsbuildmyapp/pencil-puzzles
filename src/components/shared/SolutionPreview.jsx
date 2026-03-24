import { C } from "../../constants";

export default function SolutionPreview({ puzzle, size = 56 }) {
  const cellSize = size / 40;
  const cells = [];
  for (let gr = 0; gr < 8; gr++) for (let gc = 0; gc < 8; gc++) {
    const sol = puzzle.solution[gr][gc];
    for (let py = 0; py < 5; py++) for (let px = 0; px < 5; px++) {
      if (sol[py][px] === 1) cells.push({ x: gc * 5 + px, y: gr * 5 + py });
    }
  }
  return (
    <svg width={size} height={size} style={{ display: "block", borderRadius: 8, border: `1.5px solid ${C.border}`, flexShrink: 0 }}>
      <rect width={size} height={size} fill={C.paper} />
      {cells.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize + 0.3} height={cellSize + 0.3} fill={C.pencil} />
      ))}
    </svg>
  );
}
