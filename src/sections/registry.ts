import type { ComponentType } from "react";
import type { ClientSections } from "@/config/client.schema";
import type {
  AboutProps,
  BenefitsProps,
  ContactProps,
  CtaProps,
  FaqProps,
  FooterProps,
  GalleryProps,
  HeroProps,
  ServicesProps,
  StatsProps,
  TestimonialsProps,
} from "./types";

import { Hero01 } from "./hero/Hero01";
import { Hero02 } from "./hero/Hero02";
import { Hero03 } from "./hero/Hero03";
import { Hero04 } from "./hero/Hero04";
import { Hero05 } from "./hero/Hero05";
import { Hero06 } from "./hero/Hero06";
import { Hero07 } from "./hero/Hero07";
import { Hero08 } from "./hero/Hero08";
import { Hero09 } from "./hero/Hero09";
import { Hero10 } from "./hero/Hero10";

import { About01 } from "./about/About01";
import { About02 } from "./about/About02";
import { About03 } from "./about/About03";
import { About04 } from "./about/About04";
import { About05 } from "./about/About05";
import { About06 } from "./about/About06";

import { Services01 } from "./services/Services01";
import { Services02 } from "./services/Services02";
import { Services03 } from "./services/Services03";
import { Services04 } from "./services/Services04";
import { Services05 } from "./services/Services05";
import { Services06 } from "./services/Services06";
import { Services07 } from "./services/Services07";
import { Services08 } from "./services/Services08";

import { Benefits01 } from "./benefits/Benefits01";
import { Benefits02 } from "./benefits/Benefits02";
import { Benefits03 } from "./benefits/Benefits03";
import { Benefits04 } from "./benefits/Benefits04";
import { Benefits05 } from "./benefits/Benefits05";
import { Benefits06 } from "./benefits/Benefits06";

import { Stats01 } from "./stats/Stats01";
import { Stats02 } from "./stats/Stats02";
import { Stats03 } from "./stats/Stats03";
import { Stats04 } from "./stats/Stats04";
import { Stats05 } from "./stats/Stats05";

import { Gallery01 } from "./gallery/Gallery01";
import { Gallery02 } from "./gallery/Gallery02";
import { Gallery03 } from "./gallery/Gallery03";
import { Gallery04 } from "./gallery/Gallery04";
import { Gallery05 } from "./gallery/Gallery05";
import { Gallery06 } from "./gallery/Gallery06";

import { Testimonials01 } from "./testimonials/Testimonials01";
import { Testimonials02 } from "./testimonials/Testimonials02";
import { Testimonials03 } from "./testimonials/Testimonials03";
import { Testimonials04 } from "./testimonials/Testimonials04";
import { Testimonials05 } from "./testimonials/Testimonials05";
import { Testimonials06 } from "./testimonials/Testimonials06";

import { Faq01 } from "./faq/Faq01";
import { Faq02 } from "./faq/Faq02";
import { Faq03 } from "./faq/Faq03";
import { Faq04 } from "./faq/Faq04";
import { Faq05 } from "./faq/Faq05";

import { Cta01 } from "./cta/Cta01";
import { Cta02 } from "./cta/Cta02";
import { Cta03 } from "./cta/Cta03";
import { Cta04 } from "./cta/Cta04";
import { Cta05 } from "./cta/Cta05";
import { Cta06 } from "./cta/Cta06";
import { Cta07 } from "./cta/Cta07";

import { Contact01 } from "./contact/Contact01";
import { Contact02 } from "./contact/Contact02";
import { Contact03 } from "./contact/Contact03";
import { Contact04 } from "./contact/Contact04";
import { Contact05 } from "./contact/Contact05";
import { Contact06 } from "./contact/Contact06";

import { Footer01 } from "./footer/Footer01";
import { Footer02 } from "./footer/Footer02";
import { Footer03 } from "./footer/Footer03";
import { Footer04 } from "./footer/Footer04";
import { Footer05 } from "./footer/Footer05";
import { Footer06 } from "./footer/Footer06";

