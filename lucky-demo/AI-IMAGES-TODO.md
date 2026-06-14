# AI-beelden afmaken — alleen nog downloaden + publiceren (Full-netwerk sessie)

De configurator is **al volledig gekoppeld** op branch `claude/modest-bardeen-2dkplw`:
- kleurstalen + thumbnails hebben `data-img` → wisselen de echte rolluikfoto's;
- als een fotobestand ontbreekt valt het automatisch terug op het vector-rolluik
  (dus geen kapotte plaatjes);
- Somfy-blok bij stap 4 verschijnt zodra de Somfy-beelden bestaan.

Er hoeft dus **alleen** nog gedownload + gepubliceerd te worden. Dit lukt alleen
in een sessie met **Network access = Full** (deze beelden staan op CloudFront).

> ⚠️ De links kunnen na verloop van tijd verlopen. Werkt een `curl` niet meer?
> Haal een verse URL op met `mcp__higgsfield__job_display(<job-id>)` → `results.rawUrl`.

## Stap 1 — Download alle 9 beelden

```bash
cd lucky-demo/assets
B="https://d8j0ntlcm91z4.cloudfront.net/user_3EdpNOPjrEuN7grAEkmSnZzolrU"
# Rolluiken (kleurstalen)
curl -L "$B/hf_20260614_120646_90ea7fe7-82c0-47df-8f81-1cd9263e5679.png" -o rolluik-antraciet.png
curl -L "$B/hf_20260614_121135_c08397b7-04d9-456d-a24a-efd84687f1d5.png" -o rolluik-zwart.png
curl -L "$B/hf_20260614_121137_481077bd-2385-4045-9f4e-780a3ce7c987.png" -o rolluik-wit.png
curl -L "$B/hf_20260614_121139_228ff701-0ce1-48f3-b8d3-a73dd51c8a36.png" -o rolluik-creme.png
curl -L "$B/hf_20260614_121140_f3aad278-5ea7-4cae-87ab-29f5e836c3a2.png" -o rolluik-grijs.png
curl -L "$B/hf_20260614_121142_9c9fdab8-41e7-4a29-8ef4-c9dc0b774db1.png" -o rolluik-bruin.png
# Somfy (bediening)
curl -L "$B/hf_20260614_121744_ad63a527-e31a-4409-a93b-287983c834a2.png" -o somfy-afstandsbediening.png
curl -L "$B/hf_20260614_121634_96fd0db8-25ba-4d39-b5ef-63256db353df.png" -o somfy-motor.png
curl -L "$B/hf_20260614_121635_8e93a7a8-2134-4676-8ef5-b9ca87635696.png" -o somfy-app.png
# Controle: alle bestanden moeten PNG zijn (geen 403/HTML)
file rolluik-*.png somfy-*.png
```

Job-id's (voor verse URLs indien nodig): antraciet `90ea7fe7-…79`, zwart
`c08397b7-…d5`, wit `481077bd-…87`, crème `228ff701-…36`, grijs `f3aad278-…f2`,
bruin `9c9fdab8-…d1`, somfy-afstandsbediening `ad63a527-…a2`, somfy-motor
`96fd0db8-…df`, somfy-app `8e93a7a8-…96`.

## Stap 2 — Publiceren

```bash
cd /home/user/prefab-select
git add lucky-demo/assets
git commit -m "Voeg AI-rolluiken (6 kleuren) en Somfy-bediening (3) toe aan configurator"
git push -u origin claude/modest-bardeen-2dkplw

# /lucky map op gh-pages bijwerken
cp -r lucky-demo /tmp/ld
git fetch origin gh-pages
git checkout gh-pages && git reset --hard origin/gh-pages
rm -rf lucky && mkdir lucky
cp /tmp/ld/index.html /tmp/ld/configurator.html lucky/
cp -r /tmp/ld/assets lucky/assets
git add lucky && git commit -m "Update /lucky: AI-rolluiken + Somfy"
git push origin gh-pages
git checkout claude/modest-bardeen-2dkplw
```

Daarna: ververs **https://offertewestrik.github.io/prefab-select/lucky/configurator.html**
→ klik op een kleurstaal en de echte rolluikfoto wisselt; Somfy verschijnt bij
de bediening-stap.

> AI-beelden zijn rechtenvrij gegenereerd, maar geen foto's van Lucky's eigen
> producten. AI rendert het echte Somfy-logo niet betrouwbaar (merknaam staat
> als tekst). Voor de definitieve site eventueel vervangen door officiële foto's.
