import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, GitCompareArrows, Flame } from 'lucide-react';
import { categories } from '../data/categories';
import { Button } from './ui';
import { useCompare } from '../lib/compare';

const mainNav = [
  { to: '/cv-ketels', label: 'CV-Ketels' },
  { to: '/boilers', label: 'Boilers' },
  { to: '/hybride-warmtepompen', label: 'Warmtepompen' },
  { to: '/keuzehulp', label: 'Keuzehulp' },
  { to: '/onderhoud', label: 'Onderhoud' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCompare();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-white'
      }`}
    >
      {/* Topbar */}
      <div className="hidden bg-navy-900 text-navy-100 md:block">
        <div className="container-wide flex items-center justify-between py-2 text-xs">
          <span>Gratis advies &amp; landelijke installatie door gecertificeerde monteurs</span>
          <div className="flex items-center gap-5">
            <a href="tel:+31850001234" className="flex items-center gap-1.5 hover:text-white">
              <Phone size={13} /> 085 000 1234
            </a>
            <span className="text-navy-300">|</span>
            <span>★ 4,9 — 1.842 reviews</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-wide flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900">
            <Flame className="text-sky-accent" size={20} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-tight text-navy-900">Westrik</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-silver-500">Installaties</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-navy-700' : 'text-navy-900 hover:text-navy-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/vergelijken"
            className="relative hidden h-11 w-11 items-center justify-center rounded-xl border border-silver-200 text-navy-700 hover:bg-navy-50 sm:flex"
            aria-label="Vergelijken"
          >
            <GitCompareArrows size={18} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-accent text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Button to="/offerte" size="sm" className="hidden sm:inline-flex">
            Offerte aanvragen
          </Button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-silver-200 text-navy-800 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-silver-100 bg-white lg:hidden">
          <div className="container-wide grid gap-1 py-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-50"
              >
                {c.title}
              </Link>
            ))}
            <Link to="/keuzehulp" className="rounded-lg px-3 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-50">
              Keuzehulp
            </Link>
            <Link to="/vergelijken" className="rounded-lg px-3 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-50">
              Vergelijken {count > 0 && `(${count})`}
            </Link>
            <Button to="/offerte" className="mt-2">Offerte aanvragen</Button>
          </div>
        </div>
      )}
    </header>
  );
}
