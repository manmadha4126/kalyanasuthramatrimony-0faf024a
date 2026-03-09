import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 1.02 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.98 }),
  };

  return (
    <section id="home" className="relative w-full" style={{ marginTop: "80px" }}>
      {/* Decorative top border */}
      <div className="w-full h-1.5" style={{ background: "linear-gradient(90deg, hsl(var(--burgundy-light)), hsl(var(--gold-accent)), hsl(var(--burgundy-light)))" }} />

      {/* Main slideshow */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(500px, 85vh, 850px)" }}>
        {/* Background blur layer */}
        <div className="absolute inset-0">
          <img
            src={images[current]}
            alt=""
            className="w-full h-full object-cover scale-110 blur-md opacity-40"
          />
        </div>

        {/* Main image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[current]}
              alt={`Wedding ${current + 1}`}
              className="w-full h-full object-contain"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.4) 100%)"
        }} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.15) 100%)"
        }} />

        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 z-20 w-16 h-16 border-t-2 border-l-2 opacity-50" style={{ borderColor: "hsl(var(--gold-accent))" }} />
        <div className="absolute top-6 right-6 z-20 w-16 h-16 border-t-2 border-r-2 opacity-50" style={{ borderColor: "hsl(var(--gold-accent))" }} />
        <div className="absolute bottom-16 left-6 z-20 w-16 h-16 border-b-2 border-l-2 opacity-50" style={{ borderColor: "hsl(var(--gold-accent))" }} />
        <div className="absolute bottom-16 right-6 z-20 w-16 h-16 border-b-2 border-r-2 opacity-50" style={{ borderColor: "hsl(var(--gold-accent))" }} />

        {/* Center content card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            className="pointer-events-auto bg-white/80 backdrop-blur-md px-10 py-8 md:px-16 md:py-10 text-center max-w-lg mx-4 border"
            style={{ borderColor: "hsl(var(--gold-accent) / 0.3)" }}
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
            <div className="w-16 h-0.5 mx-auto mb-4" style={{ background: "hsl(var(--gold-accent))" }} />
            <p className="text-sm md:text-base mb-6 text-muted-foreground leading-relaxed">
              Trusted matchmaking with traditional values and a modern approach. Your perfect match awaits.
            </p>
            <a
              href="#register"
              className="inline-block border-2 px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:text-primary-foreground"
              style={{
                borderColor: "hsl(var(--burgundy))",
                color: "hsl(var(--burgundy))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(var(--burgundy))";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "hsl(var(--burgundy))";
              }}
            >
              Get Started
            </a>
          </motion.div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300"
              style={{
                background: i === current ? "hsl(var(--gold-accent))" : "transparent",
                borderColor: i === current ? "hsl(var(--gold-accent))" : "rgba(255,255,255,0.6)",
                transform: i === current ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent strip */}
      <div
        className="w-full py-3 px-4 flex items-center justify-center gap-2 text-[10px] sm:text-xs md:text-sm tracking-wider uppercase text-center flex-wrap"
        style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--soft-gray))" }}
      >
        <span className="w-6 h-px hidden sm:block" style={{ background: "hsl(var(--gold-accent))" }} />
        <span>10,000+ Successful Marriages • Verified Profiles • Personalized Matchmaking</span>
        <span className="w-6 h-px hidden sm:block" style={{ background: "hsl(var(--gold-accent))" }} />
      </div>

      {/* Decorative bottom border */}
      <div className="w-full h-1.5" style={{ background: "linear-gradient(90deg, hsl(var(--burgundy-light)), hsl(var(--gold-accent)), hsl(var(--burgundy-light)))" }} />
    </section>
  );
};

export default HeroSection;
