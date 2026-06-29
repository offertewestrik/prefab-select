import React, { useEffect } from 'react';
import {
  ArrowRight,
  Wrench,
  Flame,
  Droplets,
  ShowerHead,
  Thermometer,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LP_URL = 'https://loodgieterplatform.nl';

/**
 * Partner-/zusterbedrijfpagina over Loodgieterplatform.nl.
 *
 * Naast het vertellen van het verhaal achter de samenwerking dient deze pagina
 * een SEO-doel: een inhoudelijke, do-follow verwijzing vanaf prefabselect.nl
 * naar loodgieterplatform.nl. Bewust géén dunne linkpagina — echte context,
 * zodat Google de link als waardevol en relevant beoordeelt.
 */
export default function Loodgieterplatform() {
  useEffect(() => {
    const prevTitle = document.title;
    const pageTitle = 'Loodgieterplatform.nl — onze installatiepartner | Prefab Select';
    document.title = pageTitle;

    const desc =
      'Voor loodgieters- en installatiewerk werken wij samen met Loodgieterplatform.nl: ' +
      'gecertificeerde vakmensen voor cv-ketels, badkamers, lekkages en onderhoud door heel Nederland.';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    if (metaDesc) metaDesc.setAttribute('content', desc);

    const url = 'https://www.prefabselect.nl/loodgieterplatform';
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'json-ld-loodgieterplatform';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': url,
          url,
          name: pageTitle,
          description: desc,
          inLanguage: 'nl-NL',
          isPartOf: { '@type': 'WebSite', name: 'Prefab Select', url: 'https://www.prefabselect.nl' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prefabselect.nl' },
              { '@type': 'ListItem', position: 2, name: 'Loodgieterplatform', item: url },
            ],
          },
          mentions: {
            '@type': 'Organization',
            name: 'Loodgieterplatform.nl',
            url: LP_URL,
            description:
              'Landelijk platform dat huiseigenaren koppelt aan gecertificeerde loodgieters en installateurs.',
          },
        },
      ],
    });
    document.head.appendChild(ld);

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      document.getElementById('json-ld-loodgieterplatform')?.remove();
    };
  }, []);

  const diensten = [
    { icon: <Flame className="w-5 h-5" />, title: 'CV-ketel vervangen & onderhoud', path: '/diensten/cv-ketel-vervangen' },
    { icon: <ShowerHead className="w-5 h-5" />, title: 'Badkamer- en sanitairrenovatie', path: '/diensten/badkamer-renovatie' },
    { icon: <Droplets className="w-5 h-5" />, title: 'Lekkages & spoedreparaties', path: '/diensten/lekkage' },
    { icon: <Wrench className="w-5 h-5" />, title: 'Ontstopping & riolering', path: '/diensten/ontstopping' },
    { icon: <Thermometer className="w-5 h-5" />, title: 'Radiatoren & vloerverwarming', path: '/diensten' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Warmtepomp & verduurzaming', path: '/diensten/warmtepomp' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-blue-950 text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/30 -z-0" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">
            Onze installatiepartner
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-[1.05] mb-8">
            Loodgieters- en installatiewerk?<br />
            <span className="text-blue-400">Loodgieterplatform.nl</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
            Prefab Select bouwt circulaire, modulaire uitbreidingen. Voor het loodgieters- en
            installatiewerk daaromheen — én voor iedereen die los daarvan een betrouwbare loodgieter
            zoekt — werken wij samen met{' '}
            <a
              href={LP_URL}
              className="text-white underline decoration-blue-400 underline-offset-4 hover:text-blue-300 transition-colors font-bold"
            >
              Loodgieterplatform.nl
            </a>
            : het landelijke platform dat huiseigenaren koppelt aan gecertificeerde loodgieters en
            installateurs.
          </p>
          <div className="mt-10">
            <a
              href={LP_URL}
              className="inline-flex items-center gap-3 bg-white text-blue-950 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-50 transition-all active:scale-95"
            >
              Bezoek Loodgieterplatform.nl
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Waarom samenwerking */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-blue-950 mb-8">
          Waarom wij samenwerken
        </h2>
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
          <p>
            Een prefab uitbouw, aanbouw of mantelzorgwoning is pas compleet als de techniek klopt.
            Water, verwarming, sanitair en de aansluiting op de bestaande woning vragen om vakmanschap
            van gecertificeerde installateurs. Daarom verwijzen wij voor dat werk naar onze partner{' '}
            <a href={LP_URL} className="text-blue-600 font-semibold hover:text-blue-800 underline underline-offset-2">
              Loodgieterplatform.nl
            </a>
            .
          </p>
          <p>
            Loodgieterplatform.nl is een landelijk platform dat huiseigenaren in heel Nederland — van
            Zuid-Holland tot Limburg — koppelt aan vakkundige loodgieters en installateurs in de buurt.
            Of het nu gaat om een nieuwe cv-ketel, een badkamerrenovatie, een acute lekkage of regulier
            onderhoud: je vraagt eenvoudig vrijblijvend offertes aan en vergelijkt lokale vakmensen.
          </p>
          <p>
            Voor onze klanten betekent dit dat het installatiewerk rond hun prefab project in
            vertrouwde handen is. En zoek je los van een bouwproject gewoon een goede loodgieter? Ook
            dan ben je bij{' '}
            <a href={LP_URL} className="text-blue-600 font-semibold hover:text-blue-800 underline underline-offset-2">
              loodgieterplatform.nl
            </a>{' '}
            aan het juiste adres.
          </p>
        </div>
      </section>

      {/* Diensten */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">
            Wat zij doen
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-blue-950 mb-12">
            Installatiediensten door heel Nederland
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {diensten.map((d) => (
              <a
                key={d.title}
                href={`${LP_URL}${d.path}`}
                className="group bg-white rounded-2xl border border-slate-100 p-7 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {d.icon}
                </div>
                <h3 className="font-display font-bold text-blue-950 text-lg leading-tight tracking-tight mb-2">
                  {d.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-600">
                  Bekijk op Loodgieterplatform
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Vertrouwen */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: 'Gecertificeerde vakmensen', desc: 'Erkende loodgieters en installateurs, ook voor gasvoerende installaties.' },
            { icon: <MapPin className="w-6 h-6 text-blue-600" />, title: 'Landelijke dekking', desc: 'Een vakman in de buurt in honderden gemeenten door heel Nederland.' },
            { icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />, title: 'Vrijblijvend vergelijken', desc: 'Eenvoudig offertes aanvragen en lokale vakmensen naast elkaar zetten.' },
          ].map((b) => (
            <div key={b.title} className="rounded-3xl border border-slate-100 p-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">{b.icon}</div>
              <h3 className="font-display font-bold text-blue-950 text-lg tracking-tight mb-3">{b.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter mb-6">
            Op zoek naar een loodgieter?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Vind via{' '}
            <a href={LP_URL} className="text-blue-300 underline underline-offset-4 hover:text-white font-bold">
              Loodgieterplatform.nl
            </a>{' '}
            snel een betrouwbare, gecertificeerde vakman bij jou in de buurt.
          </p>
          <a
            href={LP_URL}
            className="inline-flex items-center gap-3 bg-white text-blue-950 px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-50 transition-all active:scale-95"
          >
            Naar Loodgieterplatform.nl
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Een initiatief in samenwerking met Prefab Select ·{' '}
            <Link to="/over-ons" className="hover:text-white transition-colors">Over ons</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
