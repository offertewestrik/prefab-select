import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { brand } from "@repo/core";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/guards";

export const metadata: Metadata = { title: "Mijn aanvragen", robots: { index: false, follow: false } };

export default async function MyRequestsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const leads = await prisma.leadRequest.findMany({
    where: { homeownerId: (user as { id: string }).id },
    orderBy: { createdAt: "desc" },
    include: { service: true, municipality: true, _count: { select: { quotes: true } } },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Mijn aanvragen</h1>
      <p className="mt-2 text-neutral-500">Je aanvragen en ontvangen offertes bij {brand.name}.</p>

      {leads.length === 0 ? (
        <p className="mt-8 text-neutral-500">Je hebt nog geen aanvragen gedaan.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {leads.map((l) => (
            <li key={l.id}>
              <Link href={`/mijn-aanvragen/${l.id}`} className="block rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 hover:shadow-[var(--shadow-md)]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">{l.service.name}</span>
                  <span className="text-sm text-neutral-500">{l.municipality.name}</span>
                </div>
                <div className="mt-1 text-sm text-neutral-500">
                  {l._count.quotes} offerte(s) ontvangen · status {l.status}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
