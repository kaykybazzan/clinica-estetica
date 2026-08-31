import type { ComponentType } from "react";
import { AtelierHero } from "./AtelierHero";
import { EditorialManifesto } from "./EditorialManifesto";
import { TreatmentAtlas } from "./TreatmentAtlas";
import { CareRitual } from "./CareRitual";
import { EditorialContact } from "./EditorialContact";

export const clientBlockRegistry: Record<string, ComponentType<Record<string, unknown>>> = {
  "atelier-hero": AtelierHero,
  "editorial-manifesto": EditorialManifesto,
  "treatment-atlas": TreatmentAtlas,
  "care-ritual": CareRitual,
  "editorial-contact": EditorialContact,
};
