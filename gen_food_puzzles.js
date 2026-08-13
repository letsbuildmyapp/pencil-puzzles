#!/usr/bin/env node
// Outline-style food puzzle pixel art generator

import { writeFileSync } from "fs";

function makeGrid() { return Array.from({ length: 40 }, () => Array(40).fill(0)); }
function gridToStrings(g) { return g.map(r => r.join("")); }

function set(g, x, y, v = 1) { if (x >= 0 && x < 40 && y >= 0 && y < 40) g[y][x] = v; }

function outlineCircle(g, cx, cy, r) {
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
    const d = (x - cx) ** 2 + (y - cy) ** 2;
    if (d <= r * r && d >= (r - 1.5) ** 2) g[y][x] = 1;
  }
}
function outlineEllipse(g, cx, cy, rx, ry) {
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
    const dOuter = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
    const dInner = ((x - cx) / (rx - 1)) ** 2 + ((y - cy) / Math.max(1, ry - 1)) ** 2;
    if (dOuter <= 1 && dInner >= 1) g[y][x] = 1;
  }
}
function outlineRect(g, x1, y1, x2, y2) {
  for (let x = x1; x <= x2; x++) { set(g, x, y1); set(g, x, y2); }
  for (let y = y1; y <= y2; y++) { set(g, x1, y); set(g, x2, y); }
}
function fillRect(g, x1, y1, x2, y2) {
  for (let y = Math.max(0, y1); y <= Math.min(39, y2); y++)
    for (let x = Math.max(0, x1); x <= Math.min(39, x2); x++) g[y][x] = 1;
}
function fillCircle(g, cx, cy, r) {
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++)
    if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) g[y][x] = 1;
}
function line(g, x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1;
  let err = dx - dy, x = x1, y = y1;
  while (true) {
    set(g, x, y);
    if (x === x2 && y === y2) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
  }
}
// Draw a partial circular arc between angles a1 and a2 (radians)
function arc(g, cx, cy, r, a1, a2, steps = 80) {
  for (let i = 0; i <= steps; i++) {
    const a = a1 + (a2 - a1) * (i / steps);
    const x = Math.round(cx + Math.cos(a) * r);
    const y = Math.round(cy + Math.sin(a) * r);
    set(g, x, y);
  }
}
function thickArc(g, cx, cy, r, a1, a2) {
  arc(g, cx, cy, r, a1, a2);
  arc(g, cx, cy, r - 1, a1, a2);
}

const puzzles = [];

// 1. Pizza Slice — triangular outline with crust arc at top, pepperoni circles
{
  const g = makeGrid();
  // Two straight edges of triangle from top corners to bottom point
  line(g, 5, 6, 20, 36);
  line(g, 35, 6, 20, 36);
  line(g, 6, 6, 20, 37);
  line(g, 34, 6, 20, 37);
  // Crust arc at top
  arc(g, 20, 8, 15, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 8, 16, Math.PI, 2 * Math.PI, 60);
  // Inner crust line
  line(g, 5, 8, 35, 8);
  // Pepperoni circles
  outlineCircle(g, 14, 15, 3);
  outlineCircle(g, 26, 15, 3);
  outlineCircle(g, 20, 23, 3);
  puzzles.push({ title: "Pizza Slice", riddle: "I come in a box with my friends\nI'm covered in cheese and toppings\nWhat am I?", grid: gridToStrings(g) });
}

// 2. Hamburger — outline side view
{
  const g = makeGrid();
  // Top bun — dome arc
  arc(g, 20, 16, 16, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 16, 15, Math.PI, 2 * Math.PI, 60);
  // Top bun bottom line
  line(g, 4, 16, 36, 16);
  // Sesame seeds
  outlineCircle(g, 14, 10, 1);
  outlineCircle(g, 20, 8, 1);
  outlineCircle(g, 26, 10, 1);
  // Lettuce (wavy line)
  for (let x = 3; x <= 37; x++) {
    const y = 19 + Math.round(Math.sin(x * 0.7) * 1.5);
    set(g, x, y);
  }
  // Patty (two horizontal lines)
  line(g, 3, 22, 37, 22);
  line(g, 3, 24, 37, 24);
  // Cheese dripping
  line(g, 3, 24, 3, 26);
  line(g, 10, 24, 9, 27);
  line(g, 37, 24, 37, 26);
  line(g, 30, 24, 31, 27);
  // Bottom bun — upside-down half ellipse
  arc(g, 20, 27, 16, 0, Math.PI, 60);
  arc(g, 20, 27, 15, 0, Math.PI, 60);
  line(g, 4, 27, 36, 27);
  puzzles.push({ title: "Hamburger", riddle: "I'm stacked with layers between two buns\nI'm America's favorite meal\nWhat am I?", grid: gridToStrings(g) });
}

