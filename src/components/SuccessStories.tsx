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

// Card layout positions matching the reference image exactly
const cardPositions = [
  // Card 1: Center-left, slight left tilt
  { top: "18%", left: "28%", rotate: -6 },
  // Card 2: Top-right area, slight right tilt
  { top: "3%", left: "52%", rotate: 4 },
  // Card 3: Far right, slight left tilt
  { top: "5%", left: "76%", rotate: -3 },
  // Card 4: Bottom-left, slight right tilt
  { top: "52%", left: "20%", rotate: 4 },
  // Card 5: Bottom-center-right, slight left tilt
  { top: "48%", left: "54%", rotate: -3 },
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
    for (let i = 0; i < 5; i++) {
      const storyIndex = (activeIndex + i) % stories.length;
      visible.push({ story: stories[storyIndex], posIndex: i });
    }
    return visible;
  };

  return (
    <section id="stories" className="relative overflow-hidden w-full" style={{ aspectRatio: "3.2 / 1", minHeight: 420 }}>
      {/* ===== DUAL DIAGONAL BACKGROUND ===== */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, #4E5068 0%, #5C5F78 35%, #686B82 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, #2D9D98 0%, #3FA7A3 45%, #52B5B1 100%)", clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 42% 0%)" }} />

      {/* ===== DECORATIVE ELEMENTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pink clouds - top left */}
        <svg className="absolute -top-1 left-[5%]" width="130" height="55" viewBox="0 0 130 55" fill="none">
          <ellipse cx="35" cy="35" rx="30" ry="18" fill="#F2B8C6" opacity="0.3" />
          <ellipse cx="62" cy="28" rx="28" ry="22" fill="#EDA8BB" opacity="0.28" />
          <ellipse cx="90" cy="33" rx="25" ry="16" fill="#F5C4D0" opacity="0.25" />
        </svg>
        {/* Pink clouds - top center */}
        <svg className="absolute -top-2 left-[28%]" width="100" height="45" viewBox="0 0 100 45" fill="none">
          <ellipse cx="30" cy="28" rx="24" ry="15" fill="#F0B0C2" opacity="0.22" />
          <ellipse cx="55" cy="22" rx="20" ry="17" fill="#E8A0B5" opacity="0.2" />
          <ellipse cx="75" cy="26" rx="18" ry="13" fill="#F5C0D0" opacity="0.18" />
        </svg>
        {/* Pink clouds - top right */}
        <svg className="absolute -top-1 right-[6%]" width="140" height="60" viewBox="0 0 140 60" fill="none">
          <ellipse cx="40" cy="38" rx="34" ry="20" fill="#F0B8C8" opacity="0.28" />
          <ellipse cx="72" cy="30" rx="30" ry="23" fill="#E8A5B8" opacity="0.25" />
          <ellipse cx="105" cy="36" rx="27" ry="17" fill="#F5C5D2" opacity="0.22" />
        </svg>
        {/* Small cloud mid-right */}
        <svg className="absolute top-[18%] right-[2%]" width="70" height="35" viewBox="0 0 70 35" fill="none">
          <ellipse cx="25" cy="20" rx="20" ry="12" fill="#F2BAC8" opacity="0.18" />
          <ellipse cx="48" cy="18" rx="18" ry="11" fill="#EDB0C0" opacity="0.15" />
        </svg>

        {/* Hearts scattered */}
        <svg className="absolute top-[25%] left-[18%]" width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute top-[60%] left-[10%]" width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.08"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute top-[38%] left-[35%]" width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="absolute bottom-[22%] right-[12%]" width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.08"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>

        {/* Sparkle stars */}
        <svg className="absolute top-[14%] right-[38%]" width="10" height="10" viewBox="0 0 24 24" fill="white" opacity="0.18"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/></svg>
        <svg className="absolute top-[10%] left-[40%]" width="8" height="8" viewBox="0 0 24 24" fill="#FFD700" opacity="0.2"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/></svg>
        <svg className="absolute top-[20%] left-[14%]" width="7" height="7" viewBox="0 0 24 24" fill="#FFD700" opacity="0.15"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/></svg>
        <svg className="absolute bottom-[30%] right-[30%]" width="8" height="8" viewBox="0 0 24 24" fill="white" opacity="0.12"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z"/></svg>

        {/* Teal diamond accent */}
        <svg className="absolute bottom-[15%] left-[40%]" width="14" height="14" viewBox="0 0 20 20" fill="none" opacity="0.15">
          <rect x="10" y="0" width="10" height="10" transform="rotate(45 10 0)" fill="#5EC4C0" />
        </svg>

        {/* Circular accents */}
        <div className="absolute top-[32%] left-[4%] w-7 h-7 rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.12)" }} />
        <div className="absolute bottom-[25%] right-[4%] w-5 h-5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full flex items-center px-[5%] lg:px-[7%]">

          {/* LEFT SIDE: Text content */}
          <motion.div
            className="w-[32%] flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Script heading exactly like reference */}
            <h2
              className="text-white leading-[1.1] mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Success Stories
            </h2>

            {/* Decorative flourish under heading - matching reference style */}
            <svg viewBox="0 0 220 20" className="w-[70%] mb-5" fill="none">
              <path d="M8 10 Q55 0, 110 10 Q165 20, 212 10" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
              <circle cx="110" cy="10" r="2.5" fill="white" opacity="0.4" />
              <circle cx="85" cy="8" r="1.2" fill="white" opacity="0.25" />
              <circle cx="135" cy="12" r="1.2" fill="white" opacity="0.25" />
              {/* Small decorative stars at ends */}
              <text x="2" y="13" fill="white" fontSize="8" opacity="0.35">✦</text>
              <text x="208" y="13" fill="white" fontSize="8" opacity="0.35">✦</text>
            </svg>

            <p
              className="leading-relaxed"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "rgba(255,255,255,0.7)",
                fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
                maxWidth: "340px",
              }}
            >
              Celebrating the beautiful unions made possible through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT SIDE: Floating cards - desktop */}
          <div
            className="flex-1 relative hidden lg:block"
            style={{ minHeight: "100%", height: "420px" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {getVisibleStories().map(({ story, posIndex }) => {
              const pos = cardPositions[posIndex];
              return (
                <div
                  key={`${story.id}-${posIndex}`}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate}deg)`,
                    zIndex: 5 - posIndex,
                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      width: "clamp(150px, 14vw, 195px)",
                      background: "white",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
                      border: "3px solid rgba(255,255,255,0.6)",
                    }}
                  >
                    <div style={{ height: "clamp(100px, 10vw, 140px)" }} className="overflow-hidden">
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
                          fontSize: "clamp(11px, 1vw, 14px)",
                        }}
                      >
                        {story.bride_name}{" "}
                        <span style={{ color: "#E74C6F" }}>♥</span>{" "}
                        {story.groom_name}
                      </h4>
                      <p style={{ fontFamily: "'Lato', sans-serif", color: "#999", fontSize: "clamp(9px, 0.8vw, 11px)", marginTop: 2 }}>
                        {story.city}
                      </p>
                      <p style={{ fontFamily: "'Lato', sans-serif", color: "#666", fontSize: "clamp(9px, 0.75vw, 11px)", marginTop: 4, lineHeight: 1.4, fontStyle: "italic" }}>
                        {story.story}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 px-4 pb-6">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 rounded-lg overflow-hidden"
              style={{ width: 170, background: "white", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.5)" }}
            >
              <div className="h-[110px] overflow-hidden">
                <img src={story.image_url || wedding1} alt={`${story.bride_name} & ${story.groom_name}`} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-2 text-center">
                <h4 className="text-xs font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#5C3D2E" }}>
                  {story.bride_name} <span style={{ color: "#E74C6F" }}>♥</span> {story.groom_name}
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
