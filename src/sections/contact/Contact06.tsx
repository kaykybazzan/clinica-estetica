import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Icon } from "@/components/ui/Icon";
import { clientConfig } from "@/config/client.config";
import { mapsDirectionsHref } from "@/integrations/maps";
import { telHref } from "@/utils/format";
import type { ContactProps } from "../types";

/** contact-06 — Compact action matrix for mobile-first local businesses. */
export function Contact06({id="contato",title,lead}:ContactProps){return <Section id={id} tone="dark"><Container><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><Heading level={2} className="text-on-dark">{title??"Fale diretamente com a equipe"}</Heading><p className="mt-3 max-w-2xl text-on-dark-muted">{lead??"Sem central intermediária: escolha o canal que funciona melhor agora."}</p></div><div className="flex flex-wrap gap-3"><WhatsAppButton variant="light" source="contact-06">WhatsApp</WhatsAppButton>{clientConfig.contact.phone&&<Button href={telHref(clientConfig.contact.phone)} variant="light" icon="phone">Ligar</Button>}<Button href={mapsDirectionsHref()} variant="outline" icon="mapPin" className="border-white/30 text-on-dark hover:border-accent hover:text-accent">Como chegar</Button></div></div><div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-on-dark-muted"><span className="flex items-center gap-2"><Icon name="mail" size={16}/>{clientConfig.contact.email}</span><span className="flex items-center gap-2"><Icon name="mapPin" size={16}/>{clientConfig.address.city}/{clientConfig.address.state}</span></div></Container></Section>}
