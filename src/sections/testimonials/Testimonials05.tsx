import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials as allTestimonials } from "@/data/testimonials";
import type { TestimonialsProps } from "../types";

/** testimonials-05 — Featured quote plus supporting reviews. */
export function Testimonials05({id="depoimentos",eyebrow,title,lead,items}:TestimonialsProps){const list=items??allTestimonials;const featured=list[0];if(!featured)return null;return <Section id={id} tone="surface"><Container><SectionHeader eyebrow={eyebrow??"Confiança"} title={title??"Experiências contadas por quem já passou por aqui"} lead={lead}/><div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12"><Reveal effect="fade-right" className="rounded-[var(--nx-card-radius)] bg-secondary p-7 text-on-dark lg:p-10"><Rating value={featured.rating}/><blockquote className="mt-5 font-heading text-h2 font-semibold leading-tight">“{featured.quote}”</blockquote><p className="mt-6 text-sm text-on-dark-muted"><strong className="text-on-dark">{featured.name}</strong> · {featured.role}</p></Reveal><div className="grid gap-5">{list.slice(1,4).map((item,index)=><Reveal key={`${item.name}-${index}`} index={index} className="border-t border-line pt-5"><Rating value={item.rating}/><blockquote className="mt-3 text-sm text-fg-soft">“{item.quote}”</blockquote><p className="mt-3 text-sm font-semibold">{item.name} <span className="font-normal text-fg-soft">· {item.role}</span></p></Reveal>)}</div></div></Container></Section>}
