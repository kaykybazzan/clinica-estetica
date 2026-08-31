import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothText } from "@/components/ui/SmoothText";

const image = {
  src: "/images/estetica/14-beleza-natural.webp",
  alt: "Mulher diante do espelho em momento de autocuidado",
  width: 1600,
  height: 1067,
};

export function EditorialManifesto(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "manifesto";
  return (
    <Section id={id} tone="dark" flush className="overflow-hidden border-b border-white/10">
      <Container size="wide" className="grid lg:grid-cols-[1.35fr_.65fr]">
        <Reveal className="flex min-h-[32rem] flex-col justify-between border-white/10 py-12 lg:min-h-[46rem] lg:border-r lg:py-20 lg:pr-16">
          <SmoothText delay={0.1}>
            <div className="flex items-center justify-between gap-3 text-[.6rem] font-semibold uppercase tracking-[.22em] text-on-dark-muted sm:gap-5 sm:text-[.65rem]">
              <span>manifesto / 02</span>
              <span className="hidden sm:inline">quiet luxury, sem clichê</span>
              <span className="sm:hidden">quiet luxury</span>
            </div>
          </SmoothText>
          <SmoothText delay={0.2}>
            <p className="my-12 max-w-[12ch] font-heading text-[clamp(2.8rem,6vw,8.6rem)] font-medium leading-[.88] tracking-[-.055em] text-on-dark sm:my-16 sm:text-[clamp(3.4rem,7.4vw,8.6rem)] sm:leading-[.85]">
              Precisão sem perder a <em className="font-normal text-accent">delicadeza.</em>
            </p>
          </SmoothText>
          <SmoothText delay={0.3}>
            <div className="grid max-w-3xl gap-6 border-t border-white/10 pt-6 md:gap-8 md:pt-8 md:grid-cols-2">
              <p className="text-sm leading-relaxed text-on-dark-muted">A interface não tenta parecer médica demais nem excessivamente feminina. Ela fica no meio: criteriosa, humana e visualmente segura.</p>
              <p className="text-sm leading-relaxed text-on-dark-muted">O rosé deixa de ser "cor de fundo padrão" e passa a funcionar como assinatura, enquanto preto quente e creme constroem contraste.</p>
            </div>
          </SmoothText>
        </Reveal>

        <Reveal effect="fade-left" className="relative min-h-[34rem] overflow-hidden lg:min-h-[46rem]">
          <SmartImage asset={image} ratio="auto" sizes="(max-width: 1024px) 100vw, 35vw" className="absolute inset-0 h-full rounded-none bg-secondary" imageClassName="object-[center_45%] opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
            <SmoothText delay={0.4}>
              <p className="max-w-[19ch] font-heading text-[clamp(2rem,3.2vw,3.8rem)] leading-[.95] text-on-dark">"O visual também faz parte da sensação de cuidado."</p>
            </SmoothText>
            <SmoothText delay={0.5}>
              <p className="mt-5 text-[.65rem] font-semibold uppercase tracking-[.2em] text-accent">direção conceitual / sem depoimento fictício</p>
            </SmoothText>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
