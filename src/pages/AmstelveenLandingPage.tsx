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

export default function AmstelveenLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Amstelveen | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Amstelveen laten bouwen? Lees alles over prefab uitbouw: vergunning, de drie welstandsregimes, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Amstelveen
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-amstelveen-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/amstelveen",
          "url": "https://www.prefabselect.nl/regio/amstelveen",
          "name": "Uitbouw in Amstelveen | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Amstelveen laten bouwen? Lees alles over prefab uitbouw: vergunning, de drie welstandsregimes, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Amstelveen", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Amstelveen", "item": "https://www.prefabselect.nl/regio/amstelveen" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/amstelveen#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Amstelveen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Ligt uw woning in een beschermd dorpsgezicht of is het een monument, dan is wel een vergunning nodig. Doe de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat zijn de drie welstandsregimes in Amstelveen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Amstelveen verdeelt het grondgebied in bijzondere gebieden (streng getoetst, zoals beeldbepalende wijken), reguliere gebieden (normale toets) en welstandsvrije gebieden (geen uiterlijke toets). In welk regime uw straat valt, bepaalt hoe streng een uitbouw beoordeeld wordt."
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
              "name": "Wat kost een uitbouw in Amstelveen ongeveer?",
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
      const existingScript = document.getElementById('json-ld-amstelveen-schema');
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
      desc: 'Valt uw plan buiten de vrijstelling? Dan regelen en begeleiden wij de complete omgevingsvergunning aanvraag bij de gemeente Amstelveen.'
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
    { name: 'Elsrijk & Randwijck', desc: 'Karakteristieke, beeldbepalende tuinwijken met prachtige jaren-30-architectuur; hier vallen ontwerpen vaak onder een bijzonder of regulier welstandsregime waar esthetische zorgvuldigheid leidend is.' },
    { name: 'Westwijk, Middenhoven & Waardhuizen', desc: 'Ruimer en moderner opgezette gezinswijken met royale achtertuinen en uitstekende logistieke aanvoer, uitermate geschikt voor vergunningsvrije uitbouwen tot 4 meter diep.' },
    { name: 'Groenelaan & Keizer Karelpark', desc: 'Gevestigde en groene woonwijken met gevarieerde woningtypen waar prefab uitbouwen een enorme waardevermeerdering en direct extra leefcomfort opleveren.' },
    { name: 'Bovenkerk & Nes aan de Amstel', desc: 'Karakteristieke dorpskernen en landelijke gebieden langs de Amstel met diepe percelen en monumentale raakvlakken waar behoud van sfeer van essentieel belang is.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Amstelveen?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Ligt uw woning in een beschermd dorpsgezicht of is het een monument, dan is wel een vergunning nodig. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Wat zijn de drie welstandsregimes in Amstelveen?',
      answer: 'Amstelveen verdeelt het grondgebied in bijzondere gebieden (streng getoetst, zoals beeldbepalende wijken), reguliere gebieden (normale toets) en welstandsvrije gebieden (geen uiterlijke toets). In welk regime uw straat valt, bepaalt hoe streng een uitbouw wordt beoordeeld.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De ruwbouw staat meestal binnen één dag. Inclusief fundering en afwerking rekent u op enkele dagen tot een week op locatie, en een totale doorlooptijd van vier tot acht weken inclusief voorbereiding vanaf de ontwerpfase.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Absoluut. Doordat we de bouwdelen onder perfecte fabriekskwaliteit en droge omstandigheden fabriceren, sluiten we foutmarges uit. U kiest zelf de gevelafwerking: van hypermodern glas en stucwerk tot traditioneel handgebakken metselwerk passend bij uw bestaande woning.'
    },
    {
      question: 'Wat kost een uitbouw in Amstelveen ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer €2.500 tot €4.500 per vierkante meter, afhankelijk van de afwerking. Een compacte uitbouw begint rond de €40.000. Een offerte op maat geeft het exacte bedrag voor uw specifieke woonsituatie.'
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
            <span className="text-blue-300">Amstelveen</span>
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
                    PREFAB SELECT AMSTELVEEN
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Amstelveen <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    groener en ruimer wonen op uw
                  </span> <br />
                  vertrouwde plek
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Amstelveen combineert het beste van twee werelden: de rust en het groen van een tuinstad, met Amsterdam vlakbij. Een prefab uitbouw of aanbouw van Prefab Select biedt u de extra leefruimte zonder dat u uw geliefde plek hoeft te verlaten.
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
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale overlast voor u en uw buren</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Budgetzekerheid</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste prijs, geen verrassingen achteraf</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Premium Isolatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimaal Rc 6.0 isolatiewaarde</p>
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
                    src="https://i.imgur.com/oMxZxiY.jpeg" 
                    alt="Amstelveen Prefab Uitbouw" 
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
                RUIMER LEVEN IN EEN GELIEFDE OMGEVING
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Blijven waar u woont, <br />
                <span className="text-blue-600 italic font-light lowercase">
                  met alle gewenste leefruimte
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Het is een bekend verhaal in Amstelveen: uw woning bevalt uitstekend en de buurt is fantastisch, maar u begint simpelweg leefmeters te missen. Een grote woonkeuken waar u gezellig samenkomt, een stil thuiskantoor, of een grotere living voor een opgroeiend gezin.
                </p>
                <p>
                  Verhuizen is kostbaar en brengt een herhaaldelijk hoge hypotheek en overdrachtsbelasting met zich mee. Met de prefab uitbouwen van Prefab Select breidt u op een hoogwaardige en verantwoorde manier uw begane grond uit.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Krachtige kwaliteitsvoordelen
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                De voordelen van prefab bouwen met Prefab Select:
              </p>
              <ul className="space-y-4">
                {[
                  'Binnen 1 dag op locatie gemonteerd en wind- en waterdicht',
                  'Grotendeels vergunningsvrij bouwen aan de achterzijde',
                  'Gefabriceerd onder gecontroleerde fabriekskwaliteit',
                  'Afwerking op maat, passend bij de architectuur van uw wijk'
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
                  src="https://i.imgur.com/GIRelwV.jpeg" 
                  alt="Prefab Select Fabriek Amstelveen" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                SLIM EN DUURZAAM BOUWEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Prefab bouwen is <br />
                <span className="text-blue-600 italic font-light lowercase">
                  het slimme alternatief
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Waar traditioneel bouwen op locatie gekenmerkt wordt door weersinvloeden en droogtijden, draait ons prefab proces dit volledig om.
                </p>
                <p>
                  In onze moderne werkplaats worden de wandsegmenten, dakelementen en kozijnen tot op de millimeter exact voorbereid. Ondertussen bereiden we de fundering bij u in Amstelveen voor. Zo hoeft uw achtergevel maar kort open en staat de constructie in een mum van tijd.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGIMES & COMMISSION */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                ZORGVULDIG WELSTANDSBELEID IN AMSTELVEEN
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Drie Welstandsregimes <br />
                <span className="text-blue-400 italic font-light lowercase">
                  met verstand van erfgoed &amp; kwaliteit
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  De gemeente Amstelveen hecht aan esthetiek en werkt met een driedeling in welstandsregimes: <strong>bijzondere gebieden</strong> (streng getoetst wegens beeldbepalend karakter, zoals karakteristieke tuinwijken), <strong>reguliere gebieden</strong> en <strong>welstandsvrije gebieden</strong>.
                </p>
                <p>
                  Wanneer een plan geëvalueerd moet worden, adviseert de Commissie Ruimtelijke Kwaliteit over de aansluiting bij de omliggende bebouwing. Prefab Select kent deze regelgeving door en door: wij ontwerpen vooraf exact passend binnen het geldende regime.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Vergunningcheck Uitvoeren <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis checken
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Welk regime geldt er op uw specifieke adres en mag uw uitbouw vergunningsvrij worden geplaatst? Ons team zoekt het gratis en snel voor u uit.
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
              Wat kost een uitbouw in Amstelveen?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw gewenste afwerking (zoals heipalen t.b.v. de veenachtige bodem, glazen vouwpuien of vloerverwarming) weegt bij de eindberekening net zo zwaar als de afmetingen. Richtprijzen voor 2025/2026:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Indicatie Richtprijs</span>
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
            * Dit betreft indicatieve richtbedragen incl. btw en installatie. De veen- en kleigronden rond de Amstel vragen een gedegen fundering, die we altijd exact berekenen en garanderen.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOZE REALSATIE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Het bouwtraject van begin tot eind <br />
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
              Uitbouwen per wijk in Amstelveen
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Amstelveen kent heel uiteenlopende buurten en stijlen. Dit bepaalt in hoge mate het esthetische regime en de aanvoermogelijkheden:
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
                Als u ruimte mist op de begane grond (om een royale leefkeuken, een speelhoek voor de kids of een grotere salon te realiseren), dan is een uitbreiding van de begane grond veruit de meest bepalende en waardevaste ingreep.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u een extra bad- of slaapkamer boven? Dan slaat u met een dakkapel of dakopbouw een betere slag. Wij adviseren u graag eerlijk over de meest rendabele optie.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Goed voorbereid van start gaan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zorg dat u de exacte erfgrenzen, de logistieke aanvoer en de bodemgesteldheid vroeg in beeld heeft. 
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze engineers en ontwerpers lopen standaard deze belangrijke aspecten met u door alvorens wij de productie starten om alle risico's uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht binnenhalen en optisch vergroten
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw voegt niet alleen meters toe, maar brengt ook sfeer. Historische woningen in Amstelveen zijn soms dieper en donkerder gesitueerd.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een riante glazen pui, vouwdeuren of een luxe lichtstraat op het platte dak haalt u het daglicht diep in huis en betrekt u uw tuin optimaal bij uw woonbeleving.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Royaal comfort &amp; uitstekende isolatiewaarden
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Onze modulaire prefab uitbouwen herbergen uitstekende thermische prestaties (tot Rc 6.0) om tocht, kou en warmteverlies effectief tegen te gaan.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dat betekent behaaglijk en gelijkmatig wonen in elk seizoen én een flinke besparing op uw maandelijkse energielasten. Perfect te combineren met vloerverwarming.
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
              over uitbouwen in Amstelveen
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
                Deel uw unieke woonsituatie en uw plannen met ons, dan calculeren en adviseren we geheel vrijblijvend t.b.v. een eerlijke prijsindicatie.
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
          <h1>Uitbouw in Amstelveen — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Amstelveen en omgeving, waaronder Elsrijk, Randwijck, Westwijk, Middenhoven, Bovenkerk en Nes aan de Amstel. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Amstelveen kent drie welstandsregimes: bijzondere, reguliere en welstandsvrije gebieden; in beschermde dorpsgezichten en bij monumenten gelden strengere eisen.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject duurt vier tot acht weken. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
