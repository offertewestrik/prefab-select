/* =========================================================
   لبان الكايد — Productgegevens & SVG illustraties
   Categorieën: "dairy" (ألبان وأجبان) | "basics" (مواد أساسية)
   ========================================================= */

const AK_SVG = {
  leban: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgA" cx=".5" cy=".4" r=".7"><stop stop-color="#f4faf0"/><stop offset="1" stop-color="#e6f1dc"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgA)"/><path d="M44 38h32l-4 44a6 6 0 0 1-6 5H54a6 6 0 0 1-6-5z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><path d="M46 50h28l-1 10H47z" fill="#f3f7ef"/><ellipse cx="60" cy="38" rx="16" ry="5" fill="#fff" stroke="#c9a24a" stroke-width="2"/><path d="M56 60a4 5 0 0 0 4 5" stroke="#dfe7d2" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  labneh: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgB" cx=".5" cy=".4" r=".7"><stop stop-color="#fefcf4"/><stop offset="1" stop-color="#f3ecd7"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgB)"/><path d="M34 60a26 14 0 0 0 52 0z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><ellipse cx="60" cy="60" rx="26" ry="9" fill="#fff" stroke="#c9a24a" stroke-width="2"/><ellipse cx="60" cy="59" rx="16" ry="5" fill="#fbf3d8"/><path d="M58 50c-2 4 2 7 4 4 1-2-1-5-4-4z" fill="#2c8a1f"/><circle cx="66" cy="58" r="2.4" fill="#1f7a1f"/><circle cx="52" cy="60" r="2" fill="#6cc23f"/></svg>`,
  cheese: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgC" cx=".5" cy=".4" r=".7"><stop stop-color="#fefdf6"/><stop offset="1" stop-color="#f1ead4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgC)"/><path d="M38 50h44v22a4 4 0 0 1-4 4H42a4 4 0 0 1-4-4z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><path d="M38 50l8-8h44l-8 8z" fill="#fbf6e6" stroke="#c9a24a" stroke-width="2"/><path d="M82 50l8-8v22l-8 8z" fill="#f4ead0" stroke="#c9a24a" stroke-width="2"/><circle cx="50" cy="62" r="3" fill="#efe3c2"/><circle cx="66" cy="58" r="2.4" fill="#efe3c2"/><circle cx="73" cy="68" r="2" fill="#efe3c2"/></svg>`,
  yoghurt: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgD" cx=".5" cy=".4" r=".7"><stop stop-color="#f5f9ff"/><stop offset="1" stop-color="#e7eefb"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgD)"/><path d="M44 46h32l-3 34a5 5 0 0 1-5 4H52a5 5 0 0 1-5-4z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><rect x="42" y="40" width="36" height="8" rx="3" fill="#bf2114"/><ellipse cx="60" cy="40" rx="18" ry="4" fill="#e23b2a"/><text x="60" y="68" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="11" font-weight="800" fill="#2c8a1f">زبادي</text></svg>`,
  milk: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgE" cx=".5" cy=".4" r=".7"><stop stop-color="#f4faf0"/><stop offset="1" stop-color="#e6f1dc"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgE)"/><path d="M54 30h12v8l6 8v36a4 4 0 0 1-4 4H52a4 4 0 0 1-4-4V46l6-8z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><rect x="53" y="26" width="14" height="6" rx="2" fill="#2c8a1f"/><rect x="50" y="58" width="20" height="20" rx="2" fill="#eef6e8"/><text x="60" y="72" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="9" font-weight="800" fill="#2c8a1f">حليب</text></svg>`,
  olives: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgF" cx=".5" cy=".4" r=".7"><stop stop-color="#f4faf0"/><stop offset="1" stop-color="#e6f1dc"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgF)"/><path d="M36 58a24 14 0 0 0 48 0z" fill="#7a5a2a"/><ellipse cx="60" cy="58" rx="24" ry="8" fill="#fbf3d8" stroke="#c9a24a" stroke-width="2"/><circle cx="50" cy="56" r="6" fill="#5a8a2a"/><circle cx="62" cy="54" r="6" fill="#2f3a1f"/><circle cx="72" cy="57" r="5.5" fill="#6c9a32"/><circle cx="56" cy="60" r="5" fill="#3a4a22"/><path d="M48 48c2-5 8-7 12-5" stroke="#2c8a1f" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M58 44c3-2 7-1 8 2" stroke="#2c8a1f" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  eggs: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgG" cx=".5" cy=".4" r=".7"><stop stop-color="#fefdf6"/><stop offset="1" stop-color="#f1ead4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgG)"/><ellipse cx="48" cy="58" rx="13" ry="17" fill="#fff" stroke="#c9a24a" stroke-width="2"/><ellipse cx="72" cy="58" rx="13" ry="17" fill="#fdf6e6" stroke="#c9a24a" stroke-width="2"/><ellipse cx="60" cy="66" rx="14" ry="18" fill="#fff" stroke="#c9a24a" stroke-width="2"/><ellipse cx="56" cy="58" rx="3" ry="4" fill="#fbf3d8"/></svg>`,
  rice: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgH" cx=".5" cy=".4" r=".7"><stop stop-color="#fefdf6"/><stop offset="1" stop-color="#f1ead4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgH)"/><path d="M42 50h36l-4 34a4 4 0 0 1-4 3H50a4 4 0 0 1-4-3z" fill="#f3ead2" stroke="#c9a24a" stroke-width="2"/><path d="M44 50c4-10 28-10 32 0z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><g fill="#fff"><ellipse cx="54" cy="44" rx="2" ry="4"/><ellipse cx="60" cy="42" rx="2" ry="4"/><ellipse cx="66" cy="45" rx="2" ry="4"/></g><text x="60" y="74" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="11" font-weight="800" fill="#2c8a1f">رز</text></svg>`,
  sugar: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgI" cx=".5" cy=".4" r=".7"><stop stop-color="#fefdf6"/><stop offset="1" stop-color="#f1ead4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgI)"/><path d="M44 48h32v34a4 4 0 0 1-4 4H48a4 4 0 0 1-4-4z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><path d="M44 48l6-8h20l6 8z" fill="#fbf6e6" stroke="#c9a24a" stroke-width="2"/><g fill="#eef0f3"><rect x="50" y="58" width="8" height="8" rx="1"/><rect x="62" y="58" width="8" height="8" rx="1"/><rect x="56" y="69" width="8" height="8" rx="1"/></g><text x="60" y="46" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="9" font-weight="800" fill="#bf2114">سكر</text></svg>`,
  tea: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgJ" cx=".5" cy=".4" r=".7"><stop stop-color="#fdf6ef"/><stop offset="1" stop-color="#f3e6d4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgJ)"/><path d="M48 44h22l-3 38a5 5 0 0 1-5 4H56a5 5 0 0 1-5-4z" fill="#fff" stroke="#c9a24a" stroke-width="2"/><path d="M50 56h18l-2 24a3 3 0 0 1-3 3H55a3 3 0 0 1-3-3z" fill="#a8431a"/><path d="M70 52c8 0 8 12 0 13" fill="none" stroke="#c9a24a" stroke-width="2"/><path d="M58 38c2-3-1-6 0-9M64 38c2-3-1-6 0-9" stroke="#caa" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  oil: `<svg viewBox="0 0 120 120" class="p-ill"><defs><radialGradient id="bgK" cx=".5" cy=".4" r=".7"><stop stop-color="#f9f8ec"/><stop offset="1" stop-color="#eef0d4"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#bgK)"/><path d="M55 28h10v8l5 6v40a4 4 0 0 1-4 4H54a4 4 0 0 1-4-4V42l5-6z" fill="#eadf7a" stroke="#c9a24a" stroke-width="2" opacity=".92"/><rect x="54" y="24" width="12" height="6" rx="2" fill="#2c8a1f"/><rect x="51" y="56" width="18" height="22" rx="2" fill="#fff" opacity=".55"/><path d="M58 60c2-4 6-4 8 0" stroke="#2c8a1f" stroke-width="2" fill="none"/><text x="60" y="74" text-anchor="middle" font-family="Tajawal,sans-serif" font-size="9" font-weight="800" fill="#2c8a1f">زيت</text></svg>`
};

