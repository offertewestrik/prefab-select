"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export type SettingsState = { ok?: boolean; message?: string };

const schema = z.object({
  defaultVatRate: z.coerce.number().int().min(0).max(100).default(21),
  defaultValidityDays: z.coerce.number().int().min(1).max(365).default(30),
  quotePrefix: z.string().trim().min(1).max(10).default("OFF"),
  iban: z.string().trim().max(34).optional().default(""),
  defaultWarranty: z.string().max(5000).optional().default(""),
  defaultTerms: z.string().max(5000).optional().default(""),
  footerNote: z.string().max(1000).optional().default(""),
  accentColor: z.string().trim().max(9).optional().default(""),
  secondaryColor: z.string().trim().max(9).optional().default(""),
});

/** Offerte-/factuurinstellingen van het bedrijf opslaan (upsert). */
export async function saveContractorSettingsAction(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Geen bedrijf gekoppeld." };

  const parsed = schema.safeParse({
    defaultVatRate: formData.get("defaultVatRate"),
    defaultValidityDays: formData.get("defaultValidityDays"),
    quotePrefix: formData.get("quotePrefix"),
    iban: formData.get("iban"),
    defaultWarranty: formData.get("defaultWarranty"),
    defaultTerms: formData.get("defaultTerms"),
    footerNote: formData.get("footerNote"),
    accentColor: formData.get("accentColor"),
    secondaryColor: formData.get("secondaryColor"),
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  const d = parsed.data;

  // Alleen geldige hex-kleuren (#rrggbb) opslaan; anders leeg → platform-standaard.
  const hex = (v: string) => (/^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null);
  const accentColor = hex(d.accentColor);
  const secondaryColor = hex(d.secondaryColor);

  const data = {
    defaultVatRate: d.defaultVatRate,
    defaultValidityDays: d.defaultValidityDays,
    quotePrefix: d.quotePrefix.toUpperCase(),
    iban: d.iban || null,
    defaultWarranty: d.defaultWarranty || null,
    defaultTerms: d.defaultTerms || null,
    footerNote: d.footerNote || null,
    accentColor,
    secondaryColor,
  };

  await prisma.contractorSettings.upsert({
    where: { companyId: company.id },
    create: { companyId: company.id, ...data },
    update: data,
  });
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard/onboarding");
  return { ok: true, message: "Instellingen opgeslagen." };
}
