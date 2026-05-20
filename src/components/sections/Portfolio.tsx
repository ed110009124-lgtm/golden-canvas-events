import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const works = [
  { slug: "luxury-weddings", cat: "Luxury Weddings", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80" },
  { slug: "corporate-gala", cat: "Corporate Gala", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80" },
  { slug: "executive-launch", cat: "Executive Launch", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" },
  { slug: "birthday-experience", cat: "Birthday Experience", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80" },
  { slug: "vip-celebration", cat: "VIP Celebration", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80" },
  { slug: "destination-event", cat: "Destination Event", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80" },
];

export function Portfolio() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => {
    scroller.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 flex items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Portfolio</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white">Signature Experiences</h2>
        </div>
        <div className="hidden md:flex gap-3">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="w-12 h-12 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="w-12 h-12 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto px-6 lg:px-12 pb-6 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {works.map((w, i) => (
          <motion.div
            key={w.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex-shrink-0 w-[300px] md:w-[400px] h-[500px] snap-start"
          >
            <Link
              to="/portfolio/$slug"
              params={{ slug: w.slug }}
              className="group relative block w-full h-full overflow-hidden"
            >
              <img
                src={w.img}
                alt={`${w.cat} — a Mileyn Events signature production`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent group-hover:from-background/80 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-[10px] uppercase tracking-wider-luxe text-gold mb-2">
                  0{i + 1} / 0{works.length}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white">{w.cat}</h3>
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="border-b border-gold pb-0.5">View Experience</span>
                  <ChevronRight size={14} className="text-gold" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
