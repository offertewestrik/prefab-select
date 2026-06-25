"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { buyLeadAction, type BuyState } from "@/features/leads/server/actions";

export function BuyLeadButton({
  leadId,
  priceCredits,
  disabled,
}: {
  leadId: string;
  priceCredits: number;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<BuyState, FormData>(buyLeadAction, {});

  useEffect(() => {
    if (state.ok) router.refresh(); // toont de vrijgegeven gegevens
  }, [state.ok, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="leadId" value={leadId} />
      <Button type="submit" variant="accent" size="lg" disabled={pending || disabled}>
        {pending ? "Bezig…" : `Koop lead voor ${priceCredits} credits`}
      </Button>
      {state.message && (
        <p className={`mt-2 text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
