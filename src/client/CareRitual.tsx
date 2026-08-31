import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    kicker: "ANTES DO PROTOCOLO",
    title: "Escutar",
    text: "Objetivos, rotina e expectativas entram na conversa antes de qualquer escolha.",
    image: { src: "/images/estetica/06-consulta-estetica.webp", alt: "Conversa de avaliação em ambiente de estética", width: 1600, height: 1068 },
  },
  {
    number: "02",
    kicker: "COM CRITÉRIO",
    title: "Selecionar",
    text: "A proposta ganha foco: menos excesso visual, menos pressão e mais contexto para decidir.",
    image: { src: "/images/estetica/11-ritual-skincare.webp", alt: "Ritual de skincare em composição delicada", width: 1067, height: 1600 },
  },
  {
    number: "03",
    kicker: "DEPOIS TAMBÉM",
    title: "Acompanhar",
    text: "O relacionamento não termina na sessão. O site prepara espaço para orientação e continuidade.",
    image: { src: "/images/estetica/19-pele-feminina.webp", alt: "Mulher em rotina de cuidado com a pele", width: 1600, height: 1067 },
  },
];

export function CareRitual(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "ritual";
  return (
    <Section id={id} flush className="overflow-hidden bg-bg">
      <Container size="wide" className="py-[var(--nx-section-y)]">
        <Reveal className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-[.7rem] font-bold uppercase tracking-[.22em] text-primary">RITUAL / 04</p>
            <h2 className="mt-4 max-w-[8ch] font-heading text-[clamp(3rem,5.4vw,6.2rem)] font-medium leading-[.86] tracking-[-.05em]">O ritmo também comunica.</h2>
          </div>
          <p className="max-w-2xl text-[clamp(1rem,1.5vw,1.22rem)] leading-relaxed text-fg-soft lg:justify-self-end">Em vez de uma timeline convencional, a jornada vira um tríptico fotográfico: cada etapa ocupa espaço, tem voz própria e continua conectada às demais.</p>
        </Reveal>
      </Container>

      <div className="grid border-y border-line lg:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.number} index={index} className="group relative min-h-[34rem] overflow-hidden border-line lg:min-h-[44rem] lg:border-r last:lg:border-r-0">
            <SmartImage asset={step.image} ratio="auto" sizes="(max-width: 1024px) 100vw, 34vw" className="absolute inset-0 h-full rounded-none" imageClassName="transition-transform duration-[900ms] ease-brand-out group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-secondary/5" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 text-[.64rem] font-bold uppercase tracking-[.2em] text-on-dark-muted lg:p-8">
              <span>{step.kicker}</span><span>{step.number}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <h3 className="font-heading text-[clamp(3.1rem,5vw,6rem)] font-medium leading-none tracking-[-.05em] text-on-dark">{step.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-on-dark-muted">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
