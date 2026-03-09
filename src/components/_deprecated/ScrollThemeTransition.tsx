import { useEffect, useRef, useState } from "react";

export function ScrollThemeTransition({
  children,
  initialReveal = 0.22, // 👈 22% visible de entrada
}: {
  children: React.ReactNode;
  initialReveal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(initialReveal);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Cuando rect.top = 0 => empieza a “trabajar” el sticky
      const t = (0 - rect.top) / vh; // 0 → 1 en 1 viewport
      const clamped = Math.max(0, Math.min(1, t));

      // 👇 mezcla: initialReveal al inicio + scrollProgress para completar
      const mixed = initialReveal + (1 - initialReveal) * clamped;
      setProgress(mixed);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialReveal]);

  // progress=0 => nada, progress=1 => todo
  // clip-path bottom inset: entre (1-progress)*100
  const bottomInset = Math.round((1 - progress) * 100);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0% 0% ${bottomInset}% 0%)` }}
        >
          <div className="absolute inset-0 bg-zinc-950" />
        </div>

        <div className="relative h-full">{children}</div>
      </div>
    </section>
  );
}