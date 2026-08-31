import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { faq as allFaq } from "@/data/faq";
import type { FaqProps } from "../types";

/** faq-05 — Dark FAQ for high-contrast page endings. */
export function Faq05({id="faq",eyebrow,title,lead,items,limit=6}:FaqProps){const list=(items??allFaq).slice(0,limit);return <Section id={id} tone="dark"><Container><SectionHeader align="center" tone="dark" eyebrow={eyebrow??"Antes de decidir"} title={title??"Respostas diretas para dúvidas importantes"} lead={lead}/><Accordion items={list} tone="dark" className="mx-auto mt-10 max-w-3xl border-t border-white/10"/></Container></Section>}
