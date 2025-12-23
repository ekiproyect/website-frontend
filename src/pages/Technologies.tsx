import { Card, CardContent } from "@/components/ui/card";
import heroImage2 from "@/assets/hero-image2.jpg";

const Technologies = () => {
  const techCategories = [
    {
      category: "Frontend",
      icon: "💻",
      technologies: [
        { name: "React", description: "Biblioteca para interfaces de usuario", logo: "⚛️" },
        { name: "Vue.js", description: "Framework progresivo", logo: "🟢" },
        { name: "Angular", description: "Plataforma de desarrollo web", logo: "🅰️" },
        { name: "Next.js", description: "Framework de React", logo: "⬛" },
        { name: "TypeScript", description: "JavaScript con tipos", logo: "🔷" },
        { name: "Tailwind CSS", description: "Framework CSS utility-first", logo: "💨" }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      technologies: [
        { name: "Node.js", description: "Runtime de JavaScript", logo: "🟢" },
        { name: "Python", description: "Lenguaje de programación", logo: "🐍" },
        { name: "Django", description: "Framework web de Python", logo: "🎸" },
        { name: "Express.js", description: "Framework web para Node.js", logo: "🚂" },
        { name: "FastAPI", description: "Framework web moderno para Python", logo: "⚡" },
        { name: "Spring Boot", description: "Framework de Java", logo: "🍃" }
      ]
    },
    {
      category: "Bases de Datos",
      icon: "🗄️",
      technologies: [
        { name: "PostgreSQL", description: "Base de datos relacional", logo: "🐘" },
        { name: "MongoDB", description: "Base de datos NoSQL", logo: "🍃" },
        { name: "Redis", description: "Base de datos en memoria", logo: "🔴" },
        { name: "MySQL", description: "Sistema de gestión de bases de datos", logo: "🐬" },
        { name: "Elasticsearch", description: "Motor de búsqueda y análisis", logo: "🔍" },
        { name: "Firebase", description: "Plataforma de desarrollo de apps", logo: "🔥" }
      ]
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      technologies: [
        { name: "AWS", description: "Amazon Web Services", logo: "🧡" },
        { name: "Azure", description: "Microsoft Azure", logo: "🔵" },
        { name: "Google Cloud", description: "Google Cloud Platform", logo: "🌈" },
        { name: "Docker", description: "Containerización", logo: "🐋" },
        { name: "Kubernetes", description: "Orquestación de contenedores", logo: "⚓" },
        { name: "Terraform", description: "Infrastructure as Code", logo: "🏗️" }
      ]
    },
    {
      category: "Móvil",
      icon: "📱",
      technologies: [
        { name: "React Native", description: "Framework multiplataforma", logo: "⚛️" },
        { name: "Flutter", description: "SDK de Google para móviles", logo: "🦋" },
        { name: "Swift", description: "Lenguaje para iOS", logo: "🍎" },
        { name: "Kotlin", description: "Lenguaje para Android", logo: "🤖" },
        { name: "Expo", description: "Plataforma para React Native", logo: "⚡" },
        { name: "Xamarin", description: "Plataforma de Microsoft", logo: "🔷" }
      ]
    },
    {
      category: "Herramientas",
      icon: "🛠️",
      technologies: [
        { name: "Git", description: "Control de versiones", logo: "📊" },
        { name: "GitHub", description: "Plataforma de desarrollo", logo: "🐙" },
        { name: "GitLab", description: "DevOps platform", logo: "🦊" },
        { name: "Jenkins", description: "Servidor de automatización", logo: "👨‍💼" },
        { name: "Jira", description: "Gestión de proyectos", logo: "📋" },
        { name: "Figma", description: "Herramienta de diseño", logo: "🎨" }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
              Nuestras <span className="underline decoration-4 underline-offset-8">Tecnologías</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Utilizamos las tecnologías más avanzadas y probadas de la industria 
              para crear soluciones robustas, escalables y de alto rendimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Stack <span className="text-accent">Tecnológico</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nuestro equipo domina las tecnologías más demandadas del mercado, 
              organizadas por categorías para una mejor comprensión.
            </p>
          </div>

          <div className="space-y-16">
            {techCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-12">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {category.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {category.technologies.map((tech, techIndex) => (
                    <Card 
                      key={techIndex} 
                      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent/30"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                          {tech.logo}
                        </div>
                        <h4 className="text-xl font-bold mb-2">{tech.name}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tech.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Nuestra <span className="text-accent">Experiencia</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Años de experiencia trabajando con estas tecnologías nos respaldan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "25+", label: "Tecnologías Dominadas", icon: "⚡" },
                { number: "50+", label: "Proyectos Completados", icon: "🚀" },
                { number: "5", label: "Años de Experiencia Promedio", icon: "⭐" },
                { number: "100%", label: "Proyectos Entregados a Tiempo", icon: "✅" },
              ].map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Metodología de <span className="text-accent">Trabajo</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Seleccionamos las tecnologías más adecuadas para cada proyecto 
              basándonos en estos criterios:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Escalabilidad",
                  description: "Tecnologías que crecen con tu negocio",
                  icon: "📈"
                },
                {
                  title: "Performance",
                  description: "Optimización para máximo rendimiento",
                  icon: "⚡"
                },
                {
                  title: "Mantenibilidad",
                  description: "Código limpio y fácil de mantener",
                  icon: "🔧"
                },
                {
                  title: "Seguridad",
                  description: "Las mejores prácticas de seguridad",
                  icon: "🔒"
                }
              ].map((criterion, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{criterion.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{criterion.title}</h3>
                    <p className="text-muted-foreground text-sm">{criterion.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technologies;