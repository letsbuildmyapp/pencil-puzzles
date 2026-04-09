import { PUZZLE_LIST } from "../puzzles/index";

const CREDITS_KEY = "pp_credits";
const UNLIMITED_KEY = "pp_unlimited";
const UNLOCKED_KEY = "pp_unlocked";

const DAILY_EPOCH = new Date("2026-04-02T00:00:00");

export function getDailyPuzzle() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((now - DAILY_EPOCH) / (1000 * 60 * 60 * 24));
  const index = ((dayIndex % PUZZLE_LIST.length) + PUZZLE_LIST.length) % PUZZLE_LIST.length;
  return PUZZLE_LIST[index].puzzle;
}

export function isAlwaysFree(puzzleId) {
  return puzzleId === getDailyPuzzle().id;
}

export function getCredits() {
  if (localStorage.getItem(UNLIMITED_KEY) === "true") return Infinity;
  return parseInt(localStorage.getItem(CREDITS_KEY) || "0", 10);
}

export function isUnlocked(puzzleId) {
  if (isAlwaysFree(puzzleId)) return true;
  if (localStorage.getItem(UNLIMITED_KEY) === "true") return true;
  try {
    const unlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || "[]");
    return unlocked.includes(puzzleId);
  } catch { return false; }
}

const WELCOME_KEY = "pp_welcome_given";

export function giveWelcomeCredits() {
  if (localStorage.getItem(WELCOME_KEY)) return;
  localStorage.setItem(WELCOME_KEY, "1");
  addCredits(5);
}

export function addCredits(n) {
  if (n === Infinity) {
    localStorage.setItem(UNLIMITED_KEY, "true");
  } else {
    const current = getCredits();
    if (current !== Infinity) {
      localStorage.setItem(CREDITS_KEY, String(current + n));
    }
  }
}

// Returns true if successfully unlocked, false if not enough credits
export function spendCreditToUnlock(puzzleId) {
  if (isUnlocked(puzzleId)) return true;
  const credits = getCredits();
  if (credits <= 0) return false;
  if (credits !== Infinity) {
    localStorage.setItem(CREDITS_KEY, String(credits - 1));
  }
  try {
    const unlocked = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || "[]");
    if (!unlocked.includes(puzzleId)) {
      unlocked.push(puzzleId);
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(unlocked));
    }
  } catch {}
  return true;
}
