import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.prefabselect.nl';
const DEFAULT_TITLE = 'Prefab Uitbouw, Aanbouw & Chalets | Prefab Select';
const DEFAULT_DESCRIPTION =
  'Prefab Select levert hoogwaardige prefab uitbouwen, aanbouwen, chalets en vakantiewoningen. Snel geplaatst, vaste prijs vooraf. Vraag vrijblijvend een offerte aan.';
const DEFAULT_OG_IMAGE = 'https://i.imgur.com/uYzANLQ.jpeg';

// Alias-routes wijzen naar hun canonieke URL om duplicate content te voorkomen.
const canonicalAliases: Record<string, string> = {
  '/configurator': '/offerte',
  '/prefab-bouwen': '/prefab-aanbouw',
  '/prefab-chalets': '/chalets',
  '/prefab-uitbouw-laten-plaatsen': '/prefab-uitbouw',
  '/diensten/prefab-uitbouw': '/prefab-uitbouw',
  '/diensten/prefab-aanbouw': '/prefab-aanbouw',
  '/diensten/mantelzorgwoning': '/mantelzorgwoning',
  '/diensten/poolhouse': '/poolhouse',
  '/diensten/prefab-chalets': '/chalets',
  '/diensten/vakantiewoningen': '/vakantiewoningen',
  '/diensten/prefab-recreatiewoning': '/prefab-recreatiewoning',
  '/onze-modules': '/diensten',
  '/wie-wij-zijn': '/over-ons',
  '/veelgestelde-vragen': '/faq',
  '/uitbouw-zeeland': '/regio/zeeland',
  '/prefab-uitbouw-halsteren': '/regio/halsteren',
  '/uitbouw-amsterdam': '/regio/amsterdam',
  '/uitbouw-breda': '/regio/breda',
  '/uitbouw-bergen-op-zoom': '/regio/bergen-op-zoom',
  '/uitbouw-oss': '/regio/oss',
  '/uitbouw-amstelveen': '/regio/amstelveen',
  '/uitbouw-utrecht': '/regio/utrecht',
  '/uitbouw-antwerpen': '/regio/antwerpen',
  '/uitbouw-haarlem': '/regio/haarlem',
  '/uitbouw-laren': '/regio/laren',
  '/uitbouw-almere': '/regio/almere',
  '/uitbouw-tilburg': '/regio/tilburg',
  '/uitbouw-den-bosch': '/regio/den-bosch',
  '/uitbouw-den-haag': '/regio/den-haag',
  '/uitbouw-leidschendam': '/regio/leidschendam',
  '/uitbouw-rotterdam': '/regio/rotterdam',
};

interface RouteMeta {
  title?: string;
  description: string;
}

const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/offerte': {
    title: 'Offerte aanvragen | Prefab Select',
    description:
      'Vraag vrijblijvend een offerte aan voor uw prefab uitbouw, aanbouw of bijgebouw. Binnen 24 uur een duidelijke prijsindicatie, zonder verrassingen achteraf.',
  },
  '/prefab-uitbouw': {
    description:
      'Alles over de prefab uitbouw: voordelen, kosten per m² en plaatsing binnen 1 dag. Hoogwaardige isolatie en luxe afwerking door Prefab Select.',
  },
  '/prefab-aanbouw': {
    description:
      'Moderne prefab aanbouw op maat voor een leefkeuken, kantoor of slaapkamer. Snel geplaatst met hoogwaardige materialen en een vaste prijs vooraf.',
  },
  '/chalets': {
    description:
      'Luxe prefab chalets met hoogwaardige afwerking voor recreatief of permanent gebruik. Tijdloos design, onderhoudsarm en snel geleverd.',
  },
  '/vakantiewoningen': {
    description:
      'Luxe prefab vakantiewoningen met hoog verhuurrendement. Duurzaam gebouwd, wintervast en volledig op maat ontworpen door Prefab Select.',
  },
  '/prefab-recreatiewoning': {
    description:
      'Prefab recreatiewoning laten bouwen? Ontdek de kosten, regels en voordelen van een luxe modulaire recreatiewoning van Prefab Select.',
  },
  '/mantelzorgwoning': {
    description:
      'Prefab mantelzorgwoning op maat: zorg dichtbij huis met behoud van privacy. Snel geplaatst, gelijkvloers en volledig gebruiksklaar opgeleverd.',
  },
  '/poolhouse': {
    description:
      'Luxe prefab poolhouse bij uw zwembad, met opties voor een buitenkeuken, sauna of bar. Architectonisch ontwerp en hoogwaardige materialen.',
  },
  '/prefab-poolhouse': {
    description:
      'Prefab poolhouse op maat: direct gebruiksklaar, architectonisch ontworpen en gebouwd met hoogwaardige materialen door Prefab Select.',
  },
  '/diensten': {
    title: 'Diensten | Prefab Select',
    description:
      'Ontdek alle prefab oplossingen van Prefab Select: uitbouw, aanbouw, chalets, vakantiewoningen, poolhouses en modulaire woningen.',
  },
  '/zakelijk': {
    title: 'Zakelijke prefab oplossingen | Prefab Select',
    description:
      'Zakelijke prefab oplossingen voor projectontwikkelaars en recreatieparken. Modulair bouwen met een vaste planning en constante kwaliteit.',
  },
  '/werkwijze': {
    title: 'Onze werkwijze | Prefab Select',
    description:
      'Zo werkt Prefab Select: van ontwerp en inmeten tot productie en plaatsing binnen 1 dag. Volledige begeleiding van A tot Z.',
  },
  '/over-ons': {
    title: 'Over ons | Prefab Select',
    description:
      'Maak kennis met Prefab Select, specialist in hoogwaardige prefab uitbouwen, aanbouwen en modulaire woonoplossingen.',
  },
  '/waarom-prefab-select': {
    title: 'Waarom Prefab Select?',
    description:
      'Waarom kiezen voor Prefab Select? Snelle plaatsing, vaste prijzen, hoogwaardige isolatie en ervaren vakmensen.',
  },
  '/projecten': {
    title: 'Projecten | Prefab Select',
    description:
      'Bekijk gerealiseerde prefab projecten van Prefab Select: uitbouwen, aanbouwen, chalets en vakantiewoningen door heel Nederland.',
  },
  '/contact': {
    title: 'Contact | Prefab Select',
    description:
      'Neem contact op met Prefab Select. Bel +31 85 060 7775 of mail naar offerte@prefabselect.nl voor advies over uw prefab project.',
  },
  '/ai-expert': {
    title: 'AI Bouwexpert | Prefab Select',
    description:
      'Stel uw vragen over prefab bouwen aan onze AI-expert en krijg direct antwoord over kosten, vergunningen en mogelijkheden.',
  },
  '/faq': {
    title: 'Veelgestelde vragen | Prefab Select',
    description:
      'Antwoorden op veelgestelde vragen over prefab uitbouwen: kosten, vergunningen, plaatsingstijd en kwaliteit.',
  },
};

