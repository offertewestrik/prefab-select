// Slug-helpers + reserved top-level paden (vangnet voor /[service]/[city]).

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // diakritische tekens
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Top-level paden die NOOIT als dienst-slug mogen worden opgevat.
export const RESERVED_SLUGS = new Set([
  "diensten",
  "steden",
  "merken",
  "kennisbank",
  "reviews",
  "voor-vakmannen",
  "over-ons",
  "contact",
  "aanvraag",
  "bedankt",
  "login",
  "registreren",
  "wachtwoord-vergeten",
  "dashboard",
  "admin",
  "api",
  "sitemap.xml",
  "sitemaps",
  "robots.txt",
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}
