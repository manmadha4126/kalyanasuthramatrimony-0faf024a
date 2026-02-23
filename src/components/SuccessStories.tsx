import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding5 from "@/assets/wedding-5.jpeg";

type Story = {
  id: string;
  bride_name: string;
  groom_name: string;
  city: string;
  story: string;
  image_url: string | null;
};

const fallbackStories: Story[] = [
  { id: "1", bride_name: "Ananya", groom_name: "Raghav", city: "Hyderabad", story: "From a simple profile match to a beautiful wedding, our journey began here.", image_url: wedding1 },
  { id: "2", bride_name: "Divya", groom_name: "Karthik", city: "Tirupati", story: "Our families connected instantly and today we are happily married.", image_url: wedding2 },
  { id: "3", bride_name: "Meghana", groom_name: "Arjun", city: "Bangalore", story: "Kalyanasuthra made our search easy and trustworthy.", image_url: wedding3 },
  { id: "4", bride_name: "Sravani", groom_name: "Nikhil", city: "Chennai", story: "A perfect blend of tradition and compatibility.", image_url: wedding4 },
  { id: "5", bride_name: "Lakshmi", groom_name: "Harsha", city: "Vijayawada", story: "Grateful for the guidance and genuine profiles.", image_url: wedding5 },
];

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>(fallbackStories);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("success_stories")
        .select("id,bride_name,groom_name,city,story,image_url")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) setStories(data as Story[]);
    };
    fetchStories();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  // Get 5 visible cards centered around activeIndex
  const getVisibleCards = useCallback(() => {
    const cards: { story: Story; offset: number }[] = [];
    for (let i = -2; i <= 2; i++) {
      const idx = ((activeIndex + i) % stories.length + stories.length) % stories.length;
      cards.push({ story: stories[idx], offset: i });
    }
    return cards;
  }, [activeIndex, stories]);

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(480px, 55vw, 620px)" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* ===== BACKGROUND LAYERS ===== */}
      {/* Layer 1: Base grey - occupies 60% via diagonal from top-left */}
      <div className="absolute inset-0" style={{ background: "#5C5F78" }} />

      {/* Layer 2: Shadow blue strip - 15% between grey and teal */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, rgba(76,90,120,0.7) 0%, rgba(60,80,110,0.5) 50%, rgba(55,85,115,0.3) 100%)",
          clipPath: "polygon(60% 0%, 75% 0%, 25% 100%, 10% 100%)",
        }}
      />

      {/* Layer 3: Teal green - remaining right side */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(155deg, #3A9E9A 0%, #3FA7A3 50%, #48ACA8 100%)",
          clipPath: "polygon(75% 0%, 100% 0%, 100% 100%, 25% 100%)",
        }}
      />

      {/* ===== DIAGONAL CROSS LINES (grey & blue) ===== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        {/* Primary diagonal lines - grey tones */}
        <line x1="58%" y1="0%" x2="8%" y2="100%" stroke="rgba(180,185,200,0.15)" strokeWidth="1.5" />
        <line x1="62%" y1="0%" x2="12%" y2="100%" stroke="rgba(180,185,200,0.10)" strokeWidth="1" />
        <line x1="55%" y1="0%" x2="5%" y2="100%" stroke="rgba(160,165,180,0.08)" strokeWidth="1" />
        {/* Secondary diagonal lines - blue tones */}
        <line x1="73%" y1="0%" x2="23%" y2="100%" stroke="rgba(100,140,200,0.12)" strokeWidth="1.2" />
        <line x1="76%" y1="0%" x2="26%" y2="100%" stroke="rgba(100,140,200,0.07)" strokeWidth="0.8" />
        <line x1="70%" y1="0%" x2="20%" y2="100%" stroke="rgba(80,120,180,0.06)" strokeWidth="0.8" />
        {/* Cross directions for depth */}
        <line x1="15%" y1="0%" x2="85%" y2="100%" stroke="rgba(180,185,200,0.05)" strokeWidth="0.6" />
        <line x1="25%" y1="0%" x2="92%" y2="100%" stroke="rgba(100,140,200,0.04)" strokeWidth="0.6" />
        <line x1="5%" y1="0%" x2="70%" y2="100%" stroke="rgba(180,185,200,0.04)" strokeWidth="0.5" />
      </svg>

      {/* ===== DECORATIVE ELEMENTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft clouds - top left */}
        <svg className="absolute -top-[3%] left-[2%]" width="18%" viewBox="0 0 240 80" fill="none">
          <ellipse cx="50" cy="48" rx="48" ry="28" fill="#F4B8C8" opacity="0.30" />
          <ellipse cx="100" cy="35" rx="52" ry="34" fill="#EFA8BC" opacity="0.25" />
          <ellipse cx="155" cy="42" rx="44" ry="28" fill="#F8C4D4" opacity="0.22" />
          <ellipse cx="200" cy="48" rx="35" ry="22" fill="#F0B0C0" opacity="0.18" />
        </svg>

        {/* Soft clouds - top right */}
        <svg className="absolute -top-[2%] right-[4%]" width="20%" viewBox="0 0 280 85" fill="none">
          <ellipse cx="60" cy="52" rx="50" ry="30" fill="#F2B0C4" opacity="0.25" />
          <ellipse cx="120" cy="38" rx="55" ry="36" fill="#ECA5B8" opacity="0.22" />
          <ellipse cx="185" cy="46" rx="48" ry="30" fill="#F6C0D0" opacity="0.20" />
          <ellipse cx="240" cy="50" rx="36" ry="24" fill="#F0B5C5" opacity="0.16" />
        </svg>

        {/* Cloud - bottom left */}
        <svg className="absolute bottom-[2%] left-[5%]" width="14%" viewBox="0 0 180 60" fill="none">
          <ellipse cx="40" cy="35" rx="38" ry="22" fill="#F5BCC8" opacity="0.18" />
          <ellipse cx="85" cy="28" rx="42" ry="28" fill="#EEB0C0" opacity="0.14" />
          <ellipse cx="135" cy="33" rx="35" ry="20" fill="#F8C8D6" opacity="0.12" />
        </svg>

        {/* Abstract circular accents */}
        <div className="absolute top-[22%] left-[3%] w-[3%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.10)" }} />
        <div className="absolute bottom-[15%] left-[1%] w-[2.5%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.07)" }} />
        <div className="absolute top-[60%] right-[8%] w-[2%] aspect-square rounded-full" style={{ border: "1px solid rgba(255,255,255,0.06)" }} />
        <div className="absolute top-[10%] right-[15%] w-[1.8%] aspect-square rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />

        {/* Hearts scattered */}
        {[
          { t: "15%", l: "10%", s: 14, o: 0.16, c: "white" },
          { t: "45%", l: "5%", s: 11, o: 0.12, c: "white" },
          { t: "30%", l: "22%", s: 9, o: 0.10, c: "#F5C0D0" },
          { t: "68%", l: "12%", s: 8, o: 0.08, c: "white" },
          { t: "20%", l: "38%", s: 7, o: 0.07, c: "#F5C0D0" },
          { t: "80%", l: "70%", s: 7, o: 0.06, c: "white" },
          { t: "12%", l: "55%", s: 6, o: 0.06, c: "#F5C0D0" },
          { t: "85%", l: "40%", s: 6, o: 0.05, c: "white" },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* 4-pointed sparkles */}
        {[
          { t: "7%", l: "25%", s: 11, o: 0.30 },
          { t: "4%", l: "14%", s: 7, o: 0.20 },
          { t: "12%", l: "42%", s: 8, o: 0.22 },
          { t: "50%", l: "3%", s: 5, o: 0.12 },
          { t: "38%", l: "82%", s: 6, o: 0.10 },
          { t: "75%", l: "88%", s: 5, o: 0.08 },
        ].map((d, i) => (
          <svg key={`d${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
          </svg>
        ))}

        {/* Abstract shapes - soft triangles/polygons */}
        <svg className="absolute top-[35%] left-[15%]" width="30" height="30" viewBox="0 0 30 30" fill="white" opacity="0.04">
          <polygon points="15,2 28,28 2,28" />
        </svg>
        <svg className="absolute bottom-[20%] right-[18%]" width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.035">
          <rect x="2" y="2" width="20" height="20" rx="4" />
        </svg>

        {/* Dot stars */}
        {[
          { t: "9%", l: "18%", s: 3, o: 0.35 },
          { t: "5%", l: "33%", s: 2.5, o: 0.30 },
          { t: "18%", l: "36%", s: 2, o: 0.25 },
          { t: "40%", l: "12%", s: 2.5, o: 0.20 },
          { t: "55%", l: "25%", s: 2, o: 0.15 },
        ].map((dot, i) => (
          <div
            key={`dot${i}`}
            className="absolute rounded-full bg-white"
            style={{ top: dot.t, left: dot.l, width: dot.s, height: dot.s, opacity: dot.o }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full flex items-center" style={{ padding: "0 5%" }}>

          {/* LEFT - Heading */}
          <motion.div
            className="w-[40%] flex-shrink-0 pr-[2%]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-1">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="white" opacity="0.35" className="inline-block mr-1 -mt-2">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
              </svg>
            </div>

            <div className="relative inline-block">
              <svg className="absolute -top-4 -left-2" width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.30">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              <h2
                className="text-white"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontWeight: 400,
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "0.01em",
                  textShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
              >
                Success Stories
              </h2>

              <svg className="absolute -top-3 -right-8" width="14" height="14" viewBox="0 0 20 20" fill="white" opacity="0.35">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
              </svg>
              <svg className="absolute top-0 -right-4" width="8" height="8" viewBox="0 0 20 20" fill="white" opacity="0.22">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
              </svg>
            </div>

            {/* Flourish underline */}
            <svg viewBox="0 0 320 30" style={{ width: "min(75%, 340px)" }} fill="none" className="mt-1 mb-5">
              <path d="M10 15 Q80 3, 160 15 Q240 27, 310 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.28" />
              <path d="M50 15 Q105 24, 160 15 Q215 6, 270 15" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.18" />
              <circle cx="160" cy="15" r="2.8" fill="white" opacity="0.28" />
              <circle cx="120" cy="13" r="1.3" fill="white" opacity="0.15" />
              <circle cx="200" cy="17" r="1.3" fill="white" opacity="0.15" />
              <path d="M6 15 L8 13 L10 15 L8 17 Z" fill="white" opacity="0.22" />
              <path d="M310 15 L312 13 L314 15 L312 17 Z" fill="white" opacity="0.22" />
            </svg>

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.70)",
                fontSize: "clamp(0.82rem, 1.1vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "400px",
              }}
            >
              Celebrating the beautiful unions made possible
              <br />
              through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT - Floating stacked overlapping cards */}
          <div
            className="w-[60%] relative hidden lg:flex items-center justify-center"
            style={{ height: "clamp(300px, 36vw, 440px)" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map(({ story, offset }) => {
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);
                const cardW = isCenter ? 200 : 170;
                const imgH = isCenter ? 140 : 110;

                // Stepped upward: center highest, edges lowest
                const yStep = isCenter ? -30 : absOffset === 1 ? -10 : 15;
                const xPos = offset * 24;
                const rotation = offset * 2.5;
                const zIndex = 10 - absOffset;
                const opacity = isCenter ? 1 : absOffset === 1 ? 0.85 : 0.65;
                const scale = isCenter ? 1.08 : absOffset === 1 ? 0.93 : 0.82;

                return (
                  <motion.div
                    key={`${story.id}-${offset}`}
                    className="absolute"
                    style={{
                      zIndex,
                      width: cardW,
                    }}
                    initial={{ opacity: 0, x: 140, scale: 0.8, rotate: rotation }}
                    animate={{
                      opacity,
                      x: `${xPos}%`,
                      scale,
                      rotate: rotation,
                      y: yStep,
                    }}
                    exit={{ opacity: 0, x: -140, scale: 0.8 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "white",
                        boxShadow: isCenter
                          ? "0 18px 50px rgba(0,0,0,0.30), 0 0 0 2px rgba(255,255,255,0.45)"
                          : `0 ${4 + zIndex}px ${12 + zIndex * 2}px rgba(0,0,0,${0.10 + absOffset * 0.02})`,
                        border: "2.5px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      <div style={{ height: imgH }} className="overflow-hidden">
                        <motion.img
                          src={story.image_url || wedding1}
                          alt={`${story.bride_name} & ${story.groom_name}`}
                          className="w-full h-full object-cover"
                          animate={{ scale: isCenter ? 1.06 : 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="px-3 py-2 text-center">
                        <h4
                          className="font-bold leading-tight"
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            color: "hsl(var(--primary))",
                            fontSize: isCenter ? 13 : 11.5,
                          }}
                        >
                          {story.bride_name}{" "}
                          <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                          {story.groom_name}
                        </h4>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "hsl(var(--muted-foreground))",
                          fontSize: isCenter ? 10.5 : 9.5,
                          marginTop: 2,
                        }}>
                          {story.city}
                        </p>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "#666",
                          fontSize: isCenter ? 10 : 9,
                          marginTop: 3,
                          lineHeight: 1.4,
                          fontStyle: "italic",
                        }}>
                          "{story.story}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 px-4 pb-5">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: 160, background: "white", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.5)" }}
              animate={{ scale: idx === activeIndex % stories.length ? 1.06 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-[100px] overflow-hidden">
                <img src={story.image_url || wedding1} alt={`${story.bride_name} & ${story.groom_name}`} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-2 text-center">
                <h4 className="text-xs font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--primary))" }}>
                  {story.bride_name} <span style={{ color: "#D94F6B" }}>♥</span> {story.groom_name}
                </h4>
                <p className="text-[10px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{story.city}</p>
                <p className="text-[10px] mt-1 leading-snug italic" style={{ color: "#666" }}>"{story.story}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
