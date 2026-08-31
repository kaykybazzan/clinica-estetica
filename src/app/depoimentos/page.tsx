import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Testimonials04 } from "@/sections/testimonials/Testimonials04";
import { CtaSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Depoimentos",
  description: uiContent.pages.testimonialsDescription,
  path: "/depoimentos",
});

export default function TestimonialsPage() {
  if (!isPageEnabled("testimonials")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Prova social"
        title="Depoimentos"
        lead={uiContent.pages.testimonialsLead}
        trail={[{ label: "Depoimentos", href: "/depoimentos" }]}
      />
      <Testimonials04 title="Todas as avaliações" eyebrow="" />
      <CtaSection />
    </PageWrapper>
  );
}