// Routes die niet in de index horen.
const noindexPaths = new Set(['/crm']);

function cityNameFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function resolveMeta(path: string): RouteMeta {
  const exact = routeMeta[path];
  if (exact) return exact;

  if (path.startsWith('/regio/')) {
    const slug = path.slice('/regio/'.length).split('/')[0];
    const city = cityNameFromSlug(slug);
    return {
      title: `Prefab uitbouw ${city} | Prefab Select`,
      description: `Prefab uitbouw of aanbouw in ${city}? Prefab Select plaatst hoogwaardige woninguitbreidingen vaak binnen 1 dag. Vraag vrijblijvend een offerte aan.`,
    };
  }

  if (path.startsWith('/blog/')) {
    return {
      description:
        'Lees onze kennisartikelen over prefab bouwen: kosten, vergunningen, doorlooptijden en praktische tips van Prefab Select.',
    };
  }

  return { description: DEFAULT_DESCRIPTION };
}

function isKnownPath(path: string): boolean {
  return (
    path in routeMeta ||
    path in canonicalAliases ||
    path.startsWith('/regio/') ||
    path.startsWith('/blog/') ||
    noindexPaths.has(path)
  );
}

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeRobotsMeta() {
  document.head.querySelector('meta[name="robots"]')?.remove();
}

/**
 * Beheert per route de SEO-tags in de <head>: canonical URL, meta description,
 * Open Graph/Twitter-tags en noindex voor interne of onbekende pagina's.
 * Pagina's die zelf document.title zetten, behouden hun eigen titel.
 */
export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalPath = canonicalAliases[pathname] ?? pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
    const meta = resolveMeta(canonicalPath);

    if (meta.title) {
      document.title = meta.title;
    }
    upsertCanonical(canonicalUrl);
    upsertMetaByName('description', meta.description);
    upsertMetaByName('twitter:card', 'summary_large_image');

    upsertMetaByProperty('og:site_name', 'Prefab Select');
    upsertMetaByProperty('og:locale', 'nl_NL');
    upsertMetaByProperty('og:type', 'website');
    upsertMetaByProperty('og:title', meta.title ?? document.title);
    upsertMetaByProperty('og:description', meta.description);
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByProperty('og:image', DEFAULT_OG_IMAGE);

    if (noindexPaths.has(pathname) || !isKnownPath(pathname)) {
      upsertMetaByName('robots', 'noindex, nofollow');
    } else {
      removeRobotsMeta();
    }

    // Pagina's zetten hun eigen document.title ná dit effect; sync og:title daarna.
    const titleSync = setTimeout(() => {
      upsertMetaByProperty('og:title', document.title);
    }, 0);
    return () => clearTimeout(titleSync);
  }, [pathname]);

  return null;
}
