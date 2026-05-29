import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

// Centralized haptic feedback. On native (iOS/Android) we use the Capacitor
// Haptics plugin — the Web Vibration API (`navigator.vibrate`) is ignored by
// iOS WKWebView, so it can't be relied on there. On the web we fall back to
// `navigator.vibrate` where it's supported.
const isNative = (() => {
  try { return Capacitor.isNativePlatform(); } catch { return false; }
})();

function webVibrate(pattern) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch { /* vibration unsupported */ }
}

// A light tick — e.g. filling in a single grid cell while drawing.
export function hapticLight() {
  if (isNative) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  else webVibrate(8);
}

// A firmer tap for more deliberate confirmations.
export function hapticMedium() {
  if (isNative) Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
  else webVibrate(20);
}

// A success buzz — e.g. completing a tile correctly.
export function hapticSuccess() {
  if (isNative) Haptics.notification({ type: NotificationType.Success }).catch(() => {});
  else webVibrate([12, 30, 8]);
}

// A negative buzz — e.g. submitting an incorrect tile.
export function hapticWarning() {
  if (isNative) Haptics.notification({ type: NotificationType.Warning }).catch(() => {});
  else webVibrate([40, 20, 40]);
}

// A celebratory pattern — e.g. completing a full row or column.
export function hapticCelebrate() {
  if (isNative) Haptics.notification({ type: NotificationType.Success }).catch(() => {});
  else webVibrate([15, 20, 15, 20, 60]);
}
