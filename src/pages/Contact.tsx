"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";
import { ArrowUpRight } from "lucide-react";

const SERVICES_OPTIONS = [
  "Diseño High-End",
  "Desarrollo a Medida",
  "SEO & Escalamiento",
  "Consultoría Digital"
];

export default function Contact() {
  // Asegura que la página inicie arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Estado para manejar el servicio seleccionado (estilo botones "pill")
  const [selectedService, setSelectedService] = useState<string>("");

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Animar la columna izquierda (Textos gigantes)
    tl.fromTo(
      leftColRef.current?.children ? Array.from(leftColRef.current.children) : [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    // 2. Animar los campos del formulario (Columna derecha)
    const formElements = formRef.current?.querySelectorAll(".form-item");
    if (formElements) {
      tl.fromTo(
        Array.from(formElements),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6" // Se solapa para que entre más rápido
      );
    }
  }, { scope: containerRef });

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-950 text-zinc-50 min-h-screen flex flex-col justify-between">
      
      <FloatingNav introDone={true} />

      <section ref={containerRef} className="w-full pt-40 md:pt-56 pb-24 px-6 md:px-12 flex-grow flex items-center">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Copy y Datos Directos */}
          <div ref={leftColRef} className="flex flex-col justify-start">
            <h1 className="text-[12vw] md:text-[10vw] lg:text-[5rem] xl:text-[6.5rem] 2xl:text-[7.5rem] font-black font-heading leading-[0.85] tracking-tighter uppercase mb-8 break-words">
              Hablemos.
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-lg mb-12">
              Desde Antofagasta hacia el mundo. Cuéntanos sobre tu visión y nosotros pondremos la ingeniería y el diseño para hacerla dominar el mercado. Carlos y el equipo revisan personalmente cada solicitud.
            </p>

            <div className="flex flex-col gap-8 mt-auto pt-8 border-t border-zinc-800">
              <div>
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
                  Email Directo
                </span>
                <a href="mailto:hola@eki.cl" className="text-2xl md:text-3xl font-medium hover:text-emerald-400 transition-colors">
                  contacto.eki@gmail.com
                </a>
              </div>
              
              <div>
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
                  Sede Central
                </span>
                <p className="text-xl text-zinc-300">
                  Antofagasta, Chile
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: El Formulario High-End */}
          <div className="flex flex-col justify-center lg:pl-10">
            <form ref={formRef} className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              
              {/* Campo: Nombre */}
              <div className="form-item group relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder=" " // Necesario para el truco del label flotante en CSS
                  className="peer w-full bg-transparent border-b border-zinc-700 py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none focus:border-zinc-100 transition-colors"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-zinc-500 text-xl md:text-2xl transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-zinc-300 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-zinc-300 cursor-text"
                >
                  ¿Cómo te llamas?
                </label>
              </div>

              {/* Campo: Email */}
              <div className="form-item group relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-zinc-700 py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none focus:border-zinc-100 transition-colors"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-zinc-500 text-xl md:text-2xl transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-zinc-300 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-zinc-300 cursor-text"
                >
                  Tu correo electrónico
                </label>
              </div>

              {/* Selección de Servicios (Botones Pill) */}
              <div className="form-item">
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
                  ¿En qué podemos ayudarte?
                </span>
                <div className="flex flex-wrap gap-3">
                  {SERVICES_OPTIONS.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-5 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 border ${
                        selectedService === service 
                          ? "bg-zinc-100 text-zinc-950 border-zinc-100" 
                          : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campo: Mensaje */}
              <div className="form-item group relative">
                <textarea 
                  id="message"
                  rows={3}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-zinc-700 py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none focus:border-zinc-100 transition-colors resize-none"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-zinc-500 text-xl md:text-2xl transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-zinc-300 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-zinc-300 cursor-text"
                >
                  Cuéntanos sobre el proyecto...
                </label>
              </div>

              {/* Botón de Enviar */}
              <div className="form-item mt-4">
                <button 
                  type="submit" 
                  className="group flex items-center justify-between w-full md:w-auto bg-zinc-100 text-zinc-950 px-8 py-5 rounded-full font-bold text-lg md:text-xl hover:bg-emerald-400 transition-colors duration-300"
                >
                  <span>Enviar Solicitud</span>
                  <ArrowUpRight className="w-6 h-6 ml-4 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* FOOTER: Puesto directamente en startsDark=true para que se integre al negro de esta página */}
      <Footer startsDark={true} />
      
    </main>
  );
}