// 3. Ice Cream Cone — scoop outlines + waffle cone
{
  const g = makeGrid();
  // Three scoops on top
  outlineCircle(g, 14, 10, 6);
  outlineCircle(g, 26, 10, 6);
  outlineCircle(g, 20, 6, 6);
  // Bottom of scoop (covering joins) - arc bottom
  arc(g, 20, 14, 11, 0, Math.PI, 60);
  arc(g, 20, 14, 10, 0, Math.PI, 60);
  // Cone triangle
  line(g, 11, 19, 20, 38);
  line(g, 10, 19, 20, 39);
  line(g, 29, 19, 20, 38);
  line(g, 30, 19, 20, 39);
  // Cone top edge
  line(g, 10, 19, 30, 19);
  // Waffle cross lines on cone
  line(g, 14, 19, 20, 38);
  line(g, 17, 19, 20, 31);
  line(g, 23, 19, 20, 31);
  line(g, 26, 19, 20, 38);
  line(g, 12, 25, 28, 25);
  line(g, 14, 31, 26, 31);
  puzzles.push({ title: "Ice Cream Cone", riddle: "I'm cold and sweet on a summer day\nI sit on top of a crunchy cone\nWhat am I?", grid: gridToStrings(g) });
}

// 4. Donut — two concentric circle outlines with sprinkles
{
  const g = makeGrid();
  outlineCircle(g, 20, 20, 16);
  outlineCircle(g, 20, 20, 15);
  outlineCircle(g, 20, 20, 7);
  outlineCircle(g, 20, 20, 6);
  // Sprinkles (small dashes)
  line(g, 10, 12, 12, 13);
  line(g, 28, 12, 30, 13);
  line(g, 10, 28, 12, 27);
  line(g, 28, 28, 30, 27);
  line(g, 13, 7, 15, 7);
  line(g, 25, 7, 27, 7);
  line(g, 13, 33, 15, 33);
  line(g, 25, 33, 27, 33);
  puzzles.push({ title: "Donut", riddle: "I'm round with a hole in my middle\nI'm glazed and sometimes sprinkled\nWhat am I?", grid: gridToStrings(g) });
}

// 5. Apple — heart-ish outline with stem and leaf
{
  const g = makeGrid();
  // Apple body — two overlapping circle arcs
  arc(g, 15, 24, 12, Math.PI / 3, Math.PI * 5 / 3, 60);
  arc(g, 15, 24, 11, Math.PI / 3, Math.PI * 5 / 3, 60);
  arc(g, 25, 24, 12, Math.PI * 4 / 3, Math.PI * 8 / 3, 60);
  arc(g, 25, 24, 11, Math.PI * 4 / 3, Math.PI * 8 / 3, 60);
  // Top dip
  arc(g, 20, 11, 5, 0, Math.PI, 40);
  arc(g, 20, 11, 4, 0, Math.PI, 40);
  // Stem
  line(g, 20, 5, 20, 10);
  line(g, 21, 5, 21, 10);
  // Leaf
  arc(g, 26, 7, 4, Math.PI, 2 * Math.PI, 30);
  line(g, 22, 7, 30, 7);
  puzzles.push({ title: "Apple", riddle: "I keep the doctor away\nI'm red, green, or yellow\nWhat am I?", grid: gridToStrings(g) });
}