const AK_PRODUCTS = [
  { key: "leban",   name: "لبن",        cat: "dairy",  tag: "طازج كل يوم",      desc: "لبن طبيعي طازج يُحضّر يومياً بطعمٍ أصيل ومنعش." },
  { key: "labneh",  name: "لبنة",       cat: "dairy",  tag: "كريميّة غنية",     desc: "لبنة كثيفة وكريمية، مثالية للفطور مع زيت الزيتون." },
  { key: "cheese",  name: "جبنة بيضاء", cat: "dairy",  tag: "ملوّحة بعناية",    desc: "جبنة بيضاء طرية بنكهة متوازنة، تُصنع محلياً." },
  { key: "yoghurt", name: "زبادي",      cat: "dairy",  tag: "غنيّة بالبروبيوتيك", desc: "زبادي طبيعي كامل الدسم، خفيف وصحي." },
  { key: "milk",    name: "حليب طازج",  cat: "dairy",  tag: "من المزرعة",        desc: "حليب بقري طازج نقي، يصل إليك يومياً." },
  { key: "olives",  name: "زيتون",      cat: "dairy",  tag: "أخضر وأسود",        desc: "زيتون مُتبّل بنكهة غنية، يكمّل مائدتك." },
  { key: "eggs",    name: "بيض",        cat: "basics", tag: "طازج يومياً",       desc: "بيض طازج عالي الجودة لكل وجبات اليوم." },
  { key: "rice",    name: "رز",         cat: "basics", tag: "حبّة ممتازة",       desc: "رز فاخر طويل الحبّة لأطباقك اليومية." },
  { key: "sugar",   name: "سكر",        cat: "basics", tag: "نقيّ",              desc: "سكر أبيض نقي بأفضل جودة لمنزلك." },
  { key: "tea",     name: "شاي",        cat: "basics", tag: "نكهة دافئة",        desc: "شاي بنكهة غنية يرافق لحظاتك اليومية." },
  { key: "oil",     name: "زيت",        cat: "basics", tag: "للطبخ والقلي",      desc: "زيت نباتي عالي الجودة لمطبخك." }
];

/* Render product cards into a container.
   options: { filter: "all"|"dairy"|"basics", limit: number } */
function akRenderProducts(containerId, options = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { filter = "all", limit = 0 } = options;
  let list = AK_PRODUCTS.filter(p => filter === "all" || p.cat === filter);
  if (limit > 0) list = list.slice(0, limit);

  el.innerHTML = list.map((p, i) => `
    <article class="product-card reveal" style="--d:${(i % 4) * 70}ms">
      <span class="product-badge">${p.cat === "dairy" ? "ألبان وأجبان" : "مواد أساسية"}</span>
      <div class="product-media">${AK_SVG[p.key] || ""}</div>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-tag">${p.tag}</p>
      <p class="product-desc">${p.desc}</p>
      <a class="product-order" href="https://wa.me/31791804639?text=${encodeURIComponent("مرحباً، أريد طلب: " + p.name)}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.683-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207z"/></svg>
        اطلب
      </a>
    </article>`).join("");

  if (window.akReveal) window.akReveal();
}
