import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cases } from "@/lib/portfolio-data";

export function Portfolio() {
  const featured = cases.slice(0, 6);

  return (
    <section id="portfolio" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Portfolio</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white">Signature Experiences</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <Link
                to="/portfolio/$slug"
                params={{ slug: w.slug }}
                className="group relative block w-full aspect-[3/4] overflow-hidden"
              >
                <img
                  src={w.cover}
                  alt={`${w.category} — ${w.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent group-hover:from-background/85 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="text-[9px] uppercase tracking-wider-luxe text-gold mb-1">
                    {w.category}
                  </div>
                  <h3 className="font-serif text-lg md:text-2xl text-white leading-snug">{w.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-10 py-4 border border-gold text-gold text-xs uppercase tracking-luxe hover:bg-gold hover:text-background transition-all"
          >
            See More Experiences
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
