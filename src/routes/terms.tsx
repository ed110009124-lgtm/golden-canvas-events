import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Mileyn Events" }] }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background px-6 py-32 max-w-3xl mx-auto">
      <Link to="/" className="text-xs uppercase tracking-luxe text-gold border-b border-gold pb-0.5">← Back home</Link>
      <h1 className="mt-12 font-serif text-5xl text-white">Terms of Service</h1>
      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>By engaging Mileyn Events for event planning, design, or production services, you agree to these Terms of Service.</p>
        <p>All proposals, designs, and creative concepts produced by Mileyn Events remain our intellectual property until contracted. Deposits are non-refundable and secure your event date in our calendar.</p>
        <p>For full contractual terms, please request our service agreement at hello@mileynevents.com.</p>
      </div>
    </div>
  );
}
