// Versus mode: realtime matchmaking and game sync via Supabase Realtime.
// Uses Presence (lobby + match) and Broadcast (claim events). No DB tables required.
import { createClient } from "@supabase/supabase-js";
import { PUZZLE_LIST } from "../puzzles/index";
import { getBotDisplayName } from "./versus-bot";

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

// Find a match via broadcast handshake (no presence — ghosts were causing
// clients to pair with stale phantom users). Protocol:
//   1. Both clients subscribe to `versus:lobby:${mode}` broadcasts (separate
//      lobby per mode means you can't accidentally cross-match).
//   2. Each sends `hello { userId, name }` every 1s while searching.
//   3. On receiving a hello from a different userId, the client with the
//      lexicographically smaller userId sends `pair { a, b, aName, bName }`
//      and resolves immediately.
//   4. The other client receives `pair` (its userId is in it) and resolves
//      with the same deterministic matchId.
// Returns { promise, cancel }. The promise resolves to
// { matchId, puzzle, opponent: { userId, displayName }, isHost, mode }.
// Modes that support a local bot fallback when no real opponent shows up.
const BOT_SUPPORTED_MODES = new Set([
  "territory",
  "row-rumble",
  "sabotage",
  "mirror",
  "survival",
  "chess-clock",
]);
const BOT_FALLBACK_DELAY_MS = 5000;

