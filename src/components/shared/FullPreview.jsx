import { C } from "../../constants";

export default function FullPreview({ puzzle, userGrid, size = 160 }) {
  const cellSize = size / 40;
  const cells = [];
  for (let gr = 0; gr < 8; gr++) for (let gc = 0; gc < 8; gc++) {
    const sol = puzzle.solution[gr][gc];
    const usr = userGrid[gr][gc];
    for (let py = 0; py < 5; py++) for (let px = 0; px < 5; px++) {
      const x = gc * 5 + px, y = gr * 5 + py;
      const sv = sol[py][px], uv = usr[py][px];
      let color = null;
      if (sv === 1) color = uv === 1 ? C.pencil : "rgba(180,160,130,0.25)";
      if (uv === 1 && sv === 0) color = C.wrong;
      if (color) cells.push({ x, y, color });
    }
  }
  return (
    <svg width={size} height={size} style={{ display: "block", borderRadius: 6, border: `1px solid ${C.line}` }}>
      <rect width={size} height={size} fill={C.paper} />
      {cells.map(({ x, y, color }) => (
        <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill={color} />
      ))}
    </svg>
  );
}
