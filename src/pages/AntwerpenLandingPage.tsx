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

export default function AntwerpenLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Antwerpen | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Antwerpen laten bouwen? Lees alles over prefab uitbouw: omgevingsvergunning of melding, de 40 m²-regel, de Antwerpse bouwcode, kosten en bouwtijd. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Antwerpen
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-antwerpen-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/antwerpen",
          "url": "https://www.prefabselect.nl/regio/antwerpen",
          "name": "Uitbouw in Antwerpen | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Antwerpen laten bouwen? Lees alles over prefab uitbouw: omgevingsvergunning of melding, de 40 m²-regel, de Antwerpse bouwcode, kosten en bouwtijd. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-BE",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Antwerpen", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Antwerpen", "item": "https://www.prefabselect.nl/regio/antwerpen" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/antwerpen#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Antwerpen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Een uitbouw vergroot het volume van uw woning en is in Vlaanderen in principe vergunningsplichtig via het Omgevingsloket. Voor een kleine, aangebouwde uitbouw of veranda aan de achterkant kan onder voorwaarden een melding volstaan, met een maximum van 40 m² aangebouwde bijgebouwen per woning. Daarnaast moet uw plan voldoen aan de Antwerpse bouwcode. Laat uw situatie altijd vooraf nakijken."
              }
            },
            {
              "@type": "Question",
              "name": "Heb ik een architect nodig voor een uitbouw in Antwerpen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, in Vlaanderen is een architect verplicht zodra er een omgevingsvergunning nodig is of zodra de werken de stabiliteit van de woning raken — ook bij een melding. Voor volledig vergunningsvrije werken zonder stabiliteitsingreep is een architect niet verplicht, maar wel aan te raden."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het plaatsen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat meestal binnen één dag. Inclusief fundering en afwerking rekent u op enkele dagen tot een week op locatie. De totale doorlooptijd hangt sterk af van de vergunningsprocedure bij de stad Antwerpen."
              }
            },
            {
              "@type": "Question",
              "name": "What kost een uitbouw in Antwerpen ongeveer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reken ter indicatie op ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van de afwerking. Een compacte uitbouw begint rond de € 40.000. Een offerte op maat geeft het exacte bedrag voor uw woning."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-antwerpen-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'Samen analyseren we uw woning, uw wensen en de logistieke mogelijkheden. Onze architecten vertalen dit naar een gedetailleerd ontwerp.'
    },
    {
      nr: '2',
      title: 'Vergunning & Melding',
      desc: 'Wij verzorgen de complete stedenbouwkundige meldingsprocedure of omgevingsvergunning aanvraag via het Vlaamse Omgevingsloket.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'In onze geclimatiseerde fabriekshal fabriceren we alle elementen tot op de millimeter precies. Absoluut droog, gecontroleerd en foutloos.'
    },
    {
      nr: '4',
      title: 'Grondwerk & Montage',
      desc: 'Na het voorbereiden van de stabiele fundering op locatie, wordt de complete uitbouw binnen slechts één dag wind- en waterdicht gemonteerd.'
    },
    {
      nr: '5',
      title: 'Afwerking & Oplevering',
      desc: 'Onze vakmensen werken de aanbouw vanbinnen en vanbuiten perfect af. Uw compleet nieuwe leefruimte is onmiddellijk klaar voor gebruik.'
    }
  ];

  const wijken = [
    { name: 'Antwerpen-Centrum & ' + "'t Zuid", desc: 'Historische buurten, statige herenhuizen en authentieke gevels met strenge erfgoed- en welstandsbepalingen; ideaal voor op maat ontworpen prefab elementen die via een precisiekraan worden gemonteerd.' },
    { name: 'Berchem & Borgerhout', desc: 'Dichtbebouwde, trendy wijken met karakteristieke rijhuizen en knusse stadstuinen of koeren; hier maximaliseren we het daglicht door lichte glazen vouwpuien en elegante lichtstraten.' },
    { name: 'Deurne & Merksem', desc: 'Gezinswijken met ruime tuinen, ideale logistieke aanvoerroutes en perfecte mogelijkheden om de begane grond fors uit te breiden zonder ingrijpende vergunningstrajecten.' },
    { name: 'Wilrijk, Hoboken & Ekeren', desc: 'Groene en dynamische districten met grotere villapercelen en tweekappers, waar we met een royale leefkeuken of lichte tuinkamer direct extra waarde en comfort realiseren.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Antwerpen?',
      answer: 'Ja, een uitbouw verandert het volume van uw woning en is in Vlaanderen in principe vergunningsplichtig via het Omgevingsloket. Voor een kleine, aangebouwde uitbouw aan de achterzijde kan onder voorwaarden een melding volstaan (de 40 m²-regel voor aangebouwde bijgebouwen). Tevens gelden de specifieke bepalingen uit de Antwerpse bouwcode.'
    },
    {
      question: 'Is een architect verplicht voor een uitbouw in Antwerpen?',
      answer: 'In Vlaanderen is de medewerking van een architect wettelijk verplicht zodra er een omgevingsvergunning nodig is of wanneer de ingreep invloed heeft op de stabiliteit van het gebouw (zoals het maken van een brede gevelopening). Wij werken nauw samen met ervaren architecten om dit traject volledig voor u te verzorgen.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De mechanische opbouw op uw locatie gebeurt in veruit de meeste gevallen in slechts één dag. De ruwbouw staat direct wind- en waterdicht. Inclusief grondwerk vooraf en de fijne afwerking naderhand bent u binnen enkele dagen tot een week helemaal klaar.'
    },
    {
      question: 'Wat als ik geen achterom heb of mijn straat smal is?',
      answer: 'Dit is een veelvoorkomende situatie in Antwerpse districten zoals Berchem of Borgerhout. Wij herbergen alle benodigde kennis op het gebied van kraandoorvoer. Met gespecialiseerde telescoopkranen hijsen we de gecontroleerd gefabriceerde wanden en daken veilig over de bestaande dakconstructie heen.'
    },
    {
      question: 'Wat kost een prefab uitbouw in Antwerpen gemiddeld?',
      answer: 'Hou rekening met een gemiddelde richtprijs van €2.500 tot €4.500 per vierkante meter, sterk afhankelijk van de luxegraad, funderingsvereisten en de keuze voor beglazing of metselwerk. Grote glaspuien en vloerverwarming beïnvloeden de calculatie, maar worden vooraf direct transparant geoffreerd.'
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
            <span className="text-blue-300">Antwerpen</span>
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
                    PREFAB SELECT ANTWERPEN
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Antwerpen <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    meer leefruimte in uw eigen
                  </span> <br />
                  vertrouwde stad
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Antwerpse woningen ademen authenticiteit en charme, maar missen soms de benodigde meters leefoppervlakte. Onze prefab uitbouwen herbergen een snelle, perfect geïsoleerde en uiterst vakkundige uitbreiding van uw gelijkvloers — zonder de rompslomp van een traditionele verhuizing.
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
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Montage in 1 dag</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale verstoring in nauwe straten</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Volledig Conform</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vlaamse wetgeving en bouwcode</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Premium Isolatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimaal RC 6.0 thermische waarde</p>
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
                    src="https://i.imgur.com/KVe1M9A.jpeg" 
                    alt="Antwerpen Prefab Uitbouw" 
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
                ZONDER VERHUISPERIKELEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Groeien op de plek <br />
                <span className="text-blue-600 italic font-light lowercase">
                  waar u al helemaal thuis bent
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Of u nu in Berchem, Deurne of op 't Zuid resideert: wonen in de Antwerpse metropool is fantastisch. Echter kan de behoefte ontstaan aan een riante leefkeuken, een rustig thuiskantoor of een bredere living voor de opgroeiende kinderen.
                </p>
                <p>
                  Een groter huis kopen brengt registratierechten, notariskosten en zware verhuisstress met zich mee. Met de prefab aanbouwen van Prefab Select breidt u op een verantwoorde manier uw gelijkvloers uit. Dat levert direct woongenot op én is een beproefde investering in de waarde van uw eigendom.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                De voordelen van prefab bouwen
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Ontdek waarom steeds meer eigenaren kiezen voor onze modulaire bouwmethodiek:
              </p>
              <ul className="space-y-4">
                {[
                  'Binnen 1 dag op locatie geplaatst, wind- en waterdicht',
                  'Optimale voorbereiding zonder maandenlange steigeroverlast',
                  'Uiterst strakke en gegarandeerde kwaliteit uit onze fabriek',
                  'Eigentijdse gevelafwerking afgestemd op de Antwerpse bouwcode'
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
                  src="https://i.imgur.com/heZUGaD.jpeg" 
                  alt="Prefab Select Fabriek Antwerpen" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                MODERNE EN DROGE CONSTRUCTIE
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Gefabriceerd onder <br />
                <span className="text-blue-600 italic font-light lowercase">
                  perfect gecontroleerde condities
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Regen, vrieskou of droogtijden hebben geen invloed op ons werkproces. De wanden, kozijnen en dakelementen worden in onze modern uitgeruste fabriekshal tot op de millimeter nauwkeurig gemonteerd.
                </p>
                <p>
                  Tegelijkertijd bereiden we de fundering in uw achtertuin voor. Op de montagedag hijsen en plaatsen we de volledige ruwbouw in een recordtempo. Dit minimaliseert stof, geluidshinder en bouwveleiligheidsrisico's.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGULATION & ARCHITECT antwerpen */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                STEDENBOUWKUNDIGE VOORSCHRIFTEN IN VLAANDEREN
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunning, Melding <br />
                <span className="text-blue-400 italic font-light lowercase">
                  &amp; de Antwerpse Bouwcode herleid
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Een uitbreiding van uw woningvolume is in Vlaanderen in principe onderhevig aan de meldingsplicht of een volledige omgevingsvergunning via het <strong>Vlaamse Omgevingsloket</strong>. Afhankelijk van de oppervlakte (er geldt een 40 m²-limiet voor aangebouwde bijgebouwen) kan een melding volstaan.
                </p>
                <p>
                  Daarnaast dient elk plan zorgvuldig getoetst te worden aan de specifieke gemeentelijke regelgeving zoals de <strong>Antwerpse Bouwcode</strong>. Omdat stabiliteitswerken (zoals het creëren van een open achtergevel) invloed hebben op de constructie, is bovendien de medewerking van een architect wettelijk vereist. Prefab Select leidt dit complexe proces met kennis van zaken in goede banen.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgeving.antwerpen.be/vergunning-nodig" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Controleer vergunning bij de Stad <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis checken
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Meldingsplichtig, vergunningplichtig of specifieke bouwvoorschriften? Ons team in samenwerking met onze architecten zoekt het snel en kosteloos voor u uit.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Start de gratis check <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              Wat kost een uitbouw in Antwerpen?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw gewenste afwerking (denk aan een telescoopkraan om over het dak te hijsen, en heipalen t.b.v. de Utrechtse veengrond) bepalen de calculatie:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Indicatieve Richtprijs</span>
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
            * Dit betreft richtbedragen incl. btw en montage, exclusief notariskosten of architectenhonorarium. De bodemgesteldheid en logistieke complexiteit bepalen de uiteindelijke calculatie.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOOS BOUWEN
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Het complete traject stap-voor-stap <br />
              <span className="text-blue-600 italic font-light lowercase">
                zonder de gebruikelijke bouwchaos
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
              Uitbouwen per district in Antwerpen
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Elk Antwerps district herbergt een unieke typologie en specifieke bouwkundige en logistieke randvoorwaarden:
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
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">STRATEGIC SELECTION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een aanbouw de juiste keuze voor u?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Heeft u nood aan ruimte op het gelijkvloers (voor een riante keuken of speelhoek)? Dan is het verbreden of verlengen van uw woonst aan de achterzijde veruit de meest gewenste ingreep.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u echter een extra slaapkamer of badkamer hogerop? Dan is een prefab dakkapel of complete dakopbouw een meer rendabele en gerichte optie. Wij adviseren u hierin graag volkomen objectief.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Een vlekkeloze start garanderen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Vooral in Antwerpse rijwoningen zijn de exacte perceelsgrenzen, gemene muren en de logistieke bereikbaarheid via de lucht cruciale factoren.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze engineers en ontwerpers analyseren al deze randvoorwaarden grondig vooraf, om elk risico tijdens de montage uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Zonlicht vangen en optisch vergroten
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Antwerpse herenhuizen of rijwoningen kunnen van nature langwerpig en donkerder zijn gesitueerd omringd door dichte bebouwing.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dankzij een royale glazen achtergevel, openslaande deuren of een lichte lichtstraat trekt u het natuurlijke daglecht diep binnenshuis en verbindt u de tuin nauwer met uw leefwereld.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Het hele jaar rond comfortabel &amp; behaaglijk wonen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Kou, tocht of torenhoge stookkosten behoren definitief tot het verleden. Onze prefab uitbouwen beschikken over uitmuntende Rc-waarden tot 6.0.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze hoogwaardige materialen houden de binnentemperatuur perfect op peil en sluiten naadloos aan op moderne, energiezuinige installaties zoals vloerverwarming.
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
              over uitbouwen in Antwerpen
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
                Deel uw unieke woonsituatie en uw plannen met ons, dan berekenen en adviseren we geheel vrijblijvend t.b.v. een betrouwbare indicatie.
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
          <h1>Uitbouw in Antwerpen — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Antwerpen en omgeving, waaronder Berchem, Borgerhout, Deurne, Wilrijk, Hoboken en Ekeren. Een uitbouw vergroot uw woning aan de achterzijde, vaak via omgevingsvergunning of melding van stedenbouwkundige handelingen. In Vlaanderen geldt de 40 m²-regel voor aangebouwde bijgebouwen en is een architect in veel gevallen wettelijk verplicht om de stabiliteit en voorschriften inzake de Antwerpse bouwcode te bewaken.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject hangt mede af van de vergunningsprocedure via het Omgevingsloket. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
