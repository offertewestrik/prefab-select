import "server-only";
import fs from "node:fs";
import path from "node:path";

export type KbArticle = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
  category: string; // categorie-slug
  categoryName: string;
  intro: string;
  body: { heading: string; text: string }[];
  priceTable?: { label: string; price: string }[];
  faqs: { question: string; answer: string }[];
  readingTime?: number;
  updated?: string;
};

const DIR = path.join(process.cwd(), "src/content/kennisbank");

let cache: KbArticle[] | null = null;

function loadAll(): KbArticle[] {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  } catch {
    files = [];
  }
  const out: KbArticle[] = [];
  for (const f of files) {
    try {
      const j = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as KbArticle;
      if (j && j.slug && j.title && Array.isArray(j.body) && j.body.length > 0) out.push(j);
    } catch {
      /* sla onleesbaar bestand over */
    }
  }
  cache = out;
  return out;
}

/** Categorie-volgorde voor een logische weergave. */
const CATEGORY_ORDER = [
  "kosten-prijzen",
  "cv-verwarming",
  "warmtepompen",
  "badkamer-sanitair",
  "lekkage-spoed",
  "dakwerk",
  "verduurzaming",
  "onderhoud",
];

export function allKbArticles(): KbArticle[] {
  return loadAll()
    .slice()
    .sort((a, b) => {
      const ca = CATEGORY_ORDER.indexOf(a.category);
      const cb = CATEGORY_ORDER.indexOf(b.category);
      if (ca !== cb) return (ca < 0 ? 99 : ca) - (cb < 0 ? 99 : cb);
      return a.title.localeCompare(b.title);
    });
}

export function kbArticleBySlug(slug: string): KbArticle | null {
  return loadAll().find((a) => a.slug === slug) ?? null;
}

export function kbArticlesByCategory(category: string): KbArticle[] {
  return allKbArticles().filter((a) => a.category === category);
}

export function kbCategoryName(category: string): string | null {
  const a = loadAll().find((x) => x.category === category);
  return a ? a.categoryName : null;
}

export function kbCategories(): { slug: string; name: string; count: number }[] {
  const m = new Map<string, { slug: string; name: string; count: number }>();
  for (const a of loadAll()) {
    const e = m.get(a.category) ?? { slug: a.category, name: a.categoryName, count: 0 };
    e.count++;
    m.set(a.category, e);
  }
  return [...m.values()].sort(
    (x, y) =>
      (CATEGORY_ORDER.indexOf(x.slug) < 0 ? 99 : CATEGORY_ORDER.indexOf(x.slug)) -
      (CATEGORY_ORDER.indexOf(y.slug) < 0 ? 99 : CATEGORY_ORDER.indexOf(y.slug)),
  );
}
