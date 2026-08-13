import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { App } from "@capacitor/app";
import { getDailyPuzzle } from "./credits";

const ENABLED_KEY = "pp_notifications_enabled";
const DAILY_REMINDER_ID = 1;
const REMINDER_HOUR = 7; // 7 AM local time
const DELAY_MINUTES_IF_OPEN_LATER = 60; // If 7am passed and they haven't started, remind 1hr later

function isNative() {
  return Capacitor.isNativePlatform();
}

export function notificationsEnabled() {
  return localStorage.getItem(ENABLED_KEY) === "true";
}

export async function checkPermission() {
  if (!isNative()) return "denied";
  try {
    const { display } = await LocalNotifications.checkPermissions();
    return display;
  } catch (e) {
    return "denied";
  }
}

export async function requestPermission() {
  if (!isNative()) return "denied";
  try {
    const { display } = await LocalNotifications.requestPermissions();
    return display;
  } catch (e) {
    return "denied";
  }
}

export async function enableNotifications() {
  const status = await requestPermission();
  if (status !== "granted") return false;
  localStorage.setItem(ENABLED_KEY, "true");
  await scheduleDailyReminder();
  return true;
}

export async function disableNotifications() {
  localStorage.setItem(ENABLED_KEY, "false");
  if (!isNative()) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] });
  } catch (e) {}
}

function dailyPuzzleStartedToday() {
  try {
    const daily = getDailyPuzzle();
    const saved = JSON.parse(localStorage.getItem(`pp_grid_${daily.id}`) || "null");
    if (!saved?.grid) return false;
    // Started = any cell filled OR puzzle marked done
    if (saved.done) return true;
    return saved.grid.flat(3).some(Boolean);
  } catch (e) { return false; }
}

function nextReminderTime() {
  const now = new Date();
  const target = new Date();
  target.setHours(REMINDER_HOUR, 0, 0, 0);

  // If they've already started today's daily, schedule for tomorrow at 7am
  if (dailyPuzzleStartedToday()) {
    target.setDate(target.getDate() + 1);
    return target;
  }

  // Not started yet — figure out today's slot
  if (now < target) {
    // Before 7am: schedule for today at 7am
    return target;
  }
  // Past 7am with no progress: remind them 1 hour from now
  const later = new Date(now.getTime() + DELAY_MINUTES_IF_OPEN_LATER * 60 * 1000);
  return later;
}

async function cancelPendingReminder() {
  if (!isNative()) return;
  try {
    await LocalNotifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] });
  } catch (e) {}
}

export async function scheduleDailyReminder() {
  if (!isNative() || !notificationsEnabled()) return;
  await cancelPendingReminder();
  const at = nextReminderTime();
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: DAILY_REMINDER_ID,
          title: "🧩 Pencil Puzzles",
          body: "Today's puzzle is ready! Can you solve it?",
          schedule: { at, repeats: false },
          smallIcon: "ic_stat_icon_config_sample",
        },
      ],
    });
  } catch (e) {
    console.warn("Failed to schedule notification:", e);
  }
}

// Call when app comes to foreground — cancel pending reminders so they don't fire while user is in-app
async function handleAppForeground() {
  if (!notificationsEnabled()) return;
  await cancelPendingReminder();
}

// Call when app goes to background — schedule the next reminder
async function handleAppBackground() {
  if (!notificationsEnabled()) return;
  await scheduleDailyReminder();
}

let listenersAttached = false;
export function setupNotificationListeners() {
  if (!isNative() || listenersAttached) return;
  listenersAttached = true;
  App.addListener("appStateChange", ({ isActive }) => {
    if (isActive) handleAppForeground();
    else handleAppBackground();
  });
}

// Manual refresh — call after puzzle completion or significant state changes
export async function refreshDailyReminder() {
  if (!notificationsEnabled()) return;
  await scheduleDailyReminder();
}