/**
 * Variant lookup tables. Selecting a section is a map read, never a chain of
 * conditionals, so adding a variant means adding one line here plus the file.
 *
 * All variants are Server Components unless they need state, which is why a
 * static registry costs nothing in client JavaScript: React Server Components
 * that are never rendered are never serialized to the browser.
 */
export const heroRegistry: Record<ClientSections["hero"], ComponentType<HeroProps>> = {
  "hero-01": Hero01,
  "hero-02": Hero02,
  "hero-03": Hero03,
  "hero-04": Hero04,
  "hero-05": Hero05,
  "hero-06": Hero06,
  "hero-07": Hero07,
  "hero-08": Hero08,
  "hero-09": Hero09,
  "hero-10": Hero10,
};

export const aboutRegistry: Record<ClientSections["about"], ComponentType<AboutProps>> = {
  "about-01": About01,
  "about-02": About02,
  "about-03": About03,
  "about-04": About04,
  "about-05": About05,
  "about-06": About06,
};

export const servicesRegistry: Record<ClientSections["services"], ComponentType<ServicesProps>> = {
  "services-01": Services01,
  "services-02": Services02,
  "services-03": Services03,
  "services-04": Services04,
  "services-05": Services05,
  "services-06": Services06,
  "services-07": Services07,
  "services-08": Services08,
};

export const benefitsRegistry: Record<ClientSections["benefits"], ComponentType<BenefitsProps>> = {
  "benefits-01": Benefits01,
  "benefits-02": Benefits02,
  "benefits-03": Benefits03,
  "benefits-04": Benefits04,
  "benefits-05": Benefits05,
  "benefits-06": Benefits06,
};

export const statsRegistry: Record<ClientSections["stats"], ComponentType<StatsProps>> = {
  "stats-01": Stats01,
  "stats-02": Stats02,
  "stats-03": Stats03,
  "stats-04": Stats04,
  "stats-05": Stats05,
};

export const galleryRegistry: Record<ClientSections["gallery"], ComponentType<GalleryProps>> = {
  "gallery-01": Gallery01,
  "gallery-02": Gallery02,
  "gallery-03": Gallery03,
  "gallery-04": Gallery04,
  "gallery-05": Gallery05,
  "gallery-06": Gallery06,
};

export const testimonialsRegistry: Record<
  ClientSections["testimonials"],
  ComponentType<TestimonialsProps>
> = {
  "testimonials-01": Testimonials01,
  "testimonials-02": Testimonials02,
  "testimonials-03": Testimonials03,
  "testimonials-04": Testimonials04,
  "testimonials-05": Testimonials05,
  "testimonials-06": Testimonials06,
};

export const faqRegistry: Record<ClientSections["faq"], ComponentType<FaqProps>> = {
  "faq-01": Faq01,
  "faq-02": Faq02,
  "faq-03": Faq03,
  "faq-04": Faq04,
  "faq-05": Faq05,
};

export const ctaRegistry: Record<ClientSections["cta"], ComponentType<CtaProps>> = {
  "cta-01": Cta01,
  "cta-02": Cta02,
  "cta-03": Cta03,
  "cta-04": Cta04,
  "cta-05": Cta05,
  "cta-06": Cta06,
  "cta-07": Cta07,
};

export const contactRegistry: Record<ClientSections["contact"], ComponentType<ContactProps>> = {
  "contact-01": Contact01,
  "contact-02": Contact02,
  "contact-03": Contact03,
  "contact-04": Contact04,
  "contact-05": Contact05,
  "contact-06": Contact06,
};

export const footerRegistry: Record<ClientSections["footer"], ComponentType<FooterProps>> = {
  "footer-01": Footer01,
  "footer-02": Footer02,
  "footer-03": Footer03,
  "footer-04": Footer04,
  "footer-05": Footer05,
  "footer-06": Footer06,
};

/** Every variant id, grouped by family — powers /dev/components. */
export const sectionCatalog = {
  hero: heroRegistry,
  about: aboutRegistry,
  services: servicesRegistry,
  benefits: benefitsRegistry,
  stats: statsRegistry,
  gallery: galleryRegistry,
  testimonials: testimonialsRegistry,
  faq: faqRegistry,
  cta: ctaRegistry,
  contact: contactRegistry,
  footer: footerRegistry,
} as const;
