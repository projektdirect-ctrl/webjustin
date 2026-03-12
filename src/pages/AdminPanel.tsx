import { useEffect, useState } from 'react';
import { Hammer, LogOut, Save, CreditCard as Edit3, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import AdminHero from '../components/admin/AdminHero';
import AdminAbout from '../components/admin/AdminAbout';
import AdminServices from '../components/admin/AdminServices';
import AdminProcess from '../components/admin/AdminProcess';
import AdminGallery from '../components/admin/AdminGallery';
import AdminContact from '../components/admin/AdminContact';

export interface SiteTexts {
  [key: string]: string;
}

export interface Photo {
  id: string;
  src: string;
  label: string;
  sort_order: number;
  span: string;
}

export default function AdminPanel() {
  const { signOut } = useAuth();
  const [texts, setTexts] = useState<SiteTexts>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    const [{ data: textData }, { data: photoData }] = await Promise.all([
      supabase.from('site_texts').select('*'),
      supabase.from('gallery_photos').select('*').order('sort_order'),
    ]);

    if (textData) {
      const map: SiteTexts = {};
      textData.forEach((t: any) => { map[t.key] = t.value; });
      setTexts(map);
    }
    if (photoData) setPhotos(photoData);
    setLoading(false);
  };

  const updateText = (key: string, value: string) => {
    setTexts(prev => ({ ...prev, [key]: value }));
  };

  const saveAll = async () => {
    setSaving(true);
    const entries = Object.entries(texts);
    for (const [key, value] of entries) {
      await supabase
        .from('site_texts')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addPhoto = async (photo: Omit<Photo, 'id'>) => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .insert(photo)
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (data) setPhotos(prev => [...prev, data]);
  };

  const updatePhoto = async (id: string, updates: Partial<Photo>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    await supabase.from('gallery_photos').update(updates).eq('id', id);
  };

  const deletePhoto = async (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    await supabase.from('gallery_photos').delete().eq('id', id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-gray-950 border-b border-amber-400/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 p-1.5">
                <Hammer className="h-4 w-4 text-blue-950" />
              </div>
              <span className="font-black uppercase tracking-widest text-sm text-white">Stavařina</span>
              <div className="hidden sm:flex items-center gap-1.5 ml-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1">
                <Edit3 className="h-3 w-3 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Režim úprav</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={saveAll}
                disabled={saving}
                className="flex items-center gap-2 bg-amber-400 text-blue-950 px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-amber-300 transition-colors disabled:opacity-60"
              >
                {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                {saving ? 'Ukládám...' : saved ? 'Uloženo!' : 'Uložit vše'}
              </button>
              <a
                href="/"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <span className="hidden sm:inline">Zobrazit web</span>
              </a>
              <button
                onClick={signOut}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Odhlásit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-14">
        <AdminHero texts={texts} updateText={updateText} />
        <AdminAbout texts={texts} updateText={updateText} />
        <AdminServices texts={texts} updateText={updateText} />
        <AdminProcess texts={texts} updateText={updateText} />
        <AdminGallery photos={photos} addPhoto={addPhoto} updatePhoto={updatePhoto} deletePhoto={deletePhoto} />
        <AdminContact texts={texts} updateText={updateText} />
      </div>

      <footer className="bg-black text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-400 p-2">
              <Hammer className="h-5 w-5 text-blue-950" />
            </div>
            <span className="text-xl font-black uppercase tracking-widest">Stavařina</span>
          </div>
          <div className="text-white/30 text-xs">
            © {new Date().getFullYear()} Stavařina. Všechna práva vyhrazena.
          </div>
        </div>
      </footer>
    </div>
  );
}
