import { clientConfig } from "@/config/client.config";

/**
 * Conteúdo legal específico do PREVIEW demonstrativo.
 * Este material não substitui documentos jurídicos do cliente final.
 */
const { company, legal } = clientConfig;

export interface LegalBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  updatedAt: string;
  intro: string;
  blocks: LegalBlock[];
}

export const privacyPolicy: LegalDocument = {
  title: "Privacidade deste preview",
  description: "Como o projeto demonstrativo trata informações durante a apresentação.",
  updatedAt: legal.lastReviewed,
  intro: "Esta versão é um modelo visual e não representa uma empresa real. Antes de qualquer publicação comercial, os documentos legais devem ser substituídos pelos textos aprovados para a operação real.",
  blocks: [
    {
      heading: "Projeto demonstrativo",
      paragraphs: ["Os nomes, contatos e localização presentes na configuração são placeholders técnicos. Eles não devem ser utilizados como informações de atendimento."],
    },
    {
      heading: "Formulário",
      paragraphs: ["O Form Engine está incluído para demonstrar interface, validação e arquitetura. A entrega real de leads só deve ser ativada depois da configuração de um provedor e da revisão do fluxo de privacidade."],
    },
    {
      heading: "Publicação final",
      paragraphs: ["Quando o modelo for adaptado para um cliente real, política de privacidade, bases legais, operadores, prazos de retenção e canais para exercício de direitos precisam refletir a operação efetiva da empresa."],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: "Cookies deste preview",
  description: "Configuração de cookies do modelo demonstrativo.",
  updatedAt: legal.lastReviewed,
  intro: "O banner de consentimento e as integrações de medição estão desativados nesta apresentação.",
  blocks: [
    { heading: "Medição", paragraphs: ["Nenhuma ferramenta de analytics foi configurada para o preview entregue neste pacote."] },
    { heading: "Versão comercial", paragraphs: ["Se analytics, pixels ou conteúdo de terceiros forem habilitados depois, o consentimento e a documentação devem ser revisados antes da publicação."] },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Termos do projeto demonstrativo",
  description: `Condições de uso do preview ${company.name}.`,
  updatedAt: legal.lastReviewed,
  intro: "Este site é uma apresentação conceitual de design e arquitetura frontend.",
  blocks: [
    { heading: "Conteúdo", paragraphs: ["Serviços, textos, contatos e demais informações são ilustrativos e precisam ser substituídos por dados verificados antes de uso comercial."] },
    { heading: "Imagens", paragraphs: ["As imagens são utilizadas neste pacote como referências fornecidas para a construção do modelo. A autorização e a licença para publicação pública devem ser verificadas pelo responsável pelo projeto."] },
    { heading: "Uso do modelo", paragraphs: ["O código pode ser personalizado para o cliente final preservando a arquitetura da Nexora Website Platform e as exigências aplicáveis ao conteúdo real."] },
  ],
};
