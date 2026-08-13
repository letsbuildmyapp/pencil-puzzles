// Badge definitions and earning logic

export const BADGES = [
  { id: "first_solve", emoji: "🎯", title: "First Solve", description: "Complete your first puzzle" },
  { id: "getting_started", emoji: "🌟", title: "Getting Started", description: "Complete 5 puzzles" },
  { id: "puzzle_pro", emoji: "🏆", title: "Puzzle Pro", description: "Complete 10 puzzles" },
  { id: "completionist", emoji: "👑", title: "Completionist", description: "Complete 25 puzzles" },
  { id: "master", emoji: "💎", title: "Pixel Master", description: "Complete 50 puzzles" },
  { id: "speed_demon", emoji: "⚡", title: "Speed Demon", description: "Earn a 3,000 point puzzle" },
  { id: "no_hints", emoji: "🧠", title: "No Hints Needed", description: "Complete a puzzle without revealing the riddle" },
  { id: "streak_3", emoji: "🔥", title: "On Fire", description: "Reach a 3-day streak" },
  { id: "streak_7", emoji: "🚀", title: "Week Warrior", description: "Reach a 7-day streak" },
  { id: "streak_30", emoji: "🏅", title: "Monthly Master", description: "Reach a 30-day streak" },
  { id: "high_scorer", emoji: "💰", title: "High Scorer", description: "Earn 10,000 total points" },
];

export function getEarnedBadges({ completedCount, topScore, totalPoints, currentStreak, longestStreak, hasNoHintWin }) {
  const earned = new Set();
  if (completedCount >= 1) earned.add("first_solve");
  if (completedCount >= 5) earned.add("getting_started");
  if (completedCount >= 10) earned.add("puzzle_pro");
  if (completedCount >= 25) earned.add("completionist");
  if (completedCount >= 50) earned.add("master");
  if (topScore >= 3000) earned.add("speed_demon");
  if (hasNoHintWin) earned.add("no_hints");
  if (longestStreak >= 3) earned.add("streak_3");
  if (longestStreak >= 7) earned.add("streak_7");
  if (longestStreak >= 30) earned.add("streak_30");
  if (totalPoints >= 10000) earned.add("high_scorer");
  return earned;
}

const SEEN_KEY = "pp_seen_badges";

export function getSeenBadges() {
  try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || "[]")); } catch (e) { return new Set(); }
}

export function markBadgesSeen(badgeIds) {
  try {
    const seen = getSeenBadges();
    badgeIds.forEach(id => seen.add(id));
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch (e) {}
}

export function getNewlyEarned(earnedSet) {
  const seen = getSeenBadges();
  return [...earnedSet].filter(id => !seen.has(id));
}

export function getBadge(id) {
  return BADGES.find(b => b.id === id);
}
