import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { clientConfig } from "@/config/client.config";
import { companyContent } from "@/data/company";
import { formatFullAddress, telHref } from "@/utils/format";
import type { HeroProps } from "../types";

/** hero-10 — Local-business hero with action card above the fold. */
export function Hero10({ id = "inicio", eyebrow, title, subtitle }: HeroProps) {
  return (
    <Section id={id} tone="surface" flush className="border-b border-line py-14 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
          <Reveal effect="fade-right">
            <Eyebrow>{eyebrow ?? `${clientConfig.address.city} · ${companyContent.eyebrow}`}</Eyebrow>
            <Heading level={1} size="display" className="mt-4 max-w-[14ch]">{title ?? companyContent.headline}</Heading>
            <Lead className="mt-5 max-w-2xl">{subtitle ?? companyContent.subheadline}</Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" source="hero-10" context={{ kind: "quote" }}>Pedir informação</WhatsAppButton>
              {clientConfig.contact.phone && <Button href={telHref(clientConfig.contact.phone)} size="lg" variant="outline" icon="phone">Ligar agora</Button>}
            </div>
          </Reveal>
          <Reveal effect="fade-left">
            <Card className="border-primary/20 bg-bg">
              <p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Atendimento</p>
              <p className="mt-3 font-heading text-h3 font-semibold">Perto de você, com contato direto.</p>
              <div className="mt-6 grid gap-4 text-sm">
                <div className="flex gap-3"><Icon name="mapPin" className="mt-0.5 shrink-0 text-primary" size={18} /><span>{formatFullAddress(clientConfig.address)}</span></div>
                <div className="flex gap-3"><Icon name="whatsapp" className="mt-0.5 shrink-0 text-primary" size={18} /><span>WhatsApp {clientConfig.contact.whatsapp}</span></div>
                <div className="flex gap-3"><Icon name="mail" className="mt-0.5 shrink-0 text-primary" size={18} /><span className="break-all">{clientConfig.contact.email}</span></div>
              </div>
              <Button href="/contato" fullWidth variant="secondary" icon="arrowRight" className="mt-7">Todos os canais</Button>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
