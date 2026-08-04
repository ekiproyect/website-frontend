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

      {/* Ocupa la pantalla completa: el carrusel se ve al entrar, sin scroll */}
      <ProjectsShowcase />

      {/* El footer queda debajo; se llega scrolleando */}
      <Footer startsDark={false} />
    </main>
  );
};

export default Projects;
