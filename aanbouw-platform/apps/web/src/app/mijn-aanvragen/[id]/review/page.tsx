import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/guards";
import { ReviewForm } from "@/features/reviews/components/review-form";

export const metadata: Metadata = { title: "Review plaatsen", robots: { index: false, follow: false } };

export default async function AccountReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const lead = await prisma.leadRequest.findUnique({ where: { id } });
  if (!lead || lead.homeownerId !== (user as { id: string }).id) notFound();

  // Geaccepteerde offerte voor deze aanvraag (één review per offerte).
  const quote = await prisma.quote.findFirst({
    where: { leadId: id, status: "ACCEPTED" },
    include: { company: true },
    orderBy: { acceptedAt: "desc" },
  });
  const existing = quote ? await prisma.review.findFirst({ where: { quoteId: quote.id } }) : null;

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <nav className="text-sm text-neutral-500">
        <Link href={`/mijn-aanvragen/${id}`} className="hover:text-neutral-900">← Terug naar aanvraag</Link>
      </nav>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">Review plaatsen</h1>

      {!quote ? (
        <p className="mt-3 text-neutral-500">Je kunt een review plaatsen zodra je een offerte hebt geaccepteerd.</p>
      ) : existing ? (
        <p className="mt-3 text-neutral-500">Je hebt al een review geplaatst voor {quote.company.name}.</p>
      ) : (
        <>
          <p className="mt-2 text-neutral-500">Beoordeel {quote.company.name}.</p>
          <div className="mt-6">
            <ReviewForm mode="account" quoteId={quote.id} defaultName={(user as { name?: string }).name ?? undefined} />
          </div>
        </>
      )}
    </main>
  );
}
