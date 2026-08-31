import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactChannels } from "@/components/ui/ContactChannels";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { companyContent } from "@/data/company";
import type { FooterProps } from "../types";

/** footer-06 — Dark editorial footer with large closing statement. */
export function Footer06({id}:FooterProps){return <Section id={id} as="footer" tone="dark" className="py-14 lg:py-20"><Container><p className="max-w-4xl font-heading text-h1 font-bold leading-tight text-on-dark">{companyContent.ctaTitle}</p><div className="mt-10 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-3"><div><Logo onDark/><SocialLinks className="mt-5" onDark/></div><nav aria-label="Navegação do rodapé"><h2 className="text-sm font-semibold text-on-dark">Explore</h2><ul className="mt-4 grid gap-2 text-sm text-on-dark-muted">{visibleNav.slice(0,7).map(item=><li key={item.href}><Link href={item.href} className="hover:text-accent">{item.label}</Link></li>)}</ul></nav><div><h2 className="text-sm font-semibold text-on-dark">Contato</h2><ContactChannels className="mt-4" onDark/></div></div><div className="mt-8"><FooterBottom onDark/></div></Container></Section>}
