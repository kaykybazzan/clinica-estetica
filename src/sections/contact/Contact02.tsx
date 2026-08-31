import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { clientConfig } from "@/config/client.config";
import { uiContent } from "@/data/ui";
import type { ContactProps } from "../types";

/** contact-02 — Dark band with the form lifted into a light card. */
export function Contact02({ id = "contato", eyebrow, title, lead, presetService }: ContactProps) {
  return (
    <Section id={id} tone="dark" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="nx-grid-texture absolute inset-0 -z-10" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
          <Reveal effect="fade-right">
            <SectionHeader
              eyebrow={eyebrow ?? "Contato"}
              title={title ?? "Vamos resolver isso"}
              lead={lead ?? "Conte o que está acontecendo. Retornamos com o próximo passo e o prazo."}
              tone="dark"
            />
            <ContactChannels onDark className="mt-9" />
            <div className="mt-9 max-w-xs">
              <h3 className="font-heading text-h4 font-semibold text-on-dark">Horários</h3>
              <BusinessHoursList onDark className="mt-4" />
            </div>
            <SocialLinks onDark className="mt-8" />
          </Reveal>

          <Reveal effect="fade-left">
            <Card className="bg-bg">
              {clientConfig.features.contactForm ? (
                <ContactForm presetService={presetService} />
              ) : (
                <div>
                  <h3 className="font-heading text-h3 font-semibold">Fale diretamente com a equipe</h3>
                  <p className="mt-2 text-sm text-fg-soft">{uiContent.contact.whatsappHelp}</p>
                  <WhatsAppButton fullWidth size="lg" className="mt-6" source="contact-02">
                    Abrir WhatsApp
                  </WhatsAppButton>
                </div>
              )}
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
