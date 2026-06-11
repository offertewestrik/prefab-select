import React from 'react';
import Seo from '../components/Seo';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check,
  CheckCircle2, 
  Clock, 
  Factory, 
  ShieldCheck, 
  Zap, 
  Hammer, 
  Construction, 
  Layout, 
  Box,
  Clover,
  Building2,
  Mail,
  ChevronRight,
  Search,
  MapPin,
  PenTool,
  Timer,
  Star,
  MessageCircle,
  TrendingUp,
  Phone,
  Waves,
  Heart,
  Layers,
  PlusSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KellyCTA } from '../KellyCTA';

const moduleTypes = [
  {
    title: 'Prefab Uitbouwen',
    description: 'Luxe prefab uitbouwen, in eigen beheer geproduceerd en binnen één dag geplaatst.',
    image: 'https://i.imgur.com/6VuTqto.jpeg',
    link: '/diensten/prefab-uitbouw'
  },
  {
    title: 'Prefab Aanbouwen',
    description: 'Moderne aanbouwmodules voor extra leefruimte, van thuiskantoor tot slaapkamer.',
    image: 'https://i.imgur.com/fmQecXk.jpeg',
    link: '/diensten/prefab-aanbouw'
  },
  {
    title: 'Modulaire Woningen',
    description: 'Complete modulaire woningen met architecturale kwaliteit en maximale duurzaamheid.',
    image: 'https://i.imgur.com/v4jk0SK.jpeg',
    link: '/diensten/prefab-aanbouw'
  },
  {
    title: 'Vakantiewoningen',
    description: 'Hoogwaardige recreatielodges ontworpen voor comfort en maximale natuurbeleving.',
    image: 'https://i.imgur.com/ZsBPHxQ.jpeg',
    link: '/diensten/vakantiewoningen'
  },
  {
    title: 'Prefab Chalets',
    description: 'Eigentijdse prefab chalets met premium afwerking en een tijdloos design.',
    image: 'https://i.imgur.com/Tqh8vyd.jpeg',
    link: '/diensten/prefab-chalets'
  },
  {
    title: 'Mantelzorgwoningen',
    description: 'Zelfstandige mantelzorgwoningen met oog voor comfort, veiligheid en kwaliteit.',
    image: 'https://i.imgur.com/HCZ6IgH.jpeg',
    link: '/diensten/mantelzorgwoning'
  },
  {
    title: 'Poolhouses',
    description: 'Luxe prefab poolhouses: de perfecte aanvulling op uw zwembad voor maximaal ontspanning en comfort.',
    image: 'https://i.imgur.com/gGBOzjd.jpeg',
    link: '/dienst/poolhouses'
  }
];

const processSteps = [
  {
    title: 'Vrijblijvend Advies',
    description: 'We bespreken uw wensen en bekijken de mogelijkheden op locatie of in onze showroom.',
    image: 'https://i.imgur.com/nn4AexH.jpeg',
    icon: <MessageCircle size={24} />,
    number: '01'
  },
  {
    title: 'Ontwerp op Maat',
    description: 'Onze architecten vertalen uw visie naar een technisch hoogwaardig prefab ontwerp.',
    image: 'https://i.imgur.com/SpVtuPf.jpeg',
    icon: <PenTool size={24} />,
    number: '02'
  },
  {
    title: 'Eigen Productie',
    description: 'In onze eigen fabriek bouwen wij uw module onder ideale omstandigheden met oog voor detail.',
    image: 'https://i.imgur.com/Mcivs2I.jpeg',
    icon: <Factory size={24} />,
    number: '03'
  },
  {
    title: 'Snelle Plaatsing',
    description: 'De complete module wordt op locatie geplaatst met minimale overlast en een korte doorlooptijd.',
    image: 'https://i.imgur.com/PTfKgEE.jpeg',
    icon: <Zap size={24} />,
    number: '04'
  }
];

