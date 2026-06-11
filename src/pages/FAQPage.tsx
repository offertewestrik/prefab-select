import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'Bestemmingsplan',
    items: [
      {
        question: 'Hoe kan ik een bestemmingsplan inzien?',
        answer: 'Tegenwoordig zijn veel bestemmingsplannen online in te zien via de website van de gemeente en/of via het Omgevingsloket. Kun je jouw bestemmingsplan hier niet vinden? Neem dan contact op met jouw gemeente.'
      }
    ]
  },
  {
    title: 'Vergunning',
    items: [
      {
        question: 'Wanneer heb ik een omgevingsvergunning nodig?',
        answer: 'Om te weten of er een omgevingsvergunning nodig is voor jouw project, kun je via het Omgevingsloket een vergunningscheck doen. Met deze check wordt in enkele stappen bekeken of een vergunning noodzakelijk is voor jouw situatie.'
      },
      {
        question: 'Heb je een vergunning nodig voor een aanbouw?',
        answer: 'In veel gevallen mag je in Nederland vergunningsvrij uitbouwen tot ongeveer 4 meter aan de achterzijde van de woning. Wanneer jouw woning bijvoorbeeld een monument is, in beschermd stadsgezicht ligt of wanneer de gemeente aanvullende regels hanteert, kan alsnog een vergunning nodig zijn. Wij adviseren daarom altijd een vergunningcheck.'
      },
      {
        question: 'Kan Prefab Select ook mijn vergunning verzorgen?',
        answer: 'Jazeker. Prefab Select kan het volledige vergunningstraject verzorgen. Dankzij onze ervaring weten wij precies welke stappen nodig zijn voor een efficiënte aanvraag. Dit bespaart jou veel tijd en zorgen tijdens het proces.'
      },
      {
        question: 'Hoe lang duurt een omgevingsvergunning?',
        answer: 'Een eenvoudige aanvraag duurt gemiddeld ongeveer 8 weken. Complexere aanvragen kunnen langer duren afhankelijk van de gemeente, situatie en aanvullende eisen.'
      }
    ]
  },
  {
    title: 'Toestemming',
    items: [
      {
        question: 'Heb je akkoord van de buren nodig om uit te bouwen?',
        answer: 'In principe mag je zonder akkoord uitbouwen wanneer je binnen de regelgeving bouwt. Natuurlijk adviseren wij wel om jouw plannen vooraf met de buren te bespreken.'
      },
      {
        question: 'Beide buren hebben een uitbouw, is het mogelijk om daartussen te bouwen?',
        answer: 'Ja, dat is mogelijk. Ons prefab systeem maakt het goed mogelijk om tussen bestaande uitbouwen een nieuwe aanbouw te realiseren. Afhankelijk van de situatie kunnen wij de constructie perfect laten aansluiten op de bestaande bebouwing.'
      },
      {
        question: 'Heb je toestemming nodig van de VvE?',
        answer: 'Ja, dat kan. Wanneer jouw woning onderdeel uitmaakt van een Vereniging van Eigenaren kan toestemming van de VvE nodig zijn.'
      }
    ]
  },
  {
    title: 'Garantie',
    items: [
      {
        question: 'Heb ik garantie op mijn aanbouw?',
        answer: (
          <div className="space-y-2">
            <p>Ja, wij werken met hoogwaardige materialen en professionele bouwsystemen. Daarom geven wij garantie op onder andere:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Constructie: 10 jaar</li>
              <li>Bouwkundig werk: 10 jaar</li>
              <li>Kozijnbeglazing: 10 jaar</li>
              <li>Hang- en sluitwerk: 3 jaar</li>
              <li>Elektrische installaties: 2 jaar</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    title: 'Prefab aanbouw',
    items: [
      {
        question: 'Wat is de isolatiewaarde van de aanbouw?',
        answer: (
          <div className="space-y-2">
            <p>Onze prefab aanbouwen worden gebouwd met hoogwaardige isolatiematerialen en moderne constructiesystemen.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vloer: Rc 4,5 m².K/W</li>
              <li>Wanden: Rc 4,9 m².K/W</li>
              <li>Dak: minimaal Rc 6,3 m².K/W</li>
            </ul>
            <p>Hierdoor ontstaat een comfortabele en energiezuinige woonruimte.</p>
          </div>
        )
      },
      {
        question: 'Is de kwaliteit van een prefab aanbouw hetzelfde als traditionele bouw?',
        answer: 'Ja. De kwaliteit van prefab bouwen is minimaal gelijk aan traditionele bouw en in veel situaties zelfs beter. Doordat de bouw grotendeels binnen onder gecontroleerde omstandigheden plaatsvindt, kunnen wij zeer nauwkeurig werken zonder invloed van weersomstandigheden.'
      },
      {
        question: 'Wat zijn de belangrijkste verschillen tussen traditionele bouw en prefab?',
        answer: (
          <div className="space-y-2">
            <p>Bij traditionele bouw wordt veel werk uitgevoerd op locatie. Bij prefab bouwen worden onderdelen vooraf geproduceerd in de fabriek. Hierdoor ontstaat:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minder overlast</li>
              <li>Kortere bouwtijd</li>
              <li>Minder bouwafval</li>
              <li>Betere planning</li>
              <li>Hoogwaardige afwerking</li>
            </ul>
            <p>Daarnaast worden eventuele bouwkundige uitdagingen vaak al vooraf opgelost tijdens de voorbereiding.</p>
          </div>
        )
      },
      {
        question: 'Er staat al een uitbouw of vloer. Kunnen jullie daarop verder bouwen?',
        answer: 'Wanneer er een bestaande uitbouw aanwezig is, kunnen wij hier in veel gevallen naast verder bouwen. Op bestaande vloeren bouwen is meestal niet mogelijk omdat hiervoor eerst een nieuwe constructieve basis nodig is.'
      },
      {
        question: 'Wat is de levensduur van een aanbouw?',
        answer: 'Bij normaal onderhoud heeft een prefab aanbouw een levensduur die vergelijkbaar is met traditionele woningbouw.'
      },
      {
        question: 'Loopt het plafond en de wanden netjes door?',
        answer: 'Na het inmeten en technisch uitwerken van het project bekijken wij of plafonds en wanden strak kunnen doorlopen op de bestaande woning.'
      },
      {
        question: 'Doen jullie ook opbouwen?',
        answer: 'Ja, wij realiseren ook opbouwen op prefab projecten die wij zelf hebben gerealiseerd.'
      }
    ]
  },
  {
    title: 'De bouw',
    items: [
      {
        question: 'Wat gebeurt er met grond en tegels die worden uitgegraven?',
        answer: 'Tegels en uitgegraven grond worden tijdens de werkzaamheden verzameld in bigbags of containers zodat de bouwplaats netjes en overzichtelijk blijft.'
      },
      {
        question: 'Hoelang voor de start van de bouw moet ik met voorbereidingen beginnen?',
        answer: 'Wij adviseren om ongeveer een week vooraf te starten met de voorbereidingen. Denk hierbij aan het vrijmaken van de tuin, verwijderen van bestrating en ruimte creëren in de woning.'
      },
      {
        question: 'Hoe groot mag ik uitbouwen?',
        answer: 'Hoe groot je mag uitbouwen hangt af van het bestemmingsplan, perceel, achtererfgebied en gemeentelijke regelgeving.'
      },
      {
        question: 'Kan Prefab Select het tekenwerk verzorgen?',
        answer: 'Ja. Ons team verzorgt bouwkundige tekeningen, technische uitwerkingen en constructieberekeningen volledig in eigen beheer.'
      },
      {
        question: 'Regelt Prefab Select het project van begin tot eind?',
        answer: 'Ja. Van ontwerp en voorbereiding tot productie, plaatsing en oplevering begeleiden wij het volledige traject.'
      },
      {
        question: 'Is heiwerk inbegrepen bij de prijs?',
        answer: 'Standaard is heiwerk gedeeltelijk inbegrepen. De exacte fundering en benodigde heipalen hangen af van het project en de situatie op locatie.'
      },
      {
        question: 'Hoe laten jullie de bouwplaats achter?',
        answer: 'Wij leveren de bouwplaats netjes, veilig en bezemschoon op.'
      },
      {
        question: 'Kunnen wij tijdens de verbouwing thuis blijven wonen?',
        answer: 'Ja, dat is één van de grote voordelen van prefab bouwen. Omdat de plaatsing snel verloopt en wij werken met tijdelijke stofschermen, kunnen bewoners vaak gewoon in de woning blijven wonen.'
      },
      {
        question: 'Hebben kinderen last van de verbouwing?',
        answer: 'Onze ervaring is dat kinderen het bouwproces vaak juist interessant vinden. Uiteraard proberen wij de overlast zoveel mogelijk te beperken.'
      },
      {
        question: 'Geeft verbouwen veel rotzooi?',
        answer: 'Elke verbouwing geeft tijdelijk overlast, maar prefab bouwen veroorzaakt doorgaans veel minder stof, afval en rommel dan traditionele bouw.'
      }
    ]
  },
  {
    title: 'Showroom',
    items: [
      {
        question: 'Hebben jullie een showroom?',
        answer: 'Ja. In onze showroom kun je materialen, kleuren, afwerkingen en mogelijkheden bekijken. Hier bespreken wij samen de wensen en mogelijkheden voor jouw project.'
      }
    ]
  },
  {
    title: 'Kosten',
    items: [
      {
        question: 'Kom ik voor onverwachte kosten te staan?',
        answer: 'Wij werken met duidelijke offertes en transparante communicatie. Mochten er tijdens het project aanvullende wensen of onvoorziene situaties ontstaan, dan bespreken wij dit altijd vooraf.'
      },
      {
        question: 'Betalingsafspraken',
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li>25% bij opdracht</li>
            <li>65% bij start productie in de fabriek</li>
            <li>10% bij oplevering</li>
          </ul>
        )
      },
      {
        question: 'Hoe kan ik mijn aanbouw financieren?',
        answer: 'Veel klanten financieren hun project via spaargeld, hypotheekverhoging, bouwdepot of financieringsmogelijkheden via een financieel adviseur.'
      }
    ]
  },
  {
    title: 'Verzekering',
    items: [
      {
        question: 'Ben ik verzekerd?',
        answer: 'Prefab Select werkt als professionele aannemer met passende verzekeringen voor projecten en werkzaamheden.'
      }
    ]
  },
  {
    title: 'Planning',
    items: [
      {
        question: 'Wat is gemiddeld de planning van de werkzaamheden?',
        answer: (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Maandag</span>
                <p className="text-sm font-medium">Geveldoorbraak en voorbereiding.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Dinsdag</span>
                <p className="text-sm font-medium">Graafwerkzaamheden en fundering.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Woensdag</span>
                <p className="text-sm font-medium">Plaatsing van de prefab constructie.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Donderdag & Vrijdag</span>
                <p className="text-sm font-medium">Aansluitingen, afwerking en oplevering.</p>
              </div>
            </div>
            <p className="mt-4 italic">Doordat veel onderdelen vooraf geproduceerd worden, verloopt de bouw aanzienlijk sneller dan traditionele bouw.</p>
          </div>
        )
      }
    ]
  },
  {
    title: 'Overige vragen',
    items: [
      {
        question: 'Leveren jullie door heel Nederland?',
        answer: 'Ja, Prefab Select realiseert projecten door heel Nederland.'
      },
      {
        question: 'Heb ik ergens niet aan gedacht?',
        answer: 'Geen zorgen. Tijdens het traject begeleiden wij je stap voor stap en denken wij mee over alle praktische en technische zaken rondom jouw prefab project.'
      }
    ]
  }
];

const FAQItemComponent = ({ item, index }: { item: FAQItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className={`border-b border-slate-100 last:border-0 transition-colors ${isOpen ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-sm md:text-base font-bold tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-blue-950 group-hover:text-blue-600'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "anticipate" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed max-w-3xl">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[2px] bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Knowledge Hub</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
            >
              Veelgestelde <br />
              <span className="text-blue-600 italic font-light">Vragen</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 max-w-xl leading-relaxed"
            >
              Alles wat je moet weten over vergunningen, de bouw, kosten en de unieke prefab methode van Prefab Select.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
            <div className="relative bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Search size={20} />
                </div>
                <h3 className="font-bold text-lg">Snel antwoord vinden?</h3>
              </div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Zoek een onderwerp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12 md:space-y-16">
          {filteredFaqs.map((category, catIdx) => (
            <motion.section
              key={catIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * catIdx }}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="sticky top-40">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
                        <HelpCircle size={16} />
                      </div>
                      <h2 className="text-xl font-black uppercase tracking-widest text-blue-950">
                        {category.title}
                      </h2>
                    </div>
                    <div className="w-10 h-1 bg-slate-100" />
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="bg-white border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-sm overflow-hidden">
                    {category.items.map((item, idx) => (
                      <FAQItemComponent key={idx} item={item} index={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-slate-100">
              <p className="text-slate-400 font-medium">Geen resultaten gevonden voor "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Wis zoekopdracht
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-32">
        <div className="bg-blue-950 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-20" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-white mb-6">
                Staat jouw vraag er <br />
                <span className="text-blue-400 italic font-light">niet tussen?</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-8 max-w-xl">
                Onze experts staan elke werkdag voor je klaar om alle vragen over jouw toekomstige prefab project te beantwoorden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                  Neem contact op <ArrowRight size={16} />
                </Link>
                <button className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <MessageCircle size={16} /> WhatsApp ons
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block relative h-full min-h-[400px]">
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl group/kelly mt-[-5rem] lg:mt-[-100px] mb-[-80px]">
                <img 
                  src="https://i.imgur.com/cXPWGDM.jpeg" 
                  alt="Kelly - Prefab Select Specialist" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover/kelly:grayscale-0 transition-all duration-[2.5s] group-hover/kelly:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-linear-to-t from-blue-950 via-blue-950/40 to-transparent">
                  <p className="text-white font-display font-black text-2xl uppercase tracking-tighter leading-none mb-1">Kelly</p>
                  <p className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">Specialist Prefab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
