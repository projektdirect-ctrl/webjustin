import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SiteTexts } from '../../pages/AdminPanel';
import EditableText from './EditableText';

interface Props {
  texts: SiteTexts;
  updateText: (key: string, val: string) => void;
}

const D = (texts: SiteTexts, key: string, fallback: string) => texts[key] ?? fallback;

export default function AdminContact({ texts, updateText }: Props) {
  return (
    <section id="kontakt" className="py-16 sm:py-24 lg:py-28 bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 border-2 border-white/5 rotate-12" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 border-2 border-amber-400/5 -rotate-6" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
              Kontakt
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight mb-6">
              <EditableText value={D(texts, 'contact_title_line1', 'Pojďme si')} onChange={v => updateText('contact_title_line1', v)} className="text-white font-black uppercase" /><br />
              <span className="text-amber-400">
                <EditableText value={D(texts, 'contact_title_line2', 'o tom říct.')} onChange={v => updateText('contact_title_line2', v)} className="text-amber-400 font-black uppercase" />
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              <EditableText
                value={D(texts, 'contact_subtitle', 'Ozvěte se nám — rádi vám připravíme bezplatnou cenovou nabídku. Pracujeme po celé ČR, primárně v Ústeckém kraji.')}
                onChange={v => updateText('contact_subtitle', v)}
                multiline
                className="text-white/60 text-lg leading-relaxed"
              />
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-5 group">
                <div className="bg-amber-400 p-4 shrink-0">
                  <Phone className="h-6 w-6 text-blue-950" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Telefon</div>
                  <div className="text-white text-xl sm:text-2xl font-black">
                    <EditableText value={D(texts, 'contact_phone', '+420 739 389 993')} onChange={v => updateText('contact_phone', v)} className="text-white font-black" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="bg-amber-400 p-4 shrink-0">
                  <Mail className="h-6 w-6 text-blue-950" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</div>
                  <div className="text-white text-xl sm:text-2xl font-black">
                    <EditableText value={D(texts, 'contact_email', 'jrbprace@seznam.cz')} onChange={v => updateText('contact_email', v)} className="text-white font-black" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-5">
                <div className="bg-amber-400 p-4 shrink-0">
                  <Clock className="h-6 w-6 text-blue-950" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Pracovní doba</div>
                  <div className="text-white text-lg sm:text-xl font-black">
                    <EditableText value={D(texts, 'contact_hours_main', 'Po–Pá: 7:00 – 18:00')} onChange={v => updateText('contact_hours_main', v)} className="text-white font-black" />
                  </div>
                  <div className="text-white/50 text-sm">
                    <EditableText value={D(texts, 'contact_hours_sub', 'So: po domluvě')} onChange={v => updateText('contact_hours_sub', v)} className="text-white/50 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-900/50 border border-white/10 p-8">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Oblast působení</div>
                  <div className="text-white text-xl font-black mb-1">
                    <EditableText value={D(texts, 'contact_area_main', 'Celá Česká republika')} onChange={v => updateText('contact_area_main', v)} className="text-white font-black" />
                  </div>
                  <div className="text-amber-400 font-bold">
                    <EditableText value={D(texts, 'contact_area_sub', 'Primárně Ústecký kraj')} onChange={v => updateText('contact_area_sub', v)} className="text-amber-400 font-bold" />
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mb-6" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {['Ústí nad Labem', 'Děčín', 'Most', 'Chomutov', 'Teplice', 'Litoměřice', 'Louny', 'a okolí'].map(city => (
                  <div key={city} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rotate-45 shrink-0" />
                    <span className="text-white/70">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-400 p-8">
              <div className="text-blue-950 text-2xl font-black uppercase mb-2">
                <EditableText value={D(texts, 'contact_cta_title', 'Chcete nacenit projekt?')} onChange={v => updateText('contact_cta_title', v)} className="text-blue-950 font-black uppercase" />
              </div>
              <p className="text-blue-900/70 text-sm mb-4">
                <EditableText
                  value={D(texts, 'contact_cta_text', 'Zavolejte nebo napište — ozveme se vám do 24 hodin s bezplatnou nabídkou.')}
                  onChange={v => updateText('contact_cta_text', v)}
                  multiline
                  className="text-blue-900/70 text-sm"
                />
              </p>
              <span className="inline-flex items-center space-x-2 bg-blue-950 text-white px-6 py-3 font-black uppercase tracking-wider text-sm">
                <Phone className="h-4 w-4" />
                <EditableText value={D(texts, 'contact_cta_btn', 'Zavolat hned')} onChange={v => updateText('contact_cta_btn', v)} className="text-white font-black uppercase tracking-wider text-sm" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
