import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "../../constants";
import { findMatch } from "../../lib/versus";
import {
  grantFirstMatchBonusIfEligible,
  grantFirstWinBonusIfEligible,
  recordPvpMatch,
} from "../../lib/pvpRewards";
import { trackPvpMatch } from "../../lib/analytics";
import TerritoryGame from "./TerritoryGame";
import RowRumbleGame from "./RowRumbleGame";
import SabotageGame from "./SabotageGame";
import MirrorMatchGame from "./MirrorMatchGame";
import SurvivalGame from "./SurvivalGame";
import ChessClockGame from "./ChessClockGame";
import VersusResult from "./VersusResult";

// Top-level orchestrator for the Versus experience.
// Stages: searching → playing → result. Resets on Play Again.
export default function VersusFlow({ session, displayName, mode = "territory", onBack }) {
  const [stage, setStage] = useState("searching"); // searching | playing | result | error
  const [match, setMatch] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState(0); // bump to re-search after Play Again
  const searchRef = useRef(null);

  useEffect(() => {
    // Defer the subscription so React StrictMode's dev double-mount can unmount
    // cleanly before we touch Supabase Realtime. Without this, the first mount's
    // lobby subscription creates a ghost presence that confuses pairing.
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const search = findMatch({
        userId: session.userId,
        displayName: displayName || "Player",
        mode,
      });
      searchRef.current = search;

      search.promise
        .then((m) => {
          if (cancelled) return;
          // First-match-of-the-day reward. Idempotent — only the first
          // successful match each day actually grants the credit.
          const matchBonus = grantFirstMatchBonusIfEligible();
          setMatch({ ...m, matchBonusCredit: matchBonus ? 1 : 0 });
          setStage("playing");
        })
        .catch((err) => {
          if (cancelled || err?.message === "cancelled") return;
          setError(err?.message || "Matchmaking failed");
          setStage("error");
        });
    }, 40);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      try { searchRef.current?.cancel(); } catch { /* ignore */ }
      searchRef.current = null;
    };
  }, [searchKey, session.userId, displayName]);

  const handleGameEnd = useCallback((r) => {
    // Record lifetime PvP stats (XP, wins, matches, streaks) and grant the
    // first-win-of-day bonus if applicable. A tie doesn't count as a win.
    const won = r?.winner === "me";
    const xpResult = recordPvpMatch(won);
    trackPvpMatch(mode, won, match?.isBot, {
      myScore: r?.myScore,
      oppScore: r?.oppScore,
      opponentName: r?.opponentName || match?.opponent?.displayName,
    });
    const winBonusCredit = won ? (grantFirstWinBonusIfEligible() ? 1 : 0) : 0;
    // Pull the match-start bonus forward so the result screen can surface
    // all credits earned from this single match in one place.
    const matchBonusCredit = match?.matchBonusCredit || 0;
    setResult({
      ...r,
      xpEarned: xpResult.xpEarned,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      prevLevel: xpResult.prevLevel,
      matchBonusCredit,
      winBonusCredit,
    });
    setStage("result");
  }, [match]);

  const handlePlayAgain = () => {
    setMatch(null);
    setResult(null);
    setError(null);
    setStage("searching");
    setSearchKey(k => k + 1);
  };

  if (stage === "searching") {
    return <MatchmakingScreen onCancel={onBack} />;
  }
  if (stage === "error") {
    return <ErrorScreen error={error} onBack={onBack} onRetry={handlePlayAgain} />;
  }
  if (stage === "playing" && match) {
    const GameComponent =
      match.mode === "row-rumble" ? RowRumbleGame :
      match.mode === "sabotage" ? SabotageGame :
      match.mode === "mirror" ? MirrorMatchGame :
      match.mode === "survival" ? SurvivalGame :
      match.mode === "chess-clock" ? ChessClockGame :
      TerritoryGame;
    return (
      <GameComponent
        key={match.matchId}
        match={match}
        session={session}
        onBack={onBack}
        onGameEnd={handleGameEnd}
      />
    );
  }
  if (stage === "result" && result) {
    return <VersusResult result={result} onPlayAgain={handlePlayAgain} onBack={onBack} />;
  }
  return null;
}

function MatchmakingScreen({ onCancel }) {
  return (
    <div
      style={{
        // Fixed + inset:0 forces full-viewport fill regardless of any parent
        // block-width constraints. The inner absolute-centered card then
        // guarantees the stack sits dead-center horizontally AND vertically.
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #1E1245 0%, #2D1B69 50%, #4C1D95 100%)",
        color: "#fff",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "min(320px, calc(100vw - 48px))",
        }}
      >
        {/* The ⚔️ emoji has asymmetric glyph metrics (its visible pixels sit
            left of the character's bounding-box center), so it drifts left
            even inside a centered container. Outer wrapper applies a static
            translate to compensate; inner div runs the pop animation. Keeping
            them on separate elements prevents the animation's transform from
            overriding the nudge. */}
        <div style={{ transform: "translateX(12px)" }}>
          <div style={{
            fontSize: 72,
            marginBottom: 20,
            lineHeight: 1,
            animation: "bannerPop 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
          }}>
            ⚔️
          </div>
        </div>
        <div style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: 34,
          marginBottom: 8,
          letterSpacing: 0.5,
          paddingLeft: 0.5,
        }}>
          Finding Opponent
        </div>
        <div style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.65)",
          marginBottom: 36,
          fontWeight: 600,
          letterSpacing: 0.5,
          paddingLeft: 0.5,
        }}>
          Searching for a worthy challenger…
        </div>
        <div
          style={{
            width: 52,
            height: 52,
            border: "4px solid rgba(255,255,255,0.12)",
            borderTop: "4px solid #A855F7",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
            marginBottom: 40,
          }}
        />
        <button
          onClick={onCancel}
          style={{
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 38,
            paddingRight: 36,
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            color: "#fff",
            fontFamily: "'Nunito',sans-serif",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 2,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ErrorScreen({ error, onBack, onRetry }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ fontSize: 72, marginBottom: 16 }}>⚠️</div>
      <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 26, color: C.ink, marginBottom: 8 }}>
        Connection Error
      </div>
      <div style={{ fontSize: 14, color: C.muted, marginBottom: 32, fontWeight: 600, textAlign: "center", maxWidth: 300 }}>
        {error}
      </div>
      <button
        onClick={onRetry}
        style={{
          padding: "14px 36px",
          background: "linear-gradient(135deg, #C026D3, #818CF8)",
          border: "none",
          borderRadius: 14,
          color: "#fff",
          fontFamily: "'Fredoka One',cursive",
          fontSize: 16,
          letterSpacing: 0.5,
          cursor: "pointer",
          marginBottom: 12,
          boxShadow: "0 6px 20px rgba(192,38,211,0.35)",
        }}
      >
        Try Again
      </button>
      <button
        onClick={onBack}
        style={{
          padding: "12px 28px",
          background: "none",
          border: `2px solid ${C.border}`,
          borderRadius: 14,
          color: C.muted,
          fontFamily: "'Nunito',sans-serif",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 2,
          cursor: "pointer",
        }}
      >
        BACK
      </button>
    </div>
  );
}
