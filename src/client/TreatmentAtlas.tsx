import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function TreatmentAtlas(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "tratamentos";
  return (
    <Section id={id} tone="surface" className="overflow-hidden">
      <Container size="wide" className="grid gap-12 lg:grid-cols-[.36fr_.64fr] lg:gap-20">
        <Reveal effect="fade-right" className="lg:sticky lg:top-[calc(var(--nx-header-h)+2rem)] lg:self-start">
          <p className="text-[.7rem] font-bold uppercase tracking-[.23em] text-primary">ATLAS DE CUIDADOS / 03</p>
          <h2 className="mt-5 max-w-[9ch] font-heading text-[clamp(3.2rem,5.5vw,6.6rem)] font-medium leading-[.86] tracking-[-.055em]">
            Não é um menu. É uma <em className="font-normal text-primary">curadoria.</em>
          </h2>
          <p className="mt-6 max-w-md text-fg-soft">Os serviços aparecem como capítulos de uma mesma jornada, com mais hierarquia e menos sensação de “grade de produtos”.</p>
          <Button href="/servicos" variant="outline" icon="arrowRight" className="mt-8">Ver página completa</Button>
          <div className="mt-12 hidden h-px w-full bg-line lg:block" />
          <p className="mt-5 hidden max-w-xs text-xs leading-relaxed text-fg-soft lg:block">Categorias ilustrativas. O portfólio final deve refletir apenas procedimentos reais, autorizados e adequadamente descritos.</p>
        </Reveal>

        <div className="border-t border-line">
          {services.map((service, index) => (
            <Reveal key={service.slug} index={index}>
              <Link
                href={`/servicos/${service.slug}`}
                className="group grid min-h-[15rem] gap-6 border-b border-line py-7 transition-colors hover:bg-bg/60 md:grid-cols-[4.25rem_minmax(0,1fr)_10rem] md:items-center md:px-5 lg:min-h-[17rem] lg:grid-cols-[4.75rem_minmax(0,1fr)_12rem] lg:px-7"
              >
                <span className="font-heading text-[2.6rem] leading-none text-primary/35 transition-colors group-hover:text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="block">
                  <span className="flex items-center gap-2 text-[.66rem] font-bold uppercase tracking-[.18em] text-fg-soft"><Icon name={service.icon} size={15} /> cuidado / capítulo</span>
                  <strong className="mt-3 block max-w-[16ch] font-heading text-[clamp(2rem,3.5vw,4.4rem)] font-medium leading-[.9] tracking-[-.045em] transition-transform duration-[var(--nx-duration)] group-hover:translate-x-2">{service.title}</strong>
                  <span className="mt-4 block max-w-lg text-sm leading-relaxed text-fg-soft">{service.excerpt}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-primary">entender melhor <Icon name="arrowUpRight" size={15} /></span>
                </span>
                <SmartImage asset={service.image} ratio="3/4" sizes="(max-width: 768px) 45vw, 12rem" className="w-[45%] rounded-[2px] md:w-full" imageClassName="transition-transform duration-[var(--nx-duration-slow)] group-hover:scale-[1.04]" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
