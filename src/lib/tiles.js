// Decode a 25-bit integer into a 5×5 binary grid
export function mk(n) {
  const b = n.toString(2).padStart(25, "0");
  const r = [];
  for (let i = 0; i < 5; i++) {
    r.push([...b.slice(i * 5, i * 5 + 5)].map(Number));
  }
  return r;
}
