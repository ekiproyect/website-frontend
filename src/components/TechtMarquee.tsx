import { useEffect, useMemo, useRef } from "react";

type TechItem = {
  name: string;
  src: string;
  invert?: boolean;
};

export function TechMarquee() {
  const items: TechItem[] = useMemo(
    () => [
      { name: "React", src: "/tech/react.svg" },
      { name: "Next.js", src: "/tech/nextjs.svg", invert: true },
      { name: "TypeScript", src: "/tech/typescript.svg" },
      { name: "Tailwind", src: "/tech/tailwind.svg" },
      { name: "Node.js", src: "/tech/nodejs.svg" },
      { name: "PostgreSQL", src: "/tech/postgresql.svg" },
      { name: "Docker", src: "/tech/docker.svg" },
      { name: "Figma", src: "/tech/figma.svg" },
      { name: "GitHub", src: "/tech/github.svg", invert: true },
    ],
    []
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let start = performance.now();
    let setWidth = 0;

    const measure = () => {
      // ancho exacto del set original
      setWidth = set.getBoundingClientRect().width;
    };

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000; // segundos
      const speed = 120; // px/seg (sube/baja a gusto)
      const x = -(elapsed * speed) % setWidth; // loop perfecto
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      // reiniciar baseline para evitar saltos raros tras resize
      start = performance.now();
    };

    measure();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section aria-label="Tecnologías" className="relative py-10 md:py-12">
      {/* FULL BLEED */}
      <div
        ref={viewportRef}
        className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-zinc-950 to-transparent" />

        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex items-center gap-10 md:gap-14 py-4"
          style={{ willChange: "transform" }}
        >
          {/* SET ORIGINAL (medimos este) */}
          <div ref={setRef} className="flex items-center gap-10 md:gap-14">
            {items.map((t) => (
              <div key={t.name} className="shrink-0 opacity-80 hover:opacity-100 transition-opacity">
                <img
                  src={t.src}
                  alt={t.name}
                  className={[
                    "h-7 md:h-8 w-auto select-none pointer-events-none",
                    t.invert ? "invert brightness-110" : "",
                  ].join(" ")}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* DUPLICADO (para loop infinito sin salto) */}
          <div className="flex items-center gap-10 md:gap-14" aria-hidden="true">
            {items.map((t) => (
              <div key={`${t.name}-dup`} className="shrink-0 opacity-80">
                <img
                  src={t.src}
                  alt=""
                  className={[
                    "h-7 md:h-8 w-auto select-none pointer-events-none",
                    t.invert ? "invert brightness-110" : "",
                  ].join(" ")}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}