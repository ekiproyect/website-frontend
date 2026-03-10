import { TeamMemberSection } from '../components/TeamMemberSection';

const Team = () => {
  const teamMembers = [
    {
      id: 'vicente',
      name: 'Vicente Araya',
      role: 'CEO & Founder | Ingeniero de Software',
      bio: 'Apasionado por la innovación tecnológica y el desarrollo de soluciones escalables. Con más de 8 años de experiencia liderando equipos de desarrollo y arquitectando sistemas complejos que transforman negocios.',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'System Design'],
      social: {
        linkedin: 'https://linkedin.com/in/vicente-araya',
        github: 'https://github.com/vicentearaya',
        twitter: 'https://twitter.com/vicentearaya',
      },
      frames: {
        path: '/equipo/vicente',
        start: 20, // Empezar desde el frame 20 (saltamos los primeros)
        end: 147,
        total: 128, // 147 - 20 + 1
      },
    },
    // Aquí se agregarán más miembros del equipo...
  ];

  return (
    <div className="bg-black min-h-screen">
      {teamMembers.map((member) => (
        <TeamMemberSection key={member.id} member={member} />
      ))}
    </div>
  );
};

export default Team;
