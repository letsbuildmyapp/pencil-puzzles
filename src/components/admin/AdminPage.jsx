import { useState, useEffect } from "react";
import { C } from "../../constants";
import { supa } from "../../lib/supabase";
import { PUZZLE_LIST } from "../../puzzles/index";
import SolutionPreview from "../shared/SolutionPreview";

const TABS = [
  { key: "users", label: "Users" },
  { key: "puzzles", label: "Puzzles" },
  { key: "analytics", label: "Analytics" },
];

const MODE_LABELS = {
  territory: "Territory Battle",
  survival: "Survival",
  "chess-clock": "Chess Clock",
  "row-rumble": "Row Rumble",
  mirror: "Mirror Match",
  sabotage: "Sabotage",
};

const RESPONSIVE_CSS = `
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @media (max-width: 768px) {
    .admin-hamburger { display: block !important; }
    .admin-sidebar { transform: translateX(-100%); }
    .admin-main { margin-left: 0 !important; padding: 16px !important; }
    .adm-desk { display: none !important; }
    .adm-mob { display: block !important; }
  }
  @media (min-width: 769px) {
    .adm-desk { display: flex !important; }
    .adm-mob { display: none !important; }
  }
`;

function SkeletonRows({ count = 5 }) {
  return Array.from({ length: count }, (_, i) => (
    <div key={i} style={{ padding: "16px 20px", borderBottom: i < count - 1 ? "1px solid #E6E6E6" : "none", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0F0F0", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ flex: 1 }}>
        <div style={{ width: "40%", height: 14, borderRadius: 6, background: "#F0F0F0", marginBottom: 6, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ width: "60%", height: 12, borderRadius: 6, background: "#F0F0F0", animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  ));
}

function Badge({ text, color, bg }) {
  return <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, color, background: bg, whiteSpace: "nowrap" }}>{text}</span>;
}

function Label({ text }) {
  return <span style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.5 }}>{text}</span>;
}

function Initials({ name, email, size = 36, fontSize = 13 }) {
  const initials = (name || email || "?").split(/[\s@]/).filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join("");
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ color: "#fff", fontSize, fontWeight: 700 }}>{initials}</span>
    </div>
  );
}

function BackLink({ onClick, text }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 20, padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
      &larr; {text}
    </button>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E6E6E6", overflow: "hidden", ...style }}>{children}</div>;
}

function CardRow({ children, last, onClick, style }) {
  return (
    <div onClick={onClick} style={{ padding: "14px 16px", borderBottom: last ? "none" : "1px solid #E6E6E6", cursor: onClick ? "pointer" : undefined, ...style }}>
      {children}
    </div>
  );
}

function fmtDate(d) { return new Date(d).toLocaleDateString(); }
function fmtDateTime(d) { return `${fmtDate(d)} ${new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`; }

