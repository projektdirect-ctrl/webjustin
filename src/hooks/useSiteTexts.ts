import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SiteTexts {
  [key: string]: string;
}

let cache: SiteTexts | null = null;
let promise: Promise<SiteTexts> | null = null;

async function fetchTexts(): Promise<SiteTexts> {
  if (cache) return cache;
  if (!promise) {
    promise = supabase
      .from('site_texts')
      .select('*')
      .then(({ data }) => {
        const map: SiteTexts = {};
        if (data) data.forEach((row: any) => { map[row.key] = row.value; });
        cache = map;
        return map;
      });
  }
  return promise;
}

export function useSiteTexts() {
  const [texts, setTexts] = useState<SiteTexts>(cache ?? {});

  useEffect(() => {
    fetchTexts().then(setTexts);
  }, []);

  const t = (key: string, fallback: string) => texts[key] || fallback;

  return { texts, t };
}
