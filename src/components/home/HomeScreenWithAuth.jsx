import { useState, useEffect } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { PUZZLE_LIST } from "../../puzzles/index";
import SolutionPreview from "../shared/SolutionPreview";
import StoreModal from "../shared/StoreModal";
import { isUnlocked, spendCreditToUnlock, getCredits, addCredits, isAlwaysFree, getDailyPuzzle } from "../../lib/credits";

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

const puzzleMeta = (() => {
  const counters = {};
  return PUZZLE_LIST.map(({ puzzle, free, category, featured }) => {
    counters[category] = (counters[category] || 0) + 1;
    return { puzzle, free, category, categoryIndex: counters[category], featured: !!featured };
  });
})();

const featuredMeta = puzzleMeta.filter(p => p.featured);

function PuzzleCard({ puzzle, category, categoryIndex, onClick }) {
  const pct = Math.round(getPuzzleProgress(puzzle) * 100);
  const stars = puzzle.subtitle.includes("Easy") ? "⭐" : puzzle.subtitle.includes("Medium") ? "⭐⭐" : "⭐⭐⭐";
  const done = pct === 100;
  const unlocked = isUnlocked(puzzle.id);

  return (
    <div className="puzzle-card" onClick={onClick} style={{ background: C.paper, border: `2px solid ${done ? C.correct : C.border}`, borderRadius: 20, padding: "12px 14px", marginBottom: 10, boxShadow: C.shadowMd, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
      <SolutionPreview puzzle={puzzle} size={60} hidden={!done} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: pct > 0 ? 8 : 0 }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, letterSpacing: 0.3 }}>{puzzle.title}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2, fontWeight: 600 }}>{stars} · {puzzle.subtitle.split(" · ")[1]}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1, fontWeight: 600 }}>{category} #{categoryIndex}</div>
          </div>
          {done
            ? <div style={{ background: C.correct, color: "#fff", borderRadius: 12, padding: "5px 12px", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>✓ Done</div>
            : !unlocked
            ? <div style={{ background: "#EDE9F6", color: "#6D28D9", borderRadius: 12, padding: "5px 12px", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>🔒 1 credit</div>
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
  const dailyPuzzle = getDailyPuzzle();
  const dailyDone = Math.round(getPuzzleProgress(dailyPuzzle) * 100) === 100;
  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>⭐ Daily Challenge</div>
      <div className="puzzle-card" onClick={() => onPlay(dailyPuzzle)} style={{ background: dailyDone ? "linear-gradient(135deg, #16A34A 0%, #4ADE80 100%)" : "linear-gradient(135deg, #C026D3 0%, #818CF8 100%)", borderRadius: 24, padding: "20px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, boxShadow: dailyDone ? "0 8px 28px rgba(22,163,74,0.4)" : "0 8px 28px rgba(192,38,211,0.4)" }}>
        <div>
          <div style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 24, letterSpacing: 0.5 }}>{dailyDone ? "✓ Completed!" : "Today's Puzzle!"}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{today}</div>
        </div>
        <div style={{ background: dailyDone ? "#fff" : "#FBBF24", color: dailyDone ? "#16A34A" : "#2D1B69", borderRadius: 16, padding: "10px 18px", fontSize: 14, fontWeight: 900, flexShrink: 0, boxShadow: dailyDone ? "0 4px 12px rgba(255,255,255,0.4)" : "0 4px 12px rgba(251,191,36,0.5)", fontFamily: "'Fredoka One',cursive", letterSpacing: 0.5 }}>{dailyDone ? "VIEW" : "PLAY!"}</div>
      </div>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 10 }}>✨ Featured Puzzles</div>
      {featuredMeta.map(({ puzzle, category, categoryIndex }) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} category={category} categoryIndex={categoryIndex} onClick={() => onPlay(puzzle)} />
      ))}
    </div>
  );
}

const CATEGORY_GRADIENTS = [
  "linear-gradient(135deg, #C026D3 0%, #818CF8 100%)",
  "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)",
  "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #22C55E 0%, #06B6D4 100%)",
  "linear-gradient(135deg, #F43F5E 0%, #F97316 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
  "linear-gradient(135deg, #14B8A6 0%, #84CC16 100%)",
  "linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #0EA5E9 0%, #22C55E 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
];

const categoryGroups = (() => {
  const map = {};
  puzzleMeta.forEach(meta => {
    if (!map[meta.category]) map[meta.category] = [];
    map[meta.category].push(meta);
  });
  return Object.entries(map).map(([name, puzzles], i) => ({
    name,
    puzzles,
    gradient: CATEGORY_GRADIENTS[i % CATEGORY_GRADIENTS.length],
  }));
})();

