// src/components/home/IntroAnimation.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Props = {
  onFinish: () => void;
  skipAfterMs?: number; // fallback por si algo falla
};

export function IntroAnimation({ onFinish, skipAfterMs = 6500 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [done, setDone] = useState(false);

  useEffect(() => {
    // Bloquear scroll mientras corre la intro (opcional pero recomendado)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Estado inicial
    gsap.set([backgroundTextRef.current, taglineRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30,
    });
    gsap.set(titleRef.current, { opacity: 1, scale: 1, filter: "blur(0px)" });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = prevOverflow;
        onFinish();
      },
    });

    // Tu “fase 1–6”, pero en tiempo real
    tl.to(titleRef.current, { scale: 2, duration: 0.9, ease: "power2.in" }, 0)
      .to(backgroundTextRef.current, { opacity: 0.6, scale: 0.95, duration: 0.9 }, 0.4)
      .to(titleRef.current, { scale: 2.5, opacity: 0.7, filter: "blur(8px)", duration: 1.0 }, 0.9)
      .to(backgroundTextRef.current, { opacity: 1, scale: 1, duration: 0.9 }, 0.9)
      .to(titleRef.current, { scale: 3, opacity: 0, filter: "blur(25px)", duration: 1.0 }, 1.8)
      .to(backgroundTextRef.current, { scale: 1.15, y: -60, duration: 1.0 }, 1.8)
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 2.4)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 2.8)
      .to([backgroundTextRef.current, taglineRef.current, subtitleRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.9,
        ease: "power2.inOut",
      }, 4.2);

    // Fallback: si algo queda colgado
    const failSafe = window.setTimeout(() => {
      if (!done) {
        tl.kill();
        document.body.style.overflow = prevOverflow;
        onFinish();
      }
    }, skipAfterMs);

    return () => {
      window.clearTimeout(failSafe);
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [onFinish, skipAfterMs, done]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom right, #000000, #0a0a1a, #0d0d2b)",
      }}
    >
      {/* (Opcional) aquí pegas tu fondo vivo tal cual */}
      {/* ... backgroundRef + grain + grid ... */}

      {/* EKI PROJECT */}
      <div
        ref={backgroundTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[5] pointer-events-none"
      >
        <div className="text-center space-y-3 px-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              EKI PROJECT
            </span>
          </h2>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </div>
      </div>

      {/* TAGLINE */}
      <p
        ref={taglineRef}
        className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-[6] text-base md:text-2xl font-light tracking-wide text-center px-6 max-w-3xl w-full"
      >
        <span className="text-gray-300">
          Transformación digital,{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            innovación constante
          </span>
        </span>
      </p>

      {/* EKI */}
      <div
        ref={titleRef}
        className="relative z-10 text-[25vw] md:text-[20vw] font-black tracking-tighter"
        style={{ willChange: "transform, opacity, filter", transformOrigin: "center center" }}
      >
        <h1>
          <span className="bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
            EKI
          </span>
        </h1>
      </div>

      {/* SUBTÍTULO */}
      <p
        ref={subtitleRef}
        className="absolute left-1/2 bottom-[20%] -translate-x-1/2 z-[15] text-sm md:text-xl text-gray-300 text-center px-6 max-w-2xl w-full leading-relaxed"
      >
        Transformamos <span className="text-purple-400 font-bold">ideas</span> en{" "}
        <span className="text-pink-400 font-bold">experiencias digitales</span> extraordinarias
      </p>
    </div>
  );
}