// 6. Banana — crescent using quadratic Bezier outlines
{
  const g = makeGrid();
  function quadBezier(p0, p1, p2, steps = 80) {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0]);
      const y = Math.round((1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1]);
      pts.push([x, y]);
    }
    return pts;
  }
  function drawPath(pts) {
    for (let i = 0; i < pts.length - 1; i++) line(g, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
  }
  // Outer curve (convex/right side)
  const outer = quadBezier([30, 6], [38, 28], [10, 36]);
  drawPath(outer);
  // Inner curve (concave/left side)
  const inner = quadBezier([26, 10], [24, 22], [14, 30]);
  drawPath(inner);
  // Stem cap at top right
  line(g, 26, 10, 30, 6);
  line(g, 27, 10, 30, 7);
  // Stem nub
  line(g, 28, 3, 31, 3);
  line(g, 28, 3, 28, 6);
  line(g, 31, 3, 31, 6);
  line(g, 28, 6, 30, 6);
  // Tip at bottom
  line(g, 14, 30, 10, 36);
  line(g, 13, 32, 12, 36);
  puzzles.push({ title: "Banana", riddle: "I'm yellow and curved\nMonkeys love me the most\nWhat am I?", grid: gridToStrings(g) });
}

// 7. Cupcake — wrapper + frosting swirl outline
{
  const g = makeGrid();
  // Wrapper (trapezoid outline)
  line(g, 10, 22, 30, 22);
  line(g, 10, 22, 14, 37);
  line(g, 30, 22, 26, 37);
  line(g, 14, 37, 26, 37);
  // Vertical ridges
  line(g, 15, 23, 16, 36);
  line(g, 20, 23, 20, 36);
  line(g, 25, 23, 24, 36);
  // Frosting swirl — arcs stacked
  arc(g, 20, 18, 13, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 18, 12, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 13, 10, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 13, 9, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 9, 6, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 9, 5, Math.PI, 2 * Math.PI, 60);
  // Cherry
  outlineCircle(g, 20, 4, 2);
  puzzles.push({ title: "Cupcake", riddle: "I'm a tiny cake with frosting on top\nI sometimes wear a cherry hat\nWhat am I?", grid: gridToStrings(g) });
}

// 8. Hot Dog — bun outline with sausage inside
{
  const g = makeGrid();
  // Outer bun outline (rounded rectangle)
  arc(g, 8, 20, 7, Math.PI / 2, 3 * Math.PI / 2, 60);
  arc(g, 8, 20, 6, Math.PI / 2, 3 * Math.PI / 2, 60);
  arc(g, 32, 20, 7, -Math.PI / 2, Math.PI / 2, 60);
  arc(g, 32, 20, 6, -Math.PI / 2, Math.PI / 2, 60);
  line(g, 8, 13, 32, 13);
  line(g, 8, 14, 32, 14);
  line(g, 8, 27, 32, 27);
  line(g, 8, 26, 32, 26);
  // Sausage inside (ellipse)
  arc(g, 10, 20, 4, Math.PI / 2, 3 * Math.PI / 2, 40);
  arc(g, 30, 20, 4, -Math.PI / 2, Math.PI / 2, 40);
  line(g, 10, 16, 30, 16);
  line(g, 10, 24, 30, 24);
  // Mustard zigzag
  for (let x = 12; x <= 28; x += 2) {
    const y = x % 4 === 0 ? 19 : 21;
    set(g, x, y);
    set(g, x + 1, y);
  }
  puzzles.push({ title: "Hot Dog", riddle: "I'm a sausage in a bun\nYou'll find me at every ballpark\nWhat am I?", grid: gridToStrings(g) });
}

// 9. Watermelon slice — half-circle outline with seeds
{
  const g = makeGrid();
  // Rind top
  line(g, 4, 10, 36, 10);
  line(g, 4, 11, 36, 11);
  // Curved bottom (half circle)
  arc(g, 20, 10, 16, 0, Math.PI, 80);
  arc(g, 20, 10, 15, 0, Math.PI, 80);
  // Inner flesh line
  arc(g, 20, 10, 13, 0, Math.PI, 60);
  line(g, 7, 11, 33, 11);
  // Seeds
  outlineCircle(g, 13, 17, 1);
  outlineCircle(g, 20, 15, 1);
  outlineCircle(g, 27, 17, 1);
  outlineCircle(g, 16, 21, 1);
  outlineCircle(g, 24, 21, 1);
  outlineCircle(g, 20, 24, 1);
  puzzles.push({ title: "Watermelon", riddle: "I'm green on the outside, red inside\nI'm full of seeds and summer vibes\nWhat am I?", grid: gridToStrings(g) });
}

