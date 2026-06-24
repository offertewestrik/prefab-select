import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Box, ShieldCheck, Leaf, ArrowRight, CheckCircle2, ChevronRight, Zap, Sun, Utensils, Home, Layers, Palette, PenTool } from 'lucide-react';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

const PrefabAanbouw = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Prefab aanbouw: kosten, mogelijkheden en voordelen | Prefab Select';
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') ?? '';
    if (metaDesc) metaDesc.setAttribute('content', 'Een prefab aanbouw laten bouwen? Lees alles over kosten, mogelijkheden, vergunning en voordelen. Prefab Select bouwt snel, vakkundig en met vaste prijs — vaak binnen 1 dag geplaatst.');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-prefab-aanbouw-schema';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.prefabselect.nl/prefab-aanbouw',
          url: 'https://www.prefabselect.nl/prefab-aanbouw',
          name: 'Prefab aanbouw: kosten, mogelijkheden en voordelen | Prefab Select',
          inLanguage: 'nl-NL',
          isPartOf: { '@type': 'WebSite', name: 'Prefab Select', url: 'https://www.prefabselect.nl' },
          about: { '@type': 'Service', name: 'Prefab aanbouw', provider: { '@type': 'GeneralContractor', name: 'Prefab Select' } },
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://www.prefabselect.nl/prefab-aanbouw#faq',
          mainEntity: [
            { '@type': 'Question', name: 'Wat is een prefab aanbouw?', acceptedAnswer: { '@type': 'Answer', text: 'Een prefab aanbouw is een volwaardige uitbreiding van uw woning waarvan de wanden, het dak en de constructie vooraf in onze werkplaats worden gebouwd en daarna op locatie worden gemonteerd. Daardoor staat de ruwbouw vaak binnen één dag wind- en waterdicht.' } },
            { '@type': 'Question', name: 'Wat is het verschil tussen een aanbouw en een uitbouw?', acceptedAnswer: { '@type': 'Answer', text: 'Een uitbouw is doorgaans een verlenging van een bestaande ruimte, zoals een diepere woonkamer. Een aanbouw voegt vaak een volwaardige extra ruimte toe, bijvoorbeeld een slaapkamer, kantoor of bijkeuken. Beide bouwen wij prefab op maat.' } },
            { '@type': 'Question', name: 'Wat kost een prefab aanbouw?', acceptedAnswer: { '@type': 'Answer', text: 'De richtprijs ligt gemiddeld tussen € 2.500 en € 4.500 per m². Een aanbouw van 15 m² komt daarmee vanaf circa € 45.000 uit, afhankelijk van afwerking, kozijnen en opties. U ontvangt altijd een vaste prijs vooraf.' } },
            { '@type': 'Question', name: 'Heb ik een vergunning nodig voor een aanbouw?', acceptedAnswer: { '@type': 'Answer', text: 'Een aanbouw aan de achterzijde is binnen het achtererfgebied vaak vergunningsvrij, als richtlijn tot vier meter diep. Bij hoekwoningen, monumenten of beschermde stadsgezichten gelden andere regels. Wij voeren kosteloos een vergunningcheck uit.' } },
            { '@type': 'Question', name: 'Hoe snel staat een prefab aanbouw?', acceptedAnswer: { '@type': 'Answer', text: 'De productie duurt 2 tot 4 weken. De ruwbouw staat binnen 1 dag wind- en waterdicht op locatie. Inclusief fundering en afwerking bent u doorgaans binnen 4 tot 6 weken klaar.' } },
          ],
        },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute('content', prevDesc);
      document.getElementById('json-ld-prefab-aanbouw-schema')?.remove();
    };
  }, []);

  const faqs = [
    { question: 'Wat is een prefab aanbouw?', answer: 'Een prefab aanbouw is een volwaardige uitbreiding van uw woning waarvan de wanden, het dak en de constructie vooraf in onze werkplaats worden gebouwd en daarna op locatie worden gemonteerd. Daardoor staat de ruwbouw vaak binnen één dag wind- en waterdicht en is de bouwtijd op locatie kort.' },
    { question: 'Wat is het verschil tussen een aanbouw en een uitbouw?', answer: 'Een uitbouw is doorgaans een verlenging van een bestaande ruimte, zoals een diepere woonkamer of keuken. Een aanbouw voegt vaak een volwaardige extra ruimte toe, bijvoorbeeld een slaapkamer, thuiskantoor of bijkeuken. Beide realiseren wij prefab en volledig op maat.' },
    { question: 'Wat kost een prefab aanbouw?', answer: 'De richtprijs ligt gemiddeld tussen € 2.500 en € 4.500 per m². Een aanbouw van 15 m² komt daarmee vanaf circa € 45.000 uit, afhankelijk van afwerking, kozijnen en opties zoals een lichtstraat of vloerverwarming. U ontvangt altijd een vaste prijs vooraf.' },
    { question: 'Heb ik een vergunning nodig voor een aanbouw?', answer: 'Een aanbouw aan de achterzijde is binnen het achtererfgebied vaak vergunningsvrij, als richtlijn tot vier meter diep. Bij hoekwoningen, monumenten of in beschermde stadsgezichten gelden andere regels. Wij voeren altijd kosteloos een vergunningcheck uit voor uw adres.' },
    { question: 'Hoe snel staat een prefab aanbouw?', answer: 'De productie in de fabriek duurt doorgaans 2 tot 4 weken. De ruwbouw staat vervolgens binnen 1 dag wind- en waterdicht op locatie. Inclusief fundering en afwerking bent u meestal binnen 4 tot 6 weken volledig klaar.' },
    { question: 'Is een prefab aanbouw net zo stevig als traditionele bouw?', answer: 'Zeker. Doordat de constructie onder constante, droge fabrieksomstandigheden wordt gebouwd, is de kwaliteit vaak strakker en stabieler dan bij bouw op een natte, koude bouwplaats. De isolatiewaarden (tot Rc 6.0) zijn uitstekend.' },
  ];

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            src="https://i.imgur.com/qTIctyr.jpeg" 
            alt="Prefab Aanbouw Architectuur" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/50 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 border border-blue-400/30 rounded-full mb-8 backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                  PREFAB AANBOUW
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Moderne prefab aanbouwen met hoogwaardige afwerking.
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/70 mb-12 font-light leading-relaxed max-w-2xl">
                Sneller bouwen, minder overlast en volledig maatwerk voor een moderne uitbreiding van jouw woning.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/offerte" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all text-[11px] shadow-2xl flex items-center gap-3">
                  Vraag offerte aan <ArrowRight size={14} />
                </Link>
                <a href="#mogelijkheden" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-[11px]">
                  Bekijk mogelijkheden
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 2 — WAT IS EEN PREFAB AANBOUW? */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
              <img 
                src="https://i.imgur.com/Mcivs2I.jpeg" 
                alt="Prefab aanbouw realisatie" 
                className="w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wat is een prefab aanbouw?
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Een prefab aanbouw is een moderne woninguitbreiding die grotendeels vooraf in de fabriek wordt geproduceerd. Hierdoor kan de plaatsing op locatie aanzienlijk sneller verlopen dan bij traditionele bouwmethodes.
                </p>
                <p className="mb-6">
                  Bij prefab bouwen worden wanden, vloeren en dakconstructies vooraf voorbereid waardoor de bouwtijd wordt verkort en de kwaliteit beter gecontroleerd kan worden.
                </p>
                <p>
                  Steeds meer mensen kiezen voor prefab bouwen vanwege de snelle realisatie, hoogwaardige afwerking, moderne architectuur en minimale overlast tijdens de bouw.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Snelle realisatie", 
                  "Minder overlast", 
                  "Hoogwaardige afwerking", 
                  "Duurzaam gebouwd"
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    <span className="font-bold text-blue-950 text-sm uppercase tracking-widest">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 3 — WAT IS ALLEMAAL MOGELIJK? */}
      <section id="mogelijkheden" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat is allemaal mogelijk?
            </h2>
            <p className="text-lg text-slate-600">
              Transformeer uw woning met onze veelzijdige prefab oplossingen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Moderne woonuitbreidingen", desc: "Creëer extra leefruimte met een moderne prefab aanbouw volledig afgestemd op jouw woning.", icon: <Home size={24} /> },
              { title: "Luxe leefkeukens", desc: "Vergroot je woning met een ruime leefkeuken voorzien van veel licht en moderne schuifpuien.", icon: <Utensils size={24} /> },
              { title: "Aanbouwen met lichtstraat", desc: "Meer daglicht en een luxe uitstraling dankzij moderne lichtstraten en grote glaspartijen.", icon: <Sun size={24} /> },
              { title: "Modulaire uitbreidingen", desc: "Flexibele prefab oplossingen die eenvoudig aangepast of uitgebreid kunnen worden.", icon: <Layers size={24} /> },
              { title: "Luxe gevelafwerkingen", desc: "Van strak wit stucwerk tot moderne houten gevelaccenten en aluminium kozijnen.", icon: <Palette size={24} /> },
              { title: "Volledig maatwerk", desc: "Iedere prefab aanbouw wordt afgestemd op jouw wensen, woning en architectuur.", icon: <PenTool size={24} /> },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:shadow-[0_40px_80px_rgba(29,78,216,0.1)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-blue-950 uppercase tracking-widest mb-4">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{card.desc}</p>
                <Link to="/offerte" className="inline-flex items-center gap-2 text-xs font-black uppercase text-blue-600 tracking-[0.2em] group-hover:gap-4 transition-all mt-auto">
                  Ontdek <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 4 — DE VOORDELEN VAN PREFAB BOUWEN */}
      <section className="py-24 md:py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
                Waarom kiezen voor prefab bouwen?
              </h2>
              <p className="text-xl text-blue-100/70 font-light mb-6">
                Prefab bouwen combineert snelheid, kwaliteit en duurzaamheid binnen één efficiënt bouwproces.
              </p>
              <p className="text-lg text-blue-100/50">
                Doordat onderdelen vooraf geproduceerd worden ontstaat minder bouwafval, minder overlast en een aanzienlijk kortere bouwtijd dan traditionele bouw.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Snellere bouwtijd", icon: <Clock size={24} /> },
                { title: "Minder overlast", icon: <ShieldCheck size={24} /> },
                { title: "Hoogwaardige isolatie", icon: <Box size={24} /> },
                { title: "Energiezuinig bouwen", icon: <Leaf size={24} /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                    {stat.icon}
                  </div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm">{stat.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 5 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      {/* SECTIE 6 — MODULAIR & CIRCULAIR BOUWEN */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Modulair en circulair bouwen.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Prefab Select werkt met moderne modulaire bouwmethodes waarbij efficiëntie, duurzaamheid en flexibiliteit centraal staan.
                </p>
                <p>
                  Door slim prefab en modulair te bouwen ontstaat minder verspilling, een kortere bouwtijd en een toekomstbestendige woninguitbreiding.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Duurzaam gebouwd", 
                  "Minder bouwafval", 
                  "Energiezuinige oplossingen", 
                  "Modulair uitbreidbaar"
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Zap size={18} className="text-blue-600" />
                    <span className="font-bold text-blue-950 text-xs uppercase tracking-widest">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
              <img 
                src="https://i.imgur.com/covRQg3.jpeg" 
                alt="Modulair en circulair bouwen" 
                className="w-full object-cover aspect-[4/5]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 7 — PRIJSINDICATIE */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
            Wat kost een prefab aanbouw?
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
            De kosten van een prefab aanbouw hangen af van afmetingen, afwerking, kozijnen en luxe opties zoals lichtstraten of schuifpuien.
          </p>

          <div className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-xl border border-slate-100 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Vanaf prijs</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-display font-black text-blue-950 tracking-tighter">€2.500</span>
                  <span className="text-lg text-slate-500 font-bold uppercase tracking-widest">/ m²</span>
                </div>
                <p className="text-slate-600">Gemiddelde richtprijs, afhankelijk van wensen en afwerkingsniveau.</p>
              </div>
              
              <Link to="/offerte" className="w-full md:w-auto text-center bg-blue-950 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-900 transition-all text-xs shadow-xl whitespace-nowrap">
                Vraag offerte aan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRA SEO CONTENT */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-10 block text-center">ALLES OVER PREFAB AANBOUW</span>
          <div className="space-y-14">

            <article>
              <h2 className="text-2xl md:text-4xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">Prefab aanbouw: een volwaardige kamer erbij</h2>
              <div className="text-slate-600 text-base leading-relaxed space-y-5">
                <p>Een <strong>prefab aanbouw</strong> is dé manier om uw woning uit te breiden met een volwaardige extra ruimte: een ruime leefkeuken, een thuiskantoor, een extra slaapkamer op de begane grond of een praktische bijkeuken. Omdat wij de wanden, het dak en de constructie vooraf in onze werkplaats bouwen, staat de ruwbouw vaak al binnen één dag wind- en waterdicht — met minimale overlast en een vaste prijs vooraf.</p>
                <p>Wilt u liever een bestaande ruimte verlengen in plaats van een complete kamer toevoegen? Bekijk dan onze <Link to="/prefab-uitbouw">prefab uitbouw</Link>. Twijfelt u welke oplossing het best past? Wij adviseren u graag, geheel vrijblijvend.</p>
              </div>
            </article>

            <article>
              <h2 className="text-2xl md:text-4xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">De voordelen van een prefab aanbouw</h2>
              <div className="text-slate-600 text-base leading-relaxed space-y-5">
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>Snel geplaatst</strong> — de ruwbouw staat vaak binnen 1 dag, de totale doorlooptijd is doorgaans 4 tot 6 weken.</li>
                  <li><strong>Vaste prijs vooraf</strong> — geen onverwachte meerkosten tijdens de bouw.</li>
                  <li><strong>Minder overlast</strong> — geen maandenlange bouwplaats in uw tuin.</li>
                  <li><strong>Hoogwaardige isolatie</strong> — standaard tot Rc 6.0, klaar voor vloerverwarming en warmtepomp.</li>
                  <li><strong>Waardevermeerdering</strong> — extra woonoppervlak verhoogt direct de waarde van uw woning.</li>
                </ul>
              </div>
            </article>

            <article>
              <h2 className="text-2xl md:text-4xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">Prefab aanbouw in heel Nederland</h2>
              <div className="text-slate-600 text-base leading-relaxed space-y-5">
                <p>Vanuit onze vestiging in Halsteren realiseren wij prefab aanbouwen door heel Nederland, met een sterke thuisbasis op de Brabantse Wal en in West-Brabant. Bekijk de mogelijkheden in uw regio:</p>
                <p className="text-sm leading-loose">
                  <Link to="/regio/bergen-op-zoom">Bergen op Zoom</Link> · <Link to="/regio/steenbergen">Steenbergen</Link> · <Link to="/regio/roosendaal">Roosendaal</Link> · <Link to="/regio/tholen">Tholen</Link> · <Link to="/regio/woensdrecht">Woensdrecht</Link> · <Link to="/regio/breda">Breda</Link> · <Link to="/regio/tilburg">Tilburg</Link> · <Link to="/regio/eindhoven">Eindhoven</Link> · <Link to="/regio/rotterdam">Rotterdam</Link> · <Link to="/regio/amsterdam">Amsterdam</Link> · <Link to="/regio/utrecht">Utrecht</Link> · <Link to="/regio/arnhem">Arnhem</Link> · <Link to="/regio/zwolle">Zwolle</Link> · <Link to="/regio/maastricht">Maastricht</Link> · <Link to="/regio/amersfoort">Amersfoort</Link>
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="py-24 md:py-32 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block leading-none">VRAGEN OVER PREFAB AANBOUW</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none">Veelgestelde vragen</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xs hover:shadow-md transition-all duration-300">
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between text-left gap-4 font-display font-black text-lg md:text-xl text-blue-950 uppercase tracking-tighter">
                    <span>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isOpen && <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <KellyCTA />
    </div>
  );
};

export default PrefabAanbouw;
