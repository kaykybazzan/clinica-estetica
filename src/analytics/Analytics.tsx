"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { analyticsConfig } from "./config";
import {
  cookieConsentServerSnapshot,
  readCookieConsent,
  subscribeCookieConsent,
} from "./consent";

export interface AnalyticsProps {
  /** When true, non-essential tracking only loads after explicit opt-in. */
  requireConsent?: boolean;
}

/**
 * Analytics is mounted only when configured and consent allows it. This avoids
 * sending requests to third-party measurement providers before opt-in.
 */
export function Analytics({ requireConsent = true }: AnalyticsProps) {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    readCookieConsent,
    cookieConsentServerSnapshot,
  );
  const { gaId, gtmId, metaPixelId, clarityId } = analyticsConfig;

  if (requireConsent && consent !== "accepted") return null;

  return (
    <>
      {gtmId && (
        <Script id="nx-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {gaId && (
        <>
          <Script
            id="nx-ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="nx-ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="nx-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {clarityId && (
        <Script id="nx-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
