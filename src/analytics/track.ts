"use client";

type EventPayload = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

/**
 * Fire-and-forget conversion event. Safe to call even when no tag is installed:
 * every provider is feature-detected, nothing throws, nothing is queued.
 */
export function trackEvent(name: string, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;

  w.dataLayer?.push({ event: name, ...payload });
  w.gtag?.("event", name, payload);
  w.fbq?.("trackCustom", name, payload);
}

export const CONVERSION_EVENTS = {
  whatsappClick: "nx_whatsapp_click",
  phoneClick: "nx_phone_click",
  formSubmit: "nx_contact_form_submit",
  formSuccess: "nx_contact_form_success",
} as const;
