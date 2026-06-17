/* NextGrowth — gedeelde renderer voor dienstpagina's (NL/EN/AR)
   Verwacht een globale PAGE (per pagina gedefinieerd) met .slug, .icon en nl/en/ar content. */
(function(){
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

const ICON={
web:'<path d="M3 9h18M9 21V9M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"/>',
shop:'<path d="M6 6h15l-1.5 9h-12L5 3H2M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z"/>',
ai:'<rect x="5" y="7" width="14" height="12" rx="2"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>',
cfg:'<path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zM12 11l8-4.5M12 11v9M12 11L4 6.5"/>',
dash:'<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/><rect x="3" y="14" width="8" height="7" rx="1.5"/>'
};
const LOGO='<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NextGrowth"><defs><linearGradient id="sgn" x1="14" y1="14" x2="106" y2="106" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFF3C4"/><stop offset="38%" stop-color="#D4AF37"/><stop offset="68%" stop-color="#B8860B"/><stop offset="100%" stop-color="#FFE9A3"/></linearGradient><radialGradient id="sgt" cx="38%" cy="30%" r="80%"><stop offset="0%" stop-color="#16161C"/><stop offset="60%" stop-color="#0C0C11"/><stop offset="100%" stop-color="#070709"/></radialGradient></defs><rect width="120" height="120" rx="28" fill="#0B0B0F"/><rect width="120" height="120" rx="28" fill="url(#sgt)"/><g transform="translate(-6,-2)" stroke="url(#sgn)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M34 84 L34 42 L66 84 L66 42" stroke-width="8"/><path d="M104 50 A22 22 0 1 0 104 76 L104 63 L88 63" stroke-width="7"/></g><g transform="translate(-6,-2)" fill="url(#sgn)"><circle cx="34" cy="42" r="3"/><circle cx="66" cy="42" r="3"/><circle cx="88" cy="63" r="2.6"/></g></svg>';

/* services voor breadcrumb + "andere diensten" */
const SERVICES=[
 {slug:'websites',icon:'web',nl:'Websites',en:'Websites',ar:'المواقع الإلكترونية'},
 {slug:'webshops',icon:'shop',nl:'Webshops',en:'Webshops',ar:'المتاجر الإلكترونية'},
 {slug:'ai-automatisering',icon:'ai',nl:'AI-automatisering',en:'AI automation',ar:'أتمتة الذكاء الاصطناعي'},
 {slug:'configurators',icon:'cfg',nl:'3D-configurators',en:'3D configurators',ar:'مُهيّئات ثلاثية الأبعاد'},
 {slug:'dashboards',icon:'dash',nl:'Dashboards',en:'Dashboards',ar:'لوحات التحكم'}
];

const UI={
 nl:{home:'Home',diensten:'Diensten',werk:'Werk',branches:'Branches',contact:'Contact',cta:'Plan een gesprek',
  cta1:'Plan een strategiegesprek →',cta2:'Bekijk ons werk',getT:'Wat je krijgt',stepsT:'Hoe we het bouwen',
  related:'Andere diensten',faqT:'Veelgestelde vragen',backHome:'← Terug naar home',
  ctaTitle:'Klaar om dit te bouwen voor jouw bedrijf?',ctaSub:'Plan een gratis strategiegesprek van 30 minuten. We brengen in kaart wat jij nodig hebt en laten precies zien wat het kost.',
  foot_c1:'Diensten',foot_c2:'Studio',foot_c3:'Aan de slag',foot_quote:'Offerte aanvragen',
  foot_tag:'Digitale groeisystemen voor ambitieuze bedrijven. Wij ontwerpen, bouwen en verbinden de systemen die aandacht omzetten in omzet.',
  foot_copy:'© 2026 NextGrowth — Nederland · Dubai · Jordanië',foot_built:'Gebouwd als één verbonden systeem.'},
 en:{home:'Home',diensten:'Services',werk:'Work',branches:'Industries',contact:'Contact',cta:'Book a call',
  cta1:'Book a strategy call →',cta2:'See our work',getT:'What you get',stepsT:'How we build it',
  related:'Other services',faqT:'Frequently asked questions',backHome:'← Back to home',
  ctaTitle:'Ready to build this for your business?',ctaSub:'Book a free 30-minute strategy call. We map out what you need and show exactly what it takes.',
  foot_c1:'Services',foot_c2:'Studio',foot_c3:'Get started',foot_quote:'Request a quote',
  foot_tag:'Digital growth systems for ambitious businesses. We design, build and connect the systems that turn attention into revenue.',
  foot_copy:'© 2026 NextGrowth — Netherlands · Dubai · Jordan',foot_built:'Built as one connected system.'},
 ar:{home:'الرئيسية',diensten:'الخدمات',werk:'أعمالنا',branches:'القطاعات',contact:'تواصل',cta:'احجز مكالمة',
  cta1:'احجز جلسة استراتيجية ←',cta2:'شاهد أعمالنا',getT:'ما الذي تحصل عليه',stepsT:'كيف نبنيه',
  related:'خدمات أخرى',faqT:'الأسئلة الشائعة',backHome:'← العودة إلى الرئيسية',
  ctaTitle:'جاهزٌ لبناء هذا لشركتك؟',ctaSub:'احجز جلسة استراتيجية مجانية مدّتها 30 دقيقة. نرسم ما تحتاجه ونوضّح بدقّة ما يتطلّبه.',
  foot_c1:'الخدمات',foot_c2:'الاستوديو',foot_c3:'ابدأ الآن',foot_quote:'اطلب عرض سعر',
  foot_tag:'أنظمة نموٍّ رقمية للشركات الطموحة. نصمّم ونبني ونربط الأنظمة التي تُحوّل الانتباه إلى إيرادات.',
  foot_copy:'© 2026 NextGrowth — هولندا · دبي · الأردن',foot_built:'مبنيٌّ كنظامٍ واحدٍ متكامل.'}
};

let lang='nl';

function navHTML(u){
 const links=['websites','ai-automatisering','configurators','dashboards'];
 return `<div class="wrap row">
  <a href="../index.html" class="brand"><span class="mark">${LOGO}</span><span>NEXT</span><span class="gold">GROWTH</span></a>
  <div class="navlinks">
   <span class="navdrop"><a href="../index.html#services">${u.diensten}</a><span class="dropmenu">${SERVICES.map(s=>`<a href="${s.slug}.html">${s[lang]}</a>`).join('')}<a class="all" href="../index.html#services">${u.diensten} →</a></span></span>
   <a href="../index.html#work">${u.werk}</a>
   <a href="../index.html#industries">${u.branches}</a>
   <a href="../index.html#faq">FAQ</a>
  </div>
  <div class="spacer"></div>
  <div class="langsw" id="langsw"><button data-lang="nl">NL</button><button data-lang="en">EN</button><button data-lang="ar">عربى</button></div>
  <a href="../index.html#contact" class="btn btn-nav">${u.cta}</a>
 </div>`;
}

function footHTML(u){
 return `<div class="wrap">
  <div class="foot-top">
   <div><a href="../index.html" class="brand"><span class="mark">${LOGO}</span><span style="color:var(--ink)">NEXT</span><span class="gold">GROWTH</span></a><p>${u.foot_tag}</p></div>
   <div><h5>${u.foot_c1}</h5>${SERVICES.map(s=>`<a href="${s.slug}.html">${s[lang]}</a>`).join('')}</div>
   <div><h5>${u.foot_c2}</h5><a href="../index.html#work">${u.werk}</a><a href="../index.html#gallery">${lang==='nl'?'In actie':(lang==='en'?'In action':'قيد العمل')}</a><a href="../index.html#faq">FAQ</a></div>
   <div><h5>${u.foot_c3}</h5><a href="../index.html#contact">${u.cta}</a><a href="../index.html#contact">${u.foot_quote}</a></div>
  </div>
  <div class="foot-bot"><span>${u.foot_copy}</span><span>${u.foot_built}</span></div>
 </div>`;
}

function mainHTML(u,p){
 const cur=SERVICES.find(s=>s.slug===PAGE.slug);
 const related=SERVICES.filter(s=>s.slug!==PAGE.slug);
 return `
 <section class="subhero">
  <div class="wrap">
   <div class="crumb reveal"><a href="../index.html">${u.home}</a><span class="sep">/</span><a href="../index.html#services">${u.diensten}</a><span class="sep">/</span><span style="color:#FFE9A3">${cur[lang]}</span></div>
   <div class="svc-ico-lg reveal d1" style="margin-top:22px"><svg viewBox="0 0 24 24">${ICON[PAGE.icon]}</svg></div>
   <span class="eyebrow on-dark reveal d1"><span class="dot"></span><span>${cur[lang]}</span></span>
   <h1 class="reveal d1">${p.h1}</h1>
   <p class="lead reveal d2">${p.sub}</p>
   <div class="hero-cta reveal d3"><a href="../index.html#contact" class="btn btn-primary">${u.cta1}</a><a href="../index.html#work" class="btn btn-darkghost">${u.cta2}</a></div>
  </div>
 </section>

 <section class="section">
  <div class="wrap">
   <div class="section-head reveal"><h2 class="h2">${p.introT}</h2><p class="lead">${p.introP}</p></div>
  </div>
 </section>

 <section class="section section--alt">
  <div class="wrap">
   <div class="section-head reveal"><h2 class="h2">${u.getT}</h2></div>
   <div class="svc-grid">${p.get.map(g=>`<div class="svc reveal"><div class="ic"><svg viewBox="0 0 24 24">${ICON[PAGE.icon]}</svg></div><h3>${g.t}</h3><p>${g.d}</p></div>`).join('')}</div>
  </div>
 </section>

 <section class="section">
  <div class="wrap">
   <div class="section-head reveal"><h2 class="h2">${u.stepsT}</h2></div>
   <div class="steps">${p.steps.map((s,i)=>`<div class="step reveal"><div class="no">${i+1}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}</div>
  </div>
 </section>

 <section class="section section--alt">
  <div class="wrap">
   <div class="section-head reveal"><h2 class="h2">${u.related}</h2></div>
   <div class="related">${related.map(s=>`<a href="${s.slug}.html"><span class="ri"><svg viewBox="0 0 24 24">${ICON[s.icon]}</svg></span>${s[lang]}</a>`).join('')}</div>
  </div>
 </section>

 <section class="section section--dark">
  <div class="wrap">
   <div class="section-head reveal"><span class="eyebrow on-dark"><span class="dot"></span><span>${u.faqT}</span></span><h2 class="h2" style="margin-top:16px">${p.faqT||u.faqT}</h2></div>
   <div class="faq-list reveal d1" id="faq-list">${p.faqs.map(f=>`<div class="faq-item"><button class="faq-q" aria-expanded="false">${f.q}<span class="ic" aria-hidden="true">+</span></button><div class="faq-a"><p>${f.a}</p></div></div>`).join('')}</div>
  </div>
 </section>

 <section class="section section--dark cta">
  <div class="wrap">
   <h2 class="h2 reveal">${p.ctaT||u.ctaTitle}</h2>
   <p class="lead reveal d1">${p.ctaP||u.ctaSub}</p>
   <div class="cta-row reveal d2"><a href="../index.html#contact" class="btn btn-primary">${u.cta1}</a><a href="../index.html" class="btn btn-darkghost">${u.backHome}</a></div>
  </div>
 </section>`;
}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.14});
function observeReveals(){$$('.reveal:not(.in)').forEach(e=>io.observe(e));}
function bindFAQ(){$$('#faq-list .faq-q').forEach(b=>b.addEventListener('click',()=>{const it=b.parentElement;const open=it.classList.toggle('open');b.setAttribute('aria-expanded',open);const a=it.querySelector('.faq-a');a.style.maxHeight=open?a.scrollHeight+'px':'0';}));}

function apply(l){
 lang=l;const u=UI[l];const p=PAGE[l];const rtl=(l==='ar');
 document.documentElement.lang=l;document.documentElement.dir=rtl?'rtl':'ltr';
 $('#nav').innerHTML=navHTML(u);
 $('#app').innerHTML=mainHTML(u,p);
 $('#foot').innerHTML=footHTML(u);
 $$('#langsw button').forEach(b=>{b.classList.toggle('on',b.dataset.lang===l);b.addEventListener('click',()=>apply(b.dataset.lang));});
 bindFAQ();observeReveals();
 const cur=SERVICES.find(s=>s.slug===PAGE.slug);
 document.title=p.title||(cur[l]+' — NextGrowth');
}

/* nav solid on scroll */
function navScroll(){const nav=$('#nav');const f=()=>nav.classList.toggle('solid',scrollY>40);f();addEventListener('scroll',f,{passive:true});}

document.addEventListener('DOMContentLoaded',()=>{navScroll();apply('nl');});
})();
