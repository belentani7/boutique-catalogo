import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import './index.css';
import { filterCatalog } from './catalog-filter';

gsap.registerPlugin(ScrollTrigger);

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  collection: string;
  isVideo?: boolean;
}

const IMAGES: ImageItem[] = [
  { id: 1, src: '/media/look1.png', alt: 'Look 1', caption: 'Abrigo seda twill', collection: 'AW24' },
  { id: 2, src: '/media/look2.png', alt: 'Look 2', caption: 'Traje cachemir blend', collection: 'AW24' },
  { id: 3, src: '/media/look3.png', alt: 'Look 3', caption: 'Vestido lana crepe', collection: 'SS25' },
  { id: 4, src: '/media/look4.jpg', alt: 'Look 4', caption: 'Blazer lana técnica', collection: 'SS25' },
  { id: 5, src: '/media/look5.png', alt: 'Look 5', caption: 'Camisa algodón orgánico', collection: 'SS25' },
  { id: 6, src: '/media/hero.mp4', alt: 'Hero Video', caption: 'Video campaña', collection: 'HERO', isVideo: true },
]; 

const COLLECTIONS = ['TODAS', ...new Set(IMAGES.map((item) => item.collection))];

function App() {
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState('TODAS');
  const filteredImages = filterCatalog(IMAGES, query, collection);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(heroRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.5 }
      );

      // Scroll indicator
      gsap.fromTo('.scroll-hint',
        { opacity: 0, y: 10 },
        { opacity: 0.4, y: 0, duration: 1, ease: 'power2.out', delay: 1.2, repeat: -1, yoyo: true }
      );

    }, scrollRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Images scroll reveal
      const images = document.querySelectorAll('.catalog-item');
      images.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08
          }
        );
      });

      // Subtle parallax on scroll
      if (filteredImages.length > 0) gsap.to('.catalog-grid', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.catalog-grid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, scrollRef);
    return () => ctx.revert();
  }, [query, collection]);

  const handleImageLoad = (id: number) => {
    setLoaded(prev => new Set(prev).add(id));
  };

  const handleMediaError = (id: number) => {
    setFailed(prev => new Set(prev).add(id));
  };


  return (
    <div ref={scrollRef} className="min-h-screen bg-black overflow-x-hidden">
      <a href="#catalogo" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-black focus:p-3">Saltar al catálogo</a>
      {/* Hero / Entrada */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-white leading-[0.95] mb-4">
            BOUTIQUE
            <br />
            <span className="text-gray-400 font-light">CATÁLOGO</span>
          </h1>
          <p ref={subtitleRef} className="text-gray-400 text-sm sm:text-base font-light tracking-[0.3em] uppercase letter-spacing-wider max-w-md mx-auto">
            Colección permanente · Edición limitada
          </p>
        </div>

        <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs font-mono tracking-widest">
          <span>DESCUBRIR</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" aria-labelledby="catalog-heading" className="relative pb-20 lg:pb-32">
        <div className="catalog-grid max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h2 id="catalog-heading" className="font-display text-3xl sm:text-4xl text-white mb-5">Explorar colección</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="catalog-search" className="block text-gray-200 text-sm mb-2">Buscar prendas</label>
                <input id="catalog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Escape') setQuery(''); }}
                  placeholder="Abrigo, vestido, algodón…" autoComplete="off"
                  className="w-full min-h-12 rounded-sm border border-gray-600 bg-gray-900 px-4 text-white placeholder:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" />
              </div>
              <div>
                <label htmlFor="catalog-collection" className="block text-gray-200 text-sm mb-2">Colección</label>
                <select id="catalog-collection" value={collection} onChange={(event) => setCollection(event.target.value)}
                  className="w-full min-h-12 rounded-sm border border-gray-600 bg-gray-900 px-4 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {COLLECTIONS.map((option) => <option key={option} value={option}>{option === 'TODAS' ? 'Todas las colecciones' : option}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p role="status" aria-live="polite" className="text-gray-200 text-sm">{filteredImages.length} de {IMAGES.length} piezas</p>
              {(query || collection !== 'TODAS') && <button type="button" onClick={() => { setQuery(''); setCollection('TODAS'); }}
                className="min-h-11 px-4 border border-gray-500 text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Limpiar filtros</button>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredImages.map((item) => (
              <article
                key={item.id}
                tabIndex={0}
                aria-label={`${item.collection}: ${item.caption}`}
                data-id={item.id}
                className="catalog-item group relative aspect-[3/4] overflow-hidden bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="absolute inset-0 z-10">
                  {failed.has(item.id) ? (
                    <div role="status" className="flex h-full items-center justify-center bg-gray-900 px-4 text-center text-gray-200">Vista previa no disponible</div>
                  ) : item.isVideo ? (
                    <video
                      src={item.src}
                      aria-label={`${item.caption}, colección ${item.collection}`}
                      className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                        loaded.has(item.id) ? 'opacity-100 scale-100 filter grayscale-[15%] contrast-110' : 'opacity-0 scale-[1.08] filter grayscale-[20%]'
                      }`}
                      controls
                      preload="metadata"
                      muted
                      playsInline
                      onLoadedData={() => handleImageLoad(item.id)}
                      onError={() => handleMediaError(item.id)}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`${item.caption}, colección ${item.collection}`}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                        loaded.has(item.id) ? 'opacity-100 scale-100 filter grayscale-[15%] contrast-110' : 'opacity-0 scale-[1.08] filter grayscale-[20%]'
                      }`}
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleMediaError(item.id)}
                    />
                  )}
                </div>

                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 transition-opacity duration-700 ease-out z-20" />

                {/* Caption - solo aparece en hover/tap */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus:translate-y-0 transition-transform duration-500 ease-out z-30">
                  <div className="max-w-md mx-auto text-center">
                    <span className="font-mono text-gray-500 text-xs tracking-[0.4em] uppercase block mb-2">
                      {item.collection}
                    </span>
                    <p className="font-display text-white text-lg sm:text-xl font-light leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                {/* Number indicator */}
                <div className="absolute top-3 left-3 font-mono text-gray-500 text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100 transition-opacity duration-500 z-30">
                  {String(item.id).padStart(2, '0')}
                </div>
              </article>
            ))}
          </div>
          {filteredImages.length === 0 && <p className="py-16 text-center text-gray-200" role="status">No hay piezas que coincidan con los filtros. Prueba otra búsqueda.</p>}
        </div>

        {/* Footer sutil */}
        <div className="mt-16 lg:mt-24 text-center">
          <p className="font-mono text-gray-500 text-xs tracking-[0.4em] uppercase mb-3">
            Selección editorial
          </p>
          <p className="font-display text-gray-300 text-sm font-light tracking-wide">
            Piezas seleccionadas · Edición editorial
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;