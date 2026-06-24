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

export default function TilburgLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Tilburg | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Tilburg laten bouwen? Lees alles over prefab uitbouw: vergunning, de Nota Omgevingskwaliteit en welstandsvrije gebieden, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Tilburg
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-tilburg-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/tilburg",
          "url": "https://www.prefabselect.nl/regio/tilburg",
          "name": "Uitbouw in Tilburg | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Tilburg laten bouwen? Lees alles over prefab uitbouw: vergunning, de Nota Omgevingskwaliteit en welstandsvrije gebieden, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Tilburg", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Tilburg", "item": "https://www.prefabselect.nl/regio/tilburg" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/tilburg#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Tilburg?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In Tilburg geldt bovendien dat voor ingrepen aan de achterzijde die niet aan de openbare ruimte grenzen meestal geen welstandstoets nodig is. Doe altijd de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is de Nota Omgevingskwaliteit in Tilburg?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dat is het kwaliteits- en welstandsbeleid van Tilburg, met als motto 'meer aandacht waar dat moet, meer vrijheid waar dat kan'. Er zijn welstandsvrije gebieden waar geen welstandstoets geldt; elders adviseert de Omgevingscommissie over het uiterlijk van een bouwplan."
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
              "name": "Wat kost een uitbouw in Tilburg ongeveer?",
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
      const existingScript = document.getElementById('json-ld-tilburg-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Persoonlijk Advies & Ontwerp',
      desc: 'We bekijken uw woning in Tilburg, bespreken uw wensen en maken een doordacht ontwerp. U ontvangt direct een heldere, transparante offerte.'
    },
    {
      nr: '2',
      title: 'Vergunningscheck & Welstand',
      desc: 'We controleren gratis of uw uitbouw in een welstandsvrij gebied valt. Moet er toch een vergunning komen? Dan regelen wij alles bij de gemeente.'
    },
    {
      nr: '3',
      title: 'Modulaire Prefabricage',
      desc: 'Elementen zoals de wanden, het dak en de kozijnen worden in onze werkplaats tot op de millimeter nauwkeurig gebouwd onder perfecte omstandigheden.'
    },
    {
      nr: '4',
      title: 'Snelle Montage op Locatie',
      desc: 'Na de voorbereiding van de fundering op de Brabantse zandgrond plaatsen we de gehele uitbouw binnen één dag. De ruwbouw staat direct windvast.'
    },
    {
      nr: '5',
      title: 'Fijne Afwerking & Oplevering',
      desc: 'We sluiten elektra aan, monteren beglazing, eventuele vloerverwarming of een lichtstraat, en leveren de gehele ruimte keurig gebruiksklaar op.'
    }
  ];

  const wijken = [
    { name: 'Reeshof & Moderne Wijken', desc: 'Sfeervolle, ruime gezinswijken met flinke achtertuinen en een goede achterom. Hier optimaliseren we vergunningsvrije normen tot wel 4 meter diep voor een grote, zonnige tuinkamer of een riante leefkeuken.' },
    { name: 'Oud-Noord, Korvel & Broekhoven', desc: 'Dichterbebouwde, sfeervolle historische wijken met soms smallere straatjes en specifieke erfgrenzen. Onze prefab methode is hier ideaal om logistieke overlast in de straat tot een minimum te beperken.' },
    { name: 'Berkel-Enschot & Udenhout', desc: 'Dorpse, karakteristieke kernen die bij de gemeente Tilburg horen. Hier stemmen we de uitstraling uiterst zorgvuldig af op de omgevingsvisie, zodat uw uitbouw perfect past in het traditionele straatbeeld.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Tilburg?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In Tilburg geldt bovendien dat voor ingrepen aan de achterzijde die niet aan de openbare ruimte grenzen meestal geen welstandstoets nodig is. Doe altijd de vergunningcheck voor uw adres.'
    },
    {
      question: 'Wat is de Nota Omgevingskwaliteit in Tilburg?',
      answer: 'Dat is het kwaliteits- en welstandsbeleid van Tilburg, met als motto "meer aandacht waar dat moet, meer vrijheid waar dat kan". Er zijn grote welstandsvrije gebieden waar geen welstandstoets geldt; elders adviseert de Omgevingscommissie over het uiterlijk van een bouwplan.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De montage van de prefab elementen op locatie duurt slechts één dag. Inclusief grondwerk, fundering op de Brabantse zandgrond en de fijne binnenafwerking bent u doorgaans binnen een week helemaal gereed.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Zeker. Fabrieksproductie betekent gecontroleerde omstandigheden, en dat zorgt voor een constante kwaliteit en strakke maatvoering. De uitstraling bepaalt u zelf, van een moderne glaswand of houtlook profielen tot een uitvoering die naatloos aansluit op uw bestaande metselwerk.'
    },
    {
      question: 'Wat kost een uitbouw in Tilburg ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer € 2.500 tot € 4.500 per vierkante meter, afhankelijk van uw gekozen materiaalniveau, bodemgesteldheid en afwerking. Een compacte uitbouw begint rond de € 40.000.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="tilburg-landing-page">
      
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
            <span className="text-blue-300">Tilburg</span>
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
                    PREFAB SELECT TILBURG
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Uitbouw in Tilburg <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    meer ruimte in een stad
                  </span> <br />
                  die blijft groeien
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans" id="hero-description">
                  Tilburg is nuchter, levendig en volop in beweging — van de Spoorzone tot de Reeshof. Mocht uw Brabantse woning om extra leefmeters vragen, dan bouwt Prefab Select een perfect geïntegreerde, weersbestendige aanbouw met minimale rompslomp en uitstekende isolatie.
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
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Tilburgs Beleid</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vrijheid dankzij welstandsvrijheid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-isolation">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Zandgrondfundatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Gunstig, berekend &amp; stabiel</p>
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
                    src="https://i.imgur.com/dHnph3R.jpeg" 
                    alt="Tilburg Prefab Uitbouw" 	
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
                  Tilburg is een fantastische stad om in te wonen dankzij de rijke cultuur, gezellige sfeer en moderne stadsdeelvoorzieningen. Na verloop van tijd kan de vertrouwde woning door gezinsuitbreiding of behoefte aan een ruime thuiswerkplek net wat te krap gaan voelen.
                </p>
                <p>
                  Met een hoogwaardige prefab uitbouw van Prefab Select vergroot u uw benedenverdieping op een vakkundige manier. Dit herbergt direct meer leefcomfort voor uw gezin en telt overtuigend mee in de waardebepaling van uw woning op de groeiende Tilburgse woningmarkt.
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
                  'Binnen 1 dag op locatie opgebouwd, direct volledig wind- en waterdicht',
                  'Geproduceerd in een droge, weersonafhankelijke fabriekshal',
                  'Gegarandeerd strakke millimeterkwaliteit rechtstreeks uit de werkplaats',
                  'Minimale overlast in uw wijk of voor uw buren tijdens de opbouwfase'
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
                  src="https://i.imgur.com/DLaFkHx.jpeg" 
                  alt="Prefab Select Fabriek Tilburg" 	
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
                Volledig droge fabricage <br />
                <span className="text-blue-600 italic font-light lowercase">
                  en uiterst snelle opbouw
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Traditionele bouw ter plaatse heeft dikwijls te maken met droogtijden, weersrisico's en langdurig lawaai. Prefab Select bereidt alle constructiedelen zorgvuldig voor in onze eigen werkplaats.
                </p>
                <p>
                  Terwijl uw wanden en dakelementen millimeterprecies in elkaar worden gezet, bereiden onze monteurs de fundering op locatie voor. Op de montagedag hijsen we de uitbouw op haar plek. Uw woning is razendsnel weer veilig wind- en waterdicht.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGULATION & WELSTAND Tilburg */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]" id="welstand-tilburg-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7" id="welstand-tilburg-content">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                MEER AANDACHT WAAR DAT MOET, MEER VRIJHEID WAAR DAT KAN
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Nota Omgevingskwaliteit <br />
                <span className="text-blue-400 italic font-light lowercase">
                  en welstandsvrije gebieden
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  De landelijke wetgeving biedt uitstekende vergunningsvrije mogelijkheden aan de achterkant van uw woning tot 4 meter diep. In Tilburg komt daar een gunstig uiterlijkbeleid bij: dankzij de <strong>Nota Omgevingskwaliteit</strong> zijn er grote gebieden volledig welstandsvrij, of gelden er geen uiterlijke eisen voor aanbouwen aan de achterkant die niet direct grenzen aan de openbare weg.
                </p>
                <p>
                  Dit biedt buitengewoon veel architectonische ontwerpvrijheid voor uw droomuitbouw. Valt uw woning in Berkel-Enschot, Udenhout of nabij een beschermd stadsgezicht in het centrum? Dan begeleiden wij het ontwerptraject en de gemeentelijke procedures uiterst zorgvuldig.
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
                Benieuwd of uw gewenste uitbouw valt onder een welstandsvrij regime of dat een omgevingsvergunning nodig is? Onze adviseurs zoeken het graag kosteloos voor u uit.
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
              Wat kost een uitbouw in Tilburg?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw gewenste materiaalkwaliteit, luxeniveau en de specifieke afmetingen bepalen de calculatie. Richtprijzen:
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
            * Dit betreft richtbedragen incl. btw en installatie. Tilburg en omgeving liggen grotendeels op stabiele zandgronden, wat doorgaans uiterst gunstig is voor de fundering; dit minimaliseert de voorbereidende constructiekosten in vergelijking met laaggelegen polder- of kleigebieden.
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
              Uw Tilburgs bouwtraject stap-voor-stap <br />
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
              Bouwen per stadsgebied in Tilburg
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Tilburg is een stad met uiteenlopende wijken, wat mede bepaalt wat verstandig en toegestaan is. Ontdek de logistieke kenmerken per zone:
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
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DE JUISTE KEUZE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Is een aanbouw de beste oplossing voor uw gezin?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Als u nood heeft aan extra meters leefruimte op de begane grond (voor het realiseren van een royale leefkeuken, een gezellige eethoek of een lichte tuinkamer), dan is een uitbouw veruit de meest gewenste en multifunctionele methode.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zoekt u echter een dakkapel of dakkapverhoging om een extra slaapkamer op zolder te winnen? Wij adviseren u graag volstrekt objectief over de meest efficiënte oplossing voor uw unieke woonsituatie.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">GOEDE VOORBEREIDING</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Grondige voorbereiding garandeert rust
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Het is raadzaam om vooraf kritieke factoren zoals de logistieke kraantoegankelijkheid op uw perceel, de exacte erfgrenzen en de bodemstabiliteit nauwkeurig in kaart te laten brengen.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze engineers en ontwerpers lopen al deze randvoorwaarden grondig met u door voordat we in de werkplaats overgaan tot productie, om alle risico's volledig uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">OPTIMAAL DAGLICHT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht vangen en de sfeer verrijken
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw levert niet alleen extra leefmeters op, maar herbergt sfeer. Veel Tilburgse woningen kunnen door dichte bebouwing in oudere wijken donkerder zijn gesitueerd.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een royale glazen achtergevel, vouwdeuren of een royale lichtstraat in het platte dak herbergt u het natuurlijke zonlicht diep binnenshuis en verbindt u de tuin nauwer met uw living.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs" id="analysis-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMISCHE TOPKLASSE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Tochtvrij, stormbestendig &amp; buitengewoon behaaglijk
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Tocht of warmteverlies in koude periodes behoort definitief tot het verleden. Onze geavanceerde prefab systemen bezitten uitmuntende thermische isolatiewaarden tot wel Rc 6.0.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dit draagt direct bij aan een aanzienlijk lagere energierekening en is optimaal en eenvoudig te combineren met systemen zoals vloerverwarming of warmtepompen.
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
              over uitbouwen in Tilburg
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
                Deel uw unieke woonsituatie en plannen met ons, dan calculeren en adviseren we geheel vrijblijvend om uw wooncomfort optimaal te verrijken.
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
          <h1>Uitbouw in Tilburg — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Tilburg en omgeving, waaronder de Reeshof, Berkel-Enschot en Udenhout. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Tilburg hanteert het beleid 'meer aandacht waar dat moet, meer vrijheid waar dat kan': er zijn welstandsvrije gebieden, en voor ingrepen aan de achterzijde is meestal geen welstandstoets nodig.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject hangt op locatie af van de vergunningsprocedure en transportspecificaties over de regio Tilburg. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
