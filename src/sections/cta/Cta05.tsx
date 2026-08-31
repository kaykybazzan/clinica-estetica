import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { companyContent } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import { summarizeBusinessHours, telHref } from "@/utils/format";
import type { CtaProps } from "../types";

/**
 * cta-05 — Practical bar: message plus the three things a local visitor actually
 * needs before deciding — phone, hours and address.
 */
export function Cta05({ id = "contato-cta", title, text, service }: CtaProps) {
  const { contact, address, businessHours } = clientConfig;
  const [firstBlock] = summarizeBusinessHours(businessHours);

  return (
    <Section id={id} tone="primary" className="py-12 lg:py-14">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <Heading level={2} size="h3" className="text-on-primary">
              {title ?? companyContent.ctaTitle}
            </Heading>
            <p className="mt-2 max-w-xl text-on-primary/85">{text ?? companyContent.ctaText}</p>

            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-on-primary/90">
              {contact.phone && (
                <li>
                  <a href={telHref(contact.phone)} className="flex items-center gap-2 font-semibold">
                    <Icon name="phone" size={16} />
                    {contact.phone}
                  </a>
                </li>
              )}
              {firstBlock && (
                <li className="flex items-center gap-2">
                  <Icon name="clock" size={16} />
                  {firstBlock.days} · {firstBlock.time}
                </li>
              )}
              <li className="flex items-center gap-2">
                <Icon name="mapPin" size={16} />
                {address.district}, {address.city}/{address.state}
              </li>
            </ul>
          </div>

          <WhatsAppButton size="lg" variant="light" source="cta-05" context={{ kind: "quote", service }} />
        </Reveal>
      </Container>
    </Section>
  );
}
