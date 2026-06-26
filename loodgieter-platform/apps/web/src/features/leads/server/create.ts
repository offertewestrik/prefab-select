import "server-only";
import { prisma } from "@/lib/prisma";
import { slugify, brand, type LeadInput } from "@repo/core";
import { siteUrl } from "@repo/seo";
import { priceRange } from "@/lib/format";
import { notifyAdmins } from "@/features/notifications/server/service";
import { computeLeadPriceCredits } from "./pricing";
import { leadConfirmation, adminNotification } from "@/features/notifications/email/templates";
import { enqueue } from "@/features/jobs/queue";

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

  // 3. In-app admin-melding (snel, alleen DB).
  await notifyAdmins({ type: "lead.new", title: `Nieuwe lead: ${resolvedService.name}`, body: municipality.name, href: "/admin/leads" });

  // 4. Zware/trage taken naar de queue zodat de aanvraag direct kan terugkeren:
  //    AI-verrijking, matching + match-notificaties, en e-mails.
  const priceText = resolvedService.priceFrom
    ? priceRange(resolvedService.priceFrom, resolvedService.priceTo, resolvedService.priceUnit)
    : undefined;
  const confirmation = leadConfirmation({
    customerName: input.contactName,
    serviceName: resolvedService.name,
    city: municipality.name,
    priceText,
    accountUrl: lead.homeownerId ? siteUrl("/mijn-aanvragen") : undefined,
  });
  const adminMail = adminNotification({
    title: `Nieuwe lead: ${resolvedService.name} (${municipality.name})`,
    lines: [`Klant: ${input.contactName}`, `Telefoon: ${input.contactPhone}`, `E-mail: ${input.contactEmail}`],
    url: siteUrl("/admin/leads"),
  });
  const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || brand.email;

  await Promise.all([
    enqueue("lead.enrich_ai", { leadId: lead.id }),
    enqueue("lead.notify_matches", { leadId: lead.id }),
    enqueue("email.send", { to: input.contactEmail, subject: confirmation.subject, html: confirmation.html }),
    enqueue("email.send", { to: adminEmail, subject: adminMail.subject, html: adminMail.html }),
  ]);

  // Matching gebeurt nu asynchroon; geen synchroon aantal meer.
  return { id: lead.id, matched: 0 };
}
