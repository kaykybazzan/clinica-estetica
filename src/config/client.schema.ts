import { z } from "zod";

/**
 * NEXORA WEBSITE PLATFORM v3
 * --------------------------
 * Source of truth for client configuration. The schema intentionally keeps the
 * client file declarative: business data, strategy, design DNA and page
 * composition live here; reusable implementation stays inside the platform.
 */

const hexColor = z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Use uma cor hexadecimal, ex.: #1B4FE0");
const required = (label: string) => z.string().trim().min(1, `${label} é obrigatório`);
const optionalUrl = z.url().or(z.literal("")).default("");
const timeString = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use o formato HH:MM");

export const companySchema = z.object({
  name: required("Nome fantasia"),
  legalName: z.string().trim().default(""),
  slogan: z.string().trim().default(""),
  description: required("Descrição").max(320),
  foundedYear: z.number().int().min(1800).max(2100).optional(),
  cnpj: z.string().trim().regex(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})?$/, "CNPJ deve estar no formato 00.000.000/0000-00").default(""),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"]).default("$$"),
});

export const contactSchema = z.object({
  phone: z.string().trim().default(""),
  whatsapp: z
    .string()
    .refine((v) => v === "" || /^\d{12,13}$/.test(v), "WhatsApp deve estar vazio ou ter DDI+DDD+número, apenas dígitos"),
  email: z.email("E-mail inválido"),
  formRecipient: z.email().optional(),
});

export const addressSchema = z.object({
  street: z.string().trim().default(""),
  number: z.string().trim().default(""),
  complement: z.string().trim().default(""),
  district: z.string().trim().default(""),
  city: required("Cidade"),
  state: z.string().trim().length(2, "UF deve ter 2 letras"),
  zipCode: z.string().trim().regex(/^(\d{5}-\d{3})?$/, "CEP no formato 00000-000").default(""),
  country: z.string().trim().default("BR"),
  geo: z.object({ latitude: z.number(), longitude: z.number() }).optional(),
  serviceAreas: z.array(z.string().trim()).default([]),
  mapsEmbedQuery: z.string().trim().default(""),
});

export const socialSchema = z.object({
  instagram: optionalUrl,
  facebook: optionalUrl,
  linkedin: optionalUrl,
  youtube: optionalUrl,
  tiktok: optionalUrl,
  googleBusiness: optionalUrl,
});

const dayHoursSchema = z.object({
  opens: timeString.optional(),
  closes: timeString.optional(),
  closed: z.boolean().default(false),
});

export const businessHoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema,
  note: z.string().trim().default(""),
});

const geometrySchema = z.object({
  cardStyle: z.enum(["flat", "outlined", "elevated", "glass"]).default("outlined"),
  borderWidth: z.number().min(0).max(3).default(1),
  buttonRadius: z.enum(["brand", "square", "pill"]).default("brand"),
  imageRadius: z.enum(["none", "soft", "brand", "large"]).default("brand"),
}).partial();

const layoutDesignSchema = z.object({
  container: z.enum(["narrow", "default", "wide"]).default("default"),
  gridStyle: z.enum(["classic", "editorial", "technical", "asymmetric"]).default("classic"),
  sectionContrast: z.enum(["low", "medium", "high"]).default("medium"),
}).partial();

const imagerySchema = z.object({
  treatment: z.enum(["natural", "high-contrast", "soft", "editorial", "monochrome"]).default("natural"),
  preferredRatio: z.enum(["landscape", "portrait", "square", "mixed"]).default("mixed"),
  overlayStrength: z.enum(["none", "soft", "medium", "strong"]).default("soft"),
}).partial();

const elevationSchema = z.object({
  cards: z.enum(["none", "soft", "lift"]).default("soft"),
  header: z.enum(["flat", "subtle", "floating"]).default("subtle"),
}).partial();

const motionSchema = z.object({
  intensity: z.enum(["none", "subtle", "regular", "expressive"]).default("subtle"),
  reveal: z.enum(["none", "fade", "fade-up", "scale"]).default("fade-up"),
  speed: z.enum(["fast", "regular", "slow"]).default("regular"),
}).partial();

const backgroundSchema = z.object({
  style: z.enum(["clean", "gradient", "grid", "noise", "editorial"]).default("clean"),
}).partial();

