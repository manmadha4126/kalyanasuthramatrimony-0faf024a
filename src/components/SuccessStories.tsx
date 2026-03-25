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
  { id: "1", bride_name: "Ananya", groom_name: "Raghav", city: "Hyderabad", story: "From a simple profile match to a beautiful wedding, our journey began here. We are grateful forever!", image_url: wedding1 },
  { id: "2", bride_name: "Divya", groom_name: "Karthik", city: "Tirupati", story: "Our families connected instantly and today we are happily married with two beautiful kids.", image_url: wedding2 },
  { id: "3", bride_name: "Meghana", groom_name: "Arjun", city: "Bangalore", story: "Kalyanasuthra made our search easy and trustworthy. Best decision we ever made!", image_url: wedding3 },
  { id: "4", bride_name: "Sravani", groom_name: "Nikhil", city: "Chennai", story: "A perfect blend of tradition and compatibility. Our parents are so happy with this match.", image_url: wedding4 },
  { id: "5", bride_name: "Lakshmi", groom_name: "Harsha", city: "Vijayawada", story: "Grateful for the genuine profiles and personal guidance from the relationship managers.", image_url: wedding5 },
  { id: "6", bride_name: "Priya", groom_name: "Vikram", city: "Mumbai", story: "We found each other through trust and transparency. Celebrating 3 years of togetherness!", image_url: wedding6 },
  { id: "7", bride_name: "Sneha", groom_name: "Ravi", city: "Pune", story: "A beautiful match that our families loved instantly. The team was very supportive throughout.", image_url: wedding7 },
  { id: "8", bride_name: "Kavya", groom_name: "Suresh", city: "Delhi", story: "Our love story started with a simple hello here. Now we can't imagine life without each other.", image_url: wedding8 },
  { id: "9", bride_name: "Swathi", groom_name: "Pranav", city: "Vizag", story: "The perfect platform for finding your soulmate. Highly recommend to everyone!", image_url: wedding9 },
  { id: "10", bride_name: "Rani", groom_name: "Deepak", city: "Warangal", story: "Blessed to have found my life partner here. The process was smooth and professional.", image_url: wedding10 },
];

const cardLayout = [
  { x: -300, y: 20, rot: -8, z: 4, scale: 0.78, opacity: 0.65 },
  { x: -180, y: -80, rot: -4, z: 5, scale: 0.85, opacity: 0.75 },
  { x: -10, y: -110, rot: 0, z: 6, scale: 0.90, opacity: 0.85 },
  { x: 170, y: -80, rot: 4, z: 5, scale: 0.85, opacity: 0.75 },
  { x: 290, y: 20, rot: 8, z: 4, scale: 0.78, opacity: 0.65 },
  { x: 0, y: 60, rot: 0, z: 10, scale: 1.08, opacity: 1 },
];

