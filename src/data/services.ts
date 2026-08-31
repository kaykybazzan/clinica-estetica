import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "curadoria-facial",
    title: "Curadoria facial",
    excerpt: "Uma leitura inicial para organizar prioridades e possibilidades de cuidado.",
    description: "Categoria demonstrativa para apresentar avaliação, rotina e protocolos faciais sem prometer resultados específicos.",
    icon: "spark",
    image: { src: "/images/estetica/01-procedimento-estetico.webp", alt: "Procedimento facial em ambiente de estética", width: 1067, height: 1600 },
    deliverables: ["Avaliação inicial", "Definição de prioridades", "Orientações pós-atendimento"],
    featured: true,
  },
  {
    slug: "renovacao-textura",
    title: "Renovação & textura",
    excerpt: "Protocolos voltados à aparência e ao toque da pele, definidos após avaliação profissional.",
    description: "Bloco ilustrativo para procedimentos de renovação da pele. O conteúdo final deve ser preenchido com os serviços reais da empresa.",
    icon: "layers",
    image: { src: "/images/estetica/10-microagulhamento.webp", alt: "Procedimento estético de renovação da pele", width: 1067, height: 1600 },
    deliverables: ["Avaliação de indicação", "Plano de sessões", "Cuidados de manutenção"],
    featured: true,
  },
  {
    slug: "tecnologia-luz",
    title: "Tecnologia de luz",
    excerpt: "Tecnologia apresentada como ferramenta de precisão, conforto e acompanhamento.",
    description: "Categoria conceitual para equipamentos de luz e tecnologia estética, sem atribuir eficácia ou indicação a um equipamento específico.",
    icon: "bolt",
    image: { src: "/images/estetica/07-tratamento-facial-led.webp", alt: "Atendimento estético com tecnologia de luz", width: 1067, height: 1600 },
    deliverables: ["Triagem profissional", "Protocolo personalizado", "Acompanhamento"],
    featured: true,
  },
  {
    slug: "ritual-autocuidado",
    title: "Ritual de autocuidado",
    excerpt: "Um espaço para desacelerar e transformar rotina em um momento de presença.",
    description: "Categoria demonstrativa de bem-estar e autocuidado para mostrar uma abordagem menos clínica e mais sensorial.",
    icon: "heart",
    image: { src: "/images/estetica/12-autocuidado-feminino.webp", alt: "Mulher em momento de autocuidado", width: 1067, height: 1600 },
    deliverables: ["Experiência personalizada", "Orientação de rotina", "Continuidade do cuidado"],
    featured: true,
  },
  {
    slug: "manutencao-pele",
    title: "Manutenção da pele",
    excerpt: "Uma jornada contínua para organizar hábitos, intervalos e revisões ao longo do tempo.",
    description: "Serviço ilustrativo para demonstrar acompanhamento e continuidade no site-modelo.",
    icon: "calendar",
    image: { src: "/images/estetica/15-rotina-de-pele.webp", alt: "Rotina de cuidados com a pele", width: 1067, height: 1600 },
    deliverables: ["Revisão periódica", "Ajustes de rotina", "Orientações de continuidade"],
  },
];

export const featuredServices = services.filter((service) => service.featured);
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
