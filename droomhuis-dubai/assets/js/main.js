/* =====================================================================
   Droomhuis in Dubai — interactions
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const D = window.DH || { PROPERTIES: [], AREAS: [], REVIEWS: [] };

  /* ---- year ---------------------------------------------------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- nav scroll state + mobile menu -------------------------------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  const navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    })
  );

  /* ---- reveal on scroll ---------------------------------------------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  /* ---- count-up stats ------------------------------------------------ */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400; const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * ease);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { countUp(e.target); statIO.unobserve(e.target); }
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => statIO.observe(el));

  /* ---- properties ---------------------------------------------------- */
  const grid = $("#propsGrid");
  const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const renderProps = (filter) => {
    const items = D.PROPERTIES.filter((p) => filter === "all" || p.cat === filter);
    grid.innerHTML = items.map((p) => `
      <article class="prop${p.feat ? " feat" : ""}" data-cat="${p.cat}">
        <div class="prop-img"><img loading="lazy" src="${p.img}" alt="${p.name} — ${p.loc}"></div>
        <span class="prop-tag">${p.tag}</span>
        <div class="prop-roi glass"><b>${p.roi}</b><span>ROI p/j</span></div>
        <div class="prop-body">
          <div class="prop-loc">${pin}${p.loc}</div>
          <h3>${p.name}</h3>
          <div class="prop-price">${p.price}</div>
          <div class="prop-meta">
            <div><b>${p.beds}</b><small>Slaapk.</small></div>
            <div><b>${p.baths}</b><small>Badk.</small></div>
            <div><b>${p.area}</b><small>Opp.</small></div>
          </div>
        </div>
      </article>`).join("");
    observeReveals();
    $$(".prop", grid).forEach((el, i) => { el.classList.add("reveal"); el.dataset.d = (i % 3) + 1; io.observe(el); });
  };
  renderProps("all");
  $$("#filters .filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$("#filters .filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProps(btn.dataset.f);
    })
  );

  /* ---- interactive Dubai map ----------------------------------------- */
  const pinsSvg = $("#mapPins");
  const setArea = (a) => {
    $("#areaTag").textContent = a.tag;
    $("#areaName").textContent = a.name;
    $("#areaDesc").textContent = a.desc;
    $("#areaPrice").textContent = a.price;
    $("#areaRoi").textContent = a.roi;
    $$(".hot", pinsSvg).forEach((g) => g.classList.toggle("active", g.dataset.id === a.id));
  };
  pinsSvg.innerHTML = D.AREAS.map((a) => `
    <g class="hot" data-id="${a.id}" transform="translate(${a.x}, ${a.y})">
      <circle class="pulse" r="3"/>
      <circle class="ring" r="6"/>
      <circle r="3"/>
      <text x="9" y="3">${a.name}</text>
    </g>`).join("");
  $$(".hot", pinsSvg).forEach((g) => {
    const a = D.AREAS.find((x) => x.id === g.dataset.id);
    g.addEventListener("click", () => setArea(a));
    g.addEventListener("mouseenter", () => setArea(a));
  });
  if (D.AREAS[0]) setArea(D.AREAS[0]);

  /* ---- calculator ---------------------------------------------------- */
  const fmt = (n) => "AED " + Math.round(n).toLocaleString("nl-NL");
  const pct = (n) => n.toFixed(1).replace(".", ",") + "%";
  const setRangeFill = (input) => {
    const min = +input.min, max = +input.max, v = +input.value;
    input.style.setProperty("--p", ((v - min) / (max - min)) * 100 + "%");
  };

  // tabs
  $$(".calc-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      const t = tab.dataset.tab;
      $$(".calc-tab").forEach((x) => x.classList.toggle("active", x === tab));
      $$(".calc-pane").forEach((p) => { p.hidden = p.dataset.pane !== t; });
    })
  );

  // ROI
  const cPrice = $("#c-price"), cRent = $("#c-rent"), cCost = $("#c-cost");
  const calcRoi = () => {
    const price = +cPrice.value, rent = +cRent.value, cost = +cCost.value;
    $("#lbl-price").textContent = fmt(price);
    $("#lbl-rent").textContent = fmt(rent);
    $("#lbl-cost").textContent = fmt(cost);
    const gross = (rent / price) * 100;
    const netIncome = rent - cost;
    const net = (netIncome / price) * 100;
    const payback = netIncome > 0 ? price / netIncome : 0;
    $("#r-net").textContent = net.toFixed(1).replace(".", ",");
    $("#r-gross").textContent = pct(gross);
    $("#r-income").textContent = fmt(netIncome);
    $("#r-payback").textContent = payback > 0 ? Math.round(payback) + " jaar" : "—";
    [cPrice, cRent, cCost].forEach(setRangeFill);
  };
  [cPrice, cRent, cCost].forEach((el) => el.addEventListener("input", calcRoi));
  calcRoi();

  // Mortgage
  const mPrice = $("#m-price"), mDown = $("#m-down"), mTerm = $("#m-term"), mRate = $("#m-rate");
  const calcMortgage = () => {
    const price = +mPrice.value, down = +mDown.value, term = +mTerm.value, rate = +mRate.value;
    $("#lbl-mprice").textContent = fmt(price);
    $("#lbl-down").textContent = down + "%";
    $("#lbl-term").textContent = term + " jaar";
    $("#lbl-rate").textContent = rate.toFixed(1).replace(".", ",") + "%";
    const downVal = price * (down / 100);
    const loan = price - downVal;
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = r > 0 ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
    const totalInterest = monthly * n - loan;
    $("#m-monthly").textContent = Math.round(monthly).toLocaleString("nl-NL");
    $("#m-downval").textContent = fmt(downVal);
    $("#m-loan").textContent = fmt(loan);
    $("#m-interest").textContent = fmt(totalInterest);
    [mPrice, mDown, mTerm, mRate].forEach(setRangeFill);
  };
  [mPrice, mDown, mTerm, mRate].forEach((el) => el.addEventListener("input", calcMortgage));
  calcMortgage();

  /* ---- reviews marquee ----------------------------------------------- */
  const track = $("#revTrack");
  const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const card = (r) => `
    <article class="review">
      <div class="quo">&ldquo;</div>
      <p>${r.text}</p>
      <div class="who">
        <span class="av">${initials(r.name)}</span>
        <div><b>${r.name}</b><small>${r.role}</small></div>
      </div>
    </article>`;
  // duplicate the set so the marquee loops seamlessly (-50%)
  track.innerHTML = (D.REVIEWS.map(card).join("")) + (D.REVIEWS.map(card).join(""));

  /* ---- forms (demo) -------------------------------------------------- */
  const handleForm = (formId, successId) => {
    const form = $(formId); if (!form) return;
    const success = $(successId);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = $$("input[required]", form);
      let ok = true;
      required.forEach((inp) => {
        const valid = inp.checkValidity() && inp.value.trim() !== "";
        inp.style.borderColor = valid ? "" : "#c0564f";
        if (!valid) ok = false;
      });
      if (!ok) return;
      success.classList.add("show");
      form.querySelector("button[type=submit]").textContent = "Verzonden ✓";
      setTimeout(() => { form.reset(); $$("input,textarea", form).forEach((i) => (i.style.borderColor = "")); }, 400);
    });
  };
  handleForm("#leadForm", "#leadSuccess");
  handleForm("#contactForm", "#contactSuccess");

  /* ---- kick off reveals ---------------------------------------------- */
  observeReveals();
})();
