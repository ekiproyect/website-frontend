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

interface HeroScrollProps {
  introDone?: boolean;
}

export function HeroScroll({ introDone = true }: HeroScrollProps) {
  // 🔥 1. NUEVA REFERENCIA: Para anclar la sección completa del Hero 🔥
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!introDone) return;

    const ctx = gsap.context(() => {
      
      // Animaciones opcionales que ya tenías
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

      // 🔥 2. EL ANCLAJE ABSOLUTO DE GSAP 🔥
      // Esto clava el hero en la pantalla y permite que la sección negra lo cubra
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        pin: true,
        pinSpacing: false, // La magia: evita que se genere espacio extra, dejando que la sección negra lo "pise"
      });

      // 3. Efecto de hundimiento mientras la sección negra sube
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
  }, [introDone]);

  return (
    <main className="relative w-full overflow-x-clip bg-zinc-50 text-zinc-900">
      
      {/* 🔥 EL ARREGLO: Cambiamos 100vh por 86vh 🔥 */}
      <section 
        ref={heroSectionRef} 
        // Al medir 86% del alto, obligamos a la sección negra a asomarse un 14% en el borde inferior
        className="h-[86vh] w-full flex items-center justify-center z-10 overflow-hidden"
      >
        <div ref={heroContentRef} className="text-center w-full flex flex-col items-center px-6">
            <RotatingTitleHero animate={introDone} />
        </div>
      </section>

      {/* SECCIÓN NEGRA CONTINUA */}
      <section
        ref={nextSectionRef}
        className="
          relative z-20 bg-zinc-950 text-white w-full
          px-6 md:px-12
          pt-14 md:pt-20
        "
      >
        <div className="max-w-7xl mx-auto">
           <ProjectsVideoSection/>
           <TechMarquee />
           <ProjectsCarousel />
           <ServicesScroll />
        </div>
      </section>
      
      <ProcessSection />
      <StackingCards />
      <Footer startsDark={true}/>
    </main>
  );
}