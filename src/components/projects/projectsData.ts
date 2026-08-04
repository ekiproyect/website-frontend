// Fuente de verdad de los proyectos. Extraído de ProjectsGrid.tsx al pasar la
// sección a carrusel; los datos no cambiaron.

/**
 * Tres campos de imagen con usos distintos — no son intercambiables:
 *
 *   preview  tarjeta del carrusel. 16:10 con relleno, generada por
 *            `scripts/build-previews.mjs` a partir de gallery[0]. El hueco de
 *            la tarjeta usa object-cover, así que solo un 16:10 no se recorta.
 *   gallery  capturas dentro del modal. Se muestran a proporción natural
 *            (`w-full` con alto automático), así que NO necesitan relleno:
 *            rellenarlas les añadiría bandas donde hoy no hay ninguna.
 *   image    fondo ambiente detrás de las capturas del modal.
 */
export type Project = {
  id: string;
  client: string;
  category: string;
  tag?: string; // etiqueta para proyectos referenciados / en colaboración
  description: string;
  detail?: string;
  image?: string;
  preview?: string;
  url?: string;
  gallery?: string[];
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    client: "Kreatracker",
    preview: "/images/projects/AssetTracker/preview.webp",
    category: "Plataforma Web + App Móvil",
    description:
      "Suite de gestión logística para operaciones de bodega: cajas, áreas, proyectos, productos y proveedores, con control de acceso por roles. Reemplaza planillas y papel por una fuente de verdad única, consultable en el escritorio o desde el celular en terreno.",
    detail:
      "Dos formas de trabajar conectadas a la misma información: un panel web para gestionar todo con calma desde el escritorio y una app de celular para el equipo en bodega, que solo escanea un código y listo. Cada persona ve únicamente lo que le corresponde según su rol, y cada movimiento queda registrado. El estado de cada activo se entiende de un vistazo gracias al color: verde si está disponible, rojo si está dañado.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    url: "https://kreatracker.cl/",
    gallery: [
      "/images/projects/AssetTracker/assettracker1.webp",
      "/images/projects/AssetTracker/assettracker2.webp",
      "/images/projects/AssetTracker/assettracker3.webp",
    ],
  },
  {
    id: "02",
    client: "Chatbot Empresarial",
    preview: "/images/projects/ChatBot/preview.webp",
    category: "OTEC",
    description:
      "ChatBot entrenado para optimizar los procesos de una OTEC, respondiendo preguntas a nivel interno y a clientes. Reduce tiempos de atención y estandariza respuestas sobre cursos, procesos y trámites.",
    detail:
      "Un asistente conversacional entrenado con la información propia de la OTEC que atiende consultas 24/7 tanto del equipo interno como de los clientes. Optimiza la carga y validación de facturas, el seguimiento de pagos y el estado de flujos administrativos, evitando que ese trabajo dependa de revisar planillas o escribir correos. También responde preguntas frecuentes sobre cursos, procesos de inscripción y trámites, liberando al equipo humano para los casos que realmente lo requieren.",
    image: "/images/projects/ChatBot/chatbot1.png",
    gallery: [
      // chatbot3 va primera a propósito: muestra una conversación real, mientras
      // que chatbot2 es casi todo espacio en blanco. `gallery[0]` es además el
      // origen de la preview del carrusel.
      "/images/projects/ChatBot/chatbot3.png",
      "/images/projects/ChatBot/chatbot2.png",
    ],
  },
];

