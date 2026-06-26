import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@repo/core";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = { title: "Nieuw wachtwoord instellen", robots: { index: false, follow: false } };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
          <h1 className="text-xl font-bold text-neutral-900">Nieuw wachtwoord instellen</h1>
          {token ? (
            <ResetPasswordForm token={token} />
          ) : (
            <p className="mt-3 text-sm text-neutral-500">
              Geen geldige link. Vraag een nieuwe aan via{" "}
              <Link href="/wachtwoord-vergeten" className="font-medium text-primary-600">wachtwoord vergeten</Link>.
            </p>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-neutral-400">{brand.name}</p>
      </div>
    </main>
  );
}
