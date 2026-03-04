import { useState, useEffect, useRef } from 'react';
import { IntroOverlay } from '../components/home/IntroOverlay';
import { RotatingTitleHero } from '../components/home/RotatingTitleHero';
import { HeroTakeoverStage } from '../components/home/HeroTakeoverStage';
import { ProjectsVideoSection } from '../components/home/ProjectsVideoSection';
import { FloatingNav } from '../components/navegation/FloatingNav';

const INTRO_KEY = 'eki_intro_done';

const Home = () => {
  const [introDone, setIntroDone] = useState<boolean>(
    () => !import.meta.env.DEV && sessionStorage.getItem(INTRO_KEY) === '1'
  );

  useEffect(() => {
    if (introDone) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [introDone]);

  const handleIntroFinish = () => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setIntroDone(true);
    window.scrollTo(0, 0);
  };
  const START_REVEAL = 0.18;
  // Ref al contenedor del dark content — HeroTakeoverStage lo anima con translateY
  const darkContentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-zinc-50 text-zinc-900 relative">
      {/* z-0 — grilla decorativa fija */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/*
        Dark content: fixed durante el takeover, sincronizado con translateY.
        Arranca translateY(100vh) y baja a 0 mientras el panel sube.
        z-[9] — debajo del panel negro (z-10) pero visible dentro de él.
      */}
      <div
        ref={darkContentRef}
        className="fixed inset-0 z-[9] bg-zinc-950 text-white flex items-center justify-center overflow-hidden"
        style={{ transform: 'translateY(100vh)', willChange: 'transform' }}
      >
        <ProjectsVideoSection />
      </div>

      {/* Stage: hero pinned + panel negro que sube */}
      <HeroTakeoverStage
        coverAtVh={1.2}
        startReveal={START_REVEAL}
        darkContentRef={darkContentRef}
      >
        <RotatingTitleHero animate={introDone} />
      </HeroTakeoverStage>

      {/* Contenido dark real post-takeover — scrolleable */}
      <div className="relative bg-zinc-950 text-white">
        <ProjectsVideoSection />
      </div>

      {/* z-[200] — navbar */}
      <FloatingNav />

      {/* z-[300] — intro overlay */}
      {!introDone && <IntroOverlay onFinish={handleIntroFinish} />}
    </div>
  );
};

export default Home;

