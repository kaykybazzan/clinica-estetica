import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Lead } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import type { AboutProps } from "../types";

/** about-06 — Manifesto-style about block with statement and supporting image. */
export function About06({ id = "sobre", eyebrow, title, lead, paragraphs, image }: AboutProps) {
  const asset = image ?? { src: "/images/about/equipe.jpg", alt: "Equipe da empresa no trabalho", width: 1200, height: 1000 };
  return (
    <Section id={id}>
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow ?? "O que nos move"}</Eyebrow>
          <Heading level={2} size="h1" className="mt-4 max-w-[18ch]">{title ?? companyContent.mission}</Heading>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <Reveal effect="fade-right"><SmartImage asset={asset} ratio="4/3" className="rounded-[var(--nx-image-radius)]" /></Reveal>
          <Reveal effect="fade-left" className="flex flex-col justify-center">
            <Lead>{lead ?? companyContent.aboutLead}</Lead>
            <div className="mt-6 grid gap-4 text-fg-soft">{(paragraphs ?? companyContent.aboutParagraphs).slice(0, 2).map((text) => <p key={text}>{text}</p>)}</div>
            <Button href="/sobre" variant="outline" icon="arrowRight" className="mt-8 self-start">Nossa história completa</Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
