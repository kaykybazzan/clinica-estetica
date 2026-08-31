import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import type { AboutProps } from "../types";

/** about-01 — Classic split: photograph on one side, argument and proof on the other. */
export function About01({ id = "sobre", eyebrow, title, lead, paragraphs, image, highlights }: AboutProps) {
  const asset = image ?? {
    src: "/images/about/equipe.jpg",
    alt: "Equipe técnica trabalhando no atendimento diário",
    width: 1200,
    height: 1000,
  };

  return (
    <Section id={id}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal effect="fade-right">
            <SmartImage
              asset={asset}
              ratio="4/3"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="rounded-[var(--radius-brand-lg)]"
            />
          </Reveal>

          <Reveal effect="fade-left">
            <SectionHeader
              eyebrow={eyebrow ?? "Quem somos"}
              title={title ?? companyContent.aboutTitle}
              lead={lead ?? companyContent.aboutLead}
            />

            <div className="mt-6 flex flex-col gap-4 text-fg-soft">
              {(paragraphs ?? companyContent.aboutParagraphs).slice(0, 2).map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {(highlights ?? companyContent.differentiators).map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
                  <Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <Button href="/sobre" variant="outline" icon="arrowRight" className="mt-8">
              Conhecer a empresa
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
