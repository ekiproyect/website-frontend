import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const EnhancedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación inicial del título
      gsap.from(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });

      // Timeline para el scroll reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          pin: true,
        },
      });

      // Fase 1: El título se difumina y se hace más pequeño (más suave y gradual)
      tl.to(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        y: -150,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: 'power2.inOut',
      })
        // Fase 2: Aparece el subtítulo
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.3,
          },
          '-=0.2'
        )
        // Fase 3: El subtítulo se posiciona arriba
        .to(subtitleRef.current, {
          y: -200,
          scale: 0.8,
          duration: 0.4,
        })
        // Fase 4: Aparece el contenido principal
        .from(
          contentRef.current,
          {
            opacity: 0,
            y: 100,
            duration: 0.4,
          },
          '-=0.2'
        );

      // Animar el indicador de scroll
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
      });

      // Ocultar indicador al hacer scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'top -50',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[200vh] bg-black overflow-hidden"
    >
      {/* Fondo con efectos */}
      <div className="sticky top-0 h-screen w-full">
        {/* Fondo gradiente animado - Mantener visible más tiempo */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/30 to-purple-950/30 transition-opacity duration-1000" />
        
        {/* Partículas de fondo - Más visibles y persistentes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Contenedor centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Título principal (primera pantalla) */}
          <h1
            ref={titleRef}
            className="absolute text-[10rem] md:text-[15rem] lg:text-[20rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-purple-500 leading-none select-none"
          >
            EKI
          </h1>

          {/* Subtítulo (segunda pantalla) */}
          <div
            ref={subtitleRef}
            className="absolute opacity-0 text-center"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
              EKI PROJECT
            </h2>
            <p className="text-2xl md:text-3xl text-blue-300 font-light tracking-widest">
              Innovación Digital
            </p>
          </div>

          {/* Contenido principal (tercera pantalla) */}
          <div
            ref={contentRef}
            className="absolute opacity-0 max-w-5xl px-4 text-center"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transformamos ideas en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                experiencias digitales
              </span>{' '}
              extraordinarias
            </h3>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
              Desarrollo de software de vanguardia, diseño innovador y soluciones tecnológicas
              que impulsan el crecimiento de tu negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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

        {/* Indicador de scroll */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-sm uppercase tracking-wider">Scroll para explorar</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
