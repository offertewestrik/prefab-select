import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Layout, Maximize, Star, ShieldCheck } from 'lucide-react';
import { PrefabSteps } from '../App';
import { KellyCTA } from '../KellyCTA';

const PrefabChalet = () => {
  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <img 
            src="https://i.imgur.com/Tqh8vyd.jpeg" 
            alt="Luxe Prefab Chalet" 
            className="w-full h-full object-cover opacity-60 scale-105 transform origin-center animate-[subtle-zoom_20s_infinite_alternate]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-black/20" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-block px-5 py-2 border border-white/20 rounded-full mb-10 backdrop-blur-md">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                  EXCLUSIEVE PREFAB CHALETS
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl">
                Modern buitenleven, volledig op maat.
              </h1>
              <p className="text-xl md:text-2xl text-blue-50/80 mb-14 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                Hoogwaardige prefab recreatiewoningen met moderne architectuur, grootse raampartijen en premium afwerking.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center">
                <Link to="/offerte" className="bg-white text-blue-950 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all text-[11px] shadow-2xl flex items-center gap-3">
                  Neem contact op <ArrowRight size={14} />
                </Link>
                <a href="#architectuur" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-[11px]">
                  Ontdek het design
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 2 — INTRODUCTIE PREMIUM CHALETS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
              <img 
                src="https://i.imgur.com/EQmzkmQ.jpeg" 
                alt="Moderne architectuur prefab chalet" 
                className="w-full object-cover aspect-[4/5] object-center"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-10">
                Meer dan een vakantiewoning. Een statement.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-14">
                <p className="mb-6 leading-relaxed">
                  Onze prefab chalets herdefiniëren de standaard van recreatief vastgoed. Geen tijdelijke constructies, maar permanente luxe verpakt in modulaire architectuur.
                </p>
                <p className="leading-relaxed">
                  Met een focus op hoogwaardig materiaalgebruik, naadloze verbinding met de natuur en architectonische elegantie creëren wij exclusieve verblijven voor wie geen concessies doet.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Premium Afwerking", 
                  "Moderne Lijnenspel", 
                  "Volledig Maatwerk", 
                  "Turn-key Opgeleverd"
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0" />
                    <span className="font-bold text-blue-950 text-xs uppercase tracking-widest">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 3 — ARCHITECTUUR VISUAL RECHTS */}
      <section id="architectuur" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-10">
                Ontworpen voor de veeleisende omgeving.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                De overvloed aan natuurlijk licht en het minimalistische design zorgen ervoor dat het chalet volledig opgaat in de omgeving, terwijl het tegelijkertijd opvalt door de luxueuze uitstraling.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-blue-600 pl-6">
                Creëer een hoogwaardige leefomgeving met open structuren, premium materialen en een verfijnd design dat de grens tussen binnen en buiten op elegante wijze laat vervagen.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-[0_40px_80px_rgba(29,78,216,0.15)]">
                <img 
                  src="https://i.imgur.com/iUP4upI.jpeg" 
                  alt="Luxe buitenleven prefab chalet" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTIE 4 — KERNWAARDEN MET GROTE WITRUIMTE */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <h2 className="text-4xl md:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
              Buitenleven zonder compromis.
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              Elk aspect van onze chalets is zorgvuldig ontworpen om een ervaring van absolute rust en verfijning te bieden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Panoramisch Design", desc: "Verdiepingshoge raampartijen vervagen de grens tussen binnen en buiten voor een ongeëvenaarde ruimtelijke beleving.", icon: <Maximize size={32} /> },
              { title: "Verfijnd Materiaal", desc: "Gebruik van organische, hoogwaardige materialen zoals cederhout, natuursteen en naadloos stucwerk.", icon: <Star size={32} /> },
              { title: "Modulaire Perfectie", desc: "Geprefabriceerd onder geconditioneerde omstandigheden en turn-key geplaatst met minimale verstoring van de natuur.", icon: <Layout size={32} /> },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-blue-950 mb-10 transition-transform group-hover:scale-110 duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-blue-950 uppercase tracking-widest mb-6">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 5 — ARCHITECTUUR STATEMENT */}
      <section className="py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://i.imgur.com/EQmzkmQ.jpeg" alt="Achtergrond detail architectuur" className="w-full h-full object-cover filter brightness-50" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck size={48} className="text-white/40 mb-10 mx-auto" />
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-12">
            De ultieme recreatiewoning voor het premium segment.
          </h2>
          <p className="text-xl md:text-2xl text-blue-100/60 font-light mb-16 leading-relaxed">
            Investeer in een exclusief vastgoed object of realiseer uw droomverblijf. Onze chalets bieden een zeldzame combinatie van architectuur en vrijheid.
          </p>
          <Link to="/offerte" className="inline-block bg-white text-blue-950 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all text-xs shadow-2xl">
            Start het ontwerptraject
          </Link>
        </div>
      </section>

      {/* SECTIE 6 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      <KellyCTA />
    </div>
  );
};

export default PrefabChalet;
