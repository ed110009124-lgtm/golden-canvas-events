import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    quote: "Mileyn turned our wedding into a film. Every detail was breathtaking — guests are still talking about it months later.",
    name: "Ava & Daniel",
    role: "Bride & Groom",
  },
  {
    quote: "The most flawless brand launch we have ever produced. Cinematic, on-brand, and executed with surgical precision.",
    name: "Lara Mensah",
    role: "CMO, Nova Studios",
  },
  {
    quote: "From the first call to the last toast, it was effortless. A truly luxurious, stress-free experience.",
    name: "Olivier Adebayo",
    role: "Private Client",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Praise</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            Stories From Our Guests of Honor
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="p-10 glass border border-gold/15 hover:border-gold/40 transition-colors flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif italic text-white/90 text-lg leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="mt-8 pt-6 border-t border-gold/15">
                <div className="text-white text-sm">{t.name}</div>
                <div className="text-[10px] uppercase tracking-wider-luxe text-gold mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
