import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Nosotros' },
    { path: '/services', label: 'Servicios' },
    { path: '/projects', label: 'Proyectos' },
    { path: '/technologies', label: 'Tecnologías' },
    { path: '/team', label: 'Equipo' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Animación de apertura
        const tl = gsap.timeline();
        
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
          .to(
            menuRef.current,
            {
              x: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.2'
          )
          .from(
            '.menu-item',
            {
              x: 50,
              opacity: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: 'power2.out',
            },
            '-=0.3'
          );
      } else {
        // Animación de cierre
        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in',
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón Hamburguesa - Siempre visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 w-14 h-14 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
        aria-label="Menú"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Overlay oscuro */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel del menú */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-full sm:w-[500px] bg-gradient-to-br from-slate-900 via-black to-slate-900 z-40 shadow-2xl"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Contenido del menú */}
        <div className="relative h-full flex flex-col p-12">
          {/* Logo/Título */}
          <div className="mb-16">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              EKI PROJECT
            </h2>
            <p className="text-gray-400 mt-2">Innovación Digital</p>
          </div>

          {/* Items del menú */}
          <nav className="flex-1 flex flex-col justify-center gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="menu-item group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-blue-400 font-mono">
                    0{index + 1}
                  </span>
                  <span
                    className={`text-3xl font-bold transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  className={`h-0.5 mt-2 transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'w-full bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-0 bg-white group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Footer del menú */}
          <div className="mt-auto">
            <div className="flex gap-6 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 EKI Project. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
