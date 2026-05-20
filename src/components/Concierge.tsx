import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Concierge() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-strong mb-3 p-5 w-72 border border-gold/30"
          >
            <p className="text-white text-sm leading-relaxed font-serif italic">
              We're online and we're already excited about your event. That's not a line. We genuinely love this.
            </p>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-block mt-4 text-gold text-xs uppercase tracking-luxe border-b border-gold pb-0.5"
            >
              How can we begin?
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass flex items-center gap-2 px-4 py-2.5 rounded-full hover:border-gold/40 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
        <span className="text-xs uppercase tracking-luxe text-white/90">
          Our Curators Are Online
        </span>
      </button>
    </div>
  );
}
