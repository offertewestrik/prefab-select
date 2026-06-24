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

export default function LarenLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Laren | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Laren ('t Gooi) laten bouwen? Lees alles over prefab uitbouw: vergunning via de BEL Combinatie, het beschermde dorpsgezicht, welstand, kosten en bouwtijd. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Laren
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-laren-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/laren",
          "url": "https://www.prefabselect.nl/regio/laren",
          "name": "Uitbouw in Laren | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Laren ('t Gooi) laten bouwen? Lees alles over prefab uitbouw: vergunning via de BEL Combinatie, het beschermde dorpsgezicht, welstand, kosten en bouwtijd. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Laren", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Laren", "item": "https://www.prefabselect.nl/regio/laren" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/laren#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Laren?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In het beschermde dorpsgezicht van Laren en bij monumenten kan zelfs een normaal vergunningsvrije uitbouw toch vergunningsplichtig zijn, en wordt elk plan aan de welstandscommissie voorgelegd. Doe altijd de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Hoe streng is de welstand in Laren?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Laren hanteert een relatief streng welstandsbeleid om het groene, dorpse karakter te beschermen. De gemeente is terughoudend met uitzonderingen op de welstandseisen. In het beschermde dorpsgezicht gaan alle aanvragen naar de welstandscommissie."
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
              "name": "Wat kost een uitbouw in Laren ongeveer?",
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
      const existingScript = document.getElementById('json-ld-laren-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Maatwerk & Concept',
      desc: 'We bekijken uw woning, bespreken uw wensen en de unieke aspecten van uw kavel. U ontvangt een schetsontwerp inclusief een heldere, vaste offerte.'
    },
    {
      nr: '2',
      title: 'Vergunning & Welstand',
      desc: 'In het beschermde dorpsgezicht of de villawijken verzorgen wij de complete omgevingsvergunning en welstandtoets via de BEL Combinatie.'
    },
    {
      nr: '3',
      title: 'Geprefabriceerde Productie',
      desc: 'We bouwen uw uitbouw millimeterprecies op in onze droge, gecontroleerde werkplaats. Zo sluiten we alle weerrisico’s en bouwfouten uit.'
    },
    {
      nr: '4',
      title: 'Fundering & Montage',
      desc: 'We leggen een degelijke schroeffundering aan (ideaal t.b.v. de Gooise zandgronden), waarna we de gehele uitbouw binnen één dag hijsen en installeren.'
    },
    {
      nr: '5',
      title: 'Luxe Afwerking',
      desc: 'We sluiten installaties, beglazing, eventuele vloerverwarming of lichtstraten vakkundig aan. Uw leefruimte is schitterend en direct bewoonbaar.'
    }
  ];

  const wijken = [
    { name: 'Historisch Centrum & Brink', desc: 'Sfeervolle straatjes met monumentale panden en het rijksbeschermde dorpsgezicht; hier ontwerpen we met uiterste esthetische zorg conform de historische esdorpstructuur.' },
    { name: 'Villabuurten & Laren-Oost', desc: 'Lommerrijke lanen met royale kaveloppervlaktes; hier is veel fysieke ruimte voor weelderige, lichte uitbouwen met prachtige open glasgevels richting de tuin.' },
    { name: 'BEL-Regio (Blaricum & Eemnes)', desc: 'Als onderdeel van de BEL Combinatie begeleiden we ook in deze buurgemeenten succesvolle vergunningsprocedures voor eveneens hoogwaardige en groene woonomgevingen.' },
    { name: 'Zevenend & Omgeving', desc: 'Heerlijke gezinswijken waar een extra grote leefkeuken of overzichtelijk thuiskantoor direct zorgt voor veel extra comfort en een aanzienlijke waardevermeerdering.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Laren?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In het beschermde dorpsgezicht van Laren en bij monumenten kan een normaal vergunningsvrije uitbouw toch vergunningsplichtig zijn, en wordt elk plan aan de welstandscommissie voorgelegd. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Hoe streng is de welstand in Laren?',
      answer: 'Laren hanteert een relatief streng welstandsbeleid om het groene, dorpse karakter te beschermen. De gemeente is terughoudend met uitzonderingen op de welstandseisen. In het beschermde dorpsgezicht gaan alle aanvragen naar de welstandscommissie.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De ruwbouw staat meestal binnen één dag wind- en waterdicht op locatie gemonteerd. Inclusief grondwerk, fundering en de fijne afwerking bent u doorgaans binnen een week helemaal klaar op locatie.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Absoluut. Doordat we onder perfecte, droge fabriekskwaliteit produceren, sluiten we foutmarges uit. U kiest bovendien zelf uw gewenste stijl: van een ultramoderne glazen vouwpui tot traditioneel handgebakken metselwerk passend bij een Gooise villa.'
    },
    {
      question: 'Wat kost een uitbouw in Laren ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer €2.500 tot €4.500 per vierkante meter, afhankelijk van de luxegraad, funderingsvereisten en afwerking. Een compact project begint rond de €40.000. Een offerte op maat geeft het exacte bedrag.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="laren-landing-page">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden bg-blue-950" id="hero-section">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/85 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/40 mb-8" id="breadcrumbs">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/diensten" className="hover:text-white transition-colors">Regio's</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">Laren</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Left */}
            <div className="lg:col-span-7" id="hero-left-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-3 mb-6 bg-blue-900/40 border border-blue-500/20 rounded-full px-4 py-2" id="hero-badge">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300">
                    PREFAB SELECT LAREN
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Uitbouw in Laren <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    meer ruimte in het groenste
                  </span> <br />
                  dorp van 't Gooi
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans" id="hero-description">
                  Laren staat bekend om zijn rustige lanen, beeldbepalende Brink en royale tuinen. Mocht u extra woonoppervlakte nodig hebben, dan biedt een prefab uitbouw of aanbouw van Prefab Select de ideale en verantwoorde kwaliteitsoplossing om volop te kunnen blijven genieten van uw geliefde plek.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12" id="hero-ctas">
                  <Link 
                    to="/offerte" 
                    id="hero-primary-btn"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Vraag direct een offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a 
                    href="#faq" 
                    id="hero-secondary-btn"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Veelgestelde Vragen
                  </a>
                </div>

                {/* Micro USPs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10" id="micro-usps">
                  <div className="flex items-center gap-3" id="usp-duration">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Timer size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Ruwbouw in 1 dag</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale hinder t.o.v. traditionele bouw</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-security">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Duidelijkheid Vooraf</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste, transparant geoffreerde prijzen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-isolation">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">High-End Isolatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Uitmuntende Rc 6.0 thermische waarde</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0" id="hero-right-visual">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl -z-10" />

                {/* Main image container */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative" id="hero-image-container">
                  <img 
                    src="https://i.imgur.com/dpcIuVA.jpeg" 
                    alt="Laren Prefab Uitbouw" 	
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Badge layout */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10" id="hero-percent-badge">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Smaakvolle Integratie
                  </span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* INTRODUCTION STORY */}
      <section className="py-24 md:py-32 bg-white" id="introduction-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-xl" id="intro-left-text">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                RUIMER TEVREDEN IN DE VERTROUWDHEID VAN 'T GOOI
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Blijven waar u woont, <br />
                <span className="text-blue-600 italic font-light lowercase">
                  met alle gewenste ruimte
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Of u nu gezellig rond de Brink resideert, of geniet van de weidsheid van de villabuurten: Laren is een unieke woonomgeving. Een verhuizing binnen het Gooi is echter kostbaar en leidt vaak tot compromissen.
                </p>
                <p>
                  Met een hoogwaardige prefab uitbouw van Prefab Select kiest u voor een substantiële en esthetisch geslaagde vergroting van uw gelijkvloers. Dat vertaalt zich niet alleen direct in ultiem dagelijks levenscomfort, maar vormt ook een solide waardevermeerdering van uw woning.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="intro-right-benefits">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                De overtuigende voordelen
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Ervaar de voordelen van onze vooruitstrevende prefab-technologie:
              </p>
              <ul className="space-y-4" id="benefits-list">
                {[
                  'Binnen 1 dag op locatie opgebouwd, wind- en waterdicht',
                  'Optimale gevelisolatie conform de energie-eisen',
                  'Foutloze millimeterkwaliteit dankzij droge fabrieksproductie',
                  'Zorgvuldig afgestemd gevelontwerp passend binnen Larense welstand'
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
      <section className="py-24 bg-slate-50/50 border-y border-slate-100" id="prefab-process-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5" id="process-visual">
              <div className="rounded-[3.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="https://i.imgur.com/oMxZxiY.jpeg" 
                  alt="Prefab Select Fabriek Laren" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7" id="process-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                SNAK NAAR STRUCTUUR EN EXTRA LICHT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Modulair bouwen is <br />
                <span className="text-blue-600 italic font-light lowercase">
                  het slimme alternatief
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  In onze modern ingerichte werkplaats worden wandsegmenten, ramen en kozijnen compleet droog voorgemonteerd. Dit voorkomt drogingsrisico’s, constructiefoutjes en weersinvloeden.
                </p>
                <p>
                  Ondertussen treffen wij bij u in Laren de nodige funderingsvoorbereidingen. Op de plaatsingsdag rijst de uitbouw binnen een mum van tijd op, waardoor de open-geveltijd en de bouwerij in uw tuin tot een absoluut minimum beperkt blijven.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGIMES & WELSTAND laren */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]" id="welstand-laren-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7" id="welstand-laren-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                ZORGVULDIGE GEMEENTELIJK CONTEXT EN ARCHITECTUUR
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Larense Welstand &amp; <br />
                <span className="text-blue-400 italic font-light lowercase">
                  de BEL Combinatie ontleed
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Om het dorpse en groene sfeerbeeld van Laren te behoeden, gelden er strikte welstandsrichtlijnen. Veel delen in de kern vallen binnen het <strong>beschermde dorpsgezicht</strong>, wat betekent dat plannen zorgvuldig worden getoetst door de welstandscommissie van de <strong>BEL Combinatie</strong>.
                </p>
                <p>
                  Of uw plan meldingsplichtig is of een omgevingsvergunning vereist: Prefab Select bezit jarenlange ervaring met deze Gooise procedures. Wij stemmen de materialisering, kleurstellingen en glasdetails feilloos af op de gemeentelijke ambities, voor een zekere en snelle doorgang.
                </p>
              </div>

              <div className="mt-10" id="welstand-ctas">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Start de Vergunningscheck <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10" id="free-check-card">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis controleren
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Benieuwd welk welstandsregime er op uw specifieke Larense kavel van toepassing is en wat de mogelijkheden zijn? Ons team zoekt het vlot en gratis voor u uit.
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
      <section className="py-24 md:py-32 bg-white" id="cost-analysis-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="cost-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              KOSTEN EN CALCULATIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Laren?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw luxepreferences en dimensionering (zoals vouwpuien, extra isolatie of lichtstraten) bepalen de eindcalculatie. Lokale richtprijzen:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10" id="cost-table">
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

          <p className="text-[11px] text-slate-400 font-semibold text-center leading-relaxed" id="cost-footer-note">
            * Dit betreft indicatieve richtbedragen incl. btw en installatie. De Gooise zandgronden vormen een ideale bodem voor de fundering, wat zich vertaalt in een vlottere grondfase.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100" id="steps-process-section">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left" id="steps-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOZE REALISATIE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uw bouwtraject stap-voor-stap <br />
              <span className="text-blue-600 italic font-light lowercase">
                geheel gestructureerd en ontzorgd
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8" id="steps-grid">
            {stappen.map((stap, i) => (
              <div key={i} className="relative" id={`step-item-${stap.nr}`}>
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
      <section className="py-24 bg-white" id="districts-section">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16 text-left" id="districts-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              LOKALE ANALYSE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uitbouwen per wijk in Laren
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Laren kent een gevarieerde en lommerrijke structuur. Dit stelt specifieke logistieke en welstandseisen aan uw ontwerp:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="districts-grid">
            {wijken.map((wk, i) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100/80 rounded-[2rem] p-8 hover:bg-slate-50 transition-colors" id={`district-card-${i}`}>
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
      <section className="py-24 bg-slate-50/30 border-y border-slate-100" id="additional-analysis-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="analysis-grid">
            
            {/* Box 1 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">STRATEGIC SELECTION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een aanbouw de juiste keuze voor uw woonsituatie?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Als u extra leefruimte wenst op de begane grond (om een royale leefkeuken of lichte tuinkamer te realiseren), dan is een uitbouw veruit de meest gewilde en waardevaste ingreep.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u specifiek naar een extra slaap- of badkamer op de verdieping boven? Dan is een prefab dakkapel of dakopbouw een meer gerichte oplossing. Wij adviseren u graag volkomen objectief.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Nauwkeurig en veilig voorbereid zijn
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Het is belangrijk om vooraf zaken als de exacte erfgrenzen, de logistieke aanvoerroutes over uw kavel en de funderingsstabiliteit helder in kaart te brengen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze constructieve engineers en architecten lopen deze kritieke randvoorwaarden grondig met u door voordat we tot productie overgaan om alle risico’s uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht optimaliseren en optisch vergroten
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw levert niet alleen pure meters leefoppervlakte op, maar brengt ook sfeer. Gooise woningen liggen soms verscholen in weelderig, hoog groen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een riante glazen achtergevel, vouwpuien of een royale lichtstraat in het platte dak herbergt u het natuurlijke daglicht diep binnenshuis en verbindt u de tuin optimaal met uw living.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Royaal comfort &amp; uitstekende isolatiewaarden
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Onze geavanceerde prefab uitbouwen herbergen uitmuntende isolatiewaarden tot Rc 6.0 om tocht, kou en warmteverlies effectief te minimaliseren.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dat betekent gelijkmatig en comfortabel wonen in elk seizoen met een direct merkbare stroom- en stookbesparing. Uitstekend te combineren met vloerverwarming of warmtepomp-oplossingen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20" id="faq-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              REGELGEVING EN VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in Laren
            </h2>
          </div>

          <div className="space-y-4" id="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100/80 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300"
                  id={`faq-item-${idx}`}
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
      <section className="py-24 pt-0" id="final-cta-section">
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
                Deel uw unieke woonsituatie en plannen met ons, dan calculeren en adviseren we geheel vrijblijvend om uw wooncomfort te maximaliseren.
              </p>

              <Link 
                to="/offerte" 
                id="final-cta-btn"
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
          <h1>Uitbouw in Laren — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Laren ('t Gooi) en omgeving, waaronder Blaricum en Eemnes (BEL Combinatie). Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. In het beschermde dorpsgezicht van Laren en bij monumenten kan een uitbouw toch vergunningsplichtig zijn en gaat elk plan naar de welstandscommissie. Laren hanteert een streng welstandsbeleid om het groene dorpskarakter te beschermen.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject duurt vier tot acht weken. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
