// Movido desde MinimalTeam.tsx al pasar /equipo al patrón de showcase.
//
// Las fotos NO comparten estilo: Ernes y Renato son de estudio informal, Fena es
// un retrato de carné con traje y Vicente una candid apaisada en sala de
// reunión. El `grayscale` de la tarjeta es lo que disimula la mezcla; si algún
// día se pasa a color, hace falta una sesión con encuadre común.

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ernes Fuenzalida",
    role: "Tech Lead & Fundador",
    image: "/images/team/Ernes.webp",
  },
  {
    name: "Renato Morales",
    role: "Socio & Director Creativo",
    image: "/images/team/Renato.webp",
  },
  {
    name: "Vicente Araya",
    role: "Socio & Director Creativo",
    image: "/images/team/Vicente.webp",
  },
  {
    name: "Fernando Condori",
    role: "Socio & Director Creativo",
    image: "/images/team/Fena.webp",
  },
];

/** Número visible: su posición en el carrusel. */
export const memberNumber = (index: number) => String(index + 1).padStart(2, "0");
