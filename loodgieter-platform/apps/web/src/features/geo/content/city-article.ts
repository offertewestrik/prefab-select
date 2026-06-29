import "server-only";
import fs from "node:fs";
import path from "node:path";

export type CityArticle = {
  intro: string;
  body: { heading: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

const DIR = path.join(process.cwd(), "src/content/steden");

/**
 * Laadt het unieke long-form artikel voor een gemeente (indien aanwezig).
 * Teksten staan als losse JSON-bestanden per slug, zodat ze niet in de
 * client-bundle terechtkomen. Geeft null als er (nog) geen artikel is.
 */
export function getCityArticle(slug: string): CityArticle | null {
  try {
    const raw = fs.readFileSync(path.join(DIR, `${slug}.json`), "utf8");
    const j = JSON.parse(raw);
    if (j && typeof j.intro === "string" && Array.isArray(j.body) && j.body.length > 0) {
      return {
        intro: j.intro,
        body: j.body,
        faqs: Array.isArray(j.faqs) ? j.faqs : [],
      };
    }
  } catch {
    /* geen artikel voor deze gemeente */
  }
  return null;
}
