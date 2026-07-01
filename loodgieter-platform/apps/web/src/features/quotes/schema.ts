import { z } from "zod";

export const quoteItemKind = z.enum(["LABOUR", "MATERIAL", "OTHER"]);
export type QuoteItemKind = z.infer<typeof quoteItemKind>;

// Bedragen worden in centen opgeslagen. De editor rekent in euro's en converteert.
// kind/optional/hours zijn optioneel zodat bestaande (oude) offerteregels blijven werken.
export const lineItemSchema = z.object({
  description: z.string().min(1, "Omschrijving verplicht"),
  qty: z.number().positive("Aantal moet groter dan 0 zijn"),
  unitPriceCents: z.number().int().nonnegative(),
  kind: quoteItemKind.optional(),
  optional: z.boolean().optional(),
  hours: z.number().nonnegative().optional(),
});

export type LineItem = z.infer<typeof lineItemSchema>;

// Opslaan (concept): soepel — een DRAFT mag onvolledig zijn.
export const saveQuoteSchema = z.object({
  title: z.string().max(200).optional().default(""),
  introText: z.string().max(5000).optional().default(""),
  lineItems: z.array(lineItemSchema).default([]),
  discountCents: z.number().int().nonnegative().optional().default(0),
  vatRate: z.number().int().min(0).max(100).default(21),
  validUntil: z.string().optional().nullable(),
  terms: z.string().max(5000).optional().default(""),
  notes: z.string().max(5000).optional().default(""),
  // Klantgegevens (voor losse offertes zonder lead).
  customerName: z.string().max(200).optional().default(""),
  customerEmail: z.string().email().or(z.literal("")).optional().default(""),
  customerPhone: z.string().max(40).optional().default(""),
  customerAddress: z.string().max(300).optional().default(""),
});

export type SaveQuoteInput = z.infer<typeof saveQuoteSchema>;

// Versturen: streng — alle verplichte velden moeten kloppen.
export const sendQuoteSchema = z.object({
  title: z.string().min(2, "Titel is verplicht"),
  lineItems: z.array(lineItemSchema).min(1, "Voeg minstens één regel toe"),
  vatRate: z.number().int().min(0).max(100),
  validUntil: z.string().min(1, "Geldig tot is verplicht"),
});
