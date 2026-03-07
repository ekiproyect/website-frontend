import { useState, useEffect } from "react";
import { IntroOverlay } from "../components/home/IntroOverlay";
import { FloatingNav } from "../components/navegation/FloatingNav";
import { HeroScroll } from "../components/HeroScroll";

const INTRO_KEY = "eki_intro_done";

const Home = () => {
  const [introDone, setIntroDone] = useState<boolean>(
    () => !import.meta.env.DEV && sessionStorage.getItem(INTRO_KEY) === "1"
  );

  // Reset scroll cuando termina el intro
  useEffect(() => {
    if (introDone) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [introDone]);

  const handleIntroFinish = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroDone(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      {/* Grilla decorativa (opcional, pero no estorba) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Navbar flotante */}
      <FloatingNav introDone={introDone} />

      {/* Hero + transición + sección negra (todo vive dentro de HeroScroll) */}
      <div className="relative z-10">
        <HeroScroll  />
      </div>

      {/* Intro overlay (encima de todo) */}
      {!introDone && <IntroOverlay onFinish={handleIntroFinish} />}
    </div>
  );
};

export default Home;