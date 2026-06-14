/* Lucky Zonwering — premium configurator (volledig datagedreven, productspecifiek) */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var euro = function (n) { return '€ ' + Math.round(n).toLocaleString('nl-NL'); };

  var ICON = {
    crank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h10v8H4zM14 10h4M18 10v8M16 18h4"/></svg>',
    bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/></svg>',
    wind:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h11a3 3 0 100-6M3 16h16a3 3 0 110 6M3 12h7"/></svg>',
    light:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 2a6 6 0 014 10c-1 1-1 2-1 3H9c0-1 0-2-1-3a6 6 0 014-10z"/></svg>',
    glass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>',
    heat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c1 3-2 4-2 7a2 2 0 104 0c0-1 0-2-.5-3M8 14a4 4 0 108 0"/></svg>',
    vent:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-6 3-6s2 4-1 6M12 14c0 4-1 6-3 6s-2-4 1-6M10 12c-4 0-6-1-6-3s4-2 6 1M14 12c4 0 6 1 6 3s-4 2-6-1"/></svg>',
    plug:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 01-10 0zM12 16v6"/></svg>',
    drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c4 5 6 8 6 11a6 6 0 11-12 0c0-3 2-6 6-11z"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="2" width="10" height="20" rx="3"/><path d="M11 18h2"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    volant:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18l-2 4-2-2-2 2-2-2-2 2-2-2-2 2-2-4z"/></svg>'
  };

  /* ---- helpers to build choices ---- */
  function c(id, nm, add, extra) { var o = { id: id, nm: nm, add: add || 0 }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  var IMG = { motor: 'assets/somfy-motor.png', rts: 'assets/somfy-afstandsbediening.png', app: 'assets/somfy-app.png' };
  var ROLLUIK_COL_IMG = { wit: 'assets/rolluik-wit.png', creme: 'assets/rolluik-creme.png', antraciet: 'assets/rolluik-antraciet.png', zwart: 'assets/rolluik-zwart.png', grijs: 'assets/rolluik-grijs.png', ral: 'assets/rolluik-antraciet.png' };

  // colour palettes
  function colWit() { return c('wit', 'Wit', 0, { hex: '#f4f4f4' }); }
  function frame4() { return [colWit(), c('creme', 'Crème', 0, { hex: '#e9e6df' }), c('antraciet', 'Antraciet', 0, { hex: '#3a4651' }), c('zwart', 'Zwart', 0, { hex: '#232323' })]; }
  function frame5() { return frame4().concat([c('grijs', 'Grijs', 0, { hex: '#8a939b' })]); }
  function ral(add) { return c('ral', 'RAL naar keuze', add || 90, { ral: true }); }

  /* ---- product definitions ---- */
  var PRODUCTS = {
    rolluiken: { title: 'Rolluiken', img: 'assets/project-rolluiken-woning.jpg', desc: 'Veiligheid, verduistering & isolatie.', rate: 245, min: 260, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 60, max: 400, def: 200 }, b: { l: 'Hoogte', min: 60, max: 300, def: 160 } },
      { key: 'type', type: 'single', label: 'Type rolluik', short: 'Type', choices: [c('opbouw', 'Opbouw rolluik', 0), c('voorzet', 'Voorzet rolluik', 40), c('inbouw', 'Inbouw rolluik', 60)] },
      { key: 'kast', type: 'single', label: 'Kastvorm', short: 'Kastvorm', choices: [c('rond', 'Rond', 0), c('afsch20', 'Afschuining 20°', 20), c('afsch45', 'Afschuining 45°', 30), c('vierkant', 'Vierkant', 0)] },
      { key: 'kleur', type: 'color', label: 'Kleur', short: 'Kleur', main: true, choices: frame5().concat([ral()]) },
      { key: 'lamellen', type: 'single', label: 'Lamellen', short: 'Lamellen', choices: [c('std', 'Aluminium standaard', 0), c('iso', 'Aluminium geïsoleerd', 70), c('stevig', 'Extra stevig profiel', 120)] },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('band', 'Bandopwinder', 0, { icon: 'crank' }), c('elek', 'Elektrisch schakelaar', 180, { img: IMG.motor }), c('rts', 'Somfy RTS', 270, { img: IMG.rts }), c('io', 'Somfy IO', 340, { img: IMG.app }), c('solar', 'Solar rolluik', 390, { icon: 'sun' })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('obstakel', 'Obstakeldetectie', 120, { icon: 'eye' }), c('optil', 'Anti-optil beveiliging', 90, { icon: 'shield' }), c('venti', 'Ventilatiestand', 60, { icon: 'vent' }), c('tijdklok', 'Tijdklok', 80, { icon: 'clock' }), c('zon', 'Zonsensor', 160, { icon: 'sun' }), c('windr', 'Windsensor', 180, { icon: 'wind' }), c('smart', 'Smartphone bediening', 150, { icon: 'phone' })] }
    ] },

    screens: { title: 'Screens', img: 'assets/project-screens-modern.jpg', desc: 'Koelte en privacy, met behoud van uitzicht.', rate: 215, min: 240, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 60, max: 500, def: 250 }, b: { l: 'Hoogte', min: 60, max: 350, def: 200 } },
      { key: 'type', type: 'single', label: 'Type screen', short: 'Type', choices: [c('std', 'Standaard screen', 0), c('zip', 'ZIP Screen', 150), c('solar', 'Solar Screen', 300)] },
      { key: 'doek', type: 'color', label: 'Doekkleur', short: 'Doek', main: true, choices: [c('lichtgrijs', 'Lichtgrijs', 0, { hex: '#c9ccce' }), c('donkergrijs', 'Donkergrijs', 0, { hex: '#595d61' }), c('zwart', 'Zwart', 0, { hex: '#232323' }), c('antraciet', 'Antraciet', 0, { hex: '#3a4651' }), c('zand', 'Zand', 0, { hex: '#d9c9a8' }), colWit(), ral(0)] },
      { key: 'transp', type: 'single', label: 'Doektransparantie', short: 'Transp.', choices: [c('1', '1%', 0, { sub: 'Maximale privacy' }), c('3', '3%', 0, { sub: 'Balans' }), c('5', '5%', 0, { sub: 'Meer doorzicht' })] },
      { key: 'cassette', type: 'color', label: 'Kleur cassette', short: 'Cassette', choices: frame4().concat([ral()]) },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('elek', 'Elektrisch', 180, { img: IMG.motor }), c('rts', 'Somfy RTS', 270, { img: IMG.rts }), c('io', 'Somfy IO', 340, { img: IMG.app }), c('solar', 'Solar', 360, { icon: 'sun' })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('windr', 'Windsensor', 180, { icon: 'wind' }), c('zon', 'Zonsensor', 160, { icon: 'sun' }), c('smart', 'Smartphone bediening', 150, { icon: 'phone' }), c('groep', 'Groepsbediening', 120, { icon: 'bolt' }), c('home', 'Smart Home koppeling', 200, { icon: 'phone' })] }
    ] },

    veranda: { title: "Aluminium veranda", img: 'assets/hero-buitenleven.jpg', desc: 'Uw eigen luxe buitenkamer, het hele jaar door.', rate: 720, min: 2400, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 200, max: 800, def: 400 }, b: { l: 'Diepte', min: 200, max: 500, def: 300 } },
      { key: 'dak', type: 'single', label: 'Daktype', short: 'Dak', choices: [c('poly_helder', 'Polycarbonaat helder', 0), c('poly_opaal', 'Polycarbonaat opaal', 80), c('glas', 'Glas', 600), c('sandwich', 'Sandwichpanelen', 350)] },
      { key: 'kleur', type: 'color', label: 'Kleur constructie', short: 'Kleur', main: true, choices: frame4() },
      { key: 'staanders', type: 'single', label: 'Staanders', short: 'Staanders', choices: [c('std', 'Standaard', 0), c('luxe', 'Luxe vierkant', 250)] },
      { key: 'verlichting', type: 'single', label: 'Verlichting', short: 'Licht', choices: [c('geen', 'Geen', 0), c('spots', 'LED Spots', 350, { icon: 'light' }), c('strip', 'LED Strip', 450, { icon: 'light' })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('schuif', 'Glazen schuifwand', 1200, { icon: 'glass' }), c('vastglas', 'Vast glaspaneel', 450, { icon: 'glass' }), c('zip', 'ZIP Screens', 900, { icon: 'shield' }), c('heater', 'Heater', 350, { icon: 'heat' }), c('stopc', 'Stopcontacten', 120, { icon: 'plug' }), c('regen', 'Regenafvoer', 180, { icon: 'drop' })] }
    ] },

    pergola: { title: "Pergola", img: 'assets/hero-buitenleven.jpg', desc: 'Strakke buitenkamer met lamellen- of doekdak.', rate: 850, min: 3200, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 200, max: 800, def: 400 }, b: { l: 'Diepte', min: 200, max: 600, def: 350 } },
      { key: 'dak', type: 'single', label: 'Type dak', short: 'Dak', choices: [c('doek', 'Openschuifbaar doek', 0), c('lamel', 'Lamellendak', 900)] },
      { key: 'kleur', type: 'color', label: 'Kleur', short: 'Kleur', main: true, choices: frame4() },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('elek', 'Elektrisch', 600, { img: IMG.motor }), c('io', 'Somfy IO', 800, { img: IMG.app })] },
      { key: 'verlichting', type: 'single', label: 'Verlichting', short: 'Licht', choices: [c('geen', 'Geen', 0), c('spots', 'LED Spots', 350, { icon: 'light' }), c('strip', 'LED Strip', 450, { icon: 'light' })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('zip', 'ZIP Screens', 1400, { icon: 'shield' }), c('schuif', 'Glazen schuifwanden', 1200, { icon: 'glass' }), c('heater', 'Heater', 350, { icon: 'heat' }), c('regens', 'Regensensor', 160, { icon: 'drop' }), c('winds', 'Windsensor', 180, { icon: 'wind' })] }
    ] },

    knikarm: { title: 'Knikarmschermen', img: 'assets/project-terras-antraciet.jpg', desc: 'Schaduw op het terras, met vrije doorloop.', rate: 330, min: 520, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 150, max: 600, def: 350 }, b: { l: 'Uitval', min: 150, max: 400, def: 300 } },
      { key: 'cassette', type: 'single', label: 'Cassette', short: 'Cassette', choices: [c('open', 'Open', 0), c('half', 'Half cassette', 150), c('vol', 'Vol cassette', 300)] },
      { key: 'doek', type: 'single', label: 'Doekkleur', short: 'Doek', choices: [c('uni', 'Uni kleur', 0), c('streep', 'Streepdoek', 60), c('eigen', 'Eigen keuze', 90)] },
      { key: 'frame', type: 'color', label: 'Framekleur', short: 'Frame', main: true, choices: frame4() },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('hand', 'Handmatig', 0, { icon: 'crank' }), c('elek', 'Elektrisch', 210, { img: IMG.motor }), c('rts', 'Somfy RTS', 290, { img: IMG.rts }), c('io', 'Somfy IO', 360, { img: IMG.app })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('led', 'LED-verlichting', 400, { icon: 'light' }), c('volant', 'Volant', 120, { icon: 'volant' }), c('winds', 'Windsensor', 180, { icon: 'wind' }), c('zon', 'Zonsensor', 160, { icon: 'sun' }), c('smart', 'Smartphone bediening', 150, { icon: 'phone' })] }
    ] },

    uitval: { title: 'Uitvalschermen', img: 'assets/project-terras-creme.jpg', desc: 'Variabele uitvalshoek, ideaal voor de gevel.', rate: 285, min: 480, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 100, max: 400, def: 250 }, b: { l: 'Hoogte', min: 60, max: 200, def: 150 } },
      { key: 'type', type: 'single', label: 'Type', short: 'Type', choices: [c('std', 'Standaard', 0), c('windvast', 'Windvast', 140)] },
      { key: 'doek', type: 'single', label: 'Doekkleur', short: 'Doek', choices: [c('licht', 'Licht', 0), c('donker', 'Donker', 0), c('streep', 'Gestreept', 60)] },
      { key: 'frame', type: 'color', label: 'Framekleur', short: 'Frame', main: true, choices: frame4() },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('hand', 'Handmatig', 0, { icon: 'crank' }), c('elek', 'Elektrisch', 210, { img: IMG.motor }), c('rts', 'Somfy RTS', 290, { img: IMG.rts }), c('io', 'Somfy IO', 360, { img: IMG.app })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('winds', 'Windsensor', 180, { icon: 'wind' }), c('zon', 'Zonsensor', 160, { icon: 'sun' })] }
    ] },

    luifel: { title: 'Luifels', img: 'assets/project-terras-creme.jpg', desc: 'Bescherming tegen zon en regen boven terras of deur.', rate: 300, min: 450, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 80, max: 300, def: 150 }, b: { l: 'Uitval', min: 60, max: 200, def: 120 } },
      { key: 'type', type: 'single', label: 'Uitvoering', short: 'Type', choices: [c('std', 'Standaard', 0), c('premium', 'Premium', 150)] },
      { key: 'frame', type: 'color', label: 'Framekleur', short: 'Frame', main: true, choices: frame4() },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('hand', 'Handmatig', 0, { icon: 'crank' }), c('elek', 'Elektrisch', 210, { img: IMG.motor }), c('rts', 'Somfy RTS', 290, { img: IMG.rts })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [c('led', 'LED-verlichting', 250, { icon: 'light' }), c('volant', 'Volant', 110, { icon: 'volant' }), c('winds', 'Windsensor', 180, { icon: 'wind' })] }
    ] }
  };
  var ORDER = ['rolluiken', 'screens', 'veranda', 'pergola', 'knikarm', 'uitval', 'luifel'];

  // Studio-render per product voor de productkeuze-kaarten (fallback = projectfoto)
  var CARD = {
    rolluiken: 'assets/rolluik-rond-antraciet.png',
    screens: 'assets/screen-std-antraciet.png',
    veranda: 'assets/veranda-open-antraciet-glasdak.png',
    pergola: 'assets/pergola-open-antraciet-lamellendak.png',
    knikarm: 'assets/knikarmscherm-antraciet.png',
    uitval: 'assets/uitvalscherm-antraciet.png',
    luifel: 'assets/cassetteluifel-antraciet.png'
  };

  // Nieuw product: Pergola met openschuifbaar doek (eigen referentie-library)
  PRODUCTS.pergoladoek = {
    title: 'Pergola met openschuifbaar doek', img: 'assets/hero-buitenleven.jpg',
    desc: 'Aluminium pergola met verstelbaar schuifdoek.', rate: 900, min: 3500, groups: [
      { key: 'dims', type: 'dims', label: 'Afmetingen', short: 'Afmeting', a: { l: 'Breedte', min: 300, max: 800, def: 400 }, b: { l: 'Diepte', min: 250, max: 500, def: 350 } },
      { key: 'kleur', type: 'color', label: 'Kleur constructie', short: 'Kleur', main: true, choices: frame4() },
      { key: 'doekpositie', type: 'single', label: 'Doekpositie', short: 'Doek', choices: [c('open', 'Volledig open', 0), c('p25', '25% gesloten', 0), c('p50', '50% gesloten', 0), c('p75', '75% gesloten', 0), c('dicht', 'Volledig gesloten', 0)] },
      { key: 'doekkleur', type: 'color', label: 'Doekkleur', short: 'Doekkleur', choices: [c('wit', 'Wit', 0, { hex: '#f4f4f4' }), c('creme', 'Crème', 0, { hex: '#e9e6df' }), c('lichtgrijs', 'Lichtgrijs', 0, { hex: '#c9ccce' }), c('donkergrijs', 'Donkergrijs', 0, { hex: '#595d61' }), c('antraciet', 'Antraciet', 0, { hex: '#3a4651' }), c('zwart', 'Zwart', 0, { hex: '#232323' }), c('taupe', 'Taupe', 0, { hex: '#8b7d6b' })] },
      { key: 'screens', type: 'single', label: 'Screens', short: 'Screens', choices: [c('geen', 'Geen', 0), c('voor', 'Voorzijde', 900), c('links', 'Linkerzijde', 900), c('rechts', 'Rechterzijde', 900), c('rondom', 'Rondom', 2800)] },
      { key: 'glas', type: 'single', label: 'Glazen schuifwanden', short: 'Glas', choices: [c('geen', 'Geen', 0), c('voor', 'Voorzijde', 1200), c('links', 'Linkerzijde', 1200), c('rechts', 'Rechterzijde', 1200), c('rondom', 'Rondom', 3800)] },
      { key: 'verlichting', type: 'single', label: 'Verlichting', short: 'Licht', choices: [c('geen', 'Geen', 0), c('spots', 'LED Spots', 350, { icon: 'light' }), c('warm', 'LED Strip Warm Wit', 450, { icon: 'light' }), c('rgb', 'LED Strip RGB', 600, { icon: 'light' }), c('combi', 'Spots + LED Strip', 800, { icon: 'light' })] },
      { key: 'verwarming', type: 'single', label: 'Verwarming', short: 'Heater', choices: [c('geen', 'Geen', 0), c('1', '1 Heater', 350, { icon: 'heat' }), c('2', '2 Heaters', 650, { icon: 'heat' })] },
      { key: 'bediening', type: 'single', label: 'Bediening', short: 'Bediening', choices: [c('hand', 'Handmatig', 0, { icon: 'crank' }), c('rts', 'Somfy RTS', 290, { img: IMG.rts }), c('io', 'Somfy IO', 360, { img: IMG.app }), c('smart', 'Smartphone bediening', 420, { icon: 'phone' })] },
      { key: 'extra', type: 'multi', label: 'Extra opties', short: 'Opties', choices: [opt('winds', 'Windsensor', 180, 'wind'), opt('regens', 'Regensensor', 160, 'drop'), opt('zonaut', 'Zonautomaat', 220, 'sun')] }
    ]
  };
  ORDER.push('pergoladoek');
  CARD.pergoladoek = 'assets/pergoladoek-gesloten-antraciet.png';

  /* ---- state ---- */
  var S = { step: 0, product: 'rolluiken', w: 0, h: 0, single: {}, multi: {} };
  var STEPS = [];

  function P() { return PRODUCTS[S.product]; }
  function groups() { return P().groups; }
  function dimsGroup() { return groups()[0]; }
  function choiceById(g, id) { for (var i = 0; i < g.choices.length; i++) if (g.choices[i].id === id) return g.choices[i]; return g.choices[0]; }
  function mainColorGroup() { var gs = groups(); for (var i = 0; i < gs.length; i++) if (gs[i].type === 'color' && gs[i].main) return gs[i]; for (i = 0; i < gs.length; i++) if (gs[i].type === 'color') return gs[i]; return null; }
  function area() { return (S.w / 100) * (S.h / 100); }

  function price() {
    var p = P(), base = Math.max(p.min, area() * p.rate);
    groups().forEach(function (g) {
      if (g.type === 'single' || g.type === 'color') { var ch = choiceById(g, S.single[g.key]); if (ch) base += ch.add || 0; }
      else if (g.type === 'multi') { (S.multi[g.key] || []).forEach(function (id) { base += (choiceById(g, id).add || 0); }); }
    });
    return Math.round(base / 10) * 10;
  }

  function buildSteps() {
    STEPS = [{ kind: 'product', short: 'Product' }];
    groups().forEach(function (g) { STEPS.push({ kind: 'group', group: g, short: g.short }); });
    STEPS.push({ kind: 'overzicht', short: 'Overzicht' });
    STEPS.push({ kind: 'offerte', short: 'Offerte' });
  }
  function setProduct(id) {
    S.product = id; S.single = {}; S.multi = {};
    groups().forEach(function (g) {
      if (g.type === 'dims') { S.w = g.a.def; S.h = g.b.def; }
      else if (g.type === 'single' || g.type === 'color') { S.single[g.key] = g.choices[0].id; }
      else if (g.type === 'multi') { S.multi[g.key] = []; }
    });
    buildSteps();
    renderIndicator();
  }

  /* ---- renderers ---- */
  function check() { return '<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span>'; }
  function addLbl(a) { return a ? '+ ' + euro(a) : 'Inbegrepen'; }

  function renderProductGrid() {
    return '<h2 class="step-title">Kies uw product</h2><p class="step-sub">Waarvoor wilt u een offerte op maat?</p><div class="opt-grid">' +
      ORDER.map(function (id) { var p = PRODUCTS[id];
        return '<button class="opt' + (S.product === id ? ' sel' : '') + '" data-product="' + id + '">' + check() +
          '<div class="ph"><img src="' + (CARD[id] || p.img) + '" alt="' + p.title + '" style="object-fit:contain;background:#fff" onerror="this.onerror=null;this.src=\'' + p.img + '\';this.style.objectFit=\'cover\'"></div><div class="ob"><b>' + p.title + '</b><span>' + p.desc + '</span></div></button>';
      }).join('') + '</div>';
  }

  function renderGroup(g) {
    var head = '<h2 class="step-title">' + g.label + '</h2>';
    if (g.type === 'dims') {
      head += '<p class="step-sub">Schuif naar de gewenste maten — u ziet het direct.</p>';
      return head + '<div class="dim-ctrls">' +
        dimRow('w', g.a) + dimRow('h', g.b) +
        '<div class="size-vis"><div class="size-box" id="sizeBox"><span class="wlab" id="sizeW"></span><span class="hlab" id="sizeH"></span></div></div></div>';
    }
    if (g.type === 'color') {
      head += '<p class="step-sub">Kies uw kleur.</p>';
      return head + '<div class="swatches-lg">' + g.choices.map(function (ch) {
        var dot = ch.ral ? '<div class="dot ral"></div>' : '<div class="dot" style="background:' + ch.hex + (ch.id === 'wit' ? ';border-color:#ccc' : '') + '"></div>';
        return '<button class="sw' + (S.single[g.key] === ch.id ? ' sel' : '') + '" data-g="' + g.key + '" data-id="' + ch.id + '">' + dot + '<div class="nm">' + ch.nm + (ch.add ? ' (+' + euro(ch.add) + ')' : '') + '</div></button>';
      }).join('') + '</div>';
    }
    if (g.type === 'single') {
      var hasImg = g.choices.some(function (x) { return x.img; });
      head += '<p class="step-sub">Maak uw keuze.</p>';
      if (hasImg) {
        return head + '<div class="opt-grid">' + g.choices.map(function (ch) {
          var media = ch.img ? '<div class="ph"><img src="' + ch.img + '" alt="' + ch.nm + '"></div>' : '<div class="ph icon">' + (ICON[ch.icon] || ICON.bolt) + '</div>';
          return '<button class="opt' + (S.single[g.key] === ch.id ? ' sel' : '') + '" data-g="' + g.key + '" data-id="' + ch.id + '">' + check() + media +
            '<div class="ob"><b>' + ch.nm + '</b><span class="add">' + addLbl(ch.add) + '</span></div></button>';
        }).join('') + '</div>';
      }
      return head + '<div class="picks">' + g.choices.map(function (ch) {
        return '<button class="pick' + (S.single[g.key] === ch.id ? ' sel' : '') + '" data-g="' + g.key + '" data-id="' + ch.id + '">' + ch.nm +
          (ch.sub ? '<small>' + ch.sub + '</small>' : '') + (ch.add ? '<span class="add">+ ' + euro(ch.add) + '</span>' : '') + '</button>';
      }).join('') + '</div>';
    }
    // multi
    head += '<p class="step-sub">Kies wat u wilt — meerdere mogelijk.</p>';
    return head + '<div class="opt-grid">' + g.choices.map(function (ch) {
      var sel = (S.multi[g.key] || []).indexOf(ch.id) > -1;
      return '<button class="opt' + (sel ? ' sel' : '') + '" data-gm="' + g.key + '" data-id="' + ch.id + '">' + check() +
        '<div class="ph icon">' + (ICON[ch.icon] || ICON.bolt) + '</div><div class="ob"><b>' + ch.nm + '</b><span class="add">' + addLbl(ch.add) + '</span></div></button>';
    }).join('') + '</div>';
  }
  function dimRow(key, cfg) {
    return '<div class="dim-row"><label>' + cfg.l + ' <b id="val' + key + '">' + S[key] + ' cm</b></label>' +
      '<input type="range" id="rng' + key + '" min="' + cfg.min + '" max="' + cfg.max + '" step="5" value="' + S[key] + '"></div>';
  }

  function summaryRows() {
    var rows = '';
    rows += row('Product', P().title);
    groups().forEach(function (g) {
      if (g.type === 'dims') rows += row('Afmetingen (B × ' + g.b.l.charAt(0) + ')', S.w + ' × ' + S.h + ' cm');
      else if (g.type === 'single' || g.type === 'color') rows += row(g.label, choiceById(g, S.single[g.key]).nm);
      else if (g.type === 'multi') { var sel = (S.multi[g.key] || []).map(function (id) { return choiceById(g, id).nm; }); rows += row(g.label, sel.length ? sel.join(', ') : '—'); }
    });
    return rows;
  }
  function row(k, v) { return '<li><span>' + k + '</span><span>' + v + '</span></li>'; }

  function renderOverzicht() {
    var mc = mainColorGroup(), cnm = mc ? choiceById(mc, S.single[mc.key]).nm : '';
    return '<h2 class="step-title">Uw configuratie</h2><p class="step-sub">Klopt alles? Ga door om uw offerte aan te vragen.</p>' +
      '<div class="pv-card" style="max-width:560px"><div class="pv-stage"><img src="' + previewImg() + '" alt="Configuratie">' +
      '<div class="pv-badges"><span>' + S.w + ' × ' + S.h + ' cm</span>' + (cnm ? '<span>' + cnm + '</span>' : '') + '</div></div>' +
      '<div class="pv-body"><ul class="pv-sum">' + summaryRows() + '</ul>' +
      '<div class="pv-price"><span class="lab">Indicatieve richtprijs</span><span class="amt pvAmt">' + euro(price()) + '</span></div>' +
      '<p class="pv-note">Incl. btw &amp; montage · definitieve prijs na gratis inmeten aan huis.</p></div></div>';
  }

  function renderOfferte() {
    return '<h2 class="step-title">Ontvang gratis advies &amp; offerte</h2><p class="step-sub">Vul uw gegevens in — u ontvangt een offerte op maat na gratis inmeten aan huis.</p>' +
      '<form id="leadForm">' +
      '<div class="lead-block"><span class="bl">Persoonsgegevens</span><div class="lead-grid">' +
      '<input class="full" type="text" placeholder="Naam" required>' +
      '<input type="tel" placeholder="Telefoonnummer" required>' +
      '<input type="email" placeholder="E-mailadres" required>' +
      '<input type="text" placeholder="Postcode" required>' +
      '<input type="text" placeholder="Plaats" required></div></div>' +
      '<div class="lead-block"><span class="bl">Projectinformatie</span><div class="radio-row" id="projInfo">' +
      ['Nieuwbouw', 'Bestaande woning', 'Zakelijk pand', 'Appartement'].map(function (x) { return '<label class="radio-chip"><input type="radio" name="proj">' + x + '</label>'; }).join('') +
      '</div></div>' +
      '<div class="lead-block"><span class="bl">Opmerkingen</span><div class="lead-grid"><textarea class="full" placeholder="Bijv. gewenste planning of bijzonderheden"></textarea></div></div>' +
      '<div class="lead-block"><span class="bl">Upload (optioneel)</span><div class="lead-grid">' +
      '<label class="upl full"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg> Foto\'s van de situatie<input type="file" accept="image/*" multiple hidden></label>' +
      '<label class="upl full"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg> Bouwtekening (optioneel)<input type="file" hidden></label></div></div>' +
      '<button class="btn btn-primary btn-lg" type="submit" style="width:100%;max-width:540px">Ontvang gratis advies &amp; offerte ' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      '<div class="trust-mini"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Gratis inmeten</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> Eigen montage</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg> 5,0 op Google</span></div>' +
      '</form>';
  }

  /* ---- preview ---- */
  var MATRIX_COLS = { wit: 1, creme: 1, antraciet: 1, zwart: 1 };
  function productFallback() {
    if (S.product === 'rolluiken') return ROLLUIK_COL_IMG[S.single.kleur] || P().img;
    return P().img;
  }
  function previewImg() {
    if (S.product === 'rolluiken') {
      var kast = S.single.kast, kleur = S.single.kleur;
      if (kast && MATRIX_COLS[kleur]) return 'assets/rolluik-' + kast + '-' + kleur + '.png';
      return productFallback();
    }
    if (S.product === 'screens') {
      var type = S.single.type, cas = S.single.cassette;
      if (type && MATRIX_COLS[cas]) return 'assets/screen-' + type + '-' + cas + '.png';
      return productFallback();
    }
    if (S.product === 'veranda') {
      var vk = S.single.kleur, vo = S.multi.extra || [];
      var uit = (vo.indexOf('zip') > -1) ? 'glaswand-screens' : (vo.indexOf('schuif') > -1 ? 'glaswand' : 'open');
      if (MATRIX_COLS[vk]) return 'assets/veranda-' + uit + '-' + vk + '-glasdak.png';
      return productFallback();
    }
    if (S.product === 'pergola') {
      var pk = S.single.kleur, po = S.multi.extra || [], led = (S.single.verlichting === 'spots' || S.single.verlichting === 'strip');
      if (MATRIX_COLS[pk]) {
        var pu = (po.indexOf('zip') > -1 && led) ? 'luxe' : (po.indexOf('zip') > -1 ? 'screens' : 'open');
        return 'assets/pergola-' + pu + '-' + pk + '-lamellendak.png';
      }
      return productFallback();
    }
    if (S.product === 'knikarm') { var kc = S.single.frame; if (MATRIX_COLS[kc]) return 'assets/knikarmscherm-' + kc + '.png'; return productFallback(); }
    if (S.product === 'uitval') { var uc = S.single.frame; if (MATRIX_COLS[uc]) return 'assets/uitvalscherm-' + uc + '.png'; return productFallback(); }
    if (S.product === 'luifel') { var lc = S.single.frame; if (MATRIX_COLS[lc]) return 'assets/cassetteluifel-' + lc + '.png'; return productFallback(); }
    if (S.product === 'pergoladoek') {
      var dk = S.single.kleur;
      if (MATRIX_COLS[dk]) {
        var led = S.single.verlichting && S.single.verlichting !== 'geen';
        var scr = S.single.screens && S.single.screens !== 'geen';
        var st;
        if (scr && led) st = 'luxe';
        else if (scr) st = 'screens';
        else { var dp = S.single.doekpositie; st = (dp === 'open') ? 'open' : ((dp === 'p25' || dp === 'p50') ? 'half' : 'gesloten'); }
        return 'assets/pergoladoek-' + st + '-' + dk + '.png';
      }
      return productFallback();
    }
    return P().img;
  }
  function updatePreview() {
    var img = $('#pvImg');
    if (img && img.getAttribute('src') !== previewImg()) {
      img.style.opacity = 0;
      img.onerror = function () { this.onerror = null; this.src = productFallback(); };
      setTimeout(function () { img.src = previewImg(); img.style.opacity = 1; }, 120);
    }
    if ($('#pvSize')) $('#pvSize').textContent = S.w + ' × ' + S.h + ' cm';
    var mc = mainColorGroup(), ch = mc ? choiceById(mc, S.single[mc.key]) : null;
    if ($('#pvColor')) $('#pvColor').innerHTML = ch ? ((ch.hex ? '<i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:' + ch.hex + ';border:1px solid #ccc;margin-right:6px;vertical-align:-1px"></i>' : '') + ch.nm) : '—';
    if ($('#pvSum')) $('#pvSum').innerHTML = summaryRows();
    var pr = price(); $$('.pvAmt').forEach(function (e) { e.textContent = euro(pr); });
  }

  /* ---- indicator + steps ---- */
  function renderIndicator() {
    $('#cfgSteps').innerHTML = STEPS.map(function (s, i) {
      return '<button class="s" data-i="' + i + '"><span class="n">' + (i + 1) + '</span> ' + s.short + '</button>';
    }).join('');
  }
  function sizeVis() {
    var g = dimsGroup(), maxW = 280, maxH = 180, scale = Math.min(maxW / g.a.max, maxH / g.b.max);
    if ($('#sizeBox')) { $('#sizeBox').style.width = Math.max(40, S.w * scale) + 'px'; $('#sizeBox').style.height = Math.max(40, S.h * scale) + 'px'; $('#sizeW').textContent = S.w + ' cm'; $('#sizeH').textContent = S.h + ' cm'; }
  }

  function renderStep() {
    var st = STEPS[S.step], html;
    if (st.kind === 'product') html = renderProductGrid();
    else if (st.kind === 'group') html = renderGroup(st.group);
    else if (st.kind === 'overzicht') html = renderOverzicht();
    else html = renderOfferte();
    var body = $('#stepBody'); body.innerHTML = html; body.classList.remove('step-pane'); void body.offsetWidth; body.classList.add('step-pane', 'active');
    if (st.kind === 'group' && st.group.type === 'dims') { bindDims(); sizeVis(); }
    if (st.kind === 'offerte') bindLead();
  }
  function go(n) {
    S.step = Math.max(0, Math.min(STEPS.length - 1, n));
    renderStep();
    $$('#cfgSteps .s').forEach(function (s, i) { s.classList.toggle('active', i === S.step); s.classList.toggle('done', i < S.step); });
    $('#cfgFill').style.width = ((S.step + 1) / STEPS.length * 100) + '%';
    $('#btnBack').style.visibility = S.step === 0 ? 'hidden' : 'visible';
    var last = S.step === STEPS.length - 1;
    $$('.btnNext').forEach(function (b) { b.style.display = last ? 'none' : ''; });
    updatePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function bindDims() {
    ['w', 'h'].forEach(function (key) {
      var r = $('#rng' + key); if (!r) return;
      r.addEventListener('input', function () { S[key] = +this.value; $('#val' + key).textContent = S[key] + ' cm'; sizeVis(); updatePreview(); });
    });
  }
  function bindLead() {
    var f = $('#leadForm'); if (!f) return;
    $$('#projInfo .radio-chip').forEach(function (l) { l.addEventListener('click', function () { $$('#projInfo .radio-chip').forEach(function (x) { x.classList.remove('on'); }); l.classList.add('on'); }); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      $('#stepBody').innerHTML = '<div style="text-align:center;padding:50px 10px"><div style="width:72px;height:72px;border-radius:50%;background:rgba(245,130,31,.14);color:var(--orange-600);display:grid;place-items:center;margin:0 auto 18px"><svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg></div><h2 style="margin-bottom:8px">Bedankt voor uw aanvraag!</h2><p style="max-width:460px;margin:0 auto">Uw configuratie en gegevens komen in de echte website direct bij Lucky binnen. We nemen binnen 1 werkdag contact op voor een exacte offerte na gratis inmeten. <em>(demo)</em></p></div>';
      $('.cfg-nav').style.display = 'none'; var bar = $('.cfg-bar'); if (bar) bar.style.display = 'none';
    });
  }

  /* ---- events ---- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-product],[data-g],[data-gm]');
    if (!t) return;
    if (t.hasAttribute('data-product')) { setProduct(t.getAttribute('data-product')); renderStep(); }
    else if (t.hasAttribute('data-g')) { S.single[t.getAttribute('data-g')] = t.getAttribute('data-id'); renderStep(); }
    else if (t.hasAttribute('data-gm')) { var k = t.getAttribute('data-gm'), id = t.getAttribute('data-id'), a = S.multi[k] || (S.multi[k] = []), i = a.indexOf(id); if (i > -1) a.splice(i, 1); else a.push(id); renderStep(); }
    // keep active state on current step after re-render
    $$('#cfgSteps .s').forEach(function (s, i) { s.classList.toggle('active', i === S.step); s.classList.toggle('done', i < S.step); });
    updatePreview();
  });
  $$('.btnNext').forEach(function (b) { b.addEventListener('click', function () { go(S.step + 1); }); });
  $('#btnBack').addEventListener('click', function () { go(S.step - 1); });
  $('#cfgSteps').addEventListener('click', function (e) { var s = e.target.closest('.s'); if (!s) return; var i = +s.getAttribute('data-i'); if (i <= S.step) go(i); });

  /* ---- init ---- */
  setProduct('rolluiken');
  go(0);
})();
