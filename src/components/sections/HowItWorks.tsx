import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/use-site-content";

type Step = { n: string; title: string; description: string };
type HIWContent = { eyebrow: string; heading: string; subheading: string; steps: Step[] };

const defaults: HIWContent = {
  eyebrow: "How It Works",
  heading: "From First Hello To Last Toast",
  subheading:
    "A calm, considered process — designed so you can enjoy the build-up as much as the event itself.",
  steps: [
    {
      n: "01",
      title: "Tell Us Your Vision",
      description:
        "Send us the date, the vibe and your guest count. We reply within 2 hours with availability and next steps.",
    },
    {
      n: "02",
      title: "Discovery Call",
      description:
        "A 30-minute conversation — in person, on Zoom or over coffee in Nairobi. We listen first, ideas second.",
    },
    {
      n: "03",
      title: "Bespoke Proposal",
      description:
        "We design a tailored concept, full run-of-show and transparent investment plan — usually within 5 working days.",
    },
    {
      n: "04",
      title: "Design & Production",
      description:
        "Once you approve, our team locks in venues, vendors, florals, AV and styling. You get one calm point of contact.",
    },
    {
      n: "05",
      title: "Event Day",
      description:
        "We arrive early, manage every cue and disappear into the background — so the only thing you feel is the moment.",
    },
  ],
};

export function HowItWorks() {
  const c = useSiteContent<HIWContent>("how_it_works", defaults);

  return (
    <section id="how-it-works" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">{c.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            {c.heading}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground font-light">{c.subheading}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {c.steps.map((s, i) => (
            <motion.div
              key={s.n + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative border border-gold/15 hover:border-gold/40 transition-colors p-6 bg-black/20"
            >
              <div className="font-serif italic text-3xl text-gold mb-4">{s.n}</div>
              <h3 className="font-serif text-lg text-white mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
