# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Proyecto

Sitio web de **EKI** (consultora de software). SPA estática: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui. Sin backend propio — el formulario de contacto envía a Formspree. Se despliega como sitio estático en GitHub Pages bajo el dominio `www.ekiproject.cl` (ver `CNAME`).

## Comandos

```bash
npm run dev        # Dev server en http://localhost:8080 (strictPort, no abre browser)
npm run build      # Build de producción a dist/ (corre postbuild automáticamente)
npm run build:dev  # Build en modo development (mantiene componentTagger de Lovable)
npm run preview    # Previsualizar el build (puerto 8080)
npm run lint       # ESLint sobre todo el repo
```

No hay suite de tests configurada. Gestor de paquetes: **npm** (`package-lock.json`); el CI usa `npm ci`.

## Arquitectura

### Routing (fuente de verdad: `src/App.tsx`, NO el README)
El README lista rutas que ya no existen. Las rutas reales son solo 4, con paths en español:
- `/` → `Home`
- `/equipo` → `About`
- `/proyectos` → `Projects`
- `/contacto` → `Contact`
- `*` → `NotFound`

Las páginas se cargan con `lazy()` + `<Suspense>`. Al agregar una página, registrarla en `App.tsx` y mantener el patrón lazy.

### Composición de la app (`App.tsx`)
Orden de providers, de afuera hacia adentro: `ErrorBoundary` → `BrowserRouter` → `SmoothScroll` (Lenis) → `TooltipProvider` → Toasters (`Toaster` de shadcn + `Sonner`) → `ScrollToTop` → `Suspense`/`Routes`.

### Scroll
- `SmoothScroll` envuelve todo con Lenis (`@studio-freight/react-lenis`) para scroll suave.
- `main.tsx` fuerza scroll al top de forma agresiva (`scrollRestoration = 'manual'` + varios `scrollTo`) para evitar restauración del navegador.
- `ScrollToTop` resetea scroll en cada cambio de ruta.

### Secciones showcase (`/proyectos` y `/equipo`)
Las dos páginas comparten `src/components/showcase/ShowcaseSection.tsx`: cabecera de dos fases más los items debajo, todo dentro del viewport (el `Footer` queda debajo). `ProjectsShowcase` y `TeamShowcase` solo aportan datos y la tarjeta, vía `renderCard`. Está extraído a propósito: concentra varios detalles que es fácil reintroducir mal al copiar.

**Prop `layout`: `carousel` (proyectos) o `grid` (equipo).** Son dos formas distintas de repartir el espacio sobrante, y la diferencia manda sobre cómo se dimensiona la tarjeta:

- **`carousel`** — pista horizontal desplazable. **Las tarjetas se dimensionan por altura, no por ancho:** la pista toma la altura sobrante (`flex-1 min-h-0`), cada tarjeta es `h-full` con un `aspectRatio` fijo, así que **el ancho sale del alto**. Por eso cabe en cualquier pantalla sin `clamp()`+`vh` como en Contacto: en pantallas bajas simplemente se ven menos tarjetas. El aspect sale de `ancho = ratioDelMedio · fracciónDeAltoQueOcupa · alto` — `32/25` en proyectos (imagen 16:10). **Si cambia el aspect del medio, hay que recalcular el de la tarjeta.** `cardAspect` solo aplica aquí. **La tarjeta lleva además un techo de `max-w-[84vw]`**, y es lo que hace responsive al carrusel: dimensionar por altura funciona mientras la pantalla sea más ancha que alta, pero en un móvil se da la vuelta y la tarjeta salía más ancha que el viewport (635px en un 390, 806 en un iPad de 768), así que solo se veía media tarjeta cortada por el borde. El techo solo muerde en pantallas altas y estrechas; desde 1024x700 manda el alto. Cuando muerde, la tarjeta sigue midiendo todo el alto de la pista pero su contenido ya no lo llena, así que **la ficha va `shrink-0` y el `<article>` `justify-center`**: con la ficha en `flex-1` el sobrante se acumulaba entero debajo del texto — 290px de vacío dentro de la tarjeta en un 390x844. **El gesto lateral del trackpad lo mueve**, vía `WheelGesturesPlugin` de `embla-carousel-wheel-gestures`: el plugin se queda con el eje dominante de cada gesto, así que los verticales siguen llegando a Lenis y la página sigue bajando al footer. Por eso no se usa `forceWheelAxis` (secuestraría también el scroll vertical) ni `data-lenis-prevent` (lo mataría mientras el puntero esté sobre el carrusel). El array de plugins va memoizado: recrearlo en cada render reinicia Embla y corta el gesto a media inercia.
- **`grid`** — todos a la vez, sin desplazamiento: son 4 personas y son el equipo entero, esconder la mitad tras una flecha no aportaba nada. 4 columnas en `lg+`, 2×2 debajo. Aquí `cardAspect` no aplica: la tarjeta se adapta a la celda.

