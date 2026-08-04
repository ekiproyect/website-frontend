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

### Animaciones (stack pesado, intencional)
GSAP + `@gsap/react` (`useGSAP`) es lo principal para animaciones de página (ver `Contact.tsx` como referencia del patrón timeline). También hay `framer-motion`/`motion` y Three.js (`three` + `@react-three/fiber` + `@react-three/drei`) para 3D — único uso real: `Logo3D.tsx`, montado dentro de `RotatingTitleHero`.

### UI / componentes
- shadcn/ui en `src/components/ui/` (config en `components.json`, baseColor slate, CSS variables, alias `@/`). Registry de Aceternity configurado (`@aceternity`) pero sin componentes instalados actualmente. UI activa: `button`, `toast`/`toaster`, `sonner`, `tooltip`.
- Componentes de sección propios directamente en `src/components/` (`HeroScroll`, `ServicesScroll`, `ProcessSection`, `StackingCards`, `MinimalTeam`, `Footer`, etc.); subcarpetas `home/` y `navegation/`.
- `cn()` helper en `src/lib/utils.ts`. Alias `@` → `./src`.
- **Títulos grandes de una sola palabra: usar `.fluid-display` + `.fluid-word` (`src/index.css`), nunca `text-[Nvw]`.** `vw` mide el viewport completo e ignora el padding del contenedor, así que el texto se desborda en móvil — ya pasó tres veces (menú de `FloatingNav`, `ProjectsIntro`, `NotFound`). El utilitario mide con `cqi` (ancho del contenedor) y el padding queda descontado solo. Se configura con `--display-chars` (nº de letras) y `--display-max` (techo). El estimador por defecto (`chars × 1.18`) es un promedio calibrado para MAYÚSCULAS; se sobrescribe con `--display-em` (ancho real en em) en dos casos: **obligatorio** en Title Case y dígitos, donde el modelo está equivocado; **opcional** en mayúsculas con muchas letras angostas (I/J/L/T, puntos), donde achica hasta un 24%. El comentario del utilitario explica cómo medirlo y por qué el valor queda atado al texto exacto.
- Fuentes: `Space Grotesk` (sans), `Syne` (heading), `Playfair Display` (accent). Colores vía CSS variables HSL en `src/index.css` (más tokens custom `tech-blue`/`tech-purple`).

### Formulario de contacto
`src/pages/Contact.tsx` postea directo a Formspree (`FORMSPREE_ENDPOINT`). No hay API backend. La transición form → mensaje de éxito se anima con GSAP según el estado.

**Invariante: `/contacto` no scrollea en desktop.** La sección debe caber entera en el viewport en `lg+` (≥1024px de ancho) hasta 700px de alto. Para lograrlo, todo el espaciado vertical de la página es fluido: sale de las variables de la utilidad `.contact-fit` en `src/index.css`, que las ata a `vh` con `clamp()`. Al agregar o agrandar cualquier elemento de esa página hay que rehacer el presupuesto vertical — el que manda es la columna derecha (el formulario), no la izquierda. El caso más apretado es 1024x700, donde los 4 chips de servicio envuelven en 3 filas. A propósito **no** se usa `overflow-hidden`: si alguien tiene zoom o fuente grande del sistema, el scroll es preferible a cortar contenido.

## Build y deploy

- `vite.config.ts` define `manualChunks` para separar vendors grandes (gsap, react, radix ui, icons). Al agregar libs pesadas, considerar agregarlas a un chunk.
- `postbuild` corre `scripts/build-routes.mjs`, que genera un HTML por ruta (`dist/proyectos/index.html`, etc.) con su propio title/description/canonical/OG y un `<h1>` de respaldo. Necesario porque los crawlers sociales (LinkedIn, WhatsApp, X) no ejecutan JS y solo leen el HTML estático. También emite `404.html` (con `noindex`), `sitemap.xml` y `.nojekyll`.
- **La metadata por ruta vive en el array `ROUTES` de `scripts/build-routes.mjs`** — es la fuente de verdad, junto con `src/App.tsx`. Al agregar una página hay que registrarla en ambos. El sitemap se genera desde ahí (no existe `public/sitemap.xml`).
- `index.html` tiene marcadores `<!-- ROUTE-META:START/END -->` y `<!-- ROUTE-FALLBACK:START/END -->` que el script reemplaza. Si se renombran o borran, el build falla con un error explícito.
- El respaldo estático oculta su texto con un script inline (corre durante el parseo, antes del primer pintado) y deja solo un fondo del color que pinta esa ruta al montar — así no hay flash. Ese color vive en `backdrop` dentro de `ROUTES` y **debe seguir al fondo real del componente**: `DARK_SURFACE` = `bg-zinc-950` (IntroOverlay, Contact), `LIGHT_SURFACE` = `bg-zinc-50` (AboutIntro, ProjectsIntro, HeroScroll). Si cambia el fondo de una página, actualizar ahí.
- El script inline lee `sessionStorage['eki_intro_done']` (el `INTRO_KEY` de `src/pages/Home.tsx`) porque la home arranca oscura con el intro pero clara si ya se vio. Si se renombra esa clave, el fondo del respaldo deja de coincidir en la segunda visita — no rompe nada, solo reaparece el flash.
- Ojo al verificar en local: `npm run preview` reescribe todas las URLs a `index.html` (modo SPA de Vite), así que **no** refleja el comportamiento de GitHub Pages. Para probar las rutas estáticas: `cd dist && python3 -m http.server`.
- `.github/workflows/pages.yml`: build + deploy a GitHub Pages en push a **master**.
- `.github/workflows/commits.yml`: corre `prettier --write` y auto-commitea en push a **main** (ojo: branch distinto al de deploy).

## Notas

- `AUDITORIA.md` contiene una auditoría del proyecto; consultar para contexto histórico.
- `lovable-tagger` (`componentTagger`) solo se activa en modo development — el proyecto fue iniciado con Lovable.
