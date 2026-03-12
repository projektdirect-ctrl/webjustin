import { CheckCircle2 } from 'lucide-react';

const perks = [
  'Poctivé zpracování každého detailu',
  'Transparentní ceny bez skrytých poplatků',
  'Dodržování dohodnutých termínů',
  'Vlastní zkušení pracovní tým',
  'Práce po celé ČR, důraz na Ústecký kraj',
  'Bezplatná konzultace a cenová nabídka',
];

export default function About() {
  return (
    <section id="o-nas" className="py-16 sm:py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative mx-4 sm:mx-8 lg:mx-0">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Pracovní tým"
                className="w-full h-72 sm:h-96 lg:h-[480px] object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 sm:w-64 h-48 sm:h-64 bg-blue-950 z-0" />
            <div className="hidden sm:block absolute -top-8 -left-8 w-20 sm:w-32 h-20 sm:h-32 bg-amber-400 z-0" />

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white border-l-4 border-amber-400 p-4 sm:p-5 shadow-xl z-20 max-w-[200px] sm:max-w-xs">
              <div className="text-3xl sm:text-4xl font-black text-blue-950">10+</div>
              <div className="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1">Let na trhu</div>
              <div className="text-gray-400 text-xs mt-1">Stavíme a rekonstruujeme od roku 2014</div>
            </div>
          </div>

          <div>
            <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
              O nás
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-blue-950 uppercase leading-tight mb-6">
              Stavíme tak,<br />
              <span className="text-blue-600">jak bychom stavěli</span><br />
              pro sebe.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Jsme parta zkušených řemeslníků z Ústeckého kraje. Každý projekt bereme vážně —
              od prvního telefonátu až po předání klíčů. Bez keců, bez výmluv.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Za léta praxe jsme zrekonstruovali stovky domů, bytů, zahrad i komerčních prostor.
              Práci si ceníme a naši zákazníci se k nám rádi vracejí.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
