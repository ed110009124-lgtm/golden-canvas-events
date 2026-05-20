import { motion } from "framer-motion";
import { GoldParticles } from "../GoldParticles";
import heroImg from "@/assets/hero.jpg";
import { useSiteContent } from "@/hooks/use-site-content";

type HeroContent = {
  headline_a: string;
  headline_b: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  stats: { n: string; l: string }[];
};

const defaults: HeroContent = {
  headline_a: "Luxury Events Crafted With",
  headline_b: "Precision & Elegance",
  subheadline:
    "From intimate celebrations to grand experiences, we turn moments into unforgettable memories.",
  cta_primary: "Book a Consultation",
  cta_secondary: "Explore Our Experiences",
  stats: [
    { n: "150+", l: "Events Executed" },
    { n: "80+", l: "Luxury Celebrations" },
    { n: "98%", l: "Client Satisfaction" },
    { n: "12+", l: "Years Experience" },
  ],
};

export function Hero({ ready }: { ready: boolean }) {
  const c = useSiteContent<HeroContent>("hero", defaults);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <motion.div
        initial={{ opacity: 0.4, scale: 1.05 }}
        animate={{ opacity: ready ? 0.55 : 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="A grand ballroom alight with hundreds of golden candles and chandeliers, reflecting off crystal glassware on a long elegant tablescape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <GoldParticles density={220} />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.h1
            initial={{ y: "100vh" }}
            animate={ready ? { y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 15, mass: 1.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-balance leading-[1.05]"
            style={{ letterSpacing: "0.01em" }}
          >
            {c.headline_a}
            <br />
            <span className="text-shimmer italic">{c.headline_b}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-base md:text-lg text-white/75 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {c.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#portfolio"
              className="px-8 py-4 border border-white/70 text-white text-xs uppercase tracking-luxe hover:bg-gold hover:border-gold hover:text-background transition-all"
            >
              {c.cta_secondary}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all"
            >
              {c.cta_primary}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 pb-12 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20 border-y border-gold/20"
        >
          {c.stats.map((s, i) => (
            <motion.div
              key={s.n + i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.0 + i * 0.15, type: "spring", stiffness: 200, damping: 14 }}
              className="bg-background/60 backdrop-blur-md py-6 text-center"
            >
              <div className="font-serif text-3xl md:text-4xl text-gold">{s.n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-luxe text-white/70">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
