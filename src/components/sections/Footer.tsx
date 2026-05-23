import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle, Mail } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";

type FooterContent = {
  tagline: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
  email: string;
  copyright: string;
};

const defaults: FooterContent = {
  tagline: "Crafting Unforgettable Experiences",
  instagram: "https://www.instagram.com/mileyneventsservices?igsh=MXhvaHJvYjJlanpwNg==",
  linkedin: "",
  whatsapp: "0719263308",
  email: "Info@mileynevents.co.ke",
  copyright: "© 2025 Mileyn Events. All rights reserved.",
};

function waLink(num: string) {
  const digits = (num || "").replace(/\D/g, "");
  const intl = digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}`;
}

export function Footer() {
  const c = useSiteContent<FooterContent>("footer", defaults);

  return (
    <footer className="border-t border-gold/15 py-16 px-6 text-center">
      <div className="font-serif font-bold text-white uppercase tracking-luxe text-2xl">Mileyn</div>
      <div className="text-[10px] tracking-wider-luxe text-white/60 mt-1">EVENTS</div>
      <p className="font-serif italic text-muted-foreground mt-6">{c.tagline}</p>

      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        {c.instagram && (
          <button
            onClick={() => window.open(c.instagram, "_blank", "noopener,noreferrer")}
            aria-label="Instagram"
            className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center"
          >
            <Instagram size={16} />
          </button>
        )}
        {c.whatsapp && (
          <button
            onClick={() => window.open(waLink(c.whatsapp), "_blank", "noopener,noreferrer")}
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center"
          >
            <MessageCircle size={16} />
          </button>
        )}
        {c.email && (
          <a href={`mailto:${c.email}`} aria-label="Email" className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center">
            <Mail size={16} />
          </a>
        )}
        {c.linkedin && (
          <button
            onClick={() => window.open(c.linkedin, "_blank", "noopener,noreferrer")}
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center"
          >
            <Linkedin size={16} />
          </button>
        )}
      </div>

      <div className="mt-10 flex justify-center gap-6 text-[10px] uppercase tracking-wider-luxe text-white/50 flex-wrap">
        <Link to="/team" className="hover:text-gold">Meet The Team</Link>
        <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
      </div>

      <p className="mt-8 text-[10px] uppercase tracking-wider-luxe text-white/40">{c.copyright}</p>
    </footer>
  );
}
