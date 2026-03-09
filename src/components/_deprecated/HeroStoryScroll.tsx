/**
 * HeroStoryScroll
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout "Awwwards": panel izquierdo sticky + capítulos a la derecha.
 * Animaciones con GSAP (sin ScrollTrigger). Activación con IntersectionObserver.
 */
import { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  Code2,
  Rocket,
  RefreshCw,
  Server,
  Globe,
  Cloud,
  Users,
  Layers,
  ChevronRight,
} from 'lucide-react';

// ─── Capítulos ────────────────────────────────────────────────────────────────

const CHAPTERS = [
  { id: 'filosofia',   label: 'Filosofía',   micro: 'Principios que guían cada decisión.' },
  { id: 'servicios',   label: 'Servicios',   micro: 'End-to-end: diseño, código y deploy.' },
  { id: 'tecnologias', label: 'Tecnologías', micro: 'Stack moderno, elecciones deliberadas.' },
  { id: 'proyectos',   label: 'Proyectos',   micro: 'Casos reales con resultados medibles.' },
  { id: 'team',        label: 'Equipo',      micro: '4 co-founders, sin capas intermedias.' },
] as const;

type ChapterIndex = 0 | 1 | 2 | 3 | 4;

// ─── Datos ────────────────────────────────────────────────────────────────────

const TRUST_CHIPS = [
  { label: 'Entrega iterativa',   icon: RefreshCw },
  { label: 'Arquitectura limpia', icon: Code2     },
  { label: 'DevOps / Deploy',     icon: Rocket    },
  { label: 'Soporte continuo',    icon: Zap       },
];

const PRINCIPIOS = [
  {
    icon: Layers,
    title: 'Código que dura',
    desc: 'Cada decisión técnica pensada para que el sistema escale y sea fácil de mantener.',
  },
  {
    icon: RefreshCw,
    title: 'Iteramos rápido',
    desc: 'Ciclos cortos, feedback continuo y entrega incremental de valor real.',
  },
  {
    icon: Users,
    title: 'Co-founders, no agencia',
    desc: 'Nos involucramos como socios técnicos: dueños del problema, no solo ejecutores.',
  },
];

const SERVICIOS = [
  {
    icon: Globe,
    title: 'Productos web',
    desc: 'SPAs, dashboards, plataformas SaaS y portales B2B. React + Next.js, UI premium.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    icon: Server,
    title: 'Sistemas internos',
    desc: 'APIs, microservicios, integraciones con ERPs/CRMs y automatizaciones de proceso.',
    tags: ['Node.js', 'Python', 'PostgreSQL'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Deploy',
    desc: 'CI/CD, contenedores, infraestructura en nube y monitoreo continuo.',
    tags: ['Docker', 'AWS', 'GitHub Actions'],
  },
];

const TECNOLOGIAS: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  Backend:  ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
  Cloud:    ['Docker', 'AWS', 'GitHub Actions', 'Nginx', 'Vercel'],
};

const PROYECTOS = [
  {
    label: 'Logística / Operaciones',
    title: 'Sistema de gestión operativa',
    problema: 'Procesos manuales causaban errores y retrasos en cada turno.',
    solucion: 'Dashboard en tiempo real con integraciones al ERP existente.',
    resultado: '−40 % de errores operativos en 6 semanas.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    badge: 'Entregado',
  },
  {
    label: 'Retail / E-commerce',
    title: 'Plataforma de pedidos B2B',
    problema: 'Vendedores gestionaban pedidos por WhatsApp y planillas Excel.',
    solucion: 'Portal web con catálogo, carrito y panel de administración.',
    resultado: '+60 % velocidad de despacho, cero pérdida de pedidos.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    badge: 'En producción',
  },
];

