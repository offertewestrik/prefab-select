"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { requestPasswordResetAction, type ForgotState } from "@/features/auth/server/actions";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState<ForgotState, FormData>(requestPasswordResetAction, {});

  if (state.done) {
    return (
      <p className="rounded-[var(--radius-md)] bg-success-500/5 p-4 text-sm text-neutral-700">
        Als er een account bij dit e-mailadres hoort, sturen we een e-mail met instructies om je wachtwoord opnieuw in te stellen.
        Controleer ook je spamfolder.
      </p>
    );
  }

  return (
    <form action={action} className="mt-5 space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-900">E-mailadres</label>
        <input
          type="email"
          name="email"
          required
          className="h-11 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm"
        />
      </div>
      {state.error && <p className="text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Bezig…" : "Stuur reset-link"}
      </Button>
    </form>
  );
}
