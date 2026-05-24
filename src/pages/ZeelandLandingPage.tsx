import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, MapPin, Home, Layout, Maximize2, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ZeelandLandingPage() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-white text-blue-950 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-24 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 z-0 text-left">
          <motion.div style={{ y: yHero }} className="absolute inset-0">
            <img 
              src="https://i.imgur.com/6VuTqto.jpeg" 
              alt="Prefab uitbouw Zeeland" 
              className="w-full h-full object-cover opacity-30 grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-blue-950/80 to-blue-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 leading-none">
                PREFAB SELECT ZEELAND
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase">
              Uitbouw & <br />
              <span className="text-blue-400 italic font-light lowercase underline decoration-blue-400/20 underline-offset-8">Dakkapel</span> <br />
              in Zeeland
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/60 mb-12 max-w-2xl leading-relaxed font-medium border-l-4 border-blue-600 pl-8">
              Op zoek naar een moderne prefab uitbouw of dakkapel in Zeeland? 
              Prefab Select realiseert stijlvolle uitbreidingen met snelle plaatsing,
              hoogwaardige afwerking en maximale woonruimte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
              >
                Vraag Offerte Aan <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/projecten" 
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-3xl text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95"
              >
                Bekijk Projecten
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Intro */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-50 rounded-full blur-[100px] -z-10" />
              <img
                src="https://i.imgur.com/Mcivs2I.jpeg"
                alt="Prefab uitbouw Zeeland"
                className="rounded-[3rem] shadow-2xl w-full"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 block">
                MEER RUIMTE ZONDER LANGE VERBOUWING
              </span>

              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 leading-none mb-8 tracking-tighter uppercase">
                Waarom kiezen voor un <br />
                <span className="text-blue-600 italic font-light lowercase">prefab uitbouw?</span>
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Een prefab uitbouw is dé oplossing voor extra leefruimte met minimale overlast. 
                Dankzij moderne prefab technieken kunnen wij sneller bouwen en leveren wij een hoogwaardige afwerking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { text: 'Snelle plaatsing', icon: <Zap size={18} /> },
                  { text: 'Uitstekende isolatie', icon: <ShieldCheck size={18} /> },
                  { text: 'Meer woningwaarde', icon: <Maximize2 size={18} /> },
                  { text: 'Moderne uitstraling', icon: <Layout size={18} /> },
                  { text: 'Minder overlast', icon: <Home size={18} /> },
                  { text: 'Volledig maatwerk', icon: <Maximize2 size={18} /> },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 font-bold uppercase tracking-widest text-[10px] text-blue-950"
                  >
                    <span className="text-blue-600">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dakkapel Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 block">
                MEER LICHT & RUIMTE
              </span>

              <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 leading-none mb-8 tracking-tighter uppercase">
                Dakkapel laten plaatsen <br />
                <span className="text-blue-600 italic font-light lowercase">in Zeeland</span>
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                Een prefab dakkapel creëert direct extra woonruimte en verhoogt het comfort van uw woning. 
                Wij leveren maatwerk dakkapellen met snelle montage en hoogwaardige materialen.
              </p>

              <div className="space-y-4">
                {[
                  'Binnen één dag geplaatst',
                  'Onderhoudsarme materialen',
                  'Strakke moderne afwerking',
                  'Volledig geïsoleerd',
                  'Diverse kleuren en stijlen'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-slate-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://i.imgur.com/Sz7tRBj.jpeg"
                alt="Prefab dakkapel"
                className="rounded-[3rem] shadow-2xl w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 block">REGIO SERVICE</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-blue-950 leading-none mb-6 tracking-tighter uppercase">
              Actief in heel <br />
              <span className="text-blue-600 italic font-light lowercase underline underline-offset-8 decoration-blue-600/10">Zeeland.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Prefab Select realiseert uitbouwen en dakkapellen in heel Zeeland voor zowel moderne als bestaande woningen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Middelburg',
              'Vlissingen',
              'Goes',
              'Terneuzen',
              'Zierikzee',
              'Hulst',
            ].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4">
                  {city}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Hoogwaardige prefab oplossingen voor woningen in {city} en omgeving. Wij verzorgen het volledige traject.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-sm border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <span className="text-blue-600 text-[10px] uppercase font-black tracking-[0.5em] mb-6 block">PROJECT HIGHLIGHT</span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-blue-950 mb-8 leading-none tracking-tighter uppercase">
                  100+ Prefab <br />
                  <span className="text-blue-600 italic font-light lowercase">bergingen Zeeland.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
                  Voor een grootschalig nieuwbouwproject in Zeeland hebben wij meer dan 100 prefab schuurtjes geproduceerd en geplaatst. Ontdek hoe wij grootschalige projecten ondersteunen met snelle prefab oplossingen.
                </p>
                <Link 
                  to="/regio/zeeland/nieuwbouwproject" 
                  className="inline-flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[11px] group"
                >
                  Bekijk dit project <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <img 
                  src="https://i.imgur.com/p3qz8V3.jpeg" 
                  alt="Nieuwbouwproject Zeeland" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent)]" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase">
                Vraag vrijblijvend <br />
                un <span className="text-blue-400 italic font-light lowercase decoration-blue-400/20 underline underline-offset-8">offerte aan.</span>
              </h2>

              <p className="text-xl text-blue-100/60 leading-relaxed mb-12 max-w-2xl mx-auto font-medium">
                Benieuwd naar de mogelijkheden voor een prefab uitbouw of dakkapel in Zeeland? 
                Neem vandaag nog contact op met Prefab Select.
              </p>

              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 group"
              >
                Gratis Offerte Aanvragen <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