Dos cosas de la grilla que salieron de medir, y que se rompen si se tocan a ojo:

- **La foto lleva `aspect-[3/4]` con `min-h-0`, no `flex-1`.** Dejándola crecer con el alto sobrante quedaba en 0.54–0.60 — una tira vertical que recortaba media cara. Con el aspect fijo se mantiene en 3:4 y el `min-h-0` deja que flex la comprima cuando de verdad falta alto (a 1440x600 baja a 1.14 sin desbordar el texto).
- **El alto se bloquea solo en `lg+`** (`min-h-[100svh] lg:h-[100svh]`). Con `100svh` forzado en móvil, las dos filas dejaban las fotos apaisadas: 165x146 en un 390x844 y 165x68 en un 390x667. Debajo de `lg` la página scrollea un poco y las caras se ven — es el único punto donde se cede la regla de "sin scroll".

Lo que comparten las dos:

1. **La cabecera tiene dos fases** (`intro` centrada y monumental → `compact` a la izquierda) animadas con GSAP Flip. El título **entra** antes (fundido subiendo, `ENTER_S`) y solo después viaja: `HOLD_MS` se calcula desde `ENTER_S` para dejar un respiro entre las dos cosas, porque encadenarlas hacía que el título pareciera no llegar a posarse. Esa entrada va en `useLayoutEffect` (en un `useEffect` se ve el título en su sitio un fotograma antes de saltar al estado inicial) y acaba en `clearProps`, para no dejarle al span un transform propio justo antes de que Flip lo mida. Cuatro trampas más, todas resueltas y todas fáciles de reintroducir:
   - El Flip va sobre el `<span>`, **no** sobre el `<h1>`: el h1 cambia de proporción entre fases y el título se estiraba (scaleX 3.56 contra scaleY 2.55).
   - `leading` y `tracking` van **en el span**. En el h1 fallaban: en intro el h1 mide 16px, así que `tracking-tighter` valía -0.8px en vez de -6.8px; y en compacto `text-5xl` trae su propio `line-height: 1` que pisaba al `leading-[0.9]`.
   - En compacto **no** se puede usar `fluid-display`/`fluid-word`: aplica `container-type: inline-size` y con `w-auto` dentro de un flex el h1 colapsa a 0, y con él los `96cqi`.
   - El subtítulo **no se morfa**, se cruza con un fundido: su texto se re-parte en líneas distintas y Flip solo podría estirar el resultado nuevo.
2. **Ningún descendiente puede llevar un fondo claro fijo.** El `Footer` monta `useScrollDarken`, que funde a negro el `backgroundColor` de la sección anterior. Solo interpola el de la sección: cualquier fondo anidado se queda claro y dibuja un rectángulo brillante sobre lo ya oscurecido. Por eso el hueco de la imagen no tiene fondo, las píldoras usan `bg-zinc-900/5` y el de la foto `bg-zinc-500/10` — translúcidos, se tiñen con lo que tengan detrás.
3. La presentación es saltable con cualquier `pointerdown`/`keydown`/`wheel`; `canSkip` se apaga al terminar para desmontar los listeners.
4. La entrada de los items es lateral en carrusel y vertical en grilla (`[data-items]`): el desplazamiento hacia el lado solo se lee como "hay más a un lado" cuando de verdad lo hay.

**Diferencia entre las tarjetas:** las de proyecto son botones que abren un modal, así que su ficha puede ocultarse hasta el hover — el teclado la revela al enfocar. Las de equipo no abren nada (no hay biografías), así que **el nombre se lee siempre**: ocultarlo dejaría sin acceso a quien navega con teclado, y el hover solo devuelve el color de la foto (`grayscale` → `grayscale-0`, con `scale-105`).

