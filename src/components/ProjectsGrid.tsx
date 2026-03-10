"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Datos de ejemplo
const PROJECTS_DATA = [
  {
    id: "01",
    client: "MangoFy",
    category: "Branding & UI/UX",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    client: "Arquitectura Studio",
    category: "Desarrollo High-End",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    client: "E-Commerce Finanzas",
    category: "Desarrollo & SEO",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    client: "App Inmobiliaria",
    category: "Diseño UX/UI",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  },
];

export function ProjectsGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    cards.forEach((card) => {
      // Efecto de aparición suave de abajo hacia arriba para cada tarjeta individual
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Se activa justo cuando la tarjeta asoma en la pantalla
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pb-32 md:pb-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* El Grid Asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-16 md:gap-y-0">
          
          {PROJECTS_DATA.map((project, index) => (
            <div 
              key={project.id} 
              // LA MAGIA ASIMÉTRICA: Si el índice es impar (columna derecha), lo empujamos hacia abajo en desktop
              className={`project-card group cursor-pointer flex flex-col ${
                index % 2 !== 0 ? "md:mt-32 lg:mt-48" : "md:mb-32 lg:mb-48"
              }`}
            >
              
              {/* Contenedor de la Imagen */}
              <div className="w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <img 
                  src={project.image} 
                  alt={project.client} 
                  // Efecto zoom en hover muy sutil
                  className="w-full h-full object-cover origin-center scale-[1.02] group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>

              {/* Títulos y Categorías */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-500 font-medium text-sm md:text-base tracking-wide">
                    {project.category}
                  </span>
                  <span className="text-zinc-400 font-mono text-xs">
                    {project.id}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-zinc-900">
                  {project.client}
                </h3>
                
                {/* Línea que aparece en hover */}
                <div className="h-[2px] w-0 bg-zinc-900 mt-6 group-hover:w-full transition-all duration-500 ease-out" />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}