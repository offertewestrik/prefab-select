import { z } from "zod";
import { quoteItemKind } from "@/features/quotes/schema";

// Eigen prijstemplate van een vakman. Bedragen in centen (UI rekent in euro's).
export const priceItemSchema = z.object({
  kind: quoteItemKind.default("LABOUR"),
  description: z.string().min(1, "Omschrijving verplicht"),
  qty: z.number().positive("Aantal moet groter dan 0 zijn").default(1),
  unitPriceCents: z.number().int().nonnegative().default(0),
  hours: z.number().nonnegative().optional(),
  optional: z.boolean().default(false),
});
export type PriceItem = z.infer<typeof priceItemSchema>;

export const priceTemplateSchema = z.object({
  title: z.string().min(2, "Titel is verplicht").max(200),
  description: z.string().max(5000).optional().default(""),
  defaultVatRate: z.number().int().min(0).max(100).default(21),
  priceFromCents: z.number().int().nonnegative().optional().nullable(),
  priceToCents: z.number().int().nonnegative().optional().nullable(),
  warrantyText: z.string().max(5000).optional().default(""),
  termsText: z.string().max(5000).optional().default(""),
  active: z.boolean().default(true),
  items: z.array(priceItemSchema).default([]),
});
export type PriceTemplateInput = z.infer<typeof priceTemplateSchema>;
