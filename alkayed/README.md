# لبان الكايد — website

Een complete, responsieve RTL (Arabische) website voor de zuivelwinkel **لبان الكايد**.
Gebouwd met pure **HTML + CSS + JavaScript** — geen build-stap nodig, direct te hosten.

## 📂 Structuur

```
alkayed/
├── index.html          # Home
├── over-ons.html       # من نحن (Over ons)
├── producten.html      # منتجاتنا (Producten + filter)
├── boodschappen.html   # المواد الأساسية (Dagelijkse boodschappen)
├── contact.html        # اتصل بنا (Contact / WhatsApp)
├── css/styles.css      # Volledige huisstijl (groen/rood/goud/crème)
├── js/products.js      # Productdata + SVG-illustraties
├── js/main.js          # Menu, scroll-reveal, filters, WhatsApp-form
└── img/
    ├── logo.svg        # Vectorlogo (wordmark)
    └── mark.svg        # Compact embleem / favicon
```

## 🚀 Online zetten

Het is een statische site. Upload de map `alkayed/` naar elke webhost
(Netlify, Vercel, GitHub Pages, cPanel, enz.). Lokaal bekijken:

```bash
cd alkayed
python3 -m http.server 8000   # open http://localhost:8000
```

## 🖼️ Het echte logo gebruiken

`img/logo.svg` is een nauwkeurige vectorrecreatie van het aangeleverde logo
(rode wordmark met goudrand, groen blad "لبان", groene boog, gouden slogan).

Wil je de originele logo-afbeelding gebruiken? Zet je bestand neer als
`img/logo.png` en vervang in de HTML `img/logo.svg` door `img/logo.png`
(in de hero en de "over ons"-kaart). Het compacte embleem in header/footer
gebruikt `img/mark.svg`.

## 🎨 Huisstijl

| Kleur | Hex | Gebruik |
| :-- | :-- | :-- |
| Groen | `#2c8a1f` | primair, knoppen, accenten |
| Rood | `#bf2114` | merknaam, accenten |
| Goud | `#c39a3f` | details, slogan |
| Crème | `#fbf6ec` | achtergrond |

Lettertypes: **Cairo** (koppen) + **Tajawal** (tekst) via Google Fonts.

## 📞 Contact / WhatsApp

Telefoon/WhatsApp: **079 180 4639** → internationaal `wa.me/31791804639`.
Wil je een ander nummer? Vervang `31791804639` overal in de `.html`-bestanden
en in `js/products.js` + `js/main.js`.
```bash
grep -rl "31791804639" alkayed/
```
