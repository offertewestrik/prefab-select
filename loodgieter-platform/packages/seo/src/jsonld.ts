// Getypeerde JSON-LD (schema.org) builders. Output gaat in een
// <script type="application/ld+json"> server-side (zie docs/04 §4).

import { brand } from "@repo/core";
import { siteUrl } from "./urls";

type Json = Record<string, unknown>;

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: siteUrl("/"),
    email: brand.email,
    telephone: brand.phone,
    areaServed: brand.regions,
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: siteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: siteUrl(it.path),
    })),
  };
}

export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
  priceFrom?: number | null;
}): Json {
  const ld: Json = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: siteUrl(input.path),
    provider: { "@type": "Organization", name: brand.name },
  };
  if (input.areaServed) ld.areaServed = input.areaServed;
  if (input.priceFrom)
    ld.offers = {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: input.priceFrom,
      priceSpecification: { "@type": "PriceSpecification", minPrice: input.priceFrom },
    };
  return ld;
}

export function faqLd(faqs: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function localBusinessLd(input: {
  name: string;
  slug: string;
  city?: string;
  ratingAvg?: number;
  ratingCount?: number;
}): Json {
  const ld: Json = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: input.name,
    url: siteUrl(`/vakman/${input.slug}`),
  };
  if (input.city) ld.areaServed = input.city;
  if (input.ratingCount && input.ratingCount > 0)
    ld.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.ratingAvg,
      reviewCount: input.ratingCount,
    };
  return ld;
}
