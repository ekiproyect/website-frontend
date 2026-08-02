"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowUpRight, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  id: string;
  client: string;
  category: string;
  tag?: string; // etiqueta para proyectos referenciados / en colaboración
  description: string;
  detail?: string;
  image?: string; // los referenciados no llevan imagen: se listan como índice
  url?: string;
  gallery?: string[];
};

const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    client: "Kreatracker",
    category: "Plataforma Web + App Móvil",
    description:
      "Suite de gestión logística para operaciones de bodega: cajas, áreas, proyectos, productos y proveedores, con control de acceso por roles. Reemplaza planillas y papel por una fuente de verdad única, consultable en el escritorio o desde el celular en terreno.",
    detail:
      "Dos formas de trabajar conectadas a la misma información: un panel web para gestionar todo con calma desde el escritorio y una app de celular para el equipo en bodega, que solo escanea un código y listo. Cada persona ve únicamente lo que le corresponde según su rol, y cada movimiento queda registrado. El estado de cada activo se entiende de un vistazo gracias al color: verde si está disponible, rojo si está dañado.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    url: "https://kreatracker.cl/",
    gallery: [
      "/images/projects/AssetTracker/assettracker1.webp",
      "/images/projects/AssetTracker/assettracker2.webp",
      "/images/projects/AssetTracker/assettracker3.webp",
    ],
  },
  {
    id: "02",
    client: "Chatbot Empresarial",
    category: "OTEC",
    description:
      "ChatBot entrenado para optimizar los procesos de una OTEC, respondiendo preguntas a nivel interno y a clientes. Reduce tiempos de atención y estandariza respuestas sobre cursos, procesos y trámites.",
    detail:
      "Un asistente conversacional entrenado con la información propia de la OTEC que atiende consultas 24/7 tanto del equipo interno como de los clientes. Optimiza la carga y validación de facturas, el seguimiento de pagos y el estado de flujos administrativos, evitando que ese trabajo dependa de revisar planillas o escribir correos. También responde preguntas frecuentes sobre cursos, procesos de inscripción y trámites, liberando al equipo humano para los casos que realmente lo requieren.",
    image: "/images/projects/ChatBot/chatbot1.png",
    gallery: [
      "/images/projects/ChatBot/chatbot2.png",
      "/images/projects/ChatBot/chatbot3.png",
    ],
  },
];

