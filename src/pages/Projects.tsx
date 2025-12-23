import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";
import { useState } from "react";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);

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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-300">Proyectos</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Descubre algunos de los proyectos que hemos desarrollado para 
              empresas de diferentes industrias, cada uno con soluciones únicas y resultados medibles.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel Section */}
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${featuredProjects[selectedProject].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${featuredProjects[selectedProject].color}`} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Side - Project Selector */}
            <div className="lg:col-span-2 space-y-2">
              {featuredProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProject(index)}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                    selectedProject === index
                      ? 'bg-white text-black font-bold scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{project.title}</span>
                </button>
              ))}
            </div>

            {/* Right Side - Content and Image */}
            <div className="lg:col-span-3 space-y-6">
              {/* Image */}
              <div 
                key={`image-${selectedProject}`}
                className="relative rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <img
                  src={featuredProjects[selectedProject].image}
                  alt={featuredProjects[selectedProject].title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {featuredProjects[selectedProject].category}
                  </span>
                </div>
              </div>

              {/* Content - Fixed Height */}
              <div 
                key={`content-${selectedProject}`}
                className="space-y-4 min-h-[500px] animate-in fade-in slide-in-from-right-8 duration-700"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {featuredProjects[selectedProject].title}
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {featuredProjects[selectedProject].description}
                </p>

                {/* Project Details */}
                <div className="flex items-center gap-6 text-sm text-gray-300 pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>{featuredProjects[selectedProject].duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span>{featuredProjects[selectedProject].teamSize}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Características principales:</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProjects[selectedProject].features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-sm border border-white/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Tecnologías:</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProjects[selectedProject].technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-accent/30 to-accent/10 text-white border border-accent/40 px-3 py-1.5 rounded-md text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button variant="default" size="lg" className="bg-white text-black hover:bg-gray-200">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Ver Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Portfolio de <span className="text-accent">Soluciones</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada proyecto representa un desafío único resuelto con innovación, 
              tecnología de vanguardia y un enfoque centrado en resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.teamSize}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Características principales:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-muted px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Tecnologías:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gradient-to-r from-accent/10 to-tech-blue/10 text-accent border border-accent/20 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="default" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Demo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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