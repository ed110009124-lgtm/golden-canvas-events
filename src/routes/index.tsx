import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrandIntro } from "@/components/BrandIntro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { QuickInquiry } from "@/components/QuickInquiry";
import { Concierge } from "@/components/Concierge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mileyn Events — Luxury Events Crafted With Precision & Elegance" },
      { name: "description", content: "Mileyn Events designs and produces luxury weddings, corporate galas, and private celebrations across New York, London, and Dubai." },
      { property: "og:title", content: "Mileyn Events — Luxury Experiences" },
      { property: "og:description", content: "From intimate celebrations to grand experiences, we turn moments into unforgettable memories." },
    ],
  }),
  component: Index,
});

function Index() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("brandIntroPlayed");
    if (!played) {
      setShowIntro(true);
    } else {
      setReady(true);
    }
  }, []);

  const handleIntroDone = () => {
    sessionStorage.setItem("brandIntroPlayed", "1");
    setReady(true);
    setTimeout(() => setShowIntro(false), 700);
  };

  return (
    <div className="min-h-screen bg-background">
      {showIntro && <BrandIntro onDone={handleIntroDone} />}
      <Nav />
      <Hero ready={ready} />
      <TrustStrip />
      <About />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Testimonials />
      <Contact />
      <Footer />
      <QuickInquiry />
      <Concierge />
    </div>
  );
}
