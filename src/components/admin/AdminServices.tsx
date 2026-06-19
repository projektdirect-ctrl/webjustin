import { useState, useRef } from 'react';
import { Home, Square, Grid3x3 as Grid3X3, LayoutGrid as Layout, Hammer, Wrench, Upload, Link, X, Check, Camera } from 'lucide-react';
import { SiteTexts } from '../../pages/AdminPanel';
import EditableText from './EditableText';
import { supabase } from '../../lib/supabase';

interface Props {
  texts: SiteTexts;
  updateText: (key: string, val: string) => void;
}

const D = (texts: SiteTexts, key: string, fallback: string) => texts[key] ?? fallback;

const icons = [Home, Square, Grid3X3, Layout, Hammer, Wrench];

const serviceDefaults = [
  {
    titleKey: 'service1_title', titleDefault: 'Kompletní rekonstrukce domu',
    descKey: 'service1_desc', descDefault: 'Od projektu po kolaudaci. Kompletně zajistíme celkovou rekonstrukci vašeho domu nebo bytu — bourací práce, zdění, instalace, obklady, podlahy i malování.',
    tagsKey: 'service1_tags', tagsDefault: 'Domy, Byty, Komerční prostory',
    imgKey: 'service1_img', imgDefault: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    titleKey: 'service2_title', titleDefault: 'Obklady a dlažby',
    descKey: 'service2_desc', descDefault: 'Profesionální pokládka obkladů a dlažeb. Koupelny, kuchyně, chodby, terasy — přesná práce s důrazem na detail a spárování.',
    tagsKey: 'service2_tags', tagsDefault: 'Koupelny, Kuchyně, Terasy',
    imgKey: 'service2_img', imgDefault: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    titleKey: 'service3_title', titleDefault: 'Zámková dlažba',
    descKey: 'service3_desc', descDefault: 'Pokládka zámkové dlažby pro příjezdové cesty, dvorky, chodníky a parkovací plochy. Pečlivá příprava podkladu a přesné kladení.',
    tagsKey: 'service3_tags', tagsDefault: 'Příjezdové cesty, Dvorky, Parkoviště',
    imgKey: 'service3_img', imgDefault: 'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    titleKey: 'service4_title', titleDefault: 'Sádrokartony',
    descKey: 'service4_desc', descDefault: 'Montáž SDK příček, podhledů, šikmých stropů a obkladů. Podhledy pro vedení kabeláže, topení i vzduchotechniky. Kompletní dokončovací práce.',
    tagsKey: 'service4_tags', tagsDefault: 'Příčky, Podhledy, Obklady stěn',
    imgKey: 'service4_img', imgDefault: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    titleKey: 'service5_title', titleDefault: 'Zednické práce všeho druhu',
    descKey: 'service5_desc', descDefault: 'Zdění, omítky, štuky, betonáže, bourací práce, spravování trhlin a povrchů. Opravy po vodním poškození. Nic nás nezaskočí.',
    tagsKey: 'service5_tags', tagsDefault: 'Zdění, Omítky, Bourání',
    imgKey: 'service5_img', imgDefault: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    titleKey: 'service6_title', titleDefault: 'Další stavební práce',
    descKey: 'service6_desc', descDefault: 'Zateplení fasád, malířské práce, pokládka plovoucích podlah, montáž oken a dveří. Jsme váš partner pro veškeré stavební práce.',
    tagsKey: 'service6_tags', tagsDefault: 'Zateplení, Malování, Podlahy',
    imgKey: 'service6_img', imgDefault: 'https://images.pexels.com/photos/1029766/pexels-photo-1029766.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

interface ImageEditorProps {
  imgKey: string;
  currentUrl: string;
  onSave: (key: string, url: string) => void;
  onClose: () => void;
}

function ImageEditor({ imgKey, currentUrl, onSave, onClose }: ImageEditorProps) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [urlValue, setUrlValue] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const ext = file.name.split('.').pop();
    const filename = `services/${imgKey}_${Date.now()}.${ext}`;
    const { data, error: uploadError } = await supabase.storage.from('gallery').upload(filename, file, { upsert: true });
    if (data) {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(filename);
      setUrlValue(urlData.publicUrl);
      setUploadDone(true);
    } else {
      setError(uploadError?.message ?? 'Nahrání selhalo');
    }
    setUploading(false);
  };

  const handleSave = () => {
    if (urlValue) onSave(imgKey, urlValue);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-20 bg-blue-950/95 flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Změnit foto</span>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('url')}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'url' ? 'bg-amber-400 text-blue-950' : 'bg-white/10 text-white/60 hover:text-white'}`}
        >
          <Link className="h-3 w-3" />
          URL
        </button>
        <button
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'upload' ? 'bg-amber-400 text-blue-950' : 'bg-white/10 text-white/60 hover:text-white'}`}
        >
          <Upload className="h-3 w-3" />
          Nahrát
        </button>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          value={urlValue}
          onChange={e => setUrlValue(e.target.value)}
          placeholder="https://..."
          className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-xs focus:outline-none focus:border-amber-400 mb-3"
        />
      ) : (
        <div className="mb-3">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 hover:border-amber-400/50 text-white/60 hover:text-white py-4 text-xs transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <span className="text-amber-400">Nahrávám...</span>
            ) : uploadDone ? (
              <span className="flex items-center gap-1.5 text-green-400"><Check className="h-3.5 w-3.5" /> Nahráno</span>
            ) : (
              <><Upload className="h-4 w-4" /> Vyberte soubor</>
            )}
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

      {urlValue && (
        <img src={urlValue} alt="náhled" className="w-full h-20 object-cover border border-white/10 mb-3" />
      )}

      <button
        onClick={handleSave}
        disabled={!urlValue}
        className="mt-auto bg-amber-400 text-blue-950 py-2 text-xs font-black uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-50"
      >
        Uložit foto
      </button>
    </div>
  );
}

