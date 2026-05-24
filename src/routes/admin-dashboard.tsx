import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, ChevronUp, ChevronDown, Upload, Copy, Image as ImageIcon } from "lucide-react";
import { saveSiteContent } from "@/lib/content.functions";
import { uploadMedia, deleteMedia } from "@/lib/media.functions";
import { primeSiteContent } from "@/hooks/use-site-content";
import { services as defaultServices } from "@/lib/services-data";
import { cases as defaultCases } from "@/lib/portfolio-data";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin — Mileyn Events" }] }),
  component: Dashboard,
});

const ADMIN_USERNAME = "mileynevents";
const ADMIN_PASSWORD = "1234";

// ────────────────────────────────────────────────────────────────────────────
// SCHEMAS — describe each section as fields the admin sees in plain English.
// ────────────────────────────────────────────────────────────────────────────

type FieldType =
  | { type: "text"; key: string; label: string; hint?: string }
  | { type: "textarea"; key: string; label: string; hint?: string }
  | { type: "image"; key: string; label: string; hint?: string }
  | { type: "url"; key: string; label: string; hint?: string }
  | { type: "list-text"; key: string; label: string; hint?: string }
  | { type: "list-object"; key: string; label: string; itemLabel: string; fields: FieldType[] };

type Section = {
  key: string;
  label: string;
  description: string;
  fields: FieldType[];
  defaults: unknown;
  // for sections whose value is an array (not object), wrap with this
  rootArrayKey?: string;
};

