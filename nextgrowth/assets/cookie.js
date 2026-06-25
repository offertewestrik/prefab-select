/* NextGrowth — cookietoestemming (AVG/GDPR), zelfstandig & meertalig (NL/EN/AR)
   - Toont een banner aan nieuwe bezoekers; opgeslagen keuze wordt onthouden.
   - Heropenen kan via elke knop/link met de class "js-open-cookie-settings".
   - Synchroniseert met de actieve sitetaal (document.documentElement.lang).
   - Slaat keuze op in localStorage en stuurt een "ngCookieConsentChanged"-event
     uit zodat tracking (bv. Analytics / Meta Pixel) hierop kan reageren. */
(function () {
  var CONSENT_KEY = 'ngCookieConsent';      // 'accepted' | 'declined'
  var SETTINGS_KEY = 'ngCookieSettings';    // { analytics:bool, marketing:bool }

  var T = {
    nl: {
      title: 'Cookie-instellingen',
      sub: 'NextGrowth respecteert uw privacy',
      body: 'Wij gebruiken cookies om de website te analyseren, te optimaliseren en relevante content te tonen. U bepaalt zelf welke cookies u toestaat.',
      manage: 'Instellingen beheren',
      functional: 'Functioneel',
      functional_d: 'Vereiste basisfuncties. Altijd actief.',
      analytics: 'Analytisch',
      analytics_d: 'Anonieme websitestatistieken.',
      marketing: 'Marketing',
      marketing_d: 'Voor advertenties en sociale media.',
      decline: 'Weigeren',
      save: 'Selectie opslaan',
      accept: 'Alles accepteren',
      footer_link: 'Cookie-instellingen'
    },
    en: {
      title: 'Cookie settings',
      sub: 'NextGrowth respects your privacy',
      body: 'We use cookies to analyse and optimise the website and to show relevant content. You decide which cookies you allow.',
      manage: 'Manage settings',
      functional: 'Functional',
      functional_d: 'Required core features. Always on.',
      analytics: 'Analytics',
      analytics_d: 'Anonymous website statistics.',
      marketing: 'Marketing',
      marketing_d: 'For advertising and social media.',
      decline: 'Decline',
      save: 'Save selection',
      accept: 'Accept all',
      footer_link: 'Cookie settings'
    },
    ar: {
      title: 'إعدادات ملفات تعريف الارتباط',
      sub: 'تحترم NextGrowth خصوصيتك',
      body: 'نستخدم ملفات تعريف الارتباط لتحليل الموقع وتحسينه وعرض محتوى ملائم. أنت تحدّد أيّ ملفات تسمح بها.',
      manage: 'إدارة الإعدادات',
      functional: 'وظيفية',
      functional_d: 'وظائف أساسية مطلوبة. مفعّلة دائمًا.',
      analytics: 'تحليلية',
      analytics_d: 'إحصاءات مجهولة عن الموقع.',
      marketing: 'تسويقية',
      marketing_d: 'للإعلانات ووسائل التواصل.',
      decline: 'رفض',
      save: 'حفظ الاختيار',
      accept: 'قبول الكل',
      footer_link: 'إعدادات ملفات تعريف الارتباط'
    }
  };

  function lang() {
    var l = (document.documentElement.lang || 'nl').slice(0, 2);
    return T[l] ? l : 'nl';
  }
  function t() { return T[lang()]; }

  function readSettings() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        return { analytics: p.analytics !== false, marketing: p.marketing !== false };
      }
    } catch (e) { /* fallback below */ }
    return { analytics: true, marketing: true };
  }

  // Werkstaat (bewerkbaar via de toggles) — start op opgeslagen keuze.
  var state = readSettings();
  var detailsOpen = false;
  var el = null; // banner-root

  function hasConsent() {
    try { return !!localStorage.getItem(CONSENT_KEY); } catch (e) { return false; }
  }

  function save(analytics, marketing) {
    state.analytics = analytics;
    state.marketing = marketing;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({ analytics: analytics, marketing: marketing }));
      localStorage.setItem(CONSENT_KEY, marketing ? 'accepted' : 'declined');
    } catch (e) { /* private mode: stil falen */ }
    close();
    window.dispatchEvent(new CustomEvent('ngCookieConsentChanged', {
      detail: { consent: marketing ? 'accepted' : 'declined', analytics: analytics, marketing: marketing }
    }));
  }

  function close() {
    if (el) { el.classList.remove('show'); }
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) { if (e.key === 'Escape') close(); }

  function svgCookie() {
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5h.01M16 12h.01M9 16h.01M14.5 16.5h.01M7.5 12.5h.01"/></svg>';
  }

  function row(key, name, desc, locked) {
    var on = locked ? true : state[key];
    return '' +
      '<div class="ngc-row">' +
        '<div class="ngc-row-txt"><strong>' + name + '</strong><span>' + desc + '</span></div>' +
        (locked
          ? '<span class="ngc-toggle on locked" aria-hidden="true"></span>'
          : '<button type="button" class="ngc-toggle' + (on ? ' on' : '') + '" data-toggle="' + key + '" role="switch" aria-checked="' + on + '" aria-label="' + name + '"></button>') +
      '</div>';
  }

  function render() {
    if (!el) return;
    var d = t();
    el.innerHTML = '' +
      '<div class="ngc-card" role="dialog" aria-modal="false" aria-label="' + d.title + '">' +
        '<div class="ngc-strip"></div>' +
        '<div class="ngc-head">' +
          '<span class="ngc-ic">' + svgCookie() + '</span>' +
          '<div class="ngc-head-txt"><h3>' + d.title + '</h3><p>' + d.sub + '</p></div>' +
          '<span class="ngc-badge">AVG</span>' +
        '</div>' +
        '<p class="ngc-body">' + d.body + '</p>' +
        '<button type="button" class="ngc-manage" data-act="manage" aria-expanded="' + detailsOpen + '">' +
          '<span>' + d.manage + '</span><span class="ngc-chev">' + (detailsOpen ? '▴' : '▾') + '</span>' +
        '</button>' +
        (detailsOpen ?
          '<div class="ngc-rows">' +
            row('functional', d.functional, d.functional_d, true) +
            row('analytics', d.analytics, d.analytics_d, false) +
            row('marketing', d.marketing, d.marketing_d, false) +
          '</div>' : '') +
        '<div class="ngc-actions">' +
          '<button type="button" class="ngc-btn ngc-ghost" data-act="decline">' + d.decline + '</button>' +
          (detailsOpen
            ? '<button type="button" class="ngc-btn ngc-outline" data-act="save">' + d.save + '</button>'
            : '<button type="button" class="ngc-btn ngc-outline" data-act="manage">' + d.manage + '</button>') +
          '<button type="button" class="ngc-btn ngc-primary" data-act="accept">' + d.accept + '</button>' +
        '</div>' +
      '</div>';
  }

  function open(showDetails) {
    if (!el) build();
    detailsOpen = !!showDetails;
    state = readSettings(); // toon laatst opgeslagen keuze bij heropenen
    render();
    el.classList.add('show');
    document.addEventListener('keydown', onKey);
  }

  function build() {
    el = document.createElement('div');
    el.id = 'ng-cookie';
    el.className = 'ngc';
    document.body.appendChild(el);

    el.addEventListener('click', function (e) {
      var toggle = e.target.closest('[data-toggle]');
      if (toggle) {
        var k = toggle.getAttribute('data-toggle');
        state[k] = !state[k];
        render();
        return;
      }
      var act = e.target.closest('[data-act]');
      if (!act) return;
      var a = act.getAttribute('data-act');
      if (a === 'manage') { detailsOpen = !detailsOpen; render(); }
      else if (a === 'decline') { save(false, false); }
      else if (a === 'save') { save(state.analytics, state.marketing); }
      else if (a === 'accept') { state.analytics = true; state.marketing = true; save(true, true); }
    });
  }

  // Footer-links ("Cookie-instellingen") van tekst voorzien.
  function syncFooterLinks() {
    var label = t().footer_link;
    var links = document.querySelectorAll('.js-open-cookie-settings');
    for (var i = 0; i < links.length; i++) {
      if (!links[i].textContent.trim()) links[i].textContent = label;
    }
  }

  // Klik op een footer-link opent de instellingen (event-delegatie: overleeft re-renders).
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.js-open-cookie-settings');
    if (trigger) { e.preventDefault(); open(true); }
  });

  // Herrender bij taalwissel (de site zet document.documentElement.lang).
  var mo = new MutationObserver(function () {
    syncFooterLinks();
    if (el) render();
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  function init() {
    syncFooterLinks();
    if (!hasConsent()) {
      build();
      render();
      // korte vertraging zodat de pagina eerst rendert
      setTimeout(function () { el.classList.add('show'); }, 700);
    }
    // De footer wordt op dienstpagina's iets later gerenderd door service.js.
    setTimeout(syncFooterLinks, 0);
    setTimeout(syncFooterLinks, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Publieke hook (optioneel).
  window.NGCookie = { open: open };
})();