// 10. Cookie — circle outline with chips as small circles
{
  const g = makeGrid();
  outlineCircle(g, 20, 20, 15);
  outlineCircle(g, 20, 20, 14);
  // Bite taken out (arc cutout at top right)
  for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) {
    const d = Math.sqrt((x - 32) ** 2 + (y - 10) ** 2);
    if (d <= 6) g[y][x] = 0;
  }
  // Bite edge
  arc(g, 32, 10, 6, Math.PI, 2 * Math.PI, 40);
  arc(g, 32, 10, 6, 0, Math.PI / 2, 20);
  // Chocolate chips
  outlineCircle(g, 13, 15, 2);
  outlineCircle(g, 22, 14, 2);
  outlineCircle(g, 12, 25, 2);
  outlineCircle(g, 20, 24, 2);
  outlineCircle(g, 27, 26, 2);
  outlineCircle(g, 17, 30, 2);
  puzzles.push({ title: "Cookie", riddle: "I'm round and flat and full of chips\nI go great with a glass of milk\nWhat am I?", grid: gridToStrings(g) });
}

// 11. Taco — U-shell outline with filling tops
{
  const g = makeGrid();
  // Shell outer outline (U shape)
  arc(g, 20, 18, 16, 0, Math.PI, 60);
  arc(g, 20, 18, 15, 0, Math.PI, 60);
  // Shell inner outline
  arc(g, 20, 18, 11, 0, Math.PI, 60);
  arc(g, 20, 18, 10, 0, Math.PI, 60);
  // Top edge (close the shell at the opening)
  line(g, 4, 18, 10, 18);
  line(g, 30, 18, 36, 18);
  // Filling bumps sticking out the top
  arc(g, 13, 18, 4, Math.PI, 2 * Math.PI, 30);
  arc(g, 20, 18, 5, Math.PI, 2 * Math.PI, 30);
  arc(g, 27, 18, 4, Math.PI, 2 * Math.PI, 30);
  // Lettuce/cheese shreds
  line(g, 11, 10, 14, 14);
  line(g, 17, 8, 18, 13);
  line(g, 23, 8, 22, 13);
  line(g, 26, 10, 27, 14);
  puzzles.push({ title: "Taco", riddle: "I'm folded and filled with tasty things\nIt's always Tuesday when I'm around\nWhat am I?", grid: gridToStrings(g) });
}

// 12. French Fries — box outline with stick fries
{
  const g = makeGrid();
  // Box (trapezoid)
  line(g, 10, 22, 30, 22);
  line(g, 10, 22, 12, 37);
  line(g, 30, 22, 28, 37);
  line(g, 12, 37, 28, 37);
  // Box band
  line(g, 10, 25, 30, 25);
  // Fries sticking up (rectangle outlines)
  outlineRect(g, 12, 5, 14, 24);
  outlineRect(g, 16, 2, 18, 24);
  outlineRect(g, 20, 6, 22, 24);
  outlineRect(g, 24, 3, 26, 24);
  outlineRect(g, 27, 8, 29, 24);
  // Leaning fry
  line(g, 10, 10, 13, 24);
  line(g, 11, 10, 14, 24);
  puzzles.push({ title: "French Fries", riddle: "We're golden sticks in a paper sleeve\nWe love ketchup and salt\nWhat are we?", grid: gridToStrings(g) });
}

