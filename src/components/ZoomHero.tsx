import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeamMemberSection } from './TeamMemberSection';

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
  const technologiesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const teamIntroRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  
  // Ref para controlar el progreso del video de Team
  const teamVideoProgressRef = useRef({ value: 0 });
  
  // Refs para el fondo vivo
  const backgroundRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  // Estado para detección de dispositivo (para usar en JSX)
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTouch: false,
  });

  // Estado para el carrusel de proyectos
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const carouselScrollRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Data de proyectos
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Plataforma completa de comercio electrónico con +10K usuarios activos",
      icon: "🚀",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      gradient: "from-purple-600 to-pink-600",
      tags: [
        { name: "React" },
        { name: "Node.js" },
        { name: "MongoDB" }
      ]
    },
    {
      id: 2,
      title: "FinTech Dashboard",
      description: "Dashboard analítico para gestión financiera en tiempo real",
      icon: "📱",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      gradient: "from-blue-600 to-purple-600",
      tags: [
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "TailwindCSS" }
      ]
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "Generador de contenido con IA para marketing digital y redes sociales",
      icon: "🤖",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      gradient: "from-green-600 to-teal-600",
      tags: [
        { name: "Python" },
        { name: "OpenAI" },
        { name: "FastAPI" }
      ]
    },
    {
      id: 4,
      title: "Healthcare CRM",
      description: "Sistema de gestión de pacientes con historial médico electrónico",
      icon: "🏥",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      gradient: "from-red-600 to-orange-600",
      tags: [
        { name: "Vue.js" },
        { name: "Laravel" },
        { name: "MySQL" }
      ]
    },
    {
      id: 5,
      title: "Logistics Tracker",
      description: "Sistema de rastreo en tiempo real para entregas y gestión de flotas",
      icon: "🚚",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      gradient: "from-indigo-600 to-cyan-600",
      tags: [
        { name: "React Native" },
        { name: "Firebase" },
        { name: "Google Maps" }
      ]
    }
  ];

  // Data de Team
  const teamMember = {
    id: 'vicente',
    name: 'Vicente Araya',
    role: 'CEO & Founder | Ingeniero de Software',
    bio: 'Apasionado por la innovación tecnológica y el desarrollo de soluciones escalables. Con más de 8 años de experiencia liderando equipos de desarrollo y arquitectando sistemas complejos que transforman negocios.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'System Design'],
    social: {
      linkedin: 'https://linkedin.com/in/vicente-araya',
      github: 'https://github.com/vicentearaya',
      twitter: 'https://twitter.com/vicentearaya',
    },
    frames: {
      path: '/equipo/vicente',
      start: 20,
      end: 147,
      total: 128,
    },
  };

  // Funciones del carrusel
  const enterCarouselMode = () => {
    setIsCarouselMode(true);
    
    // GUARDAR posición actual del scroll
    scrollPositionRef.current = window.scrollY;
    
    // BLOQUEAR SCROLL VERTICAL COMPLETAMENTE
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    
    // Usar requestAnimationFrame para asegurar que el DOM esté listo
    requestAnimationFrame(() => {
      if (!carouselContainerRef.current || !backButtonRef.current || !carouselScrollRef.current) {
        return;
      }

      // GSAP animation
      gsap.timeline({
        onComplete: () => {
          // Inicializar Lenis para scroll horizontal DESPUÉS de la animación
          setTimeout(() => {
            const carouselScroll = carouselScrollRef.current;
            if (!carouselScroll) return;
            
            // Crear instancia de Lenis en modo horizontal
            lenisRef.current = new Lenis({
              wrapper: carouselScroll,
              content: carouselScroll.querySelector('.inline-flex') as HTMLElement,
              orientation: 'horizontal',
              gestureOrientation: 'both', // Permite convertir scroll vertical en horizontal
              smoothWheel: true,
              wheelMultiplier: 1,
              touchMultiplier: 2,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
            
            // Función de animación RAF para Lenis
            function raf(time: number) {
              lenisRef.current?.raf(time);
              if (lenisRef.current) {
                requestAnimationFrame(raf);
              }
            }
            requestAnimationFrame(raf);
            
            // Agregar navegación con teclado
            const handleKeyDown = (e: KeyboardEvent) => {
              if (!carouselScroll || !lenisRef.current) return;
        
              const cardWidth = carouselScroll.scrollWidth / (projects.length + 1);
        
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                lenisRef.current.scrollTo(lenisRef.current.scroll - cardWidth, {
                  duration: 0.8,
                  easing: (t) => 1 - Math.pow(1 - t, 3)
                });
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                lenisRef.current.scrollTo(lenisRef.current.scroll + cardWidth, {
                  duration: 0.8,
                  easing: (t) => 1 - Math.pow(1 - t, 3)
                });
              } else if (e.key === 'Escape') {
                e.preventDefault();
                exitCarouselMode();
              }
            };
      
            window.addEventListener('keydown', handleKeyDown);
            
            // Guardar referencia para cleanup
            (carouselScroll as HTMLDivElement & { _keyHandler?: (e: KeyboardEvent) => void })._keyHandler = handleKeyDown;
          }, 100);
        }
      })
        .set(carouselContainerRef.current, { display: 'flex' })
        .fromTo(carouselContainerRef.current, 
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(backButtonRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'back.out(1.7)' },
          '-=0.2'
        );
    });
  };

  const exitCarouselMode = () => {
    // Destruir instancia de Lenis
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
    
    // Remover keyboard listener
    const carouselScroll = carouselScrollRef.current;
    if (carouselScroll) {
      const extendedScroll = carouselScroll as HTMLDivElement & { 
        _keyHandler?: (e: KeyboardEvent) => void;
      };
      
      if (extendedScroll._keyHandler) {
        window.removeEventListener('keydown', extendedScroll._keyHandler);
        delete extendedScroll._keyHandler;
      }
    }
    
    // RESTAURAR SCROLL VERTICAL INMEDIATAMENTE (antes de la animación)
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('width');
    document.body.style.removeProperty('top');
    
    // Restaurar posición de scroll guardada SIN animación
    window.scrollTo(0, scrollPositionRef.current);
    
    // Animación de salida
    gsap.timeline({
      onComplete: () => {
        setIsCarouselMode(false);
      }
    })
      .to(backButtonRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(carouselScrollRef.current, {
        scrollLeft: 0, // Volver al inicio
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.2')
      .to(carouselContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: 'power2.in'
      }, '-=0.5')
      .set(carouselContainerRef.current, { display: 'none' });
  };
  useEffect(() => {
    // ============================================
    // RESETEAR SCROLL AL INICIO (múltiples métodos)
    // ============================================
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // También después de un pequeño delay para asegurar que funcione
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // ============================================
    // DETECCIÓN DE DISPOSITIVO
    // ============================================
    const isMobile = window.innerWidth < 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Guardar en estado para usar en JSX
    setDeviceInfo({ isMobile, isTouch });
    
    // Scroll distance aumentado para acomodar las nuevas secciones (Servicios, Tecnologías y Team)
    // Aumentado para dar espacio a Filosofía, Servicios, Tecnologías, Proyectos, Team y Cotización
    const scrollDistance = isMobile ? 6500 : 10000;
    
    // Limitar la altura del documento para evitar espacio en blanco
    document.documentElement.style.maxHeight = `${window.innerHeight + scrollDistance}px`;
    document.body.style.maxHeight = `${window.innerHeight + scrollDistance}px`;
    
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
      
      // Establecer estados iniciales de Servicios, Tecnologías y Proyectos
      gsap.set([servicesRef.current, technologiesRef.current, projectsRef.current], {
        autoAlpha: 0, // Usa autoAlpha para ocultar completamente y prevenir clicks
      });
      
      // Establecer estado inicial de Team Intro y Team
      gsap.set([teamIntroRef.current, teamRef.current], {
        autoAlpha: 0,
      });
      
      // Establecer estado inicial de Cotización (autoAlpha = opacity + visibility)
      gsap.set(quoteRef.current, {
        autoAlpha: 0, // Usa autoAlpha en lugar de opacity para manejar visibility automáticamente
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
        autoAlpha: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 16)
      
      // ============================================
      // FASE 11: SERVICIOS DESAPARECE (160-170%)
      // Preparando sección de tecnologías
      // ============================================
      .to(servicesRef.current, {
        autoAlpha: 0,
        y: -30,
        duration: 2,
        ease: 'power2.inOut',
      }, 18.5)
      
      // ============================================
      // FASE 11.5: TECNOLOGÍAS APARECE (170-180%)
      // Stack tecnológico entra
      // ============================================
      .to(technologiesRef.current, {
        autoAlpha: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 20)
      
      // ============================================
      // FASE 11.8: TECNOLOGÍAS DESAPARECE (185-195%)
      // Preparando sección de proyectos
      // ============================================
      .to(technologiesRef.current, {
        autoAlpha: 0,
        y: -30,
        duration: 2,
        ease: 'power2.inOut',
      }, 22.5)
      
      // ============================================
      // FASE 12: PROYECTOS APARECE (195-205%)
      // Showcase de proyectos entra
      // ============================================
      .to(projectsRef.current, {
        autoAlpha: 1, // Usa autoAlpha para hacer visible y clickeable
        duration: 2.5,
        ease: 'power2.out',
      }, 24)
      
      // ============================================
      // FASE 13: PROYECTOS DESAPARECE (215-225%)
      // Transición hacia sección de Team
      // ============================================
      .to(projectsRef.current, {
        autoAlpha: 0, // Usa autoAlpha para ocultar completamente
        y: -50,
        scale: 0.95,
        duration: 2,
        ease: 'power2.in',
      }, 26.5)
      
      // ============================================
      // FASE 14: TEAM INTRO APARECE (225-227%)
      // Badge/Título de introducción a Team
      // ============================================
      .to(teamIntroRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      }, 28.5)
      
      // ============================================
      // FASE 15: TEAM INTRO DESAPARECE Y TEAM APARECE (227-232%)
      // Transición del título al split screen
      // ============================================
      .to(teamIntroRef.current, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.in',
      }, 30)
      
      .to(teamRef.current, {
        autoAlpha: 1,
        duration: 2,
        ease: 'power2.out',
      }, 30.5)
      
      // Animar el progreso del video de Team (de 0 a 1) durante su visibilidad
      .to(teamVideoProgressRef.current, {
        value: 1,
        duration: 2.5,
        ease: 'none',
      }, 30.5)
      
      // ============================================
      // FASE 16: TEAM DESAPARECE (237-240%)
      // Transición hacia cotización
      // ============================================
      .to(teamRef.current, {
        autoAlpha: 0,
        duration: 2,
        ease: 'power2.in',
      }, 33)
      
      // ============================================
      // FASE 17: COTIZACIÓN APARECE (250-270%) - FINAL
      // Sección de cotización con formulario
      // ============================================
      .to(quoteRef.current, {
        autoAlpha: 1, // Usa autoAlpha para manejar visibility automáticamente
        scale: 1,
        y: 0,
        duration: 3,
        ease: 'power3.out',
      }, 35);
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
    }

    return () => {
      ctx.revert();
      clearTimeout(timeoutId);
      
      // Limpiar estilos de altura máxima
      document.documentElement.style.removeProperty('max-height');
      document.body.style.removeProperty('max-height');
      
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

        /* Scrollbar personalizado para el carrusel */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          transition: background 0.3s;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
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
        className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-[6] text-sm sm:text-base md:text-xl lg:text-2xl font-light tracking-wide text-center px-4 sm:px-6 max-w-3xl w-full"
        style={{ opacity: 0 }}
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
        className="absolute left-1/2 bottom-[20%] -translate-x-1/2 z-15 text-xs sm:text-sm md:text-base lg:text-xl text-gray-300 text-center px-4 sm:px-6 max-w-2xl w-full leading-relaxed"
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

      {/* SECCIÓN TECNOLOGÍAS (aparece después de Servicios) - z-[25] */}
      <div
        ref={technologiesRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-4 sm:px-6"
      >
        <div className="max-w-6xl w-full text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Título Tecnologías */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stack Tecnológico
              </span>
            </h2>
            <div className="h-0.5 w-20 md:h-1 md:w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
              Las herramientas más modernas para construir el futuro
            </p>
          </div>
          
          {/* Grid de Tecnologías - 2 filas */}
          <div className="space-y-6 mt-8 md:mt-12">
            {/* Fila 1: Frontend */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-4">
                Frontend
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-cyan-950/40 to-blue-950/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-cyan-300">React</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-blue-950/40 to-purple-950/30 backdrop-blur-sm border border-blue-500/30 rounded-xl hover:border-blue-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-blue-300">Next.js</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-purple-950/40 to-pink-950/30 backdrop-blur-sm border border-purple-500/30 rounded-xl hover:border-purple-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-purple-300">TypeScript</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-cyan-950/40 to-teal-950/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-cyan-300">Tailwind CSS</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-blue-950/40 to-cyan-950/30 backdrop-blur-sm border border-blue-500/30 rounded-xl hover:border-blue-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-blue-300">Vue.js</span>
                </div>
              </div>
            </div>

            {/* Fila 2: Backend & Cloud */}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300 mb-4">
                Backend & Cloud
              </h3>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-green-950/40 to-emerald-950/30 backdrop-blur-sm border border-green-500/30 rounded-xl hover:border-green-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-green-300">Node.js</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-red-950/40 to-orange-950/30 backdrop-blur-sm border border-red-500/30 rounded-xl hover:border-red-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-red-300">Laravel</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 backdrop-blur-sm border border-blue-500/30 rounded-xl hover:border-blue-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-blue-300">Python</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-yellow-950/40 to-orange-950/30 backdrop-blur-sm border border-yellow-500/30 rounded-xl hover:border-yellow-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-yellow-300">Firebase</span>
                </div>
                <div className="group px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-orange-950/40 to-red-950/30 backdrop-blur-sm border border-orange-500/30 rounded-xl hover:border-orange-400/50 hover:scale-105 transition-all duration-300">
                  <span className="text-sm sm:text-base font-semibold text-orange-300">AWS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN PROYECTOS (showcase visual) - z-[25] */}
      <div
        ref={projectsRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] pointer-events-none px-4 sm:px-6"
      >
        <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8 md:space-y-12 pointer-events-auto">
          {/* Título Proyectos */}
          <div className="space-y-3 md:space-y-4 pointer-events-none">
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
          
          {/* Proyecto destacado único */}
          <div className="mt-8 md:mt-12 flex justify-center pointer-events-none">
            <div className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 max-w-2xl w-full">
              {/* Imagen placeholder con gradiente */}
              <div className={`aspect-video bg-gradient-to-br ${projects[0].gradient} relative overflow-hidden`}>
                <img 
                  src={projects[0].image} 
                  alt={projects[0].title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl md:text-9xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500">
                    {projects[0].icon}
                  </div>
                </div>
                {/* Badge "Featured" */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-xs font-semibold text-white">✨ Destacado</span>
                </div>
              </div>
              {/* Info del proyecto */}
              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-purple-950/50 to-pink-950/30 backdrop-blur-sm">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300 group-hover:text-purple-200 mb-2 sm:mb-3 transition-colors">
                  {projects[0].title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {projects[0].description}
                </p>
                <div className="flex gap-2 mt-3 sm:mt-4 flex-wrap">
                  {projects[0].tags.map((tag) => (
                    <span key={tag.name} className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-opacity-40 transition-all cursor-pointer">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Botón Explorar Proyectos */}
          <div className="mt-8 md:mt-10">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                enterCarouselMode();
              }}
              size="lg"
              className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group"
            >
              Explorar Todos los Proyectos
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* SECCIÓN TEAM INTRO - Introducción (z-25) */}
      <div
        ref={teamIntroRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[25] px-4"
      >
        <div className="text-center max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 backdrop-blur-md mb-6 animate-pulse">
            <span className="text-blue-400 text-sm font-medium">
              👥 Conoce al Equipo
            </span>
          </div>
          
          {/* Título Principal */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nuestro Equipo
          </h2>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
            Los profesionales detrás de cada proyecto exitoso
          </p>
        </div>
      </div>

      {/* SECCIÓN TEAM - Split Screen con Video (z-26) */}
      <div
        ref={teamRef}
        className="absolute inset-0 z-[26]"
      >
        <TeamMemberSection 
          member={teamMember} 
          embeddedMode={true}
          scrollProgressRef={teamVideoProgressRef}
        />
      </div>

      {/* SECCIÓN COTIZACIÓN - FINAL DEL SCROLL (z-27) */}
      <div
        ref={quoteRef}
        className="absolute inset-0 flex flex-col items-center justify-start md:justify-center z-[27] px-3 sm:px-4 md:px-6 py-4 md:py-0 overflow-y-auto"
      >
        <div className="max-w-4xl w-full py-2 md:py-4">
          {/* Header de la sección */}
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-md mb-1.5 sm:mb-2 md:mb-3">
              <span className="text-green-400 text-[10px] sm:text-xs font-medium">
                ✨ Última Sección
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-1.5 sm:mb-2 md:mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Cotiza tu Proyecto
            </h2>
            
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-2">
              Cuéntanos tu idea y te responderemos en menos de 24 horas
            </p>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-gradient-to-br from-green-950/30 via-emerald-950/20 to-cyan-950/30 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl border border-green-500/30 p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl shadow-green-500/20">
            <form className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Grid de campos principales */}
              <div className="grid md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-[10px] sm:text-xs font-medium text-green-300 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Juan Pérez"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[10px] sm:text-xs font-medium text-green-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label htmlFor="project-type" className="block text-[10px] sm:text-xs font-medium text-green-300 mb-1">
                  Tipo de proyecto *
                </label>
                <select
                  id="project-type"
                  required
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-black/40 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
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
                <label htmlFor="description" className="block text-[10px] sm:text-xs font-medium text-green-300 mb-1">
                  Cuéntanos sobre tu proyecto *
                </label>
                <textarea
                  id="description"
                  required
                  rows={2}
                  placeholder="Describe brevemente tu idea..."
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-black/40 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                />
              </div>

              {/* Presupuesto */}
              <div>
                <label htmlFor="budget" className="block text-[10px] sm:text-xs font-medium text-green-300 mb-1">
                  Presupuesto estimado (opcional)
                </label>
                <select
                  id="budget"
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm bg-black/40 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
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
                className="w-full py-2 sm:py-2.5 md:py-3 lg:py-4 text-xs sm:text-sm md:text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 group"
              >
                Enviar Cotización
                <ArrowRight className="ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Button>
            </form>

            {/* Información de contacto alternativa */}
            <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-green-500/20">
              <p className="text-center text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-3">
                ¿Prefieres contactarnos directamente?
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <a
                  href="mailto:contacto@ekiproyect.com"
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300 text-[10px] sm:text-xs transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" className="flex-shrink-0">
                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path>
                    <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path>
                    <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon>
                    <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path>
                    <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                  </svg>
                  contacto@ekiproyect.com
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-300 text-xs transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" className="flex-shrink-0">
                    <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6 C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path>
                    <path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6 C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3 L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path>
                    <path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3 L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24 c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2 c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path>
                    <path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8 l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path>
                    <path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0 s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3 c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9 c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8 c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Footer integrado (sin ser footer tradicional) */}
          <div className="mt-4 sm:mt-6 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Links rápidos */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 md:gap-4 text-[10px] sm:text-xs">
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
            <div className="flex justify-center gap-2 sm:gap-2.5 md:gap-3">
              <a
                href="https://github.com/ekiproyect"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 50 50">
                  <path fill="currentColor" d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 50 50">
                  <path fill="currentColor" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 transition-all hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 50 50">
                  <path fill="currentColor" d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                </svg>
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

      {/* CARRUSEL MODAL HORIZONTAL - z-[100] (por encima de todo) */}
      {/* Siempre renderizado, pero oculto con display:none hasta que se active */}
      <div
        ref={carouselContainerRef}
        className="fixed inset-0 z-[100] backdrop-blur-3xl flex items-center justify-center"
        style={{ 
          display: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
          {/* Botón Atrás (fixed top-left) */}
          <button
            ref={backButtonRef}
            onClick={exitCarouselMode}
            className="fixed top-8 left-8 z-[101] px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 group shadow-2xl"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-white rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-white font-semibold">Volver</span>
            </div>
          </button>

          {/* Container del carrusel con scroll horizontal */}
          <div
            ref={carouselScrollRef}
            className="w-full h-full overflow-x-auto overflow-y-hidden py-20"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
            }}
          >
            {/* Track horizontal de proyectos */}
            <div className="inline-flex h-full items-center px-12 gap-12">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] xl:w-[35vw] h-auto my-auto"
                >
                  {/* Card del proyecto - Split design: Imagen | Contenido */}
                  <div className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Glassmorphism background */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10" />
                    
                    {/* Gradient glow animado en hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`} />
                    
                    {/* Content wrapper - Grid 2 columnas */}
                    <div className="relative z-10 grid grid-cols-2 h-full">
                      {/* IZQUIERDA: Imagen del proyecto */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay gradient sutil */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                        
                        {/* Badge de número flotante */}
                        <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                          <span className="text-lg font-black text-white">#{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        
                        {/* Icon flotante en la esquina inferior */}
                        <div className="absolute bottom-6 right-6 text-5xl opacity-80 drop-shadow-2xl">
                          {project.icon}
                        </div>
                      </div>

                      {/* DERECHA: Información del proyecto */}
                      <div className="flex flex-col justify-between p-8 space-y-6">
                        {/* Header */}
                        <div className="space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.map((tag) => (
                            <span 
                              key={tag.name} 
                              className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>

                        {/* CTA: Solo flecha circular */}
                        <div className="flex justify-end">
                          <button
                            className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn shadow-xl"
                            aria-label="Ver proyecto completo"
                          >
                            <ArrowRight className="w-6 h-6 text-white group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de scroll (solo visible si no es el último) */}
                  {index < projects.length - 1 && (
                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 animate-pulse opacity-50">
                      <ArrowRight className="w-10 h-10 text-white drop-shadow-2xl" />
                    </div>
                  )}
                </div>
              ))}

              {/* Card final: CTA de contacto */}
              <div className="flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] xl:w-[35vw] h-auto my-auto">
                <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-12 md:p-16 text-center shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  {/* Gradient glow animado */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 blur-3xl opacity-50" />
                  
                  {/* Contenido */}
                  <div className="relative z-10 space-y-8">
                    <div className="text-7xl mb-6 animate-bounce">💡</div>
                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                      ¿Tienes un proyecto
                      <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-2">
                        en mente?
                      </span>
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-md mx-auto">
                      Trabajemos juntos para transformar tu visión en una solución digital innovadora
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={exitCarouselMode}
                        size="lg"
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 hover:border-white/50 text-white font-bold text-lg px-10 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
                      >
                        Solicitar Cotización
                        <ArrowRight className="ml-3 w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores de progreso (dots en la parte inferior) */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[101] flex gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  const scrollContainer = carouselScrollRef.current;
                  if (scrollContainer && lenisRef.current) {
                    const cardWidth = scrollContainer.scrollWidth / (projects.length + 1);
                    lenisRef.current.scrollTo(cardWidth * index, {
                      duration: 1,
                      easing: (t) => 1 - Math.pow(1 - t, 3)
                    });
                  }
                }}
                className="w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/70 transition-all duration-300 hover:scale-125"
                aria-label={`Ir a proyecto ${index + 1}`}
              />
            ))}
            {/* Dot final para el CTA */}
            <button
              onClick={() => {
                const scrollContainer = carouselScrollRef.current;
                if (scrollContainer && lenisRef.current) {
                  lenisRef.current.scrollTo(scrollContainer.scrollWidth, {
                    duration: 1,
                    easing: (t) => 1 - Math.pow(1 - t, 3)
                  });
                }
              }}
              className="w-2.5 h-2.5 rounded-full bg-green-400/50 hover:bg-green-400 transition-all duration-300 hover:scale-125"
              aria-label="Ir a contacto"
            />
          </div>
        </div>
    </div>
  );
};
