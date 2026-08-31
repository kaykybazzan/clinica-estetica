import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import type { CtaProps } from "../types";

/** cta-04 — Minimal centered block between two content sections. */
export function Cta04({ id = "contato-cta", title, text, service }: CtaProps) {
  return (
    <Section id={id} className="py-14 lg:py-16">
      <Container size="narrow">
        <Reveal className="border-y border-line py-12 text-center">
          <Heading level={2} size="h2" align="center">
            {title ?? companyContent.ctaTitle}
          </Heading>
          <p className="mx-auto mt-3 max-w-lg text-fg-soft">{text ?? companyContent.ctaText}</p>
          <WhatsAppButton size="lg" className="mt-7" source="cta-04" context={{ kind: "quote", service }} />
        </Reveal>
      </Container>
    </Section>
  );
}
