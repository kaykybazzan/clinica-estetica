import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import { telHref } from "@/utils/format";
import type { CtaProps } from "../types";

/** cta-03 — Bordered card on the page background. Quiet enough to repeat. */
export function Cta03({ id = "contato-cta", title, text, service }: CtaProps) {
  const { phone } = clientConfig.contact;

  return (
    <Section id={id}>
      <Container>
        <Reveal className="rounded-[var(--radius-brand-lg)] border border-line bg-surface p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <Heading level={2} size="h2">
                {title ?? companyContent.ctaTitle}
              </Heading>
              <p className="mt-3 text-fg-soft">{text ?? companyContent.ctaText}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <WhatsAppButton size="lg" source="cta-03" context={{ kind: "quote", service }} />
              {phone && (
                <Button href={telHref(phone)} size="lg" variant="outline" icon="phone" iconPosition="start">
                  {phone}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
