/* =====================================================================
   Droomhuis in Dubai — woningaanbod: filteren/sorteren + galerij
   ===================================================================== */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---- overzicht: filter + sort ------------------------------------- */
  const grid = $("#aanbodGrid");
  if (grid) {
    const cards = $$(".prop", grid);
    const fText = $("#f-text"), fType = $("#f-type"), fArea = $("#f-area"),
      fStatus = $("#f-status"), fBeds = $("#f-beds"), fSort = $("#f-sort");
    const countEl = $("#resultCount"), noResult = $("#noResult");

    // preset filters from URL (?status=Off-plan&type=Villa)
    const params = new URLSearchParams(location.search);
    if (params.get("status") && fStatus) fStatus.value = params.get("status");
    if (params.get("type") && fType) fType.value = params.get("type");
    if (params.get("area") && fArea) fArea.value = params.get("area");

    const apply = () => {
      const t = (fText.value || "").trim().toLowerCase();
      const type = fType.value, area = fArea.value, status = fStatus.value, beds = +fBeds.value || 0;
      let visible = 0;
      cards.forEach((c) => {
        const ok =
          (!t || c.dataset.text.includes(t)) &&
          (!type || c.dataset.type === type) &&
          (!area || c.dataset.area === area) &&
          (!status || c.dataset.status === status) &&
          (!beds || +c.dataset.beds >= beds);
        c.style.display = ok ? "" : "none";
        if (ok) visible++;
      });
      // sort visible
      const sort = fSort.value;
      if (sort) {
        const vis = cards.filter((c) => c.style.display !== "none");
        vis.sort((a, b) => sort === "price-asc"
          ? a.dataset.price - b.dataset.price
          : b.dataset.price - a.dataset.price);
        vis.forEach((c) => grid.appendChild(c));
      }
      if (countEl) countEl.textContent = visible;
      if (noResult) noResult.hidden = visible !== 0;
    };
    [fText, fType, fArea, fStatus, fBeds, fSort].forEach((el) => {
      if (el) { el.addEventListener("input", apply); el.addEventListener("change", apply); }
    });
    apply();
  }

  /* ---- detail: galerij --------------------------------------------- */
  const gMain = $("#gMain");
  if (gMain) {
    $$(".g-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        gMain.src = btn.dataset.src;
        $$(".g-thumb").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }
})();
