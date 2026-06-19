import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Photo {
  id: string;
  src: string;
  label: string;
  sort_order: number;
}

const fallbackPhotos: Photo[] = [
  { id: '1', src: '/photo1.jpeg', label: 'Solární panely', sort_order: 0 },
  { id: '2', src: '/photo2.jpeg', label: 'Pergola a terasa', sort_order: 1 },
  { id: '3', src: '/photo3.jpeg', label: 'Bourací práce', sort_order: 2 },
  { id: '4', src: '/photo4.jpeg', label: 'Rozvody a instalace', sort_order: 3 },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);

  useEffect(() => {
    supabase
      .from('gallery_photos')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setPhotos(data);
      });
  }, []);

  const scrollTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, photos.length - 1));
    setActiveIndex(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement;
    if (card) {
      const offset = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [photos.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStartLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollStartLeft.current - walk;
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

  return (
    <section id="galerie" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: '#172554' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-block', background: '#fbbf24', padding: '4px 12px', color: '#172554', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '1.5rem' }}>
              Galerie
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Naše<br />
              <span style={{ color: '#fbbf24' }}>práce</span>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '22rem', fontSize: '1rem', lineHeight: 1.6 }}>
              Fotografie přímo z našich realizovaných projektů.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => scrollTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', opacity: activeIndex === 0 ? 0.3 : 1 }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollTo(activeIndex + 1)}
                disabled={activeIndex === photos.length - 1}
                style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer', opacity: activeIndex === photos.length - 1 ? 0.3 : 1 }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '12px',
          overflowX: 'auto',
          overflowY: 'hidden',
          cursor: 'grab',
          userSelect: 'none',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))',
          paddingRight: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))',
          paddingBottom: '0',
          height: '460px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {photos.map((p, i) => (
          <div
            key={p.id}
            onClick={() => scrollTo(i)}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: i === activeIndex ? '560px' : '260px',
              height: '460px',
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: i === activeIndex ? 1 : 0.55,
              transition: 'width 0.5s ease, opacity 0.5s ease',
            }}
          >
            <img
              src={p.src}
              alt={p.label}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                transition: 'transform 0.7s ease',
                pointerEvents: 'none',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(23,37,84,0.92) 0%, rgba(23,37,84,0.15) 55%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              opacity: i === activeIndex ? 1 : 0,
              transform: i === activeIndex ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}>
              <div style={{ width: '24px', height: '2px', background: '#fbbf24', marginBottom: '8px' }} />
              <p style={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px' }}>{p.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>{i + 1} / {photos.length}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '80rem', margin: '1.5rem auto 0', padding: '0 2rem' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              style={{
                height: '2px',
                width: i === activeIndex ? '2rem' : '1rem',
                background: i === activeIndex ? '#fbbf24' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
