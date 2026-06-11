import React from 'react';
import Seo from '../components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Box, ShieldCheck, Leaf, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

const Mantelzorgwoning = () => {
  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      <Seo
        title="Prefab Mantelzorgwoning in de Tuin | Prefab Select"
        description="Comfortabele prefab mantelzorgwoning in de tuin. Volledig uitgerust, snel geplaatst en vaak vergunningsvrij. Vraag vrijblijvend advies aan bij Prefab Select."
        canonical="/mantelzorgwoning"
        image="https://i.imgur.com/RMmRx1j.jpeg"
      />
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            src="https://i.imgur.com/egN8Nm5.jpeg"
            alt="Prefab Mantelzorgwoning Architectuur" 
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
                  MANTELZORGWONINGEN
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Moderne mantelzorgwoningen met hoogwaardige afwerking.
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/70 mb-12 font-light leading-relaxed max-w-2xl">
                Comfortabele en duurzame prefab mantelzorgwoningen volledig op maat gerealiseerd met snelle plaatsing en moderne architectuur.
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

      {/* SECTIE 2 — WAT IS EEN MANTELZORGWONING? */}
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
                src="https://i.imgur.com/tGXkhAS.jpeg" 
                alt="Prefab mantelzorgwoning realisatie" 
                className="w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]" loading="lazy"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wat is een mantelzorgwoning?
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Een mantelzorgwoning is een zelfstandige woonoplossing op eigen terrein waarmee familieleden dichtbij elkaar kunnen wonen terwijl privacy en zelfstandigheid behouden blijven.
                </p>
                <p className="mb-6">
                  Prefab mantelzorgwoningen worden steeds populairder vanwege de snelle plaatsing, moderne uitstraling en comfortabele leefomgeving.
                </p>
                <p>
                  Bij Prefab Select realiseren wij hoogwaardige prefab mantelzorgwoningen volledig op maat, afgestemd op persoonlijke wensen, beschikbare ruimte en moderne wooncomfort eisen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Snelle realisatie", 
                  "Volledig maatwerk", 
                  "Duurzaam gebouwd", 
                  "Comfortabel wonen"
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

      {/* SECTIE 3 — DE VOORDELEN VAN EEN PREFAB MANTELZORGWONING */}
      <section id="mogelijkheden" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
              De voordelen
            </h2>
            <p className="text-lg text-slate-600">
              Waarom kiezen voor een prefab mantelzorgwoning van Prefab Select?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Snelle plaatsing", desc: "Doordat de woning grotendeels prefab geproduceerd wordt kan de plaatsing aanzienlijk sneller verlopen.", icon: <Clock size={24} /> },
              { title: "Zelfstandig wonen", desc: "Familieleden wonen dichtbij terwijl privacy en zelfstandigheid behouden blijven.", icon: <ShieldCheck size={24} /> },
              { title: "Moderne architectuur", desc: "Hoogwaardige afwerking en moderne ontwerpen zorgen voor een luxe uitstraling.", icon: <Box size={24} /> },
              { title: "Duurzaam bouwen", desc: "Prefab bouwen zorgt voor minder bouwafval en energiezuinige woonoplossingen.", icon: <Leaf size={24} /> },
              { title: "Volledig maatwerk", desc: "Iedere mantelzorgwoning wordt afgestemd op persoonlijke wensen en beschikbare ruimte.", icon: <CheckCircle2 size={24} /> },
              { title: "Toekomstbestendig", desc: "Flexibele modulaire bouwmethodes maken toekomstige aanpassingen mogelijk.", icon: <Zap size={24} /> },
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
                <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 4 — MODERNE PREFAB MANTELZORGWONINGEN */}
      <section className="py-24 md:py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://i.imgur.com/RMmRx1j.jpeg" alt="Moderne prefab mantelzorgwoningen" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-blue-950/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
            Comfortabel wonen in een moderne omgeving.
          </h2>
          <p className="text-xl text-blue-100/70 font-light mb-6">
            Onze prefab mantelzorgwoningen combineren comfort, duurzaamheid en moderne architectuur binnen één efficiënte woonoplossing.
          </p>
          <p className="text-lg text-blue-100/50">
            Van luxe gevelafwerkingen en grote glaspartijen tot energiezuinige installaties en hoogwaardige isolatie — iedere woning wordt ontworpen voor comfortabel en toekomstbestendig wonen.
          </p>
        </div>
      </section>

      {/* SECTIE 5 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      {/* SECTIE 6 — MODULAIR & DUURZAAM BOUWEN */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Modulair en duurzaam bouwen.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Prefab Select werkt met moderne modulaire bouwmethodes waarbij snelheid, duurzaamheid en wooncomfort centraal staan.
                </p>
                <p>
                  Door slim prefab te bouwen ontstaat minder verspilling, een efficiënter bouwproces en een hoogwaardige mantelzorgwoning die voorbereid is op de toekomst.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Energiezuinig wonen", 
                  "Minder bouwafval", 
                  "Hoogwaardige isolatie", 
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
                src="https://i.imgur.com/RMmRx1j.jpeg" 
                alt="Modulair en duurzaam bouwen" 
                className="w-full object-cover aspect-[4/5]" loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 7 — PRIJSINDICATIE */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
            Wat kost een mantelzorgwoning?
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
            De kosten van een prefab mantelzorgwoning hangen af van afmetingen, afwerking, indeling en luxe opties.
          </p>

          <div className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-xl border border-slate-100 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Maatwerk oplossingen</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-display font-black text-blue-950 tracking-tighter">Op aanvraag</span>
                </div>
                <p className="text-slate-600">Prefab mantelzorgwoningen worden volledig op maat samengesteld afhankelijk van woonwensen en beschikbare ruimte.</p>
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

export default Mantelzorgwoning;