// 13. Popsicle — rounded rectangle outline on stick
{
  const g = makeGrid();
  // Body (rounded top, square bottom)
  arc(g, 20, 8, 8, Math.PI, 2 * Math.PI, 40);
  arc(g, 20, 8, 7, Math.PI, 2 * Math.PI, 40);
  line(g, 12, 8, 12, 28);
  line(g, 13, 8, 13, 28);
  line(g, 27, 8, 27, 28);
  line(g, 28, 8, 28, 28);
  line(g, 12, 28, 28, 28);
  line(g, 12, 27, 28, 27);
  // Bite mark on side
  arc(g, 28, 16, 4, -Math.PI / 2, Math.PI / 2, 30);
  // Stick
  outlineRect(g, 18, 28, 22, 38);
  puzzles.push({ title: "Popsicle", riddle: "I'm frozen on a stick\nI come in every flavor and color\nWhat am I?", grid: gridToStrings(g) });
}

// 14. Candy — wrapped candy with twist ends, outline
{
  const g = makeGrid();
  // Center body (rounded rectangle)
  arc(g, 15, 20, 4, Math.PI / 2, 3 * Math.PI / 2, 30);
  arc(g, 25, 20, 4, -Math.PI / 2, Math.PI / 2, 30);
  line(g, 15, 16, 25, 16);
  line(g, 15, 24, 25, 24);
  // Left wrapper twist (triangle outline)
  line(g, 11, 20, 3, 14);
  line(g, 11, 20, 3, 26);
  line(g, 3, 14, 3, 26);
  // Crinkles on left
  line(g, 3, 18, 7, 19);
  line(g, 3, 22, 7, 21);
  // Right wrapper twist
  line(g, 29, 20, 37, 14);
  line(g, 29, 20, 37, 26);
  line(g, 37, 14, 37, 26);
  // Crinkles on right
  line(g, 37, 18, 33, 19);
  line(g, 37, 22, 33, 21);
  // Stripe on candy body
  line(g, 17, 18, 23, 22);
  line(g, 17, 22, 23, 18);
  puzzles.push({ title: "Candy", riddle: "I'm wrapped up in a shiny wrapper\nI'm sweet and come in many flavors\nWhat am I?", grid: gridToStrings(g) });
}

// 15. Cherry — two circle outlines with curved stems
{
  const g = makeGrid();
  // Left cherry
  outlineCircle(g, 14, 28, 8);
  outlineCircle(g, 14, 28, 7);
  // Right cherry
  outlineCircle(g, 27, 30, 7);
  outlineCircle(g, 27, 30, 6);
  // Highlights (small arcs)
  arc(g, 11, 25, 3, Math.PI, 3 * Math.PI / 2, 15);
  arc(g, 24, 27, 2, Math.PI, 3 * Math.PI / 2, 10);
  // Stems meeting at top
  line(g, 14, 20, 19, 5);
  line(g, 15, 20, 20, 5);
  line(g, 27, 23, 22, 5);
  line(g, 26, 23, 21, 5);
  // Leaf
  arc(g, 25, 7, 4, Math.PI, 2 * Math.PI, 30);
  line(g, 21, 7, 29, 7);
  puzzles.push({ title: "Cherry", riddle: "We come in pairs on stems\nWe sit on top of sundaes\nWhat are we?", grid: gridToStrings(g) });
}

// 16. Sushi Roll — concentric circle outlines with filling dots
{
  const g = makeGrid();
  outlineCircle(g, 20, 20, 16);
  outlineCircle(g, 20, 20, 15);
  outlineCircle(g, 20, 20, 12);
  outlineCircle(g, 20, 20, 11);
  // Filling pieces
  outlineCircle(g, 17, 17, 3);
  outlineCircle(g, 24, 17, 3);
  outlineCircle(g, 20, 24, 3);
  // Center piece
  set(g, 20, 20);
  puzzles.push({ title: "Sushi", riddle: "I'm a roll of rice and fish\nI come with soy sauce and wasabi\nWhat am I?", grid: gridToStrings(g) });
}

