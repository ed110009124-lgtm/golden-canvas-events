import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { cases } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Mileyn Events" },
      {
        name: "description",
        content:
          "Signature experiences from Mileyn Events — weddings, galas, launches, outdoor experiences and destination productions.",
      },
      { property: "og:title", content: "Portfolio — Mileyn Events" },
      { property: "og:description", content: "Full archive of Mileyn Events productions." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="pt-40 pb-20 px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Portfolio</span>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl text-white">The Full Archive</h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light">
            Weddings, galas, launches, outdoor experiences, intimate dinners — every production we've quietly delivered.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cases.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
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
                  <h3 className="font-serif text-lg md:text-2xl text-white leading-snug">
                    {w.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link
            to="/"
            hash="contact"
            className="inline-block px-10 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all"
          >
            Begin Your Vision
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
