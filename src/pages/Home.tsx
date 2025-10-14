import { ZoomHero } from '../components/ZoomHero';
import { LoadingScreen } from '../components/LoadingScreen';
import { useEffect } from 'react';

const Home = () => {
  // Resetear scroll al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10">
        <LoadingScreen />
        <ZoomHero />
      </div>
    </div>
  );
};

export default Home;
