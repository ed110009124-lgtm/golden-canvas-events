import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/team" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 600], ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]);
  const borderOpacity = useTransform(scrollY, [400, 700], [0, 0.4]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        style={{ backgroundColor: bg, backdropFilter: "blur(20px)" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gold"
          style={{ opacity: borderOpacity }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-white">
            <span className="font-bold tracking-luxe text-lg uppercase">Mileyn</span>
            <span className="text-[9px] tracking-wider-luxe text-white/70 ml-2">EVENTS</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-luxe text-white/80 hover:text-gold relative group"
              >
                {l.label}
                <span className="absolute left-1/2 -bottom-1 h-px bg-gold w-0 group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-block px-6 py-3 text-xs uppercase tracking-luxe border border-gold text-gold hover:bg-gold hover:text-background transition-colors"
          >
            Begin Your Vision
          </a>

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col"
        >
          <div className="h-20 flex items-center justify-between px-6">
            <span className="font-serif font-bold tracking-luxe text-white uppercase">Mileyn</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={24} className="text-white" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-white hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 px-8 py-3 text-xs uppercase tracking-luxe bg-gold text-background"
            >
              Begin Your Vision
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
