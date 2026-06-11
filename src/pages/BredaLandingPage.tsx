import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Timer, 
  Gem, 
  Sparkles,
  Building,
  Activity,
  Award,
  Leaf,
  Info,
  HelpCircle,
  TrendingUp,
  Boxes,
  Home,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function BredaLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Breda | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Breda laten bouwen? Ontdek hoe een prefab uitbouw werkt: vergunning, de Nota Ruimtelijke Kwaliteit, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Breda Local Page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-breda-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/breda",
          "url": "https://www.prefabselect.nl/regio/breda",
          "name": "Uitbouw in Breda | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Breda laten bouwen? Ontdek hoe een prefab uitbouw werkt: vergunning, de Nota Ruimtelijke Kwaliteit, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Breda", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Breda", "item": "https://www.prefabselect.nl/regio/breda" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/breda#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Hoeveel mag ik uitbouwen zonder vergunning in Breda?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aan de achterkant, binnen het achtererfgebied, mag dit vaak tot vier meter diep, mits minstens de helft van het oorspronkelijke bebouwingsgebied onbebouwd blijft. Let op: in de beschermde historische binnenstad en bij monumenten vervalt die vrijstelling direct. Een snelle check van uw adres helpt u verder."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is de Nota Ruimtelijke Kwaliteit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dat is het Bredase lokale welstandsbeleid waarin per gebied precies staat wat past qua uiterlijk, vorm en gekozen materiaalsoorten. Het bepaalt mede hoe uw uitbouw eruit mag zien, met name in beeldbepalende oudere wijken of de binnenstad."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het plaatsen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De mechanische ruwbouw staat in veruit de meeste situaties binnen slechts één dag op zijn plek. Inclusief de bodemfundering en de complete binnen- en buitenafwerking mag u rekenen op zo'n enkele dagen tot een week werk op locatie, met een totale doorlooptijd van 4 tot 8 weken vanaf ontwerp."
              }
            },
            {
              "@type": "Question",
              "name": "Is prefab net zo stevig en mooi als traditioneel metselwerk?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absoluut. Doordat we de bouwdelen onder perfecte fabriekskwaliteit en droge omstandigheden fabriceren, sluiten we foutmarges uit. U kiest zelf de gevelafwerking: van hypermodern glas en stucwerk tot traditioneel handgebakken metselwerk passend bij uw bestaande woning."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een uitbouw in Breda ongeveer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De gemiddelde richtprijs ligt tussen de €2.500 en €4.500 per vierkante meter, afhankelijk van uw wensen qua luxe (denk aan een complete glazen pui of lichtstraten). Een compacte aanbouw begint veelal rond de €40.000."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-breda-schema');
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
      desc: 'Valt uw plan buiten de vrijstelling? Dan nemen wij de aanvraag en de tekeningen voor de gemeente Breda volledig uit handen.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'Tijdens de doorlooptijd van het papierwerk produceren we de elementen op maat — volledig buiten uw woning om in onze overdekte werkplaats.'
    },
    {
      nr: '4',
      title: 'Fundering & Montage',
      desc: 'Eerst wordt de fundering gemaakt, daarna volgt de razendsnelle plaatsing. De ruwbouw is doorgaans binnen een dag een feit.'
    },
    {
      nr: '5',
      title: 'Afwerken & Opleveren',
      desc: 'Binnen een paar dagen is alles gemonteerd, aangesloten en opgeruimd opgeleverd. Direct klaar voor gebruik.'
    }
  ];

  const wijken = [
    { name: 'Het Ginneken', desc: 'Karakteristieke, weelderige bebouwing waar de uitbouw mooi moet aansluiten op het bestaande karakter.' },
    { name: 'Princenhage', desc: 'Klassieke sfeer en gezellige straten waar uitbreidingen met veel oog voor detail worden ontworpen.' },
    { name: 'Haagse Beemden', desc: 'Ruim opgezette wijk met vaak prima tuinen en brede achterom, perfect voor vergunningsvrije plaatsingen.' },
    { name: 'Belcrum', desc: 'Populaire wijk met diepe stadstuinen waar prefab transport en logistiek soepel worden afgestemd.' },
    { name: 'Teteringen & Bavel', desc: 'Royaal wonende gezinnen die de leefkeuken verlengen met zicht op hun groene tuin.' },
    { name: 'Prinsenbeek & Ulvenhout', desc: 'Grote percelen met ruime achtertuinen, waardoor de vergunningsvrije normen optimaal renderen.' },
    { name: 'Heuvel & Naoorlogs', desc: 'Solide tweekappers en rijtjeshuizen die extra meters winnen voor een thuiswerkplek of keuken.' }
  ];

  const faqs = [
    {
      question: 'Hoeveel mag ik uitbouwen zonder vergunning in Breda?',
      answer: 'Aan de achterkant, binnen het achtererfgebied, mag dit vaak tot vier meter diep, mits minstens de helft van het oorspronkelijke bebouwingsgebied onbebouwd blijft. Let op: in de beschermde historische binnenstad en bij monumenten vervalt die vrijstelling direct. Een snelle check van uw adres helpt u verder.'
    },
    {
      question: 'Wat is de Nota Ruimtelijke Kwaliteit?',
      answer: 'Dat is het Bredase lokale welstandsbeleid waarin per gebied precies staat wat past qua uiterlijk, vorm en gekozen materiaalsoorten. Het bepaalt mede hoe uw uitbouw eruit mag zien, met name in beeldbepalende oudere wijken of de binnenstad.'
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
      question: 'Wat kost een uitbouw in Breda ongeveer?',
      answer: 'De gemiddelde richtprijs ligt tussen de €2.500 en €4.500 per vierkante meter, afhankelijk van uw wensen qua luxe (denk aan een complete glazen pui of lichtstraten). Een compacte aanbouw begint veelal rond de €40.000.'
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
            <span className="text-blue-300">Breda</span>
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
                    PREFAB SELECT WEST-BRABANT — BREDA
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Breda <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    zo maakt u uw huis
                  </span> <br />
                  ruimer dan gedacht
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  In Breda woont u prettig — dicht bij de gezellige markt, de natuur van het Mastbos om de hoek, en in een fijne vertrouwde wijk. Is uw woning ondertussen aan de krappe kant geworden? Een prefab uitbouw of aanbouw geeft u gerichte vierkante meters precies waar het gezinsleven zich afspeelt.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link 
                    to="/offerte" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Vraag gratis offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale geluidshinder buiten</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Zekerheid vooraf</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste prijs &amp; duidelijke planning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">20 JAAR GARANTIE</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Op de volledige constructie</p>
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
                    src="https://i.imgur.com/DLaFkHx.jpeg" 
                    alt="Breda Prefab Uitbouw" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Badge layout */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Bredase Ontwerpen
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
                FLEXIBEL MAATWERK
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Uitbreiden in plaats van <br />
                <span className="text-blue-600 italic font-light lowercase">
                  meteen wegverhuizen
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Het overkomt veel Bredanaars: het gezin groeit, er komt een vaste thuiswerkplek bij, de hobby&apos;s eisen hun tol en ineens voelt het huis dat destijds ruim leek behoorlijk vol. Verhuizen is een ingrijpende en kostbare optie in een gewilde stad als Breda. 
                </p>
                <p>
                  Met een slimme, hoogwaardige uitbouw verlengt u de begane grond naar achteren en wint u een royale, uiterst lichte leefruimte. En dat zonder uw hele dierbare leefomgeving met school, sportclubs en buren direct achter te hoeven laten.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                De voordelen op een rij
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                We nemen u in deze gids mee door alles wat een modern prefab systeem u te bieden heeft:
              </p>
              <ul className="space-y-4">
                {[
                  'Snellere en schonere montage dan traditioneel metselwerk',
                  'Eenduidige prijs- en logistieke garanties zonder verloop',
                  'Volledige ontzorging bij vergunningstrajecten in Breda',
                  'Optimale isolatiewaarden (RC 6.0+) voor een heerlijk leefklimaat'
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
                  src="https://i.imgur.com/zt69qZY.jpeg" 
                  alt="Duurzaamheid aanbouw" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                CONSTANTE KWALITEITSCONTROLE
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Wat prefab bouwen in <br />
                <span className="text-blue-600 italic font-light lowercase">
                  de praktijk betekent
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Normaal gesproken wordt een aanbouw steen voor steen bij u op het erf gemetseld. Dat betekent wekenlang stof, droogtijd, lawaai en afhankelijkheid van wisselvallig weersomstandigheden. 
                </p>
                <p>
                  Bij Prefab Select draaien we het proces om. De wanden, de vloer- en dakelementen en de volledige draagconstructie worden onder ideale omstandigheden in onze geconditioneerde werkplaats vervaardigd. Het resultaat is een foutloze montage, een perfecte isolatie en een uiterst soepele doorlooptijd.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VERGUNNINGEN BREDA */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                LOKALE GEMEENTERENTMEESTER
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunning & regels <br />
                <span className="text-blue-400 italic font-light lowercase">
                  binnen de gemeente Breda
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Als algemene landelijke lijn mag een uitbouw aan de achterzijde vergunningsvrij gerealiseerd worden mits u binnen de diepte van 4 meter blijft en de welstandscriteria op te openbare weg niet worden geschonden. 
                </p>
                <p>
                  Ligt uw woning echter in een beschermd historisch stadsgezicht of is uw Bredaas woonhuis een gemeentelijk of rijksmonument? Dan gelden strenge welstandskaders welke zijn vastgelegd in de Bredase <strong>Nota Ruimtelijke Kwaliteit</strong>. We bekijken dit altijd graag zorgvuldig en stemmen de visuele aansluiting feilloos af.
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
                Bredase Vergunningcheck
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Laat u niet afschrikken door ambtelijke dossiers. Ons team ontwerpt volgens de exacte gemeentelijke eisen en verzorgt indien nodig de volledige omgevingsvergunning aanvraag inclusief sonderingsberekeningen.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Laat ons uw adres checken <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              RICHTPRIJZEN OP EEN RIJ
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Breda?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Twee uitbouwen van exact dezelfde maatvoering kunnen uiteenlopen in prijs, afhankelijk van uw keuzes in de afwerking (denk aan kozijnen, pui of een sfeervolle lichtstraat). Wat we hanteren voor een reëel vertrekpunt in 2025/2026:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbreiding</span>
              <span className="text-right">Prijsindicatie</span>
            </div>
            
            {[
              { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.500' },
              { label: 'Compacte achterbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
              { label: 'Ruime, luxe afgewerkte uitbouw (ca. 20 m²)', val: 'tot € 85.000 of meer' }
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
            * Cijfers weerspiegelen gemiddelde richtprijzen inclusief btw en montage. Uw uiteindelijke prijs is afhankelijk van de benodigde funderingspalen op uw grondgebied en de algehele logistieke bereikbaarheid van uw tuin.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOZE LOGISTIEK EN PLANNING
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Stap voor stap: <br />
              <span className="text-blue-600 italic font-light lowercase">
                van eerste plan tot oplevering
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

      {/* DISTINCT DISTRICTS (STADSDELEN) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              VERTROUWD IN UW BUURT
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uitbouwen per wijk in Breda
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Breda kent gevarieerde buurten en grondslagen. Dat bepaalt mede welke vergunningsgrenzen of logistieke transportopties aan de hand zijn:
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
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DASHBOARD DECISIONS</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Past een uitbouw het best bij uw plan?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zit uw knelpunt op de begane grond (zoals een te kleine keuken of eethoek)? Dan is een uitbouw of aanbouw de meest logische zet om direct uw comfort te maximaliseren.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u juist een extra slaapkamer of ruimere werkruimte op zolder? Dan helpt een prefab dakkapel of een complete dakopbouw u waarschijnlijk beter naar uw doel. We lichten de afweging graag eerlijk toe.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">TECHNICAL ASSESSMENT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Vier dingen om vooraf uit te zoeken
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Denk vooraf aan de stabiliteit van de grond, uw exact erfgrenzen (goed afstemmen met de buren is hierbij goud waard), de logistieke aanvoerroutes voor de plaatsingsdag, en de leidingplaatsing van installaties.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze adviseurs nemen deze vier essentiële factoren standdaard grondig met u door voordat we de productie in onze fabriek starten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">SPACIOUS LIGHTING</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht: de stille hoofdrolspeler
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een uitbreiding gaat niet louter over extra vierkante meters, maar vooral over hoe die meters aanvoelen. Tradionele Bredase tussenwoningen kunnen binnenshuis diep en donker zijn.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dankzij een luxe glasgevelpui, een moderne lichtstraat of tuindeuren stroomt het daglicht volop naar binnen. Uw tuin wordt een natuurlijk verlengstuk van uw woonkeuken of living.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL COMFORT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Het hele jaar comfortabel &amp; behaaglijk
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een matig geïsoleerde ruimte voelt \&apos;s winters kil aan. Onze prefab wanden en vloerelementen sluiten naden, tocht en koudebruggen volledig uit. 
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Hiermee geniet u van optimale warmte-isolatie waarmee u tevens uw maandelijkse energielasten drukt. Koel in de zomer, warm in de winter.
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
              ANTWOORDEN EN ADVIES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in Breda
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
                Vertel ons over uw woning en uw wensen, dan kijken we geheel vrijblijvend naar de mogelijkheden, de regels op uw adres en een heldere prijsindicatie.
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
