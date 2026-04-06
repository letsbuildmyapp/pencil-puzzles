import { useState } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { saveSession } from "../../lib/session";
import { initCredits } from "../../lib/credits";
import AuthInput from "./AuthInput";

export default function LoginScreen({ onSuccess, onGoSignUp }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  const handleSubmit = async () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (!pass) e.pass = "Enter your password";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setGlobalErr("");
    try {
      const res = await supa.signIn(email.trim(), pass);
      if (res.error || !res.access_token) { setGlobalErr("Incorrect email or password."); return; }
      const session = { token: res.access_token, userId: res.user.id, email: res.user.email };
      initCredits(session.userId);
      saveSession(session); onSuccess(session);
    } catch (err) {
      const displayName = email.split("@")[0];
      const localSession = { token: "local", userId: "local-" + btoa(email).slice(0, 12), email: email.trim(), local: true };
      initCredits(localSession.userId);
      saveSession({ ...localSession, displayName });
      onSuccess(localSession, displayName);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Courier Prime',monospace", overflowX: "hidden" }}>
      <div style={{ background: C.ink, padding: "44px 24px 28px", textAlign: "center", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,96,26,0.15) 0%, transparent 70%)" }}>
        <div style={{ color: "#F5F0E8", fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, letterSpacing: 3 }}>Welcome Back</div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 4, marginTop: 6, textTransform: "uppercase" }}>Pencil Puzzles</div>
      </div>
      <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: 440, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        {globalErr && <div style={{ background: "#FFF0EE", border: `1px solid ${C.wrong}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.wrong }}>{globalErr}</div>}
        <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} />
        <AuthInput label="Password" type="password" value={pass} onChange={setPass} placeholder="Your password" error={errors.pass} />
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px 0", marginTop: 8, background: loading ? "rgba(212,96,26,0.5)" : C.accent, color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Courier Prime',monospace", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 20px rgba(212,96,26,0.35)" }}>
          {loading ? "LOGGING IN..." : "LOG IN"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontSize: 11, color: C.muted, letterSpacing: 1, fontFamily: "'Courier Prime',monospace" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <button onClick={() => {
          const demoSession = { token: "demo", userId: "demo-user", email: "test@test.com", demo: true };
          initCredits(demoSession.userId);
          saveSession({ ...demoSession, displayName: "Demo User" });
          onSuccess(demoSession, "Demo User");
        }} disabled={loading} style={{ width: "100%", padding: "14px 0", background: "transparent", color: C.accent, border: `2px dashed ${C.accent}`, borderRadius: 10, fontFamily: "'Courier Prime',monospace", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: loading ? "not-allowed" : "pointer" }}>
          🎮 DEMO LOGIN
        </button>
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Don't have an account? </span>
          <span onClick={onGoSignUp} style={{ fontSize: 12, color: C.accent, cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>Sign up</span>
        </div>
      </div>
    </div>
  );
}
