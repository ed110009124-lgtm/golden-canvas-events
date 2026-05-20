import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { useSiteContent } from "@/hooks/use-site-content";

type Member = { name: string; role: string; bio: string; img: string };

const defaults: Member[] = [
  {
    name: "Mileyn Adesanya",
    role: "Founder & Creative Director",
    bio: "Fifteen years orchestrating the world's most discreet celebrations. Trained in Paris, sharpened in Lagos, refined in London.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=80",
  },
  {
    name: "Selene Marchetti",
    role: "Head of Production",
    bio: "Former opera stage manager. Treats every wedding like a four-act performance — precise cues, zero visible seams.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
  },
  {
    name: "Idris Okonkwo",
    role: "Director of Design",
    bio: "Architect-turned-event-designer. Builds rooms that feel like memories before the first guest arrives.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
  },
  {
    name: "Naia Forsberg",
    role: "Client Experience Lead",
    bio: "Your single point of trust. Anticipates the question you haven't asked yet and answered it three days ago.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
  },
];

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet The Team — Mileyn Events" },
      { name: "description", content: "The atelier behind Mileyn Events — creative directors, producers and designers crafting cinematic luxury experiences." },
      { property: "og:title", content: "Meet The Atelier — Mileyn Events" },
      { property: "og:description", content: "The people who quietly choreograph every Mileyn Events production." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const team = useSiteContent<Member[]>("team_members", defaults);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-24 px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">The Atelier</span>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl text-white">Meet The Team</h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light">
            A small, deliberate ensemble — selected for taste, restraint, and obsessive craft.
          </p>
        </motion.div>
      </section>

      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={m.img}
                  alt={`${m.name} — ${m.role}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 ring-1 ring-gold/20" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-white">{m.name}</h3>
              <div className="text-[10px] uppercase tracking-wider-luxe text-gold mt-1">{m.role}</div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
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
