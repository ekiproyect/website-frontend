"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  id: string;
  client: string;
  category: string;
  description: string;
  detail?: string;
  image: string;
  url?: string;
  gallery?: string[];
};

const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    client: "SmartPack",
    category: "Plataforma Web + App Móvil",
    description:
      "Suite de gestión logística para operaciones de bodega: cajas, áreas, proyectos, productos y proveedores, con control de acceso por roles. Reemplaza planillas y papel por una fuente de verdad única, consultable en el escritorio o desde el celular en terreno.",
    detail:
      "Dos formas de trabajar conectadas a la misma información: un panel web para gestionar todo con calma desde el escritorio y una app de celular para el equipo en bodega, que solo escanea un código y listo. Cada persona ve únicamente lo que le corresponde según su rol, y cada movimiento queda registrado. El estado de cada activo se entiende de un vistazo gracias al color: verde si está disponible, rojo si está dañado.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    url: "https://assettracker.cl/login",
    gallery: [
      "/images/projects/AssetTracker/assettracker1.webp",
      "/images/projects/AssetTracker/assettracker2.webp",
      "/images/projects/AssetTracker/assettracker3.webp",
    ],
  },
  {
    id: "02",
    client: "Arquitectura Studio",
    category: "Desarrollo High-End",
    description:
      "Sitio inmersivo para un estudio de arquitectura. Portafolio scroll-driven con transiciones fluidas y carga optimizada de imágenes pesadas, para que el trabajo se vea tan cuidado como el espacio que diseñan.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    client: "E-Commerce Finanzas",
    category: "Desarrollo & SEO",
    description:
      "Plataforma de comercio con foco en conversión. Arquitectura SEO técnica, rendimiento medido y checkout sin fricción para que el tráfico orgánico se traduzca en ventas reales.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    client: "App Inmobiliaria",
    category: "Diseño UX/UI",
    description:
      "Experiencia de búsqueda de propiedades pensada para decidir rápido. Filtros claros, fichas legibles y un flujo de contacto directo que acorta el camino entre interés y visita.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
  },
];

function GalleryCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
    return () => { embla.off("select", onSelect); };
  }, [embla]);

  // Cerrar lightbox con Escape
  React.useEffect(() => {
    if (zoomed === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(null); };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [zoomed]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-white/10" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={src} className="min-w-0 flex-[0_0_100%]">
              <img
                src={src}
                alt={`${alt} — captura ${i + 1}`}
                loading="lazy"
                onClick={() => setZoomed(i)}
                className="w-full block select-none cursor-zoom-in"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox: imagen ampliada a pantalla completa */}
      {zoomed !== null && (
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
            alt={`${alt} — captura ${zoomed + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl cursor-default"
          />
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur border border-white/10 text-zinc-50 hover:bg-zinc-950/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur border border-white/10 text-zinc-50 hover:bg-zinc-950/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === selected ? "w-6 bg-zinc-50" : "w-2 bg-zinc-50/40 hover:bg-zinc-50/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectsGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    cards.forEach((card) => {
      // Efecto de aparición suave de abajo hacia arriba para cada tarjeta individual
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Se activa justo cuando la tarjeta asoma en la pantalla
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pb-32 md:pb-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* El Grid Asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-16 md:gap-y-0">
          
          {PROJECTS_DATA.map((project, index) => {
            const hasGallery = !!project.gallery?.length;
            return (
            <div
              key={project.id}
              // LA MAGIA ASIMÉTRICA: Si el índice es impar (columna derecha), lo empujamos hacia abajo en desktop
              className={`project-card group flex flex-col ${hasGallery ? "cursor-pointer" : ""} ${
                index % 2 !== 0 ? "md:mt-32 lg:mt-48" : "md:mb-32 lg:mb-48"
              }`}
              // Solo los proyectos con galería abren el modal
              onClick={hasGallery ? () => setActive(project) : undefined}
              role={hasGallery ? "button" : undefined}
              tabIndex={hasGallery ? 0 : undefined}
              onKeyDown={
                hasGallery
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(project);
                      }
                    }
                  : undefined
              }
              aria-label={hasGallery ? `Ver galería de ${project.client}` : undefined}
            >

              {/* Contenedor de la Imagen */}
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <img
                  src={project.image}
                  alt={project.client}
                  loading="lazy"
                  // Efecto zoom en hover muy sutil
                  className="w-full h-full object-cover origin-center scale-[1.02] group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                {hasGallery && (
                  <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-zinc-900/80 backdrop-blur px-4 py-2 text-xs font-medium text-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver proyecto <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Títulos y Categorías */}
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-500 font-medium text-sm md:text-base tracking-wide">
                    {project.category}
                  </span>
                  <span className="text-zinc-400 font-mono text-xs">
                    {project.id}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-zinc-900">
                  {project.client}
                </h3>

                {/* Descripción del proyecto */}
                <p className="mt-4 text-base md:text-lg text-zinc-600 leading-relaxed max-w-prose text-justify [text-wrap:pretty] hyphens-auto">
                  {project.description}
                </p>

                {/* Línea que aparece en hover */}
                <div className="h-[2px] w-0 bg-zinc-900 mt-6 group-hover:w-full transition-all duration-500 ease-out" />
              </div>

            </div>
            );
          })}

        </div>

      </div>

      {/* MODAL DE GALERÍA */}
      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[500] bg-zinc-950/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-[510] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900/60 backdrop-blur-2xl text-zinc-50 shadow-2xl ring-1 ring-white/15 border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
            aria-describedby={undefined}
          >
            <Dialog.Close
              className="absolute top-4 right-4 z-20 rounded-full p-2 text-zinc-400 hover:text-zinc-50 hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {/* Cuerpo: texto a la izquierda, carousel a la derecha (apilado en móvil) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 p-6 md:p-8 lg:p-10 items-center">

              {/* Columna izquierda: info */}
              <div className="flex flex-col">
                <p className="text-xs font-medium tracking-wide text-zinc-400 mb-2 pr-10">
                  {active?.category}
                </p>
                <Dialog.Title className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-5">
                  {active?.client}
                </Dialog.Title>

                <p className="text-base text-zinc-300 leading-relaxed mb-7 text-justify [text-wrap:pretty] hyphens-auto">
                  {active?.detail ?? active?.description}
                </p>

                {active?.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-full bg-zinc-50 text-zinc-950 px-5 py-3 text-sm font-semibold hover:bg-zinc-300 transition-colors"
                  >
                    Visitar el proyecto en vivo
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Columna derecha: carousel */}
              {active?.gallery && active.gallery.length > 0 && (
                <GalleryCarousel images={active.gallery} alt={active.client} />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}