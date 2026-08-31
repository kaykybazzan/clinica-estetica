import type { ClientComposition, ClientFeatures, ClientPages, ClientSections, ClientStrategy } from "@/config/client.schema";

import local from "./local.json";
import auto from "./auto.json";
import pet from "./pet.json";
import food from "./food.json";
import professional from "./professional.json";
import health from "./health.json";
import industrial from "./industrial.json";
import agriculture from "./agriculture.json";
import beauty from "./beauty.json";
import landscaping from "./landscaping.json";
import techRetail from "./tech-retail.json";

/**
 * A template is a curated set of choices — never new components. It answers
 * three questions: which variants, which features, which pages.
 *
 * The data lives in JSON so `scripts/create-client.mjs` (plain Node, no build
 * step) and the TypeScript app read exactly the same source.
 */
export interface SegmentTemplate {
  id: string;
  label: string;
  /** Preset id from src/config/presets/design-presets.ts */
  designPreset: string;
  /** Schema.org LocalBusiness subtype applied by the generated config. */
  businessType: string;
  /** Why these choices — read this before overriding them. */
  rationale: string;
  sections: ClientSections;
  features: Partial<ClientFeatures>;
  pages: Partial<ClientPages>;
  strategy: ClientStrategy;
  composition: ClientComposition;
}

export const templates = [
  local,
  auto,
  pet,
  food,
  professional,
  health,
  industrial,
  agriculture,
  beauty,
  landscaping,
  techRetail,
] as SegmentTemplate[];

export const templateIds = templates.map((template) => template.id);

export function getTemplate(id: string): SegmentTemplate | undefined {
  return templates.find((template) => template.id === id);
}
