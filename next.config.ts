import type { NextConfig } from "next";

/**
 * Security headers. Provider origins are added only when the corresponding
 * integration is configured at build time. `unsafe-eval` is restricted to
 * development because Next's dev tooling can require it; production does not.
 */
const isDev = process.env.NODE_ENV !== "production";
const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");
const hasGoogle = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID);
const hasMeta = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const hasClarity = Boolean(process.env.NEXT_PUBLIC_CLARITY_ID);

const scriptSrc = ["'self'", "'unsafe-inline'"];
if (isDev) scriptSrc.push("'unsafe-eval'");
if (hasGoogle) scriptSrc.push("https://www.googletagmanager.com", "https://www.google-analytics.com");
if (hasMeta) scriptSrc.push("https://connect.facebook.net");
if (hasClarity) scriptSrc.push("https://www.clarity.ms");

const imgSrc = ["'self'", "data:", "blob:"];
if (hasGoogle) imgSrc.push("https://www.google-analytics.com", "https://www.googletagmanager.com");
if (hasMeta) imgSrc.push("https://www.facebook.com");
if (hasClarity) imgSrc.push("https://c.clarity.ms");

const connectSrc = ["'self'"];
if (hasGoogle) connectSrc.push("https://www.google-analytics.com", "https://www.googletagmanager.com");
if (hasMeta) connectSrc.push("https://connect.facebook.net");
if (hasClarity) connectSrc.push("https://*.clarity.ms");

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src ${imgSrc.join(" ")}`,
  `connect-src ${connectSrc.join(" ")}`,
  `frame-src ${isDev ? "\'self\' " : ""}https://www.google.com https://www.googletagmanager.com`,
  `frame-ancestors ${isDev ? "\'self\'" : "\'none\'"}`,
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: isDev ? "SAMEORIGIN" : "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
