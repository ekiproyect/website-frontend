"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface IntroOverlayProps {
  onFinish: () => void;
}

export function IntroOverlay({ onFinish }: IntroOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  useLayoutEffect(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prevOverflow;
          onFinish();
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.98, letterSpacing: "0.1em" },
        {
          opacity: 1,
          scale: 1,
          letterSpacing: "0.3em",
          duration: 1.4,
          ease: "power3.out",
          delay: 0.3,
        }
      )
        .to(
          textRef.current,
          { y: -30, opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "+=0.5"
        )
        .to(
          rootRef.current,
          { yPercent: -100, duration: 1.2, ease: "power4.inOut" },
          "-=0.3"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
      hasPlayedRef.current = false; // ✅ FIX STRICTMODE
    };
  }, [onFinish]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 text-zinc-50 pointer-events-none"
    >
      <div
        ref={textRef}
        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase"
        style={{ willChange: "transform, opacity, letter-spacing" }}
      >
        EKI
      </div>
    </div>
  );
}