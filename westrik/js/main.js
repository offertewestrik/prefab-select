/* =====================================================================
   WESTRIK BOUW & INSTALLATIES — interacties
   Vanilla JS, geen dependencies
   ===================================================================== */
(function () {
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  const header = $('.header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobiel menu ---------- */
  const menu = $('.mobile-menu');
  const openBtn = $('.nav__toggle');
  const closeBtn = $('.mobile-menu__close');
  const toggle = (open) => {
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (openBtn) openBtn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggle(false)));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ---------- Tellers ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1400;
    const start = performance.now();
    const fmt = (n) => n.toLocaleString('nl-NL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduceMotion) { el.textContent = prefix + fmt(target) + suffix; return; }
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + fmt(target) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq__item').forEach(item => {
    const q = $('.faq__q', item);
    const a = $('.faq__a', item);
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('.faq__item').forEach(other => {
        other.classList.remove('open');
        $('.faq__a', other).style.maxHeight = null;
      });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  /* ---------- Subtiele parallax op hero-media ---------- */
  const heroMedia = $('.hero__media');
  if (heroMedia && !reduceMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroMedia.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.05)';
    }, { passive: true });
  }

  /* ---------- Offerteformulier ---------- */
  const form = $('#offerteForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const naam = (data.get('voornaam') || '') + ' ' + (data.get('achternaam') || '');
      const onderwerp = encodeURIComponent('Offerteaanvraag via website — ' + naam.trim());
      const body = encodeURIComponent(
        'Naam: ' + naam.trim() + '\n' +
        'E-mail: ' + (data.get('email') || '') + '\n' +
        'Telefoon: ' + (data.get('telefoon') || '') + '\n' +
        'Adres: ' + (data.get('adres') || '') + '\n' +
        'Dienst: ' + (data.get('dienst') || '') + '\n\n' +
        'Omschrijving:\n' + (data.get('bericht') || '')
      );
      const note = $('#formNote');
      if (note) { note.classList.add('ok'); note.textContent = 'Bedankt! Je mailprogramma opent met je aanvraag. Verstuur de e-mail om je offerte af te ronden — we reageren op werkdagen binnen één werkdag.'; }
      window.location.href = 'mailto:info@westrik-installaties.nl?subject=' + onderwerp + '&body=' + body;
    });
  }

  /* ---------- Jaartal footer ---------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
