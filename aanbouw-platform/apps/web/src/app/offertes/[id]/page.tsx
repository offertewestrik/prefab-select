import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { brand } from "@repo/core";
import { getSessionUser } from "@/lib/guards";
import { getQuoteForViewer, parseLineItems } from "@/features/quotes/server/queries";
import { QuotePreview } from "@/features/quotes/components/quote-preview";
import { QuoteDecision } from "@/features/quotes/components/quote-decision";

export const metadata: Metadata = { title: "Offerte", robots: { index: false, follow: false } };

export default async function CustomerQuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;
  const user = await getSessionUser();
  const isAdmin = (user as { role?: string } | null)?.role === "ADMIN";

  const access = await getQuoteForViewer({
    quoteId: id,
    token: token ?? null,
    userId: (user as { id?: string } | null)?.id ?? null,
    isAdmin,
  });

  if (!access.allowed) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Geen toegang</h1>
        <p className="mt-2 text-neutral-500">Deze offerte is niet beschikbaar of de link is ongeldig.</p>
      </main>
    );
  }

  const q = access.quote;
  const lead = q.lead;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {q.status === "ACCEPTED" && (
        <Banner ok title="Je hebt deze offerte geaccepteerd" text="De vakman neemt contact met je op om de klus in te plannen." />
      )}
      {q.status === "REJECTED" && <Banner title="Je hebt deze offerte afgewezen" />}
      {q.status === "EXPIRED" && <Banner title="Deze offerte is verlopen" />}

      <QuotePreview
        data={{
          number: q.number,
          title: q.title,
          introText: q.introText,
          status: q.status,
          company: { name: q.company.name, email: q.company.email, phone: q.company.phone },
          customer: { name: lead?.contactName ?? "Klant", city: lead?.city, street: lead?.street, postcode: lead?.postcode },
          lineItems: parseLineItems(q.lineItems),
          subtotalCents: q.subtotalCents,
          vatRate: q.vatRate,
          vatCents: q.vatCents,
          totalCents: q.totalCents,
          validUntil: q.validUntil ? q.validUntil.toISOString() : null,
          terms: q.terms,
        }}
      />

      {q.status === "SENT" && <QuoteDecision quoteId={q.id} token={access.viaToken ? token : undefined} />}

      <p className="mt-8 text-center text-xs text-neutral-400">{brand.name}</p>
    </main>
  );
}

function Banner({ ok, title, text }: { ok?: boolean; title: string; text?: string }) {
  return (
    <div className={`mb-6 flex items-start gap-3 rounded-[var(--radius-xl)] border p-4 ${ok ? "border-success-500/30 bg-success-500/5" : "border-neutral-200 bg-neutral-50"}`}>
      {ok ? <CheckCircle2 className="h-5 w-5 text-success-500" /> : <XCircle className="h-5 w-5 text-neutral-400" />}
      <div>
        <div className="font-semibold text-neutral-900">{title}</div>
        {text && <div className="text-sm text-neutral-500">{text}</div>}
      </div>
    </div>
  );
}
