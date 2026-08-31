import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { withHome } from "@/seo/breadcrumbs";
import type { Crumb } from "@/seo/breadcrumbs";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Trail without the home entry — it is prepended automatically. */
  trail: Crumb[];
}

/** Header of every inner page, including the BreadcrumbList markup. */
export function PageHeader({ eyebrow, title, lead, trail }: PageHeaderProps) {
  const full = withHome(trail);

  return (
    <Section tone="surface" className="py-10 lg:py-14">
      <Container>
        <Breadcrumb trail={full} />
        {eyebrow && <Eyebrow className="mt-6">{eyebrow}</Eyebrow>}
        <Heading level={1} size="h1" className="mt-3 max-w-3xl">
          {title}
        </Heading>
        {lead && <Lead className="mt-4 max-w-2xl">{lead}</Lead>}
      </Container>
      <JsonLd data={breadcrumbSchema(full)} id="nx-breadcrumb" />
    </Section>
  );
}
