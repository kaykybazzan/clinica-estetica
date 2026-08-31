import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactChannels, BusinessHoursList } from "@/components/ui/ContactChannels";
import { Card } from "@/components/ui/Card";
import { clientConfig } from "@/config/client.config";
import type { ContactProps } from "../types";

/** contact-05 — Formal lead form with contextual contact sidebar. */
export function Contact05({id="contato",eyebrow,title,lead,presetService}:ContactProps){return <Section id={id} tone="surface"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div><SectionHeader eyebrow={eyebrow??"Vamos conversar"} title={title??"Conte o que você precisa"} lead={lead??"Escolha o canal ou envie os dados para a equipe responder com contexto."}/><div className="mt-7"><ContactChannels/><div className="mt-7 border-t border-line pt-6"><h3 className="font-heading font-semibold">Horários</h3><BusinessHoursList className="mt-3"/></div></div></div><Card className="bg-bg"><h3 className="font-heading text-h3 font-semibold">Solicitar contato</h3><p className="mt-1 text-sm text-fg-soft">A resposta será enviada pelos canais informados.</p>{clientConfig.features.contactForm?<ContactForm presetService={presetService} className="mt-6"/>:<p className="mt-6 text-sm text-fg-soft">Formulário desativado para este cliente.</p>}</Card></div></Container></Section>}
