import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Item =
    | { path: string; label: string; type: "route" }
    | { path: `#${string}`; label: string; type: "scroll" };

export const FloatingNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

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
        // 📌 FLOTANTE: puedes cambiar a top-6 left-6 si lo quieres más “esquina”
        <div className="fixed top-6 left-6 z-[300]">
            <div
                className={[
                    "flex items-center gap-6",
                    "rounded-2xl border",
                    "bg-white/80 backdrop-blur-xl",
                    "px-4 py-3",
                    "shadow-lg shadow-black/8",
                    scrolled ? "border-black/12" : "border-black/8",
                ].join(" ")}
            >
                {/* Logo / Marca */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3"
                    aria-label="Ir al inicio"
                >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-black text-white">
                        EKI
                    </div>
                </button>

                {/* Links desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => goToItem(item)}
                            className={[
                                "px-4 py-2 rounded-xl text-sm font-semibold transition",
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
                    {/* si quieres, aquí después metemos un dropdown/hamburger para mobile */}
                    <button
                        onClick={() => navigate("/")}
                        className="px-3 py-2 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition"
                    >
                        Menú
                    </button>
                </div>
            </div>
        </div>
    );
};