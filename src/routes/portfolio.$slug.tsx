import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ChevronLeft } from "lucide-react";

type Case = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  cover: string;
  gallery: string[];
  client: string;
  location: string;
  guests: string;
  story: string[];
};

const cases: Case[] = [
  {
    slug: "luxury-weddings",
    category: "Luxury Weddings",
    title: "A Riviera Vow",
    subtitle: "Three days. One cliffside. A wedding rehearsed for a decade in their dreams.",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Private",
    location: "Cap-Ferrat, France",
    guests: "120",
    story: [
      "The brief: a wedding that felt like a film already in progress when the guests arrived. We took over a cliffside estate for three days, choreographed the light, and built a tablescape that ran the length of the terrace.",
      "Every place setting was numbered to a personal note. The first dance was scored live by a six-piece string ensemble flown in from Milan. By midnight, the staff had quietly replaced the candles three times.",
    ],
  },
  {
    slug: "corporate-gala",
    category: "Corporate Gala",
    title: "The Midnight Index",
    subtitle: "A black-tie press evening that became the headline.",
    cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    client: "Fortune 100 Financial",
    location: "Manhattan, NY",
    guests: "480",
    story: [
      "A flagship gala timed to a quarterly results window — meaning the room had to feel celebratory and inevitable in equal measure. We worked in obsidian, brushed brass, and a single column of white florals down the room.",
      "The CEO's speech was lit with a moving follow-spot we hid above the cornice. Three trade publications led with the room itself the next morning.",
    ],
  },
  {
    slug: "executive-launch",
    category: "Executive Launch",
    title: "First Light",
    subtitle: "A product launch staged as an intimate film premiere.",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Luxury Atelier (NDA)",
    location: "Mayfair, London",
    guests: "85",
    story: [
      "Eighty-five buyers, editors and ambassadors. We turned a Mayfair townhouse into a one-night immersive theatre, with the product revealed in the third act behind a falling silk panel.",
      "Pre-orders for the season opened the next morning and sold through by lunch.",
    ],
  },
  {
    slug: "birthday-experience",
    category: "Birthday Experience",
    title: "Forty In Marrakech",
    subtitle: "A milestone birthday across four nights and three palaces.",
    cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    client: "Private",
    location: "Marrakech, Morocco",
    guests: "60",
    story: [
      "Four nights, three venues, sixty closest friends flown in from nine countries. We managed logistics from custom-cleared florals to a private chef rotation that meant no two dinners shared a plate.",
      "The final night was a candlelit dinner inside a 12th century riad with a single oud player. Guests still describe it as the best week of their lives.",
    ],
  },
  {
    slug: "vip-celebration",
    category: "VIP Celebration",
    title: "An Anniversary, Privately",
    subtitle: "A silver-anniversary dinner staged inside a private gallery.",
    cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Private Collector",
    location: "Paris, France",
    guests: "32",
    story: [
      "An after-hours dinner inside a private art collection. Thirty-two guests, one long table, a menu paired to the works on the walls.",
      "No photographers. No press. Just one filmmaker we'd worked with for a decade, capturing a single edited reel for the family archive.",
    ],
  },
  {
    slug: "destination-event",
    category: "Destination Event",
    title: "An Island Of Their Own",
    subtitle: "A private-island weekend for a milestone corporate retreat.",
    cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    ],
    client: "Founders Circle",
    location: "Private Island, Bahamas",
    guests: "44",
    story: [
      "Forty-four founders, four days, one island. We handled flights, customs, dietary briefs and a sunset welcome that involved a string quartet on a sandbar.",
      "By day four, three new partnerships had been signed on the beach.",
    ],
  },
];

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }): Case => {
    const found = cases.find((c) => c.slug === params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Mileyn Events` },
          { name: "description", content: loaderData.subtitle },
          { property: "og:title", content: `${loaderData.title} — Mileyn Events` },
          { property: "og:description", content: loaderData.subtitle },
          { property: "og:image", content: loaderData.cover },
          { property: "twitter:image", content: loaderData.cover },
        ]
      : [],
  }),
  component: CasePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="font-serif text-4xl">Case study not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold underline">Return home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background flex items-center justify-center text-white p-6 text-center">
      <p>{error.message}</p>
    </div>
  ),
});

function CasePage() {
  const c = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img src={c.cover} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10 h-full flex items-end px-6 lg:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link to="/" hash="portfolio" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider-luxe text-gold hover:text-white">
              <ChevronLeft size={14} /> All Experiences
            </Link>
            <div className="mt-6 text-[10px] uppercase tracking-wider-luxe text-gold">{c.category}</div>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-white text-balance leading-[1.05]">{c.title}</h1>
            <p className="mt-5 text-lg text-white/80 font-light max-w-2xl">{c.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          {[
            { l: "Client", v: c.client },
            { l: "Location", v: c.location },
            { l: "Guests", v: c.guests },
          ].map((d) => (
            <div key={d.l} className="border-t border-gold/20 pt-5">
              <div className="text-[10px] uppercase tracking-wider-luxe text-gold">{d.l}</div>
              <div className="mt-2 text-white font-serif text-xl">{d.v}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-20 space-y-6 text-muted-foreground leading-relaxed text-lg">
          {c.story.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-24 grid sm:grid-cols-2 gap-6">
          {c.gallery.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${c.title} — gallery ${i + 1}`}
              loading="lazy"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="w-full aspect-[4/5] object-cover"
            />
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link to="/" hash="contact" className="inline-block px-10 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all">
            Begin Your Vision
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
