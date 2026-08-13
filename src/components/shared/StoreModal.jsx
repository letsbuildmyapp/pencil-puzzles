import { useState, useEffect } from "react";
import { C } from "../../constants";
import { getOfferings, purchasePackage, restorePurchases } from "../../lib/purchases";
import { getCredits, redeemCoupon } from "../../lib/credits";

const PACKAGE_META = {
  lil_bag:  { emoji: "🎁", title: "Lil' Bag O' Mystery", credits: "1 credit",  desc: "Unlock 1 puzzle of your choice" },
  box:      { emoji: "📦", title: "Box O' Mystery",       credits: "10 credits", desc: "Unlock 10 puzzles of your choice" },
  big_box:  { emoji: "🎉", title: "Big Box O' Mystery",   credits: "Unlimited", desc: "Unlock every puzzle, forever" },
};

const ORDER = ["lil_bag", "box", "big_box"];

function identifierKey(id) {
  if (id.includes("big_box")) return "big_box";
  if (id.includes("lil_bag")) return "lil_bag";
  if (id.includes("box")) return "box";
  return null;
}

export default function StoreModal({ onClose, onPurchased }) {
  const [offering, setOffering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [purchasing, setPurchasing] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState(null);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [credits, setCredits] = useState(() => getCredits());

  function loadOfferings() {
    setLoading(true);
    setLoadError(false);
    getOfferings().then(o => {
      if (o && o.availablePackages?.length > 0) {
        setOffering(o);
      } else {
        setLoadError(true);
      }
      setLoading(false);
    });
  }

  useEffect(() => { loadOfferings(); }, []);

  const packages = offering
    ? ORDER.map(key => offering.availablePackages?.find(p => identifierKey(p.product.identifier) === key)).filter(Boolean)
    : [];

  async function handlePurchase(pkg) {
    setPurchasing(pkg.identifier);
    setError(null);
    try {
      await purchasePackage(pkg);
      onPurchased?.();
      onClose();
    } catch (e) {
      if (!e.message?.includes("cancel")) {
        setError("Purchase failed. Please try again.");
      }
    } finally {
      setPurchasing(null);
    }
  }

  function handleRedeem() {
    const result = redeemCoupon(couponCode);
    if (result.ok) {
      setCouponMsg({ ok: true, text: result.amount === Infinity ? "🎉 Unlimited credits unlocked!" : `🎉 ${result.amount} credit${result.amount !== 1 ? "s" : ""} added!` });
      setCouponCode("");
      setCredits(getCredits());
    } else {
      setCouponMsg({ ok: false, text: result.reason });
    }
  }

  async function handleRestore() {
    setRestoring(true);
    setError(null);
    try {
      await restorePurchases();
      onPurchased?.();
      onClose();
    } catch {
      setError("Nothing to restore.");
    } finally {
      setRestoring(false);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 480, background: C.paper, borderRadius: "28px 28px 0 0", padding: "28px 20px 40px", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>

        {/* Handle */}
        <div style={{ width: 36, height: 4, background: C.line, borderRadius: 99, margin: "0 auto 24px" }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔓</div>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 26, color: C.ink, letterSpacing: 0.3 }}>Unlock Puzzles</div>
          <div style={{ fontSize: 14, color: C.muted, marginTop: 6, fontWeight: 600 }}>
            {credits === Infinity
              ? "You have unlimited credits!"
              : credits > 0
              ? `You have ${credits} credit${credits !== 1 ? "s" : ""} remaining`
              : "You're out of credits — grab more below"}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 32, color: C.muted, fontSize: 13 }}>Loading...</div>
        ) : loadError ? (
          <div style={{ textAlign: "center", padding: 24 }}>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>
              Could not load purchases. Check your connection and try again.
            </div>
            <button onClick={loadOfferings} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 14, padding: "12px 28px", fontFamily: "'Fredoka One',cursive", fontSize: 16, cursor: "pointer" }}>
              Try Again
            </button>
          </div>
        ) : (
          packages.map(pkg => {
            const key = identifierKey(pkg.product.identifier);
            const meta = PACKAGE_META[key] || {};
            const isBest = key === "big_box";
            const busy = purchasing === pkg.identifier;
            return (
              <div key={pkg.identifier} onClick={() => !purchasing && !restoring && handlePurchase(pkg)}
                style={{ position: "relative", background: isBest ? "linear-gradient(135deg,#C026D3,#818CF8)" : C.surface, border: `2px solid ${isBest ? "transparent" : C.border}`, borderRadius: 18, padding: "16px 18px", marginBottom: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, opacity: (purchasing && !busy) ? 0.5 : 1, transition: "opacity 0.15s" }}>
                {isBest && (
                  <div style={{ position: "absolute", top: -10, right: 14, background: "#FBBF24", color: "#2D1B69", fontSize: 10, fontWeight: 900, padding: "3px 10px", borderRadius: 99, letterSpacing: 1 }}>BEST VALUE</div>
                )}
                <div style={{ fontSize: 32, flexShrink: 0 }}>{meta.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 17, color: isBest ? "#fff" : C.ink, letterSpacing: 0.3 }}>{meta.title}</div>
                  <div style={{ fontSize: 12, color: isBest ? "rgba(255,255,255,0.8)" : C.muted, marginTop: 2, fontWeight: 600 }}>{meta.desc}</div>
                  <div style={{ fontSize: 13, color: isBest ? "#FBBF24" : C.accent, fontWeight: 900, marginTop: 4 }}>{meta.credits}</div>
                </div>
                <div style={{ flexShrink: 0, background: isBest ? "#FBBF24" : C.accent, color: isBest ? "#2D1B69" : "#fff", borderRadius: 12, padding: "8px 14px", fontSize: 14, fontWeight: 900, fontFamily: "'Fredoka One',cursive", minWidth: 56, textAlign: "center" }}>
                  {busy ? "..." : pkg.product.priceString}
                </div>
              </div>
            );
          })
        )}

        {error && (
          <div style={{ textAlign: "center", color: "#EF4444", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{error}</div>
        )}

        {couponOpen ? (
          <div style={{ marginTop: 16, padding: "14px 14px 12px", background: C.surface, border: `2px solid ${C.border}`, borderRadius: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8, letterSpacing: 0.5 }}>COUPON CODE</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={couponCode}
                onChange={e => { setCouponCode(e.target.value); setCouponMsg(null); }}
                onKeyDown={e => { if (e.key === "Enter") handleRedeem(); }}
                placeholder="Enter code"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                style={{ flex: 1, minWidth: 0, background: C.paper, border: `2px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 15, fontWeight: 700, color: C.ink, textTransform: "uppercase", fontFamily: "'Nunito',sans-serif", outline: "none" }}
              />
              <button onClick={handleRedeem} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "0 18px", fontFamily: "'Fredoka One',cursive", fontSize: 14, cursor: "pointer" }}>
                Redeem
              </button>
            </div>
            {couponMsg && (
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 8, color: couponMsg.ok ? "#10B981" : "#EF4444" }}>
                {couponMsg.text}
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setCouponOpen(true)} style={{ width: "100%", background: "none", border: "none", color: C.muted, fontSize: 13, fontWeight: 700, padding: "14px 0 0", cursor: "pointer", fontFamily: "'Nunito',sans-serif" }}>
            Have a coupon code?
          </button>
        )}

        <button onClick={handleRestore} disabled={restoring} style={{ width: "100%", background: "none", border: "none", color: C.muted, fontSize: 13, fontWeight: 700, padding: "12px 0 0", cursor: "pointer", fontFamily: "'Nunito',sans-serif" }}>
          {restoring ? "Restoring..." : "Restore Purchases"}
        </button>
      </div>
    </div>
  );
}
