import type { Lead, PipelineStage } from "./types";

/** Token van een lead voor het klantportaal (valt terug op het id). */
export function portalToken(lead: Lead): string {
  return lead.portalToken ?? lead.id;
}

export function leadByToken(leads: Lead[], token: string): Lead | undefined {
  return leads.find((l) => (l.portalToken ?? l.id) === token);
}

/** Klantvriendelijke mijlpalen (afgeleid van de interne pijplijn-fase). */
export const PORTAL_MILESTONES = ["Aanvraag", "Offerte", "Akkoord", "In productie", "Opgeleverd"];

export function stageNaarMilestone(stage: PipelineStage): number {
  switch (stage) {
    case "nieuwe_lead":
    case "offerte_aanvraag":
    case "gebeld":
    case "afspraak_ingepland":
      return 0;
    case "offerte_verstuurd":
      return 1;
    case "akkoord":
      return 2;
    case "in_productie":
      return 3;
    case "geplaatst":
    case "gewonnen":
      return 4;
    default:
      return 0;
  }
}
