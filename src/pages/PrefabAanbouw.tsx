import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Box, ShieldCheck, Leaf, ArrowRight, CheckCircle2, ChevronRight, Zap, Sun, Utensils, Home, Layers, Palette, PenTool } from 'lucide-react';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

const PrefabAanbouw = () => {
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

      <KellyCTA />
    </div>
  );
};

export default PrefabAanbouw;
