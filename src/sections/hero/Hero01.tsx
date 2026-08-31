import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import { stats } from "@/data/stats";
import type { HeroProps } from "../types";
import Image from "next/image";

/** hero-01 — Fullscreen image, centered message, proof strip anchored at the bottom. */
export function Hero01({ id = "inicio", eyebrow, title, subtitle, image }: HeroProps) {
  const asset = image ?? {
    src: "/images/hero/principal.jpg",
    alt: `Equipe da ${clientConfig.company.name} durante o atendimento`,
    width: 1920,
    height: 1280,
  };

  return (
    <Section id={id} flush className="relative isolate flex min-h-[86svh] items-end overflow-hidden">
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/35"
      />

      <Container className="pb-14 pt-32 sm:pb-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="text-accent">{eyebrow ?? companyContent.eyebrow}</Eyebrow>
          <Heading level={1} size="display" className="mt-4 text-on-dark">
            {title ?? companyContent.headline}
          </Heading>
          <Lead className="mx-auto mt-5 max-w-xl text-on-dark-muted">
            {subtitle ?? companyContent.subheadline}
          </Lead>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton size="lg" source="hero-01" context={{ kind: "quote" }}>
              Pedir orçamento
            </WhatsAppButton>
            <Button href="/servicos" size="lg" variant="light" icon="arrowRight">
              Ver serviços
            </Button>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 lg:grid-cols-4">
          {stats.slice(0, 4).map((stat, index) => (
            <Reveal as="li" key={stat.label} index={index} className="text-center lg:text-left">
              <p className="font-heading text-h3 font-bold text-on-dark">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm text-on-dark-muted">{stat.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>

      <a
        href="#conteudo"
        aria-label="Ir para o conteúdo"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-on-dark-muted transition-colors hover:text-on-dark lg:block"
      >
        <Icon name="chevronDown" size={26} />
      </a>
    </Section>
  );
}
