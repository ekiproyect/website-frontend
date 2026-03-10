"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterProps {
  startsDark?: boolean;
}

export function Footer({ startsDark = false }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (startsDark) return;

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    gsap.to(container, {
      backgroundColor: "#09090b", 
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "top 30%",
        scrub: true,
      }
    });

    gsap.to(content, {
      color: "#fafafa",
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "+=300",
        scrub: true,
      }
    });
  }, { scope: containerRef, dependencies: [startsDark] });

  return (
    <footer 
      ref={containerRef} 
      className={`relative w-full overflow-hidden pt-20 pb-10 ${startsDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}
    >
      <div 
        ref={contentRef} 
        className={`max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col min-h-[80vh] justify-between ${startsDark ? 'text-zinc-50' : 'text-zinc-900'}`}
      >

        {/* TOP SECTION: Call to Action Gigante */}
        <div className="flex flex-col items-center justify-center pt-24 md:pt-40 pb-20 text-center w-full">
          <p className="text-xs md:text-lg font-semibold tracking-[0.2em] uppercase opacity-70 mb-6 md:mb-10 text-center w-full">
            ¿Tienes un proyecto en mente?
          </p>
          
          {/* 🔥 ARREGLO 1: Bajamos a 11vw en móvil. 9 letras * 11vw = 99vw (Cabe exacto en la pantalla) 🔥 */}
          <h2 className="text-[11vw] md:text-[9vw] lg:text-[8rem] xl:text-[10rem] font-black font-heading leading-[0.85] tracking-tighter uppercase cursor-default w-full text-center">
            Iniciemos
          </h2>
          
          {/* 🔥 ARREGLO 2: flex-col en móvil para el correo largo, y texto más pequeño 🔥 */}
          <a 
            href="mailto:contacto.eki@gmail.com" 
            className="group flex flex-col md:flex-row items-center gap-6 md:gap-4 mt-12 md:mt-16 w-full px-4 justify-center"
          >
            {/* break-all salva la vida si alguien abre esto en un celular muy angosto */}
            <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl font-medium tracking-tight border-b-[2px] md:border-b-[3px] border-transparent group-hover:border-current transition-colors duration-300 text-center break-all md:break-normal">
              contacto.eki@gmail.com
            </span>
            
            {/* Ahora la flecha está abajo en móvil y a la derecha en PC, siempre visible */}
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-current flex items-center justify-center text-zinc-950 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </a>
        </div>

        {/* BOTTOM SECTION: Grid de enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-12 md:pt-24 border-t border-current/20">
          
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 mb-4">Sede Central</span>
            <p className="text-xl md:text-2xl font-medium">Antofagasta, Chile</p>
            <p className="text-base md:text-lg font-medium opacity-60">Diseño global, esencia local.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-10">
              <a href="#" className="text-sm md:text-lg font-medium hover:opacity-50 transition-opacity">Instagram</a>
              <a href="#" className="text-sm md:text-lg font-medium hover:opacity-50 transition-opacity">LinkedIn</a>
              <a href="#" className="text-sm md:text-lg font-medium hover:opacity-50 transition-opacity">Behance</a>
            </div>
            
            <p className="text-xs md:text-sm font-medium opacity-50 text-center md:text-right">
              © 2026 EKI. Todos los derechos reservados.
            </p>
          </div>
          
        </div>

      </div>
    </footer>
  );
}