import React, { useEffect } from 'react';
import {
  ArrowRight,
  Sun,
  Thermometer,
  Wind,
  BatteryCharging,
  Plug,
  ShieldCheck,
  CheckCircle2,
  Leaf,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EI_URL = 'https://energieinstall.nl';

/**
 * Partner-/zusterbedrijfpagina over Energie Install (energieinstall.nl).
 *
 * Inhoudelijke, do-follow verwijzing vanaf prefabselect.nl naar de
 * verduurzamingsspecialist binnen de groep. Bewust geen dunne linkpagina:
 * echte context (verduurzamen van een prefab woning), zodat Google de link
 * als relevant en waardevol beoordeelt.
 */
export default function EnergieInstall() {
  useEffect(() => {
    const prevTitle = document.title;
    const pageTitle = 'Energie Install — verduurzamen van je woning | Prefab Select';
    document.title = pageTitle;

    const desc =
      'Voor warmtepompen, zonnepanelen, airco, thuisbatterijen en laadpalen werken wij samen met ' +
      'Energie Install: gecertificeerde verduurzaming met ISDE-subsidie en 0% btw, door heel Nederland.';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    if (metaDesc) metaDesc.setAttribute('content', desc);

    const url = 'https://www.prefabselect.nl/energie-install';
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'json-ld-energie-install';
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
              { '@type': 'ListItem', position: 2, name: 'Energie Install', item: url },
            ],
          },
          mentions: {
            '@type': 'Organization',
            name: 'Energie Install',
            url: EI_URL,
            description:
              'Specialist in verduurzaming: warmtepompen, zonnepanelen, airco, thuisbatterijen en laadpalen.',
          },
        },
      ],
    });
    document.head.appendChild(ld);

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      document.getElementById('json-ld-energie-install')?.remove();
    };
  }, []);

  const diensten = [
    { icon: <Thermometer className="w-5 h-5" />, title: 'Warmtepompen', desc: 'Hybride en all-electric — bespaar op gas, mét ISDE-subsidie.', path: '/warmtepomp' },
    { icon: <Sun className="w-5 h-5" />, title: 'Zonnepanelen', desc: 'A-merk panelen en omvormers, 0% btw voor particulieren.', path: '/zonnepanelen' },
    { icon: <Wind className="w-5 h-5" />, title: 'Airco', desc: 'Energiezuinige split- en multisplit-units, STEK-gecertificeerd.', path: '/airco' },
    { icon: <BatteryCharging className="w-5 h-5" />, title: 'Thuisbatterijen', desc: 'Sla je zonnestroom op en gebruik het zelf.', path: '/thuisbatterij' },
    { icon: <Plug className="w-5 h-5" />, title: 'Laadpalen', desc: 'Laad thuis op eigen, slim aangestuurde stroom.', path: '/laadpaal' },
    { icon: <Leaf className="w-5 h-5" />, title: 'Totaal verduurzamen', desc: 'Eén partij voor het hele plaatje, vaste eerlijke prijs.', path: '/' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-blue-950 text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/30 -z-0" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">
            Onze verduurzamingspartner
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-[1.05] mb-8">
            Je woning verduurzamen?<br />
            <span className="text-blue-400">Energie Install</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
            Prefab Select bouwt circulaire, modulaire uitbreidingen. Voor de energietechniek daarin — én
            voor wie zijn bestaande woning wil verduurzamen — werken wij samen met{' '}
            <a
              href={EI_URL}
              className="text-white underline decoration-blue-400 underline-offset-4 hover:text-blue-300 transition-colors font-bold"
            >
              Energie Install
            </a>
            : specialist in warmtepompen, zonnepanelen, airco, thuisbatterijen en laadpalen.
          </p>
          <div className="mt-10">
            <a
              href={EI_URL}
              className="inline-flex items-center gap-3 bg-white text-blue-950 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-50 transition-all active:scale-95"
            >
              Bezoek Energie Install
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Waarom samenwerking */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-blue-950 mb-8">
          Bouwen én verduurzamen in één lijn
        </h2>
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
          <p>
            Een nieuwe aanbouw, uitbouw of mantelzorgwoning is hét moment om ook de energievoorziening
            toekomstklaar te maken. Een warmtepomp in plaats van gas, zonnepanelen op het nieuwe dak, een
            airco die zowel koelt als verwarmt — het hoort bij modern, circulair bouwen. Voor dat werk
            verwijzen wij naar onze partner{' '}
            <a href={EI_URL} className="text-blue-600 font-semibold hover:text-blue-800 underline underline-offset-2">
              Energie Install
            </a>
            .
          </p>
          <p>
            Energie Install verzorgt de complete installatie van zonnepanelen, warmtepompen,
            thuisbatterijen, laadpalen en airco voor particulieren en bedrijven — tegen een vaste, eerlijke
            prijs en met de <strong>ISDE-subsidie en 0% btw</strong> netjes voor je geregeld. Alles wordt
            veilig aangelegd volgens NEN 1010 en NEN 3140 door gecertificeerde vakmensen.
          </p>
          <p>
            Zo regel je het bouwen én het verduurzamen in één doorlopende lijn. Wil je los van een
            bouwproject je huis verduurzamen? Ook dan helpt{' '}
            <a href={EI_URL} className="text-blue-600 font-semibold hover:text-blue-800 underline underline-offset-2">
              energieinstall.nl
            </a>{' '}
            je graag verder.
          </p>
        </div>
      </section>

      {/* Diensten */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Wat zij doen</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-blue-950 mb-12">
            Verduurzaming van A tot Z
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {diensten.map((d) => (
              <a
                key={d.title}
                href={`${EI_URL}${d.path}`}
                className="group bg-white rounded-2xl border border-slate-100 p-7 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {d.icon}
                </div>
                <h3 className="font-display font-bold text-blue-950 text-lg leading-tight tracking-tight mb-2">
                  {d.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-600">
                  Bekijk op Energie Install
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
            { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: 'Gecertificeerd & veilig', desc: 'Installatie volgens NEN 1010 en NEN 3140, airco met STEK-certificering.' },
            { icon: <Leaf className="w-6 h-6 text-blue-600" />, title: 'Subsidie & 0% btw geregeld', desc: 'ISDE-subsidie aangevraagd en 0% btw voor particulieren — minder gedoe.' },
            { icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />, title: 'Eén vaste, eerlijke prijs', desc: 'Particulier of zakelijk, van advies tot oplevering en onderhoud.' },
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
            Klaar om te verduurzamen?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Vraag via{' '}
            <a href={EI_URL} className="text-blue-300 underline underline-offset-4 hover:text-white font-bold">
              Energie Install
            </a>{' '}
            een vrijblijvend advies aan voor warmtepomp, zonnepanelen of airco.
          </p>
          <a
            href={EI_URL}
            className="inline-flex items-center gap-3 bg-white text-blue-950 px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-50 transition-all active:scale-95"
          >
            Naar Energie Install
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-widest text-blue-400/60">
            Een partner van Prefab Select ·{' '}
            <Link to="/over-ons" className="hover:text-white transition-colors">Over ons</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
