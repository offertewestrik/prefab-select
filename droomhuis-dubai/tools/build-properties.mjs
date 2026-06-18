/* =====================================================================
   Droomhuis in Dubai — woningaanbod generator
   Writes: aanbod/index.html (overzicht + filters) en aanbod/<slug>.html
   Run:    node tools/build-properties.mjs   (vanuit droomhuis-dubai/)
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LISTINGS } from "./listings.data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "aanbod");
const SITE = "https://www.droomhuisindubai.nl";
const UPDATED = "2026-06-18";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = (s = "") => esc(s).replace(/"/g, "&quot;");
const aed = (n) => "AED " + n.toLocaleString("nl-NL");
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const bedIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 18v2M21 18v2M3 13h18M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>';
const bathIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12V6a2 2 0 0 1 4 0M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2ZM6 19l-1 2M18 19l1 2"/></svg>';
const areaIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>';
const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const NAV = `
  <header class="nav" id="nav">
    <a class="brand" href="../index.html#top" aria-label="Droomhuis in Dubai">
      <span class="mark">D</span><b>Droomhuis<span>in Dubai · Luxury Real Estate</span></b>
    </a>
    <nav class="nav-links" id="navLinks">
      <a href="index.html">Woningen</a>
      <a href="../index.html#dubai">Waarom Dubai</a>
      <a href="../kennisbank/index.html">Kennisbank</a>
      <a href="../index.html#over">Over Joy</a>
      <a href="../index.html#contact">Contact</a>
    </nav>
    <div class="nav-cta">
      <a class="nav-phone" href="tel:+971521299081"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg></a>
      <a class="btn btn-gold" href="../index.html#contact">Plan een adviesgesprek</a>
      <button class="burger" id="burger" aria-label="Menu openen" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
    </div>
  </header>`;

const FOOTER = `
  <footer class="footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-col">
          <a class="brand" href="../index.html#top"><span class="mark">D</span><b>Droomhuis<span>in Dubai · Luxury Real Estate</span></b></a>
          <p>Luxe vastgoed en investeringen in Dubai, met persoonlijke Nederlandse begeleiding van A tot Z.</p>
        </div>
        <div class="foot-col">
          <h4>Woningen</h4>
          <a href="index.html">Alle woningen</a>
          <a href="index.html?status=Off-plan">Off-plan projecten</a>
          <a href="index.html?type=Villa">Villa's</a>
          <a href="index.html?type=Penthouse">Penthouses</a>
        </div>
        <div class="foot-col">
          <h4>Kennisbank</h4>
          <a href="../kennisbank/index.html">Alle artikelen</a>
          <a href="../kennisbank/golden-visa-dubai.html">Golden Visa</a>
          <a href="../kennisbank/investeren-in-dubai-vastgoed.html">Investeren in Dubai</a>
        </div>
        <div class="foot-col">
          <h4>Contact</h4>
          <a href="tel:+971521299081">+971 52 129 9081</a>
          <a href="mailto:enjoyrealestatedubai@gmail.com">enjoyrealestatedubai@gmail.com</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>Droomhuis in Dubai © ${new Date().getFullYear()} · Joy van den Hurk</span>
        <span class="built-by">Build by <a href="https://growthnext.nl" target="_blank" rel="noopener">GROWTH&nbsp;NEXT</a></span>
        <span><a href="../index.html#top">Home</a></span>
      </div>
    </div>
  </footer>`;

const HEAD = (title, desc, canonical, jsonld, ogImg) => `<!doctype html>
<html lang="nl" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#f8f6f2" />
  <title>${esc(title)}</title>
  <meta name="description" content="${escA(desc)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Droomhuis in Dubai" />
  <meta property="og:title" content="${escA(title)}" />
  <meta property="og:description" content="${escA(desc)}" />
  <meta property="og:locale" content="nl_NL" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImg}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${ogImg}" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23c9a76a'/%3E%3Ctext x='50' y='70' font-family='Georgia,serif' font-size='60' fill='%2314213d' text-anchor='middle' font-weight='700'%3ED%3C/text%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <link rel="stylesheet" href="../assets/css/aanbod.css" />
  <noscript><style>.reveal{opacity:1 !important;transform:none !important}</style></noscript>
${jsonld}
</head>
<body>
${NAV}`;

function card(p) {
  return `
      <article class="prop reveal" data-type="${escA(p.type)}" data-area="${escA(p.area)}" data-status="${escA(p.status)}" data-price="${p.price}" data-beds="${p.beds}" data-text="${escA((p.name + " " + p.area + " " + p.type + " " + p.developer).toLowerCase())}">
        <a class="prop-img" href="${p.slug}.html" aria-label="${escA(p.name)}">
          <img loading="lazy" width="1000" height="750" src="${img(p.images[0], 1000)}" alt="${escA(p.name)} — ${escA(p.type.toLowerCase())} te koop in ${escA(p.area)}, Dubai">
          <span class="prop-tag">${esc(p.status)}</span>
          <div class="prop-imgcap"><h3>${esc(p.name)}</h3><div class="prop-loc">${pin}${esc(p.area)}</div></div>
        </a>
        <div class="prop-info">
          <div class="prop-specs">
            <div>${bedIco}${p.beds}</div><div>${bathIco}${p.baths}</div><div>${areaIco}${p.size} m²</div>
          </div>
          <div class="prop-figs">
            <div class="prop-price">${aed(p.price)}<small>${p.status === "Off-plan" ? "Vanaf · " + p.handover : "Vraagprijs"}</small></div>
            <div class="prop-roi"><b>${esc(p.roi)}</b><span>ROI</span></div>
          </div>
          <a class="prop-more" href="${p.slug}.html">Bekijk woning ${arrow}</a>
        </div>
      </article>`;
}

function renderOverview() {
  const canonical = `${SITE}/aanbod/`;
  const types = [...new Set(LISTINGS.map((p) => p.type))].sort();
  const areas = [...new Set(LISTINGS.map((p) => p.area))].sort();
  const opt = (v) => `<option value="${escA(v)}">${esc(v)}</option>`;
  const jsonld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Woningaanbod Dubai",
    description: "Exclusieve villa's, penthouses, appartementen en off-plan projecten te koop in Dubai.",
    url: canonical, inLanguage: "nl-NL",
    hasPart: LISTINGS.map((p) => ({ "@type": "Residence", name: p.name, url: `${SITE}/aanbod/${p.slug}.html` })),
  })}</script>`;
  return `${HEAD("Woningaanbod Dubai — villa's, penthouses & off-plan | Droomhuis in Dubai",
    "Ontdek exclusieve villa's, penthouses, appartementen en off-plan projecten te koop in Dubai. Filter op wijk, type, prijs en status — met Nederlandse begeleiding.",
    canonical, jsonld, `${SITE}/assets/video/infinity-pool.jpg`)}
  <main class="aanbod-main">
    <section class="aanbod-hero">
      <div class="wrap">
        <span class="eyebrow">Woningaanbod</span>
        <h1>Exclusief vastgoed te koop in <span class="gold-text">Dubai</span></h1>
        <p>Villa's, penthouses, appartementen en off-plan projecten in de meest gewilde wijken — zorgvuldig geselecteerd en met Nederlandse begeleiding van A tot Z.</p>
      </div>
    </section>
    <div class="wrap">
      <form class="filters-bar" id="filters" aria-label="Woningen filteren">
        <input class="input" type="search" id="f-text" placeholder="Zoek op naam, wijk of ontwikkelaar…" aria-label="Zoeken">
        <select class="input" id="f-type" aria-label="Type"><option value="">Alle types</option>${types.map(opt).join("")}</select>
        <select class="input" id="f-area" aria-label="Wijk"><option value="">Alle wijken</option>${areas.map(opt).join("")}</select>
        <select class="input" id="f-status" aria-label="Status"><option value="">Ready &amp; off-plan</option><option value="Ready">Ready</option><option value="Off-plan">Off-plan</option></select>
        <select class="input" id="f-beds" aria-label="Slaapkamers"><option value="">Alle slaapkamers</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select>
        <select class="input" id="f-sort" aria-label="Sorteren"><option value="">Aanbevolen</option><option value="price-asc">Prijs ↑</option><option value="price-desc">Prijs ↓</option></select>
      </form>
      <div class="aanbod-meta"><span id="resultCount">${LISTINGS.length}</span> woningen gevonden</div>
      <div class="aanbod-grid" id="aanbodGrid">
        ${LISTINGS.map(card).join("")}
      </div>
      <p class="kb-noresult" id="noResult" hidden>Geen woningen gevonden. Pas uw filters aan of <a href="../index.html#contact">neem contact op</a> voor het volledige aanbod.</p>
      <section class="aanbod-cta reveal">
        <div><h2>Niet gevonden wat u zoekt?</h2><p>Joy heeft toegang tot het volledige Dubai-aanbod, inclusief off-market woningen. Vertel ons uw wensen.</p></div>
        <a class="btn btn-gold" href="../index.html#contact">Persoonlijk advies ${arrow}</a>
      </section>
    </div>
  </main>
${FOOTER}
  <script src="../assets/js/kennisbank.js"></script>
  <script src="../assets/js/aanbod.js"></script>
</body>
</html>`;
}

function renderDetail(p, all) {
  const canonical = `${SITE}/aanbod/${p.slug}.html`;
  const title = `${p.name} — ${p.type} te koop in ${p.area} | Droomhuis in Dubai`;
  const desc = `${p.name}: ${p.type.toLowerCase()} in ${p.area} (${p.beds} slk · ${p.size} m²) vanaf ${aed(p.price)}. ${p.intro}`.slice(0, 158);
  const similar = all.filter((x) => x.slug !== p.slug && (x.area === p.area || x.type === p.type)).slice(0, 3);
  const jsonld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": p.type === "Villa" || p.type === "Townhouse" ? "House" : "Apartment",
    name: p.name, description: p.intro, image: img(p.images[0]),
    url: canonical, numberOfRooms: p.beds, numberOfBathroomsTotal: p.baths,
    floorSize: { "@type": "QuantitativeValue", value: p.size, unitCode: "MTK" },
    address: { "@type": "PostalAddress", addressLocality: p.area, addressRegion: "Dubai", addressCountry: "AE" },
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Woningaanbod", item: SITE + "/aanbod/" },
      { "@type": "ListItem", position: 3, name: p.name, item: canonical },
    ],
  })}</script>`;
  const thumbs = p.images.map((id, i) =>
    `<button class="g-thumb${i === 0 ? " active" : ""}" data-src="${img(id, 1400)}" aria-label="Foto ${i + 1}"><img loading="lazy" src="${img(id, 400)}" alt="${escA(p.name)} foto ${i + 1}"></button>`).join("");
  const specRow = (label, val) => `<div class="spec"><span>${label}</span><b>${esc(val)}</b></div>`;
  return `${HEAD(title, desc, canonical, jsonld, img(p.images[0]))}
  <main class="detail-main">
    <div class="wrap">
      <nav class="breadcrumb" aria-label="Kruimelpad">
        <a href="../index.html#top">Home</a><span>/</span>
        <a href="index.html">Woningaanbod</a><span>/</span><span>${esc(p.name)}</span>
      </nav>
      <div class="detail-head reveal">
        <div>
          <span class="kb-chip">${esc(p.status)} · ${esc(p.type)}</span>
          <h1>${esc(p.name)}</h1>
          <div class="detail-loc">${pin}${esc(p.area)} · ${esc(p.developer)}</div>
        </div>
        <div class="detail-price"><b>${aed(p.price)}</b><span>${p.status === "Off-plan" ? "Vanaf · oplevering " + p.handover : "Vraagprijs"}</span></div>
      </div>
      <div class="gallery reveal">
        <img id="gMain" src="${img(p.images[0], 1400)}" width="1400" height="900" alt="${escA(p.name)} — ${escA(p.type.toLowerCase())} in ${escA(p.area)}, Dubai">
        <div class="g-thumbs">${thumbs}</div>
      </div>
      <div class="detail-layout">
        <article class="detail-body reveal">
          <div class="spec-grid">
            ${specRow("Type", p.type)}
            ${specRow("Slaapkamers", p.beds)}
            ${specRow("Badkamers", p.baths)}
            ${specRow("Oppervlakte", p.size + " m²")}
            ${specRow("Status", p.status)}
            ${specRow("Verwacht rendement", p.roi)}
          </div>
          <h2>Over deze woning</h2>
          <p>${esc(p.intro)}</p>
          <p>Deze woning ligt in ${esc(p.area)}, een van de meest gewilde gebieden van Dubai. Wilt u meer weten over de buurt? Lees onze gids over <a href="../kennisbank/beste-wijken-van-dubai.html">de beste wijken van Dubai</a> of bereken uw mogelijke rendement met onze <a href="../index.html#rendement">rendement-calculator</a>.</p>
          <h2>Kenmerken</h2>
          <ul class="feature-list">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
          <h2>Interesse in ${esc(p.name)}?</h2>
          <p>Joy van den Hurk begeleidt u persoonlijk — van bezichtiging (ook digitaal) en onderhandeling tot eigendomsoverdracht en eventuele verhuur.</p>
        </article>
        <aside class="detail-cta reveal">
          <div class="cta-card">
            <div class="cta-agent"><span class="cta-av">JH</span><div><b>Joy van den Hurk</b><span>Nederlandse makelaar · Dubai</span></div></div>
            <a class="btn btn-gold" href="../index.html#contact">Plan een bezichtiging ${arrow}</a>
            <a class="btn btn-wa" href="https://wa.me/971521299081" target="_blank" rel="noopener">WhatsApp Joy</a>
            <a class="btn btn-ghost" href="tel:+971521299081">Bel +971 52 129 9081</a>
          </div>
        </aside>
      </div>
      ${similar.length ? `<section class="related reveal"><h2>Vergelijkbare woningen</h2><div class="aanbod-grid">${similar.map(card).join("")}</div></section>` : ""}
    </div>
  </main>
${FOOTER}
  <script src="../assets/js/kennisbank.js"></script>
  <script src="../assets/js/aanbod.js"></script>
</body>
</html>`;
}

function build() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "index.html"), renderOverview());
  for (const p of LISTINGS) fs.writeFileSync(path.join(OUT, `${p.slug}.html`), renderDetail(p, LISTINGS));
  console.log(`✓ Built aanbod: ${LISTINGS.length} detailpagina's + overzicht`);
}
build();
