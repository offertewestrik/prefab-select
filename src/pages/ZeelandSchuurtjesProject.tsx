import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Building2, Timer, ShieldCheck, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ZeelandSchuurtjesProject() {
  return (
    <div className="bg-white text-blue-950 font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 leading-none">
                  NIEUWBOUWPROJECT ZEELAND
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-display font-black leading-[0.85] text-blue-950 mb-8 tracking-tighter uppercase">
                100+ Prefab <br />
                <span className="text-blue-600 italic font-light lowercase underline decoration-blue-600/10 underline-offset-8">Schuurtjes</span> <br />
                Geplaatst
              </h1>

              <p className="text-lg leading-relaxed text-slate-500 mb-10 max-w-xl font-medium border-l-4 border-blue-600 pl-8">
                Voor een grootschalig woningbouwproject in Zeeland heeft Prefab Select meer dan 
                100 prefab schuurtjes geproduceerd en geplaatst voor een bouwbedrijf. Dankzij onze 
                efficiënte prefab werkwijze konden alle prefab bergingen snel en strak worden gerealiseerd.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/contact"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 shadow-2xl hover:-translate-y-1 active:scale-95 group flex items-center gap-3"
                >
                  Vraag Informatie Aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/projecten"
                  className="border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300"
                >
                  Bekijk Meer Projecten
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
                {[
                  { label: 'Schuurtjes', value: '100+', sub: 'Geleverd' },
                  { label: 'Plaatsing', value: 'Snel', sub: 'On-site' },
                  { label: 'Ontwerp', value: 'Modern', sub: 'Afgewerkt' },
                  { label: 'Status', value: 'Ready', sub: 'Opgeleverd' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center"
                  >
                    <h3 className="text-2xl font-black text-blue-600 uppercase tracking-tighter leading-none mb-1">{stat.value}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-100/50 rounded-full blur-[120px] -z-10" />
              <div className="grid grid-cols-2 gap-6">
                <img
                  src="https://i.imgur.com/p3qz8V3.jpeg"
                  alt="Prefab schuurtjes Zeeland"
                  className="rounded-[2.5rem] object-cover h-[320px] w-full shadow-2xl border-4 border-white"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://i.imgur.com/qEZsZu3.jpeg"
                  alt="Nieuwbouwproject Zeeland"
                  className="rounded-[2.5rem] object-cover h-[320px] w-full mt-12 shadow-2xl border-4 border-white"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://i.imgur.com/ERKyWiV.jpeg"
                  alt="Prefab bergingen Zeeland"
                  className="rounded-[3rem] object-cover h-[400px] w-full col-span-2 shadow-2xl border-4 border-white mt-6"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mb-24">
            <span className="text-blue-600 text-[10px] uppercase font-black tracking-[0.5em] mb-6 block">
              PREFAB BOUW ZEELAND
            </span>

            <h2 className="text-4xl md:text-6xl font-display font-black text-blue-950 mt-5 mb-10 leading-none tracking-tighter uppercase">
              Specialist in prefab bergingen <br />
              <span className="text-blue-600 italic font-light lowercase">voor grootschalige projecten.</span>
            </h2>

            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              Prefab Select ondersteunt bouwbedrijven en projectontwikkelaars in Zeeland met hoogwaardige prefab oplossingen. 
              Voor dit nieuwbouwproject hebben wij meer dan 100 prefab schuurtjes geproduceerd en geplaatst met een efficiënte planning en snelle montage op locatie.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Snelle Prefab Montage',
                desc: 'Dankzij prefab productie konden alle 100+ schuurtjes snel en efficiënt worden geplaatst binnen de strakke planning van het nieuwbouwproject.',
                icon: <Timer size={24} />
              },
              {
                title: 'Moderne Uitstraling',
                desc: 'De prefab bergingen sluiten perfect aan op de moderne architectuur van de woningen en zijn uitgevoerd met duurzame, onderhoudsarme materialen.',
                icon: <Box size={24} />
              },
              {
                title: 'B2B Partner Zeeland',
                desc: 'Prefab Select werkt nauw samen met aannemers en ontwikkelaars in Zeeland aan hoogwaardige prefab oplossingen voor diverse bouwprojecten.',
                icon: <Building2 size={24} />
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blue-50/50 rounded-[3rem] p-12 border border-blue-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-blue-950 uppercase tracking-tighter mb-5">
                  {card.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center shadow-3xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase">
                Prefab partner <br />
                <span className="text-blue-400 italic font-light lowercase decoration-blue-400/20 underline underline-offset-8">nodig?</span>
              </h2>

              <p className="text-xl text-blue-100/60 leading-relaxed mb-12 font-medium">
                Prefab Select ondersteunt bouwbedrijven en projectontwikkelaars met efficiënte prefab oplossingen voor woningbouwprojecten in Zeeland en omgeving.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <Link 
                  to="/contact" 
                  className="bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:-translate-y-1 active:scale-95"
                >
                  Neem Contact Op
                </Link>
                <Link 
                  to="/projecten" 
                  className="border border-white/20 text-white hover:bg-white/10 transition-all duration-300 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px]"
                >
                  Bekijk Meer Projecten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
