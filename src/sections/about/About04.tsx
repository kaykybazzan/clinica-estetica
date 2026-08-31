import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import type { AboutProps } from "../types";

/** about-04 — Wide banner image, then a three-column read with a pull-out card. */
export function About04({ id = "sobre", eyebrow, title, lead, paragraphs, image }: AboutProps) {
  const asset = image ?? {
    src: "/images/about/estrutura.jpg",
    alt: "Vista ampla da estrutura de atendimento",
    width: 1920,
    height: 820,
  };

  return (
    <Section id={id}>
      <Container>
        <Reveal>
          <SmartImage
            asset={asset}
            ratio="21/9"
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="rounded-[var(--radius-brand-lg)]"
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Reveal effect="fade-right">
            <SectionHeader
              eyebrow={eyebrow ?? "Quem somos"}
              title={title ?? companyContent.aboutTitle}
              lead={lead ?? companyContent.aboutLead}
            />
          </Reveal>

          <Reveal effect="fade-left" className="grid gap-8 sm:grid-cols-2">
            {(paragraphs ?? companyContent.aboutParagraphs).slice(0, 2).map((text) => (
              <p key={text} className="text-fg-soft">
                {text}
              </p>
            ))}
            <Card tone="surface" className="sm:col-span-2">
              <p className="font-heading text-h4 font-semibold">{companyContent.mission}</p>
              <p className="mt-2 text-sm text-fg-soft">
                Atendimento em {clientConfig.address.serviceAreas.join(", ") || clientConfig.address.city}.
              </p>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
