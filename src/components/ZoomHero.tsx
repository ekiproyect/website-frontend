import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const ZoomHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Refs para las nuevas secciones
  const philosophyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ============================================
    // RESETEAR SCROLL AL INICIO
    // ============================================
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // ============================================
      // ANIMACIÓN INICIAL - Integrada en la timeline
      // ============================================
      // Establecer estado inicial SIN animación separada
      gsap.set(titleRef.current, {
        opacity: 1,
        scale: 1,
      });
      
      // Establecer estados iniciales de tagline, subtítulo y CTAs
      gsap.set([taglineRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });
      
      // Establecer estado inicial de Filosofía
      gsap.set(philosophyRef.current, {
        opacity: 0,
      });
      
      // Establecer estados iniciales de Servicios y Proyectos
      gsap.set([servicesRef.current, projectsRef.current], {
        opacity: 0,
      });

      // Timeline principal - TODAS las animaciones coordinadas
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=22000', // Extendido para 3 secciones adicionales
          scrub: 2.5, // Scrub alto = muy suave
          pin: true,
          markers: false, // Cambiar a true para debug
        },
      });

      // ============================================
      // FASE 1: ZOOM IN de EKI (0-30%)
      // ============================================
      tl.to(titleRef.current, {
        scale: 2,
        duration: 1.5,
        ease: 'power2.in',
      }, 0) // Empieza en 0
      
      // ============================================
      // FASE 2: "EKI PROJECT" EMPIEZA A APARECER (15-50%)
      // Mientras EKI sigue haciendo zoom
      // ============================================
      .to(backgroundTextRef.current, {
        opacity: 0.6, // Aparece gradualmente
        scale: 0.95,
        duration: 2,
        ease: 'power2.out',
      }, 0.8) // Empieza cuando EKI ya hizo algo de zoom
      
      // ============================================
      // FASE 3: EKI llega al MÁXIMO y empieza a DESVANECERSE (30-70%)
      // "EKI PROJECT" se hace MÁS VISIBLE
      // ============================================
      .to(titleRef.current, {
        scale: 2.5,
        opacity: 0.7, // Empieza a transparentarse
        filter: 'blur(8px)', // Blur leve
        webkitFilter: 'blur(8px)',
        duration: 2,
        ease: 'power1.inOut',
      }, 1.5) // Continúa desde el zoom
      
      .to(backgroundTextRef.current, {
        opacity: 1, // Ahora completamente visible
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      }, 1.5) // AL MISMO TIEMPO que EKI se transparenta
      
      // ============================================
      // FASE 4: EKI DESAPARECE COMPLETAMENTE (70-100%)
      // "EKI PROJECT" se CENTRA y crece
      // ============================================
      .to(titleRef.current, {
        scale: 3,
        opacity: 0, // Desaparece completamente
        filter: 'blur(25px)', // Blur fuerte al final
        webkitFilter: 'blur(25px)',
        duration: 2,
        ease: 'power2.out',
      }, 3.5) // Última fase
      
      .to(backgroundTextRef.current, {
        scale: 1.3,
        y: -40,
        duration: 2,
        ease: 'power2.inOut',
      }, 3.5) // AL MISMO TIEMPO que EKI desaparece
      
      // ============================================
      // FASE 4.5: "EKI PROJECT" SUBE MÁS y TAGLINE APARECE (100-120%)
      // ============================================
      .to(backgroundTextRef.current, {
        y: -120, // Sube más arriba
        scale: 1.2, // Ligeramente más pequeño
        duration: 2, // Más tiempo para subir
        ease: 'power2.inOut',
      }, 5.5) // Después de centrarse
      
      .to(taglineRef.current, {
        opacity: 1, // Aparece
        y: 0, // Posición final
        duration: 2, // Más tiempo para aparecer
        ease: 'power2.out',
      }, 6) // Aparece cuando ya subió un poco
      
      // ============================================
      // FASE 5: SUBTÍTULO APARECE (80-95%)
      // ============================================
      .to(subtitleRef.current, {
        opacity: 1, // Aparece
        y: 0, // Posición final
        duration: 2,
        ease: 'power2.out',
      }, 7.5) // Más tarde para que haya tiempo de leer tagline
      
      // ============================================
      // FASE 6: CTAs FINALES (90-100%)
      // ============================================
      .to(ctaRef.current, {
        opacity: 1, // Aparece
        y: 0, // Posición final
        duration: 1.5,
        ease: 'back.out(1.2)',
      }, 9) // Último elemento
      
      // ============================================
      // FASE 7: FADE OUT DE TODO (100-110%)
      // TODO desaparece para dar paso a nueva sección
      // ============================================
      .to([backgroundTextRef.current, taglineRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: -30, // Suben un poco al desaparecer
        duration: 2,
        ease: 'power2.inOut',
      }, 10.5) // Después de que todo esté visible
      
      // ============================================
      // FASE 8: FILOSOFÍA APARECE (110-120%)
      // Nueva sección entra
      // ============================================
      .to(philosophyRef.current, {
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 12) // Después del fade out
      
      // ============================================
      // FASE 9: FILOSOFÍA DESAPARECE (130-140%)
      // Preparando siguiente sección
      // ============================================
      .to(philosophyRef.current, {
        opacity: 0,
        y: -30,
        duration: 2,
        ease: 'power2.inOut',
      }, 14.5)
      
      // ============================================
      // FASE 10: SERVICIOS APARECE (140-150%)
      // Sección de servicios entra
      // ============================================
      .to(servicesRef.current, {
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 16)
      
      // ============================================
      // FASE 11: SERVICIOS DESAPARECE (160-170%)
      // Preparando sección de proyectos
      // ============================================
      .to(servicesRef.current, {
        opacity: 0,
        y: -30,
        duration: 2,
        ease: 'power2.inOut',
      }, 18.5)
      
      // ============================================
      // FASE 12: PROYECTOS APARECE (170-180%)
      // Showcase de proyectos entra
      // ============================================
      .to(projectsRef.current, {
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 20);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center animate-fade-in"
      style={{
        background: 'linear-gradient(to bottom right, #000000, #0a0a1a, #0d0d2b)',
        animation: 'fadeIn 0.8s ease-out forwards',
      }}
    >
      {/* Keyframes CSS inline */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      {/* Partículas de fondo (fijas) */}
      <div className="absolute inset-0 z-0">
        {/* Partículas animadas */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-500/20 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-cyan-500/15 rounded-full animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* TEXTO DE FONDO (aparece detrás de EKI) - z-5 */}
      <div
        ref={backgroundTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[5] pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div className="text-center space-y-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-normal">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              EKI PROJECT
            </span>
          </h2>
          
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </div>
      </div>

      {/* TAGLINE (aparece después de "EKI PROJECT") - z-6 */}
      <p
        ref={taglineRef}
        className="absolute left-1/2 -translate-x-1/2 z-[6] text-2xl md:text-4xl font-light tracking-wide text-center px-6 max-w-4xl"
        style={{ top: '58%', opacity: 0 }}
      >
        <span className="text-gray-300">
          Transformación digital,{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
            innovación constante
          </span>
        </span>
      </p>

      {/* EKI GIGANTE (hace zoom) - z-10 */}
      <div
        ref={titleRef}
        className="relative z-10 text-[20vw] md:text-[25vw] font-black tracking-tighter"
        style={{ 
          willChange: 'transform, opacity, filter',
          transformOrigin: 'center center'
        }}
      >
        <h1 className="relative">
          <span className="bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
            EKI
          </span>
        </h1>
      </div>

      {/* SUBTÍTULO (aparece después) */}
      <p
        ref={subtitleRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-[30%] z-20 text-xl md:text-3xl text-gray-300 text-center px-6 max-w-3xl"
        style={{ opacity: 0 }}
      >
        Transformamos <span className="text-purple-400 font-bold">ideas</span> en{' '}
        <span className="text-pink-400 font-bold">experiencias digitales</span> extraordinarias
      </p>

      {/* CTAs FINALES */}
      <div
        ref={ctaRef}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-4 opacity-0"
      >
        <Link to="/services">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
          >
            Explorar Servicios
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link to="/projects">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-950/30"
          >
            Ver Proyectos
          </Button>
        </Link>
      </div>

      {/* SECCIÓN FILOSOFÍA (aparece después) - z-25 */}
      <div
        ref={philosophyRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-4xl text-center space-y-8">
          {/* Título Filosofía */}
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nuestra Filosofía
            </span>
          </h2>
          
          {/* Línea decorativa */}
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
          
          {/* Texto principal */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            Creemos en el poder de la{' '}
            <span className="text-purple-400 font-semibold">tecnología</span>{' '}
            para transformar ideas en realidades impactantes.
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Cada proyecto es una oportunidad para innovar, crear valor y superar expectativas.
            Trabajamos con pasión, dedicación y un compromiso inquebrantable con la excelencia.
          </p>
          
          {/* Elementos decorativos */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400">100%</div>
              <div className="text-sm text-gray-500 mt-1">Dedicación</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-400">∞</div>
              <div className="text-sm text-gray-500 mt-1">Innovación</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400">1</div>
              <div className="text-sm text-gray-500 mt-1">Objetivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN SERVICIOS (aparece después de Filosofía) - z-[25] */}
      <div
        ref={servicesRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-6xl w-full text-center space-y-12">
          {/* Título Servicios */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Nuestros Servicios
              </span>
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
            <p className="text-lg md:text-xl text-gray-400">
              Soluciones completas para tu transformación digital
            </p>
          </div>
          
          {/* Grid de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Servicio 1: Desarrollo Web */}
            <div className="group bg-gradient-to-br from-purple-950/30 to-pink-950/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="text-2xl font-bold text-purple-300 mb-3">
                Desarrollo Web
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Sitios y aplicaciones web modernas, rápidas y escalables con las últimas tecnologías.
              </p>
            </div>
            
            {/* Servicio 2: Diseño UX/UI */}
            <div className="group bg-gradient-to-br from-pink-950/30 to-blue-950/20 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-8 hover:border-pink-500/40 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="text-2xl font-bold text-pink-300 mb-3">
                Diseño UX/UI
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Experiencias de usuario intuitivas y diseños visuales que cautivan y convierten.
              </p>
            </div>
            
            {/* Servicio 3: Consultoría */}
            <div className="group bg-gradient-to-br from-blue-950/30 to-purple-950/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className="text-2xl font-bold text-blue-300 mb-3">
                Consultoría Tech
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Estrategia digital, arquitectura de software y asesoría tecnológica especializada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN PROYECTOS (showcase visual) - z-[25] */}
      <div
        ref={projectsRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-6xl w-full text-center space-y-12">
          {/* Título Proyectos */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Proyectos Destacados
              </span>
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60" />
            <p className="text-lg md:text-xl text-gray-400">
              Casos de éxito que transformaron negocios
            </p>
          </div>
          
          {/* Showcase de Proyectos - Diseño tipo carrusel estático */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Proyecto 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500">
              {/* Imagen placeholder con gradiente */}
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
                    🚀
                  </div>
                </div>
              </div>
              {/* Info del proyecto */}
              <div className="p-6 bg-gradient-to-br from-purple-950/50 to-pink-950/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-purple-300 mb-2 group-hover:text-purple-200 transition-colors">
                  E-Commerce Platform
                </h3>
                <p className="text-gray-400 text-sm">
                  Plataforma completa de comercio electrónico con +10K usuarios activos
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    React
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Node.js
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    MongoDB
                  </span>
                </div>
              </div>
            </div>
            
            {/* Proyecto 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500">
              {/* Imagen placeholder con gradiente */}
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
                    📱
                  </div>
                </div>
              </div>
              {/* Info del proyecto */}
              <div className="p-6 bg-gradient-to-br from-blue-950/50 to-purple-950/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                  FinTech Dashboard
                </h3>
                <p className="text-gray-400 text-sm">
                  Dashboard analítico para gestión financiera en tiempo real
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Next.js
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    TypeScript
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    TailwindCSS
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Ver más proyectos */}
          <div className="mt-10">
            <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 backdrop-blur-sm">
              <span className="text-purple-300 font-semibold">
                Ver todos los proyectos →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-radial from-transparent via-transparent to-black/80" />
    </div>
  );
};
