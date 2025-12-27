import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    if (isClosing) return; // Prevenir múltiples llamadas
    setIsClosing(true);
    
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      timeoutRef.current = null;
    }, 500); // Duración de la animación de salida
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Enfocar el botón de cerrar
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isClosing]);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/team", label: "Equipo" },
    { href: "/projects", label: "Proyectos" },
    { href: "/services", label: "Servicios" },
    { href: "/technologies", label: "Tecnologías" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    handleClose();
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "top-2 sm:top-4 px-2 sm:px-4" 
          : "top-0"
      }`}
    >
      <div 
        className={`bg-background/95 backdrop-blur-sm border ${
          isMenuOpen
            ? "rounded-lg shadow-lg"
            : isScrolled 
            ? "rounded-full shadow-lg transition-all duration-300" 
            : "border-b rounded-none transition-all duration-300"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <nav className="flex items-center justify-between lg:justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0 lg:flex-none flex-1 lg:flex-initial justify-center lg:justify-start">
            <img src="logos/eki/Logo nuevo.png" alt="Logo" width={32} height={32} className="sm:w-10 sm:h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xs xl:text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href) ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="sm" className="text-xs xl:text-sm px-3 xl:px-4">
              Contáctanos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8 sm:h-10 sm:w-10 absolute right-2 sm:right-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Menú de navegación"
          >
            {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </nav>
      </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {(isMenuOpen || isClosing) && (
        <div 
          className={`fixed inset-0 z-[999] lg:hidden ${
            isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          {/* Zona izquierda: Imagen de fondo con overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
            onClick={handleBackdropClick}
          >
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-xl" />
          </div>

          {/* Panel derecho */}
          <div 
            className={`absolute top-0 right-0 bottom-0 w-full sm:w-80 bg-primary/60 backdrop-blur-lg shadow-2xl ${
              isClosing 
                ? 'animate-out slide-out-to-right duration-500 ease-in' 
                : 'animate-in slide-in-from-right duration-500 ease-out'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <div className="absolute top-4 right-4">
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Contenido del panel */}
            <div className="flex flex-col h-full pt-20 pb-8 px-8">
              {/* Links de navegación */}
              <nav className="flex-1 space-y-6">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <div key={item.href} className="relative">
                      <Link
                        to={item.href}
                        className={`block text-3xl sm:text-4xl font-medium transition-all duration-300 hover:text-accent hover:translate-x-2 ${
                          active ? "text-accent" : "text-primary-foreground"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                      {/* Línea indicadora */}
                      {active && (
                        <div 
                          key={`line-${item.href}`}
                          className="h-0.5 bg-accent mt-2 animate-in slide-in-from-left duration-300" 
                        />
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Información de contacto */}
              <div className="space-y-4 pt-8 border-t border-primary-foreground/20">
                <a 
                  href="mailto:ekiteam.contacto@gmail.com" 
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-all duration-300 hover:translate-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">ekiteam.contacto@gmail.com</span>
                </a>
                <a 
                  href="https://wa.me/56979815301" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-all duration-300 hover:translate-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+56 9 7981 5301</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;