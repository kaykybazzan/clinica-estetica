/**
 * @deprecated Compatibility façade for v2 imports.
 * New code must import from `@/forms/validation`.
 */
export {
  detectSpam,
  formatPhoneBR,
  normalizeLead as normalizeContactForm,
  validateLead as validateContactForm,
} from "@/forms/validation";

export type { FieldErrors, LeadPayload as ContactFormValues } from "@/forms/types";
