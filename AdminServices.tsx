import { Hammer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-400 p-2">
            <Hammer className="h-5 w-5 text-blue-950" />
          </div>
          <span className="text-xl font-black uppercase tracking-widest">Stavařina</span>
        </div>

        <div className="flex flex-wrap gap-6 text-white/40 text-xs uppercase tracking-widest font-bold">
          <a href="#o-nas" className="hover:text-amber-400 transition-colors">O nás</a>
          <a href="#sluzby" className="hover:text-amber-400 transition-colors">Služby</a>
          <a href="#jak-pracujeme" className="hover:text-amber-400 transition-colors">Jak pracujeme</a>
          <a href="#galerie" className="hover:text-amber-400 transition-colors">Galerie</a>
          <a href="#kontakt" className="hover:text-amber-400 transition-colors">Kontakt</a>
        </div>

        <div className="text-white/30 text-xs flex items-center gap-2">
          © {new Date().getFullYear()} Stavařina. Všechna práva vyhrazena.
          <a
            href="/admin"
            className="text-white/8 hover:text-white/15 transition-colors select-none"
            tabIndex={-1}
            aria-hidden="true"
          >
            ·
          </a>
        </div>
      </div>
    </footer>
  );
}