// 17. Pretzel — interlocking loops outline
{
  const g = makeGrid();
  // Top arch (outer)
  arc(g, 20, 16, 13, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 16, 12, Math.PI, 2 * Math.PI, 60);
  // Top arch inner
  arc(g, 20, 16, 8, Math.PI, 2 * Math.PI, 50);
  arc(g, 20, 16, 7, Math.PI, 2 * Math.PI, 50);
  // Left loop
  outlineCircle(g, 14, 26, 7);
  outlineCircle(g, 14, 26, 6);
  // Right loop
  outlineCircle(g, 26, 26, 7);
  outlineCircle(g, 26, 26, 6);
  // Crossing arms
  line(g, 13, 16, 24, 24);
  line(g, 14, 16, 25, 24);
  line(g, 27, 16, 16, 24);
  line(g, 26, 16, 15, 24);
  puzzles.push({ title: "Pretzel", riddle: "I'm twisted into a knot\nI'm salty and baked golden brown\nWhat am I?", grid: gridToStrings(g) });
}

// 18. Lollipop — circle with spiral, stick
{
  const g = makeGrid();
  // Outer circle
  outlineCircle(g, 20, 13, 12);
  outlineCircle(g, 20, 13, 11);
  // Spiral (using arcs at decreasing radii)
  arc(g, 20, 13, 9, 0, Math.PI * 2, 100);
  arc(g, 20, 13, 6, Math.PI / 4, Math.PI * 9 / 4, 80);
  arc(g, 20, 13, 3, Math.PI / 2, Math.PI * 5 / 2, 40);
  // Stick
  outlineRect(g, 19, 24, 21, 38);
  puzzles.push({ title: "Lollipop", riddle: "I'm a candy on a stick\nI'm swirly and fun to lick\nWhat am I?", grid: gridToStrings(g) });
}

// 19. Pie Slice — wedge outline with crust marks
{
  const g = makeGrid();
  // Triangle wedge
  line(g, 4, 8, 20, 35);
  line(g, 36, 8, 20, 35);
  line(g, 5, 8, 20, 36);
  line(g, 35, 8, 20, 36);
  // Top (crust edge) — scalloped
  for (let x = 4; x <= 36; x += 3) {
    arc(g, x, 8, 2, Math.PI, 2 * Math.PI, 15);
  }
  line(g, 4, 8, 36, 8);
  // Inner crust line
  line(g, 7, 11, 33, 11);
  // Lattice strips
  line(g, 10, 14, 15, 24);
  line(g, 20, 14, 20, 30);
  line(g, 30, 14, 25, 24);
  line(g, 12, 18, 28, 18);
  line(g, 14, 23, 26, 23);
  puzzles.push({ title: "Pie", riddle: "I come in slices after dinner\nI can be apple, cherry, or pumpkin\nWhat am I?", grid: gridToStrings(g) });
}

// 20. Mushroom — cap outline + stem outline + spots
{
  const g = makeGrid();
  // Cap (dome arc)
  arc(g, 20, 15, 15, Math.PI, 2 * Math.PI, 60);
  arc(g, 20, 15, 14, Math.PI, 2 * Math.PI, 60);
  // Cap bottom line
  line(g, 5, 15, 35, 15);
  line(g, 5, 16, 35, 16);
  // Spots on cap
  outlineCircle(g, 13, 9, 3);
  outlineCircle(g, 25, 6, 3);
  outlineCircle(g, 29, 12, 2);
  outlineCircle(g, 17, 13, 2);
  // Stem (two vertical lines flaring slightly at bottom)
  line(g, 14, 16, 12, 35);
  line(g, 15, 16, 13, 35);
  line(g, 26, 16, 28, 35);
  line(g, 25, 16, 27, 35);
  // Stem bottom
  arc(g, 20, 35, 8, 0, Math.PI, 40);
  puzzles.push({ title: "Mushroom", riddle: "I have a cap but I'm not a hat\nI grow in dark and damp places\nWhat am I?", grid: gridToStrings(g) });
}

// Assign IDs
const output = puzzles.map((p, i) => ({
  id: `fd${String(i + 1).padStart(2, "0")}`,
  title: p.title,
  category: "Food",
  riddle: p.riddle,
  grid: p.grid,
}));

writeFileSync("food_puzzles.json", JSON.stringify(output, null, 2));
console.log(`Generated ${output.length} food puzzles → food_puzzles.json`);
