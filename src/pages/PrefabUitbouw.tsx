import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Timer, 
  Gem, 
  Building,
  Compass,
  HelpCircle,
  TrendingUp,
  Award,
  AlertTriangle,
  Scale,
  DollarSign,
  FileCheck,
  Factory,
  ThumbsUp,
  Hammer,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

export default function PrefabUitbouw() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Prefab uitbouw: wat is het, voordelen en nadelen | Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Wat is een prefab uitbouw precies? Lees hoe het werkt, de voordelen en nadelen, het verschil met traditioneel bouwen, kosten, bouwtijd en het hele proces. Eerlijke uitleg van Prefab Select."
      );
    }

    // Dynamic JSON-LD Schema injection for Prefab Uitbouw
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-prefab-uitbouw-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://www.prefabselect.nl/prefab-uitbouw",
          "headline": "Prefab uitbouw: wat is het, voordelen en nadelen",
          "description": "Eerlijke uitleg over prefab uitbouw: betekenis, werking, voordelen, nadelen, kosten en het volledige proces.",
          "inLanguage": "nl-NL",
          "author": { "@type": "Organization", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "publisher": { 
            "@type": "Organization", 
            "name": "Prefab Select", 
            "logo": { "@type": "ImageObject", "url": "https://www.prefabselect.nl/logo.png" } 
          },
          "mainEntityOfPage": "https://www.prefabselect.nl/prefab-uitbouw"
        },
        {
          "@type": "Service",
          "serviceType": "Prefab uitbouw",
          "provider": { 
            "@type": "GeneralContractor", 
            "name": "Prefab Select", 
            "url": "https://www.prefabselect.nl", 
            "email": "offerte@prefabselect.nl" 
          },
          "areaServed": { "@type": "Country", "name": "Nederland" },
          "description": "Prefab uitbouw op maat: in de gecontroleerde werkplaats gefabriceerd en snel op locatie gemonteerd."
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/prefab-uitbouw#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wat is een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Een prefab uitbouw is een uitbreiding van uw woning waarvan de onderdelen — wanden, dak en constructie — in een werkplaats worden gemaakt en daarna bij u op locatie worden gemonteerd. Daardoor staat de ruwbouw vaak binnen één dag en is de bouwtijd op locatie kort."
              }
            },
            {
              "@type": "Question",
              "name": "Wat zijn de voordelen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De belangrijkste voordelen zijn een korte bouwtijd, een voorspelbare planning en prijs, weinig weersafhankelijkheid, een constante fabriekskwaliteit met goede isolatie, en weinig overlast op locatie."
              }
            },
            {
              "@type": "Question",
              "name": "Wat zijn de nadelen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aandachtspunten zijn dat de maatvoering en keuzes vroeg vastliggen (minder improviseren tijdens de bouw), dat er ruimte nodig is voor aanvoer en soms een kraan, en dat zeer specifiek of grillig maatwerk soms beter bij traditionele bouw past. Voor de meeste uitbouwen wegen de voordelen ruim op tegen deze punten."
              }
            },
            {
              "@type": "Question",
              "name": "Is prefab goedkoper dan traditioneel bouwen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Prefab is vooral voorspelbaarder in prijs en sneller, en daardoor vaak gunstig. De totale kosten zijn vergelijkbaar met traditioneel en hangen sterk af van de afwerking; reken op een richtprijs van circa € 2.500 tot € 4.500 per m²."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-prefab-uitbouw-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const advantages = [
    { title: 'Snel', desc: 'De ruwbouw staat vaak in één dag; de afwerking duurt dagen in plaats van maanden.' },
    { title: 'Voorspelbaar', desc: 'Doordat het meeste in de fabriek gebeurt, liggen planning en prijs vooraf vast.' },
    { title: 'Weinig weersafhankelijk', desc: 'Regen en vorst hebben nauwelijks invloed op de gecontroleerde productie.' },
    { title: 'Constante kwaliteit', desc: 'Fabrieksomstandigheden geven strakke maatvoering en een goede, naadloze isolatie.' },
    { title: 'Weinig overlast', desc: 'Korte bouwperiode, minder stof, lawaai en zwaar bouwverkeer in uw tuin en straat.' },
    { title: 'Duurzaam', desc: 'Minimaal bouwafval en buitengewoon efficiënt, circulair materiaalgebruik.' }
  ];

  const disadvantages = [
    { title: 'Vroeg vastleggen', desc: 'Maatvoering en keuzes liggen vooraf vast; tijdens de bouw improviseren kan veel minder.' },
    { title: 'Aanvoer en kraan', desc: 'De elementen moeten op locatie komen; bij een smal kavel zonder achterom vraagt dit logistieke planning of een telescoopkraan.' },
    { title: 'Grillig maatwerk', desc: 'Zeer onregelmatige vormen of complexe aansluitingen op eeuwenoude panden kunnen soms beter traditioneel.' },
    { title: 'Transportgrenzen', desc: 'De fysieke afmetingen van elementen zijn gebonden aan wat met vrachtwagens vervoerd kan worden.' },
    { title: 'Goede voorbereiding vereist', desc: 'Het ontwerp- en inmeetwerk moet vooraf 100% nauwkeurig zijn; fouten zijn achteraf lastiger te herstellen.' }
  ];

  const compareRows = [
    { label: 'Bouwtijd op locatie', prefab: 'Kort (enkele dagen)', traditional: 'Lang (weken tot maanden)' },
    { label: 'Weersafhankelijkheid', prefab: 'Laag (droge productie)', traditional: 'Hoger (risico op vertraging)' },
    { label: 'Voorspelbaarheid prijs/planning', prefab: 'Hoog (vooraf gecalculeerd)', traditional: 'Wisselend (onvoorzien meerwerk)' },
    { label: 'Flexibel bijsturen tijdens bouw', prefab: 'Beperkt (alles ligt vast)', traditional: 'Ruimer (aanpasbaar ter plaatse)' },
    { label: 'Overlast op locatie', prefab: 'Beperkt (geruisloze assemblage)', traditional: 'Langer (stof, lawaai, zware troep)' }
  ];

  const pricingRows = [
    { label: 'Prefab uitbouw, per m² (geïnstalleerd)', val: 'circa € 2.500 – € 4.500' },
    { label: 'Compacte uitbouw (ca. 12 m²)', val: 'vanaf circa € 40.000' },
    { label: 'Ruime of luxe uitbouw (ca. 20 m²)', val: 'tot € 85.000 of meer' }
  ];

  const faqs = [
    {
      question: 'Wat is een prefab uitbouw?',
      answer: 'Een prefab uitbouw is een constructieve uitbreiding van uw woning waarvan de belangrijkste onderdelen — de wanden, het dak en de dragende constructie — vooraf in onze geavanceerde werkplaats worden gebouwd. Pas wanneer de elementen compleet zijn, worden ze naar uw locatie vervoerd en daar op een vooraf aangelegde fundering gemonteerd.'
    },
    {
      question: 'Wat zijn de voordelen van een prefab uitbouw?',
      answer: 'De grootste voordelen zijn de extreem korte bouwtijd op locatie (ruwbouw staat in 1 dag), de voorspelbare prijs en planning, constante hoge fabriekskwaliteit zonder weersinvloeden en minimale verstoring van uw dagelijks gezinsleven (geen maandenlang stof of lawaai in de tuin).'
    },
    {
      question: 'Wat zijn de nadelen van een prefab uitbouw?',
      answer: 'Aandachtspunten zijn onder meer dat alle keuzes en detailmaten vooraf definitief moeten worden vastgelegd; weers- of improvisatiewijzigingen op de bouwplaats zijn achteraf nauwelijks mogelijk. Bovendien moeten de elementen met vrachtwagens en kranen naar de kavel getransporteerd kunnen worden, wat in dichte binnensteden extra logistieke voorbereiding vergt.'
    },
    {
      question: 'Is prefab goedkoper dan traditioneel bouwen?',
      answer: 'De totale kosten zijn vaak vergelijkbaar, maar prefab is veel voorspelbaarder waardoor u risicovolle budgetoverschrijdingen elimineert. Omdat de bouwtijd korter is, bespaart u daarnaast flink op arbeidskosten en tijdelijke voorzieningen op de bouwlocatie.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Zeker. Integendeel: constructies die onder constante fabriekscondities worden geassembleerd, zijn vaak strakker, stabieler en bezitten superieure isolatiewaarden vergeleken met traditioneel metselwerk op een natte, koude bouwplaats. Wat betreft de esthetische uitstraling kunt u zelf alles bepalen; van strak wit stucwerk tot moderne houten gevelaccenten.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="prefab-uitbouw-page">
      
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
            <Link to="/diensten" className="hover:text-white transition-colors">Diensten</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">Prefab Uitbouw</span>
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
                    PREFAB SELECT &middot; KENNISBANK
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Prefab uitbouw <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    wat is het precies,
                  </span> <br />
                  en wat zijn de voor- en nadelen?
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed font-medium font-sans border-l-4 border-blue-600 pl-6" id="hero-description">
                  Overweegt u een uitbouw, dan komt u al snel de term "prefab" tegen. Maar wat houdt het in, en is het iets voor u? Op deze pagina leggen we het eerlijk uit — inclusief de nadelen, want die horen er ook bij.
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
                    href="#nadelen-voordelen" 
                    id="hero-secondary-btn"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Vergelijk Voordelen &amp; Nadelen
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
                      <p className="text-[10px] text-blue-200/50 leading-none">In recordtijd glas- en winddicht</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-fixed-price">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">100% Vaste Prijs</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Geen budgetoverschrijdingen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-precision">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Fabrieksprecisie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Uitzonderlijk hoge isolatie Rc 6.0</p>
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

                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative" id="hero-image-container">
                  <img 
                    src="https://i.imgur.com/qTIctyr.jpeg" 
                    alt="Premium Prefab Uitbouw" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10" id="hero-experience-badge">
                  <span className="block font-display font-black text-2xl leading-none">100%</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Kwaliteitsgarantie
                  </span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* INTRODUCTION STORY & BACKGROUND */}
      <section className="py-24 md:py-32 bg-white" id="introduction-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-xl animate-fade-in" id="intro-left-text">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                UITBREIDEN MET COHERENTE DRADING
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wat is een prefab uitbouw <br />
                <span className="text-blue-600 italic font-light lowercase">
                  en hoe werkt het traject?
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Een uitbouw is een van de populairste manieren om een woning te vergroten: u verlengt de begane grond naar achteren en wint royale meters voor bijvoorbeeld een grotere keuken of comfortabelere woonkamer. Steeds vaker gebeurt dat “prefab” in plaats van volledig ter plaatse nat opgemetseld.
                </p>
                <p>
                  Met "prefab" (geprefabriceerd) verplaatsen we de zware bouwoverlast van uw gazon naar onze weersonafhankelijke werkplaats. Dit levert ongeëvenaarde millimeterprecisie en een drastische inkorting van het bouwtraject op locatie op.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="intro-right-benefits">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Hoe werkt het in de praktijk?
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold mb-6">
                Nadat de exacte maatvoering is gedimensioneerd, worden de constructiewanden en dakvlakken in onze fabriek gemaakt. Ondertussen geschieden bij u thuis de bodemsondages en grondwerkzaamheden. Op de geplande assemblagesessie hijst de montagekraan de elementen op de fundering. De constructie is binnen één dag winddicht gesloten.
              </p>
              <div className="flex gap-4">
                <Link to="/offerte" className="text-white bg-blue-600 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-2 group">
                  Bereken prijs <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="text-blue-950 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-wider">
                  Contact opnemen
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROS & CONS ANALYSIS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100" id="nadelen-voordelen">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20" id="pros-cons-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              EERLIJKE AFWEGING
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              De voordelen en nadelen op een rij
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Geen enkele bouwmethode is universeel voor iedere situatie. We zetten de plus- en minpunten transparant tegenover elkaar, want ook de nadelen horen erbij:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="pros-cons-grid">
            
            {/* Pros Column */}
            <div className="bg-white border border-slate-100 border-t-4 border-t-emerald-600 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="pros-column">
              <div className="inline-flex items-center gap-3 mb-8" id="pros-badge">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ThumbsUp size={16} />
                </div>
                <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950">
                  De Voordelen (Pluspunten)
                </h3>
              </div>
              
              <ul className="space-y-6" id="pros-list">
                {advantages.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start" id={`pro-item-${idx}`}>
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-black text-xs uppercase tracking-wider text-blue-950 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons Column */}
            <div className="bg-white border border-slate-100 border-t-4 border-t-rose-600 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="cons-column">
              <div className="inline-flex items-center gap-3 mb-8" id="cons-badge">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle size={16} />
                </div>
                <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950">
                  De Nadelen &amp; Aandachtspunten
                </h3>
              </div>

              <ul className="space-y-6" id="cons-list">
                {disadvantages.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start" id={`con-item-${idx}`}>
                    <span className="w-[18px] h-[18px] text-[18px] font-black text-rose-600 leading-none shrink-0 text-center">&times;</span>
                    <div>
                      <h4 className="font-display font-black text-xs uppercase tracking-wider text-blue-950 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-white" id="comparison-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="compare-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              PREFAB VS TRADITIONEEL
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Prefab versus traditioneel bouwen
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Het grootste verschil situeert zich in de verplaatsing van de bouwlocatie. Hier is een helder overzicht:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs" id="compare-table">
            <div className="grid grid-cols-3 bg-blue-950 text-white p-6 md:px-10 text-[10px] font-black uppercase tracking-widest">
              <span>Aspect</span>
              <span className="text-center">Prefab</span>
              <span className="text-right">Traditioneel</span>
            </div>
            
            {compareRows.map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-3 p-6 md:px-10 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-blue-950 ${
                  i % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'
                }`}
                id={`compare-row-${i}`}
              >
                <span>{row.label}</span>
                <span className="text-center text-blue-600 font-black">{row.prefab}</span>
                <span className="text-right text-slate-500">{row.traditional}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* COST ANALYSIS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100" id="cost-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="cost-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              OFFERTES EN BUDGET
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een prefab uitbouw?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              De afwerking (gewenste kozijnen, vloerverwarmingen of aluminium lichtstraten) weegt zwaarder dan uitsluitend het aantal meters. Indicatieve richtprijzen:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-xs mb-10" id="cost-table">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-[10px] font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Indicatieve Richtprijs</span>
            </div>
            
            {pricingRows.map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-2 p-6 md:px-10 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-blue-950 ${
                  i % 2 === 0 ? 'bg-slate-50/20' : 'bg-white'
                }`}
                id={`cost-row-${i}`}
              >
                <span>{row.label}</span>
                <span className="text-right text-blue-600 font-black">{row.val}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-semibold text-center leading-relaxed" id="cost-foot-note">
            * Dit zijn landelijke richtprijzen voor 2025–2026, bedoeld als vertrekpunt. Uw exacte calculatie hangt af van de afmetingen, de vereiste funderingsdiepten op uw kavel, het kozijntype en de overige wensen. Vraag direct een offerte aan voor uw unieke woning.
          </p>

          <div className="mt-12 text-center" id="cost-cta">
            <Link to="/offerte" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl transition-all hover:-translate-y-1">
              Bereken uw prijs online <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* REGULATION & VERGUNNING */}
      <section className="py-24 bg-white" id="vergunning-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="bg-blue-950 text-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden" id="vergunning-left">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
              <Compass className="text-blue-400 w-10 h-10 mb-6 relative z-10" />
              <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter text-white mb-6 relative z-10">
                Moet er een vergunning worden aangevraagd?
              </h3>
              <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed font-semibold mb-6 relative z-10">
                Of u een vergunning nodig heeft, hangt niet af van de prefab methodiek, maar van de fysieke dimensies en de kavelzone. Een aanbouw aan de achterzijde (binnen het achtererfgebied) mag in veel gevallen direct vergunningsvrij tot 4 meter diep geplaatst worden.
              </p>
              <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed font-semibold relative z-10">
                Als u aan de voorkant wilt uitbouwen, in een beschermd dorps- of stadsgezicht woont, of een monument bezit, is er wél een omgevingsvergunning nodig. Onze planners regelen deze procedures desgewenst volledig voor u.
              </p>
            </div>

            <div className="max-w-xl" id="vergunning-right">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZORGELOZE LOGISTIEK
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Optimale voorbereiding <br />
                <span className="text-blue-600 italic font-light lowercase">
                  met complete omgevingsscan
                </span>
              </h2>
              <div className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold space-y-6">
                <p>
                  We raden aan om voorafgaand aan de realisatie de <a href="https://omgevingswet.overheid.nl/checken" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">vergunningcheck via het landelijke Omgevingsloket</a> te doorlopen.
                </p>
                <p>
                  Wij analyseren uw kadastrale erfgrenzen, de kraanbereikbaarheid en eventuele welstandseisen om onvoorziene vertragingen uit te sluiten. Ons team ontzorgt u van ontwerptekening tot gemeentelijk contact.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROCESS STEPS COMPONENT */}
      <PrefabSteps />

      {/* INFORMATIONAL ARTICLES BENTO */}
      <section className="py-24 bg-white" id="info-articles-section">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl mb-16" id="info-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              KENNIS EN VERDIEPING
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Is een prefab uitbouw iets voor u?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
               We beantwoorden prangende vragen rondom bruikbaarheid, levensduur en eventuele hardnekkige fabeltjes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="info-grid">
            
            {/* Block 1 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="info-box-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DIVERSE TOEPASSINGEN</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Voor welke ruimtes is een uitbouw geschikt?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Veruit de populairste keuze is de <strong>design-leefkeuken</strong>. Door de keuken naar achteren te verlengen ontstaat ruimte voor een groot kookeiland, een royale gezinstafel met openslaande deuren naar de achtertuin.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Daarnaast zien we flinke stijgingen in de realisatie van geïntegreerde <strong>thuiswerkplekken</strong>, rustige speel- of gezinskamers en benedenslaapkamers met badkamer, ideaal voor wie direct levensloopbestendig wil renoveren.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="info-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">ISOLATION &amp; ENERGY</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Isolatie, comfort en duurzaamheid
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Er heerst een oud misverstand dat prefab ruimtes kouder aanvoelen. Bij een vakkundige prefab bouwwijze is het tegendeel waar: omdat wanden, dak en vloervelden in de fabriek naadloos worden gedimensioneerd, elimineren we koudebruggen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een strakke isolatiewaarde tot wel Rc 6.0 reduceert u de energierekening significant. De ruimte is moeiteloos te integreren met moderne toepassingen zoals LT-vloerverwarmingen en warmtepomp-aansluitingen.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="info-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">LIFETIME QUALITY</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Onderhoud en levensduur op lange termijn
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een prefab uitbouw is een volwaardig en permanent verlengstuk van uw woning, met exact dezelfde constructieve levensduur als traditioneel beton- en metselwerk.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                U kiest desgewenst voor onderhoudsarme materialen zoals aluminium kozijnen of verduurzaamd gevelhout, zodat u de komende dertig jaar nauwelijks omkijken heeft naar schilder- en renovatiewerkzaamheden.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="info-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DEBUNKING Fabels</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Veelgemaakte misverstanden over prefab
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Fabel 1: "Prefab ziet er goedkoop uit." Onjuist. Grote volumes prefab gevelelementen zijn nauwelijks van traditioneel metselwerk of stucwerk te onderscheiden. Er is totale ontwerpflexibiliteit.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Fabel 2: "Dit kan meegaan als tijdelijk noodgebouw." Fout. Onze prefab uitbouwen voldoen strikt aan het Bouwbesluit voor permanente nieuwbouwwoningen en verhogen substantieel de getaxeerde verkoopwaarde.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQS ACCORDION */}
      <section id="faq" className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20" id="faq-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              ANALYSE EN VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over prefab uitbouw
            </h2>
          </div>

          <div className="space-y-4" id="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300"
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
      <section className="py-24 bg-white" id="final-cta-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Benieuwd naar de <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  mogelijkheden bij u?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Ontdek direct wat voor uw type woning mogelijk is, bekijk prijzen en ontvang binnen een mum van tijd een volledig gratis, professionele prijsopgave.
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
          <h1>Prefab uitbouw: wat is het, voordelen en nadelen</h1>
          <p>Een prefab uitbouw is een constructieve uitbreiding van de woning waarvan de muren, het daksysteem en de draagbalkconstructies in een fabriek worden gefabriceerd en nadien op de kavel worden opgesteld. Voordelen: korte bouwtijd op locatie (ruwbouw in 1 dag), vaste calculaties en planning, weersonafhankelijke fabriekskwaliteit Rc 6.0 en minimale logistieke hinder. Nadelen: alle maten en keuzes liggen vooraf vast, er moet kraantoegankelijkheid zijn. Richtprijzen: circa € 2.500 tot € 4.500 per m².</p>
          <p>Offerte aanvragen? Mail naar offerte@prefabselect.nl of bezoek onze website op www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
