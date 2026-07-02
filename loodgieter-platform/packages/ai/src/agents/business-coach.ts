import { z } from "zod";
import type { AgentDefinition } from "./agent";

export interface BusinessCoachInput {
  companyName: string;
  periodDays: number;
  newLeads: number;
  quotesSent: number;
  quotesAccepted: number;
  quotesOpen: number;
  acceptedRevenueCents: number;
  openInvoicesCount: number;
  openInvoicesCents: number;
  creditBalance: number;
  reviewsCount: number;
  ratingAvg: number;
}

export const businessCoachSchema = z.object({
  summary: z.string(), // korte stand van zaken
  highlights: z.array(z.string()), // wat gaat goed
  attention: z.array(z.string()), // aandachtspunten
  actions: z.array(z.string()), // concrete aanbevolen acties
});
export type BusinessCoachOutput = z.infer<typeof businessCoachSchema>;

const SYSTEM =
  "Je bent een nuchtere bedrijfscoach voor een Nederlandse zzp'er/installateur (loodgieter, cv, airco, dak). " +
  "Op basis van de aangeleverde cijfers geef je een korte stand van zaken, wat goed gaat, aandachtspunten en 3-6 concrete, haalbare acties " +
  "om meer leads om te zetten in omzet (offerte-opvolging, conversie, openstaande facturen innen, reviews vragen, credits/voorraad). " +
  "Praktisch en to-the-point, geen algemeenheden. Bedragen in euro's. Antwoord uitsluitend in JSON volgens het schema.";

const eur = (c: number) => `€ ${(c / 100).toLocaleString("nl-NL")}`;

export const businessCoach: AgentDefinition<BusinessCoachInput, BusinessCoachOutput> = {
  id: "business-coach",
  label: "AI Bedrijfscoach",
  description: "Geeft concrete groeitips op basis van de cijfers van het bedrijf.",
  mode: "json",
  systemPrompt: SYSTEM,
  buildUser: (i) =>
    `Bedrijf: ${i.companyName}\nPeriode: laatste ${i.periodDays} dagen\n` +
    `Nieuwe leads: ${i.newLeads}\nOffertes verstuurd: ${i.quotesSent}\nGeaccepteerd: ${i.quotesAccepted}\nNog open: ${i.quotesOpen}\n` +
    `Omzet uit geaccepteerde offertes: ${eur(i.acceptedRevenueCents)}\n` +
    `Openstaande facturen: ${i.openInvoicesCount} (${eur(i.openInvoicesCents)})\n` +
    `Creditsaldo: ${i.creditBalance}\nReviews: ${i.reviewsCount} (gem. ${i.ratingAvg.toFixed(1)})`,
  schema: businessCoachSchema,
  sample: (i) => {
    const conv = i.quotesSent > 0 ? Math.round((i.quotesAccepted / i.quotesSent) * 100) : 0;
    return {
      summary: `In de laatste ${i.periodDays} dagen zijn er ${i.quotesSent} offertes verstuurd met een conversie van ${conv}%.`,
      highlights: [
        i.quotesAccepted > 0 ? `${i.quotesAccepted} geaccepteerde offerte(s) — ${eur(i.acceptedRevenueCents)} omzet.` : "Er zijn leads binnengekomen om op te volgen.",
      ],
      attention: [
        i.quotesOpen > 0 ? `${i.quotesOpen} offerte(s) staan nog open — volg ze op.` : "Weinig openstaande offertes.",
        i.openInvoicesCount > 0 ? `${i.openInvoicesCount} openstaande factuur/facturen (${eur(i.openInvoicesCents)}).` : "Geen openstaande facturen.",
        i.creditBalance < 5 ? "Je creditsaldo is laag — vul aan om leads te kunnen kopen." : "",
      ].filter(Boolean),
      actions: [
        i.quotesOpen > 0 ? "Bel of mail klanten met een openstaande offerte deze week." : "Koop en beantwoord nieuwe leads binnen 1 uur.",
        i.openInvoicesCount > 0 ? "Stuur een betaalherinnering voor openstaande facturen." : "Vraag tevreden klanten om een review.",
        i.reviewsCount < 5 ? "Verzamel meer reviews voor een sterker profiel." : "Houd je responstijd op leads kort.",
      ],
    };
  },
};
