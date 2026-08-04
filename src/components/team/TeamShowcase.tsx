"use client";

import { ShowcaseSection } from "../showcase/ShowcaseSection";
import { TEAM_MEMBERS, TeamMember, memberNumber } from "./teamData";

export function TeamShowcase() {
  return (
    <ShowcaseSection<TeamMember>
      title="Nosotros"
      // "NOSOTROS" son 9.33 em medidos sobre Syne 800; 9.8 deja margen.
      titleDisplayEm={9.8}
      subtitle="Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario. Combinamos estética de alta costura con ingeniería de software."
      items={TEAM_MEMBERS}
      itemKey={(member) => member.name}
      // Los 4 se ven de una, sin desplazamiento: son pocos y son el equipo
      // entero, así que esconder a la mitad tras una flecha no aporta nada.
      layout="grid"
      itemNoun="integrante"
      renderCard={(member, index) => (
        // A diferencia de las tarjetas de proyecto, esta no abre nada: no hay
        // biografías. Por eso NO es un botón y el nombre se lee siempre — si se
        // ocultara tras el hover, quien navega con teclado no podría revelarlo
        // porque no habría nada que enfocar.
        <article className="h-full w-full max-w-[380px] mx-auto flex flex-col">
          {/* 3:4 mientras haya alto para ello, y ENCOGIBLE cuando no lo hay: el
              `min-h-0` deja que flex lo comprima y el `object-cover` recorta por
              arriba y abajo. Sin el aspect, la foto se comía todo el alto
              sobrante de la celda y quedaba una tira de 0.54 que recortaba media
              cara; sin el `min-h-0`, en pantallas bajas se desbordaba. */}
          <div className="relative w-full aspect-[3/4] min-h-0 overflow-hidden bg-zinc-500/10">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              // En reposo en blanco y negro, que es lo que disimula que las
              // fotos vengan de tres sesiones distintas; el hover devuelve el
              // color. El `scale` necesita el overflow-hidden del contenedor.
              className="h-full w-full object-cover grayscale opacity-90 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>

          <div className="shrink-0 pt-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-zinc-400">{memberNumber(index)}</span>
              <h2 className="text-lg md:text-xl font-heading font-bold tracking-tight text-zinc-900">
                {member.name}
              </h2>
            </div>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {member.role}
            </span>
          </div>
        </article>
      )}
    />
  );
}
