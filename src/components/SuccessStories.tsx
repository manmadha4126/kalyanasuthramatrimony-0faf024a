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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const { data } = await supabase
        .from("success_stories")
        .select("id,bride_name,groom_name,city,story,image_url")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setStories(data as Story[]);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, stories.length]);

  // Card positions for the floating layout
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = (index - activeIndex + stories.length) % stories.length;
    const positions = [
      { top: "10%", left: "5%", rotate: -4, scale: 1.05, zIndex: 5, opacity: 1 },
      { top: "0%", left: "40%", rotate: 3, scale: 0.95, zIndex: 4, opacity: 0.95 },
      { top: "5%", left: "68%", rotate: -2, scale: 0.9, zIndex: 3, opacity: 0.9 },
      { top: "45%", left: "15%", rotate: 2, scale: 0.92, zIndex: 2, opacity: 0.88 },
      { top: "42%", left: "50%", rotate: -3, scale: 0.88, zIndex: 1, opacity: 0.85 },
    ];
    const pos = positions[diff] || { top: "120%", left: "50%", rotate: 0, scale: 0.8, zIndex: 0, opacity: 0 };
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
    <section id="stories" className="relative overflow-hidden" style={{ minHeight: 540 }}>
      {/* Diagonal split background */}
      <div className="absolute inset-0" style={{ background: "#5C5F78" }} />
      <div
        className="absolute inset-0"
        style={{
          background: "#3FA7A3",
          clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 40% 0%)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-6 left-[10%] w-20 h-8 rounded-full opacity-15" style={{ background: "white" }} />
        <div className="absolute top-4 left-[13%] w-14 h-6 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute top-10 right-[15%] w-24 h-10 rounded-full opacity-12" style={{ background: "white" }} />
        <div className="absolute top-8 right-[18%] w-16 h-7 rounded-full opacity-8" style={{ background: "white" }} />
        <div className="absolute bottom-20 left-[5%] w-16 h-7 rounded-full opacity-10" style={{ background: "white" }} />
        
        {/* Hearts */}
        <div className="absolute top-[20%] left-[25%] text-white/10 text-2xl">♥</div>
        <div className="absolute top-[60%] left-[8%] text-white/8 text-lg">♥</div>
        <div className="absolute top-[30%] right-[25%] text-white/10 text-xl">♥</div>
        <div className="absolute bottom-[25%] right-[10%] text-white/8 text-sm">♥</div>
        
        {/* Sparkles */}
        <div className="absolute top-[15%] right-[40%] text-white/15 text-xs">✦</div>
        <div className="absolute top-[45%] left-[35%] text-white/12 text-sm">✦</div>
        <div className="absolute bottom-[30%] right-[30%] text-white/10 text-xs">✧</div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left side - Text */}
          <motion.div
            className="lg:w-[38%] text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              ✨ Success Stories ✨
            </h2>
            {/* Decorative underline flourish */}
            <svg viewBox="0 0 200 20" className="w-48 mx-auto lg:mx-0 mb-6" fill="none">
              <path d="M10 10 Q50 0, 100 10 Q150 20, 190 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <circle cx="100" cy="10" r="2.5" fill="white" opacity="0.5" />
              <circle cx="80" cy="8" r="1.5" fill="white" opacity="0.3" />
              <circle cx="120" cy="12" r="1.5" fill="white" opacity="0.3" />
            </svg>
            <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0" style={{ fontFamily: "'Lato', sans-serif" }}>
              Celebrating the beautiful unions made possible through Kalyanasuthra Matrimony.
            </p>
          </motion.div>

          {/* Right side - Floating Cards */}
          <div
            className="lg:w-[62%] relative w-full"
            style={{ minHeight: 440 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {stories.slice(0, 5).map((story, i) => (
              <div key={story.id} style={getCardStyle(i)}>
                <div
                  className="w-[200px] md:w-[220px] rounded-xl overflow-hidden shadow-xl"
                  style={{ background: "white", border: "2px solid rgba(255,255,255,0.3)" }}
                >
                  <div className="h-[140px] md:h-[155px] overflow-hidden">
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
                      {story.bride_name} <span className="text-red-400">♥</span> {story.groom_name}
                    </h4>
                    <p className="text-xs mt-0.5" style={{ color: "#888", fontFamily: "'Lato', sans-serif" }}>
                      {story.city}
                    </p>
                    <p
                      className="text-[11px] mt-1.5 leading-snug"
                      style={{ color: "#555", fontFamily: "'Lato', sans-serif" }}
                    >
                      {story.story}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile carousel fallback */}
      <div className="lg:hidden container mx-auto px-4 pb-10 relative z-10 -mt-4">
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-[200px] rounded-xl overflow-hidden shadow-lg"
              style={{ background: "white" }}
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
                  {story.bride_name} <span className="text-red-400">♥</span> {story.groom_name}
                </h4>
                <p className="text-xs mt-0.5" style={{ color: "#888" }}>{story.city}</p>
                <p className="text-[11px] mt-1 leading-snug" style={{ color: "#555" }}>{story.story}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
