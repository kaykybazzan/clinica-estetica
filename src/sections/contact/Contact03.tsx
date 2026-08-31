import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { uiContent } from "@/data/ui";
import { clientConfig } from "@/config/client.config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ContactProps } from "../types";

/** contact-03 — Map leads the section; useful when foot traffic is the goal. */
export function Contact03({ id = "contato", eyebrow, title, lead, presetService }: ContactProps) {
  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Contato"}
          title={title ?? "Onde estamos"}
          lead={lead ?? uiContent.contact.mapLead}
          align="center"
          className="mx-auto"
        />

        <Reveal className="mt-10">
          <MapEmbed ratio="aspect-[21/9]" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal effect="fade-right" className="flex flex-col gap-8">
            <ContactChannels />
            <div>
              <h3 className="font-heading text-h4 font-semibold">Horários</h3>
              <BusinessHoursList className="mt-4" />
            </div>
          </Reveal>

          <Reveal effect="fade-left" className="rounded-[var(--radius-brand-lg)] border border-line bg-bg p-7 sm:p-9">
            {clientConfig.features.contactForm ? (
              <ContactForm presetService={presetService} />
            ) : (
              <div>
                <h3 className="font-heading text-h3 font-semibold">Prefere atendimento direto?</h3>
                <p className="mt-2 text-fg-soft">{uiContent.contact.whatsappHelp}</p>
                <WhatsAppButton fullWidth size="lg" className="mt-6" source="contact-03">
                  Conversar no WhatsApp
                </WhatsAppButton>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
