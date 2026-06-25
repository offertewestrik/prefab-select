import type { Metadata } from "next";
import { brand } from "@repo/core";
import { prisma } from "@/lib/prisma";
import { LeadCta } from "@/components/marketing/lead-cta";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Reviews",
  description: `Lees ervaringen van klanten van ${brand.name}. Beoordelingen van gecertificeerde loodgieters en installateurs.`,
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const reviews = await prisma.review
    .findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, take: 30, include: { company: true } })
    .catch(() => []);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Wat klanten zeggen</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Echte ervaringen van klanten die via {brand.name} een vakman vonden.
      </p>

      {reviews.length === 0 ? (
        <p className="mt-10 text-neutral-500">Er zijn nog geen gepubliceerde reviews.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
              <div className="text-trust">{"★".repeat(r.rating)}</div>
              {r.title && <div className="mt-2 font-semibold text-neutral-900">{r.title}</div>}
              <p className="mt-1 text-sm text-neutral-500">{r.body}</p>
              <div className="mt-3 text-xs text-neutral-500">
                {r.authorName} · {r.company.name}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <LeadCta />
      </div>
    </main>
  );
}
