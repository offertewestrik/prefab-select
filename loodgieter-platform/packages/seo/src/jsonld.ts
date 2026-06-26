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
  rating?: { value: number; count: number };
  reviews?: { author: string; rating: number; title?: string | null; body: string }[];
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
  // Alleen toevoegen wanneer er daadwerkelijk (approved) reviews zijn.
  if (input.rating && input.rating.count > 0) {
    ld.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(input.rating.value.toFixed(1)),
      reviewCount: input.rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (input.reviews && input.reviews.length > 0) {
    ld.review = input.reviews.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      name: r.title ?? undefined,
      reviewBody: r.body,
    }));
  }
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

export function articleLd(input: {
  title: string;
  description?: string;
  path: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  imageUrl?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: siteUrl(input.path),
    image: input.imageUrl,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: input.author ? { "@type": "Person", name: input.author } : { "@type": "Organization", name: brand.name },
    publisher: { "@type": "Organization", name: brand.name },
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
