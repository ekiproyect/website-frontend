"use client";

import { ArrowUpRight } from "lucide-react";
import { ShowcaseSection } from "../showcase/ShowcaseSection";
import {
  ALL_PROJECTS,
  PROJECTS_DATA,
  REFERENCED_DATA,
  Project,
  projectNumber,
} from "./projectsData";
import { ProjectDialog } from "./ProjectDialog";
import { useProjectDialog } from "./useProjectDialog";

/**
 * El diálogo navega por índice dentro de `ALL_PROJECTS`, nunca por `id`: los
 * `id` de PROJECTS_DATA y REFERENCED_DATA chocan (ambos numeran 01 y 02). Como
 * aquí los proyectos se recorren en dos listas separadas, hay que traducir cada
 * uno a su posición en la lista global antes de abrirlo.
 */
const globalIndex = (project: Project) => ALL_PROJECTS.indexOf(project);

export function ProjectsShowcase() {
  const dialog = useProjectDialog();

  const open = (project: Project) => dialog.openProject(globalIndex(project));

  /** Enter y Espacio abren, como haría un <button> de verdad. */
  const openOnKey = (project: Project) => (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    // Solo las teclas del propio contenedor: si vienen del enlace interno,
    // Enter tiene que navegar, no abrir el modal.
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    open(project);
  };

  return (
    <>
      <ShowcaseSection<Project>
        title="Trabajo."
        // "TRABAJO." son 8.08 em medidos; 8.5 deja margen.
        titleDisplayEm={8.5}
        subtitle="Selección de proyectos digitales diseñados y desarrollados en EKI. Cada píxel está pensado para convertir, cada línea de código para escalar."
        layout="editorial"
        items={PROJECTS_DATA}
        itemKey={(project) => project.client}
        itemNoun="proyecto"
        renderCard={(project) => (
          <article
            className="flex flex-col cursor-pointer"
            onClick={() => open(project)}
            role="button"
            tabIndex={0}
            onKeyDown={openOnKey(project)}
            aria-label={`Ver detalle de ${project.client}`}
          >
            {/* SIN FONDO PROPIO: el Footer monta `useScrollDarken`, que funde a
                negro el backgroundColor de la sección. Solo interpola el de la
                sección, así que un fondo anidado se quedaría claro y dibujaría
                un rectángulo brillante sobre lo ya oscurecido.

                Sin `overflow-hidden` por el mismo motivo que en el carrusel:
                recortaría la sombra, que aquí abraza la captura por el alfa. */}
            <div className="relative w-full aspect-[16/10]">
              <img
                src={project.preview ?? project.gallery?.[0] ?? project.image}
                alt={project.client}
                loading="lazy"
                // drop-shadow y no shadow-*: la preview lleva lienzo
                // transparente, así que el filtro sigue el alfa. Dos capas en
                // hover — una corta que ancla el borde y otra amplia que da la
                // elevación; con una sola la sombra se ve plana.
                className="h-full w-full object-cover [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.08))] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:[filter:drop-shadow(0_4px_10px_rgb(0_0_0/0.10))_drop-shadow(0_24px_48px_rgb(0_0_0/0.22))]"
              />
              <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-zinc-900/85 backdrop-blur px-4 py-2 text-xs font-medium text-zinc-50 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                Ver proyecto <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* La ficha se lee SIEMPRE, a diferencia del carrusel: aquí las
                piezas son pocas y grandes, y ocultar el nombre hasta el hover
                dejaba la mitad de la página en blanco. */}
            <div className="mt-6 flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-zinc-400">
                  {projectNumber(globalIndex(project))}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-zinc-900">
                  {project.client}
                </h2>
              </div>

              <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                {project.category}
              </span>

              <p className="mt-4 text-base md:text-lg text-zinc-600 leading-relaxed max-w-prose [text-wrap:pretty]">
                {project.description}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Sin esto el clic burbujea al article y abre el modal en vez
                  // de navegar.
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-zinc-900/20 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                >
                  Ver web del proyecto
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {/* Línea que se traza en hover: la única señal decorativa. */}
              <div className="h-[2px] w-0 bg-zinc-900 mt-6 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          </article>
        )}
      />

      {/* ÍNDICE DE REFERENCIADOS — sección oscura propia, y no un bloque más
          dentro del showcase, por dos razones que van juntas:

          1. LEGIBILIDAD. El Footer monta `useScrollDarken`, que funde a negro el
             fondo de su hermana anterior. Metido dentro del showcase, el índice
             quedaba en esa zona y su texto zinc-900 desaparecía sobre el negro.
             Naciendo ya oscuro, el fundido es un no-op: interpola #09090b hacia
             #09090b y el texto claro nunca deja de leerse.
          2. JERARQUÍA. El corte de blanco a negro marca el cambio de capítulo
             entre el portafolio propio y el trabajo para terceros mejor que
             cualquier separador. */}
      {/* Sin padding inferior: el Footer ya abre con pt-20 y su propio
          min-h-[80vh]. Sumarle el de aquí dejaba ~400px de negro vacío entre la
          última fila y el "¿Tienes un proyecto en mente?". */}
      <section className="relative w-full bg-zinc-950 text-zinc-50 px-5 md:px-8 pt-24 md:pt-36 pb-0">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
              Proyectos referenciados
            </h2>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-xl md:text-right text-balance">
              Proyectos de terceros de los que nos hacemos cargo: el 100% del desarrollo lo lleva EKI.
            </p>
          </div>

          <ul className="border-t border-white/10">
            {REFERENCED_DATA.map((project) => (
              <li key={project.client} className="border-b border-white/10">
                {/* La fila no es un <button> porque puede contener un enlace: un
                    <a> dentro de un <button> es HTML inválido y los navegadores
                    lo rompen. El botón es una capa invisible que cubre la fila y
                    el enlace va por encima con z-10. */}
                <div className="group/row relative grid grid-cols-1 md:grid-cols-12 items-center gap-x-8 gap-y-4 py-8 md:py-10 transition-colors duration-300 hover:bg-white/[0.04] md:px-4 md:-mx-4">
                  <button
                    type="button"
                    onClick={() => open(project)}
                    aria-label={`Ver detalle de ${project.client}`}
                    className="absolute inset-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  />

                  <div className="md:col-span-3 overflow-hidden rounded-lg">
                    <img
                      src={project.preview ?? project.gallery?.[0] ?? project.image}
                      alt={`Vista previa de ${project.client}`}
                      loading="lazy"
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover/row:scale-105"
                    />
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-2">
                    <span className="font-mono text-xs text-zinc-500">
                      {projectNumber(globalIndex(project))}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-heading font-bold tracking-tight">
                      {project.client}
                    </h3>
                    <span className="text-sm md:text-base text-zinc-400">{project.category}</span>
                    {project.tag && (
                      <span className="self-start rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                        {project.tag}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-4 flex flex-col items-start gap-5">
                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed [text-wrap:pretty]">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-zinc-50 transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                      >
                        Ver web del proyecto
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <span className="md:col-span-1 flex items-center gap-1.5 text-sm font-medium md:justify-end">
                    <span className="md:sr-only">Ver detalle</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:-translate-y-1" />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectDialog {...dialog} />
    </>
  );
}
