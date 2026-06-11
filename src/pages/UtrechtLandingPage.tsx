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

export default function UtrechtLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Uitbouw in Utrecht | Prefab uitbouw op maat — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een uitbouw in Utrecht laten bouwen? Lees alles over prefab uitbouw: vergunning, de welstandsnota De Schoonheid van Utrecht, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig."
      );
    }

    // Dynamic JSON-LD Schema injection for Utrecht
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-utrecht-schema';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.prefabselect.nl/regio/utrecht",
          "url": "https://www.prefabselect.nl/regio/utrecht",
          "name": "Uitbouw in Utrecht | Prefab uitbouw op maat — Prefab Select",
          "description": "Een uitbouw in Utrecht laten bouwen? Lees alles over prefab uitbouw: vergunning, de welstandsnota De Schoonheid van Utrecht, kosten, bouwtijd en regels per wijk. Prefab Select bouwt snel en vakkundig.",
          "inLanguage": "nl-NL",
          "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
          "about": { 
            "@type": "Service", 
            "name": "Prefab uitbouw Utrecht", 
            "provider": { "@type": "GeneralContractor", "name": "Prefab Select" } 
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
              { "@type": "ListItem", "position": 2, "name": "Utrecht", "item": "https://www.prefabselect.nl/regio/utrecht" }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.prefabselect.nl/regio/utrecht#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Heb ik een vergunning nodig voor een uitbouw in Utrecht?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In een beschermd stadsgezicht of bij een monument heeft u in Utrecht sneller een vergunning nodig. Doe de vergunningcheck voor uw adres."
              }
            },
            {
              "@type": "Question",
              "name": "Wat is De Schoonheid van Utrecht?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dat is de welstandsnota van de gemeente Utrecht. Hierin staat per gebied een beleidsniveau dat bepaalt hoe streng een bouwplan op zijn uiterlijk wordt getoetst. De Commissie voor Omgevingskwaliteit adviseert op basis van deze criteria."
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
              "name": "Wat kost een uitbouw in Utrecht ongeveer?",
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
      const existingScript = document.getElementById('json-ld-utrecht-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const stappen = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'Samen brengen we uw woning, uw wensen en de logistieke mogelijkheden in kaart. U ontvangt een schetsontwerp met een heldere offerte.'
    },
    {
      nr: '2',
      title: 'Vergunning Behandelen',
      desc: 'Valt uw plan buiten de vrijstelling — zoals in Wittevrouwen of Lombok? Wij verzorgen het complete vergunningstraject bij de gemeente Utrecht.'
    },
    {
      nr: '3',
      title: 'Maken in de Fabriek',
      desc: 'In onze geclimatiseerde fabriekshal bouwen we uw aanbouw op de millimeter nauwkeurig op. Absoluut weersonafhankelijk en foutloos.'
    },
    {
      nr: '4',
      title: 'Grondwerk & Montage',
      desc: 'We installeren de schroeffundering en heipijpen op de Utrechtse bodem, waarna we de uitbouw binnen één enkele dag hijsen en monteren.'
    },
    {
      nr: '5',
      title: 'Afwerking & Oplevering',
      desc: 'We sluiten installaties, binnenzijde gipsplaten of buitenmetselwerk naadloos aan. Uw nieuwe leefruimte is direct klaar voor gebruik.'
    }
  ];

  const wijken = [
    { name: 'Wittevrouwen & Oudwijk', desc: 'Sfeervolle en histortische negentiende-eeuwse wijken met beschermde stadsgezichten en beperkte logistieke ruimte; hier is prefab aanvoer over het dak een perfecte en schone oplossing.' },
    { name: 'Leidsche Rijn & Vleuten-De Meern', desc: 'Ruime moderne nieuwbouwwijken met diepe tuinen en uitstekende bereikbaarheid waar vergunningsvrije uitbouwen tot 4 meter diep efficiënt en vlot gerealiseerd kunnen worden.' },
    { name: 'Tuindorp, Lombok & Oog in Al', desc: 'Geliefde, gevestigde wijken met gevarieerde bouwstijlen waar we met zorgvuldig afgestemde gevelontwerpen extra volume creëren dat naadloos aansluit bij de omgeving.' },
    { name: 'Hoograven, Lunetten & Overvecht', desc: 'Naoorlogse gezinswijken met prima tuinoppervlaktes waar we met prefab uitbouwen een riante leefkeuken of lichte tuinkamer toevoegen t.b.v. directe waardestijging.' }
  ];

  const faqs = [
    {
      question: 'Heb ik een vergunning nodig voor een uitbouw in Utrecht?',
      answer: 'Voor een uitbouw aan de achterkant binnen het achtererfgebied is vaak geen vergunning nodig, als richtlijn tot vier meter diep en met een groot onbebouwd deel van het achtererf. In een beschermd stadsgezicht of bij een monument heeft u in Utrecht sneller een vergunning nodig. Doe altijd de vergunningcheck voor uw specifieke adres.'
    },
    {
      question: 'Wat is De Schoonheid van Utrecht?',
      answer: 'Dat is de welstandsnota van de gemeente Utrecht. Hierin staat per gebied een beleidsniveau dat bepaalt hoe streng een bouwplan op zijn uiterlijk wordt getoetst. De Commissie voor Omgevingskwaliteit adviseert op basis van deze criteria.'
    },
    {
      question: 'Hoelang duurt het plaatsen van een prefab uitbouw?',
      answer: 'De mechanische ruwbouw staat in veruit de meeste situaties binnen slechts één dag wind- en waterdicht op zijn plek. Inclusief grondwerk, fundering en afwerking bent u doorgaans binnen een week helemaal klaar op locatie.'
    },
    {
      question: 'Wat als mijn straat smal is of ik geen achterom heb?',
      answer: 'Dat is in Utrechtse wijken als Lombok of Wittevrouwen heel gebruikelijk. Wij zetten precisie-telescoopkranen in om de prefab modules zorgvuldig over de bestaande dakconstructie heen in uw achtertuin te plaatsen — veilig en snel.'
    },
    {
      question: 'Wat kost een uitbouw in Utrecht ongeveer?',
      answer: 'Reken op een gemiddelde richtprijs van ongeveer €2.500 tot €4.500 per vierkante meter, afhankelijk van de complexiteit, bodemgesteldheid (heipalen) en luxegraad van kozijnen of lichtstraten. Een compact project begint rond de €40.000.'
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
            <span className="text-blue-300">Utrecht</span>
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
                    PREFAB SELECT UTRECHT
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase">
                  Uitbouw in Utrecht <br />
                  <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">
                    meer ruimte in een stad waar
                  </span> <br />
                  iedereen wil wonen
                </h1>

                <p className="text-base md:text-lg text-blue-100/70 mb-10 max-w-2xl leading-relaxed pl-6 border-l-4 border-blue-600 font-medium font-sans">
                  Utrecht groeit hard, en wie er woont, vertrekt zelden vrijwillig. Logisch dus dat steeds meer Utrechters kiezen voor uitbreiden in plaats van verhuizen. Een prefab uitbouw of aanbouw geeft u die gezochte meters extra, zonder uw geliefde buurt of buren los te laten.
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
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Plaatsing in 1 dag</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Minimale verstoring in drukke straten</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">Zekerheid vooraf</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Vaste prijs, geen meerwerktrubbel</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      <Gem size={16} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-wider leading-none mb-1">RC 6.0 isolatie</p>
                      <p className="text-[10px] text-blue-200/50 leading-none">Voldoet ruimschoots aan Bbl-eisen</p>
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
                    src="https://i.imgur.com/uYzANLQ.jpeg" 
                    alt="Utrecht Prefab Uitbouw" 
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
                UITBREIDEN IN EEN KRAPPE MARKT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Investeren in uw eigen huis <br />
                <span className="text-blue-600 italic font-light lowercase">
                  is de slimste optie
                </span>
              </h2>
              <div className="text-slate-500 text-base md:text-lg leading-relaxed font-medium space-y-6">
                <p>
                  Een groter huis kopen in de Utrechtse woningmarkt is een kostbare en zenuwslopende aangelegenheid. Naast de oververhitte huizenprijzen betaalt u ook makelaarskosten, overdrachtsbelasting en verhuisrompslomp.
                </p>
                <p>
                  Met een slim ontworpen prefab uitbouw voegt u exact de gewenste meters leefoppervlakte toe op de plek waar u al woont en gesetteld bent. Dat levert niet alleen direct wooncomfort op, maar vormt ook een beproefde en solide investering in de waarde van uw woning.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 shadow-xs">
              <h3 className="text-xl font-display font-black uppercase tracking-tighter text-blue-950 mb-6">
                Uw voordelen bij Prefab Select
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-8">
                Ontdek de voordelen van ons vernieuwende modulaire bouwsysteem:
              </p>
              <ul className="space-y-4">
                {[
                  'Binnen 1 dag op locatie opgebouwd en wind- en waterdicht',
                  'Foutloze millimeterprecisie dankzij gecontroleerde fabrieksmontage',
                  'Geen maandenlange overlast, steigers of weersgevoeligheid',
                  'Kwalitatief hoogwaardige afwerking passend bij de wijk'
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
                  src="https://i.imgur.com/dpcIuVA.jpeg" 
                  alt="Prefab Select Fabriek Utrecht" 
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
                DROOGBOUW VAN HET HOOGSTE NIVEAU
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                Onze fabrieksproductie <br />
                <span className="text-blue-600 italic font-light lowercase">
                  sluit alle risico's uit
                </span>
              </h2>
              <div className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold space-y-6">
                <p>
                  Waar traditioneel bouwen gepaard gaat met vertragingen door regen en vrieskou op de open bouwplaats, vindt onze constructiefase plaats onder perfecte klimatologische omstandigheden in onze fabriek hal.
                </p>
                <p>
                  Alle dragende delen van de constructie worden op de millimeter exact voorbereid. Zodra we de schroeffundering bij u in de tuin gereed hebben, hijsen we de volledige uitbouw binnen één dag op zijn plek. De overlast voor u en uw directe buren is tot een minimum beperkt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGIMES & WELSTAND utrecht */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden mx-0 sm:mx-6 rounded-[4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
                DE SCHOONHEID VAN UTRECHT
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Vergunningen &amp; Welstand <br />
                <span className="text-blue-400 italic font-light lowercase">
                  met verstand van erfgoed &amp; architectuur
                </span>
              </h2>
              
              <div className="text-blue-100/60 leading-relaxed font-semibold space-y-6 text-sm md:text-base max-w-2xl">
                <p>
                  Utrecht hanteert strenge en duidelijke uitgangspunten die zijn vastgelegd in de welstandsnota &ldquo;De Schoonheid van Utrecht&rdquo;. Per wijk en gebied gelden specifieke welstandsniveaus — van soepel tot uiterst nauwkeurig, met name in beschermde stadsgezichten en monumenten.
                </p>
                <p>
                  Heeft u een vergunning nodig voor uw specifieke adres, bijvoorbeeld in Lombok of Wittevrouwen? De Commissie voor Omgevingskwaliteit toetst uw plan aan deze bepalingen. Prefab Select verzorgt het complete vergunningstraject, de bouwtekeningen en de afstemming met de gemeente.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href="https://omgevingswet.overheid.nl/checken" 
                  target="_blank" 
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-colors"
                >
                  Vergunningcheck Omgevingsloket <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-10">
              <Compass className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-lg font-display font-black uppercase tracking-tighter text-white mb-4">
                Laat ons uw adres gratis controleren
              </h3>
              <p className="text-blue-100/60 text-xs leading-relaxed font-semibold mb-6">
                Welk regime geldt er in uw straat en mag uw aanbouw vergunningsvrij worden geplaatst? Ons team zoekt het kosteloos en snel voor u uit.
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
              Wat kost een uitbouw in Utrecht?
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl mx-auto">
              Uw specifieke woonwensen en technische eisen (denk aan een telescoopkraan om over het dak te hijsen, en heipalen t.b.v. de Utrechtse veengrond) bepalen de calculatie:
            </p>
          </div>

          <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xs mb-10">
            <div className="grid grid-cols-2 bg-blue-950 text-white p-6 md:px-10 text-xs font-black uppercase tracking-widest">
              <span>Type Uitbouw</span>
              <span className="text-right">Prijsindicatie</span>
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
            * Dit betreft indicatieve richtbedragen incl. btw en installatie. De unieke veen- en kleibodem in Utrecht vraagt om een doordachte fundering, welke we altijd exact doorrekenen.
          </p>

        </div>
      </section>

      {/* STEPS PROCESS */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mb-20 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZORGELOOS STAPPENPLAN
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Het bouwtraject van begin tot eind <br />
              <span className="text-blue-600 italic font-light lowercase">
                zonder de gebruikelijke verbouwingschaos
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
              Uitbouwen per wijk in Utrecht
            </h2>
            <p className="text-base text-slate-500 leading-relaxed font-medium">
              Utrecht kent zeer uiteenlopende bouwstijlen, wat grote invloed heeft op het welstandsniveau en de kraanlogistiek:
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
                Is een aanbouw de juiste oplossing voor u?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Slaat u uw slag op de begane grond met een grote leefkeuken of lichte tuinkamer? Een uitbouw is veruit de meest gewenste, impactvolle en waardevaste methode.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Mist u echter een extra bad- of slaapkamer hogerop in de woning? Dan is een prefab dakkapel of complete dakopbouw een betere keus. Wij vertellen u graag eerlijk welke ingreep u het meeste oplevert.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">PREPARED START</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Goed voorbereid van start gaan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Zorg dat u zaken als de erfgrens (altijd belangrijk om met de buren te communiceren), de bodemstabiliteit en deLogistieke aanvoer routes vroegtijdig in kaart brengt.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Onze engineers lopen deze belangrijke aspecten stap-voor-stap met u door voordat we overgaan tot productie, om elk risico uit te sluiten.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">DAYLIGHT OPTIMIZATION</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Daglicht binnenhalen en de sfeer transformeren
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Een aanbouw voegt niet alleen meters toe, maar brengt ook sfeer. Veel negentiende-eeuwse Utrechtse woningen kunnen van nature diep en donker zijn gesitueerd.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Dankzij een royale glazen achtergevel, tuindeuren of een luxe lichtstraat haalt u het daglicht diep binnenshuis en betrekt u uw tuin maximaal bij uw dagelijkse sfeer.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-10 md:p-14 border border-slate-100 rounded-[3rem] shadow-3xs">
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 mb-2 block">THERMAL EXCELLENCE</span>
              <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-blue-950 mb-4">
                Het hele jaar comfortabel &amp; behaaglijk wonen
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-4">
                Kou of tocht in de winter is uitgesloten. Onze prefab elementen zijn uitgerust met uitmuntende thermische isolatie (Rc 6.0) om de binnentemperatuur perfect stabiel te houden.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Zeg vaarwel tegen hoge stookkosten en ervaar het hele jaar door behaaglijk wooncomfort — uitstekend te combineren met vloerverwarming.
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
              over uitbouwen in Utrecht
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
                Deel uw unieke woonsituatie en uw plannen met ons, dan berekenen en adviseren we geheel vrijblijvend t.b.v. een betrouwbare indicatie.
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
          <h1>Uitbouw in Utrecht — prefab uitbouw op maat</h1>
          <p>Prefab Select bouwt hoogwaardige prefab uitbouwen in Utrecht en omgeving, waaronder Wittevrouwen, Oudwijk, Lombok, Oog in Al, Tuindorp, Leidsche Rijn en Vleuten-De Meern. Een uitbouw vergroot uw woning aan de achterzijde, vaak vergunningsvrij tot vier meter diep binnen het achtererfgebied. Utrecht toetst bouwplannen aan de welstandsnota "De Schoonheid van Utrecht"; in beschermde stadsgezichten en bij monumenten heeft u sneller een vergunning nodig.</p>
          <p>Richtprijs: circa € 2.500 tot € 4.500 per m², afhankelijk van de afwerking. De ruwbouw staat doorgaans in één dag; het totale traject duurt vier tot acht weken. Offerte aanvragen? Mail offerte@prefabselect.nl of bezoek www.prefabselect.nl.</p>
        </article>
      </noscript>

    </div>
  );
}
