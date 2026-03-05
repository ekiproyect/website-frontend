import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface IntroOverlayProps {
    onFinish: () => void;
}

export function IntroOverlay({ onFinish }: IntroOverlayProps) {
    const rootRef       = useRef<HTMLDivElement>(null);
    const titleRef      = useRef<HTMLDivElement>(null);
    const lightSweepRef = useRef<HTMLDivElement>(null);
    const bgWhiteRef    = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    // Guard: prevent double-play in React 18 StrictMode / HMR
    const hasPlayedRef = useRef(false);

    useLayoutEffect(() => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        // Block scroll during intro
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            // Make root visible (starts at opacity 0 in JSX)
            gsap.set(rootRef.current, { autoAlpha: 1 });

            // EKI: starts slightly below scale 1 and invisible
            gsap.set(titleRef.current, {
                opacity: 0,
                scale: 0.98,
                y: 0,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
            });

            // White fade overlay: hidden initially
            gsap.set(bgWhiteRef.current, { opacity: 0 });

            // Light sweep (desktop only)
            if (!mobile && lightSweepRef.current) {
                gsap.set(lightSweepRef.current, { x: '-120%' });
                gsap.to(lightSweepRef.current, {
                    x: '120%',
                    duration: 2.8,
                    ease: 'power2.inOut',
                    repeat: -1,
                    repeatDelay: 2.5,
                });
            }

            // Scale target — large enough to clip completely at any viewport
            const zoomScale = mobile ? 12 : 9;

            // Main timeline: EKI rushes into camera → white flash → done
            const tl = gsap.timeline({
                defaults: { ease: 'power2.out' },
                onComplete: () => {
                    document.body.style.overflow = prevOverflow;
                    onFinish();
                },
            });

            // 1) Quick entrance: fade in + settle to scale 1
            tl.to(titleRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.25,
                ease: 'power2.out',
            }, 0)

            // 2) Zoom into camera — no opacity reduction during main zoom
            .to(titleRef.current, {
                scale: zoomScale,
                y: -40,
                duration: 1.1,
                ease: 'power3.in',
            }, 0.25)

            // 3) White overlay fades in during last ~30% of zoom
            .to(bgWhiteRef.current, {
                opacity: 1,
                duration: 0.38,
                ease: 'power2.in',
            }, 0.25 + 1.1 * 0.68)

            // 4) Hold white briefly then snap out (no rootRef fade — instant hide via autoAlpha)
            .set(rootRef.current, { autoAlpha: 0 }, '+=0.05');
        }, rootRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = prevOverflow;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{
                background: '#09090b',
                opacity: 0, // GSAP sets autoAlpha: 1 before timeline starts
            }}
        >
            {/* CSS keyframes */}
            <style>{`
        @keyframes intro-grain {
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
        @keyframes intro-float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%  { transform: translateY(-20px) translateX(10px); }
          66%  { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes intro-float-organic {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(15px, -15px) scale(1.1); }
          50%  { transform: translate(-10px, -25px) scale(0.9); }
          75%  { transform: translate(-20px, -10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes intro-orbital {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
      `}</style>

            {/* ── Fondo vivo ── */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'radial-gradient(ellipse at top, #18181b 0%, #09090b 60%, #000000 100%)',
                }}
            >
                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                        animation: 'intro-grain 8s steps(10) infinite',
                    }}
                />

                {/* Light sweep (desktop only) */}
                {!isMobile && (
                    <div
                        ref={lightSweepRef}
                        className="absolute top-0 left-0 w-32 h-full opacity-20 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                            filter: 'blur(50px)',
                            transform: 'translateX(-120%)',
                        }}
                    />
                )}

                {/* Floating particles */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full"
                    style={{ animation: 'intro-float 6s ease-in-out infinite' }} />
                <div className="absolute top-40 right-32 w-3 h-3 bg-white/15 rounded-full"
                    style={{ animation: 'intro-float 8s ease-in-out infinite 1s' }} />
                <div className="absolute bottom-32 left-40 w-2 h-2 bg-white/20 rounded-full"
                    style={{ animation: 'intro-float 7s ease-in-out infinite 2s' }} />

                {/* Organic blobs (desktop only) */}
                {!isMobile && (
                    <>
                        <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-3xl"
                            style={{ animation: 'intro-float-organic 12s ease-in-out infinite' }} />
                        <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl"
                            style={{ animation: 'intro-float-organic 10s ease-in-out infinite 3s' }} />
                        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-3xl"
                            style={{ animation: 'intro-float-organic 15s ease-in-out infinite 5s' }} />
                    </>
                )}

                {/* Orbital particles */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/40 rounded-full"
                    style={{ animation: 'intro-orbital 25s linear infinite' }} />
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400/40 rounded-full"
                    style={{ animation: 'intro-orbital 20s linear infinite reverse' }} />
            </div>

            {/* ── EKI text ── */}
            <div
                ref={titleRef}
                className="relative z-10 text-[25vw] sm:text-[22vw] md:text-[25vw] font-black tracking-tighter"
                style={{ transformOrigin: 'center center' }}
            >
                <h1 aria-label="EKI">
                    <span className="text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.25)]">
                        EKI
                    </span>
                </h1>
            </div>

            {/* ── White flash overlay (crossfade to hero bg) ── */}
            <div
                ref={bgWhiteRef}
                className="absolute inset-0 z-20 pointer-events-none bg-zinc-50"
            />
        </div>
    );
}
