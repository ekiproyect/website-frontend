import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { FloatingNav } from "@/components/navegation/FloatingNav";
import { Footer } from "@/components/Footer";

const EKI_CLUB_URL = "https://ekiclub.cl";

const STAMPS_TOTAL = 10;
const STAMPS_FILLED = 7;

/**
 * Vitrina de EKI Club, el producto propio del estudio. A propósito es mínima:
 * ekiclub.cl ya le habla al comerciante (precio, preguntas, registro). Aquí
 * solo se cuenta qué es y que lo hace EKI; cualquier dato comercial que se
 * agregue acá hay que mantenerlo sincronizado con la otra landing, así que
 * mejor enlazar.
 */
export default function EkiClub() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.2, defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-reveal]",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }
        )
        .fromTo(
          "[data-card]",
          { y: 60, rotate: -6, autoAlpha: 0 },
          { y: 0, rotate: -3, autoAlpha: 1, duration: 1.1 },
          "-=0.8"
        )
        .fromTo(
          "[data-stamp]",
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.07, ease: "back.out(2)" },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden bg-zinc-950 text-zinc-50">
      <FloatingNav introDone={true} />

      <section className="w-full min-h-[100svh] px-6 md:px-12 pt-32 md:pt-40 pb-24 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-center">
          <div className="fluid-display">
            <span
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              Nuevo · Producto propio
            </span>

            {/* --display-em medido: "EKI Club." son 6.76 em en Syne 800 con
                tracking-tighter; 7.1 deja el ~5% de margen para el fallback. */}
            <h1
              data-reveal
              className="fluid-word mt-8 font-heading font-black tracking-tighter leading-[0.9]"
              style={{ ["--display-em" as string]: 7.1, ["--display-max" as string]: "11rem" }}
            >
              EKI Club<span className="text-zinc-600">.</span>
            </h1>

            <p data-reveal className="mt-8 max-w-xl text-lg md:text-xl text-zinc-300 leading-relaxed text-balance">
              La tarjeta de sellos de los comercios locales, ahora en el celular de sus clientes. Sin
              app: vive en la billetera del teléfono.
            </p>
            <p data-reveal className="mt-4 max-w-xl text-base md:text-lg text-zinc-500 leading-relaxed text-balance">
              Es nuestro producto: lo diseñamos, lo desarrollamos y lo operamos nosotros, desde
              Antofagasta.
            </p>

            <a
              data-reveal
              href={EKI_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-7 py-4 text-base font-semibold text-zinc-950 transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
            >
              Conoce EKI Club
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </a>
          </div>

          {/* Maqueta decorativa de la tarjeta: sin datos de un comercio real. */}
          <div className="flex justify-center lg:justify-end" aria-hidden>
            <div
              data-card
              className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 p-7 shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-bold">Tu negocio</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  EKI Club
                </span>
              </div>

              <div className="mt-10 grid grid-cols-5 gap-3">
                {Array.from({ length: STAMPS_TOTAL }, (_, i) => (
                  <span
                    key={i}
                    data-stamp
                    className={`aspect-square rounded-full ${
                      i < STAMPS_FILLED ? "bg-zinc-50" : "border-2 border-dashed border-white/20"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Sellos</p>
                  <p className="mt-1 font-heading text-3xl font-black">
                    {STAMPS_FILLED}
                    <span className="text-zinc-500">/{STAMPS_TOTAL}</span>
                  </p>
                </div>
                <p className="text-right text-sm text-zinc-400">
                  {STAMPS_TOTAL - STAMPS_FILLED} más
                  <br />y el premio es tuyo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer startsDark={true} />
    </main>
  );
}
