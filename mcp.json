import { useState, useRef } from 'react';
import { Plus, Trash2, X, Upload, Link, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../../pages/AdminPanel';
import { supabase } from '../../lib/supabase';

interface Props {
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, 'id'>) => Promise<void>;
  updatePhoto: (id: string, updates: Partial<Photo>) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
}

export default function AdminGallery({ photos, addPhoto, updatePhoto, deletePhoto }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [newLabel, setNewLabel] = useState('');
  const [newSrc, setNewSrc] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState('');
  const [adding, setAdding] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from('gallery').upload(filename, file, { upsert: true });
    if (data) {
      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(filename);
      setNewSrc(urlData.publicUrl);
      setUploadedPreview(urlData.publicUrl);
    } else {
      setUploadError(error?.message ?? 'Nahrání selhalo');
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!newSrc || !newLabel) return;
    setAdding(true);
    setUploadError('');
    try {
      const maxOrder = photos.reduce((m, p) => Math.max(m, p.sort_order), -1);
      await addPhoto({ src: newSrc, label: newLabel, span: '', sort_order: maxOrder + 1 });
      setNewSrc('');
      setNewLabel('');
      setUploadedPreview('');
      setShowAdd(false);
      setActiveIndex(photos.length);
    } catch (err: any) {
      setUploadError(err?.message ?? 'Uložení selhalo');
    }
    setAdding(false);
  };

  const reset = () => {
    setShowAdd(false);
    setNewSrc('');
    setNewLabel('');
    setUploadedPreview('');
    setUploadError('');
  };

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, photos.length - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    if (card) {
      const offset = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  const activePhoto = photos[activeIndex];

  return (
    <section id="galerie" className="py-16 sm:py-24 lg:py-28 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div>
            <div className="inline-block bg-amber-400 px-3 py-1 text-blue-950 font-black uppercase tracking-widest text-xs mb-6">
              Galerie
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
              Naše<br />
              <span className="text-amber-400">práce</span>
            </h2>
          </div>
          <div className="flex items-end gap-4 flex-wrap">
            <p className="text-white/50 max-w-sm text-base leading-relaxed">
              Fotografie přímo z našich realizovaných projektů.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-amber-400 hover:text-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={activeIndex === photos.length - 1}
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-amber-400 hover:text-amber-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-amber-400 text-blue-950 px-4 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-amber-300 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Přidat fotku
              </button>
            </div>
          </div>
        </div>

        {showAdd && (
          <div className="mb-8 bg-blue-900/70 border border-amber-400/30 p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Nová fotka</span>
              <button onClick={reset} className="text-white/40 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setMode('url')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'url' ? 'bg-amber-400 text-blue-950' : 'bg-white/10 text-white/60 hover:text-white'}`}
              >
                <Link className="h-3 w-3" />
                URL odkaz
              </button>
              <button
                onClick={() => setMode('upload')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${mode === 'upload' ? 'bg-amber-400 text-blue-950' : 'bg-white/10 text-white/60 hover:text-white'}`}
              >
                <Upload className="h-3 w-3" />
                Nahrát soubor
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                {mode === 'url' ? (
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">URL fotky</label>
                    <input
                      type="text"
                      value={newSrc}
                      onChange={e => setNewSrc(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Soubor</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 hover:border-amber-400/50 text-white/60 hover:text-white px-3 py-6 text-sm transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <span className="text-amber-400">Nahrávám...</span>
                      ) : uploadedPreview ? (
                        <span className="flex items-center gap-2 text-green-400"><Check className="h-4 w-4" /> Nahráno!</span>
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          Klikněte pro výběr souboru
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Popis fotky</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="Rekonstrukce koupelny..."
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {(newSrc || uploadedPreview) && (
              <div className="mb-5">
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Náhled</label>
                <img src={newSrc || uploadedPreview} alt="preview" className="h-32 object-cover border border-white/10" />
              </div>
            )}

            {uploadError && (
              <div className="mb-3 text-red-400 text-xs bg-red-400/10 border border-red-400/30 px-3 py-2">
                Chyba: {uploadError}
              </div>
            )}
            <button
              onClick={handleAdd}
              disabled={adding || !newSrc || !newLabel || uploading}
              className="flex items-center gap-2 bg-amber-400 text-blue-950 px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              {adding ? 'Přidávám...' : 'Přidat do galerie'}
            </button>
          </div>
        )}
      </div>

      {photos.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 text-white/30 text-sm">
            Zatím žádné fotky. Přidejte první tlačítkem výše.
          </div>
        </div>
      ) : (
        <>
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto select-none"
            style={{
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
              paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 1rem))',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onScroll={handleScroll}
          >
            {photos.map((p, i) => (
              <div
                key={p.id}
                onClick={() => scrollTo(i)}
                className={`relative shrink-0 overflow-hidden group cursor-pointer transition-all duration-500 ${i === activeIndex ? 'opacity-100' : 'opacity-50'}`}
                style={{
                  width: i === activeIndex ? 'clamp(280px, 55vw, 640px)' : 'clamp(160px, 28vw, 320px)',
                  height: 'clamp(300px, 40vw, 520px)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className={`transition-all duration-500 ${i === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className="w-6 h-0.5 bg-amber-400 mb-2" />
                    <p className="text-white font-black uppercase tracking-wider text-sm">{p.label}</p>
                    <p className="text-white/50 text-xs mt-1">{i + 1} / {photos.length}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex gap-1.5 items-center mb-6">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`h-0.5 transition-all duration-300 ${i === activeIndex ? 'bg-amber-400 w-8' : 'bg-white/20 w-4'}`}
                />
              ))}
            </div>

            {activePhoto && (
              <div className="bg-blue-900/50 border border-white/10 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Popis aktivní fotky</label>
                  {editingId === activePhoto.id ? (
                    <input
                      type="text"
                      defaultValue={activePhoto.label}
                      autoFocus
                      onBlur={e => { updatePhoto(activePhoto.id, { label: e.target.value }); setEditingId(null); }}
                      onKeyDown={e => { if (e.key === 'Enter') { updatePhoto(activePhoto.id, { label: (e.target as HTMLInputElement).value }); setEditingId(null); } }}
                      className="w-full bg-white/5 border border-amber-400/50 text-white px-3 py-2 text-sm focus:outline-none"
                    />
                  ) : (
                    <button
                      onClick={() => setEditingId(activePhoto.id)}
                      className="text-white text-sm font-bold hover:text-amber-400 transition-colors text-left"
                    >
                      {activePhoto.label} <span className="text-white/30 font-normal text-xs ml-2">klikni pro úpravu</span>
                    </button>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {confirmDelete === activePhoto.id ? (
                    <>
                      <button
                        onClick={() => { deletePhoto(activePhoto.id); setConfirmDelete(null); setActiveIndex(Math.max(0, activeIndex - 1)); }}
                        className="bg-red-500 text-white text-xs px-3 py-2 font-bold uppercase tracking-widest"
                      >
                        Potvrdit smazání
                      </button>
                      <button onClick={() => setConfirmDelete(null)} className="bg-white/10 text-white/60 text-xs px-3 py-2">
                        Zrušit
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(activePhoto.id)}
                      className="flex items-center gap-1.5 text-red-400/70 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest border border-red-400/20 hover:border-red-400/50 px-3 py-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Smazat
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
