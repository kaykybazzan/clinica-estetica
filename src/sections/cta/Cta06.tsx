import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading, Lead } from "@/components/ui/Heading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { benefits } from "@/data/benefits";
import { companyContent } from "@/data/company";
import type { CtaProps } from "../types";

/** cta-06 — Conversion band with trust checklist. */
export function Cta06({id="orcamento",title,text,service}:CtaProps){return <Section id={id} tone="primary"><Container><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12"><div><Heading level={2} className="text-on-primary">{title??companyContent.ctaTitle}</Heading><Lead className="mt-3 max-w-2xl text-on-primary/80">{text??companyContent.ctaText}</Lead><ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-on-primary/90">{benefits.slice(0,3).map((item)=><li key={item.title} className="flex items-center gap-2"><Icon name="check" size={15}/>{item.title}</li>)}</ul></div><WhatsAppButton size="lg" variant="light" source="cta-06" context={service?{kind:"service",service}:{kind:"quote"}}>Solicitar agora</WhatsAppButton></div></Container></Section>}
