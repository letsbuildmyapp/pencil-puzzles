const SUPA_URL = "https://ljsquznxqhfcegmquzbe.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3F1em54cWhmY2VnbXF1emJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzM3ODQsImV4cCI6MjA4ODY0OTc4NH0.zNhRTr5T_DEvPzz12aaZXf3aNtS6i8AGbE6fahyemYg";

export const supa = {
  async signUp(email, password, displayName) {
    const r = await fetch(`${SUPA_URL}/auth/v1/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPA_KEY },
      body: JSON.stringify({ email, password, data: { display_name: displayName } }),
    });
    return r.json();
  },

  async signIn(email, password) {
    const r = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPA_KEY },
      body: JSON.stringify({ email, password }),
    });
    return r.json();
  },

  async signOut(token) {
    await fetch(`${SUPA_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPA_KEY, Authorization: `Bearer ${token}` },
    });
  },

  async getProfile(userId, token) {
    const r = await fetch(`${SUPA_URL}/rest/v1/profiles?id=eq.${userId}&select=*`, {
      headers: { apikey: SUPA_KEY, Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    return d[0] || null;
  },

  async getProgress(userId, token) {
    const r = await fetch(`${SUPA_URL}/rest/v1/puzzle_progress?user_id=eq.${userId}&select=*`, {
      headers: { apikey: SUPA_KEY, Authorization: `Bearer ${token}` },
    });
    return r.ok ? r.json() : [];
  },

  async getStreak(userId, token) {
    const r = await fetch(`${SUPA_URL}/rest/v1/streaks?user_id=eq.${userId}&select=*`, {
      headers: { apikey: SUPA_KEY, Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    return d[0] || { current_streak: 0, longest_streak: 0 };
  },

  async upsertProgress(userId, token, puzzleId, completed, score) {
    await fetch(`${SUPA_URL}/rest/v1/puzzle_progress`, {
      method: "POST",
      headers: {
        apikey: SUPA_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        user_id: userId,
        puzzle_id: puzzleId,
        completed,
        score,
        completed_at: completed ? new Date().toISOString() : null,
      }),
    });
  },

  async updateStreak(userId, token) {
    const today = new Date().toISOString().split("T")[0];
    const streak = await this.getStreak(userId, token);
    const last = streak.last_played_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let current = last === yesterday ? streak.current_streak + 1 : last === today ? streak.current_streak : 1;
    const longest = Math.max(current, streak.longest_streak || 0);
    await fetch(`${SUPA_URL}/rest/v1/streaks?user_id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        apikey: SUPA_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_streak: current, longest_streak: longest, last_played_date: today }),
    });
    return { current_streak: current, longest_streak: longest };
  },
};
