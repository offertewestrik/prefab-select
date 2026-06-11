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

export default function RotterdamLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Rotterdam | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Rotterdam laten bouwen? Lees alles over prefab uitbouw: vergunning, de Welstandsnota en Koepelnota, beschermde stadsgezichten, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Rotterdam
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-rotterdam-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/rotterdam",
          "url": "https://www.prefabselect.nl/regio/rotterdam",
          "name": "Uitbouw in Rotterdam | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Rotterdam laten bouwen? Lees alles over prefab uitbouw: vergunning, de Welstandsnota en Koepelnota, beschermde stadsgezichten, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Rotterdam", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Rotterdam", "item": "https://www.prefabselect.nl/regio/rotterdam" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/rotterdam#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Rotterdam?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In de negen beschermde stadsgezichten van Rotterdam (zoals Provenierswijk, Delfshaven of Scheepvaartkwartier) en bij monumenten is altijd een vergunning nodig. Doe de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is de Welstandsnota Rotterdam?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dat is het uiterlijke kwaliteitsbeleid van de gemeente Rotterdam. Bouwplannen worden getoetst aan de criteria in deze nota; in beschermde stadsgebieden adviseert de commissie Welstand en Monumenten uitvoerig over kleuren, materialen en detaillering."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het plaatsen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat meestal binnen één dag wind- en waterdicht gemonteerd. Inclusief fundering, grondwerk en de fijne binnen- en buitenafwerking bent u doorgaans binnen een week helemaal klaar op locatie."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een uitbouw in Rotterdam ongeveer?",
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
      const existingScript = document.getElementById('json-ld-rotterdam-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Rotterdams Advies & Ontwerp',
      desc: 'We bekijken uw woning in Rotterdam, bespreken uw ruimteplannen en ontwerpen een uitbouw die esthetisch en constructief volledig klopt met de Rotterdamse bouwstijlen.'
    },
    {
      nr: '2',
      title: 'Vergunningscheck & Welstand',
      desc: 'Behoort uw kavel tot een van de 9 beschermde Haagse of Rotterdamse stadsgezichten? Wij verzorgen het volledige omgevingsplan- en welstandstraject.'
    },
    {
      nr: '3',
      title: 'Geclimatiseerde Prefabricage',
      desc: 'In onze droge fabriek worden daken, dakelementen, kozijnen en wanden millimeterprecies in elkaar gezet, vrij van weersinvloeden en droogtijden.'
    },
    {
      nr: '4',
      title: 'Stabiele Paalfunderig & Montage',
      desc: 'We dragen zorg voor een solide, diepe paal- of schroeffundatie berekend op de slappe kleibodems en hijsen de uitbouw in 1 enkele dag wind- en waterdicht op haar plek.'
    },
    {
      nr: '5',
      title: 'Afwerking & Sleuteloverdracht',
      desc: 'Beglazing, elektra, eventuele vloerverwarming of een luxe glazen achtergevel worden vakkundig geïnstalleerd. Uw nieuwe royale leefruimte is direct leefbaar.'
    }
  ];

  const wijken = [
    { name: 'Kralingen, Hillegersberg & Blijdorp', desc: 'Sfeervolle, herkenbare en gewilde wijken waar de welstandscommissie scherp toeziet op architectonische en esthetische synergie. Onze ontwerpen sluiten hier perfect bij aan.' },
    { name: 'Provenierswijk & Delfshaven', desc: 'Rotterdam telt unieke beschermde stadsgezichten. Hier is uiterst zorgvuldig maatwerk vereist. Wij nemen alle vergunningstrajecten deskundig voor u uit handen.' },
    { name: 'Nesselande, Prins Alexander & Hoek van Holland', desc: 'Modern ingerichte, ruime woonwijken met uitstekende achterom-mogelijkheden. Hier benutten we de vergunningsvrije limieten tot wel 4 meter extreem effectief.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Rotterdam?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In de negen beschermde stadsgezichten van Rotterdam (zoals Provenierswijk, Kralingen of Hillegersberg) en bij monumenten is altijd een vergunning nodig, ook voor uitbouwen aan de achterzijde.'
    },
    {
      question: 'Wat is de Welstandsnota Rotterdam?',
      answer: 'Dat is het uiterlijke kwaliteitsbeleid van de gemeente Rotterdam. Alle bouwaanvragen worden getoetst aan de criteria in deze nota en de bijbehorende Koepelnota. In de monumentale of esthetisch gevoelige zones adviseert de commissie Welstand en Monumenten uitvoerig.'
    },
    {
      question: 'Moet ik in Rotterdam speciaal letten op de fundering?',
      answer: 'Ja, absoluut. Rotterdam is gebouwd op een diepe en slappe veen- en kleibodem. Om zettingen en verzakkingen levenslang te voorkomen, is een solide en diepdragende paal- of schroeffundatie cruciaal. Wij plannen en berekenen dit vooraf volledig na.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De feitelijke montage van de geprefabriceerde elementen op uw locatie duurt slechts één enkele dag. Inclusief grondwerk, het aanbrengen van de paalconstructie en de fijne binnenafwerking bent u binnen een week volledig gereed.'
    },
    {
      question: 'Wat kost een uitbouw in Rotterdam ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van uw gekozen luxematerialen, de logistieke situatie (toegankelijkheid kraan) en de nodige paallengte. Een compactere uitbreiding start rond de € 40.000.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="rotterdam-landing-page">
      
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
            <span className="text-blue-300">Rotterdam</span>
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
                    PREFAB SELECT ROTTERDAM
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Uitbouw in Rotterdam <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    meer ruimte in een stad
                  </span> <br />
                  die durft te bouwen
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans" id="hero-description">
                  Rotterdam is de stad van aanpakken en vooruitkijken. Mocht uw woning om extra ruimte en meters vragen, dan bouwt Prefab Select een stabiel paalgefundeerde, hoogwaardig geïsoleerde aanbouw — met minimale logistieke overlast in uw straat en perfecte welstandsafstemming.
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
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Constructie in 1 dag</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Ruwbouw direct wind- &amp; waterdicht</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-security">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Rotterdams Beleid</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Ervaren in kwaliteitsbeoordeling</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-isolation">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Solide Paalfundatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Sondeerberekening t.b.v. slappe klei</p>
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
                    src="https://i.imgur.com/heZUGaD.jpeg" 
                    alt="Rotterdam Prefab Uitbouw" 	
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Badge layout */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10" id="hero-percent-badge">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Ontzorgde Realisatie
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
                UITBREIDEN IN PLAATS VAN VERTREKKEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Investeren op de plek <br />
                <span className="text-blue-600 italic font-light lowercase">
                  die u al helemaal koestert
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Rotterdam is een onvergelijkbaar dynamische stad om in te wonen. De moderne skyline, indrukwekkende musea en diverse gezellige wijken maken dat bewoners er overtuigend willen blijven wonen en investeren.
                </p>
                <p>
                  Met een hoogwaardige prefab uitbouw van Prefab Select vergroot u de benedenverdieping aanzienlijk. Dit brengt direct prachtig daglicht en royaal leefcomfort binnenshuis, en verhoogt effectief de waarde van uw woning op de dynamische Rotterdamse huizenmarkt.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="intro-right-benefits">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Waarom kiezen voor prefab?
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                De unieke voordelen van onze geavanceerde modulaire bouwmethode:
              </p>
              <ul className="space-y-4" id="benefits-list">
                {[
                  'Binnen 1 dag op locatie geplaatst, direct wind- en waterdicht',
                  'In perfecte, droge fabrieksomstandigheden gefabriceerd',
                  'Foutloze millimeterkwaliteit rechtstreeks uit onze werkplaats',
                  'Minimale logistieke overlast en wegafzettingen in uw wijk'
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
                  src="https://i.imgur.com/3fXGEOZ.jpeg" 
                  alt="Prefab Select Fabriek Rotterdam" 	
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7" id="process-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZONDER DRIE SEIZOENEN BOUWSTOF IN UW TUIN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Snel, droog fabricageproces <br />
                <span className="text-blue-600 italic font-light lowercase">
                  en uiterst geruisloze opbouw
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Klassieke aanbouw ter plaatse brengt weersrisico's, droogtijden en geluidhinder met zich mee. Prefab Select minimaliseert dit proces door alle constructiedelen zorgvuldig voor te bereiden in onze eigen fabriek.
                </p>
                <p>
                  Terwijl de elementen onder droge omstandigheden ontstaan, creëren en testen we bij u thuis een solide paalfundatie op de slappe kleibodems. Op de montagedag hijsen we de constructie op haar plek; dezelfde avond is uw woning weer volledig windvast gesloten.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGULATION & WELSTAND Rotterdam */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]" id="welstand-rotterdam-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7" id="welstand-rotterdam-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                NALEVING VAN DE ROTTERDAMSE WELSTANDS- EN KOEPELNOTA
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                9 Beschermde Stadsgezichten <br />
                <span className="text-blue-400 italic font-light lowercase">
                  en erfgoed-beoordeling
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  De landelijke wetgeving biedt uitstekende vergunningsvrije mogelijkheden aan de achterkant van uw woning tot 4 meter diep. Echter telt Rotterdam negen beschermde stadsgezichten — zones met grote cultuurhistorische en stedenbouwkundige waarden zoals de <strong>Provenierswijk, Kralingen of Hillegersberg</strong>.
                </p>
                <p>
                  Woont u binnen zo'n beschermd grondgebied? Dan is een omgevingsvergunning en akkoord van de Welstandscommissie verplicht. Onze vakkundige ontwerpers bezitten jarenlange ervaring met deze procedures; wij verzorgen de gehele aanvraag, beginselnotities en tekeningen voor u.
                </p>
              </div>

              <div className="mt-10" id="welstand-ctas">
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

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10" id="free-check-card">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis nakijken
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Valt uw woning binnen een beschermd stadsgezicht of kunnen we in uw specifiek stadsdeel direct volledig vergunningsvrij configureren? Onze adviseurs pluizen het kosteloos voor u uit.
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
      <section className="py-24 md:py-32 bg-white" id="cost-analysis-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="cost-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              KOSTEN EN CALCULATIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Rotterdam?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw gewenste luxekozijnen, glazen pui-opties en de specifieke funderingsdiepten bepalen de exacte calculatie. Richtprijzen:
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
            * Dit betreft richtbedragen incl. btw en installatie. Omdat Rotterdam op een diepe, slappe klei- en veenlaag is gebouwd, is een constructief correcte en levenslang stabiele heipaal- of schroefpaalconstructie cruciaal; dit elimineert elk risico op toekomstige scheurvormingen t.o.v. de hoofdwoning.
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
              Uw Rotterdams bouwtraject stap-voor-stap <br />
              <span className="text-blue-600 italic font-light lowercase">
                geheel gestructureerd en vlekkeloos
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
              Bouwen per stadsgebied in Rotterdam
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Vele districten kennen heel diverse bouwstijlen, kraantoegankelijkheidsnormen en erfgoedverplichtingen:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="districts-grid">
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
                Is een aanbouw de beste oplossing voor uw gezin?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Als u extra leefmeters op de begane grond zoekt (bijvoorbeeld voor een royale designleefkeuken, een gezellig kantoor of een lichte eetkamer), dan is een uitbouw veruit de meest gewenste en multifunctionele optie.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Mist u eerder een extra bewoonbare slaap- of badkamer op verdieping? Dan adviseren wij u graag objectief over bijpassende dakkapellen of dakopbouwen met zorgvuldige naleving van het welstandsregime.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Grondige voorbereiding garandeert rust
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Het is berekend om kritieke randvoorwaarden zoals kraantoegankelijkheid in compacte straten, exacte kadastrale erfgrenzen en funderingseisen op rivierbakklei vooraf gedetailleerd in te schatten.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze engineers en ontwerpers lopen al deze facetten grondig met u door voordat we in de fabriek overgaan tot fabricage, om elk risico of meerwerk in een later stadium 100% uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Haagse zonlichtinval en woonsfeer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw levert niet sfeerloos extra meters, maar verrijkt uw dagelijks leven. Veel sfeervolle herenhuizen of sfeervol bebouwde herenwoningen kunnen binnenshuis soms wat donkerder uitvallen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een royale glazen gevel, minimalistische vouwdeuren of een royale lichtstraat trekt u het natuurlijke zonlicht diep naar binnen en haalt u de rustige tuinarchitectuur letterlijk in huis.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Tochtvrij, duurzaam &amp; buitengewoon behaaglijk
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Tocht of warmteverlies in koude periodes behoort definitief tot het verleden. Onze prefab wanden, vloeren en daksystemen bezitten uitmuntende thermische isolatiewaarden tot wel Rc 6.0.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dit draagt direct en effectief bij aan een aanzienlijk lagere energierekening en laat zich optimaal combineren met moderne systemen zoals vloerverwarming of warmtepompen.
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
              over uitbouwen in Rotterdam
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
                Deel uw unieke woonsituatie en plannen met ons, dan berekenen we geheel vrijblijvend een heldere prijsindicatie en ontwerpfase t.b.v. uw woning.
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
          <h1>Uitbouw in Rotterdam — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Rotterdam en de omliggende disciplines, waaronder Kralingen, Hillegersberg, Blijdorp, Prins Alexander, Nesselande en Hoek van Holland. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Rotterdam kent 9 beschermde stadsgezichten waar altijd een vergunning vereist is en de Welstandsnota Rotterdam 2025 en de Koepelnota actief nageleefd over de kavel moeten worden.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject hangt op locatie af van transportspecificaties, constructieve grondberekeningen, paalfunderingen en eventueel benodigde omgevingsvergunningen op de kavel. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
