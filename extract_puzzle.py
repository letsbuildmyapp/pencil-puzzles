#!/usr/bin/env python3
"""
Extract nonogram puzzle data from pixel-art grid images.
Images are ~1200x1200 px representing a 40x40 logical pixel grid
(8x8 tiles of 5x5 each). Cell size = 30px, offset = ~3px (auto-detected).

USAGE:
  Edit the `puzzles` list at the bottom of this file with your new images,
  then run:  python3 extract_puzzle.py

  Each puzzle entry needs:
    path     - path to the screenshot image (copy to /tmp/hw#.png first if needed)
    id       - unique puzzle id (e.g. "hw01")
    title    - display name
    subtitle - e.g. "8×8 · Medium"
    riddle   - the puzzle clue (use \\n for line breaks)
    export   - JS export name (e.g. "HALLOWEEN_1_PUZZLE")
    file     - output filename without .js (e.g. "halloween-1")

  After running, add the new imports and puzzle entries to src/puzzles/index.js.

REQUIREMENTS:
  pip install Pillow numpy
"""

import sys, os
from PIL import Image
import numpy as np

CELL_SIZE = 30
GRID_CELLS = 40  # 40x40 logical pixels
TILE_SIZE  = 5   # 5x5 pixels per tile
TILES      = GRID_CELLS // TILE_SIZE  # 8x8 tiles

