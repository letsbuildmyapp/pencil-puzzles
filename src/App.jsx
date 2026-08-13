import { useState, useEffect } from "react";
import { C } from "./constants";
import { supa } from "./lib/supabase";
import { loadSession, saveSession, clearSession, ensureFreshSession } from "./lib/session";
import { initPurchases } from "./lib/purchases";
import { initAds } from "./lib/ads";
import { giveWelcomeCredits } from "./lib/credits";
import { grantDailyLoginBonus } from "./lib/pvpRewards";
import { refreshDailyReminder, setupNotificationListeners, enableNotifications } from "./lib/notifications";
import OnboardingScreen from "./components/auth/OnboardingScreen";
import SignUpScreen from "./components/auth/SignUpScreen";
import LoginScreen from "./components/auth/LoginScreen";
import ForgotPasswordScreen from "./components/auth/ForgotPasswordScreen";
import HomeScreenWithAuth from "./components/home/HomeScreenWithAuth";
import PuzzleGame from "./components/game/PuzzleGame";
import VersusFlow from "./components/versus/VersusFlow";
import DailyLoginBonusModal from "./components/shared/DailyLoginBonusModal";
import AdminPage from "./components/admin/AdminPage";
import { flushQueue } from "./lib/analytics";

export default function App() {
  const [authStage, setAuthStage] = useState("loading");
  const [session, setSession] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [screen, setScreen] = useState(window.location.pathname === "/admin" ? "admin" : "home");
  const [homeTab, setHomeTab] = useState("home");
  const [versusMode, setVersusMode] = useState("territory");
  const [puzzle, setPuzzle] = useState(null);
  const [puzzleCategory, setPuzzleCategory] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loginBonus, setLoginBonus] = useState(null); // { credits, streak } when first open of day
  const [forgotEmail, setForgotEmail] = useState("");
  const [showRatePrompt, setShowRatePrompt] = useState(false);

  useEffect(() => { initPurchases(); initAds(); setupNotificationListeners(); refreshDailyReminder(); flushQueue(); }, []);

  // Grant the daily login streak bonus the first time the app reaches the
  // authenticated "app" stage each calendar day. Idempotent — subsequent
  // transitions same-day are no-ops (credits: 0) so we don't show the modal.
  useEffect(() => {
    if (authStage !== "app") return;
    const bonus = grantDailyLoginBonus();
    if (bonus.firstTimeToday && bonus.credits > 0) {
      setLoginBonus(bonus);
    }
  }, [authStage]);

  useEffect(() => {
    (async () => {
      const saved = loadSession();
      if (!saved?.token) {
        const seen = localStorage.getItem("pp_onboarded");
        setAuthStage(seen ? "login" : "onboarding");
        return;
      }
      const fresh = await ensureFreshSession(saved);
      if (!fresh) {
        clearSession();
        setAuthStage("login");
        return;
      }
      try {
        const profile = await supa.getProfile(fresh.userId, fresh.token);
        if (profile) {
          setSession({ ...fresh, isAdmin: !!profile.is_admin });
          setDisplayName(profile.display_name || fresh.email);
          setAuthStage("app");
        } else {
          clearSession();
          setAuthStage("onboarding");
        }
      } catch {
        setSession(fresh);
        setAuthStage("app");
      }
    })();
  }, []);

  // Proactively refresh the Supabase access token before it expires
  // (default TTL is 1 hour) so users don't silently lose their session.
  useEffect(() => {
    if (!session?.refreshToken) return;
    const tick = async () => {
      const next = await ensureFreshSession(session);
      if (!next) { clearSession(); setSession(null); setAuthStage("login"); return; }
      if (next.token !== session.token) setSession(prev => prev ? { ...prev, ...next } : next);
    };
    const id = setInterval(tick, 30 * 60 * 1000);
    const onVisible = () => { if (document.visibilityState === "visible") tick(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVisible); };
  }, [session?.refreshToken]);

  const handleOnboardingDone = () => {
    localStorage.setItem("pp_onboarded", "1");
    setAuthStage("signup");
  };

  const handleSignUpSuccess = (sess, name) => {
    setSession(sess);
    setDisplayName(name);
    giveWelcomeCredits(true);
    supa.updateStreak(sess.userId, sess.token).catch(() => {});
    enableNotifications().catch(() => {});
    setShowWelcome(true);
    setAuthStage("app");
  };

  const handleLoginSuccess = async (sess, demoName) => {
    if (demoName) { setSession(sess); setDisplayName(demoName); giveWelcomeCredits(); setAuthStage("app"); return; }
    try {
      const profile = await supa.getProfile(sess.userId, sess.token);
      setSession({ ...sess, isAdmin: !!profile?.is_admin });
      setDisplayName(profile?.display_name || sess.email);
      await supa.updateStreak(sess.userId, sess.token);
    } catch (e) { setSession(sess); setDisplayName(sess.email); }
    setAuthStage("app");
  };

  const handleSignOut = async () => {
    if (session) { try { await supa.signOut(session.token); } catch (e) {} }
    clearSession();
    setSession(null);
    setDisplayName("");
    setScreen("home");
    setAuthStage("login");
  };

  const handlePuzzleComplete = async (puzzleId, score, hintRevealed) => {
    if (!hintRevealed) {
      try {
        const noHints = JSON.parse(localStorage.getItem("pp_no_hint_wins") || "[]");
        if (!noHints.includes(puzzleId)) {
          noHints.push(puzzleId);
          localStorage.setItem("pp_no_hint_wins", JSON.stringify(noHints));
        }
      } catch (e) {}
    }
    refreshDailyReminder();
    // Prompt for a review after the 3rd completed puzzle (once ever)
    if (!localStorage.getItem("pp_rate_prompted")) {
      const count = parseInt(localStorage.getItem("pp_completed_count") || "0", 10) + 1;
      localStorage.setItem("pp_completed_count", String(count));
      if (count >= 3) {
        localStorage.setItem("pp_rate_prompted", "1");
        setTimeout(() => setShowRatePrompt(true), 2500); // delay so completion modal shows first
      }
    }
    if (!session) return;
    try { await supa.upsertProgress(session.userId, session.token, puzzleId, true, score); } catch (e) {}
  };

  if (authStage === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 32, fontWeight: 900, color: "#F5F0E8", letterSpacing: 3 }}>Pencil Puzzles</div>
        <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.1)", borderTop: `3px solid ${C.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }
  if (authStage === "onboarding") return <OnboardingScreen onContinue={handleOnboardingDone} />;
  if (authStage === "signup") return <SignUpScreen onSuccess={handleSignUpSuccess} onGoLogin={() => setAuthStage("login")} />;
  if (authStage === "login") return <LoginScreen onSuccess={handleLoginSuccess} onGoSignUp={() => setAuthStage("signup")} onGoForgot={(email) => { setForgotEmail(email || ""); setAuthStage("forgot"); }} />;
  if (authStage === "forgot") return <ForgotPasswordScreen initialEmail={forgotEmail} onBackToLogin={() => setAuthStage("login")} onSuccess={handleLoginSuccess} />;

  return (
    <>
      {screen === "admin" ? (
        <AdminPage
          session={session}
          onBack={() => { setScreen("home"); history.replaceState(null, "", "/"); }}
        />
      ) : screen === "game" && puzzle ? (
        <PuzzleGame
          puzzle={puzzle}
          isAdmin={session?.isAdmin}
          onBack={() => {
            setScreen("home");
            setPuzzle(null);
            if (puzzleCategory) setHomeTab("puzzles");
          }}
          onComplete={(score) => handlePuzzleComplete(puzzle.id, score)}
        />
      ) : screen === "versus" ? (
        <VersusFlow
          session={session}
          displayName={displayName}
          mode={versusMode}
          onBack={() => { setHomeTab("versus"); setScreen("home"); }}
        />
      ) : (
        <HomeScreenWithAuth
          displayName={displayName}
          session={session}
          onPlay={(p, cat) => { setPuzzle(p); setPuzzleCategory(cat || null); setScreen("game"); }}
          initialCategoryName={puzzleCategory}
          onStartVersus={(mode) => { setVersusMode(mode || "territory"); setScreen("versus"); }}
          onAdmin={() => { setScreen("admin"); history.replaceState(null, "", "/admin"); }}
          onSignOut={handleSignOut}
          showWelcome={showWelcome}
          onDismissWelcome={() => setShowWelcome(false)}
          initialTab={homeTab}
        />
      )}
      <DailyLoginBonusModal bonus={loginBonus} onDismiss={() => setLoginBonus(null)} />
      {showRatePrompt && (
        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: "36px 28px", maxWidth: 340, width: "88%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>⭐</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, color: "#2D1B69", marginBottom: 8, letterSpacing: 0.3 }}>Enjoying Pencil Puzzles?</div>
            <div style={{ fontSize: 15, color: "#5B4B8A", fontWeight: 600, lineHeight: 1.5, marginBottom: 24 }}>
              Your feedback helps us grow! Would you take a moment to rate us?
            </div>
            <button onClick={() => {
              setShowRatePrompt(false);
              window.open("https://apps.apple.com/app/id6744213645?action=write-review", "_blank");
            }} style={{ width: "100%", padding: "16px 0", background: "linear-gradient(135deg, #FBBF24, #F59E0B)", color: "#fff", border: "none", borderRadius: 14, fontFamily: "'Fredoka One',cursive", fontSize: 17, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 6px 24px rgba(251,191,36,0.4)", marginBottom: 10 }}>
              Rate Us ⭐
            </button>
            <button onClick={() => setShowRatePrompt(false)} style={{ width: "100%", padding: "12px 0", background: "none", color: "#9B8BB4", border: "none", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
