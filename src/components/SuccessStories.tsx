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

// 5 card positions - scattered overlapping like reference
const cardPositions = [
  { top: "16%", left: "6%", rotate: -7, z: 3 },
  { top: "0%", left: "34%", rotate: 5, z: 5 },
  { top: "2%", left: "66%", rotate: -4, z: 4 },
  { top: "48%", left: "20%", rotate: 6, z: 2 },
  { top: "44%", left: "54%", rotate: -5, z: 1 },
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

  // Auto-scroll: cycle through profiles - each one zooms in then out
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const getVisibleStories = useCallback(() => {
    const visible: { story: Story; posIndex: number; storyIndex: number }[] = [];
    for (let i = 0; i < Math.min(5, stories.length); i++) {
      const idx = (activeIndex + i) % stories.length;
      visible.push({ story: stories[idx], posIndex: i, storyIndex: idx });
    }
    return visible;
  }, [activeIndex, stories]);

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
    >
      {/* Load Great Vibes font for calligraphic heading */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* ===== BACKGROUND ===== */}
      {/* Base slate-blue/grey */}
      <div className="absolute inset-0" style={{ background: "#5B5D72" }} />
      {/* Teal area - diagonal */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(150deg, #3A9E9A 0%, #3FA7A3 40%, #48ACA8 100%)",
          clipPath: "polygon(42% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* ===== DIAGONAL CROSS LINES - blue/grey decorative lines ===== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        {/* Main diagonal separation line */}
        <line x1="42%" y1="0%" x2="0%" y2="100%" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        {/* Parallel accent lines */}
        <line x1="44%" y1="0%" x2="2%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="40%" y1="0%" x2="-2%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        {/* Cross accent lines */}
        <line x1="46%" y1="0%" x2="4%" y2="100%" stroke="rgba(200,210,230,0.04)" strokeWidth="0.8" />
        <line x1="38%" y1="0%" x2="-4%" y2="100%" stroke="rgba(200,210,230,0.04)" strokeWidth="0.8" />
        {/* Subtle crossing diagonal from opposite direction */}
        <line x1="30%" y1="0%" x2="85%" y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        <line x1="20%" y1="0%" x2="75%" y2="100%" stroke="rgba(255,255,255,0.025)" strokeWidth="0.8" />
      </svg>

      {/* ===== DECORATIVE ELEMENTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pink clouds - top left */}
        <svg className="absolute -top-[4%] left-[1%]" width="20%" viewBox="0 0 260 85" fill="none">
          <ellipse cx="55" cy="52" rx="52" ry="30" fill="#F4B8C8" opacity="0.38"/>
          <ellipse cx="105" cy="38" rx="55" ry="36" fill="#EFA8BC" opacity="0.32"/>
          <ellipse cx="165" cy="46" rx="48" ry="30" fill="#F8C4D4" opacity="0.28"/>
          <ellipse cx="210" cy="52" rx="38" ry="24" fill="#F0B0C0" opacity="0.22"/>
        </svg>

        {/* Pink clouds - top right */}
        <svg className="absolute -top-[3%] right-[6%]" width="22%" viewBox="0 0 300 95" fill="none">
          <ellipse cx="65" cy="58" rx="55" ry="32" fill="#F2B0C4" opacity="0.32"/>
          <ellipse cx="130" cy="42" rx="60" ry="40" fill="#ECA5B8" opacity="0.28"/>
          <ellipse cx="200" cy="50" rx="52" ry="32" fill="#F6C0D0" opacity="0.25"/>
          <ellipse cx="260" cy="55" rx="40" ry="26" fill="#F0B5C5" opacity="0.20"/>
        </svg>

        {/* Small cloud - right edge */}
        <svg className="absolute top-[5%] right-[-1%]" width="10%" viewBox="0 0 130 55" fill="none">
          <ellipse cx="42" cy="32" rx="38" ry="22" fill="#F5BCC8" opacity="0.25"/>
          <ellipse cx="82" cy="28" rx="34" ry="24" fill="#EEB0C0" opacity="0.20"/>
        </svg>

        {/* Hearts scattered */}
        {[
          { t: "18%", l: "12%", s: 16, o: 0.18, c: "white" },
          { t: "48%", l: "6%", s: 12, o: 0.12, c: "white" },
          { t: "32%", l: "26%", s: 10, o: 0.12, c: "#F5C0D0" },
          { t: "72%", l: "15%", s: 9, o: 0.09, c: "white" },
          { t: "22%", l: "40%", s: 8, o: 0.08, c: "#F5C0D0" },
          { t: "65%", l: "32%", s: 9, o: 0.07, c: "white" },
          { t: "82%", l: "75%", s: 8, o: 0.06, c: "white" },
          { t: "12%", l: "52%", s: 7, o: 0.07, c: "#F5C0D0" },
          { t: "88%", l: "45%", s: 7, o: 0.05, c: "white" },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ))}

        {/* 4-pointed diamond sparkles */}
        {[
          { t: "8%", l: "28%", s: 12, o: 0.35 },
          { t: "5%", l: "16%", s: 8, o: 0.22 },
          { t: "14%", l: "44%", s: 9, o: 0.25 },
          { t: "25%", l: "8%", s: 6, o: 0.18 },
          { t: "55%", l: "4%", s: 5, o: 0.12 },
          { t: "40%", l: "86%", s: 7, o: 0.10 },
          { t: "78%", l: "90%", s: 6, o: 0.08 },
        ].map((d, i) => (
          <svg key={`d${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
          </svg>
        ))}

        {/* Tiny dot stars */}
        {[
          { t: "10%", l: "20%", s: 3, o: 0.4 },
          { t: "6%", l: "35%", s: 2.5, o: 0.35 },
          { t: "20%", l: "38%", s: 2, o: 0.3 },
          { t: "42%", l: "14%", s: 2.5, o: 0.25 },
          { t: "58%", l: "28%", s: 2, o: 0.2 },
          { t: "75%", l: "10%", s: 2.5, o: 0.15 },
        ].map((dot, i) => (
          <div
            key={`dot${i}`}
            className="absolute rounded-full bg-white"
            style={{ top: dot.t, left: dot.l, width: dot.s, height: dot.s, opacity: dot.o }}
          />
        ))}

        {/* Circle outlines */}
        <div className="absolute top-[28%] left-[2%] w-[2.2%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.10)" }} />
        <div className="absolute bottom-[12%] left-[0.5%] w-[2.8%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.07)" }} />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full flex items-center" style={{ padding: "0 5%" }}>

          {/* LEFT - Calligraphic heading + subtext */}
          <motion.div
            className="w-[42%] flex-shrink-0 pr-[2%]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative star cluster above heading */}
            <div className="relative mb-1">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="white" opacity="0.4" className="inline-block mr-1 -mt-2">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
            </div>

            {/* Script heading - Great Vibes calligraphic font */}
            <div className="relative inline-block">
              {/* Heart before heading */}
              <svg className="absolute -top-4 -left-2" width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.35">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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

              {/* Decorative sparkles after heading */}
              <svg className="absolute -top-3 -right-8" width="16" height="16" viewBox="0 0 20 20" fill="white" opacity="0.4">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
              <svg className="absolute top-0 -right-4" width="9" height="9" viewBox="0 0 20 20" fill="white" opacity="0.28">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
              {/* Heart near end */}
              <svg className="absolute bottom-2 -right-6" width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.25">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            {/* Flourish underline with elegant curves */}
            <svg viewBox="0 0 320 30" style={{ width: "min(75%, 340px)" }} fill="none" className="mt-1 mb-5">
              <path d="M10 15 Q80 3, 160 15 Q240 27, 310 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.30"/>
              <path d="M50 15 Q105 24, 160 15 Q215 6, 270 15" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.20"/>
              <circle cx="160" cy="15" r="2.8" fill="white" opacity="0.32"/>
              <circle cx="120" cy="13" r="1.3" fill="white" opacity="0.18"/>
              <circle cx="200" cy="17" r="1.3" fill="white" opacity="0.18"/>
              <path d="M6 15 L8 13 L10 15 L8 17 Z" fill="white" opacity="0.25"/>
              <path d="M310 15 L312 13 L314 15 L312 17 Z" fill="white" opacity="0.25"/>
            </svg>

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(0.82rem, 1.15vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "400px",
              }}
            >
              Celebrating the beautiful unions made possible
              <br />
              through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT - Floating Cards with round scroll + zoom */}
          <div
            className="w-[58%] relative hidden lg:block"
            style={{ height: "clamp(340px, 42vw, 520px)" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="popLayout">
              {getVisibleStories().map(({ story, posIndex, storyIndex }) => {
                const pos = cardPositions[posIndex];
                // First card (posIndex 0) = zoomed/active, rest normal
                const isActive = posIndex === 0;
                const cardW = "clamp(150px, 12.8vw, 200px)";
                const imgH = "clamp(102px, 9.2vw, 140px)";

                return (
                  <motion.div
                    key={story.id + "-" + storyIndex}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      zIndex: isActive ? 10 : pos.z,
                      width: cardW,
                    }}
                    initial={{ opacity: 0, scale: 0.85, rotate: pos.rotate }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.12 : 1,
                      rotate: pos.rotate,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.25, 0.1, 0.25, 1],
                      scale: { duration: isActive ? 1.0 : 0.7 },
                    }}
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "white",
                        boxShadow: isActive
                          ? "0 14px 40px rgba(0,0,0,0.25), 0 0 0 2.5px rgba(255,255,255,0.35)"
                          : `0 ${4 + pos.z * 2}px ${12 + pos.z * 3}px rgba(0,0,0,${0.10 + pos.z * 0.015})`,
                        border: "3px solid rgba(255,255,255,0.5)",
                        transition: "box-shadow 0.5s ease",
                      }}
                    >
                      <div style={{ height: imgH }} className="overflow-hidden">
                        <motion.img
                          src={story.image_url || wedding1}
                          alt={`${story.bride_name} & ${story.groom_name}`}
                          className="w-full h-full object-cover"
                          animate={{ scale: isActive ? 1.05 : 1 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="px-2.5 py-2 text-center">
                        <h4
                          className="font-bold leading-tight"
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            color: "#5C3D2E",
                            fontSize: "clamp(10px, 0.92vw, 13.5px)",
                          }}
                        >
                          {story.bride_name}{" "}
                          <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                          {story.groom_name}
                        </h4>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "#999",
                          fontSize: "clamp(8px, 0.72vw, 10.5px)",
                          marginTop: 2,
                        }}>
                          {story.city}
                        </p>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "#666",
                          fontSize: "clamp(7.5px, 0.65vw, 10px)",
                          marginTop: 3,
                          lineHeight: 1.4,
                          fontStyle: "italic",
                        }}>
                          {story.story}
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

      {/* Mobile scroll fallback */}
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
                <h4 className="text-xs font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#5C3D2E" }}>
                  {story.bride_name} <span style={{ color: "#D94F6B" }}>♥</span> {story.groom_name}
                </h4>
                <p className="text-[10px] mt-0.5" style={{ color: "#999" }}>{story.city}</p>
                <p className="text-[10px] mt-1 leading-snug italic" style={{ color: "#666" }}>{story.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
