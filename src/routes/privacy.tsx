import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Mileyn Events" }] }),
  component: () => <Legal title="Privacy Policy" />,
});

function Legal({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background px-6 py-32 max-w-3xl mx-auto">
      <Link to="/" className="text-xs uppercase tracking-luxe text-gold border-b border-gold pb-0.5">← Back home</Link>
      <h1 className="mt-12 font-serif text-5xl text-white">{title}</h1>
      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>This Privacy Policy describes how Mileyn Events ("we", "our", "us") collects, uses, and protects information you provide when you contact us or engage our services.</p>
        <p>We collect only the information you voluntarily share — your name, email, phone, and event details. We use it to respond to inquiries and provide event planning services. We never sell your data.</p>
        <p>For questions, write to hello@mileynevents.com.</p>
      </div>
    </div>
  );
}
