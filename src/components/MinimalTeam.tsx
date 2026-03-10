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
  {
    id: "04",
    name: "Fernando Condori",
    role: "Socio & Director Creativo",
    image: "/images/team/Fena.webp",
  },
];

export function MinimalTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

 useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // 1. ANIMACIÓN DE LAS TARJETAS (Se mantiene igual)
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
          start: "top 50%", 
        },
      }
    );

    // 🔥 2. EL ARREGLO: EL INTERRUPTOR MAESTRO 🔥
    // Quitamos el 'scrub' y usamos eventos precisos que afectan a ambas secciones
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%", // Se activa un poco antes de que entren las fotos
      onEnter: () => {
        // Oscurece la sección de Equipo Y la sección superior ("Nosotros") al mismo tiempo
        gsap.to([section, section.previousElementSibling], {
          backgroundColor: "#09090b", // Pasa a bg-zinc-950
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(content, { color: "#fafafa", duration: 0.6, overwrite: "auto" });
      },
      onLeaveBack: () => {
        // Si el usuario se arrepiente y hace scroll hacia arriba, enciende la luz de nuevo
        gsap.to([section, section.previousElementSibling], {
          backgroundColor: "#fafafa", // Vuelve a bg-zinc-50
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(content, { color: "#18181b", duration: 0.6, overwrite: "auto" }); // text-zinc-900
      }
    });

  }, { scope: sectionRef });

  return (
    // Restauramos a bg-zinc-50 para que el inicio sea idéntico a la sección superior
    <section ref={sectionRef} className="w-full bg-zinc-50 py-24 md:py-40 px-6 md:px-12">
      
      <div ref={contentRef} className="max-w-[1400px] mx-auto text-zinc-900">
        
        {/* Cabecera sutil */}
        <div className="flex justify-between items-end border-b border-current/20 pb-8 mb-16">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">El Equipo</h2>
          <span className="opacity-60 font-mono text-sm">EKI / 2026</span>
        </div>

        {/* Grid Minimalista (Tu código de miembros sigue intacto aquí adentro) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM_MEMBERS.map((member, index) => (
            <div 
              key={member.id} 
              className={`team-item group cursor-pointer ${index === 3 ? "lg:col-start-2" : ""}`}
            >
              <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-500/10 mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              <div className="flex justify-between items-start">
                <div>
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