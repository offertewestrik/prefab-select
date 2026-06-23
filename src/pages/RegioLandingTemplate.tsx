import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, ShieldCheck, CheckCircle2, Timer, Gem, Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

// ---------------------------------------------------------------------------
// Reusable, data-driven regio landing page (Rotterdam-style layout)
// Long-form, SEO-optimised: hero image, intro, process, regelgeving,
// kostentabel, stappenplan, wijken, analysekaders, FAQ-accordion, CTA.
// ---------------------------------------------------------------------------

export interface RegioData {
  slug: string;
  name: string;
  region: string;
  heroImage: string;
  processImage: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitleLines: [string, string, string];
  heroIntro: string;
  usps: { title: string; sub: string }[];
  introEyebrow: string;
  introHeading: [string, string];
  introParagraphs: string[];
  benefits: string[];
  processEyebrow: string;
  processHeading: [string, string];
  processParagraphs: string[];
  welstandEyebrow: string;
  welstandHeading: [string, string];
  welstandParagraphs: string[];
  costHeading: string;
  costIntro: string;
  costRows: { label: string; val: string }[];
  costNote: string;
  steps: { nr: string; title: string; desc: string }[];
  districtsHeading: string;
  districtsIntro: string;
  wijken: { name: string; desc: string }[];
  analysisBoxes: { eyebrow: string; title: string; paragraphs: [string, string] }[];
  faqs: { question: string; answer: string }[];
  noscript: string;
}

export default function RegioLandingTemplate({ data }: { data: RegioData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = data.metaTitle;
    window.scrollTo({ top: 0, behavior: 'instant' });

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    if (metaDesc) metaDesc.setAttribute('content', data.metaDescription);

    const url = `https://www.prefabselect.nl/regio/${data.slug}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-regio-rich';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': url,
          url,
          name: data.metaTitle,
          description: data.metaDescription,
          inLanguage: 'nl-NL',
          isPartOf: { '@type': 'WebSite', name: 'Prefab Select', url: 'https://www.prefabselect.nl' },
          about: { '@type': 'Service', name: `Prefab uitbouw ${data.name}`, provider: { '@type': 'GeneralContractor', name: 'Prefab Select' } },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.prefabselect.nl' },
              { '@type': 'ListItem', position: 2, name: data.name, item: url },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: data.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      document.getElementById('json-ld-regio-rich')?.remove();
    };
  }, [data]);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/85 to-blue-950" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/40 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/diensten" className="hover:text-white transition-colors">Regio's</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">{data.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-3 mb-6 bg-blue-900/40 border border-blue-500/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">{data.heroBadge}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  {data.heroTitleLines[0]} <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    {data.heroTitleLines[1]}
                  </span> <br />
                  {data.heroTitleLines[2]}
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium">
                  {data.heroIntro}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link to="/offerte" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group">
                    Vraag direct een offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="#faq" className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95">
                    Veelgestelde Vragen
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  {data.usps.map((u, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        {i === 0 ? <Timer size={16} /> : i === 1 ? <ShieldCheck size={16} /> : <Gem size={16} />}
                      </div>
                      <div>
                        <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">{u.title}</p>
                        <p className="text-[10px] text-blue-200/50 leading-none">{u.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl -z-10" />
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative">
                  <img src={data.heroImage} alt={`Prefab uitbouw ${data.name}`} className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">Ontzorgde Realisatie</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">{data.introEyebrow}</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                {data.introHeading[0]} <br />
                <span className="text-blue-600 italic font-light lowercase">{data.introHeading[1]}</span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                {data.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">Waarom kiezen voor prefab?</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">De unieke voordelen van onze geavanceerde modulaire bouwmethode:</p>
              <ul className="space-y-4">
                {data.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-[3.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img src={data.processImage} alt={`Prefab Select productie voor ${data.name}`} className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">{data.processEyebrow}</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                {data.processHeading[0]} <br />
                <span className="text-blue-600 italic font-light lowercase">{data.processHeading[1]}</span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                {data.processParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGELGEVING / WELSTAND */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">{data.welstandEyebrow}</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                {data.welstandHeading[0]} <br />
                <span className="text-blue-400 italic font-light lowercase">{data.welstandHeading[1]}</span>
              </h2>
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                {data.welstandParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-10">
                <a href="https://omgevingswet.overheid.nl/checken" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors">
                  Start Omgevingsloket Check <ArrowRight size={14} />
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">Laat ons uw adres gratis nakijken</h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">Valt uw woning binnen een beschermd gebied of kunnen we direct vergunningsvrij configureren? Onze adviseurs pluizen het kosteloos voor u uit.</p>
              <Link to="/offerte" className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors">
                Informatie en Prijscheck <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COST */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">KOSTEN EN CALCULATIE</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">{data.costHeading}</h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">{data.costIntro}</p>
          </div>
          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Indicatieve Richtprijs</span>
            </div>
            {data.costRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 p-6 md:px-10 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-blue-950 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}`}>
                <span>{row.label}</span>
                <span className="text-right text-blue-600 font-black">{row.val}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-semibold text-center leading-relaxed">{data.costNote}</p>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">ZORGELOZE REALISATIE</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uw bouwtraject in {data.name} <br />
              <span className="text-blue-600 italic font-light lowercase">stap voor stap geregeld</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {data.steps.map((stap, i) => (
              <div key={i} className="relative">
                {i < 4 && <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 border-t-2 border-dashed border-slate-200 -z-10 -translate-x-6" />}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-950 font-display font-black text-2xl text-white flex items-center justify-center mb-8 border-4 border-slate-50 shadow-md">{stap.nr}</div>
                  <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">{stap.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">{stap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRICTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">LOKALE KENNIS</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">{data.districtsHeading}</h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">{data.districtsIntro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.wijken.map((wk, i) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100/80 rounded-[2rem] p-8 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {wk.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{wk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYSIS */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.analysisBoxes.map((box, i) => (
              <div key={i} className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">{box.eyebrow}</span>
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">{box.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">{box.paragraphs[0]}</p>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{box.paragraphs[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">REGELGEVING EN VRAGEN</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in {data.name}
            </h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-100/80 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300">
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between text-left gap-4 font-display font-black text-lg md:text-xl text-blue-950 uppercase tracking-tighter">
                    <span>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isOpen && <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-sm leading-relaxed font-medium">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Benieuwd wat er bij <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">u mogelijk is?</span>
              </h2>
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Deel uw woonsituatie en plannen met ons, dan berekenen we geheel vrijblijvend een heldere prijsindicatie voor uw woning in {data.name}.
              </p>
              <Link to="/offerte" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group">
                Gratis Prijsopgave Ontvangen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

      <noscript>
        <article className="max-w-3xl mx-auto px-6 py-12 prose text-slate-700">
          <h1>{data.metaTitle}</h1>
          <p>{data.noscript}</p>
        </article>
      </noscript>
    </div>
  );
}
