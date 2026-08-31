import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { companyContent } from "@/data/company";
import type { CtaProps } from "../types";

/** cta-07 — Minimal editorial CTA with two clear choices. */
export function Cta07({id="orcamento",title,text,service}:CtaProps){return <Section id={id}><Container><div className="border-y border-line py-10 lg:flex lg:items-center lg:justify-between lg:gap-12"><div className="max-w-2xl"><Heading level={2}>{title??companyContent.ctaTitle}</Heading><p className="mt-3 text-fg-soft">{text??companyContent.ctaText}</p></div><div className="mt-6 flex flex-wrap gap-3 lg:mt-0"><WhatsAppButton source="cta-07" context={service?{kind:"service",service}:{kind:"quote"}}>Falar no WhatsApp</WhatsAppButton><Button href="/contato" variant="outline">Outros canais</Button></div></div></Container></Section>}
