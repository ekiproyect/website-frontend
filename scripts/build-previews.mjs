import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Genera las previews del carrusel de /proyectos.
 *
 * Las capturas originales no comparten resolución (14 archivos, 14 tamaños) ni
 * proporción: las de escritorio rondan 2:1 y las de ChatBot son de móvil, casi
 * 0.6. El hueco de la tarjeta es 16:10, así que con `object-cover` cualquiera
 * que no sea 16:10 se recorta — en las de 2:1 eso se comía el 30% del ancho.
 *
 * Este script deja cada captura escalada para CABER (nunca recortada) y
 * centrada sobre un lienzo 16:10, con un filete que la delimita. Los originales
 * no se tocan: siguen siendo la galería del modal, que sí las muestra a
 * proporción natural y no necesita relleno.
 *
 * NO va enganchado al build: las imágenes no cambian entre builds y no conviene
 * meter ImageMagick como dependencia del deploy. Se corre a mano cuando llegan
 * capturas nuevas y el resultado se commitea:
 *
 *   node scripts/build-previews.mjs
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS_DIR = join(ROOT, 'public', 'images', 'projects');

/** 16:10. La tarjeta se dibuja a 736px en 1440, así que 1600 cubre pantallas
 *  de alta densidad (2x = 1472) sin ampliar de más las capturas pequeñas. */
const CANVAS_W = 1600;
const CANVAS_H = 1000;

/** Lienzo TRANSPARENTE, no del color del fondo. Dos razones:
 *
 *  1. La tarjeta usa `filter: drop-shadow()`, que sigue el canal alfa: así la
 *     sombra abraza la captura exactamente. Con un lienzo opaco seguiría el
 *     rectángulo entero y quedaría flotando sobre el aire vacío que hay encima
 *     de las capturas más bajas (en Cumplify, ~100px).
 *  2. Deja de estar acoplado al fondo de la sección: si cambia, no hay que
 *     regenerar nada — el `bg-zinc-50` del hueco se ve a través. */
const CANVAS_BG = 'none';

/** Margen alrededor de la captura. Da sitio a la sombra para dibujarse sin
 *  quedar pegada al borde; el resto se suma al `gap` del carrusel. */
const INSET = 0.04;

/** Las capturas se apoyan en el BORDE INFERIOR del lienzo, no en el centro.
 *  Cada una tiene su propia proporción, así que centrarlas las dejaba
 *  terminando a alturas distintas y el hueco hasta el título variaba de tarjeta
 *  en tarjeta (66px en Kreatracker contra 35px en ChatBot). Con línea de base
 *  común, ese hueco es el mismo en todas. */
const BOTTOM_INSET = Math.round(CANVAS_H * INSET);

/** Con el lienzo fundido en el fondo, el filete es LO ÚNICO que delimita la
 *  captura. Sin él, Cumplify o AssetTracker se derramarían sobre la página. */
const BORDER_COLOR = '#00000026';
const BORDER_PX = 3;

/**
 * Origen de cada preview: la PRIMERA captura de la galería, leída directamente
 * de projectsData.ts. Antes estaba duplicado a mano aquí y se desincronizó: la
 * galería de ChatBot empezaba por una captura casi vacía y la preview seguía
 * generándose desde otra. Derivarlo elimina esa clase de fallo.
 */
const SOURCES = [
  ...readFileSync(join(ROOT, 'src/components/projects/projectsData.ts'), 'utf8')
    .matchAll(/gallery:\s*\[(?:\s*\/\/[^\n]*\n)*\s*"([^"]+)"/g),
].map(([, ruta]) => {
  const partes = ruta.split('/');
  return [partes[partes.length - 2], partes[partes.length - 1]];
});

if (SOURCES.length === 0) {
  console.error('[build-previews] No se encontró ninguna galería en projectsData.ts');
  process.exit(1);
}

const innerW = Math.round(CANVAS_W * (1 - INSET * 2)) - BORDER_PX * 2;
const innerH = Math.round(CANVAS_H * (1 - INSET * 2)) - BORDER_PX * 2;

let failed = false;

for (const [project, file] of SOURCES) {
  const src = join(PROJECTS_DIR, project, file);
  const out = join(PROJECTS_DIR, project, 'preview.webp');

  if (!existsSync(src)) {
    console.error(`  FALTA  ${project}/${file} — no existe, se omite`);
    failed = true;
    continue;
  }

  execFileSync('magick', [
    '-size', `${CANVAS_W}x${CANVAS_H}`, `xc:${CANVAS_BG}`,
    '-alpha', 'set',
    '(',
      src,
      // SIN el flag `>`: todas las capturas se llevan a la misma medida dentro
      // del hueco, amplíen o reduzcan. Con `>` cada una se quedaba en su
      // resolución original y, aun teniendo la misma proporción, se veían de
      // tamaños distintos: Cumplify (1600px de ancho) ocupaba el 64% del alto
      // y CILOG (1280px) el 51%.
      '-resize', `${innerW}x${innerH}`,
      '-bordercolor', BORDER_COLOR,
      '-border', String(BORDER_PX),
    ')',
    '-gravity', 'south',
    '-geometry', `+0+${BOTTOM_INSET}`,
    '-composite',
    '-quality', '86',
    '-strip',
    out,
  ]);

  const { width, height } = JSON.parse(
    execFileSync('magick', ['identify', '-format', '{"width":%w,"height":%h}', out], {
      encoding: 'utf8',
    })
  );
  const kb = Math.round(statSync(out).size / 1024);
  console.log(`  ${project.padEnd(14)} ${file.padEnd(24)} -> preview.webp  ${width}x${height}  ${kb} KB`);
}

if (failed) process.exit(1);
console.log(`\n${SOURCES.length} previews generadas en ${CANVAS_W}x${CANVAS_H} (16:10).`);
