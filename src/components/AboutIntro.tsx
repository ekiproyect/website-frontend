"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AboutIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Animación minimalista: Fade y un ligero deslizamiento hacia arriba
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pt-40 md:pt-56 pb-24 md:pb-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Título Monumental */}
        {/* Título Monumental (Ajustado) */}
        <h1 
          ref={titleRef} 
          // Bajamos de 15vw/12vw a tamaños más controlables, usando clamp() para que nunca se rompa
          className="text-[12vw] md:text-[8vw] lg:text-[7rem] xl:text-[8.5rem] font-black font-heading leading-[0.9] tracking-tighter uppercase text-zinc-900 mb-12 md:mb-20"
        >
          Nosotros.
        </h1>

        {/* Línea divisoria minimalista */}
        <div className="w-full h-[1px] bg-zinc-300 origin-left mb-12 md:mb-16" ref={lineRef} />

        {/* Layout asimétrico para el texto (Estilo Edge Studio) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Espacio vacío a la izquierda (ocupa 5 columnas en desktop) */}
          <div className="hidden md:block md:col-span-5" />
          
          {/* Texto de la historia a la derecha (ocupa 7 columnas en desktop) */}
          <div className="md:col-span-7">
            <p ref={textRef} className="text-2xl md:text-4xl lg:text-5xl  text-center font-medium leading-[1.3] tracking-tight text-zinc-800">
              Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario. Combinamos estética de alta costura con ingeniería de software para construir experiencias que dominan el mercado.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}