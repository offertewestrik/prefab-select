import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Timer, 
  Gem, 
  Building,
  Compass,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function HaarlemLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Haarlem | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Haarlem laten bouwen? Lees alles over prefab uitbouw: vergunning, de Nota Ruimtelijke Kwaliteit, het beschermde stadsgezicht, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Haarlem
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-haarlem-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/haarlem",
          "url": "https://www.prefabselect.nl/regio/haarlem",
          "name": "Uitbouw in Haarlem | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Haarlem laten bouwen? Lees alles over prefab uitbouw: vergunning, de Nota Ruimtelijke Kwaliteit, het beschermde stadsgezicht, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Haarlem", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Haarlem", "item": "https://www.prefabselect.nl/regio/haarlem" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/haarlem#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Haarlem?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In het beschermde stadsgezicht van de Haarlemse binnenstad of bij een monument is wel een vergunning nodig. Doe de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is de Nota Ruimtelijke Kwaliteit in Haarlem?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dat is het welstandsbeleid van Haarlem: een visie op ruimtelijke kwaliteit met 'gouden regels' en een toetsingskader. Hierin staat per gebied hoe een bouwplan op uiterlijk wordt beoordeeld. De Adviescommissie Ruimtelijke Kwaliteit toetst aanvragen aan deze criteria."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het plaatsen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat meestal binnen één dag. Inclusief fundering en afwerking rekent u op enkele dagen tot een week op locatie, en een totale doorlooptijd van vier tot acht weken inclusief voorbereiding."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een uitbouw in Haarlem ongeveer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reken op een richtprijs van ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van de afwerking. Een compacte uitbouw begint rond de € 40.000. Een offerte op maat geeft het exacte bedrag voor uw woning."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-haarlem-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'We bekijken uw woning, bespreken uw wensen en de mogelijkheden op uw plek, en maken een ontwerp met een transparante en vaste offerte.'
    },
    {
      nr: '2',
      title: 'Vergunning Behandelen',
      desc: 'Valt uw plan buiten de vergunningsvrije normen — bijvoorbeeld in de historische binnenstad? Wij verzorgen de complete aanvraag bij de gemeente Haarlem.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'In onze moderne werkplaats fabriceren we de elementen droog en windvrij onder perfect gecontroleerde omstandigheden, helemaal onafhankelijk van het weer.'
    },
    {
      nr: '4',
      title: 'Grondwerk & Montage',
      desc: 'Eerst leggen we de schroeffundering aan, waarna we de prefab uitbouw binnen één enkele dag hijsen en wind- en waterdicht monteren.'
    },
    {
      nr: '5',
      title: 'Afwerking & Oplevering',
      desc: 'Binnen enkele dagen monteren we alle installaties af en zorgen we voor een naadloze binnenzijde en buitenafwerking. Uw nieuwe ruimte is direct klaar.'
    }
  ];

  const wijken = [
    { name: 'Centrum, Vijfhoek & Burgwal', desc: 'Historische straatjes, rijksbeschermd stadsgezicht en karakteristieke panden; hier is nauwkeurig ontwerpwerk vereist. We zetten slimme kraanlogistiek in om de elementen vlot en veilig over het dak te plaatsen.' },
    { name: 'Kleverpark, Garenkokerskwartier & Bomenbuurt', desc: 'Prachtige en gewilde jaren-30-wijken met stijlvolle woningen; prefab uitbouwen sluiten hier esthetisch feilloos op aan met kwalitatief hoogwaardig metselwerk of moderne glaspuien.' },
    { name: 'Haarlem-Noord & Ramplaankwartier', desc: 'Ruimer opgezette gezinsbuurten met diepe tuinen; hier kunt u optimaal profiteren van vergunningsvrije regelgeving tot 4 meter diep voor een flinke woonkeuken of tuinkamer.' },
    { name: 'Schalkwijk (Europawijk & Molenwijk)', desc: 'Naoorlogse wijken met uitstekende bereikbaarheid en royale achtertuinen waar een prefab uitbouw of leefkeuken direct extra leefkwaliteit en forse waardestijging oplevert.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Haarlem?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In het beschermde stadsgezicht van de Haarlemse binnenstad of bij een monument is wel een vergunning nodig. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Wat is de Nota Ruimtelijke Kwaliteit in Haarlem?',
      answer: 'Dat is het welstandsbeleid van Haarlem: een visie op ruimtelijke kwaliteit met "gouden regels" en een toetsingskader. Hierin staat per gebied hoe een bouwplan op uiterlijk wordt beoordeeld. De Adviescommissie Ruimtelijke Kwaliteit toetst aanvragen aan deze criteria.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De ruwbouw staat meestal binnen één dag. Inclusief fundering en afwerking rekent u op enkele dagen tot een week op locatie, en een totale doorlooptijd van vier tot acht weken inclusief voorbereiding vanaf de ontwerpfase.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Zeker. Fabrieksproductie betekent gecontroleerde omstandigheden, en dat zorgt voor een constante kwaliteit en strakke maatvoering. De uitstraling bepaalt u helemaal zelf, van een moderne glaswand en strak stucwerk tot authentiek metselwerk passend bij een historisch pand.'
    },
    {
      question: 'Wat kost een uitbouw in Haarlem ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer €2.500 tot €4.500 per vierkante meter, afhankelijk van de complexiteit, bodemgesteldheid en afwerking. Een compacte uitbouw begint rond de €40.000. Een offerte op maat geeft het exacte bedrag.'
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
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/85 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/40 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/diensten" className="hover:text-white transition-colors">Regio's</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">Haarlem</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Left */}
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
                    PREFAB SELECT HAARLEM
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Haarlem <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    ruimer wonen in een stad
                  </span> <br />
                  vol karakter
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Haarlem is een prachtige stad boordevol historie en karakteristieke wijken. Een prefab uitbouw of aanbouw van Prefab Select biedt u de extra leefruimte om volop te kunnen blijven wonen op uw geliefde plek, zonder verhuisoverlast.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link 
                    to="/offerte" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Vraag direct een offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a 
                    href="#faq" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Veelgestelde Vragen
                  </a>
                </div>

                {/* Micro USPs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Timer size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Ruwbouw in 1 dag</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale bouwoverlast in uw buurt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Zekerheid Vooraf</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste, transparante offerteprijzen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Uitstekend Geïsoleerd</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Rc 6.0 isolatie t.b.v. lagere lasten</p>
                    </div>
                  </div>
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
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl -z-10" />

                {/* Main image container */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative">
                  <img 
                    src="https://i.imgur.com/WHjDz3I.jpeg" 
                    alt="Haarlem Prefab Uitbouw" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Badge layout */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Ontzorgde Bouw
                  </span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* INTRODUCTION STORY */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                RUIMER WONEN MET TOEGEWIJDE KWALITEIT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Investeren in eigen huis <br />
                <span className="text-blue-600 italic font-light lowercase">
                  is de meest logische stap
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Een grotere woning kopen is in de krappe Haarlemse markt een dure grap. U krijgt te maken met forse overdrachtsbelasting, makelaarskosten, notarissen en de herhaaldelijke verhuisstress.
                </p>
                <p>
                  Met een hoogwaardig ontworpen prefab uitbouw op maat van Prefab Select vergroot u direct de leefmeters op de begane grond. Dit voegt direct maximaal wooncomfort toe aan uw sfeervolle jaren-30-woning of rijtjeshuis, en telt zwaar mee in de toekomstige taxatiewaarde.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Onze kwaliteitsgaranties
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                De overduidelijke voordelen van onze modulaire aanpak:
              </p>
              <ul className="space-y-4">
                {[
                  'Binnen 1 dag op locatie opgebouwd, wind- en waterdicht',
                  'Inclusief fundering, constructieve erfgrensafspraken en afwerking',
                  'Foutloze en gecontroleerde constructiekwaliteit uit de fabriek',
                  'Perfecte afstemming op de Nota Ruimtelijke Kwaliteit'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* PROCESS IN DETAIL */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-[3.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="https://i.imgur.com/PJZ8dy9.jpeg" 
                  alt="Prefab Select Fabriek Haarlem" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                MINIMALE BOUWOVERLAST
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Prefab bouwen is <br />
                <span className="text-blue-600 italic font-light lowercase">
                  veilig en doordacht
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Waar traditioneel bouwen gepaard gaat met wekenlange overlast, weersafhankelijke droogtijden en stapels bouwafval in uw tuin, bouwen wij de complete elementen in onze droge fabriekshal voor.
                </p>
                <p>
                  Zodra het schroeffunderingssysteem in uw achtertuin gereed is, hijsen wij de wand- en dakelementen met precisie op hun plaats. Binnen één dag staat de constructie. Uw woning is snel weer wind- en waterdicht.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGULATION & WELSTAND haarlem */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                ZORGVULDIGE TOETSING BIJ DE GEMEENTE HAARLEM
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Nota Ruimtelijke Kwaliteit <br />
                <span className="text-blue-400 italic font-light lowercase">
                  en de Adviescommissie getackeld
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Gemeente Haarlem streeft naar behoud van het unieke historische karakter via de <strong>Nota Ruimtelijke Kwaliteit</strong>. De Adviescommissie Ruimtelijke Kwaliteit toetst plannen in beeldbepalende regio's of beschermde stadsgezichten zorgvuldig.
                </p>
                <p>
                  Bouwt u in de historische binnenstad, het Kleverpark of de Bomenbuurt? Dan zorgt Prefab Select voor de volledige indiening met vakkundige bouwtekeningen en constructieberekeningen die naadloos voldoen aan de gestelde criteria van de commissie.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Start Omgevingsloket Check <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis controleren
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Valt uw woning binnen het beschermde stadsgezicht of is uw uitbouw vergunningsvrij? Onze experts checken uw specifieke adres gratis en snel.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Informatie en Prijscheck <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* COST ANALYSIS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              KOSTEN EN CALCULATIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Haarlem?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Naast de afmetingen bepalen ook de bodemspecificaties en transportlogistiek (kraaninzet in smalle straatjes) de kostencalculatie:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Prijsindicatie</span>
            </div>
            
            {[
              { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.500' },
              { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
              { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 85.000 of meer' }
            ].map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-2 p-6 md:px-10 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-blue-950 ${
                  i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                }`}
              >
                <span>{row.label}</span>
                <span className="text-right text-blue-600 font-black">{row.val}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-semibold text-center leading-relaxed">
            * Dit betreft indicatieve richtbedragen incl. btw en installatie. Sommige locaties in Haarlem liggen op stevige zandige strandwal, terwijl slappe veengronden elders de heiverplichtingen en fundering beïnvloeden.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOOS STAPPENPLAN
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uw bouwproces van begin tot einde <br />
              <span className="text-blue-600 italic font-light lowercase">
                geheel gestructureerd en vlekkeloos
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stappen.map((stap, i) => (
              <div key={i} className="relative">
                {i < 4 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 border-t-2 border-dashed border-slate-200 -z-10 -translate-x-6" />
                )}

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-950 font-display font-black text-2xl text-white flex items-center justify-center mb-8 border-4 border-slate-50 shadow-md">
                    {stap.nr}
                  </div>
                  <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">
                    {stap.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    {stap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DISTRICTS / WIJK ANALYSIS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              LOKALE LOGISTIEK
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uitbouwen per wijk in Haarlem
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Haarlem kent een rijke variëteit aan wijken. Dit stelt specifieke logistieke en welstandseisen aan uw aanbouw:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wijken.map((wk, i) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100/80 rounded-[2rem] p-8 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {wk.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  {wk.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ADDITIONAL ANALYSIS MODULES */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Box 1 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DE JUISTE KEUZE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een aanbouw de beste oplossing voor uw gezin?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Slaat u uw slag op de begane grond met een riante en gezellige leefkeuken of uitgebouwde tuinkamer? Een uitbouw is veruit de meest gewenste en multifunctionele methode om extra meters te winnen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u daarentegen specifiek naar een extra slaapkamer of luxe badkamer hogerop? Dan is een prefab dakkapel of complete dakopbouw een meer logische en rendabele richting. Wij adviseren u graag volkomen objectief.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">GOEDE VOORBEREIDING</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Nauwkeurig voorbereid van start gaan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Het is belangrijk om vooraf de logistieke routes via de lucht, uw erfgrenzen en de bodemstabiliteit nauwgezet te laten analyseren.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze constructieve engineers en architecten lopen deze kritieke punten vakkundig met u door voordat we in de werkplaats overgaan tot productie, om alle risico's volledig uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">OPTIMAAL DAGLICHT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Prachtig daglicht vangen en de sfeer verrijken
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw voegt niet alleen pure vierkante meters toe, maar herbergt ook sfeer. Veel sfeervolle Haarlemse woningen kunnen door dichtbebouwde buurten donkerder zijn gesitueerd.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dankzij een royale glazen achtergevel, vouwkozijnen of een stijlvolle lichtstraat in het platte dak haalt u het natuurlijke zonlicht diep binnenshuis en haalt u de sfeer van uw tuin naar binnen.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMISCHE TOPKLASSE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Tochtvrij, duurzaam en buitengewoon behaaglijk
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Tocht of warmteverlies in koudere periodes is uitgesloten. Onze prefab wanden, vloeren en daken bezitten uitmuntende thermische Rc-isolatiewaarden tot wel 6.0.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dit draagt direct bij aan een aanzienlijk lagere energierekening en is optimaal te combineren met verantwoorde systemen zoals vloerverwarming en warmtepompen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              REGELGEVING EN VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in Haarlem
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100/80 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-display font-black text-lg md:text-xl text-blue-950 uppercase tracking-tighter"
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

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Benieuwd wat er bij <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  u mogelijk is?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Deel uw unieke woonsituatie en uw plannen met ons, dan berekenen en adviseren we geheel vrijblijvend t.b.v. een betrouwbare en realistische prijsindicatie.
              </p>

              <Link 
                to="/offerte" 
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
              >
                Gratis Prijsopgave Ontvangen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

      {/* Fallback article for client render bots */}
      <noscript>
        <article className="max-w-3xl mx-auto px-6 py-12 prose text-slate-700">
          <h1>Uitbouw in Haarlem — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Haarlem en omgeving, waaronder Centrum, Vijfhoek, Kleverpark, Bomenbuurt, Haarlem-Noord en Schalkwijk. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. In het beschermde stadsgezicht van de Haarlemse binnenstad en bij monumenten gelden strengere eisen via de Nota Ruimtelijke Kwaliteit en de Adviescommissie Ruimtelijke Kwaliteit.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject duurt vier tot acht weken. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
