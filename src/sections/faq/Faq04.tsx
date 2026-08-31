import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { faq as allFaq } from "@/data/faq";
import type { FaqProps } from "../types";

/** faq-04 — Split FAQ with sticky help prompt. */
export function Faq04({id="faq",eyebrow,title,lead,items,limit=7}:FaqProps){const list=(items??allFaq).slice(0,limit);return <Section id={id} tone="surface"><Container><div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16"><div className="lg:sticky lg:top-28 lg:self-start"><SectionHeader eyebrow={eyebrow??"Dúvidas"} title={title??"O que normalmente perguntam antes de falar conosco"} lead={lead??"Se sua dúvida não estiver aqui, envie diretamente para a equipe."}/><WhatsAppButton className="mt-6" source="faq-04">Fazer outra pergunta</WhatsAppButton></div><Accordion items={list} className="border-t border-line"/></div></Container></Section>}
