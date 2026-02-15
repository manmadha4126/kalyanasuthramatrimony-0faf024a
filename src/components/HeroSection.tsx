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

const bullets = [
  "10,000+ Successful Marriages",
  "Verified & Trusted Profiles",
  "Traditional Values, Modern Approach",
  "Personalized Matchmaking Services",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const prev = (current - 1 + images.length) % images.length;

  return (
    <section id="home" className="section-dark py-16 pt-28 lg:pt-32 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Slideshow Left */}
          <div className="w-full lg:w-[60%] relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[21/10] gold-border-rich">
              {/* Watermark */}
              <img
                src={images[prev]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-110 opacity-60 blur-[3px]"
              />
              {/* Main */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={images[current]}
                  alt={`Wedding ${current + 1}`}
                  className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain z-10 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
              {/* Gradient overlay */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "24px" : "8px",
                      background: i === current ? "hsl(var(--gold))" : "hsla(0,0%,100%,0.5)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[40%] text-center lg:text-left">
            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold gold-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Kalyanasuthra Matrimony
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl mb-8 italic"
              style={{ color: "hsl(var(--cream)/0.8)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "The Wedding Chapter Starts here……"
            </motion.p>
            <motion.ul
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--gold))" }} />
                  <span style={{ color: "hsl(var(--cream)/0.9)" }}>{b}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <a href="#register" className="btn-gold inline-block">
                Start Now – Register for Best Matches
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
