/* Lucky Zonwering — premium configurator (7 stappen) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var euro = function (n) { return '€ ' + Math.round(n).toLocaleString('nl-NL'); };

  /* ---------- Data ---------- */
  var ICON = {
    crank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h10v8H4zM14 10h4M18 10v8M16 18h4"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/></svg>',
    wind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h11a3 3 0 100-6M3 16h16a3 3 0 110 6M3 12h7"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 2a6 6 0 014 10c-1 1-1 2-1 3H9c0-1 0-2-1-3a6 6 0 014-10z"/></svg>',
    glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    heat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c1 3-2 4-2 7a2 2 0 104 0c0-1 0-2-.5-3M8 14a4 4 0 108 0"/></svg>',
    vent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-6 3-6s2 4-1 6M12 14c0 4-1 6-3 6s-2-4 1-6M10 12c-4 0-6-1-6-3s4-2 6 1M14 12c4 0 6 1 6 3s-4 2-6-1"/></svg>',
    volant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18l-2 4-2-2-2 2-2-2-2 2-2-2-2 2-2-4z"/></svg>',
    remote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="2" width="8" height="20" rx="3"/><circle cx="12" cy="8" r="1.4"/><path d="M12 12v4"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>'
  };

  var PRODUCTS = {
    rolluiken:    { title: 'Rolluiken', img: 'assets/project-rolluiken-woning.jpg', desc: 'Veiligheid, verduistering & isolatie — uit eigen productie.', rate: 245, min: 260 },
    screens:      { title: 'Screens', img: 'assets/project-screens-modern.jpg', desc: 'Koelte en privacy, met behoud van uw uitzicht.', rate: 215, min: 240 },
    veranda:      { title: "Veranda's", img: 'assets/hero-buitenleven.jpg', desc: 'Uw eigen luxe buitenkamer, het hele jaar door.', rate: 690, min: 1900 },
    knikarm:      { title: 'Knikarmschermen', img: 'assets/project-terras-antraciet.jpg', desc: 'Schaduw op het terras, met vrije doorloop.', rate: 330, min: 520 },
    uitval:       { title: 'Uitvalschermen', img: 'assets/project-terras-creme.jpg', desc: 'Variabele uitvalshoek, ideaal voor de gevel.', rate: 285, min: 480 }
  };
  var PRODUCT_ORDER = ['rolluiken', 'screens', 'veranda', 'knikarm', 'uitval'];

  var COLORS = [
    { id: 'wit', nm: 'Wit', hex: '#f4f4f4', img: 'assets/rolluik-wit.png' },
    { id: 'creme', nm: 'Crème', hex: '#e9e6df', img: 'assets/rolluik-creme.png' },
    { id: 'antraciet', nm: 'Antraciet', hex: '#3a4651', img: 'assets/rolluik-antraciet.png' },
    { id: 'zwart', nm: 'Zwart', hex: '#232323', img: 'assets/rolluik-zwart.png' },
    { id: 'grijs', nm: 'Grijs', hex: '#8a939b', img: 'assets/rolluik-grijs.png' }
  ];

  var BEDIENING = [
    { id: 'handmatig', nm: 'Handmatig', desc: 'Met band of koord', add: 0, icon: 'crank' },
    { id: 'elektrisch', nm: 'Elektrisch', desc: 'Met schakelaar', add: 180, img: 'assets/somfy-motor.png' },
    { id: 'somfy_io', nm: 'Somfy IO', desc: 'Slim & terugkoppeling', add: 340, img: 'assets/somfy-app.png' },
    { id: 'somfy_rts', nm: 'Somfy RTS', desc: 'Met afstandsbediening', add: 270, img: 'assets/somfy-afstandsbediening.png' },
    { id: 'smart', nm: 'Smart Home', desc: 'App & spraak', add: 430, img: 'assets/somfy-app.png' }
  ];

  var OPTIONS = {
    rolluiken: [ { id: 'solar', nm: 'Solar', add: 350, icon: 'sun' }, { id: 'optil', nm: 'Anti-optil beveiliging', add: 90, icon: 'shield' }, { id: 'venti', nm: 'Ventilatiestand', add: 60, icon: 'vent' } ],
    screens:   [ { id: 'windvast', nm: 'Windvaste screen', add: 140, icon: 'wind' }, { id: 'zip', nm: 'Zip screen', add: 120, icon: 'shield' }, { id: 'solarscreen', nm: 'Solar screen', add: 300, icon: 'sun' } ],
    veranda:   [ { id: 'schuifwand', nm: 'Glazen schuifwand', add: 1200, icon: 'glass' }, { id: 'led', nm: 'LED-verlichting', add: 450, icon: 'light' }, { id: 'heater', nm: 'Heater', add: 350, icon: 'heat' }, { id: 'vscreens', nm: 'Screens', add: 900, icon: 'shield' } ],
    knikarm:   [ { id: 'led', nm: 'LED-verlichting', add: 400, icon: 'light' }, { id: 'volant', nm: 'Volant', add: 120, icon: 'volant' }, { id: 'windsensor', nm: 'Windsensor', add: 180, icon: 'wind' }, { id: 'zonsensor', nm: 'Zonsensor', add: 160, icon: 'sun' } ],
    uitval:    [ { id: 'volant', nm: 'Volant', add: 110, icon: 'volant' }, { id: 'windsensor', nm: 'Windsensor', add: 180, icon: 'wind' }, { id: 'zonsensor', nm: 'Zonsensor', add: 160, icon: 'sun' } ]
  };

  var LABELS = ['Product', 'Afmetingen', 'Kleur', 'Bediening', 'Opties', 'Overzicht', 'Offerte'];

  /* ---------- State ---------- */
  var S = { step: 0, product: 'rolluiken', width: 200, height: 160, color: 'antraciet', bediening: 'elektrisch', opts: {} };
  PRODUCT_ORDER.forEach(function (p) { S.opts[p] = []; });

  /* ---------- Helpers ---------- */
  function colorById(id) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i].id === id) return COLORS[i]; return COLORS[0]; }
  function bedById(id) { for (var i = 0; i < BEDIENING.length; i++) if (BEDIENING[i].id === id) return BEDIENING[i]; return BEDIENING[0]; }
  function area() { return (S.width / 100) * (S.height / 100); }
  function selectedOpts() { return OPTIONS[S.product].filter(function (o) { return S.opts[S.product].indexOf(o.id) > -1; }); }
  function price() {
    var p = PRODUCTS[S.product];
    var base = Math.max(p.min, area() * p.rate);
    base += bedById(S.bediening).add;
    selectedOpts().forEach(function (o) { base += o.add; });
    return Math.round(base / 10) * 10;
  }

  /* ---------- Render: option grids ---------- */
  function check() { return '<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>'; }

  function renderProducts() {
    $('#gridProduct').innerHTML = PRODUCT_ORDER.map(function (id) {
      var p = PRODUCTS[id];
      return '<button class="opt' + (S.product === id ? ' sel' : '') + '" data-product="' + id + '">' + check() +
        '<div class="ph"><img src="' + p.img + '" alt="' + p.title + '"></div>' +
        '<div class="ob"><b>' + p.title + '</b><span>' + p.desc + '</span></div></button>';
    }).join('');
  }
  function renderColors() {
    $('#gridColor').innerHTML = COLORS.map(function (c) {
      return '<button class="sw' + (S.color === c.id ? ' sel' : '') + '" data-color="' + c.id + '">' +
        '<div class="dot" style="background:' + c.hex + (c.id === 'wit' ? ';border-color:#ccc' : '') + '"></div><div class="nm">' + c.nm + '</div></button>';
    }).join('');
  }
  function renderBediening() {
    $('#gridBediening').innerHTML = BEDIENING.map(function (b) {
      var media = b.img ? '<div class="ph"><img src="' + b.img + '" alt="' + b.nm + '"></div>'
                        : '<div class="ph icon">' + ICON[b.icon] + '</div>';
      return '<button class="opt' + (S.bediening === b.id ? ' sel' : '') + '" data-bediening="' + b.id + '">' + check() + media +
        '<div class="ob"><b>' + b.nm + '</b><span>' + b.desc + '</span>' + (b.add ? '<span class="add">+ ' + euro(b.add) + '</span>' : '<span class="add">Inbegrepen</span>') + '</div></button>';
    }).join('');
  }
  function renderOpties() {
    var list = OPTIONS[S.product];
    $('#optHint').textContent = 'Voor ' + PRODUCTS[S.product].title.toLowerCase() + ' — kies wat u wilt (meerdere mogelijk).';
    $('#gridOpties').innerHTML = list.map(function (o) {
      var sel = S.opts[S.product].indexOf(o.id) > -1;
      return '<button class="opt' + (sel ? ' sel' : '') + '" data-opt="' + o.id + '">' + check() +
        '<div class="ph icon">' + ICON[o.icon] + '</div>' +
        '<div class="ob"><b>' + o.nm + '</b><span class="add">+ ' + euro(o.add) + '</span></div></button>';
    }).join('');
  }

  /* ---------- Preview + summary ---------- */
  function previewImg() {
    if (S.product === 'rolluiken') return colorById(S.color).img;
    return PRODUCTS[S.product].img;
  }
  function updatePreview() {
    var img = $('#pvImg');
    if (img.getAttribute('src') !== previewImg()) { img.style.opacity = 0; setTimeout(function () { img.src = previewImg(); img.style.opacity = 1; }, 120); }
    $('#pvSize').textContent = S.width + ' × ' + S.height + ' cm';
    var c = colorById(S.color);
    $('#pvColor').innerHTML = '<i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:' + c.hex + ';border:1px solid #ccc;margin-right:6px;vertical-align:-1px"></i>' + c.nm;
    var opts = selectedOpts();
    $('#pvSum').innerHTML =
      row('Product', PRODUCTS[S.product].title) +
      row('Afmetingen', S.width + ' × ' + S.height + ' cm (' + area().toFixed(2).replace('.', ',') + ' m²)') +
      row('Kleur', c.nm) +
      row('Bediening', bedById(S.bediening).nm) +
      row('Opties', opts.length ? opts.map(function (o) { return o.nm; }).join(', ') : '—');
    var pr = price();
    $$('.pvAmt').forEach(function (e) { e.textContent = euro(pr); });
  }
  function row(k, v) { return '<li><span>' + k + '</span><span>' + v + '</span></li>'; }

  function renderSummary() {
    var opts = selectedOpts();
    $('#paneSummaryBody').innerHTML =
      '<div class="pv-card" style="max-width:520px">' +
      '<div class="pv-stage"><img src="' + previewImg() + '" alt="Configuratie"><div class="pv-badges"><span>' + S.width + ' × ' + S.height + ' cm</span><span>' + colorById(S.color).nm + '</span></div></div>' +
      '<div class="pv-body"><ul class="pv-sum">' +
      row('Product', PRODUCTS[S.product].title) +
      row('Afmetingen', S.width + ' × ' + S.height + ' cm') +
      row('Kleur', colorById(S.color).nm) +
      row('Bediening', bedById(S.bediening).nm) +
      row('Opties', opts.length ? opts.map(function (o) { return o.nm; }).join(', ') : '—') +
      '</ul><div class="pv-price"><span class="lab">Indicatieve richtprijs</span><span class="amt pvAmt">' + euro(price()) + '</span></div>' +
      '<p class="pv-note">Incl. btw &amp; montage · definitieve prijs na gratis inmeten aan huis.</p></div></div>';
  }

  /* ---------- Step navigation ---------- */
  var TOTAL = 7;
  function go(n) {
    S.step = Math.max(0, Math.min(TOTAL - 1, n));
    $$('.step-pane').forEach(function (p, i) { p.classList.toggle('active', i === S.step); });
    $$('.cfg-steps .s').forEach(function (s, i) { s.classList.toggle('active', i === S.step); s.classList.toggle('done', i < S.step); });
    $('#cfgFill').style.width = ((S.step + 1) / TOTAL * 100) + '%';
    $('#btnBack').style.visibility = S.step === 0 ? 'hidden' : 'visible';
    var last = S.step === TOTAL - 1;
    $$('.btnNext').forEach(function (b) { b.style.display = last ? 'none' : ''; });
    if (S.step === 4) renderOpties();
    if (S.step === 5) renderSummary();
    updatePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-product],[data-color],[data-bediening],[data-opt],[data-goto]');
    if (!t) return;
    if (t.hasAttribute('data-product')) { S.product = t.getAttribute('data-product'); renderProducts(); }
    else if (t.hasAttribute('data-color')) { S.color = t.getAttribute('data-color'); renderColors(); }
    else if (t.hasAttribute('data-bediening')) { S.bediening = t.getAttribute('data-bediening'); renderBediening(); }
    else if (t.hasAttribute('data-opt')) {
      var id = t.getAttribute('data-opt'), arr = S.opts[S.product], i = arr.indexOf(id);
      if (i > -1) arr.splice(i, 1); else arr.push(id);
      renderOpties();
    } else if (t.hasAttribute('data-goto')) { go(parseInt(t.getAttribute('data-goto'), 10)); }
    updatePreview();
  });
  $$('.btnNext').forEach(function (b) { b.addEventListener('click', function () { go(S.step + 1); }); });
  $('#btnBack').addEventListener('click', function () { go(S.step - 1); });
  $('#cfgSteps').addEventListener('click', function (e) {
    var s = e.target.closest('.s'); if (!s) return; var i = parseInt(s.getAttribute('data-i'), 10);
    if (i <= S.step) go(i);
  });

  /* dimensions */
  function bindDim(rangeId, valId, key, max) {
    var r = $(rangeId);
    r.addEventListener('input', function () {
      S[key] = parseInt(this.value, 10);
      $(valId).textContent = S[key] + ' cm';
      sizeVis();
      updatePreview();
    });
  }
  function sizeVis() {
    var maxW = 280, maxH = 190, scale = Math.min(maxW / 400, maxH / 300);
    var w = Math.max(40, S.width * scale), h = Math.max(40, S.height * scale);
    var box = $('#sizeBox'); box.style.width = w + 'px'; box.style.height = h + 'px';
    $('#sizeW').textContent = S.width + ' cm'; $('#sizeH').textContent = S.height + ' cm';
  }

  /* lead form */
  var lead = $('#leadForm');
  if (lead) lead.addEventListener('submit', function (e) {
    e.preventDefault();
    $('#paneLead').innerHTML = '<div style="text-align:center;padding:40px 10px"><div style="width:72px;height:72px;border-radius:50%;background:rgba(245,130,31,.14);color:var(--orange-600);display:grid;place-items:center;margin:0 auto 18px"><svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><h2 style="margin-bottom:8px">Bedankt voor uw aanvraag!</h2><p style="max-width:460px;margin:0 auto">In de echte website komt uw configuratie direct bij Lucky binnen en nemen we binnen 1 werkdag contact op voor een exacte offerte na inmeten. <em>(demo)</em></p></div>';
  });

  /* ---------- Init ---------- */
  renderProducts(); renderColors(); renderBediening();
  bindDim('#rngW', '#valW', 'width', 400);
  bindDim('#rngH', '#valH', 'height', 300);
  sizeVis();
  go(0);
})();
