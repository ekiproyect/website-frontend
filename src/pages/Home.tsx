import { useState, useEffect } from 'react';
import { IntroOverlay } from '../components/home/IntroOverlay';
import { RotatingTitleHero } from '../components/home/RotatingTitleHero';
import { HeroTakeoverStage } from '../components/home/HeroTakeoverStage';
import { ProjectsVideoSection } from '../components/home/ProjectsVideoSection';
import { ProjectsCarousel } from '../components/home/ProjectsCarousel';
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

  return (
    <div className="relative bg-zinc-50 text-zinc-900">
      {/* Fondo grilla */}
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

      {/* Hero + takeover */}
      <HeroTakeoverStage coverAtVh={1.0} startReveal={0.18}>
        <RotatingTitleHero animate={introDone} />
      </HeroTakeoverStage>

      {/* Secciones dark normales */}
      <div className="relative z-10 bg-zinc-950 text-white">
        <ProjectsVideoSection />
        <ProjectsCarousel />
      </div>

      {/* Navbar */}
      <FloatingNav introDone={introDone} />

      {/* Intro inicial */}
      {!introDone && <IntroOverlay onFinish={handleIntroFinish} />}
    </div>
  );
};

export default Home;