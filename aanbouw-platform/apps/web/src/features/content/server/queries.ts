import "server-only";
import { prisma } from "@/lib/prisma";

/** Gepubliceerde artikelen, optioneel per categorie. */
export async function getArticles(categorySlug?: string) {
  return prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true },
  });
}

export async function getArticleCategories() {
  return prisma.articleCategory.findMany({ orderBy: { name: "asc" } });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, author: true, tags: { include: { tag: true } } },
  });
}

export async function getAllArticleParams() {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, category: { select: { slug: true } } },
  });
  return rows.filter((r) => r.category).map((r) => ({ category: r.category!.slug, slug: r.slug }));
}
