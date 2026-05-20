export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  cover: string;
  gallery: string[];
  client: string;
  location: string;
  guests: string;
  story: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: "luxury-weddings",
    category: "Luxury Wedding",
    title: "A Riviera Vow",
    subtitle: "Three days. One cliffside. A wedding rehearsed for a decade in their dreams.",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Private",
    location: "Cap-Ferrat, France",
    guests: "120",
    story: [
      "The brief: a wedding that felt like a film already in progress when the guests arrived. We took over a cliffside estate for three days, choreographed the light, and built a tablescape that ran the length of the terrace.",
      "Every place setting was numbered to a personal note. The first dance was scored live by a six-piece string ensemble flown in from Milan. By midnight, the staff had quietly replaced the candles three times.",
    ],
  },
  {
    slug: "corporate-gala",
    category: "Corporate Gala",
    title: "The Midnight Index",
    subtitle: "A black-tie press evening that became the headline.",
    cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    client: "Fortune 100 Financial",
    location: "Manhattan, NY",
    guests: "480",
    story: [
      "A flagship gala timed to a quarterly results window — meaning the room had to feel celebratory and inevitable in equal measure. We worked in obsidian, brushed brass, and a single column of white florals down the room.",
      "The CEO's speech was lit with a moving follow-spot we hid above the cornice. Three trade publications led with the room itself the next morning.",
    ],
  },
  {
    slug: "executive-launch",
    category: "Executive Launch",
    title: "First Light",
    subtitle: "A product launch staged as an intimate film premiere.",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Luxury Atelier (NDA)",
    location: "Mayfair, London",
    guests: "85",
    story: [
      "Eighty-five buyers, editors and ambassadors. We turned a Mayfair townhouse into a one-night immersive theatre, with the product revealed in the third act behind a falling silk panel.",
      "Pre-orders for the season opened the next morning and sold through by lunch.",
    ],
  },
  {
    slug: "birthday-experience",
    category: "Birthday Experience",
    title: "Forty In Marrakech",
    subtitle: "A milestone birthday across four nights and three palaces.",
    cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    client: "Private",
    location: "Marrakech, Morocco",
    guests: "60",
    story: [
      "Four nights, three venues, sixty closest friends flown in from nine countries. We managed logistics from custom-cleared florals to a private chef rotation that meant no two dinners shared a plate.",
      "The final night was a candlelit dinner inside a 12th century riad with a single oud player.",
    ],
  },
  {
    slug: "vip-celebration",
    category: "VIP Celebration",
    title: "An Anniversary, Privately",
    subtitle: "A silver-anniversary dinner staged inside a private gallery.",
    cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    ],
    client: "Private Collector",
    location: "Paris, France",
    guests: "32",
    story: [
      "An after-hours dinner inside a private art collection. Thirty-two guests, one long table, a menu paired to the works on the walls.",
      "No photographers. No press. Just one filmmaker we'd worked with for a decade, capturing a single edited reel for the family archive.",
    ],
  },
  {
    slug: "destination-event",
    category: "Destination Event",
    title: "An Island Of Their Own",
    subtitle: "A private-island weekend for a milestone corporate retreat.",
    cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    ],
    client: "Founders Circle",
    location: "Private Island, Bahamas",
    guests: "44",
    story: [
      "Forty-four founders, four days, one island. We handled flights, customs, dietary briefs and a sunset welcome that involved a string quartet on a sandbar.",
      "By day four, three new partnerships had been signed on the beach.",
    ],
  },
  {
    slug: "outdoor-experience",
    category: "Outdoor Experience",
    title: "Garden At Golden Hour",
    subtitle: "An open-air dinner under linen canopies and a thousand bulbs.",
    cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    ],
    client: "Private Estate",
    location: "Tuscany, Italy",
    guests: "90",
    story: [
      "A walled garden, two long oak tables, hand-thrown ceramics and a menu sourced from within twenty kilometres.",
      "We programmed the entire evening around the light — first course at golden hour, last toast under the bulbs we'd strung between the cypress trees.",
    ],
  },
  {
    slug: "cultural-soirée",
    category: "Cultural Soirée",
    title: "An Evening For The Archive",
    subtitle: "A private museum opening for forty patrons.",
    cover: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    ],
    client: "Foundation Board",
    location: "Vienna, Austria",
    guests: "40",
    story: [
      "An after-hours dinner inside an exhibition that opened to the public the following morning. We worked entirely in beeswax candles and floor-level uplight to honour the work.",
      "Guests left with a hand-bound catalogue, signed by the artist over coffee.",
    ],
  },
];
