import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const services = [
  {
    title: "Wedding Planning & Coordination",
    body: "We don't just plan weddings. We manage family dynamics, weather contingencies, and the one uncle who always drinks too much. Gracefully. Every moment is choreographed from first look to final dance.",
  },
  {
    title: "Corporate Events & Launches",
    body: "Brand storytelling through physical environment. We transform venues into living manifestations of your vision — for product launches, galas, conferences, and the press moments that move markets.",
  },
  {
    title: "Luxury Décor & Styling",
    body: "Sourced florals, custom installations, bespoke linens, ambient lighting design. Every tablescape tells a story before the first course arrives.",
  },
  {
    title: "Event Branding & Design",
    body: "Cohesive identity across invitations, signage, menus, programs, social-share assets. Your event becomes its own brand world — recognizable, photographable, ownable.",
  },
  {
    title: "Entertainment & Guest Experience",
    body: "Curated talent, hosted moments, interactive installations. We design the emotional arc of the evening so every guest leaves with a story they have to tell.",
  },
  {
    title: "Event Media & Social Coverage",
    body: "Cinematographers, editorial photographers, real-time social coverage. The event lives twice — once in the room, and forever after.",
  },
];

export function Services() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 px-6 lg:px-12 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">What We Do</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            A Complete Suite of Luxury Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.button
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className={`group relative text-left p-8 glass border transition-all duration-500 ${
                  isOpen
                    ? "border-gold/60 shadow-[var(--shadow-gold-strong)]"
                    : "border-gold/15 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-8 h-8 border border-gold/60 rotate-45 flex-shrink-0 flex items-center justify-center">
                    <span className="-rotate-45 text-gold text-xs">0{i + 1}</span>
                  </div>
                  <Plus
                    size={18}
                    className={`text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                  />
                </div>
                <h3 className="mt-6 font-serif text-xl text-white leading-snug">{s.title}</h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {s.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
