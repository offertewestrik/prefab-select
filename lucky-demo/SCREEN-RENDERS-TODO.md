# 12 screen-configurator-renders — downloaden in een Full-netwerk sessie

Matrix **3 types × 4 cassettekleuren** (zoals het voorbeeld), gegenereerd met
Higgsfield op 2026-06-14. De configurator is **al gekoppeld**: de screen-preview
combineert type × cassettekleur en valt terug op de projectfoto zolang een
bestand ontbreekt. Alleen nog **downloaden + publiceren** (Network access = Full).

Filenaampatroon: `assets/screen-<type>-<kleur>.png`
Types: `std`, `zip`, `solar` · Cassettekleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id |
| :--- | :--- |
| screen-std-wit.png | `c5c5f71b-5c12-4178-b139-f56f3c774c83` |
| screen-zip-wit.png | `39064b67-1b45-4035-8669-c6b42533c3fc` |
| screen-solar-wit.png | `9e3698b8-6f25-480b-9b56-b12c52a60785` |
| screen-std-creme.png | `e4eb9b1c-5b9a-4ca7-b0fa-20a070c58e69` |
| screen-zip-creme.png | `6d3bbd3b-cad7-4aa3-8641-68146a33c778` |
| screen-solar-creme.png | `79e11206-5e02-4c40-b82e-0357dffd2560` |
| screen-std-antraciet.png | `d4591b9e-25ee-45ef-87d6-4bd491de0ff5` |
| screen-zip-antraciet.png | `d2b14125-ac3d-4fbd-a126-0023a16377ae` |
| screen-solar-antraciet.png | `d114dc69-09ec-48ce-b0f7-c7bb7842b256` |
| screen-std-zwart.png | `06432af3-ab7f-4f2d-a6f7-445fe41f38a6` |
| screen-zip-zwart.png | `cbb7db57-ad17-418b-b137-9dbc1d411279` |
| screen-solar-zwart.png | `ac084837-ad02-4337-b3e1-a8193fcc85ff` |

## Stappen (Full-sessie)
1. Per job-id: `mcp__higgsfield__job_display(<id>)` → `results.rawUrl`.
2. `curl -L "<rawUrl>" -o lucky-demo/assets/<bestand>.png` (alle 12).
3. `file lucky-demo/assets/screen-*-*.png` controleren.
4. Commit op `claude/modest-bardeen-2dkplw` + sync `/lucky` op `gh-pages`.

> Geen extra code nodig — `configurator.js` gebruikt deze bestanden al.
> Doe dit samen met de 16 rolluik-renders uit `ROLLUIK-RENDERS-TODO.md`.
