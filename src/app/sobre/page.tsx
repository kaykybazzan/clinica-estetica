import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { BenefitsSection, CtaSection, StatsSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { companyContent } from "@/data/company";
import { team } from "@/data/team";
import { clientConfig } from "@/config/client.config";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a empresa",
  description: companyContent.aboutLead,
  path: "/sobre",
});

export default function AboutPage() {
  if (!isPageEnabled("about")) notFound();
  const { features, company } = clientConfig;

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Quem somos"
        title={companyContent.aboutTitle}
        lead={companyContent.aboutLead}
        trail={[{ label: "Sobre", href: "/sobre" }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-5 text-fg-soft">
              {companyContent.aboutParagraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <SmartImage
                asset={{
                  src: "/images/about/equipe.jpg",
                  alt: uiContent.pages.aboutImageAlt,
                  width: 1000,
                  height: 1200,
                }}
                ratio="3/4"
                sizes="(max-width: 1024px) 100vw, 420px"
                className="rounded-[var(--radius-brand-lg)]"
              />
              <Card tone="surface">
                <p className="font-heading text-h4 font-semibold">{companyContent.mission}</p>
                <p className="mt-2 text-sm text-fg-soft">
                  {company.legalName || company.name}
                  {company.foundedYear ? ` · desde ${company.foundedYear}` : ""}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <StatsSection />

      {features.team && (
        <Section tone="surface">
          <Container>
            <h2 className="font-heading text-h2 font-bold">Quem vai atender você</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <Reveal as="li" key={member.name} index={index}>
                  <SmartImage
                    asset={member.photo}
                    ratio="1/1"
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="rounded-[var(--radius-brand)]"
                  />
                  <p className="mt-4 font-heading text-h4 font-semibold">{member.name}</p>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-fg-soft">{member.bio}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <BenefitsSection />
      <CtaSection />
    </PageWrapper>
  );
}
