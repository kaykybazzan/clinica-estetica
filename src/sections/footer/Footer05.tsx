import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FooterBottom } from "@/components/layout/FooterBottom";
import { visibleNav } from "@/config/features";
import { clientConfig } from "@/config/client.config";
import type { FooterProps } from "../types";

/** footer-05 — Minimal brand footer with compact navigation. */
export function Footer05({id}:FooterProps){return <Section id={id} as="footer" className="py-10"><Container><div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between"><div className="max-w-md"><Logo/><p className="mt-3 text-sm text-fg-soft">{clientConfig.company.description}</p></div><nav aria-label="Navegação do rodapé"><ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">{visibleNav.map(item=><li key={item.href}><Link href={item.href} className="hover:text-primary">{item.label}</Link></li>)}</ul><SocialLinks className="mt-5 lg:justify-end"/></nav></div><div className="mt-8"><FooterBottom/></div></Container></Section>}
