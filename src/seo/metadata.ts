import type { Metadata } from "next";
import { clientConfig } from "@/config/client.config";
import { absoluteUrl } from "@/utils/url";

export interface PageMetaInput {
  title: string;
  description: string;
  /** Route path, ex.: "/servicos". Drives the canonical URL. */
  path: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
}

const { seo, company } = clientConfig;
const previewDeployment = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");

/** "%s | %n" -> "%s | Nome da empresa" (Next only understands %s). */
function nextTitleTemplate(): string {
  return seo.titleTemplate.replace(/%n/g, company.name);
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: `${seo.defaultTitle} | ${company.name}`,
    template: nextTitleTemplate(),
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: seo.locale,
    url: seo.siteUrl,
    title: `${seo.defaultTitle} | ${company.name}`,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${seo.defaultTitle} | ${company.name}`,
    description: seo.description,
    images: [seo.ogImage],
    ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
  },
  robots: previewDeployment
    ? { index: false, follow: false, noarchive: true }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  ...(seo.verification.google || seo.verification.bing
    ? {
        verification: {
          ...(seo.verification.google ? { google: seo.verification.google } : {}),
          ...(seo.verification.bing ? { other: { "msvalidate.01": seo.verification.bing } } : {}),
        },
      }
    : {}),
};

/** Single entry point for page-level metadata — keeps canonicals consistent. */
export function buildMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image ?? seo.ogImage;

  return {
    title: input.title,
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      url,
      siteName: company.name,
      locale: seo.locale,
      title: `${input.title} | ${company.name}`,
      description: input.description,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${company.name}`,
      description: input.description,
      images: [image],
    },
    ...(input.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
