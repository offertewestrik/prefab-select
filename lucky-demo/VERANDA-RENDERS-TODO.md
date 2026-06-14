# Veranda-configurator-renders (12) — downloaden in een Full-netwerk sessie

Volledige matrix **3 uitvoeringen × 4 kleuren**, allemaal vanaf de master
(`126075fd`) gegenereerd met nano_banana_pro → exact dezelfde camerahoek, schaal
en belichting. De configurator is **al gekoppeld**: de veranda-preview kiest de
uitvoering automatisch (Glazen schuifwand → glaswand · + ZIP Screens →
glaswand-screens) × constructiekleur, met fallback.

Filenaampatroon: `assets/veranda-<uitvoering>-<kleur>-glasdak.png`
Uitvoeringen: `open`, `glaswand`, `glaswand-screens` · Kleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id | bg |
| :--- | :--- | :--- |
| veranda-open-wit-glasdak.png | `c1364810-6480-4579-b655-a574f13b0971` | **transparant 2K (master)** |
| veranda-open-creme-glasdak.png | `3b43d859-ee03-4903-8d69-47e600ec9033` | wit |
| veranda-open-antraciet-glasdak.png | `7caa2765-b3f6-4dd7-a1a6-a3f3debc5480` | wit |
| veranda-open-zwart-glasdak.png | `b87c8241-3012-41aa-a9e4-4d539ce39cc4` | wit |
| veranda-glaswand-wit-glasdak.png | `02e66ed1-cc40-487f-8354-3da88adcf49a` | wit |
| veranda-glaswand-creme-glasdak.png | `16230705-fe3f-4064-be0c-340f6d0992fb` | wit |
| veranda-glaswand-antraciet-glasdak.png | `9a79798a-5244-4110-adc8-612931fe984a` | wit |
| veranda-glaswand-zwart-glasdak.png | `f1756b2f-8f04-4fe1-9127-adebcd988c26` | wit |
| veranda-glaswand-screens-wit-glasdak.png | `f8e6a083-0be6-4101-bf09-92b6197e7e6a` | wit |
| veranda-glaswand-screens-creme-glasdak.png | `faec6539-5bf0-4df6-84bd-d2c282ed01dd` | wit |
| veranda-glaswand-screens-antraciet-glasdak.png | `9548d6a7-5fde-4469-8d5f-d8f14d25bc2b` | wit |
| veranda-glaswand-screens-zwart-glasdak.png | `6cc22502-3d3a-4054-872a-de47b00a4847` | wit |

## Stappen (Full-sessie)
1. Per job-id: `mcp__higgsfield__job_display(<id>)` → `results.rawUrl`, download naar de juiste bestandsnaam in `lucky-demo/assets/`.
2. **Aanrader voor consistentie:** maak de 11 varianten ook transparant zoals de master:
   `mcp__higgsfield__remove_background({media_id:<variant-id>, media_type:"image"})`
   → download de cutout i.p.v. de witte versie. (Master is al transparant.)
3. `file lucky-demo/assets/veranda-*.png` controleren, commit + sync `/lucky` op `gh-pages`.

> Geen extra code nodig — `configurator.js` gebruikt deze bestanden al.
> Coördineer: doe downloads/pushes in één sessie tegelijk om botsingen te voorkomen.
