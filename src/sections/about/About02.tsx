import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import type { AboutProps } from "../types";

/** about-02 — Editorial: two text columns over a stacked image pair. */
export function About02({ id = "sobre", eyebrow, title, lead, paragraphs, image, secondaryImage }: AboutProps) {
  const first = image ?? {
    src: "/images/about/equipe.jpg",
    alt: "Equipe técnica em atendimento",
    width: 1200,
    height: 900,
  };
  const second = secondaryImage ?? {
    src: "/images/about/estrutura.jpg",
    alt: "Estrutura interna do local de atendimento",
    width: 1200,
    height: 900,
  };

  return (
    <Section id={id} tone="surface">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={eyebrow ?? "Quem somos"}
            title={title ?? companyContent.aboutTitle}
            lead={lead ?? companyContent.aboutLead}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal effect="scale-in">
            <SmartImage asset={first} ratio="4/3" sizes="(max-width: 640px) 100vw, 45vw" className="rounded-[var(--radius-brand)]" />
          </Reveal>
          <Reveal effect="scale-in" index={1} className="sm:mt-10">
            <SmartImage asset={second} ratio="4/3" sizes="(max-width: 640px) 100vw, 45vw" className="rounded-[var(--radius-brand)]" />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2 lg:gap-14">
          {(paragraphs ?? companyContent.aboutParagraphs).slice(0, 2).map((text, index) => (
            <Reveal key={text} index={index} className="text-fg-soft">
              <p>{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-l-2 border-primary pl-6">
          <p className="font-heading text-h3 font-semibold">{companyContent.mission}</p>
          <p className="mt-2 text-sm text-fg-soft">
            {clientConfig.company.legalName || clientConfig.company.name}
            {clientConfig.company.foundedYear ? ` · desde ${clientConfig.company.foundedYear}` : ""}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
