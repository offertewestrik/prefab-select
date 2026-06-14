# AI-rolluiken voor de configurator — afmaken in een Full-netwerk sessie

De realistische rolluik-renders zijn op 2026-06-14 gegenereerd met Higgsfield
(model `marketing_studio_image`, 3:4). Deze sessie kon ze **niet downloaden**
(netwerk op "Trusted"). Maak dit af in een sessie met **Network access = Full**.

## De 6 gegenereerde beelden (job-id's)

| Kleur | RAL | Higgsfield job-id | Bestandsnaam (doel) |
| :--- | :--- | :--- | :--- |
| Antraciet | 7016 | `90ea7fe7-82c0-47df-8f81-1cd9263e5679` | `assets/rolluik-antraciet.png` |
| Zwart | 9005 | `c08397b7-04d9-456d-a24a-efd84687f1d5` | `assets/rolluik-zwart.png` |
| Wit | 9010 | `481077bd-2385-4045-9f4e-780a3ce7c987` | `assets/rolluik-wit.png` |
| Crèmewit | 9001 | `228ff701-0ce1-48f3-b8d3-a73dd51c8a36` | `assets/rolluik-creme.png` |
| Grijs | 7038 | `f3aad278-5ea7-4cae-87ab-29f5e836c3a2` | `assets/rolluik-grijs.png` |
| Bruin | 8014 | `9c9fdab8-41e7-4a29-8ef4-c9dc0b774db1` | `assets/rolluik-bruin.png` |

Bekende URL antraciet (de rest via `job_display` ophalen → veld `results.rawUrl`):
`https://d8j0ntlcm91z4.cloudfront.net/user_3EdpNOPjrEuN7grAEkmSnZzolrU/hf_20260614_120646_90ea7fe7-82c0-47df-8f81-1cd9263e5679.png`

## Stappen (in Full-sessie)

1. Per job-id: `mcp__higgsfield__job_display(id)` → kopieer `results.rawUrl`.
2. Download naar assets, bv:
   ```bash
   curl -L "<rawUrl>" -o lucky-demo/assets/rolluik-antraciet.png
   ```
   (herhaal voor alle 6 kleuren)
3. In `configurator.html`: vervang de inline `#rolluikSvg` door een foto-preview:
   ```html
   <img id="rolluikPhoto" src="assets/rolluik-antraciet.png"
        alt="Rolluik op maat" style="max-height:380px;width:100%;object-fit:contain;border-radius:12px">
   ```
4. Geef elke kleurstaal én thumbnail een `data-img`, bv:
   `data-img="assets/rolluik-antraciet.png"` (naast de bestaande `data-color`).
5. In `assets/app.js`, in de bestaande klik-handler van `[data-color]`:
   ```js
   var img = sw.getAttribute('data-img');
   var photo = document.getElementById('rolluikPhoto');
   if (img && photo) photo.src = img;
   ```
   (de `applyRolluikColor`-SVG-logica mag blijven als nette fallback, maar is
   met de foto niet meer zichtbaar.)
6. Controleer, commit op `claude/modest-bardeen-2dkplw`, en sync de `/lucky`
   map op de `gh-pages` branch (zoals eerder).

> Let op: AI-beelden zijn rechtenvrij genereerd, maar het zijn geen foto's van
> Lucky's eigen producten. Voor de definitieve site kunnen ze vervangen worden
> door echte productfoto's van Lucky.
