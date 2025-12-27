import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Smartphone, Cloud, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroRotator } from '../components/HeroRotator';
import { Meteors } from "@/components/ui/meteors";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: Code,
      title: "Desarrollo Web",
      description: "Aplicaciones web modernas y escalables con las últimas tecnologías",
    },
    {
      icon: Smartphone,
      title: "Apps Móviles",
      description: "Soluciones móviles nativas y multiplataforma para iOS y Android",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Infraestructura en la nube y pipelines de CI/CD optimizados",
    },
    {
      icon: Users,
      title: "Consultoría",
      description: "Asesoramiento técnico y estratégico para tu transformación digital",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/75" />
        </div>

        <div className="relative z-10 container mx-auto px-3 sm:px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Transforma tu negocio <br className="hidden sm:block" /> con soluciones digitales: 
            <HeroRotator className="text-blue-300 mt-2 sm:mt-3"/>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Somos una consultora especializada en desarrollo de software que ayuda a empresas 
            a acelerar su crecimiento a través de tecnología innovadora.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Button variant="hero" size="lg" className="text-base sm:text-lg px-4 py-4 sm:px-8 sm:py-6 w-full sm:w-auto">
              <Link to="/projects" className="flex items-center gap-2 justify-center">
                Ver Proyectos <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <Button  size="lg" className="text-base sm:text-lg px-4 py-4 sm:px-8 sm:py-6 border-white/30 text-white hover:bg-white/10 bg-transparent border-2 w-full sm:w-auto">
              <Link to="/team">Conocer Equipo</Link>
            </Button>
          </div>
        </div>

        {/* Meteors Effect */}
        <Meteors number={30} />
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
              Nuestros <span className="text-accent">Servicios</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Ofrecemos soluciones completas de desarrollo de software adaptadas 
              a las necesidades específicas de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent to-tech-blue rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-2">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-4 sm:px-0">
            Conversemos sobre cómo podemos ayudarte a llevar tu idea al siguiente nivel
            con nuestras soluciones de desarrollo de software.
          </p>
          <Button variant="secondary" size="lg" className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 w-full max-w-xs sm:max-w-none sm:w-auto mx-auto">
            Solicitar Consulta Gratuita
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;