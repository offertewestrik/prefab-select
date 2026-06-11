import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Trash2, 
  HelpCircle, 
  Settings, 
  FileText, 
  CheckCircle2, 
  Timer, 
  Gem, 
  Factory, 
  Construction, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function HalsterenLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Prefab Uitbouw Halsteren | Binnen 1 Dag Geplaatst | PrefabSelect";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Prefab uitbouw in Halsteren en omgeving? PrefabSelect plaatst uw kant-en-klare uitbouw of aanbouw binnen 1 dag. Vaste prijs, hoogwaardige isolatie & 10 jaar garantie. Vraag gratis een offerte aan."
      );
    }
  }, []);

  const usps = [
    { title: 'Plaatsing in 1 dag', desc: 'Snel en efficiënt op locatie' },
    { title: 'Vaste totaalprijs', desc: 'Geen verrassingen achteraf' },
    { title: '10 jaar garantie', desc: 'Gegarandeerde topkwaliteit' }
  ];

  const voordelen = [
    {
      nr: '01',
      title: 'Geplaatst binnen 1 dag',
      desc: 'Geen maanden bouwoverlast in uw tuin. Uw prefab uitbouw arriveert compleet en staat dezelfde dag wind- en waterdicht aan uw woning in Halsteren.'
    },
    {
      nr: '02',
      title: 'Vaste prijs, geen verrassingen',
      desc: 'U weet vooraf exact wat uw prefab uitbouw kost. Eén totaalprijs inclusief fundering, plaatsing en afwerking — zonder meerwerk achteraf.'
    },
    {
      nr: '03',
      title: 'Sterke stalen constructie',
      desc: 'Onze uitbouwen worden gebouwd met een stalen constructie: extreem sterk, vormvast en onderhoudsarm. Ideaal voor grote glaspartijen — en uitstekend geïsoleerd, ruimschoots conform het Bouwbesluit.'
    },
    {
      nr: '04',
      title: 'Waardestijging van uw woning',
      desc: 'Extra vierkante meters leefruimte verhogen direct de waarde van uw huis. Een uitbouw verdient zichzelf vrijwel altijd terug bij verkoop.'
    },
    {
      nr: '05',
      title: 'Vergunning geregeld',
      desc: 'Veel uitbouwen zijn vergunningsvrij. Wij toetsen uw situatie kosteloos en verzorgen waar nodig de complete vergunningsaanvraag bij de gemeente.'
    },
    {
      nr: '06',
      title: '10 jaar garantie',
      desc: 'Wij staan volledig achter onze constructie en afwerking. Op iedere prefab uitbouw van PrefabSelect krijgt u standaard 10 jaar garantie.'
    }
  ];

  const toepassingen = [
    {
      title: 'Keuken uitbouw',
      desc: 'Creëer de leefkeuken waar het hele gezin samenkomt, met ruimte voor een kookeiland en eettafel.'
    },
    {
      title: 'Woonkamer uitbouw',
      desc: 'Vergroot uw woonkamer met 3 tot 5 meter en haal met grote glaspartijen de tuin naar binnen.'
    },
    {
      title: 'Thuiswerkplek',
      desc: 'Een rustige, goed geïsoleerde werkruimte aan huis — ideaal nu thuiswerken de norm is.'
    },
    {
      title: 'Slaap- of badkamer',
      desc: 'Levensloopbestendig wonen op de begane grond, comfortabel en toekomstklaar voor langere zelfstandigheid.'
    }
  ];

  const stappen = [
    {
      nr: '1',
      title: 'Gratis adviesgesprek',
      desc: 'We bespreken uw wensen, bekijken uw woning in Halsteren en adviseren over afmetingen, indeling en vergunning.'
    },
    {
      nr: '2',
      title: 'Ontwerp & vaste offerte',
      desc: 'U ontvangt een 3D-ontwerp van uw uitbouw met één heldere totaalprijs. Online aanpassen kan eenvoudig.'
    },
    {
      nr: '3',
      title: 'Productie in de werkplaats',
      desc: 'Uw uitbouw wordt compleet geproduceerd met een hoogwaardige stalen constructie, inclusief kozijnen en isolatie.'
    },
    {
      nr: '4',
      title: 'Plaatsing in 1 dag',
      desc: 'Op de afgesproken dag plaatsen we de uitbouw aan uw woning. Binnen 1 à 2 weken is alles afgewerkt en klaar voor gebruik.'
    }
  ];

  const faqs = [
    {
      question: 'Wat kost een prefab uitbouw in Halsteren?',
      answer: 'De kosten van een prefab uitbouw beginnen vanaf €2.500 per m², inclusief plaatsing en afwerking. De exacte prijs hangt af van de afmetingen, fundering en opties zoals een lichtstraat of openslaande tuindeuren. U ontvangt bij ons altijd vooraf een vaste totaalprijs — zonder verrassingen achteraf.'
    },
    {
      question: 'Hoe snel wordt een prefab uitbouw geplaatst?',
      answer: 'Omdat uw uitbouw volledig in onze werkplaats wordt geproduceerd, duurt de plaatsing op locatie meestal slechts 1 dag. Inclusief afwerking bent u binnen 1 à 2 weken klaar — waar traditionele bouw al snel 2 tot 3 maanden duurt, met alle overlast van dien.'
    },
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Halsteren?',
      answer: 'Veel uitbouwen aan de achterzijde van de woning zijn vergunningsvrij, mits ze binnen de regels voor het achtererfgebied vallen. Wij controleren dit kosteloos voor uw situatie bij de gemeente Bergen op Zoom (waar Halsteren onder valt) en verzorgen indien nodig de complete vergunningsaanvraag.'
    },
    {
      question: 'Is een prefab uitbouw goed geïsoleerd?',
      answer: 'Jazeker. Onze uitbouwen worden gebouwd met een hoogwaardige stalen constructie in combinatie met sterk isolerende wand-, dak- en vloerelementen. De isolatiewaarden voldoen aan of zijn beter dan het Bouwbesluit, waardoor uw nieuwe ruimte het hele jaar comfortabel én energiezuinig is.'
    },
    {
      question: 'Kan een prefab uitbouw aan elke woning?',
      answer: 'In vrijwel alle gevallen wel. Tijdens het gratis adviesgesprek beoordelen we uw gevel, fundering en de bereikbaarheid van uw perceel. Ook bij beperkte ruimte naast of achter de woning zijn er vaak prima oplossingen mogelijk.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-3 mb-6 bg-blue-900/40 border border-blue-500/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">
                    PREFAB UITBOUW SPECIAALBOUW — HALSTEREN
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uw prefab uitbouw <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    in Halsteren
                  </span> <br />
                  binnen 1 dag geplaatst
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium">
                  Droomt u van een ruimere keuken, lichte woonkamer of extra leefruimte? 
                  PrefabSelect bouwt uw <strong>prefab uitbouw of aanbouw</strong> volledig in eigen werkplaats 
                  en plaatst deze in Halsteren en omgeving in slechts één dag — met de zekerheid van een vaste prijs en premium afwerking.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link 
                    to="/offerte" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Vraag gratis offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/werkwijze" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Bekijk onze werkwijze
                  </Link>
                </div>

                {/* Micro USPs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  {usps.map((usp, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">{usp.title}</p>
                        <p className="text-[10px] text-blue-200/50 leading-none font-medium">{usp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative"
              >
                {/* Accent shape background */}
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl -z-10" />

                {/* Badge */}
                <div className="absolute -top-6 -right-6 bg-blue-600 text-white rounded-[2rem] p-6 text-center shadow-2xl border border-blue-400/25 rotate-6 z-20 max-w-[130px] hidden sm:block">
                  <span className="block font-display font-black text-3xl leading-none">1 DAG</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-normal mt-1 opacity-80">
                    van fundering tot dak
                  </span>
                </div>

                {/* Main image container */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative">
                  <img 
                    src="https://i.imgur.com/gh6Vsut.jpeg" 
                    alt="Moderne prefab uitbouw Halsteren" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Info Card underneath the layout */}
                <div className="mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="text-center sm:text-left">
                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                      STAALCONSTRUCTIE
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Hoogwaardige prefab uitbouw
                    </span>
                    <span className="text-xs text-blue-200/50 block mt-0.5">
                      Gerealiseerd in regio Halsteren
                    </span>
                  </div>
                  <Link 
                    to="/offerte"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg text-center"
                  >
                    Offerte aanvragen
                  </Link>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* INFINITE TEXT CAROUSEL */}
      <div className="bg-blue-950 text-white py-6 border-y border-white/5 overflow-hidden select-none">
        <div className="flex whitespace-nowrap gap-8 text-[11px] font-black uppercase tracking-[0.16em] opacity-80">
          <div className="flex shrink-0 animate-marquee gap-8">
            <span>Prefab uitbouw</span> <b className="text-blue-400">•</b>
            <span>Prefab aanbouw</span> <b className="text-blue-400">•</b>
            <span>Keuken uitbouw</span> <b className="text-blue-400">•</b>
            <span>Woonkamer uitbouw</span> <b className="text-blue-400">•</b>
            <span>Staalconstructie</span> <b className="text-blue-400">•</b>
            <span>Halsteren</span> <b className="text-blue-400">•</b>
            <span>Bergen op Zoom</span> <b className="text-blue-400">•</b>
            <span>West-Brabant</span> <b className="text-blue-400">•</b>
          </div>
          <div className="flex shrink-0 animate-marquee gap-8" aria-hidden="true">
            <span>Prefab uitbouw</span> <b className="text-blue-400">•</b>
            <span>Prefab aanbouw</span> <b className="text-blue-400">•</b>
            <span>Keuken uitbouw</span> <b className="text-blue-400">•</b>
            <span>Woonkamer uitbouw</span> <b className="text-blue-400">•</b>
            <span>Staalconstructie</span> <b className="text-blue-400">•</b>
            <span>Halsteren</span> <b className="text-blue-400">•</b>
            <span>Bergen op Zoom</span> <b className="text-blue-400">•</b>
            <span>West-Brabant</span> <b className="text-blue-400">•</b>
          </div>
          <div className="flex shrink-0 animate-marquee gap-8" aria-hidden="true">
            <span>Prefab uitbouw</span> <b className="text-blue-400">•</b>
            <span>Prefab aanbouw</span> <b className="text-blue-400">•</b>
            <span>Keuken uitbouw</span> <b className="text-blue-400">•</b>
            <span>Woonkamer uitbouw</span> <b className="text-blue-400">•</b>
            <span>Staalconstructie</span> <b className="text-blue-400">•</b>
            <span>Halsteren</span> <b className="text-blue-400">•</b>
            <span>Bergen op Zoom</span> <b className="text-blue-400">•</b>
            <span>West-Brabant</span> <b className="text-blue-400">•</b>
          </div>
        </div>
      </div>

      {/* VOORDELEN (ADVANTAGES) SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              DE VOORDELEN VAN PREFAB
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Prefab uitbouw versus <br />
              <span className="text-blue-600 italic font-light lowercase">
                traditionele bouw
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              Een kant-en-klare uitbouw wordt onder perfect gecontroleerde omstandigheden in onze geavanceerde werkplaats geproduceerd. 
              Dit garandeert ongeëvenaarde constructieve kwaliteit, uitsluiting van weersinvloeden en minimale overlast op uw woonlocatie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {voordelen.map((voordeel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-10 shadow-xs hover:shadow-[0_45px_90px_rgba(29,78,216,0.06)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                {/* subtle linear glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-black text-lg">
                    {voordeel.nr}
                  </div>
                </div>

                <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                  {voordeel.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {voordeel.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* TOEPASSINGEN (APPLICATIONS) — DARK IMMERSIVE BANNER */}
      <section className="py-24 mx-0 sm:mx-6">
        <div className="max-w-7xl mx-auto px-6 bg-blue-950 rounded-[4rem] py-20 px-8 md:px-16 text-white relative overflow-hidden">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-16 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
              EINDELOZE MOGELIJKHEDEN
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
              Voor elke wens een <br />
              <span className="text-blue-400 italic font-light lowercase">
                passend uitklapontwerp
              </span>
            </h2>
            <p className="text-base md:text-lg text-blue-100/60 leading-relaxed font-medium">
              Of u nu droomt van een riante leefkeuken met kookeiland of een fantastische uitbreiding van uw woonkamer naar de tuin, 
              iedere prefab uitbouw wordt op maat berekend en vormgegeven.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {toepassingen.map((toep, i) => (
              <div 
                key={i} 
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-3">
                  {toep.title}
                </h3>
                <p className="text-blue-100/60 text-xs leading-relaxed font-medium">
                  {toep.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WERKWIJZE (4 STEPS) */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZO WERKT PREFAB SELECT
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              In 4 heldere stappen <br />
              <span className="text-blue-600 italic font-light lowercase">
                geplaatst & afgewerkt
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
              Wij begeleiden u van de allereerste schets tot de definitieve oplevering. Transparant, ontzorgd en ongekend snel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stappen.map((stap, i) => (
              <div key={i} className="relative">
                {/* Horizontal flow indicators on desktop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 border-t-2 border-dashed border-slate-200 -z-10 -translate-x-6" />
                )}

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-950 font-display font-black text-2xl text-white flex items-center justify-center mb-8 border-4 border-slate-50">
                    {stap.nr}
                  </div>
                  <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">
                    {stap.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {stap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SEO WERKGEBIED / MAP SECTION */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Info / Towns Pill Box */}
            <div className="lg:col-span-6 text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                UW LOKALE PARTNER
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Actief in Halsteren & <br />
                <span className="text-blue-600 italic font-light lowercase">
                  het hele West-Brabantse land
                </span>
              </h2>
              <p className="text-base text-slate-500 leading-relaxed font-medium mb-6">
                PrefabSelect is de aangewezen specialist voor een perfect ontworpen <strong>prefab uitbouw in Halsteren</strong>. 
                We hebben diepgaande kennis van lokale bouwstijlen — van sfeervolle jaren &apos;30 woningen tot moderne, jonge vinexbuurten — 
                en kennen de welstandseisen van de gemeente Bergen op Zoom door en door.
              </p>
              <p className="text-base text-slate-500 leading-relaxed font-medium mb-8">
                Onze hoogwaardige constructies sieren niet alleen Halsteren, maar worden ook met trots geplaatst in Bergen op Zoom, 
                Steenbergen, Tholen, Roosendaal en omliggende kernen in West-Brabant en Zeeland.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'Halsteren', active: true },
                  { name: 'Bergen op Zoom', active: false },
                  { name: 'Steenbergen', active: false },
                  { name: 'Tholen', active: false },
                  { name: 'Roosendaal', active: false },
                  { name: 'Hoogerheide', active: false },
                  { name: 'Lepelstraat', active: false },
                  { name: 'West-Brabant', active: false }
                ].map((p, i) => (
                  <span 
                    key={i} 
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      p.active 
                        ? 'bg-blue-600 text-white border border-blue-500' 
                        : 'bg-white text-blue-950 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Interactive Map Widget */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-square rounded-[3rem] bg-blue-50/50 border border-slate-200/60 overflow-hidden flex items-center justify-center">
                
                {/* Radar lines effect */}
                <div className="absolute inset-[15%] rounded-full border-2 border-dashed border-slate-200/50 animate-spin [animation-duration:80s]" />
                <div className="absolute inset-[30%] rounded-full border border-dashed border-slate-200/40 animate-spin [animation-duration:50s] [animation-direction:reverse]" />
                <div className="absolute inset-[45%] rounded-full border-2 border-dashed border-slate-200/30" />

                {/* Pulse Source at Center */}
                <div className="absolute z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-2xl relative">
                    <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-30" />
                    <MapPin size={18} />
                  </div>
                  <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-blue-950 bg-white/90 backdrop-blur-md border border-slate-200/80 px-4 py-1.5 rounded-full shadow-lg">
                    HALSTEREN
                  </span>
                </div>

                {/* Outer dots connecting surrounding cities */}
                {[
                  { name: 'Bergen op Zoom', top: '70%', left: '50%' },
                  { name: 'Steenbergen', top: '22%', left: '58%' },
                  { name: 'Tholen', top: '44%', left: '16%' },
                  { name: 'Roosendaal', top: '30%', left: '80%' },
                  { name: 'Hoogerheide', top: '82%', left: '30%' },
                  { name: 'Lepelstraat', top: '15%', left: '26%' }
                ].map((surround, idx) => (
                  <div 
                    key={idx}
                    className="absolute"
                    style={{ top: surround.top, left: surround.left }}
                  >
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs border border-slate-100 rounded-full py-1.5 px-3.5 shadow-sm transform hover:scale-105 transition-transform cursor-pointer">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-bold text-slate-800 uppercase tracking-wider whitespace-nowrap">
                        {surround.name}
                      </span>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              VEELGESTELDE VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Over uw prefab uitbouw
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-medium max-w-2xl mx-auto">
              Heeft u vragen over de realisatie, details of kosten van een prefab uitbouw? Vind hier direct de antwoorden.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-display font-black text-xl text-blue-950 uppercase tracking-tighter"
                  >
                    <span>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-slate-500 text-sm leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL LANDING PAGE CTA SECTION */}
      <section className="py-24 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Klaar voor meer <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  leefruimte in Halsteren?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Vraag geheel vrijblijvend een offerte of adviesgesprek aan voor uw prefab uitbouw in Halsteren. 
                Binnen 2 werkdagen ontvangt u van ons een compleet voorstel op maat.
              </p>

              <Link 
                to="/offerte" 
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
              >
                Gratis Offerte Aanvragen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

    </div>
  );
}
