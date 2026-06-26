"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { acceptQuoteAction, rejectQuoteAction } from "../server/actions";

export function QuoteDecision({ quoteId, token }: { quoteId: string; token?: string | null }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function decide(kind: "accept" | "reject") {
    start(async () => {
      const fd = new FormData();
      fd.set("quoteId", quoteId);
      if (token) fd.set("token", token);
      const action = kind === "accept" ? acceptQuoteAction : rejectQuoteAction;
      const r = await action({}, fd);
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <Button variant="accent" disabled={pending} onClick={() => decide("accept")}>
          Offerte accepteren
        </Button>
        <Button variant="outline" disabled={pending} onClick={() => decide("reject")}>
          Afwijzen
        </Button>
      </div>
      {msg && (
        <p className={`mt-3 text-sm ${msg.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
