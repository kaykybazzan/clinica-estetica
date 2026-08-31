import { clientConfig } from "@/config/client.config";

/** Absolute URL for canonicals, Open Graph and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  const base = clientConfig.seo.siteUrl.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix === "/" ? "" : suffix}`;
}

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
