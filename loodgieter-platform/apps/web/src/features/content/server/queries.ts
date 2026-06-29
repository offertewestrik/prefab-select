import "server-only";
import {
  allKbArticles,
  kbArticleBySlug,
  kbArticlesByCategory,
  kbCategories,
  kbCategoryName,
  type KbArticle,
} from "@/features/content/kennisbank-files";

/**
 * De kennisbank wordt gevoed door versie-beheerde JSON-bestanden
 * (src/content/kennisbank/*.json), net als de stadspagina's. Zo blijft de
 * content reviewbaar in Git en hoeft er niets in de database te staan.
 */

function toListItem(a: KbArticle) {
  return {
    id: a.slug,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    coverImageUrl: null as string | null,
    publishedAt: a.updated ? new Date(a.updated) : null,
    category: { id: a.category, slug: a.category, name: a.categoryName },
  };
}

/** Gepubliceerde artikelen, optioneel per categorie. */
export async function getArticles(categorySlug?: string) {
  const rows = categorySlug ? kbArticlesByCategory(categorySlug) : allKbArticles();
  return rows.map(toListItem);
}

export async function getArticleCategories() {
  return kbCategories().map((c) => ({ id: c.slug, slug: c.slug, name: c.name }));
}

export async function getArticleCategory(slug: string) {
  const name = kbCategoryName(slug);
  return name ? { id: slug, slug, name } : null;
}

export async function getArticleBySlug(slug: string): Promise<KbArticle | null> {
  return kbArticleBySlug(slug);
}

export async function getAllArticleParams() {
  return allKbArticles().map((a) => ({ category: a.category, slug: a.slug }));
}
