import { useState } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import AuthInput from "./AuthInput";

export default function ForgotPasswordScreen({ initialEmail = "", onBackToLogin }) {
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await supa.resetPassword(email.trim());
      if (res.error) {
        setGlobalErr(res.error);
        return;
      }
      setSent(true);
    } catch {
      // Network failure — still show success so users can't probe for registered emails.
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Nunito',sans-serif", overflowX: "hidden" }}>
      <div style={{ background: C.ink, padding: "44px 24px 28px", textAlign: "center", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,96,26,0.15) 0%, transparent 70%)" }}>
        <div style={{ color: "#F5F0E8", fontFamily: "'Fredoka One',cursive", fontSize: 30, fontWeight: 900, letterSpacing: 2 }}>
          {sent ? "Check Your Email" : "Reset Password"}
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 4, marginTop: 6, textTransform: "uppercase" }}>Pencil Puzzles</div>
      </div>

      <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: 440, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        {sent ? (
          <>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>📬</div>
              <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, marginBottom: 10, letterSpacing: 0.3 }}>
                Email sent!
              </div>
              <div style={{ fontSize: 14, color: C.inkMid, fontWeight: 600, lineHeight: 1.5, marginBottom: 6 }}>
                If an account exists for <span style={{ color: C.ink, fontWeight: 800 }}>{email}</span>, we've sent a link to reset your password.
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, lineHeight: 1.5, marginTop: 14 }}>
                Didn't get it? Check your spam folder, or try again in a few minutes.
              </div>
            </div>
            <button
              onClick={() => { setSent(false); setGlobalErr(""); }}
              style={{
                width: "100%", padding: "14px 0", marginTop: 14,
                background: "none", color: C.accent, border: `2px solid ${C.accent}`, borderRadius: 10,
                fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer",
              }}
            >
              TRY ANOTHER EMAIL
            </button>
            <button
              onClick={onBackToLogin}
              style={{
                width: "100%", padding: "14px 0",
                background: C.accent, color: "#fff", border: "none", borderRadius: 10,
                fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
              }}
            >
              BACK TO LOGIN
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: C.inkMid, fontWeight: 600, lineHeight: 1.5, marginTop: 4, marginBottom: 4 }}>
              Enter the email associated with your account and we'll send you a link to reset your password.
            </div>
            {globalErr && (
              <div style={{ background: "#FFF0EE", border: `1px solid ${C.wrong}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.wrong }}>
                {globalErr}
              </div>
            )}
            <AuthInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              error={errors.email}
              name="email"
              autoComplete="email"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "14px 0", marginTop: 8,
                background: loading ? "rgba(168,85,247,0.5)" : C.accent,
                color: "#fff", border: "none", borderRadius: 10,
                fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
              }}
            >
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </button>
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <span
                onClick={onBackToLogin}
                style={{ fontSize: 12, color: C.accent, cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
              >
                ← Back to login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
