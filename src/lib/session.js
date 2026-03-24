const SESSION_KEY = "pp_session";

export const saveSession = (s) => {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
};

export const loadSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
};

export const clearSession = () => {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
};
