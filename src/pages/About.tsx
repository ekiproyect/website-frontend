import { useEffect } from "react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";

// Tus 2 nuevos componentes minimalistas:
import { AboutIntro } from "../components/AboutIntro";
import { MinimalTeam } from "../components/MinimalTeam";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // La página inicia en blanco (zinc-50) para que el nav no choque con el fondo
    <main className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900 min-h-screen">
      
      <FloatingNav introDone={true} />

      {/* 1. BLANCO: Texto gigante y la historia */}
      <AboutIntro />

      {/* 2. NEGRO: El grid del equipo al estilo Edge Studio */}
      <MinimalTeam />

      {/* 3. APAGÓN: El Footer oscuro (si usas la versión que hicimos antes, 
          ajusta su fondo inicial a bg-zinc-950 para que no haya línea de corte con el equipo) */}
      <Footer startsDark={true}/>
      
    </main>
  );
};

export default About;