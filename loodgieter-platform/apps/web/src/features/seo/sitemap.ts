import "server-only";
import { prisma } from "@/lib/prisma";
import { urls, siteUrl } from "@repo/seo";
import { getPriorityServiceCityPairs } from "@/features/catalog/server/queries";

export type SitemapUrl = { loc: string; lastmod?: string };

const COMBO_CHUNK = 5000;

/** Lijst van deel-sitemap-segmenten voor de sitemap-index. */
export async function getSitemapSegments(): Promise<string[]> {
  const [serviceCount, cityCount] = await Promise.all([
    prisma.service.count({ where: { publish: "ACTIVE" } }),
    prisma.municipality.count({ where: { publish: "ACTIVE" } }),
  ]);
  const comboChunks = Math.max(1, Math.ceil((serviceCount * cityCount) / COMBO_CHUNK));

  const segments = ["paginas", "diensten", "steden", "merken", "kennisbank", "vakmannen"];
  for (let i = 0; i < comboChunks; i++) segments.push(`combinaties-${i}`);
  return segments;
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
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true, category: { select: { slug: true } } },
    });
    return rows
      .filter((r) => r.category)
      .map((r) => ({ loc: siteUrl(urls.article(r.category!.slug, r.slug)), lastmod: r.updatedAt.toISOString() }));
  }

  if (segment.startsWith("combinaties-")) {
    const chunk = Number(segment.split("-")[1] ?? 0);
    const [services, cities] = await Promise.all([
      prisma.service.findMany({ where: { publish: "ACTIVE" }, select: { slug: true }, orderBy: { slug: "asc" } }),
      prisma.municipality.findMany({ where: { publish: "ACTIVE" }, select: { slug: true }, orderBy: { slug: "asc" } }),
    ]);
    const start = chunk * COMBO_CHUNK;
    const end = start + COMBO_CHUNK;
    const out: SitemapUrl[] = [];
    let i = 0;
    for (const s of services) {
      for (const c of cities) {
        if (i >= start && i < end) out.push({ loc: siteUrl(urls.serviceCity(s.slug, c.slug)) });
        i++;
        if (i >= end) break;
      }
      if (i >= end) break;
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