export const designSchema = z.object({
  primaryColor: hexColor,
  primaryContrast: hexColor.default("#FFFFFF"),
  secondaryColor: hexColor,
  accentColor: hexColor,
  backgroundColor: hexColor.default("#FFFFFF"),
  surfaceColor: hexColor.default("#F4F7FB"),
  foregroundColor: hexColor.default("#0B1220"),
  mutedColor: hexColor.default("#5B6577"),
  borderColor: hexColor.default("#E3E8F0"),
  headingFont: z.string().trim().default("Sora"),
  bodyFont: z.string().trim().default("Inter"),
  fontProvider: z.enum(["google", "system"]).default("google"),
  radius: z.number().int().min(0).max(32).default(14),
  density: z.enum(["compact", "regular", "spacious"]).default("regular"),
  archetype: z.enum(["corporate", "industrial", "editorial", "luxury", "minimal", "playful", "organic", "tech", "bold", "traditional", "premium-local", "catalog-first"]).optional(),
  geometry: geometrySchema.optional(),
  layout: layoutDesignSchema.optional(),
  imagery: imagerySchema.optional(),
  elevation: elevationSchema.optional(),
  motion: motionSchema.optional(),
  backgrounds: backgroundSchema.optional(),
});

export const sectionsSchema = z.object({
  hero: z.enum(["hero-01", "hero-02", "hero-03", "hero-04", "hero-05", "hero-06", "hero-07", "hero-08", "hero-09", "hero-10"]),
  about: z.enum(["about-01", "about-02", "about-03", "about-04", "about-05", "about-06"]),
  services: z.enum(["services-01", "services-02", "services-03", "services-04", "services-05", "services-06", "services-07", "services-08"]),
  benefits: z.enum(["benefits-01", "benefits-02", "benefits-03", "benefits-04", "benefits-05", "benefits-06"]),
  stats: z.enum(["stats-01", "stats-02", "stats-03", "stats-04", "stats-05"]),
  gallery: z.enum(["gallery-01", "gallery-02", "gallery-03", "gallery-04", "gallery-05", "gallery-06"]),
  testimonials: z.enum(["testimonials-01", "testimonials-02", "testimonials-03", "testimonials-04", "testimonials-05", "testimonials-06"]),
  faq: z.enum(["faq-01", "faq-02", "faq-03", "faq-04", "faq-05"]),
  cta: z.enum(["cta-01", "cta-02", "cta-03", "cta-04", "cta-05", "cta-06", "cta-07"]),
  contact: z.enum(["contact-01", "contact-02", "contact-03", "contact-04", "contact-05", "contact-06"]),
  footer: z.enum(["footer-01", "footer-02", "footer-03", "footer-04", "footer-05", "footer-06"]),
});

export const featuresSchema = z.object({
  whatsappFloating: z.boolean().default(true),
  contactForm: z.boolean().default(true),
  maps: z.boolean().default(true),
  testimonials: z.boolean().default(true),
  gallery: z.boolean().default(true),
  projects: z.boolean().default(false),
  products: z.boolean().default(false),
  team: z.boolean().default(false),
  faq: z.boolean().default(true),
  stats: z.boolean().default(true),
  benefits: z.boolean().default(true),
  cookieBanner: z.boolean().default(true),
  backToTop: z.boolean().default(true),
  animations: z.boolean().default(true),
  announcementBar: z.boolean().default(false),
  catalogSearch: z.boolean().default(false),
  catalogFilters: z.boolean().default(false),
  catalogBrands: z.boolean().default(false),
  mobileConversionBar: z.boolean().default(true),
});

export const pagesSchema = z.object({
  about: z.boolean().default(true),
  services: z.boolean().default(true),
  products: z.boolean().default(false),
  projects: z.boolean().default(false),
  gallery: z.boolean().default(true),
  testimonials: z.boolean().default(true),
  faq: z.boolean().default(true),
  contact: z.boolean().default(true),
});

export const strategySchema = z.object({
  primaryConversion: z.enum(["whatsapp", "phone", "form", "booking", "catalog", "visit"]),
  audience: z.enum(["b2c", "b2b", "mixed"]),
  urgency: z.enum(["low", "medium", "high"]),
  salesCycle: z.enum(["short", "medium", "long"]),
  localSeoImportance: z.enum(["low", "medium", "high", "critical"]),
  visualImportance: z.enum(["low", "medium", "high", "critical"]),
  trustImportance: z.enum(["low", "medium", "high", "critical"]),
  technicalProofImportance: z.enum(["low", "medium", "high", "critical"]),
  notes: z.array(z.string()).default([]),
});

const blockType = z.enum(["hero", "benefits", "services", "products", "projects", "team", "stats", "about", "gallery", "testimonials", "faq", "cta", "contact", "custom"]);

