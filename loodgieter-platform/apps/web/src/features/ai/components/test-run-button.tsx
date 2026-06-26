"use client";

import { useActionState } from "react";
import { testRunAgentAction, type TestRunState } from "@/features/ai/actions";

export function TestRunButton({ agent }: { agent: string }) {
  const [state, action, pending] = useActionState<TestRunState, FormData>(testRunAgentAction, {});

  return (
    <div>
      <form action={action}>
        <input type="hidden" name="agent" value={agent} />
        <button
          disabled={pending}
          className="rounded-[var(--radius-md)] bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-60"
        >
          {pending ? "Bezig…" : "Test run (demo-input)"}
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
      {state.ok && state.output && (
        <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-3 text-xs text-neutral-700">{state.output}</pre>
      )}
    </div>
  );
}
