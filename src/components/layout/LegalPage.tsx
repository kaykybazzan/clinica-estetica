import { PageHeader } from "./PageHeader";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import type { LegalDocument } from "@/data/legal";

/** One renderer for the three legal documents — same structure, same styling. */
export function LegalPage({ document, path }: { document: LegalDocument; path: string }) {
  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Documentos"
        title={document.title}
        lead={document.intro}
        trail={[{ label: document.title, href: path }]}
      />

      <Section>
        <Container size="narrow">
          {document.updatedAt && (
            <Badge tone="neutral" icon="calendar">
              Revisado em {document.updatedAt}
            </Badge>
          )}

          <div className="nx-prose mt-8 text-fg-soft">
            {document.blocks.map((block) => (
              <section key={block.heading}>
                <h2 className="font-heading font-semibold text-fg">{block.heading}</h2>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {block.bullets && (
                  <ul>
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
