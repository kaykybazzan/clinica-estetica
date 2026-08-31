import { getTemplate, templates } from "../../../templates";
import { businessPresets } from "@/config/presets/business-presets";
import type { ClientComposition, ClientStrategy } from "@/config/client.schema";

export interface StrategyInput {
  segment: string;
  primaryConversion?: ClientStrategy["primaryConversion"];
  audience?: ClientStrategy["audience"];
  hasProducts?: boolean;
  hasProjects?: boolean;
  hasTeam?: boolean;
  hasGallery?: boolean;
}

export interface StrategyRecommendation {
  templateId: string;
  strategy: ClientStrategy;
  composition: ClientComposition;
  rationale: string;
}

/**
 * Deterministic strategy engine. It provides a safe baseline before any AI or
 * human creative work. AI may suggest changes, but the platform always starts
 * from explicit rules that can be tested and reviewed.
 */
export function recommendStrategy(input: StrategyInput): StrategyRecommendation {
  const business = businessPresets.find((item) => item.id === input.segment);
  const template = getTemplate(business?.template ?? input.segment) ?? templates[0];
  const strategy: ClientStrategy = {
    ...template.strategy,
    ...(input.primaryConversion ? { primaryConversion: input.primaryConversion } : {}),
    ...(input.audience ? { audience: input.audience } : {}),
  };

  const disabled = new Set<string>();
  if (input.hasProducts === false) disabled.add("products");
  if (input.hasProjects === false) disabled.add("projects");
  if (input.hasTeam === false) disabled.add("team");
  if (input.hasGallery === false) disabled.add("gallery");

  const composition: ClientComposition = {
    home: template.composition.home.filter((block) => !disabled.has(block.type)),
  };

  return { templateId: template.id, strategy, composition, rationale: template.rationale };
}
