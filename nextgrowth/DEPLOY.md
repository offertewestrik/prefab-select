# NextGrowth live zetten op Firebase Hosting

Deze map heeft een **eigen** Firebase-hostingconfig (`firebase.json` + `.firebaserc`)
die NextGrowth op een **aparte hosting-site** zet. Zo blijft de bestaande
**PrefabSelect**-site (de "default" hosting-site) volledig onaangeroerd.

- Project: `gen-lang-client-0477752702` (zie `.firebaserc`)
- Hosting-site: `nextgrowth` → wordt live op **https://nextgrowth.web.app**

> Ik kan hier niet zelf deployen, want dat vereist inloggen op jóuw Google/Firebase-account.
> Hieronder staan de exacte commando's — kopiëren en plakken in je terminal.

## Stappen (eenmalig)

```bash
# 1. Ga naar de NextGrowth-map
cd nextgrowth

# 2. Log in op Firebase (opent je browser)
npx -y firebase-tools login

# 3. Maak de aparte hosting-site aan (eenmalig)
#    Lukt dit niet omdat de naam 'nextgrowth' wereldwijd al bezet is?
#    Kies dan een andere naam en pas "site" in firebase.json daarop aan.
npx -y firebase-tools hosting:sites:create nextgrowth --project gen-lang-client-0477752702
```

## Deployen (elke keer dat je wilt publiceren)

```bash
cd nextgrowth
npx -y firebase-tools deploy --only hosting --project gen-lang-client-0477752702
```

Na afloop toont Firebase de live URL, bijv.:

```
Hosting URL: https://nextgrowth.web.app
```

## Een ander project gebruiken?

Wil je NextGrowth liever in een eigen, los Firebase-project?

```bash
cd nextgrowth
npx -y firebase-tools projects:create mijn-nextgrowth-project
# pas "default" in .firebaserc aan naar de nieuwe project-id, daarna:
npx -y firebase-tools deploy --only hosting --project mijn-nextgrowth-project
```

## Let op

- Het contactformulier opent een vooringevulde e-mail (`mailto:`). Dat werkt op
  statische hosting zonder backend. Vervang nog wel `hello@nextgrowth.nl` door je
  echte adres (zie `README.md`).
- `index.html` laadt Three.js via een CDN. Op een live URL met internet werkt dat;
  de 3D-hero verschijnt dan vanzelf.
