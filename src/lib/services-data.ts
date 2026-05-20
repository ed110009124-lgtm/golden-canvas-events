export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  body: string[];
  gallery: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "weddings",
    title: "Wedding Planning & Coordination",
    summary:
      "Cinematic ceremonies, family choreography, and seamless multi-day weddings — handled with quiet authority.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
    body: [
      "We don't just plan weddings. We design a private film that unfolds over a weekend — every cue, every floral, every plate, considered.",
      "From engagement to send-off brunch, we manage families, weather, vendors and the one uncle who always drinks too much. Gracefully.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    ],
  },
  {
    slug: "corporate",
    title: "Corporate Events & Launches",
    summary:
      "Brand storytelling through physical environment. We turn venues into living manifestations of your message.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
    body: [
      "Galas, product launches, summits, press evenings. We treat a brand event as a narrative — the room is the first slide.",
      "Our productions have led trade headlines, sold out collections by lunchtime, and made boards approve next year's budget on the way out.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
    ],
  },
  {
    slug: "decor-styling",
    title: "Luxury Décor & Styling",
    summary:
      "Sourced florals, custom installations, bespoke linens, ambient lighting design. Every tablescape tells a story.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
    body: [
      "We design rooms that feel like memories the moment a guest walks in. Florals are sourced the morning of, never the day before.",
      "Lighting, linen, fragrance and sound are treated as a single sensory composition — never four separate decisions.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80",
    ],
  },
  {
    slug: "branding-design",
    title: "Event Branding & Design",
    summary:
      "Cohesive identity across invitations, signage, menus and programs. Your event becomes its own brand world.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80",
    body: [
      "From letterpress invitations to monogrammed menus, we build a complete visual language for the evening.",
      "Guests should be able to identify your event from a single object on a side table. We design until that's true.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    ],
  },
  {
    slug: "experience",
    title: "Entertainment & Guest Experience",
    summary:
      "Curated talent, hosted moments, interactive installations. We design the emotional arc of the evening.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80",
    body: [
      "We book the string quartet and the surprise headline act. We design the welcome moment, the late-night pivot and the send-off.",
      "Every guest experience is mapped — minute by minute — so the evening feels effortless, not scheduled.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    ],
  },
  {
    slug: "media-coverage",
    title: "Event Media & Social Coverage",
    summary:
      "Cinematographers, editorial photographers, real-time social coverage. The event lives twice.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400&q=80",
    body: [
      "We bring in an editorial-grade crew and treat the event as a small film production — coverage planned shot by shot, not improvised.",
      "Same-night recap reels, archival photo books, and discreet social rollout for clients who care how the story is told later.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