// Proyectos en los que participa parte del equipo de EKI junto a equipos externos.
export const REFERENCED_DATA: Project[] = [
  {
    id: "01",
    client: "Cumplify",
    preview: "/images/projects/Cumplify/preview.webp",
    category: "Plataforma SaaS de cumplimiento",
    tag: "Desarrollo EKI",
    description:
      "Cumplimiento ambiental y de seguridad para operaciones constructoras: obligaciones legales, matriz de riesgo IPER, catálogo de peligros y biblioteca documental, en una plataforma multiempresa.",
    image: "/images/projects/Cumplify/cumplify.jpeg",
    detail:
      "Cumplir la normativa ambiental y de seguridad suele significar planillas dispersas, carpetas con documentos vencidos y una matriz de riesgos que nadie actualiza. Cumplify reúne todo eso en un solo lugar: las obligaciones legales que aplican a cada empresa, un catálogo de peligros y riesgos por familia, la biblioteca documental con sus vigencias y la estructura de unidades organizacionales.\n\nEl corazón es la matriz IPER: identificar el peligro, evaluar el riesgo y hacerle seguimiento a la medida preventiva. La plataforma cruza probabilidad y consecuencia para entregar un valor de riesgo con color propio, de verde a rojo, y guía la identificación en un flujo único: unidad de control, tarea, peligro y riesgo.\n\nAl ser multiempresa, cada organización trabaja sobre sus propios datos sin ver los de las demás, y cada persona accede solo a lo que su rol permite.\n\nEl proyecto nació con un equipo externo y EKI entró aportando un integrante. Cuando el desarrollador original dejó el proyecto, se sumó un segundo: hoy el desarrollo lo lleva íntegramente el equipo de EKI.",
    gallery: [
      "/images/projects/Cumplify/cumplify.jpeg",
      "/images/projects/Cumplify/cumplify1.jpeg",
      "/images/projects/Cumplify/cumplify3.jpeg",
      "/images/projects/Cumplify/cumplify2.jpeg",
    ],
  },
  {
    id: "02",
    client: "CILOG, Corredor Bioceánico Capricornio",
    preview: "/images/projects/Corredor/preview.webp",
    category: "Plataforma de datos e integración logística",
    tag: "Desarrollo EKI",
    description:
      "Iniciativa financiada por el Gobierno Regional de Antofagasta, con recursos del Fondo Regional para la Productividad y el Desarrollo, F.R.P.D., Línea Hub Bioceánico, año 2025, aprobados por el Consejo Regional de Antofagasta.",
    image: "/images/projects/Corredor/cilog1.jpeg",
    url: "https://cilog.cl/",
    gallery: [
      "/images/projects/Corredor/cilog1.jpeg",
      "/images/projects/Corredor/cilog4.jpeg",
      "/images/projects/Corredor/cilog2.jpeg",
      "/images/projects/Corredor/cilog3.jpeg",
    ],
    detail:
      "Son ~2.500 km de rutas que cruzan Brasil, Paraguay, Argentina y Chile para conectar el Atlántico con el Pacífico. Saber si un paso fronterizo está abierto, qué exige cada país o cuánto demora un tramo obligaba a rastrear organismos, planillas y PDFs. CILOG lo centraliza en una sola fuente de verdad multinacional.\n\nLa portada muestra el estado en vivo de cada complejo fronterizo, con clima y tipo de vehículo habilitado, y la capa GIS lo lleva a un mapa con rutas, pasos, puertos y centros logísticos filtrables por país. El observatorio reúne indicadores oficiales de comercio, competitividad y conectividad, cada uno con su fuente declarada y la cifra tal como la publica el organismo. Disponible en español, inglés y portugués.\n\nEl proyecto es de un tercero, pero todo su desarrollo lo ejecuta el equipo de EKI.",
  },
];

const [KREATRACKER, CHATBOT] = PROJECTS_DATA;

/**
 * Orden del carrusel y de las flechas del modal.
 *
 * ChatBot va al final por ahora: sus capturas son paneles de chat verticales y
 * dejan mucho aire en el hueco 16:10 de la tarjeta, así que pesa menos al final
 * que en segunda posición. Cuando tenga una captura apaisada puede volver.
 *
 * La navegación va SIEMPRE por índice en esta lista, nunca por `id`: los `id`
 * de ambos arrays chocan (los dos numeran "01" y "02"). Y el número que se
 * MUESTRA se deriva de la posición aquí, no del `id`, o la secuencia del
 * carrusel se leería 01, 01, 02, 02.
 */
export const ALL_PROJECTS: Project[] = [KREATRACKER, ...REFERENCED_DATA, CHATBOT];

/** Número visible de un proyecto: su posición en el carrusel, no su `id`. */
export const projectNumber = (index: number) => String(index + 1).padStart(2, "0");
