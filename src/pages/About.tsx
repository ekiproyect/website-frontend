import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Zap, Github, Linkedin, Mail } from "lucide-react";
import heroImage2 from "@/assets/hero-image2.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import teamMember4 from "@/assets/team-member-4.jpg";
import ernes from "@/assets/Ernes.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Misión",
      description: "Transformar ideas innovadoras en soluciones de software robustas y escalables que impulsen el crecimiento de nuestros clientes.",
    },
    {
      icon: Eye,
      title: "Visión",
      description: "Ser la consultora de referencia en desarrollo de software, reconocida por nuestra excelencia técnica y compromiso con la innovación.",
    },
    {
      icon: Heart,
      title: "Enfoque",
      description: "Nos centramos en entender profundamente las necesidades del negocio para crear soluciones que generen valor real y medible.",
    },
    {
      icon: Zap,
      title: "Propósito",
      description: "Acelerar la transformación digital de las empresas a través de tecnología de vanguardia y metodologías ágiles probadas.",
    },
  ];

  const teamMembers = [
    {
      name: "Ernes Fuenzalida",
      role: "CTO & Lead Developer",
      ownerRole: "Team Leader",
      squad: "Frontend Developer",
      description:
        "Lidera arquitectura y delivery end-to-end con foco en frontend y experiencias.",
      image: ernes,
      skills: [
        "Next.js",
        "Design System",
        "Azure",
        "Code Review",
        "Stakeholder Mgmt",
        "Roadmap",
      ],
      social: {
        github: "https://github.com/ernitoft",
        linkedin: "https://www.linkedin.com/in/ernesft",
        email: "ernesft21@gmail.com",
      },
    },
    {
      name: "Fernando Condori",
      role: "Finance Owner",
      ownerRole: "Finanzas",
      squad: "Backend Developer",
      description:
        "Owner de finanzas: modela flujos financieros y los servicios backend que los soportan.",
      image: teamMember2,
      skills: [
        "FinOps",
        "Procesos Financieros",
        "API Design",
        "Observabilidad",
        "Billing & Payments",
      ],
      social: { github: "#", linkedin: "#", email: "maria@eki.com" },
    },
    {
      name: "Vicente Araya",
      role: "Quality Lead",
      ownerRole: "Calidad",
      squad: "Frontend Developer",
      description:
        "Especialista en calidad, performance y experiencia de desarrollo.",
      image: teamMember3,
      skills: [
        "React/Next.js",
        "TypeScript",
        "A11y",
        "Performance Web",
        "Testing UI",
        "Storybook",
        "Jest/RTL",
        "Playwright",
        "Lighthouse",
      ],
      social: { github: "#", linkedin: "#", email: "david@eki.com" },
    },
    {
      name: "Renato Morales",
      role: "IT Admin Lead",
      ownerRole: "Administración",
      squad: "Backend Developer",
      description:
        "Administra infraestructura, CI/CD y confiabilidad de sistemas.",
      image: teamMember4,
      skills: [
        "CI/CD",
        "Docker",
        "Terraform",
        "Monitoring",
        "Security/IAM",
        "SRE",
        "Backups & DR",
        "Cost Control",
      ],
      social: { github: "https://github.com/naatox", linkedin: "https://www.linkedin.com/in/renato-morales-constancio/", email: "rmoralesconstancio@gmail.com" },
    },
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
              Acerca de <span className="underline decoration-4 underline-offset-8">Nosotros</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Somos una consultora especializada en desarrollo de software con más de
              10 años de experiencia creando soluciones digitales que transforman negocios.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">Sobre Nosotros</span>
            </div>
            <h2 className="text-4xl font-bold text-center mb-12">
              Nuestra <span className="text-accent">Historia</span>
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="text-xl mb-6">
                EKI nació de la pasión por crear tecnología que realmente importe.
                Fundada por un equipo de ingenieros de software con experiencia en
                startups y empresas Fortune 500, nuestra misión ha sido siempre la misma:
                convertir ideas complejas en soluciones elegantes y funcionales.
              </p>
              <p className="text-lg mb-6">
                A lo largo de los años, hemos tenido el privilegio de trabajar con
                empresas de todos los tamaños, desde startups emergentes hasta
                corporaciones establecidas, ayudándolas a navegar sus desafíos
                tecnológicos y aprovechar nuevas oportunidades de mercado.
              </p>
              <p className="text-lg">
                Nuestro enfoque se basa en la colaboración estrecha con nuestros
                clientes, metodologías ágiles y el uso de las tecnologías más
                avanzadas del mercado para entregar soluciones que no solo cumplan
                expectativas, sino que las superen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Nuestros <span className="text-accent">Valores</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada proyecto y decisión en EKI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-tech-blue rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "10+", label: "Años de Experiencia" },
              { number: "50+", label: "Proyectos Exitosos" },
              { number: "30+", label: "Clientes Satisfechos" },
              { number: "99%", label: "Tasa de Satisfacción" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">Nuestro Equipo</span>
            <h2 className="text-4xl font-bold mb-6 mt-4">
              Team <span className="text-accent">Members</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un equipo multidisciplinario con la experiencia y dedicación
              necesaria para llevar tu proyecto al siguiente nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-0">
                  {/* Photo */}
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    {/* Overlay con info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent/90 to-accent/70 px-3 py-2 text-white">
                      <h3 className="text-sm font-bold">{member.name}</h3>
                      <p className="text-xs text-white/90">{member.role}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="p-3 bg-card">
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                      {member.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border hover:border-accent/50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.github}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                        aria-label={`Email de ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Por qué trabajar con <span className="text-accent">nosotros</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Experiencia Comprobada",
                  description: "Más de 10 años desarrollando soluciones para empresas de todos los tamaños."
                },
                {
                  title: "Enfoque Colaborativo",
                  description: "Trabajamos codo a codo contigo para entender y superar tus expectativas."
                },
                {
                  title: "Tecnología de Vanguardia",
                  description: "Utilizamos las herramientas y frameworks más modernos del mercado."
                }
              ].map((point, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;