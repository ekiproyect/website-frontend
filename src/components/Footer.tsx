import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold">EKI</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Desarrollamos soluciones de software innovadoras que impulsan el crecimiento 
              de tu negocio con tecnología de vanguardia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/about", label: "Nosotros" },
                { href: "/team", label: "Equipo" },
                { href: "/projects", label: "Proyectos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Servicios</h3>
            <ul className="space-y-2">
              {[
                "Desarrollo Web",
                "Aplicaciones Móviles",
                "Consultoría Tech",
                "DevOps & Cloud",
              ].map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/80 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:ekiteam.contacto@gmail.com" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  ekiteam.contacto@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="https://wa.me/56979815301" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  +56 9 7981 5301
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">Antofagasta, Chile</span>
                <span className="text-primary-foreground/80 text-sm">Antofagasta, Chile</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/ekiproject/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} EKI. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
              >
                Privacidad
              </Link>
              <Link
                to="/terms"
                className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;