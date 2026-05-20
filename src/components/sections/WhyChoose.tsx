import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const without = [
  "Stressful last-minute planning",
  "Poor vendor coordination",
  "Unreliable execution",
  "Generic, uninspired décor",
];
const withUs = [
  "Elegant by design",
  "Detail-obsessed",
  "Reliable & on time",
  "Stress-free for you",
];

export function WhyChoose() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Our Promise</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            We Replace Chaos With Calm
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            We've seen what happens when an event has no commander. It's not pretty. We are the calmest people in any room — and that calm spreads.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="p-10 border border-destructive/20 bg-destructive/[0.05]"
          >
            <div className="text-[10px] uppercase tracking-wider-luxe text-destructive/70 mb-6">
              Without Us
            </div>
            <ul className="space-y-4">
              {without.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/70">
                  <X size={16} className="text-destructive mt-1 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="p-10 border border-gold/40 glass shadow-[var(--shadow-gold-strong)] relative"
          >
            <div className="text-[10px] uppercase tracking-wider-luxe text-gold mb-6">
              The Mileyn Standard
            </div>
            <ul className="space-y-4">
              {withUs.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white">
                  <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
