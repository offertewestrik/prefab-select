"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@repo/ui";
import { startCheckoutAction, type CheckoutState } from "@/features/billing/server/actions";

export function BuyCreditsButton({ packageId, label, disabled }: { packageId: string; label: string; disabled?: boolean }) {
  const [state, formAction, pending] = useActionState<CheckoutState, FormData>(startCheckoutAction, {});

  useEffect(() => {
    if (state.url) window.location.href = state.url;
  }, [state.url]);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="packageId" value={packageId} />
      <Button type="submit" className="w-full" disabled={pending || disabled}>
        {pending ? "Bezig…" : label}
      </Button>
      {state.error && <p className="mt-2 text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
    </form>
  );
}
