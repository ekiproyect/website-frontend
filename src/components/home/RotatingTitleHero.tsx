import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo3D } from '../Logo3D';

const WORDS = ['Project', 'Diseño', 'Confianza', 'Equipo', 'Familia', ''];
const INTERVAL_MS = 2800;

interface Props {
  animate?: boolean;
}

export function RotatingTitleHero({ animate = true }: Props) {
  const [wordIdx, setWordIdx] = useState(0);

  const wordRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const wordIdxRef = useRef(wordIdx);

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null); 
  const playedRef = useRef(false);

  // --- ANIMACIÓN DEL TEXTO ROTATIVO ---
  useLayoutEffect(() => {
    if (!animate) return;
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = gsap.context(() => {
      const id = setInterval(() => {
        const el = wordRef.current;
        if (!el) return;

        gsap.to(el, {
          autoAlpha: 0,
          y: -14,
          filter: 'blur(6px)',
          duration: 0.3,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: () => {
            const next = (wordIdxRef.current + 1) % WORDS.length;
            wordIdxRef.current = next;
            setWordIdx(next);

            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 14, filter: 'blur(6px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.38,
                ease: 'power3.out',
                overwrite: 'auto',
              }
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

  // --- ANIMACIÓN DE ENTRADA GENERAL ---
  useLayoutEffect(() => {
    if (!animate) return;

    const title = titleRef.current;
    const sub = subRef.current;
    const logo = logoRef.current;
    if (!title || !sub || !logo) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.set(contentRef.current, { visibility: 'visible' });
      }

      gsap.set(title, {
        clipPath: 'inset(0 0 100% 0)',
        y: 8,
        willChange: 'clip-path, transform',
      });

      gsap.set(sub, {
        autoAlpha: 0,
        y: 16,
        willChange: 'transform, opacity',
      });

      gsap.set(logo, {
        autoAlpha: 0,
        x: 40,
        scale: 0.9,
      });

      if (playedRef.current) return;
      playedRef.current = true;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', overwrite: 'auto' },
      });

      tl.to(title, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.72 }, 0)
        .to(sub, { autoAlpha: 1, y: 0, duration: 0.52 }, 0.42)
        .to(logo, { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.2)' }, 0.2); 

      tl.pause();
      requestAnimationFrame(() => tl.play(0));
    }, heroRef);

    return () => {
      ctx.revert();
      if (!animate) playedRef.current = false;
    };
  }, [animate]);

  const currentWord = WORDS[wordIdx];

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero principal"
      className="relative flex items-center min-h-[84vh] bg-transparent"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-zinc-300/30 blur-[160px]" />
        <div className="absolute right-[10%] top-[30%] w-[400px] h-[400px] rounded-full bg-zinc-400/10 blur-[120px]" />
      </div>

      <div
        ref={contentRef}
        // CAMBIO 1: max-w-7xl -> max-w-[1400px] y ajustamos el grid para darle más espacio al texto (1.1fr vs 0.9fr)
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center"
        style={{ visibility: 'hidden' }}
      >
        {/* COLUMNA IZQUIERDA: Texto y CTA */}
        {/* COLUMNA IZQUIERDA: Texto y CTA */}
        {/* TRUCO 1: min-w-0 evita que el Grid crezca horizontalmente y mueva las cosas */}
        <div className="flex flex-col items-start text-left gap-8 order-2 lg:order-1 min-w-0">
          
          {/* TRUCO 2: Un contenedor con altura fija (min-h). 
              El H1 bailará aquí adentro, pero el subtítulo de abajo jamás se enterará */}
          <div ref={titleRef} className="w-full min-h-[140px] md:min-h-[160px] lg:min-h-[200px] flex items-start">
            
            <h1
              className="font-semibold font-heading leading-[0.95] tracking-tighter text-zinc-900 flex flex-wrap items-baseline gap-x-4 lg:gap-x-6 w-full"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }} 
            >
              <span>EKI</span>
              {currentWord ? (
                <span
                  ref={wordRef}
                  aria-live="polite"
                  aria-atomic="true"
                  className="font-heading italic inline-block bg-gradient-to-r from-stone-400 to-stone-600 bg-clip-text text-transparent pb-[0.2em] pr-[0.2em]"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  {currentWord}
                </span>
              ) : (
                <span
                  ref={wordRef}
                  aria-hidden
                  className="inline-block text-zinc-900 -ml-4 lg:-ml-6 pb-[0.2em]"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  .
                </span>
              )}
            </h1>

          </div>

          <p
            ref={subRef}
            className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-lg text-left"
          >
            Empresa de diseño web con sede en Antofagasta. Combinamos diseño de alta gama,
            desarrollo personalizado y SEO estratégico para dar visibilidad a las marcas y
            aumentar el tráfico web.
          </p>
        </div>

        {/* COLUMNA DERECHA: El Logo 3D */}
        <div 
          ref={logoRef} 
          className="w-full h-[350px] lg:h-[550px] flex items-center justify-center order-1 lg:order-2"
        >
          <Logo3D />
        </div>
      </div>
    </section>
  );
}