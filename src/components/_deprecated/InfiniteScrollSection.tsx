import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface InfiniteScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const InfiniteScrollSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: InfiniteScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Animación de fade-in desde abajo
      gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          scrub: 1,
        },
      });

      // Efecto parallax sutil en el contenido
      gsap.to(element, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={sectionRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};
