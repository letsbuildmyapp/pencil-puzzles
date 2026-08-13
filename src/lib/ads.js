// AdMob wrapper. Three layers, per the monetization plan:
//   1. Rewarded video  — opt-in, the player chooses to watch for a reward
//   2. Interstitial    — forced, between PvP matches, every Nth match
//   3. Ad-free        — any paid purchase kills interstitials for good;
//                        the opt-in rewarded offers stay available
//
// Everything here no-ops on web (AdMob is native-only), so callers can invoke
// these unconditionally and just check the return value.

import { Capacitor } from "@capacitor/core";
import { AdMob, RewardAdPluginEvents, AdmobConsentStatus } from "@capacitor-community/admob";

// ---------------------------------------------------------------------------
// Ad unit IDs
//
// These are Google's official test units. They always fill and never generate
// revenue, which is what we want until the real units exist in AdMob. Swap in
// the real IDs below when the AdMob app is created — leave the test IDs in the
// TEST_UNITS block so a dev build can still force them via USE_TEST_ADS.
//
// Live units go here (from the AdMob console, one pair per platform).
// Android has no AdMob app yet — the app was never published there — so its
// units stay empty and unitFor() falls back to the test IDs below.
const LIVE_UNITS = {
  ios: {
    rewarded: "ca-app-pub-4856636200336756/3952501068",
    interstitial: "ca-app-pub-4856636200336756/8670279154",
  },
  android: { rewarded: "", interstitial: "" },
};

const TEST_UNITS = {
  ios: {
    rewarded: "ca-app-pub-3940256099942544/1712485313",
    interstitial: "ca-app-pub-3940256099942544/4411468910",
  },
  android: {
    rewarded: "ca-app-pub-3940256099942544/5224354917",
    interstitial: "ca-app-pub-3940256099942544/1033173712",
  },
};

// Flip to true to force Google's test units — do that before testing on a real
// device, because tapping a live ad on your own build is invalid traffic and
// can get the AdMob account suspended.
const USE_TEST_ADS = false;

function unitFor(kind) {
  const platform = Capacitor.getPlatform() === "ios" ? "ios" : "android";
  if (!USE_TEST_ADS) {
    const live = LIVE_UNITS[platform]?.[kind];
    if (live) return live;
    // No live unit configured yet — fall back to test rather than crashing.
  }
  return TEST_UNITS[platform][kind];
}

// ---------------------------------------------------------------------------
// Storage keys

const AD_FREE_KEY = "pp_ad_free";
const REWARD_COUNT_KEY = "pp_ad_rewards_today";
const REWARD_DATE_KEY = "pp_ad_rewards_date";
const MATCH_COUNT_KEY = "pp_ad_match_count";
const UNLOCK_ADS_KEY = "pp_ad_unlocked_puzzles";

// Caps and frequencies
export const DAILY_REWARD_CAP = 5; // "watch for +1 credit", per day
const INTERSTITIAL_EVERY = 3; // show on every 3rd finished PvP match

// ---------------------------------------------------------------------------
// Ad-free state
//
// Written by purchases.js after any purchase, and at init or restore when the
// big_box entitlement is seen. Kept in localStorage so the very first frame
// after launch already knows, before RevenueCat responds.

export function isAdFree() {
  return localStorage.getItem(AD_FREE_KEY) === "true";
}

export function setAdFree(value) {
  if (value) localStorage.setItem(AD_FREE_KEY, "true");
  else localStorage.removeItem(AD_FREE_KEY);
}

// ---------------------------------------------------------------------------
// Init

function isNative() {
  return Capacitor.isNativePlatform();
}

// Whether ad-funded offers should be shown at all. False on web, where AdMob
// can't serve, so the UI hides those buttons instead of offering a dead end.
export function adsAvailable() {
  return isNative();
}

let _initPromise = null;

async function _doInit() {
  await AdMob.initialize({ initializeForTesting: USE_TEST_ADS });
  // GDPR / consent. Only actually prompts in regions that require it; a
  // failure here must not block ads from serving to everyone else.
  try {
    const info = await AdMob.requestConsentInfo();
    if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
      await AdMob.showConsentForm();
    }
  } catch {
    /* consent unavailable — carry on with non-personalized ads */
  }
}

