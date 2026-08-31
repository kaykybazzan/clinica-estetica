import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { sectionCatalog } from "@/sections/registry";

export const metadata: Metadata = { title: "Section Variant Runtime Lab", robots: { index: false, follow: false } };

type LooseComponent = ComponentType<Record<string, unknown>>;

export default function VariantsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      <Section tone="surface"><Container><Heading level={1}>Runtime Lab — todas as variantes</Heading><p className="mt-3 text-fg-soft">Cada variante é montada de verdade para detectar import quebrado e erro de renderização. Conteúdo padrão da demo é usado como fixture.</p></Container></Section>
      {Object.entries(sectionCatalog).flatMap(([family, registry]) =>
        Object.entries(registry).map(([variant, component]) => {
          const Variant = component as unknown as LooseComponent;
          return (
            <div key={variant} data-variant={variant} className="border-b-4 border-primary">
              <div className="bg-secondary px-4 py-2 font-mono text-xs font-bold text-on-dark">{family} / {variant}</div>
              <Variant />
            </div>
          );
        }),
      )}
    </>
  );
}
