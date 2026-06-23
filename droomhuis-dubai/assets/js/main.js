/* =====================================================================
   Droomhuis in Dubai — homepage interactions
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const D = window.DH || { PROPERTIES: [], LOCATIONS: [], REVIEWS: [] };

  /* ---- year ---------------------------------------------------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- nav scroll + mobile menu ------------------------------------- */
  const nav = $("#nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const burger = $("#burger"), navLinks = $("#navLinks");
  if (burger && navLinks) {
    const setMenu = (open) => {
      navLinks.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    $$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  /* ---- reveal on scroll --------------------------------------------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  const arrowIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---- locations (gigantische bento-kaarten) ------------------------ */
  const locGrid = $("#locGrid");
  if (locGrid) {
    locGrid.innerHTML = D.LOCATIONS.map((l) => `
      <a class="loc-card" href="${l.href}">
        ${l.vid
          ? `<video class="bgvideo" autoplay muted loop playsinline preload="none" poster="${l.img}" aria-label="Beelden van ${l.name}, Dubai"><source src="${l.vid}" type="video/mp4"></video>`
          : `<img loading="lazy" src="${l.img}" alt="Vastgoed in ${l.name}, Dubai — ${l.desc}">`}
        <span class="loc-go">${arrowIco}</span>
        <div class="loc-ov">
          <span class="loc-k">Wijk</span>
          <h3>${l.name}</h3>
          <p>${l.desc}</p>
          <div class="loc-stats">
            <div><b>${l.price}</b><span>Vanaf</span></div>
            <div><b>${l.roi}</b><span>ROI</span></div>
            <div><b>${l.types}</b><span>Type</span></div>
          </div>
        </div>
      </a>`).join("");
  }

  /* ---- interactieve Dubai-map --------------------------------------- */
  const pins = $("#dmapPins"), dmapInfo = $("#dmapInfo");
  if (pins && dmapInfo && D.LOCATIONS) {
    const setArea = (l, i) => {
      $("#dmName").textContent = l.name;
      $("#dmDesc").textContent = l.desc;
      $("#dmPrice").textContent = l.price;
      $("#dmRoi").textContent = l.roi;
      $("#dmTypes").textContent = l.types;
      $("#dmLink").setAttribute("href", l.href);
      let im = dmapInfo.querySelector("img");
      if (!im) { im = document.createElement("img"); dmapInfo.prepend(im); }
      im.src = l.img; im.alt = l.name;
      $$(".hot", pins).forEach((g) => g.classList.toggle("active", +g.dataset.i === i));
    };
    pins.innerHTML = D.LOCATIONS.map((l, i) => `
      <g class="hot" data-i="${i}" transform="translate(${l.x}, ${l.y})">
        <circle class="pulse" r="1.6"/><circle class="ring" r="3.4"/><circle class="dot" r="1.6"/>
        <text x="4.4" y="1.2">${l.name}</text>
      </g>`).join("");
    $$(".hot", pins).forEach((g) => {
      const i = +g.dataset.i;
      g.addEventListener("mouseenter", () => setArea(D.LOCATIONS[i], i));
      g.addEventListener("click", () => setArea(D.LOCATIONS[i], i));
    });
    setArea(D.LOCATIONS[0], 0);
  }

  /* ---- properties ---------------------------------------------------- */
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const bedIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 18v2M21 18v2M3 13h18M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>';
  const bathIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12V6a2 2 0 0 1 4 0M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2ZM6 19l-1 2M18 19l1 2"/></svg>';
  const areaIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>';
  const propGrid = $("#propsGrid");
  if (propGrid) {
    propGrid.innerHTML = D.PROPERTIES.map((p) => `
      <a class="cine-card" href="aanbod/${p.slug}.html">
        <div class="cine-media"><img loading="lazy" src="${p.img}" alt="${p.name} — luxe woning te koop in ${p.loc}, Dubai"></div>
        <span class="cine-tag">${p.tag}</span>
        <div class="cine-roi"><b>${p.roi}</b><span>ROI</span></div>
        <div class="cine-ov">
          <div class="prop-loc">${pin}${p.loc}</div>
          <h3>${p.name}</h3>
          <div class="cine-price">${p.price}<small>Vanaf · richtprijs</small></div>
          <div class="cine-specs">
            <div>${bedIco}${p.beds}</div>
            <div>${bathIco}${p.baths}</div>
            <div>${areaIco}${p.area}</div>
          </div>
          <span class="cine-cta">Bekijk woning ${arrowIco}</span>
        </div>
      </a>`).join("");
  }

  /* ---- reels (klik om af te spelen — performant) -------------------- */
  const reelPlayIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const reelPauseIco = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  const reelCard = (r) =>
    `<div class="reel-card"><video class="reel-vid" loop playsinline preload="none" poster="assets/video/reels/${r}.jpg"><source src="assets/video/reels/${r}.mp4" type="video/mp4"></video><button class="reel-play" type="button" aria-label="Reel afspelen">${reelPlayIco}</button></div>`;
  const reelsGridEl = $("#reelsGrid");
  if (reelsGridEl && D.REELS) reelsGridEl.innerHTML = D.REELS.map(reelCard).join("");
  const reelsAboutEl = $("#reelsAbout");
  if (reelsAboutEl && D.REELS) reelsAboutEl.innerHTML = D.REELS.slice(0, 6).map(reelCard).join("");

  const allReels = $$(".reel-card");
  if (allReels.length) {
    const setState = (card, playing) => {
      card.classList.toggle("playing", playing);
      const btn = card.querySelector(".reel-play");
      if (btn) { btn.innerHTML = playing ? reelPauseIco : reelPlayIco; btn.setAttribute("aria-label", playing ? "Reel pauzeren" : "Reel afspelen"); }
    };
    const toggle = (card) => {
      const v = card.querySelector("video");
      if (v.paused) {
        allReels.forEach((o) => { if (o !== card) { const ov = o.querySelector("video"); ov.pause(); } });
        v.muted = false;
        v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
      } else { v.pause(); }
    };
    allReels.forEach((card) => {
      const v = card.querySelector("video");
      const btn = card.querySelector(".reel-play");
      btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(card); });
      v.addEventListener("click", () => toggle(card));
      v.addEventListener("play", () => setState(card, true));
      v.addEventListener("pause", () => setState(card, false));
    });
    // pauzeer reels die uit beeld scrollen
    const rio = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) e.target.querySelector("video").pause();
    }), { threshold: 0.35 });
    allReels.forEach((c) => rio.observe(c));
  }

  /* ---- ROI calculator + dashboard ----------------------------------- */
  const fmt = (n) => "AED " + Math.round(n).toLocaleString("nl-NL");
  const setRangeFill = (input) => {
    const min = +input.min, max = +input.max, v = +input.value;
    input.style.setProperty("--p", ((v - min) / (max - min)) * 100 + "%");
  };
  const cPrice = $("#c-price"), cRent = $("#c-rent"), cDown = $("#c-down");
  const gFill = $("#gFill");
  const GC = 2 * Math.PI * 52;            // omtrek van de gauge-ring
  const calc = () => {
    const price = +cPrice.value, rent = +cRent.value, downPct = +cDown.value;
    $("#lbl-price").textContent = fmt(price);
    $("#lbl-rent").textContent = fmt(rent);
    $("#lbl-down").textContent = downPct + "%";

    const costs = rent * 0.22;                 // service charges, beheer, onderhoud
    const netIncome = rent - costs;
    const grossYield = (rent / price) * 100;
    const equity = price * (downPct / 100);
    const loan = price - equity;
    // annuïteit, 4,5% / 25 jaar
    const r = 0.045 / 12, n = 25 * 12;
    const annualDebt = loan > 0 ? ((loan * r) / (1 - Math.pow(1 + r, -n))) * 12 : 0;
    const cashflowYr = netIncome - annualDebt;
    const payback = netIncome > 0 ? price / netIncome : 0;

    $("#r-yield").textContent = grossYield.toFixed(1).replace(".", ",");
    $("#r-rent").textContent = fmt(rent);
    $("#r-cash").textContent = fmt(cashflowYr / 12);
    $("#r-payback").textContent = payback > 0 ? payback.toFixed(1).replace(".", ",") + " jaar" : "—";
    if (gFill) { const p = Math.max(0, Math.min(grossYield / 12, 1)); gFill.style.strokeDashoffset = GC * (1 - p); }
    [cPrice, cRent, cDown].forEach(setRangeFill);
  };
  if (cPrice) { [cPrice, cRent, cDown].forEach((el) => el.addEventListener("input", calc)); calc(); }

  /* ---- reviews marquee ----------------------------------------------- */
  const track = $("#revTrack");
  if (track) {
    const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    const card = (r) => `
      <article class="review">
        <div class="r-stars" role="img" aria-label="5 van 5 sterren">★★★★★</div>
        <p>${r.text}</p>
        <div class="who">
          <span class="av">${initials(r.name)}</span>
          <div><b>${r.name}</b><small>${r.role}</small></div>
        </div>
      </article>`;
    track.innerHTML = D.REVIEWS.map(card).join("") + D.REVIEWS.map(card).join("");
  }

  /* ---- instagram feed ------------------------------------------------ */
  const instaGrid = $("#instaGrid");
  if (instaGrid) {
    const igUrl = "https://www.instagram.com/enjoyrealestate.dubai/";
    const igIco = '<svg class="ig-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    const imgs = [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    ];
    instaGrid.innerHTML = imgs.map((src) => `
      <a class="insta-tile" href="${igUrl}" target="_blank" rel="noopener" aria-label="Bekijk op Instagram">
        <img loading="lazy" src="${src}?q=80&w=500&auto=format&fit=crop" alt="Dubai vastgoed post op Instagram">
        ${igIco}
      </a>`).join("");
  }

  /* ---- forms (demo) -------------------------------------------------- */
  const handleForm = (formId, successId) => {
    const form = $(formId); if (!form) return;
    const success = $(successId);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$("input[required]", form).forEach((inp) => {
        const valid = inp.checkValidity() && inp.value.trim() !== "";
        inp.style.borderColor = valid ? "" : "#c0564f";
        if (!valid) ok = false;
      });
      if (!ok) return;
      success.classList.add("show");
      const btn = form.querySelector("button[type=submit]");
      if (btn) btn.textContent = "Verzonden ✓";
      setTimeout(() => { form.reset(); $$("input,textarea", form).forEach((i) => (i.style.borderColor = "")); }, 400);
    });
  };
  handleForm("#gids", "#gidsSuccess");
  handleForm("#contactForm", "#contactSuccess");

  /* ---- background videos: autoplay only while in view (performance) -- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vids = $$("video.bgvideo");
  if (vids.length && reduceMotion) {
    vids.forEach((v) => { v.removeAttribute("autoplay"); v.pause(); });
  } else if (vids.length) {
    vids.forEach((v) => { v.muted = true; v.setAttribute("muted", ""); });
    const vio = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.play().catch(() => {}); }
        else { e.target.pause(); }
      }),
      { threshold: 0.2 }
    );
    vids.forEach((v) => vio.observe(v));
  }

  /* ---- scroll progress bar ------------------------------------------ */
  const prog = $("#scrollProgress");
  if (prog) {
    let ticking = false;
    const upd = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      ticking = false;
    };
    upd();
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(upd); ticking = true; }
    }, { passive: true });
  }

  /* ---- nav scroll-spy ------------------------------------------------ */
  const navA = $$("#navLinks a");
  const secs = ["woningen", "locaties", "diensten", "over", "contact", "rendement"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  if (secs.length) {
    const sp = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const href = "#" + e.target.id;
          navA.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));
        }
      }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    secs.forEach((s) => sp.observe(s));
  }

  observeReveals();
})();
