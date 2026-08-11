"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
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
            {/* --display-em medido: "INICIEMOS" son 8.53 em (9 deja margen).
                El estimador por caracteres asume 1.18 em/char y aquí lo achicaría
                un 24%: las cuatro I son muy angostas. Recalcular si cambia el texto. */}
            <span className="fluid-word mx-auto" style={{ ["--display-em" as string]: 9, ["--display-max" as string]: "10rem" }}>
              Iniciemos
            </span>
          </h2>
          
          {/* Sin adorno a la derecha: el correo va solo y centrado, así que no
              necesita el wrapper relativo que existía para colgar la flecha sin
              descentrar el texto. El subrayado en hover es la única señal de que
              es un enlace, y basta. */}
          <a
            href="mailto:ekiteam.contacto@gmail.com"
            className="group flex justify-center mt-12 md:mt-16 w-full px-4"
          >
            {/* break-all salva la vida si alguien abre esto en un celular muy angosto */}
            <span className="text-lg sm:text-xl md:text-4xl lg:text-5xl font-medium tracking-tight border-b-[2px] md:border-b-[3px] border-transparent group-hover:border-current transition-colors duration-300 text-center break-all md:break-normal">
              ekiteam.contacto@gmail.com
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
            
            <div className="flex flex-col items-center md:items-end gap-2">
              {/* Enlace legal: tiene que ser alcanzable desde cualquier página */}
              <Link
                to="/privacidad"
                className="text-xs md:text-sm font-medium opacity-50 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
              >
                Políticas y Privacidad
              </Link>
              <p className="text-xs md:text-sm font-medium opacity-50 text-center md:text-right">
                © 2026 EKI. Todos los derechos reservados.
              </p>
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
}