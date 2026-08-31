import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SmartImage } from "@/components/ui/SmartImage";
import { gallery as allGallery } from "@/data/gallery";
import type { GalleryProps } from "../types";

/** gallery-06 — Horizontal visual rail; naturally scrollable on small screens. */
export function Gallery06({ id="galeria", eyebrow,title,lead,items,limit=8 }:GalleryProps){const list=(items??allGallery).slice(0,limit);return <Section id={id} tone="surface"><Container><SectionHeader eyebrow={eyebrow??"Registros"} title={title??"Um recorte do dia a dia"} lead={lead??"Deslize para explorar mais imagens."}/></Container><div className="mx-auto mt-10 flex max-w-[1600px] snap-x gap-4 overflow-x-auto px-[var(--nx-gutter)] pb-4 [scrollbar-width:thin]">{list.map((item,index)=><figure key={`${item.image.src}-${index}`} className="w-[78vw] max-w-[32rem] shrink-0 snap-start"><SmartImage asset={item.image} ratio="4/3" sizes="(max-width: 768px) 78vw, 32rem" className="rounded-[var(--nx-image-radius)]"/><figcaption className="mt-2 flex items-center justify-between gap-3 text-sm"><span className="font-medium">{item.caption}</span><span className="text-fg-soft">{item.category}</span></figcaption></figure>)}</div></Section>}