function CategoryCard({ name, puzzles, gradient, onClick }) {
  const total = puzzles.length;
  const completed = puzzles.filter(({ puzzle }) => Math.round(getPuzzleProgress(puzzle) * 100) === 100).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const previews = puzzles.slice(0, 4);

  return (
    <div onClick={onClick} style={{ background: C.paper, border: `2px solid ${C.border}`, borderRadius: 20, padding: "14px 16px", marginBottom: 12, boxShadow: C.shadowMd, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: gradient, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {previews.map(({ puzzle }, i) => (
            <SolutionPreview key={i} puzzle={puzzle} size={20} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 19, color: C.ink, letterSpacing: 0.3 }}>{name}</div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{total} puzzle{total !== 1 ? "s" : ""}</div>
          <div style={{ fontSize: 12, color: completed === total ? C.correct : C.muted, fontWeight: 700 }}>{completed}/{total} done</div>
        </div>
        <div style={{ height: 5, background: C.surface, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? C.correct : gradient, borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>
      </div>
    </div>
  );
}

function CategoryDetailScreen({ group, onBack, onPlay }) {
  return (
    <div style={{ padding: "0 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingTop: 20 }}>
        <button onClick={onBack} style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, letterSpacing: 0.3, lineHeight: 1 }}>{group.name}</div>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginTop: 2 }}>{group.puzzles.length} puzzles</div>
        </div>
      </div>
      {group.puzzles.map(({ puzzle, category, categoryIndex }) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} category={category} categoryIndex={categoryIndex} onClick={() => onPlay(puzzle)} />
      ))}
    </div>
  );
}

function PuzzlesTab({ onPlay }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return <CategoryDetailScreen group={selectedCategory} onBack={() => setSelectedCategory(null)} onPlay={onPlay} />;
  }

  return (
    <div style={{ padding: "20px 20px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
      <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", fontWeight: 800, marginBottom: 12 }}>🧩 Categories</div>
      {categoryGroups.map(group => (
        <CategoryCard key={group.name} {...group} onClick={() => setSelectedCategory(group)} />
      ))}
    </div>
  );
}

function ProfileTab({ displayName, session, onSignOut, onOpenStore }) {
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
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, fontWeight: 700, color: C.ink }}>{value}</div>
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
      {(() => {
        const credits = getCredits();
        return (
          <div onClick={onOpenStore} style={{ background: "linear-gradient(135deg,#EDE9F6,#F5F3FF)", border: "2px solid #C4B5FD", borderRadius: 16, padding: "14px 18px", marginTop: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 16, color: "#6D28D9" }}>
                {credits === Infinity ? "✨ Unlimited Credits" : `🔓 ${credits} Credit${credits !== 1 ? "s" : ""} Remaining`}
              </div>
              <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 600, marginTop: 2 }}>Tap to get more puzzles</div>
            </div>
            <div style={{ background: "#7C3AED", color: "#fff", borderRadius: 12, padding: "7px 14px", fontSize: 13, fontWeight: 900, fontFamily: "'Fredoka One',cursive" }}>Shop</div>
          </div>
        );
      })()}
      {import.meta.env.DEV && (
        <button onClick={() => { addCredits(10); alert("10 credits added!"); }} style={{ width: "100%", marginTop: 12, padding: "10px", background: "#FEF3C7", border: "2px dashed #F59E0B", borderRadius: 16, color: "#92400E", fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>
          🛠 DEV: Add 10 Credits
        </button>
      )}
      <button onClick={onSignOut} style={{ width: "100%", marginTop: 12, padding: "14px", background: "none", border: `2px solid ${C.border}`, borderRadius: 16, color: C.muted, fontFamily: "'Nunito',sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase" }}>
        Sign Out
      </button>
    </div>
  );
}

function CreditPill({ onShopTap }) {
  const credits = getCredits();
  return (
    <div onClick={onShopTap} style={{ position: "fixed", top: "calc(env(safe-area-inset-top) + 12px)", right: 16, zIndex: 200, background: credits === Infinity ? "linear-gradient(135deg,#7C3AED,#C026D3)" : credits > 0 ? "linear-gradient(135deg,#6D28D9,#818CF8)" : "#EF4444", borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.18)", cursor: "pointer" }}>
      <span style={{ fontSize: 14 }}>🔓</span>
      <span style={{ color: "#fff", fontFamily: "'Fredoka One',cursive", fontSize: 15, letterSpacing: 0.3 }}>
        {credits === Infinity ? "Unlimited" : `${credits} credit${credits !== 1 ? "s" : ""}`}
      </span>
    </div>
  );
}

function ConfirmUnlockModal({ puzzle, onConfirm, onCancel, onShop }) {
  const credits = getCredits();
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onCancel} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} />
      <div style={{ position: "relative", background: C.paper, borderRadius: "24px 24px 0 0", padding: "28px 24px calc(28px + env(safe-area-inset-bottom))", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 22, color: C.ink, marginBottom: 4 }}>Unlock Puzzle</div>
          <div style={{ fontSize: 15, color: C.muted, fontWeight: 600 }}>
            Spend <span style={{ color: "#6D28D9", fontWeight: 900 }}>1 credit</span> to unlock <span style={{ color: C.ink, fontWeight: 900 }}>{puzzle.title}</span>?
          </div>
          <div style={{ marginTop: 10, background: "#F5F3FF", borderRadius: 12, padding: "8px 16px", display: "inline-block" }}>
            <span style={{ fontSize: 13, color: "#6D28D9", fontWeight: 700 }}>
              {credits === Infinity ? "✨ Unlimited credits" : `You have ${credits} credit${credits !== 1 ? "s" : ""} remaining`}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "14px 0", background: "none", border: `2px solid ${C.border}`, borderRadius: 14, fontFamily: "'Nunito',sans-serif", fontSize: 15, fontWeight: 800, color: C.muted, cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 2, padding: "14px 0", background: "linear-gradient(135deg,#6D28D9,#818CF8)", border: "none", borderRadius: 14, fontFamily: "'Fredoka One',cursive", fontSize: 17, color: "#fff", cursor: "pointer", boxShadow: "0 4px 16px rgba(109,40,217,0.4)" }}>Unlock — 1 Credit</button>
        </div>
        <button onClick={onShop} style={{ width: "100%", marginTop: 10, padding: "10px 0", background: "none", border: "none", color: C.muted, fontFamily: "'Nunito',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Get more credits →</button>
      </div>
    </div>
  );
}

