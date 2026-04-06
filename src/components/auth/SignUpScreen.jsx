import { useState } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { saveSession } from "../../lib/session";
import { initCredits } from "../../lib/credits";
import AuthInput from "./AuthInput";

export default function SignUpScreen({ onSuccess, onGoLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Display name is required";
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (pass.length < 6) e.pass = "Password must be at least 6 characters";
    if (pass !== pass2) e.pass2 = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true); setGlobalErr("");
    try {
      const res = await supa.signUp(email.trim(), pass, name.trim());
      if (res.error) { setGlobalErr(res.error.message || "Sign up failed"); return; }
      const login = await supa.signIn(email.trim(), pass);
      if (login.error) { setGlobalErr("Account created! Please log in."); onGoLogin(); return; }
      const session = { token: login.access_token, userId: login.user.id, email: login.user.email };
      initCredits(session.userId);
      saveSession(session);
      onSuccess(session, name.trim());
    } catch (err) {
      const demoSession = { token: "demo", userId: "demo-" + Date.now(), email: email.trim(), demo: true };
      initCredits(demoSession.userId);
      saveSession({ ...demoSession, displayName: name.trim() });
      onSuccess(demoSession, name.trim());
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Courier Prime',monospace", overflowX: "hidden" }}>
      <div style={{ background: C.ink, padding: "44px 24px 28px", textAlign: "center", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,96,26,0.15) 0%, transparent 70%)" }}>
        <div style={{ color: "#F5F0E8", fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, letterSpacing: 3 }}>Create Account</div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 4, marginTop: 6, textTransform: "uppercase" }}>Pencil Puzzles</div>
      </div>
      <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: 440, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        {globalErr && <div style={{ background: "#FFF0EE", border: `1px solid ${C.wrong}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.wrong }}>{globalErr}</div>}
        <AuthInput label="Display Name" value={name} onChange={setName} placeholder="How should we call you?" error={errors.name} />
        <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} />
        <AuthInput label="Password" type="password" value={pass} onChange={setPass} placeholder="At least 6 characters" error={errors.pass} />
        <AuthInput label="Confirm Password" type="password" value={pass2} onChange={setPass2} placeholder="Repeat password" error={errors.pass2} />
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "14px 0", marginTop: 8, background: loading ? "rgba(212,96,26,0.5)" : C.accent, color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Courier Prime',monospace", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 20px rgba(212,96,26,0.35)", transition: "all 0.15s" }}>
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
        </button>
        <div style={{ textAlign: "center", marginTop: 4 }}>
          <span style={{ fontSize: 12, color: C.muted }}>Already have an account? </span>
          <span onClick={onGoLogin} style={{ fontSize: 12, color: C.accent, cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>Log in</span>
        </div>
      </div>
    </div>
  );
}
