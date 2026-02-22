import { useRef, useEffect, useState } from "react";
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
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = (index - activeIndex + stories.length) % stories.length;
    const positions = [
      // Center card
      { top: "12%", left: "18%", rotate: -5, scale: 1.05, zIndex: 5, opacity: 1 },
      // Top right
      { top: "2%", left: "48%", rotate: 3, scale: 0.95, zIndex: 4, opacity: 0.95 },
      // Far right
      { top: "8%", left: "72%", rotate: -3, scale: 0.9, zIndex: 3, opacity: 0.92 },
      // Bottom left
      { top: "50%", left: "8%", rotate: 3, scale: 0.92, zIndex: 2, opacity: 0.88 },
      // Bottom right
      { top: "46%", left: "50%", rotate: -2, scale: 0.88, zIndex: 1, opacity: 0.85 },
    ];
    const pos = positions[diff] || { top: "120%", left: "50%", rotate: 0, scale: 0.7, zIndex: 0, opacity: 0 };
    return {
      position: "absolute" as const,
      top: pos.top,
      left: pos.left,
      transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
      zIndex: pos.zIndex,
      opacity: pos.opacity,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    };
  };

  return (
    <section id="stories" className="relative overflow-hidden" style={{ minHeight: 580 }}>
      {/* === BACKGROUND === */}
      {/* Base slate blue */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #4A4D65 0%, #5C5F78 40%, #6B6E85 100%)" }} />
      {/* Teal diagonal */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2E9E99 0%, #3FA7A3 50%, #4DB8B4 100%)", clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 45% 0%)" }} />

      {/* === DECORATIVE BACKGROUND ELEMENTS === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* ---- CLOUDS (Pink-tinted, matching reference) ---- */}
        {/* Top-left cloud cluster */}
        <svg className="absolute top-3 left-[6%] w-28 h-16 opacity-25" viewBox="0 0 120 60">
          <ellipse cx="35" cy="38" rx="32" ry="18" fill="#F2B8C6" />
          <ellipse cx="60" cy="30" rx="28" ry="22" fill="#EDA8BB" />
          <ellipse cx="85" cy="36" rx="26" ry="16" fill="#F5C4D0" />
        </svg>

        {/* Top-center cloud */}
        <svg className="absolute top-0 left-[30%] w-24 h-14 opacity-20" viewBox="0 0 100 50">
          <ellipse cx="30" cy="30" rx="25" ry="16" fill="#F0B0C2" />
          <ellipse cx="55" cy="25" rx="22" ry="18" fill="#E8A0B5" />
          <ellipse cx="75" cy="30" rx="20" ry="14" fill="#F5C0D0" />
        </svg>

        {/* Top-right cloud cluster */}
        <svg className="absolute top-2 right-[8%] w-32 h-18 opacity-22" viewBox="0 0 140 65">
          <ellipse cx="40" cy="40" rx="35" ry="20" fill="#F0B8C8" />
          <ellipse cx="70" cy="32" rx="30" ry="24" fill="#E8A5B8" />
          <ellipse cx="100" cy="38" rx="28" ry="18" fill="#F5C5D2" />
        </svg>

        {/* Mid-right small cloud */}
        <svg className="absolute top-[15%] right-[3%] w-16 h-10 opacity-15" viewBox="0 0 70 40">
          <ellipse cx="25" cy="22" rx="20" ry="14" fill="#F2BAC8" />
          <ellipse cx="45" cy="20" rx="18" ry="12" fill="#EDB0C0" />
        </svg>

        {/* Bottom-left cloud */}
        <svg className="absolute bottom-[15%] left-[3%] w-20 h-12 opacity-15" viewBox="0 0 80 45">
          <ellipse cx="25" cy="25" rx="22" ry="14" fill="#F0B5C5" />
          <ellipse cx="50" cy="22" rx="20" ry="16" fill="#E8A8B8" />
        </svg>

        {/* ---- HEARTS ---- */}
        <svg className="absolute top-[22%] left-[20%] w-5 h-5 opacity-15" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute top-[55%] left-[12%] w-4 h-4 opacity-10" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute top-[35%] right-[22%] w-4 h-4 opacity-12" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute bottom-[20%] right-[15%] w-3 h-3 opacity-8" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute top-[70%] left-[32%] w-3 h-3 opacity-10" viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* ---- SPARKLES / STARS ---- */}
        <svg className="absolute top-[12%] right-[35%] w-3 h-3 opacity-20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
        </svg>
        <svg className="absolute top-[8%] left-[42%] w-2.5 h-2.5 opacity-18" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
        </svg>
        <svg className="absolute top-[40%] left-[38%] w-2 h-2 opacity-12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
        </svg>
        <svg className="absolute bottom-[28%] right-[28%] w-2.5 h-2.5 opacity-15" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
        </svg>
        <svg className="absolute top-[18%] left-[15%] w-2 h-2 opacity-15" viewBox="0 0 24 24" fill="#FFD700">
          <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6L12 2z" />
        </svg>

        {/* ---- CIRCULAR ACCENTS ---- */}
        <div className="absolute top-[30%] left-[5%] w-8 h-8 rounded-full opacity-8" style={{ border: "1.5px solid rgba(255,255,255,0.2)" }} />
        <div className="absolute bottom-[35%] right-[5%] w-6 h-6 rounded-full opacity-10" style={{ border: "1.5px solid rgba(255,255,255,0.15)" }} />
        <div className="absolute top-[65%] left-[25%] w-4 h-4 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute top-[10%] right-[45%] w-3 h-3 rounded-full opacity-12" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* ---- ABSTRACT WAVE SHAPES ---- */}
        <svg className="absolute bottom-0 left-0 w-full h-16 opacity-5" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 Q360,0 720,30 T1440,30 V60 H0 Z" fill="white" />
        </svg>
      </div>

      {/* === CONTENT === */}
      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left side - Text */}
          <motion.div
            className="lg:w-[35%] text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-3 leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              ✨ Success Stories ✨
            </h2>

            {/* Decorative underline flourish */}
            <svg viewBox="0 0 240 24" className="w-56 mx-auto lg:mx-0 mb-6" fill="none">
              <path d="M5 12 Q30 2, 60 12 T120 12 T180 12 T235 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              <path d="M40 12 Q80 22, 120 12 Q160 2, 200 12" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
              <circle cx="120" cy="12" r="3" fill="white" opacity="0.5" />
              <circle cx="90" cy="10" r="1.5" fill="white" opacity="0.3" />
              <circle cx="150" cy="14" r="1.5" fill="white" opacity="0.3" />
              <circle cx="60" cy="12" r="1" fill="white" opacity="0.2" />
              <circle cx="180" cy="12" r="1" fill="white" opacity="0.2" />
            </svg>

            <p
              className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Celebrating the beautiful unions made possible through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* Right side - Floating Cards */}
          <div
            className="lg:w-[65%] relative w-full hidden lg:block"
            style={{ minHeight: 480 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {stories.slice(0, 5).map((story, i) => (
              <motion.div
                key={story.id}
                style={getCardStyle(i)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-[200px] md:w-[210px] rounded-xl overflow-hidden"
                  style={{
                    background: "white",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)",
                    border: "3px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <div className="h-[140px] md:h-[150px] overflow-hidden">
                    <img
                      src={story.image_url || wedding1}
                      alt={`${story.bride_name} & ${story.groom_name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h4
                      className="text-sm font-bold leading-tight"
                      style={{ fontFamily: "'DM Serif Display', serif", color: "#6A1E2C" }}
                    >
                      {story.bride_name} <span style={{ color: "#E74C6F" }}>♥</span> {story.groom_name}
                    </h4>
                    <p className="text-[11px] mt-0.5 font-medium" style={{ color: "#999", fontFamily: "'Lato', sans-serif" }}>
                      {story.city}
                    </p>
                    <p className="text-[11px] mt-1.5 leading-snug italic" style={{ color: "#666", fontFamily: "'Lato', sans-serif" }}>
                      {story.story}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="lg:hidden container mx-auto px-4 pb-10 relative z-10">
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-[200px] rounded-xl overflow-hidden"
              style={{
                background: "white",
                boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            >
              <div className="h-[130px] overflow-hidden">
                <img
                  src={story.image_url || wedding1}
                  alt={`${story.bride_name} & ${story.groom_name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="text-sm font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#6A1E2C" }}>
                  {story.bride_name} <span style={{ color: "#E74C6F" }}>♥</span> {story.groom_name}
                </h4>
                <p className="text-[11px] mt-0.5" style={{ color: "#999" }}>{story.city}</p>
                <p className="text-[11px] mt-1 leading-snug italic" style={{ color: "#666" }}>{story.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
