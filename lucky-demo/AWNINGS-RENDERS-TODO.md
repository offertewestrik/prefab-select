# Zonwering/luifel-renders (20) — downloaden in een Full-netwerk sessie

5 producten × 4 kleuren (wit/crème/antraciet/zwart), isometrisch op witte studio,
gegenereerd 2026-06-14. Kleurvarianten zijn vanaf de witte master per product
gemaakt (consistente vorm).

Filenaampatroon: `assets/<product>-<kleur>.png`
Producten: `knikarmscherm`, `cassetteluifel`, `uitvalscherm`, `markies`, `deurluifel`
Kleuren: `wit`, `creme`, `antraciet`, `zwart`

| Bestand | job-id |
| :--- | :--- |
| knikarmscherm-wit.png | `ce8222d4-44ab-42ec-89e8-bd80b536668a` |
| knikarmscherm-creme.png | `c5dc83ee-d0d5-49ef-8480-f7f065f93bb6` |
| knikarmscherm-antraciet.png | `274b0266-fee9-43ea-a5e5-40cf3c3983b6` |
| knikarmscherm-zwart.png | `26859fba-2d49-4ed9-87bd-84ab0b1e7b14` |
| cassetteluifel-wit.png | `91fb03ff-a5af-42cf-a874-387dc4f8c632` |
| cassetteluifel-creme.png | `4336dcfb-90fb-47e6-a63b-7512dd1c8db5` |
| cassetteluifel-antraciet.png | `0605f90f-f848-43e1-b772-d5606c7c534f` |
| cassetteluifel-zwart.png | `4370f67f-b807-48f1-90c0-68beaa2aa5eb` |
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
