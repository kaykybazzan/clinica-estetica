"use client";

import { useSyncExternalStore } from "react";
import { mapsDirectionsHref, mapsEmbedSrc } from "@/integrations/maps";
import { clientConfig } from "@/config/client.config";
import {
  cookieConsentServerSnapshot,
  readCookieConsent,
  subscribeCookieConsent,
} from "@/analytics/consent";
import { uiContent } from "@/data/ui";
import { formatFullAddress } from "@/utils/format";
import { cn } from "@/utils/cn";

/** Lazy iframe. With cookie consent enabled, third-party map content stays
 * blocked until opt-in; essential-only visitors still get an external link. */
export function MapEmbed({ className, ratio = "aspect-[16/10]" }: { className?: string; ratio?: string }) {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    cookieConsentServerSnapshot,
  );

  if (!clientConfig.features.maps) return null;

  const requiresConsent = clientConfig.features.cookieBanner;
  const canEmbed = !requiresConsent || consent === "accepted";

  if (!canEmbed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-[var(--radius-brand)] border border-line bg-surface p-6 text-center",
          ratio,
          className,
        )}
      >
        <p className="font-heading text-h4 font-semibold">{uiContent.map.blockedTitle}</p>
        <p className="mt-2 max-w-md text-sm text-fg-soft">{uiContent.map.blockedText}</p>
        <p className="mt-3 text-sm text-fg-soft">{formatFullAddress(clientConfig.address)}</p>
        <a
          href={mapsDirectionsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[var(--nx-tap-min)] items-center rounded-[var(--radius-brand-sm)] border border-line px-4 py-2 text-sm font-semibold text-primary hover:bg-bg"
        >
          {uiContent.map.externalCta}
        </a>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-[var(--radius-brand)] border border-line bg-surface", ratio, className)}>
      <iframe
        title={`Mapa com a localização da ${clientConfig.company.name}`}
        src={mapsEmbedSrc()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}
