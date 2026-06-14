# Renders — index & live-zetten (Full-netwerk sessie)

Alle configurator-renders zijn gegenereerd met Higgsfield en goedgekeurd. Ze
moeten nog **gedownload + gepubliceerd** worden (kan alleen met Network access =
Full). De configurator gebruikt de bestanden al (met fallback tot ze bestaan).

## Werklijsten (per product)
| Doc | Aantal | Status |
| :--- | :--- | :--- |
| `ROLLUIK-RENDERS-TODO.md` | 16 (4 kastvorm × 4 kleur) | 15 gedownload; `rolluik-afsch20-antraciet.png` job `25398f04-86b0-4a28-b368-66d5c262dc69` nog |
| `SCREEN-RENDERS-TODO.md` | 12 (3 type × 4 kleur) | te downloaden |
| `VERANDA-RENDERS-TODO.md` | 12 (3 uitvoering × 4 kleur) | te downloaden (remove_background voor varianten) |
| `PERGOLA-RENDERS-TODO.md` | 16 (4 uitvoering × 4 kleur) | te downloaden (remove_background) |
| `AWNINGS-RENDERS-TODO.md` | 20 (5 producten × 4 kleur) | te downloaden (cassetteluifel + knikarm = v2) |

## Eén werkopdracht (plak in de Full-sessie)
> Op branch `claude/modest-bardeen-2dkplw`: `git fetch && git checkout claude/modest-bardeen-2dkplw && git pull origin claude/modest-bardeen-2dkplw`.
> Verwerk ALLE TODO-docs in `lucky-demo/` (ROLLUIK, SCREEN, VERANDA, PERGOLA, AWNINGS):
> haal per job-id de `rawUrl` via `mcp__higgsfield__job_display`; waar transparant
> gevraagd wordt eerst `mcp__higgsfield__remove_background`; download naar de exacte
> bestandsnamen in `lucky-demo/assets/`. Controleer met `file` dat het PNG's zijn.
> Commit op `claude/modest-bardeen-2dkplw` en sync de `/lucky` map op `gh-pages`.

> Links kunnen verlopen — doe dit z.s.m. Verse links: `job_display` met de job-id's.
> Coördineer: downloads/pushes in één sessie tegelijk om botsingen te voorkomen.
