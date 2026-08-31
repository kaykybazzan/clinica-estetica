import type { NavItem } from "@/types/content";

export const primaryNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Conceito", href: "/sobre", requires: "about" },
  { label: "Cuidados", href: "/servicos", requires: "services" },
  { label: "Atmosfera", href: "/galeria", requires: "gallery" },
  { label: "Dúvidas", href: "/faq", requires: "faq" },
  { label: "Agendar", href: "/contato", requires: "contact" },
];

export const legalNav: NavItem[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];
