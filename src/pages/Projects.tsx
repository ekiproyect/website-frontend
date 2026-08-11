import { useEffect } from "react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";
import { ProjectsShowcase } from "../components/projects/ProjectsShowcase";

const Projects = () => {
  // Asegura que la página inicie arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900">
      <FloatingNav introDone={true} />

      {/* Grilla editorial en claro y, debajo, el índice de referenciados en
          oscuro. La página scrollea: solo la cabecera monumental ocupa la
          pantalla al entrar. */}
      <ProjectsShowcase />

      {/* startsDark porque el índice de referenciados ya entrega la página en
          negro. Con startsDark={false} el footer nacería claro bajo una sección
          oscura y el apagón, además, intentaría teñir un fondo que ya está en
          su color de destino. */}
      <Footer startsDark={true} />
    </main>
  );
};

export default Projects;
