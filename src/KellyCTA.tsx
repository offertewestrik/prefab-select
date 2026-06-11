import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function KellyCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-blue-950 p-12 md:p-16 rounded-[4rem] relative overflow-hidden group border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/5 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 mb-6 block leading-none">PERSOONLIJK CONTACT</span>
                <h3 className="text-3xl md:text-5xl font-display font-black text-white leading-[0.95] tracking-tighter uppercase mb-6">
                  Neem direct contact <br />
                  <span className="text-blue-400 italic font-light lowercase">met onze specialisten.</span>
                </h3>
                <p className="text-blue-100/40 text-lg leading-relaxed max-w-xl font-normal tracking-wide">
                  Heeft u vragen over onze projecten of wilt u weten wat de mogelijkheden zijn voor uw eigen prefab module? Ons team staat voor u klaar om u te begeleiden.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="tel:31850607775" 
                  className="px-10 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 group/btn"
                >
                  <Phone size={16} /> Bel direct
                </a>
                <a 
                  href="https://wa.me/31850607775" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-6 bg-green-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-green-500 hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 group/btn"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <Link 
                  to="/offerte" 
                  className="px-10 py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-500 hover:-translate-y-2 transition-all duration-300"
                >
                  Vraag offerte aan
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/10 blur-[100px] rounded-full" />
              <div className="relative aspect-square max-w-md mx-auto rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.3)] group/kelly">
                <img 
                  src="https://i.imgur.com/cXPWGDM.jpeg" 
                  alt="Kelly - Prefab Select Specialist" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover/kelly:grayscale-0 transition-all duration-[2.5s] group-hover/kelly:scale-110"
                  referrerPolicy="no-referrer" loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-linear-to-t from-blue-950 via-blue-950/40 to-transparent">
                  <p className="text-white font-display font-black text-2xl uppercase tracking-tighter leading-none">Kelly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
