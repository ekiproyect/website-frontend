"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollDarken } from "../hooks/useScrollDarken";

interface FooterProps {
  startsDark?: boolean;
}

export function Footer({ startsDark = false }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Funde el footer y la sección previa (blanca) hacia el negro en sincronía,
  // para que la unión no tenga un corte abrupto. Se omite si ya parte oscuro.
  useScrollDarken({
    trigger: containerRef,
    scope: containerRef,
    bgTargets: () => [containerRef.current, containerRef.current?.previousElementSibling],
    content: contentRef,
    start: "top bottom",
    end: "top 30%",
    enabled: !startsDark,
    dependencies: [startsDark],
  });

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
          
          {/* Título fluido — cabe siempre en una línea, sin corte ni desborde */}
          <h2 className="fluid-display font-black font-heading leading-[0.85] tracking-tighter uppercase cursor-default w-full text-center">
            <span className="fluid-word mx-auto" style={{ ["--display-chars" as string]: 9, ["--display-max" as string]: "10rem" }}>
              Iniciemos
            </span>
          </h2>
          
          {/* w-full + justify-center centra el bloque del correo; la flecha se ancla
              al texto (no al <a>), así el correo queda centrado respecto al título. */}
          <a
            href="mailto:ekiteam.contacto@gmail.com"
            className="group flex flex-col md:flex-row items-center gap-6 md:gap-0 mt-12 md:mt-16 w-full px-4 justify-center"
          >
            {/* Wrapper relativo: el texto centra el grupo, la flecha cuelga sin empujar */}
            <span className="relative inline-flex items-center justify-center">
              {/* break-all salva la vida si alguien abre esto en un celular muy angosto */}
              <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl font-medium tracking-tight border-b-[2px] md:border-b-[3px] border-transparent group-hover:border-current transition-colors duration-300 text-center break-all md:break-normal">
                ekiteam.contacto@gmail.com
              </span>

              {/* Flecha: absoluta a la derecha del texto en desktop, no afecta el centrado */}
              <span className="w-12 h-12 md:w-20 md:h-20 md:absolute md:left-full md:ml-4 md:top-1/2 md:-translate-y-1/2 rounded-full bg-current flex items-center justify-center text-zinc-950 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10" />
              </span>
            </span>
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
              <a href="https://www.instagram.com/ekiproject" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg font-medium hover:opacity-50 transition-opacity">Instagram</a>
              <a href="https://www.linkedin.com/company/ekiproject" target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg font-medium hover:opacity-50 transition-opacity">LinkedIn</a>
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