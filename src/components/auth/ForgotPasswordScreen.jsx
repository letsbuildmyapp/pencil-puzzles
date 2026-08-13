import { useState } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { saveSession } from "../../lib/session";
// OTP verify response holds the full auth payload we need for refresh.
import AuthInput from "./AuthInput";

export default function ForgotPasswordScreen({ initialEmail = "", onBackToLogin, onSuccess }) {
  const [step, setStep] = useState("email"); // email → code → password → done
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(3600);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  // Step 1: send OTP code to email
  const handleSendCode = async () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await supa.sendOtp(email.trim());
      if (res.error) { setGlobalErr(res.error); return; }
      setStep("code");
    } catch {
      // Don't reveal whether the email exists
      setStep("code");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify the verification code
  const handleVerifyCode = async () => {
    const trimmed = code.trim();
    if (!trimmed || trimmed.length < 6) {
      setErrors({ code: "Enter the verification code from your email" });
      return;
    }
    setErrors({});
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await supa.verifyOtp(email.trim(), trimmed);
      if (res.error || res.error_code || !res.access_token) {
        setGlobalErr(res.msg || res.error_description || "Invalid or expired code. Please try again.");
        return;
      }
      setAccessToken(res.access_token);
      setRefreshToken(res.refresh_token);
      setExpiresIn(res.expires_in ?? 3600);
      setUserId(res.user?.id);
      setStep("password");
    } catch {
      setGlobalErr("Could not verify code. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: set new password
  const handleSetPassword = async () => {
    const e = {};
    if (newPass.length < 6) e.newPass = "Password must be at least 6 characters";
    if (newPass !== newPass2) e.newPass2 = "Passwords don't match";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setGlobalErr("");
    try {
      const res = await supa.updatePassword(accessToken, newPass);
      if (res.error || res.code >= 400) {
        setGlobalErr(res.msg || res.error || "Could not update password. Please try again.");
        return;
      }
      // Log the user in with their new session
      if (accessToken && userId) {
        const session = {
          token: accessToken,
          refreshToken,
          expiresAt: Date.now() + expiresIn * 1000,
          userId,
          email: email.trim(),
        };
        saveSession(session);
        onSuccess?.(session);
      } else {
        setStep("done");
      }
    } catch {
      setGlobalErr("Could not update password. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const headerTitle =
    step === "email" ? "Reset Password" :
    step === "code" ? "Enter Code" :
    step === "password" ? "New Password" :
    "All Set!";

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Nunito',sans-serif", overflowX: "hidden" }}>
      <div style={{ background: C.ink, padding: "44px 24px 28px", textAlign: "center", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(212,96,26,0.15) 0%, transparent 70%)" }}>
        <div style={{ color: "#F5F0E8", fontFamily: "'Fredoka One',cursive", fontSize: 30, fontWeight: 900, letterSpacing: 2 }}>
          {headerTitle}
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 4, marginTop: 6, textTransform: "uppercase" }}>Pencil Puzzles</div>
      </div>

      <div style={{ flex: 1, padding: "28px 24px 40px", maxWidth: 440, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        {globalErr && (
          <div style={{ background: "#FFF0EE", border: `1px solid ${C.wrong}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.wrong }}>
            {globalErr}
          </div>
        )}

        {step === "email" && (
          <>
            <div style={{ fontSize: 13, color: C.inkMid, fontWeight: 600, lineHeight: 1.5, marginTop: 4, marginBottom: 4 }}>
              Enter the email associated with your account and we'll send you a verification code.
            </div>
            <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} name="email" autoComplete="email" />
            <button onClick={handleSendCode} disabled={loading} style={{
              width: "100%", padding: "14px 0", marginTop: 8,
              background: loading ? "rgba(168,85,247,0.5)" : C.accent,
              color: "#fff", border: "none", borderRadius: 10,
              fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
            }}>
              {loading ? "SENDING..." : "SEND CODE"}
            </button>
          </>
        )}

        {step === "code" && (
          <>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ fontSize: 56, marginBottom: 14 }}>📬</div>
              <div style={{ fontSize: 14, color: C.inkMid, fontWeight: 600, lineHeight: 1.5 }}>
                We sent a verification code to <span style={{ color: C.ink, fontWeight: 800 }}>{email}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginTop: 6 }}>
                Check your inbox (and spam folder).
              </div>
            </div>
            <AuthInput label="Verification Code" value={code} onChange={setCode} placeholder="Enter verification code" error={errors.code} name="otp" autoComplete="one-time-code" />
            <button onClick={handleVerifyCode} disabled={loading} style={{
              width: "100%", padding: "14px 0", marginTop: 8,
              background: loading ? "rgba(168,85,247,0.5)" : C.accent,
              color: "#fff", border: "none", borderRadius: 10,
              fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
            }}>
              {loading ? "VERIFYING..." : "VERIFY CODE"}
            </button>
            <button onClick={() => { setStep("email"); setCode(""); setGlobalErr(""); }} style={{
              width: "100%", padding: "12px 0",
              background: "none", color: C.accent, border: `2px solid ${C.accent}`, borderRadius: 10,
              fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer",
            }}>
              TRY ANOTHER EMAIL
            </button>
          </>
        )}

        {step === "password" && (
          <>
            <div style={{ fontSize: 13, color: C.inkMid, fontWeight: 600, lineHeight: 1.5, marginTop: 4, marginBottom: 4 }}>
              Code verified! Set your new password below.
            </div>
            <AuthInput label="New Password" type="password" value={newPass} onChange={setNewPass} placeholder="Password" error={errors.newPass} name="new-password" autoComplete="new-password" hint="Must be at least 6 characters long" />
            <AuthInput label="Confirm Password" type="password" value={newPass2} onChange={setNewPass2} placeholder="Confirm Password" error={errors.newPass2} name="confirm-password" autoComplete="new-password" />
            <button onClick={handleSetPassword} disabled={loading} style={{
              width: "100%", padding: "14px 0", marginTop: 8,
              background: loading ? "rgba(34,197,94,0.5)" : C.correct,
              color: "#fff", border: "none", borderRadius: 10,
              fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(34,197,94,0.35)",
            }}>
              {loading ? "SAVING..." : "SAVE NEW PASSWORD"}
            </button>
          </>
        )}

        {step === "done" && (
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>✅</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, marginBottom: 10 }}>
              Password updated!
            </div>
            <div style={{ fontSize: 14, color: C.inkMid, fontWeight: 600, lineHeight: 1.5, marginBottom: 20 }}>
              You can now log in with your new password.
            </div>
            <button onClick={onBackToLogin} style={{
              width: "100%", padding: "14px 0",
              background: C.accent, color: "#fff", border: "none", borderRadius: 10,
              fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 2, cursor: "pointer",
              boxShadow: "0 4px 20px rgba(168,85,247,0.35)",
            }}>
              BACK TO LOGIN
            </button>
          </div>
        )}

        {(step === "email" || step === "code") && (
          <div style={{ textAlign: "center", marginTop: 4 }}>
            <span onClick={onBackToLogin} style={{ fontSize: 12, color: C.accent, cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
              ← Back to login
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
