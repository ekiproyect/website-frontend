export const ZoomHero = () => {
  return (
    <div
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(to bottom right, #000000, #0a0a1a, #0d0d2b)',
      }}
    >
      <style>{`
        @keyframes hero-grain {
          0%, 100% { transform: translate(0, 0); }
          10%  { transform: translate(-5%, -5%); }
          20%  { transform: translate(-10%, 5%); }
          30%  { transform: translate(5%, -10%); }
          40%  { transform: translate(-5%, 15%); }
          50%  { transform: translate(-10%, 5%); }
          60%  { transform: translate(15%, 0); }
          70%  { transform: translate(0, 10%); }
          80%  { transform: translate(-15%, 0); }
          90%  { transform: translate(10%, 5%); }
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%  { transform: translateY(-20px) translateX(10px); }
          66%  { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes hero-float-organic {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(15px, -15px) scale(1.1); }
          50%  { transform: translate(-10px, -25px) scale(0.9); }
          75%  { transform: translate(-20px, -10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes hero-orbital {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
      `}</style>

      {/* Fondo vivo (static version — no parallax) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #000000 100%), linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
        }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            animation: 'hero-grain 8s steps(10) infinite',
          }}
        />

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/30 rounded-full"
          style={{ animation: 'hero-float 6s ease-in-out infinite' }} />
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500/25 rounded-full"
          style={{ animation: 'hero-float 8s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-500/30 rounded-full"
          style={{ animation: 'hero-float 7s ease-in-out infinite 2s' }} />

        {/* Organic blobs */}
        <div className="hidden md:block absolute top-1/4 left-1/3 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl"
          style={{ animation: 'hero-float-organic 12s ease-in-out infinite' }} />
        <div className="hidden md:block absolute top-2/3 right-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"
          style={{ animation: 'hero-float-organic 10s ease-in-out infinite 3s' }} />
        <div className="hidden md:block absolute bottom-1/4 left-1/4 w-20 h-20 bg-pink-600/10 rounded-full blur-3xl"
          style={{ animation: 'hero-float-organic 15s ease-in-out infinite 5s' }} />

        {/* Orbital particles */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/40 rounded-full"
          style={{ animation: 'hero-orbital 25s linear infinite' }} />
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400/40 rounded-full"
          style={{ animation: 'hero-orbital 20s linear infinite reverse' }} />
      </div>

      {/* EKI PROJECT + Tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[5] pointer-events-none">
        <div className="text-center space-y-4 md:space-y-6 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight md:tracking-normal">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              EKI PROJECT
            </span>
          </h1>

          <div className="h-0.5 w-32 md:h-1 md:w-64 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

          <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-light tracking-wide text-center px-4 sm:px-6 max-w-3xl w-full mx-auto">
            <span className="text-gray-300">
              Transformación digital,{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                innovación constante
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};