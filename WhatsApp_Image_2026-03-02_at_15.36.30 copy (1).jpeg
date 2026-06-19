import { useState } from 'react';
import { Hammer } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Nesprávné přihlašovací údaje.');
        setLoading(false);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccess('Účet vytvořen. Nyní se přihlaste.');
        setMode('login');
        setPassword('');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-amber-400 p-2">
            <Hammer className="h-5 w-5 text-blue-950" />
          </div>
          <span className="text-white font-black uppercase tracking-widest text-lg">Stavařina</span>
        </div>

        <h1 className="text-white font-black text-2xl uppercase mb-1">Admin</h1>
        <p className="text-white/30 text-sm mb-8">
          {mode === 'login' ? 'Přihlášení do správy webu' : 'Vytvoření admin účtu'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">Heslo</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-blue-950 font-black uppercase tracking-widest py-3 text-sm hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {loading
              ? '...'
              : mode === 'login'
              ? 'Přihlásit se'
              : 'Vytvořit účet'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <a
            href="/"
            className="text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            ← Zpět na web
          </a>
          <button
            onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
            className="text-white/15 hover:text-white/30 text-xs transition-colors"
          >
            {mode === 'login' ? 'registrace' : 'zpět na přihlášení'}
          </button>
        </div>
      </div>
    </div>
  );
}
