"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export type GlowingEffectProps = {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
};

export const GlowingEffect = ({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  disabled = true,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate center of the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate angle from center to cursor
      const radians = Math.atan2(y - centerY, x - centerX);
      const degrees = radians * (180 / Math.PI) + 90; // Add 90 to align with gradient direction

      // Check if mouse is within proximity
      const isWithinProximity =
        x >= -proximity &&
        x <= rect.width + proximity &&
        y >= -proximity &&
        y <= rect.height + proximity;

      if (isWithinProximity) {
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        const maxDistance = Math.sqrt(
          Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
        );

        if (distanceFromCenter > maxDistance * inactiveZone) {
          setAngle(degrees);
          setIsHovering(true);
        } else if (glow) {
          setAngle(degrees);
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      } else if (glow) {
        setAngle(degrees);
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      if (!glow) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    const parent = containerRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (parent) {
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [disabled, proximity, inactiveZone, glow]);

  const gradientColors =
    variant === "white"
      ? "from-white via-gray-300 to-white"
      : "from-cyan-300 via-blue-400 to-blue-600";

  const isVisible = !disabled && (glow || isHovering);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: `${borderWidth}px`,
          background: `linear-gradient(${angle}deg, transparent, ${
            variant === "white" ? "#ffffff" : "#22d3ee"
          }, ${variant === "white" ? "#9ca3af" : "#3b82f6"}, ${
            variant === "white" ? "#ffffff" : "#1e40af"
          }, transparent)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${movementDuration}s ease, background ${movementDuration * 0.3}s ease`,
          filter: blur > 0 ? `blur(${blur}px)` : "none",
        }}
      />
    </div>
  );
};
