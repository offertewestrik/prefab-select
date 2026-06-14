# Zonwering/luifel-renders (20) — downloaden in een Full-netwerk sessie

5 producten × 4 kleuren (wit/crème/antraciet/zwart), isometrisch op witte studio,
gegenereerd 2026-06-14. Kleurvarianten zijn vanaf de witte master per product
gemaakt (consistente vorm).

Filenaampatroon: `assets/<product>-<kleur>.png`
Producten: `knikarmscherm`, `cassetteluifel`, `uitvalscherm`, `markies`, `deurluifel`
Kleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id |
| :--- | :--- |
| knikarmscherm-wit.png | `3442c893-8fa6-4299-a08b-43ec0393a618` (strakke v2) |
| knikarmscherm-creme.png | `95d3cbf5-9a6d-43fe-8aad-eefd762e92e1` (v2) |
| knikarmscherm-antraciet.png | `48d6fe6c-b5f5-4a7b-9449-927d48dc434a` (v2) |
| knikarmscherm-zwart.png | `56890784-0996-4831-bb1b-c8c551b24ba7` (v2) |
| cassetteluifel-wit.png | `74099dc1-5f85-45c0-8e17-11790fe2159e` (strakke v2) |
| cassetteluifel-creme.png | `5d5839ef-1d1a-4651-86ae-1bfe784c05cb` (v2) |
| cassetteluifel-antraciet.png | `d1a6729b-4135-4b54-ac27-444ef7964a4a` (v2) |
| cassetteluifel-zwart.png | `edd48bad-1e29-46ee-87ec-1f47c856ec86` (v2) |
| uitvalscherm-wit.png | `d222398b-b325-4163-86c1-c2f5519eb9d0` |
| uitvalscherm-creme.png | `931cbc95-c68f-4951-aeeb-f413414d1cc5` |
| uitvalscherm-antraciet.png | `0ccd822c-1bad-4d65-8b42-b825e64c5884` |
| uitvalscherm-zwart.png | `169b2c59-e1f3-404c-b15b-330478801c11` |
| markies-wit.png | `65c54b8a-e9df-4e5a-b973-d35290052411` |
| markies-creme.png | `fb0630e6-fa65-4a1a-98cd-f638a2cfa523` |
| markies-antraciet.png | `9f3682e0-2b0d-4680-b4cf-cb2aadadab36` |
| markies-zwart.png | `e84827d9-9b50-447b-8654-2d2d1f2182d4` |
| deurluifel-wit.png | `813e6c16-4476-4e61-9b81-cd06dbdb7685` |
| deurluifel-creme.png | `df4cc5bd-2367-43f3-a9a1-f0403fdaf2ec` |
| deurluifel-antraciet.png | `eb7e031c-fea2-461f-8ebd-1082d23211cf` |
| deurluifel-zwart.png | `1cff322f-8792-4de3-8cd6-b9fc781017e2` |

## Stappen (Full-sessie)
1. Per job-id: `mcp__higgsfield__remove_background({media_id:<id>, media_type:"image"})`
   voor transparant, dan de cutout-`rawUrl` downloaden naar de juiste bestandsnaam in
   `lucky-demo/assets/`. (Of direct de witte versie via `job_display` → `rawUrl`.)
2. `file lucky-demo/assets/*.png` controleren, commit + sync `/lucky` op `gh-pages`.

> Wiring in de configurator volgt apart (knikarmscherm/uitvalscherm/luifels-product
> kunnen deze renders gebruiken). Coördineer downloads/pushes in één sessie tegelijk.
