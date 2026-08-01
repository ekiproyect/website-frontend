import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const ORIGIN = 'https://www.ekiproject.cl';
const DESCRIPTION_LIMIT = 160;

const META_START = '<!-- ROUTE-META:START -->';
const META_END = '<!-- ROUTE-META:END -->';
const FALLBACK_START = '<!-- ROUTE-FALLBACK:START -->';
const FALLBACK_END = '<!-- ROUTE-FALLBACK:END -->';

/**
 * Fuente de verdad de la metadata por ruta. Los `path` deben coincidir con las
 * rutas declaradas en src/App.tsx, y `heading` con el <h1> real de cada página
 * para que el respaldo estático no contradiga lo que renderiza React.
 */
const ROUTES = [
  {
    path: '/',
    title: 'EKI · Diseño y Desarrollo de Software Premium | Antofagasta, Chile',
    description:
      'Consultora digital en Antofagasta: unimos diseño de alta gama con ingeniería robusta. Desarrollo web y móvil a medida, cloud, SEO técnico y performance.',
    socialTitle: 'EKI · Diseño y Desarrollo de Software Premium',
    socialDescription:
      'Combinamos diseño de alta gama con ingeniería robusta. Desde Antofagasta hacia el mundo.',
    heading: 'EKI · Diseño y Desarrollo de Software Premium',
    navLabel: 'Inicio',
  },
  {
    path: '/proyectos/',
    title: 'Proyectos · Diseño y Desarrollo Web | EKI',
    description:
      'Selección de proyectos digitales diseñados y desarrollados en EKI. Cada píxel pensado para convertir, cada línea de código para escalar.',
    socialTitle: 'Proyectos · EKI',
    socialDescription:
      'Selección de proyectos digitales diseñados y desarrollados en EKI. Cada píxel pensado para convertir, cada línea de código para escalar.',
    heading: 'Trabajo',
    navLabel: 'Proyectos',
  },
  {
    path: '/equipo/',
    title: 'Nosotros · Equipo y Filosofía | EKI',
    description:
      'Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario.',
    socialTitle: 'Nosotros · EKI',
    socialDescription:
      'Nacimos en Antofagasta con una visión implacable: llevar el diseño web de alta gama a marcas que no se conforman con lo ordinario.',
    heading: 'Nosotros',
    navLabel: 'Equipo',
  },
  {
    path: '/contacto/',
    title: 'Contacto · Hablemos de tu proyecto | EKI',
    description:
      'Desde Antofagasta hacia el mundo. Cuéntanos tu visión y ponemos la ingeniería y el diseño. Carlos y el equipo revisan cada solicitud.',
    socialTitle: 'Contacto · EKI',
    socialDescription:
      'Desde Antofagasta hacia el mundo. Cuéntanos tu visión y nosotros ponemos la ingeniería y el diseño para hacerla dominar el mercado.',
    heading: 'Hablemos',
    navLabel: 'Contacto',
  },
];

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function replaceBlock(html, startMarker, endMarker, replacement, routePath) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(
      `[build-routes] Faltan los marcadores ${startMarker} / ${endMarker} en index.html (ruta ${routePath}). ` +
        'Si los renombraste en index.html, actualiza también scripts/build-routes.mjs.',
    );
  }
  return html.slice(0, start + startMarker.length) + replacement + html.slice(end);
}

function metaBlock(route) {
  const url = ORIGIN + route.path;
  return `
    <title>${escapeAttr(route.title)}</title>
    <meta name="description" content="${escapeAttr(route.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeAttr(route.socialTitle)}" />
    <meta property="og:description" content="${escapeAttr(route.socialDescription)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image:alt" content="${escapeAttr(route.socialTitle)}" />
    <meta name="twitter:title" content="${escapeAttr(route.socialTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(route.socialDescription)}" />
    `;
}

function fallbackBlock(route) {
  const links = ROUTES.filter((r) => r.path !== route.path)
    .map((r) => `<a href="${r.path}" style="color:inherit">${r.navLabel}</a>`)
    .join('\n          ');

  return `
      <div style="position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:2rem;background:#09090b;color:#fafafa;font-family:'Space Grotesk',system-ui,sans-serif;text-align:center">
        <h1 style="margin:0;font-size:clamp(2rem,8vw,4rem);font-weight:800;letter-spacing:-0.04em;text-transform:uppercase">
          ${route.heading}
        </h1>
        <p style="margin:0;max-width:60ch;color:#a1a1aa">
          ${route.description}
        </p>
        <nav style="display:flex;flex-wrap:wrap;gap:1.5rem;color:#a1a1aa">
          ${links}
        </nav>
      </div>
      `;
}

function sitemap() {
  const urls = ROUTES.map(
    (route, index) =>
      `  <url><loc>${ORIGIN}${route.path}</loc><priority>${index === 0 ? '1.0' : '0.8'}</priority></url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

for (const route of ROUTES) {
  if (route.description.length > DESCRIPTION_LIMIT) {
    throw new Error(
      `[build-routes] La description de "${route.path}" tiene ${route.description.length} caracteres, ` +
        `el máximo es ${DESCRIPTION_LIMIT}. Google la cortaría en los resultados de búsqueda.`,
    );
  }

  let html = replaceBlock(template, META_START, META_END, metaBlock(route), route.path);
  html = replaceBlock(html, FALLBACK_START, FALLBACK_END, fallbackBlock(route), route.path);

  const target =
    route.path === '/'
      ? join(DIST, 'index.html')
      : join(DIST, route.path.replace(/^\/|\/$/g, ''), 'index.html');

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

// 404.html es el fallback de GitHub Pages para rutas que no existen. Como cada
// ruta real ya tiene su propio HTML, este archivo solo responde 404 de verdad.
const ROBOTS_INDEX = '<meta name="robots" content="index, follow" />';
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!home.includes(ROBOTS_INDEX)) {
  throw new Error(
    `[build-routes] No se encontró ${ROBOTS_INDEX} en index.html, ` +
      'así que 404.html quedaría indexable. Revisa la meta robots en index.html.',
  );
}
writeFileSync(
  join(DIST, '404.html'),
  home
    .replace(ROBOTS_INDEX, '<meta name="robots" content="noindex, follow" />')
    .replace(/\n\s*<link rel="canonical"[^>]*>/, ''),
);

writeFileSync(join(DIST, 'sitemap.xml'), sitemap());
writeFileSync(join(DIST, '.nojekyll'), '');

process.stdout.write(
  `build-routes: ${ROUTES.length} rutas generadas (${ROUTES.map((r) => r.path).join(', ')})\n`,
);