def extract_grid(path):
    img = Image.open(path).convert("L")
    arr = np.array(img)
    h, w = arr.shape

    # Auto-detect offset: find first major grid line (dip ~191) in top few rows
    # by scanning the column projection of a bright row
    # Major grid lines are every 2 cells = every 60px
    # First major line should be around x=63

    # Find a reliable offset by finding first major dip
    # Scan a few rows near the top that are mostly white
    top_strip = arr[:20, :].mean(axis=0)

    # Find minimum in first 80 px (should be around x=63)
    first_region = top_strip[50:80]
    first_min_idx = 50 + np.argmin(first_region)
    # Major lines are every 60px; first major line = 2 cells from left
    # So offset = first_min_idx - 2 * CELL_SIZE
    offset_x = first_min_idx - 2 * CELL_SIZE
    if offset_x < 0 or offset_x > 10:
        offset_x = 3  # fallback

    # Do the same for rows
    left_strip = arr[:, :20].mean(axis=1)
    first_region_r = left_strip[50:80]
    first_min_idx_r = 50 + np.argmin(first_region_r)
    offset_y = first_min_idx_r - 2 * CELL_SIZE
    if offset_y < 0 or offset_y > 10:
        offset_y = 3

    print(f"  offset_x={offset_x}, offset_y={offset_y}", file=sys.stderr)

    # Sample center of each cell (use 8x8 center patch, take median)
    SAMPLE = 8
    grid = np.zeros((GRID_CELLS, GRID_CELLS), dtype=np.uint8)
    for r in range(GRID_CELLS):
        for c in range(GRID_CELLS):
            cy = offset_y + r * CELL_SIZE + CELL_SIZE // 2
            cx = offset_x + c * CELL_SIZE + CELL_SIZE // 2
            patch = arr[cy - SAMPLE//2 : cy + SAMPLE//2,
                        cx - SAMPLE//2 : cx + SAMPLE//2]
            val = np.median(patch)
            grid[r, c] = 1 if val < 128 else 0

    return grid

def grid_to_tiles(grid):
    solution = []
    for tr in range(TILES):
        row = []
        for tc in range(TILES):
            tile = grid[tr*TILE_SIZE:(tr+1)*TILE_SIZE,
                        tc*TILE_SIZE:(tc+1)*TILE_SIZE]
            bits = tile.flatten()
            val = int("".join(str(b) for b in bits), 2)
            row.append(val)
        solution.append(row)
    return solution

def solution_to_js(solution, puzzle_id, title, subtitle, riddle, export_name):
    # Ensure riddle uses JS escape sequences, not literal newlines/tabs
    riddle = riddle.replace('\r\n', '\\n').replace('\n', '\\n').replace('\t', '\\t')

    unique_vals = list(dict.fromkeys(v for row in solution for v in row))
    val_to_name = {v: f"t{i}" for i, v in enumerate(unique_vals)}

    lines = ['import { mk } from "../lib/tiles";', '', 'const T = {']
    entries = [f"  {val_to_name[v]}: mk({v})" for v in unique_vals]
    for i in range(0, len(entries), 4):
        chunk = entries[i:i+4]
        lines.append(",\n".join(chunk) + ("," if i + 4 < len(entries) else ""))
    lines += ['};', '', f'export const {export_name} = {{',
              f'  id: "{puzzle_id}",', f'  title: "{title}",',
              f'  subtitle: "{subtitle}",', f'  riddle: "{riddle}",',
              '  solution: [']

    n = len(solution)
    for i, row in enumerate(solution):
        label = n - i
        cells = ", ".join(f"T.{val_to_name[v]}" for v in row)
        comma = "," if i < n - 1 else ""
        lines.append(f'    [{cells}]{comma}  // label {label}')

    lines += ['  ],', '};', '']
    return '\n'.join(lines)

puzzles = [
    {"path": "/tmp/gb1.png",  "id": "gb01", "title": "Gumball 1",
     "subtitle": "8×8 · Medium",
     "riddle": "I'm a blue cat with a knack for trouble,\\nmy adventures always burst the bubble.\\nWhat am I?",
     "export": "GUMBALL_1_PUZZLE",  "file": "gumball-1"},
    {"path": "/tmp/gb2.png",  "id": "gb02", "title": "Gumball 2",
     "subtitle": "8×8 · Medium",
     "riddle": "Elmore's favorite troublemaker, that's me,\\na cat with dreams as wide as the sea.\\nWhat am I?",
     "export": "GUMBALL_2_PUZZLE",  "file": "gumball-2"},
    {"path": "/tmp/gb3.png",  "id": "gb03", "title": "Gumball 3",
     "subtitle": "8×8 · Easy",
     "riddle": "Blue and goofy, I never back down,\\nthe funniest kid in all of Elmore town.\\nWhat am I?",
     "export": "GUMBALL_3_PUZZLE",  "file": "gumball-3"},
    {"path": "/tmp/gb4.png",  "id": "gb04", "title": "Gumball 4",
     "subtitle": "8×8 · Hard",
     "riddle": "My wild schemes never go as planned,\\nbut with Darwin by my side, I make a stand.\\nWhat am I?",
     "export": "GUMBALL_4_PUZZLE",  "file": "gumball-4"},
    {"path": "/tmp/gb5.png",  "id": "gb05", "title": "Gumball 5",
     "subtitle": "8×8 · Medium",
     "riddle": "I live on Elmore's most chaotic street,\\na cartoon cat you're destined to meet.\\nWhat am I?",
     "export": "GUMBALL_5_PUZZLE",  "file": "gumball-5"},
    {"path": "/tmp/gb6.png",  "id": "gb06", "title": "Gumball 6",
     "subtitle": "8×8 · Hard",
     "riddle": "The Amazing World is where I roam,\\nElmore Junior High is my second home.\\nWhat am I?",
     "export": "GUMBALL_6_PUZZLE",  "file": "gumball-6"},
    {"path": "/tmp/gb7.png",  "id": "gb07", "title": "Gumball 7",
     "subtitle": "8×8 · Medium",
     "riddle": "My family is loud, my life's a show,\\nwatch my adventures on Cartoon Network's glow.\\nWhat am I?",
     "export": "GUMBALL_7_PUZZLE",  "file": "gumball-7"},
    {"path": "/tmp/gb8.png",  "id": "gb08", "title": "Gumball 8",
     "subtitle": "8×8 · Easy",
     "riddle": "I'm a cat who loves to laugh and play,\\ncausing chaos and mischief every day.\\nWhat am I?",
     "export": "GUMBALL_8_PUZZLE",  "file": "gumball-8"},
    {"path": "/tmp/gb9.png",  "id": "gb09", "title": "Gumball 9",
     "subtitle": "8×8 · Medium",
     "riddle": "Big eyes, blue fur, always on the run,\\nwhen disaster strikes I'm never done.\\nWhat am I?",
     "export": "GUMBALL_9_PUZZLE",  "file": "gumball-9"},
    {"path": "/tmp/gb10.png", "id": "gb10", "title": "Gumball 10",
     "subtitle": "8×8 · Easy",
     "riddle": "I'm the star of my own cartoon life,\\ncutting through Elmore's everyday strife.\\nWhat am I?",
     "export": "GUMBALL_10_PUZZLE", "file": "gumball-10"},
    {"path": "/tmp/gb11.png", "id": "gb11", "title": "Gumball 11",
     "subtitle": "8×8 · Medium",
     "riddle": "A cat with heart and curiosity too,\\nno matter the problem I'll see it through.\\nWhat am I?",
     "export": "GUMBALL_11_PUZZLE", "file": "gumball-11"},
    {"path": "/tmp/gb12.png", "id": "gb12", "title": "Gumball 12",
     "subtitle": "8×8 · Hard",
     "riddle": "My wacky world is full of surprise,\\nElmore's funniest kid before your eyes.\\nWhat am I?",
     "export": "GUMBALL_12_PUZZLE", "file": "gumball-12"},
    {"path": "/tmp/gb13.png", "id": "gb13", "title": "Gumball 13",
     "subtitle": "8×8 · Medium",
     "riddle": "In Elmore strange things happen each day,\\nand I'm the blue cat leading the way.\\nWhat am I?",
     "export": "GUMBALL_13_PUZZLE", "file": "gumball-13"},
    {"path": "/tmp/gb14.png", "id": "gb14", "title": "Gumball 14",
     "subtitle": "8×8 · Easy",
     "riddle": "You know my name, it's quite a treat,\\na bubbly blue cat you'll always meet.\\nWhat am I?",
     "export": "GUMBALL_14_PUZZLE", "file": "gumball-14"},
    {"path": "/tmp/gb15.png", "id": "gb15", "title": "Gumball 15",
     "subtitle": "8×8 · Medium",
     "riddle": "My adventures on screen are quite a blast,\\nfrom first to last the laughs are unsurpassed.\\nWhat am I?",
     "export": "GUMBALL_15_PUZZLE", "file": "gumball-15"},
    {"path": "/tmp/gb16.png", "id": "gb16", "title": "Gumball 16",
     "subtitle": "8×8 · Hard",
     "riddle": "Always getting into quite a fix,\\nblue cat trouble is part of the mix.\\nWhat am I?",
     "export": "GUMBALL_16_PUZZLE", "file": "gumball-16"},
    {"path": "/tmp/gb17.png", "id": "gb17", "title": "Gumball 17",
     "subtitle": "8×8 · Medium",
     "riddle": "Life in Elmore is never dull,\\nI'm the blue cat keeping it full.\\nWhat am I?",
     "export": "GUMBALL_17_PUZZLE", "file": "gumball-17"},
    {"path": "/tmp/gb18.png", "id": "gb18", "title": "Gumball 18",
     "subtitle": "8×8 · Easy",
     "riddle": "From Elmore with love I bring the fun,\\na blue cat's story never truly done.\\nWhat am I?",
     "export": "GUMBALL_18_PUZZLE", "file": "gumball-18"},
    {"path": "/tmp/sb10.png", "id": "sb01", "title": "Spongebob",
     "subtitle": "8×8 · Medium",
     "riddle": "I live in a pineapple under the sea,\\nfrying Krabby Patties is the job for me.\\nWhat am I?",
     "export": "SPONGEBOB_1_PUZZLE", "file": "spongebob-1"},
    {"path": "/tmp/sb11.png", "id": "sb02", "title": "Patrick",
     "subtitle": "8×8 · Easy",
     "riddle": "I'm the best friend a sponge could need,\\nnapping under my rock is all I need.\\nWhat am I?",
     "export": "SPONGEBOB_2_PUZZLE", "file": "spongebob-2"},
    {"path": "/tmp/sb12.png", "id": "sb03", "title": "Squidward",
     "subtitle": "8×8 · Medium",
     "riddle": "I play my clarinet off-key with pride,\\nliving next door with nowhere to hide.\\nWhat am I?",
     "export": "SPONGEBOB_3_PUZZLE", "file": "spongebob-3"},
    {"path": "/tmp/sb13.png", "id": "sb04", "title": "Mr. Krabs",
     "subtitle": "8×8 · Hard",
     "riddle": "Money, money, money is all I adore,\\nthe Krabby Patty secret I keep in store.\\nWhat am I?",
     "export": "SPONGEBOB_4_PUZZLE", "file": "spongebob-4"},
    {"path": "/tmp/sb14.png", "id": "sb05", "title": "Plankton",
     "subtitle": "8×8 · Hard",
     "riddle": "One eye, one goal, one tiny dream,\\nsteal that secret recipe by any scheme.\\nWhat am I?",
     "export": "SPONGEBOB_5_PUZZLE", "file": "spongebob-5"},
    {"path": "/tmp/sb15.png", "id": "sb06", "title": "Sandy",
     "subtitle": "8×8 · Medium",
     "riddle": "A Texas squirrel in a dome of air,\\nkarate and science — I do it all with flair.\\nWhat am I?",
     "export": "SPONGEBOB_6_PUZZLE", "file": "spongebob-6"},
    {"path": "/tmp/sb16.png", "id": "sb07", "title": "Gary",
     "subtitle": "8×8 · Easy",
     "riddle": "I meow like a cat but live in the sea,\\nSpongeBob's faithful pet is what I be.\\nWhat am I?",
     "export": "SPONGEBOB_7_PUZZLE", "file": "spongebob-7"},
    {"path": "/tmp/sb17.png", "id": "sb08", "title": "Mrs. Puff",
     "subtitle": "8×8 · Medium",
     "riddle": "I teach boating school in Bikini Bottom town,\\none student's driving always makes me drown.\\nWhat am I?",
     "export": "SPONGEBOB_8_PUZZLE", "file": "spongebob-8"},
    {"path": "/tmp/sb18.png", "id": "sb09", "title": "Jellyfish",
     "subtitle": "8×8 · Easy",
     "riddle": "I drift through Jellyfish Fields all day,\\nSpongeBob loves to catch me and let me play.\\nWhat am I?",
     "export": "SPONGEBOB_9_PUZZLE", "file": "spongebob-9"},
    {"path": "/tmp/sb19.png", "id": "sb10", "title": "Spongebob 2",
     "subtitle": "8×8 · Medium",
     "riddle": "Square and yellow, ready to go,\\nI'm always ready — don't you know?\\nWhat am I?",
     "export": "SPONGEBOB_10_PUZZLE", "file": "spongebob-10"},
    {"path": "/tmp/sb20.png", "id": "sb11", "title": "Patrick 2",
     "subtitle": "8×8 · Easy",
     "riddle": "I may not be the sharpest tool,\\nbut being a starfish is pretty cool.\\nWhat am I?",
     "export": "SPONGEBOB_11_PUZZLE", "file": "spongebob-11"},
]

output_dir = "/Users/alexanderdow/Documents/Claude Code/pencil-puzzles/src/puzzles"
results = []

for p in puzzles:
    print(f"\nProcessing {p['title']}...", file=sys.stderr)
    try:
        grid = extract_grid(p["path"])

        # Print preview
        print(f"  40x40 grid preview (8x8 tiles):", file=sys.stderr)
        for r in range(GRID_CELLS):
            prefix = "  " + ("─" * 1 if r % 5 == 0 else " ")
            row_str = "".join("█" if c else "·" for c in grid[r])
            # Add tile separators every 5 cols
            row_visual = ""
            for c, ch in enumerate(row_str):
                if c % 5 == 0 and c > 0:
                    row_visual += "|"
                row_visual += ch
            print(f"  {row_visual}", file=sys.stderr)

        solution = grid_to_tiles(grid)
        js = solution_to_js(solution, p["id"], p["title"], p["subtitle"],
                            p["riddle"], p["export"])

        out_path = os.path.join(output_dir, p["file"] + ".js")
        with open(out_path, "w") as f:
            f.write(js)
        print(f"  → Written: {out_path}", file=sys.stderr)
        results.append((p["export"], p["file"]))
    except Exception as e:
        import traceback; traceback.print_exc(file=sys.stderr)

# Print index additions
print("\n=== index.js additions ===", file=sys.stderr)
for export_name, file_name in results:
    print(f'import {{ {export_name} }} from "./{file_name}";', file=sys.stderr)
print(file=sys.stderr)
for export_name, file_name in results:
    cat = "Gumball" if "GUMBALL" in export_name else "Spongebob"
    print(f'  {{ puzzle: {export_name}, free: true, category: "{cat}" }},', file=sys.stderr)
