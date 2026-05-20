import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = ["M", "I", "L", "E", "Y", "N"];

export function BrandIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"dot" | "letters" | "events" | "travel" | "done">("dot");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("letters"), 500);
    const t2 = setTimeout(() => setPhase("events"), 1300);
    const t3 = setTimeout(() => setPhase("travel"), 3200);
    const t4 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 4400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone, reduce]);

  if (reduce) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const bigSize = isMobile ? 48 : 80;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
    >
      {phase === "dot" && (
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-gold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.4], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        />
      )}

      <motion.div
        className="absolute"
        initial={false}
        animate={
          phase === "travel" || phase === "done"
            ? {
                top: isMobile ? 20 : 28,
                left: isMobile ? 20 : 40,
                x: 0,
                y: 0,
              }
            : {
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }
        }
        transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
        style={{ display: phase === "dot" ? "none" : "block" }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="font-serif font-bold text-white uppercase flex"
            animate={{
              fontSize:
                phase === "travel" || phase === "done"
                  ? isMobile
                    ? 22
                    : 28
                  : bigSize,
            }}
            transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
            style={{ letterSpacing: "0.1em" }}
          >
            {LETTERS.map((l, i) => (
              <motion.span
                key={l}
                initial={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 30,
                  y: (Math.random() - 0.5) * 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: phase === "letters" ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  delay: 0.05 * i,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  scale: { delay: 0.5, duration: 0.3 },
                }}
              >
                {l}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "events" || phase === "travel" || phase === "done" ? 1 : 0 }}
            transition={{ duration: 0.4, delay: phase === "events" ? 0 : 0 }}
            className="font-sans font-normal text-white/80 mt-2"
            style={{
              fontSize: phase === "travel" || phase === "done" ? (isMobile ? 9 : 10) : 24,
              letterSpacing: "0.3em",
              transition: "font-size 1s cubic-bezier(0.65,0,0.35,1)",
            }}
          >
            EVENTS
          </motion.div>

          <motion.div
            className="h-px bg-gold mt-2"
            initial={{ width: 0 }}
            animate={{ width: phase === "travel" || phase === "done" ? "100%" : 0 }}
            transition={{ duration: 0.4, delay: phase === "travel" ? 0.6 : 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
