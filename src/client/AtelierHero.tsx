import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothText } from "@/components/ui/SmoothText";
import { WaveText } from "@/components/ui/WaveText";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import Link from "next/link";

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

      <Container size="wide" className="relative grid min-h-[calc(100svh-var(--nx-header-h))] items-center gap-8 py-8 md:gap-12 md:py-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-8 lg:py-12">
        <Reveal effect="fade-right" className="relative z-10 max-w-2xl self-center lg:pr-6 order-2 lg:order-1">
          <SmoothText delay={0.1}>
            <div className="flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.23em] text-fg-">
              <span className="grid size-7 place-items-center rounded-full border border-line-strong sm:size-8">01</span>
              <span className="hidden sm:inline">Estética contemporânea / estudo visual</span>
              <span className="sm:hidden">Estética contemporânea</span>
            </div>
          </SmoothText>

          <SmoothText delay={0.2}>
            <h1 className="mt-6 max-w-[10.5ch] font-heading text-[clamp(2.4rem,8vw,8.4rem)] font-medium leading-[.88] tracking-tight text-fg sm:mt-8 sm:text-[clamp(3.2rem,6.5vw,8.4rem)] sm:leading-[.82]">
              <WaveText text="Cuidar da pele também é" delay={0} />
              <em className="font-normal text-primary">
                <WaveText text="criar espaço." delay={0.3} italic />
              </em>
            </h1>
          </SmoothText>

          <SmoothText delay={0.3}>
            <p className="mt-6 max-w-xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-fg-soft sm:mt-8 sm:text-[clamp(1rem,1.4vw,1.2rem)]">
              Um modelo de site que troca a lógica de "clínica + cards" por uma narrativa mais sensorial, editorial e intencional.
            </p>
          </SmoothText>

          <SmoothText delay={0.4}>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:mt-9">
              <Link href="/contato" className="w-full sm:w-auto">
                <LuxuryButton variant="primary" icon="arrowUpRight" className="w-full sm:w-auto">Agendar uma avaliação</LuxuryButton>
              </Link>
              <Link href="/servicos" className="w-full sm:w-auto">
                <LuxuryButton variant="secondary" icon="arrowRight" className="w-full sm:w-auto">Explorar cuidados</LuxuryButton>
              </Link>
            </div>
          </SmoothText>

          <SmoothText delay={0.5}>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-line py-4 text-[0.65rem] uppercase tracking-[.15em] text-fg-soft sm:mt-12 sm:py-5 sm:text-xs">
              <span>escuta</span>
              <span className="text-center">critério</span>
              <span className="text-right">presença</span>
            </div>
          </SmoothText>
        </Reveal>

        <div className="relative min-h-[28rem] md:min-h-[34rem] lg:min-h-[calc(100svh-8rem)] order-1 lg:order-2">
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
              <p className="px-1 pb-1 pt-3 text-[0.7rem] font-semibold uppercase tracking-[.18em] text-fg-soft sm:text-[0.72rem]">objetos / ritual / detalhe</p>
            </div>
          </Reveal>

          <Reveal effect="fade-left" index={2} staggerMs={140} className="absolute right-[0] top-[8%] w-[24%] md:w-[21%] lg:right-[-1%] lg:w-[19%]">
            <div className="border border-line bg-bg p-2 shadow-soft">
              <SmartImage asset={textureImage} ratio="1/1" sizes="(max-width: 1024px) 24vw, 12vw" className="rounded-none" />
            </div>
          </Reveal>

          <div className="absolute bottom-[2%] right-[2%] z-20 flex items-center gap-2 bg-secondary px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[.16em] text-on-dark sm:gap-3 sm:px-4 sm:py-3 sm:text-xs">
            <span className="size-1.5 rounded-full bg-accent sm:size-2" />
            <span className="hidden sm:inline">beleza sem pressa</span>
            <span className="sm:hidden">beleza</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
