// Bot opponent for Versus mode. Mimics the shape of `joinTerritoryMatch` so
// game components don't need to know whether they're playing a real opponent
// or a local bot — the same callbacks fire, the same send* methods exist.
//
// Used when matchmaking times out (10s with no real opponent). The bot lives
// entirely in the player's client: there's no server round-trip, just local
// timers that simulate opponent actions.
//
// Difficulty is tuned so the player wins ~95% of the time.

import { computeFilteredClaimableTiles } from "./tiles";

// Fake usernames pulled randomly so the opponent feels like a real person.
// Kept intentionally varied (word + number, dashes, underscores) to look like
// real user-generated handles.
const BOT_NAMES = [
  "alex_r", "jordan42", "puzzle_king", "nono_queen", "mila.draws",
  "pixelpop", "sam_the_man", "mbr0wn", "clickclick", "inkspot",
  "nora_99", "kevin.p", "leah_writes", "m_adams", "theo_b",
  "owlnight", "rishigrid", "june_j", "dax.m", "ada_loves_art",
  "penny.stokes", "ryo_k", "zoey88", "charliechalk", "vee_vee",
];

// Territory tuning — slow enough that an engaged player out-claims the bot.
// Reserve window is long so the player can clearly see where the opponent is
// "working" — the whole point of the yellow highlight is urgency feedback.
const TERRITORY_RESERVE_MS_MIN = 4000;
const TERRITORY_RESERVE_MS_MAX = 7000;
const TERRITORY_GAP_MS_MIN = 7000;
const TERRITORY_GAP_MS_MAX = 14000;

// Mirror Match tuning — tighter than Territory because every tile on the
// shared grid is contested. The bot needs a faster cadence to keep the
// "mosaic race" feel alive; an engaged player still out-claims it by a
// comfortable margin (bot fills ~20 tiles in 4 min vs player's ~30+).
const MIRROR_RESERVE_MS_MIN = 3000;
const MIRROR_RESERVE_MS_MAX = 5500;
const MIRROR_GAP_MS_MIN = 5000;
const MIRROR_GAP_MS_MAX = 10000;

// Row Rumble tuning — single standard cadence, bot never wins a round.
// Tick intervals are in milliseconds *per tile*.
const ROW_RUMBLE_PROGRESS_TICK_MS_MIN = 6000;
const ROW_RUMBLE_PROGRESS_TICK_MS_MAX = 10000;
const ROW_RUMBLE_FIRST_TICK_DELAY_MS_MIN = 4000;
const ROW_RUMBLE_FIRST_TICK_DELAY_MS_MAX = 7000;

// Sabotage tuning — bot ticks progress at 6–10s per tile (matching Row Rumble)
// and can finish its own puzzle if the player stalls. Also fires a sabotage
// every 40–60s starting ~30s in to apply real pressure.
const SABOTAGE_TICK_MS_MIN = 6000;
const SABOTAGE_TICK_MS_MAX = 10000;
const SABOTAGE_FIRE_MS_MIN = 40000;
const SABOTAGE_FIRE_MS_MAX = 60000;
const SABOTAGE_FIRST_FIRE_MS = 30000;

// Survival tuning — new dueling mechanic: bot attacks the player every
// 10–14s (simulating a correct submission). Each attack deals 1 damage AND
// heals the bot by 1 (capped at 3). When the player lands a correct
// submission it damages the bot by 1. First to 0 lives loses.
const SURVIVAL_ATTACK_MS_MIN = 10000;
const SURVIVAL_ATTACK_MS_MAX = 14000;
const SURVIVAL_STARTING_HEARTS = 3;
const SURVIVAL_FIRST_ATTACK_DELAY_MS = 7000;

// Chess Clock tuning — bot takes 10–18s per turn. Slower than an engaged
// player (5–10s) so the bot's clock drains faster and the player wins on
// opponent timeout or by completing the puzzle first. Tight enough that the
// player isn't staring at a dead screen between their own turns.
const CHESS_CLOCK_THINK_MS_MIN = 10000;
const CHESS_CLOCK_THINK_MS_MAX = 18000;
const CHESS_CLOCK_TOTAL_MS = 180000;

function rand(min, max) { return min + Math.random() * (max - min); }

