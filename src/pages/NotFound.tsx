"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animación de entrada impecable y escalonada
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2 }
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    );
  }, { scope: containerRef });

  return (
    <main 
      ref={containerRef} 
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 overflow-hidden px-6"
    >
      {/* Luz de fondo fantasmal para darle profundidad 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-zinc-800/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* El 404 Monumental */}
        <h1 
          ref={titleRef}
          className="text-[35vw] md:text-[20rem] leading-[0.85] font-black font-heading tracking-tighter text-zinc-100 select-none"
        >
          404<span className="text-zinc-800">.</span>
        </h1>

        {/* Copy Editorial */}
        <div ref={textRef} className="mt-8 md:mt-12 flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Te saliste del mapa.
          </h2>
          <p className="text-zinc-400 max-w-md text-base md:text-lg leading-relaxed">
            Esta ruta no existe o fue reescrita. Pero en EKI siempre sabemos cómo volver a construir el camino.
          </p>
        </div>

        {/* Botón de retorno premium (Invertido) */}
        <div ref={buttonRef} className="mt-12 md:mt-16">
          <Link 
            to="/"
            className="group flex items-center gap-3 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-5 rounded-full transition-all duration-300"
          >
            {/* La flecha se desliza sutilmente hacia la izquierda en hover */}
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.5} />
            <span>Volver al inicio</span>
          </Link>
        </div>

      </div>

      {/* Marca de agua pequeña abajo */}
      <div className="absolute bottom-8 text-xs font-mono font-bold tracking-widest text-zinc-600 uppercase">
        EKI / ERROR 404
      </div>
    </main>
  );
}