import React from 'react';
import Seo from '../components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Building2, Users, HardHat, TrendingUp, Presentation, Compass, Factory, Truck } from 'lucide-react';
import { KellyCTA } from '../KellyCTA';
import { PrefabSteps } from '../App';

const Zakelijk = () => {
  return (
    <div className="bg-white min-h-screen pt-0 font-sans">
      <Seo
        title="Zakelijk Prefab Bouwen voor Professionals | Prefab Select"
        description="Prefab bouwoplossingen voor bedrijven, gemeenten en ontwikkelaars. Van tijdelijke huisvesting tot complete projecten: snel, schaalbaar en hoogwaardig."
        canonical="/zakelijk"
        image="https://i.imgur.com/v4jk0SK.jpeg"
      />
      {/* HERO SECTIE */}
      <section className="relative h-[85vh] md:h-screen min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="https://storage.googleapis.com/veo-generic-assets/s0/507850a5-29af-4384-b0db-6a7f0d01ca2f.mp4"
            className="w-full h-full object-cover opacity-60 scale-105 transform origin-center animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-black/30" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 md:pt-32 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="inline-block px-5 py-2 border border-blue-400/30 rounded-full mb-6 md:mb-10 backdrop-blur-md bg-blue-900/40">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">
                  ZAKELIJK
                </span>
              </div>
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[1] md:leading-[0.9] mb-8 md:mb-10 drop-shadow-2xl">
                Hoogwaardige prefab bouwoplossingen voor zakelijke projecten.
              </h1>
              <p className="text-base md:text-2xl text-blue-50/80 mb-10 md:mb-14 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                Prefab Select realiseert moderne prefab oplossingen voor vastgoedprojecten, projectontwikkelaars, aannemers, investeerders en recreatieve ontwikkelingen.
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center">
                <Link to="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all text-[11px] shadow-[0_20px_40px_rgba(37,99,235,0.3)] flex items-center gap-3 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                  Neem contact op <ArrowRight size={14} />
                </Link>
                <a href="#oplossingen" className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-[11px]">
                  Bekijk mogelijkheden
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 2 — ZAKELIJKE PREFAB OPLOSSINGEN */}
      <section id="oplossingen" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(29,78,216,0.15)] aspect-[4/5] w-full"
            >
              <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
              <img 
                src="https://i.imgur.com/v4jk0SK.jpeg" 
                alt="Modulaire woningbouw en zakelijke projecten" 
                className="w-full h-full object-cover object-center" loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-10">
                Prefab bouwen voor zakelijke projecten.
              </h2>
              <div className="prose prose-lg text-slate-600 mb-14">
                <p className="mb-6 leading-relaxed">
                  Prefab Select werkt samen met projectontwikkelaars, aannemers, investeerders en zakelijke opdrachtgevers aan moderne prefab bouwoplossingen.
                </p>
                <p className="mb-6 leading-relaxed">
                  Van modulaire woningbouw en recreatieve ontwikkelingen tot mantelzorgconcepten, vakantiewoningen en tijdelijke woonoplossingen — wij combineren snelheid, kwaliteit en efficiënte prefab bouwmethodes binnen één professioneel bouwproces.
                </p>
                <p className="leading-relaxed">
                  Door slim prefab en modulair te bouwen kunnen projecten sneller gerealiseerd worden met minder overlast en een hoogwaardige afwerking.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Snelle realisatie", 
                  "Modulair bouwen", 
                  "Hoogwaardige afwerking", 
                  "Duurzame oplossingen"
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0" />
                    <span className="font-bold text-blue-950 text-xs uppercase tracking-widest">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTIE 3 — VOOR WIE WIJ WERKEN */}
      <section className="py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-8">
              Voor wie wij werken.
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              Wij bieden schaalbare prefab concepten aan diverse professionals binnen de vastgoed- en bouwsector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Vastgoedprojecten",
                desc: "Moderne prefab oplossingen voor woningbouw en vastgoedontwikkeling.",
                icon: <Building2 size={32} />
              },
              {
                title: "Projectontwikkelaars",
                desc: "Efficiënte modulaire bouwmethodes voor schaalbare bouwprojecten.",
                icon: <Presentation size={32} />
              },
              {
                title: "Aannemers",
                desc: "Slimme prefab oplossingen ter ondersteuning van efficiënte bouwprocessen.",
                icon: <HardHat size={32} />
              },
              {
                title: "Investeerders",
                desc: "Hoogwaardige prefab concepten voor recreatieve en zakelijke ontwikkelingen.",
                icon: <TrendingUp size={32} />
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-[0_40px_80px_rgba(29,78,216,0.1)] transition-all group border border-slate-100 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-blue-50/50 rounded-3xl flex items-center justify-center text-blue-600 mb-8 transition-transform group-hover:scale-110 duration-500 group-hover:bg-blue-600 group-hover:text-white">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-blue-950 uppercase tracking-widest mb-4 leading-relaxed">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIE 4 — WAT IS ALLEMAAL MOGELIJK? */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* AFBEELDING LINKS */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(29,78,216,0.1)] aspect-[4/5] lg:aspect-auto lg:h-[800px]"
            >
              <img 
                src="https://i.imgur.com/EpCTEPX.jpeg" 
                alt="Modulaire prefab oplossingen op maat" 
                className="w-full h-full object-cover object-center" loading="lazy"
              />
              {/* Zeer subtiele overlay voor diepte zonder de helderheid te verliezen */}
              <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply" />
            </motion.div>

            {/* CONTENT RECHTS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-blue-950 uppercase tracking-tighter leading-[0.9] mb-10">
                Modulaire prefab oplossingen op maat.
              </h2>
              <p className="text-lg text-slate-600 border-l-2 border-blue-600 pl-6 leading-relaxed mb-12">
                Prefab Select realiseert uiteenlopende prefab bouwconcepten voor zakelijke toepassingen. Ieder project wordt afgestemd op locatie, uitstraling en gewenste functionaliteit.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {[
                  "Modulaire woningbouw", "Recreatieparken", "Vakantiewoningen", "Chalets",
                  "Mantelzorgwoningen", "Tijdelijke huisvesting", "Zorgoplossingen", "Luxe buitenverblijven"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <span className="font-bold text-blue-950 text-xs uppercase tracking-[0.2em]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16">
                <Link to="/contact" className="inline-flex items-center gap-3 font-black uppercase tracking-widest text-[11px] text-blue-600 hover:text-blue-800 transition-colors group">
                  Informeer naar de mogelijkheden 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTIE 5 — ONS 4-STAPPEN PLAN */}
      <PrefabSteps />

      {/* SECTIE 6 — WAAROM PREFAB SELECT */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-blue-950 uppercase tracking-tighter leading-none mb-10">
                Waarom Prefab Select voor uw project?
              </h2>
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
                Kies voor betrouwbaarheid, bewezen prefab methodes en architectonische vrijheid. 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  "Moderne prefab bouwmethodes",
                  "Snelle projectrealisatie",
                  "Hoogwaardige afwerking",
                  "Modulair bouwen",
                  "Professionele begeleiding",
                  "Duurzame oplossingen"
                ].map((usp, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <ShieldCheck className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-black text-blue-950 uppercase tracking-widest text-sm leading-relaxed">{usp}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AFSLUITENDE CTA */}
      <section className="py-32 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://i.imgur.com/Tqh8vyd.jpeg" alt="Achtergrond detail architectuur" className="w-full h-full object-cover filter brightness-50" loading="lazy" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-blue-600/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10">
            <Building2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-12">
            Benieuwd naar de<br />zakelijke mogelijkheden?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100/60 font-light mb-16 leading-relaxed max-w-3xl mx-auto">
            Ontdek hoe Prefab Select hoogwaardige prefab bouw combineert met snelheid, duurzaamheid en moderne architectuur voor zakelijke projecten.
          </p>
          <div className="flex flex-wrap gap-5 justify-center">
            <Link to="/contact" className="bg-white text-blue-950 px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all text-xs shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Neem contact op
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white/20 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-white border-white hover:text-blue-950 transition-all text-xs">
              Vraag informatie aan
            </Link>
          </div>
        </div>
      </section>

      <KellyCTA />
    </div>
  );
};

export default Zakelijk;
