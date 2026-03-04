import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  title: string;
  category: string;
  outcome: string;
  videoSrc: string;
  posterSrc: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Arquitectura Vidal',
    category: 'Diseño Web',
    outcome: '+340% de visibilidad orgánica en 3 meses.',
    videoSrc: '/videos/project-1.mp4',
    posterSrc: '/images/project-1.jpg',
    tags: ['Branding', 'SEO', 'Next.js'],
  },
  {
    id: 2,
    title: 'Clínica del Norte',
    category: 'Desarrollo + SEO',
    outcome: 'Tasa de conversión mejorada un 60%.',
    videoSrc: '/videos/project-2.mp4',
    posterSrc: '/images/project-2.jpg',
    tags: ['React', 'Performance', 'CWV'],
  },
  {
    id: 3,
    title: 'Inmobiliaria Pacífico',
    category: 'Landing + Ads',
    outcome: 'Costo por lead reducido a la mitad.',
    videoSrc: '/videos/project-3.mp4',
    posterSrc: '/images/project-3.jpg',
    tags: ['Landing', 'Ads', 'Analytics'],
  },
  {
    id: 4,
    title: 'Restaurante Atacama',
    category: 'Identidad Digital',
    outcome: 'Reservas online desde cero hasta 200/mes.',
    videoSrc: '/videos/project-4.mp4',
    posterSrc: '/images/project-4.jpg',
    tags: ['UI/UX', 'Booking', 'SEO Local'],
  },
];

const BULLETS = [
  'Captura atención en menos de 3 segundos',
  'Genera credibilidad instantánea',
  'Diseño único adaptado a tu marca',
  'Experiencia fluida en móvil y desktop',
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ProjectsVideoSection() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Entry animation (IntersectionObserver) ──────────────────────────────
  useLayoutEffect(() => {
    const left     = leftRef.current;
    const carousel = carouselRef.current;
    if (!left || !carousel || prefersReduced) return;

    gsap.set([left, carousel], { autoAlpha: 0, y: 48 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const ctx = gsap.context(() => {
            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .to(left,     { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
              .to(carousel, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.12);
          });
          observer.disconnect();
          return () => ctx.revert();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(sectionRef.current!);
    return () => observer.disconnect();
  }, [prefersReduced]);

  // ── Play/pause on activeIdx change ──────────────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIdx && !prefersReduced) {
        vid.play().catch(() => {/* autoplay blocked — silent */});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIdx, prefersReduced]);

  // ── Crossfade card transition ────────────────────────────────────────────
  const goTo = (idx: number) => {
    if (idx === activeIdx || prefersReduced) {
      setActiveIdx(idx);
      return;
    }
    const card = carouselRef.current?.querySelector<HTMLDivElement>(`[data-card="${idx}"]`);
    if (card) {
      gsap.fromTo(card, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    }
    setActiveIdx(idx);
  };

  const prev = () => goTo((activeIdx - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => goTo((activeIdx + 1) % PROJECTS.length);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
          className="relative z-10 text-white bg-transparent pt-10 pb-10 w-full" >
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT: sticky copy ────────────────────────────────────────── */}
          <div ref={leftRef} className="self-start lg:sticky lg:top-28 flex flex-col gap-7">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
              Diseño Web · Antofagasta
            </span>

            {/* Título mixto: sans-serif bold + italic serif, igual que la referencia */}
            <h2 className="leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}>
              <span className="font-black text-white">¿Tu sitio web te está</span>{' '}
              <br />
              <em className="font-light text-zinc-300 not-italic" style={{ fontStyle: 'italic' }}>
                costando clientes?
              </em>
            </h2>

            <p className="text-zinc-400 leading-relaxed max-w-sm text-sm">
              Si tu sitio no refleja la calidad de tu trabajo, está alejando a los
              clientes que mereces.
            </p>

            <p className="text-zinc-500 leading-relaxed max-w-sm text-sm">
              En EKI creamos sitios que capturan atención en segundos, generan
              confianza y trabajan por ti las 24 horas — combinando diseño de alto
              nivel, desarrollo a medida y SEO estratégico.
            </p>

            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-fuchsia-400 shrink-0" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate('/projects')}
              className="self-start mt-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Ver proyectos
            </Button>
          </div>

          {/* ── RIGHT: video carousel ────────────────────────────────────── */}
          <div ref={carouselRef} className="flex flex-col gap-6">

            {/* Active card */}
            <div
              data-card={activeIdx}
              className="relative rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-white/10"
            >
              <div className="aspect-video w-full bg-zinc-800">
                {PROJECTS.map((p, i) => (
                  <video
                    key={p.id}
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={p.videoSrc}
                    poster={p.posterSrc}
                    muted
                    loop
                    playsInline
                    preload={i === activeIdx ? 'auto' : 'metadata'}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === activeIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-label={p.title}
                  />
                ))}
              </div>

              {/* Card info overlay */}
              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-500">
                    {PROJECTS[activeIdx].category}
                  </span>
                  <div className="flex gap-1.5">
                    {PROJECTS[activeIdx].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-lg leading-snug">{PROJECTS[activeIdx].title}</h3>
                <p className="text-sm text-zinc-400">{PROJECTS[activeIdx].outcome}</p>
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="grid grid-cols-3 gap-3">
              {PROJECTS.filter((_, i) => i !== activeIdx).map((p, _, arr) => {
                const realIdx = PROJECTS.indexOf(p);
                return (
                  <button
                    key={p.id}
                    onClick={() => goTo(realIdx)}
                    className="relative rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-white/10 hover:ring-white/30 transition-all group"
                    aria-label={`Ver ${p.title}`}
                  >
                    <div className="aspect-video w-full bg-zinc-800">
                      <img
                        src={p.posterSrc}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-[11px] font-semibold text-zinc-300 truncate">{p.title}</p>
                    </div>
                  </button>
                );
                void arr; // satisfacer eslint unused
              })}
            </div>

            {/* Prev / Next + dots */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Ir a proyecto ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? 'w-5 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
