import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SmoothText } from "@/components/ui/SmoothText";

export function EditorialContact(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "contato";
  return (
    <Section id={id} tone="dark" className="overflow-hidden">
      <Container size="wide" className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <Reveal effect="fade-right" className="flex flex-col justify-between">
          <div>
            <SmoothText delay={0.1}>
              <p className="text-[.63rem] font-bold uppercase tracking-[.22em] text-accent sm:text-[.68rem]">AGENDAMENTO / 05</p>
            </SmoothText>
            <SmoothText delay={0.2}>
              <h2 className="mt-4 max-w-[8.5ch] font-heading text-[clamp(2.8rem,6vw,8rem)] font-medium leading-[.88] tracking-[-.055em] text-on-dark sm:mt-5 sm:text-[clamp(3.6rem,6.5vw,8rem)] sm:leading-[.84]">Seu tempo pode começar <em className="font-normal text-accent">aqui.</em></h2>
            </SmoothText>
            <SmoothText delay={0.3}>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-on-dark-muted sm:mt-7">O formulário usa o Form Engine da base: campos declarativos, validação, honeypot, rate limit e estrutura pronta para integrar o canal real da empresa.</p>
            </SmoothText>
          </div>
          <SmoothText delay={0.4}>
            <div className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-on-dark-muted sm:mt-12 sm:pt-6">
              <strong className="block uppercase tracking-[.16em] text-on-dark">Projeto demonstrativo</strong>
              Nenhum telefone, endereço, logo ou contato real foi utilizado nesta apresentação.
            </div>
          </SmoothText>
        </Reveal>

        <Reveal effect="fade-left" className="relative bg-bg p-4 text-fg shadow-lift sm:p-6 lg:p-10">
          <div aria-hidden="true" className="absolute right-4 top-4 font-heading text-[4rem] leading-none text-primary/[.09] sm:right-6 sm:top-5 sm:text-[5rem]">05</div>
          <SmoothText delay={0.5}>
            <p className="relative text-[.63rem] font-bold uppercase tracking-[.2em] text-primary sm:text-[.68rem]">SIMULAR SOLICITAÇÃO</p>
          </SmoothText>
          <SmoothText delay={0.6}>
            <h3 className="relative mt-2 max-w-[14ch] font-heading text-[clamp(1.8rem,3vw,3.6rem)] font-medium leading-[.95] sm:mt-3">Conte o que você gostaria de conhecer.</h3>
          </SmoothText>
          <ContactForm className="relative mt-6 sm:mt-8" />
        </Reveal>
      </Container>
    </Section>
  );
}
