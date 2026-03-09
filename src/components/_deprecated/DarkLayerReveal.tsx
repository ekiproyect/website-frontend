import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  /** Fracción de la pantalla ya visible al inicio (0–1, default 0.22) */
  startReveal?: number;
  /** Cuántos vh de scroll cubre el takeover completo (default 0.75) */
  coverAtVh?: number;
  /** Callback con t ∈ [0,1] — sin re-render (opcional) */
  onProgress?: (t: number) => void;
}

/**
 * Capa oscura fixed que sube desde abajo mediante clip-path.
 * Uso standalone: monta sin wrapper, reacciona a window.scrollY.
 */
export function DarkLayerReveal({ startReveal = 0.22, coverAtVh = 0.75, onProgress }: Props) {
  const layerRef     = useRef<HTMLDivElement>(null);
  const onProgressRef = useRef(onProgress);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const setClip = gsap.quickSetter(el, 'clipPath');
    let rafId: number | null = null;

    const update = () => {
      const t = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * coverAtVh)));
      onProgressRef.current?.(t);
      const progress = startReveal + (1 - startReveal) * t;
      const topInset = Math.round((1 - progress) * 100);
      setClip(`inset(${topInset}% 0% 0% 0%)`);
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
  }, [startReveal, coverAtVh]);

  return (
    <div
      ref={layerRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{ clipPath: `inset(${Math.round((1 - startReveal) * 100)}% 0% 0% 0%)` }}
    >
      <div className="absolute inset-0 bg-zinc-950" />
    </div>
  );
}