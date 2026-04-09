# Pencil Puzzles

A nonogram/picross puzzle game built with React + Vite.

## Dev Server
```
npm run dev   # runs at http://localhost:5173
npm run build
```

## Puzzle Structure

Each puzzle is an **8×8 grid of tiles**, where each tile is a **5×5 binary pixel grid**.
The full image is 40×40 logical pixels.

A tile is encoded as a 25-bit integer using `mk(n)` from `src/lib/tiles.js`:
- Bit 24 (MSB) = top-left pixel, Bit 0 (LSB) = bottom-right pixel
- `mk(0)` = all white, `mk(33554431)` = all black

### Adding New Puzzles

1. **Extract pixel data** from screenshots using the script in the project root:
   ```
   python3 extract_puzzle.py   # requires: pip install Pillow numpy
   ```
   Edit the `puzzles` list at the bottom of the script with your new images, then run it.
   The script auto-detects the grid offset and outputs `.js` files to `src/puzzles/`.

2. **Register in `src/puzzles/index.js`** — add the import and a `PUZZLE_LIST` entry:
   ```js
   import { MY_PUZZLE } from "./my-puzzle";
   // ...
   { puzzle: MY_PUZZLE, free: true, category: "My Category" },
   ```

### Puzzle File Format
```js
import { mk } from "../lib/tiles";

const T = {
  t0: mk(0),
  t1: mk(12345),
  // ...
};

export const MY_PUZZLE = {
  id: "xx01",
  title: "Title",
  subtitle: "8×8 · Easy",   // difficulty: Easy / Medium / Hard
  riddle: "Clue line 1\nClue line 2\nWhat am I?",
  solution: [
    [T.t0, T.t1, ...],  // label 8 (top row)
    ...
    [T.t0, T.t1, ...],  // label 1 (bottom row)
  ],
};
```

### Screenshot → Script Notes
- macOS screenshot filenames use **U+202F** (narrow no-break space) before AM/PM
- Shell `cp` fails on these filenames — use Python's `shutil.copy2()` instead
- Copy screenshots to `/tmp/hw#.png` before processing if Desktop access is blocked

## Source Structure
```
src/
  components/
    auth/       # auth screens
    game/       # puzzle game UI
    home/       # home/category screens
    shared/     # shared UI components
  puzzles/
    index.js    # master puzzle list + category assignments
    *.js        # individual puzzle data files
  lib/
    tiles.js    # mk() tile encoder/decoder
  constants.js
extract_puzzle.py  # image → JS puzzle data converter
```
