"use client";

import { useActionState } from "react";
import { MailWarning } from "lucide-react";
import { resendVerificationAction, type ResendState } from "@/features/auth/server/actions";

/** Banner in het dashboard zolang het e-mailadres niet is geverifieerd. */
export function VerifyEmailBanner() {
  const [state, action, pending] = useActionState<ResendState, FormData>(resendVerificationAction, {});

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-[var(--radius-xl)] border border-accent-500/30 bg-accent-500/5 p-4 text-sm">
      <MailWarning className="h-5 w-5 shrink-0 text-accent-600" />
      <p className="text-neutral-700">
        Je e-mailadres is nog niet bevestigd. Controleer je inbox of stuur de verificatiemail opnieuw.
      </p>
      <form action={action} className="ml-auto">
        {state.sent ? (
          <span className="text-success-600">Verzonden — controleer je inbox.</span>
        ) : (
          <button
            disabled={pending}
            className="rounded-[var(--radius-md)] border border-accent-500/40 bg-white px-3 py-1.5 font-medium text-accent-700 hover:bg-accent-500/10"
          >
            {pending ? "Bezig…" : "Opnieuw versturen"}
          </button>
        )}
      </form>
    </div>
  );
}
