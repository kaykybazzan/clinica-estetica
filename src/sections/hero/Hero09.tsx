import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { gallery } from "@/data/gallery";
import type { HeroProps } from "../types";

/** hero-09 — Visual mosaic for image-led brands. */
export function Hero09({ id = "inicio", eyebrow, title, subtitle, image, secondaryImage }: HeroProps) {
  const primary = image ?? gallery[0]?.image ?? { src: "/images/hero/principal.jpg", alt: "Ambiente principal da empresa", width: 1920, height: 1280 };
  const secondary = secondaryImage ?? gallery[1]?.image ?? primary;
  return (
    <Section id={id} flush className="overflow-hidden py-14 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <Reveal effect="fade-right">
            <Eyebrow>{eyebrow ?? companyContent.eyebrow}</Eyebrow>
            <Heading level={1} size="h1" className="mt-4 max-w-[14ch]">{title ?? companyContent.headline}</Heading>
            <Lead className="mt-5 max-w-xl">{subtitle ?? companyContent.subheadline}</Lead>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" source="hero-09">Começar conversa</WhatsAppButton>
              <Button href="/galeria" size="lg" variant="outline" icon="arrowRight">Ver galeria</Button>
            </div>
          </Reveal>
          <Reveal effect="fade-left" className="grid grid-cols-[1.15fr_.85fr] gap-3 sm:gap-5">
            <SmartImage asset={primary} ratio="3/4" priority className="rounded-[var(--nx-image-radius)]" />
            <div className="grid gap-3 pt-10 sm:gap-5 sm:pt-16">
              <SmartImage asset={secondary} ratio="1/1" className="rounded-[var(--nx-image-radius)]" />
              {gallery[2]?.image && <SmartImage asset={gallery[2].image} ratio="4/3" className="rounded-[var(--nx-image-radius)]" />}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
