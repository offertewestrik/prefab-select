"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Droplets } from "lucide-react";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("Onjuiste inloggegevens.");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-50 px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2 font-bold text-neutral-900">
          <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)] bg-primary-500 text-white">
            <Droplets className="h-5 w-5" />
          </span>
          {brand.shortName}
        </Link>
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
          <h1 className="text-xl font-bold text-neutral-900">Inloggen</h1>
          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">E-mailadres</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">Wachtwoord</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
              />
            </div>
            {error && <p className="text-sm text-[color:var(--color-status-danger,#DC2626)]">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Bezig…" : "Inloggen"}
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-neutral-500">
          Nog geen account?{" "}
          <Link href="/aanmelden-vakman" className="font-medium text-primary-600">
            Word partner
          </Link>
        </p>
      </div>
    </main>
  );
}
