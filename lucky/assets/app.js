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

// --- Echte kleurwissel van het rolluik in de configurator ---
function darken(hex, factor) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  var r = Math.round(parseInt(h.substr(0, 2), 16) * factor);
  var g = Math.round(parseInt(h.substr(2, 2), 16) * factor);
  var b = Math.round(parseInt(h.substr(4, 2), 16) * factor);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function applyRolluikColor(color, name) {
  var slats = document.getElementById('rolluikSlats');
  var cabinet = document.getElementById('rolluikCabinet');
  var bar = document.getElementById('rolluikBar');
  var ring = document.querySelector('.closeup .ring');
  var label = document.getElementById('kleurLabel');
  if (slats) slats.setAttribute('fill', color);
  if (cabinet) cabinet.setAttribute('fill', darken(color, 0.82));
  if (bar) bar.setAttribute('fill', darken(color, 0.68));
  if (ring) ring.style.background = color;
  if (label && name) label.textContent = 'Gekozen kleur: ' + name;
}

// Houd alle kleurkiezers (stalen + thumbnails) in sync
var colorGroups = document.querySelectorAll('[data-swatches], .thumbs');
function syncActive(color) {
  colorGroups.forEach(function (group) {
    group.querySelectorAll('[data-color]').forEach(function (s) {
      s.classList.toggle('active', s.getAttribute('data-color') === color);
    });
  });
}
// Toon echte foto als die bestaat, anders het vector-rolluik (geen kapotte plaatjes)
function showRolluik(color, name, imgSrc) {
  applyRolluikColor(color, name);
  var photo = document.getElementById('rolluikPhoto');
  var svg = document.getElementById('rolluikSvg');
  if (!photo) return;
  if (!imgSrc) { photo.style.display = 'none'; if (svg) svg.style.display = ''; return; }
  photo.onload = function () { photo.style.display = ''; if (svg) svg.style.display = 'none'; };
  photo.onerror = function () { photo.style.display = 'none'; if (svg) svg.style.display = ''; };
  photo.src = imgSrc;
}

colorGroups.forEach(function (group) {
  group.querySelectorAll('[data-color]').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var color = sw.getAttribute('data-color');
      var name = sw.getAttribute('data-name') || sw.getAttribute('title');
      var img = sw.getAttribute('data-img');
      showRolluik(color, name, img);
      syncActive(color);
    });
  });
});

// Bij laden: probeer de foto van de actieve kleur (valt terug op vector als afwezig)
(function initRolluik() {
  var active = document.querySelector('[data-swatches] [data-color].active') ||
               document.querySelector('[data-swatches] [data-color]');
  if (active) {
    showRolluik(active.getAttribute('data-color'),
                active.getAttribute('data-name') || active.getAttribute('title'),
                active.getAttribute('data-img'));
  }
})();

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
