import "server-only";
import { prisma } from "@/lib/prisma";
import { urls, siteUrl } from "@repo/seo";
import { getPriorityServiceCityPairs } from "@/features/catalog/server/queries";

export type SitemapUrl = { loc: string; lastmod?: string };

/** Lijst van deel-sitemap-segmenten voor de sitemap-index. */
export async function getSitemapSegments(): Promise<string[]> {
  // Bewust GEEN volledige dienst×stad-matrix meer (16k+ dunne pagina's). Alleen
  // combinaties met unieke content komen in de sitemap (segment "combinaties").
  return ["paginas", "diensten", "steden", "merken", "kennisbank", "vakmannen", "combinaties"];
}

/** URL's voor één segment. */
export async function getSegmentUrls(segment: string): Promise<SitemapUrl[]> {
  if (segment === "paginas") {
    return [urls.home(), urls.services(), urls.cities(), urls.installers(), "/voor-vakmannen", "/over-ons", "/contact", "/reviews", "/energie-install"].map(
      (p) => ({ loc: siteUrl(p) }),
    );
  }

  if (segment === "vakmannen") {
    const [services, cities, companies] = await Promise.all([
      prisma.service.findMany({ where: { publish: "ACTIVE" }, select: { slug: true } }),
      prisma.municipality.findMany({ where: { publish: "ACTIVE" }, select: { slug: true } }),
      prisma.installerCompany.findMany({
        where: { status: "APPROVED", publicVisible: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
    const out: SitemapUrl[] = [];
    for (const s of services) out.push({ loc: siteUrl(urls.installersByFacet(s.slug)) });
    for (const c of cities) out.push({ loc: siteUrl(urls.installersByFacet(c.slug)) });
    for (const co of companies)
      out.push({ loc: siteUrl(urls.installer(co.slug)), lastmod: co.updatedAt.toISOString() });
    // High-value dienst×stad-combinaties (zelfde set als de prerender).
    for (const p of await getPriorityServiceCityPairs(20, 30)) {
      out.push({ loc: siteUrl(urls.installersByServiceCity(p.service, p.city)) });
    }
    return out;
  }

  if (segment === "diensten") {
    const rows = await prisma.service.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true, updatedAt: true },
    });
    return rows.map((r) => ({ loc: siteUrl(urls.service(r.slug)), lastmod: r.updatedAt.toISOString() }));
  }

  if (segment === "steden") {
    const rows = await prisma.municipality.findMany({
      where: { publish: "ACTIVE" },
      select: { slug: true, updatedAt: true },
    });
    return rows.map((r) => ({ loc: siteUrl(urls.city(r.slug)), lastmod: r.updatedAt.toISOString() }));
  }

  if (segment === "merken") {
    const rows = await prisma.brand.findMany({ select: { slug: true } });
    return rows.map((r) => ({ loc: siteUrl(urls.brand(r.slug)) }));
  }

  if (segment === "kennisbank") {
    const { allKbArticles } = await import("@/features/content/kennisbank-files");
    return allKbArticles().map((a) => ({ loc: siteUrl(urls.article(a.category, a.slug)) }));
  }

  if (segment === "combinaties") {
    // Alleen dienst×stad-combinaties met unieke content (eigen artikel of admin-
    // override). Dunne, getemplate combinaties houden we uit de sitemap én op
    // noindex, zodat Google geen 16k bijna-identieke pagina's te zien krijgt.
    const { listServiceCityArticles } = await import("@/features/seo/service-city-content");
    const fromFiles = listServiceCityArticles().map((p) => ({ service: p.service, city: p.city }));

    const overrides = await prisma.landingContent
      .findMany({ select: { service: { select: { slug: true } }, municipality: { select: { slug: true } } } })
      .catch(() => [] as { service: { slug: string }; municipality: { slug: string } }[]);
    const fromDb = overrides.map((o) => ({ service: o.service.slug, city: o.municipality.slug }));

    const seen = new Set<string>();
    const out: SitemapUrl[] = [];
    for (const p of [...fromFiles, ...fromDb]) {
      const key = `${p.service}/${p.city}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ loc: siteUrl(urls.serviceCity(p.service, p.city)) });
    }
    return out;
  }

  return [];
}

export function urlsetXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => `<url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function sitemapIndexXml(segments: string[]): string {
  const body = segments
    .map((s) => `<sitemap><loc>${siteUrl(`/sitemaps/${s}.xml`)}</loc></sitemap>`)
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
