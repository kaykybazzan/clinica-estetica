import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { gallery as allGallery } from "@/data/gallery";
import type { GalleryProps } from "../types";

/** gallery-05 — Editorial mosaic with one dominant image. */
export function Gallery05({ id = "galeria", eyebrow, title, lead, items, limit = 5 }: GalleryProps) {
  const list=(items??allGallery).slice(0,limit); if(!list.length)return null;
  return <Section id={id}><Container><SectionHeader eyebrow={eyebrow??"Galeria"} title={title??"Veja de perto"} lead={lead??"Uma seleção de registros reais da estrutura e do trabalho."}/><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{list.map((item,index)=><Reveal key={`${item.image.src}-${index}`} index={index} className={index===0?"md:col-span-2 lg:col-span-2 lg:row-span-2":""}><figure className="group h-full"><SmartImage asset={item.image} ratio={index===0?"4/3":"1/1"} className="h-full rounded-[var(--nx-image-radius)]" imageClassName="transition-transform duration-[var(--nx-duration)] group-hover:scale-[1.02]"/><figcaption className="mt-2 text-sm text-fg-soft">{item.caption}</figcaption></figure></Reveal>)}</div></Container></Section>;
}
