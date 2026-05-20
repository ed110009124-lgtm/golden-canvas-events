import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { X } from "lucide-react";

export function AdminAccess() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const clicks = useRef<number[]>([]);

  const handleDot = () => {
    const now = Date.now();
    clicks.current = clicks.current.filter((t) => now - t < 3000);
    clicks.current.push(now);
    if (clicks.current.length >= 3) {
      clicks.current = [];
      if (typeof window !== "undefined" && sessionStorage.getItem("mileyn_admin") === "1") {
        navigate({ to: "/admin-dashboard" });
      } else {
        setOpen(true);
      }
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === "Mileynevents" && p === "mileyn1234") {
      sessionStorage.setItem("mileyn_admin", "1");
      setOpen(false);
      navigate({ to: "/admin-dashboard" });
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setU("");
        setP("");
        setErr(false);
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={handleDot}
        aria-label="Admin"
        className="fixed bottom-4 left-4 w-3 h-3 rounded-full bg-gold opacity-60 hover:opacity-100 shadow-[0_0_12px_rgba(201,168,76,0.6)] hover:shadow-[0_0_18px_rgba(201,168,76,0.9)] transition-all z-40"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.form
              onClick={(e) => e.stopPropagation()}
              onSubmit={submit}
              initial={{ y: 200, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                x: shake ? [-5, 5, -3, 3, 0] : 0,
              }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="glass-strong w-full max-w-sm p-8 relative border border-gold/30"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="font-serif text-xl text-white mb-6 tracking-luxe">Admin</h3>
              <input
                value={u}
                onChange={(e) => setU(e.target.value)}
                placeholder="Username"
                className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-2 mb-4 text-white outline-none text-sm"
                autoFocus
              />
              <input
                type="password"
                value={p}
                onChange={(e) => setP(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-2 mb-6 text-white outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full bg-gold text-background py-3 text-xs uppercase tracking-luxe hover:bg-gold/90"
              >
                Enter
              </button>
              {err && (
                <p className="text-gold text-xs text-center mt-3">Credentials not recognized.</p>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
