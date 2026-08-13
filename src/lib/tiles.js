// Decode a 25-bit integer into a 5×5 binary grid
export function mk(n) {
  const b = n.toString(2).padStart(25, "0");
  const r = [];
  for (let i = 0; i < 5; i++) {
    r.push([...b.slice(i * 5, i * 5 + 5)].map(Number));
  }
  return r;
}

// Count ink pixels in a 5×5 tile.
function tileInkCount(tile) {
  let n = 0;
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (tile[y][x]) n++;
    }
  }
  return n;
}

// Compute the set of claimable tile keys ("r,c") for a puzzle, applying the
// "fair difficulty" filter used by Survival and Chess Clock:
//   1. The tile must have ink (count > 0).
//   2. Absolute floor: count >= 3 — kills 1- and 2-pixel cheese tiles.
//   3. Per-puzzle window: |count - median| <= 4 — only tiles whose difficulty
//      is within a normal range for that specific puzzle.
// Both rules must pass. Returns a Set of "r,c" strings.
export function computeFilteredClaimableTiles(puzzle) {
  const inked = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const count = tileInkCount(puzzle.solution[r][c]);
      if (count > 0) inked.push({ key: `${r},${c}`, count });
    }
  }
  if (inked.length === 0) return new Set();

  const sorted = [...inked].map(t => t.count).sort((a, b) => a - b);
  const n = sorted.length;
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[(n - 1) / 2];

  const keys = new Set();
  for (const t of inked) {
    if (t.count < 3) continue;
    if (Math.abs(t.count - median) > 4) continue;
    keys.add(t.key);
  }
  return keys;
}
