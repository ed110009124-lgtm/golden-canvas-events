import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 py-16 px-6 text-center">
      <div className="font-serif font-bold text-white uppercase tracking-luxe text-2xl">Mileyn</div>
      <div className="text-[10px] tracking-wider-luxe text-white/60 mt-1">EVENTS</div>
      <p className="font-serif italic text-muted-foreground mt-6">
        Crafting Unforgettable Experiences
      </p>

      <div className="mt-8 flex justify-center gap-4">
        {[Instagram, Linkedin].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-10 h-10 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-background transition-colors flex items-center justify-center"
            aria-label="Social"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-6 text-[10px] uppercase tracking-wider-luxe text-white/50">
        <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
      </div>

      <p className="mt-8 text-[10px] uppercase tracking-wider-luxe text-white/40">
        © 2025 Mileyn Events. All rights reserved.
      </p>
    </footer>
  );
}
