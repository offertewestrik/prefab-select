import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ServiceCityArticle = {
  seoTitle?: string;
  metaDescription?: string;
  intro: string;
  body: { heading: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

const DIR = path.join(process.cwd(), "src/content/dienst-stad");

const cache = new Map<string, ServiceCityArticle | null>();

/**
 * Uniek, versie-beheerd long-form artikel voor een specifieke dienst×stad-
 * combinatie (bv. spoed-loodgieter × amsterdam). Bestanden staan onder
 * src/content/dienst-stad/<service>/<city>.json. Geeft null als er (nog) geen
 * unieke tekst is — dan valt de pagina terug op de standaardtemplate.
 */
/** Alle dienst×stad-combinaties waarvoor een uniek artikel-bestand bestaat. */
export function listServiceCityArticles(): { service: string; city: string }[] {
  const out: { service: string; city: string }[] = [];
  let services: string[] = [];
  try {
    services = fs.readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return out;
  }
  for (const service of services) {
    let files: string[] = [];
    try {
      files = fs.readdirSync(path.join(DIR, service)).filter((f) => f.endsWith(".json"));
    } catch {
      files = [];
    }
    for (const f of files) out.push({ service, city: f.replace(/\.json$/, "") });
  }
  return out;
}

export function getServiceCityArticle(service: string, city: string): ServiceCityArticle | null {
  const key = `${service}/${city}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;
  let result: ServiceCityArticle | null = null;
  try {
    const raw = fs.readFileSync(path.join(DIR, service, `${city}.json`), "utf8");
    const j = JSON.parse(raw);
    if (j && typeof j.intro === "string" && Array.isArray(j.body) && j.body.length > 0) {
      result = {
        seoTitle: typeof j.seoTitle === "string" ? j.seoTitle : undefined,
        metaDescription: typeof j.metaDescription === "string" ? j.metaDescription : undefined,
        intro: j.intro,
        body: j.body,
        faqs: Array.isArray(j.faqs) ? j.faqs : [],
      };
    }
  } catch {
    /* geen uniek artikel voor deze combinatie */
  }
  cache.set(key, result);
  return result;
}
