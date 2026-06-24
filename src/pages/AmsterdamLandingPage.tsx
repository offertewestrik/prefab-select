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
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function AmsterdamLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Amsterdam | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Amsterdam laten plaatsen? Lees alles over prefab uitbouw, vergunningen per stadsdeel, kosten en bouwtijd. Prefab Select bouwt uw extra ruimte snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Amsterdam
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-amsterdam-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/amsterdam",
          "url": "https://www.prefabselect.nl/regio/amsterdam",
          "name": "Uitbouw in Amsterdam | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Amsterdam laten plaatsen? Lees alles over prefab uitbouw, vergunningen per stadsdeel, kosten en bouwtijd. Prefab Select bouwt uw extra ruimte snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Amsterdam", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Amsterdam", "item": "https://www.prefabselect.nl/regio/amsterdam" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/amsterdam#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Amsterdam?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aan de achterzijde mag u onder bepaalde voorwaarden vaak tot 4 meter diep vergunningsvrij uitbouwen. Echter, door specifieke regels in Amsterdam (zoals beschermde stadsgezichten, erfgoedregels en de binnentuinen-regeling) is een vergunning of melding vaak wel vereist. Wij zoeken dit gratis voor uw adres uit."
              }
            },
            {
              "@type": "Question",
              "name": "Hoelang duurt het bouwen van een prefab uitbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat in slechts 1 dag op zijn plek. De totale montage op locatie inclusief fundering en afwerking duurt circa 1 tot 2 weken. De fabricage in onze werkplaats loopt hieraan vooraf."
              }
            },
            {
              "@type": "Question",
              "name": "Kan een prefab uitbouw overal over het dak gehesen worden?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, in Amsterdamse grachtenpanden of beknellende tuinen zetten we gerichte telescoopkranen in om de gefabriceerde segmenten soepel en schadevrij over het dak in de achtertuin te hijsen."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een uitbouw in Amsterdam ongeveer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De indicatieve kosten liggen tussen de €2.500 en €4.500 per m², afhankelijk van de benodigde fundering (zoals heipalen) en de gewenste opties zoals schuifpuien of lichtstraten."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-amsterdam-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'We kijken naar uw woning, uw wensen en wat er op uw specifieke plek mag. U krijgt een fraai ontwerp en een heldere offerte.'
    },
    {
      nr: '2',
      title: 'Vergunning Regelen',
      desc: 'Valt uw plan niet onder de vrijstelling? Dan helpen we u met de volledige aanvraag, inclusief alle benodigde tekeningen.'
    },
    {
      nr: '3',
      title: 'Productie in Werkplaats',
      desc: 'Terwijl de papieren rondkomen, worden de elementen op maat geproduceerd onder geconditioneerde omstandigheden — zonder overlast.'
    },
    {
      nr: '4',
      title: 'Plaatsing & Afwerking',
      desc: 'De fundering wordt voorbereid, waarna de uitbouw vaak in 1 dag staat en binnen enkele dagen compleet wordt afgewerkt.'
    }
  ];

  const stadsdelen = [
    { name: 'Amsterdam-Zuid', desc: 'Strikte welstandseisen en aanvullend beschermd stadsgezichtbeleid.' },
    { name: 'Amsterdam-West', desc: 'Prachtige historische gevels die vragen om uiterst precieze inpasbaarheid.' },
    { name: 'Amsterdam-Oost', desc: 'Specifiek beleid voor bouwwerken en uitbouwen aan de achterzijde.' },
    { name: 'Amsterdam-Noord', desc: 'Ruimere kavels met achtertuinen waar vergunningsvrij bouwen vaak ideaal past.' },
    { name: 'Amsterdam-Nieuw-West', desc: 'Veel naoorlogse bouw met uitstekende mogelijkheden voor diepere uitbouwen.' },
    { name: 'Amsterdam-Zuidoost', desc: 'Moderne wijken met pragmatische, soepele procedures voor uitbreidingen.' },
    { name: 'Amsterdam-Centrum', desc: 'Beschermd stadsgezicht en monumenten; puur maatwerk is hier de absolute norm.' }
  ];

  const faqs = [
    {
      question: 'Hoeveel mag ik uitbouwen zonder vergunning in Amsterdam?',
      answer: 'Aan de achterkant, binnen het achtererfgebied, mag dit vaak tot wel vier meter diep met een beperkte hoogte. Let op: in beschermde stadsgezichten en bij monumenten vervalt die vrijstelling direct, en bepaalde stadsdelen hebben aanvullende regels. Een vergunningcheck voor uw specifieke adres is daarom altijd noodzakelijk.'
    },
    {
      question: 'Wat is het verschil tussen een aanbouw en een uitbouw?',
      answer: 'In de praktijk worden de termen vaak door elkaar gebruikt. Strikt genomen is een uitbouw een verlenging van een bestaande leefruimte (bijvoorbeeld uw woonkamer of keuken die groter wordt), terwijl een aanbouw een aparte, nieuwe ruimte is die tegen het hoofdgebouw aan wordt geplaatst (zoals een bijkeuken of garage).'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De daadwerkelijke plaatsing en ruwbouw op locatie gebeurt doorgaans in slechts één dag. Inclusief voorbereiding, eventuele sonderingen en de volledige afbouw onderweg bent u meestal binnen een termijn van 4 tot 8 weken volledig klaar en geniet u al van uw nieuwe ruimte.'
    },
    {
      question: 'Is prefab net zo stevig en mooi als traditioneel metselwerk?',
      answer: 'Absoluut. Doordat de constructie en panelen onder perfect gecontroleerde omstandigheden in onze droge werkplaats geproduceerd worden, is de constructieve kwaliteit extreem constant en de pasvorm tot op de millimeter nauwkeurig. De gevelafwerking kiest u volledig zelf: van strak modern tot klassiek passend metselwerk.'
    },
    {
      question: 'Wat kost een uitbouw in Amsterdam ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van €2.500 tot €4.500 per vierkante meter, sterk afhankelijk van de gekozen materialen en afwerking. Een compacte uitbouw van ca. 12 m² start rond de €40.000, terwijl grotere of luxer afgewerkte uitvoeringen richting de €85.000 of meer gaan.'
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
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/40 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/diensten" className="hover:text-white transition-colors">Regio's</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">Amsterdam</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Left Info */}
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
                    PREFAB SELECT STADSBESTEK — AMSTERDAM
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Een uitbouw <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    in Amsterdam
                  </span> <br />
                  ruimte zonder verhuizen
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  De kinderen worden groter, het thuiswerken is gebleven en die keuken is eigenlijk altijd al te klein geweest. Verhuizen binnen Amsterdam is duur en zeldzaam — uitbouwen is vaak de slimmere zet. Ontdek hoe een prefab uitbouw of aanbouw snel en zonder onnodige stress gerealiseerd wordt.
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
                      <p className="text-[10px] text-blue-200/50 leading-none">Wind- en waterdicht geplaatst</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">10 JAAR GARANTIE</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Op onze sterke staalbouw</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Geen Verrassingen</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Eén vaste, heldere totaalprijs</p>
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
                    src="https://i.imgur.com/ueZgFnN.jpeg" 
                    alt="Premium prefab uitbouw Amsterdam" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Info Card beneath the layout */}
                <div className="mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="text-center sm:text-left">
                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-1">
                      OP MAAT GEMAAKT IN WERKPLAATS
                    </span>
                    <span className="text-sm font-bold text-white block">
                      Hoogwaardige prefab uitbouw
                    </span>
                    <span className="text-xs text-blue-200/50 block mt-0.5">
                      Minimale overlast op locatie
                    </span>
                  </div>
                  <Link 
                    to="/offerte"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg text-center"
                  >
                    Offerte aanvragen
                  </Link>
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
                ZONDER VERHUISDOZEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wie in Amsterdam woont,<br />
                <span className="text-blue-600 italic font-light lowercase">
                  kent het gevoel.
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  U houdt van uw huis, van de straat, van de levendige buurt waar de lokale bakker en koffiebar uw naam kennen. Alleen begint het binnenshuis te knellen. Een uitbouw of aanbouw biedt daarvoor de ultieme oplossing door de begane grond aan de achterzijde flink te verlengen.
                </p>
                <p>
                  Bij Prefab Select ontwerpen en bouwen we uw uitbreiding met hoogwaardige prefab elementen in onze eigen droge werkplaats. Dit scheelt u weken of zelfs maandenlange bouwoverlast aan huis en levert een resultaat op dat tot op de millimeter nauwkeurig klopt.
                </p>
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Alles wat u moet weten op een rij
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Geen loze verkooppraatjes — we nemen u op deze pagina helder en objectief mee door alle facetten van een woninguitbreiding in Groot-Amsterdam:
              </p>
              <ul className="space-y-4">
                {[
                  'Waarom uitbouwen in Amsterdam financieel uiterst slim loont',
                  'Wat prefab bouwen wezenlijk anders en voorspelbaarder maakt',
                  'Hoe de ingewikkelde vergunningseisen per stadsdeel in elkaar steken',
                  'Wat een Amsterdamse uitbouw gemiddeld kost en de doorlooptijd'
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

      {/* WHY AMSTERDAM EXCELLENT ROI */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-1" />
            <div className="lg:col-span-5 relative">
              <div className="rounded-[3.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="https://i.imgur.com/zfWAbPd.jpeg" 
                  alt="Ontwerp uw aanbouw" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                WAARDEVERMEERDERING & ROI
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Waarom juist in Amsterdam <br />
                <span className="text-blue-600 italic font-light lowercase">
                  uitbouwen echt loont
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  De rekensom in Amsterdam is anders dan vrijwel overal elders in Nederland. Vierkante meters zijn hier ontzettend schaars en kostbaar. Een grotere woning kopen betekent niet zelden honderden duizenden euro&apos;s extra, overdrachtsbelasting en het hele circus van bezichtigen en extreem overbieden. 
                </p>
                <p>
                  Een uitbouw voegt precies de gezochte meters extra leefruimte toe op de geliefde plek waar u nu al woont, voor een fractie van de verhuiskosten. Bovendien betaalt de extra vloeroppervlakte zich direct terug in de verkoopwaarde van uw woning. Een lichte, moderne leefkeuken met openslaande tuindeuren is exact waar de markt naar verlangt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PREFAB ADVANTAGE EXPLAINED */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              FABRIEKSKWALITEIT MAAKT HET VERSCHIL
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat onze prefab methode <br />
              <span className="text-blue-600 italic font-light lowercase">
                ongekend onderscheidend maakt
              </span>
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-semibold max-w-xl">
              Bij traditionele bouw gebeurt werkelijk alles direct bij u in de tuin: metselen, drogen, wachten op goed weer. Onze prefab methode verandert dit proces fundamenteel voor uw comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ongekende Snelheid',
                desc: 'De ruwbouw staat doorgaans binnen één enkele dag overeind. De afwerking op locatie is een kwestie van dagen in plaats van maanden.'
              },
              {
                title: 'Prijs- & Plangarantie',
                desc: 'Omdat het meeste constructiewerk in onze fabriek gebeurt, liggen de planning en prijs vooraf muurvast. Er is geen sprake van weersvertraging.'
              },
              {
                title: 'Minimale Bouwoverlast',
                desc: 'In een drukke, compacte Amsterdamse wijk met buren dichtbij en minimale opslagruimte aan de straat is een schone, snelle bouwperiode goud waard.'
              }
            ].map((adv, i) => (
              <div 
                key={i}
                className="bg-slate-50 border border-slate-100/80 rounded-[2.5rem] p-10 shadow-3xs hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-black text-lg mb-8">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                  {adv.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PERMIT LAWS */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                ZORGELOZE LOGISTIEK
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunningen & regels <br />
                <span className="text-blue-400 italic font-light lowercase">
                  in de hoofdstad
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Dit is het onderdeel waar de meeste Amsterdammers tegenop zien. En eerlijk: in Amsterdam is het inderdaad net iets ingewikkelder dan in een doorsnee buitenwijk. De landelijke regelgeving is gunstig — aan de achterkant van uw woning, binnen het achtererfgebied, mag u vaak vergunningsvrij tot <strong>4 meter diep</strong> uitbouwen.
                </p>
                <p>
                  Echter, vergunningsvrij is in Amsterdam niet overal echt vergunningsvrij. Woont u bijvoorbeeld in een beschermd stadsgezicht (denk aan de grachtengordel en grote delen van de oude stad) of in een gemeentelijk of rijksmonument? Dan vervalt deze vrijstelling direct. Ook hanteren stadsdelen zoals Zuid en Oost specifiek eigen beleid voor uitbouwen en dakterrassen.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Direct vergunningcheck doen <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Info className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Wij nemen het over
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Ziet u op tegen de administratie of het contact met de gemeente Amsterdam? Wij helpen u bij Prefab Select graag met een voorafgaande check en regelen desgewenst de volledige omgevingsvergunning aanvraag van A tot Z.
              </p>
              <Link 
                to="/offerte" 
                className="text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group hover:text-blue-300 transition-colors"
              >
                Laat ons uw vergunning checken <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              TRANSPARANTE KOSTENINDICATIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een uitbouw in Amsterdam?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Een vaste vierkante meterprijs zegt niet alles, want uw afwerkingswensen (zoals een complete lichtstraat, vloerverwarming of een schitterende glazen pui) bepalen het segment. We hanteren de volgende reële indicaties voor 2025/2026:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw / Indicator</span>
              <span className="text-right">Richtprijs Indicatie</span>
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
            * Dit betreft landelijke richtprijzen inclusief btw en montage. De uiteindelijke kosten zijn afhankelijk van de complexiteit van de Amsterdamse bodemgesteldheid (fundering) en de bereikbaarheid van uw perceel (bijvoorbeeld kraaninzet).
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              VAN DEFINITIEF CONCEPT TOT GEBRUIK
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Van eerste idee tot <br />
              <span className="text-blue-600 italic font-light lowercase">
                volledig opgeleverde leefruimte
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stappen.map((stap, i) => (
              <div key={i} className="relative">
                {i < 3 && (
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
              STRESSVRIJ DOOR DE STAD
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Uitbouwen per stadsdeel
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Amsterdam is qua regelgeving geen eenheid. Verschillende stadsdelen hanteren eigen accenten, welstandseisen en vergunningskaders:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stadsdelen.map((sd, i) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100/80 rounded-[2rem] p-8 hover:bg-slate-50 transition-colors">
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {sd.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  {sd.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ADDITIONAL CONTENT: SECTIONS FROM ORIGINAL DRAFT (GRID MIXED) */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Box 1 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">SLIMME ALTERNATIEVEN</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Uitbouw, opbouw of toch iets anders?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Niet elk ruimteknelpunt vraagt om exact dezelfde oplossing. Een traditionele uitbouw is de meest logische keuze wanneer u op de begane grond extra bruikbare ruimte mist, zoals voor een grotere keuken of riante woonkamer met zicht op uw tuin.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Mist u slaapkamers of een werkkamer op een hogere verdieping? Dan is een dakopbouw of dakkapel vaak een slimmere investering. We bekijken graag samen met u de mogelijkheden voor uw situatie.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">BELANGRIJKE FACTOREN</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Waar u op moet letten voor u begint
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Letten in Amsterdam op de funderingen. De Amsterdamse zachte ondergrond vereist zorgvuldig gekozen palen zodat de bestaande bouw niet uit balans wordt gebracht. 
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Stem ook vroegtijdig uw plannen af met de buren: goed nabuurschap voorkomt discussies op de erfgrenzen. Daarnaast toetsen we tijdig de bereikbaarheid van uw tuin voor de kraaninzet.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">ARCHITECTURAL DESIGN</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Licht, glas en de band met uw tuin
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw levert niet alleen extra meters op, doch transformeert eveneens hoe het huis aanvoelt dankzij de lichtinval. Amsterdamse herenhuizen en diepe panden kunnen achterin somber zijn. 
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Met een hoogwaardige glazen achterpui, lichtstraat of openslaande tuindeuren trekt u de tuin direct bij de woonkeuken — waardoor dit de favoriete plek van de woning wordt.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">ENERGY COMFORT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Comfort, isolatie en energiezuinigheid
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een uitbouw moet het hele jaar door comfortabel aanvoelen. Omdat onze panelen en dakelementen in een gecontroleerde fabriek worden opgebouwd, sluiten we kieren en koudebruggen volledig uit.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                U geniet van maximale warmte-isolatie in de winter en een aangenaam koel binnenklimaat in de zomer, gecombineerd met lagere stookkosten.
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
              DIVERSE ANTWOORDEN OP EEN RIJ
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over uitbouwen in Amsterdam
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300"
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
                Benieuwd wat er <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  bij u mogelijk is?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Vertel ons over uw woning en uw wensen, dan kijken we geheel vrijblijvend naar de mogelijkheden, de regels op uw adres en een eerlijke prijsindicatie.
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
