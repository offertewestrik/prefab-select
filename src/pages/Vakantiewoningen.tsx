import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Leaf, View, BedDouble, ShieldCheck } from 'lucide-react';
import { PrefabSteps } from '../App';
import { KellyCTA } from '../KellyCTA';

const Vakantiewoningen = () => {
  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <img 
            src="https://i.imgur.com/ZsBPHxQ.jpeg" 
            alt="Luxe Prefab Vakantiewoning" 
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
                  EXCLUSIEVE VAKANTIEWONINGEN
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 drop-shadow-2xl">
                Premium recreatief wonen en leven.
              </h1>
              <p className="text-xl md:text-2xl text-blue-50/80 mb-14 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                Hoogwaardige prefab vakantiewoningen met een moderne architectuur. Ervaar luxe, rust en de ultieme harmonie met de natuur.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center">
                <Link to="/offerte" className="bg-white text-blue-950 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all text-[11px] shadow-2xl flex items-center gap-3">
                  Start uw project <ArrowRight size={14} />
                </Link>
                <a href="#architectuur" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-[11px]">
                  Ontdek het design
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 2 — INTRODUCTIE PREMIUM VAKANTIEWONINGEN */}
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
                src="https://i.imgur.com/gNOQiIy.jpeg" 
                alt="Moderne architectuur vakantiewoning" 
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
                Uw exclusieve retreat in de natuur.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-14">
                <p className="mb-6 leading-relaxed">
                  Een plek waar luxe en ontspanning samenkomen. Onze modulaire vakantiewoningen zijn ontworpen om een ongeëvenaarde leefervaring te bieden, ver weg van de dagelijkse hectiek.
                </p>
                <p className="leading-relaxed">
                  Dankzij geprefabriceerde bouwsystemen garanderen wij de hoogste kwaliteit, snelle realisatie en minimale bouwimpact op de kavel. Een compromisloze investering in uw vrije tijd.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Architecturaal Design", 
                  "Maximale Duurzaamheid", 
                  "Naadloze Buitenruimte", 
                  "Premium Leefcomfort"
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
                Ontworpen voor grenzeloos buitenleven.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                De royale leefruimtes en kamerhoge raampartijen creëren een vloeiende overgang tussen interieur en exterieur, waardoor u altijd verbonden bent met de omgeving.
              </p>
              <p className="text-lg text-slate-600 border-l-2 border-blue-600 pl-6 leading-relaxed">
                Beleef de natuur op een unieke manier, omringd door luxe en comfort, dankzij een slim doordacht plan dat ruimte, rust en verbinding centraal stelt.
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
                  src="https://i.imgur.com/mcdq1P8.jpeg" 
                  alt="Interieur en exterieur connectie vakantiewoning" 
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
              Buitengewoon verblijven.
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              Elke vakantiewoning straalt exclusiviteit uit en is minutieus afgewerkt om u het comfort van thuis en de luxe van een retreat te bieden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Natuurlijk Karakter", desc: "Verfijnd materiaalgebruik dat esthetisch veroudert en volledig opgaat in een groene, natuurrijke setting.", icon: <Leaf size={32} /> },
              { title: "Ruimtelijke Beleving", desc: "Een intelligent plan met open zichtlijnen zorgt voor een enorm gevoel van ruimte en licht.", icon: <View size={32} /> },
              { title: "Luxe Suites", desc: "Prachtig afgewerkte slaap- en badkamers maken van elk verblijf een ware vijfsterren ervaring.", icon: <BedDouble size={32} /> },
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
      
      {/* SECTIE 5 — ARCHITECTUUR VISUAL LINKS */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-[0_40px_80px_rgba(29,78,216,0.15)]">
                <img 
                  src="https://i.imgur.com/PWFDiZZ.jpeg" 
                  alt="Hoogwaardige prefab vakantiewoning" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-10">
                Ongeëvenaarde kwaliteit in elk detail.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Geen standaard recreatiebouw, maar hoogwaardig vastgoed dat ontworpen is voor generaties. De slimme, modulaire bouwmethode stelt ons in staat om de prestaties van de woning onder strikte kwaliteitscontrole in onze fabriek te optimaliseren.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-blue-600 pl-6">
                Door een efficiënt fabricageproces en turn-key plaatsing stapt u binnen zonder u te bekommeren over een langzaam en onvoorspelbaar bouwtraject. 
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTIE 6 — ARCHITECTUUR STATEMENT */}
      <section className="py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://i.imgur.com/PWFDiZZ.jpeg" alt="Achtergrond detail architectuur" className="w-full h-full object-cover filter brightness-50" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck size={48} className="text-white/40 mb-10 mx-auto" />
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none mb-12">
            Verhef uw vrije tijd naar een hoger niveau.
          </h2>
          <p className="text-xl md:text-2xl text-blue-100/60 font-light mb-16 leading-relaxed">
            Klaar om te investeren in exclusief vrijetijdsvastgoed? Wij vertalen uw wensen naar een toonaangevend architecturaal ontwerp.
          </p>
          <Link to="/offerte" className="inline-block bg-white text-blue-950 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all text-xs shadow-2xl">
            Neem contact op
          </Link>
        </div>
      </section>

      {/* EXCLUSIEVE LINK NAAR PREFAB RECREATIEWONINGEN */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-6 block">
            Ontdek recreatiewoningen
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
            Luxe Recreatiewoningen en regelgeving
          </h3>
          <p className="text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-sm md:text-base">
            Bent u benieuwd naar de specifieke landelijke regels rondom vergunningsvrij bouwen, bestemmingsplannen en de bouwkosten van een premium prefab recreatiewoning? Bezoek onze speciale informatiepagina voor een diepgaand overzicht.
          </p>
          <Link 
            to="/prefab-recreatiewoning" 
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-500 shadow-lg"
          >
            Lees alles over Recreatiewoningen <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* SECTIE 7 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      <KellyCTA />
    </div>
  );
};

export default Vakantiewoningen;
