import { useState, useEffect } from 'react';
import { Hammer, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#o-nas', label: 'O nás' },
    { href: '#sluzby', label: 'Služby' },
    { href: '#jak-pracujeme', label: 'Jak pracujeme' },
    { href: '#galerie', label: 'Galerie' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-blue-950 shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="bg-amber-400 p-2 rounded rotate-3 group-hover:rotate-0 transition-transform">
              <Hammer className="h-6 w-6 text-blue-950" />
            </div>
            <div>
              <span className="text-white font-black text-2xl uppercase tracking-widest">Stavařina</span>
              <div className="h-0.5 w-0 group-hover:w-full bg-amber-400 transition-all duration-300" />
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-amber-400 transition-colors font-semibold uppercase text-sm tracking-wider"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="bg-amber-400 text-blue-950 px-5 py-2 font-black uppercase tracking-wider text-sm hover:bg-amber-300 transition-colors"
            >
              Poptávka
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-blue-950 border-t border-white/10 px-4 pb-6 pt-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-amber-400 py-3 font-semibold uppercase tracking-wider text-sm border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="block mt-4 bg-amber-400 text-blue-950 px-5 py-3 font-black uppercase tracking-wider text-sm text-center"
          >
            Poptávka
          </a>
        </div>
      )}
    </nav>
  );
}
