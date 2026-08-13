import { supa } from "./supabase";

const SESSION_KEY = "pp_session";
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

export const saveSession = (s) => {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
};

export const loadSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
};

export const clearSession = () => {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
};

// Build a session record from a Supabase /auth token response.
export const sessionFromAuth = (res, extras = {}) => ({
  token: res.access_token,
  refreshToken: res.refresh_token,
  expiresAt: Date.now() + ((res.expires_in ?? 3600) * 1000),
  userId: res.user.id,
  email: res.user.email,
  ...extras,
});

// If the session is near/past expiry, refresh via Supabase and persist the
// new tokens. Returns the refreshed session, the original session if no
// refresh is needed, or null if the refresh_token was rejected (forcing
// the caller to treat the user as logged out).
export const ensureFreshSession = async (session) => {
  if (!session?.token) return null;
  if (!session.refreshToken || !session.expiresAt) return session; // legacy record
  if (session.expiresAt - Date.now() > REFRESH_BUFFER_MS) return session;
  try {
    const res = await supa.refreshToken(session.refreshToken);
    if (!res?.access_token) return null;
    const next = {
      ...session,
      token: res.access_token,
      refreshToken: res.refresh_token || session.refreshToken,
      expiresAt: Date.now() + ((res.expires_in ?? 3600) * 1000),
    };
    saveSession(next);
    return next;
  } catch {
    return session;
  }
};
