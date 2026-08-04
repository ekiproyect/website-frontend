"use client";

import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Reposo antes de compactar la cabecera. */
const HOLD_MS = 700;

interface ShowcaseSectionProps<T> {
  /** Texto del título monumental. Una sola palabra: se anima como bloque. */
  title: string;
  /**
   * Ancho del título en em, medido sobre Syne 800 con tracking-tighter.
   * Se usa para que nunca desborde en la fase grande. Medir con:
   * sum(advanceWidth)/unitsPerEm − 0.05 × nChars, y dejar ~5% de margen.
   */
  titleDisplayEm: number;
  subtitle: string;
  items: readonly T[];
  /** Clave estable por item, para el `key` de React y de Embla. */
  itemKey: (item: T, index: number) => string;
  /**
   * Cómo se reparten los items en el espacio sobrante.
   *
   * - `carousel`: pista horizontal desplazable. Las tarjetas se dimensionan por
   *   ALTURA (ver `cardAspect`), así que en pantallas bajas se ven menos.
   * - `grid`: todos a la vez, sin desplazamiento. La grilla reparte el espacio y
   *   la tarjeta se adapta, así que aquí `cardAspect` no aplica: el medio debe
   *   ser `flex-1 min-h-0` y recortar con `object-cover`. Es lo que garantiza
   *   que quepa sin scroll en cualquier viewport, a costa de que la proporción
   *   de la foto varíe con la pantalla.
   */
  layout?: "carousel" | "grid";
  /**
   * Solo en `carousel`. Proporción de la tarjeta: EL ANCHO SALE DEL ALTO, así
   * que este valor determina cuántas caben. Se calcula desde el medio visual:
   * ancho = ratioDelMedio · fracciónDeAltoQueOcupa · alto.
   */
  cardAspect?: string;
  renderCard: (item: T, index: number) => ReactNode;
  /** Etiqueta de los puntos de navegación, p. ej. "proyecto" o "integrante". */
  itemNoun: string;
}

/**
 * Sección a pantalla completa con cabecera de dos fases y carrusel.
 *
 * La comparten /proyectos y /equipo. Vive extraída porque concentra varios
 * detalles que costaron encontrar y que es fácil reintroducir mal al copiar:
 * dónde va el objetivo del Flip, dónde van `leading` y `tracking`, por qué las
 * tarjetas se dimensionan por altura y por qué nada aquí puede llevar un fondo
 * claro fijo.
 */
