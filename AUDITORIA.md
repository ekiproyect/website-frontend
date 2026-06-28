# 🔍 Auditoría — EKI Website Frontend

> **Fecha:** 28 de Junio, 2026
> **Rama:** `vicente`
> **Stack:** React 18 + Vite + TypeScript + TailwindCSS + shadcn/ui
> **Deploy:** GitHub Pages (estático) — `www.ekiproject.cl`

---

## 📐 Estructura real

Fuente de verdad: `src/App.tsx`. Solo 4 rutas activas, paths en español.

```
App.tsx
├── ErrorBoundary              ← captura de errores global (class component)
└── BrowserRouter
    └── SmoothScroll           ← Lenis (scroll suave global)
        └── TooltipProvider
            ├── Toaster + Sonner   ← notificaciones
            ├── ScrollToTop        ← reset de scroll en cambio de ruta
            └── Suspense (lazy)
                └── Routes
                    ├── /          → Home.tsx
                    ├── /equipo    → About.tsx
                    ├── /proyectos → Projects.tsx
                    ├── /contacto  → Contact.tsx
                    └── *          → NotFound.tsx
```

Páginas cargadas con `lazy()` + `<Suspense>`. Navegación entre rutas vía `FloatingNav`.

---

## 🧩 Infraestructura global

| Componente | Archivo | Rol |
|---|---|---|
| `ErrorBoundary` | `components/ErrorBoundary.tsx` | Class component. Captura errores del árbol y muestra fallback con botones "Recargar" / "Inicio". `console.error` del error. |
| `SmoothScroll` | `components/SmoothScroll.tsx` | Envuelve la app con Lenis (`@studio-freight/react-lenis`) para scroll suave global. |
| `ScrollToTop` | `components/ScrollToTop.tsx` | Resetea scroll al top en cada cambio de ruta. |
| `FloatingNav` | `components/navegation/FloatingNav.tsx` | Navegación flotante. 4 links de ruta: Inicio `/`, Proyectos `/proyectos`, Equipo `/equipo`, Contacto `/contacto`. Prop `introDone`. |

`main.tsx` además fuerza scroll al top de forma agresiva (`scrollRestoration = 'manual'` + varios `scrollTo`) para evitar restauración del navegador.

---

## 📄 Páginas

### `Home` (`/`) — `pages/Home.tsx`
Maneja overlay de intro (`introDone`) y monta la experiencia de scroll.

| Componente | Archivo |
|---|---|
| `IntroOverlay` | `components/home/IntroOverlay.tsx` — splash inicial, `onFinish` |
| `FloatingNav` | navegación |
| `HeroScroll` | `components/HeroScroll.tsx` — contenedor de toda la experiencia scroll |

**`HeroScroll`** (GSAP + ScrollTrigger) compone, en orden:
`RotatingTitleHero` → `ServicesScroll` → `TechMarquee` → `StackingCards` → `ProcessSection` → `ProjectsVideoSection` → `ProjectsCarousel` → `Footer`.

`RotatingTitleHero` monta `Logo3D` (Three.js / `@react-three/fiber` + `drei`, modelo GLTF) — **único uso real de Three.js en el proyecto**.

### `About` (`/equipo`) — `pages/About.tsx`
`FloatingNav` → `AboutIntro` → `MinimalTeam` → `Footer startsDark`.

### `Projects` (`/proyectos`) — `pages/Projects.tsx`
`FloatingNav` → `ProjectsIntro` → `ProjectsGrid` → `Footer`.

### `Contact` (`/contacto`) — `pages/Contact.tsx`
Formulario que postea a **Formspree** (`https://formspree.io/f/xyknjbgr`). Sin backend. Estados `idle | sending | sent | error | invalid`; transición form → éxito animada con GSAP (`useGSAP`). `FloatingNav` + `Footer`.

### `NotFound` (`*`) — `pages/NotFound.tsx`
404 animada con GSAP. Link de retorno a `/`.

---

## 🎨 UI (shadcn/ui)

`src/components/ui/`. Base Radix. Activos: `button`, `card`, `toast`/`toaster`, `sonner`, `tooltip`.
Configurado registry de Aceternity (`components.json`). Fuentes: Space Grotesk (sans), Syne (heading), Playfair Display (accent). Colores vía CSS variables HSL en `index.css`.

---

## ⚙️ Build / Deploy

- `vite.config.ts`: `manualChunks` separa vendors (gsap, react, radix-ui, icons). Dev server puerto 8080 (strict).
- `postbuild`: copia `dist/index.html` → `dist/404.html` + crea `.nojekyll` → fallback SPA de GitHub Pages. **No borrar.**
- `.github/workflows/pages.yml`: build + deploy en push a `master`.
- `.github/workflows/commits.yml`: prettier + auto-commit en push a `main` (⚠️ branch distinto al de deploy).

---

## ⚠️ Deuda técnica

### 🔴 Crítico
1. **Bundle de Home: 984 KB (gzip 269 KB).** `dist/assets/Home-*.js` en un solo chunk (Three.js + GSAP + todas las secciones). Mayor problema de performance. Considerar lazy-load de `Logo3D`/secciones pesadas.

### 🟠 Alto
2. **`npm audit`: 16 vulnerabilidades (7 high).** Vite (path traversal, file read vía WebSocket — solo dev server, riesgo real bajo en deploy estático), react-router, yaml. `npm audit fix` disponible.
3. **3 errores de lint** (`npm run lint`):
   - `home/ProjectsCarousel.tsx:117` — bloque vacío (`no-empty`)
   - `home/ProjectsCarousel.tsx:228` — `as any` (`no-explicit-any`)
   - `tailwind.config.ts:102` — `require()` prohibido (`no-require-imports`)

### 🟡 Medio
4. ~~**Archivos huérfanos** + cascadas~~ — ✅ **Resuelto** (2026-06-28): eliminados 19 archivos. Páginas sin ruta (`Team`, `Technologies`, `Services`), `TeamMemberSection`, `StoryReveal`, `Header`, `ScrollProgressBar`, `hooks/use-mobile`, `ui/{card,card-spotlight,glowing-effect,meteors,vortex}` y `src/assets/` completo (6 jpg). Re-escaneo final: 0 huérfanos. No existía carpeta de frames `.webp` en `public/` (los cargaba data de `Team.tsx`).
5. ~~**Dos lockfiles** (`bun.lockb` + `package-lock.json`)~~ — ✅ **Resuelto** (2026-06-28): eliminado `bun.lockb`; CI usa npm.
6. **`@tanstack/react-query`** en dependencias sin uso real de fetch (peso muerto).
7. **2 warnings de Tailwind** en build: clases ambiguas `duration-[600ms]`, `ease-[cubic-bezier(...)]`.

### 🟢 OK
- Build compila limpio; postbuild correcto.
- Code-splitting por ruta funcionando (lazy + manualChunks).
- `console.error` solo en `ErrorBoundary` y `TeamMemberSection` (logging de error legítimo).
- Datos (proyectos, servicios, equipo) hardcodeados en componentes — esperable para landing estática sin CMS.
