// Credit transaction log. Every earn / spend / purchase is appended here so
// the user can see a full history in the profile tab. Stored as a JSON array
// in localStorage, capped at HISTORY_MAX entries (oldest pruned).

const HISTORY_KEY = "pp_credit_history";
const HISTORY_MAX = 200;

// Canonical source IDs — keep these stable so historical entries remain
// readable after future renames. The UI maps these to labels/icons.
export const SOURCES = {
  WELCOME: "welcome",
  LOGIN_STREAK: "login_streak",
  PVP_FIRST_MATCH: "pvp_first_match",
  PVP_FIRST_WIN: "pvp_first_win",
  COUPON: "coupon",
  STORE_PURCHASE: "store_purchase",
  RESTORE: "restore",
  PUZZLE_UNLOCK: "puzzle_unlock",
  REWARDED_AD: "rewarded_ad",
};

export const TYPES = {
  EARN: "earn",
  SPEND: "spend",
  PURCHASE: "purchase",
};

function readAll() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(entries) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {}
}

// Append a transaction. `amount` is always a positive number — the `type`
// field determines whether it's a gain or a spend. `meta` is optional
// free-form info (puzzle id, coupon code, package name, streak day, etc.)
// that the UI can render for context.
export function recordCreditTx({ type, source, amount, meta = {} }) {
  if (!amount || amount <= 0) return;
  // "Unlimited" grants (amount === Infinity) get stored as a sentinel so
  // JSON serialization doesn't lose the value. The UI renders them as "∞".
  const amt = amount === Infinity ? "unlimited" : amount;
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    source,
    amount: amt,
    meta,
    t: Date.now(),
  };
  const all = readAll();
  all.push(entry);
  // Prune oldest to cap.
  const trimmed = all.length > HISTORY_MAX ? all.slice(all.length - HISTORY_MAX) : all;
  writeAll(trimmed);
}

// Returns newest first.
export function getCreditHistory() {
  const all = readAll();
  return [...all].reverse();
}

export function clearCreditHistory() {
  writeAll([]);
}

// Summary of lifetime activity, used in the history modal's header.
export function getCreditHistorySummary() {
  const all = readAll();
  let earned = 0;
  let spent = 0;
  let purchased = 0;
  for (const e of all) {
    const amt = e.amount === "unlimited" ? 0 : Number(e.amount || 0);
    if (e.type === TYPES.EARN) earned += amt;
    else if (e.type === TYPES.SPEND) spent += amt;
    else if (e.type === TYPES.PURCHASE) purchased += amt;
  }
  return { earned, spent, purchased, count: all.length };
}
