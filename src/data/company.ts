import { clientConfig } from "@/config/client.config";

export const companyContent = {
  eyebrow: "ESTÉTICA CONTEMPORÂNEA",
  headline: "Pele, presença e cuidado em um mesmo ritmo.",
  subheadline:
    "Uma experiência digital concebida para apresentar cuidado personalizado com mais atmosfera, clareza e intenção.",
  aboutTitle: "Menos aparência de catálogo. Mais sensação de cuidado.",
  aboutLead:
    "Este modelo organiza a jornada como um editorial: primeiro cria contexto, depois apresenta possibilidades e só então convida para a avaliação.",
  aboutParagraphs: [
    "O projeto parte da ideia de que uma marca de estética não precisa parecer uma coleção de cartões iguais. Espaço, fotografia, tipografia e ritmo também comunicam posicionamento.",
    "A linguagem é delicada sem ser frágil, premium sem parecer distante e técnica sem transformar a experiência em algo hospitalar.",
    "Todos os dados comerciais permanecem demonstrativos até a personalização com informações reais e autorizadas.",
  ],
  mission: "Criar uma experiência de cuidado que pareça individual desde o primeiro contato.",
  differentiators: [
    "Narrativa visual antes da venda direta",
    "Hierarquia clara para reduzir dúvidas",
    "Fotografia tratada como parte da identidade",
    "Conversão focada em avaliação, não em pressão",
  ],
  ctaTitle: "Seu momento de cuidado pode começar por uma conversa.",
  ctaText: "Use o formulário demonstrativo para visualizar o fluxo de agendamento do projeto final.",
  cityLine: `${clientConfig.address.city}`,
} as const;
