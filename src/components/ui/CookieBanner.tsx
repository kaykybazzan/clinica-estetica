"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "./Button";
import {
  cookieConsentServerSnapshot,
  readCookieConsent,
  setCookieConsent,
  subscribeCookieConsent,
} from "@/analytics/consent";
import { uiContent } from "@/data/ui";

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    cookieConsentServerSnapshot,
  );
  const accept = useCallback(() => setCookieConsent("accepted"), []);
  const refuse = useCallback(() => setCookieConsent("essential"), []);

  if (consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[var(--nx-z-banner)] mx-auto max-w-3xl rounded-[var(--radius-brand)] border border-line bg-bg p-5 shadow-lift sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-soft">
          {uiContent.cookies.message}{" "}
          <Link href="/politica-de-cookies" className="text-primary underline underline-offset-4">
            {uiContent.cookies.learnMore}
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="ghost" onClick={refuse}>
            {uiContent.cookies.essentialOnly}
          </Button>
          <Button size="sm" onClick={accept}>
            {uiContent.cookies.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
