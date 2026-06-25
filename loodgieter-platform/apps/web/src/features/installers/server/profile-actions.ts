"use server";

import { revalidatePath } from "next/cache";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import {
  updateCompanyProfile,
  addCertification,
  removeCertification,
  removePhoto,
  setVisibility,
} from "./profile";

export type ProfileState = { ok?: boolean; message?: string };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

export async function updateProfileAction(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const company = await companyGuard();
  const result = await updateCompanyProfile(company.id, Object.fromEntries(formData));
  revalidatePath("/dashboard/profiel/bedrijf");
  revalidatePath(`/vakmannen/${company.slug}`);
  return result.ok ? { ok: true, message: "Profiel opgeslagen." } : { ok: false, message: result.reason ?? "Mislukt." };
}

export async function addCertAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  await addCertification(company.id, {
    type: String(formData.get("type") ?? ""),
    number: String(formData.get("number") ?? "") || undefined,
    validUntil: String(formData.get("validUntil") ?? "") || undefined,
  });
  revalidatePath("/dashboard/profiel/keurmerken");
}

export async function removeCertAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  await removeCertification(company.id, String(formData.get("id") ?? ""));
  revalidatePath("/dashboard/profiel/keurmerken");
}

export async function removePhotoAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  await removePhoto(company.id, String(formData.get("id") ?? ""));
  revalidatePath("/dashboard/profiel/media");
}

/** Admin: publiek profiel tonen/verbergen. */
export async function setVisibilityAction(formData: FormData): Promise<void> {
  await requireRole("ADMIN");
  const companyId = String(formData.get("companyId") ?? "");
  const visible = formData.get("visible") === "true";
  if (companyId) {
    await setVisibility(companyId, visible);
    revalidatePath(`/admin/installers/${companyId}`);
  }
}
