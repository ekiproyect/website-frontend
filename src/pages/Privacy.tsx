"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";

/**
 * Última revisión del contenido legal. Se muestra en la página y hay que
 * actualizarla al tocar el texto: una política sin fecha no dice nada.
 */
const UPDATED_AT = "3 de agosto de 2026";

const CONTACT_EMAIL = "ekiteam.contacto@gmail.com";

/**
 * El contenido describe cómo funciona este sitio de verdad: no hay backend
 * propio, el formulario va a Formspree, no hay analítica ni cookies y el único
 * dato guardado en el navegador es la marca técnica del intro. Si eso cambia
 * (se agrega analítica, un backend, un chat), hay que actualizar la sección
 * correspondiente antes de desplegar.
 */
const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "responsable",
    title: "Quién trata tus datos",
    body: (
      <>
        <p>
          Este sitio es operado por EKI, consultora de diseño y desarrollo de software con sede en
          Antofagasta, Chile. Somos responsables de los datos personales que nos entregas a través
          de <span className="whitespace-nowrap">www.ekiproject.cl</span>.
        </p>
        <p>
          Para cualquier consulta sobre esta política o sobre tus datos, escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:opacity-60 transition-opacity">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "alcance",
    title: "A qué aplica",
    body: (
      <>
        <p>
          Esta política cubre este sitio y también las aplicaciones publicadas por integrantes de
          nuestro equipo de desarrollo en tiendas como App Store o Google Play, cuando la app se
          publica bajo la responsabilidad de EKI.
        </p>
        <p>
          En esas aplicaciones rigen los mismos compromisos que aquí: no vendemos datos, no hacemos
          seguimiento publicitario y solo tratamos la información necesaria para que la app funcione.
          Si alguna app concreta necesita datos adicionales por su propia naturaleza, lo indicará en
          su ficha de la tienda y dentro de la propia aplicación antes de pedírtelos.
        </p>
        <p>
          Esto no alcanza a las plataformas de terceros que desarrollamos para clientes, aunque las
          construya nuestro equipo: en esos casos el responsable de los datos es el cliente dueño de
          la plataforma, con su propia política.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "Qué datos recogemos",
    body: (
      <>
        <p>
          Solo los que nos entregas voluntariamente en el formulario de contacto: tu nombre, tu
          correo electrónico, el servicio que te interesa y el mensaje que escribas. Nada más.
        </p>
        <p>
          No pedimos datos de pago, no recogemos datos sensibles y no compramos ni cruzamos bases de
          datos de terceros. Tampoco creamos perfiles de navegación ni hacemos seguimiento
          publicitario.
        </p>
      </>
    ),
  },
  {
    id: "finalidad",
    title: "Para qué los usamos",
    body: (
      <>
        <p>
          Únicamente para responder tu mensaje y conversar sobre el proyecto que nos planteas. Si de
          esa conversación nace un trabajo, usaremos tu correo para coordinarlo.
        </p>
        <p>
          No te agregaremos a ninguna lista de correo ni te enviaremos comunicaciones comerciales sin
          que nos lo pidas.
        </p>
      </>
    ),
  },
  {
    id: "terceros",
    title: "Con quién se comparten",
    body: (
      <>
        <p>
          No vendemos ni cedemos tus datos. Para que el sitio funcione usamos tres servicios
          externos, cada uno con acceso limitado a lo que necesita:
        </p>
        <ul className="mt-6 flex flex-col gap-4 border-l border-current/15 pl-6">
          <li>
            <strong className="font-semibold">Formspree</strong> — recibe y nos reenvía los mensajes
            del formulario de contacto. Es quien procesa el nombre, correo y mensaje que envías.
          </li>
          <li>
            <strong className="font-semibold">GitHub Pages</strong> — aloja el sitio. Como todo
            servidor web, registra la dirección IP de quien lo visita para poder entregar las
            páginas.
          </li>
          <li>
            <strong className="font-semibold">Google Fonts</strong> — entrega las tipografías del
            sitio. Al cargarlas, tu navegador se conecta a los servidores de Google y estos reciben
            tu dirección IP.
          </li>
        </ul>
        <p className="mt-6">
          Estos proveedores operan fuera de Chile, por lo que los datos que gestionan pueden
          almacenarse en el extranjero. También entregaremos información si una autoridad
          competente nos lo exige legalmente.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies y almacenamiento local",
    body: (
      <>
        <p>
          Este sitio no usa cookies, ni propias ni de terceros. No hay analítica, no hay píxeles de
          seguimiento y no hay publicidad.
        </p>
        <p>
          Lo único que guardamos en tu navegador es una marca técnica en el almacenamiento de sesión
          (<code className="font-mono text-[0.9em]">eki_intro_done</code>) que recuerda si ya viste la
          animación de entrada, para no repetírtela. No identifica a nadie y desaparece al cerrar la
          pestaña.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "Cuánto tiempo los guardamos",
    body: (
      <p>
        Conservamos los mensajes del formulario mientras dure la conversación y, si se concreta un
        trabajo, mientras la relación esté vigente y por el plazo que exija la ley. Pasado eso, los
        eliminamos. Puedes pedirnos que los borremos antes.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos",
    body: (
      <>
        <p>
          Conforme a la Ley N.º 19.628 sobre protección de la vida privada, puedes pedirnos en
          cualquier momento acceder a tus datos, corregirlos si están equivocados, eliminarlos o
          bloquear su uso.
        </p>
        <p>
          Basta con escribir a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:opacity-60 transition-opacity">
            {CONTACT_EMAIL}
          </a>{" "}
          desde el mismo correo con el que nos contactaste. Respondemos en un plazo máximo de 15
          días hábiles y no cobramos por ello.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad",
    body: (
      <p>
        El sitio se sirve íntegramente por HTTPS y el formulario viaja cifrado hasta Formspree.
        Ningún método de transmisión por internet es infalible, así que no podemos garantizar
        seguridad absoluta, pero mantenemos el acceso a los mensajes limitado a quienes del equipo
        necesitan responderlos.
      </p>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    body: (
      <p>
        El sitio está dirigido a empresas y profesionales. No solicitamos ni recogemos
        intencionadamente datos de menores de 14 años. Si crees que un menor nos envió datos,
        escríbenos y los eliminaremos.
      </p>
    ),
  },
  {
    id: "enlaces",
    title: "Enlaces a otros sitios",
    body: (
      <p>
        En la sección de proyectos enlazamos a plataformas de clientes y terceros. Una vez que sales
        de este sitio, esas páginas se rigen por sus propias políticas y no respondemos por ellas.
        Lo mismo vale para los enlaces que una app nuestra abra fuera de sí misma, y para las
        tiendas de aplicaciones desde las que se descarga.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios a esta política",
    body: (
      <p>
        Si cambiamos cómo tratamos los datos, actualizaremos esta página y la fecha de revisión que
        aparece al inicio. Si el cambio es relevante y tenemos tu correo por un trabajo en curso, te
        avisaremos directamente.
      </p>
    ),
  },
];

const Privacy = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      // Entrada sobria: es un documento legal, no una portada.
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-privacy-head] > *", {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900">
      <FloatingNav introDone={true} />

      <section className="w-full px-6 md:px-12 pt-32 md:pt-48 pb-24 md:pb-40">
        <div className="max-w-[1400px] mx-auto">

          <header data-privacy-head className="max-w-3xl">
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-400">
              Legal
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter leading-[0.95]">
              Políticas y Privacidad
            </h1>
            <p className="mt-6 text-base md:text-lg text-zinc-600 leading-relaxed [text-wrap:pretty]">
              Este sitio no tiene analítica, no usa cookies y no vende datos a nadie. Lo único que
              recogemos es lo que nos escribes en el formulario de contacto. Aplica también a las
              apps publicadas por nuestro equipo. Abajo está el detalle, sin letra chica.
            </p>
            <p className="mt-6 text-sm text-zinc-500">
              Última actualización: {UPDATED_AT}
            </p>
          </header>

          {/* Índice: el documento es largo y la mayoría entra buscando una sola cosa */}
          <nav aria-label="Índice del documento" className="mt-16 md:mt-20 border-t border-zinc-200 pt-8">
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {SECTIONS.map((section, index) => (
                <li key={section.id} className="flex gap-3 text-sm md:text-base">
                  <span className="font-mono text-xs text-zinc-400 pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 rounded-sm"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-16 md:mt-24 flex flex-col">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                // scroll-mt deja el título libre de la nav flotante al saltar desde el índice
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-4 border-t border-zinc-200 py-10 md:py-14"
              >
                <h2 className="lg:col-span-4 flex items-start gap-4 text-2xl md:text-3xl font-heading font-bold tracking-tight text-zinc-900">
                  <span className="font-mono text-xs text-zinc-400 pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="lg:col-span-8 flex flex-col gap-4 text-base md:text-lg text-zinc-600 leading-relaxed [text-wrap:pretty] max-w-prose">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

        </div>
      </section>

      <Footer startsDark={false} />
    </main>
  );
};

export default Privacy;
