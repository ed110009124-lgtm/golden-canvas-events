import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

type Item = { quote: string; name: string; role: string; img: string };
type TestimonialsContent = { eyebrow: string; heading: string; items: Item[] };

const defaults: TestimonialsContent = {
  eyebrow: "Praise",
  heading: "Stories From Our Guests of Honor",
  items: [
    {
      quote:
        "Mileyn turned our wedding into a film. Every detail was breathtaking — guests are still talking about it months later.",
      name: "Ava & Daniel",
      role: "Bride & Groom",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    },
    {
      quote:
        "The most flawless brand launch we have ever produced. Cinematic, on-brand, and executed with surgical precision.",
      name: "Lara Mensah",
      role: "CMO, Nova Studios",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      quote:
        "From the first call to the last toast, it was effortless. A truly luxurious, stress-free experience.",
      name: "Olivier Adebayo",
      role: "Private Client",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
  ],
};

export function Testimonials() {
  const c = useSiteContent<TestimonialsContent>("testimonials", defaults);

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
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">{c.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            {c.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.items.map((t, i) => (
            <motion.div
              key={t.name + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative p-8 glass border border-gold/15 hover:border-gold/40 transition-colors flex flex-col"
            >
              <Quote className="absolute top-5 right-5 text-gold/30" size={28} />
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-1 ring-gold/40 flex-shrink-0">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-wider-luxe text-gold mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mt-5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 font-serif italic text-white/90 text-base leading-relaxed flex-1">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