// ==================== User Detail =======================
function UserDetail({ token, userId, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supa.adminGetUserDetail(token, userId).then(setData).finally(() => setLoading(false));
  }, [token, userId]);

  if (loading) return <SkeletonRows count={6} />;
  if (!data?.user) return <div style={{ padding: 24, color: C.muted }}>User not found</div>;

  const { user, unlocks, completions, pvp_matches: pvp, streak } = data;
  const puzzleTitles = {};
  PUZZLE_LIST.forEach(({ puzzle }) => { puzzleTitles[puzzle.id] = puzzle.title; });

  return (
    <div>
      <BackLink onClick={onBack} text="Back to Users" />

      <Card style={{ padding: 20, marginBottom: 24, display: "flex", gap: 16, alignItems: "center" }}>
        <Initials name={user.display_name} email={user.email} size={56} fontSize={20} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, color: C.ink, margin: 0 }}>{user.display_name || "No name"}</h1>
          <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Joined {fmtDate(user.created_at)}</div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: 24 }}>
        <MiniStat label="Unlocked" value={unlocks.length} />
        <MiniStat label="Completed" value={completions.length} />
        <MiniStat label="PvP" value={pvp.length} />
        <MiniStat label="PvP Wins" value={pvp.filter(m => m.won).length} color={C.correct} />
        {streak && <MiniStat label="Streak" value={streak.current_streak || 0} />}
        {streak && <MiniStat label="Best" value={streak.longest_streak || 0} color={C.accent} />}
      </div>

      {/* Puzzles Unlocked */}
      <h2 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, marginBottom: 8 }}>Puzzles Unlocked ({unlocks.length})</h2>
      <Card style={{ marginBottom: 24 }}>
        {unlocks.length === 0 ? (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 14, color: C.muted }}>No puzzles unlocked</div>
        ) : unlocks.map((u, idx) => {
          const completed = completions.some(c => c.puzzle_id === u.puzzle_id);
          return (
            <CardRow key={idx} last={idx === unlocks.length - 1}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{puzzleTitles[u.puzzle_id] || u.puzzle_id}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{fmtDateTime(u.unlocked_at)}</div>
                </div>
                <Badge text={completed ? "Done" : "In Progress"} color={completed ? C.correctText : C.muted} bg={completed ? C.correctLight : "#F0F0F0"} />
              </div>
            </CardRow>
          );
        })}
      </Card>

      {/* PvP Matches */}
      <h2 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, marginBottom: 8 }}>PvP Matches ({pvp.length})</h2>
      <Card>
        {pvp.length === 0 ? (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 14, color: C.muted }}>No PvP matches</div>
        ) : pvp.map((m, idx) => (
          <CardRow key={idx} last={idx === pvp.length - 1}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{MODE_LABELS[m.mode] || m.mode}</div>
                <div style={{ fontSize: 12, color: C.muted }}>
                  vs {m.opponent_name || (m.opponent_type === "bot" ? "Bot" : "Human")}
                  {m.my_score != null ? ` · ${m.my_score}–${m.opponent_score}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Badge text={m.won ? "Won" : "Lost"} color={m.won ? C.correctText : C.wrongText} bg={m.won ? C.correctLight : C.wrongLight} />
                <span style={{ fontSize: 12, color: C.muted }}>{fmtDate(m.played_at)}</span>
              </div>
            </div>
          </CardRow>
        ))}
      </Card>
    </div>
  );
}

function AdminToggle({ checked, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: loading ? "default" : "pointer",
        background: checked ? C.accent : "#DDD", position: "relative", transition: "background 0.2s",
        opacity: loading ? 0.5 : 1, flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

// ======================= Users Tab =======================
function UsersTab({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [togglingAdmin, setTogglingAdmin] = useState(null);

  useEffect(() => { supa.adminGetUsers(token).then(setUsers).finally(() => setLoading(false)); }, [token]);

  const handleToggleAdmin = async (e, user) => {
    e.stopPropagation();
    setTogglingAdmin(user.id);
    const newVal = !user.is_admin;
    await supa.adminSetAdmin(token, user.id, newVal);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_admin: newVal } : u));
    setTogglingAdmin(null);
  };

  if (selectedUser) return <UserDetail token={token} userId={selectedUser} onBack={() => setSelectedUser(null)} />;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: C.ink, marginBottom: 4 }}>Users</h1>
        <p style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>All registered users ({users.length})</p>
      </div>
      <Card>
        {/* Desktop header */}
        <div className="adm-desk" style={{ alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #E6E6E6", background: "#FAFAFA" }}>
          <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>User</div>
          <div style={{ width: 200, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Email</div>
          <div style={{ width: 70, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>Admin</div>
          <div style={{ width: 100, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Joined</div>
        </div>

        {loading ? <SkeletonRows count={6} /> : users.map((user, idx) => (
          <CardRow key={user.id} last={idx === users.length - 1} onClick={() => setSelectedUser(user.id)}>
            {/* Desktop */}
            <div className="adm-desk" style={{ alignItems: "center" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <Initials name={user.display_name} email={user.email} />
                <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.display_name || "No name"}
                </span>
              </div>
              <div style={{ width: 200, fontSize: 13, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
              <div style={{ width: 70, display: "flex", justifyContent: "center" }}>
                <AdminToggle checked={user.is_admin} loading={togglingAdmin === user.id} onClick={(e) => handleToggleAdmin(e, user)} />
              </div>
              <div style={{ width: 100, fontSize: 13, color: C.muted, textAlign: "right" }}>{fmtDate(user.created_at)}</div>
            </div>
            {/* Mobile */}
            <div className="adm-mob" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Initials name={user.display_name} email={user.email} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.display_name || "No name"}</span>
                  {user.is_admin && <Badge text="Admin" color={C.accent} bg={C.accentLight} />}
                </div>
                <div style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
              </div>
              <AdminToggle checked={user.is_admin} loading={togglingAdmin === user.id} onClick={(e) => handleToggleAdmin(e, user)} />
            </div>
          </CardRow>
        ))}
        {!loading && users.length === 0 && (
          <div style={{ padding: "32px 20px", textAlign: "center", fontSize: 14, color: C.muted }}>No users found</div>
        )}
      </Card>
    </div>
  );
}

const DIFF_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

// =================== Puzzle Detail ====================
function PuzzleDetail({ token, puzzleId, onBack }) {
  const [unlockers, setUnlockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const entry = PUZZLE_LIST.find(p => p.puzzle.id === puzzleId);
  const puzzle = entry?.puzzle;

  useEffect(() => { supa.adminGetPuzzleUnlockers(token, puzzleId).then(setUnlockers).finally(() => setLoading(false)); }, [token, puzzleId]);

  if (!puzzle) return <div style={{ padding: 24, color: C.muted }}>Puzzle not found</div>;

  return (
    <div>
      <BackLink onClick={onBack} text="Back to Puzzles" />

      <Card style={{ padding: 20, marginBottom: 24, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <SolutionPreview puzzle={puzzle} size={100} hidden={false} />
        <div style={{ flex: 1, minWidth: 160 }}>
          <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, color: C.ink, marginBottom: 4 }}>{puzzle.title}</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <Badge text={entry.category} color={C.accent} bg={C.accentLight} />
            <Badge text={puzzle.subtitle} color={C.muted} bg="#F0F0F0" />
          </div>
          {puzzle.riddle && <p style={{ fontSize: 13, color: C.muted, fontStyle: "italic", lineHeight: 1.5, whiteSpace: "pre-line", margin: 0 }}>{puzzle.riddle}</p>}
        </div>
      </Card>

      <h2 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, marginBottom: 8 }}>Users Who Unlocked ({unlockers.length})</h2>
      <Card>
        {loading ? <SkeletonRows count={4} /> : unlockers.length === 0 ? (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 14, color: C.muted }}>No one has unlocked this puzzle yet</div>
        ) : unlockers.map((u, idx) => (
          <CardRow key={`${u.user_id}-${idx}`} last={idx === unlockers.length - 1}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Initials name={u.display_name} email={u.email} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.display_name || "No name"}</div>
                <div style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
              </div>
              <div style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{fmtDateTime(u.unlocked_at)}</div>
            </div>
          </CardRow>
        ))}
      </Card>
    </div>
  );
}

// ====================== Puzzles Tab ======================
function PuzzlesTab({ token }) {
  const [unlockStats, setUnlockStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("title");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);

  useEffect(() => { supa.adminGetUnlockStats(token).then(setUnlockStats).finally(() => setLoading(false)); }, [token]);

  const unlockMap = {};
  unlockStats.forEach(r => { unlockMap[r.puzzle_id] = Number(r.unlock_count); });
  const totalUnlocks = unlockStats.reduce((s, r) => s + Number(r.unlock_count), 0);

  const rows = PUZZLE_LIST.map(({ puzzle, category }) => ({
    id: puzzle.id, title: puzzle.title, category,
    difficulty: puzzle.subtitle.split(" · ")[1] || "",
    unlocks: unlockMap[puzzle.id] || 0,
  }));

  const sorted = [...rows].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "title") cmp = a.title.localeCompare(b.title);
    else if (sortKey === "category") cmp = a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
    else if (sortKey === "difficulty") cmp = (DIFF_ORDER[a.difficulty] ?? 9) - (DIFF_ORDER[b.difficulty] ?? 9) || a.title.localeCompare(b.title);
    else if (sortKey === "unlocks") cmp = a.unlocks - b.unlocks || a.title.localeCompare(b.title);
    return sortAsc ? cmp : -cmp;
  });

  const handleSort = (key) => { if (sortKey === key) setSortAsc(!sortAsc); else { setSortKey(key); setSortAsc(key === "title" || key === "category"); } };
  const arrow = (key) => sortKey === key ? (sortAsc ? " \u25B2" : " \u25BC") : "";

  if (selectedPuzzle) return <PuzzleDetail token={token} puzzleId={selectedPuzzle} onBack={() => setSelectedPuzzle(null)} />;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: C.ink, marginBottom: 4 }}>Puzzles</h1>
        <p style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>{PUZZLE_LIST.length} puzzles &middot; {totalUnlocks} total unlocks</p>
      </div>
      <Card>
        {/* Desktop header */}
        <div className="adm-desk" style={{ alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #E6E6E6", background: "#FAFAFA" }}>
          <div onClick={() => handleSort("title")} style={{ flex: 1, fontSize: 11, fontWeight: 700, color: sortKey === "title" ? C.accent : "#999", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", userSelect: "none" }}>Puzzle{arrow("title")}</div>
          <div onClick={() => handleSort("category")} style={{ width: 140, fontSize: 11, fontWeight: 700, color: sortKey === "category" ? C.accent : "#999", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", userSelect: "none" }}>Category{arrow("category")}</div>
          <div onClick={() => handleSort("difficulty")} style={{ width: 90, fontSize: 11, fontWeight: 700, color: sortKey === "difficulty" ? C.accent : "#999", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", userSelect: "none" }}>Difficulty{arrow("difficulty")}</div>
          <div onClick={() => handleSort("unlocks")} style={{ width: 80, fontSize: 11, fontWeight: 700, color: sortKey === "unlocks" ? C.accent : "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "right", cursor: "pointer", userSelect: "none" }}>Unlocks{arrow("unlocks")}</div>
        </div>

        {loading ? <SkeletonRows count={8} /> : sorted.map((row, idx) => (
          <CardRow key={row.id} last={idx === sorted.length - 1} onClick={() => setSelectedPuzzle(row.id)}>
            {/* Desktop */}
            <div className="adm-desk" style={{ alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{row.title}</span>
                <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>{row.id}</span>
              </div>
              <div style={{ width: 140 }}><Badge text={row.category} color={C.accent} bg={C.accentLight} /></div>
              <div style={{ width: 90, fontSize: 13, color: C.muted }}>{row.difficulty}</div>
              <div style={{ width: 80, fontSize: 14, fontWeight: 700, color: row.unlocks > 0 ? C.ink : C.muted, textAlign: "right" }}>{row.unlocks}</div>
            </div>
            {/* Mobile */}
            <div className="adm-mob">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{row.title}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                    <Badge text={row.category} color={C.accent} bg={C.accentLight} />
                    <Badge text={row.difficulty} color={C.muted} bg="#F0F0F0" />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: row.unlocks > 0 ? C.ink : C.muted }}>{row.unlocks}</div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>UNLOCKS</div>
                </div>
              </div>
            </div>
          </CardRow>
        ))}
      </Card>
    </div>
  );
}

// =================== Battle Detail ====================
function BattleDetail({ token, mode, onBack }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { supa.adminGetPvpModeMatches(token, mode).then(setMatches).finally(() => setLoading(false)); }, [token, mode]);

  const label = MODE_LABELS[mode] || mode;
  const botMatches = matches.filter(m => m.opponent_type === "bot").length;

  return (
    <div>
      <BackLink onClick={onBack} text="Back to Analytics" />

      <Card style={{ padding: 20, marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 24, color: C.ink, marginBottom: 12 }}>{label}</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <MiniStat label="Total" value={matches.length} />
          <MiniStat label="vs Bot" value={botMatches} />
          <MiniStat label="vs Human" value={matches.length - botMatches} />
        </div>
      </Card>

      <h2 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, marginBottom: 8 }}>Match History ({matches.length})</h2>
      <Card>
        {/* Desktop header */}
        <div className="adm-desk" style={{ alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #E6E6E6", background: "#FAFAFA" }}>
          <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Player 1</div>
          <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>Player 2</div>
          <div style={{ width: 80, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>P1 Score</div>
          <div style={{ width: 80, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>P2 Score</div>
          <div style={{ width: 140, fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Date</div>
        </div>

        {loading ? <SkeletonRows count={5} /> : matches.length === 0 ? (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 14, color: C.muted }}>No matches yet</div>
        ) : matches.map((m, idx) => {
          const p1 = m.display_name || m.email?.split("@")[0] || "Unknown";
          const p2 = m.opponent_name || (m.opponent_type === "bot" ? "Bot" : "Unknown");
          return (
            <CardRow key={idx} last={idx === matches.length - 1}>
              {/* Desktop */}
              <div className="adm-desk" style={{ alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: m.won ? C.correctText : C.ink }}>{p1}</span>
                  {m.won && <span style={{ fontSize: 11, fontWeight: 700, color: C.correct, marginLeft: 6 }}>W</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: !m.won ? C.correctText : C.ink }}>{p2}</span>
                  {!m.won && <span style={{ fontSize: 11, fontWeight: 700, color: C.correct, marginLeft: 6 }}>W</span>}
                </div>
                <div style={{ width: 80, textAlign: "center", fontSize: 14, fontWeight: 700, color: m.won ? C.correct : C.muted }}>{m.my_score ?? "—"}</div>
                <div style={{ width: 80, textAlign: "center", fontSize: 14, fontWeight: 700, color: !m.won ? C.correct : C.muted }}>{m.opponent_score ?? "—"}</div>
                <div style={{ width: 140, fontSize: 13, color: C.muted, textAlign: "right" }}>{fmtDateTime(m.played_at)}</div>
              </div>
              {/* Mobile */}
              <div className="adm-mob">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: m.won ? C.correctText : C.ink }}>{p1} {m.my_score != null ? `(${m.my_score})` : ""}</span>
                  <Badge text={m.won ? "Won" : "Lost"} color={m.won ? C.correctText : C.wrongText} bg={m.won ? C.correctLight : C.wrongLight} />
                </div>
                <div style={{ fontSize: 13, color: C.muted }}>vs {p2} {m.opponent_score != null ? `(${m.opponent_score})` : ""}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{fmtDateTime(m.played_at)}</div>
              </div>
            </CardRow>
          );
        })}
      </Card>
    </div>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div style={{ background: "#FAFAFA", borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", minWidth: 70 }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: color || C.ink, fontFamily: "'Fredoka One',cursive" }}>{value}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color: C.muted }}>{label}</span>
    </div>
  );
}

// ==================== Analytics Tab ====================
function AnalyticsTab({ token }) {
  const [summary, setSummary] = useState(null);
  const [pvpStats, setPvpStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    Promise.all([supa.adminGetSummary(token), supa.adminGetPvpStats(token)])
      .then(([s, p]) => { setSummary(s); setPvpStats(p); })
      .finally(() => setLoading(false));
  }, [token]);

  const totalPvp = pvpStats.reduce((s, r) => s + Number(r.times_played), 0);

  if (selectedMode) return <BattleDetail token={token} mode={selectedMode} onBack={() => setSelectedMode(null)} />;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: C.ink, marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>Overview of app activity</p>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, marginBottom: 32 }}>
          {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E6E6E6", padding: 20, height: 80, animation: "pulse 1.5s ease-in-out infinite" }} />)}
        </div>
      ) : summary && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, marginBottom: 32 }}>
          <StatCard label="Total Users" value={summary.total_users} />
          <StatCard label="Total Unlocks" value={summary.total_unlocks} />
          <StatCard label="Unique Unlocked" value={summary.unique_puzzles_unlocked} />
          <StatCard label="Completed" value={summary.total_completions} />
          <StatCard label="PvP Matches" value={summary.total_pvp_matches} />
        </div>
      )}

      <h2 style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, marginBottom: 8 }}>PvP Matches by Mode ({totalPvp})</h2>
      <Card>
        {loading ? <SkeletonRows count={6} /> : pvpStats.length === 0 ? (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 14, color: C.muted }}>No PvP matches yet</div>
        ) : pvpStats.map((row, idx) => (
          <CardRow key={row.mode} last={idx === pvpStats.length - 1} onClick={() => setSelectedMode(row.mode)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{MODE_LABELS[row.mode] || row.mode}</span>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{row.times_played}</div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>TOTAL</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.muted }}>{row.bot_matches}</div>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>BOT</div>
                </div>
              </div>
            </div>
          </CardRow>
        ))}
      </Card>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E6E6E6", padding: "16px 14px", display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 24, fontWeight: 800, color: C.ink, fontFamily: "'Fredoka One',cursive" }}>{value != null ? value.toLocaleString() : "—"}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginTop: 2 }}>{label}</span>
    </div>
  );
}

// ==================== Main Admin Page ====================
export default function AdminPage({ session, onBack }) {
  const [tab, setTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F8F8F8" }}>
      <style>{RESPONSIVE_CSS}</style>

      {/* Header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 60,
        background: "#fff", borderBottom: "1px solid #E6E6E6",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#666", padding: 4 }}
            className="admin-hamburger"
          >
            {sidebarOpen ? "\u2715" : "\u2630"}
          </button>
          <span style={{ fontFamily: "'Fredoka One',cursive", fontSize: 18, color: C.ink, letterSpacing: 1 }}>Pencil Puzzles</span>
          <Badge text="ADMIN" color={C.accent} bg={C.accentLight} />
        </div>
        <button onClick={onBack} style={{ padding: "8px 14px", background: "none", border: "1.5px solid #E6E6E6", borderRadius: 10, fontSize: 12, fontWeight: 700, color: C.muted, cursor: "pointer", letterSpacing: 1 }}>BACK</button>
      </header>

      <div style={{ display: "flex", flex: 1, paddingTop: 60 }}>
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 10 }} />}

        <aside className="admin-sidebar" style={{
          position: "fixed", left: 0, top: 60, bottom: 0, width: 200,
          background: "#fff", borderRight: "1px solid #E6E6E6",
          display: "flex", flexDirection: "column", padding: "16px 12px", zIndex: 10,
          transform: sidebarOpen ? "translateX(0)" : undefined, transition: "transform 0.2s ease",
        }}>
          <nav style={{ flex: 1 }}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setTab(key); setSidebarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", marginBottom: 4,
                  borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  background: tab === key ? C.accentLight : "transparent", color: tab === key ? C.accent : "#666",
                }}
              >
                <span style={{ fontSize: 18 }}>{key === "users" ? "\uD83D\uDC64" : key === "puzzles" ? "\uD83E\uDDE9" : "\uD83D\uDCCA"}</span>
                {label}
              </button>
            ))}
          </nav>
          <p style={{ fontSize: 11, color: "#CCC", padding: "0 12px" }}>v1.0.0</p>
        </aside>

        <main className="admin-main" style={{ flex: 1, marginLeft: 200, padding: 24, overflowY: "auto", height: "calc(100vh - 60px)" }}>
          {tab === "users" && <UsersTab token={session.token} />}
          {tab === "puzzles" && <PuzzlesTab token={session.token} />}
          {tab === "analytics" && <AnalyticsTab token={session.token} />}
        </main>
      </div>
    </div>
  );
}
