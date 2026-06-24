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
  Factory, 
  HelpCircle,
  Sparkles,
  Zap,
  Building,
  Activity,
  Award,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function EindhovenLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Prefab Uitbouw & Aanbouw Eindhoven | Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Prefab uitbouw of aanbouw in Eindhoven? Prefab Select levert snel, duurzaam en met vaste prijs. 10 jaar garantie. Vraag vrijblijvend uw offerte aan."
      );
    }

    // Dynamic JSON-LD Schema injection for Eindhoven
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-eindhoven-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/eindhoven",
          "url": "https://www.prefabselect.nl/regio/eindhoven",
          "name": "Prefab Uitbouw & Aanbouw Eindhoven | Prefab Select",
          "description": "Prefab uitbouw of aanbouw in Eindhoven? Prefab Select levert snel, duurzaam en met vaste prijs. 10 jaar garantie. Vraag vrijblijvend uw offerte aan.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Eindhoven", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Eindhoven", "item": "https://www.prefabselect.nl/regio/eindhoven" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/eindhoven#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een aanbouw of uitbouw in Eindhoven?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aan de achterkant mag vaak tot 4 meter diep vergunningsvrij worden uitgebouwd. Er zijn echter lokale afwijkingen en regels voor monumenten of specifieke bestemmingsplannen. Wij kunnen een gratis check doen voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is de bouwtijd van een prefab aanbouw?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De ruwbouw staat meestal binnen 1 dag. Het gehele proces op locatie inclusief afwerking duurt circa 1 tot 2 weken."
              }
            },
            {
              "@type": "Question",
              "name": "Waarom is prefab duurzamer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Prefab fabricage vindt plaats onder gecontroleerde omstandigheden in onze fabriek. Dit leidt tot minder materiaalgerelateerd afval, perfecte droging, betere isolatiewaarden en minder transportbewegingen op locatie."
              }
            },
            {
              "@type": "Question",
              "name": "Welke garantie krijg ik?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wij bieden standaard 10 jaar garantie op de gehele dragende constructie van uw prefab aanbouw, zodat u verzekerd bent van absolute kwaliteit."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-eindhoven-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Advies en kennismaking',
      desc: 'We bespreken uw wensen, de mogelijkheden en welk type prefab oplossing het beste bij uw woning past.'
    },
    {
      nr: '2',
      title: 'Ontwerp op maat',
      desc: 'U ontvangt een ontwerp afgestemd op uw situatie: afmetingen, materialen, gevelafwerking, kozijnen en indeling.'
    },
    {
      nr: '3',
      title: 'Productie in de fabriek',
      desc: 'We bouwen uw uitbouw of aanbouw prefab onder geconditioneerde omstandigheden: minder afval en constante kwaliteit.'
    },
    {
      nr: '4',
      title: 'Snelle plaatsing',
      desc: 'De elementen worden op locatie snel en efficiënt gemonteerd: kortere bouwtijd en minder overlast.'
    }
  ];

  const wijken = [
    'Woensel',
    'Tongelre',
    'Stratum',
    'Gestel',
    'Strijp',
    'Meerhoven',
    'Acht',
    'Blixembosch'
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Eindhoven?',
      answer: 'Vaak niet. Een uitbouw aan de achterzijde valt regelmatig binnen de landelijke vergunningvrije regels, mits u binnen de maximale diepte en hoogte blijft. Ligt uw woning in een beschermd stadsgezicht of wijkt het plan af, dan is een omgevingsvergunning bij de gemeente Eindhoven nodig. Wij checken dit gratis voor u.'
    },
    {
      question: 'Hoe lang duurt een prefab uitbouw of aanbouw?',
      answer: 'De productie in de fabriek duurt doorgaans enkele weken. De plaatsing op locatie gebeurt vaak binnen een tot enkele dagen, waardoor u veel sneller resultaat heeft dan bij traditionele bouw.'
    },
    {
      question: 'Wat kost een prefab uitbouw of aanbouw?',
      answer: 'Als indicatie ligt een prefab uitbouw doorgaans tussen circa 2.500 en 4.500 euro per m², afhankelijk van afmetingen, afwerking en fundering. U ontvangt altijd een heldere offerte met prijsgarantie tot 12 maanden.'
    },
    {
      question: 'Welke garantie krijg ik?',
      answer: 'Op de volledige constructie geven wij 10 jaar garantie. Daarnaast geldt een prijsgarantie tot 12 maanden, zodat u niet voor verrassingen komt te staan.'
    },
    {
      question: 'Is prefab net zo hoogwaardig als traditionele bouw?',
      answer: 'Ja. Doordat we in een geconditioneerde fabriek bouwen, is de kwaliteit constant en vaak hoger. De modules worden compleet afgewerkt geleverd en sluiten naadloos aan op uw woning.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-36 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/85 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/40 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link to="/diensten" className="hover:text-white transition-colors">Regio's</Link>
            <span>&rsaquo;</span>
            <span className="text-blue-300">Eindhoven</span>
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
                    PREFAB SELECT BRAINPORT — EINDHOVEN
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Prefab uitbouw <br />
                  &amp; aanbouw <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    in Eindhoven
                  </span>
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium">
                  Wonen in Eindhoven betekent vaak wonen in een stad die in beweging is. Door de groei van Brainport en de aanhoudende druk op de woningmarkt kiezen steeds meer Eindhovenaren ervoor om niet te verhuizen, maar hun huidige woning uit te breiden. Een prefab uitbouw of aanbouw geeft u extra leefruimte zonder de rompslomp en doorlooptijd van traditionele bouw.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link 
                    to="/offerte" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Vraag gratis offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/werkwijze" 
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Ontdek de werkwijze
                  </Link>
                </div>

                {/* Micro USPs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Timer size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Snelle Bouwtijd</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Plaatsing binnen enkele dagen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">10 JAAR GARANTIE</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Op de gehele constructie</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">VASTE PRIJS</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Duidelijkheid vooraf</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-1" />
            <div className="lg:col-span-4 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative"
              >
                {/* Accent shape background */}
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-2xl -z-10" />

                {/* Main image container */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900 relative">
                  <img 
                    src="https://i.imgur.com/D8wSgm6.jpeg" 
                    alt="Prefab uitbouw Eindhoven" 
                    className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Trust badge with 20 Year Warranty accent */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10 animate-float">
                  <span className="block font-display font-black text-2xl leading-none">10 JAAR</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Constructie garantie
                  </span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* INTRO CONTENT SECTION */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-md">
                <img 
                  src="https://i.imgur.com/8PRcJDN.jpeg" 
                  alt="Ontwerp van een aanbouw" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZONDER TE VERHUIZEN
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Meer ruimte in Eindhoven <br />
                <span className="text-blue-600 italic font-light lowercase">
                  zonder verhuisperikelen
                </span>
              </h2>
              
              <div className="text-slate-500 leading-relaxed font-medium space-y-6">
                <p>
                  Eindhoven kent veel naoorlogse wijken zoals Woensel, Tongelre, Gestel en Stratum, met rijwoningen en twee-onder-een-kapwoningen uit de jaren &apos;50 tot &apos;70. Juist deze woningen lenen zich uitstekend voor een uitbouw aan de achterzijde: een grotere keuken, een lichte woonkeuken of een extra zit- en eethoek.
                </p>
                <p>
                  In gerenoveerde Strijp-panden en de nieuwere wijken rond Meerhoven zien we daarnaast veel vraag naar een prefab aanbouw als thuiswerkplek of bijkeuken. Onze modules worden volledig in de fabriek gemaakt en in Eindhoven met minimale overlast geplaatst.
                </p>
              </div>

              <div className="mt-10">
                <Link 
                  to="/offerte" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-950 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-900 transition-colors"
                >
                  Vrijblijvend adviesgesprek <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOLUTIONS GRIDS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ONZE MODULAIRE SYSTEMEN
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Prefab oplossingen <br />
              <span className="text-blue-600 italic font-light lowercase">
                voor elke situatie
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Prefab uitbouw',
                desc: 'Vergroot uw woonkamer, keuken of woonkeuken met een uitbouw aan de achterzijde van uw woning.'
              },
              {
                title: 'Prefab aanbouw',
                desc: 'Een aanbouw als bijkeuken, thuiskantoor, slaapkamer of extra leefruimte aan de zij- of achterkant.'
              },
              {
                title: 'Vakantiewoningen & chalets',
                desc: 'Complete prefab vakantiewoningen en chalets, sleutelklaar en duurzaam opgeleverd.'
              }
            ].map((sol, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xs hover:shadow-[0_40px_80px_rgba(29,78,216,0.05)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8">
                    <Building size={20} />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                    {sol.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {sol.desc}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50">
                  <Link 
                    to="/offerte" 
                    className="text-blue-600 hover:text-blue-700 text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 group"
                  >
                    Vind meer uit <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW WE WORK (STEPS) */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOOS PROCES
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Zo werken wij <br />
              <span className="text-blue-600 italic font-light lowercase">
                aan uw droomproject
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stappen.map((stap, i) => (
              <div key={i} className="relative">
                {/* Horizontal dashed line */}
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

      {/* WHY CHOOSE US GRIDS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              EINDHOVEN KIEST MAATWERK
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Waarom kiezen voor <br />
              <span className="text-blue-600 italic font-light lowercase">
                Prefab Select in Eindhoven?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Snelle bouwtijd',
                desc: 'Prefab productie in de fabriek betekent plaatsing in dagen in plaats van weken of maanden.',
                icon: <Timer size={22} />
              },
              {
                title: 'Vaste prijs',
                desc: 'Een prijsgarantie tot 12 maanden, zonder verrassingen achteraf.',
                icon: <Gem size={22} />
              },
              {
                title: 'Duurzaam',
                desc: 'Geconditioneerde productie zorgt voor minder afval, lagere CO2-uitstoot en energiezuinige materialen.',
                icon: <Leaf size={22} />
              },
              {
                title: '10 jaar garantie',
                desc: 'Op de volledige constructie van onze woningen en uitbreidingen geven wij 10 jaar garantie.',
                icon: <Award size={22} />
              },
              {
                title: 'Minder overlast',
                desc: 'Doordat het meeste werk in de fabriek gebeurt, blijft de overlast bij u op locatie beperkt.',
                icon: <CheckCircle2 size={22} />
              },
              {
                title: 'Hoogwaardige afwerking',
                desc: 'Modules worden compleet afgewerkt geleverd en sluiten naadloos aan op uw bestaande woning.',
                icon: <Sparkles size={22} />
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DISTRICTS / WIJKEN & RULES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Districts list */}
            <div className="lg:col-span-6 bg-slate-50/50 rounded-[3rem] p-12 border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                WERKGEBIED BRAINPORT
              </span>
              <h2 className="text-3xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4">
                Wijken in Eindhoven die wij bedienen
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
                Wij plaatsen prefab uitbouwen, aanbouwen en vakantiewoningen in heel Eindhoven en omgeving, waaronder:
              </p>

              <div className="grid grid-cols-2 gap-4">
                {wijken.map((wijk, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-xl border border-slate-100 shadow-3xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-blue-950 uppercase tracking-wide">{wijk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Permits & Rules info box */}
            <div className="lg:col-span-6 bg-blue-950 text-white rounded-[3rem] p-12 relative overflow-hidden h-full min-h-[400px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                  REGELS & VERGUNNINGEN
                </span>
                <h2 className="text-2xl md:text-3.5xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none">
                  Vergunning en regels in Eindhoven
                </h2>
                <p className="text-blue-100/60 text-sm leading-relaxed font-semibold">
                  Voor een uitbouw aan de achterkant van uw woning in Eindhoven is lang niet altijd een omgevingsvergunning nodig. Blijft u binnen de vergunningvrije maten van het achtererfgebied, dan kunt u vaak snel starten. Wij toetsen uw plan geheel kosteloos aan de regels van de gemeente Eindhoven en verzorgen indien nodig de complete vergunningaanvraag.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5">
                <Link 
                  to="/offerte" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-colors"
                >
                  Regel Vergunningcheck <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              VEELGESTELDE VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Prefab bouwen in Eindhoven
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

      {/* CTA & LINKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Klaar voor meer <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  ruimte in Eindhoven?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Ontvang een vrijblijvende offerte met vaste prijs en 10 jaar garantie. Wij denken graag met u mee over de mogelijkheden voor uw woning in Eindhoven.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/offerte" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                >
                  Vraag uw offerte aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/projecten" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                >
                  Bekijk onze projecten
                </Link>
              </div>
            </div>
          </div>

          {/* Other Regions list */}
          <div className="mt-24 pt-16 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">
              PREFAB UITBOUW IN ANDERE REGIO&apos;S
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { name: 'Helmond', path: '/regio/helmond' },
                { name: 'Veldhoven', path: '/regio/veldhoven' },
                { name: 'Tilburg', path: '/regio/tilburg' },
                { name: 'Den Bosch', path: '/regio/den-bosch' },
                { name: 'Breda', path: '/regio/breda' },
                { name: 'Best', path: '/regio/best' },
                { name: 'Nuenen', path: '/regio/nuenen' }
              ].map((reg, idx) => (
                <Link 
                  key={idx}
                  to={reg.path} 
                  className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 text-center text-[10px] font-black uppercase tracking-wider text-blue-950 transition-colors hover:shadow-xs bg-white"
                >
                  {reg.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <KellyCTA />

    </div>
  );
}
