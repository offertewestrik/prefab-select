/* =====================================================================
   Meridian Crowne — content data + card rendering
   (Practice areas, partners, insights)
   ===================================================================== */
(function () {
  const ICON = {
    corporate: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M6 42h36M10 42V14l14-8 14 8v28M18 22h4M26 22h4M18 30h4M26 30h4M22 42v-8h4v8"/></svg>',
    commercial: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><rect x="6" y="16" width="36" height="22" rx="2"/><path d="M18 16v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4M6 26h36"/></svg>',
    realestate: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M8 42V20l16-12 16 12v22M8 42h32M20 42V30h8v12"/><circle cx="24" cy="22" r="2"/></svg>',
    construction: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M6 42h28M10 42V18l20-6v30M30 16l12 4v22h-8M16 24h6M16 30h6M16 36h6"/></svg>',
    family: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><circle cx="16" cy="14" r="5"/><circle cx="32" cy="14" r="5"/><path d="M6 40c0-7 4.5-11 10-11s10 4 10 11M26 40c0-6 3-10 8-10s8 4 8 10"/></svg>',
    divorce: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><circle cx="17" cy="24" r="8"/><circle cx="31" cy="24" r="8"/><path d="M21 16l-3 6M27 16l3 6"/></svg>',
    criminal: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 5l16 5v11c0 11-7 18-16 22-9-4-16-11-16-22V10l16-5Z"/><path d="M17 24l5 5 9-10"/></svg>',
    employment: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><rect x="8" y="10" width="32" height="30" rx="2"/><circle cx="24" cy="22" r="5"/><path d="M16 36c0-4 3.5-7 8-7s8 3 8 7M20 6h8"/></svg>',
    banking: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M6 18 24 8l18 10M9 18v18M19 18v18M29 18v18M39 18v18M5 40h38"/></svg>',
    arbitration: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 6v32M12 38h24M8 16h32M14 16l-6 12h12l-6-12ZM34 16l-6 12h12l-6-12Z"/></svg>',
    ip: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 6a12 12 0 0 0-7 21.5c1.5 1.2 2 2 2 4v1.5h10V31.5c0-2 .5-2.8 2-4A12 12 0 0 0 24 6ZM19 40h10M21 44h6"/></svg>',
    setup: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 4c7 4 10 11 10 18 0 5-2 9-4 12H18c-2-3-4-7-4-12 0-7 3-14 10-18Z"/><circle cx="24" cy="19" r="4"/><path d="M18 34l-6 8M30 34l6 8M20 40h8"/></svg>',
    visa: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><rect x="10" y="6" width="28" height="36" rx="3"/><circle cx="24" cy="20" r="6"/><path d="m24 14 1.5 3 3 .3-2.2 2 .7 3-3-1.6-3 1.6.7-3-2.2-2 3-.3 1.5-3ZM18 34h12"/></svg>',
    intl: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c5 5 5 31 0 36M24 6c-5 5-5 31 0 36M10 13c4 3 24 3 28 0M10 35c4-3 24-3 28 0"/></svg>',
  };

  const PRACTICE = [
    ["corporate", "Corporate Law", "Governance, M&A, joint ventures and complex group structuring."],
    ["commercial", "Commercial Law", "Contracts, distribution, agency and commercial dispute strategy."],
    ["realestate", "Real Estate Law", "Acquisitions, RERA, off-plan and landmark development matters."],
    ["construction", "Construction Law", "FIDIC contracts, delay claims and major project disputes."],
    ["family", "Family Law", "Personal status, inheritance and cross-border family matters."],
    ["divorce", "Divorce & Custody", "Discreet resolution of separation, custody and settlements."],
    ["criminal", "Criminal Defence", "Robust defence and white-collar representation, 24/7."],
    ["employment", "Employment Law", "DIFC & onshore labour, executive exits and disputes."],
    ["banking", "Banking & Finance", "Lending, security, regulatory and structured finance."],
    ["arbitration", "Arbitration", "DIFC-LCIA, DIAC and ICC arbitration of the highest value."],
    ["ip", "Intellectual Property", "Trademarks, patents, enforcement and brand protection."],
    ["setup", "Business Setup UAE", "Mainland, free zone and offshore formation, end-to-end."],
    ["visa", "Golden Visa Services", "Eligibility, application and renewal for investors & talent."],
    ["intl", "International Disputes", "Cross-border litigation and enforcement across jurisdictions."],
  ];

  const PARTNERS = [
    {
      name: "Sara Al-Maktoum", role: "Managing Partner",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop",
      bio: "25 years advising sovereign entities and family offices on the region's most significant transactions and disputes.",
      tags: ["Corporate", "Arbitration", "Family Office"], langs: "Arabic · English · French", exp: "25 yrs",
    },
    {
      name: "Alexander Reed", role: "Senior Partner · Disputes",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop",
      bio: "Former Magic Circle litigator leading nine-figure DIFC-LCIA and ICC arbitrations across energy and finance.",
      tags: ["Litigation", "Arbitration", "Banking"], langs: "English · Russian", exp: "22 yrs",
    },
    {
      name: "Layla Haddad", role: "Partner · Corporate",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop",
      bio: "Structures inbound investment, M&A and free-zone establishment for multinational and private capital.",
      tags: ["M&A", "Business Setup", "Golden Visa"], langs: "Arabic · English", exp: "18 yrs",
    },
    {
      name: "Chen Wei", role: "Partner · International",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop",
      bio: "Bridges Gulf and Asian capital, advising on cross-border transactions, real estate and enforcement.",
      tags: ["Cross-Border", "Real Estate", "Finance"], langs: "Mandarin · English · Arabic", exp: "16 yrs",
    },
  ];

  const INSIGHTS = [
    {
      cat: "Corporate", date: "June 2026", title: "The 2026 UAE Corporate Tax Landscape: What Boards Must Know",
      excerpt: "A board-level briefing on free-zone qualifying income, transfer pricing and compliance deadlines.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
    },
    {
      cat: "Business Setup", date: "May 2026", title: "Mainland vs Free Zone: Structuring Your UAE Presence in 2026",
      excerpt: "Ownership, banking and visa implications of each route for international founders and investors.",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop",
    },
    {
      cat: "Disputes", date: "April 2026", title: "Enforcing Foreign Judgments in the DIFC: A Practical Guide",
      excerpt: "How the DIFC Courts have become the Gulf's conduit jurisdiction for cross-border enforcement.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&auto=format&fit=crop",
    },
  ];

  /* ---- Practice cards ---- */
  const pg = document.getElementById("practice-grid");
  if (pg) {
    pg.innerHTML = PRACTICE.map(([icon, title, desc], i) => `
      <article class="pcard reveal d${(i % 4) + 1}">
        <span class="idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="ico">${ICON[icon]}</span>
        <h3>${title}</h3>
        <p>${desc}</p>
        <a class="go" href="#contact"><span data-i18n="pa.explore">Explore</span>
          <svg viewBox="0 0 24 24" width="13" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      </article>`).join("");
  }

  /* ---- Partners ---- */
  const tg = document.getElementById("team-grid");
  if (tg) {
    tg.innerHTML = PARTNERS.map((p, i) => `
      <article class="tmember reveal d${(i % 4) + 1}">
        <div class="portrait" style="background-image:linear-gradient(160deg, rgba(212,175,55,0.18), rgba(5,5,5,0.6)), url('${p.img}')"></div>
        <div class="veil"></div>
        <div class="info">
          <div class="role">${p.role}</div>
          <h3>${p.name}</h3>
          <div class="bio">
            <p>${p.bio}</p>
            <div class="tags">${p.tags.map((x) => `<span>${x}</span>`).join("")}</div>
            <div class="langs">
              <a class="ln" href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4 0 4.8 2.6 4.8 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8Z"/></svg></a>
              ${p.langs} · ${p.exp}
            </div>
          </div>
        </div>
      </article>`).join("");
  }

  /* ---- Insights ---- */
  const ig = document.getElementById("insight-grid");
  if (ig) {
    const render = () => {
      ig.innerHTML = INSIGHTS.map((a, i) => `
        <article class="icard reveal d${(i % 3) + 1}">
          <div class="thumb" style="background-image:linear-gradient(160deg, rgba(212,175,55,0.12), rgba(5,5,5,0.5)), url('${a.img}')">
            <span class="cat">${a.cat}</span>
          </div>
          <div class="body">
            <div class="date">${a.date}</div>
            <h3>${a.title}</h3>
            <p>${a.excerpt}</p>
            <a class="read" href="#insights"><span data-i18n="ins.read">Read Brief</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          </div>
        </article>`).join("");
    };
    render();
  }
})();
