/* Lucky Zonwering — premium interactions */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Header scroll state + sticky CTA + parallax hero */
  var hdr = $('.hdr'), sticky = $('.sticky-cta'), heroBg = $('.hero-bg'), hero = $('.hero');
  /* Respect reduced-motion: keep the poster frame, no looping video */
  if (heroBg && heroBg.tagName === 'VIDEO' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try { heroBg.removeAttribute('autoplay'); heroBg.pause(); } catch (e) {}
  }
  function onScroll() {
    var y = window.pageYOffset;
    if (hdr) hdr.classList.toggle('scrolled', y > 40);
    if (sticky && hero) sticky.classList.toggle('show', y > hero.offsetHeight * 0.7);
    if (heroBg && y < window.innerHeight) heroBg.style.transform = 'translateY(' + (y * 0.18) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  $$('.reveal, .stagger').forEach(function (el) { io.observe(el); });

  /* Animated counters */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseFloat(el.getAttribute('data-target'));
      var dec = el.getAttribute('data-dec') === '1';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1600, start = performance.now();
      function fmt(v) { return (dec ? v.toFixed(1).replace('.', ',') : Math.round(v).toString()) + suffix; }
      function tick(now) {
        var p = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * ease);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-target]').forEach(function (el) { cio.observe(el); });

  /* Before / after slider */
  $$('.ba').forEach(function (ba) {
    var range = $('input[type=range]', ba), after = $('.after', ba), div = $('.divider', ba), handle = $('.handle', ba);
    function set(v) { after.style.clipPath = 'inset(0 0 0 ' + v + '%)'; div.style.left = v + '%'; handle.style.left = v + '%'; }
    if (range) { range.addEventListener('input', function () { set(this.value); }); set(range.value); }
  });

  /* Reviews carousel */
  var track = $('.rev-track');
  if (track) {
    var prev = $('[data-rev=prev]'), next = $('[data-rev=next]');
    var step = function () { return Math.min(360, track.clientWidth * 0.85); };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* FAQ accordion */
  $$('.qa button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var qa = btn.parentElement, ans = $('.ans', qa), open = qa.classList.contains('open');
      $$('.qa.open').forEach(function (o) { o.classList.remove('open'); $('.ans', o).style.maxHeight = null; });
      if (!open) { qa.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });

  /* Product filter */
  $$('.filter').forEach(function (f) {
    f.addEventListener('click', function () {
      $$('.filter').forEach(function (x) { x.classList.remove('active'); });
      f.classList.add('active');
      var cat = f.getAttribute('data-cat');
      $$('.masonry .tile').forEach(function (t) {
        t.style.display = (cat === 'all' || t.getAttribute('data-cat') === cat) ? '' : 'none';
      });
    });
  });

  /* Mobile nav */
  var burger = $('.burger'), mnav = $('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () { mnav.classList.add('show'); });
    $$('.mnav a, .mnav .x').forEach(function (a) { a.addEventListener('click', function () { mnav.classList.remove('show'); }); });
  }

  /* Exit-intent popup (once per sessie) */
  var modal = $('#exitModal');
  if (modal) {
    var shown = false;
    function show() { if (shown || sessionStorage.getItem('luckyExit')) return; shown = true; modal.classList.add('show'); sessionStorage.setItem('luckyExit', '1'); }
    document.addEventListener('mouseout', function (e) { if (e.clientY <= 0 && !e.relatedTarget) show(); });
    setTimeout(function () { /* fallback op mobiel */ if (window.innerWidth < 800) setTimeout(show, 25000); }, 0);
    $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', function () { modal.classList.remove('show'); }); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('show'); });
  }

  /* Forms: nette demo-bevestiging (geen backend) */
  $$('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      f.innerHTML = '<div style="text-align:center;padding:10px"><strong>Bedankt!</strong><br>In de echte site komt uw aanvraag direct bij Lucky binnen. (demo)</div>';
    });
  });
})();
