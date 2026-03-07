"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRINCIPLES = [
  // ... (Mismos datos de PRINCIPLES de tu código anterior)
  {
    id: '01',
    title: 'Diseño Premium',
    desc: 'La calidad y la estética no son opcionales. Creamos experiencias visuales que capturan la atención en los primeros 3 segundos y elevan la percepción de tu marca.',
    color: 'bg-white', 
  },
  {
    id: '02',
    title: 'Desarrollo a Medida',
    desc: 'No usamos plantillas genéricas. Cada línea de código está optimizada para el rendimiento, asegurando una carga ultrarrápida y animaciones fluidas.',
    color: 'bg-zinc-50',
  },
  {
    id: '03',
    title: 'SEO Estratégico',
    desc: 'Un sitio hermoso no sirve de nada si nadie lo visita. Estructuramos cada proyecto con las mejores prácticas de posicionamiento para dominar los buscadores.',
    color: 'bg-white',
  },
  {
    id: '04',
    title: 'Enfoque en Conversión',
    desc: 'Nuestra arquitectura de información y diseño UX/UI están fríamente calculados para guiar al usuario hacia la acción: más leads, más ventas, más crecimiento.',
    color: 'bg-zinc-50',
  },
];

export function StackingCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRevealRef = useRef<HTMLDivElement>(null); // Referencia para el fondo blanco que crece

  useGSAP(() => {
    // 1. LA NUEVA ANIMACIÓN DE ENTRADA DEL FONDO BLANCO
    gsap.fromTo(bgRevealRef.current, 
      { 
        scale: 0.9,             // Entra encogido al 90%
        borderRadius: "60px",   // Bordes súper redondos al entrar
      },
      {
        scale: 1,               // Crece hasta ocupar todo el ancho
        borderRadius: "0px",    // Pierde los bordes redondos al llenarlo todo
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",  // Empieza cuando la sección asoma por abajo
          end: "top top",       // Termina cuando la sección llega arriba del todo
          scrub: true,          // Se vincula al scroll exacto del usuario
        }
      }
    );

    // 2. ANIMACIÓN DE LAS TARJETAS APILABLES (La que ya teníamos)
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.92,
        opacity: 0.7, 
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });
    });
  }, { scope: sectionRef });

  return (
    // CONTENEDOR PADRE NEGRO (Continúa el color de tu carrusel)
    <section ref={sectionRef} className="relative w-full bg-zinc-950 pb-24 md:pb-40">
      
      {/* ESTE ES EL FONDO BLANCO QUE SE EXPANDE (bgRevealRef) */}
      <div 
        ref={bgRevealRef} 
        className="relative w-full bg-zinc-100 text-zinc-900 pt-24 md:pt-40 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Nuestros Principios
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Los pilares fundamentales sobre los que construimos cada proyecto digital en EKI.
            </p>
          </div>

          <div className="relative flex flex-col gap-[5vh] pb-[5vh]">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle.id}
                className={`stack-card sticky flex flex-col justify-center rounded-[40px] border border-zinc-200 p-10 md:p-16 shadow-2xl ${principle.color}`}
                style={{
                  top: `calc(15vh + ${index * 32}px)`, 
                  height: '65vh', 
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                  <span className="text-6xl md:text-8xl font-black text-zinc-200">
                    {principle.id}
                  </span>
                  
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900">
                      {principle.title}
                    </h3>
                    <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}