const SECTIONS: Section[] = [
  {
    key: "hero",
    label: "Hero (Homepage Top)",
    description: "The big headline, subheading, buttons and stats at the very top of the homepage.",
    defaults: {
      headline_a: "Luxury Events Crafted With",
      headline_b: "Precision & Elegance",
      subheadline:
        "From intimate celebrations to grand experiences, we turn moments into unforgettable memories.",
      cta_primary: "Book a Consultation",
      cta_secondary: "Explore Our Experiences",
      stats: [
        { n: "150+", l: "Events Executed" },
        { n: "80+", l: "Luxury Celebrations" },
        { n: "98%", l: "Client Satisfaction" },
        { n: "12+", l: "Years Experience" },
      ],
    },
    fields: [
      { type: "text", key: "headline_a", label: "Headline — top line" },
      { type: "text", key: "headline_b", label: "Headline — italic line" },
      { type: "textarea", key: "subheadline", label: "Subheadline" },
      { type: "text", key: "cta_primary", label: "Primary button text" },
      { type: "text", key: "cta_secondary", label: "Secondary button text" },
      {
        type: "list-object",
        key: "stats",
        label: "Stats Row",
        itemLabel: "Stat",
        fields: [
          { type: "text", key: "n", label: "Number (e.g. 150+)" },
          { type: "text", key: "l", label: "Label" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About Section",
    description: "The About Mileyn block on the homepage.",
    defaults: {
      eyebrow: "About Mileyn",
      heading: "Where Every Moment Becomes A Memory",
      paragraphs: [
        "Mileyn Events is a luxury experience house built on creativity, discipline, and an obsessive eye for the details guests never quite name — but always remember.",
        "We've learned that the most important person at a wedding isn't always the couple — sometimes it's the mother of the bride. We plan accordingly.",
      ],
      bullets: ["Luxury Execution", "Seamless Coordination", "Creative Direction", "Premium Styling"],
    },
    fields: [
      { type: "text", key: "eyebrow", label: "Small label above heading" },
      { type: "text", key: "heading", label: "Heading" },
      { type: "list-text", key: "paragraphs", label: "Paragraphs" },
      { type: "list-text", key: "bullets", label: "Highlight bullets" },
    ],
  },
  {
    key: "services",
    label: "Services",
    description:
      "Each card on the Services section, and its own detail page. Image is a URL (paste a link to any online image).",
    defaults: defaultServices,
    rootArrayKey: "items",
    fields: [
      {
        type: "list-object",
        key: "items",
        label: "Services",
        itemLabel: "Service",
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "slug", label: "URL slug", hint: "lowercase-with-dashes, used in the page URL" },
          { type: "textarea", key: "summary", label: "Short summary (shown on card)" },
          { type: "image", key: "image", label: "Card image (URL)" },
          { type: "list-text", key: "body", label: "Long description paragraphs (detail page)" },
          { type: "list-text", key: "gallery", label: "Gallery image URLs (detail page)" },
        ],
      },
    ],
  },
  {
    key: "portfolio",
    label: "Portfolio / Experiences",
    description: "Every case study shown on the homepage grid, the Portfolio page, and detail pages.",
    defaults: defaultCases,
    rootArrayKey: "items",
    fields: [
      {
        type: "list-object",
        key: "items",
        label: "Experiences",
        itemLabel: "Experience",
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "text", key: "slug", label: "URL slug" },
          { type: "text", key: "category", label: "Category label" },
          { type: "textarea", key: "subtitle", label: "Subtitle" },
          { type: "image", key: "cover", label: "Cover image (URL)" },
          { type: "text", key: "client", label: "Client" },
          { type: "text", key: "location", label: "Location" },
          { type: "text", key: "guests", label: "Guests" },
          { type: "list-text", key: "story", label: "Story paragraphs" },
          { type: "list-text", key: "gallery", label: "Gallery image URLs" },
        ],
      },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    description: "Client quotes shown on the homepage.",
    defaults: {
      eyebrow: "Praise",
      heading: "Stories From Our Guests of Honor",
      items: [
        {
          quote: "Mileyn turned our wedding into a film.",
          name: "Ava & Daniel",
          role: "Bride & Groom",
          img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
        },
      ],
    },
    fields: [
      { type: "text", key: "eyebrow", label: "Small label above heading" },
      { type: "text", key: "heading", label: "Heading" },
      {
        type: "list-object",
        key: "items",
        label: "Testimonials",
        itemLabel: "Testimonial",
        fields: [
          { type: "textarea", key: "quote", label: "Quote" },
          { type: "text", key: "name", label: "Name" },
          { type: "text", key: "role", label: "Role" },
          { type: "image", key: "img", label: "Photo (URL)" },
        ],
      },
    ],
  },
  {
    key: "team_preview",
    label: "Team (Homepage)",
    description: "The 3 'Happy Memories' cards shown on the homepage, above the More button.",
    defaults: [
      {
        title: "Moments In The Making",
        description: "Behind every flawless evening is a team in motion.",
        img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
      },
    ],
    rootArrayKey: "items",
    fields: [
      {
        type: "list-object",
        key: "items",
        label: "Homepage team cards (first 3 shown)",
        itemLabel: "Card",
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
          { type: "image", key: "img", label: "Photo (URL)" },
        ],
      },
    ],
  },
  {
    key: "team_groups",
    label: "Team Page (/team)",
    description: "All group photos and descriptions on the full Team page.",
    defaults: [
      {
        title: "The Production Team",
        description: "Stage managers, technical leads and run-of-show producers.",
        img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
      },
    ],
    rootArrayKey: "items",
    fields: [
      {
        type: "list-object",
        key: "items",
        label: "Teams",
        itemLabel: "Team",
        fields: [
          { type: "text", key: "title", label: "Team name" },
          { type: "textarea", key: "description", label: "Description" },
          { type: "image", key: "img", label: "Group photo (URL)" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact Section",
    description: "Heading and contact details. Bookings sent through the form land in your inbox via the email below; the WhatsApp number powers the green chat button.",
    defaults: {
      heading: "Let's Create Something Unforgettable",
      email: "Info@mileynevents.co.ke",
      whatsapp: "0719263308",
      availability: "By Appointment Only",
      locations: "Nairobi, Kenya",
    },
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "text", key: "email", label: "Booking email", hint: "All form submissions are routed here." },
      { type: "text", key: "whatsapp", label: "WhatsApp number", hint: "Local format (e.g. 0719263308) or international." },
      { type: "text", key: "availability", label: "Availability line" },
      { type: "text", key: "locations", label: "Location line" },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Tagline, social links and copyright at the bottom of every page.",
    defaults: {
      tagline: "Crafting Unforgettable Experiences",
      instagram: "https://www.instagram.com/mileyneventsservices?igsh=MXhvaHJvYjJlanpwNg==",
      linkedin: "",
      whatsapp: "0719263308",
      email: "Info@mileynevents.co.ke",
      copyright: "© 2025 Mileyn Events. All rights reserved.",
    },
    fields: [
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "url", key: "instagram", label: "Instagram URL" },
      { type: "url", key: "linkedin", label: "LinkedIn URL (leave blank to hide)" },
      { type: "text", key: "whatsapp", label: "WhatsApp number" },
      { type: "text", key: "email", label: "Email address" },
      { type: "text", key: "copyright", label: "Copyright line" },
    ],
  },
  {
    key: "how_it_works",
    label: "How It Works",
    description: "The 5-step process section on the homepage.",
    defaults: {
      eyebrow: "How It Works",
      heading: "From First Hello To Last Toast",
      subheading: "A calm, considered process — designed so you can enjoy the build-up as much as the event itself.",
      steps: [
        { n: "01", title: "Tell Us Your Vision", description: "Send us the date, the vibe and your guest count." },
      ],
    },
    fields: [
      { type: "text", key: "eyebrow", label: "Small label above heading" },
      { type: "text", key: "heading", label: "Heading" },
      { type: "textarea", key: "subheading", label: "Subheading" },
      {
        type: "list-object",
        key: "steps",
        label: "Steps",
        itemLabel: "Step",
        fields: [
          { type: "text", key: "n", label: "Number (e.g. 01)" },
          { type: "text", key: "title", label: "Title" },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
    ],
  },
  {
    key: "faq",
    label: "FAQ",
    description: "Frequently asked questions shown on the homepage.",
    defaults: {
      eyebrow: "FAQ",
      heading: "Questions, Answered",
      items: [{ q: "How far in advance should we book?", a: "6–12 months for weddings; 4–8 weeks for smaller events." }],
    },
    fields: [
      { type: "text", key: "eyebrow", label: "Small label above heading" },
      { type: "text", key: "heading", label: "Heading" },
      {
        type: "list-object",
        key: "items",
        label: "Questions",
        itemLabel: "Question",
        fields: [
          { type: "text", key: "q", label: "Question" },
          { type: "textarea", key: "a", label: "Answer" },
        ],
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────

function Dashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sectionKey, setSectionKey] = useState<string>(SECTIONS[0].key);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem("mileyn_admin") === "1");
  }, []);

  if (authed === null) return <div className="min-h-screen bg-background" />;
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <button
          onClick={() => navigate({ to: "/" })}
          className="text-gold underline text-xs uppercase tracking-luxe"
        >
          Return home — admin access only
        </button>
      </div>
    );
  }

  const logout = () => {
    sessionStorage.removeItem("mileyn_admin");
    navigate({ to: "/" });
  };

  const section = SECTIONS.find((s) => s.key === sectionKey);
  const isMedia = sectionKey === "__media";

  const SidebarContent = (
    <>
      <div className="font-serif font-bold text-white uppercase tracking-luxe text-xl">Mileyn</div>
      <div className="text-[10px] tracking-wider-luxe text-gold mt-1">ADMIN</div>

      <div className="text-[10px] uppercase tracking-wider-luxe text-white/40 mt-10 mb-2">
        Site Content
      </div>
      <nav className="flex flex-col gap-1 text-sm flex-1 overflow-y-auto">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              setSectionKey(s.key);
              setNavOpen(false);
            }}
            className={`text-left py-2 px-3 rounded-sm transition-colors ${
              sectionKey === s.key
                ? "bg-gold/10 text-gold"
                : "text-white/70 hover:text-gold hover:bg-white/5"
            }`}
          >
            {s.label}
          </button>
        ))}

        <div className="text-[10px] uppercase tracking-wider-luxe text-white/40 mt-6 mb-2">
          Assets
        </div>
        <button
          onClick={() => {
            setSectionKey("__media");
            setNavOpen(false);
          }}
          className={`text-left py-2 px-3 rounded-sm transition-colors flex items-center gap-2 ${
            isMedia ? "bg-gold/10 text-gold" : "text-white/70 hover:text-gold hover:bg-white/5"
          }`}
        >
          <ImageIcon size={14} /> Media Library
        </button>
      </nav>

      <div className="flex flex-col gap-3 text-xs uppercase tracking-luxe pt-6 border-t border-gold/15">
        <Link to="/" target="_blank" className="text-white/70 hover:text-gold">
          View Site ↗
        </Link>
        <button onClick={logout} className="text-white/60 hover:text-gold text-left">
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-gold/15 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-white uppercase tracking-luxe">Mileyn</span>
          <span className="text-[10px] tracking-wider-luxe text-gold">ADMIN</span>
        </div>
        <button
          onClick={() => setNavOpen(true)}
          className="text-gold text-xs uppercase tracking-luxe border border-gold/40 px-3 py-1.5"
        >
          Menu
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-gold/15 p-8 flex-col shrink-0 sticky top-0 h-screen">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {navOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70"
          onClick={() => setNavOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-background border-r border-gold/15 p-6 flex flex-col"
          >
            {SidebarContent}
          </aside>
        </div>
      )}

      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto min-w-0">
        {isMedia ? (
          <MediaLibrary />
        ) : section ? (
          <SectionForm key={section.key} section={section} />
        ) : null}
      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// FORM ENGINE
