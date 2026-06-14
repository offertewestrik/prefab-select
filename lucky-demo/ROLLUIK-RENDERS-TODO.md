# 16 rolluik-configurator-renders — downloaden in een Full-netwerk sessie

Matrix **4 kastvormen × 4 kleuren** (zoals het voorbeeld), gegenereerd met
Higgsfield op 2026-06-14. De configurator is **al gekoppeld**: de preview
combineert kastvorm × kleur en valt terug op de losse kleur-render zolang een
bestand ontbreekt. Er hoeft dus alleen nog **gedownload + gepubliceerd** te
worden (lukt alleen met **Network access = Full**).

## Bestandsnaam ← Higgsfield job-id

Filenaampatroon: `assets/rolluik-<kastvorm>-<kleur>.png`
Kastvormen: `rond`, `afsch20`, `afsch45`, `vierkant` · Kleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id |
| :--- | :--- |
| rolluik-rond-antraciet.png | `7a8dcff3-04ce-4384-92a3-141c7be4a02e` |
| rolluik-afsch20-antraciet.png | `25398f04-86b0-4a28-b368-66d5c262dc69` (opnieuw gegenereerd) |
| rolluik-afsch45-antraciet.png | `6d633e4c-5224-4ab1-9aff-b952ec6bd23b` |
| rolluik-vierkant-antraciet.png | `8782668a-2a81-422a-805f-56c0d4cac9c3` |
| rolluik-rond-wit.png | `c23324ac-a28d-41a1-80cc-74ccd6b0f9ff` |
| rolluik-afsch20-wit.png | `cbc14ccf-a2cf-46d7-b2e5-258ca9e0762c` |
| rolluik-afsch45-wit.png | `0ce423f8-1e49-48fd-8756-6d968a1b9fef` |
| rolluik-vierkant-wit.png | `5993972d-4e42-4895-a068-c742f3d47fd6` |
| rolluik-rond-creme.png | `f33a6548-640c-4a6c-a891-01dac59d37be` |
| rolluik-afsch20-creme.png | `ad432514-4326-4503-aed2-f7a59851d09c` |
| rolluik-afsch45-creme.png | `a48308f5-ad09-478a-bbb9-83eed2756707` |
| rolluik-vierkant-creme.png | `cdee4fd3-1607-4f11-b812-a4f5bc051b49` |
| rolluik-rond-zwart.png | `07a240ff-f896-4ffc-aeef-33707a7a12e3` |
| rolluik-afsch20-zwart.png | `a8279d2b-faa8-4fff-a5bb-f6e95d4066c5` |
| rolluik-afsch45-zwart.png | `9a16335d-6195-47f3-b284-a120c004838e` |
| rolluik-vierkant-zwart.png | `89c1290f-ba5c-4f6d-9555-38776b214bd7` |

## Stappen (Full-sessie)

1. Per job-id: `mcp__higgsfield__job_display(<id>)` → kopieer `results.rawUrl`.
2. Download naar de juiste bestandsnaam, bv:
   ```bash
   curl -L "<rawUrl>" -o lucky-demo/assets/rolluik-rond-antraciet.png
   ```
   (herhaal voor alle 16)
3. Controleer met `file lucky-demo/assets/rolluik-*-*.png` dat het echte PNG's zijn.
4. Commit op `claude/modest-bardeen-2dkplw` en sync de `/lucky` map op `gh-pages`.

> Geen extra code nodig — `configurator.js` gebruikt deze bestanden al
> (`rolluik-<kastvorm>-<kleur>.png`). Grijs/RAL vallen automatisch terug op de
> bestaande losse kleur-render.
