import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin — Mileyn Events" }] }),
  component: Dashboard,
});

type Lead = { id: string; name: string; contact: string; message: string | null; source: string; created_at: string };

function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("mileyn_admin") !== "1") {
      navigate({ to: "/" });
      return;
    }
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) toast.error("Could not load leads");
        else setLeads(data as Lead[]);
        setLoading(false);
      });
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem("mileyn_admin");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-gold/15 p-8 flex flex-col">
        <div className="font-serif font-bold text-white uppercase tracking-luxe text-xl">Mileyn</div>
        <div className="text-[10px] tracking-wider-luxe text-gold mt-1">ADMIN</div>
        <nav className="mt-12 flex flex-col gap-3 text-sm text-white/80 flex-1">
          <a href="#leads" className="hover:text-gold">Leads</a>
          <Link to="/" target="_blank" className="hover:text-gold">View Site ↗</Link>
        </nav>
        <button onClick={logout} className="text-xs uppercase tracking-luxe text-white/60 hover:text-gold text-left">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-12">
        <h1 className="font-serif text-4xl text-white mb-2">Leads</h1>
        <p className="text-muted-foreground text-sm mb-10">All inquiries from the contact form and quick-inquiry button.</p>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : leads.length === 0 ? (
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
                {l.message && (
                  <p className="mt-4 text-muted-foreground text-sm whitespace-pre-wrap">{l.message}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-12 text-xs text-muted-foreground">
          Full section editors (Hero, About, Services, etc.) coming in the next iteration.
        </p>
      </main>
    </div>
  );
}
