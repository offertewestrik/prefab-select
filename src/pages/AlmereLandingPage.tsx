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

export default function AlmereLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Almere | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Almere laten bouwen? Lees alles over prefab uitbouw: vergunning, het welstandsvrije beleid, de polderondergrond, kosten, bouwtijd en regels per stadsdeel. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Almere
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-almere-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/almere",
          "url": "https://www.prefabselect.nl/regio/almere",
          "name": "Uitbouw in Almere | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Almere laten bouwen? Lees alles over prefab uitbouw: vergunning, het welstandsvrije beleid, de polderondergrond, kosten, bouwtijd en regels per stadsdeel. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Almere", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Almere", "item": "https://www.prefabselect.nl/regio/almere" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/almere#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Almere?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Almere is bovendien voor een groot deel welstandsvrij. In delen van Almere Haven kan een beschermd dorpsgezicht spelen; daar gelden strengere regels. Doe altijd de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat betekent welstandsvrij bouwen in Almere?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Almere zijn de meeste woongebieden welstandsvrij: de gemeente toetst uw bouwplan niet vooraf op het uiterlijk. Dat geeft u uitzonderlijk veel vrijheid in vorm en materiaal. Een omgevingsvergunning kan nog wel nodig zijn als uw uitbouw buiten de vergunningsvrije regels valt."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het plaatsen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat meestal binnen één dag wind- en waterdicht gemonteerd. Inclusief fundering en afwerking bent u doorgaans binnen een week helemaal klaar op de montagelocatie."
              }
            },
            {
              "@type": "Question",
              "name": "Moet ik rekening houden met de polderondergrond?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja. Almere is gebouwd op ingepolderde zeebodem. De polderondergrond van slappe klei- en veengrond vereist een vakkundige, berekende funderingsmethode met heipalen of schroefpalen. Wij berekenen en verzorgen de fundering volledig."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een uitbouw in Almere ongeveer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reken op een gemiddelde richtprijs van ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van de afwerking. Een compacte uitbouw begint rond de € 40.000. Een offerte op maat geeft het exacte bedrag voor uw woning."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-almere-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Almeers Advies op Maat',
      desc: 'We analyseren uw woning en kavel, bespreken de specifieke stedenbouwkundige mogelijkheden van Almere en optimaliseren het ontwerp met een doordachte poldercalculatie.'
    },
    {
      nr: '2',
      title: 'Vergunning & Welstandsvrij',
      desc: 'We overleggen over de omgevingsvisie van uw stadsdeel en benutten Almere’s unieke welstandsvrije regels om u maximale esthetische vrijheid te garanderen.'
    },
    {
      nr: '3',
      title: 'Prefab Engineering',
      desc: 'Uw uitbouw wordt millimeterprecies en volledig droog gefabriceerd in onze gecertificeerde werkplaats, zodat weerklimaat of regen geen invloed krijgen.'
    },
    {
      nr: '4',
      title: 'Berekende Funderingsmontage',
      desc: 'We slaan een stabiele fundering berekend op Almere’s kleirijke polderbodem en hijsen op de montagedag de gehele opbouw wind- en waterdicht in slechts 1 dag.'
    },
    {
      nr: '5',
      title: 'Sleutelklaar Opleveren',
      desc: 'We installeren alle beglazing, hoogwaardig geïsoleerde puien, lichtstraten en eventuele vloerverwarmingen vakkundig. Uw nieuwe leefruimte is gereed voor gebruik.'
    }
  ];

  const wijken = [
    { name: 'Almere Stad & Almere Buiten', desc: 'Sfeervolle, ruime gezinswijken. Hier optimaliseren we vergunningsvrije ontwerpen tot 4 meter diep. Perfect voor een royale zonnige tuinkamer of een droomkeuken met directe verbinding naar uw tuin.' },
    { name: 'Almere Poort & Almere Hout', desc: 'Bekend om moderne architectuur, vernieuwende zelfbouwprojecten en royale kavels. We benutten de welstandsvrije regels maximaal om een markant en eigentijds architectonisch design te bouwen.' },
    { name: 'Almere Haven & Oudere Kernen', desc: 'Het meest authentieke, dorpse stadsdeel aan het Gooimeer. Mogelijke welstandseisen of karakteristieke traditionele dorpsgezichten begeleiden wij uiterst zorgvuldig bij de gemeente.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Almere?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. Almere is bovendien voor een groot deel welstandsvrij. In delen van Almere Haven kan een beschermd dorpsgezicht spelen waar strengere regels gelden. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Wat betekent welstandsvrij bouwen in Almere?',
      answer: 'In Almere zijn de meeste woongebieden welstandsvrij: de gemeente toetst uw bouwplan niet vooraf op het esthetische uiterlijk. Dat geeft u uitzonderlijk veel vrijheid in vorm en materiaal. Een omgevingsvergunning kan nog wel nodig zijn als uw uitbouw buiten de vergunningsvrije regels of bestemmingsplannen valt; welstandsvrij is dus niet hetzelfde als direct vergunningvrij.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De montage van de prefab elementen op locatie duurt slechts één dag. Inclusief grondwerk, polderfundering en de fijne binnenafwerking bent u doorgaans binnen een week helemaal gereed.'
    },
    {
      question: 'Moet ik rekening houden met de polderondergrond van Almere?',
      answer: 'Ja. Almere ligt op ingepolderde, slappe klei- en veengrond die gevoelig is voor verzakking. Een doordachte, berekende fundering (met heipalen of schroefpalen) is absoluut essentieel om uw uitbouw stabiel te houden zonder de bestaande woning te belasten. Wij rekenen en verzorgen dit volledig.'
    },
    {
      question: 'Wat kost een uitbouw in Almere ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van uw gekozen materiaalniveau, bodemgesteldheid en afwerking. Een compacte uitbouw begint rond de € 40.000.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="almere-landing-page">
      
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
            <span className="text-blue-300">Almere</span>
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
                    PREFAB SELECT ALMERE
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Uitbouw in Almere <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    ruimte winnen in de
                  </span> <br />
                  jongste stad van Nederland
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans" id="hero-description">
                  Almere is gebouwd op ruimte, groen en eigentijds wonen. Mocht u extra meters wooncomfort wensen aan uw Flevolandse polderwoning, dan bouwt Prefab Select een stabiel gefundeerde, perfect geïsoleerde aanbouw — met minimale overlast en buitengewoon veel welstandsvrije vrijheid.
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
                      <p className="text-[10px] text-blue-200/50 leading-none">Ruwbouwelementen direct windvast</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-security">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Welstandsvrije Regels</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Optimale stedenbouwkundige vrijheid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-isolation">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Polderfundering</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vakkundig en verzakkingsvrij berekend</p>
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
                    src="https://i.imgur.com/uYzANLQ.jpeg" 
                    alt="Almere Prefab Uitbouw" 
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
                  Almere is een heerlijke stad om in te wonen dankzij de overmaat aan groen, waterpartijen en moderne voorzieningen. Toch kan ook uw polderwoning na verloop van tijd te krap voelen door gezinsuitbreiding of veranderende thuiswerkbehoeften. 
                </p>
                <p>
                  Met een hoogwaardige prefab uitbouw van Prefab Select vergroot u uw benedenverdieping aanzienlijk. Dit levert direct hoogstaand leefcomfort op voor uw gezin en draagt overtuigend bij aan een stevige waardevermeerdering van uw woning.
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
                  'Binnen 1 dag op locatie gemonteerd, direct volledig windvast',
                  'Geproduceerd in geclimatiseerde fabriekshal vrij van weersinvloeden',
                  'Perfect afgewerkte millimeterkwaliteit rechtstreeks uit de werkplaats',
                  'Buitengewoon soepel te combineren met polderfunderingsberekeningen'
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
                  src="https://i.imgur.com/dpcIuVA.jpeg" 
                  alt="Prefab Select Fabriek Almere" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7" id="process-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZONDER SNIDEND BOUWSTOF OF LANGDURIGE STEIGERS
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Uitzonderlijk snelle montage <br />
                <span className="text-blue-600 italic font-light lowercase">
                  en millimeterprecies resultaat
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Traditionele bouw ter plaatse heeft te maken met regeninvloeden, lange droogtijden en maandenlange geluidsoverlast in de tuin. Onze elementen worden compleet in de gecontroleerde werkplaats gebouwd.
                </p>
                <p>
                  Terwijl de dragende constructie in de fabriek ontstaat, realiseren wij bij u thuis een exact afgestemde polderfundering. Op de montagedag hijsen we de uitbouw ter plaatse. De aanbouw is nagenoeg direct regen- en winddicht verankerd.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGULATION & WELSTAND Almere */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]" id="welstand-almere-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7" id="welstand-almere-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                MAXIMALE CREATIEVE EN ESTHETISCHE VRIJHEID
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Almere's Welstandsvrije <br />
                <span className="text-blue-400 italic font-light lowercase">
                  en progressieve bouwbeleid
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  De landelijke wetten bieden veel vergunningsvrije ruimte aan de achterkant van uw woning tot 4 meter diep. Echter herbergt Almere nog een uniek voordeel: de gemeente voert in de meeste woonwijken een uiterst soepel, <strong>welstandsvrij beleid</strong>. 
                </p>
                <p>
                  Dit betekent dat plannen in Almere Stad, Buiten en Hout vooraf niet esthetisch getoetst worden op materiaalkeuze of kleurstelling. Dit geeft u maximale ontwerpvrijheid. Let wel op: Almere Haven als historische en karakteristieke kern heeft specifieker beleid waarop we het ontwerp deskundig afstemmen.
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
                Bezit uw woning specifiek stadsdeelbeleid of kunt u direct volledig vergunningsvrij configureren? Onze deskundigen zoeken het kosteloos voor u uit.
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
              Wat kost een uitbouw in Almere?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw gewenste materiaalkwaliteit, afwerking en de specifieke polderfundering bepalen de exacte calculatie. Richtprijzen:
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
            * Dit betreft richtbedragen incl. btw en installatie. Omdat Almere is gebouwd op drooggelegde polderbodem (diepgelegen zeeklei- en veenlagen), is een berekende constructieve fundering (met heipalen of schroefpalen) noodzakelijk om verzakkingsrisico's op termijn volledig uit te sluiten.
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
              Uw Almeers bouwtraject stap-voor-stap <br />
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
              Bouwen per regio in Almere
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Almere is opgedeeld in diverse modern geplande stadsdelen. Vind de specifieke stedenbouwkundige en praktische aspecten per gebied:
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
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">STRATEGIC CHOICE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een prefab aanbouw uw beste optie?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Als u extra leefruimte op de begane grond zoekt (voor het realiseren van een royale leefkeuken, een handig kantoor aan huis of een lichte eetkamer), dan is een uitbouw veruit de meest gewenste en multifunctionele methode.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Mist u eerder een extra kamer op zolder? Dan is een dakopbouw of dakkapel vaak een passend alternatief. Wij adviseren u graag volstrekt objectief over de meest efficiënte oplossing voor uw unieke woonsituatie.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Grondige polderondergrond-analyse
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Almere ligt volledig op de bodem van de voormalige Zuiderzee. De polderbodem van Flevoland kenmerkt zich door slappe zeeklei en diepgelegen veenlagen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Wij voeren standaard een grondsondering en constructieve berekening uit t.b.v. een exact berekende paalfundering, om op lange termijn elke vorm van verzakking of structurele schade 100% uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglichtbepaling en leefcomfort
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een uitbouw moet niet enkel functionele meters leveren, maar ook sfeer brengen. Veel Almeerse rijwoningen of geschakelde woningen zijn strak ontworpen, maar kunnen binnenshuis soms aan daglicht inboeten.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een riante glazen pui, minimalistische vouwdeuren of een royale lichtstraat in het platte dak haalt u het noord- of zuiderlicht diep binnenshuis en verbindt u uw tuin naadloos met uw living.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Uitmuntende en duurzame thermische isolatie
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Warmteverlies of tocht behoort definitief tot het verleden. Onze prefab wanden, vloeren en daksystemen bezitten uitmuntende isolatiewaarden tot wel Rc 6.0.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dit draagt direct en effectief bij aan een lagere energierekening en laat zich optimaal en eenvoudig integreren met moderne systemen zoals vloerverwarming of warmtepompen.
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
              over uitbouwen in Almere
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
          <h1>Uitbouw in Almere — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Almere en alle stadsdelen, waaronder Almere Stad, Almere Buiten, Almere Hout, Almere Poort en Almere Haven. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Almere is bovendien voor een groot deel welstandsvrij, wat veel esthetische en creatieve vrijheid biedt in materiaalkeuze en vormgeving; met Almere Haven als authentieke kern dient echter specifieker rekening te worden gehouden.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking en benodigde polderfundatie. De ruwbouw staat doorgaans in één dag; het totale traject hangt ter plaatse af van transportspecificaties, constructieve grondberekeningen en eventueel benodigde omgevingsvergunningen op de kavel. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
