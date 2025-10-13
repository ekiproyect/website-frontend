import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular carga progresiva
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Animación de salida cuando termina la carga
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      tl.to('.loading-screen', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }).to(
        '.loading-screen',
        {
          y: -100,
          duration: 0.5,
          ease: 'power2.in',
        },
        '-=0.3'
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 animate-pulse">
            EKI
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest">
            PROJECT
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-64 md:w-96 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-gray-500 text-sm tracking-wider">
            CARGANDO... {Math.floor(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Animación de puntos */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Efecto de scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
      </div>
    </div>
  );
};