Los datos viven en `projectsData.ts` / `teamData.ts`, el modal en `ProjectDialog.tsx` y su estado en `useProjectDialog.ts` (separado del componente para no romper el fast refresh).

### Overlays y modales
El modal de proyectos (`src/components/projects/ProjectDialog.tsx`) usa **keyframes propios de `tailwind.config.ts`** (`panel-in/out`, `overlay-in/out`, `rise`, `fade`), no las utilidades `animate-in`/`zoom-in-95` de `tailwindcss-animate` — esas son el default de shadcn y no coinciden con el vocabulario del sitio. El easing es `cubic-bezier(0.22, 1, 0.36, 1)`, el mismo del menú móvil. Radix retrasa el desmontaje hasta que termina la animación de salida, así que no hace falta `forceMount`.

**Apertura.** Modal normal: `panel-in` sube 24px con fade y el contenido entra escalonado con `rise`. Los keyframes que animan `transform` llevan el `translate(-50%,-50%)` completo, porque el panel se centra por transform y animarlo lo pisaría. La guarda de `prefers-reduced-motion` en `index.css` solo anula `animation`, nunca `transform`, por la misma razón.

**Las capturas se relevan solas** cada `AUTOPLAY_MS` (3 s) **con un fundido**, no desplazándose. Por eso en el modal **no hay Embla**: al cruzarse una con otra no hay pista que arrastrar ni posición a la que saltar, solo un índice y un `setInterval`. Van APILADAS con `grid` + `[grid-area:1/1]`, que deja que la caja la marque la más alta sin posicionarlas en absoluto ni fijar un alto. El fundido dura 500 ms sobre un ciclo de 3 s: subirlo deja demasiado rato las dos capturas legibles a la vez. Tampoco llevan `loading="lazy"` — están todas en la misma celda desde el principio y una que llegue tarde se vería aparecer a medio fundido.

No hay controles: ni flechas, ni chip, ni puntos, y **el hover tampoco pausa** — se pidió así. El ciclo solo se detiene con `prefers-reduced-motion`, con una sola captura, y mientras el visor ampliado está abierto (si no, al cerrarlo te encontrarías una captura distinta de la que estabas mirando); al cerrarlo sigue. Ese visor es, de hecho, la única forma de parar la rotación para mirar algo con calma.

**Navegación entre proyectos.** El estado del modal es el **índice** dentro de `ALL_PROJECTS`, no el objeto: los `id` de `PROJECTS_DATA` y `REFERENCED_DATA` chocan (ambos numeran 01 y 02). `GalleryCarousel` lleva `key={active.client}` para que Embla se reinicie en la primera captura al cambiar de proyecto.

Cualquier contenedor con scroll propio necesita `data-lenis-prevent` (Lenis corre en modo `root` y captura la rueda de la ventana).

### Animaciones (stack pesado, intencional)
GSAP + `@gsap/react` (`useGSAP`) es lo principal para animaciones de página (ver `Contact.tsx` como referencia del patrón timeline). También hay `framer-motion`/`motion` y Three.js (`three` + `@react-three/fiber` + `@react-three/drei`) para 3D — único uso real: `Logo3D.tsx`, montado dentro de `RotatingTitleHero`.

### UI / componentes
- shadcn/ui en `src/components/ui/` (config en `components.json`, baseColor slate, CSS variables, alias `@/`). Registry de Aceternity configurado (`@aceternity`) pero sin componentes instalados actualmente. UI activa: `button`, `toast`/`toaster`, `sonner`, `tooltip`.
- Componentes de sección propios directamente en `src/components/` (`HeroScroll`, `ServicesScroll`, `ProcessSection`, `StackingCards`, `Footer`, etc.); subcarpetas `home/`, `navegation/`, `projects/`, `team/` y `showcase/`.
- `cn()` helper en `src/lib/utils.ts`. Alias `@` → `./src`.
- **Títulos grandes de una sola palabra: usar `.fluid-display` + `.fluid-word` (`src/index.css`), nunca `text-[Nvw]`.** `vw` mide el viewport completo e ignora el padding del contenedor, así que el texto se desborda en móvil — ya pasó tres veces (menú de `FloatingNav`, la intro de proyectos —hoy el título de `ShowcaseSection`— y `NotFound`). El utilitario mide con `cqi` (ancho del contenedor) y el padding queda descontado solo. Se configura con `--display-chars` (nº de letras) y `--display-max` (techo). El estimador por defecto (`chars × 1.18`) es un promedio calibrado para MAYÚSCULAS; se sobrescribe con `--display-em` (ancho real en em) en dos casos: **obligatorio** en Title Case y dígitos, donde el modelo está equivocado; **opcional** en mayúsculas con muchas letras angostas (I/J/L/T, puntos), donde achica hasta un 24%. El comentario del utilitario explica cómo medirlo y por qué el valor queda atado al texto exacto.
- Fuentes: `Space Grotesk` (sans), `Syne` (heading), `Playfair Display` (accent). Colores vía CSS variables HSL en `src/index.css` (más tokens custom `tech-blue`/`tech-purple`).

