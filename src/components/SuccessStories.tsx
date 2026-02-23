import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
  { id: "6", bride_name: "Priya", groom_name: "Vikram", city: "Mumbai", story: "We found each other through trust and transparency.", image_url: wedding6 },
  { id: "7", bride_name: "Sneha", groom_name: "Ravi", city: "Pune", story: "A beautiful match that our families loved instantly.", image_url: wedding7 },
  { id: "8", bride_name: "Kavya", groom_name: "Suresh", city: "Delhi", story: "Our love story started with a simple hello here.", image_url: wedding8 },
  { id: "9", bride_name: "Swathi", groom_name: "Pranav", city: "Vizag", story: "The perfect platform for finding your soulmate.", image_url: wedding9 },
  { id: "10", bride_name: "Rani", groom_name: "Deepak", city: "Warangal", story: "Blessed to have found my life partner here.", image_url: wedding10 },
];

// 6-card scattered layout matching the reference image (2 rows, staggered)
// Position 0=top-left, 1=top-center, 2=top-right, 3=bottom-left, 4=bottom-center(hero), 5=bottom-right
const cardLayout = [
  { x: -280, y: -110, rot: -5, z: 6, scale: 0.92 },   // top-left
  { x: -20,  y: -130, rot: 1,  z: 7, scale: 0.95 },    // top-center
  { x: 250,  y: -100, rot: 4,  z: 6, scale: 0.90 },    // top-right
  { x: -240, y: 80,   rot: -3, z: 7, scale: 0.93 },    // bottom-left
  { x: 30,   y: 50,   rot: 0,  z: 10, scale: 1.08 },   // bottom-center (HERO/zoomed)
  { x: 280,  y: 70,   rot: 5,  z: 7, scale: 0.91 },    // bottom-right
];

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>(fallbackStories);
  const [heroIndex, setHeroIndex] = useState(0);
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

  // Hero card rotates every 2 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % stories.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  // 5 static cards (slots 0-3, 5) + 1 rotating hero (slot 4)
  const getVisibleCards = useCallback(() => {
    const staticIndices = [0, 1, 2, 3, 5]; // fixed profiles for non-hero slots
    const cards: { story: Story; slot: number; isRotating: boolean }[] = [];
    // Static cards
    for (let i = 0; i < staticIndices.length; i++) {
      const slotIdx = i < 4 ? i : 5; // slots 0,1,2,3,5
      cards.push({ story: stories[staticIndices[i] % stories.length], slot: slotIdx, isRotating: false });
    }
    // Hero rotating card at slot 4
    cards.push({ story: stories[heroIndex % stories.length], slot: 4, isRotating: true });
    return cards;
  }, [heroIndex, stories]);

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(520px, 60vw, 700px)" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0" style={{ background: "#5C5F78" }} />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(145deg, rgba(76,90,120,0.7) 0%, rgba(60,80,110,0.5) 50%, rgba(55,85,115,0.3) 100%)",
          clipPath: "polygon(60% 0%, 75% 0%, 25% 100%, 10% 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(155deg, #3A9E9A 0%, #3FA7A3 50%, #48ACA8 100%)",
          clipPath: "polygon(75% 0%, 100% 0%, 100% 100%, 25% 100%)",
        }}
      />

      {/* ===== DIAGONAL CROSS LINES ===== */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <line x1="58%" y1="0%" x2="8%" y2="100%" stroke="rgba(180,185,200,0.15)" strokeWidth="1.5" />
        <line x1="62%" y1="0%" x2="12%" y2="100%" stroke="rgba(180,185,200,0.10)" strokeWidth="1" />
        <line x1="55%" y1="0%" x2="5%" y2="100%" stroke="rgba(160,165,180,0.08)" strokeWidth="1" />
        <line x1="73%" y1="0%" x2="23%" y2="100%" stroke="rgba(100,140,200,0.12)" strokeWidth="1.2" />
        <line x1="76%" y1="0%" x2="26%" y2="100%" stroke="rgba(100,140,200,0.07)" strokeWidth="0.8" />
        <line x1="70%" y1="0%" x2="20%" y2="100%" stroke="rgba(80,120,180,0.06)" strokeWidth="0.8" />
        <line x1="15%" y1="0%" x2="85%" y2="100%" stroke="rgba(180,185,200,0.05)" strokeWidth="0.6" />
        <line x1="25%" y1="0%" x2="92%" y2="100%" stroke="rgba(100,140,200,0.04)" strokeWidth="0.6" />
        <line x1="5%" y1="0%" x2="70%" y2="100%" stroke="rgba(180,185,200,0.04)" strokeWidth="0.5" />
      </svg>

      {/* ===== DECORATIVE ELEMENTS (enhanced) ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Clouds - top left */}
        <svg className="absolute -top-[2%] left-[1%]" width="20%" viewBox="0 0 260 90" fill="none">
          <ellipse cx="50" cy="50" rx="50" ry="30" fill="#F4B8C8" opacity="0.32" />
          <ellipse cx="105" cy="38" rx="55" ry="36" fill="#EFA8BC" opacity="0.28" />
          <ellipse cx="165" cy="45" rx="48" ry="30" fill="#F8C4D4" opacity="0.24" />
          <ellipse cx="215" cy="52" rx="38" ry="24" fill="#F0B0C0" opacity="0.20" />
        </svg>

        {/* Clouds - top right */}
        <svg className="absolute -top-[1%] right-[2%]" width="22%" viewBox="0 0 300 95" fill="none">
          <ellipse cx="65" cy="55" rx="55" ry="32" fill="#F2B0C4" opacity="0.28" />
          <ellipse cx="130" cy="40" rx="58" ry="38" fill="#ECA5B8" opacity="0.24" />
          <ellipse cx="200" cy="48" rx="50" ry="32" fill="#F6C0D0" opacity="0.22" />
          <ellipse cx="260" cy="54" rx="40" ry="26" fill="#F0B5C5" opacity="0.18" />
        </svg>

        {/* Clouds - mid left */}
        <svg className="absolute top-[40%] left-[0%]" width="12%" viewBox="0 0 160 55" fill="none">
          <ellipse cx="35" cy="30" rx="32" ry="20" fill="#F5BCC8" opacity="0.18" />
          <ellipse cx="75" cy="24" rx="38" ry="24" fill="#EEB0C0" opacity="0.14" />
          <ellipse cx="120" cy="28" rx="30" ry="18" fill="#F8C8D6" opacity="0.12" />
        </svg>

        {/* Clouds - bottom left */}
        <svg className="absolute bottom-[3%] left-[4%]" width="16%" viewBox="0 0 200 65" fill="none">
          <ellipse cx="45" cy="38" rx="42" ry="25" fill="#F5BCC8" opacity="0.22" />
          <ellipse cx="95" cy="30" rx="46" ry="30" fill="#EEB0C0" opacity="0.18" />
          <ellipse cx="148" cy="36" rx="38" ry="22" fill="#F8C8D6" opacity="0.15" />
        </svg>

        {/* Clouds - bottom right */}
        <svg className="absolute bottom-[1%] right-[3%]" width="18%" viewBox="0 0 240 70" fill="none">
          <ellipse cx="50" cy="40" rx="45" ry="26" fill="#F2B0C4" opacity="0.20" />
          <ellipse cx="110" cy="32" rx="50" ry="32" fill="#ECA5B8" opacity="0.16" />
          <ellipse cx="170" cy="38" rx="42" ry="24" fill="#F6C0D0" opacity="0.14" />
          <ellipse cx="215" cy="42" rx="32" ry="20" fill="#F0B5C5" opacity="0.12" />
        </svg>

        {/* Clouds - top center */}
        <svg className="absolute top-[2%] left-[35%]" width="14%" viewBox="0 0 180 55" fill="none">
          <ellipse cx="40" cy="30" rx="36" ry="22" fill="#F4B8C8" opacity="0.16" />
          <ellipse cx="90" cy="24" rx="40" ry="26" fill="#EFA8BC" opacity="0.13" />
          <ellipse cx="140" cy="28" rx="34" ry="20" fill="#F8C4D4" opacity="0.11" />
        </svg>

        {/* Hearts scattered - more hearts */}
        {[
          { t: "8%", l: "8%", s: 16, o: 0.20, c: "#F5C0D0" },
          { t: "15%", l: "15%", s: 13, o: 0.16, c: "white" },
          { t: "25%", l: "6%", s: 11, o: 0.14, c: "#F5C0D0" },
          { t: "45%", l: "3%", s: 10, o: 0.12, c: "white" },
          { t: "30%", l: "28%", s: 9, o: 0.10, c: "#F5C0D0" },
          { t: "60%", l: "10%", s: 8, o: 0.09, c: "white" },
          { t: "18%", l: "45%", s: 8, o: 0.08, c: "#F5C0D0" },
          { t: "75%", l: "8%", s: 7, o: 0.08, c: "white" },
          { t: "85%", l: "65%", s: 9, o: 0.07, c: "#F5C0D0" },
          { t: "5%", l: "60%", s: 7, o: 0.07, c: "white" },
          { t: "90%", l: "35%", s: 6, o: 0.06, c: "#F5C0D0" },
          { t: "50%", l: "92%", s: 8, o: 0.08, c: "white" },
          { t: "70%", l: "88%", s: 7, o: 0.06, c: "#F5C0D0" },
          { t: "35%", l: "90%", s: 6, o: 0.06, c: "white" },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* 4-pointed sparkles/stars - more sparkles */}
        {[
          { t: "5%", l: "20%", s: 14, o: 0.35 },
          { t: "3%", l: "12%", s: 9, o: 0.25 },
          { t: "10%", l: "40%", s: 10, o: 0.28 },
          { t: "6%", l: "55%", s: 8, o: 0.22 },
          { t: "48%", l: "2%", s: 7, o: 0.15 },
          { t: "35%", l: "85%", s: 8, o: 0.12 },
          { t: "72%", l: "90%", s: 7, o: 0.10 },
          { t: "88%", l: "50%", s: 6, o: 0.08 },
          { t: "15%", l: "70%", s: 6, o: 0.10 },
          { t: "60%", l: "95%", s: 5, o: 0.08 },
          { t: "92%", l: "20%", s: 7, o: 0.10 },
          { t: "28%", l: "95%", s: 5, o: 0.07 },
        ].map((d, i) => (
          <svg key={`s${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
          </svg>
        ))}

        {/* Abstract circular accents */}
        {[
          { t: "20%", l: "2%", s: "3%", o: 0.10 },
          { t: "55%", l: "1%", s: "2.5%", o: 0.07 },
          { t: "65%", l: "92%", s: "2%", o: 0.06 },
          { t: "8%", l: "18%", s: "1.8%", o: 0.08 },
          { t: "80%", l: "15%", s: "2.2%", o: 0.06 },
          { t: "12%", l: "75%", s: "1.5%", o: 0.07 },
          { t: "42%", l: "96%", s: "2%", o: 0.05 },
        ].map((c, i) => (
          <div key={`c${i}`} className="absolute rounded-full" style={{ top: c.t, left: c.l, width: c.s, aspectRatio: "1", border: `1.5px solid rgba(255,255,255,${c.o})` }} />
        ))}

        {/* Abstract shapes */}
        <svg className="absolute top-[35%] left-[14%]" width="32" height="32" viewBox="0 0 30 30" fill="white" opacity="0.04">
          <polygon points="15,2 28,28 2,28" />
        </svg>
        <svg className="absolute bottom-[18%] right-[16%]" width="26" height="26" viewBox="0 0 24 24" fill="white" opacity="0.035">
          <rect x="2" y="2" width="20" height="20" rx="4" />
        </svg>
        <svg className="absolute top-[70%] left-[25%]" width="20" height="20" viewBox="0 0 20 20" fill="white" opacity="0.03">
          <circle cx="10" cy="10" r="8" />
        </svg>
        <svg className="absolute top-[15%] right-[30%]" width="22" height="22" viewBox="0 0 30 30" fill="white" opacity="0.03">
          <polygon points="15,2 28,28 2,28" />
        </svg>

        {/* Dot stars */}
        {[
          { t: "7%", l: "16%", s: 3.5, o: 0.38 },
          { t: "4%", l: "30%", s: 3, o: 0.32 },
          { t: "16%", l: "34%", s: 2.5, o: 0.28 },
          { t: "38%", l: "10%", s: 3, o: 0.22 },
          { t: "52%", l: "22%", s: 2.5, o: 0.18 },
          { t: "78%", l: "5%", s: 2, o: 0.15 },
          { t: "25%", l: "50%", s: 2, o: 0.12 },
          { t: "65%", l: "95%", s: 2.5, o: 0.14 },
          { t: "85%", l: "80%", s: 2, o: 0.10 },
          { t: "95%", l: "45%", s: 2.5, o: 0.12 },
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
        <div className="w-full flex items-center" style={{ padding: "0 4%" }}>

          {/* LEFT - Heading */}
          <motion.div
            className="w-[35%] flex-shrink-0 pr-[2%]"
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
                  fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
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
                maxWidth: "380px",
              }}
            >
              Celebrating the beautiful unions made possible
              <br />
              through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT - 6 cards in scattered 2-row layout */}
          <div
            className="w-[65%] relative hidden lg:flex items-center justify-center"
            style={{ height: "clamp(400px, 48vw, 560px)" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map(({ story, slot, isRotating }) => {
                const layout = cardLayout[slot];
                const isHero = slot === 4;
                const cardW = isHero ? 210 : 175;
                const imgH = isHero ? 145 : 115;

                return (
                  <motion.div
                    key={isRotating ? `hero-${story.id}` : `static-${slot}`}
                    className="absolute"
                    style={{
                      zIndex: layout.z,
                      width: cardW,
                      left: "50%",
                      marginLeft: -(cardW / 2),
                      top: "50%",
                      marginTop: -120,
                    }}
                    initial={isRotating ? { opacity: 0, scale: 0.85 } : { opacity: 0, x: 250, scale: 0.7, rotate: layout.rot }}
                    animate={{
                      opacity: isHero ? 1 : 0.88,
                      x: layout.x,
                      y: layout.y,
                      scale: layout.scale,
                      rotate: layout.rot,
                    }}
                    exit={isRotating ? { opacity: 0, scale: 0.85 } : { opacity: 0, x: -250, scale: 0.7 }}
                    transition={{
                      duration: isRotating ? 0.6 : 0.9,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "white",
                        boxShadow: isHero
                          ? "0 22px 60px rgba(0,0,0,0.32), 0 0 0 2px rgba(255,255,255,0.5)"
                          : "0 8px 28px rgba(0,0,0,0.15)",
                        border: "2.5px solid rgba(255,255,255,0.45)",
                      }}
                    >
                      <div style={{ height: imgH }} className="overflow-hidden">
                        <motion.img
                          src={story.image_url || wedding1}
                          alt={`${story.bride_name} & ${story.groom_name}`}
                          className="w-full h-full object-cover"
                          animate={{ scale: isHero ? 1.08 : 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="px-3 py-2 text-center">
                        <h4
                          className="font-bold leading-tight"
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            color: "hsl(var(--primary))",
                            fontSize: isHero ? 14 : 11.5,
                          }}
                        >
                          {story.bride_name}{" "}
                          <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                          {story.groom_name}
                        </h4>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "hsl(var(--muted-foreground))",
                          fontSize: isHero ? 11 : 9.5,
                          marginTop: 2,
                        }}>
                          {story.city}
                        </p>
                        <p style={{
                          fontFamily: "'Lato', sans-serif",
                          color: "#666",
                          fontSize: isHero ? 10 : 9,
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
          {stories.slice(0, 6).map((story, idx) => (
            <motion.div
              key={story.id}
              className="flex-shrink-0 rounded-xl overflow-hidden"
              style={{ width: 160, background: "white", boxShadow: "0 6px 20px rgba(0,0,0,0.18)", border: "2px solid rgba(255,255,255,0.5)" }}
              animate={{ scale: idx === heroIndex % 6 ? 1.06 : 1 }}
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