export function ShowcaseSection<T>({
  title,
  titleDisplayEm,
  subtitle,
  items,
  itemKey,
  layout = "carousel",
  cardAspect,
  renderCard,
  itemNoun,
}: ShowcaseSectionProps<T>) {
  const isGrid = layout === "grid";

  // "intro": título monumental centrado, como las demás secciones.
  // "compact": cabecera reducida a la izquierda y carrusel a la vista.
  const [phase, setPhase] = useState<"intro" | "compact">(
    prefersReducedMotion() ? "compact" : "intro"
  );

  const headerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Gesto lateral del trackpad. El plugin detecta el eje dominante de cada
  // gesto: solo se queda con los horizontales y deja pasar los verticales, que
  // son los que Lenis necesita para seguir scrolleando la página hacia el
  // footer. Por eso NO se usa `forceWheelAxis`, que secuestraría también el
  // scroll vertical, ni `data-lenis-prevent`, que lo mataría por completo
  // mientras el puntero esté sobre el carrusel.
  //
  // Memoizado: recrear el array en cada render reinicia Embla y corta el gesto
  // a media inercia.
  const plugins = useMemo(() => (isGrid ? [] : [WheelGesturesPlugin()]), [isGrid]);
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" }, plugins);
  const [selected, setSelected] = useState(0);
  // Cuántas posiciones de scroll hay. Si es 1, todo cabe y los controles
  // sobran: en /equipo las 4 tarjetas entran de una en pantallas anchas y
  // quedaban puntos y flechas muertos.
  const [snaps, setSnaps] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      setSelected(embla.selectedScrollSnap());
      setSnaps(embla.scrollSnapList().length);
    };
    embla.on("select", sync);
    embla.on("reInit", sync);
    sync();
    return () => {
      embla.off("select", sync);
      embla.off("reInit", sync);
    };
  }, [embla]);

  // Salta la presentación a la primera interacción: quien vuelve a la sección
  // no debería esperar. `canSkip` se apaga al terminar, para que los listeners
  // se desmonten y no queden llamando a GSAP en cada rueda del resto de la vida
  // de la página.
  const [canSkip, setCanSkip] = useState(!prefersReducedMotion());

  const skip = useCallback(() => {
    if (timelineRef.current) timelineRef.current.progress(1);
    else setPhase("compact");
    setCanSkip(false);
  }, []);

  useEffect(() => {
    if (!canSkip) return;
    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", skip, opts);
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [canSkip, skip]);

  // Arranca el paso a compacto tras el reposo. La intro es solo el título: el
  // subtítulo no existe hasta la fase compacta, donde entra con un fundido.
  useEffect(() => {
    if (phase !== "intro") return;
    const t = window.setTimeout(() => {
      const header = headerRef.current;
      if (header) {
        flipStateRef.current = Flip.getState(header.querySelectorAll("[data-flip-part]"));
      }
      setPhase("compact");
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    flipStateRef.current = null;
    if (phase !== "compact" || !state) return;

    // `scale: true` escala por transform en vez de font-size: sin reflow y sin
    // texto borroso a media transición.
    const tl = Flip.from(state, {
      duration: 0.9,
      ease: "power3.inOut",
      scale: true,
      nested: true,
      onComplete: () => setCanSkip(false),
    });
    tl.fromTo(
      "[data-subtitle]",
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
      0.35
    );
    // Entra tarde a propósito: si arranca antes, el título le pasa por encima
    // mientras viaja y se lee como un choque en vez de una secuencia.
    // La grilla entra subiendo y el carrusel entrando por la derecha: el
    // desplazamiento lateral solo se lee como "hay más a un lado" cuando de
    // verdad lo hay.
    tl.fromTo(
      "[data-items]",
      isGrid ? { autoAlpha: 0, y: 28 } : { autoAlpha: 0, x: 60 },
      isGrid
        ? { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }
        : { autoAlpha: 1, x: 0, duration: 0.65, ease: "power3.out" },
      0.5
    );
    timelineRef.current = tl;
    return () => { tl.kill(); timelineRef.current = null; };
  }, [phase, isGrid]);

  const isIntro = phase === "intro";
  const showControls = snaps > 1;

  return (
    // NINGÚN DESCENDIENTE PUEDE LLEVAR UN FONDO CLARO FIJO: el Footer monta
    // `useScrollDarken`, que funde a negro el backgroundColor de esta sección.
    // Solo interpola el de la sección, así que cualquier fondo anidado se queda
    // claro y dibuja un rectángulo brillante sobre lo ya oscurecido.
    // El alto se fija en `carousel` siempre, pero en `grid` solo desde `lg`: con
    // 4 tarjetas en dos filas dentro de un móvil, forzar 100svh dejaba las fotos
    // apaisadas (165x146 en un 390x844, y 165x68 en un 390x667). Ahí es
    // preferible que la página scrolle un poco y que las caras se vean.
    <section
      data-showcase
      className={`relative w-full flex flex-col bg-zinc-50 text-zinc-900 px-5 md:px-8 pt-[max(5.5rem,12vh)] pb-[max(2rem,5vh)] overflow-hidden ${
        isGrid ? "min-h-[100svh] lg:h-[100svh]" : "h-[100svh]"
      }`}
    >
      <div
        ref={headerRef}
        className={`w-full max-w-[1600px] mx-auto shrink-0 ${
          isIntro
            ? "flex-1 flex flex-col items-center justify-center text-center"
            : "flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-10 mb-6 md:mb-10"
        }`}
      >
        {/* El Flip va sobre el <span>, no sobre el <h1>: el h1 es `w-full` en
            intro y `w-auto` en compacto, así que su caja cambia de proporción y
            Flip lo estiraba (scaleX 3.56 contra scaleY 2.55). El span se ciñe al
            texto en las dos fases, de modo que ancho y alto escalan igual.

            `leading` y `tracking` van en el SPAN, no en el h1. En el h1 fallaban
            por dos motivos: en intro el h1 tiene font-size 16px (el tamaño lo
            pone el span), así que `tracking-tighter` valía -0.8px en vez de
            -6.8px; y en compacto `text-5xl` trae su propio `line-height: 1` que
            pisaba al `leading-[0.9]`. En el span ambas se resuelven contra el
            tamaño real y escalan en proporción.

            En compacto NO puede usarse `fluid-display`/`fluid-word`: esa utilidad
            aplica `container-type: inline-size`, y con `w-auto` dentro de un flex
            el h1 colapsa a 0, y con él los `96cqi` del cálculo. */}
        <h1
          className={
            isIntro
              ? "fluid-display font-black font-heading uppercase w-full"
              : "font-black font-heading uppercase text-4xl md:text-5xl shrink-0"
          }
        >
          {/* Un único span con la clase alternada, no dos ramas: Flip necesita
              que sea el MISMO nodo entre fases para poder seguirlo.
              `inline-block` en compacto porque los transforms no se aplican a
              elementos inline. */}
          <span
            data-flip-part
            className={`leading-[0.9] tracking-tighter ${isIntro ? "fluid-word mx-auto" : "inline-block"}`}
            style={
              isIntro
                ? {
                    ["--display-em" as string]: titleDisplayEm,
                    ["--display-max" as string]: "8.5rem",
                  }
                : undefined
            }
          >
            {title}
          </span>
        </h1>

        {/* Solo en compacto: la intro es únicamente el título. No se renderiza
            oculto en intro porque ocuparía sitio en la columna centrada y
            descuadraría el título. */}
        {!isIntro && (
          <p
            data-subtitle
            className="font-medium tracking-tight text-sm md:text-base leading-relaxed text-zinc-500 max-w-md md:text-right"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* GRILLA — todos los items a la vez, sin desplazamiento. Reparte la
          altura sobrante en filas iguales (`grid-rows-*` explícito: sin él las
          filas se dimensionan por contenido y se desbordan) y cada celda es
          `min-h-0` para que el medio pueda encogerse dentro. Así la sección cabe
          sin scroll en cualquier viewport; lo que cede es la proporción de la
          foto, que el `object-cover` recorta. */}
      {!isIntro && isGrid && (
        <div
          data-items
          className="flex-1 lg:min-h-0 w-full max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-1 gap-x-5 gap-y-6 md:gap-x-8"
        >
          {items.map((item, index) => (
            <div key={itemKey(item, index)} className="group min-h-0 flex flex-col">
              {renderCard(item, index)}
            </div>
          ))}
        </div>
      )}

      {/* CARRUSEL — toma toda la altura sobrante. Las tarjetas son `h-full` con
          un aspect fijo, así que EL ANCHO SALE DEL ALTO: la sección cabe sin
          scroll en cualquier pantalla, y en las bajas simplemente se ven menos
          tarjetas a la vez. */}
      {!isIntro && !isGrid && (
        <div data-items className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto flex flex-col">
          {/* Sangra hasta el borde de la pantalla: `calc(50% - 50vw)` es la
              distancia del borde derecho del contenedor centrado al del
              viewport. Así la tarjeta la corta la pantalla y no el límite
              invisible del max-w. El `overflow-hidden` de la sección absorbe
              cualquier desajuste por la barra de scroll. El borde IZQUIERDO no
              se toca, para que la primera tarjeta siga alineada con el título. */}
          <div className="flex-1 min-h-0 overflow-hidden mr-[calc(50%-50vw)]" ref={emblaRef}>
            <div className="flex h-full gap-5 md:gap-8">
              {items.map((item, index) => (
                <div
                  key={itemKey(item, index)}
                  className="group h-full flex-[0_0_auto] flex flex-col"
                  style={{ aspectRatio: cardAspect }}
                >
                  {renderCard(item, index)}
                </div>
              ))}
            </div>
          </div>

          {/* Ocultos si todo cabe: si no hay más de una posición de scroll, los
              puntos y las flechas no llevan a ninguna parte. */}
          {showControls && (
            <div className="shrink-0 flex items-center justify-between pt-5">
              <div className="flex gap-2">
                {Array.from({ length: snaps }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => embla?.scrollTo(i)}
                    aria-label={`Ir al ${itemNoun} ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === selected ? "w-6 bg-zinc-900" : "w-2 bg-zinc-900/20 hover:bg-zinc-900/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => embla?.scrollPrev()}
                  aria-label={`${itemNoun} anterior`}
                  className="grid place-items-center w-10 h-10 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => embla?.scrollNext()}
                  aria-label={`${itemNoun} siguiente`}
                  className="grid place-items-center w-10 h-10 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/5 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
