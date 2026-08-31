import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import type { HeroProps } from "../types";

/** hero-02 — Split layout: argument on the left, evidence on the right. */
export function Hero02({ id = "inicio", eyebrow, title, subtitle, image, secondaryImage }: HeroProps) {
  const main = image ?? {
    src: "/images/hero/principal.jpg",
    alt: `Atendimento na ${clientConfig.company.name}`,
    width: 1200,
    height: 1400,
  };
  const inset = secondaryImage ?? {
    src: "/images/hero/detalhe.jpg",
    alt: "Detalhe do trabalho técnico realizado no local",
    width: 800,
    height: 600,
  };

  return (
    <Section id={id} flush className="overflow-hidden pb-[var(--nx-section-y)] pt-10 lg:pt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal effect="fade-right">
            <Eyebrow>{eyebrow ?? companyContent.eyebrow}</Eyebrow>
            <Heading level={1} size="display" className="mt-4">
              {title ?? companyContent.headline}
            </Heading>
            <Lead className="mt-5 max-w-lg">{subtitle ?? companyContent.subheadline}</Lead>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" source="hero-02" context={{ kind: "quote" }}>
                Pedir orçamento
              </WhatsAppButton>
              <Button href="/servicos" size="lg" variant="outline" icon="arrowRight">
                Ver serviços
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {companyContent.differentiators.slice(0, 3).map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-fg-soft">
                  <Icon name="checkCircle" size={18} className="shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal effect="fade-left" className="relative">
            <SmartImage
              asset={main}
              ratio="4/3"
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="rounded-[var(--radius-brand-lg)] shadow-lift"
            />
            <div className="absolute -bottom-8 -left-4 hidden w-56 rounded-[var(--radius-brand)] border border-line bg-bg p-3 shadow-lift sm:block lg:-left-10 lg:w-64">
              <SmartImage
                asset={inset}
                ratio="4/3"
                sizes="256px"
                className="rounded-[var(--radius-brand-sm)]"
              />
              <p className="mt-3 px-1 pb-1 text-xs leading-snug text-fg-soft">
                {companyContent.cityLine} · desde {clientConfig.company.foundedYear ?? "sempre"}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
