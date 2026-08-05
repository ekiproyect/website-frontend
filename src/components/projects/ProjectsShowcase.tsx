"use client";

import { ShowcaseSection } from "../showcase/ShowcaseSection";
import { ALL_PROJECTS, Project, projectNumber } from "./projectsData";
import { ProjectDialog } from "./ProjectDialog";
import { useProjectDialog } from "./useProjectDialog";

export function ProjectsShowcase() {
  const dialog = useProjectDialog();

  return (
    <>
      <ShowcaseSection<Project>
        title="Trabajo."
        // "TRABAJO." son 8.08 em medidos; 8.5 deja margen.
        titleDisplayEm={8.5}
        subtitle="Selección de proyectos digitales diseñados y desarrollados en EKI. Cada píxel está pensado para convertir, cada línea de código para escalar."
        items={ALL_PROJECTS}
        itemKey={(project) => project.client}
        // 32/25 sale de encajar una imagen 16:10 más un 20% de alto para el
        // texto: ancho = 1.6 · 0.8 · alto = 1.28 · alto. Si cambia el aspect de
        // la imagen, recalcular este.
        cardAspect="32 / 25"
        itemNoun="proyecto"
        renderCard={(project, index) => (
          <article
            // `justify-center` y no el estirado por defecto: cuando el techo de
            // ancho muerde (móvil y tablet), la tarjeta sigue midiendo todo el
            // alto de la pista pero su contenido ya no lo llena, y el sobrante
            // se repartía entero debajo del texto — 290px de vacío dentro de la
            // tarjeta en un 390x844. Centrado, el hueco queda arriba y abajo por
            // igual. En escritorio no hace nada: ahí imagen y ficha suman el
            // alto exacto.
            className="h-full w-full flex flex-col justify-center cursor-pointer"
            onClick={() => dialog.openProject(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              dialog.openProject(index);
            }}
            aria-label={`Ver detalle de ${project.client}`}
          >
            {/* Sin `overflow-hidden`: existía para contener el zoom del hover y
                ahora recortaría la sombra en las tarjetas pequeñas. Sin `scale`:
                además del zoom, recortaba un 2% con object-cover y se comía el
                margen transparente que la sombra necesita.

                Y SIN FONDO PROPIO. La preview lleva lienzo transparente, así que
                se ve el de la sección — el mismo color en reposo y, sobre todo,
                el que `useScrollDarken` funde a negro al llegar al footer. */}
            <div className="relative w-full aspect-[16/10] shrink-0">
              {/* `preview` viene ya en 16:10 desde build-previews.mjs, así que
                  object-cover no recorta nada. Los fallbacks sí se recortarían:
                  son el último recurso si falta el archivo. */}
              <img
                src={project.preview ?? project.gallery?.[0] ?? project.image}
                alt={project.client}
                loading="lazy"
                // drop-shadow y no shadow-*: el archivo lleva lienzo transparente,
                // así que el filtro sigue el alfa y la sombra abraza la captura en
                // vez del rectángulo del hueco.
                //
                // El hover lleva DOS capas: una corta que ancla el borde y una
                // amplia y difusa que da la elevación. Con una sola capa la sombra
                // se ve plana por mucho que se suba. El desplazamiento se mantiene
                // ~la mitad del desenfoque para que no se extienda demasiado hacia
                // arriba, donde el margen transparente de la preview es más estrecho.
                className="h-full w-full object-cover [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.08))] transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[filter:drop-shadow(0_4px_10px_rgb(0_0_0/0.10))_drop-shadow(0_18px_36px_rgb(0_0_0/0.22))]"
              />
            </div>

            {/* La ficha entra y sale DESLIZÁNDOSE, sin desvanecerse. Por eso hace
                falta la máscara: `overflow-hidden` ceñido al alto del contenido, y
                dentro un bloque que se desplaza un 100% de su propia altura. Al
                bajar queda justo fuera de la máscara, así que desaparece sin tocar
                la opacidad.

                El estado oculto va tras `@media (hover: hover)`: sin esa guarda, en
                móvil el nombre del proyecto no se vería nunca. También se revela al
                enfocar con teclado, porque el article es tabbable. */}
            <div className="shrink-0 pt-4">
              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-zinc-400">{projectNumber(index)}</span>
                    <h2 className="text-xl md:text-2xl font-heading font-bold tracking-tight text-zinc-900">
                      {project.client}
                    </h2>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      {project.category}
                    </span>
                    {project.tag && (
                      <span className="rounded-full border border-zinc-900/15 bg-zinc-900/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                        {project.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      />

      <ProjectDialog {...dialog} />
    </>
  );
}
