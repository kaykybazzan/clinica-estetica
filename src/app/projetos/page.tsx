import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/States";
import { Reveal } from "@/components/ui/Reveal";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { CtaSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { projects } from "@/data/projects";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

export const metadata: Metadata = buildMetadata({
  title: "Projetos",
  description: uiContent.pages.projectsDescription,
  path: "/projetos",
});

export default function ProjectsPage() {
  if (!isPageEnabled("projects")) notFound();

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Cases"
        title="Projetos"
        lead={uiContent.pages.projectsLead}
        trail={[{ label: "Projetos", href: "/projetos" }]}
      />

      <Section>
        <Container>
          {projects.length === 0 ? (
            <Reveal>
              <EmptyState
                title={uiContent.pages.projectsEmptyTitle}
                description={uiContent.pages.projectsEmptyDescription}
                action={{ label: "Falar com a equipe", href: "/contato" }}
              />
            </Reveal>
          ) : (
            <ul className="grid gap-8 lg:grid-cols-2">
              {projects.map((project, index) => (
                <Reveal as="li" key={project.slug} index={index}>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="group block overflow-hidden rounded-[var(--radius-brand-lg)] border border-line transition-shadow hover:shadow-lift"
                  >
                    <SmartImage asset={project.image} ratio="3/2" sizes="(max-width: 1024px) 100vw, 50vw" enableHoverEffects />
                    <div className="p-7">
                      <p className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-primary">
                        {project.client} · {project.year}
                      </p>
                      <h2 className="mt-2 font-heading text-h3 font-semibold group-hover:text-primary">
                        {project.title}
                      </h2>
                      <p className="mt-3 text-fg-soft">{project.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Ver o case
                        <Icon name="arrowRight" size={16} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </Section>

      <CtaSection />
    </PageWrapper>
  );
}
