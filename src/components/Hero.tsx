import { ArrowDown, Shield, Clock, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-blue-950">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-950/50" />

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 border-4 border-amber-400/10 rotate-12" />
        <div className="absolute bottom-20 left-10 w-48 h-48 border-4 border-amber-400/10 -rotate-6" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-amber-400/20 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 px-4 py-2 mb-6 md:mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Ústecký kraj & celá ČR</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-none mb-6 md:mb-8">
              Stav<span className="text-amber-400">a</span>říme
              <br />
              <span className="text-blue-300">pořádně.</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-xl">
              Kompletní rekonstrukce domů, obklady, zámková dlažba, sádrokartony
              a zednické práce všeho druhu. Práci děláme poctivě a na čas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-12">
              <a
                href="#kontakt"
                className="bg-amber-400 text-blue-950 px-7 py-4 font-black uppercase tracking-widest hover:bg-amber-300 transition-colors text-sm text-center"
              >
                Chci nacenit projekt
              </a>
              <a
                href="#sluzby"
                className="border-2 border-white/30 text-white px-7 py-4 font-bold uppercase tracking-wider hover:border-amber-400 hover:text-amber-400 transition-colors text-sm text-center"
              >
                Co umíme
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">10+</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-1">Let zkušeností</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">200+</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-1">Dokončených projektů</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-white/50 text-xs uppercase tracking-wider mt-1">Spokojených klientů</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-amber-400/30" />
              <img
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Rekonstrukce"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-400 p-6 max-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-blue-950 fill-blue-950" />
                  ))}
                </div>
                <p className="text-blue-950 font-black text-sm uppercase tracking-wide">Ověřená kvalita</p>
                <p className="text-blue-900/70 text-xs mt-1">Stovky spokojených zákazníků</p>
              </div>
            </div>

            <div className="absolute -bottom-12 -left-8 bg-blue-900 border border-white/10 p-4 flex items-center space-x-3">
              <Shield className="h-8 w-8 text-amber-400 shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Garance kvality</div>
                <div className="text-white/50 text-xs">Záruka na odvedenou práci</div>
              </div>
            </div>
            <div className="absolute -top-8 right-0 bg-blue-900 border border-white/10 p-4 flex items-center space-x-3">
              <Clock className="h-8 w-8 text-amber-400 shrink-0" />
              <div>
                <div className="text-white font-bold text-sm">Dodržení termínů</div>
                <div className="text-white/50 text-xs">Vždy na čas</div>
              </div>
            </div>
          </div>
        </div>

        <a href="#o-nas" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-amber-400 transition-colors animate-bounce">
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
