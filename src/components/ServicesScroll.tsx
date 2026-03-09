"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Globe,
  Smartphone,
  Cloud,
  Database,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: "01",
    title: "Desarrollo Web",
    desc: "Creamos plataformas web de alto rendimiento, escalables y con un diseño de interfaz (UI) inmersivo que convierte visitantes en clientes.",
    Icon: Globe,
  },
  {
    id: "02",
    title: "Desarrollo Móvil",
    desc: "Aplicaciones nativas y multiplataforma diseñadas para ofrecer experiencias fluidas, intuitivas y adictivas en la palma de la mano.",
    Icon: Smartphone,
  },
  {
    id: "03",
    title: "Soluciones Cloud",
    desc: "Arquitectura en la nube robusta y elástica. Diseñamos infraestructuras preparadas para escalar globalmente sin interrupciones.",
    Icon: Cloud,
  },
  {
    id: "04",
    title: "Backend & APIs",
    desc: "El motor invisible de tu negocio. Desarrollamos lógicas de servidor seguras, rápidas y APIs estructuradas para conectar cualquier ecosistema.",
    Icon: Database,
  },
  {
    id: "05",
    title: "Seguridad & Compliance",
    desc: "Protección de datos de grado militar. Auditamos y blindamos tu código para cumplir con los estándares internacionales más exigentes.",
    Icon: ShieldCheck,
  },
  {
    id: "06",
    title: "DevOps & CI/CD",
    desc: "Automatización total. Optimizamos los flujos de integración y despliegue continuo para que lances actualizaciones rápido y sin miedo.",
    Icon: GitBranch,
  },
];

export function ServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: () => getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-zinc-950 overflow-hidden w-screen left-1/2 -translate-x-1/2 flex flex-col justify-center"
    >
      {/* 1. TÍTULO FIJO: Flota arriba, alineado con el grid principal, y NUNCA se mueve en el eje X */}
      <div className="absolute inset-x-0 top-[12vh] md:top-[18vh] z-10 pointer-events-none">
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
    <h2 className="text-4xl md:text-6xl font-black font-heading text-zinc-100 tracking-tighter">
      ¿Qué{" "}
      <span className="italic font-heading bg-gradient-to-r from-stone-400 to-stone-600 bg-clip-text text-transparent pr-[0.2em]">
        ofrecemos?
      </span>
    </h2>

    <p className="text-base md:text-lg text-zinc-400 mt-4 max-w-lg leading-relaxed mx-auto">
      No solo escribimos código. Construimos ecosistemas digitales completos de
      extremo a extremo, preparados para dominar el mercado.
    </p>
  </div>
</div>

      {/* 2. EL TREN DE TARJETAS: Empujado un poco hacia abajo (mt-24) para no pisar el texto */}
      <div className="mt-24 md:mt-32 flex items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center gap-6 md:gap-8 w-max px-0"
          style={{ willChange: "transform" }}
        >
          {/* 3. EL ESPACIADOR FANTASMA: 
              Este margen calcula exactamente dónde empieza tu texto de arriba para que la primera 
              tarjeta se alinee a la perfección al iniciar. */}
          <div className="w-6 md:w-12 xl:w-[calc((100vw-1400px)/2+3rem)] shrink-0" />

          {/* TARJETAS */}
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="
                w-[85vw] md:w-[400px] shrink-0 h-[420px]
                bg-[#121214] border border-white/5 rounded-[2rem]
                p-8 md:p-10 flex flex-col justify-between
                hover:bg-[#1a1a1d] hover:border-white/10 transition-all duration-500 group
              "
            >
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-zinc-50 group-hover:text-zinc-900 transition-colors duration-500">
                  <service.Icon strokeWidth={1.5} className="w-6 h-6" />
                </div>

                <span className="font-heading text-xl text-zinc-600 font-medium tracking-widest">
                  {service.id}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold text-zinc-100 tracking-tight">
                  {service.title}
                </h3>

                <div className="h-px w-full bg-white/10 my-6 group-hover:bg-white/20 transition-colors duration-500" />

                <p className="text-zinc-400 text-base leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Espacio extra al final para que termine suavemente */}
          <div className="w-[10vw] md:w-[20vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}