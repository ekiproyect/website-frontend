import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  videoSrc: string;
  posterSrc: string;
}

const PROJECTS: Project[] = [
  { id: 1, videoSrc: '/videos/p1.webm', posterSrc: '/images/p1.jpg' },
  { id: 2, videoSrc: '/videos/p2.webm', posterSrc: '/images/p2.jpg' },
  { id: 3, videoSrc: '/videos/p3.webm', posterSrc: '/images/p3.jpg' },
  { id: 4, videoSrc: '/videos/p4.webm', posterSrc: '/images/p4.jpg' },
  { id: 5, videoSrc: '/videos/p5.webm', posterSrc: '/images/p5.jpg' },
];

export function ProjectsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Visual (desktop)
  const CARD_W_VW = 72; // 70–76
  const GAP_PX = 18;

  const calcMetrics = useCallback(() => {
    const vw = window.innerWidth;
    const cardW = (CARD_W_VW / 100) * vw;
    const step = cardW + GAP_PX;
    return { step };
  }, []);

  const setTrackX = useCallback(
    (idx: number, immediate = false) => {
      const track = trackRef.current;
      if (!track) return;

      const { step } = calcMetrics();
      const x = -(idx * step);

      if (prefersReduced || immediate) {
        track.style.transform = `translate3d(${x}px,0,0)`;
        return;
      }

      gsap.to(track, {
        x,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    },
    [calcMetrics, prefersReduced]
  );

  // Entry
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el || prefersReduced) return;

    gsap.set(el, { autoAlpha: 0, y: 18 });
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        obs.disconnect();
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    setTrackX(activeIdx);
  }, [activeIdx, setTrackX]);

  useEffect(() => {
    const onResize = () => setTrackX(activeIdx, true);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIdx, setTrackX]);

  // Play only active
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

  const goTo = useCallback((idx: number) => {
    const max = PROJECTS.length - 1;
    setActiveIdx(Math.max(0, Math.min(max, idx)));
  }, []);

  const prev = () => goTo(activeIdx - 1);
  const next = () => goTo(activeIdx + 1);

  return (
    <section
      ref={sectionRef}
      id="projects-carousel"
      aria-label="Carrusel de proyectos"
      className="relative z-10 py-10 md:py-14"
    >
      {/* FULL BLEED */}
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div ref={wrapperRef} className="relative">
          {/* VIEWPORT */}
          <div className="relative overflow-hidden pl-6 md:pl-12 pr-4">
            {/* TRACK */}
            <div
              ref={trackRef}
              className="flex items-stretch"
              style={{
                gap: GAP_PX,
                transform: 'translate3d(0,0,0)',
                willChange: 'transform',
              }}
            >
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Proyecto ${i + 1}`}
                  className="relative shrink-0 rounded-3xl overflow-hidden ring-1 ring-white/10 bg-zinc-900 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                  style={{ width: `min(${CARD_W_VW}vw, 980px)` }}
                >
                  <div className="relative w-full aspect-[16/9] bg-zinc-800">
                    <video
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
                        i === activeIdx ? 'opacity-100' : 'opacity-85'
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
                  </div>
                </button>
              ))}
            </div>

            {/* ✅ BOTTOM DOCK (como la imagen) */}
            <div className="mt-6 flex items-center justify-between">
              {/* Left: prev/next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  disabled={activeIdx === 0}
                  aria-label="Anterior"
                  className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/15 hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={next}
                  disabled={activeIdx === PROJECTS.length - 1}
                  aria-label="Siguiente"
                  className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/15 hover:border-white/30 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Right: dots */}
              <div className="flex items-center gap-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Ir a proyecto ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? 'w-10 h-2 bg-white/90'
                        : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE: snap + dock simple */}
          <div className="md:hidden mt-4 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 pl-6 pr-4" style={{ scrollbarWidth: 'none' as any }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className="snap-center shrink-0 w-[88vw] rounded-3xl overflow-hidden ring-1 ring-white/10 bg-zinc-900"
                aria-label={`Proyecto ${i + 1}`}
              >
                <video
                  src={p.videoSrc}
                  poster={p.posterSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full aspect-[16/10] object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}