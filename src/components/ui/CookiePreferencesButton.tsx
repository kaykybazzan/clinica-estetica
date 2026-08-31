"use client";

import { resetCookieConsent } from "@/analytics/consent";
import { cn } from "@/utils/cn";
import { uiContent } from "@/data/ui";

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={resetCookieConsent}
      className={cn("hover:underline underline-offset-4", className)}
    >
      {uiContent.cookies.preferences}
    </button>
  );
}
