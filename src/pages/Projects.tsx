import { useEffect } from "react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";
import { ProjectsIntro } from "../components/ProjectsIntro";
import { ProjectsGrid } from "../components/ProjectsGrid";

const Projects = () => {
  // Asegura que la página inicie arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900 min-h-screen">
      
      <FloatingNav introDone={true} />

      {/* 1. BLANCO: Texto gigante y contexto */}
      <ProjectsIntro />

      {/* 2. BLANCO CONTINUO: La galería asimétrica */}
      <ProjectsGrid />

      {/* 3. APAGÓN: Al terminar los proyectos, el fondo blanco hace un fade out hacia negro en el footer */}
      <Footer startsDark={false} />
      
    </main>
  );
};

export default Projects;