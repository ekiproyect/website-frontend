/**
 * ProjectsVideoShowcase
 * ─────────────────────────────────────────────────────────────────────────────
 * Sección dark "Proyectos en video": columna izquierda sticky + carrusel de
 * cards con video a la derecha. GSAP on-enter suave, sin ScrollTrigger.
 * Respeta prefers-reduced-motion.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

// ─── Datos mock ───────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  industry: string;
  outcome: string;
  videoSrc: string;
  posterSrc: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Sistema de gestión operativa',
    industry: 'Logística',
    outcome: '−40 % de errores operativos en 6 semanas',
    videoSrc: '/videos/proyecto-1.mp4',
    posterSrc: '/posters/proyecto-1.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'p2',
    title: 'Plataforma de pedidos B2B',
    industry: 'Retail / E-commerce',
    outcome: '+60 % velocidad de despacho, cero pérdida de pedidos',
    videoSrc: '/videos/proyecto-2.mp4',
    posterSrc: '/posters/proyecto-2.jpg',
    tags: ['Next.js', 'TypeScript', 'SEO'],
  },
  {
    id: 'p3',
    title: 'Portal de transparencia municipal',
    industry: 'Sector público',
    outcome: '+120 % de visitas orgánicas tras SEO técnico',
    videoSrc: '/videos/proyecto-3.mp4',
    posterSrc: '/posters/proyecto-3.jpg',
    tags: ['Web', 'SEO', 'Performance'],
  },
  {
    id: 'p4',
    title: 'Dashboard de métricas SaaS',
    industry: 'Tecnología',
    outcome: 'Reducción del 35 % en tiempo de onboarding',
    videoSrc: '/videos/proyecto-4.mp4',
    posterSrc: '/posters/proyecto-4.jpg',
    tags: ['React', 'Tailwind', 'UX'],
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export function ProjectsVideoShowcase() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // GSAP on-enter refs
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  // ── Respetar prefers-reduced-motion ──────────────────────────────────────
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Animación de entrada (IntersectionObserver + GSAP) ───────────────────
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            leftRef.current,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          );
          gsap.fromTo(
            rightRef.current,
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 },
          );
        });

        obs.disconnect();
        return () => ctx.revert();
      },
      { threshold: 0.12 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [prefersReduced]);

  // ── Gestión de reproducción según activeIdx ───────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeIdx) {
        vid.play().catch(() => {/* autoplay blocked: ignorar */});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [activeIdx]);

  // ── Helpers de navegación ─────────────────────────────────────────────────
  const prev = () => setActiveIdx((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => setActiveIdx((i) => (i + 1) % PROJECTS.length);

  const scrollToProyectos = () => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else navigate('/projects');
  };

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <section
      id="proyectos"
      ref={sectionRef}
      aria-label="Proyectos en video"
      className="relative py-24 md:py-32 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Columna izquierda (sticky en desktop) ──────────────────── */}
          <div
            ref={leftRef}
            className="lg:sticky lg:top-28 lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col gap-6"
            style={prefersReduced ? {} : { opacity: 0 }}
          >
            {/* Label */}
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
              Proyectos
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Casos reales en video.
            </h2>

            {/* Desc */}
            <p className="text-sm text-zinc-400 leading-relaxed">
              Diseño + desarrollo personalizado + SEO estratégico con foco en resultados.
            </p>

            {/* Chips */}
            <ul className="flex flex-col gap-2.5" aria-label="Especialidades">
              {['SEO', 'Performance', 'Conversión'].map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
                  {chip}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              onClick={scrollToProyectos}
              variant="outline"
              size="sm"
              className="w-fit border-white/20 text-zinc-200 hover:text-white hover:border-white/40 hover:bg-white/8 transition-all duration-300"
              aria-label="Ver todos los proyectos"
            >
              Ver todos los proyectos
              <ChevronRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>

          {/* ── Columna derecha: carrusel ───────────────────────────────── */}
          <div
            ref={rightRef}
            className="flex-1 min-w-0 flex flex-col gap-5"
            style={prefersReduced ? {} : { opacity: 0 }}
          >
            {/* Card activa */}
            <div
              key={PROJECTS[activeIdx].id}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60 group"
            >
              <div className="relative aspect-video">
                <video
                  ref={(el) => { videoRefs.current[activeIdx] = el; }}
                  src={PROJECTS[activeIdx].videoSrc}
                  poster={PROJECTS[activeIdx].posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`Video del proyecto: ${PROJECTS[activeIdx].title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Si el video no existe, muestra el poster
                    (e.target as HTMLVideoElement).style.display = 'none';
                  }}
                />
                {/* Gradient overlay inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Info de la card activa */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-1">
                      {PROJECTS[activeIdx].industry}
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {PROJECTS[activeIdx].title}
                    </h3>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                    Entregado
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {PROJECTS[activeIdx].outcome}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/8">
                  {PROJECTS[activeIdx].tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-zinc-500 border border-white/8 bg-white/5 rounded px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Miniaturas + controles */}
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={prev}
                aria-label="Proyecto anterior"
                className="shrink-0 w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/12 hover:border-white/30 flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-300" />
              </button>

              {/* Thumbnails */}
              <div className="flex-1 grid grid-cols-4 gap-2 overflow-hidden">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Ver proyecto: ${p.title}`}
                    aria-current={idx === activeIdx ? 'true' : undefined}
                    className={[
                      'relative rounded-xl overflow-hidden aspect-video border transition-all duration-300',
                      idx === activeIdx
                        ? 'border-white/40 ring-1 ring-white/30 scale-[1.03]'
                        : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/25',
                    ].join(' ')}
                  >
                    {/* Video pausado con poster */}
                    <video
                      ref={(el) => {
                        if (idx !== activeIdx) videoRefs.current[idx] = el;
                      }}
                      src={p.videoSrc}
                      poster={p.posterSrc}
                      muted
                      playsInline
                      preload="none"
                      aria-hidden
                      tabIndex={-1}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay oscuro en no-activos */}
                    {idx !== activeIdx && (
                      <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white/80 ml-0.5" />
                        </div>
                      </div>
                    )}
                    {/* Título corto en hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-zinc-950/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <p className="text-[9px] font-semibold text-white truncate">{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                aria-label="Proyecto siguiente"
                className="shrink-0 w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/12 hover:border-white/30 flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4 text-zinc-300" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5" role="tablist" aria-label="Selector de proyectos">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={idx === activeIdx}
                  aria-label={`Ir al proyecto ${idx + 1}: ${p.title}`}
                  onClick={() => setActiveIdx(idx)}
                  className={[
                    'rounded-full transition-all duration-300',
                    idx === activeIdx
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50',
                  ].join(' ')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
