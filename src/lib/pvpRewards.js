// PvP retention loops: daily login streak bonus, per-match credit rewards,
// and a lightweight XP/level progression. All persisted in localStorage so
// it's per-device (no server round trip). Keep these idempotent — every
// function should be safe to call multiple times per day without double-rewards.
import { addCredits } from "./credits";
import { recordCreditTx, SOURCES, TYPES } from "./creditHistory";

const LOGIN_LAST_DATE_KEY = "pp_login_bonus_last_date";
const LOGIN_STREAK_KEY = "pp_login_bonus_streak";
const PVP_LAST_MATCH_DATE_KEY = "pp_pvp_last_match_date";
const PVP_LAST_WIN_DATE_KEY = "pp_pvp_last_win_date";
const PVP_STATS_KEY = "pp_pvp_stats"; // { xp, wins, matches, winStreak, bestWinStreak }

// ===== Date helpers =====
// Use local YYYY-MM-DD strings so "day" boundaries follow the user's own
// calendar — not UTC, which would flip the day in the middle of a session
// for most time zones.
function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(aStr, bStr) {
  if (!aStr || !bStr) return Infinity;
  const a = new Date(aStr);
  const b = new Date(bStr);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

// ===== Loop #1: Daily login streak =====
// Day 1–3: 1 credit, Day 4–6: 2 credits, Day 7+: 3 credits/day (plateau).
// Missing a day resets the streak to 1. Returns { credits, streak, firstTimeToday }.
export function grantDailyLoginBonus() {
  const now = today();
  const last = localStorage.getItem(LOGIN_LAST_DATE_KEY);
  if (last === now) {
    // Already granted today — no-op but still return the current streak.
    return {
      credits: 0,
      streak: parseInt(localStorage.getItem(LOGIN_STREAK_KEY) || "0", 10),
      firstTimeToday: false,
    };
  }

  const gap = daysBetween(last, now);
  let streak = parseInt(localStorage.getItem(LOGIN_STREAK_KEY) || "0", 10);
  if (gap === 1) {
    streak += 1;
  } else {
    streak = 1; // first login ever OR gap > 1 day → reset
  }

  const credits = streak >= 7 ? 3 : streak >= 4 ? 2 : 1;
  addCredits(credits);
  localStorage.setItem(LOGIN_LAST_DATE_KEY, now);
  localStorage.setItem(LOGIN_STREAK_KEY, String(streak));
  recordCreditTx({ type: TYPES.EARN, source: SOURCES.LOGIN_STREAK, amount: credits, meta: { streak } });
  return { credits, streak, firstTimeToday: true };
}

export function getLoginStreak() {
  return parseInt(localStorage.getItem(LOGIN_STREAK_KEY) || "0", 10);
}

// ===== Loop #2: PvP credit rewards =====
// First match of the day: +1 credit. First win of the day: +1 bonus credit.
// Subsequent matches earn 0. Cap is 2 credits/day from PvP total.
// Each function is idempotent per day so the caller can fire liberally.

// Call when the player successfully joins a match (start-of-match reward).
// Returns true if a credit was actually granted (first time today), else false.
export function grantFirstMatchBonusIfEligible() {
  const now = today();
  if (localStorage.getItem(PVP_LAST_MATCH_DATE_KEY) === now) return false;
  localStorage.setItem(PVP_LAST_MATCH_DATE_KEY, now);
  addCredits(1);
  recordCreditTx({ type: TYPES.EARN, source: SOURCES.PVP_FIRST_MATCH, amount: 1 });
  return true;
}

// Call on match end with winner === "me". Returns true if a credit was granted.
export function grantFirstWinBonusIfEligible() {
  const now = today();
  if (localStorage.getItem(PVP_LAST_WIN_DATE_KEY) === now) return false;
  localStorage.setItem(PVP_LAST_WIN_DATE_KEY, now);
  addCredits(1);
  recordCreditTx({ type: TYPES.EARN, source: SOURCES.PVP_FIRST_WIN, amount: 1 });
  return true;
}

// ===== Loop #3: PvP XP / level =====
// Simple linear curve: every 100 XP = 1 level. +15 XP per match played, bonus
// +20 XP for a win. Track lifetime wins, matches, and current win streak for
// display on the profile tab.
const XP_PER_MATCH = 15;
const XP_PER_WIN = 20;
const XP_PER_LEVEL = 100;

function defaultStats() {
  return { xp: 0, wins: 0, matches: 0, winStreak: 0, bestWinStreak: 0 };
}

export function getPvpStats() {
  try {
    const raw = localStorage.getItem(PVP_STATS_KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw);
    return { ...defaultStats(), ...parsed };
  } catch {
    return defaultStats();
  }
}

function savePvpStats(stats) {
  try { localStorage.setItem(PVP_STATS_KEY, JSON.stringify(stats)); } catch {}
}

export function levelFromXp(xp) {
  return Math.floor((xp || 0) / XP_PER_LEVEL) + 1;
}

export function xpIntoCurrentLevel(xp) {
  return (xp || 0) % XP_PER_LEVEL;
}

export function xpNeededForNextLevel() {
  return XP_PER_LEVEL;
}

// Record a completed match. `won` is true if the player won, false otherwise
// (tie or loss). Returns { xpEarned, leveledUp, newLevel, prevLevel }.
export function recordPvpMatch(won) {
  const stats = getPvpStats();
  const prevLevel = levelFromXp(stats.xp);
  const xpEarned = XP_PER_MATCH + (won ? XP_PER_WIN : 0);
  stats.xp += xpEarned;
  stats.matches += 1;
  if (won) {
    stats.wins += 1;
    stats.winStreak += 1;
    if (stats.winStreak > stats.bestWinStreak) stats.bestWinStreak = stats.winStreak;
  } else {
    stats.winStreak = 0;
  }
  savePvpStats(stats);
  const newLevel = levelFromXp(stats.xp);
  return { xpEarned, leveledUp: newLevel > prevLevel, newLevel, prevLevel };
}
