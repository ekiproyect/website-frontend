import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import teamMember4 from "@/assets/team-member-4.jpg";
import Ernes from "@/assets/ernes.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Ernes Fuenzalida",
      role: "CTO & Lead Developer",
      ownerRole: "Team Leader",
      squad: "Frontend Developer",
      description:
        "Lidera arquitectura y delivery end-to-end con foco en frontend y experiencias.",
      image: Ernes,
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
      social: { github: "#", linkedin: "#", email: "ana@eki.com" },
    },
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
                    <p className="text-accent font-semibold">
                      {member.role}
                    </p>

                    {/* Badges: Encargado y Squad */}
                    <div className="flex justify-center gap-2 mt-2 mb-4">
                      
                      {member.squad && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-300"
                          aria-label={`Squad: ${member.squad}`}
                        >
                          {member.squad}
                        </span>
                      )}
                    </div>

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
