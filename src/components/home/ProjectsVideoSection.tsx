import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export function ProjectsVideoSection() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLayoutEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right || prefersReduced) return;

    gsap.set([left, right], { autoAlpha: 0, y: 32 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(left, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .to(right, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.12);

        observer.disconnect();
      },
      { threshold: 0.12 }
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

  const goTo = (idx: number) => {
    setActiveIdx(idx);
  };

  const prev = () => goTo((activeIdx - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => goTo((activeIdx + 1) % PROJECTS.length);

  const active = PROJECTS[activeIdx];

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative z-10 w-full py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT */}
          <div ref={leftRef} className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
              Diseño Web · Antofagasta
            </span>

            <h2
              className="leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              <span className="font-black text-white">¿Tu sitio web te está</span>
              <br />
              <em
                className="font-light text-zinc-300 not-italic"
                style={{ fontStyle: 'italic' }}
              >
                costando clientes?
              </em>
            </h2>

            <p className="text-zinc-400 leading-relaxed max-w-md text-sm">
              Si tu sitio no refleja la calidad de tu trabajo, está alejando a los
              clientes que mereces.
            </p>

            <p className="text-zinc-500 leading-relaxed max-w-md text-sm">
              En EKI creamos sitios que capturan atención en segundos, generan
              confianza y trabajan por ti las 24 horas — combinando diseño de alto
              nivel, desarrollo a medida y SEO estratégico.
            </p>

            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle
                    className="w-4 h-4 text-fuchsia-400 shrink-0"
                    aria-hidden
                  />
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

          {/* RIGHT */}
          <div ref={rightRef} className="flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-white/10">
              <div className="aspect-video w-full bg-zinc-800 relative">
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

              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-500">
                    {active.category}
                  </span>

                  <div className="flex gap-1.5 flex-wrap">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-bold text-lg leading-snug">{active.title}</h3>
                <p className="text-sm text-zinc-400">{active.outcome}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {PROJECTS.filter((_, i) => i !== activeIdx).map((p) => {
                const realIdx = PROJECTS.indexOf(p);

                return (
                  <button
                    key={p.id}
                    onClick={() => goTo(realIdx)}
                    className="relative rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-white/10 hover:ring-white/30 transition-colors group"
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
                      <p className="text-[11px] font-semibold text-zinc-300 truncate">
                        {p.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

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