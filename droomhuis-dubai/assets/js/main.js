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

  /* ---- locations ----------------------------------------------------- */
  const locGrid = $("#locGrid");
  if (locGrid) {
    locGrid.innerHTML = D.LOCATIONS.map((l) => `
      <a class="loc-card" href="${l.href}">
        <div class="loc-img"><img loading="lazy" width="800" height="600" src="${l.img}" alt="Vastgoed te koop in ${l.name}, Dubai — ${l.desc}"></div>
        <div class="loc-cap">
          <h3>${l.name}</h3>
          <p>${l.desc}</p>
          <span class="loc-go"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </div>
      </a>`).join("");
  }

  /* ---- properties ---------------------------------------------------- */
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const bedIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 18v2M21 18v2M3 13h18M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>';
  const bathIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12V6a2 2 0 0 1 4 0M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2ZM6 19l-1 2M18 19l1 2"/></svg>';
  const areaIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>';
  const propGrid = $("#propsGrid");
  if (propGrid) {
    propGrid.innerHTML = D.PROPERTIES.map((p) => `
      <article class="prop">
        <div class="prop-img">
          <img loading="lazy" width="1000" height="750" src="${p.img}" alt="${p.name} — luxe woning te koop in ${p.loc}, Dubai">
          <span class="prop-tag">${p.tag}</span>
          <div class="prop-imgcap">
            <h3>${p.name}</h3>
            <div class="prop-loc">${pin}${p.loc}</div>
          </div>
        </div>
        <div class="prop-info">
          <div class="prop-specs">
            <div>${bedIco}${p.beds}</div>
            <div>${bathIco}${p.baths}</div>
            <div>${areaIco}${p.area}</div>
          </div>
          <div class="prop-figs">
            <div class="prop-price">${p.price}<small>Vanaf</small></div>
            <div class="prop-roi"><b>${p.roi}</b><span>ROI</span></div>
          </div>
          <a class="prop-more" href="aanbod/${p.slug}.html">Bekijk woning
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        </div>
      </article>`).join("");
  }

  /* ---- reels (zelf-gehost, autoplay carousels) ---------------------- */
  const reelCard = (r, i) =>
    `<div class="reel-card"><video class="bgvideo reel-vid" loop muted autoplay playsinline preload="${i < 3 ? "metadata" : "none"}" poster="assets/video/reels/${r}.jpg"><source src="assets/video/reels/${r}.mp4" type="video/mp4"></video><button class="reel-mute" type="button" aria-label="Geluid aan of uit"></button></div>`;
  const reelsGridEl = $("#reelsGrid");
  if (reelsGridEl && D.REELS) reelsGridEl.innerHTML = D.REELS.map(reelCard).join("");
  const reelsAboutEl = $("#reelsAbout");
  if (reelsAboutEl && D.REELS) reelsAboutEl.innerHTML = D.REELS.slice(0, 6).map(reelCard).join("");

  /* ---- ROI calculator + dashboard ----------------------------------- */
  const fmt = (n) => "AED " + Math.round(n).toLocaleString("nl-NL");
  const setRangeFill = (input) => {
    const min = +input.min, max = +input.max, v = +input.value;
    input.style.setProperty("--p", ((v - min) / (max - min)) * 100 + "%");
  };
  const cPrice = $("#c-price"), cRent = $("#c-rent"), cDown = $("#c-down");
  const chart = $("#calcChart");
  if (chart) {
    // decorative 12-month bar chart that grows toward year-end
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];
    const bw = 360 / 12;
    chart.innerHTML = months.map((m, i) => {
      const h = 26 + Math.round((i / 11) * 64 + (i % 2 ? 4 : 0));
      const x = i * bw + 4;
      return `<rect x="${x}" y="${100 - h}" width="${bw - 8}" height="${h}" rx="2" fill="${i >= 9 ? "#c9a76a" : "rgba(201,167,106,0.45)"}"></rect>`;
    }).join("");
  }
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

    $("#r-yield").textContent = grossYield.toFixed(2).replace(".", ",");
    $("#r-rent").textContent = fmt(rent);
    $("#r-cash").textContent = fmt(cashflowYr / 12);
    $("#r-payback").textContent = payback > 0 ? payback.toFixed(1).replace(".", ",") + " jaar" : "—";
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

  /* ---- reels: tap to toggle sound ----------------------------------- */
  const mutedIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m23 9-6 6M17 9l6 6"/></svg>';
  const soundIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>';
  $$("video.reel-vid").forEach((v) => {
    const btn = v.parentElement.querySelector(".reel-mute");
    const sync = () => { if (btn) btn.innerHTML = v.muted ? mutedIco : soundIco; };
    const toggle = () => {
      // unmute this one, mute the others
      if (v.muted) $$("video.reel-vid").forEach((o) => { if (o !== v) { o.muted = true; } });
      v.muted = !v.muted;
      if (!v.muted) v.play().catch(() => {});
      $$("video.reel-vid").forEach((o) => {
        const b = o.parentElement.querySelector(".reel-mute");
        if (b) b.innerHTML = o.muted ? mutedIco : soundIco;
      });
    };
    v.addEventListener("click", toggle);
    if (btn) btn.addEventListener("click", (e) => { e.stopPropagation(); toggle(); });
    sync();
  });

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
