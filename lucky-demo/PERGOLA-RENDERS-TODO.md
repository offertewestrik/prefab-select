# Pergola-configurator-renders (16) — downloaden in een Full-netwerk sessie

Matrix **4 uitvoeringen × 4 kleuren**, gegenereerd vanaf de pergola-master
(`3422e40f`, zelf afgeleid van de veranda-master) → exact dezelfde camerahoek,
schaal en belichting als de veranda's. Configurator is **al gekoppeld** (pergola
met lamellendak): uitvoering volgt uit opties (ZIP Screens → screens · ZIP +
LED → luxe · anders open) × kleur, met fallback.

Filenaampatroon: `assets/pergola-<uitvoering>-<kleur>-lamellendak.png`
Uitvoeringen: `open`, `gesloten`, `screens`, `luxe` · Kleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id |
| :--- | :--- |
| pergola-open-wit-lamellendak.png | `3422e40f-9d35-4af6-b3fc-00f19725bdf5` (master) |
| pergola-open-creme-lamellendak.png | `a0a1e9be-bd02-4695-9a34-97169fb5c265` |
| pergola-open-antraciet-lamellendak.png | `c44f3701-7876-478c-9f27-f3094a476e17` |
| pergola-open-zwart-lamellendak.png | `e207a476-4be1-488a-ac65-4cc8b7dae956` |
| pergola-gesloten-wit-lamellendak.png | `009c7d37-a965-4b4a-aac0-90c335ef54ea` |
| pergola-gesloten-creme-lamellendak.png | `b6557fb3-b063-4040-a8e1-69816a5ed0d3` |
| pergola-gesloten-antraciet-lamellendak.png | `a1620f34-2825-40b1-8812-a0b74f0baaef` |
| pergola-gesloten-zwart-lamellendak.png | `19cea1c7-efeb-4199-b49a-56ec8610445e` |
| pergola-screens-wit-lamellendak.png | `fc770b94-9db1-4904-846a-3c31feb93b21` |
| pergola-screens-creme-lamellendak.png | `695d1ac6-8dae-4a08-92e3-903e526585b6` |
| pergola-screens-antraciet-lamellendak.png | `22588bab-809b-4414-bcfd-94b2695a89e9` |
| pergola-screens-zwart-lamellendak.png | `717afc9b-1187-4b09-b495-827562e31631` |
| pergola-luxe-wit-lamellendak.png | `97a5efcd-028b-4bb3-95ed-b8fbac665f20` |
| pergola-luxe-creme-lamellendak.png | `cc4475b3-e632-415b-ba86-907f79aab1ac` |
| pergola-luxe-antraciet-lamellendak.png | `4fe62ffc-21c2-4ce0-8ee8-22966835b0bc` |
| pergola-luxe-zwart-lamellendak.png | `cff45260-b157-48b2-aa0e-1013016824d1` |

## Stappen (Full-sessie)
1. Per job-id: **eerst** `mcp__higgsfield__remove_background({media_id:<id>, media_type:"image"})`
   voor een transparante PNG (net als de veranda-master), dan de cutout-`rawUrl`
   downloaden naar de juiste bestandsnaam in `lucky-demo/assets/`.
   (Of direct de witte versie via `job_display` → `rawUrl` als transparant niet nodig is.)
2. `file lucky-demo/assets/pergola-*.png` controleren, commit + sync `/lucky` op `gh-pages`.

> `gesloten`-renders zijn voor de visuele bibliotheek; de configurator-preview
> gebruikt momenteel open/screens/luxe (er is geen open/gesloten-schakelaar).
> Coördineer downloads/pushes in één sessie tegelijk.
