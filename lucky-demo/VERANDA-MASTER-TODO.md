# Veranda MASTER-asset — `veranda-open-wit-glasdak.png`

Master configurator-asset voor aluminium veranda's, gegenereerd 2026-06-14.
**Dit is de referentie** voor alle toekomstige veranda-varianten: zelfde
camerahoek, hoogte, schaal, perspectief en belichting.

- Product: aluminium veranda · Uitvoering: **open veranda** · Kleur: **RAL 9016 wit** · Dak: **glasdak**
- Isometrische 3/4-hoek, witte studio, zachte contactschaduw, **transparante achtergrond**
- Resolutie: **2K (~2048×2048)** — desgewenst in de Full-sessie exact naar 2000×2000 schalen

## Download (Full-netwerk sessie)

Eindbestand (transparant, 2K) — job `c1364810-6480-4579-b655-a574f13b0971`:
```bash
curl -L "https://d8j0ntlcm91z4.cloudfront.net/user_3EdpNOPjrEuN7grAEkmSnZzolrU/hf_20260614_151129_c1364810-6480-4579-b655-a574f13b0971.png" \
  -o lucky-demo/assets/veranda-open-wit-glasdak.png
# optioneel exact 2000x2000 (vereist imagemagick):
# convert lucky-demo/assets/veranda-open-wit-glasdak.png -resize 2000x2000 lucky-demo/assets/veranda-open-wit-glasdak.png
file lucky-demo/assets/veranda-open-wit-glasdak.png
```

Verse link nodig? `mcp__higgsfield__job_display(c1364810-6480-4579-b655-a574f13b0971)` → `results.rawUrl`.

## Pijplijn (voor reproductie / consistentie)
1. Basis-render (1024², marketing_studio_image): `126075fd-75a0-4a5e-85b1-3eda4693a752`
2. Upscale 2K (bytedance): `89da44f7-1f32-4fb4-aa73-87acd79f35c7`
3. Achtergrond verwijderd (transparant): `c1364810-6480-4579-b655-a574f13b0971` ← eindbestand

## Toekomstige varianten (zelfde camera/schaal)
Genereer varianten bij voorkeur **vanuit deze master** (nano_banana_pro met de
master als referentie-image) en pas alleen aan:
- **kleur frame**: crème (RAL 9001), antraciet (RAL 7016), zwart (RAL 9005)
- **uitvoering**: + glazen schuifwanden rondom · + schuifwanden met screens voorzijde

Bestandsnamen-conventie: `veranda-<uitvoering>-<kleur>-glasdak.png`
(uitvoeringen: `open`, `glaswand`, `glaswand-screens`).
