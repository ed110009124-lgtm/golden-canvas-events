import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services as defaultServices, type ServiceItem } from "@/lib/services-data";
import { useSiteContent } from "@/hooks/use-site-content";

export function Services() {
  const services = useSiteContent<ServiceItem[]>("services", defaultServices);
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group flex flex-col border border-gold/15 hover:border-gold/40 hover:shadow-[var(--shadow-gold)] transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider-luxe text-gold">
                  0{i + 1}
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-serif text-xl text-white leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.summary}
                </p>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-luxe text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
                >
                  Learn More
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
