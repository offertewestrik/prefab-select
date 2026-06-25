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
