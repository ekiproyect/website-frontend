"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projectNumber } from "./projectsData";
import { useProjectDialog } from "./useProjectDialog";

/** Cada cuánto pasa sola a la siguiente captura. */
const AUTOPLAY_MS = 3000;

function GalleryCarousel({
  images,
  alt,
  backdrop,
}: {
  images: string[];
  alt: string;
  /** Imagen ambiente detrás de las capturas. */
  backdrop?: string;
}) {
  const [zoomed, setZoomed] = useState<number | null>(null);
  const [index, setIndex] = useState(0);

  // Las capturas se relevan solas, sin pista que desplazar: al fundirse una con
  // otra no hay nada que arrastrar ni posición a la que saltar, así que aquí no
  // hay Embla — solo un índice. El de /proyectos sí lo usa: allí el carrusel se
  // desplaza de verdad.
  //
  // Se apaga en tres casos: con una sola captura, donde no hay adónde ir; con
  // `prefers-reduced-motion`, porque es contenido que se mueve solo sin haberlo
  // pedido; y con el visor ampliado abierto, o al cerrarlo te encontrarías una
  // captura distinta de la que estabas mirando.
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (images.length < 2 || reduce || zoomed !== null) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(t);
  }, [images.length, zoomed]);

  // Cerrar lightbox con Escape
  React.useEffect(() => {
    if (zoomed === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(null); };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [zoomed]);

  return (
    // El escenario de la columna izquierda: fondo ambiente, captura nítida
    // flotando encima. En desktop LLENA el alto del panel (`h-full`); el 7:5
    // que tenía existía para que el vuelo de apertura no deformara, y ese vuelo
    // ya no existe. En móvil el panel es de alto automático, así que ahí sí
    // necesita un aspect propio.
    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-zinc-200">
      {/* Fondo ambiente detrás de las capturas. */}
      <img
        src={backdrop ?? images[0]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Velo: además de dar profundidad, es lo que evita que el fondo compita
          con la captura en Cumplify y CILOG, donde `image` es la MISMA imagen
          que `gallery[0]` y si no se ve duplicada. */}
      <div className="absolute inset-0 bg-zinc-950/50" />

      {/* Entran escalonadas con el resto del contenido del modal. */}
      <div className="modal-stagger animate-rise [animation-delay:120ms] relative h-full w-full flex items-center justify-center p-6 md:p-10">
        {/* Las capturas van APILADAS, no en fila: se cruzan con un fundido, así
            que ocupan todas la misma celda. Con `grid` + `[grid-area:1/1]` la
            caja la marca la más alta y no hace falta posicionarlas en absoluto
            ni fijar un alto — que es lo que obligaría a recortar las que no
            comparten proporción dentro de un mismo proyecto. */}
        <div className="grid w-full max-h-full overflow-hidden shadow-2xl ring-1 ring-zinc-950/10">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${alt}, captura ${i + 1}`}
              // Sin `loading="lazy"`: todas están en la misma celda desde el
              // principio, y una que llegue tarde se vería aparecer a medio
              // fundido.
              onClick={() => setZoomed(i)}
              aria-hidden={i !== index}
              className={`[grid-area:1/1] w-full block select-none cursor-zoom-in transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              draggable={false}
            />
          ))}
        </div>

      </div>

      {/* Lightbox: va al body con portal — dentro del modal, que tiene transform,
          un `fixed` se posiciona contra el modal y recorta la imagen. */}
      {zoomed !== null && createPortal(
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 cursor-zoom-out animate-in fade-in-0"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} ampliada`}
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Cerrar imagen ampliada"
            className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full bg-white/10 backdrop-blur text-zinc-50 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[zoomed]}
            alt={`${alt}, captura ${zoomed + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain shadow-2xl cursor-default"
          />
        </div>,
        document.body
      )}

      {/* Sin controles: ni flechas, ni chip, ni puntos. La captura se releva
          sola y sigue abriendo el visor al hacer clic. */}
    </div>
  );
}

export function ProjectDialog({
  activeIndex, active, goTo, close,
}: ReturnType<typeof useProjectDialog>) {
  return (
    <>
      {/* MODAL DE PROYECTO */}
      <Dialog.Root open={!!active} onOpenChange={(o) => !o && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="modal-overlay fixed inset-0 z-[500] bg-zinc-950/60 backdrop-blur-sm data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out" />
          <Dialog.Content
            className={`modal-panel fixed left-1/2 top-1/2 z-[510] w-[94vw] ${
              active?.gallery?.length ? "max-w-[1360px]" : "max-w-2xl"
            } max-h-[88svh] lg:h-[78svh] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-zinc-50 text-zinc-900 shadow-2xl data-[state=open]:animate-panel-in data-[state=closed]:animate-panel-out`}
            aria-describedby={undefined}
          >
            <Dialog.Close
              className="absolute top-4 right-4 z-30 rounded-full p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {/* Escenario a la izquierda, ficha a la derecha (apilado en móvil).
                El panel no scrollea: lo hace la columna de texto. */}
            <div
              // data-lenis-prevent: en móvil scrollea este contenedor y Lenis
              // corre en modo root, capturando la rueda de la ventana.
              data-lenis-prevent
              className={`grid grid-cols-1 max-h-[88svh] lg:h-full overflow-y-auto lg:overflow-hidden ${
                active?.gallery?.length ? "lg:grid-cols-[1.62fr_1fr]" : ""
              }`}
            >
              {/* IZQUIERDA: escenario */}
              {active?.gallery && active.gallery.length > 0 && (
                <div className="relative">
                  <GalleryCarousel
                    // key: fuerza a Embla a reiniciarse en la primera captura
                    // al cambiar de proyecto con las flechas.
                    key={active.client}
                    images={active.gallery}
                    alt={active.client}
                    backdrop={active.image}
                  />
                </div>
              )}

              {/* DERECHA: ficha. Columna flex con el bloque meta anclado abajo;
                  solo el texto scrollea, para que "Ver web" y las flechas
                  queden siempre visibles (Cumplify tiene 4 párrafos). */}
              <div className="flex flex-col min-h-0 p-6 md:p-8 lg:p-10">
                <div className="modal-stagger animate-rise mb-3 pr-10">
                  <span className="font-mono text-xs text-zinc-400">
                    {activeIndex !== null ? projectNumber(activeIndex) : null}
                  </span>
                </div>

                <Dialog.Title className="modal-stagger animate-rise [animation-delay:60ms] text-3xl md:text-4xl font-heading font-black tracking-tighter text-zinc-900">
                  {active?.client}
                </Dialog.Title>

                {active?.tag && (
                  <span className="modal-stagger animate-rise [animation-delay:120ms] mt-4 self-start rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                    {active.tag}
                  </span>
                )}

                <div
                  data-lenis-prevent
                  className="modal-stagger animate-rise [animation-delay:180ms] mt-6 border-t border-zinc-200 pt-6 lg:min-h-0 lg:overflow-y-auto"
                >
                  <p className="text-base text-zinc-600 leading-relaxed text-justify [text-wrap:pretty] hyphens-auto whitespace-pre-line">
                    {active?.detail ?? active?.description}
                  </p>
                </div>

                {/* Fila de cierre anclada: categoría a un extremo y el enlace al
                    otro, fuera del área scrollable para que siempre se vean. */}
                <div className="modal-stagger animate-rise [animation-delay:240ms] mt-8 lg:mt-auto lg:pt-8 flex items-end justify-between gap-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed text-zinc-500 max-w-[22ch]">
                    {active?.category}
                  </span>

                  {active?.url && (
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 hover:text-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-50"
                    >
                      Ver web
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                {/* Navegación entre proyectos, en su propia fila al pie */}
                <div className="modal-stagger animate-rise [animation-delay:300ms] mt-6 flex justify-end">
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(-1)}
                      aria-label="Proyecto anterior"
                      className="grid place-items-center w-10 h-10 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      aria-label="Proyecto siguiente"
                      className="grid place-items-center w-10 h-10 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>

        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
