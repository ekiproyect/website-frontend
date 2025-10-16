import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMemberProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio: string;
    skills: string[];
    social: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
    frames: {
      path: string;
      start: number;
      end: number;
      total: number;
    };
  };
  embeddedMode?: boolean; // Si es true, no usa ScrollTrigger propio (está dentro de ZoomHero)
  scrollProgressRef?: React.RefObject<{ value: number }>; // Progreso del scroll desde ZoomHero (0-1)
}

export const TeamMemberSection = ({ member, embeddedMode = false, scrollProgressRef }: TeamMemberProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const totalFrames = member.frames.end - member.frames.start + 1;

    for (let i = member.frames.start; i <= member.frames.end; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(4, '0');
      img.src = `${member.frames.path}/member1_${frameNumber}.webp`;
      
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame: ${img.src}`);
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [member.frames]);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = imagesRef.current[Math.floor(index)];
    if (!img || !img.complete) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions to cover canvas while maintaining aspect ratio
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      // Image is wider
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // En modo embedded: observar scrollProgressRef y actualizar frames + textos en tiempo real
  useEffect(() => {
    if (!embeddedMode || !scrollProgressRef || !imagesLoaded) return;

    const totalFrames = imagesRef.current.length;
    
    // Crear un ticker que observe el progreso y actualice frames Y textos
    const updateFrame = () => {
      if (scrollProgressRef.current) {
        const progress = scrollProgressRef.current.value;
        const targetFrame = Math.floor(progress * (totalFrames - 1));
        
        // Actualizar frame
        if (frameIndexRef.current.value !== targetFrame) {
          frameIndexRef.current.value = targetFrame;
          drawFrame(targetFrame);
        }

        // Actualizar textos sincronizados con el progreso
        if (nameRef.current && roleRef.current && bioRef.current && skillsRef.current && socialRef.current) {
          // Name: 0-20% del progreso
          if (progress >= 0 && progress <= 0.2) {
            const localProgress = progress / 0.2;
            gsap.set(nameRef.current, {
              opacity: localProgress,
              x: 100 * (1 - localProgress),
              scale: 0.95 + (0.05 * localProgress),
            });
          } else if (progress > 0.2) {
            gsap.set(nameRef.current, { opacity: 1, x: 0, scale: 1 });
          } else {
            gsap.set(nameRef.current, { opacity: 0, x: 100, scale: 0.95 });
          }

          // Role: 15-35% del progreso
          if (progress >= 0.15 && progress <= 0.35) {
            const localProgress = (progress - 0.15) / 0.2;
            gsap.set(roleRef.current, {
              opacity: localProgress,
              x: 80 * (1 - localProgress),
              scale: 0.97 + (0.03 * localProgress),
            });
          } else if (progress > 0.35) {
            gsap.set(roleRef.current, { opacity: 1, x: 0, scale: 1 });
          } else {
            gsap.set(roleRef.current, { opacity: 0, x: 80, scale: 0.97 });
          }

          // Bio: 30-50% del progreso
          if (progress >= 0.30 && progress <= 0.50) {
            const localProgress = (progress - 0.30) / 0.2;
            gsap.set(bioRef.current, {
              opacity: localProgress,
              x: 60 * (1 - localProgress),
            });
          } else if (progress > 0.50) {
            gsap.set(bioRef.current, { opacity: 1, x: 0 });
          } else {
            gsap.set(bioRef.current, { opacity: 0, x: 60 });
          }

          // Skills: 50-70% del progreso
          if (progress >= 0.50 && progress <= 0.70) {
            const localProgress = (progress - 0.50) / 0.2;
            gsap.set(skillsRef.current, {
              opacity: localProgress,
              x: 40 * (1 - localProgress),
            });
          } else if (progress > 0.70) {
            gsap.set(skillsRef.current, { opacity: 1, x: 0 });
          } else {
            gsap.set(skillsRef.current, { opacity: 0, x: 40 });
          }

          // Social: 70-90% del progreso
          if (progress >= 0.70 && progress <= 0.90) {
            const localProgress = (progress - 0.70) / 0.2;
            gsap.set(socialRef.current, {
              opacity: localProgress,
              x: 30 * (1 - localProgress),
              scale: 0.8 + (0.2 * localProgress),
            });
          } else if (progress > 0.90) {
            gsap.set(socialRef.current, { opacity: 1, x: 0, scale: 1 });
          } else {
            gsap.set(socialRef.current, { opacity: 0, x: 30, scale: 0.8 });
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateFrame);
    };

    let animationFrameId = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [embeddedMode, scrollProgressRef, imagesLoaded]);

  // Setup GSAP ScrollTrigger animation
  useEffect(() => {
    if (!imagesLoaded || !sectionRef.current) return;

    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas size based on screen size
      // Mobile (< 768px): Full width, half height
      // Desktop (>= 768px): Half width, full height
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 2;
      } else {
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight;
      }
      
      // Draw first frame
      drawFrame(0);
    }

    const ctx = gsap.context(() => {
      const totalFrames = imagesRef.current.length;

      if (embeddedMode && scrollProgressRef) {
        // ============================================
        // MODO EMBEDDED: Nada que hacer aquí
        // Todo se maneja en el requestAnimationFrame loop arriba
        // ============================================
        return;
        
      } else if (embeddedMode) {
        // Fallback si no hay scrollProgressRef: animaciones simples
        const textTl = gsap.timeline({ delay: 0.2 });
        
        textTl.fromTo(
          nameRef.current,
          { opacity: 0, x: 100, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          0
        );

        textTl.fromTo(
          roleRef.current,
          { opacity: 0, x: 80, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          0.15
        );

        textTl.fromTo(
          bioRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          0.35
        );

        textTl.fromTo(
          skillsRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          0.55
        );

        textTl.fromTo(
          socialRef.current,
          { opacity: 0, x: 30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(2)' },
          0.75
        );
        
      } else {
        // ============================================
        // MODO STANDALONE: ScrollTrigger con pin y scrub
        // ============================================
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%', // 4 screen heights of scroll
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Scrub through frames
        tl.to(frameIndexRef.current, {
          value: totalFrames - 1,
          ease: 'none',
          onUpdate: () => {
            drawFrame(frameIndexRef.current.value);
          },
        }, 0);

        // Animate name (enters from right, appears early, 10-25% of scroll)
        tl.fromTo(
          nameRef.current,
          { opacity: 0, x: 100, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power3.out' },
          0.1
        ).to(
          nameRef.current,
          { opacity: 1, duration: 0.1 },
          0.25
        );

        // Animate role (enters from right with delay, 12-27%)
        tl.fromTo(
          roleRef.current,
          { opacity: 0, x: 80, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'power3.out' },
          0.12
        ).to(
          roleRef.current,
          { opacity: 1, duration: 0.1 },
          0.27
        );

        // Animate bio (slides in from right midway, 35-55%)
        tl.fromTo(
          bioRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' },
          0.35
        ).to(
          bioRef.current,
          { opacity: 1, duration: 0.2 },
          0.55
        );

        // Animate skills (stagger from right, 60-75%)
        tl.fromTo(
          skillsRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.15, ease: 'power2.out' },
          0.6
        ).to(
          skillsRef.current,
          { opacity: 1, duration: 0.15 },
          0.75
        );

        // Animate social icons (pop in from right, 75-90%)
        tl.fromTo(
          socialRef.current,
          { opacity: 0, x: 30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.15, ease: 'back.out(2)' },
          0.75
        ).to(
          socialRef.current,
          { opacity: 1, duration: 0.15 },
          0.9
        );
      }

    }, sectionRef);

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        // Update canvas size based on screen size
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight / 2;
        } else {
          canvas.width = window.innerWidth / 2;
          canvas.height = window.innerHeight;
        }
        
        drawFrame(frameIndexRef.current.value);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, embeddedMode, scrollProgressRef]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Split layout container - Vertical on mobile, Horizontal on desktop */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* TOP (mobile) / LEFT (desktop) - Canvas for video frames */}
        <div className="w-full h-1/2 md:w-1/2 md:h-full relative bg-black">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* BOTTOM (mobile) / RIGHT (desktop) - Text content with gradient background */}
        <div className="w-full h-1/2 md:w-1/2 md:h-full relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
          {/* Animated background decorations */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
          </div>

          {/* Content container */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 py-4 md:py-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
            {/* Name */}
            <div ref={nameRef} className="opacity-0 mb-2 md:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                {member.name}
              </h1>
            </div>

            {/* Role */}
            <div ref={roleRef} className="opacity-0 mb-3 md:mb-8">
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {member.role}
              </p>
            </div>

            {/* Bio */}
            <div ref={bioRef} className="opacity-0 mb-3 md:mb-10">
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
                {member.bio}
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef} className="opacity-0 mb-3 md:mb-12">
              <div className="flex flex-wrap gap-1.5 md:gap-3 max-w-2xl">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-[10px] sm:text-xs md:text-base hover:bg-white/20 hover:scale-105 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div ref={socialRef} className="opacity-0">
              <div className="flex gap-2 md:gap-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all hover:scale-110 group"
                  >
                    <Linkedin className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-purple-500 hover:border-purple-500 transition-all hover:scale-110 group"
                  >
                    <Github className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-all hover:scale-110 group"
                  >
                    <Twitter className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 inset-x-0 h-16 md:h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Loading overlay - Full screen */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - loadingProgress / 100)}`}
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{loadingProgress}%</span>
              </div>
            </div>
            <p className="text-gray-400 text-lg">Cargando experiencia...</p>
          </div>
        </div>
      )}
    </div>
  );
};
