import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import type { CtaProps } from "../types";

/** cta-02 — Dark split with supporting photograph. */
export function Cta02({ id = "contato-cta", title, text, service }: CtaProps) {
  return (
    <Section id={id} tone="dark" flush className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center py-16 lg:py-24">
          <Container size="narrow" className="lg:ml-auto lg:mr-0 lg:max-w-xl lg:pr-16">
            <Reveal>
              <Heading level={2} size="h1" className="text-on-dark">
                {title ?? companyContent.ctaTitle}
              </Heading>
              <p className="mt-4 text-lead text-on-dark-muted">{text ?? companyContent.ctaText}</p>

              <ul className="mt-7 flex flex-col gap-2.5">
                {companyContent.differentiators.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-on-dark-muted">
                    <Icon name="checkCircle" size={18} className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <WhatsAppButton
                size="lg"
                variant="accent"
                className="mt-8"
                source="cta-02"
                context={{ kind: "quote", service }}
              />
            </Reveal>
          </Container>
        </div>

        <SmartImage
          asset={{
            src: "/images/hero/detalhe.jpg",
            alt: "Profissional executando um atendimento técnico",
            width: 1200,
            height: 1000,
          }}
          ratio="auto"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="min-h-64 lg:h-full"
        />
      </div>
    </Section>
  );
}
