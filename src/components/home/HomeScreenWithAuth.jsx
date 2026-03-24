import { useState, useEffect } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { PUZZLE_LIST } from "../../puzzles/index";
import { ELEPHANT_PUZZLE } from "../../puzzles/elephant";
import SolutionPreview from "../shared/SolutionPreview";

function getPuzzleProgress(puzzle) {
  try {
    const saved = localStorage.getItem(`pp_grid_${puzzle.id}`);
    if (!saved) return 0;
    const { grid } = JSON.parse(saved);
    if (!grid) return 0;
    let inkTotal = 0, inkFilled = 0;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const hasInk = puzzle.solution[r][c].flat().some(Boolean);
      if (!hasInk) continue;
      for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) {
        if (puzzle.solution[r][c][y][x] === 1) {
          inkTotal++;
          if (grid[r][c][y][x] === 1) inkFilled++;
        }
      }
    }
    return inkTotal > 0 ? inkFilled / inkTotal : 0;
  } catch (e) { return 0; }
}

function PuzzleCard({ puzzle, onClick }) {
  const pct = Math.round(getPuzzleProgress(puzzle) * 100);
  const stars = puzzle.subtitle.includes("Easy") ? "⭐" : puzzle.subtitle.includes("Medium") ? "⭐⭐" : "⭐⭐⭐";
  const done = pct === 100;
  return (
    <div className="puzzle-card" onClick={onClick} style={{ background: C.paper, border: `2px solid ${done ? C.correct : C.border}`, borderRadius: 20, padding: "12px 14px", marginBottom: 10, boxShadow: C.shadowMd, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
      <SolutionPreview puzzle={puzzle} size={60} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: pct > 0 ? 8 : 0 }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, letterSpacing: 0.3 }}>{puzzle.title}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2, fontWeight: 600 }}>{stars} · {puzzle.subtitle.split(" · ")[1]}</div>
          </div>
          {done
            ? <div style={{ background: C.correct, color: "#fff", borderRadius: 12, padding: "5px 12px", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>✓ Done</div>
            : pct > 0
            ? <div style={{ color: C.accent, fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{pct}%</div>
            : <div style={{ background: C.accentLight, color: C.accent, borderRadius: 12, padding: "5px 12px", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>Play</div>
          }
        </div>
        {pct > 0 && (
          <div style={{ height: 6, background: C.surface, borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: done ? C.correct : "linear-gradient(90deg,#C026D3,#818CF8)", borderRadius: 99, transition: "width 0.4s ease" }} />
          </div>
        )}
      </div>
    </div>
  );
}

function HomeTab({ onPlay }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>⭐ Daily Challenge</div>
      <div className="puzzle-card" onClick={() => onPlay(ELEPHANT_PUZZLE)} style={{ background: "linear-gradient(135deg, #C026D3 0%, #818CF8 100%)", borderRadius: 24, padding: "20px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, boxShadow: "0 8px 28px rgba(192,38,211,0.4)" }}>
        <div>
          <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>Today's Puzzle!</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{today}</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 1 }}>🐘 Elephant</div>
        </div>
        <div style={{ background: "#FBBF24", color: "#2D1B69", borderRadius: 16, padding: "10px 18px", fontSize: 14, fontWeight: 900, flexShrink: 0, boxShadow: "0 4px 12px rgba(251,191,36,0.5)", fontFamily: "'Fredoka One',cursive", letterSpacing: 0.5 }}>PLAY!</div>
      </div>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>🐾 All Puzzles</div>
      {PUZZLE_LIST.map(({ puzzle }) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} onClick={() => onPlay(puzzle)} />
      ))}
    </div>
  );
}

function PuzzlesTab({ onPlay }) {
  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 12 }}>🧩 All Puzzles</div>
      {PUZZLE_LIST.map(({ puzzle }) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} onClick={() => onPlay(puzzle)} />
      ))}
    </div>
  );
}

