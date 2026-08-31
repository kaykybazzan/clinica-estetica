import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroSection, ServicesSection, BenefitsSection, FaqSection } from "@/sections";
import type { Service, Benefit, FaqItem } from "@/types/content";

export const metadata: Metadata = { title: "Content Stress Test", robots: { index: false, follow: false } };

const image = { src: "/images/hero/principal.jpg", alt: "Imagem de teste de conteúdo", width: 1600, height: 1000 } as const;
const long = "Conteúdo deliberadamente extenso para verificar quebra de linha, expansão vertical, comportamento responsivo e resistência do componente quando o material real do cliente não cabe em uma demonstração perfeita.";
const services: Service[] = Array.from({ length: 12 }, (_, i) => ({
  slug: `stress-service-${i + 1}`,
  title: i === 0 ? "Título extremamente longo para validar componentes com nomes de serviços que ocupam múltiplas linhas sem quebrar o layout" : `Serviço de teste ${i + 1}`,
  excerpt: long,
  description: `${long} ${long}`,
  icon: "check",
  image,
  deliverables: [long, "Segundo item verificável"],
}));
const benefits: Benefit[] = Array.from({ length: 8 }, (_, i) => ({ title: `Diferencial com título ${i + 1}`, description: long, icon: "shield" }));
const faq: FaqItem[] = Array.from({ length: 10 }, (_, i) => ({ question: `Pergunta de stress ${i + 1}: ${long.slice(0, 80)}?`, answer: `${long} ${long}` }));

export default function StressPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      <HeroSection eyebrow="Stress test" title={`Título principal com comprimento extremo — ${long.slice(0, 120)}`} subtitle={`${long} ${long}`} image={image} />
      <ServicesSection title="Doze serviços e textos grandes" items={services} limit={12} />
      <BenefitsSection title="Diferenciais sob pressão" items={benefits} />
      <FaqSection title="Perguntas extensas" items={faq} limit={10} />
    </>
  );
}
