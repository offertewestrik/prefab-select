// Prerendert alle URL's uit de sitemap naar statische HTML in dist/.
// Hierdoor zien Google en AI-crawlers (die geen JavaScript uitvoeren) de
// volledige pagina-inhoud, titel, meta description en canonical direct in de bron.
//
// Draait als onderdeel van `npm run build`, ná `vite build` en de SSR-bundle.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'prerender-entry.js');

const { render, blogs, cityPages } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Titels en omschrijvingen per route. Pagina's zetten dit normaal client-side
// (useEffect); voor de prerender injecteren we het hier zodat het ook zonder
// JavaScript in de HTML staat. Houd dit in lijn met de pagina-componenten.
const staticMeta = {
  '/': {
    title: 'Prefab Select | Prefab uitbouw, aanbouw & mantelzorgwoningen',
    description: 'Prefab uitbouw vanaf €2.500 per m², geplaatst in 1-2 dagen. Ook mantelzorgwoningen, chalets en vakantiewoningen. Eigen fabriek in Halsteren, vaste prijs vooraf.'
  },
  '/offerte': {
    title: 'Gratis offerte aanvragen | Prefab Select',
    description: 'Vraag een gratis offerte aan voor uw prefab uitbouw, aanbouw of mantelzorgwoning. Vaste prijs vooraf en gratis vergunningscheck.'
  },
  '/prefab-uitbouw': {
    title: 'Prefab uitbouw: wat is het, voordelen en nadelen | Prefab Select',
    description: 'Wat is een prefab uitbouw precies? Lees hoe het werkt, de voordelen en nadelen, het verschil met traditioneel bouwen, kosten, bouwtijd en het hele proces.'
  },
  '/prefab-aanbouw': {
    title: 'Prefab aanbouw op maat | Geplaatst in 1-2 dagen | Prefab Select',
    description: 'Prefab aanbouw vanaf €2.500 per m², in de fabriek gebouwd en in 1-2 dagen geplaatst. Vaste prijs vooraf en gratis vergunningscheck.'
  },
  '/mantelzorgwoning': {
    title: 'Prefab mantelzorgwoning laten plaatsen | Prijzen 2026 | Prefab Select',
    description: 'Prefab mantelzorgwoning op maat vanaf €40.000, compleet geplaatst. Gelijkvloers, vaak vergunningsvrij, productie 2-4 weken en plaatsing in 1-2 dagen.'
  },
  '/prefab-chalets': {
    title: 'Prefab chalets op maat | Luxe & duurzaam | Prefab Select',
    description: 'Luxe prefab chalets, volledig op maat gebouwd in onze eigen fabriek. Hoogwaardige isolatie, snelle plaatsing en vaste prijs vooraf.'
  },
  '/vakantiewoningen': {
    title: 'Prefab vakantiewoning bouwen | Prefab Select',
    description: 'Prefab vakantiewoningen voor eigen gebruik of verhuur. In de fabriek gebouwd, snel geplaatst en compleet afgewerkt opgeleverd.'
  },
  '/poolhouse': {
    title: 'Poolhouse laten bouwen | Luxe prefab poolhouses | Prefab Select',
    description: 'Luxe prefab poolhouse bij uw zwembad: op maat ontworpen, in de fabriek gebouwd en snel geplaatst. Vraag een gratis offerte aan.'
  },
  '/zakelijk': {
    title: 'Zakelijke prefab projecten | Recreatieparken & vastgoed | Prefab Select',
    description: 'Prefab bouwen voor zakelijke opdrachtgevers: recreatieparken, vastgoed en projecten met meerdere units. Constante fabriekskwaliteit en strakke planning.'
  },
  '/diensten': {
    title: 'Onze diensten | Prefab uitbouw, aanbouw & meer | Prefab Select',
    description: 'Ontdek alle diensten van Prefab Select: prefab uitbouw, aanbouw, mantelzorgwoningen, chalets, vakantiewoningen en poolhouses.'
  },
  '/werkwijze': {
    title: 'Onze werkwijze: van offerte tot plaatsing | Prefab Select',
    description: 'Zo werkt prefab bouwen bij Prefab Select: offerte, ontwerp op maat, productie in de fabriek (2-4 weken) en plaatsing in 1-2 dagen.'
  },
  '/over-ons': {
    title: 'Over Prefab Select | Eigen fabriek in Halsteren',
    description: 'Maak kennis met Prefab Select: prefab bouwbedrijf met eigen fabriek in Halsteren, actief in heel Nederland en de regio Antwerpen.'
  },
  '/waarom-prefab-select': {
    title: 'Waarom Prefab Select? | Vaste prijs, fabriekskwaliteit & snelheid',
    description: 'Waarom kiezen voor Prefab Select: vaste prijs vooraf, Rc 6.0 isolatie, productie in eigen fabriek en plaatsing in 1-2 dagen.'
  },
  '/projecten': {
    title: 'Onze projecten | Gerealiseerde prefab uitbouwen | Prefab Select',
    description: 'Bekijk gerealiseerde projecten van Prefab Select: prefab uitbouwen, aanbouwen en woonunits door heel Nederland.'
  },
  '/contact': {
    title: 'Contact | Prefab Select Halsteren',
    description: 'Neem contact op met Prefab Select: Steenspil 24, Halsteren. Bel +31 85 060 7775 of mail offerte@prefabselect.nl.'
  },
  '/faq': {
    title: 'Veelgestelde vragen over prefab bouwen | Prefab Select',
    description: 'Antwoorden op veelgestelde vragen over prefab uitbouwen: kosten, vergunningen, bouwtijd, isolatie en het bouwproces.'
  },
  '/ai-expert': {
    title: 'AI Bouwexpert | Direct antwoord op uw bouwvragen | Prefab Select',
    description: 'Stel uw vraag over prefab bouwen aan onze AI-bouwexpert en krijg direct antwoord over kosten, vergunningen en mogelijkheden.'
  },
  '/regio': {
    title: "Werkgebied & Regio's | Prefab Select",
    description: 'Prefab Select plaatst uitbouwen door heel Nederland en in de regio Antwerpen. Bekijk alle regio\'s en steden in ons werkgebied.'
  },
  '/regio/zeeland/nieuwbouwproject': {
    title: 'Nieuwbouwproject Zeeland | Prefab Select',
    description: 'Bekijk ons nieuwbouwproject in Zeeland: prefab schuurtjes en bijgebouwen, gebouwd in onze fabriek in Halsteren.'
  },
  '/prefab-recreatiewoning': {
    title: 'Prefab recreatiewoning bouwen: Wat kost het, regels & voordelen | Prefab Select',
    description: 'Alles over het bouwen van een prefab recreatiewoning: kosten, regels, vergunningen en de voordelen van bouwen in de fabriek.'
  },
  '/prefab-poolhouse': {
    title: 'Prefab poolhouse op maat | Bijgebouw bij het zwembad — Prefab Select',
    description: 'Prefab poolhouse op maat: luxe bijgebouw bij uw zwembad, in de fabriek gebouwd en snel geplaatst.'
  }
};

