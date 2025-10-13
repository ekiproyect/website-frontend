import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const SmoothHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación inicial del título
      gsap.from(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Timeline principal para el scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000', // Scroll más largo para transición más suave
          scrub: 2, // Más scrub = más suave
          pin: true,
        },
      });

      // Secuencia ultra suave: título desaparece MUY gradualmente
      tl.to(titleRef.current, {
        scale: 0.3,
        opacity: 0,
        y: -200,
        filter: 'blur(30px)',
        duration: 1.5,
        ease: 'power1.inOut',
      })
        // Primera línea de texto aparece
        .from(line1Ref.current, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.8')
        // Se queda visible un rato
        .to({}, { duration: 0.5 })
        // Sube lentamente
        .to(line1Ref.current, {
          y: -100,
          opacity: 0.3,
          scale: 0.8,
          duration: 0.8,
        })
        // Segunda línea aparece
        .from(line2Ref.current, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.5')
        // Se queda visible
        .to({}, { duration: 0.5 })
        // Sube
        .to(line2Ref.current, {
          y: -100,
          opacity: 0.3,
          scale: 0.8,
          duration: 0.8,
        })
        // Tercera línea aparece
        .from(line3Ref.current, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.5')
        // Se queda visible
        .to({}, { duration: 0.5 })
        // Botones aparecen
        .from(buttonsRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'back.out(1.7)',
        }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full">
      {/* Contenido centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Título EKI gigante */}
          <h1
            ref={titleRef}
            className="text-[12rem] md:text-[18rem] lg:text-[25rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-purple-500 leading-none select-none mb-8"
          >
            EKI
          </h1>

          {/* Primera línea - Aparece después del título */}
          <p
            ref={line1Ref}
            className="opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Transformamos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ideas
            </span>
          </p>

          {/* Segunda línea */}
          <p
            ref={line2Ref}
            className="opacity-0 text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-300 mb-8 leading-tight"
          >
            en experiencias{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              digitales
            </span>
          </p>

          {/* Tercera línea */}
          <p
            ref={line3Ref}
            className="opacity-0 text-2xl md:text-4xl text-gray-400 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Desarrollo de software innovador que impulsa el crecimiento de tu negocio
          </p>

          {/* Botones */}
          <div
            ref={buttonsRef}
            className="opacity-0 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/projects">
              <Button
                size="lg"
                className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
