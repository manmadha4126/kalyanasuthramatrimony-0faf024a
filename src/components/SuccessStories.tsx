import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const cardLayouts = [
  { top: "14%", left: "10%", rotate: -6, z: 5 },
  { top: "2%", left: "38%", rotate: 4, z: 4 },
  { top: "4%", left: "68%", rotate: -3, z: 3 },
  { top: "50%", left: "4%", rotate: 5, z: 2 },
  { top: "46%", left: "42%", rotate: -4, z: 1 },
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

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const getVisibleStories = () => {
    const visible: { story: Story; posIndex: number }[] = [];
    for (let i = 0; i < Math.min(5, stories.length); i++) {
      const idx = (activeIndex + i) % stories.length;
      visible.push({ story: stories[idx], posIndex: i });
    }
    return visible;
  };

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 9", maxHeight: "100vh" }}
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, #4A4D65 0%, #5C5F78 40%, #696C83 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, #2A9B96 0%, #3FA7A3 50%, #55BAB6 100%)", clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 44% 0%)" }} />

      {/* ===== DECORATIVE ELEMENTS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pink clouds top-left */}
        <svg className="absolute -top-[2%] left-[4%]" width="12%" viewBox="0 0 160 65" fill="none">
          <ellipse cx="42" cy="40" rx="38" ry="22" fill="#F2B8C6" opacity="0.32"/>
          <ellipse cx="75" cy="30" rx="34" ry="26" fill="#EDA8BB" opacity="0.28"/>
          <ellipse cx="110" cy="38" rx="30" ry="20" fill="#F5C4D0" opacity="0.25"/>
        </svg>
        {/* Pink clouds top-center */}
        <svg className="absolute -top-[1%] left-[26%]" width="9%" viewBox="0 0 120 50" fill="none">
          <ellipse cx="35" cy="30" rx="28" ry="18" fill="#F0B0C2" opacity="0.24"/>
          <ellipse cx="62" cy="24" rx="24" ry="20" fill="#E8A0B5" opacity="0.22"/>
          <ellipse cx="88" cy="28" rx="22" ry="15" fill="#F5C0D0" opacity="0.2"/>
        </svg>
        {/* Pink clouds top-right */}
        <svg className="absolute -top-[1%] right-[5%]" width="13%" viewBox="0 0 180 70" fill="none">
          <ellipse cx="50" cy="44" rx="42" ry="24" fill="#F0B8C8" opacity="0.3"/>
          <ellipse cx="90" cy="34" rx="36" ry="28" fill="#E8A5B8" opacity="0.26"/>
          <ellipse cx="132" cy="40" rx="32" ry="20" fill="#F5C5D2" opacity="0.23"/>
        </svg>
        {/* Small cloud right side */}
        <svg className="absolute top-[16%] right-[2%]" width="6%" viewBox="0 0 80 38" fill="none">
          <ellipse cx="28" cy="22" rx="24" ry="14" fill="#F2BAC8" opacity="0.2"/>
          <ellipse cx="54" cy="20" rx="20" ry="13" fill="#EDB0C0" opacity="0.16"/>
        </svg>
        {/* Small cloud bottom-left */}
        <svg className="absolute bottom-[12%] left-[2%]" width="5%" viewBox="0 0 70 32" fill="none">
          <ellipse cx="22" cy="18" rx="20" ry="12" fill="#F0B5C5" opacity="0.16"/>
          <ellipse cx="48" cy="16" rx="18" ry="14" fill="#E8A8B8" opacity="0.13"/>
        </svg>

        {/* Hearts */}
        {[
          { t: "24%", l: "17%", s: 18, o: 0.12 },
          { t: "62%", l: "9%", s: 13, o: 0.08 },
          { t: "36%", l: "33%", s: 11, o: 0.1 },
          { t: "72%", l: "30%", s: 10, o: 0.08 },
          { t: "30%", l: "58%", s: 10, o: 0.08 },
          { t: "78%", l: "85%", s: 9, o: 0.06 },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill="white" opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ))}

        {/* Sparkle stars */}
        {[
          { t: "12%", l: "36%", s: 10, o: 0.2, c: "white" },
          { t: "8%", l: "42%", s: 8, o: 0.18, c: "#FFD700" },
          { t: "19%", l: "13%", s: 7, o: 0.16, c: "#FFD700" },
          { t: "55%", l: "36%", s: 8, o: 0.12, c: "white" },
          { t: "40%", l: "90%", s: 8, o: 0.1, c: "white" },
          { t: "15%", l: "62%", s: 6, o: 0.1, c: "#FFD700" },
        ].map((s, i) => (
          <svg key={`s${i}`} className="absolute" style={{ top: s.t, left: s.l }} width={s.s} height={s.s} viewBox="0 0 24 24" fill={s.c} opacity={s.o}>
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/>
          </svg>
        ))}

        {/* Circle accents */}
        <div className="absolute top-[30%] left-[3%] w-[1.5%] aspect-square rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.12)" }} />
        <div className="absolute bottom-[22%] right-[3%] w-[1%] aspect-square rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
        <div className="absolute top-[65%] left-[22%] w-[0.6%] aspect-square rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.04]" viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ height: "8%" }}>
          <path d="M0,25 Q360,0 720,25 T1440,25 V50 H0 Z" fill="white"/>
        </svg>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full flex items-center" style={{ padding: "0 6%" }}>

          {/* LEFT 50% - Typography */}
          <motion.div
            className="w-1/2 flex-shrink-0 pr-[4%]"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-white mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Success Stories
            </h2>

            {/* Flourish underline */}
            <svg viewBox="0 0 260 22" style={{ width: "min(65%, 280px)" }} fill="none" className="mb-[4%]">
              <path d="M6 11 Q65 1, 130 11 Q195 21, 254 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
              <path d="M45 11 Q88 20, 130 11 Q172 2, 215 11" stroke="white" strokeWidth="0.7" strokeLinecap="round" opacity="0.25"/>
              <circle cx="130" cy="11" r="2.5" fill="white" opacity="0.4"/>
              <circle cx="100" cy="9" r="1.2" fill="white" opacity="0.22"/>
              <circle cx="160" cy="13" r="1.2" fill="white" opacity="0.22"/>
              <text x="0" y="14" fill="white" fontSize="7" opacity="0.3">✦</text>
              <text x="250" y="14" fill="white" fontSize="7" opacity="0.3">✦</text>
            </svg>

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.68)",
                fontSize: "clamp(0.8rem, 1.2vw, 1.1rem)",
                lineHeight: 1.65,
                maxWidth: "380px",
              }}
            >
              Celebrating the beautiful unions made possible through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT 50% - Floating Cards (desktop) */}
          <div
            className="w-1/2 relative hidden lg:block"
            style={{ height: "clamp(350px, 45vw, 560px)" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {getVisibleStories().map(({ story, posIndex }) => {
              const pos = cardLayouts[posIndex];
              const cardW = "clamp(155px, 13.5vw, 205px)";
              const imgH = "clamp(105px, 9.5vw, 145px)";

              return (
                <motion.div
                  key={`${story.id}-${posIndex}`}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate}deg)`,
                    zIndex: pos.z,
                    width: cardW,
                  }}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      background: "white",
                      boxShadow: `0 ${6 + pos.z}px ${18 + pos.z * 4}px rgba(0,0,0,${0.12 + pos.z * 0.02})`,
                      border: "3px solid rgba(255,255,255,0.55)",
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
                          fontSize: "clamp(10px, 0.95vw, 14px)",
                        }}
                      >
                        {story.bride_name}{" "}
                        <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                        {story.groom_name}
                      </h4>
                      <p style={{
                        fontFamily: "'Lato', sans-serif",
                        color: "#999",
                        fontSize: "clamp(8px, 0.75vw, 11px)",
                        marginTop: 2,
                      }}>
                        {story.city}
                      </p>
                      <p style={{
                        fontFamily: "'Lato', sans-serif",
                        color: "#666",
                        fontSize: "clamp(8px, 0.7vw, 10.5px)",
                        marginTop: 4,
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
          </div>
        </div>
      </div>

      {/* Mobile scroll fallback */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 px-4 pb-5">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 rounded-lg overflow-hidden"
              style={{ width: 165, background: "white", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.5)" }}
            >
              <div className="h-[105px] overflow-hidden">
                <img src={story.image_url || wedding1} alt={`${story.bride_name} & ${story.groom_name}`} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-2 text-center">
                <h4 className="text-xs font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#5C3D2E" }}>
                  {story.bride_name} <span style={{ color: "#D94F6B" }}>♥</span> {story.groom_name}
                </h4>
                <p className="text-[10px] mt-0.5" style={{ color: "#999" }}>{story.city}</p>
                <p className="text-[10px] mt-1 leading-snug italic" style={{ color: "#666" }}>{story.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
