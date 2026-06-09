/* =========================================================
   لبان الكايد — interactiviteit
   ========================================================= */
(function () {
  "use strict";

  /* ---- header schaduw bij scrollen ---- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobiel menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- actieve navigatielink ---- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  /* ---- scroll-reveal (globaal beschikbaar voor producten.js) ---- */
  let observer;
  window.akReveal = function () {
    const items = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    items.forEach((el) => observer.observe(el));
  };
  window.akReveal();

  /* ---- jaartal in footer ---- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---- productfilters (producten-pagina) ---- */
  const filterWrap = document.querySelector(".filters");
  if (filterWrap && window.akRenderProducts) {
    filterWrap.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      filterWrap.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      window.akRenderProducts("productsGrid", { filter: chip.dataset.filter });
    });
  }

  /* ---- contactformulier -> WhatsApp ---- */
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (form.elements.name?.value || "").trim();
      const msg = (form.elements.message?.value || "").trim();
      const text = `مرحباً، أنا ${name || "—"}.%0A${msg || "أرغب بالاستفسار عن منتجاتكم."}`;
      window.open(`https://wa.me/31791804639?text=${text}`, "_blank", "noopener");
    });
  }
})();
