"use client";

import Link from "next/link";
import { useCrm } from "@/lib/store";
import { AlertTriangle, X } from "lucide-react";

/**
 * Globale melding wanneer een wijziging niet in de database kon worden
 * opgeslagen (Supabase write-through faalde). Zichtbaar op elke CRM-pagina,
 * zodat een mislukte opslag van een offerte, factuur, betaling of product
 * nooit stil gebeurt. Verwijst naar de Systeemstatus voor de oorzaak.
 */
export function SyncErrorBanner() {
  const syncError = useCrm((s) => s.syncError);
  const setSyncError = useCrm((s) => s.setSyncError);

  if (!syncError) return null;

  return (
    <div className="border-b border-rose-200 bg-rose-50 px-4 py-2.5 sm:px-6 lg:px-8">
      <div className="flex items-start gap-3 text-sm text-rose-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
        <div className="flex-1">
          <span className="font-semibold">Opslaan mislukt:</span> {syncError}{" "}
          Je wijziging staat nu alleen lokaal.{" "}
          <Link href="/systeemstatus" className="font-semibold underline hover:text-rose-900">
            Open Systeemstatus
          </Link>{" "}
          om de oorzaak te zien.
        </div>
        <button
          onClick={() => setSyncError(null)}
          className="rounded-lg p-1 text-rose-400 hover:bg-rose-100 hover:text-rose-600"
          title="Melding sluiten"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
