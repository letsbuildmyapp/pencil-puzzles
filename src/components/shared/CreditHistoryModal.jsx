import { C } from "../../constants";
import { getCreditHistory, getCreditHistorySummary, TYPES } from "../../lib/creditHistory";

// Metadata for rendering each source. Icon + human label + optional color
// accent for the amount. Fallback for unknown sources keeps the UI safe
// against future source IDs we haven't mapped yet.
const SOURCE_META = {
  welcome:         { icon: "🎉", label: "Welcome bonus" },
  login_streak:    { icon: "🎁", label: "Daily login bonus" },
  pvp_first_match: { icon: "⚔️", label: "First PvP match today" },
  pvp_first_win:   { icon: "🏆", label: "First PvP win today" },
  coupon:          { icon: "🎟️", label: "Coupon redeemed" },
  store_purchase:  { icon: "💳", label: "Store purchase" },
  restore:         { icon: "🔄", label: "Purchase restored" },
  puzzle_unlock:   { icon: "🔓", label: "Puzzle unlocked" },
};

function formatRelativeTime(ts) {
  const now = Date.now();
  const diff = now - ts;
  if (diff < 60 * 1000) return "just now";
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 7 * 24 * 60 * 60 * 1000) return `${Math.floor(diff / 86400000)}d ago`;
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function CreditHistoryModal({ open, onClose }) {
  if (!open) return null;
  const history = getCreditHistory();
  const summary = getCreditHistorySummary();

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(10,6,2,0.72)",
          backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
        }}
      />
      <div
        style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          zIndex: 1001,
          background: C.paper,
          borderRadius: 24,
          padding: "24px 20px 20px",
          width: "calc(100vw - 40px)", maxWidth: 400,
          maxHeight: "calc(100vh - 80px)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          fontFamily: "'Nunito',sans-serif",
          animation: "celebrationPop 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: 22,
            color: C.ink,
            letterSpacing: 0.3,
          }}>
            Credit History
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              fontSize: 22,
              cursor: "pointer",
              padding: "4px 10px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Lifetime summary */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <SummaryStat label="Earned" value={`+${summary.earned}`} color="#22C55E" />
          <SummaryStat label="Purchased" value={`+${summary.purchased}`} color="#6366F1" />
          <SummaryStat label="Spent" value={`−${summary.spent}`} color="#F43F5E" />
        </div>

        <div style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          borderTop: `1px solid ${C.border}`,
          paddingTop: 10,
          margin: "0 -4px",
        }}>
          {history.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "32px 12px",
              color: C.muted,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
            }}>
              No transactions yet.<br />
              <span style={{ fontSize: 11, opacity: 0.7 }}>Play a PvP match or log in tomorrow to earn credits.</span>
            </div>
          ) : (
            history.map(entry => (
              <HistoryRow key={entry.id} entry={entry} />
            ))
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: 14,
            padding: "12px 0",
            background: "none",
            color: C.muted,
            border: `2px solid ${C.border}`,
            borderRadius: 12,
            fontFamily: "'Nunito',sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 2,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}

function SummaryStat({ label, value, color }) {
  return (
    <div style={{
      flex: 1,
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "8px 4px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Fredoka One',cursive",
        fontSize: 16,
        color,
        lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 8,
        color: C.muted,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        fontWeight: 800,
        marginTop: 3,
      }}>
        {label}
      </div>
    </div>
  );
}

function HistoryRow({ entry }) {
  const meta = SOURCE_META[entry.source] || { icon: "💠", label: entry.source };
  const isSpend = entry.type === TYPES.SPEND;
  const displayAmount = entry.amount === "unlimited" ? "∞" : entry.amount;
  const amountColor = isSpend
    ? "#F43F5E"
    : entry.type === TYPES.PURCHASE
    ? "#6366F1"
    : "#22C55E";

  // Sub-label: coupon code / puzzle id / streak day / price paid — whatever
  // metadata is most useful for the row.
  let subtitle = formatRelativeTime(entry.t);
  if (entry.meta?.code) subtitle = `${entry.meta.code} · ${subtitle}`;
  else if (entry.meta?.puzzleId) subtitle = `${entry.meta.puzzleId} · ${subtitle}`;
  else if (entry.meta?.streak) subtitle = `Day ${entry.meta.streak} · ${subtitle}`;
  else if (entry.meta?.price) subtitle = `${entry.meta.price} · ${subtitle}`;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 8px",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        fontSize: 22,
        width: 34,
        textAlign: "center",
        lineHeight: 1,
        flexShrink: 0,
      }}>
        {meta.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: 14,
          color: C.ink,
          letterSpacing: 0.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {meta.label}
        </div>
        <div style={{
          fontSize: 10,
          color: C.muted,
          fontWeight: 600,
          marginTop: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {subtitle}
        </div>
      </div>
      <div style={{
        fontFamily: "'Fredoka One',cursive",
        fontSize: 18,
        color: amountColor,
        flexShrink: 0,
      }}>
        {isSpend ? "−" : "+"}{displayAmount}
      </div>
    </div>
  );
}
