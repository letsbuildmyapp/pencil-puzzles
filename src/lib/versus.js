// Versus mode: realtime matchmaking and game sync via Supabase Realtime.
// Uses Presence (lobby + match) and Broadcast (claim events). No DB tables required.
import { createClient } from "@supabase/supabase-js";
import { PUZZLE_LIST } from "../puzzles/index";

const SUPA_URL = "https://ljsquznxqhfcegmquzbe.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3F1em54cWhmY2VnbXF1emJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzM3ODQsImV4cCI6MjA4ODY0OTc4NH0.zNhRTr5T_DEvPzz12aaZXf3aNtS6i8AGbE6fahyemYg";

// Lazy-init the realtime client to avoid paying bundle cost until versus is used.
let _client = null;
function getClient() {
  if (!_client) {
    _client = createClient(SUPA_URL, SUPA_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return _client;
}

// Deterministic djb2 hash — both clients compute the same puzzle from matchId.
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) + str.charCodeAt(i);
  return Math.abs(h);
}

function puzzleFromMatchId(matchId) {
  return PUZZLE_LIST[hash(matchId) % PUZZLE_LIST.length].puzzle;
}

// Find a match by joining the shared lobby channel.
// Returns { promise, cancel }. The promise resolves to
// { matchId, puzzle, opponent: { userId, displayName }, isHost }.
export function findMatch({ userId, displayName, onStatus }) {
  const client = getClient();
  const lobby = client.channel("versus:lobby", {
    config: { presence: { key: userId } },
  });

  let resolved = false;
  let resolveFn, rejectFn;
  const promise = new Promise((res, rej) => { resolveFn = res; rejectFn = rej; });

  const cleanup = () => {
    try { client.removeChannel(lobby); } catch { /* ignore */ }
  };

  const cancel = () => {
    if (resolved) return;
    resolved = true;
    cleanup();
    rejectFn(new Error("cancelled"));
  };

  lobby.on("presence", { event: "sync" }, () => {
    if (resolved) return;
    const state = lobby.presenceState();
    // Flatten presence state into a sorted list of waiting players.
    const players = Object.values(state)
      .flat()
      .filter(p => p && p.userId && p.joinedAt)
      .sort((a, b) => (a.joinedAt - b.joinedAt) || a.userId.localeCompare(b.userId));

    const myIdx = players.findIndex(p => p.userId === userId);
    if (myIdx === -1) return;

    // Pair adjacent players: (0,1), (2,3), ...
    const pairBase = myIdx - (myIdx % 2);
    const partnerIdx = myIdx === pairBase ? pairBase + 1 : pairBase;
    const partner = players[partnerIdx];
    if (!partner) return;

    // Deterministic matchId — both sides compute the same one.
    resolved = true;
    const ids = [userId, partner.userId].sort();
    const matchId = `${ids[0]}__${ids[1]}`;
    const puzzle = puzzleFromMatchId(matchId);
    const isHost = userId === ids[0];
    onStatus?.("matched");
    cleanup();
    resolveFn({
      matchId,
      puzzle,
      opponent: { userId: partner.userId, displayName: partner.name || "Opponent" },
      isHost,
    });
  });

  lobby.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      onStatus?.("searching");
      await lobby.track({
        userId,
        name: displayName || "Player",
        joinedAt: Date.now(),
      });
    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      if (resolved) return;
      resolved = true;
      cleanup();
      rejectFn(new Error("Connection to matchmaking failed"));
    }
  });

  return { promise, cancel };
}

// Join a Territory match channel. Handlers are registered at creation time
// and receive ordered broadcasts from the Supabase Realtime server.
export function joinTerritoryMatch({ matchId, userId, onClaim, onPresenceSync, onOpponentLeft }) {
  const client = getClient();
  const channel = client.channel(`versus:match:${matchId}`, {
    config: {
      broadcast: { self: true, ack: false },
      presence: { key: userId },
    },
  });

  channel.on("broadcast", { event: "claim" }, ({ payload }) => {
    onClaim?.(payload); // { tileR, tileC, userId }
  });

  channel.on("presence", { event: "sync" }, () => {
    const state = channel.presenceState();
    const count = Object.keys(state).length;
    onPresenceSync?.(count, state);
  });

  channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
    onOpponentLeft?.(leftPresences);
  });

  return {
    subscribe: () => new Promise((resolve, reject) => {
      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ userId, joinedAt: Date.now() });
          resolve();
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          reject(new Error("Match channel failed"));
        }
      });
    }),
    sendClaim: (tileR, tileC) =>
      channel.send({
        type: "broadcast",
        event: "claim",
        payload: { tileR, tileC, userId, t: Date.now() },
      }),
    leave: () => { try { client.removeChannel(channel); } catch { /* ignore */ } },
  };
}
