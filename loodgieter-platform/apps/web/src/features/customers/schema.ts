import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres").or(z.literal("")).optional().default(""),
  phone: z.string().max(40).optional().default(""),
  street: z.string().max(200).optional().default(""),
  postcode: z.string().max(12).optional().default(""),
  city: z.string().max(100).optional().default(""),
  notes: z.string().max(5000).optional().default(""),
});

export type CustomerInput = z.infer<typeof customerSchema>;
