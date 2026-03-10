# 🔍 Auditoría de Componentes — EKI Landing

> **Fecha:** 3 de Marzo, 2026  
> **Rama:** `vicente`  
> **Framework:** React + Vite + TypeScript + TailwindCSS

---

## 📐 Estructura General

```
App.tsx
├── LoadingScreen          ← Splash screen inicial
├── ErrorBoundary          ← Wrapper global de errores
└── BrowserRouter
    ├── HamburgerMenu      ← Navegación global (siempre visible)
    └── Routes
        ├── /              → Home.tsx
        ├── /about         → About.tsx
        ├── /team          → Team.tsx
        ├── /projects      → Projects.tsx
        ├── /services      → Services.tsx
        └── /technologies  → Technologies.tsx
```

---

## 🧩 Componentes Globales (Layout / Infraestructura)

### `LoadingScreen`
**Archivo:** `src/components/LoadingScreen.tsx`  
**Descripción:** Splash screen que bloquea la UI durante la carga inicial.

| Propiedad | Detalle |
|---|---|
| **Animación** | GSAP — fade in del logo con `back.out`, fade out en capas |
| **Progress** | Barra circular SVG + barra horizontal lineal (backup visual) |
| **Duración** | Configurable: `minimumDuration` (default 800ms) / `maximumDuration` (default 3000ms) |
| **Colores** | Gradiente purple-400 → pink-400 → blue-400 |
| **Accesibilidad** | `role="progressbar"` con `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| **Props** | `onLoadComplete?`, `minimumDuration?`, `maximumDuration?` |

---

### `ErrorBoundary`
**Archivo:** `src/components/ErrorBoundary.tsx`  
**Descripción:** Class Component que captura errores en el árbol de React y muestra una UI de fallback.

| Propiedad | Detalle |
|---|---|
| **Tipo** | React Class Component |
| **Fallback UI** | Card con icono `AlertTriangle`, título, descripción del error y dos botones |
| **Acciones** | Botón "Recargar página" (`window.location.reload`) + "Ir al inicio" |
| **Props** | `children`, `fallbackComponent?` (UI personalizada) |
| **Estilo** | Fondo oscuro `gray-950` con glow purple, borde `purple-500/20` |

---

### `HamburgerMenu`
**Archivo:** `src/components/HamburgerMenu.tsx`  
**Descripción:** Menú de navegación global, siempre fijo en pantalla. Aparece sobre todas las páginas.

| Propiedad | Detalle |
|---|---|
| **Posición** | `fixed top-8 right-8 z-50` |
| **Trigger** | Botón circular negro/glassmorphism con icono hamburguesa animado (X al abrir) |
| **Animación** | GSAP — panel desliza desde la derecha, items con stagger |
| **Panel** | `w-full sm:w-[500px]`, fondo `slate-900` a `black`, gradient bg blobs azul/púrpura |
| **Items de menú** | Inicio (ruta), Filosofía, Servicios, Tecnologías, Proyectos, Equipo (scroll) |
| **Navegación scroll** | Mapeo de secciones a % del scroll total (desktop: 10000px, mobile: 6500px) |
| **Footer del panel** | Links a GitHub, LinkedIn, Twitter + copyright |
| **Comportamiento** | Bloquea el scroll del body cuando está abierto; se cierra al cambiar de ruta |

---

### `Header` *(no usado actualmente en App.tsx)*
**Archivo:** `src/components/Header.tsx`  
**Descripción:** Header alternativo con navegación horizontal clásica. **No está montado en el App principal** (fue reemplazado por `HamburgerMenu`).

| Propiedad | Detalle |
|---|---|
| **Posición** | `fixed top-0 w-full z-50`, backdrop blur |
| **Logo** | Imagen `logos/eki/Logo nuevo.png` |
| **Navegación desktop** | Links horizontales con estado activo en `text-accent` |
| **Navegación mobile** | Menú desplegable vertical en `lg:hidden` |
| **CTA** | Botón `variant="hero"` "Contáctanos" |
| **Estado** | ⚠️ **Inactivo** — no importado en App.tsx |

---

### `Footer`
**Archivo:** `src/components/Footer.tsx`  
**Descripción:** Pie de página global. **No está montado en el App principal actualmente.**

| Propiedad | Detalle |
|---|---|
| **Layout** | Grid 4 columnas (mobile: 1 col) |
| **Columna 1** | Logo EKI + descripción corta |
| **Columna 2** | "Enlaces Rápidos" — Inicio, Nosotros, Equipo, Proyectos |
| **Columna 3** | Lista de servicios (texto, no links) |
| **Columna 4** | Contacto: email, teléfono, ubicación + iconos sociales (GitHub, LinkedIn, Twitter) |
| **Bottom bar** | Copyright año dinámico + links Privacidad / Términos |
| **Estado** | ⚠️ **Inactivo** — no importado en App.tsx |

---

## 📄 Páginas

### `Home` (`/`)
**Archivo:** `src/pages/Home.tsx`  
**Descripción:** Página principal. Contiene toda la experiencia de scroll animado.

| Sección | Componente |
|---|---|
| Fondo Grid | Inline (líneas azul 59,130,246 con opacidad 10%) |
| Pantalla de carga | `<LoadingScreen />` (uso redundante — también está en App.tsx) |
| Hero principal | `<ZoomHero />` |

---

### `ZoomHero`
**Archivo:** `src/components/ZoomHero.tsx` (~1596 líneas)  
**Descripción:** Componente mega — toda la experiencia de scroll de la Home. Usa GSAP ScrollTrigger + Lenis para scroll suave.

#### Secciones internas (scroll-driven):

| # | Sección | Contenido |
|---|---|---|
| 1 | **Hero inicial** | Título grande "EKI PROJECT", tagline animada, botón CTA con flecha |
| 2 | **Filosofía** | Texto largo sobre la filosofía de la empresa, animación reveal |
| 3 | **Servicios** | Cards con 5 servicios (íconos, título, descripción, tags) |
| 4 | **Tecnologías** | Grid de tech logos/íconos por categoría |
| 5 | **Proyectos** | Carrusel horizontal de 5 proyectos con imagen, gradiente, tags y descripción |
| 6 | **Equipo intro** | Transición al team member |
| 7 | **Team** | `<TeamMemberSection />` embebido en modo scroll |
| 8 | **Quote/Cierre** | Frase final de cierre |

| Tecnologías usadas | Detalle |
|---|---|
| GSAP + ScrollTrigger | Animaciones scrub ligadas al scroll |
| Lenis | Smooth scroll |
| Canvas | Renderizado de frames del equipo |
| Estado | `isCarouselMode`, `deviceInfo` (isMobile, isTouch) |

**Proyectos en ZoomHero:**
- E-Commerce Platform (React, Node.js, MongoDB)
- FinTech Dashboard (Next.js, TypeScript, TailwindCSS)
- AI Content Generator (Python, OpenAI, FastAPI)
- Healthcare CRM (Vue.js, Laravel, MySQL)
- Logistics Tracker (React Native, Firebase, Google Maps)

---

### `TeamMemberSection`
**Archivo:** `src/components/TeamMemberSection.tsx` (~542 líneas)  
**Descripción:** Sección de miembro del equipo con animación de frames (secuencia de imágenes `.webp` en canvas).

| Propiedad | Detalle |
|---|---|
| **Canvas** | Renderiza frames `.webp` secuenciales en `<canvas>` |
| **Preload** | Precarga todos los frames con barra de progreso |
| **Modo** | `embeddedMode=true` (dentro de ZoomHero, sin ScrollTrigger propio) o `embeddedMode=false` (independiente) |
| **Sincronización** | Recibe `scrollProgressRef` para sincronizar frame actual con scroll del padre |
| **Textos animados** | Nombre (0–20%), Rol (15–35%), Bio (30–50%), Skills (45–65%), Social (60–80%) |
| **Info mostrada** | Nombre, rol, bio, skills (badges), links sociales (LinkedIn, GitHub, Twitter) |
| **Props** | `member` (id, name, role, bio, skills, social, frames), `embeddedMode?`, `scrollProgressRef?` |

---

### `About` (`/about`)
**Archivo:** `src/pages/About.tsx`

| Sección | Contenido |
|---|---|
| **Hero** | Gradiente `primary → accent`, título "Acerca de EKI", subtítulo |
| **Historia** | Texto largo en 3 párrafos sobre el origen de EKI |
| **Valores** | Grid 2 columnas — 4 Cards con icono, título, descripción (Misión, Visión, Enfoque, Propósito) |
| **Estadísticas** | Grid 4 columnas — números grandes (10+ años, 50+ proyectos, 30+ clientes, 99% satisfacción) |

**Componentes UI usados:** `Card`, `CardContent` de shadcn/ui  
**Iconos:** `Target`, `Eye`, `Heart`, `Zap` de Lucide

---

### `Team` (`/team`)
**Archivo:** `src/pages/Team.tsx`

| Propiedad | Detalle |
|---|---|
| **Fondo** | `bg-black` |
| **Contenido** | Array de `teamMembers` mapeado a `<TeamMemberSection />` |
| **Miembros actuales** | Vicente Araya — CEO & Founder (frames 20–147 en `/equipo/vicente/`) |
| **Nota** | Comentario en código indica que se agregarán más miembros |

---

### `Projects` (`/projects`)
**Archivo:** `src/pages/Projects.tsx`

| Sección | Contenido |
|---|---|
| **Hero** | Gradiente `primary → accent`, título "Nuestros Proyectos" |
| **Portfolio Grid** | Grid 3 columnas (lg), 6 proyectos con imagen, categoría badge, descripción, duración, team size, features, tecnologías, botones Demo + GitHub |
| **CTA Final** | Sección muted con botón "Iniciemos tu Proyecto" |

**Proyectos mostrados:**
| Proyecto | Categoría | Stack |
|---|---|---|
| EcommercePro | E-commerce | React, Node.js, PostgreSQL, Stripe, AWS |
| HealthTech Dashboard | Salud | Vue.js, Python, Django, PostgreSQL, Docker |
| FinanceAI | Fintech | React Native, Python, TensorFlow, MongoDB, AWS |
| EduPlatform | Educación | Next.js, Node.js, WebRTC, Redis, MySQL |
| LogiTrack | Logística | Angular, Java, Spring Boot, MySQL, Google Maps API |
| SocialConnect | Redes Sociales | React, Socket.io, Node.js, MongoDB, Redis |

**Componentes UI usados:** `Card`, `CardContent`, `Button`  
**Iconos:** `ExternalLink`, `Github`, `Calendar`, `Users`

---

### `Services` (`/services`)
**Archivo:** `src/pages/Services.tsx`

| Sección | Contenido |
|---|---|
| **Hero** | Gradiente `primary → accent`, título "Nuestros Servicios" |
| **Servicios Grid** | Grid 3 columnas (lg), 6 servicios con icono, título, descripción, features, tecnologías, duración y botón "Solicitar Cotización" |
| **Proceso** | Grid 4 columnas — 4 pasos con icono, número, título, descripción |
| **CTA Final** | Gradiente `primary → accent`, dos botones: "Agendar Consulta Gratuita" + "Ver Portfolio" |

**Servicios ofrecidos:**
| Servicio | Timeline |
|---|---|
| Desarrollo Web | 8–16 semanas |
| Desarrollo Móvil | 10–20 semanas |
| Soluciones Cloud | 6–12 semanas |
| Backend & APIs | 6–14 semanas |
| Seguridad & Compliance | 4–8 semanas |
| DevOps & CI/CD | 4–10 semanas |

**Pasos del proceso:** Consulta Inicial → Planificación → Desarrollo → Entrega & Soporte

**Componentes UI usados:** `Card`, `CardContent`, `Button`  
**Iconos:** `Code`, `Smartphone`, `Cloud`, `Database`, `Shield`, `Zap`, `Users`, `Settings`, `Monitor`, `Cpu`

---

### `Technologies` (`/technologies`)
**Archivo:** `src/pages/Technologies.tsx`

| Sección | Contenido |
|---|---|
| **Hero** | Gradiente `primary → accent`, título "Nuestras Tecnologías" |
| **Stack Grid** | Por categoría: 6 categorías × 6 tecnologías = 36 cards con emoji, nombre, descripción |
| **Estadísticas** | 4 stats: 25+ tecnologías, 50+ proyectos, 5 años promedio, 100% entregados a tiempo |
| **Metodología** | Grid 4 — criterios de selección: Escalabilidad, Performance, Mantenibilidad, Seguridad |

**Categorías del stack:**
- 💻 Frontend (React, Vue.js, Angular, Next.js, TypeScript, Tailwind CSS)
- ⚙️ Backend (Node.js, Python, Django, Express.js, FastAPI, Spring Boot)
- 🗄️ Bases de Datos (PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch, Firebase)
- ☁️ Cloud & DevOps (AWS, Azure, Google Cloud, Docker, Kubernetes, Terraform)
- 📱 Móvil (React Native, Flutter, Swift, Kotlin, Expo, Xamarin)
- 🛠️ Herramientas (Git, GitHub, GitLab, Jenkins, Jira, Figma)

**Componentes UI usados:** `Card`, `CardContent`

---

### `NotFound` (`*`)
**Archivo:** `src/pages/NotFound.tsx`  
**Descripción:** Página 404 para rutas no encontradas.

---

## 🎨 Componentes UI (shadcn/ui)

Ubicados en `src/components/ui/`. Estos son componentes de la librería **shadcn/ui** basados en Radix UI.

| Componente | Uso en la app |
|---|---|
| `button.tsx` | CTA, acciones en cards, HamburgerMenu, ErrorBoundary. Variantes: `default`, `hero`, `outline`, `ghost`, `secondary` |
| `card.tsx` + `card-content.tsx` | About, Projects, Services, Technologies — contenedores de información |
| `toaster.tsx` + `sonner.tsx` | Notificaciones globales (montadas en App.tsx) |
| `tooltip.tsx` | `TooltipProvider` como wrapper global en App.tsx |
| `badge.tsx` | Etiquetas de categorías |
| `separator.tsx` | Divisores visuales |
| `skeleton.tsx` | Estados de carga |
| `accordion.tsx`, `tabs.tsx`, `dialog.tsx`, etc. | Instalados pero **no se usan actualmente** en páginas principales |

---

## 🔧 Componentes Adicionales (sin usar / en desarrollo)

| Componente | Archivo | Estado |
|---|---|---|
| `AnimatedSection` | `src/components/AnimatedSection.tsx` | No importado en páginas actuales |
| `EnhancedHero` | `src/components/EnhancedHero.tsx` | Versión previa del Hero |
| `HeroGTA` | `src/components/HeroGTA.tsx` | Prototipo alternativo de Hero |
| `HeroRotator` | `src/components/HeroRotator.tsx` | Hero con rotación de contenido |
| `HorizontalScrollSection` | `src/components/HorizontalScrollSection.tsx` | Sección scroll horizontal modular |
| `InfiniteScrollSection` | `src/components/InfiniteScrollSection.tsx` | Scroll infinito |
| `SmoothHero` | `src/components/SmoothHero.tsx` | Versión previa con Lenis |
| `Header` | `src/components/Header.tsx` | Reemplazado por HamburgerMenu |
| `Footer` | `src/components/Footer.tsx` | No montado en App.tsx |

---

## ⚡ Librerías Principales

| Librería | Uso |
|---|---|
| `gsap` + `gsap/ScrollTrigger` | Animaciones scroll en ZoomHero, HamburgerMenu, LoadingScreen, TeamMemberSection |
| `lenis` | Smooth scroll en ZoomHero |
| `react-router-dom` | Enrutamiento SPA |
| `@tanstack/react-query` | Configurado en App.tsx (no se usa actualmente en fetch de datos) |
| `lucide-react` | Iconos en todas las páginas y componentes |
| `tailwindcss` | Estilos utility-first |
| `shadcn/ui` (Radix UI) | Componentes accesibles base |

---

## ⚠️ Observaciones y Deuda Técnica

1. **`Footer` no está montado** en `App.tsx` — ninguna página tiene pie de página.
2. **`Header` no está montado** — fue reemplazado por `HamburgerMenu` pero sigue en el proyecto sin limpiar.
3. **`LoadingScreen` está duplicado** — se usa en `App.tsx` Y dentro de `Home.tsx`, lo que puede causar dos pantallas de carga.
4. **Componentes sin usar** — hay 6+ componentes en `/components` que no se importan en ninguna página activa (EnhancedHero, HeroGTA, SmoothHero, etc.).
5. **Links muertos** — botones "Contáctanos", "Ver Demo", "Ver Portfolio", "GitHub" apuntan a `#` o `"https://github.com"` genérico.
6. **`@tanstack/react-query`** está configurado pero no se usa para ninguna consulta de datos real.
7. **Datos hardcodeados** — proyectos, servicios, tecnologías y miembros del equipo están definidos directamente en los componentes, no vienen de una API o CMS.
8. **Frames del equipo** — `TeamMemberSection` requiere imágenes `.webp` en `/equipo/vicente/` (frames 20–147). Si no existen en producción, el canvas quedará vacío.
