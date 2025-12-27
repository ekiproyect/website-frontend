import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleClose = useCallback(() => {
    if (isClosing) return; // Prevenir múltiples llamadas
    setIsClosing(true);
  }, [isClosing]);

  const handleAnimationEnd = useCallback((e: React.AnimationEvent<HTMLDivElement>) => {
    // Solo ejecutar si el evento proviene del panel mismo, no de elementos hijos
    if (e.target !== e.currentTarget) return;

    if (isClosing) {
      setIsMenuOpen(false);
      setIsClosing(false);
    }
  }, [isClosing]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto o cerrándose
  useEffect(() => {
    if (isMenuOpen || isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isClosing]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isClosing, handleClose]);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/projects", label: "Proyectos" },
    { href: "/services", label: "Servicios" },
    { href: "/technologies", label: "Tecnologías" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    handleClose();
  };



  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? "top-2 sm:top-4 px-2 sm:px-4"
        : "top-0"
        }`}
    >
      <div
        className={`bg-background/95 backdrop-blur-sm border ${isMenuOpen
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
              <img src="/logos/eki/Logo nuevo.png" alt="Logo" width={32} height={32} className="sm:w-10 sm:h-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-xs xl:text-sm font-medium transition-all hover:text-accent inline-block pb-1 nav-link-underline ${isActive(item.href)
                    ? "text-accent active"
                    : "text-muted-foreground"
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
              className={`lg:hidden h-8 w-8 sm:h-10 sm:w-10 absolute right-2 sm:right-4 transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-50 pointer-events-none" : "opacity-100 scale-100"}`}
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label="Menú de navegación"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </nav>
        </div>
      </div>


      {/* Mobile Navigation Menu */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`lg:hidden fixed inset-0 bg-[#050a14]/60 backdrop-blur-xl z-[60] flex flex-col text-white ${isClosing
            ? 'animate-out slide-out-to-right duration-300'
            : 'animate-in slide-in-from-right duration-300'
            }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="container mx-auto px-4 py-4 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:text-white/80 hover:bg-white/10"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="container mx-auto px-8 sm:px-12 flex flex-col justify-center flex-1 space-y-6 -mt-10">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block py-2 text-3xl sm:text-4xl font-bold transition-all w-full text-left ${active
                    ? "text-[#3b82f6] border-b-2 border-[#3b82f6]"
                    : "text-white hover:text-[#3b82f6]"
                    }`}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="container mx-auto px-8 sm:px-12 pb-12 sm:pb-16">
            <div className="h-px w-full bg-white/20 mb-8" />
            <div className="space-y-5 text-base sm:text-lg text-gray-300">
              <a href="mailto:ekiteam.contacto@gmail.com" className="flex items-center space-x-4 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span>ekiteam.contacto@gmail.com</span>
              </a>
              <a href="tel:+56979815301" className="flex items-center space-x-4 hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
                <span>+56 9 7981 5301</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;