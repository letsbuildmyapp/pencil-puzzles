import { Capacitor } from "@capacitor/core";
import { Purchases } from "@revenuecat/purchases-capacitor";
import { addCredits } from "./credits";
import { recordCreditTx, SOURCES, TYPES } from "./creditHistory";

const RC_API_KEY = "appl_UYsLCpOqJGnFjeejppOmbustVTW";

// Promise-based guard prevents concurrent configure() calls
let _initPromise = null;

function getSDK() {
  if (!Capacitor.isNativePlatform()) {
    console.log("[RC] not native, skipping");
    return null;
  }
  return Purchases;
}

async function _doInit() {
  const SDK = getSDK();
  if (!SDK) return;
  try {
    console.log("[RC] configuring...");
    await SDK.configure({ apiKey: RC_API_KEY });
    console.log("[RC] configured successfully");
    const { customerInfo } = await SDK.getCustomerInfo();
    console.log("[RC] entitlements:", JSON.stringify(customerInfo?.entitlements?.active));
    if (customerInfo?.entitlements?.active?.big_box) {
      addCredits(Infinity);
    }
  } catch (e) {
    console.log("[RC] init failed:", e?.message || String(e));
    _initPromise = null; // allow retry on next call
    throw e;
  }
}

export function initPurchases() {
  if (!_initPromise) {
    console.log("[RC] initPurchases called");
    _initPromise = _doInit();
  }
  return _initPromise;
}

export async function getOfferings() {
  const SDK = getSDK();
  if (!SDK) return null;
  try {
    await initPurchases();
  } catch (e) {
    return null;
  }
  try {
    console.log("[RC] fetching offerings...");
    const result = await SDK.getOfferings();
    console.log("[RC] offerings:", result?.current?.availablePackages?.length, "packages");
    return result?.current ?? null;
  } catch (e) {
    console.log("[RC] getOfferings failed:", e?.message || String(e));
    return null;
  }
}

export async function purchasePackage(pkg) {
  const SDK = getSDK();
  if (!SDK) throw new Error("Purchases not available on this platform");
  const { customerInfo } = await SDK.purchasePackage({ aPackage: pkg });
  const productId = pkg.product.identifier;
  const priceStr = pkg.product?.priceString || "";
  let amount = 0;
  if (productId.includes("big_box")) {
    addCredits(Infinity);
    amount = Infinity;
  } else if (productId.includes("box_c") || productId === "com.letsbuildmyapp.pencilpuzzles.box") {
    addCredits(10);
    amount = 10;
  } else if (productId.includes("lil_bag")) {
    addCredits(1);
    amount = 1;
  }
  if (amount > 0) {
    recordCreditTx({
      type: TYPES.PURCHASE,
      source: SOURCES.STORE_PURCHASE,
      amount,
      meta: { productId, price: priceStr },
    });
  }
  return customerInfo;
}

export async function restorePurchases() {
  const SDK = getSDK();
  if (!SDK) return;
  try {
    const { customerInfo } = await SDK.restorePurchases();
    if (customerInfo?.entitlements?.active?.big_box) {
      addCredits(Infinity);
    }
  } catch (e) {
    console.warn("Restore failed:", e);
  }
}
