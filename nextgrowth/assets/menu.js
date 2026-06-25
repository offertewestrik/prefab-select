/* NextGrowth — mobiel navigatiemenu (hamburger + drawer), zelfstandig.
   Bouwt het menu uit de bestaande nav in de DOM, zodat het op de homepage
   én op de dienstpagina's werkt en re-renders (taalwissel) overleeft.
   Taallabels komen uit de echte taalknoppen; klikken delegeert naar die knoppen. */
(function () {
  var navSel = '.nav';
  var openClass = 'menu-open';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  var drawer, overlay, burger;

  function ensureChrome() {
    var nav = $(navSel);
    if (!nav) return false;

    // Hamburgerknop in de nav-row.
    if (!burger || !document.body.contains(burger)) {
      var row = $('.row', nav) || nav;
      burger = document.createElement('button');
      burger.type = 'button';
      burger.className = 'nav-burger';
      burger.setAttribute('aria-label', 'Menu');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = '<span></span><span></span><span></span>';
      burger.addEventListener('click', function () { toggle(); });
      row.appendChild(burger);
    }

    // Overlay + drawer (eenmalig).
    if (!overlay || !document.body.contains(overlay)) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      overlay.addEventListener('click', close);
      document.body.appendChild(overlay);
    }
    if (!drawer || !document.body.contains(drawer)) {
      drawer = document.createElement('nav');
      drawer.className = 'nav-drawer';
      drawer.setAttribute('aria-label', 'Mobiele navigatie');
      document.body.appendChild(drawer);
    }
    return true;
  }

  function buildDrawer() {
    var nav = $(navSel);
    if (!nav || !drawer) return;
    var rtl = document.documentElement.dir === 'rtl';
    drawer.style.setProperty('--side', rtl ? 'left' : 'right');

    var parts = [];

    // Sluitknop.
    parts.push('<button type="button" class="nav-drawer-close" aria-label="Sluiten">&times;</button>');

    // Navigatielinks (inclusief eventuele dropdown-sublinks), ontdubbeld op href+tekst.
    var seen = {};
    $$('.navlinks a', nav).forEach(function (a) {
      var label = (a.textContent || '').trim();
      var href = a.getAttribute('href') || '#';
      if (!label) return;
      var key = href + '|' + label;
      if (seen[key]) return;
      seen[key] = 1;
      parts.push('<a href="' + href + '" class="nav-drawer-link">' + label + '</a>');
    });

    // Taalwissel (labels uit de echte knoppen; klik delegeert via data-lang).
    var langBtns = $$('#langsw button', nav);
    if (langBtns.length) {
      var cur = document.documentElement.lang || 'nl';
      parts.push('<div class="nav-drawer-langs">' + langBtns.map(function (b) {
        var l = b.getAttribute('data-lang');
        return '<button type="button" data-jump-lang="' + l + '"' + (l === cur ? ' class="on"' : '') + '>' + b.textContent + '</button>';
      }).join('') + '</div>');
    }

    // CTA-knop (overnemen uit de nav als die er is).
    var cta = $('.btn-nav', nav);
    if (cta) {
      parts.push('<a href="' + (cta.getAttribute('href') || '#contact') + '" class="nav-drawer-cta">' + (cta.textContent || '').trim() + '</a>');
    }

    drawer.innerHTML = parts.join('');

    // Sluiten bij klik op een link of de sluitknop.
    $$('.nav-drawer-link, .nav-drawer-cta', drawer).forEach(function (a) {
      a.addEventListener('click', close);
    });
    var closeBtn = $('.nav-drawer-close', drawer);
    if (closeBtn) closeBtn.addEventListener('click', close);
    // Taalknoppen delegeren naar de echte switch en sluiten.
    $$('[data-jump-lang]', drawer).forEach(function (b) {
      b.addEventListener('click', function () {
        var real = $('#langsw button[data-lang="' + b.getAttribute('data-jump-lang') + '"]', nav);
        if (real) real.click();
        close();
      });
    });
  }

  function open() {
    if (!ensureChrome()) return;
    buildDrawer();
    document.documentElement.classList.add(openClass);
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKey);
  }
  function close() {
    document.documentElement.classList.remove(openClass);
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKey);
  }
  function toggle() {
    if (document.documentElement.classList.contains(openClass)) close();
    else open();
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  // Sluiten zodra we terug naar desktopbreedte gaan.
  var mq = window.matchMedia('(min-width:981px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(function (e) {
    if (e.matches) close();
  });

  // Nav wordt op dienstpagina's async/na taalwissel opnieuw gerenderd:
  // zorg dat de hamburger blijft bestaan en de open drawer meebeweegt.
  var mo = new MutationObserver(function () {
    ensureChrome();
    if (document.documentElement.classList.contains(openClass)) buildDrawer();
  });

  function init() {
    if (ensureChrome()) {
      mo.observe($(navSel), { childList: true, subtree: true });
    }
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    // Nav verschijnt op dienstpagina's net na DOMContentLoaded.
    setTimeout(ensureChrome, 0);
    setTimeout(ensureChrome, 400);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
