import { prisma } from "@/lib/prisma";
import { brand, regionsSentence } from "@repo/core";
import { siteUrl, urls } from "@repo/seo";
import { allKbArticles } from "@/features/content/kennisbank-files";

export const revalidate = 86400;

/**
 * llms.txt — AEO/GEO: een beknopte, machine-leesbare inhoudsopgave voor
 * AI-zoekmachines (ChatGPT, Perplexity, Gemini, Copilot). Volgt de llmstxt.org-
 * conventie: H1 + samenvatting (blockquote) + secties met links.
 */
export async function GET() {
  const [services, cities] = await Promise.all([
    prisma.service.findMany({ where: { publish: "ACTIVE" }, select: { slug: true, name: true }, orderBy: { name: "asc" } }).catch(() => []),
    prisma.municipality.findMany({ where: { publish: "ACTIVE" }, select: { slug: true, name: true }, orderBy: { population: "desc" }, take: 40 }).catch(() => []),
  ]);
  const articles = allKbArticles();

  const lines: string[] = [];
  lines.push(`# ${brand.name}`);
  lines.push("");
  lines.push(
    `> ${brand.name} is een landelijk platform dat huiseigenaren in Nederland koppelt aan gecertificeerde loodgieters en installateurs. Bezoekers vragen gratis en vrijblijvend offertes aan voor o.a. cv-ketels, warmtepompen, badkamers, lekkages, ontstopping en dakwerk, en vergelijken lokale vakmensen op prijs, beoordelingen en beschikbaarheid. Actief in heel Nederland, met focus op ${regionsSentence()}.`,
  );
  lines.push("");
  lines.push("## Belangrijkste pagina's");
  lines.push(`- [Home](${siteUrl("/")}): vergelijk vakmannen en vraag offertes aan`);
  lines.push(`- [Alle diensten](${siteUrl(urls.services())}): overzicht van installatie- en loodgietersdiensten`);
  lines.push(`- [Alle steden](${siteUrl(urls.cities())}): vakmannen per gemeente`);
  lines.push(`- [Kennisbank](${siteUrl("/kennisbank")}): praktische artikelen, kosten en advies`);
  lines.push(`- [Over ons](${siteUrl("/over-ons")}): wie we zijn en hoe het werkt`);
  lines.push(`- [Voor vakmannen](${siteUrl("/voor-vakmannen")}): aanmelden als installateur`);
  lines.push("");

  if (services.length) {
    lines.push("## Diensten");
    for (const s of services) lines.push(`- [${s.name}](${siteUrl(urls.service(s.slug))})`);
    lines.push("");
  }

  if (articles.length) {
    lines.push("## Kennisbank (advies & kosten)");
    for (const a of articles) lines.push(`- [${a.title}](${siteUrl(urls.article(a.category, a.slug))}): ${a.excerpt}`);
    lines.push("");
  }

  if (cities.length) {
    lines.push("## Grootste werkgebieden");
    for (const c of cities) lines.push(`- [Loodgieter ${c.name}](${siteUrl(urls.city(c.slug))})`);
    lines.push("");
  }

  lines.push("## Contact");
  lines.push(`- Telefoon: ${brand.phone}`);
  lines.push(`- E-mail: ${brand.email}`);
  lines.push(`- Website: ${siteUrl("/")}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
