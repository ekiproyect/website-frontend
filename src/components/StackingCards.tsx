"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRINCIPLES = [
  {
    id: '01',
    title: 'Nuestra Misión',
    desc: 'Impulsar el crecimiento digital de las marcas desde Antofagasta hacia el mundo. Combinamos diseño de alta gama y tecnología para crear experiencias web que destacan y dominan su sector.',
    image: '/images/mision.jpeg' 
  },
  {
    id: '02',
    title: 'Filosofía',
    desc: 'Creemos que la primera impresión lo es todo. Rechazamos las plantillas genéricas; cada proyecto es una obra de artesanía digital donde el rendimiento y la estética coexisten en perfecta armonía.',
    image: '/images/filosofia.jpeg'
  },
  {
    id: '03',
    title: 'Diseño Premium',
    desc: 'El buen diseño genera confianza inmediata. Creamos interfaces visuales (UI) y experiencias de usuario (UX) meticulosas que capturan la atención en los primeros 3 segundos vitales.',
    image: '/images/diseno.jpeg'
  },
  {
    id: '04',
    title: 'Desarrollo & SEO',
    desc: 'Una arquitectura invisible pero implacable. Escribimos código optimizado para una carga ultrarrápida y aplicamos estrategias SEO para asegurar visibilidad total en los motores de búsqueda.',
    image: '/images/desarrollo.jpeg'
  },
];

export function StackingCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Añadimos la referencia para el color del texto

  useGSAP(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // 1. ANIMACIÓN DE TARJETAS (Se mantiene igual)
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.85, opacity: 0.4, rotationX: -10, transformOrigin: "top center", ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top bottom", end: "top top", scrub: true,
        }
      });
    });
// 🔥 2. EL APAGÓN SINCRONIZADO PERFECTO 🔥
    gsap.to(section, {
      backgroundColor: "#09090b", // Pasa a negro
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "80% center",   // 👈 Ambos empiezan aquí (cuando pasas la última tarjeta)
        end: "bottom bottom",  // 👈 Ambos terminan aquí (justo cuando asoma el footer)
        scrub: true,
      }
    });

    gsap.to(content, {
      color: "#fafafa", // El texto pasa a blanco
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "80% center",   // 👈 Sincronizado con el fondo
        end: "bottom bottom",  // 👈 Sincronizado con el fondo
        scrub: true,
      }
    });

  }, { scope: sectionRef });

 return (
    // Inicia en bg-zinc-50 para conectar con la sección de arriba
    <section ref={sectionRef} className="relative w-full bg-zinc-50 pt-16 md:pt-32 pb-24 md:pb-40 overflow-hidden">
        
      {/* Todo el contenido envuelto aquí. Inicia en text-zinc-900 y pasará a blanco. */}
      <div ref={contentRef} className="text-zinc-900">
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Nuestros Principios
          </h2>
          {/* Cambiamos text-zinc-600 por opacity-70 para que se adapte al cambio de color */}
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            Los pilares fundamentales sobre los que construimos cada proyecto digital en EKI.
          </p>
        </div> 

        <div className="relative flex flex-col gap-[5vh] pb-[5vh]">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.id}
              className="stack-card sticky flex items-center justify-center w-full bg-transparent"
              style={{
                top: `calc(15vh + ${index * 16}px)`, 
                height: '70vh', 
              }}
            >
              
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
                {/* Cambiamos text-zinc-200/50 por opacity-10 para mantener el efecto "fantasma" */}
                <span className="text-[35vw] font-black opacity-[0.07] leading-none">
                  {principle.id}
                </span>
              </div>

              <div className="relative z-10 w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12 items-center">
                
                <div className="text-left lg:text-right z-10">
                  {/* Quitamos text-zinc-900 para que herede la animación */}
                  <h3 className="text-5xl md:text-6xl lg:text-[4vw] xl:text-7xl font-black leading-none tracking-tight">
                    {principle.title}
                  </h3>
                </div>

                <div 
                  className="relative w-full max-w-4xl aspect-[4/3] lg:aspect-video mx-auto z-20 group"
                  style={{ perspective: '1500px' }}
                >
                  <div 
                    className="w-full h-full bg-white border border-zinc-200 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.02]"
                    style={{
                      transform: 'rotateX(4deg) rotateY(-6deg) rotateZ(1deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <img 
                      src={principle.image} 
                      alt={principle.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale z-0" 
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
                    <span 
                      className="relative z-20 font-black text-white drop-shadow-2xl"
                      style={{ 
                        fontSize: 'clamp(10rem, 18vw, 16rem)', 
                        lineHeight: 0.8,
                        transform: 'translateZ(80px)' 
                      }}
                    >
                      {principle.id}
                    </span>
                  </div>
                </div>

                <div className="text-center z-10">
                  {/* Cambiamos text-zinc-600 por opacity-70 */}
                  <p className="text-lg md:text-xl opacity-70 leading-relaxed max-w-sm mx-auto lg:mx-0 lg:ml-6 lg:text-left">
                    {principle.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}