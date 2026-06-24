import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Gem, 
  HelpCircle, 
  Sparkles, 
  Waves, 
  FileText,
  Clock,
  Euro,
  MapPin,
  Heart,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

export default function PrefabPoolhouse() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Prefab poolhouse op maat | Bijgebouw bij het zwembad — Prefab Select";
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Set meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "Een prefab poolhouse laten bouwen? Lees alles over de mogelijkheden, vergunningsvrije regels, voordelen, functies, kosten en bouwtijd van een poolhouse op maat. Prefab Select bouwt snel en vakkundig."
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "prefab poolhouse, poolhouse op maat, poolhouse bouwen, poolhouse vergunning, poolhouse kosten, bijgebouw zwembad"
      );
    }

    // JSON-LD structured data injection
    const existingScript = document.getElementById('json-ld-poolhouse-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-poolhouse-schema';
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Prefab poolhouse",
        "name": "Prefab poolhouse op maat",
        "provider": { 
          "@type": "GeneralContractor", 
          "name": "Prefab Select", 
          "url": "https://www.prefabselect.nl", 
          "email": "offerte@prefabselect.nl" 
        },
        "areaServed": { "@type": "Country", "name": "Nederland" },
        "description": "Hoogwaardige prefab poolhouses op maat, in de werkplaats gemaakt en snel in de tuin geplaatst."
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://www.prefabselect.nl/prefab-poolhouse",
        "url": "https://www.prefabselect.nl/prefab-poolhouse",
        "name": "Prefab poolhouse op maat | Bijgebouw bij het zwembad — Prefab Select",
        "inLanguage": "nl-NL",
        "isPartOf": { "@type": "WebSite", "name": "Prefab Select", "url": "https://www.prefabselect.nl" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.prefabselect.nl" },
            { "@type": "ListItem", "position": 2, "name": "Poolhouse", "item": "https://www.prefabselect.nl/prefab-poolhouse" }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { 
            "@type": "Question", 
            "name": "Wat is een poolhouse?", 
            "acceptedAnswer": { 
              "@type": "Answer", 
              "text": "Een poolhouse is een bijgebouw in de tuin, meestal bij een zwembad, dat dienstdoet als loungeruimte, omkleedruimte, buitenkeuken, bar of berging voor de zwembadtechniek. Een prefab poolhouse wordt in de werkplaats gemaakt en snel in de tuin geplaatst." 
            } 
          },
          { 
            "@type": "Question", 
            "name": "Heb ik een vergunning nodig voor een poolhouse?", 
            "acceptedAnswer": { 
              "@type": "Answer", 
              "text": "Een poolhouse als bijgebouw in het achtererfgebied is in veel gevallen vergunningsvrij, mits het voldoet aan de regels: het staat in het achtererfgebied, is niet hoger dan 5 meter, blijft ondergeschikt aan de woning en de totale bebouwing blijft binnen de toegestane oppervlakte. Permanente bewoning is niet toegestaan. Doe altijd de vergunningcheck voor uw adres." 
            } 
          },
          { 
            "@type": "Question", 
            "name": "Hoeveel mag ik vergunningsvrij bijbouwen?", 
            "acceptedAnswer": { 
              "@type": "Answer", 
              "text": "Vergunningsvrije bijgebouwen mogen tot een deel van uw achtererfgebied beslaan: tot circa 50% bij een bebouwingsgebied tot 100 m², met aanvullende percentages voor grotere percelen, tot een maximum van 150 m². De exacte ruimte hangt af van uw perceel; wij rekenen het voor u uit." 
            } 
          },
          { 
            "@type": "Question", 
            "name": "Wat kost een prefab poolhouse?", 
            "acceptedAnswer": { 
              "@type": "Answer", 
              "text": "De prijs hangt af van afmetingen, afwerking en voorzieningen zoals een buitenkeuken, sanitair of sauna. Vraag een offerte op maat aan voor een realistische prijsindicatie." 
            } 
          }
        ]
      }
    ]);
    document.head.appendChild(script);

    return () => {
      const addedScript = document.getElementById('json-ld-poolhouse-schema');
      if (addedScript) {
        addedScript.remove();
      }
    };
  }, []);

  const functionsList = [
    {
      title: 'Loungeruimte',
      desc: 'Een overdekte, beschutte plek om te ontspannen, ook als het weer onverwachts omslaat.'
    },
    {
      title: 'Buitenkeuken of bar',
      desc: 'Samen koken, barbecueën en drankjes serveren zonder steeds naar de binnengevel te hoeven lopen.'
    },
    {
      title: 'Omkleden en sanitair',
      desc: 'Een comfortabele kleedruimte, douche of eigen toilet direct gelegen vlak bij het zwembad.'
    },
    {
      title: 'Techniekberging',
      desc: 'Schoon en droog opbergen van de zwembadpomp, filterinstallatie en geavanceerde verwarming uit het zicht.'
    },
    {
      title: 'Exclusieve Extra\'s',
      desc: 'Mogelijkheden voor een luxe inbouwsauna, een glazen fitnesshoek, handige bijkeuken of gastenverblijf.'
    }
  ];

  const regulations = [
    {
      title: 'In het achtererfgebied',
      desc: 'Het poolhouse staat logischerwijs achter de voorgevel van uw woning, binnen de grenzen van het achtererfgebied.'
    },
    {
      title: 'Maximale hoogte',
      desc: 'Een vergunningsvrij bijgebouw in de tuin mag conform de landelijke regels niet hoger zijn dan 5 meter.'
    },
    {
      title: 'Toegestane oppervlakte',
      desc: 'U mag tot een bepaald percentage van uw achtererfgebied bebouwen — circa 50% bij percelen tot 100 m², met een maximum tot 150 m².'
    },
    {
      title: 'Ondergeschikt gebruik',
      desc: 'Het poolhouse dient functioneel ondergeschikt te blijven aan uw hoofdwoning. Permanente bewoning is hierin niet toegestaan.'
    }
  ];

  const processSteps = [
    {
      nr: '1',
      title: 'Kennismaking & Ontwerp',
      desc: 'We bekijken uw tuin en zwembad, bespreken de gewenste functies en maken een prachtig op maat gemaakt ontwerp met een heldere, transparante offerte.'
    },
    {
      nr: '2',
      title: 'Regels & Vergunning Check',
      desc: 'Onze experts bepalen of uw gewenste indeling binnen de vergunningsvrije kaders valt en verzorgen, indien noodzakelijk, de volledige aanvraag.'
    },
    {
      nr: '3',
      title: 'Productie in de Werkplaats',
      desc: 'Uw poolhouse wordt compleet geproduceerd onder optimale omstandigheden in onze gecontroleerde werkplaats, inclusief gekozen isolatie en afwerking.'
    },
    {
      nr: '4',
      title: 'Plaatsing & Aansluiting',
      desc: 'De elementen worden in korte tijd in uw tuin gemonteerd en installaties zoals water, elektra en zwembadtechniek worden vakkundig aangesloten.'
    },
    {
      nr: '5',
      title: 'Sleutelklare Oplevering',
      desc: 'We leveren uw premium poolhouse schoon op, waarna u direct kunt genieten van de ultieme verblijfservaring aan uw eigen buitenbad.'
    }
  ];

  const faqs = [
    {
      question: 'Wat is een poolhouse?',
      answer: 'Een poolhouse is een bijgebouw in de tuin, meestal direct gesitueerd bij een zwembad, dat dienstdoet als loungeruimte, comfortabele omkleedruimte, buitenkeuken, bar of berging voor uw zwembadtechniek. Een prefab poolhouse wordt volledig in onze werkplaats vervaardigd en daardoor bijzonder snel in uw tuin gemonteerd.'
    },
    {
      question: 'Heb ik een vergunning nodig voor een poolhouse?',
      answer: 'Een poolhouse als bijgebouw in het achtererfgebied is in heel veel gevallen volledig vergunningsvrij te plaatsen. Hiervoor dient het te voldoen aan landelijke regels: plaatsing vindt plaats in het achtererfgebied, de totale hoogte is maximaal 5 meter, het gebouw blijft qua functie ondergeschikt aan de hoofdwoning en de totale bebouwing blijft binnen uw maximaal toegestane bebouwingspercentage. Permanente bewoning is niet toegestaan.'
    },
    {
      question: 'Hoeveel mag ik vergunningsvrij bijbouwen?',
      answer: 'De hoeveelheid vergunningsvrije bijgebouwen hangt af van uw achtererfgebied. Tot 100 m² mag u vaak circa 50% bebouwen. Bij grotere percelen gelden staffels met lagere percentages tot een absoluut maximum van 150 m². Onze adviseurs rekenen dit voor uw specifieke perceel direct nauwkeurig uit.'
    },
    {
      question: 'Hoe lang duurt het plaatsen van een prefab poolhouse?',
      answer: 'Omdat wij alle wand-, dak- en vloerelementen op de millimeter nauwkeurig voorbereiden in onze geconditioneerde werkplaats, is de daadwerkelijke opbouwtijd in uw tuin een kwestie van slechts enkele dagen. Dit voorkomt langdurige bouwoverlast in uw fraai aangelegde achtertuin.'
    },
    {
      question: 'Wat kost een prefab poolhouse?',
      answer: 'De investering is sterk afhankelijk van de gewenste afmetingen, de isolatiewaarden, wandafwerking en de gekozen luxe faciliteiten (zoals een inbouwkeuken of sanitair). Vanwege dit unieke maatwerk voorzien we u altijd vooraf van een heldere, vrijblijvende offerte op maat.'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-600 selection:text-white" id="prefab-poolhouse-page">
      {/* SECTIE 1 — PREMIUM HERO */}
      <header className="relative py-28 md:py-36 bg-blue-950 overflow-hidden" id="poolhouse-hero">
        <div className="absolute inset-0 bg-[url('https://i.imgur.com/gGBOzjd.jpeg')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-blue-400 mb-6 block"
          >
            Prefab Select &middot; Poolhouse Wetgeving &amp; Inspiratie
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8 max-w-4xl"
          >
            Prefab poolhouse: <br />
            <span className="text-blue-400 italic font-light lowercase">het kloppend hart van uw tuin</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-base md:text-lg lg:text-xl max-w-2xl font-normal leading-relaxed mb-10"
          >
            Een poolhouse maakt van uw tuin een echt luxe verblijfsoord: ontspannen loungen bij het zwembad, heerlijk buitenkoken, schuilen voor een bui en alle pomp- en filtertechniek netjes weggewerkt. Gerealiseerd met ultieme snelheid en vrijwel zonder bouwoverlast.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a 
              href="#offerte"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-blue-950/50"
            >
              Vraag uw offerte aan <ArrowRight size={12} />
            </a>
          </motion.div>
        </div>
      </header>

      {/* SECTIE 2 — INTROTEXT MET TEXT OVERVIEW */}
      <section className="py-24 bg-white" id="poolhouse-intro">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-8">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-6 block">
                Zorgeloos Tuinplezier
              </h2>
              <p className="text-xl text-blue-950 font-medium leading-relaxed mb-8">
                Een eigen zwembad in de tuin is heerlijk, maar pas met een doordacht en luxe poolhouse is de beleving echt compleet. Het vormt de ultieme verbinding tussen wonen, ontspannen en buitenleven.
              </p>
              <div className="text-slate-500 space-y-6 text-sm md:text-base font-normal leading-relaxed">
                <p>
                  Een poolhouse combineert doorgaans meerdere onmisbare tuinfuncties in één stijlvol en solide gebouw. Denk aan een royaal overdekt terras met comfortabele zithoek, een luxe bar of buitenkeuken, een handige omkleedruimte met eigen douche én een veilige droge opbergplaats voor uw zwembadtechniek.
                </p>
                <p>
                  Met de innovatieve prefab bouwmethode van Prefab Select kiest u voor ongekende kwaliteit. Wij ontwerpen uw poolhouse volledig op maat, prefabriceren alle elementen in onze droge, gecontroleerde fabriekshal en monteren het gebouw in slechts enkele dagen wind- en waterdicht in uw achtertuin. Geen maandenlange chaos of modderpoel, maar direct genieten van ultiem buitencomfort.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-950 mb-6 border-b border-slate-200 pb-4">
                Sleutelgegevens
              </h3>
              <ul className="space-y-4 text-xs font-semibold text-slate-500">
                <li className="flex justify-between">
                  <span>Bouwwijze:</span>
                  <span className="text-blue-950 font-bold">100% Prefab</span>
                </li>
                <li className="flex justify-between">
                  <span>Plaatsingstijd:</span>
                  <span className="text-blue-950 font-bold">Binnen enkele dagen</span>
                </li>
                <li className="flex justify-between">
                  <span>Vergunning:</span>
                  <span className="text-blue-950 font-bold">Vaak vergunningsvrij</span>
                </li>
                <li className="flex justify-between">
                  <span>Isolatiewaarde:</span>
                  <span className="text-blue-950 font-bold">Tot hoge Rc-waarden</span>
                </li>
                <li className="flex justify-between">
                  <span>Garantie:</span>
                  <span className="text-blue-950 font-bold">20 jaar constructie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 3 — BENTO GRID: WAT KUNT U ERIN KWIJT */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-100" id="poolhouse-functions">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block animate-pulse">
              VEELZIJDIGHEID OP MAAT
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Wat kunt u kwijt in uw <br />
              <span className="text-blue-600 italic font-light lowercase">nieuwe poolhouse?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {functionsList.map((item, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(29,78,216,0.06)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                  <Waves size={20} />
                </div>
                <h3 className="text-lg font-display font-black uppercase tracking-tighter text-blue-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 4 — VERGUNNINGEN & WETGEVING */}
      <section className="py-24 bg-white" id="poolhouse-vergunning">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ZONDER VERGUNNING BOUWEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Heb ik een vergunning nodig?
            </h2>
            <p className="text-slate-500 font-normal leading-relaxed text-sm md:text-base">
              Goed nieuws: in de meest voorkomende situaties is een modern poolhouse als los bijgebouw in uw tuin volledig <strong>vergunningsvrij</strong> te plaatsen. Er gelden echter wel een aantal duidelijke strikte landelijke regels en randvoorwaarden:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {regulations.map((reg, i) => (
              <div key={i} className="flex gap-4 items-start bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-black text-xs uppercase tracking-wider text-blue-950 mb-1">
                    {reg.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {reg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50/50 rounded-[2.5rem] p-8 border border-blue-100/60">
            <h3 className="text-sm font-black uppercase tracking-wider text-blue-950 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600 animate-spin" /> Tip van de vergunningsexpert
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
              Doe altijd de online vergunningcheck op de landelijke website van het <a href="https://omgevingswet.overheid.nl/checken" target="_blank" rel="nofollow" className="text-blue-600 underline font-bold hover:text-blue-800">Omgevingsloket</a> voor uw exacte adres. De specifieke vergunningsvrije ruimte hangt af van uw bestemmingsplan, wat er eventueel al aan andere constructies staat en hoe groot uw bebouwingsgebied is. Ons team helpt u hier kosteloos bij.
            </p>
          </div>
        </div>
      </section>

      {/* SECTIE 5 — COMFORT, STIJL & PRAKTISCH */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative" id="poolhouse-comfort">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] -mr-48 -mt-48" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 block">
              ESTHETIEK EN COMFORT
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
              Stijl, materialen &amp; <br />
              <span className="text-blue-400 italic font-light lowercase">het hele jaar door comfort</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300">
            <div className="space-y-6 text-sm leading-relaxed font-normal">
              <h3 className="text-lg font-display font-black uppercase tracking-wide text-white">
                Verfijnd Design &amp; Materiaalkeuze
              </h3>
              <p>
                Een poolhouse staat vaak prominent in uw gezichtsveld vanuit de woning. De styling en architectuur verdienen daarom de volle aandacht. Populair zijn onze strakke, minimalistische ontwerpen met een plat dak, grote glazen schuifpuien en een open loungegedeelte. Hierdoor loopt de tuin optisch naadloos door in het gebouw.
              </p>
              <p>
                Kiest u voor de natuurlijke warmte van verduurzaamd hout (zoals Rhombus profielen of Ayous) of juist voor een strakke, onderhoudsarme gevelbekleding? Doordat wij altijd op detailniveau ontwerpen, sluit het poolhouse perfect aan op de stijl van uw hoofdhuis en het omliggende terras.
              </p>
            </div>

            <div className="space-y-6 text-sm leading-relaxed font-normal">
              <h3 className="text-lg font-display font-black uppercase tracking-wide text-white">
                Vier Seizoenen Genieten
              </h3>
              <p>
                Met hoogwaardige isolatie (hoge Rc-waarden), infrarood terrasheaters of een stijlvolle houtkachel is uw poolhouse niet alleen bruikbaar tijdens warme zomerdagen. Ook in de lente, herfst en zelfs op een heldere winterdag is het er heerlijk warm en comfortabel toeven.
              </p>
              <p>
                Indien gewenst integreren we tevens direct alle benodigde sanitaire voorzieningen, uw eigen Finse of infraroodsauna en een functionele buitenkeuken. Door de leidingen, afvoeren en elektra al vroeg in de prefabricage op te nemen, verloopt de installatie op locatie foutloos en uiterst snel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIE 6 — ONS STAPPENPLAN */}
      <section className="py-24 bg-white" id="poolhouse-process">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              STAP VOOR STAP PRECISIE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              Het complete proces <br />
              <span className="text-blue-600 italic font-light lowercase">van schets tot oplevering</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
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

      {/* SECTIE 7 — VEELGESTELDE VRAGEN */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100" id="poolhouse-faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
              ANTWOORDEN OP UW VRAGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none">
              Veelgestelde Vragen
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full text-left px-8 py-6 flex justify-between items-center text-blue-950 hover:bg-slate-50/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-display font-black uppercase tracking-tighter text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} 
                  />
                </button>
                
                {openFaq === index && (
                  <div className="px-8 pb-6 text-slate-500 text-xs md:text-sm font-semibold leading-relaxed border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 8 — MAAK UW TUIN COMPLEET CTA */}
      <section className="py-24 bg-white" id="offerte">
        <KellyCTA />
      </section>
    </div>
  );
}
