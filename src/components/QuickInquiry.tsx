import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function QuickInquiry() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 200),
      source: "quick_inquiry",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Try again.");
      return;
    }
    toast.success("We'll call you within 2 hours. Seriously.");
    setOpen(false);
    setName("");
    setContact("");
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            onClick={() => setOpen(true)}
            className="group fixed right-5 top-1/2 -translate-y-1/2 z-40 h-12 flex items-center bg-gold text-background rounded-full px-3 hover:px-5 transition-all overflow-hidden"
            aria-label="Quick inquiry"
          >
            <Mail size={18} />
            <span className="ml-0 max-w-0 group-hover:max-w-[140px] group-hover:ml-2 overflow-hidden whitespace-nowrap text-xs uppercase tracking-luxe transition-all duration-300">
              Quick Inquiry
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              onClick={(e) => e.stopPropagation()}
              onSubmit={submit}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              className="glass-strong w-full max-w-md p-10 border border-gold/30 relative"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="font-serif text-2xl text-white mb-2">Tell us you're interested.</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Two fields. We'll do the rest.
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={100}
                required
                className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-2 mb-4 text-white outline-none text-sm"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone or email"
                maxLength={200}
                required
                className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-2 mb-6 text-white outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-background py-3 text-xs uppercase tracking-luxe disabled:opacity-50"
              >
                {loading ? "Sending..." : "I'm Ready to Talk"}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
