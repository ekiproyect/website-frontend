import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Smartphone, Cloud, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { HeroRotator } from '../components/HeroRotator';
import { Meteors } from "@/components/ui/meteors";

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
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transforma tu negocio <br /> con soluciones digitales: 
            <HeroRotator className="text-blue-300 mt-3"/>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Somos una consultora especializada en desarrollo de software que ayuda a empresas 
            a acelerar su crecimiento a través de tecnología innovadora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Link to="/projects" className="flex items-center gap-2">
                Ver Proyectos <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button  size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent border-2 ">
              <Link to="/team">Conocer Equipo</Link>
            </Button>
          </div>
        </div>

        {/* Meteors Effect */}
        <Meteors number={30} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-accent">Servicios</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas de desarrollo de software adaptadas 
              a las necesidades específicas de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-tech-blue rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Conversemos sobre cómo podemos ayudarte a llevar tu idea al siguiente nivel
            con nuestras soluciones de desarrollo de software.
          </p>
          <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
            Solicitar Consulta Gratuita
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;