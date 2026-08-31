import type { ClientDesign } from "./client.schema";

const DENSITY_SCALE: Record<ClientDesign["density"], string> = {
  compact: "0.82",
  regular: "1",
  spacious: "1.22",
};

const MOTION_SPEED = { fast: "180ms", regular: "280ms", slow: "520ms" } as const;
const MOTION_DISTANCE = { none: "0px", subtle: "12px", regular: "20px", expressive: "32px" } as const;
const IMAGE_RADIUS = { none: "0px", soft: "8px", brand: "var(--nx-radius)", large: "calc(var(--nx-radius) * 1.8)" } as const;
const BUTTON_RADIUS = { brand: "var(--nx-radius)", square: "4px", pill: "999px" } as const;
const CARD_SHADOW = { flat: "none", outlined: "none", elevated: "var(--nx-shadow-lift)", glass: "var(--nx-shadow-soft)" } as const;
const CONTAINER = { narrow: "var(--nx-container-narrow)", default: "var(--nx-container)", wide: "var(--nx-container-wide)" } as const;

/** Server-side Design DNA → CSS variables. No client-side theme flash. */
export function buildThemeCss(design: ClientDesign): string {
  const geometry = design.geometry ?? {};
  const layout = design.layout ?? {};
  const imagery = design.imagery ?? {};
  const motion = design.motion ?? {};

  const declarations: string[] = [
    `--nx-primary:${design.primaryColor}`,
    `--nx-primary-contrast:${design.primaryContrast}`,
    `--nx-secondary:${design.secondaryColor}`,
    `--nx-accent:${design.accentColor}`,
    `--nx-bg:${design.backgroundColor}`,
    `--nx-surface:${design.surfaceColor}`,
    `--nx-fg:${design.foregroundColor}`,
    `--nx-muted:${design.mutedColor}`,
    `--nx-border:${design.borderColor}`,
    `--nx-radius:${design.radius}px`,
    `--nx-density:${DENSITY_SCALE[design.density]}`,
    `--nx-font-heading:${fontStack(design.headingFont, "heading")}`,
    `--nx-font-body:${fontStack(design.bodyFont, "body")}`,
    `--nx-border-width:${geometry.borderWidth ?? 1}px`,
    `--nx-card-radius:${IMAGE_RADIUS[geometry.imageRadius ?? "brand"]}`,
    `--nx-button-radius:${BUTTON_RADIUS[geometry.buttonRadius ?? "brand"]}`,
    `--nx-card-shadow:${CARD_SHADOW[geometry.cardStyle ?? "outlined"]}`,
    `--nx-layout-container:${CONTAINER[layout.container ?? "default"]}`,
    `--nx-motion-duration:${MOTION_SPEED[motion.speed ?? "regular"]}`,
    `--nx-motion-distance:${MOTION_DISTANCE[motion.intensity ?? "subtle"]}`,
    `--nx-image-radius:${IMAGE_RADIUS[imagery.preferredRatio === "portrait" ? "large" : geometry.imageRadius ?? "brand"]}`,
    `--nx-card-padding:${design.density === "compact" ? "1.1rem" : design.density === "spacious" ? "1.75rem" : "1.4rem"}`,
  ];
  return `:root{${declarations.join(";")}}`;
}

const HEADING_FALLBACK = `"Segoe UI", system-ui, -apple-system, Helvetica, Arial, sans-serif`;
const BODY_FALLBACK = `system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`;

function fontStack(family: string, role: "heading" | "body"): string {
  const fallback = role === "heading" ? HEADING_FALLBACK : BODY_FALLBACK;
  const safe = family.replace(/["\\<>]/g, "").trim();
  return safe ? `"${safe}", ${fallback}` : fallback;
}

export function googleFontsHref(design: ClientDesign): string | null {
  if (design.fontProvider !== "google") return null;
  const families = [
    { name: design.headingFont, axis: "wght@400;500;600;700;800" },
    { name: design.bodyFont, axis: "wght@400;500;600;700" },
  ]
    .filter((f) => f.name.trim().length > 0)
    .map((f) => `family=${encodeURIComponent(f.name.trim()).replace(/%20/g, "+")}:${f.axis}`);
  return families.length ? `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap` : null;
}
