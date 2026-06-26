# AanbouwPlatform — media drop-in

Zet hier je Runway-/eigen exports neer. De homepage pakt ze automatisch op
(zie `src/aanbouw/lib/media.ts`). Zolang een bestand ontbreekt valt alles terug
op de bestaande render — geen broken images.

| Bestand | Gebruik | Specs |
| :-- | :-- | :-- |
| `hero.mp4` | Hero-film | 16:9, naadloze loop 6–10s, 1080p+, H.264, muted |
| `voor.webp` | Before (review) | 4:3, ≥1600px |
| `na.webp` | After (review) | 4:3, ≥1600px |
| `review-1.mp4` | Videoreview | 9:16, 15–30s, H.264 |
| `review-1.webp` | Poster videoreview | 9:16 |

Na het toevoegen van echte before/after-foto's: zet `beforeIsReal: true` in
`media.ts` zodat de stilistische grade-filters wegvallen.
