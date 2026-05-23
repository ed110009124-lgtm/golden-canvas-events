import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Calendar, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

type ContactContent = {
  heading: string;
  email: string;
  availability: string;
  locations: string;
  whatsapp: string;
};

const contactDefaults: ContactContent = {
  heading: "Let's Create Something Unforgettable",
  email: "Info@mileynevents.co.ke",
  availability: "By Appointment Only",
  locations: "Nairobi, Kenya",
  whatsapp: "0719263308",
};

function waLink(num: string) {
  const digits = num.replace(/\D/g, "");
  // Kenya country code if local 0-prefixed
  const intl = digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}`;
}

export function Contact() {
  const info = useSiteContent<ContactContent>("contact", contactDefaults);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 100),
      contact: email.trim().slice(0, 200),
      message: message.trim().slice(0, 2000) || null,
      source: "contact_form",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Received. You'll hear from us shortly.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-wider-luxe text-gold">Contact</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white text-balance">
            {info.heading}
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          onSubmit={submit}
          className="max-w-2xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              maxLength={100}
              required
              className="bg-transparent border-b border-gold/30 focus:border-gold py-3 text-white outline-none text-sm placeholder:text-white/40"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              maxLength={200}
              required
              className="bg-transparent border-b border-gold/30 focus:border-gold py-3 text-white outline-none text-sm placeholder:text-white/40"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us the date, the vibe, and your guest count. We'll get back to you within 2 hours."
            rows={5}
            maxLength={2000}
            className="mt-6 w-full bg-transparent border-b border-gold/30 focus:border-gold py-3 text-white outline-none text-sm placeholder:text-white/40 resize-none"
          />
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Begin Your Vision"}
            </button>
            <button
              type="button"
              onClick={() => window.open(waLink(info.whatsapp), "_blank", "noopener,noreferrer")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold text-gold text-xs uppercase tracking-luxe hover:bg-gold hover:text-background transition-all"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>
          </div>
        </motion.form>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-luxe text-white/70">
          <a href={`mailto:${info.email}`} className="flex items-center gap-2 hover:text-gold normal-case">
            <Mail size={14} className="text-gold" />
            <span>{info.email}</span>
          </a>
          <button
            type="button"
            onClick={() => window.open(waLink(info.whatsapp), "_blank", "noopener,noreferrer")}
            className="flex items-center gap-2 hover:text-gold"
          >
            <MessageCircle size={14} className="text-gold" />
            <span>{info.whatsapp}</span>
          </button>
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-gold" />
            <span>{info.availability}</span>
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span>{info.locations}</span>
          </span>
        </div>
      </div>

      {/* Floating WhatsApp button (offset so it doesn't cover the admin dot) */}
      <button
        onClick={() => window.open(waLink(info.whatsapp), "_blank", "noopener,noreferrer")}
        aria-label="WhatsApp"
        className="fixed bottom-5 left-16 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} />
      </button>
    </section>
  );
}
