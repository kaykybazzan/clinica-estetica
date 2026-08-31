export type LeadScalar = string | boolean | number;
export type LeadPayload = Record<string, LeadScalar | undefined> & {
  consent?: boolean;
  website?: string;
  renderedAt?: number;
};

export type FieldErrors = Record<string, string>;

export interface LeadFieldDefinition {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  options?: string[];
  source?: "services";
  fullWidth?: boolean;
}
