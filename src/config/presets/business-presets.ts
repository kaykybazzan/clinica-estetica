import presets from "./business-presets.json";

export interface BusinessPreset {
  id: string;
  label: string;
  template: string;
  businessType: string;
  /** Optional visual recommendation that overrides the template default. */
  designPreset?: string;
}

export const businessPresets = presets as BusinessPreset[];
export const businessPresetIds = businessPresets.map((item) => item.id);

export function getBusinessPreset(id: string): BusinessPreset | undefined {
  return businessPresets.find((item) => item.id === id);
}
