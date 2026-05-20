import { motion } from "framer-motion";

const items = [
  "Featured in Luxury Events Magazine",
  "International Event Association Member",
  "Insured & Licensed",
  "Available Worldwide",
];

export function TrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="border-y border-gold/15 py-8"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
        {items.map((t, i) => (
          <div key={t} className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-wider-luxe text-white/60">{t}</span>
            {i < items.length - 1 && <span className="w-1 h-1 rounded-full bg-gold/60" />}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
