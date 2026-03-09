import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Code2, Rocket, RefreshCw } from 'lucide-react';

interface HeroSectionProps {
  /** Si es true, lanza las animaciones de entrada */
  animate?: boolean;
}

const TRUST_CHIPS = [
  { label: 'Entrega iterativa',          icon: RefreshCw  },
  { label: 'Arquitectura limpia',        icon: Code2      },
  { label: 'DevOps / Deploy',            icon: Rocket     },
  { label: 'Soporte y mejora continua',  icon: Zap        },
];

const FEATURED_STACK = ['React', 'Node.js', 'PostgreSQL', 'Docker'];

export function HeroSection({ animate = true }: HeroSectionProps) {
  const navigate = useNavigate();

  // Refs para animaciones
  const sectionRef   = useRef<HTMLElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const h1Ref        = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const chipsRef     = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      // Estado inicial — invisible y desplazado
      gsap.set(
        [badgeRef.current, h1Ref.current, subRef.current, ctasRef.current, chipsRef.current, cardRef.current],
        { autoAlpha: 0, y: 24 }
      );

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(badgeRef.current,  { autoAlpha: 1, y: 0, duration: 0.5 }, 0.05)
        .to(h1Ref.current,     { autoAlpha: 1, y: 0, duration: 0.6 }, 0.18)
        .to(subRef.current,    { autoAlpha: 1, y: 0, duration: 0.55 }, 0.34)
        .to(ctasRef.current,   { autoAlpha: 1, y: 0, duration: 0.5  }, 0.46)
        .to(chipsRef.current,  { autoAlpha: 1, y: 0, duration: 0.5  }, 0.56)
        .to(cardRef.current,   { autoAlpha: 1, y: 0, duration: 0.55 }, 0.52);
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  // ── Handlers de navegación ─────────────────────────────────────────────────
  const handleCotizar = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
    }
  };

  const handleProyectos = () => {
    const el = document.getElementById('proyectos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/projects');
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      aria-label="Hero — EKI Project"
    >
      {/* Glow ambiental centrado, muy sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 w-[400px] h-[400px] rounded-full bg-blue-700/8 blur-[100px]" />
      </div>

      {/* Layout principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

        {/* ── Columna izquierda ── */}
        <div className="flex flex-col gap-7">

          {/* A) Badge */}
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-purple-300 border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Software a medida · Producto digital
            </span>
          </div>

          {/* B) H1 */}
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

          {/* C) Subheadline */}
          <p
            ref={subRef}
            className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
          >
            Somos 4 co-founders —{' '}
            <span className="text-gray-200 font-medium">2 backend + 2 frontend</span>.
            Construimos productos web y sistemas internos end-to-end:{' '}
            <span className="text-gray-200">diseño, desarrollo, despliegue y mejora continua</span>.
          </p>

          {/* D) CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              onClick={handleCotizar}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 group"
              aria-label="Cotizar proyecto"
            >
              Cotizar proyecto
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={handleProyectos}
              variant="outline"
              size="lg"
              className="border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              aria-label="Ver proyectos"
            >
              Ver proyectos
            </Button>
          </div>

          {/* E) Trust chips */}
          <div
            ref={chipsRef}
            className="flex flex-wrap gap-2 pt-1"
          >
            {TRUST_CHIPS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5 hover:border-white/20 transition-colors"
              >
                <Icon className="w-3 h-3 text-purple-400" strokeWidth={2.2} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Columna derecha — Featured card ── */}
        <div ref={cardRef} className="w-full">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-7 md:p-8 shadow-2xl shadow-black/40 overflow-hidden group">

            {/* Glow edge sutil */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(59,130,246,0.04) 100%)',
              }}
            />

            {/* Header de la card */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
                  Proyecto destacado
                </span>
                <h3 className="mt-1 text-xl font-bold text-white leading-snug">
                  Sistema de gestión operativa
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium tracking-wide">
                  Logística / Operaciones
                </p>
              </div>
              {/* Badge de resultado */}
              <span className="shrink-0 text-xs font-semibold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-3 py-1">
                Entregado
              </span>
            </div>

            {/* Problema → Solución → Resultado */}
            <ul className="space-y-3 mb-7">
              {[
                {
                  prefix: 'Problema',
                  prefixColor: 'text-red-400',
                  text: 'Procesos manuales en papel causaban errores y retrasos en cada turno.',
                },
                {
                  prefix: 'Solución',
                  prefixColor: 'text-blue-400',
                  text: 'Plataforma web interna con dashboard en tiempo real e integraciones con su ERP.',
                },
                {
                  prefix: 'Resultado',
                  prefixColor: 'text-emerald-400',
                  text: '−40 % de errores operativos y visibilidad completa del proceso en 6 semanas.',
                },
              ].map(({ prefix, prefixColor, text }) => (
                <li key={prefix} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className={`shrink-0 font-semibold ${prefixColor} w-[72px] pt-px`}>
                    {prefix}
                  </span>
                  <span className="text-gray-300">{text}</span>
                </li>
              ))}
            </ul>

            {/* Separador */}
            <div className="border-t border-white/8 mb-5" />

            {/* Stack chips */}
            <div className="flex flex-wrap gap-2">
              {FEATURED_STACK.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium text-gray-300 border border-white/10 bg-white/5 rounded px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
