import type { ClientConfig } from "./client.schema";

/**
 * Projeto demonstrativo de estética — sem dados de empresa real.
 * Arquitetura: Nexora Website Platform v3 + client extension layer.
 */
export const clientConfig: ClientConfig = {
  platformVersion: "3.0.0",
  slug: "atelier-estetica-conceito",
  segment: "beauty-salon",

  company: {
    name: "Atelier Estética",
    legalName: "Projeto Demonstrativo",
    slogan: "Pele, presença e cuidado em um mesmo ritmo.",
    description:
      "Modelo conceitual de experiência digital para estética personalizada, com direção editorial, navegação sensorial e foco em agendamento.",
    cnpj: "",
    priceRange: "$$$",
  },

  contact: {
    phone: "",
    whatsapp: "",
    email: "contato@exemplo.com.br",
  },

  address: {
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "Cidade Exemplo",
    state: "SC",
    zipCode: "",
    country: "BR",
    serviceAreas: ["Atendimento demonstrativo"],
    mapsEmbedQuery: "",
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    googleBusiness: "",
  },

  businessHours: {
    monday: { closed: true },
    tuesday: { closed: true },
    wednesday: { closed: true },
    thursday: { closed: true },
    friday: { closed: true },
    saturday: { closed: true },
    sunday: { closed: true },
    note: "Horários serão inseridos quando o modelo receber os dados reais do cliente.",
  },

  strategy: {
    primaryConversion: "booking",
    audience: "b2c",
    urgency: "low",
    salesCycle: "short",
    localSeoImportance: "critical",
    visualImportance: "critical",
    trustImportance: "high",
    technicalProofImportance: "medium",
    notes: [
      "A primeira dobra vende atmosfera e posicionamento antes de listar serviços.",
      "Evitar o padrão repetitivo de cards; priorizar narrativa editorial, imagem e ritmo.",
      "A conversão principal é avaliação/agendamento, sem expor dados fictícios de contato.",
    ],
  },

  design: {
    primaryColor: "#7A3945",
    primaryContrast: "#FFF9F5",
    secondaryColor: "#201719",
    accentColor: "#D6BCA6",
    backgroundColor: "#F8F3EE",
    surfaceColor: "#EFE5DE",
    foregroundColor: "#211719",
    mutedColor: "#776A68",
    borderColor: "#D9CAC1",
    headingFont: "Bodoni Moda",
    bodyFont: "Manrope",
    fontProvider: "google",
    radius: 10,
    density: "spacious",
    archetype: "luxury",
    geometry: {
      cardStyle: "flat",
      borderWidth: 1,
      buttonRadius: "pill",
      imageRadius: "soft",
    },
    layout: {
      container: "wide",
      gridStyle: "asymmetric",
      sectionContrast: "high",
    },
    imagery: {
      treatment: "editorial",
      preferredRatio: "mixed",
      overlayStrength: "medium",
    },
    elevation: {
      cards: "none",
      header: "floating",
    },
    motion: {
      intensity: "regular",
      reveal: "fade-up",
      speed: "slow",
    },
    backgrounds: {
      style: "editorial",
    },
  },

  sections: {
    hero: "hero-07",
    about: "about-06",
    services: "services-07",
    benefits: "benefits-06",
    stats: "stats-05",
    gallery: "gallery-05",
    testimonials: "testimonials-06",
    faq: "faq-05",
    cta: "cta-07",
    contact: "contact-05",
    footer: "footer-05",
  },

  composition: {
    home: [
      { id: "inicio", type: "custom", variant: "atelier-hero" },
      { id: "manifesto", type: "custom", variant: "editorial-manifesto" },
      { id: "tratamentos", type: "custom", variant: "treatment-atlas" },
      { id: "ritual", type: "custom", variant: "care-ritual" },
      {
        id: "beneficios",
        type: "benefits",
        variant: "benefits-06",
        props: {
          eyebrow: "O QUE MUDA A EXPERIÊNCIA",
          title: "O cuidado aparece nos detalhes que quase ninguém vê.",
          lead: "Um modelo pensado para comunicar critério, calma e clareza — sem transformar estética em promessa exagerada.",
        },
      },
      {
        id: "galeria",
        type: "gallery",
        variant: "gallery-05",
        props: {
          eyebrow: "CADERNO VISUAL / 01",
          title: "Texturas, gestos e pequenos rituais.",
          lead: "A galeria funciona como um editorial, não como um catálogo de fotos soltas.",
          limit: 9,
        },
      },
      {
        id: "faq",
        type: "faq",
        variant: "faq-05",
        props: {
          eyebrow: "ANTES DE AGENDAR",
          title: "Dúvidas simples merecem respostas claras.",
          limit: 5,
        },
      },
      { id: "contato", type: "custom", variant: "editorial-contact" },
    ],
  },

  features: {
    whatsappFloating: false,
    contactForm: true,
    maps: false,
    testimonials: false,
    gallery: true,
    projects: false,
    products: false,
    team: false,
    faq: true,
    stats: false,
    benefits: true,
    cookieBanner: false,
    backToTop: true,
    animations: true,
    announcementBar: true,
    catalogSearch: false,
    catalogFilters: false,
    catalogBrands: false,
    mobileConversionBar: true,
  },

  pages: {
    about: true,
    services: true,
    products: false,
    projects: false,
    gallery: true,
    testimonials: false,
    faq: true,
    contact: true,
  },

  mobileConversion: {
    enabled: true,
    actions: ["contact"],
  },

  forms: {
    contact: {
      enabled: true,
      delivery: [],
      maxBodyBytes: 32768,
      rateLimit: { requests: 5, windowSeconds: 60 },
      fields: [
        { name: "name", label: "Seu nome", type: "text", required: true, placeholder: "Como podemos te chamar?", minLength: 2, maxLength: 100 },
        { name: "phone", label: "Telefone", type: "tel", required: true, placeholder: "(00) 00000-0000" },
        { name: "service", label: "Interesse", type: "select", source: "services", required: true },
        { name: "message", label: "O que você procura?", type: "textarea", placeholder: "Conte brevemente seu objetivo", minLength: 10, maxLength: 1600, fullWidth: true },
      ],
    },
  },

  seo: {
    siteUrl: "https://atelier-estetica-preview.invalid",
    titleTemplate: "%s | %n",
    defaultTitle: "Atelier de Estética — modelo editorial premium",
    description:
      "Modelo demonstrativo de site para estética personalizada com direção editorial, experiência responsiva e fluxo de agendamento.",
    keywords: ["site estética", "modelo clínica estética", "design editorial", "estética personalizada"],
    locale: "pt_BR",
    ogImage: "/opengraph-image",
    twitterHandle: "",
    businessType: "BeautySalon",
    verification: { google: "", bing: "" },
  },

  legal: {
    controllerName: "Projeto Demonstrativo",
    dpoEmail: "contato@exemplo.com.br",
    lastReviewed: "2026-08-31",
  },
};

export default clientConfig;
