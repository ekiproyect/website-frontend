"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const SERVICES_OPTIONS = [
  "Diseño High-End",
  "Desarrollo a Medida",
  "SEO & Escalamiento",
  "Consultoría Digital",
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyknjbgr";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  
  // 🔥 Nuevas referencias para el formulario y el mensaje de éxito
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const [formErrors, setFormErrors] = useState({ name: false, email: false, message: false });
  // Animación de entrada inicial
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        leftColRef.current?.children
          ? Array.from(leftColRef.current.children)
          : [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

      const formElements = formWrapperRef.current?.querySelectorAll(".form-item");
      if (formElements) {
        tl.fromTo(
          Array.from(formElements),
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        );
      }
    },
    { scope: containerRef }
  );

  // 🔥 Animación de transición cuando el estado cambia a "sent"
  useGSAP(() => {
    if (status === "sent") {
      const tl = gsap.timeline();
      
      // 1. Desvanece el formulario hacia abajo
      tl.to(formWrapperRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        display: "none" // Lo quita del flujo del DOM al terminar
      });

      // 2. Hace aparecer el mensaje de éxito desde abajo
      tl.fromTo(
        successMessageRef.current,
        { y: 40, opacity: 0, display: "none" },
        { y: 0, opacity: 1, display: "flex", duration: 0.8, ease: "power3.out" }
      );
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página recargue
    
    if (status === "sending") return;

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    // 🔥 1. VALIDACIÓN ESTRICTA (Se ejecuta antes que nada) 🔥
    const nameVal = fd.get("name") as string;
    const emailVal = fd.get("email") as string;
    const messageVal = fd.get("message") as string;

    const errors = {
      name: !nameVal || nameVal.trim() === "",
      email: !emailVal || emailVal.trim() === "",
      message: !messageVal || messageVal.trim() === "",
    };

    setFormErrors(errors);

    // Si falta aunque sea un dato, abortamos la misión y mostramos las alertas rojas
    if (errors.name || errors.email || errors.message) {
      setStatus("invalid");
      return; 
    }

    // 🔥 2. TRAMPA PARA BOTS (Honeypot) 🔥
    const honey = fd.get("company_website");
    if (typeof honey === "string" && honey.trim().length > 0) {
      // Si el campo invisible tiene texto, es un bot (o autocompletado agresivo). 
      // Simulamos que carga para engañar al bot.
      setStatus("sending");
      setTimeout(() => setStatus("sent"), 1000);
      return;
    }

    // 🔥 3. ENVÍO REAL A FORMSPREE 🔥
    setStatus("sending");
    fd.set("service", selectedService || "No especificado");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Formspree error");

      // Éxito real: disparamos la animación de GSAP
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-950 text-zinc-50 min-h-screen flex flex-col justify-between">
      <FloatingNav introDone={true} />

      <section
        ref={containerRef}
        className="w-full pt-40 md:pt-56 pb-24 px-6 md:px-12 flex-grow flex items-center"
      >
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* COLUMNA IZQUIERDA (Se mantiene igual) */}
          <div ref={leftColRef} className="flex flex-col justify-start">
            <h1 className="text-[14vw] lg:text-[6rem] xl:text-[7.5rem] font-black font-heading leading-[0.85] tracking-tighter uppercase mb-8 break-words max-w-full">
              Hablemos.
            </h1>

            <p className="text-xl  md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-lg mb-12">
              Desde Antofagasta hacia el mundo. Cuéntanos sobre tu visión y
              nosotros pondremos la ingeniería y el diseño para hacerla dominar
              el mercado. Carlos y el equipo revisan personalmente cada
              solicitud.
            </p>

            <div className="flex flex-col gap-8 mt-auto pt-8 border-t border-zinc-800">
              <div>
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
                  Email Directo
                </span>
                <a
                  href="mailto:ekiteam.contacto@gmail.com"
                  className="text-2xl md:text-3xl font-medium hover:text-zinc-300 transition-colors"
                >
                  ekiteam.contacto@gmail.com
                </a>
              </div>

              <div>
                <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">
                  Sede Central
                </span>
                <p className="text-xl text-zinc-300">Antofagasta, Chile</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: EL ESCENARIO */}
          <div className="relative flex flex-col justify-center lg:pl-10 min-h-[500px]">
            
            {/* EL FORMULARIO (Se oculta al enviar) */}
            <div ref={formWrapperRef} className="w-full">
              {/* 🔥 Añadimos noValidate para apagar las alertas feas del navegador 🔥 */}
              <form className="flex flex-col gap-12" onSubmit={handleSubmit} noValidate>
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" />

                {/* Campo: Nombre */}
                <div className="form-item relative">
                  <input 
                    name="name" 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    className={`peer w-full bg-transparent border-b py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none transition-colors duration-300 ${
                      formErrors.name ? "border-red-500/50 focus:border-red-400" : "border-zinc-700 focus:border-zinc-100"
                    }`} 
                  />
                  <label htmlFor="name" className={`absolute left-0 cursor-text transition-all duration-300 -top-6 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-focus:-top-6 peer-focus:text-sm ${
                    formErrors.name ? "text-red-400 peer-placeholder-shown:text-red-500/50 peer-focus:text-red-400" : "text-zinc-300 peer-placeholder-shown:text-zinc-500 peer-focus:text-zinc-300"
                  }`}>
                    ¿Cómo te llamas?
                  </label>
                </div>

                {/* Campo: Email */}
                <div className="form-item relative">
                  <input 
                    name="email" 
                    type="email" 
                    id="email" 
                    placeholder=" " 
                    className={`peer w-full bg-transparent border-b py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none transition-colors duration-300 ${
                      formErrors.email ? "border-red-500/50 focus:border-red-400" : "border-zinc-700 focus:border-zinc-100"
                    }`} 
                  />
                  <label htmlFor="email" className={`absolute left-0 cursor-text transition-all duration-300 -top-6 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-focus:-top-6 peer-focus:text-sm ${
                    formErrors.email ? "text-red-400 peer-placeholder-shown:text-red-500/50 peer-focus:text-red-400" : "text-zinc-300 peer-placeholder-shown:text-zinc-500 peer-focus:text-zinc-300"
                  }`}>
                    Tu correo electrónico
                  </label>
                </div>

                {/* Selección de Servicios (Mantenemos igual) */}
                <div className="form-item">
                  <span className="block text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">¿En qué podemos ayudarte?</span>
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
                  <input type="hidden" name="service" value={selectedService} />
                </div>

                {/* Campo: Mensaje */}
                <div className="form-item relative">
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={3} 
                    placeholder=" " 
                    className={`peer w-full bg-transparent border-b py-4 text-xl md:text-2xl text-zinc-100 placeholder-transparent focus:outline-none transition-colors resize-none duration-300 ${
                      formErrors.message ? "border-red-500/50 focus:border-red-400" : "border-zinc-700 focus:border-zinc-100"
                    }`} 
                  />
                  <label htmlFor="message" className={`absolute left-0 cursor-text transition-all duration-300 -top-6 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl md:peer-placeholder-shown:text-2xl peer-focus:-top-6 peer-focus:text-sm ${
                    formErrors.message ? "text-red-400 peer-placeholder-shown:text-red-500/50 peer-focus:text-red-400" : "text-zinc-300 peer-placeholder-shown:text-zinc-500 peer-focus:text-zinc-300"
                  }`}>
                    Cuéntanos sobre el proyecto...
                  </label>
                </div>

                <div className="form-item mt-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center justify-between w-full md:w-auto bg-zinc-100 text-zinc-950 px-8 py-5 rounded-full font-bold text-lg md:text-xl hover:bg-zinc-300 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{status === "sending" ? "Procesando..." : "Enviar Solicitud"}</span>
                    <ArrowUpRight className={`w-6 h-6 ml-4 transition-transform duration-300 ${status === 'sending' ? 'animate-pulse' : 'group-hover:rotate-45'}`} />
                  </button>
                  
                  {/* 🔥 Mensajes de Estado 🔥 */}
                  {status === "invalid" && (
                    <p className="mt-4 text-sm font-medium text-red-400">Faltan datos. Por favor, completa los campos marcados en rojo.</p>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-sm font-medium text-red-400">Error de conexión. Por favor, intenta de nuevo.</p>
                  )}
                </div>
              </form>
            </div>

            {/* 🔥 EL MENSAJE DE ÉXITO (Oculto inicialmente) 🔥 */}
            <div 
              ref={successMessageRef} 
              className="absolute inset-0 flex-col justify-center items-start hidden"
            >
              <div className="w-20 h-20 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mb-8">
                <CheckCircle2 className="w-10 h-10 text-zinc-100" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-tighter mb-6">
                Solicitud <br/>
                <span className="text-zinc-500">recibida.</span>
              </h3>
              
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-md">
                Gracias por elegir a EKI. Hemos recibido tu información correctamente. Algun miembro de nuestro equipo se pondrá en contacto contigo muy pronto para agendar una reunión.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer startsDark={true} />
    </main>
  );
}