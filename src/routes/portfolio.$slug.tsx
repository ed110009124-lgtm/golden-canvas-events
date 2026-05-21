import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ChevronLeft } from "lucide-react";
import { cases as defaultCases, type CaseStudy } from "@/lib/portfolio-data";
import { useSiteContent } from "@/hooks/use-site-content";

type Case = CaseStudy;
const cases = defaultCases;


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
  const loaded = Route.useLoaderData() as Case;
  const all = useSiteContent<Case[]>("portfolio", defaultCases);
  const c = all.find((x) => x.slug === loaded.slug) ?? loaded;

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
