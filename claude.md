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
- Fuentes: `Space Grotesk` (sans), `Syne` (heading), `Playfair Display` (accent). Colores vía CSS variables HSL en `src/index.css` (más tokens custom `tech-blue`/`tech-purple`).

### Formulario de contacto
`src/pages/Contact.tsx` postea directo a Formspree (`FORMSPREE_ENDPOINT`). No hay API backend. La transición form → mensaje de éxito se anima con GSAP según el estado.

## Build y deploy

- `vite.config.ts` define `manualChunks` para separar vendors grandes (gsap, react, radix ui, icons). Al agregar libs pesadas, considerar agregarlas a un chunk.
- `postbuild` (en `package.json`) copia `dist/index.html` → `dist/404.html` y crea `.nojekyll`. Esto es el fallback SPA de GitHub Pages — necesario para que el routing client-side funcione en rutas profundas. No borrar.
- `.github/workflows/pages.yml`: build + deploy a GitHub Pages en push a **master**.
- `.github/workflows/commits.yml`: corre `prettier --write` y auto-commitea en push a **main** (ojo: branch distinto al de deploy).

## Notas

- `AUDITORIA.md` contiene una auditoría del proyecto; consultar para contexto histórico.
- `lovable-tagger` (`componentTagger`) solo se activa en modo development — el proyecto fue iniciado con Lovable.
