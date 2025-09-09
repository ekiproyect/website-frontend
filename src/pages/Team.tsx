import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import teamMember4 from "@/assets/team-member-4.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Carlos Rodriguez",
      role: "CTO & Lead Developer",
      description: "Especialista en arquitectura de software y desarrollo full-stack con más de 12 años de experiencia.",
      image: teamMember1,
      skills: ["React", "Node.js", "AWS", "Docker"],
      social: {
        github: "#",
        linkedin: "#",
        email: "carlos@eki.com"
      }
    },
    {
      name: "María González",
      role: "Senior Frontend Developer",
      description: "Experta en experiencia de usuario y desarrollo frontend moderno con enfoque en performance.",
      image: teamMember2,
      skills: ["React", "TypeScript", "UI/UX", "Next.js"],
      social: {
        github: "#",
        linkedin: "#",
        email: "maria@eki.com"
      }
    },
    {
      name: "David López",
      role: "Backend Developer",
      description: "Desarrollador backend especializado en APIs escalables y microservicios en la nube.",
      image: teamMember3,
      skills: ["Python", "Django", "PostgreSQL", "Kubernetes"],
      social: {
        github: "#",
        linkedin: "#",
        email: "david@eki.com"
      }
    },
    {
      name: "Ana Martínez",
      role: "DevOps Engineer",
      description: "Ingeniera DevOps con expertise en automatización, CI/CD y infraestructura cloud-native.",
      image: teamMember4,
      skills: ["AWS", "Terraform", "Jenkins", "Monitoring"],
      social: {
        github: "#",
        linkedin: "#",
        email: "ana@eki.com"
      }
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestro <span className="text-yellow-300">Equipo</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              Conoce a los ingenieros de software que hacen posible cada proyecto, 
              combinando experiencia técnica con pasión por la innovación.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Cuatro Ingenieros de <span className="text-accent">Software</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un equipo multidisciplinario con la experiencia y dedicación 
              necesaria para llevar tu proyecto al siguiente nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Photo */}
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-accent/20 group-hover:border-accent/50 transition-colors"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-accent font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {member.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-muted px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.social.github}
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label={`GitHub de ${member.name}`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-muted-foreground hover:text-accent transition-colors"
                        aria-label={`Email de ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
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

export default Team;