const EQUIPO = [
  {
    name: 'Co-founder A',
    role: 'Backend Engineer',
    bio: 'Arquitectura de APIs, bases de datos y sistemas distribuidos.',
    stack: ['Node.js', 'Python', 'PostgreSQL'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Co-founder B',
    role: 'Backend Engineer',
    bio: 'Infraestructura cloud, CI/CD y seguridad de aplicaciones.',
    stack: ['AWS', 'Docker', 'FastAPI'],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Co-founder C',
    role: 'Frontend Engineer',
    bio: 'Interfaces de usuario, design systems y performance web.',
    stack: ['React', 'Next.js', 'TypeScript'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Co-founder D',
    role: 'Frontend Engineer',
    bio: 'Experiencia de usuario, accesibilidad y animaciones avanzadas.',
    stack: ['React', 'Tailwind', 'Figma'],
    gradient: 'from-pink-500 to-rose-500',
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  animate?: boolean;
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function HeroStoryScroll({ animate = true }: Props) {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<ChapterIndex>(0);

  // Hero intro refs
  const heroRef  = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref    = useRef<HTMLHeadingElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);
  const ctasRef  = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  // Panel sticky refs (label + micro animados al cambiar de capítulo)
  const stickyLabelRef = useRef<HTMLSpanElement>(null);
  const stickyMicroRef = useRef<HTMLParagraphElement>(null);

  // Capítulos
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const animatedSet = useRef<Set<number>>(new Set());

  // Reducir animaciones en móvil
  const isMobile = useRef(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  );

  // ── Scroll helper ─────────────────────────────────────────────────────────
  const scrollTo = useCallback(
    (id: string, fallback: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else navigate(fallback);
    },
    [navigate],
  );

  // ── Animación hero intro ──────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!animate) return;
    const ctx = gsap.context(() => {
      gsap.set(
        [badgeRef.current, h1Ref.current, subRef.current, ctasRef.current, chipsRef.current],
        { autoAlpha: 0, y: 28 },
      );
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(badgeRef.current, { autoAlpha: 1, y: 0, duration: 0.5  }, 0.05)
        .to(h1Ref.current,    { autoAlpha: 1, y: 0, duration: 0.65 }, 0.18)
        .to(subRef.current,   { autoAlpha: 1, y: 0, duration: 0.55 }, 0.32)
        .to(ctasRef.current,  { autoAlpha: 1, y: 0, duration: 0.5  }, 0.44)
        .to(chipsRef.current, { autoAlpha: 1, y: 0, duration: 0.5  }, 0.54);
    }, heroRef);
    return () => ctx.revert();
  }, [animate]);

  // ── Animación panel sticky al cambiar capítulo ────────────────────────────
  useLayoutEffect(() => {
    if (!stickyLabelRef.current || !stickyMicroRef.current) return;
    gsap.fromTo(
      [stickyLabelRef.current, stickyMicroRef.current],
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' },
    );
  }, [activeIndex]);

  // ── Animación de capítulo on-enter ────────────────────────────────────────
  const animateChapter = useCallback((idx: number) => {
    const wrapper = chapterRefs.current[idx];
    if (!wrapper) return;

    const blurAmt = isMobile.current ? '2px' : '8px';
    const yAmt    = isMobile.current ? 14   : 24;

    gsap.fromTo(
      wrapper,
      { autoAlpha: 0, y: yAmt, filter: `blur(${blurAmt})` },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
    );

    const children = wrapper.querySelectorAll<HTMLElement>('[data-anim]');
    if (children.length) {
      gsap.fromTo(
        children,
        { autoAlpha: 0, y: isMobile.current ? 8 : 12 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.12 },
      );
    }
  }, []);

  // ── IntersectionObserver por capítulo ─────────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapterRefs.current.forEach((el, idx) => {
      if (!el) return;
      // Oculto inicialmente sin flash
      el.style.opacity = '0';

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setActiveIndex(idx as ChapterIndex);
          if (!animatedSet.current.has(idx)) {
            animatedSet.current.add(idx);
            animateChapter(idx);
          }
        },
        { threshold: 0.25, rootMargin: '0px 0px -80px 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [animateChapter]);

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div>

      {/* ══════════════════════════════════════════
          HERO INTRO  (~70 vh, sin sticky)
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        aria-label="Hero principal"
        className="relative min-h-[70vh] flex items-center"
      >
        {/* glow ambiental */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full bg-purple-700/10 blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col gap-7 max-w-3xl">

          {/* Badge */}
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-purple-300 border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Software a medida · Producto digital
            </span>
          </div>

          {/* H1 */}
          <h1
            ref={h1Ref}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-white"
          >
            Software a medida para{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              operar mejor
            </span>{' '}
            y crecer más rápido.
          </h1>

          {/* Sub */}
          <p ref={subRef} className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
            Somos 4 co-founders —{' '}
            <span className="text-gray-200 font-medium">2 backend + 2 frontend</span>.
            Construimos productos web y sistemas internos end-to-end:{' '}
            <span className="text-gray-200">diseño, desarrollo, despliegue y mejora continua</span>.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => scrollTo('contacto', '/contact')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 group"
              aria-label="Cotizar proyecto"
            >
              Cotizar proyecto
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollTo('proyectos', '/projects')}
              variant="outline"
              size="lg"
              className="border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Ver proyectos"
            >
              Ver proyectos
            </Button>
          </div>

          {/* Trust chips */}
          <div ref={chipsRef} className="flex flex-wrap gap-2 pt-1">
            {TRUST_CHIPS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5"
              >
                <Icon className="w-3 h-3 text-purple-400" strokeWidth={2.2} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <span className="text-[10px] tracking-widest uppercase text-gray-500">scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STORY BLOCK — sticky left + capítulos
      ══════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex gap-0 md:gap-10 lg:gap-16 items-start">

          {/* ── Panel izquierdo sticky ─────────────────────────── */}
          <aside
            aria-label="Navegación de capítulos"
            className="hidden md:flex flex-col sticky top-24 w-[220px] lg:w-[260px] shrink-0 py-10"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 flex flex-col gap-5 shadow-2xl shadow-black/50 overflow-hidden relative">

              {/* glow interno sutil */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 65%)' }}
              />

              {/* Título dinámico */}
              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-1">Explorando</p>
                <span ref={stickyLabelRef} className="block text-lg font-black text-white leading-tight">
                  {CHAPTERS[activeIndex].label}
                </span>
                <p ref={stickyMicroRef} className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {CHAPTERS[activeIndex].micro}
                </p>
              </div>

              <div className="h-px bg-white/10 relative z-10" />

              {/* Stepper */}
              <nav aria-label="Progreso" className="relative z-10 flex flex-col gap-0.5">
                {CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast   = idx < activeIndex;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollTo(ch.id, '/')}
                      aria-current={isActive ? 'step' : undefined}
                      aria-label={`Ir a ${ch.label}`}
                      className={[
                        'flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all duration-300',
                        isActive ? 'bg-purple-500/15 text-white' : 'hover:bg-white/5 text-gray-500 hover:text-gray-300',
                      ].join(' ')}
                    >
                      <span className={[
                        'shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 border',
                        isActive
                          ? 'bg-purple-500 border-purple-400 text-white shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                          : isPast
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                            : 'bg-white/5 border-white/15 text-gray-600',
                      ].join(' ')}>
                        {isPast ? '✓' : idx + 1}
                      </span>
                      <span className="text-xs font-medium">{ch.label}</span>
                      {isActive && <ChevronRight className="ml-auto w-3 h-3 text-purple-400 shrink-0" strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </nav>

              <div className="h-px bg-white/10 relative z-10" />

              {/* CTA */}
              <Button
                onClick={() => scrollTo('contacto', '/contact')}
                size="sm"
                className="relative z-10 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-purple-900/40 transition-all duration-300 group"
                aria-label="Cotizar proyecto"
              >
                Cotizar proyecto
                <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </aside>

          {/* ── Capítulos (derecha) ─────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Divider helper reutilizable */}
            {/* Filosofía */}
            <section
              id="filosofia"
              ref={(el) => { chapterRefs.current[0] = el; }}
              aria-labelledby="cap-filosofia-h"
              className="min-h-[80vh] flex items-center py-20"
            >
              <div className="w-full flex flex-col gap-10">
                <header data-anim>
                  <span className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-3 block">01 — Filosofía</span>
                  <h2 id="cap-filosofia-h" className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    Creemos en el software como{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">herramienta de negocio</span>
                    , no como fin.
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed mt-4 max-w-2xl">
                    Cada decisión técnica responde a un problema real, una métrica que mejorar o una operación que simplificar.
                  </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {PRINCIPIOS.map(({ icon: Icon, title, desc }) => (
                    <article key={title} data-anim className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-purple-500/30 transition-colors duration-300 group">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4 group-hover:bg-purple-500/25 transition-colors">
                        <Icon className="w-4 h-4 text-purple-400" strokeWidth={1.8} />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Servicios */}
            <section
              id="servicios"
              ref={(el) => { chapterRefs.current[1] = el; }}
              aria-labelledby="cap-servicios-h"
              className="min-h-[80vh] flex items-center py-20"
            >
              <div className="w-full flex flex-col gap-10">
                <header data-anim>
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-3 block">02 — Servicios</span>
                  <h2 id="cap-servicios-h" className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    End-to-end, desde la idea{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">hasta producción</span>.
                  </h2>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {SERVICIOS.map(({ icon: Icon, title, desc, tags }) => (
                    <article key={title} data-anim className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col gap-4 hover:border-blue-500/30 transition-colors duration-300 group">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center group-hover:bg-blue-500/25 transition-colors">
                        <Icon className="w-4 h-4 text-blue-400" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {tags.map((t) => (
                          <span key={t} className="text-[10px] font-mono text-gray-400 border border-white/8 bg-white/5 rounded px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Tecnologías */}
            <section
              id="tecnologias"
              ref={(el) => { chapterRefs.current[2] = el; }}
              aria-labelledby="cap-tecnologias-h"
              className="min-h-[80vh] flex items-center py-20"
            >
              <div className="w-full flex flex-col gap-10">
                <header data-anim>
                  <span className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-3 block">03 — Tecnologías</span>
                  <h2 id="cap-tecnologias-h" className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    Stack moderno, decisiones{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">deliberadas</span>.
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed mt-4 max-w-2xl">
                    Elegimos tecnologías probadas en producción, no tendencias de Twitter.
                  </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {(Object.entries(TECNOLOGIAS) as [string, string[]][]).map(([cat, techs]) => (
                    <div key={cat} data-anim>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4">{cat}</p>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((t) => (
                          <span key={t} className="inline-flex items-center text-sm font-medium text-gray-200 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-3.5 py-1.5 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors duration-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Proyectos */}
            <section
              id="proyectos"
              ref={(el) => { chapterRefs.current[3] = el; }}
              aria-labelledby="cap-proyectos-h"
              className="min-h-[80vh] flex items-center py-20"
            >
              <div className="w-full flex flex-col gap-10">
                <header data-anim>
                  <span className="text-xs font-bold tracking-widest uppercase text-pink-400 mb-3 block">04 — Proyectos</span>
                  <h2 id="cap-proyectos-h" className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    Casos reales,{' '}
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">resultados medibles</span>.
                  </h2>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {PROYECTOS.map((p) => (
                    <article key={p.title} data-anim className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col gap-5 hover:border-pink-500/25 transition-colors duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">{p.label}</p>
                          <h3 className="text-base font-bold text-white">{p.title}</h3>
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-2.5 py-0.5">{p.badge}</span>
                      </div>
                      <ul className="space-y-2.5">
                        {[
                          { pre: 'Problema',  c: 'text-red-400',     t: p.problema  },
                          { pre: 'Solución',  c: 'text-blue-400',    t: p.solucion  },
                          { pre: 'Resultado', c: 'text-emerald-400', t: p.resultado },
                        ].map(({ pre, c, t }) => (
                          <li key={pre} className="flex gap-2.5 text-xs leading-relaxed">
                            <span className={`shrink-0 font-semibold ${c} w-[62px] pt-px`}>{pre}</span>
                            <span className="text-gray-300">{t}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-white/8 pt-4 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span key={s} className="text-[10px] font-mono text-gray-400 border border-white/8 bg-white/5 rounded px-2 py-0.5">{s}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
                <div data-anim>
                  <Button
                    onClick={() => navigate('/projects')}
                    variant="outline"
                    size="sm"
                    className="border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                    aria-label="Ver todos los proyectos"
                  >
                    Ver todos los proyectos
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Equipo */}
            <section
              id="team"
              ref={(el) => { chapterRefs.current[4] = el; }}
              aria-labelledby="cap-team-h"
              className="min-h-[80vh] flex items-center py-20"
            >
              <div className="w-full flex flex-col gap-10">
                <header data-anim>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">05 — Equipo</span>
                  <h2 id="cap-team-h" className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    4 co-founders,{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">un solo equipo</span>.
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed mt-4 max-w-2xl">
                    Sin capas intermedias ni PMs que traduzcan. Hablas directo con quien construye tu producto.
                  </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {EQUIPO.map(({ name, role, bio, stack, gradient }) => (
                    <article key={name} data-anim className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 flex flex-col gap-3 hover:border-white/20 transition-colors duration-300">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-black text-white text-sm shadow-lg`}>
                        {name.charAt(name.length - 1)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{name}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{role}</p>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed flex-1">{bio}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/8">
                        {stack.map((s) => (
                          <span key={s} className="text-[10px] font-mono text-gray-500 border border-white/8 bg-white/5 rounded px-1.5 py-0.5">{s}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

          </div>{/* /capítulos */}
        </div>{/* /story block */}
      </div>

      {/* ══════════════════════════════════════════
          CONTACTO
      ══════════════════════════════════════════ */}
      <section id="contacto" aria-label="Contacto" className="relative py-28 md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-purple-700/10 blur-[130px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-purple-400 mb-6">Hablemos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            ¿Tienes un proyecto en mente?{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Cuéntanos.</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Te respondemos en menos de 24 horas.
          </p>
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 group"
            aria-label="Enviar mensaje"
          >
            Enviar mensaje
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </div>
  );
}
