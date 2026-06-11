import React from 'react';
import Seo from '../components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Box, ShieldCheck, Leaf, ArrowRight, CheckCircle2, ChevronRight, Zap, Droplets, Utensils, Sofa, Sun } from 'lucide-react';
import { PrefabSteps } from '../App';
import { KellyCTA } from '../KellyCTA';

const Poolhouse = () => {
  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      <Seo
        title="Luxe Prefab Poolhouse op Maat | Prefab Select"
        description="Een architectonisch poolhouse als verlengstuk van uw tuin. Prefab gebouwd, snel geplaatst en luxe afgewerkt met bar, lounge of buitenkeuken."
        canonical="/poolhouse"
        image="https://i.imgur.com/X3n5XIc.jpeg"
      />
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://i.imgur.com/X3n5XIc.mp4" type="video/mp4" />
            <img src="https://i.imgur.com/X3n5XIc.jpeg" alt="Luxe Poolhouse" className="w-full h-full object-cover" />
          </video>
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
                  LUXE POOLHOUSES
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Exclusieve prefab poolhouses met moderne architectuur.
              </h1>
              <p className="text-xl md:text-2xl text-blue-100/70 mb-12 font-light leading-relaxed max-w-2xl">
                Hoogwaardige prefab poolhouses volledig op maat gerealiseerd voor luxe buitenleven, ontspanning en comfort.
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

      {/* SECTIE 2 — WAT IS EEN POOLHOUSE? */}
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
                src="https://i.imgur.com/gGBOzjd.jpeg" 
                alt="Prefab poolhouse realisatie" 
                className="w-full object-cover aspect-[4/5] md:aspect-square lg:aspect-[4/5]" loading="lazy"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Wat is een prefab poolhouse?
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Een prefab poolhouse is een luxe buitenruimte die volledig op maat wordt gerealiseerd en perfect aansluit op moderne tuinen, zwembaden en buitenverblijven.
                </p>
                <p className="mb-6">
                  Poolhouses worden steeds populairder als exclusieve uitbreiding van de tuin voor ontspanning, wellness, buitenleven en extra comfort.
                </p>
                <p>
                  Bij Prefab Select realiseren wij hoogwaardige prefab poolhouses met moderne architectuur, luxe afwerking en duurzame materialen.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Luxe buitenleven", 
                  "Hoogwaardige afwerking", 
                  "Volledig maatwerk", 
                  "Moderne architectuur"
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
              Creëer de perfecte buitenruimte met onze exclusieve en veelzijdige opties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Lounge ruimtes", desc: "Creëer een luxe buitenruimte voor ontspanning en comfort.", icon: <Sofa size={24} /> },
              { title: "Buitenkeukens", desc: "Moderne poolhouses met luxe buitenkeuken en bar mogelijkheden.", icon: <Utensils size={24} /> },
              { title: "Wellness ruimtes", desc: "Combineer jouw poolhouse met wellness voorzieningen zoals sauna’s of jacuzzi’s.", icon: <Droplets size={24} /> },
              { title: "Grote glaspartijen", desc: "Maximaal daglicht dankzij moderne schuifpuien en glaswanden.", icon: <Sun size={24} /> },
              { title: "Luxe gevelafwerkingen", desc: "Van strak wit stucwerk tot moderne houten gevelaccenten.", icon: <Box size={24} /> },
              { title: "Volledig maatwerk", desc: "Ieder poolhouse wordt afgestemd op jouw woning, tuin en wensen.", icon: <CheckCircle2 size={24} /> },
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

      {/* SECTIE 4 — MODERNE ARCHITECTUUR & BUITENLEVEN */}
      <section className="py-24 md:py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://i.imgur.com/gGBOzjd.jpeg" alt="Moderne poolhouse architectuur" className="w-full h-full object-cover filter brightness-75" loading="lazy" />
          <div className="absolute inset-0 bg-blue-950/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8">
            Exclusief buitenleven met moderne architectuur.
          </h2>
          <p className="text-xl text-blue-100/70 font-light mb-6">
            Onze prefab poolhouses combineren luxe, comfort en moderne architectuur binnen één hoogwaardige buitenruimte.
          </p>
          <p className="text-lg text-blue-100/50">
            Van minimalistische ontwerpen en luxe overkappingen tot volledig afgesloten wellness ruimtes — iedere oplossing wordt volledig op maat ontworpen.
          </p>
        </div>
      </section>

      {/* SECTIE 5 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      {/* SECTIE 6 — DUURZAAM & MODULAIR BOUWEN */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
                Duurzaam en modulair gebouwd.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-12">
                <p className="mb-6">
                  Prefab Select werkt met moderne prefab bouwmethodes waarbij kwaliteit, duurzaamheid en efficiëntie centraal staan.
                </p>
                <p>
                  Door slim modulair te bouwen ontstaat een hoogwaardige buitenruimte met minimale overlast en maximale afwerkingskwaliteit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Duurzaam gebouwd", 
                  "Minder bouwafval", 
                  "Hoogwaardige materialen", 
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
                src="https://i.imgur.com/gGBOzjd.jpeg" 
                alt="Duurzaam en modulair bouwen poolhouse" 
                className="w-full object-cover aspect-[4/5] object-center" loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 7 — PRIJSINDICATIE */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
            Wat kost een prefab poolhouse?
          </h2>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
            De kosten van een prefab poolhouse hangen af van afmetingen, afwerking, luxe opties en indeling.
          </p>

          <div className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-xl border border-slate-100 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2">Maatwerk oplossingen</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-display font-black text-blue-950 tracking-tighter">Op aanvraag</span>
                </div>
                <p className="text-slate-600">Ieder poolhouse wordt volledig op maat samengesteld afhankelijk van wensen en uitstraling.</p>
              </div>
              
              <Link to="/offerte" className="w-full md:w-auto text-center bg-blue-950 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-900 transition-all text-xs shadow-xl whitespace-nowrap">
                Vraag offerte aan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KellyCTA />

      {/* AFSLUITENDE CTA IS GLOBAL IN APP.TSX */}

    </div>
  );
};

export default Poolhouse;
