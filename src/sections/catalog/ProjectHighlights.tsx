import Link from "next/link";
import { projects } from "@/data/projects";
import { features, pages } from "@/config/features";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";

export function ProjectHighlightsSection({ limit = 3, id }: { limit?: number; id?: string }) {
  if (!features.projects || !pages.projects || projects.length === 0) return null;
  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow="Projetos"
          title="Trabalhos que demonstram capacidade"
          lead="Casos selecionados para mostrar contexto, solução e resultado sem depender de promessas genéricas."
        />
        <ul className="mt-[var(--nx-block-gap)] grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, limit).map((project) => (
            <li key={project.slug} className="overflow-hidden rounded-[var(--nx-card-radius)] border border-line bg-bg shadow-[var(--nx-card-shadow)]">
              <Link href={`/projetos/${project.slug}`} className="group block h-full">
                <SmartImage asset={project.image} ratio="3/2" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="p-[var(--nx-card-padding)]">
                  <p className="text-eyebrow font-bold uppercase tracking-[0.14em] text-fg-soft">{project.year}</p>
                  <h3 className="mt-2 font-heading text-h4 font-semibold transition-colors group-hover:text-primary">{project.title}</h3>
                  <p className="mt-3 text-sm text-fg-soft">{project.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href="/projetos" variant="outline" icon="arrowRight">Ver todos os projetos</Button>
        </div>
      </Container>
    </Section>
  );
}
