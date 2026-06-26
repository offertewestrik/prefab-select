import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@repo/core";
import { getArticles, getArticleCategories } from "@/features/content/server/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kennisbank",
  description: `Praktische artikelen en advies over CV, warmtepompen, badkamers, lekkages en meer — van de experts van ${brand.name}.`,
  alternates: { canonical: "/kennisbank" },
};

export default async function KnowledgeBasePage() {
  const [articles, categories] = await Promise.all([getArticles(), getArticleCategories()]);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Kennisbank</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Praktische artikelen en advies over aanbouw, uitbouw en woninguitbreiding.
      </p>

      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/kennisbank/${c.slug}`}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 hover:border-primary-500"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/kennisbank/${a.category?.slug}/${a.slug}`}
            className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          >
            {a.category && <span className="text-xs font-medium text-primary-600">{a.category.name}</span>}
            <h2 className="mt-1 font-semibold text-neutral-900">{a.title}</h2>
            {a.excerpt && <p className="mt-1 line-clamp-3 text-sm text-neutral-500">{a.excerpt}</p>}
          </Link>
        ))}
        {articles.length === 0 && (
          <p className="text-neutral-500">Er zijn nog geen artikelen gepubliceerd.</p>
        )}
      </div>
    </main>
  );
}
