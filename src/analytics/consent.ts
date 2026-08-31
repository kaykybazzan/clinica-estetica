"use client";

export const COOKIE_CONSENT_STORAGE_KEY = "nx-cookie-consent";
const COOKIE_CONSENT_REOPEN_KEY = "nx-cookie-consent-reopen-from";
export type CookieConsent = "accepted" | "essential" | "pending";

const listeners = new Set<() => void>();

export function subscribeCookieConsent(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function readCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return "pending";
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "essential" ? value : "pending";
  } catch {
    return "essential";
  }
}

export function cookieConsentServerSnapshot(): CookieConsent {
  return "pending";
}

export function setCookieConsent(consent: Exclude<CookieConsent, "pending">): void {
  const previous = readCookieConsent();
  let reopenedFrom: CookieConsent = "pending";
  try {
    const stored = window.sessionStorage.getItem(COOKIE_CONSENT_REOPEN_KEY);
    reopenedFrom = stored === "accepted" || stored === "essential" ? stored : "pending";
    window.sessionStorage.removeItem(COOKIE_CONSENT_REOPEN_KEY);
  } catch {
    // Session storage is optional; localStorage remains the source of truth.
  }
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
  } catch {
    // If storage is unavailable, keep the current session conservative.
  }
  for (const listener of listeners) listener();

  // Scripts already executed cannot be reliably "unloaded". When a visitor
  // revokes an earlier opt-in, reload so the next render starts without them.
  if ((previous === "accepted" || reopenedFrom === "accepted") && consent === "essential") {
    window.location.reload();
  }
}

export function resetCookieConsent(): void {
  const previous = readCookieConsent();
  try {
    if (previous !== "pending") {
      window.sessionStorage.setItem(COOKIE_CONSENT_REOPEN_KEY, previous);
    }
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    // The banner will remain conservative if storage is unavailable.
  }
  for (const listener of listeners) listener();
}
