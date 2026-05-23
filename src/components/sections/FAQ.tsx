import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

type FAQItem = { q: string; a: string };
type FAQContent = { eyebrow: string; heading: string; items: FAQItem[] };

const defaults: FAQContent = {
  eyebrow: "FAQ",
  heading: "Questions, Answered",
  items: [
    {
      q: "How far in advance should we book?",
      a: "For weddings and large galas we recommend 6–12 months. For intimate dinners, private parties and corporate launches we can often deliver in 4–8 weeks. Reach out and we'll tell you honestly what your date allows.",
    },
    {
      q: "Do you only work in Nairobi?",
      a: "Nairobi is home, but we travel. We've produced experiences across Kenya, East Africa and select international destinations. Travel and logistics are quoted transparently.",
    },
    {
      q: "What is your typical investment range?",
      a: "Every Mileyn experience is custom-built, so prices range with scope, guest count and design ambition. After our first call we'll send a tailored proposal — no surprises, no hidden line items.",
    },
    {
      q: "Do you handle everything, or work with our existing vendors?",
      a: "Both. We have a vetted roster of florists, caterers, AV teams, photographers and venues — but if you already have favourites, we coordinate them into the run-of-show.",
    },
    {
      q: "How quickly do you respond to enquiries?",
      a: "We reply to every serious enquiry within 2 hours during working hours, and the next morning otherwise. WhatsApp is the fastest channel.",
    },
  ],
};

export function FAQ() {
  const c = useSiteContent<FAQContent>("faq", defaults);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">{c.eyebrow}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">{c.heading}</h2>
        </motion.div>

        <div className="divide-y divide-gold/15 border-y border-gold/15">
          {c.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-serif text-lg md:text-xl text-white group-hover:text-gold transition-colors">
                    {item.q}
                  </span>
                  <span className="text-gold flex-shrink-0">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
