import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { services as defaultServices, getService, type ServiceItem } from "@/lib/services-data";
import { useSiteContent } from "@/hooks/use-site-content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): ServiceItem => {
    const found = getService(params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Mileyn Events` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — Mileyn Events` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:image", content: loaderData.image },
          { property: "twitter:image", content: loaderData.image },
        ]
      : [],
  }),
  component: ServicePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="font-serif text-4xl">Service not found</h1>
        <Link to="/" hash="services" className="mt-6 inline-block text-gold underline">
          All services
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background flex items-center justify-center text-white p-6 text-center">
      <p>{error.message}</p>
    </div>
  ),
});

function ServicePage() {
  const loaded = Route.useLoaderData() as ServiceItem;
  const services = useSiteContent<ServiceItem[]>("services", defaultServices);
  const s = services.find((x) => x.slug === loaded.slug) ?? loaded;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="relative z-10 h-full flex items-end px-6 lg:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link
              to="/"
              hash="services"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider-luxe text-gold hover:text-white"
            >
              <ChevronLeft size={14} /> All Services
            </Link>
            <div className="mt-6 text-[10px] uppercase tracking-wider-luxe text-gold">Service</div>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl text-white text-balance leading-[1.05]">
              {s.title}
            </h1>
            <p className="mt-5 text-lg text-white/80 font-light max-w-2xl">{s.summary}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed text-lg">
          {s.body.map((p, i) => (
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

        <div className="max-w-5xl mx-auto mt-20 grid sm:grid-cols-2 gap-6">
          {s.gallery.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${s.title} — image ${i + 1}`}
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
          <Link
            to="/"
            hash="contact"
            className="inline-block px-10 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all"
          >
            Begin Your Vision
          </Link>
        </div>
      </section>

      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] uppercase tracking-wider-luxe text-gold text-center">
            More Services
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group block border border-gold/15 hover:border-gold/40 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-base text-white">{o.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
