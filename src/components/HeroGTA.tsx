import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const HeroGTA = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline para la animación inicial
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animación de entrada tipo GTA 6
      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      })
        .from(titleRef.current, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
        })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          buttonsRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
          },
          '-=0.5'
        );

      // Efecto parallax en el scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: 300,
          opacity: 0.3,
          scale: 1.1,
        });
      }

      // Efecto parallax en el overlay
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          opacity: 0,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background (placeholder - puedes agregar un video real) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-black/60" />
        {/* Puedes reemplazar esto con un <video> tag */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)',
            backgroundAttachment: 'fixed',
          }}
        />
      </div>

      {/* Overlay con gradiente */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"
      />

      {/* Efecto de partículas/luces */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            EKI PROJECT
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl lg:text-4xl mb-12 text-gray-300 font-light tracking-wide max-w-4xl mx-auto leading-relaxed"
        >
          Transformamos ideas en{' '}
          <span className="text-blue-400 font-semibold">experiencias digitales</span>{' '}
          extraordinarias
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/projects">
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105"
            >
              Explorar Proyectos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <Link to="/team">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Conocer Equipo
            </Button>
          </Link>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
