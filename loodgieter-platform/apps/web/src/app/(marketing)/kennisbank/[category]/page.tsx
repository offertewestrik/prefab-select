import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urls, breadcrumbLd, itemListLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/features/seo/metadata";
import { getArticles, getArticleCategories, getArticleCategory } from "@/features/content/server/queries";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await getArticleCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await getArticleCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.name} — Kennisbank`,
    description: `Artikelen en advies over ${cat.name.toLowerCase()}.`,
    path: `/kennisbank/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = await getArticleCategory(category);
  if (!cat) notFound();
  const articles = await getArticles(category);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Kennisbank", path: "/kennisbank" },
            { name: cat.name, path: `/kennisbank/${category}` },
          ]),
          itemListLd(
            articles.map((a) => ({ name: a.title, path: urls.article(category, a.slug) })),
          ),
        ]}
      />
      <nav className="text-sm text-neutral-500">
        <Link href="/kennisbank" className="hover:text-neutral-900">Kennisbank</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{cat.name}</span>
      </nav>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900">{cat.name}</h1>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/kennisbank/${category}/${a.slug}`}
            className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          >
            <h2 className="font-semibold text-neutral-900">{a.title}</h2>
            {a.excerpt && <p className="mt-1 line-clamp-3 text-sm text-neutral-500">{a.excerpt}</p>}
          </Link>
        ))}
        {articles.length === 0 && <p className="text-neutral-500">Nog geen artikelen in deze categorie.</p>}
      </div>
    </main>
  );
}
