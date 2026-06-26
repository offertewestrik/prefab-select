// Zod-schema's voor de aanvraagflow — gedeeld door client (React Hook Form)
// en server (server action). Eén bron van waarheid voor validatie.

import { z } from "zod";

export const leadStep1Schema = z.object({
  serviceId: z.string().min(1, "Kies een dienst."),
  brandId: z.string().optional(),
});

export const leadStep3Schema = z.object({
  postcode: z
    .string()
    .regex(/^\d{4}\s?[A-Za-z]{2}$/, "Vul een geldige postcode in (bijv. 1234 AB)."),
  houseNumber: z.string().min(1, "Vul je huisnummer in."),
  street: z.string().optional(),
  city: z.string().min(2, "Vul je plaats in."),
  municipalityId: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const leadStep4Schema = z.object({
  contactName: z.string().min(2, "Vul je naam in."),
  contactEmail: z.string().email("Vul een geldig e-mailadres in."),
  contactPhone: z.string().min(8, "Vul een geldig telefoonnummer in."),
  urgency: z.enum(["SPOED", "BINNEN_WEEK", "FLEXIBEL"]),
  preferredDate: z.string().optional(), // YYYY-MM-DD
  preferredDaypart: z
    .enum(["OCHTEND", "MIDDAG", "AVOND", "MAAKT_NIET_UIT"])
    .default("MAAKT_NIET_UIT"),
  description: z.string().min(5, "Geef een korte omschrijving."),
});

// Volledige aanvraag (server-side). Combineert alle stappen + anti-spam-token.
export const leadInputSchema = leadStep1Schema
  .merge(leadStep3Schema)
  .merge(leadStep4Schema)
  .extend({
    photos: z.array(z.string().url()).max(10).optional(),
    source: z.string().optional(),
    turnstileToken: z.string().optional(),
  });

export type LeadStep1 = z.infer<typeof leadStep1Schema>;
export type LeadStep3 = z.infer<typeof leadStep3Schema>;
export type LeadStep4 = z.infer<typeof leadStep4Schema>;
export type LeadInput = z.infer<typeof leadInputSchema>;
