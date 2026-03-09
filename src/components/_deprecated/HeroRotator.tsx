import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_WORDS = [
  "Data Engineering",
  "Full Stack Engineering",
  "IA Engineering",
  "Cloud Engineering",
];

export function HeroRotator({
  words = DEFAULT_WORDS,
  interval = 2500,
  className = "",
}: {
  words?: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!words.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <div
      className={
        "block w-full h-[1.5em] overflow-hidden [perspective:800px] leading-none " +
        className
      }
      aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          className="block text-inherit will-change-transform [transform:translateZ(0)]"
          initial={{ y: "110%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-110%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default HeroRotator;
