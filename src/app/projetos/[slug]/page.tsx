import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { CtaSection } from "@/sections";
import { buildMetadata } from "@/seo/metadata";
import { getProjectBySlug, projects } from "@/data/projects";
import { isPageEnabled } from "@/config/features";
import { uiContent } from "@/data/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Projeto não encontrado", description: "", path: "/projetos", noindex: true });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projetos/${project.slug}`,
    image: project.image.src,
    type: "article",
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  if (!isPageEnabled("projects")) notFound();
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const blocks = [
    { title: uiContent.pages.projectDetail.challengeTitle, text: project.challenge },
    { title: uiContent.pages.projectDetail.solutionTitle, text: project.solution },
    { title: uiContent.pages.projectDetail.outcomeTitle, text: project.outcome },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`${project.client} · ${project.year}`}
        title={project.title}
        lead={project.summary}
        trail={[
          { label: "Projetos", href: "/projetos" },
          { label: project.title, href: `/projetos/${project.slug}` },
        ]}
      />

      <Section>
        <Container size="narrow">
          <SmartImage
            asset={project.image}
            ratio="16/9"
            priority
            sizes="(max-width: 768px) 100vw, 736px"
            className="rounded-[var(--radius-brand-lg)]"
          />

          <div className="mt-12 flex flex-col gap-10">
            {blocks.map((block) => (
              <div key={block.title}>
                <h2 className="font-heading text-h3 font-semibold">{block.title}</h2>
                <p className="mt-3 text-fg-soft">{block.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