function ProfileTab({ displayName, session, onSignOut }) {
  const [progress, setProgress] = useState([]);
  const [streak, setStreak] = useState({ current_streak: 0, longest_streak: 0 });
  const [loading, setLoading] = useState(true);
  const initials = displayName ? displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "??";

  useEffect(() => {
    (async () => {
      try {
        const [prog, str] = await Promise.all([supa.getProgress(session.userId, session.token), supa.getStreak(session.userId, session.token)]);
        setProgress(Array.isArray(prog) ? prog : []);
        setStreak(str || { current_streak: 0, longest_streak: 0 });
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  const completed = progress.filter(p => p.completed);
  const bestScore = completed.length ? Math.max(...completed.map(p => p.score || 0)) : 0;

  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #C026D3, #818CF8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "'Fredoka One',cursive", boxShadow: "0 4px 20px rgba(192,38,211,0.35)" }}>{initials}</div>
        <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, letterSpacing: 0.5 }}>{displayName}</div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 3, letterSpacing: 1 }}>{session?.email}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[
          { label: "Streak", value: `${streak.current_streak}d` },
          { label: "Best", value: `${streak.longest_streak}d` },
          { label: "Completed", value: completed.length },
          { label: "Top Score", value: bestScore > 0 ? `${Math.round(bestScore / 100) * 100}` : "-" },
        ].map(({ label, value }) => (
          <div key={label} style={{ flex: 1, background: C.paper, border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 6px", textAlign: "center", boxShadow: "0 1px 4px rgba(26,18,9,0.07)" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: C.ink }}>{value}</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.muted, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>Puzzle Progress</div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 32, color: C.muted, fontSize: 11, letterSpacing: 2 }}>Loading...</div>
      ) : (() => {
        const started = PUZZLE_LIST.filter(({ puzzle }) => {
          const p = progress.find(x => x.puzzle_id === puzzle.id);
          if (p) return true;
          try {
            const saved = JSON.parse(localStorage.getItem(`pp_grid_${puzzle.id}`) || "null");
            if (!saved?.grid) return false;
            return saved.grid.flat(3).some(Boolean);
          } catch (e) { return false; }
        });
        if (started.length === 0) return (
          <div style={{ textAlign: "center", padding: "32px 0", color: C.muted, fontSize: 13, fontWeight: 600 }}>
            No puzzles started yet.<br />
            <span style={{ fontSize: 11, opacity: 0.7 }}>Complete a puzzle to see it here!</span>
          </div>
        );
        return started.map(({ puzzle }) => {
          const p = progress.find(x => x.puzzle_id === puzzle.id);
          const done = p?.completed;
          return (
            <div key={puzzle.id} style={{ background: C.paper, border: `2px solid ${done ? C.correct : C.border}`, borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, boxShadow: "0 1px 4px rgba(26,18,9,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? C.correct : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", flexShrink: 0 }}>{done ? "⭐" : ""}</div>
                <div>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 16, color: C.ink, letterSpacing: 0.3 }}>{puzzle.title}</div>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, marginTop: 1 }}>{puzzle.subtitle}</div>
                </div>
              </div>
              {done && <div style={{ fontSize: 11, color: C.gold, fontWeight: "bold", letterSpacing: 1 }}>{(p.score || 0).toLocaleString()}</div>}
            </div>
          );
        });
      })()}
      <button onClick={onSignOut} style={{ width: "100%", marginTop: 16, padding: "14px", background: "none", border: `2px solid ${C.border}`, borderRadius: 16, color: C.muted, fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase" }}>
        Sign Out
      </button>
    </div>
  );
}

export default function HomeScreenWithAuth({ displayName, session, onPlay, onSignOut }) {
  const [tab, setTab] = useState("home");

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 16, paddingBottom: 80 }}>
        {tab === "home" && <HomeTab onPlay={onPlay} />}
        {tab === "puzzles" && <PuzzlesTab onPlay={onPlay} />}
        {tab === "profile" && <ProfileTab displayName={displayName} session={session} onSignOut={onSignOut} />}
      </div>
      {/* Nav bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.paper, borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "stretch", height: 64, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100 }}>
        {[
          { id: "home", label: "Home", icon: "home" },
          { id: "puzzles", label: "Puzzles", icon: "puzzles" },
          { id: "profile", label: "Profile", icon: "profile" },
        ].map(({ id, label, icon }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, background: "none", border: "none", cursor: "pointer", position: "relative", color: active ? "#FF6B6B" : C.muted, transition: "color 0.15s" }}>
              {icon === "home" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
              {icon === "puzzles" && <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11h-1.8c.2-.4.3-.9.3-1.5C19 7.6 17.6 6 15.8 6c-.6 0-1.1.4-1.3 1-.1.4-.4.6-.5.6s-.4-.2-.5-.6C13.3 6.4 12.8 6 12.2 6 10.4 6 9 7.6 9 9.5c0 .6.1 1.1.3 1.5H7.5C6.1 11 5 12.1 5 13.5v1.3c.4-.2.9-.3 1.5-.3 1.9 0 3.5 1.4 3.5 3.3 0 .6-.4 1.1-1 1.2-.4.1-.5.4-.5.5s.2.3.5.5c.6.1 1 .6 1 1.2V22h8c1.4 0 2.5-1.1 2.5-2.5v-1.8c.4.2.9.3 1.5.3 1.9 0 3.5-1.4 3.5-3.3 0-.6-.4-1.1-1-1.2-.4-.1-.5-.4-.5-.5s.2-.3.5-.5c.6-.1 1-.6 1-1.2V13.5C23 12.1 21.9 11 20.5 11z" /></svg>}
              {icon === "profile" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>}
              <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Courier Prime',monospace", fontWeight: active ? "bold" : "normal" }}>{label}</span>
              {active && <div style={{ position: "absolute", bottom: 0, width: 32, height: 2, background: "#FF6B6B", borderRadius: "2px 2px 0 0" }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
