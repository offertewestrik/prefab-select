/* =========================================================
   لبان الكايد — Productgegevens & illustraties (showcase)
   Categorieën: "dairy" (ألبان وأجبان) | "basics" (مواد أساسية)
   ========================================================= */

/* Gemeenschappelijk bord met schaduw; elke scène staat op een bord */
function akPlateWrap(inner, id) {
  return `<svg viewBox="0 0 150 150" class="plate" aria-hidden="true">
    <defs>
      <radialGradient id="pl-${id}" cx=".5" cy=".38" r=".75">
        <stop offset="0" stop-color="#fffdf6"/><stop offset=".72" stop-color="#f6ecd6"/><stop offset="1" stop-color="#e9dcbd"/>
      </radialGradient>
    </defs>
    <circle cx="75" cy="75" r="71" fill="url(#pl-${id})"/>
    <circle cx="75" cy="75" r="64" fill="none" stroke="rgba(201,162,39,.45)" stroke-width="1.6" stroke-dasharray="2 6" stroke-linecap="round"/>
    ${inner}
  </svg>`;
}

const AK_ART = {
  /* لبن — kan + glas karnemelk met munt */
  leban: `
    <ellipse cx="75" cy="116" rx="40" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M52 58h26c3 0 5 2 5 5l-3 44c0 4-3 7-7 7H57c-4 0-7-3-7-7l-3-44c0-3 2-5 5-5z" fill="#fffdf8" stroke="#cdb98a" stroke-width="2"/>
    <path d="M83 66c8-2 13 2 13 8s-5 11-12 10" fill="none" stroke="#cdb98a" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M50 70h30l-1 14H51z" fill="#f3ecd9"/>
    <ellipse cx="65" cy="58" rx="16" ry="4.5" fill="#fff" stroke="#cdb98a" stroke-width="2"/>
    <path d="M96 78l8-26c.6-2 3.4-2 4 0l8 26c2 7-2 16-10 16s-12-9-10-16z" fill="#fff" stroke="#cdb98a" stroke-width="2" transform="translate(-2 14)"/>
    <path d="M58 50c2-5 7-7 12-6M64 47c2-2 5-3 8-2" stroke="#3c8a43" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="60" cy="93" r="2" fill="#e9dcbd"/><circle cx="70" cy="100" r="1.6" fill="#e9dcbd"/>`,

  /* لبنة — schaal met swirl, olijfolie-poel, za'atar, olijf */
  labneh: `
    <ellipse cx="75" cy="112" rx="44" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M33 84a42 24 0 0 0 84 0z" fill="#25602b"/>
    <path d="M33 84a42 24 0 0 0 84 0" fill="none" stroke="#1d4d22" stroke-width="2"/>
    <ellipse cx="75" cy="84" rx="42" ry="15" fill="#fffdf8" stroke="#e3d6b4" stroke-width="2"/>
    <path d="M48 82c6-7 16-9 27-7 11 2 19 0 27 5-6 5-17 8-27 7-11-1-21-1-27-5z" fill="#f6efdd"/>
    <ellipse cx="75" cy="82" rx="13" ry="5.5" fill="#e3b93c"/>
    <ellipse cx="75" cy="81" rx="9" ry="3.6" fill="#f0cc58"/>
    <circle cx="60" cy="80" r="1.7" fill="#3c8a43"/><circle cx="89" cy="84" r="1.7" fill="#25602b"/>
    <circle cx="68" cy="87" r="1.4" fill="#7a1e12"/><circle cx="83" cy="78" r="1.4" fill="#3c8a43"/>
    <ellipse cx="95" cy="76" rx="5.5" ry="4" fill="#3a4a22"/>
    <path d="M95 72c2-4 6-6 10-5" stroke="#3c8a43" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,

  /* جبنة بيضاء — blok + plakken op plankje, munt */
  cheese: `
    <ellipse cx="75" cy="112" rx="46" ry="7" fill="rgba(39,49,31,.12)"/>
    <ellipse cx="75" cy="104" rx="46" ry="10" fill="#b98a4e"/>
    <ellipse cx="75" cy="101" rx="46" ry="10" fill="#d2a868"/>
    <path d="M44 62h44v32a5 5 0 0 1-5 5H49a5 5 0 0 1-5-5z" fill="#fffdf8" stroke="#e0d3b0" stroke-width="2"/>
    <path d="M44 62l10-10h44l-10 10z" fill="#f6efdd" stroke="#e0d3b0" stroke-width="2"/>
    <path d="M88 62l10-10v32l-10 10z" fill="#efe5c8" stroke="#e0d3b0" stroke-width="2"/>
    <path d="M93 90l16 4-3 8-16-4z" fill="#fffdf8" stroke="#e0d3b0" stroke-width="2"/>
    <circle cx="56" cy="74" r="2.6" fill="#efe5c8"/><circle cx="72" cy="70" r="2" fill="#efe5c8"/>
    <circle cx="64" cy="86" r="2.2" fill="#efe5c8"/><circle cx="80" cy="82" r="1.8" fill="#efe5c8"/>
    <path d="M38 92c-3-5 0-10 5-11 1 5-1 9-5 11z" fill="#3c8a43"/>
    <path d="M36 95c-5-1-7-6-5-10 4 2 6 6 5 10z" fill="#25602b"/>`,

  /* زبادي — keramieken potje met lepel en swirl */
  yoghurt: `
    <ellipse cx="75" cy="114" rx="38" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M48 64h54l-5 40c-1 6-5 10-11 10H64c-6 0-10-4-11-10z" fill="#fffdf8" stroke="#cdb98a" stroke-width="2"/>
    <path d="M50 78h50l-2 14H52z" fill="#f3ecd9"/>
    <ellipse cx="75" cy="64" rx="27" ry="7" fill="#f6efdd" stroke="#cdb98a" stroke-width="2"/>
    <path d="M56 62c7-4 16-5 24-2 6 2 12 2 15 1-4 4-12 6-20 5-8-1-15-2-19-4z" fill="#fff"/>
    <path d="M97 38c6 1 9 6 8 11l-13 18-6-4 11-25z" fill="#b98a4e"/>
    <ellipse cx="92" cy="60" rx="6" ry="4" transform="rotate(-32 92 60)" fill="#d2a868"/>
    <path d="M58 50c2-5 7-7 12-6" stroke="#3c8a43" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,

  /* حليب طازج — melkfles + vol glas */
  milk: `
    <ellipse cx="75" cy="116" rx="42" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M58 36h18v10l7 10v52a6 6 0 0 1-6 6H57a6 6 0 0 1-6-6V56l7-10z" fill="#fffdf8" stroke="#cdb98a" stroke-width="2"/>
    <rect x="57" y="30" width="20" height="8" rx="3" fill="#25602b"/>
    <path d="M51 72h32v36h-2a6 6 0 0 1-30 0z" fill="#f3ecd9" opacity=".9"/>
    <rect x="55" y="78" width="24" height="22" rx="3" fill="#fff"/>
    <path d="M59 84c4-3 9-3 12 0 3 2 6 2 8 1" stroke="#3c8a43" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <text x="67" y="97" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="10" font-weight="800" fill="#25602b">حليب</text>
    <path d="M88 70h16c2 0 3 1 3 3l-2 34c0 3-3 6-6 6h-6c-3 0-6-3-6-6l-2-34c0-2 1-3 3-3z" fill="#fff" stroke="#cdb98a" stroke-width="2"/>
    <path d="M87 78h18l-1 12H88z" fill="#fffdf8"/>`,

  /* زيتون — kom olijven + tak */
  olives: `
    <ellipse cx="75" cy="112" rx="44" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M37 80a38 26 0 0 0 76 0z" fill="#8a5a28"/>
    <path d="M37 80a38 26 0 0 0 76 0" fill="none" stroke="#6e4720" stroke-width="2"/>
    <ellipse cx="75" cy="80" rx="38" ry="13" fill="#f6efdd" stroke="#e0d3b0" stroke-width="2"/>
    <ellipse cx="58" cy="76" rx="9" ry="7.5" fill="#5a8a2a"/><ellipse cx="56" cy="74" rx="3" ry="2" fill="#86b54e" opacity=".8"/>
    <ellipse cx="75" cy="72" rx="9" ry="7.5" fill="#2f3a1f"/><ellipse cx="73" cy="70" rx="3" ry="2" fill="#5a6a3e" opacity=".8"/>
    <ellipse cx="92" cy="76" rx="8.5" ry="7" fill="#6c9a32"/><ellipse cx="90" cy="74" rx="2.6" ry="1.8" fill="#9cc465" opacity=".8"/>
    <ellipse cx="66" cy="82" rx="8" ry="6.5" fill="#3a4a22"/>
    <ellipse cx="84" cy="84" rx="8" ry="6.5" fill="#5a8a2a"/>
    <path d="M60 60c6-12 18-18 32-16" stroke="#25602b" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M70 50c0-5 4-9 9-9 0 5-4 9-9 9z" fill="#3c8a43"/>
    <path d="M84 47c1-5 6-8 11-7-1 5-6 8-11 7z" fill="#25602b"/>`,

  /* بيض — gevlochten mand met eieren */
  eggs: `
    <ellipse cx="75" cy="114" rx="44" ry="7" fill="rgba(39,49,31,.12)"/>
    <ellipse cx="63" cy="74" rx="13" ry="17" fill="#fdf3df" stroke="#e3cfa3" stroke-width="2"/>
    <ellipse cx="87" cy="74" rx="13" ry="17" fill="#e9c690" stroke="#d2a868" stroke-width="2"/>
    <ellipse cx="75" cy="68" rx="13" ry="17" fill="#fffdf8" stroke="#e3cfa3" stroke-width="2"/>
    <ellipse cx="71" cy="60" rx="3.5" ry="5" fill="#fff" opacity=".9"/>
    <path d="M36 82h78c-2 16-16 28-39 28S38 98 36 82z" fill="#b98a4e"/>
    <path d="M36 82h78" stroke="#8a5a28" stroke-width="3" stroke-linecap="round"/>
    <path d="M42 92c10 4 56 4 66 0M48 101c8 3 46 3 54 0" stroke="#8a5a28" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M44 87l8 18M58 90l4 19M75 91v19M92 90l-4 19M106 87l-8 18" stroke="#8a5a28" stroke-width="2" stroke-linecap="round" opacity=".7"/>`,

  /* رز — jute zak met rijst en schep */
  rice: `
    <ellipse cx="75" cy="116" rx="44" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M44 64c-4 26 2 46 31 46s35-20 31-46c-3-6-13-10-31-10s-28 4-31 10z" fill="#d8b888" stroke="#b98a4e" stroke-width="2"/>
    <path d="M44 64c8 5 18 7 31 7s23-2 31-7c-2-7-13-11-31-11s-29 4-31 11z" fill="#c49d63" stroke="#b98a4e" stroke-width="2"/>
    <path d="M52 60c6-8 16-12 23-6-8 2-16 4-23 6z" fill="#e6c89a"/>
    <ellipse cx="75" cy="62" rx="22" ry="7" fill="#fffdf8"/>
    <g fill="#fff" stroke="#e0d3b0" stroke-width=".8">
      <ellipse cx="64" cy="58" rx="2.2" ry="4" transform="rotate(-20 64 58)"/>
      <ellipse cx="73" cy="55" rx="2.2" ry="4"/>
      <ellipse cx="82" cy="58" rx="2.2" ry="4" transform="rotate(20 82 58)"/>
      <ellipse cx="69" cy="62" rx="2.2" ry="4" transform="rotate(12 69 62)"/>
      <ellipse cx="79" cy="63" rx="2.2" ry="4" transform="rotate(-14 79 63)"/>
    </g>
    <path d="M96 44c8-3 14 0 16 6l-18 12-5-6 7-12z" fill="#b98a4e"/>
    <ellipse cx="92" cy="60" rx="7" ry="5" transform="rotate(-30 92 60)" fill="#d2a868" stroke="#b98a4e" stroke-width="1.6"/>
    <text x="75" y="92" text-anchor="middle" font-family="Cairo,Tajawal,sans-serif" font-size="15" font-weight="800" fill="#6e4720">رز</text>`,

  /* سكر — glazen pot met klontjes en schepje */
  sugar: `
    <ellipse cx="75" cy="114" rx="38" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M52 56h46v44a10 10 0 0 1-10 10H62a10 10 0 0 1-10-10z" fill="#fdfbf2" stroke="#cdb98a" stroke-width="2"/>
    <rect x="49" y="46" width="52" height="12" rx="5" fill="#25602b"/>
    <rect x="55" y="74" width="40" height="30" rx="5" fill="#fff" opacity=".75"/>
    <g fill="#fffdf8" stroke="#e0d3b0" stroke-width="1.4">
      <rect x="58" y="80" width="11" height="11" rx="2" transform="rotate(-8 63 85)"/>
      <rect x="72" y="78" width="11" height="11" rx="2" transform="rotate(10 77 83)"/>
      <rect x="64" y="91" width="11" height="11" rx="2" transform="rotate(4 69 96)"/>
      <rect x="80" y="90" width="11" height="11" rx="2" transform="rotate(-10 85 95)"/>
    </g>
    <path d="M99 70c7-5 14-4 17 1l-14 14-6-5 3-10z" fill="#b98a4e" transform="translate(-6 14)"/>
    <text x="75" y="69" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="10" font-weight="800" fill="#8a7a4a">سكر</text>`,

  /* شاي — oosters theeglas (istikan) met stoom en munt */
  tea: `
    <ellipse cx="75" cy="114" rx="40" ry="7" fill="rgba(39,49,31,.12)"/>
    <ellipse cx="75" cy="106" rx="32" ry="8" fill="#d2a868"/>
    <ellipse cx="75" cy="103" rx="32" ry="8" fill="#e6c89a" stroke="#b98a4e" stroke-width="1.6"/>
    <path d="M56 54c0 10 5 14 5 22s-5 10-5 18c0 7 8 11 19 11s19-4 19-11c0-8-5-10-5-18s5-12 5-22z" fill="#fdf6ea" stroke="#cdb98a" stroke-width="2"/>
    <path d="M59 62c0 8 4 11 4 17s-4 9-4 15c0 5 7 8 16 8s16-3 16-8c0-6-4-9-4-15s4-9 4-17c-5 3-11 4-16 4s-11-1-16-4z" fill="#b54a1e"/>
    <path d="M59 62c5 3 11 4 16 4s11-1 16-4" fill="none" stroke="#8a3414" stroke-width="1.6"/>
    <ellipse cx="75" cy="64" rx="14" ry="3.6" fill="#d2691e"/>
    <path d="M56 54h38" stroke="#c9a227" stroke-width="3" stroke-linecap="round"/>
    <path d="M68 44c-3-5 3-7 0-12M82 44c-3-5 3-7 0-12" stroke="#cdb98a" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M88 70c4-1 7 1 8 4-3 1-7-1-8-4z" fill="#3c8a43"/>`,

  /* زيت — fles olijfolie met tak en schoteltje */
  oil: `
    <ellipse cx="75" cy="116" rx="40" ry="7" fill="rgba(39,49,31,.12)"/>
    <path d="M68 30h14v14c8 6 12 14 12 26v34a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V70c0-12 4-20 12-26z" fill="#dfe8c2" stroke="#9aa86a" stroke-width="2"/>
    <path d="M58 76v28a6 6 0 0 0 6 6h22a6 6 0 0 0 6-6V76c0-2-34-2-34 0z" fill="#e3b93c" opacity=".92"/>
    <path d="M62 80c4-4 10-4 13 0 3 3 8 3 11 1" stroke="#c9941f" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>
    <rect x="66" y="22" width="18" height="10" rx="3" fill="#8a5a28"/>
    <rect x="62" y="60" width="26" height="26" rx="4" fill="#fffdf8" opacity=".85"/>
    <path d="M67 70c3-5 8-7 13-5" stroke="#3c8a43" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="71" cy="74" rx="2.6" ry="3.4" fill="#3c8a43"/>
    <ellipse cx="79" cy="73" rx="2.6" ry="3.4" fill="#25602b"/>
    <text x="75" y="97" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="10" font-weight="800" fill="#7a5a10">زيت زيتون</text>
    <path d="M96 96c6 0 10 3 10 7 0 3-4 5-10 5" fill="none" stroke="#cdb98a" stroke-width="2"/>`
};

