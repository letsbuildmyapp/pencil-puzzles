import { useState, useEffect } from "react";
import { C } from "./constants";
import { supa } from "./lib/supabase";
import { loadSession, saveSession, clearSession } from "./lib/session";
import { getCredits, initCredits, spendCredit } from "./lib/credits";
import OnboardingScreen from "./components/auth/OnboardingScreen";
import SignUpScreen from "./components/auth/SignUpScreen";
import LoginScreen from "./components/auth/LoginScreen";
import HomeScreenWithAuth from "./components/home/HomeScreenWithAuth";
import PuzzleGame from "./components/game/PuzzleGame";

export default function App() {
  const [authStage, setAuthStage] = useState("loading");
  const [session, setSession] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [screen, setScreen] = useState("home");
  const [puzzle, setPuzzle] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const saved = loadSession();
    if (saved?.token) {
      supa.getProfile(saved.userId, saved.token).then(profile => {
        if (profile) {
          setSession(saved);
          setDisplayName(profile.display_name || saved.email);
          setCredits(initCredits(saved.userId));
          setAuthStage("app");
        } else {
          clearSession();
          setAuthStage("onboarding");
        }
      }).catch(() => {
        setSession(saved);
        setCredits(initCredits(saved.userId));
        setAuthStage("app");
      });
    } else {
      const seen = localStorage.getItem("pp_onboarded");
      setAuthStage(seen ? "login" : "onboarding");
    }
  }, []);

  const handleOnboardingDone = () => {
    localStorage.setItem("pp_onboarded", "1");
    setAuthStage("signup");
  };

  const handleSignUpSuccess = (sess, name) => {
    setSession(sess);
    setDisplayName(name);
    setCredits(initCredits(sess.userId));
    supa.updateStreak(sess.userId, sess.token).catch(() => {});
    setAuthStage("app");
  };

  const handleLoginSuccess = async (sess, demoName) => {
    setSession(sess);
    setCredits(initCredits(sess.userId));
    if (demoName) { setDisplayName(demoName); setAuthStage("app"); return; }
    try {
      const profile = await supa.getProfile(sess.userId, sess.token);
      setDisplayName(profile?.display_name || sess.email);
      await supa.updateStreak(sess.userId, sess.token);
    } catch (e) { setDisplayName(sess.email); }
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

  const handleSpendCredit = () => {
    if (!session) return false;
    const ok = spendCredit(session.userId);
    if (ok) setCredits(getCredits(session.userId));
    return ok;
  };

  const handlePuzzleComplete = async (puzzleId, score) => {
    if (!session) return;
    try { await supa.upsertProgress(session.userId, session.token, puzzleId, true, score); } catch (e) {}
  };

  if (authStage === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: "#F5F0E8", letterSpacing: 3 }}>Pencil Puzzles</div>
        <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.1)", borderTop: `3px solid ${C.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }
  if (authStage === "onboarding") return <OnboardingScreen onContinue={handleOnboardingDone} />;
  if (authStage === "signup") return <SignUpScreen onSuccess={handleSignUpSuccess} onGoLogin={() => setAuthStage("login")} />;
  if (authStage === "login") return <LoginScreen onSuccess={handleLoginSuccess} onGoSignUp={() => setAuthStage("signup")} />;

  return (
    <>
      {screen === "game" && puzzle ? (
        <PuzzleGame
          puzzle={puzzle}
          onBack={() => { setScreen("home"); setPuzzle(null); }}
          onComplete={(score) => handlePuzzleComplete(puzzle.id, score)}
        />
      ) : (
        <HomeScreenWithAuth
          displayName={displayName}
          session={session}
          credits={credits}
          onSpendCredit={handleSpendCredit}
          onPlay={p => { setPuzzle(p); setScreen("game"); }}
          onSignOut={handleSignOut}
        />
      )}
    </>
  );
}
