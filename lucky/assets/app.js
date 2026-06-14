/* Lucky Zonwering demo — lichte interactie voor de pitch.
   De configurator rekent (bewust) nog niet live; dit is puur visueel. */

// Mobiel menu (eenvoudige scroll naar nav-anker fallback)
document.querySelectorAll('.menu-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var open = nav.style.display === 'flex';
    nav.style.display = open ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '76px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = '#fff';
    nav.style.padding = '16px 24px';
    nav.style.borderBottom = '1px solid var(--line)';
    nav.style.gap = '14px';
  });
});

// Configurator: keuze-kaarten selecteren (visueel)
document.querySelectorAll('[data-choice]').forEach(function (card) {
  card.addEventListener('click', function () {
    document.querySelectorAll('[data-choice]').forEach(function (c) {
      c.classList.remove('selected');
      var b = c.querySelector('.pick');
      if (b) { b.className = 'btn btn--ghost btn--block pick'; b.textContent = '+ Kiezen'; }
    });
    card.classList.add('selected');
    var btn = card.querySelector('.pick');
    if (btn) { btn.className = 'btn btn--green btn--block pick'; btn.textContent = '✓ Gekozen'; }
  });
});

// Kleurstalen + thumbnails: actieve staat tonen
function bindSwatch(selector, applyColor) {
  document.querySelectorAll(selector).forEach(function (group) {
    group.querySelectorAll('span, .t').forEach(function (sw) {
      sw.addEventListener('click', function () {
        group.querySelectorAll('span, .t').forEach(function (s) { s.classList.remove('active'); });
        sw.classList.add('active');
        if (applyColor) {
          var bg = sw.style.background;
          var ring = document.querySelector('.closeup .ring');
          if (ring && bg) ring.style.background = bg;
        }
      });
    });
  });
}
bindSwatch('[data-swatches]', true);
bindSwatch('.thumbs', true);

// Tabs
document.querySelectorAll('[data-tablist]').forEach(function (list) {
  list.querySelectorAll('button').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');
      list.querySelectorAll('button').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('[data-panel]').forEach(function (p) {
        p.hidden = p.getAttribute('data-panel') !== key;
      });
    });
  });
});