const AK_PRODUCTS = [
  { key: "leban",   name: "لبن",        cat: "dairy",  tag: "يُحضّر فجر كل يوم",     desc: "لبن بلدي طبيعي بطعم منعش وأصيل، كما عرفته موائد بلاد الشام." },
  { key: "labneh",  name: "لبنة",       cat: "dairy",  tag: "كريميّة بزيت الزيتون",  desc: "لبنة كثيفة تُقدّم مع زيت الزيتون والزعتر — فطورٌ لا يكتمل من دونها." },
  { key: "cheese",  name: "جبنة بيضاء", cat: "dairy",  tag: "مملّحة بعناية",         desc: "جبنة بيضاء طرية تُصنع على الطريقة التقليدية بنكهة متوازنة." },
  { key: "yoghurt", name: "زبادي",      cat: "dairy",  tag: "كامل الدسم",            desc: "زبادي طبيعي ناعم وخفيف، صحي ولذيذ في كل وقت." },
  { key: "milk",    name: "حليب طازج",  cat: "dairy",  tag: "من المزرعة يومياً",      desc: "حليب بقري نقي يصلنا كل صباح ويُعرض طازجاً في اليوم نفسه." },
  { key: "olives",  name: "زيتون",      cat: "dairy",  tag: "أخضر وأسود مُتبّل",      desc: "زيتون بلدي مكبوس بعناية، يرافق اللبنة والجبنة على مائدتك." },
  { key: "eggs",    name: "بيض",        cat: "basics", tag: "طازج يومياً",           desc: "بيض طازج عالي الجودة، أساسٌ لكل فطور." },
  { key: "rice",    name: "رز",         cat: "basics", tag: "حبّة فاخرة",            desc: "رز ممتاز طويل الحبّة لأطباقك اليومية." },
  { key: "sugar",   name: "سكر",        cat: "basics", tag: "نقي",                   desc: "سكر أبيض نقي بأفضل جودة لمنزلك." },
  { key: "tea",     name: "شاي",        cat: "basics", tag: "بنكهة دافئة",           desc: "شاي أصيل يُشرب على الطريقة الشرقية، يرافق جلساتكم." },
  { key: "oil",     name: "زيت",        cat: "basics", tag: "للمطبخ والمائدة",       desc: "زيوت عالية الجودة للطبخ وللسلطات وللفطور." }
];

/* Showcase-kaarten renderen (geen bestelknoppen — presentatie)
   options: { filter: "all"|"dairy"|"basics", keys: [..] } */
function akRenderProducts(containerId, options = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { filter = "all", keys = null } = options;
  let list = AK_PRODUCTS.filter(p => filter === "all" || p.cat === filter);
  if (keys) list = keys.map(k => AK_PRODUCTS.find(p => p.key === k)).filter(Boolean);

  el.innerHTML = list.map((p, i) => `
    <article class="show-card reveal" style="--d:${(i % 3) * 90}ms">
      ${akPlateWrap(AK_ART[p.key] || "", p.key + "-" + containerId)}
      <h3 class="show-name">${p.name}</h3>
      <span class="show-tag">${p.tag}</span>
      <p class="show-desc">${p.desc}</p>
    </article>`).join("");

  if (window.akReveal) window.akReveal();
}

/* Losse borden (heroshelf) */
function akRenderPlates(containerId, keys) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = keys.map(k => akPlateWrap(AK_ART[k] || "", k + "-hero")).join("");
}
