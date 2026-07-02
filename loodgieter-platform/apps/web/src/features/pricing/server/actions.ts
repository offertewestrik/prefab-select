"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { priceTemplateSchema } from "../schema";

export type PriceTemplateState = { ok?: boolean; message?: string };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

/** Globaal-unieke slug voor een eigen template. */
function ownSlug(companyId: string): string {
  return `own-${companyId}-${Date.now().toString(36)}`;
}

async function ownTemplateOr404(id: string, companyId: string) {
  const t = await prisma.quoteTemplate.findUnique({ where: { id }, select: { id: true, companyId: true } });
  if (!t || t.companyId !== companyId) return null;
  return t;
}

/** Nieuwe lege eigen template → redirect naar de editor. */
export async function createEmptyTemplateAction(): Promise<void> {
  const company = await companyGuard();
  const t = await prisma.quoteTemplate.create({
    data: { companyId: company.id, slug: ownSlug(company.id), title: "Nieuwe prijstemplate", defaultVatRate: 21, active: true },
  });
  revalidatePath("/dashboard/prijzen");
  redirect(`/dashboard/prijzen/${t.id}`);
}

/** Kopieer een platform-standaardtemplate naar een eigen template (prijzen daarna aanpasbaar). */
export async function copyPlatformTemplateAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const sourceId = String(formData.get("sourceId") ?? "");
  const source = await prisma.quoteTemplate.findUnique({ where: { id: sourceId }, include: { items: { orderBy: { order: "asc" } } } });
  if (!source || source.companyId !== null) redirect("/dashboard/prijzen");

  const created = await prisma.quoteTemplate.create({
    data: {
      companyId: company.id,
      serviceId: source!.serviceId,
      slug: ownSlug(company.id),
      title: source!.title,
      description: source!.description,
      defaultVatRate: source!.defaultVatRate,
      warrantyText: source!.warrantyText,
      termsText: source!.termsText,
      priceFromCents: source!.priceFromCents,
      priceToCents: source!.priceToCents,
      active: true,
      items: {
        create: source!.items.map((it, i) => ({
          kind: it.kind,
          description: it.description,
          qty: it.qty,
          unitPriceCents: it.unitPriceCents,
          hours: it.hours,
          optional: it.optional,
          order: i,
        })),
      },
    },
  });
  revalidatePath("/dashboard/prijzen");
  redirect(`/dashboard/prijzen/${created.id}`);
}

/** Eigen template opslaan (inclusief regels — die worden vervangen). */
export async function saveTemplateAction(templateId: string, _prev: PriceTemplateState, formData: FormData): Promise<PriceTemplateState> {
  const company = await companyGuard();
  if (!(await ownTemplateOr404(templateId, company.id))) return { ok: false, message: "Template niet gevonden." };

  let payload: unknown;
  try { payload = JSON.parse(String(formData.get("payload") ?? "{}")); } catch { return { ok: false, message: "Ongeldige gegevens." }; }
  const parsed = priceTemplateSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  const d = parsed.data;

  await prisma.$transaction([
    prisma.quoteTemplateItem.deleteMany({ where: { templateId } }),
    prisma.quoteTemplate.update({
      where: { id: templateId },
      data: {
        title: d.title,
        description: d.description || null,
        defaultVatRate: d.defaultVatRate,
        priceFromCents: d.priceFromCents ?? null,
        priceToCents: d.priceToCents ?? null,
        warrantyText: d.warrantyText || null,
        termsText: d.termsText || null,
        active: d.active,
        items: {
          create: d.items.map((it, i) => ({
            kind: it.kind,
            description: it.description,
            qty: it.qty,
            unitPriceCents: it.unitPriceCents,
            hours: it.hours,
            optional: it.optional,
            order: i,
          })),
        },
      },
    }),
  ]);
  revalidatePath("/dashboard/prijzen");
  revalidatePath(`/dashboard/prijzen/${templateId}`);
  return { ok: true, message: "Template opgeslagen." };
}

/** Eigen template verwijderen. */
export async function deleteTemplateAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const id = String(formData.get("templateId") ?? "");
  if (await ownTemplateOr404(id, company.id)) {
    await prisma.quoteTemplate.delete({ where: { id } });
  }
  revalidatePath("/dashboard/prijzen");
  redirect("/dashboard/prijzen");
}
