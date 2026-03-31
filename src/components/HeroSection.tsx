import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Volume2, VolumeX, Play, Pause } from "lucide-react";

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

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/background-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    // Auto-play on load
    const playPromise = audioRef.current.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Browser blocked autoplay, set to muted state
        setIsMuted(true);
      });
    }
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  const toggleSlideshow = () => {
    // Only pause/play music, don't stop slideshow
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
        setIsMuted(true);
      } else {
        audioRef.current.play().catch(() => {});
        setIsMuted(false);
      }
    }
  };

  const variants = {
    enter: () => ({ opacity: 0, scale: 1.03 }),
    center: { opacity: 1, scale: 1 },
    exit: () => ({ opacity: 0, scale: 1 })
  };

  return (
    <section id="home" className="relative w-full" style={{ marginTop: "80px" }}>

      {/* Main Hero - Split Layout */}
      <div className="relative w-full overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(230, 40%, 22%) 0%, hsl(250, 35%, 30%) 20%, hsl(270, 30%, 35%) 40%, hsl(25, 45%, 40%) 65%, hsl(35, 50%, 45%) 80%, hsl(220, 35%, 30%) 100%)" }}>
          {/* Warm glow overlay */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]" style={{
            backgroundImage: "radial-gradient(ellipse at 65% 70%, hsla(30, 60%, 50%, 0.25) 0%, transparent 55%), radial-gradient(ellipse at 30% 40%, hsla(250, 40%, 35%, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, hsla(40, 65%, 55%, 0.15) 0%, transparent 40%)",
          }} />
          {/* Bokeh light dots */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] opacity-60" style={{
            backgroundImage: "radial-gradient(circle 4px at 10% 25%, hsla(40, 80%, 75%, 0.7), transparent), radial-gradient(circle 3px at 25% 50%, hsla(35, 75%, 70%, 0.5), transparent), radial-gradient(circle 5px at 75% 20%, hsla(40, 85%, 80%, 0.4), transparent), radial-gradient(circle 3px at 85% 40%, hsla(30, 70%, 65%, 0.5), transparent), radial-gradient(circle 4px at 50% 80%, hsla(35, 80%, 75%, 0.4), transparent), radial-gradient(circle 3px at 60% 30%, hsla(40, 75%, 70%, 0.35), transparent), radial-gradient(circle 4px at 92% 65%, hsla(30, 80%, 70%, 0.45), transparent), radial-gradient(circle 3px at 40% 90%, hsla(40, 70%, 65%, 0.35), transparent), radial-gradient(circle 2px at 18% 70%, hsla(45, 85%, 80%, 0.5), transparent), radial-gradient(circle 3px at 55% 15%, hsla(38, 78%, 72%, 0.4), transparent)",
          }} />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: "hsl(var(--gold-accent))" }} />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "hsl(348, 60%, 45%)" }} />
          {/* Floating hearts - scattered with more on left side */}
          {[...Array(25)].map((_, i) => {
            const positions = [
            // Left side concentration (0-14)
            { left: "3%", top: "8%" }, { left: "8%", top: "25%" },
            { left: "15%", top: "55%" }, { left: "6%", top: "70%" },
            { left: "20%", top: "15%" }, { left: "12%", top: "40%" },
            { left: "25%", top: "80%" }, { left: "18%", top: "65%" },
            { left: "10%", top: "88%" }, { left: "22%", top: "35%" },
            { left: "4%", top: "45%" }, { left: "28%", top: "50%" },
            { left: "14%", top: "12%" }, { left: "7%", top: "60%" },
            { left: "30%", top: "22%" },
            // Right side scattered (15-24)
            { left: "92%", top: "15%" }, { left: "80%", top: "75%" },
            { left: "60%", top: "85%" }, { left: "75%", top: "45%" },
            { left: "88%", top: "55%" }, { left: "70%", top: "25%" },
            { left: "45%", top: "8%" }, { left: "50%", top: "60%" },
            { left: "35%", top: "90%" }, { left: "40%", top: "42%" }];

            const sizes = ["w-3 h-3", "w-4 h-4", "w-5 h-5", "w-6 h-6", "w-7 h-7", "w-8 h-8", "w-9 h-9", "w-10 h-10"];
            const colors = [
            "hsl(var(--gold-accent))",
            "hsl(348, 70%, 55%)",
            "hsl(310, 50%, 60%)",
            "hsl(0, 65%, 55%)",
            "hsl(330, 60%, 50%)",
            "hsl(340, 75%, 65%)",
            "hsl(350, 60%, 48%)"];

            return (
              <motion.div
                key={i}
                className="absolute"
                style={positions[i]}
                animate={{
                  y: [-14, 16, -14],
                  x: [-8, 8, -8],
                  opacity: [0.1, 0.35, 0.1],
                  rotate: [0, i % 2 === 0 ? 18 : -18, 0]
                }}
                transition={{
                  duration: 3 + i % 6 * 1.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}>
                
                <Heart className={sizes[i % sizes.length]} style={{ color: colors[i % colors.length] }} fill="currentColor" />
              </motion.div>);

          })}
        </div>

        <div className="container mx-auto px-4 py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left - Content */}
            <motion.div
              className="text-center lg:text-left order-2 lg:order-1 z-10"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              
              {/* Decorative line */}
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
                <div className="w-10 h-px" style={{ background: "hsl(var(--gold-accent))" }} />
                <p
                  className="text-base md:text-lg italic"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--gold-accent))" }}>
                  
                  The Wedding Chapter Starts Here.....  
                </p>
                <div className="w-10 h-px" style={{ background: "hsl(var(--gold-accent))" }} />
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: "white" }}>
                
                Kalyanasuthra
              </h1>

              <div className="w-20 h-1 mx-auto lg:mx-0 mb-5 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--gold-accent)), hsl(348, 60%, 50%))" }} />

              <p className="text-sm md:text-base lg:text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: "hsl(0, 0%, 75%)" }}>
                Trusted matchmaking with traditional values and a modern approach. Your perfect match awaits — find your soulmate today.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                <a
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: "hsl(262, 55%, 48%)" }}>
                  Get Started
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: "hsl(38, 75%, 50%)" }}>
                  Learn More
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: "hsl(170, 55%, 38%)" }}>
                  Let's Connect to Us
                </a>
              </div>
            </motion.div>

            {/* Right - Slider */}
            <motion.div
              className="relative order-1 lg:order-2 z-10 lg:mr-16 xl:mr-24"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}>
              
              {/* Large Background Rectangle Slideshow */}
              <div className="absolute -inset-x-8 -inset-y-4 sm:-inset-x-10 sm:-inset-y-6 lg:-inset-x-12 lg:inset-y-0 rounded-2xl overflow-hidden">
                {images.map((img, i) =>
                <motion.img
                  key={`bg-large-${i}`}
                  src={img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === (current + 1) % images.length ? 0.8 : 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }} />

                )}
                {/* Dark overlay on background */}
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />
                {/* Gold border glow */}
                <div className="absolute inset-0 rounded-2xl" style={{ border: "2px solid hsl(var(--gold-accent) / 0.3)" }} />
                {/* Slideshow pause/play button on background */}
                <button
                  onClick={toggleSlideshow}
                  className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "hsl(var(--gold-accent) / 0.8)" }}
                  aria-label={isMuted ? "Play music" : "Pause music"}>
                  {isMuted ?
                    <Pause className="w-4 h-4 text-white" fill="white" /> :
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  }
                </button>
              </div>

              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-w-[240px] sm:max-w-xs lg:max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl" style={{ border: "4px solid hsl(var(--gold-accent) / 0.4)" }}>

                {/* Main image with sequential fade */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0">
                    
                    <img
                      src={images[current]}
                      alt={`Wedding ${current + 1}`}
                      className="w-full h-full object-cover" />
                    
                  </motion.div>
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none" style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)"
                }} />

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 z-20 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: "hsl(var(--gold-accent))" }} />
                <div className="absolute top-4 right-4 z-20 w-10 h-10 border-t-2 border-r-2" style={{ borderColor: "hsl(var(--gold-accent))" }} />
                <div className="absolute bottom-4 left-4 z-20 w-10 h-10 border-b-2 border-l-2" style={{ borderColor: "hsl(var(--gold-accent))" }} />
                <div className="absolute bottom-4 right-4 z-20 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: "hsl(var(--gold-accent))" }} />

                {/* Navigation arrows */}
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "hsl(var(--gold-accent) / 0.8)" }}>
                  
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "hsl(var(--gold-accent) / 0.8)" }}>
                  
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* Progress bar indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                  {images.map((_, i) =>
                  <button
                    key={i}
                    onClick={() => {setDirection(i > current ? 1 : -1);setCurrent(i);}}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: i === current ? "24px" : "8px",
                      background: "rgba(255,255,255,0.3)"
                    }}>
                    
                      {i === current &&
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "hsl(var(--gold-accent))" }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.5, ease: "linear" }} />

                    }
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent strip */}
      <div
        className="w-full py-3 px-4 flex items-center justify-center gap-2 text-[10px] sm:text-xs md:text-sm tracking-wider uppercase text-center flex-wrap"
        style={{ background: "hsl(var(--burgundy-light))", color: "hsl(var(--soft-gray))" }}>
        
        <span className="w-6 h-px hidden sm:block" style={{ background: "hsl(var(--gold-accent))" }} />
        <span>10,000+ Successful Marriages • Verified Profiles • Personalized Matchmaking</span>
        <span className="w-6 h-px hidden sm:block" style={{ background: "hsl(var(--gold-accent))" }} />
      </div>

      {/* Decorative bottom border */}
      <div className="w-full h-1.5" style={{ background: "linear-gradient(90deg, hsl(var(--burgundy-light)), hsl(var(--gold-accent)), hsl(var(--burgundy-light)))" }} />

      {/* Music toggle button - bottom right */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{ background: "linear-gradient(135deg, hsl(348, 60%, 45%), hsl(348, 55%, 35%))", border: "2px solid hsl(var(--gold-accent) / 0.6)" }}
        aria-label={isMuted ? "Play music" : "Mute music"}>
        
        {isMuted ?
        <VolumeX className="w-5 h-5 text-white" /> :

        <Volume2 className="w-5 h-5 text-white" />
        }
      </button>
    </section>);

};

export default HeroSection;