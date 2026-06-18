/* =====================================================================
   Droomhuis in Dubai — Kennisbank static-site generator
   Reads  : droomhuis-dubai/kennisbank/_content/*.md   (custom format)
   Writes : droomhuis-dubai/kennisbank/<slug>.html
            droomhuis-dubai/kennisbank/index.html
            droomhuis-dubai/kennisbank/sitemap.xml
   Run    : node tools/build-kennisbank.mjs   (from droomhuis-dubai/)
   No runtime dependencies — pre-generated HTML is committed and served
   as-is by GitHub Pages (no build step at deploy time).
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT = path.join(ROOT, "kennisbank", "_content");
const OUT = path.join(ROOT, "kennisbank");
const SITE = "https://www.droomhuisindubai.nl";
const UPDATED = "2026-06-18";

const CATEGORIES = [
  "Kopen & proces",
  "Investeren & rendement",
  "Wijken & locaties",
  "Wonen & verhuizen",
  "Markt & nieuwbouw",
];

/* ---------------------------------------------------------------- utils */
const esc = (s = "") => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = (s = "") => esc(s).replace(/"/g, "&quot;");
const anchor = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ------------------------------------------------------------ md parsing */
function inline(text) {
  let t = esc(text);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, href) => {
    href = href.trim();
    if (href.startsWith("slug:")) return `<a href="./${href.slice(5)}.html">${label}</a>`;
    const ext = /^https?:/.test(href);
    return `<a href="${escA(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return t;
}

function renderTable(rows) {
  const cells = (r) => r.replace(/^\s*\||\|\s*$/g, "").split("|").map((c) => c.trim());
  const head = cells(rows[0]);
  let h = '<div class="table-wrap"><table><thead><tr>';
  h += head.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>";
  for (const r of rows.slice(2)) {
    h += "<tr>" + cells(r).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
  }
  return h + "</tbody></table></div>\n";
}

function mdToHtml(md, toc) {
  const lines = md.split("\n");
  let html = "", i = 0;
  const para = [];
  const flush = () => { if (para.length) { html += `<p>${inline(para.join(" "))}</p>\n`; para.length = 0; } };
  while (i < lines.length) {
    const line = lines[i];
    let m;
    if (/^\s*$/.test(line)) { flush(); i++; continue; }
    if ((m = line.match(/^###\s+(.*)$/))) { flush(); html += `<h3>${inline(m[1].trim())}</h3>\n`; i++; continue; }
    if ((m = line.match(/^##\s+(.*)$/))) {
      flush(); const txt = m[1].trim(); const id = anchor(txt);
      toc.push({ id, txt }); html += `<h2 id="${id}">${inline(txt)}</h2>\n`; i++; continue;
    }
    if (/^>\s?/.test(line)) {
      flush(); const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      html += `<blockquote>${inline(buf.join(" "))}</blockquote>\n`; continue;
    }
    if (/^\s*\|/.test(line)) {
      const tbl = []; while (i < lines.length && /^\s*\|/.test(lines[i])) { tbl.push(lines[i]); i++; }
      flush(); if (tbl.length >= 2) html += renderTable(tbl); continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flush(); const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, "")); i++; }
      html += "<ul>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>\n"; continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flush(); const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, "")); i++; }
      html += "<ol>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ol>\n"; continue;
    }
    para.push(line.trim()); i++;
  }
  flush();
  return html;
}

/* --------------------------------------------------------- file parsing */
function parse(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const parts = raw.split(/^BODY:\s*$/m);
  const headerPart = parts[0];
  const body = parts.slice(1).join("\nBODY:\n").replace(/^\n+/, "");
  const meta = { faq: [], keywords: [], related: [] };
  for (const line of headerPart.split("\n")) {
    const m = line.match(/^([A-Z]+):\s?(.*)$/);
    if (!m) continue;
    const key = m[1], val = m[2].trim();
    if (key === "FAQ") {
      const p = val.split("::"); meta.faq.push({ q: p[0].trim(), a: (p[1] || "").trim() });
    } else if (key === "KEYWORDS") meta.keywords = val.split(";").map((s) => s.trim()).filter(Boolean);
    else if (key === "RELATED") meta.related = val.split(";").map((s) => s.trim()).filter(Boolean);
    else meta[key.toLowerCase()] = val;
  }
  meta.slug = path.basename(file, ".md");
  meta.body = body;
  const words = body.split(/\s+/).filter(Boolean).length;
  meta.readtime = Math.max(3, Math.round(words / 200));
  if (!meta.category || !CATEGORIES.includes(meta.category)) meta.category = CATEGORIES[0];
  if (!meta.h1) meta.h1 = meta.slug;
  if (!meta.title) meta.title = meta.h1;
  if (!meta.description) meta.description = meta.h1;
  return meta;
}

/* --------------------------------------------------------------- layout */
const NAV = `
  <header class="nav" id="nav">
    <a class="brand" href="../index.html#top" aria-label="Droomhuis in Dubai">
      <span class="mark">D</span><b>Droomhuis<span>in Dubai</span></b>
    </a>
    <nav class="nav-links" id="navLinks">
      <a href="../index.html#woningen">Woningen</a>
      <a href="../index.html#dubai">Waarom Dubai</a>
      <a href="index.html">Kennisbank</a>
      <a href="../index.html#rendement">Rendement</a>
      <a href="../index.html#over">Over Joy</a>
      <a href="../index.html#contact">Contact</a>
    </nav>
    <div class="nav-cta">
      <a class="nav-phone" href="tel:+971521299081">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
        +971 52 129 9081</a>
      <a class="btn btn-gold" href="../index.html#contact">Adviesgesprek</a>
      <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </header>`;

const FOOTER = `
  <footer class="footer">
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-col">
          <a class="brand" href="../index.html#top"><span class="mark">D</span><b>Droomhuis<span>in Dubai</span></b></a>
          <p>Luxe vastgoed en investeringen in Dubai, met persoonlijke Nederlandse begeleiding van A tot Z.</p>
        </div>
        <div class="foot-col">
          <h4>Kennisbank</h4>
          <a href="index.html">Alle artikelen</a>
          <a href="investeren-in-dubai-vastgoed.html">Investeren in Dubai</a>
          <a href="appartement-kopen-in-dubai.html">Appartement kopen</a>
          <a href="golden-visa-dubai.html">Golden Visa</a>
          <a href="beste-wijken-van-dubai.html">Beste wijken</a>
        </div>
        <div class="foot-col">
          <h4>Navigatie</h4>
          <a href="../index.html#woningen">Woningen</a>
          <a href="../index.html#dubai">Waarom Dubai</a>
          <a href="../index.html#over">Over Joy</a>
          <a href="../index.html#contact">Contact</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>Droomhuis in Dubai © ${new Date().getFullYear()} · Joy van den Hurk</span>
        <span><a href="../index.html#top">Home</a> · Demo-ontwerp</span>
      </div>
    </div>
  </footer>`;

const HEAD = (title, desc, canonical, jsonld) => `<!doctype html>
<html lang="nl" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#0a0a0b" />
  <title>${esc(title)}</title>
  <meta name="description" content="${escA(desc)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Droomhuis in Dubai" />
  <meta property="og:title" content="${escA(title)}" />
  <meta property="og:description" content="${escA(desc)}" />
  <meta property="og:locale" content="nl_NL" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23c9a76a'/%3E%3Ctext x='50' y='70' font-family='Georgia,serif' font-size='60' fill='%2314213d' text-anchor='middle' font-weight='700'%3ED%3C/text%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <link rel="stylesheet" href="../assets/css/kennisbank.css" />
${jsonld}
</head>
<body>
${NAV}`;

/* ----------------------------------------------------------- article pg */
function renderArticle(a, byslug) {
  const canonical = `${SITE}/kennisbank/${a.slug}.html`;
  const toc = [];
  const bodyHtml = mdToHtml(a.body, toc);

  const faqHtml = a.faq.length
    ? `<section class="faq reveal">
        <h2 id="veelgestelde-vragen">Veelgestelde vragen</h2>
        ${a.faq.map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a"><p>${inline(f.a)}</p></div></details>`).join("\n        ")}
       </section>`
    : "";

  const related = a.related.map((s) => byslug[s]).filter(Boolean).slice(0, 3);
  if (related.length < 3) {
    for (const o of Object.values(byslug)) {
      if (related.length >= 3) break;
      if (o.slug !== a.slug && o.category === a.category && !related.includes(o)) related.push(o);
    }
  }
  const relatedHtml = related.length
    ? `<section class="related reveal">
        <h2>Lees ook</h2>
        <div class="rel-grid">
          ${related.map((r) => `<a class="rel-card" href="${r.slug}.html"><span class="rel-cat">${esc(r.category)}</span><b>${esc(r.h1)}</b><span class="rel-go">Lees verder →</span></a>`).join("\n          ")}
        </div>
       </section>`
    : "";

  const tocHtml = toc.length
    ? `<aside class="toc"><div class="toc-inner"><span class="toc-title">Inhoud</span><nav>${toc.map((t) => `<a href="#${t.id}">${esc(t.txt)}</a>`).join("")}${a.faq.length ? '<a href="#veelgestelde-vragen">Veelgestelde vragen</a>' : ""}</nav></div></aside>`
    : "";

  const jsonld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.h1,
    description: a.description,
    inLanguage: "nl-NL",
    datePublished: UPDATED,
    dateModified: UPDATED,
    author: { "@type": "Person", name: "Joy van den Hurk", jobTitle: "Luxury Real Estate Advisor Dubai" },
    publisher: { "@type": "Organization", name: "Droomhuis in Dubai", url: SITE },
    mainEntityOfPage: canonical,
    keywords: a.keywords.join(", "),
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Kennisbank", item: SITE + "/kennisbank/" },
      { "@type": "ListItem", position: 3, name: a.h1, item: canonical },
    ],
  })}</script>` +
    (a.faq.length
      ? `\n  <script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map((f) => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}</script>`
      : "");

  return `${HEAD(a.title, a.description, canonical, jsonld)}
  <main class="article-main">
    <div class="wrap">
      <nav class="breadcrumb" aria-label="Kruimelpad">
        <a href="../index.html#top">Home</a><span>/</span>
        <a href="index.html">Kennisbank</a><span>/</span>
        <span>${esc(a.h1)}</span>
      </nav>
      <header class="article-head reveal">
        <span class="kb-chip">${esc(a.category)}</span>
        <h1>${esc(a.h1)}</h1>
        <div class="article-meta">
          <span>${a.readtime} min leestijd</span><span>·</span>
          <span>Bijgewerkt ${new Date(UPDATED).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </header>
      <div class="article-layout">
        ${tocHtml}
        <article class="prose reveal">
          ${bodyHtml}
          ${faqHtml}
          <div class="author-box">
            <div class="author-av">JH</div>
            <div>
              <b>Joy van den Hurk</b>
              <span>Nederlandse Luxury Real Estate Advisor · Dubai</span>
              <p>Joy van den Hurk is een ervaren Nederlandse vastgoedmakelaar in Dubai, gespecialiseerd in de markt van Dubai Marina en off-plan nieuwbouw. Ze begeleidt klanten van aankoop tot verhuur en investeert zelf ook actief in Dubai-vastgoed.</p>
            </div>
          </div>
          ${relatedHtml}
          <section class="kb-cta reveal">
            <div>
              <h2>Persoonlijk advies over ${esc(a.h1.toLowerCase())}?</h2>
              <p>Plan een vrijblijvend adviesgesprek met Joy en ontdek wat er voor uw situatie mogelijk is in Dubai.</p>
            </div>
            <a class="btn btn-gold" href="../index.html#contact">Plan een adviesgesprek
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          </section>
        </article>
      </div>
    </div>
  </main>
${FOOTER}
  <script src="../assets/js/kennisbank.js"></script>
</body>
</html>`;
}

/* ------------------------------------------------------------- index pg */
function renderIndex(articles) {
  const canonical = `${SITE}/kennisbank/`;
  const total = articles.length;
  const cards = (list) => list.map((a) => `
        <a class="kb-card" href="${a.slug}.html" data-cat="${escA(a.category)}" data-title="${escA((a.h1 + " " + a.keywords.join(" ")).toLowerCase())}">
          <span class="kb-chip">${esc(a.category)}</span>
          <h3>${esc(a.h1)}</h3>
          <p>${esc(a.description)}</p>
          <span class="kb-read">${a.readtime} min · Lees verder →</span>
        </a>`).join("");

  const sections = CATEGORIES.map((cat) => {
    const list = articles.filter((a) => a.category === cat);
    if (!list.length) return "";
    return `
      <section class="kb-section reveal" data-section="${escA(cat)}">
        <div class="kb-section-head"><h2>${esc(cat)}</h2><span>${list.length} artikelen</span></div>
        <div class="kb-grid">${cards(list)}</div>
      </section>`;
  }).join("");

  const jsonld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kennisbank — Vastgoed in Dubai",
    description: "Uitgebreide kennisbank over kopen, investeren en wonen in Dubai.",
    url: canonical,
    inLanguage: "nl-NL",
    hasPart: articles.map((a) => ({ "@type": "Article", headline: a.h1, url: `${SITE}/kennisbank/${a.slug}.html` })),
  })}</script>`;

  return `${HEAD(
    "Kennisbank — Vastgoed in Dubai kopen & investeren | Droomhuis in Dubai",
    `Dé Nederlandse kennisbank over vastgoed in Dubai: ${total}+ uitgebreide gidsen over kopen, investeren, rendement, wijken, Golden Visa en verhuizen.`,
    canonical, jsonld
  )}
  <main class="kb-main">
    <section class="kb-hero">
      <div class="wrap">
        <span class="eyebrow">Kennisbank</span>
        <h1>Alles over vastgoed in <span class="gold-text">Dubai</span></h1>
        <p>De complete Nederlandstalige gids voor kopen, investeren en wonen in Dubai. ${total} uitgebreide artikelen — van down payment en hypotheek tot de beste wijken en de Golden Visa.</p>
        <div class="kb-tools">
          <input class="kb-search" id="kbSearch" type="search" placeholder="Zoek in de kennisbank…" aria-label="Zoeken" />
        </div>
        <div class="kb-filters" id="kbFilters">
          <button class="filter active" data-cat="all">Alles</button>
          ${CATEGORIES.map((c) => `<button class="filter" data-cat="${escA(c)}">${esc(c)}</button>`).join("\n          ")}
        </div>
      </div>
    </section>
    <div class="wrap">
      <p class="kb-noresult" id="kbNoResult" hidden>Geen artikelen gevonden. Probeer een andere zoekterm.</p>
      ${sections}
      <section class="kb-cta reveal" style="margin-top:60px">
        <div>
          <h2>Staat uw vraag er niet bij?</h2>
          <p>Joy beantwoordt al uw vragen over vastgoed in Dubai persoonlijk en vrijblijvend.</p>
        </div>
        <a class="btn btn-gold" href="../index.html#contact">Neem contact op
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </section>
    </div>
  </main>
