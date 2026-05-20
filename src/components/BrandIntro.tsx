import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = ["M", "I", "L", "E", "Y", "N"];

export function BrandIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"letters" | "events" | "done">("letters");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("events"), 700);
    const t2 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 1900);
    return () => [t1, t2].forEach(clearTimeout);
  }, [onDone, reduce]);

  if (reduce) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center">
        <div
          className="font-serif font-bold text-white uppercase flex"
          style={{ fontSize: isMobile ? 44 : 76, letterSpacing: "0.1em" }}
        >
          {LETTERS.map((l, i) => (
            <motion.span
              key={l}
              initial={{
                opacity: 0,
                y: (Math.random() - 0.5) * 24,
                x: (Math.random() - 0.5) * 24,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.04 * i,
                duration: 0.5,
                type: "spring",
                stiffness: 110,
                damping: 14,
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{
            opacity: phase === "events" || phase === "done" ? 1 : 0,
            letterSpacing: "0.5em",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-white/80 mt-3"
          style={{ fontSize: isMobile ? 12 : 14 }}
        >
          EVENTS
        </motion.div>

        <motion.div
          className="h-px bg-gold mt-3"
          initial={{ width: 0 }}
          animate={{ width: phase === "events" || phase === "done" ? (isMobile ? 120 : 180) : 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>
    </motion.div>
  );
}