const benefits = [
  {
    title: "Kwaliteit & Vakmanschap",
    description: "Wij produceren prefab uitbouwen volledig in eigen beheer voor maximale controle over kwaliteit, planning en afwerking.",
    icon: <Factory className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Razendsnel geplaatst",
    description: "Binnen slechts enkele dagen geplaatst op locatie. Minder overlast, minder bouwafval en sneller genieten.",
    icon: <Timer className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Volledig maatwerk",
    description: "Van moderne prefab uitbouwen tot luxe aanbouwen met lichtstraat: alles wordt afgestemd op jouw stijl en wensen.",
    icon: <PenTool className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Waardevermeerdering",
    description: "Niet alleen extra leefruimte en meer comfort, maar ook direct een hogere marktwaarde van jouw woning.",
    icon: <TrendingUp className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Duurzaam & Energiezuinig",
    description: "Hoogwaardige isolatie, circulaire materialen en een aanzienlijk lagere CO₂-uitstoot dan bij traditionele bouw.",
    icon: <Clover className="w-10 h-10 text-blue-600" />
  },
  {
    title: "Transparante prijzen",
    description: "Weten waar je aan toe bent met heldere offertes. Geen verborgen kosten of onverwachte meerprijzen achteraf.",
    icon: <ShieldCheck className="w-10 h-10 text-blue-600" />
  }
];

const constructionModules = [
  {
    title: 'Het Staalskelet',
    description: 'De basis van elke module is een hyper-nauwkeurig stalen frame.',
    details: 'Ons S355 structureel staal wordt laser-gesneden met een tolerantie van minder dan 1mm.',
    icon: <Box size={32} />,
    image: 'https://i.imgur.com/v4jk0SK.jpeg'
  },
  {
    title: 'Wandsysteem',
    description: 'Thermische excellentie door meerlaagse isolatie.',
    details: 'Rc-waarde van 6.0 of hoger, waardoor uw woning extreem energiezuinig is.',
    icon: <Layout size={32} />,
    image: 'https://i.imgur.com/ZsBPHxQ.jpeg'
  }
];

