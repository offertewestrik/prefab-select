# Pergola met openschuifbaar doek — 4 renders (Full-netwerk sessie)

Gesloten doek in 4 framekleuren, frontaal isometrisch op wit (referentie-stijl).
De configurator gebruikt deze bestanden al voor het product
"Pergola met openschuifbaar doek" (preview = framekleur, altijd gesloten doek),
met fallback tot ze bestaan.

Filenaampatroon: `assets/pergoladoek-gesloten-<kleur>.png`

| Bestand | job-id |
| :--- | :--- |
| pergoladoek-gesloten-wit.png | `ab283f24-abeb-4e59-9e3a-5686b4a9cb8d` (master) |
| pergoladoek-gesloten-creme.png | `2869625b-0705-49a4-9a18-c1054834453a` |
| pergoladoek-gesloten-antraciet.png | `04cae022-9b41-486a-8ad6-8e4d093b87ac` |
| pergoladoek-gesloten-zwart.png | `62782326-e68c-4333-927a-725fad75bc27` (opnieuw) |

## Stappen (Full-sessie)
1. Per job-id: `mcp__higgsfield__remove_background` (transparant) → cutout downloaden
   naar de bestandsnaam in `lucky-demo/assets/`. (Of direct de witte versie via
   `job_display` → `rawUrl`.)
2. `file lucky-demo/assets/pergoladoek-*.png` controleren, commit + sync `/lucky` op `gh-pages`.

> Coördineer: één sessie tegelijk pushen om merge-conflicten te voorkomen.
