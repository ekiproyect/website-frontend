import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
}

export const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  animationType = 'fadeUp' 
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeIn: { opacity: 0 },
      slideLeft: { x: -100, opacity: 0 },
      slideRight: { x: 100, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
    };

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animations[animationType],
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay, animationType]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};