export default function Diensten() {
  return (
    <div className="bg-white text-blue-950 font-sans selection:bg-blue-600 selection:text-white">
      <Seo
        title="Onze Prefab Diensten & Modules | Prefab Select"
        description="Bekijk alle prefab oplossingen van Prefab Select: uitbouw, aanbouw, mantelzorgwoning, chalet, poolhouse en vakantiewoning. Hoogwaardig en snel geplaatst."
        canonical="/diensten"
        image="https://i.imgur.com/2uyJ2rP.jpeg"
      />
      {/* Premium Architectural Hero - Cinematic Improvements */}
      <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center pt-32 md:pt-24 pb-12 md:pb-20 overflow-hidden bg-blue-950">
        {/* Background Video with refined overlays */}
        <div className="absolute inset-0 z-0">
          <video 
            src="https://imgur.com/X3n5XIc.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.02]"
          />
          {/* Main Dark Overlay */}
          <div className="absolute inset-0 bg-blue-950/50 backdrop-blur-[2px]" />
          {/* Gradient for depth and contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/40 via-transparent to-blue-950/80" />
          <div className="absolute inset-0 bg-linear-to-r from-blue-950/80 via-blue-950/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-8 md:mt-12">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-400 mb-4 md:mb-6 block leading-none"
              >
                PREMIUM PREFAB SOLUTIONS
              </motion.span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter uppercase">
                Hoogwaardige <br />
                prefab bouw, <br />
                <span className="text-blue-400 italic font-light lowercase">volledig verzorgd.</span>
              </h1>
              
              <p className="text-sm md:text-lg text-blue-50/80 mb-8 md:mb-10 max-w-lg font-medium leading-relaxed border-l border-blue-600/50 pl-6">
                Prefab uitbouwen, mantelzorgwoningen, chalets en modulaire woningen met hoogwaardige afwerking en snelle realisatie.
              </p>
              
              <div className="flex flex-wrap gap-5 items-center">
                <a href="#onze-oplossingen" className="group relative bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-[0_15px_30px_rgba(29,78,216,0.25)] hover:bg-blue-500 hover:-translate-y-1 transition-all duration-500">
                  <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-2">
                    Bekijk Oplossingen <ArrowRight size={12} />
                  </span>
                </a>
                <Link to="/offerte" className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white/10 transition-all duration-500">
                  Vraag Offerte
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] -mr-24 -mt-24 transition-colors duration-1000 group-hover:bg-blue-600/15" />
                
                <div className="mb-10">
                  <h3 className="text-lg md:text-xl font-display font-black text-white leading-[1.1] uppercase tracking-tighter mb-4 italic max-w-xs">
                    “Prefab uitbouwen, mantelzorgwoningen <span className="text-blue-400">volledig op maat</span>.”
                  </h3>
                  <div className="w-16 h-1 bg-blue-600 rounded-full" />
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Prefab uitbouwen', icon: <PlusSquare size={16} />, link: '/diensten/prefab-uitbouw' },
                    { label: 'Mantelzorgwoningen', icon: <Heart size={16} />, link: '/diensten/mantelzorgwoning' },
                    { label: 'Prefab Chalets', icon: <Building2 size={16} />, link: '/diensten/prefab-chalets' },
                    { label: 'Luxe Poolhouses', icon: <Waves size={16} />, link: '/diensten/poolhouse' },
                    { label: 'Modulaire woningen', icon: <Layers size={16} />, link: '/diensten/prefab-aanbouw' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + (idx * 0.1) }}
                    >
                      <Link 
                        to={item.link}
                        className="flex items-center gap-5 group/item cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500">
                          {item.icon}
                        </div>
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/30 group-hover/item:text-white transition-colors duration-500">
                          {item.label}
                        </span>
                        <ArrowRight size={14} className="ml-auto text-white/5 group-hover/item:text-blue-400 group-hover/item:translate-x-1 transition-all duration-500" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-5">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400/50 leading-tight">
                    Meer dan 100+ projecten voltooid
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Services Sections */}
      <section id="onze-oplossingen" className="bg-white">
        {moduleTypes.map((module, i) => (
          <section 
            id={module.link.split('/').pop()} 
            key={i} 
            className={`py-40 ${i % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={i % 2 === 1 ? 'lg:order-2' : ''}
                >
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-10 h-px bg-blue-600/30" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 leading-none">MAATWERK OPLOSSING</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-blue-950 leading-[0.85] tracking-tighter uppercase mb-8">
                    {module.title}
                  </h2>
                  <p className="text-lg text-slate-500 font-normal leading-[1.8] tracking-wide mb-10">
                    {module.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {[
                      'In 1 dag geplaatst',
                      'Hoogwaardige isolatie',
                      'Luxe afwerking',
                      '100% Maatwerk'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Check size={10} strokeWidth={4} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-6 mt-4">
                    <Link to="/offerte" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-500 hover:-translate-y-1 transition-all duration-500">
                      Offerte aanvragen
                    </Link>
                    <Link to="/contact" className="border border-slate-200 text-blue-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:-translate-y-1 transition-all duration-500">
                      Advies gesprek
                    </Link>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.06)] group ${i % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <img 
                    src={module.image} 
                    alt={module.title} 
                    className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                    referrerPolicy="no-referrer" loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-950/20 to-transparent group-hover:opacity-0 transition-opacity duration-1000" />
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </section>

      {/* Onze Werkwijze - Grid Layout matched from Homepage */}
      <section id="werkwijze" className="py-40 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-blue-50/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-100/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-24 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-8 block">HET PROCES</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-blue-950 leading-[0.85] tracking-tighter uppercase mb-8">
                In 4 stappen <br />
                <span className="text-blue-600 italic font-light lowercase">naar uw ideale module.</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="bg-white rounded-[3rem] border border-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_60px_100px_rgba(29,78,216,0.08)] hover:-translate-y-3 transition-all duration-700 h-full flex flex-col group/card overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[3s]"
                      referrerPolicy="no-referrer" loading="lazy"
                    />
                    <div className="absolute inset-0 bg-blue-950/10 group-hover:bg-transparent transition-all duration-1000" />
                    <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-xl rounded-2xl w-12 h-12 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-widest border border-white/20 shadow-2xl">
                      {step.number}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4 group-hover:text-blue-600 transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-[14px] leading-[1.8] font-normal tracking-wide">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - More Compact */}
      <section className="py-40 bg-white border-y border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 sticky top-40">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-10 block leading-none">VOORDELEN</span>
              <h2 className="text-4xl md:text-6xl font-display font-black text-blue-950 tracking-[-0.03em] uppercase mb-8 leading-[0.85]">
                Bekijk onze <br />
                <span className="text-blue-600 italic font-light lowercase">mogelijkheden.</span>
              </h2>
              <p className="text-lg text-slate-500 font-normal leading-[1.8] tracking-wide max-w-sm">
                Van luxe prefab uitbouwen en mantelzorgwoningen tot moderne chalets en modulaire woningen — wij realiseren hoogwaardige prefab oplossingen die volledig aansluiten op jouw wensen, woning en manier van leven.
              </p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-12 bg-white rounded-[3rem] border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_50px_100px_rgba(29,78,216,0.1)] hover:-translate-y-2 transition-all duration-700 group">
                  <div className="mb-10 w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    {benefit.icon}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-950 mb-6">{benefit.title}</h3>
                  <p className="text-slate-400 text-[14px] leading-[1.8] font-normal tracking-wide">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modular Circular Section - matched from Homepage */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="space-y-12"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600 mb-8 block leading-none">DUURZAAMHEID</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-blue-950 tracking-[-0.03em] uppercase mb-4 leading-[0.85]">
                  Modulair & <br />
                  <span className="text-blue-600 italic font-light lowercase">Circulair Bouwen.</span>
                </h2>
              </div>
              
              <p className="text-lg text-slate-500 leading-[1.8] font-normal tracking-wide max-w-xl">
                Wij geloven in de toekomst van modulair en circulair bouwen. Onze prefab systemen worden slim opgebouwd uit duurzame modules die efficiënt geproduceerd én flexibel toepasbaar zijn.
              </p>

              <div className="grid grid-cols-2 gap-8 max-w-lg">
                {[
                  { label: 'Duurzaam', icon: <Clover size={18} /> },
                  { label: 'Snelle bouwtijd', icon: <Timer size={18} /> },
                  { label: 'Minder afval', icon: <Clover size={18} /> },
                  { label: 'Energiezuinig', icon: <Zap size={18} /> }
                ].map((usp, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] group hover:shadow-[0_30px_60px_rgba(29,78,216,0.06)] hover:-translate-y-1 transition-all duration-500">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      {usp.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-950/60">{usp.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative group"
            >
              <div className="absolute -inset-6 border border-blue-600/5 rounded-[4rem] transition-all duration-[2s] group-hover:scale-[1.03]" />
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
                <img 
                  src="https://i.imgur.com/2uyJ2rP.jpeg" 
                  alt="Modulair Bouwen Prefab Select" 
                  className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                  referrerPolicy="no-referrer" loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/40 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-1000" />
              </div>
              
              {/* Stats Overlay for Image */}
              <div className="absolute -bottom-12 -right-12 bg-blue-600 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl hidden md:block z-20 text-left hover:-translate-y-2 transition-transform duration-700">
                <p className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mb-2">100%</p>
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-100 italic">Duurzaam Maatwerk</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { number: '100+', label: 'Tevreden Klanten', sub: 'Landelijke realisatie' },
              { number: '1-2', label: 'Dagen Plaatsing', sub: 'Waterdicht op locatie' },
              { number: 'Rc 6.0', label: 'Isolatiewaarde', sub: 'Maximale energiebesparing' }
            ].map((stat, i) => (
              <div key={i} className="text-center group border-r border-slate-100 last:border-0 pr-16 last:pr-0">
                <p className="text-5xl lg:text-6xl font-display font-black text-blue-950 uppercase tracking-tighter mb-4 leading-none group-hover:text-blue-600 transition-colors duration-500">
                  {stat.number}
                </p>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/40 mb-2">{stat.label}</h4>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action - Compact & Strong */}
      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <div className="inline-flex items-center gap-4 bg-blue-50/50 px-6 py-3 rounded-full mb-10 border border-blue-100/50 shadow-sm">
             <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Nu Beschikbaar Voor 2026</span>
           </div>
           
           <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.85] text-blue-950">
             Klaar voor meer <br />
             <span className="text-blue-600 italic font-light lowercase decoration-blue-200 underline underline-offset-[12px]">leefruimte?</span>
           </h2>
           
           <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
             Ontvang binnen 24 uur een vrijblijvende prijsindicatie op maat voor uw nieuwe prefab module.
           </p>

           <div className="flex flex-wrap items-center justify-center gap-6">
             <Link to="/offerte" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-500 hover:-translate-y-1 transition-all">
               Offerte Aanvragen
             </Link>
             <Link to="/contact" className="border border-slate-200 text-blue-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
               Contact Opnemen
             </Link>
           </div>
        </div>
      </section>
      <KellyCTA />
    </div>
  );
}
