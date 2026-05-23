import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/use-site-content";

type TeamGroup = { title: string; description: string; img: string };

const defaults: TeamGroup[] = [
  {
    title: "Moments In The Making",
    description:
      "Behind every flawless evening is a team in motion — placing florals, dressing tables, rehearsing cues long before the first guest arrives.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
  },
  {
    title: "The Quiet Choreography",
    description:
      "Stage managers, designers and hospitality leads working in calm coordination — so the night feels effortless to everyone but us.",
    img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1400&q=80",
  },
  {
    title: "Happy Hands At Work",
    description:
      "We love what we do — and it shows. From load-in to last toast, our team carries the room with care, craft and a little joy.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
  },
];

export function TeamPreview() {
  const team = useSiteContent<TeamGroup[]>("team_preview", defaults);

  return (
    <section id="team" className="pt-24 pb-12 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">The Team</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white">
            Happy Memories, <em className="italic font-light">Made By Hand</em>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light">
            Glimpses of the people behind every Mileyn evening — arranging, rehearsing and quietly making magic.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.slice(0, 3).map((g, i) => (
            <motion.article
              key={g.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-gold/15 hover:border-gold/40 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-xl text-white">{g.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {g.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/team"
            className="inline-block px-10 py-4 border border-gold/40 text-gold text-xs uppercase tracking-luxe hover:bg-gold hover:text-background transition-all"
          >
            More From The Atelier
          </Link>
        </div>
      </div>
    </section>
  );
}
