/**
 * Nexora's own identity. Used by internal dev pages, documentation and the
 * optional footer credit — never as client-facing brand data.
 */
export const nexora = {
  name: "Nexora",
  tagline: "Criação de sites e soluções digitais",
  /** Fill only after the official Nexora domain is defined. */
  url: "",
  /** Set to false for clients who do not want an agency credit in the footer. */
  showFooterCredit: true,
  creditLabel: "Site desenvolvido por Nexora",
  identity: {
    navy: "#0A1F44",
    blue: "#1B4FE0",
    cyan: "#12D3E8",
    white: "#FFFFFF",
    headingFont: "Sora",
    bodyFont: "Inter",
  },
} as const;

/** Base version of NEXORA-WEBSITE-BASE this project was generated from. */
export const BASE_VERSION = "3.0.0";
