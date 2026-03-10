"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ProjectsIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power3.inOut" },
      "-=0.8"
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pt-40 md:pt-56 pb-16 md:pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
        
        <h1 
          ref={titleRef} 
          className="text-[12vw] md:text-[8vw] lg:text-[7rem] xl:text-[8.5rem] font-black font-heading leading-[0.9] tracking-tighter uppercase mb-12 md:mb-20"
        >
          Trabajo.
        </h1>

        <div className="w-full max-w-4xl h-[1px] bg-zinc-300 origin-center mb-12 md:mb-16" ref={lineRef} />

        <p ref={textRef} className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] tracking-tight text-zinc-800 max-w-4xl">
          Selección de proyectos digitales diseñados y desarrollados en EKI. Cada píxel está pensado para convertir, cada línea de código para escalar.
        </p>

      </div>
    </section>
  );
}