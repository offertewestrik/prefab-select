import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urls, breadcrumbLd, articleLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { LeadCta } from "@/components/marketing/lead-cta";
import { buildMetadata } from "@/features/seo/metadata";
import { getArticleBySlug, getAllArticleParams } from "@/features/content/server/queries";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllArticleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seoTitle ?? a.title,
    description: a.metaDescription ?? a.excerpt ?? a.title,
    path: urls.article(category, slug),
    ogImageUrl: a.coverImageUrl ?? undefined,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a || a.category?.slug !== category) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Kennisbank", path: "/kennisbank" },
            { name: a.category?.name ?? "", path: `/kennisbank/${category}` },
            { name: a.title, path: urls.article(category, slug) },
          ]),
          articleLd({
            title: a.title,
            description: a.excerpt ?? undefined,
            path: urls.article(category, slug),
            author: a.author?.name,
            publishedAt: a.publishedAt?.toISOString(),
            updatedAt: a.updatedAt.toISOString(),
            imageUrl: a.coverImageUrl ?? undefined,
          }),
        ]}
      />
      <nav className="text-sm text-neutral-500">
        <Link href="/kennisbank" className="hover:text-neutral-900">Kennisbank</Link>
        <span className="mx-2">/</span>
        <Link href={`/kennisbank/${category}`} className="hover:text-neutral-900">{a.category?.name}</Link>
      </nav>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900">{a.title}</h1>
      {a.author && <p className="mt-3 text-sm text-neutral-500">Door {a.author.name}</p>}

      <article className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-neutral-700">
        {a.content}
      </article>

      <div className="mt-12">
        <LeadCta />
      </div>
    </main>
  );
}
