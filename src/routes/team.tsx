import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { useSiteContent } from "@/hooks/use-site-content";

type TeamGroup = { title: string; description: string; img: string };

const defaults: TeamGroup[] = [
  {
    title: "The Production Team",
    description:
      "Stage managers, technical leads and run-of-show producers. On site from load-in to last car out — invisible to your guests, indispensable to the evening.",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
  },
  {
    title: "The Design Studio",
    description:
      "Florists, set designers, lighting and tablescape stylists. They build rooms that feel like memories before the first guest arrives.",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
  },
  {
    title: "Client Experience",
    description:
      "Your single point of trust through every meeting, vendor call and late-night decision. Anticipating questions you haven't asked yet.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=80",
  },
  {
    title: "Media & Storytelling",
    description:
      "Cinematographers, editorial photographers and content leads who quietly document the evening as it unfolds.",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80",
  },
  {
    title: "Hospitality & Service",
    description:
      "Trained captains, sommeliers and floor staff. Briefed on every guest, every dietary, every preference — long before the doors open.",
    img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1400&q=80",
  },
  {
    title: "Logistics & Travel",
    description:
      "Destination coordinators handling flights, customs, transfers and accommodations across multiple cities and time zones.",
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80",
  },
];

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet The Team — Mileyn Events" },
      {
        name: "description",
        content:
          "The atelier behind Mileyn Events — production, design, hospitality and media teams crafting cinematic luxury experiences.",
      },
      { property: "og:title", content: "Meet The Atelier — Mileyn Events" },
      {
        property: "og:description",
        content: "The teams who quietly choreograph every Mileyn Events production.",
      },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const team = useSiteContent<TeamGroup[]>("team_groups", defaults);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-20 px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">The Atelier</span>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl text-white">Meet The Team</h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light">
            Six discrete teams working in quiet coordination — each chosen for taste, restraint and obsessive craft.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((g, i) => (
            <motion.article
              key={g.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
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
