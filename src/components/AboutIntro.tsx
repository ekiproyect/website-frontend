"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Animación minimalista de entrada (Fade y deslizamiento)
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power3.inOut" },
      "-=0.8"
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    // 🔥 2. EL APAGÓN SINCRONIZADO 🔥
    // Cuando esta sección empieza a irse por arriba, se oscurece
    // exactamente al mismo ritmo que la sección del equipo se ilumina.
    gsap.to(container, {
      backgroundColor: "#09090b", // Pasa a negro (zinc-950)
      color: "#fafafa",           // El texto pasa a blanco (zinc-50)
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "bottom bottom", // Se activa cuando el final de esta sección toca abajo
        end: "bottom 30%",      // Misma duración que la sección MinimalTeam
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    // Inicia con fondo blanco y texto oscuro por defecto
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pt-40 md:pt-56 pb-24 md:pb-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        {/* Título Monumental */}
        <h1 
          ref={titleRef} 
          // Eliminamos text-zinc-900 fijo para que pueda cambiar a blanco con GSAP
          className="text-[12vw] md:text-[8vw] lg:text-[7rem] xl:text-[8.5rem] font-black font-heading leading-[0.9] tracking-tighter uppercase mb-12 md:mb-20"
        >
          Nosotros.
        </h1>

        {/* Línea divisoria minimalista */}
        {/* Usamos bg-current para que cambie de gris oscuro a gris claro automáticamente */}
        <div className="w-full max-w-4xl h-[1px] bg-current opacity-20 origin-center mb-12 md:mb-16" ref={lineRef} />

        {/* Texto de la historia */}
        {/* Eliminamos text-zinc-800 fijo por la misma razón */}
        <p ref={textRef} className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight opacity-90 max-w-4xl">
          Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario. Combinamos estética de alta costura con ingeniería de software para construir experiencias que dominan el mercado.
        </p>

      </div>
    </section>
  );
}