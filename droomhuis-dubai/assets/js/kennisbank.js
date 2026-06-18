/* =====================================================================
   Droomhuis in Dubai — Kennisbank interactions
   (nav, reveal, TOC scroll-spy, index search + category filter)
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* nav scroll state */
  const nav = $("#nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* mobile menu */
  const burger = $("#burger"), navLinks = $("#navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", navLinks).forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      })
    );
  }

  /* reveal on scroll */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---- article: TOC scroll-spy ---- */
  const tocLinks = $$(".toc nav a");
  if (tocLinks.length) {
    const map = new Map();
    tocLinks.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            tocLinks.forEach((a) => a.classList.remove("active"));
            const link = map.get(e.target);
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 }
    );
    map.forEach((_a, sec) => spy.observe(sec));
  }

  /* ---- index: search + category filter ---- */
  const search = $("#kbSearch");
  const filters = $("#kbFilters");
  if (search || filters) {
    const cards = $$(".kb-card");
    const sections = $$(".kb-section");
    const noResult = $("#kbNoResult");
    let cat = "all";
    let term = "";

    const apply = () => {
      let visible = 0;
      cards.forEach((c) => {
        const okCat = cat === "all" || c.dataset.cat === cat;
        const okTerm = !term || c.dataset.title.includes(term);
        const show = okCat && okTerm;
        c.style.display = show ? "" : "none";
        if (show) visible++;
      });
      sections.forEach((s) => {
        const any = $$(".kb-card", s).some((c) => c.style.display !== "none");
        s.style.display = any ? "" : "none";
      });
      if (noResult) noResult.hidden = visible !== 0;
    };

    if (search) search.addEventListener("input", (e) => { term = e.target.value.trim().toLowerCase(); apply(); });
    if (filters) {
      $$(".filter", filters).forEach((b) =>
        b.addEventListener("click", () => {
          $$(".filter", filters).forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          cat = b.dataset.cat;
          apply();
        })
      );
    }
  }
})();
