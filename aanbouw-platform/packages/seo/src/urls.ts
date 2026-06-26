// Canonieke URL-builders. Eén bron van waarheid voor de URL-structuur
// (zie docs/04). Voorkomt inconsistente links/canonicals.

export function siteUrl(path = "/"): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loodgieterplatform.nl";
  return new URL(path, base).toString();
}

export const urls = {
  home: () => "/",
  services: () => "/diensten",
  service: (serviceSlug: string) => `/diensten/${serviceSlug}`,
  cities: () => "/steden",
  city: (citySlug: string) => `/steden/${citySlug}`,
  /** ⭐ De money-page: dienst in stad. */
  serviceCity: (serviceSlug: string, citySlug: string) => `/${serviceSlug}/${citySlug}`,
  brand: (brandSlug: string) => `/merken/${brandSlug}`,
  article: (categorySlug: string, slug: string) => `/kennisbank/${categorySlug}/${slug}`,
  request: () => "/aanvraag",
  /** Vakmannen-index + profiel + voor-gefilterde landingspagina's. */
  installers: () => "/vakmannen",
  installer: (slug: string) => `/vakmannen/${slug}`,
  installersByFacet: (facetSlug: string) => `/vakmannen/${facetSlug}`,
  installersByServiceCity: (serviceSlug: string, citySlug: string) =>
    `/vakmannen/${serviceSlug}/${citySlug}`,
};
