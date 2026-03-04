import { useEffect, useRef, useCallback, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** vh extra de scroll room para el takeover (default 1.2) */
  coverAtVh?: number;
  /** fracción inicial ya revelada del panel oscuro (default 0.18) */
  startReveal?: number;
  /**
   * Ref externo al contenedor del dark content.
   * HeroTakeoverStage lo mueve con translateY sincronizado al progreso.
   */
  darkContentRef?: React.RefObject<HTMLDivElement | null>;
}

export function HeroTakeoverStage({
  children,
  coverAtVh = 1.2,
  startReveal = 0.18,
  darkContentRef,
}: Props) {
  const stageRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyProgress = useCallback(
    (t: number) => {
      const vh = window.innerHeight;

      // Panel negro: clip-path sube desde abajo (topInset 82%→0%)
      const panel = panelRef.current;
      if (panel) {
        const progress = startReveal + (1 - startReveal) * t;
        const topInset = Math.round((1 - progress) * 100);
        panel.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
      }

      // Dark content: arranca a 100vh hacia abajo, sube hasta 0
      const dark = darkContentRef?.current;
      if (dark) {
        const translateY = prefersReduced ? 0 : Math.round((1 - t) * vh);
        dark.style.transform = `translateY(${translateY}px)`;
      }

      // Hero: sutil parallax hacia arriba
      const hero = contentRef.current;
      if (hero && !prefersReduced) {
        hero.style.transform = `translateY(${t * -40}px)`;
        hero.style.opacity   = String(Math.max(0, 1 - t * 0.4));
      }
    },
    [prefersReduced, startReveal, darkContentRef],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let rafId: number | null = null;

    const update = () => {
      const rect     = stage.getBoundingClientRect();
      const vh       = window.innerHeight;
      const total    = stage.offsetHeight - vh;
      const scrolled = Math.max(0, -rect.top);
      const t        = total > 0 ? Math.min(1, scrolled / total) : 0;
      applyProgress(t);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [applyProgress]);

  return (
    <div ref={stageRef} style={{ height: `calc(${(1 + coverAtVh) * 100}vh)` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Hero: sube lento por detrás del panel negro */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5]"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="absolute inset-0 bg-zinc-50" />
          {children}
        </div>

        {/* Panel negro: z-10, clip-path inset(top%→0%) = sube desde abajo */}
        <div
          ref={panelRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            clipPath: `inset(${Math.round((1 - startReveal) * 100)}% 0% 0% 0%)`,
            willChange: 'clip-path',
          }}
        >
          <div className="absolute inset-0 bg-zinc-950" />
        </div>

      </div>
    </div>
  );
}