function computeClaimableTiles(puzzle) {
  const keys = new Set();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (puzzle.solution[r][c].flat().some(Boolean)) keys.add(`${r},${c}`);
    }
  }
  return keys;
}

function computePlayableRows(puzzle) {
  const rows = [];
  for (let r = 0; r < 8; r++) {
    let hasInk = false;
    for (let c = 0; c < 8; c++) {
      if (puzzle.solution[r][c].flat().some(Boolean)) { hasInk = true; break; }
    }
    if (hasInk) rows.push(r);
  }
  return rows;
}

function countRowClaimable(puzzle, rowIdx) {
  let n = 0;
  for (let c = 0; c < 8; c++) {
    if (puzzle.solution[rowIdx][c].flat().some(Boolean)) n++;
  }
  return n;
}

// Returns an object matching the interface of joinTerritoryMatch's return value.
export function createBotMatchChannel({
  userId,
  botUserId,
  puzzle,
  mode,
  isHost: playerIsHost,
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
  let stopped = false;
  let startAtLocal = null;
  const timers = new Set();

  // Shared state mirrors so the bot doesn't pick tiles the player just claimed.
  // Survival and Chess Clock use the "fair difficulty" filter (no 1-2 pixel
  // tiles, per-puzzle median window) so the bot and the player play from the
  // same smaller pool. Other modes use the full ink-tile set.
  const claimableTiles = (mode === "survival" || mode === "chess-clock")
    ? computeFilteredClaimableTiles(puzzle)
    : computeClaimableTiles(puzzle);
  const localClaimed = new Set();
  const localReserved = new Set();

  // Row Rumble state
  const playableRows = computePlayableRows(puzzle);
  let currentRound = 0;
  let roundPlan = null; // { progressTimer, claimed }

  // Sabotage / Survival / Chess Clock shared state
  let botSubmittedCount = 0;
  let botMsLeft = CHESS_CLOCK_TOTAL_MS;
  let botTurnStartedAt = null;
  const botSubmittedTiles = new Set(); // for Chess Clock — track all submissions across both players

  const scheduleTimer = (fn, ms) => {
    const id = setTimeout(() => {
      timers.delete(id);
      if (!stopped) fn();
    }, ms);
    timers.add(id);
    return id;
  };

  const clearPlan = () => {
    if (!roundPlan) return;
    if (roundPlan.progressTimer) { clearTimeout(roundPlan.progressTimer); }
    roundPlan = null;
  };

  // ===== Territory / Mirror Match bot loop =====
  // Both modes use reserve → wait → claim on a shared 8x8 grid. Mirror Match
  // uses tighter timings because every tile is contested.
  const isMirror = mode === "mirror";
  const reserveMin = isMirror ? MIRROR_RESERVE_MS_MIN : TERRITORY_RESERVE_MS_MIN;
  const reserveMax = isMirror ? MIRROR_RESERVE_MS_MAX : TERRITORY_RESERVE_MS_MAX;
  const gapMin = isMirror ? MIRROR_GAP_MS_MIN : TERRITORY_GAP_MS_MIN;
  const gapMax = isMirror ? MIRROR_GAP_MS_MAX : TERRITORY_GAP_MS_MAX;

  const territoryTick = () => {
    if (stopped) return;
    const candidates = [];
    for (const key of claimableTiles) {
      if (!localClaimed.has(key) && !localReserved.has(key)) candidates.push(key);
    }
    if (candidates.length === 0) return;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    const [r, c] = pick.split(",").map(Number);

    // Reserve first so the player sees the "opponent is drawing" highlight.
    localReserved.add(pick);
    onReserve?.({ tileR: r, tileC: c, userId: botUserId });

    const drawingMs = rand(reserveMin, reserveMax);
    scheduleTimer(() => {
      if (stopped) return;
      // If the player claimed it while we were "drawing", back off.
      if (localClaimed.has(pick)) {
        localReserved.delete(pick);
      } else {
        localClaimed.add(pick);
        localReserved.delete(pick);
        onClaim?.({ tileR: r, tileC: c, userId: botUserId });
      }
      // Schedule the next action.
      scheduleTimer(territoryTick, rand(gapMin, gapMax));
    }, drawingMs);
  };

  // ===== Row Rumble bot loop =====
  // Bot ticks through every tile in the row at a steady cadence. If it reaches
  // the final tile before the player completes their row, the bot wins the
  // round. Whether the player wins the match depends entirely on their speed.
  const planRowRumbleRound = (round) => {
    clearPlan();
    if (round >= playableRows.length) return;
    const rowIdx = playableRows[round];
    const totalInRow = countRowClaimable(puzzle, rowIdx);
    if (totalInRow === 0) return;

    let claimed = 0;
    let progressTimer = null;

    const scheduleProgressTick = (isFirst) => {
      const delay = isFirst
        ? rand(ROW_RUMBLE_FIRST_TICK_DELAY_MS_MIN, ROW_RUMBLE_FIRST_TICK_DELAY_MS_MAX)
        : rand(ROW_RUMBLE_PROGRESS_TICK_MS_MIN, ROW_RUMBLE_PROGRESS_TICK_MS_MAX);
      progressTimer = setTimeout(() => {
        if (stopped || currentRound !== round) return;
        claimed += 1;
        if (claimed >= totalInRow) {
          // Bot just completed the row → fire row_won. The game's roundResolved
          // dedupe guarantees that if the player has already won this round
          // (their sendRowWon arrived first), this is a harmless no-op.
          const nextStartAt = Date.now() + 5000;
          onRowWon?.({ round, userId: botUserId, nextStartAt });
          // Bot just won — the game won't call sendRowWon in this path, so we
          // have to advance our own round counter and plan the next round.
          currentRound = round + 1;
          roundPlan = null;
          scheduleTimer(() => planRowRumbleRound(currentRound), 5200);
          return;
        }
        onRowProgress?.({ round, claimedCount: claimed, userId: botUserId });
        scheduleProgressTick(false);
      }, delay);
    };
    scheduleProgressTick(true);

    roundPlan = { progressTimer, claimed };
  };

  // ===== Sabotage bot loop =====
  // Tick progress at 6–10s per tile. Each tick picks a random unclaimed tile
  // and broadcasts sendClaim so the player sees which specific tiles the bot
  // has completed on their own grid. When the bot's set reaches the total it
  // fires puzzle_done and wins. Player sabotages knock out a random claimed
  // tile and broadcast unclaim so the player's view stays in sync.
  const totalClaimable = claimableTiles.size;
  const botClaimedTiles = new Set();
  let sabotageBotFinished = false;

  const broadcastBotProgress = () => {
    onProgress?.({
      userId: botUserId,
      submittedCount: botClaimedTiles.size,
      totalClaimable,
    });
  };

  const sabotageTick = () => {
    if (stopped || sabotageBotFinished) return;
    // Pick a random unclaimed claimable tile.
    const unclaimed = [];
    for (const key of claimableTiles) {
      if (!botClaimedTiles.has(key)) unclaimed.push(key);
    }
    if (unclaimed.length > 0) {
      const pick = unclaimed[Math.floor(Math.random() * unclaimed.length)];
      const [r, c] = pick.split(",").map(Number);
      botClaimedTiles.add(pick);
      botSubmittedCount = botClaimedTiles.size;
      onClaim?.({ tileR: r, tileC: c, userId: botUserId });
      broadcastBotProgress();
      if (botClaimedTiles.size >= totalClaimable) {
        sabotageBotFinished = true;
        onPuzzleDone?.({ userId: botUserId, finishedAt: Date.now() });
        return;
      }
    }
    scheduleTimer(sabotageTick, rand(SABOTAGE_TICK_MS_MIN, SABOTAGE_TICK_MS_MAX));
  };
  const sabotageFireLoop = () => {
    if (stopped || sabotageBotFinished) return;
    onSabotage?.({ fromUserId: botUserId });
    scheduleTimer(sabotageFireLoop, rand(SABOTAGE_FIRE_MS_MIN, SABOTAGE_FIRE_MS_MAX));
  };

  // ===== Survival bot loop =====
  // Dueling mechanic: every 10–14s the bot "lands a correct submission",
  // dealing 1 damage to the player (via onSurvivalAttack) and healing itself
  // by 1 (capped at 3). When the player's own correct submission arrives
  // via sendSurvivalAttack, the bot takes damage. First to 0 loses.
  let botHearts = SURVIVAL_STARTING_HEARTS;
  let survivalBotDead = false;

  const broadcastSurvivalState = () => {
    onSurvivalUpdate?.({
      userId: botUserId,
      heartsLeft: botHearts,
      submittedCount: botSubmittedCount,
      totalClaimable,
      state: survivalBotDead ? "dead" : "playing",
    });
  };

  const survivalTick = () => {
    if (stopped || survivalBotDead) return;
    // Simulate the bot submitting a correct tile. Heal first if wounded;
    // only convert to an attack when the bot is already at full hearts.
    botSubmittedCount += 1;
    if (botHearts < SURVIVAL_STARTING_HEARTS) {
      botHearts += 1;
    } else {
      onSurvivalAttack?.({ attackerId: botUserId });
    }
    broadcastSurvivalState();
    scheduleTimer(survivalTick, rand(SURVIVAL_ATTACK_MS_MIN, SURVIVAL_ATTACK_MS_MAX));
  };

  // ===== Chess Clock bot loop =====
  // On the bot's turn, wait 25–40s of "thinking", then submit a random
  // unsubmitted claimable tile with the correct solution data. Eats clock.
  const pickChessClockTile = () => {
    const candidates = [];
    for (const key of claimableTiles) {
      if (!botSubmittedTiles.has(key)) candidates.push(key);
    }
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  };
  const scheduleBotChessClockTurn = () => {
    if (stopped) return;
    if (botMsLeft <= 1500) return; // let the clock run out naturally
    botTurnStartedAt = Date.now();
    const thinkMs = Math.min(
      rand(CHESS_CLOCK_THINK_MS_MIN, CHESS_CLOCK_THINK_MS_MAX),
      Math.max(500, botMsLeft - 1000)
    );
    scheduleTimer(() => {
      if (stopped) return;
      const pick = pickChessClockTile();
      if (!pick) return;
      const [r, c] = pick.split(",").map(Number);
      const spent = Date.now() - (botTurnStartedAt || Date.now());
      botMsLeft = Math.max(0, botMsLeft - spent);
      botTurnStartedAt = null;
      botSubmittedTiles.add(pick);
      onChessTurn?.({
        userId: botUserId,
        tileR: r,
        tileC: c,
        tileData: puzzle.solution[r][c],
        msLeftAfter: botMsLeft,
        anchorAt: Date.now(),
      });
    }, thinkMs);
  };

  return {
    subscribe: () => new Promise((resolve) => {
      // Fake "both players connected" immediately so the game leaves the
      // "Connecting to opponent…" overlay and moves to the synced-start step.
      scheduleTimer(() => {
        if (stopped) return;
        const fakeState = {
          [userId]: [{ userId, joinedAt: Date.now() }],
          [botUserId]: [{ userId: botUserId, joinedAt: Date.now() }],
        };
        onPresenceSync?.(2, fakeState);
        resolve();
      }, 400);
    }),

    sendClaim: (tileR, tileC) => {
      const key = `${tileR},${tileC}`;
      if (localClaimed.has(key)) return;
      localClaimed.add(key);
      localReserved.delete(key);
      onClaim?.({ tileR, tileC, userId });
    },
    sendUnclaim: (tileR, tileC) => {
      // Player lost a tile to a bot sabotage — echo so the player's own
      // submitted-set accounting stays in sync across send and receive.
      onUnclaim?.({ tileR, tileC, userId });
    },
    sendReserve: (tileR, tileC) => {
      const key = `${tileR},${tileC}`;
      localReserved.add(key);
      onReserve?.({ tileR, tileC, userId });
    },
    sendUnreserve: (tileR, tileC) => {
      const key = `${tileR},${tileC}`;
      localReserved.delete(key);
      onUnreserve?.({ tileR, tileC, userId });
    },
    sendStart: (startAt) => {
      if (startAtLocal != null) return;
      startAtLocal = startAt;
      onStart?.({ startAt });
      // Kick off mode-specific bot activity once the game actually starts.
      const untilStart = Math.max(0, startAt - Date.now());
      if (mode === "row-rumble") {
        scheduleTimer(() => planRowRumbleRound(0), untilStart + 800);
      } else if (mode === "sabotage") {
        scheduleTimer(sabotageTick, untilStart + rand(4000, 8000));
        scheduleTimer(sabotageFireLoop, untilStart + SABOTAGE_FIRST_FIRE_MS);
      } else if (mode === "survival") {
        scheduleTimer(survivalTick, untilStart + SURVIVAL_FIRST_ATTACK_DELAY_MS);
      } else if (mode === "chess-clock") {
        // If the bot is host (lex-smaller userId) it plays first. `isHost`
        // in the match payload reflects the PLAYER's host status, so the
        // bot is host when the player isn't.
        const botIsHost = playerIsHost === false;
        if (botIsHost) {
          scheduleTimer(scheduleBotChessClockTurn, untilStart + 1000);
        }
      } else {
        // Default to territory-style behavior (Territory + Mirror Match).
        const firstActionMs = untilStart + rand(3000, 6000);
        scheduleTimer(territoryTick, firstActionMs);
      }
    },
    sendRowWon: (round, nextStartAt) => {
      // Player won this round — echo it to the caller and advance the bot's
      // internal round counter so it plans the next one.
      onRowWon?.({ round, userId, nextStartAt });
      currentRound = round + 1;
      clearPlan();
      const nextPlanAt = Math.max(0, (nextStartAt || Date.now()) - Date.now()) + 300;
      scheduleTimer(() => planRowRumbleRound(currentRound), nextPlanAt);
    },
    sendRowProgress: (round, claimedCount) => {
      // Echo so the player's own progress updates the local score bar.
      onRowProgress?.({ round, claimedCount, userId });
    },

    // Sabotage: echo the player's sabotage, AND have the bot actually lose
    // one of its own claimed tiles so the player's view of the bot's grid
    // reflects the hit. Broadcasts unclaim + updated progress for the bot.
    sendSabotage: (row) => {
      onSabotage?.({ fromUserId: userId, row });
      if (stopped || sabotageBotFinished) return;
      if (botClaimedTiles.size === 0) return;
      const arr = [...botClaimedTiles];
      const lostKey = arr[Math.floor(Math.random() * arr.length)];
      const [r, c] = lostKey.split(",").map(Number);
      botClaimedTiles.delete(lostKey);
      botSubmittedCount = botClaimedTiles.size;
      onUnclaim?.({ tileR: r, tileC: c, userId: botUserId });
      broadcastBotProgress();
    },
    sendProgress: (submittedCount, totalClaimableParam) => {
      onProgress?.({ userId, submittedCount, totalClaimable: totalClaimableParam });
    },
    sendPuzzleDone: () => {
      onPuzzleDone?.({ userId, finishedAt: Date.now() });
    },
    sendSurvivalUpdate: (heartsLeft, submittedCount, totalClaimableParam, state) => {
      onSurvivalUpdate?.({
        userId,
        heartsLeft,
        submittedCount,
        totalClaimable: totalClaimableParam,
        state,
      });
    },
    sendSurvivalAttack: () => {
      // Echo so the player's own logic can hook off of it if needed.
      onSurvivalAttack?.({ attackerId: userId });
      // The player just landed a correct submission — bot takes 1 damage.
      if (stopped || survivalBotDead) return;
      botHearts = Math.max(0, botHearts - 1);
      if (botHearts <= 0) survivalBotDead = true;
      broadcastSurvivalState();
    },
    sendChessTurn: (tileR, tileC, tileData, msLeftAfter) => {
      // Player just submitted — echo to caller and track the tile so the bot
      // doesn't try to pick the same one. Then schedule the bot's next turn.
      const key = `${tileR},${tileC}`;
      botSubmittedTiles.add(key);
      onChessTurn?.({
        userId,
        tileR,
        tileC,
        tileData,
        msLeftAfter,
        anchorAt: Date.now(),
      });
      // It's the bot's turn now.
      scheduleTimer(scheduleBotChessClockTurn, 300);
    },

    leave: () => {
      stopped = true;
      for (const id of timers) clearTimeout(id);
      timers.clear();
      clearPlan();
    },
  };
}

export function getBotDisplayName() {
  return BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
}
