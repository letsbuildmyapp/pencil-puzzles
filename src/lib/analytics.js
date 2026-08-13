// Lightweight analytics with offline queuing. Events are sent to Supabase
// immediately when online. If the request fails (offline, network error),
// the event is saved to localStorage and retried on next app open or when
// the network comes back.

import { loadSession } from "./session";

const SUPA_URL = "https://ljsquznxqhfcegmquzbe.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3F1em54cWhmY2VnbXF1emJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzM3ODQsImV4cCI6MjA4ODY0OTc4NH0.zNhRTr5T_DEvPzz12aaZXf3aNtS6i8AGbE6fahyemYg";

const QUEUE_KEY = "pp_analytics_queue";
const QUEUE_MAX = 200;

function readQueue() {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch { return []; }
}

function writeQueue(queue) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-QUEUE_MAX))); } catch {}
}

function enqueue(table, body, token) {
  const queue = readQueue();
  queue.push({ table, body, token });
  writeQueue(queue);
}

async function send(table, body, token) {
  const r = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPA_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(r.status);
}

function track(table, body, token) {
  send(table, body, token).catch(() => enqueue(table, body, token));
}

// Flush any queued events. Called on app startup and when coming back online.
let flushing = false;
export async function flushQueue() {
  if (flushing) return;
  const queue = readQueue();
  if (queue.length === 0) return;
  flushing = true;
  const failed = [];
  for (const event of queue) {
    try {
      await send(event.table, event.body, event.token);
    } catch {
      failed.push(event);
    }
  }
  writeQueue(failed);
  flushing = false;
}

// Listen for network recovery
if (typeof window !== "undefined") {
  window.addEventListener("online", () => flushQueue());
}

export function trackPuzzleUnlock(puzzleId) {
  const session = loadSession();
  if (!session?.token || !session?.userId) return;
  track("puzzle_unlocks", { user_id: session.userId, puzzle_id: puzzleId }, session.token);
}

export function trackPvpMatch(mode, won, isBot, { myScore, oppScore, opponentName } = {}) {
  const session = loadSession();
  if (!session?.token || !session?.userId) return;
  track("pvp_matches", {
    user_id: session.userId,
    mode,
    won,
    opponent_type: isBot ? "bot" : "human",
    my_score: myScore ?? null,
    opponent_score: oppScore ?? null,
    opponent_name: opponentName || (isBot ? "Bot" : null),
  }, session.token);
}
