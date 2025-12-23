import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Users, Rocket, Server, TrendingUp, CalendarDays } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroImage2 from "@/assets/hero-image2.jpg";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const featuredProjects = [
    {
      title: "SmartPack",
      category: "Logística",
      description: "Sistema de seguimiento de cajas con QR para gestión de equipos asociados y repuestos. Permite obtener métricas de dinero estancado en tiempo real según cada caja, optimizando la gestión de inventario y recursos financieros.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      color: "from-cyan-500/20 to-blue-500/20",
      technologies: ["Next.js", "React Native", "PostgreSQL", "Docker", "NestJS"],
      features: ["Finanzas", "Reportabilidad", "Almacenamiento", "Gestión de bodegas"],
      duration: "6 meses",
      teamSize: "4 desarrolladores"
    },
    {
      title: "HealthTech Dashboard",
      category: "Salud",
      description: "Sistema de gestión hospitalaria con seguimiento de pacientes, historial médico digital y reportes automatizados.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      color: "from-blue-500/20 to-cyan-500/20",
      technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Docker"],
      features: ["Historiales médicos", "Reportes", "Notificaciones", "HIPAA compliant"],
      duration: "8 meses",
      teamSize: "5 desarrolladores"
    },
    {
      title: "EcommercePro",
      category: "E-commerce",
      description: "Plataforma de comercio electrónico completa con integración de pagos, gestión de inventario y panel de administración avanzado.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      color: "from-red-500/20 to-orange-500/20",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      features: ["Pagos seguros", "Panel admin", "App móvil", "Analytics"],
      duration: "6 meses",
      teamSize: "4 desarrolladores"
    },
    {
      title: "FinanceAI",
      category: "Fintech",
      description: "Aplicación de gestión financiera personal con IA para análisis predictivo y recomendaciones de inversión.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      color: "from-green-500/20 to-emerald-500/20",
      technologies: ["React Native", "Python", "TensorFlow", "MongoDB", "AWS"],
      features: ["IA predictiva", "Multi-plataforma", "Análisis avanzado", "Seguridad bancaria"],
      duration: "10 meses",
      teamSize: "6 desarrolladores"
    },
    {
      title: "EduPlatform",
      category: "Educación",
      description: "Plataforma de aprendizaje online con videoconferencias, evaluaciones automáticas y seguimiento de progreso.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      color: "from-purple-500/20 to-pink-500/20",
      technologies: ["Next.js", "Node.js", "WebRTC", "Redis", "MySQL"],
      features: ["Video en vivo", "Evaluaciones", "Progreso", "Certificados"],
      duration: "7 meses",
      teamSize: "4 desarrolladores"
    }
  ];

  const projects = [
    {
      title: "EcommercePro",
      category: "E-commerce",
      description: "Plataforma de comercio electrónico completa con integración de pagos, gestión de inventario y panel de administración avanzado.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      features: ["Pagos seguros", "Panel admin", "App móvil", "Analytics"],
      duration: "6 meses",
      teamSize: "4 desarrolladores",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "HealthTech Dashboard",
      category: "Salud",
      description: "Sistema de gestión hospitalaria con seguimiento de pacientes, historial médico digital y reportes automatizados.",
      technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "Docker"],
      features: ["Historiales médicos", "Reportes", "Notificaciones", "HIPAA compliant"],
      duration: "8 meses",
      teamSize: "5 desarrolladores",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "FinanceAI",
      category: "Fintech",
      description: "Aplicación de gestión financiera personal con IA para análisis predictivo y recomendaciones de inversión.",
      technologies: ["React Native", "Python", "TensorFlow", "MongoDB", "AWS"],
      features: ["IA predictiva", "Multi-plataforma", "Análisis avanzado", "Seguridad bancaria"],
      duration: "10 meses",
      teamSize: "6 desarrolladores",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "EduPlatform",
      category: "Educación",
      description: "Plataforma de aprendizaje online con videoconferencias, evaluaciones automáticas y seguimiento de progreso.",
      technologies: ["Next.js", "Node.js", "WebRTC", "Redis", "MySQL"],
      features: ["Video en vivo", "Evaluaciones", "Progreso", "Certificados"],
      duration: "7 meses",
      teamSize: "4 desarrolladores",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "LogiTrack",
      category: "Logística",
      description: "Sistema de gestión logística con tracking en tiempo real, optimización de rutas y gestión de flotas.",
      technologies: ["Angular", "Java", "Spring Boot", "MySQL", "Google Maps API"],
      features: ["Tracking GPS", "Optimización rutas", "Gestión flotas", "Reportes"],
      duration: "9 meses",
      teamSize: "5 desarrolladores",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "SocialConnect",
      category: "Redes Sociales",
      description: "Red social empresarial con chat en tiempo real, compartir documentos y herramientas de colaboración.",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Redis"],
      features: ["Chat tiempo real", "Colaboración", "Documentos", "Notificaciones"],
      duration: "5 meses",
      teamSize: "3 desarrolladores",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      link: "#",
      github: "#"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      
      // Calculate scroll progress for the section
      const progress = Math.min(
        Math.max((scrollY - sectionTop + window.innerHeight / 2) / sectionHeight, 0),
        1
      );
      setScrollProgress(progress * 100);

      // Determine active project based on scroll
      const projectIndex = Math.floor(progress * featuredProjects.length);
      setActiveProject(Math.min(projectIndex, featuredProjects.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [featuredProjects.length]);

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage2})` }}
        />
        {/* Lado Azul Oscuro con opacidad */}
        <div className="absolute inset-0 bg-blue-600/80" />
        {/* Lado Celeste con clip-path diagonal y opacidad */}
        <div 
          className="absolute inset-0 bg-cyan-400/40" 
          style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 60% 100%)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestros <span className="underline decoration-4 underline-offset-8">Proyectos</span>
            </h1>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Cómo trabajamos cuando <span className="text-cyan-400">escalamos contigo</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-400/20 p-3 rounded-lg">
                    <Rocket className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Discovery continuo + delivery paralelo para ganar tiempo al mercado.
                  </h3>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-400/20 p-3 rounded-lg">
                    <Server className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Arquitecturas escalables, listas para observabilidad y compliance.
                  </h3>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-400/20 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Growth loops instrumentados con dashboards compartidos.
                  </h3>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-400/20 p-3 rounded-lg">
                    <CalendarDays className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Rituales claros: kickoff ejecutivo, planning, demos y retro con señales de negocio.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Scroll Section */}
      <section ref={sectionRef} className="relative bg-background">
        {/* Scroll Indicator */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const section = sectionRef.current;
                if (section) {
                  const scrollTo = section.offsetTop + (section.offsetHeight / featuredProjects.length) * index;
                  window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeProject === index 
                  ? 'bg-accent scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Project Cards */}
        {featuredProjects.map((project, index) => (
          <div 
            key={index} 
            className="min-h-[70vh] flex items-center justify-center py-12"
          >
            <div className="container mx-auto px-4">
              <Card className="max-w-5xl mx-auto overflow-hidden bg-white/60 backdrop-blur-xl border-2 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Side */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        <span>{project.teamSize}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Características principales:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="bg-muted px-3 py-1.5 rounded-md text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Tecnologías:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/30 px-3 py-1.5 rounded-md text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button variant="default" size="lg" className="w-full">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Ver Demo
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Tienes un proyecto en <span className="text-accent">mente</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Cada proyecto es una oportunidad para crear algo extraordinario. 
              Trabajemos juntos para convertir tu visión en realidad.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Iniciemos tu Proyecto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;