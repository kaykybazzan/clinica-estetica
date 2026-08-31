import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials as allTestimonials } from "@/data/testimonials";
import type { TestimonialsProps } from "../types";

/** testimonials-06 — Clean review wall without card chrome. */
export function Testimonials06({id="depoimentos",eyebrow,title,lead,items}:TestimonialsProps){const list=items??allTestimonials;return <Section id={id}><Container><SectionHeader align="center" eyebrow={eyebrow??"Avaliações"} title={title??"O padrão se repete nas avaliações"} lead={lead??"Relatos curtos, apresentados sem distrações."}/><div className="mt-12 columns-1 gap-8 md:columns-2 lg:columns-3">{list.slice(0,6).map((item,index)=><Reveal key={`${item.name}-${index}`} index={index} className="mb-8 break-inside-avoid border-l-2 border-primary pl-5"><Rating value={item.rating}/><blockquote className="mt-3 leading-relaxed text-fg-soft">“{item.quote}”</blockquote><p className="mt-4 text-sm font-semibold">{item.name}</p><p className="text-xs text-fg-soft">{item.role}</p></Reveal>)}</div></Container></Section>}
