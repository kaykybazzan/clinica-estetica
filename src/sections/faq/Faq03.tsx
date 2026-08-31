import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { clientConfig } from "@/config/client.config";
import { telHref } from "@/utils/format";
import { faq as allItems } from "@/data/faq";
import type { FaqProps } from "../types";

/** faq-03 — Dark band with a help card, for pages that end on the FAQ. */
export function Faq03({ id = "duvidas", eyebrow, title, lead, items, limit = 6 }: FaqProps) {
  const list = (items ?? allItems).slice(0, limit);
  const { phone, email } = clientConfig.contact;

  return (
    <Section id={id} tone="dark">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={eyebrow ?? "Dúvidas"}
              title={title ?? "Perguntas frequentes"}
              lead={lead}
              tone="dark"
            />
            <Accordion items={list} tone="dark" className="mt-8" />
          </div>

          <Card tone="dark" className="h-fit">
            <Icon name="headset" size={28} className="text-accent" />
            <p className="mt-4 font-heading text-h4 font-semibold text-on-dark">Prefere falar com alguém?</p>
            <p className="mt-2 text-sm text-on-dark-muted">
              Explique o caso e devolvemos com o próximo passo, sem enrolação.
            </p>
            <WhatsAppButton fullWidth variant="accent" className="mt-5" source="faq-03" />
            {phone && (
              <a
                href={telHref(phone)}
                className="mt-3 flex min-h-[var(--nx-tap-min)] items-center justify-center gap-2 text-sm font-semibold text-on-dark"
              >
                <Icon name="phone" size={16} />
                {phone}
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="mt-1 flex min-h-[var(--nx-tap-min)] items-center justify-center gap-2 text-sm text-on-dark-muted hover:text-on-dark"
            >
              <Icon name="mail" size={16} />
              {email}
            </a>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
