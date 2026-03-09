"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// El manifiesto de tu agencia. Puedes editar este texto a tu gusto.
const STORY_TEXT = 
  "Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario. En EKI, cada línea de código y cada píxel tiene un propósito estratégico. Rechazamos lo genérico. Construimos experiencias digitales a medida que capturan la atención, imponen autoridad y escalan tu negocio hacia el futuro.";

export function StoryReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Seleccionamos todas las palabras que separamos en el render
    const words = gsap.utils.toArray<HTMLSpanElement>(".story-word");

    // GSAP anima la opacidad de 0.15 a 1 a medida que haces scroll
    gsap.fromTo(
      words,
      { opacity: 0.15 }, // Estado inicial: texto "apagado"
      {
        opacity: 1,      // Estado final: texto "encendido" (negro sólido)
        ease: "none",
        stagger: 0.1,    // Crea el efecto dominó palabra por palabra
        scrollTrigger: {
          trigger: container,
          start: "top 60%",    // Empieza a iluminarse cuando la sección llega un poco más arriba de la mitad
          end: "bottom 70%",   // Termina de iluminarse antes de salir de la pantalla
          scrub: true,         // Suavidad vinculada a la rueda del ratón
        },
      }
    );
  }, { scope: containerRef });

  // Dividimos el texto en un array de palabras para poder animarlas individualmente
  const words = STORY_TEXT.split(" ");

  return (
    // SECCIÓN BLANCA: bg-zinc-50 para crear el contraste perfecto con el hero y el equipo
    <section ref={containerRef} className="relative w-full bg-zinc-50 text-zinc-900 py-32 md:py-48 lg:py-60 px-6 md:px-12 overflow-hidden">
      
      <div className="max-w-[1300px] mx-auto flex flex-col items-start">
        
        {/* Pequeña etiqueta superior */}
        <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-zinc-400 mb-8 md:mb-16 block">
          Nuestra Historia
        </span>

        {/* El Texto Gigante Animado */}
        <p 
          ref={textRef} 
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium leading-[1.3] tracking-tight"
        >
          {words.map((word, index) => (
            <span key={index} className="story-word inline-block">
              {word}&nbsp; {/* &nbsp; asegura que haya un espacio real entre las palabras */}
            </span>
          ))}
        </p>
        
      </div>
    </section>
  );
}