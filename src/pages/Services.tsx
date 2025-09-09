import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Smartphone, 
  Cloud, 
  Database, 
  Shield, 
  Zap,
  Users,
  Settings,
  Monitor,
  Cpu
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Desarrollo Web",
      description: "Aplicaciones web modernas, responsivas y escalables usando las últimas tecnologías.",
      features: [
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "E-commerce personalizado",
        "Sistemas de gestión (CMS/CRM)"
      ],
      technologies: ["React", "Vue.js", "Angular", "Next.js"],
      timeline: "8-16 semanas"
    },
    {
      icon: Smartphone,
      title: "Desarrollo Móvil",
      description: "Apps nativas y multiplataforma para iOS y Android con experiencia de usuario excepcional.",
      features: [
        "Apps nativas iOS/Android",
        "Desarrollo React Native",
        "Apps híbridas",
        "Integración con APIs"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      timeline: "10-20 semanas"
    },
    {
      icon: Cloud,
      title: "Soluciones Cloud",
      description: "Migración, arquitectura y optimización de infraestructura en la nube.",
      features: [
        "Migración a la nube",
        "Arquitectura serverless",
        "Auto-scaling",
        "Optimización de costos"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Terraform"],
      timeline: "6-12 semanas"
    },
    {
      icon: Database,
      title: "Backend & APIs",
      description: "Desarrollo de APIs robustas, microservicios y arquitecturas escalables.",
      features: [
        "APIs RESTful",
        "GraphQL",
        "Microservicios",
        "Bases de datos optimizadas"
      ],
      technologies: ["Node.js", "Python", "Java", "PostgreSQL"],
      timeline: "6-14 semanas"
    },
    {
      icon: Shield,
      title: "Seguridad & Compliance",
      description: "Implementación de medidas de seguridad y cumplimiento de normativas.",
      features: [
        "Auditorías de seguridad",
        "Implementación GDPR",
        "Autenticación avanzada",
        "Encriptación de datos"
      ],
      technologies: ["OAuth", "JWT", "SSL/TLS", "OWASP"],
      timeline: "4-8 semanas"
    },
    {
      icon: Zap,
      title: "DevOps & CI/CD",
      description: "Automatización de procesos, despliegues y monitoreo continuo.",
      features: [
        "Pipelines CI/CD",
        "Monitoreo 24/7",
        "Automatización",
        "Gestión de containers"
      ],
      technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab"],
      timeline: "4-10 semanas"
    }
  ];

  const processSteps = [
    {
      icon: Users,
      title: "Consulta Inicial",
      description: "Análisis profundo de tus necesidades y objetivos de negocio."
    },
    {
      icon: Settings,
      title: "Planificación",
      description: "Diseño de arquitectura, tecnologías y cronograma detallado."
    },
    {
      icon: Monitor,
      title: "Desarrollo",
      description: "Implementación ágil con revisiones regulares y feedback continuo."
    },
    {
      icon: Cpu,
      title: "Entrega & Soporte",
      description: "Despliegue, capacitación y soporte técnico especializado."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestros <span className="text-yellow-300">Servicios</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Ofrecemos soluciones completas de desarrollo de software, 
              desde la conceptualización hasta el despliegue y mantenimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Servicios <span className="text-accent">Especializados</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada servicio está diseñado para resolver desafíos específicos 
              con las mejores prácticas de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-tech-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Tecnologías:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-muted px-2 py-1 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Duración típica:</span>
                      <span className="text-sm font-semibold text-accent">{service.timeline}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Solicitar Cotización
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Nuestro <span className="text-accent">Proceso</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un enfoque estructurado que garantiza la entrega exitosa de cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-tech-blue rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Conversemos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                Agendar Consulta Gratuita
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10">
                Ver Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;