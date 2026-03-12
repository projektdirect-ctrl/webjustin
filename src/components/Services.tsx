import { Home, Square, Grid3X3, Layout, Hammer, Wrench } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Kompletní rekonstrukce domu',
    desc: 'Od projektu po kolaudaci. Kompletně zajistíme celkovou rekonstrukci vašeho domu nebo bytu — bourací práce, zdění, instalace, obklady, podlahy i malování.',
    tags: ['Domy', 'Byty', 'Komerční prostory'],
    img: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Square,
    title: 'Obklady a dlažby',
    desc: 'Profesionální pokládka obkladů a dlažeb. Koupelny, kuchyně, chodby, terasy — přesná práce s důrazem na detail a spárování.',
    tags: ['Koupelny', 'Kuchyně', 'Terasy'],
    img: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Grid3X3,
    title: 'Zámková dlažba',
    desc: 'Pokládka zámkové dlažby pro příjezdové cesty, dvorky, chodníky a parkovací plochy. Pečlivá příprava podkladu a přesné kladení.',
    tags: ['Příjezdové cesty', 'Dvorky', 'Parkoviště'],
    img: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Layout,
    title: 'Sádrokartony',
    desc: 'Montáž SDK příček, podhledů, šikmých stropů a obkladů. Podhledy pro vedení kabeláže, topení i vzduchotechniky. Kompletní dokončovací práce.',
    tags: ['Příčky', 'Podhledy', 'Obklady stěn'],
    img: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Hammer,
    title: 'Zednické práce všeho druhu',
    desc: 'Zdění, omítky, štuky, betonáže, bourací práce, spravování trhlin a povrchů. Opravy po vodním poškození. Nic nás nezaskočí.',
    tags: ['Zdění', 'Omítky', 'Bourání'],
    img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Wrench,
    title: 'Další stavební práce',
    desc: 'Zateplení fasád, malířské práce, pokládka plovoucích podlah, montáž oken a dveří. Jsme váš partner pro veškeré stavební práce.',
    tags: ['Zateplení', 'Malování', 'Podlahy'],
    img: 'https://images.pexels.com/photos/1029766/pexels-photo-1029766.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="py-16 sm:py-24 lg:py-28 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
              Služby
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              Co<br />
              <span className="text-amber-400">umíme</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-base leading-relaxed">
            Kompletní stavební řešení pod jednou střechou. Nemusíte shánět pět různých firem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-blue-900/50 border border-white/5 hover:border-amber-400/30 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-amber-400 p-2">
                  <s.icon className="h-5 w-5 text-blue-950" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black text-white uppercase mb-3 leading-tight">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs font-bold text-amber-400/80 border border-amber-400/20 px-2 py-1 uppercase tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
