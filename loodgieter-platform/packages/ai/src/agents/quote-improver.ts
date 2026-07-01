import { z } from "zod";
import type { AgentDefinition } from "./agent";

export interface QuoteImproverInput {
  service: string;
  title: string;
  introText: string;
  customerName?: string;
  items: { description: string; kind?: string; optional?: boolean }[];
}

export const quoteImproverSchema = z.object({
  // Verbeterde, klantvriendelijke koptekst en intro.
  title: z.string(),
  introText: z.string(),
  // Per bestaande regel een nettere omschrijving (zelfde volgorde als input).
  items: z.array(z.object({ original: z.string(), improved: z.string() })),
  // Wat er mogelijk ontbreekt of onduidelijk is (controle voor de vakman).
  missing: z.array(z.string()),
  // Nette begeleidende e-mailtekst voor de klant.
  coverEmail: z.string(),
});
export type QuoteImproverOutput = z.infer<typeof quoteImproverSchema>;

const SYSTEM =
  "Je bent een offerte-redacteur voor Nederlandse installateurs. Je maakt een BESTAANDE offerte professioneler en klantvriendelijker zonder bedragen of aantallen te veranderen. " +
  "Herschrijf de titel en intro helder en netjes, geef per regel een verzorgde omschrijving (zel-de volgorde en betekenis, geen nieuwe posten verzinnen), benoem beknopt wat mogelijk ontbreekt of onduidelijk is, en schrijf een korte, vriendelijke begeleidende e-mail. Nederlands, zakelijk maar toegankelijk. Antwoord uitsluitend in JSON volgens het schema.";

export const quoteImprover: AgentDefinition<QuoteImproverInput, QuoteImproverOutput> = {
  id: "quote-improver",
  label: "Offerte verbeteren",
  description: "Maakt een bestaande offerte professioneler: nettere teksten, ontbreekt-check en begeleidende e-mail.",
  mode: "json",
  systemPrompt: SYSTEM,
  buildUser: (i) =>
    `Dienst: ${i.service}\nKlant: ${i.customerName || "onbekend"}\nHuidige titel: ${i.title || "(leeg)"}\nHuidige intro: ${i.introText || "(leeg)"}\n\nRegels (volgorde behouden):\n${
      i.items.map((it, n) => `${n + 1}. [${it.kind ?? "?"}${it.optional ? ", optioneel" : ""}] ${it.description}`).join("\n") || "(geen regels)"
    }`,
  schema: quoteImproverSchema,
  sample: (i) => ({
    title: i.title || `Offerte ${i.service}`,
    introText:
      i.introText ||
      `Hartelijk dank voor uw aanvraag. Hierbij ontvangt u onze vrijblijvende offerte voor ${i.service}. Wij voeren de werkzaamheden vakkundig en volgens de geldende normen uit.`,
    items: i.items.map((it) => ({ original: it.description, improved: it.description })),
    missing: [],
    coverEmail:
      `Beste ${i.customerName || "klant"},\n\nBijgaand onze offerte voor ${i.service}. De offerte is vrijblijvend en 30 dagen geldig. ` +
      `Heeft u vragen of wilt u de werkzaamheden inplannen, dan hoor ik het graag.\n\nMet vriendelijke groet,`,
  }),
};
