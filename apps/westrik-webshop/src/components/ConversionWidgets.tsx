import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, FileText, X } from 'lucide-react';

export function FloatingActions() {
  const [openMobileBar, setOpenMobileBar] = useState(true);

  return (
    <>
      {/* Desktop: floating action stack */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex">
        <a
          href="https://wa.me/31850001234"
          target="_blank"
          rel="noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-105"
          aria-label="WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
        <a
          href="tel:+31850001234"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-white shadow-glow transition-transform hover:scale-105"
          aria-label="Bel direct"
        >
          <Phone size={22} />
        </a>
        <Link
          to="/offerte"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-accent text-white shadow-glow transition-transform hover:scale-105"
          aria-label="Offerte aanvragen"
        >
          <FileText size={22} />
        </Link>
      </div>

      {/* Mobile: sticky bottom bar */}
      {openMobileBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
          <div className="m-3 flex items-center gap-2 rounded-2xl bg-navy-900 p-2 shadow-glow">
            <a href="tel:+31850001234" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy-700 py-3 text-sm font-semibold text-white">
              <Phone size={16} /> Bel
            </a>
            <a href="https://wa.me/31850001234" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white">
              <MessageCircle size={16} /> App
            </a>
            <Link to="/offerte" className="flex flex-[1.4] items-center justify-center gap-2 rounded-xl bg-sky-accent py-3 text-sm font-semibold text-white">
              <FileText size={16} /> Offerte
            </Link>
            <button onClick={() => setOpenMobileBar(false)} className="px-1 text-navy-400" aria-label="Sluiten">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return null;
}
