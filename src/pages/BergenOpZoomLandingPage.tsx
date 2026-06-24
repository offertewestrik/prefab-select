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

export default function BergenOpZoomLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Bergen op Zoom | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Bergen op Zoom? Lees alles over prefab uitbouw: vergunning, welstandsniveaus en de Commissie Ruimtelijke Kwaliteit, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Bergen op Zoom
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-bergenopzoom-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/bergen-op-zoom",
          "url": "https://www.prefabselect.nl/regio/bergen-op-zoom",
          "name": "Uitbouw in Bergen op Zoom | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Bergen op Zoom? Lees alles over prefab uitbouw: vergunning, welstandsniveaus en de Commissie Ruimtelijke Kwaliteit, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Bergen op Zoom", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Bergen op Zoom", "item": "https://www.prefabselect.nl/regio/bergen-op-zoom" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/bergen-op-zoom#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Mag ik zonder vergunning uitbouwen in Bergen op Zoom?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aan de achterkant van uw woning, binnen het achtererfgebied, mag u in veel situaties vergunningsvrij uitbouwen tot vier meter diep, mits u aan de landelijke voorwaarden voldoet (zoals het percentage onbebouwd erf). In de historische binnenstad en bij monumenten vervalt die vrijblijvendheid direct. Doe altijd de check voor uw specifieke adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat doet de Commissie Ruimtelijke Kwaliteit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dit is de welstandscommissie die adviseert of een bouwplan qua vormgeving, uitstraling en materiaalkeuze esthetisch past in de bestaande omgeving. Hoe zwaar dit weegt, hangt af van het welstandsniveau op uw specifieke locatie."
              }
            },
            {
              "@type": "Question",
              "name": "Geldt er iets bijzonders in de historische binnenstad van Bergen op Zoom?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, de middeleeuwse kern van de stad is aangewezen als beschermd stadsgezicht. Hier is een omgevingsvergunning altijd noodzakelijk en wordt uw plan als uniek maatwerk getoetst om de cultuurhistorische waarde te bewaken."
              }
            },
            {
              "@type": "Question",
              "name": "Hoe snel staat een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De constructieve ruwbouw wordt binnen één enkele dag geplaatst en winddicht gemaakt. Inclusief voorbereiding, de fundering en de binnenzijde afwerking duurt het gehele montagetraject op locatie doorgaans één tot twee weken."
              }
            },
            {
              "@type": "Question",
              "name": "Wat betaal ik gemiddeld voor een aanbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "U kunt uitgaan van een gemiddelde indicatieve richtprijs van €2.500 tot €4.500 per m², sterk bepaald door de luxe van uw afwerking (bijv. een glazen schuifpui of vloerverwarming). Voor een compacte uitbouw start het traject vanaf ca. €40.000."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-bergenopzoom-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'Samen brengen we uw woning, uw wensen en de mogelijkheden op uw plek in kaart. U ontvangt een ontwerp met een transparante offerte.'
    },
    {
      nr: '2',
      title: 'Vergunning Behandelen',
      desc: 'Valt uw plan buiten de vrijstelling? Dan regelen en begeleiden wij de complete omgevingsvergunning aanvraag bij de gemeente Bergen op Zoom.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'Terwijl het papierwerk loopt, fabriceren we alle elementen op maat in onze geconditioneerde werkplaats — geheel zonder hinder aan uw huis.'
    },
    {
      nr: '4',
      title: 'Fundering & Montage',
      desc: 'We leggen de specifieke fundering aan, waarna de volledige ruwbouw in veruit de meeste gevallen in slechts één dag gerealiseerd staat.'
    },
    {
      nr: '5',
      title: 'Afwerking & Oplevering',
      desc: 'In een paar dagen wordt alles nauwkeurig afgemonteerd, perfect aangesloten, opgeruimd en wind- en waterdicht aan u opgeleverd.'
    }
  ];

  const wijken = [
    { name: 'Historische Binnenstad', desc: 'Rondom het Markiezenhof heeft u te maken met het beschermde stadsgezicht. Elk plan vraagt zorgvuldig en stijlvol ontworpen maatwerk.' },
    { name: 'Bergse Plaat', desc: 'Ruim opgezette en moderne huizen met royale tuinen waar prefab plaatsingen doorgaans vergunningsvrij en soepel verlopen.' },
    { name: 'Gageldonk & Meilust', desc: 'Sfeervolle woonwijken met flinke achtertuinen en goede bereikbaarheid, ideaal voor een snelle uitbouw.' },
    { name: 'Fort-Zeekant', desc: 'Naoorlogse en gerenoveerde woningen die substantieel extra meters winnen voor een droomkeuken of kantoor.' },
    { name: 'Halsteren & Lepelstraat', desc: 'Gezellige kernen met riante percelen waar de uitbouwmogelijkheden optimaal en vergunningsvrij ingezet kunnen worden.' }
  ];

  const faqs = [
    {
      question: 'Mag ik zonder vergunning uitbouwen in Bergen op Zoom?',
      answer: 'Aan de achterkant van uw woning, binnen het achtererfgebied, mag u in veel situaties vergunningsvrij uitbouwen tot vier meter diep, mits u aan de landelijke voorwaarden voldoet (zoals het percentage onbebouwd erf). In de historische binnenstad en bij monumenten vervalt die vrijblijvendheid direct. Doe altijd de check voor uw specifieke adres.'
    },
    {
      question: 'Wat doet de Commissie Ruimtelijke Kwaliteit?',
      answer: 'Dit is de welstandscommissie die adviseert of een bouwplan qua vormgeving, uitstraling en materiaalkeuze esthetisch past in de bestaande omgeving. Hoe zwaar dit weegt, hangt af van het welstandsniveau op uw specifieke locatie.'
    },
    {
      question: 'Geldt er iets bijzonders in de historische binnenstad van Bergen op Zoom?',
      answer: 'Ja, de middeleeuwse kern van de stad is aangewezen als beschermd stadsgezicht. Hier is een omgevingsvergunning altijd noodzakelijk en wordt uw plan als uniek maatwerk getoetst om de cultuurhistorische waarde te bewaken.'
    },
    {
      question: 'Hoe snel staat een prefab uitbouw?',
      answer: 'De constructieve ruwbouw wordt binnen één enkele dag geplaatst en winddicht gemaakt. Inclusief voorbereiding, de fundering en de binnenzijde afwerking duurt het gehele montagetraject op locatie doorgaans één tot twee weken.'
    },
    {
      question: 'Wat betaal ik gemiddeld voor een aanbouw?',
      answer: 'U kunt uitgaan van een gemiddelde indicatieve richtprijs van €2.500 tot €4.500 per m², sterk bepaald door de luxe van uw afwerking (bijv. een glazen schuifpui of vloerverwarming). Voor een compacte uitbouw start het traject vanaf ca. €40.000.'
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
            <span className="text-blue-300">Bergen op Zoom</span>
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
                    PREFAB SELECT BRABANTSE WAL — BERGEN OP ZOOM
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Bergen op Zoom <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    extra ruimte in een
                  </span> <br />
                  stad met karakter
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Wonen aan de rand van de Brabantse Wal, met een historische binnenstad om de hoek, heeft iets bijzonders. Maar zelfs het fijnste huis kan op een dag te klein worden. Een prefab uitbouw geeft u die extra ruimte terug — zonder dat u Bergen op Zoom hoeft te verlaten.
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
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale bouwoverlast op locatie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Zekerheid vooraf</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste prijs, heldere constructie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Volledig geïsoleerd</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">RC 6.0 isolatiewaarden</p>
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
                    src="https://i.imgur.com/3fXGEOZ.jpeg" 
                    alt="Bergen op Zoom Prefab Uitbouw" 
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
                ZACHTE BRABANTSE WAL COMFORT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Blijven en uitbreiden <br />
                <span className="text-blue-600 italic font-light lowercase">
                  in plaats van verkassen
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Misschien herkent u het wel. De leefruimte die voorheen prima voldeed, voelt sinds het thuiswerken of gezinsuitbreiding krap. De keuken is te klein voor gezellige diners, en de woonkamer mist die fijne verbinding naar de tuin.
                </p>
                <p>
                  Een verhuizing in Bergen op Zoom kost u direct een forse meerwaarde aan hypotheeklasten, makelaarskosten en administratieve overdrachtsbelasting. Door uw bestaande woning slim uit te bouwen, investeert u direct in uw eigen wooncomfort én de waarde van uw huis.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Waarom kiezen voor Prefab Select?
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Onze premium prefab elementen worden onder de meest gecontroleerde omstandigheden gebouwd:
              </p>
              <ul className="space-y-4">
                {[
                  'Snelle en schone montage ter plaatse',
                  'Vaste planning en een heldere all-in prijs vooraf',
                  'Uitstekende thermische isolatie (Rc 6.0+)',
                  '10 jaar constructieve kwaliteitsgarantie'
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

      {/* WHY PREFAB IN DETAIL */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-[3.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="https://i.imgur.com/dHnph3R.jpeg" 
                  alt="Duurzame Prefab Hal" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                FABRIEKSPRECISIE & DUURZAAMHEID
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Prefab uitgelegd, <br />
                <span className="text-blue-600 italic font-light lowercase">
                  zonder ingewikkeld vakjargon
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Met prefab selecteert u voor absolute voorspelbaarheid. Wanden, kozijnen, deuren en het dak worden exact op maat klaargemaakt in onze droge, verwarmde fabriekshal. 
                </p>
                <p>
                  Bij u thuis in Bergen op Zoom regelen wij vooraf de grondwerkzaamheden en de fundering. Vervolgens hijsen we de constructie in één dag op haar plek. Geen maandenlange overlast, steigers of openliggende muren in de regen.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VERGUNNINGEN BERGEN OP ZOOM */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                WELSTANDSKADER BERGEN OP ZOOM
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunningen & regels <br />
                <span className="text-blue-400 italic font-light lowercase">
                  per welstandsniveau uitgelegd
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  In veel gangbare woonwijken van Bergen op Zoom is er aan de achterzijde ruime mogelijkheid tot vergunningsvrij bouwen tot vier meter diepte. Ligt uw huis echter in een beschermd monumentaal stadsgebied of beeldbepalende zone? 
                </p>
                <p>
                  De <strong>Commissie Ruimtelijke Kwaliteit</strong> toetst plannen in dergelijke gebieden zorgvuldig volgens de lokale Nota Ruimtelijke Kwaliteit. Wij zorgen voor een esthetisch prachtig ontwerp dat soepel door de gemeentelijke toetsing komt.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Omgevingsloket Checken <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons de vergunning checken
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Twijfelt u of uw wensen binnen het vergunningsvrije achtererf vallen? Wij voeren graag een gedetailleerde, kosteloze controle uit op uw specifieke adres.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Vraag adres-onderzoek aan <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              TRANSPARANT KOSTENPLAATJE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              De kosten van uw uitbouw, realistisch bekeken
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              De finishing touch bepaalt de uiteindelijke prijs minstens zo sterk als het pure vloeroppervlak. We presenteren hieronder de reële richtprijzen voor 2025/2026:
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
            * Dit zijn richtbedragen. Uw exacte calculatie is afhankelijk van uw funderingsdiepte op de zandvlakten van de Brabantse Wal en de gekozen pui-opties.
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
              Het verloop van A tot Z <br />
              <span className="text-blue-600 italic font-light lowercase">
                strak georganiseerd en voorspelbaar
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
              LOKALE KENMERKEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uitbouwen per stadsdeel in Bergen op Zoom
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Elke wijk stelt unieke logistieke en vergunningsvoorwaarden. Wij kennen regio Bergen op Zoom door en door:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* ADDITIONAL COMFORT ANALYSIS MODULES */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Box 1 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DE JUISTE KEUZE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een prefab uitbouw de juiste keuze?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Wanneer u behoefte heeft aan meer ruimte op de begane grond (zoals een woonkeuken of speelruimte), dan is een uitbouw veruit de meest leefbare en doeltreffende oplossing.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Mocht het ruimtetekort echter op de bovenste verdieping liggen, dan is een dakkapel of een complete dakopbouw vaak een verstandiger of goedkopere optie. Wij stemmen alle afwegingen eerlijk met u af.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">GOED VOORBEREID TRAJECT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Goed voorbereid van start gaan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zorg dat u zaken als de erfgrens (in overleg met buren) en de exacte aanvoerroute voor een opleverkraan vroegtijdig helder heeft.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Samen met onze technische adviseurs gaan we voor de productie elk van deze vier cruciale voorbereidingen met u door om meerkosten te vermijden.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">NATURAL ILLUMINATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Licht binnenhalen met een glazen pui
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw voegt vooral een compleet nieuwe sfeer toe aan uw dagelijks leven door optimaal gebruik te maken van natuurlijk daglicht.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Een glazen vouwwand, een lichtstraat of strakke tuindeuren transformeren de donkere achtergevel in de meest geliefde, zonnige plek van uw gerenoveerde leefomgeving.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">FOUR SEASONS COMFORT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Behaaglijk &amp; warm in elk seizoen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Fabrieksproductie betekent absolute perfectie in isolatie. Elk muurpaneel sluit warmteverlies en tochtgevoelige koudebruggen feilloos uit.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zo geniet u van een binnentemperatuur die in de winter erg behaaglijk blijft, en zomers heerlijk koel aanvoelt. Klaar voor de toekomst.
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
              VEELGESTELDE VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen over <br />
              uitbouwen in Bergen op Zoom
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
                Klaar voor meer <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  leefruimte thuis?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Deel uw unieke wensen met ons, dan bekijken we geheel vrijblijvend de opties en een betrouwbare indicatie op maat.
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

    </div>
  );
}
