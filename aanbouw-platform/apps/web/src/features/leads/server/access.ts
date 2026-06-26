import "server-only";
import { prisma } from "@/lib/prisma";
import { urgencyLabels, daypartLabels } from "@repo/core";

// Veilige lead-weergave. PII (naam/e-mail/telefoon/exact adres) verlaat de
// server NOOIT zolang de lead niet is gekocht. Masking gebeurt hier, niet in de UI.

export type LeadView =
  | { status: "forbidden" }
  | { status: "ok"; unlocked: boolean; data: LeadViewData };

export interface LeadViewData {
  id: string;
  serviceName: string;
  categoryName: string;
  city: string;
  province: string;
  postcodeArea: string; // alleen cijfers (regio), nooit volledige postcode bij locked
  urgencyLabel: string;
  daypartLabel: string;
  preferredDate: string | null;
  description: string;
  attachmentCount: number;
  priceCredits: number;
  soldCount: number;
  maxBuyers: number;
  status: string;
  // Alleen aanwezig wanneer unlocked (gekocht of admin):
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  street?: string;
  houseNumber?: string;
  postcode?: string;
  attachments?: { id: string; url: string; name: string | null }[];
  // Alleen bij locked:
  maskedName?: string;
}

function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const initial = first.charAt(0).toUpperCase();
  return parts.length > 1 ? `${initial}. ${parts[parts.length - 1]!.charAt(0).toUpperCase()}.` : `${initial}.`;
}

/**
 * Haalt een lead op voor een aannemer (of admin). Bepaalt of de lead is
 * vrijgegeven (gekocht door dit bedrijf, of admin) en projecteert alleen de
 * toegestane velden.
 */
export async function getLeadView(
  leadId: string,
  companyId: string | null,
  isAdmin: boolean,
): Promise<LeadView> {
  const lead = await prisma.leadRequest.findUnique({
    where: { id: leadId },
    include: {
      service: { include: { category: true } },
      municipality: { include: { province: true } },
      attachments: true,
    },
  });
  if (!lead) return { status: "forbidden" };

  const match = companyId
    ? await prisma.leadMatch.findUnique({
        where: { leadId_companyId: { leadId, companyId } },
      })
    : null;

  // Een aannemer mag een lead alleen zien als die aan hem is aangeboden.
  if (!isAdmin && !match) return { status: "forbidden" };

  const purchased = match?.status === "PURCHASED";
  const unlocked = isAdmin || purchased;

  const base: LeadViewData = {
    id: lead.id,
    serviceName: lead.service.name,
    categoryName: lead.service.category.name,
    city: lead.city,
    province: lead.municipality.province.name,
    postcodeArea: lead.postcode.replace(/\s/g, "").slice(0, 4),
    urgencyLabel: urgencyLabels[lead.urgency],
    daypartLabel: daypartLabels[lead.preferredDaypart],
    preferredDate: lead.preferredDate ? lead.preferredDate.toISOString().slice(0, 10) : null,
    description: lead.description,
    attachmentCount: lead.attachments.length,
    priceCredits: match?.priceCredits ?? lead.priceCredits,
    soldCount: lead.soldCount,
    maxBuyers: lead.maxBuyers,
    status: lead.status,
  };

  if (unlocked) {
    return {
      status: "ok",
      unlocked: true,
      data: {
        ...base,
        contactName: lead.contactName,
        contactEmail: lead.contactEmail,
        contactPhone: lead.contactPhone,
        street: lead.street ?? undefined,
        houseNumber: lead.houseNumber ?? undefined,
        postcode: lead.postcode,
        attachments: lead.attachments.map((a) => ({ id: a.id, url: a.url, name: a.name })),
      },
    };
  }

  return { status: "ok", unlocked: false, data: { ...base, maskedName: maskName(lead.contactName) } };
}

/** Aangeboden, nog niet gekochte leads voor een bedrijf (preview-lijst). */
export async function getAvailableLeads(companyId: string) {
  const matches = await prisma.leadMatch.findMany({
    where: { companyId, status: { in: ["OFFERED", "VIEWED"] } },
    orderBy: { offeredAt: "desc" },
    include: { lead: { include: { service: true, municipality: true } } },
  });
  return matches.map((m) => ({
    leadId: m.leadId,
    serviceName: m.lead.service.name,
    city: m.lead.municipality.name,
    urgency: m.lead.urgency,
    priceCredits: m.priceCredits,
    offeredAt: m.offeredAt,
    soldOut: m.lead.soldCount >= m.lead.maxBuyers,
  }));
}

/** Door het bedrijf gekochte leads ("Mijn leads"). */
export async function getPurchasedLeads(companyId: string) {
  const purchases = await prisma.leadPurchase.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    include: {
      match: {
        include: { lead: { include: { service: true, municipality: true } } },
      },
    },
  });
  return purchases.map((p) => ({
    leadId: p.match.leadId,
    serviceName: p.match.lead.service.name,
    city: p.match.lead.municipality.name,
    contactName: p.match.lead.contactName,
    contactPhone: p.match.lead.contactPhone,
    creditsSpent: p.creditsSpent,
    purchasedAt: p.createdAt,
    status: p.match.lead.status,
  }));
}
