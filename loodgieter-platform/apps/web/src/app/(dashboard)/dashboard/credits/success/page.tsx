import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@repo/ui";
import { prisma } from "@/lib/prisma";

export default async function CreditsSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const payment = session_id
    ? await prisma.payment.findUnique({ where: { stripeSessionId: session_id }, include: { package: true } }).catch(() => null)
    : null;

  const paid = payment?.status === "PAID";

  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success-500" />
      <h1 className="mt-6 text-3xl font-bold text-neutral-900">Bedankt voor je betaling!</h1>
      <p className="mt-3 text-neutral-500">
        {paid
          ? `Je ${payment?.credits} credits zijn bijgeschreven.`
          : "Je betaling wordt verwerkt. Je credits worden bijgeschreven zodra de betaling is bevestigd (meestal binnen enkele seconden)."}
      </p>
      <div className="mt-8">
        <Link href="/dashboard/credits"><Button>Naar mijn credits</Button></Link>
      </div>
    </div>
  );
}
