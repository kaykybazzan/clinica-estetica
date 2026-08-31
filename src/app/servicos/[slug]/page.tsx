import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ContactForm } from "@/components/ui/ContactForm";
import { JsonLd } from "@/seo/JsonLd";
import { serviceSchema } from "@/seo/schema";
import { buildMetadata } from "@/seo/metadata";
import { getServiceBySlug, services } from "@/data/services";
import { clientConfig } from "@/config/client.config";
import { isPageEnabled } from "@/config/features";
import { formatCurrencyBRL } from "@/utils/format";
import { uiContent } from "@/data/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Static params keep every service page prerendered at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return buildMetadata({ title: "Serviço não encontrado", description: "", path: "/servicos", noindex: true });

  return buildMetadata({
    title: `${service.title} em ${clientConfig.address.city}`,
    description: service.excerpt,
    path: `/servicos/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  if (!isPageEnabled("services")) notFound();
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Serviço"
        title={service.title}
        lead={service.excerpt}
        trail={[
          { label: "Serviços", href: "/servicos" },
          { label: service.title, href: `/servicos/${service.slug}` },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SmartImage
                asset={service.image}
                ratio="16/9"
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                className="rounded-[var(--radius-brand-lg)]"
              />

              <p className="mt-8 text-lead text-fg-soft">{service.description}</p>

              <h2 className="mt-10 font-heading text-h3 font-semibold">{uiContent.pages.serviceDetail.includedTitle}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon name="checkCircle" size={19} className="mt-0.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-heading text-h3 font-semibold">{uiContent.pages.serviceDetail.serviceAreasTitle}</h2>
              <p className="mt-3 text-fg-soft">
                {clientConfig.address.serviceAreas.join(" · ") || clientConfig.address.city}. {uiContent.pages.serviceDetail.serviceAreasSuffix}
              </p>

              <div className="mt-10">
                <h2 className="font-heading text-h3 font-semibold">{uiContent.pages.serviceDetail.othersTitle}</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/servicos/${item.slug}`}
                        className="group flex items-center gap-4 py-4 transition-colors hover:text-primary"
                      >
                        <Icon name={item.icon} size={22} className="shrink-0 text-primary" />
                        <span className="flex-1 font-semibold">{item.title}</span>
                        <Icon name="arrowRight" size={18} className="text-line-strong group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <Card tone="surface">
                {service.startingAt && (
                  <p className="text-sm text-fg-soft">
                    A partir de{" "}
                    <span className="font-heading text-h3 font-bold text-fg">
                      {formatCurrencyBRL(service.startingAt)}
                    </span>
                  </p>
                )}
                <p className="font-heading text-h4 font-semibold">{uiContent.pages.serviceDetail.quoteTitle}</p>
                <p className="mt-2 text-sm text-fg-soft">
                  {uiContent.pages.serviceDetail.quoteLead}
                </p>
                <WhatsAppButton
                  fullWidth
                  size="lg"
                  className="mt-5"
                  source={`service-page:${service.slug}`}
                  context={{ kind: "quote", service: service.title }}
                />
              </Card>

              {clientConfig.features.contactForm && (
                <Card>
                  <p className="font-heading text-h4 font-semibold">{uiContent.pages.serviceDetail.formTitle}</p>
                  <ContactForm presetService={service.title} className="mt-5" />
                </Card>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      <JsonLd data={serviceSchema(service)} id="nx-service" />
    </>
  );
}