// Proyectos en los que participa parte del equipo de EKI junto a equipos externos.
const REFERENCED_DATA: Project[] = [
  {
    id: "01",
    client: "Cumplify",
    category: "Plataforma SaaS de cumplimiento",
    tag: "Desarrollo EKI",
    description:
      "Cumplimiento ambiental y de seguridad para operaciones constructoras: obligaciones legales, matriz de riesgo IPER, catálogo de peligros y biblioteca documental, en una plataforma multiempresa.",
    image: "/images/projects/Cumplify/cumplify.jpeg",
    detail:
      "Cumplir la normativa ambiental y de seguridad suele significar planillas dispersas, carpetas con documentos vencidos y una matriz de riesgos que nadie actualiza. Cumplify reúne todo eso en un solo lugar: las obligaciones legales que aplican a cada empresa, un catálogo de peligros y riesgos por familia, la biblioteca documental con sus vigencias y la estructura de unidades organizacionales.\n\nEl corazón es la matriz IPER: identificar el peligro, evaluar el riesgo y hacerle seguimiento a la medida preventiva. La plataforma cruza probabilidad y consecuencia para entregar un valor de riesgo con color propio, de verde a rojo, y guía la identificación en un flujo único: unidad de control, tarea, peligro y riesgo.\n\nAl ser multiempresa, cada organización trabaja sobre sus propios datos sin ver los de las demás, y cada persona accede solo a lo que su rol permite.\n\nEl proyecto nació con un equipo externo y EKI entró aportando un integrante. Cuando el desarrollador original dejó el proyecto, se sumó un segundo: hoy el desarrollo lo lleva íntegramente el equipo de EKI.",
    gallery: [
      "/images/projects/Cumplify/cumplify.jpeg",
      "/images/projects/Cumplify/cumplify1.jpeg",
      "/images/projects/Cumplify/cumplify3.jpeg",
      "/images/projects/Cumplify/cumplify2.jpeg",
    ],
  },
  {
    id: "02",
    client: "CILOG, Corredor Bioceánico Capricornio",
    category: "Plataforma de datos e integración logística",
    tag: "Desarrollo EKI",
    description:
      "Iniciativa financiada por el Gobierno Regional de Antofagasta, con recursos del Fondo Regional para la Productividad y el Desarrollo, F.R.P.D., Línea Hub Bioceánico, año 2025, aprobados por el Consejo Regional de Antofagasta.",
    image: "/images/projects/Corredor/cilog1.jpeg",
    url: "https://cilog.cl/",
    gallery: [
      "/images/projects/Corredor/cilog1.jpeg",
      "/images/projects/Corredor/cilog4.jpeg",
      "/images/projects/Corredor/cilog2.jpeg",
      "/images/projects/Corredor/cilog3.jpeg",
    ],
    detail:
      "Son ~2.500 km de rutas que cruzan Brasil, Paraguay, Argentina y Chile para conectar el Atlántico con el Pacífico. Saber si un paso fronterizo está abierto, qué exige cada país o cuánto demora un tramo obligaba a rastrear organismos, planillas y PDFs. CILOG lo centraliza en una sola fuente de verdad multinacional.\n\nLa portada muestra el estado en vivo de cada complejo fronterizo, con clima y tipo de vehículo habilitado, y la capa GIS lo lleva a un mapa con rutas, pasos, puertos y centros logísticos filtrables por país. El observatorio reúne indicadores oficiales de comercio, competitividad y conectividad, cada uno con su fuente declarada y la cifra tal como la publica el organismo. Disponible en español, inglés y portugués.\n\nEl proyecto es de un tercero, pero todo su desarrollo lo ejecuta el equipo de EKI.",
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
      <div className="relative overflow-hidden rounded-xl border border-white/10" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={src} className="min-w-0 flex-[0_0_100%]">
              <img
                src={src}
                alt={`${alt}, captura ${i + 1}`}
                loading="lazy"
                onClick={() => setZoomed(i)}
                className="w-full block select-none cursor-zoom-in"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Pista de que la imagen se puede ampliar (visible siempre: en táctil no hay hover) */}
        <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-zinc-950/70 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-zinc-50">
          <ZoomIn className="w-3.5 h-3.5" />
          Clic para ampliar
        </span>
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
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
          />
        </div>,
        document.body
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

    // Índice de referenciados: entrada escalonada, solo si el usuario no pidió menos movimiento
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".ref-row", {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".referenced-index", start: "top 80%" },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-zinc-50 text-zinc-900 pb-32 md:pb-48 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* El Grid Asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-16 md:gap-y-0">
          
          {PROJECTS_DATA.map((project, index) => {
            // Abre modal si hay algo que mostrar: galería y/o texto extendido
            const hasGallery = !!(project.gallery?.length || project.detail);
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
                      // Ignora las teclas que vienen del enlace interno
                      if (e.target !== e.currentTarget) return;
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
                  <span className="flex items-center gap-2 text-zinc-500 font-medium text-sm md:text-base tracking-wide">
                    {project.category}
                    {project.tag && (
                      <span className="rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                        {project.tag}
                      </span>
                    )}
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

                {/* Acceso directo al sitio, sin pasar por el modal */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                  >
                    Ver web del proyecto
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {/* Línea que aparece en hover */}
                <div className="h-[2px] w-0 bg-zinc-900 mt-6 group-hover:w-full transition-all duration-500 ease-out" />
              </div>

            </div>
            );
          })}

        </div>

        {/* ÍNDICE DE PROYECTOS REFERENCIADOS
            Tratamiento de índice (sin imágenes) para leerse como capítulo aparte
            del portafolio propio, no como tarjetas de segunda categoría. */}
        <div className="referenced-index mt-28 md:mt-44 border-t border-zinc-300 pt-10 md:pt-14">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-zinc-900">
              Proyectos referenciados
            </h2>
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-xl md:text-right text-balance">
              Proyectos de terceros de los que nos hacemos cargo: el 100% del desarrollo lo lleva EKI.
            </p>
          </div>

          <ul className="border-t border-zinc-200">
            {REFERENCED_DATA.map((project) => (
              <li key={project.id} className="border-b border-zinc-200">
                {/* La fila no es un <button> porque puede contener un enlace: el botón
                    es una capa invisible que cubre la fila y el enlace va por encima. */}
                <div className="ref-row group/row relative grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-7 md:py-9 transition-colors duration-300 hover:bg-zinc-100/70 md:px-4 md:-mx-4">
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    aria-label={`Ver detalle de ${project.client}`}
                    className="absolute inset-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                  />

                  {/* Miniatura de referencia */}
                  <div className="md:col-span-3 overflow-hidden rounded-lg bg-zinc-200">
                    <img
                      src={project.image}
                      alt={`Vista previa de ${project.client}`}
                      loading="lazy"
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover/row:scale-105"
                    />
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-2">
                    <span className="font-mono text-xs text-zinc-400">{project.id}</span>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-zinc-900">
                      {project.client}
                    </h3>
                    <span className="text-sm md:text-base text-zinc-500">{project.category}</span>
                    {project.tag && (
                      <span className="self-start rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                        {project.tag}
                      </span>
                    )}
                  </div>

                  <div className="md:col-span-4 flex flex-col items-start gap-4 md:pt-1">
                    <p className="text-base md:text-lg text-zinc-600 leading-relaxed [text-wrap:pretty]">
                      {project.description}
                    </p>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50"
                      >
                        Ver web del proyecto
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <span className="md:col-span-1 flex items-center gap-1.5 text-sm font-medium text-zinc-900 md:justify-end md:pt-2">
                    <span className="md:sr-only">Ver detalle</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/row:translate-x-1 group-hover/row:-translate-y-1" />
                  </span>
                </div>
              </li>
            ))}
          </ul>

        </div>

      </div>

      {/* MODAL DE GALERÍA */}
      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[500] bg-zinc-950/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <Dialog.Content
            className={`fixed left-1/2 top-1/2 z-[510] w-[94vw] ${
              active?.gallery?.length ? "max-w-6xl" : "max-w-2xl"
            } max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900/60 backdrop-blur-2xl text-zinc-50 shadow-2xl ring-1 ring-white/15 border border-white/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95`}
            aria-describedby={undefined}
          >
            <Dialog.Close
              className="absolute top-4 right-4 z-20 rounded-full p-2 text-zinc-400 hover:text-zinc-50 hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {/* Cuerpo: texto a la izquierda, carousel a la derecha (apilado en móvil) */}
            <div
              className={`grid grid-cols-1 gap-8 lg:gap-10 p-6 md:p-8 lg:p-10 items-center ${
                // Las capturas son apaisadas: se les da más ancho que al texto
                active?.gallery?.length ? "lg:grid-cols-[minmax(0,1fr)_1.35fr]" : ""
              }`}
            >

              {/* Columna izquierda: info */}
              <div className="flex flex-col">
                <p className="text-xs font-medium tracking-wide text-zinc-400 mb-2 pr-10">
                  {active?.category}
                </p>
                <Dialog.Title className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-5">
                  {active?.client}
                </Dialog.Title>

                <p className="text-base text-zinc-300 leading-relaxed mb-7 text-justify [text-wrap:pretty] hyphens-auto whitespace-pre-line">
                  {active?.detail ?? active?.description}
                </p>

                {active?.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start rounded-full bg-zinc-50 text-zinc-950 px-5 py-3 text-sm font-semibold hover:bg-zinc-300 transition-colors"
                  >
                    Ver web del proyecto
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