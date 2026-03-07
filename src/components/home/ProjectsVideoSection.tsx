import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
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
  const [, setActiveIdx] = useState(0); // (lo dejo para no romper nada; luego lo limpiamos)

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative z-10 w-full pt-0 pb-12 md:pb-16 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT (se queda igual) */}
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
              <em className="font-light text-zinc-300 not-italic" style={{ fontStyle: 'italic' }}>
                costando clientes?
              </em>
            </h2>

            <p className="text-zinc-400 leading-relaxed max-w-md text-sm">
              Si tu sitio no refleja la calidad de tu trabajo, está alejando a los clientes que mereces.
            </p>

            <p className="text-zinc-500 leading-relaxed max-w-md text-sm">
              En EKI creamos sitios que capturan atención en segundos, generan confianza y trabajan por ti las 24 horas —
              combinando diseño de alto nivel, desarrollo a medida y SEO estratégico.
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

          {/* RIGHT (reemplazado por WebP) */}
          <div ref={rightRef} className="w-full">
            <div className="relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.55)]">
              <img
                src="/mockups/projects-showcase.webp"
                alt="Projects showcase"
                className="w-full h-auto object-cover"
                loading="lazy"
                draggable={false}
              />
              {/* overlay sutil para premium look */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
            </div>

            {/* Opcional: mini caption */}
            <div className="mt-3 text-xs text-zinc-500">
              Ejemplos de interfaces reales construidas por EKI.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}