import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { saveSiteContent } from "@/lib/content.functions";
import { primeSiteContent } from "@/hooks/use-site-content";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin — Mileyn Events" }] }),
  component: Dashboard,
});

type Lead = { id: string; name: string; contact: string; message: string | null; source: string; created_at: string };

const ADMIN_USERNAME = "Mileynevents";
const ADMIN_PASSWORD = "mileyn1234";

const SECTIONS = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "testimonials", label: "Testimonials" },
  { key: "team_members", label: "Team" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Footer" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"] | "leads";

const SECTION_DEFAULTS: Record<string, unknown> = {
  hero: {
    headline_a: "Luxury Events Crafted With",
    headline_b: "Precision & Elegance",
    subheadline: "From intimate celebrations to grand experiences, we turn moments into unforgettable memories.",
    cta_primary: "Book a Consultation",
    cta_secondary: "Explore Our Experiences",
    stats: [
      { n: "150+", l: "Events Executed" },
      { n: "80+", l: "Luxury Celebrations" },
      { n: "98%", l: "Client Satisfaction" },
      { n: "12+", l: "Years Experience" },
    ],
  },
  about: {
    eyebrow: "About Mileyn",
    heading: "Where Every Moment Becomes A Memory",
    paragraphs: [
      "Mileyn Events is a luxury experience house built on creativity, discipline, and an obsessive eye for the details guests never quite name — but always remember.",
      "We've learned that the most important person at a wedding isn't always the couple — sometimes it's the mother of the bride. We plan accordingly.",
    ],
    bullets: ["Luxury Execution", "Seamless Coordination", "Creative Direction", "Premium Styling"],
  },
  services: {
    eyebrow: "What We Do",
    heading: "A Complete Suite of Luxury Services",
    services: [
      { title: "Wedding Planning & Coordination", body: "We don't just plan weddings. We manage family dynamics, weather contingencies, and the one uncle who always drinks too much. Gracefully." },
      { title: "Corporate Events & Launches", body: "Brand storytelling through physical environment." },
    ],
  },
  testimonials: {
    eyebrow: "Praise",
    heading: "Stories From Our Guests of Honor",
    items: [
      { quote: "Mileyn turned our wedding into a film.", name: "Ava & Daniel", role: "Bride & Groom" },
    ],
  },
  team_members: [
    { name: "Mileyn Adesanya", role: "Founder & Creative Director", bio: "Fifteen years orchestrating the world's most discreet celebrations.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=80" },
  ],
  contact: {
    heading: "Let's Create Something Unforgettable",
    email: "hello@mileynevents.com",
    availability: "By Appointment Only",
    locations: "New York · London · Dubai",
  },
  footer: {
    tagline: "Crafting Unforgettable Experiences",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    copyright: "© 2025 Mileyn Events. All rights reserved.",
  },
};

function Dashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [section, setSection] = useState<SectionKey>("leads");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem("mileyn_admin") === "1");
  }, []);

  if (authed === null) return <div className="min-h-screen bg-background" />;
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <button onClick={() => navigate({ to: "/" })} className="text-gold underline text-xs uppercase tracking-luxe">
          Return home — admin access only
        </button>
      </div>
    );
  }

  const logout = () => {
    sessionStorage.removeItem("mileyn_admin");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-gold/15 p-8 flex flex-col">
        <div className="font-serif font-bold text-white uppercase tracking-luxe text-xl">Mileyn</div>
        <div className="text-[10px] tracking-wider-luxe text-gold mt-1">ADMIN</div>

        <nav className="mt-12 flex flex-col gap-2 text-sm flex-1">
          <button onClick={() => setSection("leads")} className={`text-left py-2 transition-colors ${section === "leads" ? "text-gold" : "text-white/70 hover:text-gold"}`}>
            Leads
          </button>
          <div className="text-[10px] uppercase tracking-wider-luxe text-white/40 mt-6 mb-1">Site Content</div>
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setSection(s.key)} className={`text-left py-2 transition-colors ${section === s.key ? "text-gold" : "text-white/70 hover:text-gold"}`}>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-xs uppercase tracking-luxe">
          <Link to="/" target="_blank" className="text-white/70 hover:text-gold">View Site ↗</Link>
          <button onClick={logout} className="text-white/60 hover:text-gold text-left">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        {section === "leads" ? <LeadsView /> : <SectionEditor sectionKey={section} />}
      </main>
    </div>
  );
}

function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200)
      .then(({ data, error }) => {
        if (error) toast.error("Could not load leads");
        else setLeads((data as Lead[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="font-serif text-4xl text-white mb-2">Leads</h1>
      <p className="text-muted-foreground text-sm mb-10">All inquiries from the contact form and quick-inquiry button.</p>
      {loading ? <p className="text-muted-foreground">Loading…</p> : leads.length === 0 ? (
        <p className="text-muted-foreground">No leads yet.</p>
      ) : (
        <div className="space-y-4">
          {leads.map((l) => (
            <div key={l.id} className="glass border border-gold/15 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-white font-medium">{l.name}</div>
                  <div className="text-gold text-sm">{l.contact}</div>
                </div>
                <div className="text-[10px] uppercase tracking-wider-luxe text-white/50">
                  {l.source} · {new Date(l.created_at).toLocaleString()}
                </div>
              </div>
              {l.message && <p className="mt-4 text-muted-foreground text-sm whitespace-pre-wrap">{l.message}</p>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function SectionEditor({ sectionKey }: { sectionKey: string }) {
  const save = useServerFn(saveSiteContent);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fallback = useMemo(() => SECTION_DEFAULTS[sectionKey] ?? {}, [sectionKey]);

  useEffect(() => {
    setLoading(true);
    supabase.from("site_content").select("value").eq("key", sectionKey).maybeSingle()
      .then(({ data }) => {
        const value = data?.value ?? fallback;
        setText(JSON.stringify(value, null, 2));
        setLoading(false);
      });
  }, [sectionKey, fallback]);

  const onSave = async () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      toast.error("Invalid JSON — fix the syntax and try again.");
      return;
    }
    setSaving(true);
    try {
      await save({ data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD, key: sectionKey, value: parsed } });
      primeSiteContent(sectionKey, parsed);
      toast.success("Changes saved. Live on the site.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    setText(JSON.stringify(fallback, null, 2));
    toast.info("Defaults loaded — click Save Changes to publish.");
  };

  const label = SECTIONS.find((s) => s.key === sectionKey)?.label ?? sectionKey;

  return (
    <div className="max-w-4xl">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h1 className="font-serif text-4xl text-white">{label}</h1>
        <span className="text-[10px] uppercase tracking-wider-luxe text-gold">{sectionKey}</span>
      </div>
      <p className="text-muted-foreground text-sm mb-8">
        Edit the JSON below and save. Changes appear instantly on the live site.
      </p>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
            className="w-full h-[60vh] bg-black/40 border border-gold/20 focus:border-gold/60 text-white/90 font-mono text-xs p-5 outline-none resize-none rounded-sm"
          />
          <div className="mt-6 flex gap-3 items-center">
            <button
              onClick={onSave}
              disabled={saving}
              className="px-8 py-3 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              onClick={resetToDefault}
              className="px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-luxe hover:bg-gold/10 transition-all"
            >
              Load Defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
}
