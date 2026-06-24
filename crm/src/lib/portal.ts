import type { Lead, PipelineStage } from "./types";

/** Token van een lead voor het klantportaal (valt terug op het id). */
export function portalToken(lead: Lead): string {
  return lead.portalToken ?? lead.id;
}

export function leadByToken(leads: Lead[], token: string): Lead | undefined {
  return leads.find((l) => (l.portalToken ?? l.id) === token);
}

/** Klantvriendelijke mijlpalen (afgeleid van de interne pijplijn-fase). */
export const PORTAL_MILESTONES = ["Aanvraag", "Offerte", "Akkoord", "In uitvoering", "Afgerond"];

export function stageNaarMilestone(stage: PipelineStage): number {
  switch (stage) {
    case "nieuwe_lead":
    case "gebeld_3x":
      return 0;
    case "offerte_opgenomen":
    case "offerte_verstuurd":
    case "afspraak_ingepland":
      return 1;
    case "offerte_akkoord":
      return 2;
    case "tekeningen_maken":
    case "facturen_verstuurd":
      return 3;
    case "opdracht_afgerond":
      return 4;
    default:
      return 0;
  }
}
