import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { BusinessHoursList } from "@/components/ui/ContactChannels";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { clientConfig } from "@/config/client.config";
import { uiContent } from "@/data/ui";
import { mapsDirectionsHref } from "@/integrations/maps";
import { formatFullAddress, telHref } from "@/utils/format";
import type { ContactProps } from "../types";

/**
 * contact-04 — Channel-first, no form. The right choice for clients who answer
 * on WhatsApp and would leave a form inbox unread.
 */
export function Contact04({ id = "contato", eyebrow, title, lead }: ContactProps) {
  const { contact, address } = clientConfig;

  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow ?? "Contato"}
          title={title ?? "Escolha o canal mais rápido para você"}
          lead={lead ?? "Todos chegam à mesma equipe. O WhatsApp costuma responder primeiro."}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <Card className="flex h-full flex-col">
              <Icon name="whatsapp" size={28} className="text-primary" />
              <h3 className="mt-4 font-heading text-h4 font-semibold">WhatsApp</h3>
              <p className="mt-2 flex-1 text-sm text-fg-soft">
                {uiContent.contact.whatsappHelp}
              </p>
              <WhatsAppButton fullWidth className="mt-5" source="contact-04" />
            </Card>
          </Reveal>

          <Reveal index={1}>
            <Card className="flex h-full flex-col">
              <Icon name="phone" size={28} className="text-primary" />
              <h3 className="mt-4 font-heading text-h4 font-semibold">Telefone e e-mail</h3>
              <p className="mt-2 flex-1 text-sm text-fg-soft">
                {uiContent.contact.formalChannels}
              </p>
              {contact.phone && (
                <Button href={telHref(contact.phone)} fullWidth variant="outline" className="mt-5">
                  {contact.phone}
                </Button>
              )}
              <Button href={`mailto:${contact.email}`} fullWidth variant="ghost" className="mt-2">
                {contact.email}
              </Button>
            </Card>
          </Reveal>

          <Reveal index={2}>
            <Card className="flex h-full flex-col">
              <Icon name="mapPin" size={28} className="text-primary" />
              <h3 className="mt-4 font-heading text-h4 font-semibold">Visite a unidade</h3>
              <p className="mt-2 flex-1 text-sm text-fg-soft">{formatFullAddress(address)}</p>
              <Button href={mapsDirectionsHref()} fullWidth variant="outline" icon="arrowUpRight" className="mt-5">
                Traçar rota
              </Button>
            </Card>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
          <div>
            <h3 className="font-heading text-h4 font-semibold">Horários</h3>
            <BusinessHoursList className="mt-4" />
          </div>
          <MapEmbed ratio="aspect-[16/9]" />
        </div>
      </Container>
    </Section>
  );
}
