import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ContactSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { clientConfig } from "@/config/client.config";
import { formatFullAddress } from "@/utils/format";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Contato",
  description: `Endereço, horários e canais de atendimento da ${clientConfig.company.name}. ${formatFullAddress(clientConfig.address)}`,
  path: "/contato",
});

export default function ContactPage() {
  if (!isPageEnabled("contact")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Contato"
        title="Fale com a gente"
        lead={uiContent.pages.contactLead}
        trail={[{ label: "Contato", href: "/contato" }]}
      />
      <ContactSection eyebrow="" title="Envie sua mensagem" />
    </PageWrapper>
  );
}
