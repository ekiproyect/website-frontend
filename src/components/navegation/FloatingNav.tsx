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
    
    // 🔥 ESTADO DEL MENÚ MÓVIL 🔥
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Animation refs
    const pillRef   = useRef<HTMLDivElement>(null);
    const logoRef   = useRef<HTMLButtonElement>(null);
    const itemRefs  = useRef<(HTMLButtonElement | null)[]>([]);

    const menuItems: Item[] = useMemo(
        () => [
            { path: "/", label: "Inicio", type: "route" },
            { path: "/proyectos", label: "Proyectos", type: "route" },
            { path: "/equipo", label: "Equipo", type: "route" },
            { path: "/contacto", label: "Contacto", type: "route" },
        ],
        []
    );

   // Single scoped effect: GSAP maneja la entrada sin playedRefs
    useLayoutEffect(() => {
        const pill  = pillRef.current;
        const logo  = logoRef.current;
        const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
        if (!pill) return;

        const ctx = gsap.context(() => {
            // ── Estado inicial oculto (siempre se aplica) ──
            gsap.set(pill, { visibility: 'visible', autoAlpha: 0, scaleX: 0, transformOrigin: "left center", willChange: "transform, opacity" });
            gsap.set(logo, { visibility: 'visible', autoAlpha: 0, scale: 0.7, willChange: "transform, opacity" });
            gsap.set(items, { autoAlpha: 0, y: 8, willChange: "transform, opacity" });

            // ── Si la intro no ha terminado, pausamos aquí ──
            if (!introDone) return;

            // ── Si la intro terminó, disparamos la línea de tiempo ──
            const tl = gsap.timeline({ defaults: { ease: "power3.out", overwrite: "auto" } })
                .to(logo,  { autoAlpha: 1, scale: 1, duration: 0.32 }, 0)
                .to(pill,  { autoAlpha: 1, scaleX: 1, duration: 0.42, ease: "power2.out" }, 0.08)
                .to(items, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.05 }, 0.32);
        });

        // Limpieza automática a prueba de Strict Mode
        return () => ctx.revert();
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
        setIsMobileMenuOpen(false); // Cierra el menú al hacer clic
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
        <>
            <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[300]">
                <div
                    ref={pillRef}
                    className={[
                        "flex items-center gap-2 md:gap-6", // Menos gap en móvil
                        "rounded-2xl border",
                        "bg-white/80 backdrop-blur-xl",
                        "p-2 pr-3 md:px-4 md:py-3", // Mucho más ajustado en móvil
                        "shadow-lg shadow-black/8",
                        scrolled ? "border-black/12" : "border-black/8",
                    ].join(" ")}
                    style={{ visibility: 'hidden' }}
                >
                    <button
                        ref={logoRef}
                        onClick={() => goToItem({ path: "/", label: "Inicio", type: "route" })}
                        className="flex items-center gap-3 shrink-0"
                        aria-label="Ir al inicio"
                    >
                        <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center font-black text-white text-sm md:text-base">
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

                    {/* Botón Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="px-4 py-2 rounded-xl text-sm font-bold text-zinc-900 bg-black/5 hover:bg-black/10 transition-colors"
                        >
                            Menú
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔥 EL OVERLAY DEL MENÚ MÓVIL A PANTALLA COMPLETA 🔥 */}
            <div 
                className={`fixed inset-0 bg-zinc-950 text-white z-[400] flex flex-col justify-center px-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                {/* Botón Cerrar */}
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-medium text-lg"
                >
                    ✕
                </button>

                <nav className="flex flex-col gap-6">
                    <span className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">Navegación</span>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => goToItem(item)}
                            className="text-5xl font-black font-heading text-left tracking-tighter"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
};