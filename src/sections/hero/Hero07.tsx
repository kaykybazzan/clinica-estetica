import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import type { HeroProps } from "../types";

/** hero-07 — Editorial split with oversized typography and portrait media. */
export function Hero07({ id = "inicio", eyebrow, title, subtitle, image }: HeroProps) {
  const asset = image ?? { src: "/images/hero/principal.jpg", alt: `Atendimento da ${clientConfig.company.name}`, width: 1920, height: 1280 };
  return (
    <Section id={id} flush className="overflow-hidden border-b border-line">
      <Container className="grid min-h-[78svh] items-center gap-10 py-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:py-20">
        <Reveal effect="fade-right" className="max-w-3xl">
          <Eyebrow>{eyebrow ?? companyContent.eyebrow}</Eyebrow>
          <Heading level={1} size="display" className="mt-5 max-w-[13ch]">
            {title ?? companyContent.headline}
          </Heading>
          <Lead className="mt-6 max-w-2xl">{subtitle ?? companyContent.subheadline}</Lead>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" source="hero-07" context={{ kind: "quote" }}>Falar com a equipe</WhatsAppButton>
            <Button href="/sobre" size="lg" variant="outline" icon="arrowRight">Conhecer a empresa</Button>
          </div>
          <div className="mt-10 grid max-w-2xl gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <p className="text-sm text-fg-soft"><strong className="block text-fg">{clientConfig.address.city}, {clientConfig.address.state}</strong>Atendimento local e regional.</p>
            <p className="text-sm text-fg-soft"><strong className="block text-fg">Contato direto</strong>Sem etapas desnecessárias para pedir informação.</p>
          </div>
        </Reveal>
        <Reveal effect="fade-left" className="lg:justify-self-end">
          <SmartImage asset={asset} ratio="3/4" priority sizes="(max-width: 1024px) 100vw, 42vw" className="max-h-[720px] rounded-[var(--nx-image-radius)]" />
        </Reveal>
      </Container>
    </Section>
  );
}
