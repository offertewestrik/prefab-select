import { useEffect } from 'react';

const SITE_URL = 'https://prefabselect.nl';
const DEFAULT_IMAGE = 'https://i.imgur.com/6VuTqto.jpeg';

interface SeoProps {
  /** Volledige paginatitel, inclusief eventuele brand-suffix */
  title: string;
  /** Meta description (~150 tekens) */
  description: string;
  /** Canoniek pad, beginnend met "/" (bijv. "/prefab-uitbouw") */
  canonical: string;
  /** Open Graph afbeelding (absolute URL) */
  image?: string;
  /** Open Graph type, standaard "website" */
  type?: string;
  /** Zet robots op noindex (bijv. voor 404 of interne pagina's) */
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function Seo({ title, description, canonical, image = DEFAULT_IMAGE, type = 'website', noindex = false }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${canonical}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:locale', 'nl_NL');
    upsertMeta('property', 'og:site_name', 'Prefab Select');

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, canonical, image, type, noindex]);

  return null;
}

export default Seo;
