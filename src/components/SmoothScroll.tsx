"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.07, // Esto controla la "fricción". 0.05 es muy resbaladizo, 0.1 es más rígido. 0.07 es el punto dulce premium.
        duration: 1.5, // Cuánto tarda en detenerse por completo
        smoothWheel: true, 
      }}
    >
      {children}
    </ReactLenis>
  );
}