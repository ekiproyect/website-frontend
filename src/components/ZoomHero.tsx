import { useEffect, useRef, useState } from 'react';
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
  
  // Refs para las nuevas secciones
  const philosophyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  // Refs para el fondo vivo
  const backgroundRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  // Estado para detección de dispositivo (para usar en JSX)
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTouch: false,
  });  useEffect(() => {
    // ============================================
    // RESETEAR SCROLL AL INICIO
    // ============================================
    window.scrollTo(0, 0);
    
    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    const isMobile = window.innerWidth < 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Guardar en estado para usar en JSX
    setDeviceInfo({ isMobile, isTouch });
    
    // Scroll distance optimizado para mobile (-42% en mobile)
    const scrollDistance = isMobile ? 15000 : 26000;
    
    console.log('🎯 Device Detection:', {
      isMobile,
      isTouch,
      scrollDistance,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    const ctx = gsap.context(() => {
      // ============================================
      // ANIMACIÓN INICIAL - Integrada en la timeline
      // ============================================
      // Establecer estado inicial SIN animación separada
      gsap.set(titleRef.current, {
        opacity: 1,
        scale: 1,
      });
      
      // Establecer estados iniciales de tagline y subtítulo
      gsap.set([taglineRef.current, subtitleRef.current], {
        opacity: 0,
        y: 30,
      });
      
      // Establecer estado inicial de Filosofía
      gsap.set(philosophyRef.current, {
        opacity: 0,
      });
      
      // Establecer estados iniciales de Servicios y Proyectos
      gsap.set([servicesRef.current, projectsRef.current], {
        opacity: 0,
      });
      
      // Establecer estado inicial de Cotización
      gsap.set(quoteRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 50,
      });

      // Timeline principal - TODAS las animaciones coordinadas
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`, // Dinámico: 15000px mobile, 26000px desktop
          scrub: 2.5, // Scrub alto = muy suave
          pin: true,
          markers: false, // Cambiar a true para debug
        },
      });
      
      // ============================================
      // ANIMACIÓN DEL FONDO VIVO (paralela a todo)
      // Hue shift por escena + light sweep
      // OPTIMIZADO: Intensidad reducida en mobile para mejor performance
      // ============================================
      
      // Factores de optimización para mobile
      const hueIntensity = isMobile ? 0.5 : 1; // 50% menos rotación en mobile
      const saturationBase = isMobile ? 1 : 1; // Sin saturación extra en mobile
      const saturationMax = isMobile ? 1.1 : 1.5; // Max 1.1x en mobile vs 1.5x desktop
      
      // Azul frío inicial → Púrpura neón (Filosofía) → Rosa cálido (Servicios) → Azul profundo (Proyectos)
      tl.to(backgroundRef.current, {
        filter: 'hue-rotate(0deg) saturate(1)',
        duration: 10,
        ease: 'none',
      }, 0)
      .to(backgroundRef.current, {
        filter: `hue-rotate(${30 * hueIntensity}deg) saturate(${1 + (0.3 * (saturationMax - 1))})`, // 15deg/1.15 mobile vs 30deg/1.3 desktop
        duration: 4,
        ease: 'power1.inOut',
      }, 12)
      .to(backgroundRef.current, {
        filter: `hue-rotate(${60 * hueIntensity}deg) saturate(${saturationMax})`, // 30deg/1.1 mobile vs 60deg/1.5 desktop
        duration: 4,
        ease: 'power1.inOut',
      }, 16)
      .to(backgroundRef.current, {
        filter: `hue-rotate(${90 * hueIntensity}deg) saturate(${1 + (0.2 * (saturationMax - 1))})`, // 45deg/1.08 mobile vs 90deg/1.2 desktop
        duration: 4,
        ease: 'power1.inOut',
      }, 20);
      
      // Light sweep: Desactivado en mobile para ahorrar GPU
      if (!isMobile) {
        gsap.to(lightSweepRef.current, {
          x: '100vw',
          duration: 3,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 3,
        });
        console.log('✅ Light sweep activado (desktop)');
      } else {
        console.log('⚠️ Light sweep desactivado (mobile performance)');
      }

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
      // FASE 4.5: "EKI PROJECT" SUBE y TAGLINE APARECE
      // ============================================
      .to(backgroundTextRef.current, {
        y: -80,
        scale: 1.1,
        duration: 2,
        ease: 'power2.inOut',
      }, 5.5)
      
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, 6)
      
      // ============================================
      // FASE 5: SUBTÍTULO APARECE
      // ============================================
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, 7)
      
      // ============================================
      // FASE 6: FADE OUT de EKI PROJECT, TAGLINE y SUBTÍTULO
      // ============================================
      .to([backgroundTextRef.current, taglineRef.current, subtitleRef.current], {
        opacity: 0,
        y: -30,
        duration: 2,
        ease: 'power2.inOut',
      }, 9)
      
      // ============================================
      // FASE 7: FILOSOFÍA APARECE
      // ============================================
      .to(philosophyRef.current, {
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 11)
      
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
      }, 20)
      
      // ============================================
      // FASE 13: PROYECTOS DESAPARECE (190-200%)
      // Transición hacia cotización
      // ============================================
      .to(projectsRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 2,
        ease: 'power2.in',
      }, 22.5)
      
      // ============================================
      // FASE 14: COTIZACIÓN APARECE (200-220%) - FINAL
      // Sección de cotización con formulario
      // ============================================
      .to(quoteRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 3,
        ease: 'power3.out',
      }, 24.5);
    }, containerRef);
    
    // ============================================
    // MOTION REFINEMENT: Parallax en fondo (SOLO EN DISPOSITIVOS NO-TOUCH)
    // ============================================
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      // Parallax suave en el fondo
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          x: moveX * 10,
          y: moveY * 10,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };
    
    // Solo activar parallax en dispositivos no-touch (desktop)
    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove);
      console.log('✅ Parallax activado (desktop)');
    } else {
      console.log('⚠️ Parallax desactivado (touch device)');
    }

    return () => {
      ctx.revert();
      // Solo remover listener si fue añadido
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
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
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }
        
        @keyframes float-organic {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(15px, -15px) scale(1.1); }
          50% { transform: translate(-10px, -25px) scale(0.9); }
          75% { transform: translate(-20px, -10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes orbital {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
      `}</style>
      
      {/* FONDO VIVO - Sistema completo con hue shift, grain, light sweep y partículas */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%), linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
          filter: 'hue-rotate(0deg) saturate(1)',
        }}
      >
        {/* Capa de grain cinematográfico animado */}
        <div 
          ref={grainRef}
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            animation: 'grain 8s steps(10) infinite',
          }}
        />
        
        {/* Light sweep - barrido de luz cada 6 segundos */}
        <div 
          ref={lightSweepRef}
          className="absolute top-0 left-0 w-32 h-full opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), transparent)',
            filter: deviceInfo.isMobile ? 'none' : 'blur(50px)', // Sin blur en mobile
            transform: 'translateX(-100%)',
            display: deviceInfo.isMobile ? 'none' : 'block', // Ocultado completamente en mobile
          }}
        />
        
        {/* Sistema de 3 capas de partículas */}
        
        {/* CAPA 1: Partículas flotantes (float) - Ligeras, siempre visibles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/30 rounded-full" style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500/25 rounded-full" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-500/30 rounded-full" style={{ animation: 'float 7s ease-in-out infinite 2s' }} />
        
        {/* CAPA 2: Partículas orgánicas (blobs) - Solo desktop por blur pesado */}
        {!deviceInfo.isMobile && (
          <>
            <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl" style={{ animation: 'float-organic 12s ease-in-out infinite' }} />
            <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" style={{ animation: 'float-organic 10s ease-in-out infinite 3s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-pink-600/10 rounded-full blur-3xl" style={{ animation: 'float-organic 15s ease-in-out infinite 5s' }} />
          </>
        )}
        
        {/* CAPA 3: Partículas orbitales - Ligeras, siempre visibles */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/40 rounded-full" style={{ animation: 'orbital 25s linear infinite' }} />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400/40 rounded-full" style={{ animation: 'orbital 20s linear infinite reverse' }} />
        
        {/* Grid pattern sutil */}
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
        <div className="text-center space-y-3 md:space-y-6 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight md:tracking-normal">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              EKI PROJECT
            </span>
          </h2>
          
          <div className="h-0.5 w-32 md:h-1 md:w-64 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </div>
      </div>

      {/* TAGLINE (aparece después de "EKI PROJECT") - z-6 */}
      <p
        ref={taglineRef}
        className="absolute left-1/2 -translate-x-1/2 z-[6] text-sm sm:text-base md:text-xl lg:text-2xl font-light tracking-wide text-center px-4 sm:px-6 max-w-3xl"
        style={{ top: '68%', opacity: 0 }}
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
        className="relative z-10 text-[25vw] sm:text-[22vw] md:text-[25vw] font-black tracking-tighter"
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

      {/* SUBTÍTULO (aparece después) - z-15 con posición más baja */}
      <p
        ref={subtitleRef}
        className="absolute left-1/2 -translate-x-1/2 bottom-[18%] z-15 text-xs sm:text-sm md:text-base lg:text-xl text-gray-300 text-center px-4 sm:px-6 max-w-2xl leading-relaxed"
        style={{ opacity: 0 }}
      >
        Transformamos <span className="text-purple-400 font-bold">ideas</span> en{' '}
        <span className="text-pink-400 font-bold">experiencias digitales</span> extraordinarias
      </p>

      {/* SECCIÓN FILOSOFÍA (aparece después) - z-25 */}
      <div
        ref={philosophyRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-4 sm:px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-4xl text-center space-y-4 sm:space-y-6 md:space-y-8">
          {/* Título Filosofía */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nuestra Filosofía
            </span>
          </h2>
          
          {/* Línea decorativa */}
          <div className="h-0.5 w-20 md:h-1 md:w-32 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
          
          {/* Texto principal */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
            Creemos en el poder de la{' '}
            <span className="text-purple-400 font-semibold">tecnología</span>{' '}
            para transformar ideas en realidades impactantes.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed">
            Cada proyecto es una oportunidad para innovar, crear valor y superar expectativas.
            Trabajamos con pasión, dedicación y un compromiso inquebrantable con la excelencia.
          </p>
          
          {/* Elementos decorativos */}
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-400">100%</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Dedicación</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-pink-400">∞</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Innovación</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-400">1</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Objetivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN SERVICIOS (aparece después de Filosofía) - z-[25] */}
      <div
        ref={servicesRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-4 sm:px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-6xl w-full text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Título Servicios */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Nuestros Servicios
              </span>
            </h2>
            <div className="h-0.5 w-20 md:h-1 md:w-32 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
              Soluciones completas para tu transformación digital
            </p>
          </div>
          
          {/* Grid de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 md:mt-12">
            {/* Servicio 1: Desarrollo Web */}
            <div className="group bg-gradient-to-br from-purple-950/30 to-pink-950/20 backdrop-blur-sm border border-purple-500/20 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-300 mb-2 md:mb-3">
                Desarrollo Web
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Sitios y aplicaciones web modernas, rápidas y escalables con las últimas tecnologías.
              </p>
            </div>
            
            {/* Servicio 2: Diseño UX/UI */}
            <div className="group bg-gradient-to-br from-pink-950/30 to-blue-950/20 backdrop-blur-sm border border-pink-500/20 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-pink-500/40 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-300 mb-2 md:mb-3">
                Diseño UX/UI
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Experiencias de usuario intuitivas y diseños visuales que cautivan y convierten.
              </p>
            </div>
            
            {/* Servicio 3: Consultoría */}
            <div className="group bg-gradient-to-br from-blue-950/30 to-purple-950/20 backdrop-blur-sm border border-blue-500/20 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:border-blue-500/40 transition-all duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                💡
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300 mb-2 md:mb-3">
                Consultoría Tech
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Estrategia digital, arquitectura de software y asesoría tecnológica especializada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN PROYECTOS (showcase visual) - z-[25] */}
      <div
        ref={projectsRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-4 sm:px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-6xl w-full text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Título Proyectos */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Proyectos Destacados
              </span>
            </h2>
            <div className="h-0.5 w-20 md:h-1 md:w-32 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
              Casos de éxito que transformaron negocios
            </p>
          </div>
          
          {/* Showcase de Proyectos - Diseño tipo carrusel estático */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12">
            {/* Proyecto 1 */}
            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30" style={{ transformStyle: 'preserve-3d' }}>
              {/* Imagen placeholder con gradiente */}
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl sm:text-6xl md:text-8xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
                    🚀
                  </div>
                </div>
              </div>
              {/* Info del proyecto */}
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-purple-950/50 to-pink-950/30 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-300 mb-1 sm:mb-2 group-hover:text-purple-200 transition-colors">
                  E-Commerce Platform
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Plataforma completa de comercio electrónico con +10K usuarios activos
                </p>
                <div className="flex gap-2 mt-2 sm:mt-3 flex-wrap">
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all cursor-pointer">
                    React
                  </span>
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30 transition-all cursor-pointer">
                    Node.js
                  </span>
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all cursor-pointer">
                    MongoDB
                  </span>
                </div>
              </div>
            </div>
            
            {/* Proyecto 2 */}
            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30" style={{ transformStyle: 'preserve-3d' }}>
              {/* Imagen placeholder con gradiente */}
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl sm:text-6xl md:text-8xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
                    📱
                  </div>
                </div>
              </div>
              {/* Info del proyecto */}
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-950/50 to-purple-950/30 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300 mb-1 sm:mb-2 group-hover:text-blue-200 transition-colors">
                  FinTech Dashboard
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Dashboard analítico para gestión financiera en tiempo real
                </p>
                <div className="flex gap-2 mt-2 sm:mt-3 flex-wrap">
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all cursor-pointer">
                    Next.js
                  </span>
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-all cursor-pointer">
                    TypeScript
                  </span>
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30 transition-all cursor-pointer">
                    TailwindCSS
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Ver más proyectos */}
          <div className="mt-6 sm:mt-8 md:mt-10">
            <div className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-500/60 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <span className="text-sm sm:text-base text-purple-300 font-semibold group-hover:text-purple-200 transition-colors">
                Ver todos los proyectos →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN COTIZACIÓN - FINAL DEL SCROLL (z-26) */}
      <div
        ref={quoteRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[26] px-4 sm:px-6"
        style={{ opacity: 0 }}
      >
        <div className="max-w-4xl w-full py-4">
          {/* Header de la sección */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-md mb-2 sm:mb-3">
              <span className="text-green-400 text-xs font-medium">
                ✨ Última Sección
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Cotiza tu Proyecto
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
              Cuéntanos tu idea y te responderemos en menos de 24 horas
            </p>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-gradient-to-br from-green-950/30 via-emerald-950/20 to-cyan-950/30 backdrop-blur-xl rounded-xl md:rounded-2xl border border-green-500/30 p-4 sm:p-5 md:p-6 shadow-2xl shadow-green-500/20">
            <form className="space-y-3 sm:space-y-4">
              {/* Grid de campos principales */}
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-green-300 mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Juan Pérez"
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-green-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label htmlFor="project-type" className="block text-xs font-medium text-green-300 mb-1.5">
                  Tipo de proyecto *
                </label>
                <select
                  id="project-type"
                  required
                  className="w-full px-3 py-2.5 sm:py-2 text-sm bg-black/40 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="web">Sitio Web / Landing Page</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="app">Aplicación Web</option>
                  <option value="mobile">App Móvil</option>
                  <option value="custom">Desarrollo a medida</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-xs font-medium text-green-300 mb-1.5">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  placeholder="Describe brevemente tu idea..."
                  className="w-full px-3 py-2.5 sm:py-2 text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                />
              </div>

              {/* Presupuesto */}
              <div>
                <label htmlFor="budget" className="block text-xs font-medium text-green-300 mb-1.5">
                  Presupuesto estimado (opcional)
                </label>
                <select
                  id="budget"
                  className="w-full px-3 py-2.5 sm:py-2 text-sm bg-black/40 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="">Prefiero no especificar</option>
                  <option value="small">Menos de $5,000</option>
                  <option value="medium">$5,000 - $15,000</option>
                  <option value="large">$15,000 - $30,000</option>
                  <option value="enterprise">Más de $30,000</option>
                </select>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full py-3 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 group"
              >
                Enviar Cotización
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </form>

            {/* Información de contacto alternativa */}
            <div className="mt-6 pt-6 border-t border-green-500/20">
              <p className="text-center text-gray-400 text-xs mb-3">
                ¿Prefieres contactarnos directamente?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:contacto@ekiproyect.com"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300 text-xs transition-all"
                >
                  📧 contacto@ekiproyect.com
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300 text-xs transition-all"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Footer integrado (sin ser footer tradicional) */}
          <div className="mt-8 space-y-6">
            {/* Links rápidos */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                Sobre Nosotros
              </Link>
              <Link to="/services" className="text-gray-400 hover:text-green-400 transition-colors">
                Servicios
              </Link>
              <Link to="/projects" className="text-gray-400 hover:text-green-400 transition-colors">
                Proyectos
              </Link>
              <Link to="/technologies" className="text-gray-400 hover:text-green-400 transition-colors">
                Tecnologías
              </Link>
              <Link to="/team" className="text-gray-400 hover:text-green-400 transition-colors">
                Equipo
              </Link>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center gap-3">
              <a
                href="https://github.com/ekiproyect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <span className="text-base">🐙</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <span className="text-base">💼</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <span className="text-base">🐦</span>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center space-y-1">
              <p className="text-gray-500 text-xs">
                © 2025 Eki Proyect. Todos los derechos reservados.
              </p>
              <p className="text-gray-600 text-xs">
                Hecho con 💚 y tecnología de vanguardia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-radial from-transparent via-transparent to-black/80" />
    </div>
  );
};
