import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Eyebrow, Lead } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Rating } from "@/components/ui/Rating";
import { Accordion } from "@/components/ui/Accordion";
import { EmptyState, ErrorState, Loading } from "@/components/ui/States";
import { Icon, iconNames } from "@/components/ui/Icon";
import { sectionCatalog } from "@/sections/registry";
import { clientConfig } from "@/config/client.config";
import { nexora, BASE_VERSION } from "@/config/site";

/**
 * Internal design-system reference. `notFound()` in production removes the route
 * from the build output entirely, so it can never leak to a client's site.
 */
export const metadata: Metadata = {
  title: "Componentes — ambiente de desenvolvimento",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { token: "--nx-primary", label: "primary" },
  { token: "--nx-primary-soft", label: "primary-soft" },
  { token: "--nx-secondary", label: "secondary" },
  { token: "--nx-accent", label: "accent" },
  { token: "--nx-bg", label: "bg" },
  { token: "--nx-surface", label: "surface" },
  { token: "--nx-fg", label: "fg" },
  { token: "--nx-muted", label: "muted" },
  { token: "--nx-border", label: "border" },
];

/* Tailwind cannot generate classes from interpolated strings, so the scale is
   an explicit map instead of `text-${size}`. */
const TYPE_SCALE: { token: string; className: string }[] = [
  { token: "text-display", className: "text-display" },
  { token: "text-h1", className: "text-h1" },
  { token: "text-h2", className: "text-h2" },
  { token: "text-h3", className: "text-h3" },
  { token: "text-h4", className: "text-h4" },
  { token: "text-lead", className: "text-lead" },
];

export default function DevComponentsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <Section tone="surface" className="py-12">
        <Container>
          <Eyebrow>Nexora · base v{BASE_VERSION}</Eyebrow>
          <Heading level={1} size="h1" className="mt-3">
            Painel de componentes
          </Heading>
          <Lead className="mt-3">
            Referência visual do design system aplicado ao tema de{" "}
            <strong>{clientConfig.company.name}</strong>. Disponível apenas em desenvolvimento.
          </Lead>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading level={2}>Cores</Heading>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((swatch) => (
              <li key={swatch.token} className="rounded-[var(--radius-brand)] border border-line p-3">
                <span
                  className="block h-16 w-full rounded-[var(--radius-brand-sm)] border border-line"
                  style={{ background: `var(${swatch.token})` }}
                />
                <p className="mt-2 text-sm font-semibold">{swatch.label}</p>
                <code className="text-xs text-fg-soft">{swatch.token}</code>
              </li>
            ))}
          </ul>

          <Heading level={2} className="mt-16">
            Tipografia
          </Heading>
          <ul className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
            {TYPE_SCALE.map((entry) => (
              <li key={entry.token} className="flex flex-wrap items-baseline gap-4 border-b border-line pb-4">
                <code className="w-24 shrink-0 text-xs text-fg-soft">{entry.token}</code>
                <span className={`font-heading font-bold ${entry.className}`}>
                  {clientConfig.design.headingFont} · {clientConfig.design.bodyFont}
                </span>
              </li>
            ))}
          </ul>

          <Heading level={2} className="mt-16">
            Botões
          </Heading>
          <div className="mt-6 flex flex-wrap gap-3">
            {(["primary", "secondary", "outline", "ghost", "accent"] as const).map((variant) => (
              <Button key={variant} variant={variant} icon="arrowRight">
                {variant}
              </Button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Button key={size} size={size}>
                Tamanho {size}
              </Button>
            ))}
            <IconButton icon="phone" label="Telefone" variant="outline" />
            <IconButton icon="whatsapp" label="WhatsApp" variant="solid" />
          </div>

          <Heading level={2} className="mt-16">
            Badges e avaliação
          </Heading>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge>primary</Badge>
            <Badge tone="neutral" icon="clock">
              neutral
            </Badge>
            <Badge tone="accent" icon="award">
              accent
            </Badge>
            <Rating value={5} />
          </div>

          <Heading level={2} className="mt-16">
            Cards
          </Heading>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(["default", "surface", "outline"] as const).map((tone) => (
              <Card key={tone} tone={tone} interactive>
                <p className="font-heading text-h4 font-semibold">Card {tone}</p>
                <p className="mt-2 text-sm text-fg-soft">Conteúdo de exemplo com espaçamento padrão.</p>
              </Card>
            ))}
          </div>

          <Heading level={2} className="mt-16">
            Estados
          </Heading>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card tone="surface">
              <Loading />
            </Card>
            <Card tone="surface">
              <EmptyState title="Nada por aqui" description="Ajuste os filtros para ver resultados." />
            </Card>
            <Card tone="surface">
              <ErrorState
                title="Não foi possível carregar"
                description="Verifique a conexão e tente novamente."
              />
            </Card>
          </div>

          <Heading level={2} className="mt-16">
            Accordion
          </Heading>
          <Accordion
            className="mt-6 max-w-2xl"
            items={[
              { question: "Pergunta de exemplo", answer: "Resposta de exemplo com uma linha de texto." },
              { question: "Segunda pergunta", answer: "Segunda resposta, também curta." },
            ]}
          />

          <Heading level={2} className="mt-16">
            Ícones ({iconNames.length})
          </Heading>
          <ul className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
            {iconNames.map((name) => (
              <li
                key={name}
                className="flex flex-col items-center gap-1.5 rounded-[var(--radius-brand-sm)] border border-line p-3 text-center"
              >
                <Icon name={name} size={22} />
                <code className="text-[10px] leading-tight text-fg-soft">{name}</code>
              </li>
            ))}
          </ul>

          <Heading level={2} className="mt-16">
            Biblioteca de seções
          </Heading>
          <p className="mt-3 text-fg-soft">
            Variantes disponíveis por família. A ativa está destacada e é definida em{" "}
            <code>client.config.ts</code>.
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {Object.entries(sectionCatalog).map(([family, registry]) => {
              const active = clientConfig.sections[family as keyof typeof clientConfig.sections];
              return (
                <li key={family} className="border-b border-line pb-4">
                  <p className="font-heading text-h4 font-semibold capitalize">{family}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.keys(registry).map((variant) => (
                      <span
                        key={variant}
                        className={
                          variant === active
                            ? "rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary"
                            : "rounded-full border border-line px-3 py-1 text-xs text-fg-soft"
                        }
                      >
                        {variant}
                      </span>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-14 text-sm text-fg-soft">
            {nexora.name} · {nexora.tagline}
          </p>
        </Container>
      </Section>
    </>
  );
}
