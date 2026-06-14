# Lucky Zonwering demo — STATUS & handoff (voor een nieuwe sessie)

## Wat het is
Premium concept-website + offerteconfigurator voor **Lucky Zonwering**, in de map
`lucky-demo/`. Statische site (geen build). Werk-branch: **`claude/modest-bardeen-2dkplw`**.

## Live
GitHub Pages serveert de `lucky/`-submap op de **`gh-pages`** branch:
- Homepage: https://offertewestrik.github.io/prefab-select/lucky/
- Configurator: https://offertewestrik.github.io/prefab-select/lucky/configurator.html

## Structuur
- `index.html` — homepage (eigen fotografie, emotie-gedreven, oranje/zwart/wit).
- `configurator.html` + `assets/premium.css` + `assets/premium.js` + `assets/configurator.js`.
- `configurator.js` is **datagedreven**: `PRODUCTS` (8 producten met optiegroepen),
  `previewImg()` mapt productkeuzes → render-PNG in `assets/` met fallback.
  ⚠️ Er is **geen `opt()`-helper** meer — gebruik altijd `c(id, nm, add, {icon/img/hex})`.

## Render-bibliotheken (gegenereerd met Higgsfield MCP)
rolluiken (16), screens (12), veranda (12), pergola (16), zonwering/luifel (20),
pergola-doek (4). Veel zijn al gedownload in `assets/`. Per product een TODO-doc met
job-id's → bestandsnamen; overzicht in **`RENDERS-INDEX.md`**.

## Openstaande taken
1. **Resterende renders permanent opslaan** (alleen in een **Full-netwerk** sessie):
   verwerk `RENDERS-INDEX.md` + alle `*-RENDERS-TODO.md`: per job-id `job_display` →
   `rawUrl`, evt. `remove_background`, download naar de exacte bestandsnaam in
   `lucky-demo/assets/`, dan committen + `/lucky` syncen op gh-pages.
2. **Pergola-doek**: de 4 doek-renders draaien nu tijdelijk via directe Higgsfield-links
   (`DOEK_URL` boven in `configurator.js`). Na lokaal opslaan van
   `assets/pergoladoek-gesloten-<kleur>.png` schakelt de configurator automatisch over;
   daarna mag `DOEK_URL` weg.

## Belangrijke aandachtspunten
- **Eén sessie tegelijk** aan deze branch laten pushen (parallel werken gaf merge-conflicten).
- Deze/oude sessies zijn **Trusted** (kunnen niet downloaden van cloudfront); een netwerk-
  wijziging naar **Full** geldt alleen voor **nieuwe** sessies.
- CSS/JS hebben een cache-bust `?v=` in de HTML; verhoog die bij JS-wijzigingen.

## Publiceren (workflow)
Wijzig in `lucky-demo/`, commit op de werk-branch, push. Daarna `/lucky` op gh-pages
syncen: `git checkout gh-pages` → `reset --hard origin/gh-pages` → `lucky/` vullen met
`index.html`, `configurator.html`, `assets/` → commit → push → terug naar de werk-branch.
(`.nojekyll` staat in de root van gh-pages.)
