import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@repo/core";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = { title: "Wachtwoord vergeten", robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm">
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
          <h1 className="text-xl font-bold text-neutral-900">Wachtwoord vergeten</h1>
          <p className="mt-1 text-sm text-neutral-500">Vul je e-mailadres in en we sturen je een link om een nieuw wachtwoord in te stellen.</p>
          <ForgotPasswordForm />
        </div>
        <p className="mt-4 text-center text-sm text-neutral-500">
          <Link href="/login" className="font-medium text-primary-600">Terug naar inloggen</Link>
        </p>
        <p className="mt-2 text-center text-xs text-neutral-400">{brand.name}</p>
      </div>
    </main>
  );
}
