import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import './index.css';

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

function App() {
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      gsap.to('.catalog-grid', {
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
  }, []);

  const handleImageLoad = (id: number) => {
    setLoaded(prev => new Set(prev).add(id));
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setVisible(prev => new Set(prev).add(Number(entry.target.dataset.id)));
      }
    });
  };

  return (
    <div ref={scrollRef} className="min-h-screen bg-black overflow-x-hidden">
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
      <section ref={scrollRef} className="relative pb-20 lg:pb-32">
        <div className="catalog-grid max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {IMAGES.map((item, index) => (
              <article
                key={item.id}
                ref={(el) => {
                  if (el) {
                    const observer = new IntersectionObserver(handleIntersection, {
                      threshold: 0.15,
                      rootMargin: '50px'
                    });
                    observer.observe(el);
                    return () => observer.disconnect();
                  }
                }}
                data-id={item.id}
                className="catalog-item group relative aspect-[3/4] overflow-hidden bg-gray-950 cursor-pointer"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="absolute inset-0 z-10">
                  {item.isVideo ? (
                    <video
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                        loaded.has(item.id) ? 'opacity-100 scale-100 filter grayscale-[15%] contrast-110' : 'opacity-0 scale-[1.08] filter grayscale-[20%]'
                      }`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={() => handleImageLoad(item.id)}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                        loaded.has(item.id) ? 'opacity-100 scale-100 filter grayscale-[15%] contrast-110' : 'opacity-0 scale-[1.08] filter grayscale-[20%]'
                      }`}
                      onLoad={() => handleImageLoad(item.id)}
                    />
                  )}
                </div>

                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-20" />

                {/* Caption - solo aparece en hover/tap */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
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
                <div className="absolute top-3 left-3 font-mono text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                  {String(item.id).padStart(2, '0')}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Footer sutil */}
        <div className="mt-16 lg:mt-24 text-center">
          <p className="font-mono text-gray-500 text-xs tracking-[0.4em] uppercase mb-3">
            Hecho en Barcelona
          </p>
          <p className="font-display text-gray-300 text-sm font-light tracking-wide">
            Piezas únicas · Cita previa · WhatsApp +34 600 000 000
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;