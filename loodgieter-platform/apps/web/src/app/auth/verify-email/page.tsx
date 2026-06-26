import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";
import { verifyEmailToken, type VerifyResult } from "@/features/auth/server/tokens";

export const metadata: Metadata = { title: "E-mailadres bevestigen", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const messages: Record<VerifyResult, { ok: boolean; title: string; text: string }> = {
  ok: { ok: true, title: "E-mailadres bevestigd", text: "Bedankt! Je e-mailadres is geverifieerd. Je kunt nu inloggen." },
  expired: { ok: false, title: "Link verlopen", text: "Deze verificatielink is verlopen. Log in en vraag een nieuwe verificatiemail aan." },
  used: { ok: false, title: "Link al gebruikt", text: "Deze verificatielink is al gebruikt. Je e-mailadres is mogelijk al bevestigd." },
  invalid: { ok: false, title: "Ongeldige link", text: "Deze verificatielink is ongeldig. Log in en vraag een nieuwe verificatiemail aan." },
};

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const result = await verifyEmailToken(token ?? "");
  const m = messages[result];

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-8 text-center">
        {m.ok ? (
          <CheckCircle2 className="mx-auto h-12 w-12 text-success-500" />
        ) : (
          <XCircle className="mx-auto h-12 w-12 text-neutral-400" />
        )}
        <h1 className="mt-4 text-xl font-bold text-neutral-900">{m.title}</h1>
        <p className="mt-2 text-sm text-neutral-500">{m.text}</p>
        <Link href="/login" className="mt-6 block">
          <Button className="w-full">Naar inloggen</Button>
        </Link>
        <p className="mt-4 text-xs text-neutral-400">{brand.name}</p>
      </div>
    </main>
  );
}
