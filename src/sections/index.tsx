import { clientConfig } from "@/config/client.config";
import { features } from "@/config/features";
import { services } from "@/data/services";
import { benefits } from "@/data/benefits";
import { stats } from "@/data/stats";
import { gallery } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import { faq } from "@/data/faq";
import {
  aboutRegistry,
  benefitsRegistry,
  contactRegistry,
  ctaRegistry,
  faqRegistry,
  footerRegistry,
  galleryRegistry,
  heroRegistry,
  servicesRegistry,
  statsRegistry,
  testimonialsRegistry,
} from "./registry";
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

/**
 * Typed slots. A page writes <ServicesSection /> and gets whichever variant the
 * client config names — feature flags are honoured here, so a page never has to
 * ask whether a block is enabled.
 */

export function HeroSection(props: HeroProps) {
  const Variant = heroRegistry[clientConfig.sections.hero];
  return <Variant {...props} />;
}

export function AboutSection(props: AboutProps) {
  const Variant = aboutRegistry[clientConfig.sections.about];
  return <Variant {...props} />;
}

export function ServicesSection(props: ServicesProps) {
  if (services.length === 0) return null;
  const Variant = servicesRegistry[clientConfig.sections.services];
  return <Variant {...props} />;
}

export function BenefitsSection(props: BenefitsProps) {
  if (!features.benefits || benefits.length === 0) return null;
  const Variant = benefitsRegistry[clientConfig.sections.benefits];
  return <Variant {...props} />;
}

export function StatsSection(props: StatsProps) {
  if (!features.stats || stats.length === 0) return null;
  const Variant = statsRegistry[clientConfig.sections.stats];
  return <Variant {...props} />;
}

export function GallerySection(props: GalleryProps) {
  if (!features.gallery || gallery.length === 0) return null;
  const Variant = galleryRegistry[clientConfig.sections.gallery];
  return <Variant {...props} />;
}

export function TestimonialsSection(props: TestimonialsProps) {
  if (!features.testimonials || testimonials.length === 0) return null;
  const Variant = testimonialsRegistry[clientConfig.sections.testimonials];
  return <Variant {...props} />;
}

export function FaqSection(props: FaqProps) {
  if (!features.faq || faq.length === 0) return null;
  const Variant = faqRegistry[clientConfig.sections.faq];
  return <Variant {...props} />;
}

export function CtaSection(props: CtaProps) {
  const Variant = ctaRegistry[clientConfig.sections.cta];
  return <Variant {...props} />;
}

export function ContactSection(props: ContactProps) {
  const Variant = contactRegistry[clientConfig.sections.contact];
  return <Variant {...props} />;
}

export function FooterSection(props: FooterProps) {
  const Variant = footerRegistry[clientConfig.sections.footer];
  return <Variant {...props} />;
}
