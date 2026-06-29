# Diseño

## Tema

Estética oscura, técnica y premium. Superficies cercanas al negro (`222.2 84% 4.9%`) con acentos de gradiente azul→púrpura que evocan terminal/ingeniería sin caer en cliché SaaS. Toques de "alta costura digital": tipografía display expresiva, movimiento intencional, detalles tipo HUD (scan lines, glitch) usados con moderación. El modo oscuro es el principal; existe un set de tokens claros heredado de shadcn pero la marca vive en oscuro.

Estrategia de color: **comprometida** — el negro/azul-púrpura carga la superficie y la identidad. El gradiente `tech-blue → tech-purple` es la firma de marca, no decoración genérica.

## Paleta de Color

Definida como tokens HSL en [src/index.css](src/index.css), consumida vía Tailwind con `hsl(var(--token))`. **Todos los colores deben ser HSL** (regla del sistema existente).

### Modo oscuro (principal)
- `--background`: `222.2 84% 4.9%` — casi negro azulado, superficie base.
- `--foreground`: `210 40% 98%` — blanco frío para texto.
- `--primary`: `210 40% 98%` — invertido en oscuro (claro sobre oscuro).
- `--muted-foreground`: `215 20.2% 65.1%` — texto secundario; verificar ≥4.5:1 antes de usar en cuerpo.
- `--border` / `--input`: `217.2 32.6% 17.5%` — bordes sutiles.

### Acentos de marca (firma)
- `--tech-blue`: `220 100% 50%`
- `--tech-purple`: `270 75% 60%`
- `--tech-gradient`: `linear-gradient(45deg, tech-blue, tech-purple)` — gradiente firma (scrollbar, acentos, no usar como texto con `background-clip`).
- `--hero-gradient`: `linear-gradient(135deg, primary, accent)`

### Semánticos
- `--destructive` (oscuro): `0 62.8% 30.6%`
- `--radius`: `0.75rem` (lg); md = -2px, sm = -4px.

Contraste objetivo: WCAG AA. Cuerpo ≥4.5:1, texto grande ≥3:1. El `muted-foreground` sobre `background` está al límite — preferir foreground pleno para texto de lectura.

## Tipografía

Cargadas desde Fontshare + Google Fonts en [src/index.css](src/index.css). Pareadas por eje de contraste (geométrica + display + serif), no por similitud.

- **Sans / cuerpo** (`font-sans`): **Space Grotesk** — geométrica con carácter técnico.
- **Headings** (`font-heading`): **Syne** — display expresiva, variable, para títulos y hero.
- **Acento** (`font-accent`): **Playfair Display** — serif de alto contraste para toques "alta costura".

(También se cargan Clash Display, Satoshi, General Sans, Inter — disponibles pero Syne/Space Grotesk/Playfair son el sistema activo.)

Reglas: line-length de cuerpo 65–75ch. `text-wrap: balance` en h1–h3. Letter-spacing de display ≥ -0.04em. Techo de heading hero ≤ 6rem.

## Layout

- Container centrado, padding `2rem`, max `1400px` (`2xl`).
- Flexbox para 1D, Grid para 2D. Grillas responsivas sin breakpoints: `repeat(auto-fit, minmax(280px, 1fr))`.
- Radio base `0.75rem`. Variar el ritmo de espaciado, no uniforme.
- Evitar grillas de tarjetas idénticas (anti-referencia). Tarjetas solo cuando son el mejor affordance.

## Componentes

- **UI base**: shadcn/ui sobre Radix ([src/components/ui/](src/components/ui/)) — accordion, dialog, popover, tabs, toast (sonner), etc. Variantes vía `class-variance-authority`.
- **Secciones de marca**: HeroScroll, RotatingTitleHero, StackingCards, ProcessSection, ServicesScroll, MinimalTeam, ProjectsCarousel/VideoSection.
- **Navegación**: Header, Footer, ScrollProgressBar, ScrollToTop.
- **3D/Visual**: Logo3D (react-three-fiber + drei), TechMarquee.

## Motion

El movimiento es parte del build, no un añadido. Librerías ya instaladas:

- **GSAP** (+ @gsap/react) — scroll-driven, timelines complejas.
- **Framer Motion / motion** — transiciones de componentes, stagger.
- **Lenis** (@studio-freight/react-lenis) — smooth scroll; toma control del scroll (`scroll-behavior: auto !important`).

Reglas: easing ease-out exponencial (quart/quint/expo), sin bounce ni elastic. Animar solo transform/opacity (más blur/clip-path/mask cuando sume). Stagger en listas es válido; evitar el reflejo uniforme (misma entrada en cada sección). Detalles tipo HUD (`animate-scan`, `animate-glitch`) con moderación.

**Movimiento reducido obligatorio**: cada animación necesita alternativa `@media (prefers-reduced-motion: reduce)` (crossfade o instantáneo). Los reveals deben mejorar un default ya visible, nunca ocultar contenido tras una clase.

## Detalles

- Scrollbar personalizado con el gradiente firma azul→púrpura.
- Smooth scroll global vía Lenis; `data-lenis-prevent` para contenedores con scroll propio.
- Scroll forzado al inicio en carga (script inline en [index.html](index.html)).
- Lenguaje `es` por defecto; contenido bilingüe ES/EN en roadmap de marca.
