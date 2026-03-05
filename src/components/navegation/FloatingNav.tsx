import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

type Item =
    | { path: string; label: string; type: "route" }
    | { path: `#${string}`; label: string; type: "scroll" };

interface FloatingNavProps {
    introDone?: boolean;
}

export const FloatingNav = ({ introDone = false }: FloatingNavProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Animation refs
    const pillRef   = useRef<HTMLDivElement>(null);
    const logoRef   = useRef<HTMLButtonElement>(null);
    const itemRefs  = useRef<(HTMLButtonElement | null)[]>([]);
    // StrictMode guard — entrance runs exactly once
    const playedRef = useRef(false);

    const menuItems: Item[] = useMemo(
        () => [
            { path: "/", label: "Inicio", type: "route" },
            { path: "#filosofia", label: "Filosofía", type: "scroll" },
            { path: "#servicios", label: "Servicios", type: "scroll" },
            { path: "#tecnologias", label: "Tecnologías", type: "scroll" },
            { path: "#proyectos", label: "Proyectos", type: "scroll" },
            { path: "#team", label: "Equipo", type: "scroll" },
        ],
        []
    );

    // Single scoped effect: set initial hidden state + run entrance when introDone fires
    useLayoutEffect(() => {
        const pill  = pillRef.current;
        const logo  = logoRef.current;
        const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
        if (!pill) return;

        // Scope everything inside a gsap.context tied to the pill container
        const ctx = gsap.context(() => {
            // ── Always: hard-set GSAP initial state (CSS visibility:hidden already guards frame 0) ──
            gsap.set(pill, {
                visibility: 'visible', // hand off from CSS to GSAP
                autoAlpha: 0,
                scaleX: 0,
                transformOrigin: "left center",
                willChange: "transform, opacity",
            });
            gsap.set(logo, { visibility: 'visible', autoAlpha: 0, scale: 0.7, willChange: "transform, opacity" });
            gsap.set(items, { autoAlpha: 0, y: 8, willChange: "transform, opacity" });

            // ── Entrance: only when introDone and never replayed ──
            if (!introDone || playedRef.current) return;
            playedRef.current = true;

            const tl = gsap.timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
                // 1. Logo scales in first
                .to(logo,  { autoAlpha: 1, scale: 1, duration: 0.32 }, 0)
                // 2. Pill stretches from logo outward
                .to(pill,  { autoAlpha: 1, scaleX: 1, duration: 0.42, ease: "power2.out" }, 0.08)
                // 3. Items stagger in after pill is mostly open
                .to(items, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.05 }, 0.32);

            // Start on next frame to avoid layout-shift conflicts
            tl.pause();
            requestAnimationFrame(() => tl.play(0));
        });

        return () => {
            ctx.revert();
            // Reset guard only if intro hasn't fired yet (cleanup before mount completes)
            if (!introDone) playedRef.current = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [introDone]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 6);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const performScroll = (sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const goToItem = (item: Item) => {
        if (item.type === "route") {
            navigate(item.path);
            return;
        }

        const id = item.path.replace("#", "");
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => performScroll(id), 50);
        } else {
            performScroll(id);
        }
    };

    const isActive = (item: Item) => {
        if (item.type === "route") return location.pathname === item.path;
        return location.pathname === "/" && location.hash === item.path;
    };

    return (
        <div className="fixed top-6 left-6 z-[300]">
            <div
                ref={pillRef}
                className={[
                    "flex items-center gap-6",
                    "rounded-2xl border",
                    "bg-white/80 backdrop-blur-xl",
                    "px-4 py-3",
                    "shadow-lg shadow-black/8",
                    scrolled ? "border-black/12" : "border-black/8",
                ].join(" ")}
                style={{ visibility: 'hidden' }}
            >
                {/* Logo / Marca */}
                <button
                    ref={logoRef}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3"
                    aria-label="Ir al inicio"
                    style={{ visibility: 'hidden' }}
                >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-black text-white">
                        EKI
                    </div>
                </button>

                {/* Links desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {menuItems.map((item, i) => (
                        <button
                            key={item.path}
                            ref={(el) => { itemRefs.current[i] = el; }}
                            onClick={() => goToItem(item)}
                            className={[
                                "px-4 py-2 rounded-xl text-sm font-semibold transition-colors",
                                isActive(item)
                                    ? "text-zinc-900 bg-black/8"
                                    : "text-zinc-600 hover:text-zinc-900 hover:bg-black/5",
                            ].join(" ")}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Links mobile (compacto) */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={() => navigate("/")}
                        className="px-3 py-2 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition-colors"
                    >
                        Menú
                    </button>
                </div>
            </div>
        </div>
    );
};
