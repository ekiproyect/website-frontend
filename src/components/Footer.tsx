"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react"; // Icono premium para el botón

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // === EL EFECTO APAGÓN (Lights Out) ===
    // Empieza a oscurecerse cuando el footer asoma por debajo de la mitad de la pantalla
    gsap.to(container, {
      backgroundColor: "#09090b", // El equivalente hex a bg-zinc-950 (Oscuridad total)
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "+=300", // Transición rápida y dramática
        scrub: true,
      }
    });

    // El texto hace lo inverso: pasa de negro a blanco brillante
    gsap.to(content, {
      color: "#fafafa", // El equivalente hex a text-zinc-50
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "+=300",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    // INICIA EN BLANCO: Así se pega a StackingCards sin dejar ninguna línea divisoria
    <footer ref={containerRef} className="relative w-full bg-zinc-50 overflow-hidden pt-20 pb-10">
      
      {/* EL ENVOLTORIO DE COLOR: Inicia en texto negro (zinc-900) */}
      <div ref={contentRef} className="max-w-[1400px] mx-auto px-6 md:px-12 text-zinc-900 flex flex-col min-h-[80vh] justify-between">

        {/* TOP SECTION: Call to Action Gigante (Estilo Dixie Raiz) */}
        <div className="flex flex-col items-center justify-center pt-24 md:pt-40 pb-20 text-center">
          <p className="text-sm md:text-lg font-semibold tracking-[0.2em] uppercase opacity-70 mb-6 md:mb-10">
            ¿Tienes un proyecto en mente?
          </p>
          
          <h2 className="text-[14vw] md:text-[11vw] font-black font-heading leading-[0.85] tracking-tighter uppercase cursor-default">
            Iniciemos
          </h2>
          
          <a 
            href="mailto:hola@eki.cl" 
            className="group flex items-center gap-4 mt-12 md:mt-16"
          >
            <span className="text-2xl md:text-5xl font-medium tracking-tight border-b-[3px] border-transparent group-hover:border-current transition-colors duration-300">
              contacto.eki@gmail.com
            </span>
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-current flex items-center justify-center text-zinc-950 group-hover:scale-110 transition-transform duration-300">
              <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </a>
        </div>

        {/* BOTTOM SECTION: Grid arquitectónico de enlaces y datos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end pt-12 md:pt-24 border-t border-current/20">
          
          {/* Ubicación y Branding */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest uppercase opacity-50 mb-4">Sede Central</span>
            <p className="text-xl md:text-2xl font-medium">Antofagasta, Chile</p>
            <p className="text-base md:text-lg font-medium opacity-60">Diseño global, esencia local.</p>
          </div>

          {/* Redes y Copyright */}
          <div className="flex flex-col md:items-end gap-8">
            <div className="flex flex-wrap gap-6 md:gap-10">
              <a href="#" className="text-base md:text-lg font-medium hover:opacity-50 transition-opacity">Instagram</a>
              <a href="#" className="text-base md:text-lg font-medium hover:opacity-50 transition-opacity">LinkedIn</a>
              <a href="#" className="text-base md:text-lg font-medium hover:opacity-50 transition-opacity">Behance</a>
            </div>
            
            <p className="text-sm font-medium opacity-50 mt-4 md:mt-0">
              © 2026 EKI. Todos los derechos reservados.
            </p>
          </div>
          
        </div>

      </div>
    </footer>
  );
}