import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding5 from "@/assets/wedding-5.jpeg";
import wedding6 from "@/assets/wedding-6.jpeg";
import wedding7 from "@/assets/wedding-7.jpeg";
import wedding8 from "@/assets/wedding-8.jpeg";
import wedding9 from "@/assets/wedding-9.jpeg";
import wedding10 from "@/assets/wedding-10.jpeg";

const images = [wedding1, wedding2, wedding3, wedding4, wedding5, wedding6, wedding7, wedding8, wedding9, wedding10];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative w-full" style={{ marginTop: "80px" }}>
      {/* Peach/rose top bar */}
      <div className="w-full h-3" style={{ background: "hsl(var(--burgundy-light))" }} />

      {/* Slideshow container */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 70vh, 700px)" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Wedding ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Center content card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            className="bg-white/85 backdrop-blur-sm px-10 py-8 md:px-16 md:py-10 text-center max-w-lg mx-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p
              className="text-lg md:text-xl italic mb-1"
              style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--gold-accent))" }}
            >
              The Wedding Chapter
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "hsl(var(--foreground))" }}
            >
              Kalyanasuthra
            </h1>
            <p className="text-sm md:text-base mb-6 text-muted-foreground">
              Trusted matchmaking with traditional values and a modern approach. Your perfect match awaits.
            </p>
            <a
              href="#register"
              className="inline-block border-2 border-foreground px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Get Started
            </a>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300"
              style={{
                background: i === current ? "hsl(var(--gold-accent))" : "transparent",
                borderColor: i === current ? "hsl(var(--gold-accent))" : "rgba(255,255,255,0.7)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom peach bar with subscribe-style strip */}
      <div
        className="w-full py-3 flex flex-col md:flex-row items-center justify-center gap-3 text-xs md:text-sm tracking-wide uppercase text-center"
        style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--soft-gray))" }}
      >
        <span>10,000+ Successful Marriages • Verified Profiles • Personalized Matchmaking</span>
      </div>
    </section>
  );
};

export default HeroSection;
