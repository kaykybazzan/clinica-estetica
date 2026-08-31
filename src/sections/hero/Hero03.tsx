import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import { summarizeBusinessHours } from "@/utils/format";
import type { HeroProps } from "../types";

/** hero-03 — Full-bleed image with an opaque card floating over its lower edge. */
export function Hero03({ id = "inicio", eyebrow, title, subtitle, image }: HeroProps) {
  const asset = image ?? {
    src: "/images/hero/principal.jpg",
    alt: `Fachada e estrutura da ${clientConfig.company.name}`,
    width: 1920,
    height: 1080,
  };
  const today = summarizeBusinessHours(clientConfig.businessHours)[0];

  return (
    <Section id={id} flush className="pb-[var(--nx-section-y)]">
      <div className="relative h-[46svh] min-h-72 w-full lg:h-[62svh]">
        <Image src={asset.src} alt={asset.alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-secondary/25" />
      </div>

      <Container>
        <Reveal
          effect="fade-up"
          className="relative -mt-20 max-w-3xl rounded-[var(--radius-brand-lg)] bg-bg p-7 shadow-lift sm:-mt-28 sm:p-10"
        >
          <Eyebrow>{eyebrow ?? companyContent.eyebrow}</Eyebrow>
          <Heading level={1} size="h1" className="mt-3">
            {title ?? companyContent.headline}
          </Heading>
          <Lead className="mt-4">{subtitle ?? companyContent.subheadline}</Lead>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <WhatsAppButton size="lg" source="hero-03" context={{ kind: "schedule" }}>
              Agendar horário
            </WhatsAppButton>
            <Button href="/contato" size="lg" variant="ghost" icon="arrowRight">
              Ver como chegar
            </Button>
          </div>

          {today && (
            <p className="mt-6 border-t border-line pt-5 text-sm text-fg-soft">
              <span className="font-semibold text-fg">{today.days}</span> · {today.time} ·{" "}
              {clientConfig.address.district}, {clientConfig.address.city}/{clientConfig.address.state}
            </p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
