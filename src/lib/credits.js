import { PUZZLE_LIST } from "../puzzles/index";
import { recordCreditTx, SOURCES, TYPES } from "./creditHistory";
import { trackPuzzleUnlock } from "./analytics";

const CREDITS_KEY = "pp_credits";
const UNLIMITED_KEY = "pp_unlimited";
const UNLOCKED_KEY = "pp_unlocked";
const REDEEMED_KEY = "pp_redeemed_codes";

const COUPONS = {
  "5CREDITS": 5,
  "10CREDITS": 10,
  "DOWTIME": Infinity,
};

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

export function giveWelcomeCredits(force = false) {
  if (!force && localStorage.getItem(WELCOME_KEY)) return;
  localStorage.setItem(WELCOME_KEY, "1");
  addCredits(5);
  recordCreditTx({ type: TYPES.EARN, source: SOURCES.WELCOME, amount: 5 });
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

function getRedeemedCodes() {
  try {
    return JSON.parse(localStorage.getItem(REDEEMED_KEY) || "[]");
  } catch { return []; }
}

// Returns { ok: true, amount } on success, or { ok: false, reason } on failure
export function redeemCoupon(rawCode) {
  const code = (rawCode || "").trim().toUpperCase();
  if (!code) return { ok: false, reason: "Enter a code" };
  if (!(code in COUPONS)) return { ok: false, reason: "Invalid code" };
  const redeemed = getRedeemedCodes();
  if (redeemed.includes(code)) return { ok: false, reason: "Already redeemed" };
  const amount = COUPONS[code];
  addCredits(amount);
  redeemed.push(code);
  localStorage.setItem(REDEEMED_KEY, JSON.stringify(redeemed));
  recordCreditTx({ type: TYPES.EARN, source: SOURCES.COUPON, amount, meta: { code } });
  return { ok: true, amount };
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
  // Only log the spend if credits were actually charged (not unlimited).
  if (credits !== Infinity) {
    recordCreditTx({ type: TYPES.SPEND, source: SOURCES.PUZZLE_UNLOCK, amount: 1, meta: { puzzleId } });
  }
  trackPuzzleUnlock(puzzleId);
  return true;
}
