import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const heroImage = {
  src: "/images/estetica/20-beleza-madura.webp",
  alt: "Mulher madura em retrato de beleza natural",
  width: 1067,
  height: 1600,
};
const detailImage = {
  src: "/images/estetica/13-produtos-skincare.webp",
  alt: "Produtos de cuidado com a pele em composição editorial",
  width: 1067,
  height: 1600,
};
const textureImage = {
  src: "/images/estetica/17-creme-facial.webp",
  alt: "Aplicação delicada de creme facial",
  width: 1067,
  height: 1600,
};

export function AtelierHero(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "inicio";
  return (
    <Section id={id} flush className="isolate overflow-hidden border-b border-line bg-bg">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[8%] -z-10 select-none overflow-hidden">
        <p className="translate-x-[-.04em] whitespace-nowrap font-heading text-[clamp(8rem,24vw,27rem)] font-medium leading-[.72] tracking-[-.075em] text-primary/[.075]">
          PELE
        </p>
      </div>

      <Container size="wide" className="relative grid min-h-[calc(100svh-var(--nx-header-h))] items-center gap-12 py-10 md:py-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-8 lg:py-12">
        <Reveal effect="fade-right" className="relative z-10 max-w-2xl self-center lg:pr-6">
          <div className="flex items-center gap-4 text-[.7rem] font-bold uppercase tracking-[.23em] text-fg-soft">
            <span className="grid size-8 place-items-center rounded-full border border-line-strong">01</span>
            <span>Estética contemporânea / estudo visual</span>
          </div>

          <h1 className="mt-8 max-w-[10.5ch] font-heading text-[clamp(3.6rem,7.2vw,8.4rem)] font-medium leading-[.82] tracking-[-.06em] text-fg">
            Cuidar da pele também é <em className="font-normal text-primary">criar espaço.</em>
          </h1>

          <p className="mt-8 max-w-xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-fg-soft">
            Um modelo de site que troca a lógica de “clínica + cards” por uma narrativa mais sensorial, editorial e intencional.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contato" size="lg" icon="arrowUpRight">Agendar uma avaliação</Button>
            <Button href="/servicos" size="lg" variant="ghost" icon="arrowRight">Explorar cuidados</Button>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-line py-5 text-xs uppercase tracking-[.15em] text-fg-soft">
            <span>escuta</span>
            <span className="text-center">critério</span>
            <span className="text-right">presença</span>
          </div>
        </Reveal>

        <div className="relative min-h-[34rem] md:min-h-[46rem] lg:min-h-[calc(100svh-8rem)]">
          <Reveal effect="scale-in" className="absolute bottom-[4%] right-[2%] top-[1%] w-[72%] md:w-[66%] lg:w-[68%]">
            <SmartImage
              asset={heroImage}
              ratio="auto"
              priority
              sizes="(max-width: 1024px) 72vw, 44vw"
              className="h-full rounded-[2px] bg-primary-soft"
              imageClassName="object-[center_24%]"
            />
          </Reveal>

          <Reveal effect="fade-up" index={1} staggerMs={140} className="absolute bottom-[7%] left-[1%] w-[35%] md:w-[31%] lg:left-[4%] lg:w-[29%]">
            <div className="border border-line bg-bg p-2 shadow-soft">
              <SmartImage asset={detailImage} ratio="3/4" sizes="(max-width: 1024px) 32vw, 18vw" className="rounded-none" />
              <p className="px-1 pb-1 pt-3 text-[0.72rem] font-semibold uppercase tracking-[.18em] text-fg-soft">objetos / ritual / detalhe</p>
            </div>
          </Reveal>

          <Reveal effect="fade-left" index={2} staggerMs={140} className="absolute right-[0] top-[8%] w-[24%] md:w-[21%] lg:right-[-1%] lg:w-[19%]">
            <div className="border border-line bg-bg p-2 shadow-soft">
              <SmartImage asset={textureImage} ratio="1/1" sizes="(max-width: 1024px) 24vw, 12vw" className="rounded-none" />
            </div>
          </Reveal>

          <div aria-hidden="true" className="absolute left-[2%] top-[10%] hidden h-[42%] w-px bg-line lg:block" />
          <p aria-hidden="true" className="absolute left-[1.5%] top-[8%] hidden origin-bottom-left rotate-90 text-[.62rem] font-bold uppercase tracking-[.22em] text-fg-soft lg:block">
            atelier / issue 01 / 2026
          </p>
          <div className="absolute bottom-[2%] right-[2%] z-20 flex items-center gap-3 bg-secondary px-4 py-3 text-xs font-semibold uppercase tracking-[.16em] text-on-dark">
            <span className="size-2 rounded-full bg-accent" />
            beleza sem pressa
          </div>
        </div>
      </Container>
    </Section>
  );
}
