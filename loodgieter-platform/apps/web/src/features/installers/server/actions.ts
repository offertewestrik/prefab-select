"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { registerInstallerSchema, servicesSchema, coverageSchema } from "../schema";
import { registerInstaller, saveCompanyServices, saveCoverage, submitForReview } from "./onboarding";
import { setCompanyStatus } from "./admin";

export type RegisterState = { error?: string; fieldErrors?: Record<string, string> };
export type SaveState = { ok?: boolean; message?: string };

/** Registreren + direct inloggen + door naar diensten-stap. */
export async function registerInstallerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const parsed = registerInstallerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fe: Record<string, string> = {};
    for (const issue of parsed.error.issues) fe[String(issue.path[0])] = issue.message;
    return { error: "Controleer de ingevulde velden.", fieldErrors: fe };
  }

  const result = await registerInstaller(parsed.data);
  if (!result.ok) {
    return { error: result.reason === "email_taken" ? "Er bestaat al een account met dit e-mailadres." : "Er ging iets mis." };
  }

  // Inloggen → redirect naar de volgende stap (signIn gooit de redirect).
  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/aanmelden-vakman/diensten",
  });
  return {};
}

export async function saveServicesAction(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Geen bedrijf gekoppeld." };

  const parsed = servicesSchema.safeParse({ serviceIds: formData.getAll("serviceIds").map(String) });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Kies diensten." };

  await saveCompanyServices(company.id, parsed.data.serviceIds);
  revalidatePath("/dashboard/diensten");
  return { ok: true, message: "Diensten opgeslagen." };
}

export async function saveCoverageAction(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Geen bedrijf gekoppeld." };

  const radius = Number(formData.get("radiusKm"));
  const parsed = coverageSchema.safeParse({
    municipalityIds: formData.getAll("municipalityIds").map(String),
    radiusKm: Number.isFinite(radius) ? radius : undefined,
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Kies gemeenten." };

  await saveCoverage(company.id, parsed.data.municipalityIds, parsed.data.radiusKm);
  revalidatePath("/dashboard/werkgebied");
  return { ok: true, message: "Werkgebied opgeslagen." };
}

/** Profiel indienen ter beoordeling (form-action). */
export async function submitForReviewAction(_formData: FormData): Promise<void> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/aanmelden-vakman/bedrijf");
  const result = await submitForReview(company.id);
  if (result.ok) redirect("/aanmelden-vakman/klaar");
  // Onvolledig → terug naar de juiste stap.
  if (result.reason === "no_services") redirect("/aanmelden-vakman/diensten");
  redirect("/aanmelden-vakman/werkgebied");
}

// ── Admin ──
async function adminSetStatus(formData: FormData, status: "APPROVED" | "REJECTED" | "SUSPENDED") {
  const admin = await requireRole("ADMIN");
  const companyId = String(formData.get("companyId") ?? "");
  if (companyId) {
    await setCompanyStatus(companyId, status, (admin as { id?: string }).id);
    revalidatePath(`/admin/installers/${companyId}`);
    revalidatePath("/admin/installers");
  }
}
export async function approveCompanyAction(formData: FormData) {
  await adminSetStatus(formData, "APPROVED");
}
export async function rejectCompanyAction(formData: FormData) {
  await adminSetStatus(formData, "REJECTED");
}
export async function suspendCompanyAction(formData: FormData) {
  await adminSetStatus(formData, "SUSPENDED");
}
