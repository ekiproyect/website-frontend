"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Discovery",
    desc: "Nuestro proceso comienza entendiendo tus metas, identidad de marca y audiencia. Identificamos el problema clave a resolver y tu propuesta de valor única, creando una base estratégica sólida para tu éxito.",
  },
  {
    id: "02",
    title: "Diseño UX/UI",
    desc: "Diseñamos interfaces modernas, responsivas e inmersivas. Nos enfocamos en crear sistemas de diseño limpios y experiencias intuitivas que mantengan a los usuarios en tu sitio y los conviertan en clientes.",
  },
  {
    id: "03",
    title: "Desarrollo High-End",
    desc: "Transformamos el diseño en código de alto rendimiento. Construimos arquitecturas escalables, integraciones seguras de API y animaciones fluidas que garantizan una experiencia premium sin sacrificar velocidad.",
  },
  {
    id: "04",
    title: "Lanzamiento & SEO",
    desc: "Optimizamos hasta el último detalle para los motores de búsqueda, aseguramos el rendimiento técnico en todos los dispositivos y lanzamos tu producto al mercado con una infraestructura lista para escalar.",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null); 
  
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const contentWrapper = contentWrapperRef.current;
      if (!container || !contentWrapper) return;

      const steps = PROCESS_STEPS.length;
      const TRANSITION = 0.9; 
      const HOLD = 1.9;       
      const totalUnits = steps * HOLD + (steps - 1) * TRANSITION;

      // Reseteo inicial de estilos
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 100 });
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 100 });
      });

      gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(dotRef.current, { yPercent: -50, y: 0 }); 

      // === LA LÍNEA DE TIEMPO MAESTRA ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${Math.round(totalUnits * 45)}%`, 
          pin: true,
          scrub: 1,
        },
      });

      // (ELIMINAMOS EL CAMBIO DE COLOR PORQUE AHORA EMPIEZA BLANCO DESDE EL INICIO)

      // Progreso de la línea vertical
      tl.eventCallback("onUpdate", () => {
        const p = tl.progress(); 
        if (lineFillRef.current) lineFillRef.current.style.transform = `scaleY(${p})`;
        
        const wrap = lineWrapRef.current;
        const dot = dotRef.current;
        if (wrap && dot) {
          const h = wrap.getBoundingClientRect().height;
          dot.style.transform = `translate(-50%, ${p * h}px)`; 
        }
      });

      // Tiempo para asimilar la primera tarjeta
      tl.to({}, { duration: HOLD });

      for (let i = 1; i < steps; i++) {
        const prevNum = numberRefs.current[i - 1];
        const nextNum = numberRefs.current[i];
        const prevTxt = textRefs.current[i - 1];
        const nextTxt = textRefs.current[i];

        tl.addLabel(`step-${i}`);

        tl.to(prevNum, { yPercent: -100, autoAlpha: 0, duration: TRANSITION, ease: "power2.inOut" }, `step-${i}`);
        tl.to(prevTxt, { yPercent: -100, autoAlpha: 0, duration: TRANSITION, ease: "power2.inOut" }, `step-${i}`);

        tl.fromTo(nextNum, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 0.7, duration: TRANSITION, ease: "power2.inOut" }, `step-${i}`);
        tl.fromTo(nextTxt, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 0.7, duration: TRANSITION, ease: "power2.inOut" }, `step-${i}`);

        const PEAK_DELAY = 0.18; 
        const PEAK_DUR = 0.22;

        tl.to([nextNum, nextTxt], { autoAlpha: 1, duration: PEAK_DUR, ease: "power2.out" }, `step-${i}+=${TRANSITION + PEAK_DELAY}`);
        tl.to({}, { duration: HOLD });
      }
    },
    { scope: containerRef }
  );

  return (
    // 🔥 CAMBIO: Ahora inicia en bg-zinc-50 para conectar con el final de Servicios 🔥
    <section ref={containerRef} className="h-screen w-full bg-zinc-50 overflow-hidden relative z-30 -mt-[1px]">
      
      {/* 🔥 CAMBIO: El texto ahora es oscuro (text-zinc-900) 🔥 */}
      <div ref={contentWrapperRef} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center h-full text-zinc-900">
        
        {/* IZQUIERDA */}
        <div className="w-[40%] md:w-[50%] flex flex-col justify-center h-full relative z-10">
          <div className="mb-8 md:mb-16 pl-2">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-semibold tracking-tight leading-[1.1]">
              Nuestro proceso <br />
              <span className="italic font-heading bg-gradient-to-r from-stone-400 to-stone-600 bg-clip-text text-transparent pr-[0.1em]">
                orientado a resultados
              </span>
            </h2>
          </div>

          <div className="flex items-center w-full">
            <div className="relative h-[140px] md:h-[260px] lg:h-[300px] overflow-hidden w-full flex justify-end items-center pr-8 md:pr-16">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={`num-${step.id}`}
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="absolute inset-0 flex justify-end items-center"
                >
                  <h3
                    className="text-[7rem] md:text-[14rem] lg:text-[18rem] font-heading font-medium leading-none tracking-tighter select-none opacity-20"
                    style={{ fontVariantNumeric: "slashed-zero" }}
                  >
                    {step.id}.
                  </h3>
                </div>
              ))}
            </div>

            <div ref={lineWrapRef} className="relative h-[30vh] md:h-[50vh] w-[2px] ml-4 shrink-0">
              <div className="absolute inset-y-0 left-0 w-full bg-current opacity-10" />
              <div
                ref={lineFillRef}
                className="absolute top-0 left-0 w-full bg-current origin-top"
                style={{ transform: "scaleY(0)" }}
              />
              <div
                ref={dotRef}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)] z-10"
              />
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="w-[60%] md:w-[50%] relative h-full flex items-center pl-6 md:pl-12">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={`text-${step.id}`}
              ref={(el) => { textRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col justify-center pl-6 md:pl-12"
            >
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
                {step.title}
              </h4>
              <p className="text-base md:text-xl opacity-70 leading-relaxed max-w-lg">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}