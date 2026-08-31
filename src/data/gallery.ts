import type { GalleryItem } from "@/types/content";

const items = [
  ["14-beleza-natural.webp", "Beleza natural", "gesto", 1600, 1067],
  ["11-ritual-skincare.webp", "Ritual de cuidado", "ritual", 1067, 1600],
  ["04-rejuvenescimento.webp", "Cuidado em diferentes fases", "presença", 1067, 1600],
  ["17-creme-facial.webp", "Texturas do cuidado", "textura", 1067, 1600],
  ["18-eye-patches.webp", "Pequenos intervalos", "ritual", 1067, 1600],
  ["06-consulta-estetica.webp", "Conversa antes do protocolo", "escuta", 1600, 1068],
  ["19-pele-feminina.webp", "Rotina e naturalidade", "rotina", 1600, 1067],
  ["02-estetica-facial.webp", "Precisão no atendimento", "técnica", 1067, 1600],
  ["09-clinica-feminina.webp", "Experiência personalizada", "atendimento", 1067, 1600],
  ["13-produtos-skincare.webp", "Curadoria de produtos", "detalhe", 1067, 1600],
  ["16-cuidados-com-a-pele.webp", "Cuidado cotidiano", "rotina", 1067, 1600],
  ["20-beleza-madura.webp", "Beleza em todas as fases", "presença", 1067, 1600],
] as const;

export const gallery: GalleryItem[] = items.map(([file, caption, category, width, height]) => ({
  image: { src: `/images/estetica/${file}`, alt: caption, width, height },
  caption,
  category,
}));

export const galleryCategories = [
  { id: "gesto", label: "Gesto" },
  { id: "ritual", label: "Ritual" },
  { id: "presença", label: "Presença" },
  { id: "textura", label: "Textura" },
  { id: "escuta", label: "Escuta" },
  { id: "rotina", label: "Rotina" },
  { id: "técnica", label: "Técnica" },
  { id: "atendimento", label: "Atendimento" },
  { id: "detalhe", label: "Detalhe" },
] as const;
