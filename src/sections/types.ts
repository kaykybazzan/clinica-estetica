import type { Benefit, FaqItem, GalleryItem, MediaAsset, Service, Stat, Testimonial } from "@/types/content";

/** Shared by every section: an anchor id so menus and CTAs can target it. */
export interface BaseSectionProps {
  id?: string;
}

export interface HeroProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: MediaAsset;
  secondaryImage?: MediaAsset;
}

export interface AboutProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  paragraphs?: readonly string[];
  image?: MediaAsset;
  secondaryImage?: MediaAsset;
  highlights?: readonly string[];
}

export interface ServicesProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: Service[];
  /** Caps the list on the home page without touching the data file. */
  limit?: number;
}

export interface BenefitsProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: Benefit[];
}

export interface StatsProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  items?: Stat[];
}

export interface GalleryProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: GalleryItem[];
  limit?: number;
}

export interface TestimonialsProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: Testimonial[];
}

export interface FaqProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  items?: FaqItem[];
  limit?: number;
}

export interface CtaProps extends BaseSectionProps {
  title?: string;
  text?: string;
  /** Context passed to the WhatsApp message builder. */
  service?: string;
}

export interface ContactProps extends BaseSectionProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  presetService?: string;
}

export type FooterProps = BaseSectionProps;