export default function AdminServices({ texts, updateText }: Props) {
  const [editingImgKey, setEditingImgKey] = useState<string | null>(null);

  return (
    <section id="sluzby" className="py-16 sm:py-24 lg:py-28 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
              Služby
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              <EditableText value={D(texts, 'services_title_line1', 'Co')} onChange={v => updateText('services_title_line1', v)} className="text-white font-black uppercase" /><br />
              <span className="text-amber-400">
                <EditableText value={D(texts, 'services_title_line2', 'umíme')} onChange={v => updateText('services_title_line2', v)} className="text-amber-400 font-black uppercase" />
              </span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-base leading-relaxed">
            <EditableText
              value={D(texts, 'services_subtitle', 'Kompletní stavební řešení pod jednou střechou. Nemusíte shánět pět různých firem.')}
              onChange={v => updateText('services_subtitle', v)}
              multiline
              className="text-white/50 text-base leading-relaxed"
            />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceDefaults.map((s, idx) => {
            const Icon = icons[idx];
            const tags = D(texts, s.tagsKey, s.tagsDefault).split(',').map(t => t.trim()).filter(Boolean);
            const imgSrc = D(texts, s.imgKey, s.imgDefault);
            return (
              <div
                key={s.titleKey}
                className="group bg-blue-900/50 border border-white/5 hover:border-amber-400/30 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-amber-400 p-2">
                    <Icon className="h-5 w-5 text-blue-950" />
                  </div>
                  <button
                    onClick={() => setEditingImgKey(s.imgKey)}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-blue-950/80 border border-white/20 hover:border-amber-400 text-white/70 hover:text-amber-400 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Změnit foto
                  </button>

                  {editingImgKey === s.imgKey && (
                    <ImageEditor
                      imgKey={s.imgKey}
                      currentUrl={imgSrc}
                      onSave={(key, url) => updateText(key, url)}
                      onClose={() => setEditingImgKey(null)}
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white uppercase mb-3 leading-tight">
                    <EditableText value={D(texts, s.titleKey, s.titleDefault)} onChange={v => updateText(s.titleKey, v)} className="text-white font-black uppercase" />
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    <EditableText value={D(texts, s.descKey, s.descDefault)} onChange={v => updateText(s.descKey, v)} multiline className="text-white/60 text-sm leading-relaxed" />
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(t => (
                      <span key={t} className="text-xs font-bold text-amber-400/80 border border-amber-400/20 px-2 py-1 uppercase tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <EditableText
                      value={D(texts, s.tagsKey, s.tagsDefault)}
                      onChange={v => updateText(s.tagsKey, v)}
                      className="text-amber-400/40 text-xs"
                      placeholder="Štítky (oddělené čárkou)"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
