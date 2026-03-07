import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo3D } from '../Logo3D'; // <-- Ajusta esta ruta según dónde guardaste el componente

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
  const logoRef = useRef<HTMLDivElement>(null); // <-- Nueva referencia para animar la entrada del 3D
  const playedRef = useRef(false);

  // --- ANIMACIÓN DEL TEXTO ROTATIVO (Sin cambios) ---
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

      // Preparamos el logo 3D para que entre desde la derecha y un poco más pequeño
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
        // Animamos el logo con un efecto "back" para que rebote suavemente al final
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
      // 1. CAMBIO: Quitamos bg-zinc-50 y ponemos bg-transparent
      className="relative flex items-center min-h-[84vh] bg-transparent"
    >
      {/* 2. CAMBIO: Quitamos overflow-hidden para que el blur no se corte feo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-fuchsia-400/10 blur-[160px]" />
        <div className="absolute right-[10%] top-[30%] w-[400px] h-[400px] rounded-full bg-sky-400/8 blur-[120px]" />
      </div>

      <div
        ref={contentRef}
        // 3. CAMBIO: Aumentamos lg:gap-8 a lg:gap-24 (o lg:gap-32 si lo quieres AÚN más separado)
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        style={{ visibility: 'hidden' }}
      >
        {/* COLUMNA IZQUIERDA: Texto y CTA */}
        <div className="flex flex-col items-start text-left gap-8 order-2 lg:order-1">
          <div ref={titleRef}>
            {/* Ajusté un poquito el clamp() porque en dos columnas el texto necesita ser un 10% más pequeño para no desbordar */}
            <h1
              className="font-black leading-[0.95] tracking-tighter text-zinc-900"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }} 
            >
              EKI
              {currentWord ? (
                <>
                  <br className="hidden lg:block" /> {/* Salto de línea opcional para que la palabra baje */}
                  <span
                    ref={wordRef}
                    aria-live="polite"
                    aria-atomic="true"
                    className="inline-block bg-gradient-to-r from-fuchsia-600 via-purple-600 to-sky-600 bg-clip-text text-transparent min-w-[3ch] mt-2 lg:mt-0"
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

          <p
            ref={subRef}
            className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed max-w-lg"
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