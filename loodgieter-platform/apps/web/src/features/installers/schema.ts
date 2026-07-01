import { z } from "zod";

export const registerInstallerSchema = z.object({
  companyName: z.string().min(2, "Bedrijfsnaam is verplicht"),
  kvk: z.string().max(20).optional().default(""),
  vatNumber: z.string().max(20).optional().default(""),
  phone: z.string().min(8, "Vul een geldig telefoonnummer in"),
  website: z.string().max(200).optional().default(""),
  street: z.string().max(200).optional().default(""),
  postcode: z.string().max(12).optional().default(""),
  city: z.string().max(100).optional().default(""),
  province: z.string().max(100).optional().default(""),
  contactName: z.string().min(2, "Contactpersoon is verplicht"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens zijn"),
});

export type RegisterInstallerInput = z.infer<typeof registerInstallerSchema>;

export const servicesSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Kies minstens één dienst"),
});

export const coverageSchema = z.object({
  municipalityIds: z.array(z.string()).min(1, "Kies minstens één gemeente"),
  radiusKm: z.number().int().min(0).max(200).optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Bedrijfsnaam is verplicht"),
  shortDescription: z.string().max(300).optional().default(""),
  description: z.string().max(5000).optional().default(""),
  specialties: z.string().max(500).optional().default(""), // komma-gescheiden
  // Leeg laten → undefined (blijft leeg), niet 0. Een leeg formulierveld
  // stuurt "" mee; zonder deze preprocess maakt z.coerce daar 0 van.
  yearsExperience: z.preprocess((v) => (v === "" || v == null ? undefined : v), z.coerce.number().int().min(0).max(200).optional()),
  employees: z.preprocess((v) => (v === "" || v == null ? undefined : v), z.coerce.number().int().min(0).max(100000).optional()),
  kvk: z.string().max(20).optional().default(""),
  vatNumber: z.string().max(20).optional().default(""),
  phone: z.string().min(8, "Vul een geldig telefoonnummer in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  website: z.string().max(200).optional().default(""),
  street: z.string().max(200).optional().default(""),
  postcode: z.string().max(12).optional().default(""),
  city: z.string().max(100).optional().default(""),
  province: z.string().max(100).optional().default(""),
  openingHours: z.string().max(500).optional().default(""),
  emergencyService: z.coerce.boolean().optional().default(false),
  warrantyText: z.string().max(2000).optional().default(""),
});

export type ProfileInput = z.infer<typeof profileSchema>;
