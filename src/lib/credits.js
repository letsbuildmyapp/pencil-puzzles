const CREDITS_KEY = "pp_credits";
const DEFAULT_CREDITS = 5;

function getKey(userId) {
  return `${CREDITS_KEY}_${userId}`;
}

export function getCredits(userId) {
  try {
    const val = localStorage.getItem(getKey(userId));
    return val !== null ? parseInt(val, 10) : null;
  } catch (e) {
    return null;
  }
}

export function initCredits(userId) {
  const existing = getCredits(userId);
  if (existing === null) {
    localStorage.setItem(getKey(userId), String(DEFAULT_CREDITS));
    return DEFAULT_CREDITS;
  }
  return existing;
}

export function spendCredit(userId) {
  const current = getCredits(userId) ?? 0;
  if (current <= 0) return false;
  localStorage.setItem(getKey(userId), String(current - 1));
  return true;
}

export const FREE_CREDITS = DEFAULT_CREDITS;
