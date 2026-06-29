import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urls, breadcrumbLd, articleLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { LeadCta } from "@/components/marketing/lead-cta";
import { buildMetadata } from "@/features/seo/metadata";
import { getArticleBySlug, getAllArticleParams, getArticles } from "@/features/content/server/queries";

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
  });
}

/** Rendert platte tekst met eenvoudige opmaak: ## subkop, "- " lijst, lege regel = nieuwe alinea. */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="my-4 list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{l.replace(/^-\s+/, "")}</li>
              ))}
            </ul>
          );
        }
        if (lines.length === 1 && lines[0]!.startsWith("## ")) {
          return (
            <h3 key={i} className="mt-7 text-xl font-bold text-neutral-900">
              {lines[0]!.replace(/^##\s+/, "")}
            </h3>
          );
        }
        return (
          <p key={i} className="my-4 leading-relaxed">
            {block}
          </p>
        );
      })}
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a || a.category !== category) notFound();

  const updatedIso = a.updated ? new Date(a.updated).toISOString() : undefined;
  const related = (await getArticles(category)).filter((r) => r.slug !== slug).slice(0, 3);

  // Stap-voor-stap-gidsen krijgen HowTo-schema → kans op rich results in Google.
  const isHowTo = /stappenplan|zo doe je|wat te doen|ontluchten|bijvullen|opsporen|aanleggen|plaatsen/i.test(
    `${a.title} ${a.slug}`,
  );
  const howToLd = isHowTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: a.title,
        description: a.excerpt,
        step: a.body.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.heading,
          text: s.text.replace(/\s+/g, " ").trim().slice(0, 320),
        })),
      }
    : null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Kennisbank", path: "/kennisbank" },
            { name: a.categoryName, path: `/kennisbank/${category}` },
            { name: a.title, path: urls.article(category, slug) },
          ]),
          articleLd({
            title: a.title,
            description: a.excerpt ?? undefined,
            path: urls.article(category, slug),
            publishedAt: updatedIso,
            updatedAt: updatedIso,
          }),
          faqLd(a.faqs ?? []),
          ...(howToLd ? [howToLd] : []),
        ]}
      />

      <nav className="text-sm text-neutral-500">
        <Link href="/kennisbank" className="hover:text-neutral-900">Kennisbank</Link>
        <span className="mx-2">/</span>
        <Link href={`/kennisbank/${category}`} className="hover:text-neutral-900">{a.categoryName}</Link>
      </nav>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900">{a.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
        <span className="rounded-full bg-primary-50 px-3 py-0.5 font-medium text-primary-700">{a.categoryName}</span>
        {a.readingTime ? <span>± {a.readingTime} min lezen</span> : null}
      </div>

      <p className="mt-6 text-lg leading-relaxed text-neutral-700">{a.intro}</p>

      <article className="prose prose-neutral mt-6 max-w-none text-neutral-700">
        {a.body.map((section, i) => (
          <section key={i}>
            <h2 className="mt-10 text-2xl font-bold tracking-tight text-neutral-900">{section.heading}</h2>
            <RichText text={section.text} />
          </section>
        ))}

        {a.priceTable && a.priceTable.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Onderdeel</th>
                  <th className="px-4 py-3 font-semibold">Richtprijs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {a.priceTable.map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-neutral-700">{row.label}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="bg-neutral-50 px-4 py-2 text-xs text-neutral-400">
              Richtprijzen incl. btw — de exacte prijs hangt af van je situatie. Vergelijk gratis offertes voor een prijs op maat.
            </p>
          </div>
        )}
      </article>

      {a.faqs && a.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Veelgestelde vragen</h2>
          <div className="mt-4 divide-y divide-neutral-100 rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
            {a.faqs.map((f, i) => (
              <details key={i} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-neutral-900">{f.question}</summary>
                <p className="mt-2 leading-relaxed text-neutral-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <LeadCta />
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">Lees ook</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/kennisbank/${category}/${r.slug}`}
                className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
              >
                <h3 className="text-sm font-semibold text-neutral-900">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
