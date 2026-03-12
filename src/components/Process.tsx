const steps = [
  {
    num: '01',
    title: 'Kontaktujte nás',
    desc: 'Zavolejte nebo napište. Řeknete nám co potřebujete a domluvíme se na schůzce.',
  },
  {
    num: '02',
    title: 'Prohlídka a nacenění',
    desc: 'Přijedeme na místo, prohlédneme si rozsah prací a připravíme nezávaznou cenovou nabídku zdarma.',
  },
  {
    num: '03',
    title: 'Zahájení prací',
    desc: 'Po odsouhlasení nabídky domluvíme termín zahájení a pustíme se do práce. Žádné zbytečné čekání.',
  },
  {
    num: '04',
    title: 'Předání hotového díla',
    desc: 'Vše uklidíme po sobě a dílo předáme. Jsme k dispozici pro případné dotazy i po dokončení.',
  },
];

export default function Process() {
  return (
    <section id="jak-pracujeme" className="py-16 sm:py-24 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
            Jak pracujeme
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-blue-950 uppercase leading-tight">
            Od poptávky<br />
            <span className="text-blue-600">po klíče v ruce</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((s, i) => (
            <div key={s.num} className="relative p-6 sm:p-8 group border-b sm:border-b-0 border-blue-100 last:border-0">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 right-0 w-full h-px bg-blue-200 z-0" />
              )}
              <div className="relative z-10">
                <div className="text-7xl font-black text-blue-100 group-hover:text-amber-400/20 transition-colors leading-none mb-4 select-none">
                  {s.num}
                </div>
                <div className="w-10 h-1 bg-amber-400 mb-5" />
                <h3 className="text-xl font-black text-blue-950 uppercase mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