// Stadstitels zoals de losse landingspagina-componenten ze zetten
const cityTitles = {
  zeeland: 'Zeeland', halsteren: 'Halsteren', eindhoven: 'Eindhoven', amsterdam: 'Amsterdam',
  breda: 'Breda', 'bergen-op-zoom': 'Bergen op Zoom', oss: 'Oss', amstelveen: 'Amstelveen',
  utrecht: 'Utrecht', antwerpen: 'Antwerpen', haarlem: 'Haarlem', laren: 'Laren',
  almere: 'Almere', tilburg: 'Tilburg', 'den-bosch': 'Den Bosch', 'den-haag': 'Den Haag',
  leidschendam: 'Leidschendam', rotterdam: 'Rotterdam'
};

function metaForRoute(route) {
  if (staticMeta[route]) return staticMeta[route];

  const blogMatch = route.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const blog = blogs.find(b => b.slug === blogMatch[1]);
    if (blog) return { title: `${blog.title} | Prefab Select`, description: blog.excerpt || '' };
  }

  const cityMatch = route.match(/^\/regio\/(.+)$/);
  if (cityMatch) {
    const slug = cityMatch[1];
    if (cityTitles[slug] === undefined) {
      const page = cityPages.find(p => p.slug === slug);
      if (page) {
        const description = page.content
          .replace(/[#*\[\]>_`]/g, '')
          .replace(/\(\/[^)]*\)/g, '')
          .split('\n').map(l => l.trim()).filter(Boolean)[0]?.slice(0, 155) || '';
        return { title: `${page.title} | Prefab Select`, description };
      }
    } else {
      return {
        title: `Uitbouw in ${cityTitles[slug]} | Prefab uitbouw op maat — Prefab Select`,
        description: `Prefab uitbouw laten plaatsen in ${cityTitles[slug]}? In de fabriek gebouwd, in 1-2 dagen geplaatst en altijd een vaste prijs vooraf. Vraag een gratis offerte aan.`
      };
    }
  }

  return null;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPage(route, appHtml) {
  let html = template;
  const meta = metaForRoute(route);
  if (meta) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
    if (meta.description) {
      html = html.replace(
        /(<meta name="description" content=")[^"]*(")/,
        `$1${escapeHtml(meta.description)}$2`
      );
    }
  }
  const canonical = `https://www.prefabselect.nl${route === '/' ? '' : route}`;
  html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" />\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  return html;
}

// Alle URL's uit de sitemap prerenderen
const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.prefabselect\.nl([^<]*)<\/loc>/g)]
  .map(m => m[1] || '/');

let ok = 0;
const failed = [];
for (const route of routes) {
  try {
    const appHtml = render(route);
    const html = buildPage(route, appHtml);
    const outFile = route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
    ok++;
  } catch (err) {
    failed.push(route);
    console.error(`  ✗ ${route}: ${err.message}`);
  }
}

console.log(`Prerendered ${ok}/${routes.length} pagina's${failed.length ? `, mislukt: ${failed.join(', ')}` : ''}`);
if (ok === 0) {
  console.error('Prerendering volledig mislukt — build afgebroken.');
  process.exit(1);
}
