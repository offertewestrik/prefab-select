import React from 'react';
import { 
  ArrowRight, 
  Settings, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Construction,
  Truck,
  FileText,
  MapPin,
  Hammer,
  ClipboardCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

export default function Werkwijze() {
  const steps = [
    {
      day: 'Stap 01',
      title: 'Voorbereiding & Geveldoorbraak',
      icon: <Construction className="w-5 h-5" />,
      desc: 'We starten met het vakkundig voorbereiden van de locatie. Onze specialisten realiseren de geveldoorbraak met minimale overlast, waarbij we direct gebruikmaken van tijdelijke bescherming om de woning stofvrij te houden.'
    },
    {
      day: 'Stap 02',
      title: 'Grond- en Funderingswerk',
      icon: <Hammer className="w-5 h-5" />,
      desc: 'Een solide basis is essentieel. We voeren het grondwerk uit en leggen de fundering conform alle technische en constructieve vereisten, zodat de constructie optimaal ondersteund wordt.'
    },
    {
      day: 'Stap 03',
      title: 'Plaatsing Prefab Constructie',
      icon: <Truck className="w-5 h-5" />,
      desc: 'Dankzij onze prefab methode wordt de volledige constructie in één dag geplaatst. Met uiterste precisie wordt de module op de fundering gepositioneerd en direct wind- en waterdicht gemonteerd.'
    },
    {
      day: 'Stap 04',
      title: 'Technische Afwerking',
      icon: <Settings className="w-5 h-5" />,
      desc: 'Onze vakmensen verzorgen de volledige aansluiting van installaties en de esthetische afwerking van de buitenzijde. Alles wordt naadloos aangesloten op uw bestaande woning.'
    },
    {
      day: 'Stap 05',
      title: 'Oplevering & Inspectie',
      icon: <ClipboardCheck className="w-5 h-5" />,
      desc: 'Na een grondige kwaliteitscontrole wordt het project bezemschoon opgeleverd. We lopen samen alle details na om te zorgen dat het resultaat exact voldoet aan uw verwachtingen.'
    }
  ];

  const uniquePoints = [
    {
      title: 'Hoogwaardige Kwaliteit',
      desc: 'Onze modules worden geproduceerd onder gecontroleerde fabrieksomstandigheden, wat resulteert in een hogere precisie en betere isolatiewaarden dan traditionele bouw.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Efficiënt & Voorspelbaar',
      desc: 'Door de prefab bouwwijze is de werkelijke bouwtijd op locatie minimaal. Dit betekent minder overlast voor u en uw buren en een strakke, betrouwbare planning.',
      icon: <Clock className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Heldere Communicatie',
      desc: 'Transparantie staat centraal. Van de eerste offerte tot de uiteindelijke oplevering houden we u op de hoogte van elke stap in het proces.',
      icon: <FileText className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION - CLEAN & PROFESSIONAL */}
      <section className="relative pt-32 md:pt-48 pb-12 md:pb-24 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-100/50 rounded-full mb-6 text-blue-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-widest">Onze Werkwijze</span>
              </div>
              
              <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[1] md:leading-none mb-6 md:mb-8 text-blue-950">
                Van ontwerp <br />
                tot <span className="text-blue-600">oplevering.</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed max-w-xl font-medium">
                Prefab Select ontzorgt u volledig. We combineren traditioneel vakmanschap met de modernste prefab technieken voor een snelle en hoogwaardige realisatie van uw project.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-blue-700 transition-all">
                  Start uw project
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white border border-slate-200 text-blue-950 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all">
                  Contact opnemen
                </Link>
              </div>
            </div>

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200">
              <img 
                src="https://i.imgur.com/2L9Zj3z.jpeg" 
                alt="Prefab Project" 
                className="w-full aspect-video md:aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ONTWERP JE AANBOUW */}
      <section className="py-24 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200">
              <img 
                src="https://i.imgur.com/IUOK0hb.jpeg" 
                alt="Ontwerp je aanbouw" 
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="max-w-3xl mb-12">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-blue-950 mb-6">
                  Volledige controle over uw ontwerp
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Met onze online tool krijgt u direct inzicht in de mogelijkheden. Kies uw gewenste afmetingen, materialen en opties en zie direct hoe uw prefab aanbouw eruit komt te zien.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <Settings size={20} />
                  </div>
                  <h3 className="font-bold text-base mb-2 tracking-tight text-blue-950">Volledig Maatwerk</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Pas elk detail aan, van kozijnkleur tot gevelbekleding.</p>
                </div>
                
                <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-bold text-base mb-2 tracking-tight text-blue-950">Directe Offerte</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">Geen verrassingen. Direct inzicht in de investering.</p>
                </div>
              </div>

              <div className="mt-10">
                <Link to="https://prefabselect-configurator-551195834943.europe-west2.run.app/" target="_blank" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-950 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-blue-900 transition-all">
                  Ontwerp je aanbouw <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VERTICAL TIMELINE (CLEAN & STRUCTURED) */}
      <section className="py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
              Realisatie in <span className="text-blue-400">5 stappen</span>
            </h2>
            <p className="text-blue-200/60 text-lg leading-relaxed">
              Ons proces is gericht op efficiëntie en kwaliteit. Doordat we veel voorbereiden in onze fabriek, minimaliseren we de overlast op locatie.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start hover:bg-white/10 transition-colors">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-blue-400 font-black uppercase tracking-widest text-[10px]">{step.day}</span>
                    <div className="w-8 h-[1px] bg-blue-800" />
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-400 text-base leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — USP GRID (ZAKELIJK) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {uniquePoints.map((point, idx) => (
              <div key={idx} className="text-left">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {point.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-blue-950 mb-4">{point.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — VERGUNNINGEN & SHOWROOM */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-sm flex flex-col justify-between h-full">
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-8">
                  <ClipboardCheck size={24} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-blue-950 mb-6">Vergunningstraject</h2>
                <p className="text-slate-500 leading-relaxed">
                  Wij beoordelen kosteloos of uw project vergunningsvrij gerealiseerd kan worden. Indien een omgevingsvergunning vereist is, kunnen wij het volledige traject van tekenwerk tot indiening voor u verzorgen.
                </p>
              </div>
              <Link to="/faq" className="text-blue-600 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-4 transition-all">
                Bekijk veelgestelde vragen <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-blue-950 rounded-[2.5rem] p-12 flex flex-col justify-between h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-8">
                  <MapPin size={24} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">Onze Showroom</h2>
                <p className="text-blue-200/60 leading-relaxed">
                  Wilt u de kwaliteit zelf bekijken? U bent van harte welkom in onze showroom om materialen en afwerkingen te vergelijken. We bespreken uw wensen direct aan de hand van fysieke voorbeelden.
                </p>
              </div>
              <Link to="/contact" className="px-8 py-4 bg-white text-blue-950 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-slate-100 transition-all inline-block w-fit relative z-10">
                Afspraak maken
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

      {/* FINAL CTA - ZAKELIJK & DIRECT */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-blue-950 mb-6">
            Klaar voor een <span className="text-blue-600">adviesgesprek?</span>
          </h2>
          <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
            Ieder project is uniek. Onze adviseurs informeren u graag over de specifieke mogelijkheden voor uw situatie, inclusief een transparante kostenindicatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-blue-700 transition-all">
              Vraag Offerte Aan
            </Link>
            <Link to="/contact" className="px-10 py-5 bg-white border border-slate-200 text-blue-950 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
