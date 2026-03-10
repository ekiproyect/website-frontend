"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEAM_MEMBERS = [
  {
    id: "01",
    name: "Ernes Fuenzalida",
    role: "Tech Lead & Fundador",
    image: "/images/team/Ernes.webp",
  },
  {
    id: "02",
    name: "Renato Morales",
    role: "Socio & Director Creativo",
    image: "/images/team/Renato.webp",
  },  {
    id: "03",
    name: "Vicente Araya",
    role: "Socio & Director Creativo",
    image: "/images/team/Vicente.webp",
  },
];

export function MinimalTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Referencia para el contenido interno

  useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // --- 1. TRANSICIÓN DE COLOR DE FONDO Y TEXTO (Dimmer Switch) ---
    const tlColor = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // Empieza cuando la sección asoma por abajo
        end: "top 30%",      // Termina cuando está un poco más arriba del centro
        scrub: true,         // Vinculado al scroll para suavidad total
      }
    });

    tlColor
      .to(section, { backgroundColor: "#09090b", ease: "none" }, 0) // De blanco a negro
      .to(content, { color: "#fafafa", ease: "none" }, 0);          // Texto de negro a blanco

    // --- 2. ANIMACIÓN DE ENTRADA DE LAS TARJETAS ---
    const cards = gsap.utils.toArray(".team-item");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%", // Se activan cuando el fondo ya se ha oscurecido un poco
        },
      }
    );
  }, { scope: sectionRef });

  return (
    // CAMBIO: Inicia en blanco (bg-zinc-50) para fusionarse con la sección anterior
    <section ref={sectionRef} className="w-full bg-zinc-50 py-24 md:py-40 px-6 md:px-12">
      
      {/* CAMBIO: El contenido inicia con texto oscuro (text-zinc-900) */}
      <div ref={contentRef} className="max-w-[1400px] mx-auto text-zinc-900">
        
        {/* Cabecera sutil */}
        {/* CAMBIO: Usamos border-current para que el borde cambie de color con el texto */}
        <div className="flex justify-between items-end border-b border-current/20 pb-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">El Equipo</h2>
          <span className="opacity-60 font-mono text-sm">EKI / 2026</span>
        </div>

        {/* Grid Minimalista */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="team-item group cursor-pointer">
              
              {/* Contenedor de la Imagen */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-200/10 mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              {/* Información debajo de la foto */}
              <div className="flex justify-between items-start">
                <div>
                  {/* CAMBIO: Quitamos text-zinc-100 para que herede el color animado */}
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="opacity-60 text-sm md:text-base font-medium">
                    {member.role}
                  </p>
                </div>
                <span className="opacity-40 font-mono text-xs">
                  {member.id}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}