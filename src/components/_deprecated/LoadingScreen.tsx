import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  minimumDuration?: number; // en ms, default 800
  maximumDuration?: number; // en ms, default 3000
}

/**
 * LoadingScreen - Splash screen inicial con animación mejorada
 * 
 * Features:
 * - Progress bar realista con easing
 * - Duración mínima/máxima configurable
 * - Fade out suave en múltiples capas
 * - Accesible (aria-progressbar)
 */
export const LoadingScreen = ({ 
  onLoadComplete,
  minimumDuration = 800,
  maximumDuration = 3000 
}: LoadingScreenProps = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    let hasCompleted = false;

    // Progress realista con easing
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / minimumDuration, 1);
      
      // Easing cubic-out: rápido al inicio, lento al final
      const easedProgress = 1 - Math.pow(1 - ratio, 3);
      const currentProgress = Math.min(easedProgress * 100, 95); // Max 95% hasta completar
      
      setProgress(currentProgress);

      if (elapsed < minimumDuration) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else if (!hasCompleted) {
        hasCompleted = true;
        setProgress(100);
        
        // Esperar 200ms en 100% y luego fade out
        setTimeout(() => {
          fadeOut();
        }, 200);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    // Safety: forzar completado después del máximo
    const maxTimeout = setTimeout(() => {
      if (!hasCompleted) {
        hasCompleted = true;
        setProgress(100);
        setTimeout(() => fadeOut(), 200);
      }
    }, maximumDuration);

    // Fade out en capas con GSAP
    const fadeOut = () => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onLoadComplete?.();
        }
      });

      timeline
        .to('.loading-logo', {
          scale: 0.9,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, 0)
        .to('.loading-progress', {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in',
        }, 0.1)
        .to('.loading-screen', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 0.2);
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(maxTimeout);
    };
  }, [minimumDuration, maximumDuration, onLoadComplete]);

  // Animación de entrada del logo
  useEffect(() => {
    gsap.fromTo('.loading-logo',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    // Pulso suave continuo
    gsap.to('.loading-logo', {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="loading-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Cargando sitio"
    >
      {/* Fondo sutil con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950" />

      {/* Spinner circular minimalista */}
      <div className="loading-logo relative z-10 mb-16">
        {/* Círculo animado con gradiente */}
        <div className="relative w-24 h-24">
          {/* Círculo base */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Track (fondo) */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="3"
            />
            {/* Progress arc con gradiente */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
            {/* Definición del gradiente */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Porcentaje en el centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent tabular-nums">
              {Math.round(progress)}
            </span>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-2xl -z-10 animate-pulse" />
        </div>
      </div>

      {/* Barra horizontal minimalista (backup visual) */}
      <div className="loading-progress relative z-10 w-full max-w-xs px-8">
        <div className="h-0.5 bg-gray-800/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Texto minimalista */}
      <p className="relative z-10 mt-8 text-gray-600 text-xs uppercase tracking-widest font-medium">
        Cargando
      </p>

      {/* Puntos animados */}
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};
