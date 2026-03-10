"use client";

import { useMemo } from "react";

type TechItem = {
  name: string;
  src: string;
  invert?: boolean;
};

export function TechMarquee() {
  const items: TechItem[] = useMemo(
    () => [
      // Tip: Ponle invert: true a todas las que sean oscuras para que se vean blancas en tu fondo negro
      { name: "React", src: "/tech/react.svg", invert: true }, 
      { name: "Next.js", src: "/tech/nextjs.svg", invert: true },
      { name: "MongoDB", src: "/tech/mongodb.svg", invert: true },
      { name: "Figma", src: "/tech/figma.svg", invert: true },
      { name: "GitHub", src: "/tech/github.svg", invert: true },
      { name: "AWS", src: "/tech/aws.svg", invert: true },
      { name: ".NET", src: "/tech/dotnet.svg", invert: true },
      { name: "FastAPI", src: "/tech/fastapi.svg", invert: true },
      { name: "Express", src: "/tech/express.svg", invert: true },
      { name: "MySQL", src: "/tech/mysql.svg", invert: true },
    ],
    []
  );

  return (
    <section aria-label="Tecnologías" className="relative py-16 md:py-24 bg-zinc-950">
      
      {/* 1. TRUCO FULL BLEED: Esto fuerza al div a medir exactamente el 100% de la pantalla, ignorando márgenes */}
      <div className="relative w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden">
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            /* Ajusta los 35s si sientes que ahora va muy rápido al ser más grande */
            animation: marquee 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Sombras en los bordes para el difuminado */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div className="flex w-max animate-marquee py-4">
          
          {/* GRUPO 1 */}
          {/* 2. AUMENTAMOS EL GAP: De gap-10 pasamos a gap-20 o gap-24 */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 px-8 md:px-12">
            {items.map((t) => (
              <div key={t.name} className="shrink-0 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <img
                  src={t.src}
                  alt={t.name}
                  className={[
                    // 3. AUMENTAMOS EL TAMAÑO: De h-8 pasamos a h-12 y md:h-16
                    "h-12 md:h-16 w-auto select-none pointer-events-none",
                    t.invert ? "invert brightness-0" : "", // brightness-0 asegura que se vuelva 100% blanco puro
                  ].join(" ")}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* GRUPO 2 (Clon) */}
          <div className="flex shrink-0 items-center gap-16 md:gap-24 px-8 md:px-12" aria-hidden="true">
            {items.map((t) => (
              <div key={`${t.name}-dup`} className="shrink-0 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300">
                <img
                  src={t.src}
                  alt=""
                  className={[
                    "h-12 md:h-16 w-auto select-none pointer-events-none",
                    t.invert ? "invert brightness-0" : "",
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