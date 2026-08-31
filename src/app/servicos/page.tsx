import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Services01 } from "@/sections/services/Services01";
import { CtaSection, FaqSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { services } from "@/data/services";
import { clientConfig } from "@/config/client.config";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Serviços",
  description: `Conheça os serviços da ${clientConfig.company.name}: escopo, o que está incluso e como solicitar orçamento.`,
  path: "/servicos",
  keywords: services.map((service) => service.title),
});

export default function ServicesPage() {
  if (!isPageEnabled("services")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="O que fazemos"
        title="Serviços"
        lead={uiContent.pages.servicesLead}
        trail={[{ label: "Serviços", href: "/servicos" }]}
      />

      {/* The catalogue page always uses the grid variant: it lists everything,
          while the home page shows whichever variant the client picked. */}
      <Services01 limit={services.length} title="Catálogo completo" eyebrow="Todos os serviços" lead="" />

      <FaqSection limit={4} />
      <CtaSection />
    </PageWrapper>
  );
}
