# Productfoto's

Plaats hier de echte productfoto's. De shop pakt ze automatisch op zodra je het
`imageUrl`-veld (en optioneel `gallery`) van een product invult in
`src/data/products.ts`.

## Conventie

Gebruik het product-`slug` als bestandsnaam, bijvoorbeeld:

```
/products/intergas-xtreme-30-cw4.webp          ← hoofdafbeelding
/products/intergas-xtreme-30-cw4-2.webp        ← galerij
/products/intergas-xtreme-30-cw4-3.webp
```

En in `products.ts`:

```ts
imageUrl: '/products/intergas-xtreme-30-cw4.webp',
gallery: [
  '/products/intergas-xtreme-30-cw4.webp',
  '/products/intergas-xtreme-30-cw4-2.webp',
],
```

Is `imageUrl` leeg, dan toont de shop een nette merk-illustratie als fallback —
de webshop werkt dus ook zónder foto's.

## Belangrijk: rechten

Gebruik alleen beeld waarvoor je rechten hebt: de officiële mediakit/merkportal
van Intergas, Remeha, Vaillant, Nefit Bosch of ATAG, of de productfeed van je
groothandel/distributeur. Scrape geen willekeurige afbeeldingen van internet —
die zijn vrijwel altijd auteursrechtelijk beschermd.
