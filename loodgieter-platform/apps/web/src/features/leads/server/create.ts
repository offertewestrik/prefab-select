import "server-only";
import { prisma } from "@/lib/prisma";
import { slugify, type LeadInput } from "@repo/core";
import { sendLeadConfirmation, sendInternalLeadNotification } from "@/lib/email";
import { computeLeadPriceCredits } from "./pricing";
import { matchLead } from "./matching";

export interface CreateLeadResult {
  id: string;
  matched: number;
}

/**
 * Maakt een lead aan: valideren gebeurt in de API-laag (Zod). Hier:
 * gemeente resolven → opslaan → bevestiging mailen → matching starten.
 */
export async function createLead(
  input: LeadInput,
  meta: { source?: string; ipHash?: string },
): Promise<CreateLeadResult> {
  // 1. Dienst + gemeente resolven (gemeente via id of via plaatsnaam-slug).
  const service = await prisma.service.findFirst({
    where: { slug: input.serviceId, publish: "ACTIVE" },
  });
  // serviceId kan een slug of een echte id zijn; ondersteun beide.
  const resolvedService =
    service ?? (await prisma.service.findUnique({ where: { id: input.serviceId } }));
  if (!resolvedService) throw new Error("Onbekende dienst.");

  let municipality = input.municipalityId
    ? await prisma.municipality.findUnique({ where: { id: input.municipalityId } })
    : null;
  if (!municipality) {
    municipality =
      (await prisma.municipality.findUnique({ where: { slug: slugify(input.city) } })) ??
      (await prisma.municipality.findFirst({ where: { name: input.city } }));
  }
  if (!municipality) throw new Error("Gemeente niet gevonden.");

  const priceCredits = computeLeadPriceCredits({ urgency: input.urgency });

  // 2. Opslaan (incl. bijlagen).
  const lead = await prisma.leadRequest.create({
    data: {
      serviceId: resolvedService.id,
      brandId: input.brandId || null,
      municipalityId: municipality.id,
      postcode: input.postcode,
      houseNumber: input.houseNumber,
      street: input.street,
      city: input.city,
      lat: input.lat,
      lng: input.lng,
      urgency: input.urgency,
      description: input.description,
      preferredDate: input.preferredDate ? new Date(input.preferredDate) : null,
      preferredDaypart: input.preferredDaypart,
      contactName: input.contactName,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      priceCredits,
      source: meta.source,
      ipHash: meta.ipHash,
      attachments: input.photos?.length
        ? { create: input.photos.map((url) => ({ url, kind: "PHOTO" as const })) }
        : undefined,
    },
  });

  // 3. E-mails (best-effort, blokkeert de aanvraag niet).
  void sendLeadConfirmation({
    to: input.contactEmail,
    name: input.contactName,
    serviceName: resolvedService.name,
    city: municipality.name,
  });
  void sendInternalLeadNotification({
    serviceName: resolvedService.name,
    city: municipality.name,
    name: input.contactName,
    phone: input.contactPhone,
    email: input.contactEmail,
  });

  // 4. Matching starten (best-effort).
  let matched = 0;
  try {
    matched = await matchLead(lead.id);
  } catch {
    matched = 0;
  }

  return { id: lead.id, matched };
}
