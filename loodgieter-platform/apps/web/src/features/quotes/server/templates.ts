import "server-only";
import { prisma } from "@/lib/prisma";
import { computeTotals } from "./service";
import { nextQuoteNumber } from "./mutations";
import type { LineItem } from "../schema";

/** Beschikbare templates voor een bedrijf: platform-standaard (companyId=null) + eigen. */
export async function listQuoteTemplates(companyId: string) {
  return prisma.quoteTemplate.findMany({
    where: { active: true, OR: [{ companyId: null }, { companyId }] },
    orderBy: [{ order: "asc" }, { title: "asc" }],
    include: {
      service: { select: { name: true, slug: true, category: { select: { name: true } } } },
      _count: { select: { items: true } },
    },
  });
}

/** Eén template met regels; alleen platform-standaard of eigen template. */
export async function getQuoteTemplate(id: string, companyId: string) {
  const t = await prisma.quoteTemplate.findUnique({
    where: { id },
    include: { items: { orderBy: { order: "asc" } } },
  });
  if (!t) return null;
  if (t.companyId && t.companyId !== companyId) return null;
  return t;
}

export interface NewQuoteCustomer {
  customerId?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * Maakt een nieuw DRAFT op basis van een template (of leeg) + klantgegevens.
 * Regels, btw, voorwaarden en garantie worden voorgevuld; de vakman past alles
 * daarna zelf aan in de editor. Prijzen zijn richtprijzen (startpunten).
 */
export async function createQuoteFromTemplate(
  companyId: string,
  input: { templateId?: string; customer?: NewQuoteCustomer },
): Promise<{ ok: true; quoteId: string } | { ok: false; reason: string }> {
  const template = input.templateId ? await getQuoteTemplate(input.templateId, companyId) : null;
  if (input.templateId && !template) return { ok: false, reason: "template_not_found" };

  const settings = await prisma.contractorSettings.findUnique({ where: { companyId } });
  const vatRate = template?.defaultVatRate ?? settings?.defaultVatRate ?? 21;

  const lineItems: LineItem[] = (template?.items ?? []).map((it) => ({
    description: it.description,
    qty: it.qty,
    unitPriceCents: it.unitPriceCents,
    kind: it.kind,
    optional: it.optional,
    hours: it.hours ?? undefined,
  }));
  const { subtotalCents, discountCents, vatCents, totalCents } = computeTotals(lineItems, vatRate, 0);

  // Klantgerichte voorwaarden + garantie samen in `terms` (verschijnt op de PDF).
  const warranty = template?.warrantyText ?? settings?.defaultWarranty ?? "";
  const termsBody = template?.termsText ?? settings?.defaultTerms ?? "";
  const terms = [warranty && `Garantie\n${warranty}`, termsBody && `Voorwaarden\n${termsBody}`]
    .filter(Boolean)
    .join("\n\n") || null;

  const number = await nextQuoteNumber(companyId);
  const quote = await prisma.quote.create({
    data: {
      companyId,
      templateId: template?.id ?? null,
      customerId: input.customer?.customerId ?? null,
      number,
      title: template?.title ?? "Offerte",
      introText: template?.description ?? null,
      lineItems,
      vatRate,
      subtotalCents,
      discountCents,
      vatCents,
      totalCents,
      terms,
      customerName: input.customer?.name || null,
      customerEmail: input.customer?.email || null,
      customerPhone: input.customer?.phone || null,
      customerAddress: input.customer?.address || null,
      status: "DRAFT",
    },
  });
  return { ok: true, quoteId: quote.id };
}
