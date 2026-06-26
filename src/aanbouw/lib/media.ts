import heroStill from '../assets/hero-villa.webp';

/**
 * Centrale media-manifest — plug-and-play voor Runway/eigen beeld.
 *
 * Zet je exports in `public/aanbouw-media/` en houd onderstaande bestandsnamen
 * aan; dan staat het meteen live. Zolang een bestand ontbreekt valt alles
 * netjes terug op de bestaande still (geen broken images, geen errors).
 *
 *   public/aanbouw-media/
 *   ├── hero.mp4            16:9 cinematic loop (6–10s, H.264)  -> hero
 *   ├── voor.webp           before-situatie                     -> review before/after
 *   ├── na.webp             na-situatie (met aanbouw)           -> review before/after
 *   ├── review-1.mp4        verticale klantvideo (9:16)         -> videoreview
 *   ├── review-1.webp       poster voor review-1                -> videoreview poster
 *   └── projecten/…         optionele projectfoto's             -> portfolio (later)
 */

const PUBLIC = '/aanbouw-media';

export const MEDIA = {
  /** Hero-film. Ontbreekt het bestand, dan toont de <video> de poster (still). */
  heroVideo: `${PUBLIC}/hero.mp4`,
  heroPoster: heroStill,

  /** Before/after. Vervang door echte foto's; haal dan de grade-classes weg. */
  beforeImg: heroStill,
  afterImg: heroStill,
  beforeIsReal: false,

  /** Videoreviews. Voeg er gerust meer toe. */
  reviewVideos: [
    { src: `${PUBLIC}/review-1.mp4`, poster: heroStill, name: 'Familie Hendriks', project: 'Aanbouw 16 m² · Waalwijk' },
  ],
};

/** De bestaande render — fallback/poster door de hele site. */
export const STILL = heroStill;
