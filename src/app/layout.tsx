import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/animations.css";
import { ViewTransitions } from "next-view-transitions";

import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FooterSection } from "@/sections";
import { WhatsAppFloating } from "@/components/ui/WhatsAppFloating";
import { BackToTop } from "@/components/ui/BackToTop";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";
import { ScrollToTopOnRouteChange } from "@/components/layout/ScrollToTopOnRouteChange";
import { StudioBridge } from "@/components/layout/StudioBridge";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Analytics } from "@/analytics/Analytics";
import { clientConfig } from "@/config/client.config";
import { buildThemeCss, googleFontsHref } from "@/config/theme";
import { rootMetadata } from "@/seo/metadata";
import "@/config/assert-config";

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: clientConfig.design.primaryColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { design, features, seo } = clientConfig;
  const fontsHref = googleFontsHref(design);

  return (
    <ViewTransitions>
      <html lang={seo.locale.replace("_", "-")}>
        <head>
          {fontsHref && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
              <link rel="stylesheet" href={fontsHref} />
            </>
          )}
          {/* Client theme, server-rendered: no flash of the wrong brand. */}
          <style dangerouslySetInnerHTML={{ __html: buildThemeCss(design) }} />
        </head>
        <body
          data-nx-archetype={design.archetype ?? "corporate"}
          data-nx-imagery={design.imagery?.treatment ?? "natural"}
          data-nx-background={design.backgrounds?.style ?? "clean"}
        >
          <a href="#conteudo" className="nx-skip-link">
            Pular para o conteúdo
          </a>

          <ScrollToTopOnRouteChange />
          {features.announcementBar && <AnnouncementBar />}
          <Header />

          <main id="conteudo">{children}</main>

          <FooterSection />

          {features.whatsappFloating && <WhatsAppFloating />}
          {features.backToTop && <BackToTop offsetForWhatsApp={features.whatsappFloating} />}
          <MobileConversionBar />
          {features.cookieBanner && <CookieBanner />}

          <Analytics requireConsent={features.cookieBanner} />
          {process.env.NODE_ENV !== "production" && <StudioBridge />}
        </body>
      </html>
    </ViewTransitions>
  );
}
