import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  videoSrc: string;
  posterSrc: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Arquitectura Vidal',
    category: 'Diseño Web',
    year: '2025',
    videoSrc: '/videos/p1.webm',
    posterSrc: '/images/p1.jpg',
    tags: ['Branding', 'SEO', 'Next.js'],
  },
  {
    id: 2,
    title: 'Clínica del Norte',
    category: 'Desarrollo + SEO',
    year: '2025',
    videoSrc: '/videos/p2.webm',
    posterSrc: '/images/p2.jpg',
    tags: ['React', 'Performance', 'CWV'],
  },
  {
    id: 3,
    title: 'Inmobiliaria Pacífico',
    category: 'Landing + Ads',
    year: '2024',
    videoSrc: '/videos/p3.webm',
    posterSrc: '/images/p3.jpg',
    tags: ['Landing', 'Ads', 'Analytics'],
  },
  {
    id: 4,
    title: 'Restaurante Atacama',
    category: 'Identidad Digital',
    year: '2024',
    videoSrc: '/videos/p4.webm',
    posterSrc: '/images/p4.jpg',
    tags: ['UI/UX', 'Booking', 'SEO Local'],
  },
  {
    id: 5,
    title: 'Retail Los Andes',
    category: 'E-commerce',
    year: '2024',
    videoSrc: '/videos/p5.webm',
    posterSrc: '/images/p5.jpg',
    tags: ['Shopify', 'UX', 'Conversión'],
  },
];

export function ProjectsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || prefersReduced) return;

    gsap.set(wrapper, { autoAlpha: 0, y: 36 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(wrapper, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        });

        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;

      if (i === activeIdx && !prefersReduced) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIdx, prefersReduced]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === activeIdx) return;

      const card = activeCardRef.current;
      if (card && !prefersReduced) {
        gsap.fromTo(
          card,
          { opacity: 0.45, scale: 0.985 },
          { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
        );
      }

      setActiveIdx(idx);
    },
    [activeIdx, prefersReduced]
  );

  const prev = () => goTo((activeIdx - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => goTo((activeIdx + 1) % PROJECTS.length);

  const active = PROJECTS[activeIdx];
  const preview = PROJECTS[(activeIdx + 1) % PROJECTS.length];

  return (
    <section
      id="projects-carousel"
      ref={sectionRef}
      aria-label="Carrusel de proyectos"
      className="relative z-10 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={wrapperRef}>
          {/* Header */}
          <div className="flex items-end justify-between mb-5 md:mb-7">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 block mb-2">
                Nuestro trabajo
              </span>
              <h2
                className="font-black text-white leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                Proyectos recientes
              </h2>
            </div>

            <div className="hidden md:flex gap-3">
              <button
                onClick={prev}
                aria-label="Proyecto anterior"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={next}
                aria-label="Proyecto siguiente"
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex gap-4 items-stretch">
            <div
              ref={activeCardRef}
              className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 bg-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
              style={{ flex: '0 0 68%' }}
            >
              <div className="relative w-full aspect-[16/10] bg-zinc-800">
                {PROJECTS.map((p, i) => (
                  <video
                    key={p.id}
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={p.videoSrc}
                    poster={p.posterSrc}
                    muted
                    loop
                    playsInline
                    preload={i === activeIdx ? 'auto' : 'metadata'}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      i === activeIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label={p.title}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 block mb-1">
                    {active.category} · {active.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">
                    {active.title}
                  </h3>
                </div>

                <div className="flex gap-1.5 flex-wrap justify-end max-w-[40%]">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={next}
              aria-label={`Ver ${preview.title}`}
              className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 bg-zinc-900 opacity-65 hover:opacity-85 transition-opacity"
              style={{ flex: '1 1 0' }}
            >
              <img
                src={preview.posterSrc}
                alt={preview.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500 block mb-0.5">
                  {preview.category}
                </span>
                <p className="text-sm font-bold text-white/85 leading-tight">
                  {preview.title}
                </p>
              </div>
            </button>
          </div>

          {/* Mobile */}
          <div
            className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActiveIdx(i)}
                className="snap-center shrink-0 w-[88vw] rounded-3xl overflow-hidden ring-1 ring-white/10 bg-zinc-900 relative"
                aria-label={`Ver ${p.title}`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={p.videoSrc}
                  poster={p.posterSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full aspect-[4/3] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 block mb-0.5">
                    {p.category}
                  </span>
                  <h3 className="text-base font-bold leading-tight">{p.title}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* Footer controls */}
          <div className="flex items-center justify-between mt-5">
            <span className="text-sm font-semibold tabular-nums text-zinc-500 hidden md:block">
              {String(activeIdx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </span>

            <div className="flex gap-3 md:hidden">
              <button
                onClick={prev}
                aria-label="Proyecto anterior"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={next}
                aria-label="Proyecto siguiente"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a proyecto ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}