// ---------------------------------------------------------------------------
// App Tracking Transparency (iOS 14+)
//
// Without ATT authorization the SDK can't read the IDFA, so every ad serves
// non-personalized and earns noticeably less. Apple only allows one prompt per
// install, so it's spent on the first ad rather than on launch: a player who
// has just chosen to watch an ad understands what the dialog is for, which
// converts far better than the same dialog thrown at a cold first launch.
//
// The cost of waiting is that the very first ad request goes out before the
// answer is known, so that one ad is non-personalized. Every later one isn't.

let _attAsked = false;

async function ensureTrackingAuthorization() {
  if (_attAsked || Capacitor.getPlatform() !== "ios") return;
  _attAsked = true;
  try {
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === "notDetermined") await AdMob.requestTrackingAuthorization();
  } catch (e) {
    // Never let the prompt block the ad — non-personalized still pays.
    console.log("[ads] ATT request failed:", e?.message || String(e));
  }
}

export function initAds() {
  if (!isNative()) return Promise.resolve();
  if (!_initPromise) {
    _initPromise = _doInit().catch((e) => {
      console.log("[ads] init failed:", e?.message || String(e));
      _initPromise = null; // allow a retry on the next call
    });
  }
  return _initPromise;
}

// ---------------------------------------------------------------------------
// Rewarded video

// Resolves true only if the user actually earned the reward (watched far
// enough). Any failure — no fill, no network, user dismissed early, web —
// resolves false, so callers never hand out a reward on a broken ad.
export async function showRewarded() {
  if (!isNative()) return false;
  await initAds();
  await ensureTrackingAuthorization();

  let earned = false;
  const listener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
    earned = true;
  });

  try {
    await AdMob.prepareRewardVideoAd({ adId: unitFor("rewarded") });
    await AdMob.showRewardVideoAd();
    return earned;
  } catch (e) {
    console.log("[ads] rewarded failed:", e?.message || String(e));
    return false;
  } finally {
    await listener.remove();
  }
}

// --- daily cap on the "+1 credit" reward ------------------------------------

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function rewardsUsedToday() {
  if (localStorage.getItem(REWARD_DATE_KEY) !== todayStamp()) return 0;
  return parseInt(localStorage.getItem(REWARD_COUNT_KEY) || "0", 10);
}

export function rewardsLeftToday() {
  return Math.max(0, DAILY_REWARD_CAP - rewardsUsedToday());
}

export function recordRewardUse() {
  const used = rewardsUsedToday(); // also tells us whether the date rolled over
  localStorage.setItem(REWARD_DATE_KEY, todayStamp());
  localStorage.setItem(REWARD_COUNT_KEY, String(used + 1));
}

// --- one ad-unlock per puzzle -----------------------------------------------
//
// A puzzle can be opened by watching an ad instead of spending a credit, but
// only once ever, so the ad route can't be farmed to unlock the whole catalog
// off a single puzzle's prompt.

function readAdUnlocked() {
  try {
    const parsed = JSON.parse(localStorage.getItem(UNLOCK_ADS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function canUnlockWithAd(puzzleId) {
  return !readAdUnlocked().includes(puzzleId);
}

export function recordAdUnlock(puzzleId) {
  const all = readAdUnlocked();
  if (!all.includes(puzzleId)) {
    all.push(puzzleId);
    localStorage.setItem(UNLOCK_ADS_KEY, JSON.stringify(all));
  }
}

// ---------------------------------------------------------------------------
// Interstitial

// Counting and showing are split so the caller can count the match the moment
// it ends but hold the ad until the player leaves the result screen. An
// interstitial over the win/XP reveal would step on the best moment in the
// match, and it's also the moment players are most likely to rage-quit.
//
// The counter advances even for ad-free players, so going ad-free mid-session
// doesn't shift where the boundary would otherwise have fallen.
// Returns true if this match lands on an interstitial boundary.
export function recordFinishedMatch() {
  const count = parseInt(localStorage.getItem(MATCH_COUNT_KEY) || "0", 10) + 1;
  localStorage.setItem(MATCH_COUNT_KEY, String(count));

  if (isAdFree()) return false;
  if (!isNative()) return false;
  return count % INTERSTITIAL_EVERY === 0;
}

// Returns true if an ad was actually shown. Never throws — a failed
// interstitial must not block the player from starting the next match.
export async function showInterstitial() {
  if (isAdFree() || !isNative()) return false;
  try {
    await initAds();
    await ensureTrackingAuthorization();
    await AdMob.prepareInterstitial({ adId: unitFor("interstitial") });
    await AdMob.showInterstitial();
    return true;
  } catch (e) {
    console.log("[ads] interstitial failed:", e?.message || String(e));
    return false;
  }
}
