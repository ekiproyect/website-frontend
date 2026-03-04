import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const WORDS = ['Project', 'Diseño', 'Confianza', 'Equipo', 'Familia', ''];
const INTERVAL_MS = 2800;

interface Props {
  /** Esperar a que IntroOverlay termine antes de arrancar la animación. */
  animate?: boolean;
}

export function RotatingTitleHero({ animate = true }: Props) {
  // Índice de palabra actual
  const [wordIdx, setWordIdx] = useState(0);

  // Ref al span de la palabra rotativa (animado con GSAP)
  const wordRef    = useRef<HTMLSpanElement>(null);
  // Ref guard para StrictMode (evita doble interval en mount)
  const startedRef = useRef(false);
  // Evita closure stale sobre el índice dentro del interval
  const wordIdxRef = useRef(wordIdx);

  // Refs para animación de entrada
  const heroRef  = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);

  // StrictMode-safe: ref guard evita doble interval en dev
  useLayoutEffect(() => {
    if (!animate) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = gsap.context(() => {
      const id = setInterval(() => {
        const el = wordRef.current;
        if (!el) return;

        // ── Salida ──
        gsap.to(el, {
          autoAlpha: 0,
          y: -14,
          filter: 'blur(6px)',
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            // Avanzar índice y sincronizar ref
            const next = (wordIdxRef.current + 1) % WORDS.length;
            wordIdxRef.current = next;
            setWordIdx(next);

            // ── Entrada ──
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 14, filter: 'blur(6px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.38,
                ease: 'power3.out',
              },
            );
          },
        });
      }, INTERVAL_MS);

      return () => clearInterval(id);
    }, heroRef);

    return () => {
      ctx.revert();
      startedRef.current = false;
    };
  }, [animate]);

  useLayoutEffect(() => {
    if (!animate) return;
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subRef.current], { autoAlpha: 0, y: 30 });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.7  }, 0.1)
        .to(subRef.current,   { autoAlpha: 1, y: 0, duration: 0.55 }, 0.3);
    }, heroRef);
    return () => ctx.revert();
  }, [animate]);

  const currentWord = WORDS[wordIdx];

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero principal"
      className="relative flex items-center min-h-[92vh] bg-zinc-50"
    >
      {/* Glow ambiental claro */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-fuchsia-400/10 blur-[160px]" />
        <div className="absolute right-[15%] top-[30%] w-[400px] h-[400px] rounded-full bg-sky-400/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-36 flex flex-col items-center text-center gap-8">

        {/* Título gigante */}
        <div ref={titleRef}>
          <h1 className="font-black leading-[0.95] tracking-tighter text-zinc-900" style={{ fontSize: 'clamp(3.2rem, 10vw, 9rem)' }}>
            EKI
            {/* Palabra rotativa — ancho estabilizado */}
            {currentWord ? (
              <>
                {' '}
                <span
                  ref={wordRef}
                  aria-live="polite"
                  aria-atomic="true"
                  className="inline-block bg-gradient-to-r from-fuchsia-600 via-purple-600 to-sky-600 bg-clip-text text-transparent min-w-[3ch]"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  {currentWord}
                </span>
              </>
            ) : (
              <span
                ref={wordRef}
                aria-hidden
                className="inline-block text-purple-500/50 min-w-[1ch]"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                .
              </span>
            )}
          </h1>
        </div>

        {/* Subtítulo */}
        <p
          ref={subRef}
          className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-xl"
        >
          Empresa de diseño web con sede en Antofagasta. Combinamos diseño de alta gama,
          desarrollo personalizado y SEO estratégico para dar visibilidad a las marcas y
          aumentar el tráfico web.
        </p>
      </div>

    </section>
  );
}
