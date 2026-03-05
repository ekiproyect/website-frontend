import { useEffect, useRef, useCallback, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  coverAtVh?: number;
  startReveal?: number;
}

export function HeroTakeoverStage({
  children,
  coverAtVh = 0.9,
  startReveal = 0.18,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyProgress = useCallback(
    (t: number) => {
      // Panel negro: se revela desde abajo
      const panel = panelRef.current;
      if (panel) {
        const progress = startReveal + (1 - startReveal) * t;
        const topInset = Math.round((1 - progress) * 100);
        panel.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
      }

      // Hero claro: leve parallax y fade sutil
      const hero = contentRef.current;
      if (hero && !prefersReduced) {
        const y = t * -24; // más sutil que antes
        const opacity = Math.max(0.78, 1 - t * 0.18); // apenas baja

        hero.style.transform = `translateY(${y}px)`;
        hero.style.opacity = String(opacity);
      }
    },
    [prefersReduced, startReveal]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let rafId: number | null = null;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = stage.offsetHeight - vh;
      const scrolled = Math.max(0, -rect.top);
      const t = total > 0 ? Math.min(1, scrolled / total) : 0;

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
        {/* Hero claro */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[5]"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="absolute inset-0 bg-zinc-50" />
          {children}
        </div>

        {/* Panel negro */}
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