export default function HomeScreenWithAuth({ displayName, session, onPlay, onSignOut, showWelcome, onDismissWelcome }) {
  const [tab, setTab] = useState("home");
  const [storeOpen, setStoreOpen] = useState(false);
  const [pendingPuzzle, setPendingPuzzle] = useState(null);
  const [confirmPuzzle, setConfirmPuzzle] = useState(null);

  function handlePlay(puzzle) {
    if (isAlwaysFree(puzzle.id) || isUnlocked(puzzle.id)) {
      onPlay(puzzle);
      return;
    }
    const credits = getCredits();
    if (credits > 0) {
      setConfirmPuzzle(puzzle);
    } else {
      setPendingPuzzle(puzzle);
      setStoreOpen(true);
    }
  }

  function handleConfirmUnlock() {
    if (!confirmPuzzle) return;
    const success = spendCreditToUnlock(confirmPuzzle.id);
    if (success) {
      const p = confirmPuzzle;
      setConfirmPuzzle(null);
      onPlay(p);
    } else {
      setConfirmPuzzle(null);
      setPendingPuzzle(confirmPuzzle);
      setStoreOpen(true);
    }
  }

  function handlePurchased() {
    if (pendingPuzzle) {
      const success = spendCreditToUnlock(pendingPuzzle.id);
      if (success) {
        onPlay(pendingPuzzle);
      }
    }
    setPendingPuzzle(null);
    setStoreOpen(false);
  }

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: C.bg, height: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      {tab !== "profile" && <CreditPill onShopTap={() => setStoreOpen(true)} />}
      {confirmPuzzle && (
        <ConfirmUnlockModal
          puzzle={confirmPuzzle}
          onConfirm={handleConfirmUnlock}
          onCancel={() => setConfirmPuzzle(null)}
          onShop={() => { setConfirmPuzzle(null); setPendingPuzzle(confirmPuzzle); setStoreOpen(true); }}
        />
      )}
      {storeOpen && (
        <StoreModal
          onClose={() => { setStoreOpen(false); setPendingPuzzle(null); }}
          onPurchased={handlePurchased}
        />
      )}
      {showWelcome && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div style={{ background: C.paper, borderRadius: 24, padding: "36px 28px", maxWidth: 340, width: "88%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 26, color: C.ink, marginBottom: 8, letterSpacing: 0.3 }}>Welcome!</div>
            <div style={{ fontSize: 16, color: C.inkMid, fontWeight: 600, lineHeight: 1.6, marginBottom: 8 }}>
              We've given you <span style={{ color: "#6D28D9", fontWeight: 900 }}>5 free credits</span> to get started.
            </div>
            <div style={{ fontSize: 14, color: C.muted, fontWeight: 600, lineHeight: 1.6, marginBottom: 24 }}>
              Each credit unlocks one puzzle. Try the <span style={{ fontWeight: 800, color: C.ink }}>Daily Challenge</span> for free, or pick any puzzle to play!
            </div>
            <button onClick={onDismissWelcome} style={{ width: "100%", padding: "16px 0", background: "linear-gradient(135deg, #C026D3, #818CF8)", color: "#fff", border: "none", borderRadius: 14, fontFamily: "'Fredoka One',cursive", fontSize: 18, letterSpacing: 0.5, cursor: "pointer", boxShadow: "0 6px 24px rgba(168,85,247,0.35)" }}>Let's Play!</button>
          </div>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 16, paddingBottom: 96 }}>
        {tab === "home" && <HomeTab onPlay={handlePlay} />}
        {tab === "puzzles" && <PuzzlesTab onPlay={handlePlay} />}
        {tab === "profile" && <ProfileTab displayName={displayName} session={session} onSignOut={onSignOut} onOpenStore={() => setStoreOpen(true)} />}
      </div>
      {/* Nav bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.paper, borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "stretch", height: "calc(80px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100 }}>
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
              <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Nunito',sans-serif", fontWeight: active ? "bold" : "normal" }}>{label}</span>
              {active && <div style={{ position: "absolute", bottom: 0, width: 32, height: 2, background: "#FF6B6B", borderRadius: "2px 2px 0 0" }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
