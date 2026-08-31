import { clientConfig } from "@/config/client.config";
import { features, pages } from "@/config/features";
import type { PageBlock } from "@/config/client.schema";
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
  galleryRegistry,
  heroRegistry,
  servicesRegistry,
  statsRegistry,
  testimonialsRegistry,
} from "@/sections/registry";
import { ProductHighlightsSection } from "@/sections/catalog/ProductHighlights";
import { ProjectHighlightsSection } from "@/sections/catalog/ProjectHighlights";
import { TeamHighlightsSection } from "@/sections/catalog/TeamHighlights";
import type { ComponentType } from "react";
import { clientBlockRegistry } from "@/client/blocks";

/**
 * Declarative page engine. `page.tsx` no longer owns the narrative. A client or
 * template can reorder, disable and override variants without touching page code.
 */
export function PageComposer({ blocks = clientConfig.composition.home }: { blocks?: PageBlock[] }) {
  return <>{blocks.map((block) => <BlockRenderer key={block.id} block={block} />)}</>;
}

type CommonProps = NonNullable<PageBlock["props"]> & { id?: string };
type LooseComponent = ComponentType<Record<string, unknown>>;

function renderVariant(registry: Record<string, unknown>, variant: string, props: CommonProps) {
  const Component = registry[variant] as LooseComponent | undefined;
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[NEXORA] Variante desconhecida: ${variant}`);
    }
    return null;
  }
  return <Component {...props} />;
}

export function BlockRenderer({ block }: { block: PageBlock }) {
  if (block.enabled === false) return null;
  const props: CommonProps = { id: block.id, ...(block.props ?? {}) };

  switch (block.type) {
    case "hero":
      return renderVariant(heroRegistry, block.variant ?? clientConfig.sections.hero, props);
    case "benefits":
      if (!features.benefits || benefits.length === 0) return null;
      return renderVariant(benefitsRegistry, block.variant ?? clientConfig.sections.benefits, props);
    case "services":
      if (!pages.services || services.length === 0) return null;
      return renderVariant(servicesRegistry, block.variant ?? clientConfig.sections.services, props);
    case "products":
      return <ProductHighlightsSection id={block.id} limit={block.props?.limit ?? 4} />;
    case "projects":
      return <ProjectHighlightsSection id={block.id} limit={block.props?.limit ?? 3} />;
    case "team":
      return <TeamHighlightsSection id={block.id} limit={block.props?.limit ?? 4} />;
    case "stats":
      if (!features.stats || stats.length === 0) return null;
      return renderVariant(statsRegistry, block.variant ?? clientConfig.sections.stats, props);
    case "about":
      return renderVariant(aboutRegistry, block.variant ?? clientConfig.sections.about, props);
    case "gallery":
      if (!features.gallery || gallery.length === 0) return null;
      return renderVariant(galleryRegistry, block.variant ?? clientConfig.sections.gallery, props);
    case "testimonials":
      if (!features.testimonials || testimonials.length === 0) return null;
      return renderVariant(testimonialsRegistry, block.variant ?? clientConfig.sections.testimonials, props);
    case "faq":
      if (!features.faq || faq.length === 0) return null;
      return renderVariant(faqRegistry, block.variant ?? clientConfig.sections.faq, props);
    case "cta":
      return renderVariant(ctaRegistry, block.variant ?? clientConfig.sections.cta, props);
    case "contact":
      return renderVariant(contactRegistry, block.variant ?? clientConfig.sections.contact, props);
    case "custom":
      return block.variant ? renderVariant(clientBlockRegistry, block.variant, props) : null;
  }
}
