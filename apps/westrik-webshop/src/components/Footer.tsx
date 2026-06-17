import { Link } from 'react-router-dom';
import { Flame, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { categories } from '../data/categories';

const cols = [
  {
    title: 'Producten',
    links: categories.slice(0, 5).map((c) => ({ to: `/${c.slug}`, label: c.title })),
  },
  {
    title: 'Service',
    links: [
      { to: '/onderhoud', label: 'Onderhoud' },
      { to: '/storingsdienst', label: 'Storingsdienst' },
      { to: '/installatieservice', label: 'Installatieservice' },
      { to: '/zakelijk', label: 'Zakelijk' },
      { to: '/keuzehulp', label: 'Keuzehulp' },
    ],
  },
  {
    title: 'Over Westrik',
    links: [
      { to: '/over-ons', label: 'Over ons' },
      { to: '/faq', label: 'Veelgestelde vragen' },
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact' },
      { to: '/offerte', label: 'Offerte aanvragen' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800">
              <Flame className="text-sky-accent" size={20} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold text-white">Westrik</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-400">Installaties</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">
            Dé specialist in CV-ketels, boilers en warmwateroplossingen. Levering, installatie en onderhoud door
            gecertificeerde monteurs — door heel Nederland.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href="tel:+31850001234" className="flex items-center gap-2 hover:text-white">
              <Phone size={15} className="text-sky-accent" /> 085 000 1234
            </a>
            <a href="mailto:offerte@westrik.nl" className="flex items-center gap-2 hover:text-white">
              <Mail size={15} className="text-sky-accent" /> offerte@westrik.nl
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-sky-accent" /> Heel Nederland — montage aan huis
            </span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">{col.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-navy-300 hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-navy-800">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-xs text-navy-400 md:flex-row">
          <span>© {new Date().getFullYear()} Westrik Installaties. KvK 12345678 · Erkend installateur.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-sky-accent" /> Sterkin & Gastec QA</span>
            <span>iDEAL · Bancontact · Klarna · Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
