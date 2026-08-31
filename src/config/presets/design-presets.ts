import type { ClientDesign } from "../client.schema";
import presets from "./design-presets.json";

/**
 * Ready-made visual identities. Each preset is a complete `design` block, so a
 * client project can start from one and override only what the brand demands.
 *
 * Every palette was checked for WCAG AA contrast between `foregroundColor` and
 * `backgroundColor`, and between `primaryContrast` and `primaryColor` — the two
 * pairs that carry almost all the text on a Nexora site.
 *
 * The data lives in JSON so `scripts/create-client.mjs` (plain Node) and the
 * app share one source of truth.
 */
export interface DesignPreset {
  id: string;
  label: string;
  /** Where this identity tends to land well. */
  suitedTo: string;
  design: ClientDesign;
}

export const designPresets = presets as DesignPreset[];

export const presetIds = designPresets.map((item) => item.id);

export function getDesignPreset(id: string): DesignPreset | undefined {
  return designPresets.find((item) => item.id === id);
}