### Formulario de contacto
`src/pages/Contact.tsx` postea directo a Formspree (`FORMSPREE_ENDPOINT`). No hay API backend. La transición form → mensaje de éxito se anima con GSAP según el estado.

**Invariante: `/contacto` no scrollea en desktop.** La sección debe caber entera en el viewport en `lg+` (≥1024px de ancho) hasta 700px de alto. Para lograrlo, todo el espaciado vertical de la página es fluido: sale de las variables de la utilidad `.contact-fit` en `src/index.css`, que las ata a `vh` con `clamp()`. Al agregar o agrandar cualquier elemento de esa página hay que rehacer el presupuesto vertical — el que manda es la columna derecha (el formulario), no la izquierda. El caso más apretado es 1024x700, donde los 4 chips de servicio envuelven en 3 filas. A propósito **no** se usa `overflow-hidden`: si alguien tiene zoom o fuente grande del sistema, el scroll es preferible a cortar contenido.

## Build y deploy

- `vite.config.ts` define `manualChunks` para separar vendors grandes (gsap, react, radix ui, icons). Al agregar libs pesadas, considerar agregarlas a un chunk.
- `postbuild` corre `scripts/build-routes.mjs`, que genera un HTML por ruta (`dist/proyectos/index.html`, etc.) con su propio title/description/canonical/OG y un `<h1>` de respaldo. Necesario porque los crawlers sociales (LinkedIn, WhatsApp, X) no ejecutan JS y solo leen el HTML estático. También emite `404.html` (con `noindex`), `sitemap.xml` y `.nojekyll`.
- **La metadata por ruta vive en el array `ROUTES` de `scripts/build-routes.mjs`** — es la fuente de verdad, junto con `src/App.tsx`. Al agregar una página hay que registrarla en ambos. El sitemap se genera desde ahí (no existe `public/sitemap.xml`).
- `index.html` tiene marcadores `<!-- ROUTE-META:START/END -->` y `<!-- ROUTE-FALLBACK:START/END -->` que el script reemplaza. Si se renombran o borran, el build falla con un error explícito.
- El respaldo estático oculta su texto con un script inline (corre durante el parseo, antes del primer pintado) y deja solo un fondo del color que pinta esa ruta al montar — así no hay flash. Ese color vive en `backdrop` dentro de `ROUTES` y **debe seguir al fondo real del componente**: `DARK_SURFACE` = `bg-zinc-950` (IntroOverlay, Contact), `LIGHT_SURFACE` = `bg-zinc-50` (`ShowcaseSection`, que pinta `/proyectos` y `/equipo`, y `HeroScroll`). Si cambia el fondo de una página, actualizar ahí.
- El script inline lee `sessionStorage['eki_intro_done']` (el `INTRO_KEY` de `src/pages/Home.tsx`) porque la home arranca oscura con el intro pero clara si ya se vio. Si se renombra esa clave, el fondo del respaldo deja de coincidir en la segunda visita — no rompe nada, solo reaparece el flash.
- Ojo al verificar en local: `npm run preview` reescribe todas las URLs a `index.html` (modo SPA de Vite), así que **no** refleja el comportamiento de GitHub Pages. Para probar las rutas estáticas: `cd dist && python3 -m http.server`.
- `.github/workflows/pages.yml`: build + deploy a GitHub Pages en push a **master**.
- `.github/workflows/commits.yml`: corre `prettier --write` y auto-commitea en push a **main** (ojo: branch distinto al de deploy).

## Notas

- `AUDITORIA.md` contiene una auditoría del proyecto; consultar para contexto histórico.
- `lovable-tagger` (`componentTagger`) solo se activa en modo development — el proyecto fue iniciado con Lovable.
