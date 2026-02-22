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

// Card positions matching reference: scattered overlapping layout
const cardPositions = [
  { top: "18%", left: "8%", rotate: -7, z: 3 },    // Ananya & Raghav - center-left
  { top: "0%", left: "36%", rotate: 5, z: 5 },      // top-center
  { top: "2%", left: "66%", rotate: -4, z: 4 },     // top-right
  { top: "48%", left: "22%", rotate: 6, z: 2 },     // bottom-center-left
  { top: "42%", left: "56%", rotate: -5, z: 1 },    // bottom-right
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

  // Auto-scroll: cycle active card every 3s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const getVisibleStories = useCallback(() => {
    const visible: { story: Story; posIndex: number }[] = [];
    for (let i = 0; i < Math.min(5, stories.length); i++) {
      const idx = (activeIndex + i) % stories.length;
      visible.push({ story: stories[idx], posIndex: i });
    }
    return visible;
  }, [activeIndex, stories]);

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
    >
      {/* ===== BACKGROUND - Smooth gradient blend matching reference ===== */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #4E5068 0%, #576078 25%, #5A7A8A 45%, #4BA09C 60%, #3FA7A3 75%, #48ACA8 100%)",
        }}
      />
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)"
      }} />

      {/* ===== DECORATIVE ELEMENTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large pink cloud - top left */}
        <svg className="absolute -top-[3%] left-[2%]" width="18%" viewBox="0 0 240 80" fill="none">
          <ellipse cx="55" cy="50" rx="50" ry="28" fill="#F4B8C8" opacity="0.35"/>
          <ellipse cx="100" cy="38" rx="52" ry="34" fill="#EFA8BC" opacity="0.30"/>
          <ellipse cx="155" cy="45" rx="45" ry="28" fill="#F8C4D4" opacity="0.28"/>
          <ellipse cx="195" cy="50" rx="35" ry="22" fill="#F0B0C0" opacity="0.22"/>
        </svg>

        {/* Pink cloud - top center-right */}
        <svg className="absolute -top-[2%] right-[8%]" width="20%" viewBox="0 0 280 90" fill="none">
          <ellipse cx="60" cy="55" rx="52" ry="30" fill="#F2B0C4" opacity="0.30"/>
          <ellipse cx="120" cy="40" rx="58" ry="38" fill="#ECA5B8" opacity="0.28"/>
          <ellipse cx="185" cy="48" rx="48" ry="30" fill="#F6C0D0" opacity="0.25"/>
          <ellipse cx="240" cy="52" rx="38" ry="24" fill="#F0B5C5" opacity="0.20"/>
        </svg>

        {/* Small pink cloud - top right edge */}
        <svg className="absolute top-[4%] right-[0%]" width="10%" viewBox="0 0 130 55" fill="none">
          <ellipse cx="40" cy="32" rx="36" ry="20" fill="#F5BCC8" opacity="0.25"/>
          <ellipse cx="80" cy="28" rx="32" ry="22" fill="#EEB0C0" opacity="0.22"/>
        </svg>

        {/* Scattered hearts - white/pink, matching reference */}
        {[
          { t: "20%", l: "14%", s: 14, o: 0.15, c: "white" },
          { t: "52%", l: "8%", s: 10, o: 0.10, c: "white" },
          { t: "35%", l: "28%", s: 9, o: 0.10, c: "#F5C0D0" },
          { t: "75%", l: "18%", s: 8, o: 0.08, c: "white" },
          { t: "25%", l: "42%", s: 7, o: 0.08, c: "#F5C0D0" },
          { t: "68%", l: "35%", s: 8, o: 0.06, c: "white" },
          { t: "85%", l: "78%", s: 7, o: 0.06, c: "white" },
          { t: "15%", l: "55%", s: 6, o: 0.06, c: "#F5C0D0" },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ))}

        {/* Sparkle/star decorations */}
        {[
          { t: "10%", l: "22%", s: 12, o: 0.25, c: "white" },
          { t: "6%", l: "38%", s: 8, o: 0.18, c: "white" },
          { t: "18%", l: "10%", s: 6, o: 0.15, c: "#FFE4A0" },
          { t: "30%", l: "40%", s: 7, o: 0.12, c: "white" },
          { t: "60%", l: "5%", s: 5, o: 0.10, c: "white" },
          { t: "45%", l: "88%", s: 6, o: 0.10, c: "white" },
          { t: "80%", l: "92%", s: 5, o: 0.08, c: "#FFE4A0" },
        ].map((s, i) => (
          <svg key={`s${i}`} className="absolute" style={{ top: s.t, left: s.l }} width={s.s} height={s.s} viewBox="0 0 24 24" fill={s.c} opacity={s.o}>
            <path d="M12 0l3 9h9l-7.5 5.5 3 9L12 17l-7.5 6.5 3-9L0 9h9z"/>
          </svg>
        ))}

        {/* Tiny diamond sparkles - 4-pointed stars */}
        {[
          { t: "8%", l: "30%", s: 10, o: 0.3 },
          { t: "14%", l: "48%", s: 7, o: 0.2 },
          { t: "5%", l: "18%", s: 6, o: 0.18 },
        ].map((d, i) => (
          <svg key={`d${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
          </svg>
        ))}

        {/* Soft circle outlines */}
        <div className="absolute top-[28%] left-[3%] w-[2%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.10)" }} />
        <div className="absolute bottom-[15%] left-[1%] w-[2.5%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.08)" }} />
        <div className="absolute top-[70%] left-[12%] w-[0.8%] aspect-square rounded-full bg-white/5" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full flex items-center" style={{ padding: "0 5%" }}>

          {/* LEFT - Heading + subtext */}
          <motion.div
            className="w-[42%] flex-shrink-0 pr-[2%]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Script heading with decorative stars */}
            <div className="relative inline-block mb-3">
              {/* Small star before */}
              <svg className="absolute -top-3 -left-4" width="14" height="14" viewBox="0 0 20 20" fill="white" opacity="0.4">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Success Stories
              </h2>
              {/* Small stars after */}
              <svg className="absolute -top-2 -right-6" width="12" height="12" viewBox="0 0 20 20" fill="white" opacity="0.35">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
              <svg className="absolute top-1 -right-3" width="7" height="7" viewBox="0 0 20 20" fill="white" opacity="0.25">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"/>
              </svg>
            </div>

            {/* Flourish underline - elegant curved lines */}
            <svg viewBox="0 0 300 28" style={{ width: "min(70%, 320px)" }} fill="none" className="mb-5">
              <path d="M8 14 Q75 3, 150 14 Q225 25, 292 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
              <path d="M40 14 Q95 22, 150 14 Q205 6, 260 14" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.22"/>
              <circle cx="150" cy="14" r="2.5" fill="white" opacity="0.35"/>
              <circle cx="115" cy="12" r="1.2" fill="white" opacity="0.20"/>
              <circle cx="185" cy="16" r="1.2" fill="white" opacity="0.20"/>
              {/* Diamond ends */}
              <path d="M4 14 L6 12 L8 14 L6 16 Z" fill="white" opacity="0.28"/>
              <path d="M292 14 L294 12 L296 14 L294 16 Z" fill="white" opacity="0.28"/>
            </svg>

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.70)",
                fontSize: "clamp(0.8rem, 1.15vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "400px",
              }}
            >
              Celebrating the beautiful unions made possible
              <br />
              through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT - Floating Cards (desktop) */}
          <div
            className="w-[58%] relative hidden lg:block"
            style={{ height: "clamp(340px, 42vw, 520px)" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="sync">
              {getVisibleStories().map(({ story, posIndex }) => {
                const pos = cardPositions[posIndex];
                const isActive = posIndex === 0; // First card (center of attention) gets zoom
                const cardW = "clamp(148px, 12.5vw, 195px)";
                const imgH = "clamp(100px, 9vw, 138px)";

                return (
                  <motion.div
                    key={`${story.id}-${posIndex}`}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      zIndex: isActive ? 10 : pos.z,
                      width: cardW,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: isActive ? 1.08 : 1,
                      rotate: pos.rotate,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "white",
                        boxShadow: isActive
                          ? "0 12px 35px rgba(0,0,0,0.22), 0 0 0 2px rgba(255,255,255,0.3)"
                          : `0 ${4 + pos.z * 2}px ${14 + pos.z * 3}px rgba(0,0,0,${0.10 + pos.z * 0.015})`,
                        border: "3px solid rgba(255,255,255,0.5)",
                        transition: "box-shadow 0.5s ease",
                      }}
                    >
                      <div style={{ height: imgH }} className="overflow-hidden">
                        <img
                          src={story.image_url || wedding1}
                          alt={`${story.bride_name} & ${story.groom_name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="px-2.5 py-2 text-center">
                        <h4
                          className="font-bold leading-tight"
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            color: "#5C3D2E",
                            fontSize: "clamp(10px, 0.9vw, 13.5px)",
                          }}
                        >
                          {story.bride_name}{" "}
                          <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                          {story.groom_name}
                        </h4>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "#999",
                          fontSize: "clamp(8px, 0.7vw, 10.5px)",
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
              animate={{ scale: idx === activeIndex % stories.length ? 1.05 : 1 }}
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
