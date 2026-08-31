import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothText } from "@/components/ui/SmoothText";
import { services } from "@/data/services";

export function TreatmentAtlas(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "tratamentos";
  return (
    <Section id={id} tone="surface" className="overflow-hidden">
      <Container size="wide" className="grid gap-12 lg:grid-cols-[.36fr_.64fr] lg:gap-20">
        <Reveal effect="fade-right" className="lg:sticky lg:top-[calc(var(--nx-header-h)+2rem)] lg:self-start">
          <SmoothText delay={0.1}>
            <p className="text-[.7rem] font-bold uppercase tracking-[.23em] text-primary">ATLAS DE CUIDADOS / 03</p>
          </SmoothText>
          <SmoothText delay={0.2}>
            <h2 className="mt-5 max-w-[9ch] font-heading text-[clamp(3.2rem,5.5vw,6.6rem)] font-medium leading-[.86] tracking-[-.055em]">
              Não é um menu. É uma <em className="font-normal text-primary">curadoria.</em>
            </h2>
          </SmoothText>
          <SmoothText delay={0.3}>
            <p className="mt-6 max-w-md text-fg-soft">Os serviços aparecem como capítulos de uma mesma jornada, com mais hierarquia e menos sensação de "grade de produtos".</p>
          </SmoothText>
          <SmoothText delay={0.4}>
            <Button href="/servicos" variant="outline" icon="arrowRight" className="mt-8">Ver página completa</Button>
          </SmoothText>
          <div className="mt-12 hidden h-px w-full bg-line lg:block" />
          <SmoothText delay={0.5}>
            <p className="mt-5 hidden max-w-xs text-xs leading-relaxed text-fg-soft lg:block">Categorias ilustrativas. O portfólio final deve refletir apenas procedimentos reais, autorizados e adequadamente descritos.</p>
          </SmoothText>
        </Reveal>

        <div className="border-t border-line">
          {services.map((service, index) => (
            <Reveal key={service.slug} index={index}>
              <Link
                href={`/servicos/${service.slug}`}
                className="group grid min-h-[12rem] gap-4 border-b border-line py-5 transition-colors hover:bg-bg/60 md:grid-cols-[4.25rem_minmax(0,1fr)_10rem] md:min-h-[15rem] md:gap-6 md:items-center md:px-5 lg:min-h-[17rem] lg:grid-cols-[4.75rem_minmax(0,1fr)_12rem] lg:px-7 lg:py-7"
              >
                <span className="font-heading text-[2.2rem] leading-none text-primary/35 transition-colors group-hover:text-primary sm:text-[2.6rem]">{String(index + 1).padStart(2, "0")}</span>
                <span className="block">
                  <span className="flex items-center gap-2 text-[.6rem] font-bold uppercase tracking-[.18em] text-fg-soft sm:text-[.66rem]"><Icon name={service.icon} size={14} /> cuidado / capítulo</span>
                  <strong className="mt-2 block max-w-[16ch] font-heading text-[clamp(1.6rem,4vw,4.4rem)] font-medium leading-[.9] tracking-[-.045em] transition-transform duration-[var(--nx-duration)] group-hover:translate-x-2 sm:mt-3 sm:text-[clamp(2rem,3.5vw,4.4rem)]">{service.title}</strong>
                  <span className="mt-3 block max-w-lg text-sm leading-relaxed text-fg-soft sm:mt-4">{service.excerpt}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-primary sm:mt-5">entender melhor <Icon name="arrowUpRight" size={14} /></span>
                </span>
                <SmartImage asset={service.image} ratio="3/4" sizes="(max-width: 768px) 45vw, 12rem" className="w-[40%] rounded-[2px] md:w-full" imageClassName="transition-transform duration-[var(--nx-duration-slow)] group-hover:scale-[1.04]" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
