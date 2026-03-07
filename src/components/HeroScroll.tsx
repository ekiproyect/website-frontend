import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectsVideoSection } from "./home/ProjectsVideoSection";
import { ProjectsCarousel } from "./home/ProjectsCarousel";
import { RotatingTitleHero } from "./home/RotatingTitleHero";
import { StackingCards } from "./StackingCards"; // 👈 1. IMPORTAR AQUÍ

gsap.registerPlugin(ScrollTrigger);

export function HeroScroll() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada (opcional)
      gsap.fromTo(
        ".reveal-text",
        { yPercent: 110 },
        { yPercent: 0, duration: 1.0, stagger: 0.08, ease: "power4.out", delay: 0.1 }
      );

      gsap.fromTo(
        ".reveal-cta",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );

      // Scroll: hero se achica y se desvanece mientras llega la sección negra
      gsap.to(heroContentRef.current, {
        scale: 0.86,
        autoAlpha: 0,
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: nextSectionRef.current,
          start: "top bottom", 
          end: "top top",      
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-zinc-50 text-zinc-900">
      {/* HERO (clavado) */}
      <section className="sticky top-0 h-[92vh] w-full flex items-center justify-center z-10 overflow-hidden">
        <div ref={heroContentRef} className="text-center flex flex-col items-center px-6">
            <RotatingTitleHero />
        </div>
      </section>

      {/* SECCIÓN NEGRA */}
      <section
        ref={nextSectionRef}
        className="
          relative z-20 bg-zinc-950 text-white w-full
          shadow-2xl
          px-6 md:px-12
          pt-14 md:pt-20
          pb-20
        "
        style={{
          marginTop: "-14vh",
        }}
      >
        <div className="max-w-7xl mx-auto">
           <ProjectsVideoSection/>
           <ProjectsCarousel/>          
          
          {/* 👇 Puedes borrar este div o comentarlo, las tarjetas ya nos dan suficiente altura de scroll */}
          {/* <div className="h-[120vh]" /> */}
        </div>
      </section>

      {/* 👈 2. AGREGAR LA NUEVA SECCIÓN AQUÍ */}
      {/* Esta sección entra en negro y se abre en blanco mágicamente */}
      <StackingCards />

    </main>
  );
}