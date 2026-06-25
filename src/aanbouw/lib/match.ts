import type { Bouwbedrijf, Aanvraag } from '../types';
import { buildTypeToService } from './services';

/**
 * Score (0–100) how well a bouwbedrijf fits an aanvraag, based on whether it
 * offers the relevant dienst and operates in the homeowner's werkgebied
 * (postcode prefix, city or region). Used to rank companies when an admin
 * assigns a lead, and to surface "matched" leads to aannemers.
 */
export function matchScore(company: Bouwbedrijf, aanvraag: Aanvraag): number {
  let score = 0;

  // Service match (50%).
  const needed = buildTypeToService[aanvraag.buildType];
  if (!needed) {
    score += 25; // "Anders" / Mantelzorg / Poolhouse — partial credit for any builder.
  } else if (company.services.includes(needed)) {
    score += 50;
  }

  // Work area match (50%): postcode prefix > city > region.
  const prefix = aanvraag.postcode.replace(/\s/g, '').slice(0, 2);
  if (company.workArea.postcodes.includes(prefix)) {
    score += 50;
  } else if (company.workArea.cities.some((c) => c.toLowerCase() === aanvraag.plaats.toLowerCase())) {
    score += 40;
  } else if (company.workArea.regions.length > 0) {
    score += 15;
  }

  return Math.min(100, Math.round(score));
}
