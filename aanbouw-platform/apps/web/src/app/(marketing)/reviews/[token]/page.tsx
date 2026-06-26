import type { Metadata } from "next";
import { getInviteByToken } from "@/features/reviews/server/service";
import { ReviewForm } from "@/features/reviews/components/review-form";

export const metadata: Metadata = { title: "Review plaatsen", robots: { index: false, follow: false } };

export default async function ReviewByTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = await getInviteByToken(token);

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      {!data ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Ongeldige reviewlink</h1>
          <p className="mt-2 text-neutral-500">Deze link is niet (meer) geldig.</p>
        </div>
      ) : data.alreadyReviewed ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Je hebt al een review geplaatst</h1>
          <p className="mt-2 text-neutral-500">Bedankt voor je feedback!</p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Beoordeel {data.company.name}</h1>
          <p className="mt-2 text-neutral-500">Je feedback helpt andere klanten een goede keuze te maken.</p>
          <div className="mt-6">
            <ReviewForm mode="token" token={token} defaultName={data.lead?.contactName} />
          </div>
        </>
      )}
    </main>
  );
}
