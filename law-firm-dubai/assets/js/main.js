/* =====================================================================
   Meridian Crowne — interaction layer
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Language ---------------------------------------------- */
  const { I18N, I18N_ORDER, applyLanguage } = window.MC_I18N;
  let saved = "en";
  try { saved = localStorage.getItem("mc-lang") || "en"; } catch (e) {}
  applyLanguage(saved);

  const lang = $(".lang");
  const langToggle = $(".lang-toggle");
  const langMenu = $(".lang-menu");
  if (langMenu) {
    langMenu.innerHTML = I18N_ORDER.map(
      (code) => `<button data-lang="${code}" aria-current="${code === saved}">
        <span>${I18N[code].label}</span><span class="native">${I18N[code].native}</span></button>`
    ).join("");
    $(".lang-current").textContent = I18N[saved].native;
  }
  langToggle?.addEventListener("click", (e) => { e.stopPropagation(); lang.classList.toggle("open"); });
  document.addEventListener("click", () => lang?.classList.remove("open"));
  langMenu?.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b) return;
    const code = b.dataset.lang;
    applyLanguage(code);
    $(".lang-current").textContent = I18N[code].native;
    $$("button", langMenu).forEach((x) => x.setAttribute("aria-current", x.dataset.lang === code));
    lang.classList.remove("open");
  });

  /* ---------- Nav scroll state -------------------------------------- */
  const nav = $(".nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    $(".sticky-cta")?.classList.toggle("show", window.scrollY > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ------------------------------------------- */
  const burger = $(".burger");
  burger?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));

  /* ---------- Hero intro -------------------------------------------- */
  window.addEventListener("load", () => $(".hero")?.classList.add("loaded"));
  setTimeout(() => $(".hero")?.classList.add("loaded"), 400);

  /* ---------- Reveal on scroll -------------------------------------- */
  const revObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => revObs.observe(el));

  /* ---------- Animated counters ------------------------------------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function runCounter(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1900;
    let start;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const val = target * easeOut(p);
      el.textContent = dec ? val.toFixed(dec) : Math.floor(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(dec) : target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const cObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); cObs.unobserve(e.target); } }),
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => cObs.observe(el));

  /* ---------- Practice card 3D tilt --------------------------------- */
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    $$(".pcard").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Testimonial slider ------------------------------------ */
  const track = $(".ttrack");
  if (track) {
    const slides = $$(".tslide", track);
    const dotsWrap = $(".tdots");
    let idx = 0, timer;
    dotsWrap.innerHTML = slides.map((_, i) => `<i data-i="${i}" class="${i === 0 ? "on" : ""}"></i>`).join("");
    const dots = $$("i", dotsWrap);
    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      const rtl = document.documentElement.dir === "rtl";
      track.style.transform = `translateX(${rtl ? "" : "-"}${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("on", i === idx));
    };
    $(".tprev")?.addEventListener("click", () => { go(idx - 1); restart(); });
    $(".tnext")?.addEventListener("click", () => { go(idx + 1); restart(); });
    dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.i); restart(); }));
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 6500); };
    restart();
    document.addEventListener("languagechange", () => go(idx));
  }

  /* ---------- Consultation form ------------------------------------- */
  const form = $("#consult-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    $(".form-success")?.classList.add("show");
  });

  /* ---------- Smooth anchor + close menu ---------------------------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = $(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }
    });
  });

  /* ---------- AI Legal Concierge ------------------------------------ */
  const aiLaunch = $(".ai-launch");
  const aiPanel = $(".ai-panel");
  const aiBody = $(".ai-body");
  const aiInput = $(".ai-input input");
  const dict = () => I18N[document.documentElement.lang] || I18N.en;

  const aiKnowledge = [
    { k: ["business", "setup", "company", "license", "تأسيس", "شركة", "entreprise", "société", "бизнес", "公司", "注册"],
      a: "Meridian Crowne structures mainland, free zone and offshore entities across the UAE — including DIFC and ADGM. We handle licensing, shareholder agreements, corporate governance and banking introductions end-to-end. Shall I arrange a consultation with our Corporate team?" },
    { k: ["golden visa", "residency", "visa", "إقامة", "ذهبية", "résidence", "виза", "签证"],
      a: "We advise on Golden Visa eligibility for investors, entrepreneurs, executives and exceptional talent — managing the full application and renewal process. Eligibility typically follows qualifying investment or professional criteria. Would you like a private eligibility assessment?" },
    { k: ["divorce", "family", "custody", "طلاق", "أسرة", "حضانة", "divorce", "famille", "развод", "семья", "离婚"],
      a: "Our Family practice handles divorce, custody and inheritance for UAE nationals and expatriates across personal status and civil family law. Every matter is managed with complete discretion. I can connect you confidentially with a senior family lawyer." },
    { k: ["criminal", "defense", "defence", "جنائي", "pénal", "уголов", "刑事"],
      a: "Meridian Crowne provides robust criminal defence and white-collar representation before all UAE courts, with 24/7 availability for urgent matters. May I prioritise your enquiry with our litigation partner?" },
    { k: ["arbitration", "dispute", "litigation", "تحكيم", "نزاع", "arbitrage", "litige", "арбитраж", "спор", "仲裁", "争议"],
      a: "We act in DIFC-LCIA, DIAC, ICC and ad-hoc arbitration, as well as cross-border litigation before the DIFC and ADGM Courts. Our partners have resolved disputes exceeding nine figures. Would you like to discuss your matter?" },
    { k: ["real estate", "property", "construction", "عقار", "immobilier", "недвижим", "房地产", "地产"],
      a: "Our Real Estate and Construction teams cover acquisitions, off-plan disputes, RERA matters, FIDIC contracts and development structuring across Dubai and the wider UAE. Shall I schedule a review of your matter?" },
    { k: ["fee", "cost", "price", "charge", "تكلفة", "رسوم", "honoraires", "стоимость", "费用", "价格"],
      a: "Fees are tailored to each engagement — fixed-fee, retainer or success-based arrangements are available. Your initial consultation is complimentary and entirely confidential. May I book it for you?" },
    { k: ["book", "consult", "appointment", "meeting", "حجز", "استشارة", "موعد", "rendez", "запис", "консультац", "预约", "咨询"],
      a: "With pleasure. Please share your name and the best contact number in the form below, or call our private line at +971 4 000 0000. A senior partner will confirm your consultation within one business day." },
    { k: ["lawyer", "speak", "human", "partner", "محام", "avocat", "юрист", "律师"],
      a: "I will connect you with the right partner. Tell me a little about your matter — corporate, family, real estate, criminal, arbitration or business setup — and I will route you to the appropriate senior lawyer." },
  ];

  function aiReply(text) {
    const q = text.toLowerCase();
    const hit = aiKnowledge.find((e) => e.k.some((kw) => q.includes(kw)));
    if (hit) return hit.a;
    return "Thank you. Meridian Crowne advises across corporate, commercial, real estate, family, criminal, banking & finance, arbitration, IP, business setup and Golden Visa services. Could you tell me a little more about your matter, or shall I arrange a confidential consultation with a senior partner?";
  }

  function pushMsg(text, who) {
    const m = document.createElement("div");
    m.className = `msg ${who}`;
    m.textContent = text;
    aiBody.appendChild(m);
    aiBody.scrollTop = aiBody.scrollHeight;
    return m;
  }
  function botType(text) {
    const t = pushMsg("", "bot");
    t.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    aiBody.scrollTop = aiBody.scrollHeight;
    setTimeout(() => { t.textContent = text; aiBody.scrollTop = aiBody.scrollHeight; }, 900 + Math.random() * 600);
  }
  let aiGreeted = false;
  function openAI() {
    aiPanel.classList.add("open");
    aiLaunch.style.display = "none";
    if (!aiGreeted) { aiGreeted = true; setTimeout(() => botType(dict()["ai.greet"]), 350); }
    setTimeout(() => aiInput?.focus(), 500);
  }
  function closeAI() { aiPanel.classList.remove("open"); aiLaunch.style.display = ""; }
  aiLaunch?.addEventListener("click", openAI);
  $(".ai-head .x")?.addEventListener("click", closeAI);
  function sendAI(text) {
    if (!text.trim()) return;
    pushMsg(text, "me");
    aiInput.value = "";
    botType(aiReply(text));
  }
  $(".ai-input")?.addEventListener("submit", (e) => { e.preventDefault(); sendAI(aiInput.value); });
  $$(".ai-chips button").forEach((b) => b.addEventListener("click", () => { openAIIfClosed(); sendAI(b.textContent); }));
  function openAIIfClosed() { if (!aiPanel.classList.contains("open")) openAI(); }

  /* ---------- Exit-intent popup ------------------------------------- */
  const exit = $(".exit-overlay");
  let exitShown = false;
  function showExit() {
    if (exitShown) return;
    try { if (sessionStorage.getItem("mc-exit")) return; } catch (e) {}
    exitShown = true;
    exit?.classList.add("open");
    try { sessionStorage.setItem("mc-exit", "1"); } catch (e) {}
  }
  document.addEventListener("mouseout", (e) => { if (e.clientY <= 0 && !e.relatedTarget) showExit(); });
  setTimeout(() => { /* mobile fallback after dwell */ if (window.innerWidth < 760) showExit(); }, 45000);
  $(".exit-card .x")?.addEventListener("click", () => exit.classList.remove("open"));
  exit?.addEventListener("click", (e) => { if (e.target === exit) exit.classList.remove("open"); });
  $(".exit-card .btn")?.addEventListener("click", () => {
    exit.classList.remove("open");
    $("#contact")?.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Year ------------------------------------------------- */
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
