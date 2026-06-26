"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui";
import { resetPasswordAction, type ResetState } from "@/features/auth/server/actions";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<ResetState, FormData>(resetPasswordAction, {});

  if (state.ok) {
    return (
      <div className="mt-4">
        <p className="rounded-[var(--radius-md)] bg-success-500/5 p-4 text-sm text-neutral-700">
          Je wachtwoord is bijgewerkt. Je kunt nu inloggen met je nieuwe wachtwoord.
        </p>
        <Link href="/login" className="mt-4 block">
          <Button className="w-full">Naar inloggen</Button>
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-5 space-y-4">
      <input type="hidden" name="token" value={token} />
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-900">Nieuw wachtwoord</label>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
        />
        <p className="mt-1 text-xs text-neutral-400">Minimaal 8 tekens.</p>
      </div>
      {state.error && <p className="text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Bezig…" : "Wachtwoord opslaan"}
      </Button>
    </form>
  );
}
