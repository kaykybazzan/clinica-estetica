import { clientConfig } from "@/config/client.config";
import type { FaqItem, Product, Service } from "@/types/content";
import { WEEKDAY_ORDER, WEEKDAY_SCHEMA, areAllDaysClosed } from "@/utils/format";
import { absoluteUrl } from "@/utils/url";
import { socialLinks } from "@/data/social";

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
export interface JsonLdObject {
  [key: string]: JsonLdValue | undefined;
}

const { company, address, contact, businessHours, seo } = clientConfig;

/**
 * Stable @id anchors. Every schema fragment points back to these instead of
 * repeating the organization block — that is what prevents the duplicated,
 * spammy markup that Google flags.
 */
export const SCHEMA_IDS = {
  website: absoluteUrl("/#website"),
  business: absoluteUrl("/#business"),
  place: absoluteUrl("/#place"),
} as const;

function postalAddress(): JsonLdObject {
  return {
    "@type": "PostalAddress",
    streetAddress: [address.street, address.number].filter(Boolean).join(", "),
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.zipCode || undefined,
    addressCountry: address.country,
  };
}

function openingHours(): JsonLdObject[] {
  return WEEKDAY_ORDER.filter((day) => !businessHours[day].closed && businessHours[day].opens).map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEKDAY_SCHEMA[day],
    opens: businessHours[day].opens ?? "",
    closes: businessHours[day].closes ?? "",
  }));
}

export function localBusinessSchema(): JsonLdObject {
  const openingHoursSpecification = areAllDaysClosed(businessHours)
    ? undefined
    : openingHours();

  return {
    "@type": seo.businessType,
    "@id": SCHEMA_IDS.business,
    name: company.name,
    legalName: company.legalName || undefined,
    description: company.description,
    url: absoluteUrl("/"),
    telephone: contact.phone || undefined,
    email: contact.email,
    priceRange: company.priceRange,
    foundingDate: company.foundedYear ? String(company.foundedYear) : undefined,
    image: absoluteUrl(seo.ogImage),
    logo: absoluteUrl("/icons/logo.svg"),
    address: postalAddress(),
    geo: address.geo
      ? { "@type": "GeoCoordinates", latitude: address.geo.latitude, longitude: address.geo.longitude }
      : undefined,
    areaServed: address.serviceAreas.length
      ? address.serviceAreas.map((city) => ({ "@type": "City", name: city }))
      : undefined,
    openingHoursSpecification,
    sameAs: socialLinks.length ? socialLinks.map((link) => link.href) : undefined,
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    url: absoluteUrl("/"),
    name: company.name,
    description: seo.description,
    inLanguage: seo.locale.replace("_", "-"),
    publisher: { "@id": SCHEMA_IDS.business },
  };
}

/** Emitted once, on the home page only. */
export function homeGraph(): JsonLdObject {
  return { "@context": "https://schema.org", "@graph": [websiteSchema(), localBusinessSchema()] };
}

export function breadcrumbSchema(trail: { label: string; href: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceSchema(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    url: absoluteUrl(`/servicos/${service.slug}`),
    serviceType: service.title,
    provider: { "@id": SCHEMA_IDS.business },
    areaServed: address.serviceAreas.map((city) => ({ "@type": "City", name: city })),
    ...(service.startingAt
      ? {
          offers: {
            "@type": "Offer",
            price: service.startingAt,
            priceCurrency: "BRL",
          },
        }
      : {}),
  };
}

export function productSchema(product: Product): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    sku: product.sku || undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    image: absoluteUrl(product.image.src),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/produtos/${product.slug}`),
            price: product.price,
            priceCurrency: "BRL",
            ...(product.availability
              ? { availability: `https://schema.org/${product.availability}` }
              : {}),
            seller: { "@id": SCHEMA_IDS.business },
          },
        }
      : {}),
  };
}

/**
 * FAQPage must be emitted on exactly one URL. The home FAQ section renders the
 * questions visually but leaves the markup to /faq, avoiding duplicate schema.
 */
export function faqSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
