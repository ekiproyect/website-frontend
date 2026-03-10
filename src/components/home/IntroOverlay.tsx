"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IntroOverlayProps {
    onFinish: () => void;
}

export function IntroOverlay({ onFinish }: IntroOverlayProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const hasPlayedRef = useRef(false);

    useLayoutEffect(() => {
        if (hasPlayedRef.current) return;
        hasPlayedRef.current = true;

        // Bloqueamos el scroll mientras dura la intro
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = prevOverflow;
                    onFinish();
                }
            });

            // 1. Entrada elegante: Aparece, crece un 2% y separa las letras sutilmente
            tl.fromTo(textRef.current,
                { opacity: 0, scale: 0.98, letterSpacing: "0.1em" },
                { opacity: 1, scale: 1, letterSpacing: "0.3em", duration: 1.4, ease: "power3.out", delay: 0.3 }
            )
            // 2. Despedida del texto: Sube un poquito y se desvanece
            .to(textRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut"
            }, "+=0.5") // Mantiene el texto visible medio segundo antes de irse
            // 3. El Telón: Todo el fondo negro sube y revela la web
            .to(rootRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            }, "-=0.3"); // Empieza a subir un poco antes de que el texto desaparezca del todo

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
            // Un fondo negro absoluto, sin distracciones
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 text-zinc-50 pointer-events-none"
        >
            <div
                ref={textRef}
                // Tipografía limpia, sin sombras pesadas
                className="text-4xl md:text-5xl lg:text-6xl font-black uppercase"
                style={{ willChange: 'transform, opacity, letter-spacing' }}
            >
                EKI
            </div>
        </div>
    );
}