import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { visibleNav } from "@/config/features";
import Link from "next/link";
import { uiContent } from "@/data/ui";

export default function NotFound() {
  return (
    <Section className="py-24 lg:py-32">
      <Container size="narrow">
        <p className="font-heading text-display font-extrabold leading-none text-primary">404</p>
        <Heading level={1} size="h2" className="mt-4">
          {uiContent.pages.notFound.title}
        </Heading>
        <p className="mt-3 text-fg-soft">
          {uiContent.pages.notFound.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" icon="arrowRight">
            {uiContent.pages.notFound.homeCta}
          </Button>
          <WhatsAppButton variant="outline" source="404" />
        </div>

        <nav aria-label="Páginas do site" className="mt-10 border-t border-line pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-soft">
            {visibleNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
