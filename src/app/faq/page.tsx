import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Faq02 } from "@/sections/faq/Faq02";
import { CtaSection } from "@/sections";
import { JsonLd } from "@/seo/JsonLd";
import { faqSchema } from "@/seo/schema";
import { buildMetadata } from "@/seo/metadata";
import { faq } from "@/data/faq";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Perguntas frequentes",
  description: uiContent.pages.faqDescription,
  path: "/faq",
});

export default function FaqPage() {
  if (!isPageEnabled("faq")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Dúvidas"
        title="Perguntas frequentes"
        lead={uiContent.pages.faqLead}
        trail={[{ label: "Dúvidas", href: "/faq" }]}
      />

      <Faq02 title="Tudo o que costumam perguntar" eyebrow="" limit={faq.length} />
      <CtaSection />

      {/* FAQPage markup lives on this URL only — the home FAQ block stays plain
          HTML so Google never sees the same questions marked up twice. */}
      <JsonLd data={faqSchema(faq)} id="nx-faq" />
    </PageWrapper>
  );
}