const SuccessStories = () => {
  const [stories, setStories] = useState<Story[]>(fallbackStories);
  const [rotationOffset, setRotationOffset] = useState(0);
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
    const timer = setInterval(() => setRotationOffset((prev) => prev + 1), 2000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const getVisibleCards = useCallback(() => {
    const cards: { story: Story; slot: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const storyIdx = (rotationOffset + i) % stories.length;
      cards.push({ story: stories[storyIdx], slot: i });
    }
    return cards;
  }, [rotationOffset, stories]);

  return (
    <section id="stories" className="relative w-full overflow-hidden" style={{ minHeight: "700px", height: "auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />

      {/* Background */}
      <div className="absolute inset-0" style={{ background: "#5C5F78" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, rgba(76,90,120,0.7) 0%, rgba(60,80,110,0.5) 50%, rgba(55,85,115,0.3) 100%)", clipPath: "polygon(60% 0%, 75% 0%, 25% 100%, 10% 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #3A9E9A 0%, #3FA7A3 50%, #48ACA8 100%)", clipPath: "polygon(75% 0%, 100% 0%, 100% 100%, 25% 100%)" }} />

      {/* Diagonal Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <line x1="58%" y1="0%" x2="8%" y2="100%" stroke="rgba(180,185,200,0.15)" strokeWidth="1.5" />
        <line x1="62%" y1="0%" x2="12%" y2="100%" stroke="rgba(180,185,200,0.10)" strokeWidth="1" />
        <line x1="73%" y1="0%" x2="23%" y2="100%" stroke="rgba(100,140,200,0.12)" strokeWidth="1.2" />
        <line x1="76%" y1="0%" x2="26%" y2="100%" stroke="rgba(100,140,200,0.07)" strokeWidth="0.8" />
      </svg>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hearts */}
        {[
          { t: "6%", l: "5%", s: 18, o: 0.22, c: "#F5C0D0" },
          { t: "14%", l: "18%", s: 14, o: 0.18, c: "white" },
          { t: "28%", l: "8%", s: 12, o: 0.15, c: "#F5C0D0" },
          { t: "50%", l: "4%", s: 10, o: 0.12, c: "white" },
          { t: "68%", l: "12%", s: 9, o: 0.10, c: "#F5C0D0" },
          { t: "82%", l: "6%", s: 8, o: 0.09, c: "white" },
          { t: "10%", l: "42%", s: 10, o: 0.10, c: "#F5C0D0" },
          { t: "88%", l: "30%", s: 7, o: 0.08, c: "white" },
        ].map((h, i) => (
          <svg key={`h${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* ===== RIGHT SIDE - Stars and Love Symbols ===== */}
        {/* Large hearts on right */}
        {[
          { t: "5%", l: "78%", s: 22, o: 0.28, c: "#FFB6C1" },
          { t: "15%", l: "88%", s: 18, o: 0.25, c: "#F5C0D0" },
          { t: "30%", l: "82%", s: 15, o: 0.22, c: "white" },
          { t: "45%", l: "90%", s: 20, o: 0.20, c: "#FFB6C1" },
          { t: "58%", l: "76%", s: 12, o: 0.18, c: "#F5C0D0" },
          { t: "70%", l: "92%", s: 16, o: 0.22, c: "white" },
          { t: "80%", l: "85%", s: 14, o: 0.20, c: "#FFB6C1" },
          { t: "90%", l: "78%", s: 10, o: 0.15, c: "#F5C0D0" },
          { t: "38%", l: "95%", s: 11, o: 0.16, c: "white" },
          { t: "62%", l: "88%", s: 13, o: 0.18, c: "#FFB6C1" },
        ].map((h, i) => (
          <svg key={`rh${i}`} className="absolute" style={{ top: h.t, left: h.l }} width={h.s} height={h.s} viewBox="0 0 24 24" fill={h.c} opacity={h.o}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* Stars on right side */}
        {[
          { t: "3%", l: "75%", s: 18, o: 0.35 },
          { t: "10%", l: "92%", s: 14, o: 0.30 },
          { t: "22%", l: "80%", s: 12, o: 0.28 },
          { t: "35%", l: "93%", s: 16, o: 0.32 },
          { t: "48%", l: "78%", s: 10, o: 0.22 },
          { t: "55%", l: "96%", s: 13, o: 0.25 },
          { t: "68%", l: "82%", s: 11, o: 0.20 },
          { t: "75%", l: "95%", s: 15, o: 0.28 },
          { t: "85%", l: "80%", s: 9, o: 0.18 },
          { t: "92%", l: "90%", s: 12, o: 0.22 },
          { t: "42%", l: "86%", s: 8, o: 0.16 },
          { t: "18%", l: "85%", s: 10, o: 0.20 },
        ].map((st, i) => (
          <svg key={`rs${i}`} className="absolute" style={{ top: st.t, left: st.l }} width={st.s} height={st.s} viewBox="0 0 24 24" fill="white" opacity={st.o}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}

        {/* Sparkles on right */}
        {[
          { t: "8%", l: "82%", s: 14, o: 0.38 },
          { t: "25%", l: "90%", s: 10, o: 0.30 },
          { t: "40%", l: "80%", s: 12, o: 0.25 },
          { t: "52%", l: "94%", s: 9, o: 0.22 },
          { t: "65%", l: "86%", s: 11, o: 0.20 },
          { t: "78%", l: "92%", s: 8, o: 0.18 },
          { t: "88%", l: "83%", s: 10, o: 0.15 },
        ].map((d, i) => (
          <svg key={`rsp${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
          </svg>
        ))}

        {/* Glowing dots on right */}
        {[
          { t: "12%", l: "79%", s: 4, o: 0.45 },
          { t: "20%", l: "94%", s: 3.5, o: 0.40 },
          { t: "33%", l: "84%", s: 3, o: 0.35 },
          { t: "47%", l: "91%", s: 4, o: 0.38 },
          { t: "60%", l: "80%", s: 3, o: 0.30 },
          { t: "72%", l: "96%", s: 3.5, o: 0.32 },
          { t: "83%", l: "88%", s: 3, o: 0.25 },
          { t: "95%", l: "82%", s: 2.5, o: 0.20 },
        ].map((dot, i) => (
          <div key={`rd${i}`} className="absolute rounded-full bg-white" style={{ top: dot.t, left: dot.l, width: dot.s, height: dot.s, opacity: dot.o }} />
        ))}

        {/* Existing left-side sparkles */}
        {[
          { t: "4%", l: "15%", s: 16, o: 0.40 },
          { t: "8%", l: "35%", s: 10, o: 0.30 },
          { t: "22%", l: "10%", s: 7, o: 0.20 },
          { t: "40%", l: "2%", s: 9, o: 0.18 },
          { t: "55%", l: "15%", s: 6, o: 0.14 },
          { t: "70%", l: "7%", s: 8, o: 0.12 },
        ].map((d, i) => (
          <svg key={`s${i}`} className="absolute" style={{ top: d.t, left: d.l }} width={d.s} height={d.s} viewBox="0 0 20 20" fill="white" opacity={d.o}>
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
          </svg>
        ))}

        {/* Left stars */}
        {[
          { t: "10%", l: "25%", s: 14, o: 0.18 },
          { t: "30%", l: "5%", s: 11, o: 0.14 },
          { t: "60%", l: "20%", s: 9, o: 0.10 },
        ].map((st, i) => (
          <svg key={`st${i}`} className="absolute" style={{ top: st.t, left: st.l }} width={st.s} height={st.s} viewBox="0 0 24 24" fill="white" opacity={st.o}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}

        {/* Ring accents */}
        {[
          { t: "18%", l: "3%", s: "3.5%", o: 0.12 },
          { t: "48%", l: "1%", s: "2.5%", o: 0.08 },
          { t: "72%", l: "92%", s: "2.8%", o: 0.10 },
          { t: "15%", l: "75%", s: "2.2%", o: 0.12 },
          { t: "38%", l: "96%", s: "2.5%", o: 0.08 },
          { t: "85%", l: "90%", s: "2%", o: 0.10 },
        ].map((c, i) => (
          <div key={`c${i}`} className="absolute rounded-full" style={{ top: c.t, left: c.l, width: c.s, aspectRatio: "1", border: `1.5px solid rgba(255,255,255,${c.o})` }} />
        ))}

        {/* Dot stars */}
        {[
          { t: "7%", l: "16%", s: 3.5, o: 0.40 },
          { t: "4%", l: "30%", s: 3, o: 0.35 },
          { t: "38%", l: "10%", s: 3, o: 0.22 },
          { t: "78%", l: "5%", s: 2.5, o: 0.16 },
        ].map((dot, i) => (
          <div key={`dot${i}`} className="absolute rounded-full bg-white" style={{ top: dot.t, left: dot.l, width: dot.s, height: dot.s, opacity: dot.o }} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center py-14 lg:py-0 lg:absolute lg:inset-0">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-center" style={{ padding: "0 4%" }}>
          {/* LEFT - Heading */}
          <motion.div className="w-full lg:w-[35%] flex-shrink-0 pr-0 lg:pr-[2%] text-center lg:text-left mb-6 lg:mb-0" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative mb-1">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="white" opacity="0.35" className="inline-block mr-1 -mt-2">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
              </svg>
            </div>
            <div className="relative inline-block">
              <svg className="absolute -top-4 -left-2" width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.30">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h2 className="text-white" style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.1, letterSpacing: "0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
                Success Stories
              </h2>
              <svg className="absolute -top-3 -right-8" width="14" height="14" viewBox="0 0 20 20" fill="white" opacity="0.35">
                <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
              </svg>
            </div>
            <svg viewBox="0 0 320 30" style={{ width: "min(75%, 340px)" }} fill="none" className="mt-1 mb-5">
              <path d="M10 15 Q80 3, 160 15 Q240 27, 310 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.28" />
              <path d="M50 15 Q105 24, 160 15 Q215 6, 270 15" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.18" />
              <circle cx="160" cy="15" r="2.8" fill="white" opacity="0.28" />
              <circle cx="120" cy="13" r="1.3" fill="white" opacity="0.15" />
              <circle cx="200" cy="17" r="1.3" fill="white" opacity="0.15" />
            </svg>
            <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.70)", fontSize: "clamp(0.82rem, 1.1vw, 1.05rem)", lineHeight: 1.7, maxWidth: "380px" }}>
              Celebrating the beautiful unions made possible<br />through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* RIGHT - Scrolling Cards */}
          <div className="w-[65%] relative hidden lg:block overflow-hidden" style={{ height: "clamp(400px, 45vw, 540px)" }}>
            <style>{`
              @keyframes desktopMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div className="flex items-center h-full">
              <div
                className="flex gap-5"
                style={{
                  animation: isPaused ? "none" : "desktopMarquee 25s linear infinite",
                  width: "max-content",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {[...stories.slice(0, 8), ...stories.slice(0, 8)].map((story, idx) => (
                  <div
                    key={`desk-${story.id}-${idx}`}
                    className="flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
                    style={{
                      width: 220,
                      background: "white",
                      boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
                      border: "2px solid rgba(255,255,255,0.5)",
                      borderImage: "linear-gradient(135deg, rgba(217,79,107,0.5), rgba(255,182,193,0.5), rgba(61,158,154,0.4)) 1",
                      borderImageSlice: 1,
                    }}
                  >
                    <div className="h-[140px] overflow-hidden">
                      <img
                        src={story.image_url || wedding1}
                        alt={`${story.bride_name} & ${story.groom_name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-4 py-3 text-center">
                      <h4
                        className="font-bold leading-tight text-sm"
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        {story.bride_name}{" "}
                        <span style={{ color: "#D94F6B" }}>♥</span>{" "}
                        {story.groom_name}
                      </h4>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      >
                        {story.city}
                      </p>
                      <p
                        className="text-[11px] mt-2 leading-snug italic"
                        style={{ color: "#666" }}
                      >
                        "{story.story}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile auto-scroll */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-10 pb-5 overflow-hidden">
        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="flex gap-4" style={{ animation: "marqueeScroll 20s linear infinite", width: "max-content" }}>
          {[...stories.slice(0, 6), ...stories.slice(0, 6)].map((story, idx) => (
            <div key={`mobile-${story.id}-${idx}`} className="flex-shrink-0 rounded-2xl overflow-hidden" style={{ width: 200, background: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "2px solid rgba(217,79,107,0.3)" }}>
              <div className="h-[110px] overflow-hidden">
                <img src={story.image_url || wedding1} alt={`${story.bride_name} & ${story.groom_name}`} className="w-full h-full object-cover" />
              </div>
              <div className="px-3 py-2.5 text-center">
                <h4 className="text-xs font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--primary))" }}>
                  {story.bride_name} <span style={{ color: "#D94F6B" }}>♥</span> {story.groom_name}
                </h4>
                <p className="text-[10px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{story.city}</p>
                <p className="text-[10px] mt-1 leading-snug italic" style={{ color: "#666" }}>"{story.story}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
