# NextGrowth live zetten op Firebase Hosting (eigen, los project)

NextGrowth draait op een **compleet eigen Firebase-project**, volledig
losgekoppeld van PrefabSelect. NextGrowth is daarin de standaard-hostingsite,
dus er is geen enkele overlap met de PrefabSelect-hosting.

- Project (voorbeeld): `nextgrowth-web` (zie `.firebaserc`)
- Wordt live op: **https://nextgrowth-web.web.app**

> Ik kan hier niet zelf deployen — dat vereist inloggen op jóuw Google/Firebase-account.
> Hieronder de exacte commando's; kopiëren en plakken in je terminal.

## Stappen (eenmalig)

```bash
# 1. Ga naar de NextGrowth-map
cd nextgrowth

# 2. Log in op Firebase (opent je browser)
npx -y firebase-tools login

# 3. Maak een NIEUW, los Firebase-project aan
#    Project-id's zijn wereldwijd uniek. Is 'nextgrowth-web' bezet,
#    kies dan een eigen id (bv. 'nextgrowth-2026') en gebruik dat overal hieronder
#    én in .firebaserc bij "default".
npx -y firebase-tools projects:create nextgrowth-web --display-name "NextGrowth"
```

## Deployen (elke keer dat je wilt publiceren)

```bash
cd nextgrowth
npx -y firebase-tools deploy --only hosting --project nextgrowth-web
```

Na afloop toont Firebase de live URL, bijv.:

```
Hosting URL: https://nextgrowth-web.web.app
```

## Andere project-id gekozen?

Pas dan twee dingen aan zodat alles klopt:

1. `.firebaserc` → zet `"default"` op je eigen project-id.
2. Gebruik `--project <jouw-id>` in de commando's hierboven.

(Het `--project`-argument overschrijft `.firebaserc`, dus met dat argument deploy
je altijd naar het juiste project.)

## Let op

- Het contactformulier opent een vooringevulde e-mail (`mailto:`). Dat werkt op
  statische hosting zonder backend. Vervang nog wel `hello@nextgrowth.nl` door je
  echte adres (zie `README.md`).
- `index.html` laadt Three.js via een CDN. Op een live URL met internet werkt dat;
  de 3D-hero verschijnt dan vanzelf.
