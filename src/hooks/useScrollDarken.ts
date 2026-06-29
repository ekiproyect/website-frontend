import { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const SECTION_THEME = {
  darkBg: "#09090b", // zinc-950
  lightBg: "#fafafa", // zinc-50
  darkText: "#18181b", // zinc-900
  lightText: "#fafafa", // zinc-50
} as const;

interface ScrollDarkenOptions {
  /** Elemento que dispara el ScrollTrigger. */
  trigger: RefObject<HTMLElement>;
  /** Scope para la limpieza de useGSAP. */
  scope: RefObject<HTMLElement>;
  /** Secciones cuyo fondo se interpola hacia darkBg. Resuelto al ejecutar el efecto. */
  bgTargets: () => (Element | null | undefined)[];
  /** Contenido cuyo color de texto pasa a lightText. */
  content?: RefObject<HTMLElement>;
  start?: string;
  end?: string;
  /** Si es false, el efecto no se monta (p.ej. Footer ya oscuro). */
  enabled?: boolean;
  dependencies?: unknown[];
}

/**
 * Transición canónica de "apagón": el fondo de una o más secciones pasa de su color
 * natural (bg-zinc-50) a darkBg, y el texto a lightText, ligado al scroll (scrub).
 * El scrub revierte automáticamente al estado CSS original al subir.
 */
export function useScrollDarken({
  trigger,
  scope,
  bgTargets,
  content,
  start = "top bottom",
  end = "top 30%",
  enabled = true,
  dependencies = [],
}: ScrollDarkenOptions) {
  useGSAP(
    () => {
      if (!enabled) return;
      const triggerEl = trigger.current;
      if (!triggerEl) return;

      const scrollTrigger = { trigger: triggerEl, start, end, scrub: true } as const;

      const targets = bgTargets().filter((el): el is Element => Boolean(el));
      if (targets.length) {
        gsap.to(targets, {
          backgroundColor: SECTION_THEME.darkBg,
          ease: "none",
          scrollTrigger,
        });
      }

      if (content?.current) {
        gsap.to(content.current, {
          color: SECTION_THEME.lightText,
          ease: "none",
          scrollTrigger,
        });
      }
    },
    { scope, dependencies },
  );
}
