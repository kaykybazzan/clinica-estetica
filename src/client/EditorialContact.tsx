import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export function EditorialContact(props: Record<string, unknown>) {
  const id = typeof props.id === "string" ? props.id : "contato";
  return (
    <Section id={id} tone="dark" className="overflow-hidden">
      <Container size="wide" className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <Reveal effect="fade-right" className="flex flex-col justify-between">
          <div>
            <p className="text-[.68rem] font-bold uppercase tracking-[.22em] text-accent">AGENDAMENTO / 05</p>
            <h2 className="mt-5 max-w-[8.5ch] font-heading text-[clamp(3.6rem,6.5vw,8rem)] font-medium leading-[.84] tracking-[-.055em] text-on-dark">Seu tempo pode começar <em className="font-normal text-accent">aqui.</em></h2>
            <p className="mt-7 max-w-lg text-on-dark-muted">O formulário usa o Form Engine da base: campos declarativos, validação, honeypot, rate limit e estrutura pronta para integrar o canal real da empresa.</p>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-on-dark-muted">
            <strong className="block uppercase tracking-[.16em] text-on-dark">Projeto demonstrativo</strong>
            Nenhum telefone, endereço, logo ou contato real foi utilizado nesta apresentação.
          </div>
        </Reveal>

        <Reveal effect="fade-left" className="relative bg-bg p-6 text-fg shadow-lift sm:p-8 lg:p-10">
          <div aria-hidden="true" className="absolute right-6 top-5 font-heading text-[5rem] leading-none text-primary/[.09]">05</div>
          <p className="relative text-[.68rem] font-bold uppercase tracking-[.2em] text-primary">SIMULAR SOLICITAÇÃO</p>
          <h3 className="relative mt-3 max-w-[14ch] font-heading text-[clamp(2rem,3vw,3.6rem)] font-medium leading-[.95]">Conte o que você gostaria de conhecer.</h3>
          <ContactForm className="relative mt-8" />
        </Reveal>
      </Container>
    </Section>
  );
}
