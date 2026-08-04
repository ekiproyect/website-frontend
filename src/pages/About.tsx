import { useEffect } from "react";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { Footer } from "../components/Footer";
import { TeamShowcase } from "../components/team/TeamShowcase";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-zinc-50 text-zinc-900">
      <FloatingNav introDone={true} />

      {/* Ocupa la pantalla completa: el equipo se ve al entrar, sin scroll */}
      <TeamShowcase />

      {/* startsDark={false} como en /proyectos: el apagón lo dispara el footer
          sobre la sección anterior, en vez de que la sección lo haga por su cuenta */}
      <Footer startsDark={false} />
    </main>
  );
};

export default About;
