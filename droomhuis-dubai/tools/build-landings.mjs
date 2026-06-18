/* =====================================================================
   Droomhuis in Dubai — commerciële landingspagina's (diensten/)
   Run: node tools/build-landings.mjs   (vanuit droomhuis-dubai/)
   ===================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "diensten");
const SITE = "https://www.droomhuisindubai.nl";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = (s = "") => esc(s).replace(/"/g, "&quot;");
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 13 4 4L19 7"/></svg>';

const NAV = `
  <header class="nav" id="nav">
    <a class="brand" href="../index.html#top" aria-label="Droomhuis in Dubai"><span class="mark">D</span><b>Droomhuis<span>in Dubai · Luxury Real Estate</span></b></a>
    <nav class="nav-links" id="navLinks">
      <a href="../aanbod/index.html">Woningen</a>
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
  <footer class="footer"><div class="wrap">
    <div class="foot-grid">
      <div class="foot-col"><a class="brand" href="../index.html#top"><span class="mark">D</span><b>Droomhuis<span>in Dubai · Luxury Real Estate</span></b></a>
        <p>Luxe vastgoed en investeringen in Dubai, met persoonlijke Nederlandse begeleiding van A tot Z.</p></div>
      <div class="foot-col"><h4>Diensten</h4>
        <a href="vastgoed-kopen-in-dubai.html">Vastgoed kopen</a>
        <a href="investeren-in-dubai.html">Investeren in Dubai</a>
        <a href="woning-verkopen-in-dubai.html">Woning verkopen</a></div>
      <div class="foot-col"><h4>Ontdek</h4>
        <a href="../aanbod/index.html">Woningaanbod</a>
        <a href="../kennisbank/index.html">Kennisbank</a>
        <a href="../index.html#rendement">Rendement berekenen</a></div>
      <div class="foot-col"><h4>Contact</h4>
        <a href="tel:+971521299081">+971 52 129 9081</a>
        <a href="mailto:enjoyrealestatedubai@gmail.com">enjoyrealestatedubai@gmail.com</a></div>
    </div>
    <div class="foot-bottom">
      <span>Droomhuis in Dubai © ${new Date().getFullYear()} · Joy van den Hurk</span>
      <span class="built-by">Build by <a href="https://growthnext.nl" target="_blank" rel="noopener">GROWTH&nbsp;NEXT</a></span>
      <span><a href="../index.html#top">Home</a></span>
    </div>
  </div></footer>`;

const HEAD = (title, desc, canonical, jsonld, poster) => `<!doctype html>
<html lang="nl" dir="ltr"><head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#f8f6f2" />
  <title>${esc(title)}</title>
  <meta name="description" content="${escA(desc)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta property="og:type" content="website" /><meta property="og:site_name" content="Droomhuis in Dubai" />
  <meta property="og:title" content="${escA(title)}" /><meta property="og:description" content="${escA(desc)}" />
  <meta property="og:locale" content="nl_NL" /><meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE}/assets/video/${poster}.jpg" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:image" content="${SITE}/assets/video/${poster}.jpg" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23c9a76a'/%3E%3Ctext x='50' y='70' font-family='Georgia,serif' font-size='60' fill='%2314213d' text-anchor='middle' font-weight='700'%3ED%3C/text%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/styles.css" />
  <link rel="stylesheet" href="../assets/css/kennisbank.css" />
  <noscript><style>.reveal{opacity:1 !important;transform:none !important}</style></noscript>
${jsonld}
</head><body>
${NAV}`;

const LANDINGS = {
  "vastgoed-kopen-in-dubai": {
    title: "Vastgoed kopen in Dubai met Nederlandse begeleiding",
    desc: "Veilig vastgoed kopen in Dubai met een Nederlandse makelaar ter plaatse. Van selectie en bezichtiging tot overdracht en verhuur — persoonlijk begeleid van A tot Z.",
    poster: "infinity-pool",
    eyebrow: "Kopen in Dubai",
    h1: "Vastgoed kopen in Dubai met Nederlandse begeleiding",
    lede: "Veilig en zorgeloos uw woning of investering in Dubai kopen — met Joy van den Hurk, een Nederlandse makelaar die ter plaatse woont en de markt door en door kent.",
    intro: "Vastgoed kopen in Dubai is aantrekkelijk: 0% inkomstenbelasting, hoge huurrendementen en 100% eigendom voor buitenlanders. Maar de markt, de ontwikkelaars en het proces zijn anders dan in Nederland. Joy begeleidt u persoonlijk door elke stap — in het Nederlands, eerlijk en met uw belang voorop.",
    benefits: [
      ["Nederlandse begeleiding", "Alles in uw eigen taal, met kennis van zowel de NL- als de Dubai-markt."],
      ["Toegang tot het hele aanbod", "Ready en off-plan, inclusief off-market woningen van topontwikkelaars."],
      ["Veilig & transparant", "Begeleiding bij DLD, escrow, NOC en eigendomsoverdracht — geen verrassingen."],
      ["Ook op afstand", "Digitale bezichtigingen en aankoop via volmacht, volledig vanuit Nederland mogelijk."],
    ],
    steps: [
      ["Kennismaking", "We bespreken uw wensen, budget en doelen in een vrijblijvend adviesgesprek."],
      ["Selectie & bezichtiging", "Joy stelt een shortlist samen en laat u de woningen zien — live of digitaal."],
      ["Reservering & contract", "Onderhandeling, reservering en het tekenen van de koopovereenkomst (MOU/Form F)."],
      ["Overdracht & nazorg", "Begeleiding bij de DLD-overdracht en, indien gewenst, verhuur en beheer."],
    ],
    faqs: [
      ["Kan ik als Nederlander vastgoed kopen in Dubai?", "Ja. In de freehold-zones krijgen buitenlanders 100% eigendom met een officieel title deed. Joy begeleidt u door het volledige proces."],
      ["Wat zijn de kosten koper in Dubai?", "Reken op circa 4% DLD-overdrachtsbelasting plus makelaars- en administratiekosten. Lees meer in onze gids over kosten koper."],
      ["Kan ik op afstand kopen?", "Ja, via digitale bezichtigingen en een volmacht kunt u volledig vanuit Nederland kopen."],
    ],
    related: [["Kosten koper in Dubai", "../kennisbank/kosten-koper-dubai.html"], ["Het koopproces: stappenplan", "../kennisbank/koopproces-dubai-stappenplan.html"], ["Vastgoed kopen op afstand", "../kennisbank/vastgoed-kopen-op-afstand-dubai.html"]],
  },
  "investeren-in-dubai": {
    title: "Investeren in Dubai vastgoed — persoonlijk advies",
    desc: "Investeren in Dubai-vastgoed met hoog huurrendement en 0% belasting. Persoonlijk investeringsadvies van een Nederlandse makelaar die zelf in Dubai investeert.",
    poster: "drone-burj",
    eyebrow: "Investeren in Dubai",
    h1: "Investeren in Dubai vastgoed — persoonlijk advies",
    lede: "Bouw vermogen op met Dubai-vastgoed: tot 9% bruto huurrendement, belastingvrij, in een groeiende markt. Joy investeert zelf in Dubai en deelt die kennis met u.",
    intro: "Dubai behoort tot de aantrekkelijkste vastgoedmarkten ter wereld voor investeerders: geen inkomsten- of vermogenswinstbelasting voor particulieren, sterke huurvraag en een transparant, door RERA gereguleerd systeem. Joy helpt u de juiste wijk, woning en strategie te kiezen — van off-plan met betaalplan tot direct verhuurbare units.",
    benefits: [
      ["0% belasting", "Geen inkomstenbelasting op huur en geen vermogenswinstbelasting voor particulieren."],
      ["Hoog rendement", "Bruto huurrendementen van doorgaans 6–9%, afhankelijk van wijk en type."],
      ["Datagedreven advies", "Selectie op basis van rendement, vraag, oplevering en ontwikkelaarskwaliteit."],
      ["Volledige ontzorging", "Aankoop, verhuur, beheer en exit — alles in één hand geregeld."],
    ],
    steps: [
      ["Strategiegesprek", "We bepalen uw doel: cashflow, waardegroei of een combinatie — en uw budget."],
      ["Selectie", "Joy presenteert objecten die passen bij uw rendements- en risicoprofiel."],
      ["Aankoop", "Begeleiding bij reservering, betaalplan/financiering en overdracht."],
      ["Verhuur & rendement", "Wij regelen verhuur en beheer, zodat uw investering direct gaat renderen."],
    ],
    faqs: [
      ["Welk rendement kan ik verwachten?", "Bruto huurrendementen liggen doorgaans tussen 6% en 9%. Netto is dit lager door service charges en beheer. Bereken uw situatie met onze rendement-calculator."],
      ["Is off-plan of bestaande bouw beter?", "Dat hangt af van uw doel. Off-plan biedt instapprijzen en betaalplannen; bestaande bouw levert direct huurinkomsten. Joy adviseert per situatie."],
      ["Moet ik belasting betalen in Nederland?", "Mogelijk wel (box 3). Laat u hierover door een fiscalist adviseren; onze gids geeft een eerste oriëntatie."],
    ],
    related: [["Investeren in Dubai vastgoed", "../kennisbank/investeren-in-dubai-vastgoed.html"], ["Rendement op vastgoed in Dubai", "../kennisbank/rendement-vastgoed-dubai.html"], ["Beste wijken voor investeerders", "../kennisbank/beste-wijken-voor-investeerders-dubai.html"]],
  },
  "woning-verkopen-in-dubai": {
    title: "Uw woning verkopen in Dubai",
    desc: "Uw woning verkopen in Dubai voor de beste prijs. Professionele marketing, een sterk netwerk en Nederlandse begeleiding van waardebepaling tot overdracht.",
    poster: "villa-sunset",
    eyebrow: "Verkopen in Dubai",
    h1: "Uw woning verkopen in Dubai",
    lede: "Wilt u uw Dubai-woning verkopen? Joy zorgt voor een vlotte, transparante verkoop tegen de beste prijs — met professionele marketing en een internationaal kopersnetwerk.",
    intro: "De Dubai-markt kent veel internationale kopers en een actief transactievolume. Met de juiste vraagprijs, presentatie en marketing verkoopt u sneller en beter. Joy begeleidt u van waardebepaling en styling-advies tot onderhandeling, NOC en de eigendomsoverdracht bij het DLD.",
    benefits: [
      ["Scherpe waardebepaling", "Een realistische vraagprijs op basis van actuele transactiedata in uw wijk."],
      ["Professionele marketing", "Hoogwaardige fotografie, video en gerichte bereik onder (internationale) kopers."],
      ["Sterk kopersnetwerk", "Toegang tot een actief netwerk van investeerders en eindgebruikers."],
      ["Begeleiding tot overdracht", "NOC, escrow en DLD-overdracht — correct en zonder zorgen geregeld."],
    ],
    steps: [
      ["Waardebepaling", "Joy bepaalt de optimale vraagprijs op basis van de markt en uw woning."],
      ["Presentatie & marketing", "Professionele beelden en gerichte promotie naar de juiste kopers."],
      ["Onderhandeling", "Wij voeren de gesprekken en halen de beste prijs en voorwaarden voor u eruit."],
      ["Overdracht", "Afhandeling van NOC en de eigendomsoverdracht bij het Dubai Land Department."],
    ],
    faqs: [
      ["Wat kost het verkopen van mijn woning?", "Reken op een makelaarscourtage (doorgaans 2% + btw) en enkele overdrachts-/NOC-kosten. Joy licht dit vooraf transparant toe."],
      ["Hoe lang duurt een verkoop in Dubai?", "Met de juiste prijs en marketing vaak enkele weken tot maanden, afhankelijk van wijk en type woning."],
      ["Kan ik op afstand verkopen?", "Ja. Via een volmacht en digitale ondertekening kunt u vanuit Nederland verkopen."],
    ],
    related: [["Vastgoed verkopen in Dubai", "../kennisbank/vastgoed-verkopen-in-dubai.html"], ["Eigendomsoverdracht & title deed", "../kennisbank/eigendomsoverdracht-title-deed-dubai.html"], ["De Dubai vastgoedmarkt in 2026", "../kennisbank/dubai-vastgoedmarkt-2026.html"]],
  },
};

function render(slug, d) {
  const canonical = `${SITE}/diensten/${slug}.html`;
  const jsonld = `  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "Service",
    name: d.h1, description: d.desc, serviceType: d.eyebrow, areaServed: "Dubai",
    provider: { "@type": "RealEstateAgent", name: "Droomhuis in Dubai — Joy van den Hurk", url: SITE },
  })}</script>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: d.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  })}</script>`;
  return `${HEAD(d.title + " | Droomhuis in Dubai", d.desc, canonical, jsonld, d.poster)}
  <main>
    <section class="cinema">
      <video class="bgvideo" autoplay muted loop playsinline preload="metadata" poster="../assets/video/${d.poster}.jpg" aria-label="Dubai">
        <source src="../assets/video/${d.poster}.mp4" type="video/mp4"></video>
      <div class="wrap">
        <span class="eyebrow center">${esc(d.eyebrow)}</span>
        <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.8rem);max-width:20ch;margin:18px auto 0">${esc(d.h1)}</h1>
        <p style="color:rgba(255,255,255,.9);max-width:56ch;margin:18px auto 0;font-size:1.12rem">${esc(d.lede)}</p>
        <div class="hero-cta" style="justify-content:center;margin-top:28px">
          <a class="btn btn-gold" href="../index.html#contact">Plan een adviesgesprek ${arrow}</a>
          <a class="btn btn-light" href="https://wa.me/971521299081" target="_blank" rel="noopener">WhatsApp Joy</a>
        </div>
      </div>
    </section>

    <section class="section-pad"><div class="wrap">
      <div class="article-layout" style="grid-template-columns:1fr">
        <article class="prose reveal" style="max-width:820px;margin:0 auto">
          <nav class="breadcrumb"><a href="../index.html#top">Home</a><span>/</span><a href="../index.html#diensten">Diensten</a><span>/</span><span>${esc(d.eyebrow)}</span></nav>
          <p style="font-size:1.18rem">${esc(d.intro)}</p>
        </article>
      </div>
    </div></section>

    <section class="why section-pad"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow center">Waarom Joy</span><h2>Wat u van ons mag verwachten</h2></div>
      <div class="why-grid" style="grid-template-columns:repeat(2,1fr);max-width:920px;margin:0 auto">
        ${d.benefits.map(([t, x], i) => `<article class="why-card reveal" data-d="${(i % 2) + 1}"><div class="why-ico">${check}</div><h3>${esc(t)}</h3><p>${esc(x)}</p></article>`).join("")}
      </div>
    </div></section>

    <section class="section-pad" style="background:var(--bg-2)"><div class="wrap">
      <div class="section-head center reveal"><span class="eyebrow center">Zo werkt het</span><h2>In 4 stappen geregeld</h2></div>
      <div class="prose reveal" style="max-width:760px;margin:0 auto">
        <ol>${d.steps.map(([t, x]) => `<li><strong>${esc(t)}.</strong> ${esc(x)}</li>`).join("")}</ol>
      </div>
    </div></section>

    <section class="section-pad"><div class="wrap">
      <div class="prose reveal" style="max-width:760px;margin:0 auto">
        <section class="faq"><h2>Veelgestelde vragen</h2>
          ${d.faqs.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><div class="faq-a"><p>${esc(a)}</p></div></details>`).join("")}
        </section>
        <section class="related"><h2>Lees ook</h2><div class="rel-grid">
          ${d.related.map(([t, h]) => `<a class="rel-card" href="${h}"><b>${esc(t)}</b><span class="rel-go">Lees verder →</span></a>`).join("")}
        </div></section>
        <section class="kb-cta reveal" style="margin-top:56px"><div><h2>Klaar om te starten?</h2><p>Plan een vrijblijvend adviesgesprek met Joy van den Hurk.</p></div><a class="btn btn-gold" href="../index.html#contact">Neem contact op</a></section>
      </div>
    </div></section>
  </main>
${FOOTER}
  <script src="../assets/js/kennisbank.js"></script>
</body></html>`;
}

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const [slug, d] of Object.entries(LANDINGS)) { fs.writeFileSync(path.join(OUT, `${slug}.html`), render(slug, d)); n++; }
console.log(`✓ Built ${n} landingspagina's (diensten/)`);
