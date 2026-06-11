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

export default function OssLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Oss | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Oss laten bouwen? Lees alles over prefab uitbouw: vergunning, het welstandsvrije beleid, kosten, bouwtijd en regels per wijk en kern. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Oss
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-oss-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/oss",
          "url": "https://www.prefabselect.nl/regio/oss",
          "name": "Uitbouw in Oss | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Oss laten bouwen? Lees alles over prefab uitbouw: vergunning, het welstandsvrije beleid, kosten, bouwtijd en regels per wijk en kern. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Oss", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Oss", "item": "https://www.prefabselect.nl/regio/oss" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/oss#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Oss?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Oss is bovendien grotendeels welstandsvrij. Uitzonderingen zijn de beschermde stadsgezichten van Ravenstein en Megen en monumenten; daar is wel een vergunning nodig."
              }
            },
            {
              "@type": "Question",
              "name": "Wat betekent welstandsvrij bouwen in Oss?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Met het beleid 'Samen bouwen aan een mooi Oss' is het grootste deel van de gemeente welstandsvrij: uw bouwplan wordt niet vooraf op uiterlijk getoetst. In beschermde dorps- en stadsgezichten en bij monumenten geldt dit niet en kijkt de erfgoedcommissie wel mee."
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
              "name": "Wat kost een uitbouw in Oss ongeveer?",
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
      const existingScript = document.getElementById('json-ld-oss-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'Samen brengen we uw woning, uw wensen en de mogelijkheden op uw plek in kaart. U ontvangt een ontwerp met een transparante oferte.'
    },
    {
      nr: '2',
      title: 'Vergunning Behandelen',
      desc: 'Valt uw plan buiten de vrijstelling? Dan regelen en begeleiden wij de complete omgevingsvergunning aanvraag bij de gemeente Oss.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'Terwijl het papierwerk loopt, fabriceren we alle elementen op maat in onze geconditioneerde werkplaats — geheel zonder hinder aan uw huis.'
    },
    {
      nr: '4',
      title: 'Grondwerk & Montage',
      desc: 'Eerst wordt de fundering gemaakt, daarna volgt de razendsnelle plaatsing. De ruwbouw is doorgaans binnen een dag een feit.'
    },
    {
      nr: '5',
      title: 'Afwerking & Oplevering',
      desc: 'In een paar dagen wordt alles nauwkeurig afgemonteerd, perfect aangesloten, opgeruimd en wind- en waterdicht aan u opgeleverd.'
    }
  ];

  const wijken = [
    { name: 'Ussen & Ruwaard', desc: 'Sfeervolle, ruime stadswijken waar u optimaal profiteert van het welstandsvrije beleid en uitbouwen tot 4 meter diep soepel geplaatst kunnen worden.' },
    { name: 'Schadewijk & Oss-Zuid', desc: 'Solide tweekappers en gezinswoningen waar we met prefab modules snel en efficiënt veel extra leefoppervlakte toevoegen.' },
    { name: 'Berghem & Geffen', desc: 'Omliggende kernen met royale tuinen en percelen, wat zorgt voor een makkelijke logistieke aanvoer en ideaal is voor een riante aanbouw.' },
    { name: 'Lith, Herpen & Oijen', desc: 'Prachtige landelijke dorpen langs de Maas met diepe achtertuinen waar woningen direct verbonden kunnen worden met het buitenleven.' },
    { name: 'Ravenstein & Megen', desc: 'Historische vestingstadjes met een beschermd stadsgezicht. Hier gelden strikte erfgoedeisen en leveren we prachtig ontworpen maatwerk.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Oss?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Oss is bovendien grotendeels welstandsvrij. Uitzonderingen zijn de beschermde stadsgezichten van Ravenstein en Megen en monumenten; daar is wel een vergunning nodig. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Wat betekent welstandsvrij bouwen in Oss?',
      answer: 'Met het beleid "Samen bouwen aan een mooi Oss" toetst de gemeente in het grootste deel van het gebied uw bouwplan niet vooraf op het uiterlijk. Dat geeft u meer vrijheid en voorkomt vertraging. In beschermde dorps- en stadsgezichten en bij monumenten geldt dit niet en kijkt de erfgoedcommissie wel mee.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De mechanische ruwbouw staat in veruit de meeste situaties binnen slechts één dag op zijn plek. Inclusief de bodemfundering en de complete binnen- en buitenafwerking mag u rekenen op zo\'n enkele dagen tot een week werk op locatie, met een totale doorlooptijd van 4 tot 8 weken vanaf ontwerp.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Absoluut. Doordat we de bouwdelen onder perfecte fabriekskwaliteit en droge omstandigheden fabriceren, sluiten we foutmarges uit. U kiest zelf de gevelafwerking: van hypermodern glas en stucwerk tot traditioneel handgebakken metselwerk passend bij uw bestaande woning.'
    },
    {
      question: 'Wat kost een uitbouw in Oss ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer €2.500 tot €4.500 per vierkante meter, sterk bepaald door de luxe van uw afwerking (bijv. een glazen schuifpui of vloerverwarming). Voor een compacte uitbouw start het traject vanaf ca. €40.000.'
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
            <span className="text-blue-300">Oss</span>
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
                    PREFAB SELECT MAASLAND — OSS
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Oss <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    ruimer wonen in het hart van het
                  </span> <br />
                  Maasland
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Oss is een stad met de mouwen opgestroopt: nuchter, praktisch en met genoeg ruimte om te leven. Maar groeit het gezin of verandert de manier waarop u uw huis gebruikt, dan kan zelfs een ruime woning krap worden. Een prefab uitbouw of aanbouw lost dat vakkundig en snel op.
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
                    src="https://i.imgur.com/zfWAbPd.jpeg" 
                    alt="Oss Prefab Uitbouw" 
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
                UITBREIDEN IN PLAATS VAN VERHUIZEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Liever slim uitbreiden <br />
                <span className="text-blue-600 italic font-light lowercase">
                  dan overhaast vertrekken
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Veel huiseigenaren in Oss lopen vroeg of laat tegen hetzelfde aan: de woning voldoet prima, maar er mist net die ene ruimte. Een leefkeuken waar iedereen samenkomt, een werkkamer die echt af te sluiten is, of gewoon een grotere living.
                </p>
                <p>
                  Verhuizen is een grote stap — en in de huidige woningmarkt ook een kostbare. Een prefab uitbouw biedt uitkomst: u verlengt de begane grond naar achteren en creëert nauwkeurig en doeltreffend de meters die u wenst, in de buurt waar u zich al jaren thuis voelt.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                De voordelen op een rij
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Ontdek de kracht van ons innovatieve modulaire droogbouwsysteem:
              </p>
              <ul className="space-y-4">
                {[
                  'Binnen 1 dag wind- en waterdicht gemonteerd op locatie',
                  'Grotendeels welstandsvrij vergunningsvrij bouwen in Oss',
                  'Geen maandenlange overlast, stof of weersvertragingen',
                  'Klassieke of hypermoderne gevelafwerking naar eigen smaak'
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
                  src="https://i.imgur.com/KVe1M9A.jpeg" 
                  alt="Prefab Select Fabriek" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZACHTE AMBACHTSPRECISIE
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Hoe werkt prefab bouwen <br />
                <span className="text-blue-600 italic font-light lowercase">
                  in onze moderne fabriek?
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Bij een traditionele verbouwing gebeurt alles steen-voor-steen in de buitenlucht. Bij Prefab Select draaien we het proces om voor de ultieme weers- en kwaliteitsgarantie. 
                </p>
                <p>
                  Wanden, dakconstructies, isolatielagen en kozijnen worden vooraf op de millimeter nauwkeurig gefabriceerd in onze droge, goed verlichte werkplaats. Terwijl wij bouwen, leggen wij bij u thuis snel het grondwerk en de fundering klaar. De feitelijke montage is daarna snel en brandschoon geklaard.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VERGUNNINGEN OSS */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                WELSTANDSVRIJE GEMEENTE OSS
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunningen in Oss <br />
                <span className="text-blue-400 italic font-light lowercase">
                  vaak verrassend soepel geregeld
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Oss heeft fantastisch nieuws voor wie wil uitbreiden. Met het vooruitstrevende lokale beleid &ldquo;Samen bouwen aan een mooi Oss&rdquo; is het grootste deel van de gemeente volledig welstandsvrij. Uw bouwplan hoeft dus niet vooraf op uiterlijke details te worden getoetst.
                </p>
                <p>
                  Uitzonderingen hierop zijn erfgoedmonumenten en de historische beschermde stadsgezichten van <strong>Ravenstein</strong> en <strong>Megen</strong>. Daar kijken de experts van de erfgoedcommissie wel zorgvuldig mee. Wij ontwerpen passend binnen elk regime!
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
                Laat ons uw adres gratis checken
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Wilt u er zeker van zijn of uw plan vergunningsvrij geplaatst mag worden in uw stadsdeel of dorpskern? Ons team voert snel een gedetailleerde controle voor u uit.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Start vrijblijvende check <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              REËEL KOSTENOVERZICHT
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Oss?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              De finishing touch (zoals de exacte kozijnkeuzes, vloerverwarming of een complete glazen pui) bepaalt de uiteindelijke calculatie net zozeer als de vierkante meters. Onze reële richtprijzen voor 2025/2026:
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
            * Dit betreft landelijke richtbedragen incl. btw en installatie. De unieke rivierklei-bodem in het Maasland vraagt gedegen funderingsberekening welke we altijd op maat verzorgen.
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
              Het bouwtraject van begin tot eind <br />
              <span className="text-blue-600 italic font-light lowercase">
                zonder chaos en bouwoverlast
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
              Uitbouwen per wijk en kern in Oss
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              De gemeente Oss is groot en gevarieerd. Dat bepaalt mede welke logistieke en vergunningsgrenzen voor uw situatie van toepassing zijn:
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

      {/* ADDITIONAL ANALYSIS MODULES */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Box 1 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">STRATEGIC SELECTION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een aanbouw de juiste keuze?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zit uw ruimtetekort hoofdzakelijk op de begane grond (zoals een te krappe woonkeuken of speelhoek)? Dan is een uitbouw of aanbouw de meest logische stap.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u juist een extra slaapkamer of werkkamer op een bovenverdieping? Dan is een prefab dakkapel of complete dakopbouw vaak de betere optie. We lichten deze afwegingen graag eerlijk toe.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Goed voorbereid van start gaan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zorg dat u zaken als uw erfgrens (altijd goed afstemmen met de buren), de stabiliteit van de bodem, en de logistieke aanvoerroutes vroeg in beeld heeft.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze adviseurs lopen deze 4 essentiële stappen standaard met u door voordat we de productie in onze fabriek starten, om verrassingen te voorkomen.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht binnenhalen via glas en lichtstraten
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een uitbouw verandert niet alleen uw plattegrond, maar vooral de sfeer in huis. Tradionele woningen kunnen binnenshuis somber of diep gesitueerd zijn.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dankzij een royale glazen achterpui, tuindeuren of een luxe lichtstraat op het platte dak stroomt het daglicht rijkelijk binnen. Uw tuin wordt een natuurlijk verlengstuk van uw living.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Het hele jaar comfortabel &amp; behaaglijk wonen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een slecht geïsoleerde uitbouw voelt in de wintermaanden koud of tochtig aan. Onze hoogwaardig geïsoleerde prefab elementen bieden uitstekende thermische prestaties.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zo geniet u van een binnentemperatuur die het hele jaar door aangenaam stabiel blijft, terwijl u tevens bespaart op uw energielasten. Koel in de zomer, behaaglijk in de winter.
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
              ANTWOORDEN EN REGELGEVING
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in Oss
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
                Deel uw unieke wensen met ons, dan bekijken we geheel vrijblijvend de opties en een betrouwbare prijsindicatie op maat.
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
          <h1>Uitbouw in Oss — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Oss en omgeving, inclusief de kernen Berghem, Geffen, Herpen, Lith, Oijen, Ravenstein en Megen. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Oss is grotendeels welstandsvrij dankzij het beleid "Samen bouwen aan een mooi Oss"; in de beschermde stadsgezichten van Ravenstein en Megen en bij monumenten gelden strengere eisen.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject duurt vier tot acht weken. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
