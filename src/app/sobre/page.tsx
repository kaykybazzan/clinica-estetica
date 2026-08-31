import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothText } from "@/components/ui/SmoothText";
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-4 text-fg-soft lg:gap-5">
              {companyContent.aboutParagraphs.map((text, index) => (
                <SmoothText key={text} delay={0.1 + index * 0.1}>
                  <p className="text-sm leading-relaxed sm:text-base">{text}</p>
                </SmoothText>
              ))}
            </div>

            <div className="flex flex-col gap-4 lg:gap-6">
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
              <SmoothText delay={0.4}>
                <Card tone="surface">
                  <p className="font-heading text-h4 font-semibold">{companyContent.mission}</p>
                  <p className="mt-2 text-sm text-fg-soft">
                    {company.legalName || company.name}
                    {company.foundedYear ? ` · desde ${company.foundedYear}` : ""}
                  </p>
                </Card>
              </SmoothText>
            </div>
          </div>
        </Container>
      </Section>

      <StatsSection />

      {features.team && (
        <Section tone="surface">
          <Container>
            <SmoothText delay={0.1}>
              <h2 className="font-heading text-h2 font-bold">Quem vai atender você</h2>
            </SmoothText>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
              {team.map((member, index) => (
                <Reveal as="li" key={member.name} index={index}>
                  <SmartImage
                    asset={member.photo}
                    ratio="1/1"
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="rounded-[var(--radius-brand)]"
                  />
                  <SmoothText delay={0.2 + index * 0.1}>
                    <p className="mt-3 font-heading text-h4 font-semibold sm:mt-4">{member.name}</p>
                  </SmoothText>
                  <SmoothText delay={0.3 + index * 0.1}>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                  </SmoothText>
                  <SmoothText delay={0.4 + index * 0.1}>
                    <p className="mt-2 text-sm text-fg-soft leading-relaxed">{member.bio}</p>
                  </SmoothText>
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
