"use client";

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    // 1) Evita que el browser restaure scroll por su cuenta
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2) Detén Lenis para que no “reaplique” su scroll interno
    lenis?.stop();

    // 3) Resetea scroll (Lenis + nativo por seguridad)
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 4) Limpia memoria de ScrollTrigger (cuando hay pin / refresh)
    ScrollTrigger.clearScrollMemory?.();

    // 5) Espera 2 frames a que el DOM esté listo, refresca ST y reanuda Lenis
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
        lenis?.start();
      });
    });
  }, [location.key, lenis]);

  return null;
}