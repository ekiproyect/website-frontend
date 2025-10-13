import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Cloud, Users, Zap, Shield, Rocket, TrendingUp, Target, Award, Clock, HeartHandshake } from 'lucide-react';
import { ZoomHero } from '../components/ZoomHero';
import { InfiniteScrollSection } from '../components/InfiniteScrollSection';
import { HorizontalScrollSection } from '../components/HorizontalScrollSection';
import { LoadingScreen } from '../components/LoadingScreen';
import { useEffect } from 'react';

const Home = () => {
  // Resetear scroll al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas y escalables con las últimas tecnologías',
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Soluciones móviles nativas y multiplataforma para iOS y Android',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Infraestructura en la nube y pipelines de CI/CD optimizados',
    },
    {
      icon: Users,
      title: 'Consultoría',
      description: 'Asesoramiento técnico y estratégico para tu transformación digital',
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Velocidad',
      description: 'Entregamos proyectos 3x más rápido que el promedio del mercado',
    },
    {
      icon: Shield,
      title: 'Seguridad',
      description: 'Código auditado y protocolos de seguridad de nivel empresarial',
    },
    {
      icon: Rocket,
      title: 'Escalabilidad',
      description: 'Arquitecturas diseñadas para crecer con tu negocio',
    },
    {
      icon: TrendingUp,
      title: 'Resultados',
      description: 'ROI comprobado y métricas de éxito en cada proyecto',
    },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Plataforma de comercio electrónico con IA y análisis predictivo',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    },
    {
      title: 'FinTech App',
      description: 'Aplicación móvil para gestión financiera personal con blockchain',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    },
    {
      title: 'Healthcare System',
      description: 'Sistema de gestión hospitalaria con telemedicina integrada',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    },
    {
      title: 'Smart City IoT',
      description: 'Plataforma IoT para ciudades inteligentes y sostenibles',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    },
  ];

  const stats = [
    { value: '150+', label: 'Proyectos Completados' },
    { value: '98%', label: 'Satisfacción Cliente' },
    { value: '50+', label: 'Empresas Confían' },
    { value: '24/7', label: 'Soporte Técnico' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Comprometidos con la máxima calidad en cada línea de código',
    },
    {
      icon: Award,
      title: 'Innovación',
      description: 'Siempre a la vanguardia de las últimas tecnologías',
    },
    {
      icon: Clock,
      title: 'Puntualidad',
      description: 'Entregamos en tiempo y forma, sin excepciones',
    },
    {
      icon: HeartHandshake,
      title: 'Compromiso',
      description: 'Tu éxito es nuestro éxito, trabajamos como un equipo',
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Efecto de fondo continuo con partículas - MÁS VISIBLE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradiente de fondo continuo */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/10 to-purple-950/10" />
        
        {/* Partículas más visibles que se mueven */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Grid pattern más visible */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10">
        <LoadingScreen />
        
        {/* Hero Section - Zoom Effect */}
        <ZoomHero />

        {/* Misión - Primera sección después del hero */}
        <InfiniteScrollSection className="py-40 relative">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Construimos el{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                futuro digital
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Somos un equipo de desarrolladores, diseñadores y estrategas digitales
              apasionados por crear productos que transforman negocios.
            </p>
          </div>
        </InfiniteScrollSection>

        {/* Estadísticas impactantes */}
        <InfiniteScrollSection className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-600 mb-4">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScrollSection>

        {/* Qué hacemos */}
        <InfiniteScrollSection className="py-32 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Qué{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  hacemos
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Soluciones tecnológicas completas para impulsar tu negocio
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 bg-black border-gray-800 hover:border-purple-500/50"
                >
                  <CardContent className="p-10">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <feature.icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </InfiniteScrollSection>

        {/* Nuestros Valores */}
        <InfiniteScrollSection className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Nuestros{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Valores
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Los principios que guían cada uno de nuestros proyectos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group text-center p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:bg-blue-500/5"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <value.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScrollSection>

        {/* Por qué elegirnos */}
        <InfiniteScrollSection className="py-32 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                ¿Por qué{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  EKI?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group p-10 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <benefit.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white">{benefit.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScrollSection>      {/* Proyectos - Scroll Horizontal */}
      <InfiniteScrollSection className="relative">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Proyectos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Destacados
            </span>
          </h2>
        </div>
        <HorizontalScrollSection items={projects} />
      </InfiniteScrollSection>

      {/* CTA Final */}
      <InfiniteScrollSection className="py-32 relative">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          {/* Efecto de glow detrás del CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-3xl">
            <div className="w-full h-full max-w-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          </div>

          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              ¿Listo para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                innovar
              </span>
              ?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Conversemos sobre cómo podemos transformar tu visión en realidad
              con tecnología de vanguardia.
            </p>
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 bg-white text-black hover:bg-gray-100 font-bold rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110"
            >
              Solicitar Consulta Gratuita
            </Button>
          </div>
        </div>
      </InfiniteScrollSection>

      {/* Espaciador final */}
      <div className="h-32" />
      </div>
    </div>
  );
};

export default Home;
