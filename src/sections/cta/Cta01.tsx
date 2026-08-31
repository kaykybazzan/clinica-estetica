import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import type { CtaProps } from "../types";

/** cta-01 — Full primary band. Highest contrast option; use once per page. */
export function Cta01({ id = "contato-cta", title, text, service }: CtaProps) {
  return (
    <Section id={id} tone="primary" className="py-16 lg:py-20">
      <Container size="narrow">
        <Reveal className="text-center">
          <Heading level={2} size="h1" align="center" className="text-on-primary">
            {title ?? companyContent.ctaTitle}
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-lead text-on-primary/85">
            {text ?? companyContent.ctaText}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton size="lg" variant="light" source="cta-01" context={{ kind: "quote", service }} />
            <Button href="/contato" size="lg" variant="ghost" icon="arrowRight" className="text-on-primary hover:bg-white/15">
              Outras formas de contato
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
