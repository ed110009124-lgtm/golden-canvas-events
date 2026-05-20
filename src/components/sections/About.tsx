import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about.jpg";

const bullets = [
  "Luxury Execution",
  "Seamless Coordination",
  "Creative Direction",
  "Premium Styling",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1"
        >
          <motion.img
            src={aboutImg}
            alt="A close-up of a candlelit tablescape — gold-rimmed china, crystal stemware, white peonies in soft focus"
            loading="lazy"
            style={{ y }}
            className="absolute inset-0 w-full h-[115%] object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-gold/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">About Mileyn</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white leading-[1.1] text-balance">
            Where Every Moment Becomes A Memory
          </h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Mileyn Events is a luxury experience house built on creativity, discipline, and an
              obsessive eye for the details guests never quite name — but always remember.
            </p>
            <p>
              We've learned that the most important person at a wedding isn't always the couple —
              sometimes it's the mother of the bride. We plan accordingly.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white text-sm">
                <span className="w-1.5 h-1.5 bg-gold rotate-45" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
