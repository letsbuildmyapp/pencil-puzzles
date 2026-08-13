#!/usr/bin/env node
//
// Batch puzzle creator. Reads a JSON file of puzzle definitions, generates
// individual JS puzzle files in src/puzzles/, and auto-updates index.js.
//
// Usage:
//   node create_puzzles.js puzzles.json
//
// JSON format — an array of objects:
// [
//   {
//     "id": "ft01",
//     "title": "Dog",
//     "category": "Animals",
//     "difficulty": "Easy",
//     "riddle": "I'm man's best friend\nI love to fetch\nWhat am I?",
//     "grid": [
//       "0000000000000000000000000000000000000000",
//       "0000000000000000000000000000000000000000",
//       ... (40 lines of 40 chars, 0=white 1=black)
//     ]
//   }
// ]
//
// The "grid" is a 40x40 pixel grid (8×8 tiles, each 5×5 pixels).
// Row 0 is the top of the image, row 39 is the bottom.
//
// If "id" is omitted, one is auto-generated from the category + count.
// If "difficulty" is omitted, it's computed from ink density.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUZZLES_DIR = resolve(__dirname, "src/puzzles");
const INDEX_PATH = resolve(PUZZLES_DIR, "index.js");

// Convert a 5x5 binary sub-grid to a 25-bit integer (same encoding as mk())
function encode5x5(rows) {
  let bits = "";
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      bits += rows[y][x];
    }
  }
  return parseInt(bits, 2);
}

// Count total ink pixels in a 40x40 grid
function countInk(grid) {
  let n = 0;
  for (const row of grid) for (const c of row) if (c === "1") n++;
  return n;
}

// Auto-determine difficulty from ink density
function guessDifficulty(grid) {
  const ink = countInk(grid);
  const total = 40 * 40;
  const pct = ink / total;
  if (pct < 0.25) return "Easy";
  if (pct < 0.40) return "Medium";
  return "Hard";
}

// Generate a slug from title (e.g. "Bugs Bunny" → "bugs-bunny")
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Generate the JS puzzle file content from a definition
function generatePuzzleFile(def) {
  const grid = def.grid;
  if (grid.length !== 40) throw new Error(`${def.id}: grid must have 40 rows, got ${grid.length}`);
  for (let i = 0; i < 40; i++) {
    if (grid[i].length !== 40) throw new Error(`${def.id}: row ${i} must be 40 chars, got ${grid[i].length}`);
  }

  // Extract 8x8 tiles, each 5x5 pixels
  const tileValues = [];
  const tileMap = new Map(); // value → tile key
  const tileSolution = [];

  for (let tr = 0; tr < 8; tr++) {
    const row = [];
    for (let tc = 0; tc < 8; tc++) {
      const subRows = [];
      for (let y = 0; y < 5; y++) {
        subRows.push(grid[tr * 5 + y].slice(tc * 5, tc * 5 + 5));
      }
      const val = encode5x5(subRows);
      if (!tileMap.has(val)) {
        tileMap.set(val, `t${tileMap.size}`);
      }
      row.push(tileMap.get(val));
    }
    tileSolution.push(row);
  }

  // Build tile declarations
  const tileEntries = [];
  for (const [val, key] of tileMap) {
    tileEntries.push(`  ${key}: mk(${val})`);
  }

  const difficulty = def.difficulty || guessDifficulty(grid);
  const exportName = slugify(def.title).replace(/-/g, "_").toUpperCase() + "_PUZZLE";
  const riddle = def.riddle ? `\n  riddle: ${JSON.stringify(def.riddle)},` : "";

  const solutionRows = tileSolution.map(
    row => `    [${row.map(k => `T.${k}`).join(", ")}]`
  ).join(",\n");

  return {
    exportName,
    content: `import { mk } from "../lib/tiles";

const T = {
${tileEntries.join(",\n")},
};

export const ${exportName} = {
  id: ${JSON.stringify(def.id)},
  title: ${JSON.stringify(def.title)},
  subtitle: "8×8 · ${difficulty}",${riddle}
  solution: [
${solutionRows},
  ],
};
`,
  };
}

// Read and parse existing index.js to find existing imports and entries
function parseIndex() {
  const src = readFileSync(INDEX_PATH, "utf8");
  // Find where PUZZLE_LIST array ends
  const listStart = src.indexOf("export const PUZZLE_LIST = [");
  const listEnd = src.lastIndexOf("];");
  return { src, listStart, listEnd };
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.error("Usage: node create_puzzles.js <puzzles.json>");
  process.exit(1);
}

const defs = JSON.parse(readFileSync(inputFile, "utf8"));
if (!Array.isArray(defs)) {
  console.error("JSON must be an array of puzzle definitions");
  process.exit(1);
}

// Track category counts for auto-ID
const categoryCounts = {};
// Scan existing index for category counts
const existingIndex = readFileSync(INDEX_PATH, "utf8");
const catRegex = /category:\s*"([^"]+)"/g;
let catMatch;
while ((catMatch = catRegex.exec(existingIndex))) {
  const cat = catMatch[1];
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
}

const newImports = [];
const newEntries = [];
let created = 0;

for (const def of defs) {
  // Auto-generate ID if missing
  if (!def.id) {
    const prefix = slugify(def.category).slice(0, 3);
    const num = (categoryCounts[def.category] || 0) + 1;
    def.id = `${prefix}${String(num).padStart(2, "0")}`;
  }
  categoryCounts[def.category] = (categoryCounts[def.category] || 0) + 1;

  const slug = slugify(def.title);
  const filename = `${slug}.js`;
  const filepath = resolve(PUZZLES_DIR, filename);

  const { exportName, content } = generatePuzzleFile(def);

  // Write puzzle file
  writeFileSync(filepath, content);

  // Prepare index additions
  newImports.push(`import { ${exportName} } from "./${slug}";`);
  newEntries.push(`  { puzzle: ${exportName}, free: true, category: ${JSON.stringify(def.category)} },`);

  created++;
  console.log(`  ✓ ${def.id} — ${def.title} (${def.category}) → ${filename}`);
}

// Update index.js
let indexSrc = readFileSync(INDEX_PATH, "utf8");

// Add imports before the PUZZLE_LIST line
const listMarker = "export const PUZZLE_LIST = [";
const listIdx = indexSrc.indexOf(listMarker);
if (listIdx === -1) {
  console.error("Could not find PUZZLE_LIST in index.js");
  process.exit(1);
}
indexSrc = indexSrc.slice(0, listIdx) + newImports.join("\n") + "\n" + indexSrc.slice(listIdx);

// Add entries before the closing ];
const closeIdx = indexSrc.lastIndexOf("];");
indexSrc = indexSrc.slice(0, closeIdx) + newEntries.join("\n") + "\n" + indexSrc.slice(closeIdx);

writeFileSync(INDEX_PATH, indexSrc);

console.log(`\nDone! Created ${created} puzzle(s) and updated index.js.`);