${FOOTER}
  <script src="../assets/js/kennisbank.js"></script>
</body>
</html>`;
}

/* ------------------------------------------------------------- sitemap */
function renderSitemap(articles) {
  const urls = [`${SITE}/kennisbank/`, ...articles.map((a) => `${SITE}/kennisbank/${a.slug}.html`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${UPDATED}</lastmod></url>`).join("\n")}
</urlset>`;
}

/* ---------------------------------------------------------------- main */
function build() {
  if (!fs.existsSync(CONTENT)) {
    console.error("No content directory:", CONTENT);
    process.exit(1);
  }
  const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".md"));
  const articles = files.map((f) => parse(path.join(CONTENT, f)));
  // stable order: by category, then title
  articles.sort((a, b) => {
    const ci = CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category);
    return ci !== 0 ? ci : a.h1.localeCompare(b.h1, "nl");
  });
  const byslug = Object.fromEntries(articles.map((a) => [a.slug, a]));

  let n = 0;
  for (const a of articles) {
    fs.writeFileSync(path.join(OUT, `${a.slug}.html`), renderArticle(a, byslug));
    n++;
  }
  fs.writeFileSync(path.join(OUT, "index.html"), renderIndex(articles));
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), renderSitemap(articles));

  const perCat = CATEGORIES.map((c) => `${c}: ${articles.filter((a) => a.category === c).length}`).join("  |  ");
  console.log(`✓ Built ${n} articles + index + sitemap`);
  console.log("  " + perCat);
}

build();