export function findMatch({ userId, displayName, mode = "territory", onStatus }) {
  const client = getClient();
  const lobby = client.channel(`versus:lobby:${mode}`, {
    config: { broadcast: { self: false, ack: false } },
  });

  let resolved = false;
  let resolveFn, rejectFn;
  const promise = new Promise((res, rej) => { resolveFn = res; rejectFn = rej; });
  let helloTimer = null;
  let botFallbackTimer = null;

  const cleanup = () => {
    if (helloTimer) { clearInterval(helloTimer); helloTimer = null; }
    if (botFallbackTimer) { clearTimeout(botFallbackTimer); botFallbackTimer = null; }
    try { client.removeChannel(lobby); } catch { /* ignore */ }
  };

  const cancel = () => {
    if (resolved) return;
    resolved = true;
    cleanup();
    rejectFn(new Error("cancelled"));
  };

  // If no real opponent shows up in BOT_FALLBACK_DELAY_MS, spawn a local bot
  // so the player can still play. Only for modes where we have bot logic.
  const finalizeWithBot = () => {
    if (resolved) return;
    resolved = true;
    const botUserId = `bot_${Math.random().toString(36).slice(2, 10)}`;
    const ids = [userId, botUserId].sort();
    const matchId = `${mode}:${ids[0]}__${ids[1]}`;
    const puzzle = puzzleFromMatchId(matchId);
    const isHost = userId === ids[0];
    onStatus?.("matched");
    setTimeout(cleanup, 1500);
    resolveFn({
      matchId,
      puzzle,
      opponent: { userId: botUserId, displayName: getBotDisplayName() },
      isHost,
      mode,
      isBot: true,
    });
  };

  const finalize = (a, b, partnerName) => {
    if (resolved) return;
    resolved = true;
    const ids = [a, b].sort();
    const matchId = `${mode}:${ids[0]}__${ids[1]}`;
    const puzzle = puzzleFromMatchId(matchId);
    const partnerUserId = a === userId ? b : a;
    const isHost = userId === ids[0];
    onStatus?.("matched");
    // Defer lobby teardown so the match channel has the socket to itself when
    // it opens. Synchronous teardown caused CHANNEL_ERROR on the match channel.
    setTimeout(cleanup, 1500);
    resolveFn({
      matchId,
      puzzle,
      opponent: { userId: partnerUserId, displayName: partnerName || "Opponent" },
      isHost,
      mode,
    });
  };

  lobby.on("broadcast", { event: "hello" }, ({ payload }) => {
    if (resolved) return;
    if (!payload?.userId || payload.userId === userId) return;
    // Smaller userId claims the match and broadcasts pair.
    if (userId < payload.userId) {
      const a = userId, b = payload.userId;
      lobby.send({
        type: "broadcast",
        event: "pair",
        payload: { a, b, aName: displayName || "Player", bName: payload.name || "Opponent" },
      });
      finalize(a, b, payload.name);
    }
  });

  lobby.on("broadcast", { event: "pair" }, ({ payload }) => {
    if (resolved) return;
    if (!payload?.a || !payload?.b) return;
    if (payload.a !== userId && payload.b !== userId) return;
    const partnerName = payload.a === userId ? payload.bName : payload.aName;
    finalize(payload.a, payload.b, partnerName);
  });

  lobby.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      onStatus?.("searching");
      const sayHello = () => {
        if (resolved) return;
        lobby.send({
          type: "broadcast",
          event: "hello",
          payload: { userId, name: displayName || "Player" },
        });
      };
      sayHello();
      helloTimer = setInterval(sayHello, 1000);
      // Bot fallback — if no real opponent joins within 10s, spawn a local bot
      // (only for modes that have bot logic implemented).
      if (BOT_SUPPORTED_MODES.has(mode)) {
        botFallbackTimer = setTimeout(finalizeWithBot, BOT_FALLBACK_DELAY_MS);
      }
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
// Join a match channel. Despite the name (which predates Row Rumble), this is
// shared by all PvP modes — the handler list is a superset and unused events
// are simply not wired by the caller.
export function joinTerritoryMatch({
  matchId,
  userId,
  onClaim,
  onUnclaim,
  onReserve,
  onUnreserve,
  onStart,
  onRowWon,
  onRowProgress,
  onSabotage,
  onProgress,
  onPuzzleDone,
  onSurvivalUpdate,
  onSurvivalAttack,
  onChessTurn,
  onPresenceSync,
  onOpponentLeft,
}) {
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

  channel.on("broadcast", { event: "unclaim" }, ({ payload }) => {
    onUnclaim?.(payload); // { tileR, tileC, userId }
  });

  channel.on("broadcast", { event: "reserve" }, ({ payload }) => {
    onReserve?.(payload); // { tileR, tileC, userId }
  });

  channel.on("broadcast", { event: "unreserve" }, ({ payload }) => {
    onUnreserve?.(payload); // { tileR, tileC, userId }
  });

  channel.on("broadcast", { event: "start" }, ({ payload }) => {
    onStart?.(payload); // { startAt }
  });

  channel.on("broadcast", { event: "row_won" }, ({ payload }) => {
    onRowWon?.(payload); // { round, userId, nextStartAt }
  });

  channel.on("broadcast", { event: "row_progress" }, ({ payload }) => {
    onRowProgress?.(payload); // { round, claimedCount, userId }
  });

  channel.on("broadcast", { event: "sabotage" }, ({ payload }) => {
    onSabotage?.(payload); // { fromUserId, row }
  });

  channel.on("broadcast", { event: "progress" }, ({ payload }) => {
    onProgress?.(payload); // { userId, submittedCount, totalClaimable }
  });

  channel.on("broadcast", { event: "puzzle_done" }, ({ payload }) => {
    onPuzzleDone?.(payload); // { userId, finishedAt }
  });

  channel.on("broadcast", { event: "survival_update" }, ({ payload }) => {
    onSurvivalUpdate?.(payload); // { userId, heartsLeft, submittedCount, totalClaimable, state }
  });

  channel.on("broadcast", { event: "survival_attack" }, ({ payload }) => {
    onSurvivalAttack?.(payload); // { attackerId }
  });

  channel.on("broadcast", { event: "chess_turn" }, ({ payload }) => {
    onChessTurn?.(payload); // { userId, tileR, tileC, tileData, msLeftAfter, anchorAt }
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
    sendUnclaim: (tileR, tileC) =>
      channel.send({
        type: "broadcast",
        event: "unclaim",
        payload: { tileR, tileC, userId, t: Date.now() },
      }),
    sendReserve: (tileR, tileC) =>
      channel.send({
        type: "broadcast",
        event: "reserve",
        payload: { tileR, tileC, userId, t: Date.now() },
      }),
    sendUnreserve: (tileR, tileC) =>
      channel.send({
        type: "broadcast",
        event: "unreserve",
        payload: { tileR, tileC, userId, t: Date.now() },
      }),
    sendStart: (startAt) =>
      channel.send({
        type: "broadcast",
        event: "start",
        payload: { startAt, userId, t: Date.now() },
      }),
    sendRowWon: (round, nextStartAt) =>
      channel.send({
        type: "broadcast",
        event: "row_won",
        payload: { round, userId, nextStartAt, t: Date.now() },
      }),
    sendRowProgress: (round, claimedCount) =>
      channel.send({
        type: "broadcast",
        event: "row_progress",
        payload: { round, claimedCount, userId, t: Date.now() },
      }),
    sendSabotage: (row) =>
      channel.send({
        type: "broadcast",
        event: "sabotage",
        payload: { fromUserId: userId, row, t: Date.now() },
      }),
    sendProgress: (submittedCount, totalClaimable) =>
      channel.send({
        type: "broadcast",
        event: "progress",
        payload: { userId, submittedCount, totalClaimable, t: Date.now() },
      }),
    sendPuzzleDone: () =>
      channel.send({
        type: "broadcast",
        event: "puzzle_done",
        payload: { userId, finishedAt: Date.now() },
      }),
    sendSurvivalUpdate: (heartsLeft, submittedCount, totalClaimable, state) =>
      channel.send({
        type: "broadcast",
        event: "survival_update",
        payload: { userId, heartsLeft, submittedCount, totalClaimable, state, t: Date.now() },
      }),
    sendSurvivalAttack: () =>
      channel.send({
        type: "broadcast",
        event: "survival_attack",
        payload: { attackerId: userId, t: Date.now() },
      }),
    sendChessTurn: (tileR, tileC, tileData, msLeftAfter) =>
      channel.send({
        type: "broadcast",
        event: "chess_turn",
        payload: { userId, tileR, tileC, tileData, msLeftAfter, anchorAt: Date.now() },
      }),
    leave: () => { try { client.removeChannel(channel); } catch { /* ignore */ } },
  };
}
