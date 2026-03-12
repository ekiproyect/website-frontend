import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectsVideoSection } from "./home/ProjectsVideoSection";
import { ProjectsCarousel } from "./home/ProjectsCarousel";
import { RotatingTitleHero } from "./home/RotatingTitleHero";
import { StackingCards } from "./StackingCards"; 
import { TechMarquee } from "./TechtMarquee";
import { ServicesScroll } from "./ServicesScroll";
import { ProcessSection } from "./ProcessSection";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger);

// 🔥 1. CREAMOS LA INTERFAZ PARA RECIBIR LA SEÑAL 🔥
interface HeroScrollProps {
  introDone?: boolean;
}

// 🔥 2. RECIBIMOS LA SEÑAL AQUÍ 🔥
export function HeroScroll({ introDone = true }: HeroScrollProps) {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // 🔥 3. SI LA INTRO NO TERMINA, ABORTAMOS LA ANIMACIÓN 🔥
    if (!introDone) return;

    const ctx = gsap.context(() => {
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
  }, [introDone]); // 🔥 4. AÑADIMOS INTRODONE A LAS DEPENDENCIAS 🔥

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900">
      
      <section className="sticky top-0 h-[92vh] w-full flex items-center justify-center z-10 overflow-hidden">
        <div ref={heroContentRef} className="text-center flex flex-col items-center px-6">
            {/* 🔥 5. LE PASAMOS LA SEÑAL AL TÍTULO PARA QUE DESPIERTE 🔥 */}
            <RotatingTitleHero animate={introDone} />
        </div>
      </section>

      {/* SECCIÓN NEGRA CONTINUA */}
      <section
        ref={nextSectionRef}
        // 👇 QUITAMOS shadow-2xl y pb-20 para que no haya cortes 👇
        className="
          relative z-20 bg-zinc-950 text-white w-full
          px-6 md:px-12
          pt-14 md:pt-20
        "
        style={{
          marginTop: "-14vh",
        }}
      >
        <div className="max-w-7xl mx-auto">
           <ProjectsVideoSection/>
           <TechMarquee />
           <ProjectsCarousel />
           <ServicesScroll />
        </div>
      </section>
      
      {/* EL PROCESO: Empieza oscuro y GSAP lo ilumina a blanco */}
      <ProcessSection />
      
      {/* LOS PRINCIPIOS: Siguen sobre el lienzo blanco que dejó el proceso */}
      <StackingCards />
        <Footer  startsDark={true}/>
    </main>
  );
}