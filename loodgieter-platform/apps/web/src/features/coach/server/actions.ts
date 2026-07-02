"use server";

import { businessCoach, type BusinessCoachOutput } from "@repo/ai";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { runAgent } from "@/features/ai/run";
import { computeCompanyStats } from "./service";

export type CoachState = { ok?: boolean; advice?: BusinessCoachOutput; message?: string };

/** Berekent de cijfers en laat de AI-bedrijfscoach concrete tips geven. */
export async function runBusinessCoachAction(_prev: CoachState, _formData: FormData): Promise<CoachState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Geen bedrijf gekoppeld." };

  const stats = await computeCompanyStats(company.id, 30);
  const res = await runAgent(
    businessCoach,
    { ...stats },
    { summary: "AI-bedrijfscoach", companyId: company.id },
  );
  if (!res.ok || !res.data) return { ok: false, message: "De coach kon geen advies maken. Probeer het later opnieuw." };
  return { ok: true, advice: res.data };
}
