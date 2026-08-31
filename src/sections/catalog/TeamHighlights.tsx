import { team } from "@/data/team";
import { features } from "@/config/features";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";

export function TeamHighlightsSection({ limit = 4, id }: { limit?: number; id?: string }) {
  if (!features.team || team.length === 0) return null;
  return (
    <Section id={id} tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Equipe"
          title="Pessoas por trás do atendimento"
          lead="Apresente responsáveis, especialidades e experiência quando a confiança pessoal influencia a decisão."
        />
        <ul className="mt-[var(--nx-block-gap)] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, limit).map((member) => (
            <li key={`${member.name}-${member.role}`} className="overflow-hidden rounded-[var(--nx-card-radius)] border border-line bg-bg shadow-[var(--nx-card-shadow)]">
              <SmartImage asset={member.photo} ratio="1/1" sizes="(max-width: 640px) 100vw, 25vw" />
              <div className="p-[var(--nx-card-padding)]">
                <h3 className="font-heading text-h4 font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-fg-soft">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
