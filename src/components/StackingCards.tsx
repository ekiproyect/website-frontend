import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRINCIPLES = [
  {
    id: "01",
    title: "Nuestra Misión",
    desc: "Impulsar el crecimiento digital de las marcas desde Antofagasta hacia el mundo. Combinamos diseño de alta gama y tecnología para crear experiencias web que destacan y dominan su sector.",
    image: "/images/mision.jpeg",
  },
  {
    id: "02",
    title: "Filosofía",
    desc: "Creemos que la primera impresión lo es todo. Rechazamos las plantillas genéricas; cada proyecto es una obra de artesanía digital donde el rendimiento y la estética coexisten en perfecta armonía.",
    image: "/images/filosofia.jpeg",
  },
  {
    id: "03",
    title: "Diseño Premium",
    desc: "El buen diseño genera confianza inmediata. Creamos interfaces visuales (UI) y experiencias de usuario (UX) meticulosas que capturan la atención en los primeros 3 segundos vitales.",
    image: "/images/diseno.jpeg",
  },
  {
    id: "04",
    title: "Desarrollo & SEO",
    desc: "Una arquitectura invisible pero implacable. Escribimos código optimizado para una carga ultrarrápida y aplicamos estrategias SEO para asegurar visibilidad total en los motores de búsqueda.",
    image: "/images/desarrollo.jpeg",
  },
];

export function StackingCards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRevealRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".principle-card");

      gsap.fromTo(
        bgRevealRef.current,
        {
          scale: 0.94,
          borderRadius: "48px",
        },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      cards.forEach((card, index) => {
        const title = card.querySelector(".principle-title");
        const media = card.querySelector(".principle-media");
        const text = card.querySelector(".principle-text");
        const number = card.querySelector(".principle-number");

        gsap.fromTo(
          [title, media, text],
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
            },
          }
        );

        gsap.fromTo(
          number,
          {
            scale: 0.94,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
            },
          }
        );

        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.34,
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top 18%",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-zinc-950 pb-24 md:pb-40"
    >
      <div
        ref={bgRevealRef}
        className="relative w-full overflow-hidden bg-zinc-100 text-zinc-900 pt-24 md:pt-40"
      >
        <div className="relative z-20 mx-auto mb-24 max-w-5xl px-6 text-center">
          <h2 className="mb-6 text-5xl font-black tracking-tighter md:text-7xl">
            Nuestros Principios
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-zinc-600">
            Los pilares fundamentales sobre los que construimos cada proyecto digital en EKI.
          </p>
        </div>

        <div className="relative pb-[10vh]">
          {PRINCIPLES.map((principle, index) => (
            <article
              key={principle.id}
              className="principle-card sticky flex items-center"
              style={{
                top: `calc(12vh + ${index * 14}px)`,
                height: "78vh",
              }}
            >
              <div className="mx-auto w-full max-w-[1850px] px-6 md:px-10 xl:px-20">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.15fr_0.95fr] lg:gap-14 xl:gap-20">
                  <div className="principle-title order-1">
                    <h3 className="text-4xl font-semibold leading-[0.95] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl xl:text-[5.2rem] 2xl:text-[6rem]">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="principle-media order-2 relative flex items-center justify-center">
                    <div
  className="relative w-full max-w-[580px] xl:max-w-[640px] aspect-[1.18/0.92] group"
  style={{ perspective: "1500px" }}
>
  <div
    className="relative h-full w-full overflow-hidden  shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
    style={{
      transform: "rotateX(4deg) rotateY(-7deg) rotateZ(1deg)",
      transformStyle: "preserve-3d",
    }}
  >
    <img
      src={principle.image}
      alt={principle.title}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
  </div>
</div>

                    <div
                      className="principle-number pointer-events-none absolute inset-0 flex items-center justify-center font-black leading-none text-white/80"
                      style={{
                        fontSize: "clamp(6rem, 15vw, 11rem)",
                        textShadow:
                          "0 0 8px rgba(255,255,255,0.08), 0 0 24px rgba(0,0,0,0.22)",
                      }}
                    >
                      {principle.id}
                    </div>
                  </div>

                  <div className="principle-text order-3">
                    <p className="ml-auto max-w-[480px] text-left text-lg leading-[1.9] text-zinc-600 md:text-xl lg:text-center xl:text-[1.05rem] 2xl:text-[1.15rem]">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}