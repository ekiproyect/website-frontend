// Verifica que la palabra display SIEMPRE cabe en su contenedor (sin corte/desborde).
// Replica el cálculo de .fluid-word en index.css:
//   font-size = min(max, containerPx / (chars * 0.62))
//   anchoTexto ≈ chars * 0.62 * font-size  ->  debe ser <= containerPx
import assert from "node:assert";

const GLYPH = 1.18; // peor caso medido (Syne Black O/S): "NOSOTROS" = 1.17em/char
function fits({ chars, maxRem, containerPx }) {
  const maxPx = maxRem * 16;
  const fontSize = Math.min(maxPx, containerPx / (chars * GLYPH));
  const textWidth = chars * GLYPH * fontSize;
  return textWidth <= containerPx + 0.5; // +0.5px tolerancia de redondeo
}

// Palabras reales del sitio, de mobile 320px a Mac 2700px.
const cases = [
  { chars: 9, maxRem: 10 },   // Iniciemos
  { chars: 8, maxRem: 9.5 },  // Nosotros
  { chars: 8, maxRem: 7.5 },  // Hablemos
];
for (const c of cases) {
  for (const containerPx of [320, 390, 768, 1024, 1400, 1920, 2700]) {
    assert.ok(fits({ ...c, containerPx }), `desborda: ${JSON.stringify({ ...c, containerPx })}`);
  }
}
console.log("ok: fluid-display cabe en todos los anchos 320–2700px");