// ────────────────────────────────────────────────────────────────────────────

function unwrap(section: Section, raw: unknown): Record<string, unknown> {
  if (section.rootArrayKey) {
    const arr = Array.isArray(raw) ? raw : (raw as { items?: unknown[] })?.items ?? [];
    return { [section.rootArrayKey]: arr };
  }
  return (raw as Record<string, unknown>) ?? {};
}

function rewrap(section: Section, state: Record<string, unknown>): unknown {
  if (section.rootArrayKey) {
    return state[section.rootArrayKey] ?? [];
  }
  return state;
}

function SectionForm({ section }: { section: Section }) {
  const save = useServerFn(saveSiteContent);
  const [state, setState] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("site_content")
      .select("value")
      .eq("key", section.key)
      .maybeSingle()
      .then(({ data }) => {
        const value = data?.value ?? section.defaults;
        setState(unwrap(section, value));
        setLoading(false);
      });
  }, [section]);

  const update = (key: string, value: unknown) => {
    setState((prev) => ({ ...(prev ?? {}), [key]: value }));
  };

  const onSave = async () => {
    if (!state) return;
    setSaving(true);
    try {
      const value = rewrap(section, state);
      await save({
        data: {
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          key: section.key,
          value,
        },
      });
      primeSiteContent(section.key, value);
      toast.success("Saved. Your changes are live.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    if (!confirm("Reset this section to original content? Your edits will be replaced.")) return;
    setState(unwrap(section, section.defaults));
    toast.info("Defaults loaded. Click Save to publish.");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-1 text-[10px] uppercase tracking-wider-luxe text-gold">Editing</div>
      <h1 className="font-serif text-4xl text-white">{section.label}</h1>
      <p className="text-muted-foreground text-sm mt-2 mb-10">{section.description}</p>

      {loading || !state ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          <div className="space-y-7">
            {section.fields.map((f) => (
              <FieldRenderer
                key={f.key}
                field={f}
                value={(state as Record<string, unknown>)[f.key]}
                onChange={(v) => update(f.key, v)}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 items-center sticky bottom-0 bg-background/95 backdrop-blur py-4 -mx-2 px-2 border-t border-gold/15">
            <button
              onClick={onSave}
              disabled={saving}
              className="px-8 py-3 bg-gold text-background text-xs uppercase tracking-luxe hover:bg-gold/85 transition-all disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              onClick={resetDefaults}
              className="px-5 py-3 border border-gold/30 text-gold/80 text-xs uppercase tracking-luxe hover:bg-gold/10 transition-all"
            >
              Reset to Defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldType;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelEl = (
    <label className="block text-[11px] uppercase tracking-wider-luxe text-gold mb-2">
      {field.label}
    </label>
  );
  const hintEl = "hint" in field && field.hint ? (
    <p className="text-[11px] text-muted-foreground mt-1.5">{field.hint}</p>
  ) : null;

  const inputCls =
    "w-full bg-black/30 border border-gold/20 focus:border-gold/60 text-white text-sm px-3 py-2.5 outline-none rounded-sm transition-colors";

  if (field.type === "text" || field.type === "url") {
    return (
      <div>
        {labelEl}
        <input
          type={field.type === "url" ? "url" : "text"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
        {hintEl}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={inputCls + " resize-y min-h-[100px]"}
        />
        {hintEl}
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div>
        {labelEl}
        <ImageField value={(value as string) ?? ""} onChange={(v) => onChange(v)} />
        {hintEl}
      </div>
    );
  }

  if (field.type === "list-text") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    const update = (i: number, v: string) => {
      const next = [...list];
      next[i] = v;
      onChange(next);
    };
    const add = () => onChange([...list, ""]);
    const remove = (i: number) => onChange(list.filter((_, k) => k !== i));
    const move = (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= list.length) return;
      const next = [...list];
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };
    return (
      <div>
        {labelEl}
        <div className="space-y-2">
          {list.map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={item}
                onChange={(e) => update(i, e.target.value)}
                rows={1}
                className={inputCls + " resize-y min-h-[42px] flex-1"}
              />
              <div className="flex flex-col gap-1">
                <IconBtn onClick={() => move(i, -1)}><ChevronUp size={14} /></IconBtn>
                <IconBtn onClick={() => move(i, 1)}><ChevronDown size={14} /></IconBtn>
                <IconBtn onClick={() => remove(i)} danger><Trash2 size={14} /></IconBtn>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={add}
          className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold hover:text-white"
        >
          <Plus size={14} /> Add
        </button>
        {hintEl}
      </div>
    );
  }

  if (field.type === "list-object") {
    const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
    const updateItem = (i: number, key: string, v: unknown) => {
      const next = [...list];
      next[i] = { ...next[i], [key]: v };
      onChange(next);
    };
    const blank = () => {
      const obj: Record<string, unknown> = {};
      for (const f of field.fields) {
        obj[f.key] = f.type === "list-text" || f.type === "list-object" ? [] : "";
      }
      return obj;
    };
    const add = () => onChange([...list, blank()]);
    const remove = (i: number) => {
      if (!confirm("Delete this item?")) return;
      onChange(list.filter((_, k) => k !== i));
    };
    const move = (i: number, dir: -1 | 1) => {
      const j = i + dir;
      if (j < 0 || j >= list.length) return;
      const next = [...list];
      [next[i], next[j]] = [next[j], next[i]];
      onChange(next);
    };

    return (
      <div>
        <div className="flex items-baseline justify-between mb-2">
          {labelEl}
          <span className="text-[10px] uppercase tracking-wider-luxe text-white/40">
            {list.length} {list.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="space-y-4">
          {list.map((item, i) => (
            <details
              key={i}
              open={list.length < 4}
              className="border border-gold/15 rounded-sm bg-black/20"
            >
              <summary className="cursor-pointer px-4 py-3 flex items-center justify-between gap-3 list-none">
                <span className="text-white text-sm truncate">
                  {field.itemLabel} {i + 1}
                  {item.title || item.name || item.heading ? (
                    <span className="text-white/60"> — {(item.title || item.name || item.heading) as string}</span>
                  ) : null}
                </span>
                <div className="flex gap-1" onClick={(e) => e.preventDefault()}>
                  <IconBtn onClick={() => move(i, -1)}><ChevronUp size={14} /></IconBtn>
                  <IconBtn onClick={() => move(i, 1)}><ChevronDown size={14} /></IconBtn>
                  <IconBtn onClick={() => remove(i)} danger><Trash2 size={14} /></IconBtn>
                </div>
              </summary>
              <div className="px-4 pb-5 pt-2 space-y-5 border-t border-gold/10">
                {field.fields.map((sub) => (
                  <FieldRenderer
                    key={sub.key}
                    field={sub}
                    value={item[sub.key]}
                    onChange={(v) => updateItem(i, sub.key, v)}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>

        <button
          type="button"
          onClick={add}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold text-[11px] uppercase tracking-luxe hover:bg-gold/10"
        >
          <Plus size={14} /> Add {field.itemLabel}
        </button>
      </div>
    );
  }

  return null;
}

function IconBtn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-7 h-7 flex items-center justify-center border border-gold/20 rounded-sm transition-colors ${
        danger ? "text-red-400 hover:bg-red-500/10 hover:border-red-400/50" : "text-gold/70 hover:bg-gold/10 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// MEDIA LIBRARY
// ────────────────────────────────────────────────────────────────────────────

type MediaItem = { url: string; path?: string; label?: string };

function MediaLibrary() {
  const upload = useServerFn(uploadMedia);
  const remove = useServerFn(deleteMedia);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("site_content")
      .select("value")
      .eq("key", "media_library")
      .maybeSingle()
      .then(({ data }) => {
        const v = data?.value as { items?: MediaItem[] } | MediaItem[] | null;
        const list = Array.isArray(v) ? v : v?.items ?? [];
        setItems(list);
        setLoading(false);
      });
  }, []);

  const persist = async (next: MediaItem[]) => {
    setItems(next);
    const save = saveSiteContent;
    try {
      await save({
        data: {
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          key: "media_library",
          value: { items: next },
        },
      });
      primeSiteContent("media_library", { items: next });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  const onFile = async (file: File) => {
    if (file.size > 8_000_000) {
      toast.error("Please choose an image under 8MB.");
      return;
    }
    setBusy(true);
    try {
      const buf = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const dataBase64 = btoa(binary);
      const res = await upload({
        data: {
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD,
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          dataBase64,
        },
      });
      const next = [{ url: res.url, path: res.path, label: file.name }, ...items];
      await persist(next);
      toast.success("Image uploaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addUrl = async () => {
    const url = urlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      toast.error("Enter a valid image URL starting with https://");
      return;
    }
    const next = [{ url, label: labelInput.trim() || undefined }, ...items];
    await persist(next);
    setUrlInput("");
    setLabelInput("");
    toast.success("Image added.");
  };

  const del = async (i: number) => {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    const target = items[i];
    const next = items.filter((_, k) => k !== i);
    await persist(next);
    if (target.path) {
      try {
        await remove({
          data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD, path: target.path },
        });
      } catch {
        // listing already updated; storage cleanup best-effort
      }
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied — paste it into any image field.");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-1 text-[10px] uppercase tracking-wider-luxe text-gold">Editing</div>
      <h1 className="font-serif text-4xl text-white">Media Library</h1>
      <p className="text-muted-foreground text-sm mt-2 mb-10">
        All images you can use across the site. Upload from your device or paste a URL, then copy the link into any image field (Hero, Services, Portfolio, Team, etc.).
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border border-gold/20 p-5 bg-black/20">
          <div className="text-[11px] uppercase tracking-wider-luxe text-gold mb-3">Upload from device</div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            className="block w-full text-sm text-white/80 file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-background file:uppercase file:text-[11px] file:tracking-luxe file:cursor-pointer"
          />
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-2">
            <Upload size={12} /> Max 8MB — JPG, PNG or WebP.
          </p>
        </div>

        <div className="border border-gold/20 p-5 bg-black/20">
          <div className="text-[11px] uppercase tracking-wider-luxe text-gold mb-3">Add by URL</div>
          <input
            type="url"
            placeholder="https://..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full bg-black/30 border border-gold/20 focus:border-gold/60 text-white text-sm px-3 py-2.5 outline-none rounded-sm mb-2"
          />
          <input
            type="text"
            placeholder="Optional label (e.g. Hero background)"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            className="w-full bg-black/30 border border-gold/20 focus:border-gold/60 text-white text-sm px-3 py-2.5 outline-none rounded-sm mb-3"
          />
          <button
            onClick={addUrl}
            className="px-4 py-2 bg-gold text-background text-[11px] uppercase tracking-luxe hover:bg-gold/85"
          >
            Add Image
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground italic">
          No images yet. Upload or paste a URL to get started.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m, i) => (
            <div key={m.url + i} className="group border border-gold/15 bg-black/20">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={m.url}
                  alt={m.label || "media"}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
                  }}
                />
              </div>
              <div className="p-3">
                {m.label && (
                  <div className="text-xs text-white truncate mb-2">{m.label}</div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyUrl(m.url)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] uppercase tracking-luxe text-gold border border-gold/30 hover:bg-gold/10 py-1.5"
                  >
                    <Copy size={11} /> Copy URL
                  </button>
                  <button
                    onClick={() => del(i)}
                    className="inline-flex items-center justify-center text-red-400 border border-red-400/30 hover:bg-red-500/10 px-2 py-1.5"
                    aria-label="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
