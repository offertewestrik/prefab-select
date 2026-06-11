import React from 'react';
import Seo from '../components/Seo';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Factory, ShieldCheck, Zap, Timer, ArrowRight, MessageCircle, PenTool, Layout, Shield, Quote, Leaf, Plus } from 'lucide-react';
import { PrefabSteps } from '../App';
import { KellyCTA } from '../KellyCTA';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Seo
        title="Over Ons – Specialist in Prefab Bouwen | Prefab Select"
        description="Maak kennis met Prefab Select: vakmensen met passie voor modulair bouwen. Eigen productie, korte lijnen en hoogwaardige afwerking door heel Nederland."
        canonical="/over-ons"
        image="https://i.imgur.com/covRQg3.jpeg"
      />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center pt-32 md:pt-48 pb-12 md:pb-20 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0 text-left">
          <img 
            src="https://i.imgur.com/covRQg3.jpeg" 
            alt="Projects Hero" 
            className="w-full h-full object-cover opacity-30 contrast-[1.1] grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/60 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-6 block leading-none">OVER PREFAB SELECT</span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1] md:leading-[0.8] mb-6 md:mb-8 tracking-tighter uppercase whitespace-pre-line">
              Moderne prefab bouwoplossingen <br />
              <span className="italic font-light lowercase text-blue-400 decoration-blue-400/20 underline underline-offset-8 text-3xl md:text-7xl">met hoogwaardige afwerking.</span>
            </h1>
            <p className="text-base md:text-xl text-blue-100/40 max-w-2xl font-medium leading-relaxed mb-8 md:mb-10">
              Van prefab uitbouwen en mantelzorgwoningen tot luxe chalets en modulaire woningen — wij combineren moderne architectuur met efficiënte prefab bouwmethodes.
            </p>
            <div className="flex gap-4">
               <Link to="/diensten" className="inline-block px-10 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all">
                Bekijk mogelijkheden
               </Link>
               <Link to="/offerte" className="inline-block px-10 py-6 border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] backdrop-blur-md hover:bg-white/10 hover:-translate-y-1 transition-all">
                Vraag offerte aan
               </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sectie 2 — Wie Wij Zijn */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
                <img src="https://i.imgur.com/IUOK0hb.jpeg" alt="Wie wij zijn" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>
            <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none">Wie wij zijn</h2>
                <div className="space-y-4 text-slate-500 leading-relaxed text-sm md:text-base">
                    <p>Prefab Select is gespecialiseerd in hoogwaardige prefab bouwoplossingen voor zowel particuliere als zakelijke projecten.</p>
                    <p>Wij realiseren moderne prefab uitbouwen, mantelzorgwoningen, chalets, poolhouses en modulaire woningen met een sterke focus op kwaliteit, duurzaamheid en hoogwaardige afwerking.</p>
                    <p>Door gebruik te maken van moderne prefab en modulaire bouwmethodes kunnen wij efficiënter bouwen met minder overlast en kortere bouwtijden dan traditionele bouwmethodes.</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                    {["Hoogwaardige afwerking", "Snelle realisatie", "Modulair bouwen", "Duurzame oplossingen"].map(badge => (
                        <span key={badge} className="px-6 py-3 bg-blue-50 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest">{badge}</span>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectie 3 — Werkwijze & Stats */}
      <section className="py-32 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none mb-8">Een efficiënte manier van bouwen.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-20 leading-relaxed">Prefab bouwen draait om efficiëntie, kwaliteit en controle. Door onderdelen vooraf in een gecontroleerde omgeving te produceren ontstaat een sneller en nauwkeuriger bouwproces. Hierdoor beperken we overlast op locatie en kunnen projecten sneller gerealiseerd worden zonder concessies te doen aan kwaliteit of uitstraling.</p>
            
            <div className="grid md:grid-cols-4 gap-8">
                {[
                    { label: "Minder bouwafval", icon: <Leaf /> },
                    { label: "Snellere bouwtijd", icon: <Timer /> },
                    { label: "Hoogwaardige isolatie", icon: <ShieldCheck /> },
                    { label: "Efficiënte productie", icon: <Factory /> }
                ].map(stat => (
                    <div key={stat.label} className="p-10 bg-white rounded-3xl shadow-sm flex flex-col items-center gap-6">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">{stat.icon}</div>
                        <span className="font-black uppercase tracking-widest text-xs text-blue-950">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Sectie 4 — Wat Wij Realiseren */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none mb-16 text-center">Wat wij realiseren</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                {[
                    { title: "Prefab uitbouwen", img: "https://i.imgur.com/6VuTqto.jpeg" },
                    { title: "Mantelzorgwoningen", img: "https://i.imgur.com/v4jk0SK.jpeg" },
                    { title: "Luxe chalets", img: "https://i.imgur.com/Tqh8vyd.jpeg" },
                    { title: "Poolhouses", img: "https://i.imgur.com/gGBOzjd.jpeg" },
                    { title: "Modulaire woningen", img: "https://i.imgur.com/covRQg3.jpeg" }
                ].map(item => (
                    <div key={item.title} className="group cursor-pointer aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-blue-950/40 group-hover:bg-blue-950/20 transition-all"></div>
                        <div className="absolute bottom-10 left-10 text-white font-display font-black text-2xl uppercase tracking-tighter leading-none">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Sectie 5 - Modulair & Circulair */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
                <h2 className="text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none">Moderne modulaire bouwoplossingen.</h2>
                <div className="space-y-4 text-slate-500 leading-relaxed">
                    <p>Prefab Select werkt met moderne modulaire bouwsystemen waarbij efficiëntie, flexibiliteit en duurzaamheid centraal staan.</p>
                    <p>Door slim modulair te bouwen ontstaan hoogwaardige prefab oplossingen die sneller gerealiseerd kunnen worden en voorbereid zijn op toekomstige uitbreidingen of aanpassingen.</p>
                    <p>Daarnaast draagt circulair bouwen bij aan een duurzamere manier van bouwen door efficiënter om te gaan met materialen, productieprocessen en energieverbruik.</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                    {["Duurzaam gebouwd", "Modulair uitbreidbaar", "Minder materiaalverspilling", "Energiezuinige oplossingen"].map(badge => (
                        <span key={badge} className="px-6 py-3 bg-blue-50 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest">{badge}</span>
                    ))}
                </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden">
                <img src="https://i.imgur.com/fmQecXk.jpeg" alt="Modulair" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
            </div>
        </div>
      </section>

      {/* Sectie 6 — Waarom Kiezen */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
             <h2 className="text-5xl font-display font-black text-blue-950 tracking-tighter uppercase leading-none mb-20 text-center">Waarom kiezen voor Prefab Select</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Hoogwaardige prefab bouw", icon: <Factory /> },
                    { title: "Moderne architectuur", icon: <Layout /> },
                    { title: "Volledig maatwerk", icon: <PenTool /> },
                    { title: "Snelle realisatie", icon: <Timer /> },
                    { title: "Transparante communicatie", icon: <MessageCircle /> },
                    { title: "Professionele begeleiding", icon: <ShieldCheck /> }
                ].map(item => (
                    <div key={item.title} className="p-12 bg-white rounded-3xl shadow-sm text-center flex flex-col items-center gap-6">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">{item.icon}</div>
                        <span className="font-black uppercase tracking-widest text-xs text-blue-950">{item.title}</span>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Sectie 7 — Het Proces */}
      <PrefabSteps />

      <KellyCTA />
    </div>
  );
};

export default AboutPage;
