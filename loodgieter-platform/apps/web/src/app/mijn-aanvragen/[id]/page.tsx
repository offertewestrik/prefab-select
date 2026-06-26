import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/guards";
import { getQuotesForLead } from "@/features/quotes/server/queries";
import { QuoteStatusBadge } from "@/features/quotes/components/quote-status-badge";
import { euro } from "@/lib/format";

export const metadata: Metadata = { title: "Aanvraag", robots: { index: false, follow: false } };

export default async function MyRequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const lead = await prisma.leadRequest.findUnique({
    where: { id },
    include: { service: true, municipality: true, priceEstimate: true },
  });
  // Alleen de eigenaar (of admin) mag de aanvraag zien.
  const isAdmin = (user as { role?: string }).role === "ADMIN";
  if (!lead || (!isAdmin && lead.homeownerId !== (user as { id: string }).id)) notFound();

  const quotes = await getQuotesForLead(lead.id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="text-sm text-neutral-500">
        <Link href="/mijn-aanvragen" className="hover:text-neutral-900">Mijn aanvragen</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{lead.service.name}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900">{lead.service.name}</h1>
      <p className="mt-1 text-neutral-500">{lead.municipality.name} · status {lead.status}</p>
      <p className="mt-4 whitespace-pre-wrap text-sm text-neutral-700">{lead.description}</p>

      {lead.priceEstimate && (
        <div className="mt-6 rounded-[var(--radius-xl)] border border-neutral-200 bg-neutral-50 p-4">
          <div className="text-sm font-medium text-neutral-900">Vrijblijvende prijsindicatie</div>
          <div className="mt-1 text-2xl font-bold text-neutral-900">
            € {(lead.priceEstimate.rangeMinCents / 100).toFixed(0)} – € {(lead.priceEstimate.rangeMaxCents / 100).toFixed(0)}
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Dit is een automatische indicatie, geen offerte. De definitieve prijs ontvang je van de vakman.
          </p>
        </div>
      )}

      <h2 className="mt-10 text-xl font-bold text-neutral-900">Ontvangen offertes</h2>
      {quotes.length === 0 ? (
        <p className="mt-3 text-neutral-500">Je hebt nog geen offertes ontvangen.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {quotes.map((q) => (
            <li key={q.id} className="flex items-center justify-between rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
              <div>
                <div className="font-semibold text-neutral-900">{q.company.name}</div>
                <div className="mt-0.5 flex items-center gap-2 text-sm text-neutral-500">
                  <span>{q.number} · {euro(q.totalCents / 100)} incl. btw</span>
                  <QuoteStatusBadge status={q.status} />
                </div>
              </div>
              <Link href={`/offertes/${q.id}`} className="font-medium text-primary-600 hover:underline">
                Bekijk
              </Link>
            </li>
          ))}
        </ul>
      )}

      {quotes.some((q) => q.status === "ACCEPTED") && (
        <div className="mt-6">
          <Link href={`/mijn-aanvragen/${lead.id}/review`} className="font-medium text-primary-600 hover:underline">
            Laat een review achter →
          </Link>
        </div>
      )}
    </main>
  );
}
