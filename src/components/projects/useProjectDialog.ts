"use client";

import React, { useCallback, useState } from "react";
import { ALL_PROJECTS } from "./projectsData";

/**
 * Estado del modal de detalle de proyecto: qué proyecto está abierto y cómo se
 * navega entre ellos. La apertura es un modal normal — la animación la ponen
 * los keyframes `panel-in`/`overlay-in` de tailwind.config.ts.
 */
export function useProjectDialog() {
  // Índice dentro de ALL_PROJECTS, no el objeto: las flechas del modal navegan
  // por posición y los `id` de ambos grupos chocan.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? ALL_PROJECTS[activeIndex] : null;

  const openProject = useCallback((index: number) => setActiveIndex(index), []);

  const goTo = useCallback((delta: number) => {
    setActiveIndex((i) =>
      i === null ? i : (i + delta + ALL_PROJECTS.length) % ALL_PROJECTS.length
    );
  }, []);

  React.useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  return {
    activeIndex,
    active,
    openProject,
    goTo,
    close: () => setActiveIndex(null),
  };
}
