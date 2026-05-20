import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Calendar } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

const contactDefaults = {
  heading: "Let's Create Something Unforgettable",
  email: "hello@mileynevents.com",
  availability: "By Appointment Only",
  locations: "New York · London · Dubai",
};

export function Contact() {
  const info = useSiteContent("contact", contactDefaults);
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
    toast.success("Received. Reading it now. You'll hear from us before the end of the day — likely sooner.");
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
            placeholder="Describe your dream event..."
            rows={5}
            maxLength={2000}
            className="mt-6 w-full bg-transparent border-b border-gold/30 focus:border-gold py-3 text-white outline-none text-sm placeholder:text-white/40 resize-none"
          />
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Begin Your Vision"}
            </button>
          </div>
        </motion.form>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs uppercase tracking-luxe text-white/70">
          <a href={`mailto:${info.email}`} className="flex items-center gap-2 hover:text-gold">
            <Mail size={14} className="text-gold" />
            <span>{info.email}</span>
          </a>
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
    </section>
  );
}
