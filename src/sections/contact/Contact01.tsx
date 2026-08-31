import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { clientConfig } from "@/config/client.config";
import type { ContactProps } from "../types";

/** contact-01 — Form beside the practical details. The default for local business. */
export function Contact01({ id = "contato", eyebrow, title, lead, presetService }: ContactProps) {
  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Contato"}
          title={title ?? "Fale com a gente"}
          lead={lead ?? "Responda o formulário ou chame no WhatsApp. As duas vias chegam à mesma equipe."}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal effect="fade-right">
            {clientConfig.features.contactForm ? (
              <ContactForm presetService={presetService} />
            ) : (
              <ContactChannels />
            )}
          </Reveal>

          <Reveal effect="fade-left" className="flex flex-col gap-8">
            {clientConfig.features.contactForm && <ContactChannels />}
            <div>
              <h3 className="font-heading text-h4 font-semibold">Horários</h3>
              <BusinessHoursList className="mt-4" />
            </div>
            <MapEmbed />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
