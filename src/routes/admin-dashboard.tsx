import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { saveSiteContent } from "@/lib/content.functions";
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
    description: "Heading and contact details under the contact form.",
    defaults: {
      heading: "Let's Create Something Unforgettable",
      email: "hello@mileynevents.com",
      availability: "By Appointment Only",
      locations: "New York · London · Dubai",
    },
    fields: [
      { type: "text", key: "heading", label: "Heading" },
      { type: "text", key: "email", label: "Email address" },
      { type: "text", key: "availability", label: "Availability line" },
      { type: "text", key: "locations", label: "Locations line" },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Tagline, social links and copyright at the bottom of every page.",
    defaults: {
      tagline: "Crafting Unforgettable Experiences",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      copyright: "© 2025 Mileyn Events. All rights reserved.",
    },
    fields: [
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "url", key: "instagram", label: "Instagram URL" },
      { type: "url", key: "linkedin", label: "LinkedIn URL" },
      { type: "text", key: "copyright", label: "Copyright line" },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────

function Dashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sectionKey, setSectionKey] = useState<string>(SECTIONS[0].key);

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

  const section = SECTIONS.find((s) => s.key === sectionKey)!;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-gold/15 p-8 flex flex-col shrink-0">
        <div className="font-serif font-bold text-white uppercase tracking-luxe text-xl">Mileyn</div>
        <div className="text-[10px] tracking-wider-luxe text-gold mt-1">ADMIN</div>

        <div className="text-[10px] uppercase tracking-wider-luxe text-white/40 mt-10 mb-2">
          Site Content
        </div>
        <nav className="flex flex-col gap-1 text-sm flex-1">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSectionKey(s.key)}
              className={`text-left py-2 px-3 rounded-sm transition-colors ${
                sectionKey === s.key
                  ? "bg-gold/10 text-gold"
                  : "text-white/70 hover:text-gold hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-xs uppercase tracking-luxe pt-6 border-t border-gold/15">
          <Link to="/" target="_blank" className="text-white/70 hover:text-gold">
            View Site ↗
          </Link>
          <button onClick={logout} className="text-white/60 hover:text-gold text-left">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <SectionForm key={section.key} section={section} />
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
    const v = (value as string) ?? "";
    return (
      <div>
        {labelEl}
        <div className="flex gap-4 items-start">
          {v && (
            <div className="w-28 h-20 bg-black/40 border border-gold/15 overflow-hidden flex-shrink-0">
              <img src={v} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
          <input
            type="url"
            placeholder="https://..."
            value={v}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">
          Paste an image URL (from Unsplash, your file hosting, etc.).
        </p>
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
