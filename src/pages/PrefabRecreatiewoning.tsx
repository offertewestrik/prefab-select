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
  MapPin,
  Sparkles,
  Home,
  Waves,
  Trees
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function PrefabRecreatiewoning() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Prefab recreatiewoning bouwen: Wat kost het, regels & voordelen | Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Bent u van plan een prefab recreatiewoning of vakantiewoning te bouwen? Lees hier alles over de regelgeving, bestemmingsplannen, prijzen, voordelen en bouwtijd van modulaire vakantiehuizen."
      );
    }

    // Dynamic JSON-LD Schema injection for Prefab Recreatiewoning
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-prefab-recreatiewoning-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://www.prefabselect.nl/prefab-recreatiewoning",
          "headline": "Prefab recreatiewoning bouwen: regelgeving, voordelen en nadelen",
          "description": "Volledige transparantie over prefab recreatiewoningen en luxe vakantiehuizen. Kosten, wetgeving, en vergunningsvrije normen.",
          "inLanguage": "nl-NL",
          "author": { "@type": "Organization", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "publisher": { 
            "@type": "Organization", 
            "name": "Prefab Select", 
            "logo": { "@type": "ImageObject", "url": "https://www.prefabselect.nl/logo.png" } 
          },
          "mainEntityOfPage": "https://www.prefabselect.nl/prefab-recreatiewoning"
        },
        {
          "@type": "Service",
          "serviceType": "Prefab recreatiewoning",
          "provider": { 
            "@type": "GeneralContractor", 
            "name": "Prefab Select", 
            "url": "https://www.prefabselect.nl", 
            "email": "offerte@prefabselect.nl" 
          },
          "areaServed": { "@type": "Country", "name": "Nederland" },
          "description": "Constructie en realisatie van hoogwaardig geïsoleerde, modulaire en prefab vakantiehuizen op maat."
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/prefab-recreatiewoning#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wat is een prefab recreatiewoning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Een prefab recreatiewoning is een vakantiewoning waarvan de componenten in een gecontroleerde fabrieksruimte worden gebouwd en vervolgens op de bestemming (een recreatiepark of eigen natuurkavel) binnen enkele dagen wind- en waterdicht gemonteerd worden."
              }
            },
            {
              "@type": "Question",
              "name": "Mag ik permanent wonen in een recreatiewoning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Over het algemeen is permanente bewoning van een recreatiewoning in Nederland wettelijk niet toegestaan vanwege de recreatiebestemming in het bestemmingsplan (omgevingsplan). Sommige gemeenten hanteren een gedoogbeleid of persoonsgebonden omgevingsvergunning, maar dit verschilt sterk per regio."
              }
            },
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor het bouwen van een prefab vakantiehuis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, in de meeste gevallen is een omgevingsvergunning voor de activiteit bouwen verplicht. Bovendien dient het bouwwerk te voldoen aan specifieke regels uit het omgevingsplan van de gemeente, zoals maximale bouwhoogte en grondoppervlakte."
              }
            },
            {
              "@type": "Question",
              "name": "Wat kost een prefab recreatiewoning gemiddeld?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "De prijzen variëren afhankelijk van de grootte en luxe van circa € 75.000 voor compacte lodges tot € 175.000+ voor luxe ecologische villa's met grote raampartijen, wellnessuitrustingen en warmtepomp."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('json-ld-prefab-recreatiewoning-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const advantages = [
    { title: 'Razendsnelle montage op locatie', desc: 'Aangezien de basis in modules of panelen in de fabriek ontstaat, staat de ruwbouw vaak in 1 tot 3 dagen op uw kavel.' },
    { title: 'Superieure isolatie', desc: 'Onze recreatiewoningen zijn gebouwd volgens dezelfde strenge eisen als permanente woningen, resulterend in lage stookkosten.' },
    { title: 'Geen faal- of weerkosten', desc: 'Door de droge, overdekte productie is er geen vertraging door vorst of regenbelasting op uw houten skelet.' },
    { title: 'Ideaal voor verhuur', desc: 'Dankzij het moderne design en uitstekende binnenklimaat realiseert u een structureel hogere bezettingsgraad.' },
    { title: 'Minimale overlast', desc: 'Rustzoekers op het park of omwonenden in de natuur ervaren vrijwel geen lawaai of langdurige modderhinder.' },
    { title: 'Hernieuwbaar materiaalgebruik', desc: 'Gebouwd met gecertificeerd duurzaam hout en ecologische isolatiematerialen voor een lage ecologische footprint.' }
  ];

  const disadvantages = [
    { title: 'Vrijwel geen improvisatie', desc: 'Elke wanddoos, elk stopcontact en elk kozijn ligt vooraf vast in de CAD-tekening; wijzigingen tijdens de montage zijn nagenoeg onmogelijk.' },
    { title: 'Transport restricties', desc: 'De breedte- en hoogtematen van uw droomlocatie moeten bereikbaar zijn voor speciaal transport (vrachtwagens en kranen).' },
    { title: 'Permanente restrictie', desc: 'Recreatiebestemmingen garanderen niet dat u er permanent mag inschrijven; gemeenten handhaven hier streng op.' },
    { title: 'Grondwerk & nutsvoorzieningen', desc: 'U dient vooraf de fundering en de nutsaansluitingen (water, elektra, riool) gereed te hebben. Wij kunnen dit uiteraard ontzorgen.' }
  ];

  const modelLines = [
    { model: 'Compact Eco Studio (ca. 45 m²)', space: '1-2 Slaapkamers', range: 'Ideaal als natuur-lodge of verhuurmodel', price: 'vanaf € 75.000' },
    { model: 'Modern Family Lodge (ca. 70 m²)', space: '2-3 Slaapkamers', range: 'Royale living, schuifpui en luxe badkamer', price: 'vanaf € 115.000' },
    { model: 'Premium Exclusive Villa (ca. 95 m²)', space: '3-4 Slaapkamers', range: 'Inclusief wellness, warmtepomp & houten designgevel', price: 'vanaf € 165.000' }
  ];

  const compareAspects = [
    { label: 'Bouwtijd ter plaatse', prefab: '1 tot 3 dagen (zeer kort)', traditional: '3 tot 6 maanden (langdurig)' },
    { label: 'Isolatieniveau (Rc-waarde)', prefab: 'Rc 6.0+ (perfect thermo-comfort)', traditional: 'Wisselend (afhankelijk van metselwerk)' },
    { label: 'Overlast op recreatiepark', prefab: 'Verwaarloosbaar, geen bouwplaats', traditional: 'Enorme hinder voor andere parkgasten' },
    { label: 'Onderhoudsbehoefte', prefab: 'Laag door verduurzaamde materialen', traditional: 'Regulier schilderwerk en voegonderhoud' },
    { label: 'Investering & Planning', prefab: '100% vooraf vastgesteld', traditional: 'Risico op meerwerk door onvoorziene vertraging' }
  ];

  const steps = [
    {
      nr: '1',
      title: 'Vrijblijvend Advies',
      desc: 'Samen analyseren we de bestemmingsplannen van uw recreatiekavel en ontwerpen we uw droomvakantiehuis op maat.'
    },
    {
      nr: '2',
      title: 'Vergunningcheck & CAD',
      desc: 'Wij vertalen het ontwerp naar gedetailleerde CAD-modellen en dienen de benodigde omgevingsvergunning in bij de lokale overheid.'
    },
    {
      nr: '3',
      title: 'Gecontroleerde Productie',
      desc: 'Wanden, vloeren en daken worden onder constante condities tot op de millimeter nauwkeurig in onze eigen werkplaats gebouwd.'
    },
    {
      nr: '4',
      title: 'Montage in Één Week',
      desc: 'Het speciaal transport brengt de elementen naar de kavel. Een telescoopkraan assembleert de complete ruwbouw duurzaam en snel.'
    },
    {
      nr: '5',
      title: 'Sleutelklaar Genieten',
      desc: 'Na de esthetische interieurafwerking en installatiekoppelingen overhandigen we de sleutel van uw eigen, direct bewoonbare oase.'
    }
  ];

  const faqs = [
    {
      question: 'Wat is een prefab recreatiewoning precies?',
      answer: 'Een prefab recreatiewoning is een vakantiehuis waarvan de constructieve elementen (wanden, vloeren, daksystemen) vooraf in onze fabriek worden samengesteld. Vervolgens worden de onderdelen naar uw kavel getransporteerd en daar gemonteerd. Dit resulteert in superieure fabriekskwaliteit en minimaliseert bouwoverlast ter plaatse.'
    },
    {
      question: 'Mag ik permanent gaan wonen in mijn recreatiewoning?',
      answer: 'Nee, wettelijk gezien mag dat in Nederland meestal niet. Een recreatiewoning heeft een recreatiebestemming, wat betekent dat de woning exclusief bedoeld is voor vakanties of tijdelijk verblijf. Gemeenten controleren hier steeds actiever op. Er zijn soms uitzonderingen (zoals gedoogbesluiten of overgangsregelingen), maar ga hier nooit zomaar vanuit zonder schriftelijke toestemming van de gemeente.'
    },
    {
      question: 'Heb ik een omgevingsvergunning nodig voor de bouw?',
      answer: 'Ja, in vrijwel alle gevallen is voor een recreatiewoning een omgevingsvergunning (de voormalige bouwvergunning) vereist. Naast de afmetingen moeten de plannen ook voldoen aan het omgevingsplan (bestemmingsplan) en het Bouwbesluit. Wij begeleiden u tijdens deze complexe procedure en leveren alle vereiste technische berekeningen aan.'
    },
    {
      question: 'Hoe zit het met de isolatiewaarde van een prefab vakantiehuis?',
      answer: 'Onze prefab vakantiewoningen worden gebouwd met hoogwaardige isolatiematerialen en triple of HR++ glas. Dit resulteert in uiterst hoge Rc-waarden (tot wel Rc 6.0), vergelijkbaar met moderne permanente eengezinswoningen. Hierdoor blijft het huis zomers heerlijk koel en is het in de winter met een minimum aan energie behaaglijk warm.'
    },
    {
      question: 'Zijn de recreatiewoningen bestand tegen zware weersomstandigheden?',
      answer: 'Ja. Omdat we uitsluitend gebruikmaken van zware, gecertificeerde houtskeletbouw- of staalframe-constructies en verduurzaamde buitenbeplating, zijn ze uitstekend bestand tegen storm, hevige regenval en zilte zeelucht nabij de kust.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-100 selection:text-blue-900" id="prefab-recreatiewoning-page">
      
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
            <span className="text-blue-300">Prefab Recreatiewoning</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Left Content */}
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
                    ECO-LIVING &middot; RECREATIE
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase" id="hero-title">
                  Prefab recreatie<wbr />woning <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    duurzaam &amp; luxe op maat
                  </span> <br />
                  in recordtijd geplaatst.
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed font-medium font-sans border-l-4 border-blue-600 pl-6" id="hero-description">
                  Ontsnap aan de drukte in uw eigen premium vakantiewoning. In de droge werkplaats vervaardigd, met een uitzonderlijk comfortniveau, heldere prijsafspraken en minimale montagebelasting op uw gewijde kavel.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12" id="hero-ctas">
                  <Link 
                    to="/offerte" 
                    id="hero-primary-btn"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
                  >
                    Ontvang gratis prijsopgave <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a 
                    href="#regeling-wetgeving" 
                    id="hero-secondary-btn"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
                  >
                    Wetgeving &amp; Regels Checken
                  </a>
                </div>

                {/* Micro USPs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10" id="micro-usps">
                  <div className="flex items-center gap-3" id="usp-energy">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Passief Comfort</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Rc 6.0+ isolatie voor alle seizoenen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-security">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Gecertificeerd hout</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">100% duurzaam en ecologisch</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" id="usp-fixed-time">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Snel geplaatst</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Ruwbouw staat vaak in 1-3 dagen</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Hero Right Graphic */}
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
                    src="https://i.imgur.com/ZsBPHxQ.jpeg" 
                    alt="Premium Prefab Recreatiewoning" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-[2rem] px-6 py-5 shadow-2xl border border-white/10" id="hero-architect-badge">
                  <span className="block font-display font-black text-2xl leading-none">A+</span>
                  <span className="block text-[8px] font-black uppercase tracking-widest leading-none mt-1 opacity-80">
                    Energieklasse
                  </span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE EXPLANATION */}
      <section className="py-24 md:py-32 bg-white" id="architectural-perfection">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="max-w-xl" id="intro-design-text">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ARTISANS OF SPACE
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wat is een prefab <br />
                recreatiewoning precies?
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Een prefab recreatiewoning of vakantiewoning combineert de ontspannen ambiance van een vakantie-oord met de constructieve superioriteit van hoogwaardige nieuwbouw. In plaats van maandenlange steigerbouw te verduren in een bos of op een park, borgen we de kwaliteit onder perfecte klimatologische condities in onze geavanceerde werkplaats.
                </p>
                <p>
                  Wanden worden robotgestuurd voorzien van isolatie (tot Rc 6.0), leidingschachten en geïntegreerde houten of aluminium kozijnen met drievoudig glas. Vervolgens transporteren wij uw woning in complete modules of kant-en-klare wanden naar de kavel, waar een mobiele kraan het geheel in recordtijd wind- en waterdicht moduleert.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="intro-right-card">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Ontworpen voor de natuur
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold mb-6">
                Of u nu kiest voor een modern houten designbekleding die perfect opgaat in het loofbos, of voor een strakke, minimalistische lounge-architectuur aan zee: onze vakantiewoningen worden ontworpen met diep respect voor hun omgeving. Met slimme indelingen creëren we een royale ruimtelijke beleving, óók binnen de beperkte vierkante meters die de gemeente voorschrijft.
              </p>
              <div className="flex gap-4">
                <Link to="/offerte" className="text-white bg-blue-600 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-2 group">
                  Bereken Prijs <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="text-blue-950 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-wider">
                  Stel een Vraag
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DISCIPLINED PROS & CONS */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100" id="voordelen-nadelen-sectie">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20" id="pros-cons-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              UITVOERIGE ANALYSE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              De voordelen en nadelen op een rij
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Het bouwen van een eigen recreatie-oord vraagt om een reëel perspectief. Wij presenteren u een evenwichtige oordeelvorming, zodat u met een gerust hart de juiste keuze maakt:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" id="pros-cons-grid">
            
            {/* Pros card */}
            <div className="bg-white border border-slate-100 border-t-4 border-t-emerald-600 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="pros-card">
              <div className="inline-flex items-center gap-3 mb-8" id="pros-badge">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ThumbsUp size={16} />
                </div>
                <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950">
                  De Grote Voordelen (Pluspunten)
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

            {/* Cons card */}
            <div className="bg-white border border-slate-100 border-t-4 border-t-rose-600 rounded-[2.5rem] p-10 md:p-14 shadow-xs" id="cons-card">
              <div className="inline-flex items-center gap-3 mb-8" id="cons-badge">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle size={16} />
                </div>
                <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950">
                  De Aandachtspunten &amp; Nadelen
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

      {/* DETAILED REGULATION SECTION */}
      <section className="py-24 bg-white" id="regeling-wetgeving">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="bg-blue-950 text-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl" id="regels-accent-card">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
              <Compass className="text-blue-400 w-10 h-10 mb-6 relative z-10" />
              
              <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter text-white mb-6 relative z-10 leading-tight">
                Cruciaal: Bestemmingsplan, Vergunning &amp; Parkregels
              </h3>
              
              <div className="text-blue-100/70 text-xs md:text-sm leading-relaxed font-semibold space-y-4 relative z-10">
                <p>
                  Of u een prefab vakantiehuis mag plaatsen, is vrijwel altijd gebonden aan strenge gemeentelijke regels. Het omgevingsplan (voorheen bestemmingsplan) schrijft exact voor of er op uw kavel gerecreëerd mag worden, wat het maximale bebouwingsoppervlak is en aan welke esthetische welstandseisen voldaan moet worden.
                </p>
                <p className="border-l-2 border-blue-400 pl-4 py-1">
                  <strong>Belangrijk:</strong> Permanent wonen (inschrijven als hoofdverblijf) in een recreatiewoning of chalet is in 99% van de Nederlandse gemeenten strikt verboden. Gemeenten handhaven hier actief op door boetes of dwangsommen uit te delen.
                </p>
                <p>
                  Daarnaast hanteert een vakantiepark vaak aanvullende privaatrechtelijke parkregels omtrent de uiterlijke vormgeving, parkbeheer-bijdragen en de bereikbaarheid voor logistiek zwaar materieel.
                </p>
              </div>
            </div>

            <div className="max-w-xl" id="regels-details-right">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                ZORGELOZE WETGEVING
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Compleet vergunningstraject <br />
                <span className="text-blue-600 italic font-light lowercase">
                  volledig door ons ontzorgd
                </span>
              </h2>
              <div className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold space-y-6">
                <p>
                  Het indienen van een correcte omgevingsvergunning vereist nauwkeurige constructieve berekeningen, sonderingsrapporten, ventilatieberekeningen en detailtekeningen die aansluiten op het actuele Nederlandse Bouwbesluit.
                </p>
                <p>
                  Prefab Select neemt dit complete proces uit uw handen. We controleren vooraf de haalbaarheid in het <a href="https://omgevingswet.overheid.nl/checken" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline hover:text-blue-500">Omgevingsloket</a>, voeren overleg met uw parkbeheerder of de commissie ruimtelijke kwaliteit en leveren een sleutelklaar dossier op bij uw gemeente.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-slate-50/30 border-y border-slate-100" id="comparison-table-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="compare-intro">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              HOE VERHOUDT PREFAB ZICH?
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Prefab vs Traditionele Bouw
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Met name in de kwetsbare natuur of op actieve vakantieparken blinkt modulaire prefab uitbouw en woningbouw uit. Ontdek de wezenlijke verschillen:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-xs" id="comparisons-table">
            <div className="grid grid-cols-3 bg-blue-950 text-white p-6 md:px-10 text-[10px] font-black uppercase tracking-widest">
              <span>Aspect</span>
              <span className="text-center">Prefab Concept</span>
              <span className="text-right">Traditionele Bouw</span>
            </div>
            
            {compareAspects.map((row, i) => (
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

      {/* BUDGET AND RANGE TABLE */}
      <section className="py-24 bg-white" id="budget-section">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16" id="budget-header">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              EERLIJKE KOSTENTRANSPARANTIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kost een prefab recreatiewoning?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Onze ontwerpen zijn schaalbaar en modulair. Dit betekent dat we zowel instapklare basismodellen als op maat ontworpen, ecologische droomvilla's bouwen:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-xs mb-10" id="pricing-table">
            <div className="grid grid-cols-3 bg-blue-950 text-white p-6 md:px-10 text-[10px] font-black uppercase tracking-widest">
              <span>Model &amp; Formaat</span>
              <span className="text-center">Toepasbaarheid</span>
              <span className="text-right">Richtprijs (vanaf)</span>
            </div>
            
            {modelLines.map((row, i) => (
              <div 
                key={i} 
                className={`grid grid-cols-3 p-6 md:px-10 border-t border-slate-100 text-xs font-bold uppercase tracking-wider text-blue-950 ${
                  i % 2 === 0 ? 'bg-slate-50/20' : 'bg-white'
                }`}
                id={`pricing-row-${i}`}
              >
                <span className="font-black text-blue-950">{row.model}</span>
                <span className="text-center text-slate-500">{row.range}</span>
                <span className="text-right text-blue-600 font-black">{row.price}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 font-semibold text-center leading-relaxed" id="pricing-footnote">
            * De getoonde prijzen zijn indicatieve richtprijzen voor 2025–2026 en exclusief BTW (tenzij anders vermeld), transport- en kraankosten over extreme afstanden, grondwerkzaamheden op locatie en legeskosten van de gemeente. We maken graag een 100% sluitende, vaste offerte voor uw specifieke recreatiewens.
          </p>

          <div className="mt-12 text-center" id="budget-action">
            <Link to="/offerte" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl transition-all hover:-translate-y-1">
              Online Offerte Berekenen <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* STEPS OF REALIZATION */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100" id="realization-process">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left" id="process-lead">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOOS BEREIKT
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Stap-voor-stap <br />
              <span className="text-blue-600 italic font-light lowercase">
                naar uw eigen ontspanningsplek
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8" id="process-grid">
            {steps.map((step, i) => (
              <div key={i} className="relative" id={`step-item-${step.nr}`}>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 border-t-2 border-dashed border-slate-200 -z-10 -translate-x-6" />
                )}

                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-950 font-display font-black text-2xl text-white flex items-center justify-center mb-8 border-4 border-slate-50 shadow-md">
                    {step.nr}
                  </div>
                  <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTOR FOCUS & VERHUURMENTALITEIT */}
      <section className="py-24 bg-white" id="financial-investment-and-options">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl mb-16" id="investment-head">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              DE SLIMME BELEGGER
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Investering, Rendement en Lange Termijn
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
              Een prefab recreatiewoning is niet alleen een prachtig bezit voor eigen gebruik, maar tevens een ijzersterke investering:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" id="investment-bento-grid">
            
            {/* Box 1 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="investment-box-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">CASHFLOW EN VERHUUR</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Uitzonderlijk aantrekkelijk voor verhuur
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Dankzij de moderne architectuur, strakke designafwerkingen en grote glazen puien zijn onze recreatiewoningen absolute blikvangers op platforms zoals Booking.com of Airbnb. Dit stimuleert een bovengemiddelde bezettingsgraad het gehele jaar door.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Omdat de woningen door de uitmuntende thermische schil (Rc 6.0+) ook in het koudere najaar en de winter comfortabel warm te stoken zijn met een minimum aan energie, maximaliseert u de boekingen buiten het hoogseizoen.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="investment-box-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DURABILITY &amp; RESALE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Waardevastheid en levensduur
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                In tegenstelling tot traditionele stacaravans of eenvoudige chalets, worden onze prefab recreatiewoningen gebouwd volgens de strikte isolatie- en constructieprincipes van permanente woningbouw. Ze bezitten dezelfde structurele levensduur van 50 tot wel 75 jaar.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dit vertaalt zich direct in een uiterst hoge restwaarde. Uw vakantiehuis veroudert niet snel en behoudt of vermeerdert zijn getaxeerde waarde in de loop der jaren, wat cruciaal is bij een eventuele verkoop van de kavel.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="investment-box-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">ZERO EMISSION LIFE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Ecotoerisme en energiezuinigheid
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                De markt voor ecologisch toerisme groeit exponentieel. Gasten en parkbeheerders eisen steeds vaker ‘gasloze’ en duurzame oplossingen. Onze prefab houtskeletbouw woningen lenen zich bij uitstek voor een volledig energieneutraal (Nul-Op-De-Meter) concept.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                We integreren geruisloze lucht-water warmtepompen, slimme infraroodpanelen, zonnepanelen op het daksysteem en hoogwaardige drievoudige beglazing om uw energie-afdruk (en energierekening) tot nul te reduceren.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-slate-50/50 p-10 md:p-14 border border-slate-100 rounded-[3rem]" id="investment-box-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">CUSTOMIZATION ON POINT</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Talloze custom opties &amp; indelingen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                U heeft de volledige controle over de lay-out en inrichting. Van een geïntegreerde sauna of buitendouche, zwevende vide-slaapruimtes voor de kinderen tot een overdekte buitenkeuken die naadloos via een schuifpui verbonden is met de living.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Al deze wensen verwerken we direct in de fabriekstekening. Hierdoor worden alle doorvoeren en constructieversterkingen foutloos klaargemaakt in de fabriek, voor een gegarandeerde kwaliteit.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-20" id="faq-headline">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">
              VREAGEN &amp; ANTWOORDEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter mb-6 leading-none">
              Veelgestelde vragen <br />
              over recreatiewoningen
            </h2>
          </div>

          <div className="space-y-4" id="faq-accordion-group">
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
                    className="w-full flex items-center justify-between text-left gap-4 font-display font-black text-lg md:text-xl text-blue-950 uppercase tracking-tighter focus:outline-none"
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

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white" id="call-to-action-panel">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] px-8 py-20 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_60%)]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-none mb-8 tracking-tighter uppercase">
                Recreëren zonder <br />
                <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                  bouwellende of vertraging?
                </span>
              </h2>
              
              <p className="text-lg text-blue-100/60 leading-relaxed mb-12 font-medium max-w-xl mx-auto">
                Ontdek de ongekende architectonische mogelijkheden voor uw eigen kavel. Bereken in enkele muisklikken een transparante prijsindicatie op maat.
              </p>

              <Link 
                to="/offerte" 
                id="cta-calc-btn"
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
              >
                Vraag Een Offerte Aan <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

      {/* BACK TO DIENSTEN LINK */}
      <div className="max-w-7xl mx-auto px-6 pb-24 text-center" id="back-link-container">
        <Link 
          to="/diensten" 
          id="back-to-diensten-btn"
          className="inline-flex items-center gap-3 px-8 py-4 border border-slate-200 hover:border-blue-600 hover:text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[11px] text-slate-500 transition-all duration-300"
        >
          &larr; Terug naar diensten
        </Link>
      </div>

      {/* Article fallback for search bots */}
      <noscript>
        <article className="max-w-3xl mx-auto px-6 py-12 prose text-slate-700">
          <h1>Prefab recreatiewoningen en vakantiewoningen bouwen</h1>
          <p>Een prefab recreatiewoning of luxe vakantiehuis bouwen is een ideale, snelle en betrouwbare keuze. Doordat we houtskeletbouw of staalframe wand- en daksystemen in onze overdekte montagehal fabriceren, staat de ruwbouw binnen 1 tot 3 dagen op de recreatiekavel. Dit voorkomt vertragingen door slechte weersomstandigheden en voorkomt geluids- en modderoverlast op vakantieparken. Let op: recreatiewoningen zijn meestal niet bestemd voor permanente bewoning, controleer dus altijd het lokale omgevingsplan of overleg met de gemeente.</p>
          <p>Wilt u een offerte laten opstellen voor uw recreatiewoning of maatwerk lodge? Stuur een e-mail naar offerte@prefabselect.nl of bereken uw prijs online via www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