export const pageBlockSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  type: blockType,
  enabled: z.boolean().optional(),
  variant: z.string().optional(),
  props: z.object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    subtitle: z.string().optional(),
    limit: z.number().int().min(1).max(30).optional(),
    service: z.string().optional(),
    presetService: z.string().optional(),
  }).optional(),
});

export const compositionSchema = z.object({
  home: z.array(pageBlockSchema).min(3).max(30),
});

export const mobileConversionSchema = z.object({
  enabled: z.boolean().default(true),
  actions: z.array(z.enum(["whatsapp", "phone", "directions", "contact", "catalog"])).min(1).max(3),
});

const formFieldSchema = z.object({
  name: z.string().regex(/^[a-z][a-zA-Z0-9_]*$/),
  label: z.string().min(1),
  type: z.enum(["text", "email", "tel", "textarea", "select"]),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  hint: z.string().optional(),
  minLength: z.number().int().min(0).max(5000).optional(),
  maxLength: z.number().int().min(1).max(10000).optional(),
  options: z.array(z.string()).optional(),
  source: z.enum(["services"]).optional(),
  fullWidth: z.boolean().optional(),
});

export const formsSchema = z.object({
  contact: z.object({
    enabled: z.boolean().default(true),
    delivery: z.array(z.enum(["resend", "webhook", "hubspot", "pipedrive", "rdstation"])).default(["resend", "webhook"]),
    maxBodyBytes: z.number().int().min(4096).max(131072).default(32768),
    rateLimit: z.object({ requests: z.number().int().min(1).max(30).default(5), windowSeconds: z.number().int().min(10).max(3600).default(60) }).optional(),
    fields: z.array(formFieldSchema).min(1).max(20).optional(),
  }).optional(),
}).optional();

export const seoSchema = z.object({
  siteUrl: z.url("siteUrl precisa ser absoluta, ex.: https://cliente.com.br"),
  titleTemplate: z.string().includes("%s", { message: "titleTemplate precisa conter %s" }).default("%s | %n"),
  defaultTitle: required("Título padrão").max(70),
  description: required("Meta description").max(170),
  keywords: z.array(z.string().trim()).default([]),
  locale: z.string().default("pt_BR"),
  ogImage: z.string().default("/og/default.jpg"),
  twitterHandle: z.string().default(""),
  businessType: z.enum(["LocalBusiness", "PetStore", "VeterinaryCare", "Restaurant", "FoodEstablishment", "AutoRepair", "LegalService", "ProfessionalService", "AccountingService", "RealEstateAgent", "MedicalClinic", "MedicalBusiness", "Dentist", "HealthAndBeautyBusiness", "HairSalon", "BeautySalon", "HomeAndConstructionBusiness", "ElectronicsStore"]).default("LocalBusiness"),
  verification: z.object({ google: z.string().default(""), bing: z.string().default("") }).default({ google: "", bing: "" }),
});

export const legalSchema = z.object({
  controllerName: z.string().trim().default(""),
  dpoEmail: z.email().or(z.literal("")).default(""),
  lastReviewed: z.string().trim().default(""),
});

export const clientConfigSchema = z.object({
  platformVersion: z.string().default("3.0.0"),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug deve ser kebab-case"),
  segment: z.string().trim().default("local-business"),
  company: companySchema,
  contact: contactSchema,
  address: addressSchema,
  social: socialSchema,
  businessHours: businessHoursSchema,
  strategy: strategySchema,
  design: designSchema,
  sections: sectionsSchema,
  composition: compositionSchema,
  features: featuresSchema,
  pages: pagesSchema,
  mobileConversion: mobileConversionSchema,
  forms: formsSchema,
  seo: seoSchema,
  legal: legalSchema,
});

export type ClientConfig = z.infer<typeof clientConfigSchema>;
export type ClientDesign = z.infer<typeof designSchema>;
export type ClientSections = z.infer<typeof sectionsSchema>;
export type ClientFeatures = z.infer<typeof featuresSchema>;
export type ClientPages = z.infer<typeof pagesSchema>;
export type ClientStrategy = z.infer<typeof strategySchema>;
export type PageBlock = z.infer<typeof pageBlockSchema>;
export type ClientComposition = z.infer<typeof compositionSchema>;
export type BusinessHours = z.infer<typeof businessHoursSchema>;
export type DayHours = z.infer<typeof dayHoursSchema>;
export type WeekdayKey = Exclude<keyof BusinessHours, "note">;
