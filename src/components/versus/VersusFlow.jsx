import { useState, useEffect, useRef, useCallback } from "react";
import { C } from "../../constants";
import { findMatch } from "../../lib/versus";
import TerritoryGame from "./TerritoryGame";
import VersusResult from "./VersusResult";

// Top-level orchestrator for the Versus experience.
// Stages: searching → playing → result. Resets on Play Again.
export default function VersusFlow({ session, displayName, onBack }) {
  const [stage, setStage] = useState("searching"); // searching | playing | result | error
  const [match, setMatch] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState(0); // bump to re-search after Play Again
  const searchRef = useRef(null);

  useEffect(() => {
    const search = findMatch({
      userId: session.userId,
      displayName: displayName || "Player",
    });
    searchRef.current = search;

    search.promise
      .then((m) => {
        setMatch(m);
        setStage("playing");
      })
      .catch((err) => {
        if (err?.message === "cancelled") return;
        setError(err?.message || "Matchmaking failed");
        setStage("error");
      });

    return () => {
      try { searchRef.current?.cancel(); } catch { /* ignore */ }
    };
  }, [searchKey, session.userId, displayName]);

  const handleGameEnd = useCallback((r) => {
    setResult(r);
    setStage("result");
  }, []);

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
    return (
      <TerritoryGame
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
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1E1245 0%, #2D1B69 50%, #4C1D95 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 72, marginBottom: 20, animation: "bannerPop 2.2s cubic-bezier(0.16,1,0.3,1) infinite" }}>⚔️</div>
      <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 34, marginBottom: 8, letterSpacing: 0.5 }}>
        Finding Opponent
      </div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 36, fontWeight: 600, letterSpacing: 0.5 }}>
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
          padding: "14px 36px",
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
