/**
 * Analytics is opt-in per environment. A script only reaches the browser when
 * its ID is present in .env, so a client without Meta Pixel ships zero bytes
 * of Meta Pixel.
 */
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
} as const;

export const hasAnalytics =
  analyticsConfig.gaId !== "" ||
  analyticsConfig.gtmId !== "" ||
  analyticsConfig.metaPixelId !== "" ||
  analyticsConfig.clarityId !== "";
