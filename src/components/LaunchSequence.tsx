import { useState, useEffect, useCallback, useRef } from "react";
import rocketImg from "@/assets/rocket-only.png";

interface LaunchSequenceProps {
  onComplete: () => void;
}

const playBeep = (freq = 800, duration = 150) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch {}
};

const playLaunchSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 1.5);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
    osc.start();
    osc.stop(ctx.currentTime + 2);
  } catch {}
};

const Confetti = ({ id }: { id: number }) => {
  const colors = ["#FF6B35", "#FFD700", "#FF4500", "#FF1493", "#00BFFF", "#7B68EE", "#FF69B4", "#FFA500", "#00FF7F", "#FF0000", "#FFFF00", "#FF00FF"];
  const color = colors[id % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const size = 6 + Math.random() * 10;
  const rotation = Math.random() * 360;
  const shape = id % 3;

  return (
    <div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `-${size}px`,
        width: shape === 2 ? size * 0.4 : size,
        height: size,
        background: color,
        borderRadius: shape === 0 ? "50%" : shape === 1 ? "2px" : "1px",
        animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
        transform: `rotate(${rotation}deg)`,
        opacity: 0,
      }}
    />
  );
};

const SparkBurst = ({ id }: { id: number }) => {
  const colors = ["#FFD700", "#FF6B35", "#FF1493", "#00BFFF", "#FF4500", "#7B68EE", "#00FF7F"];
  const angle = (id / 30) * Math.PI * 2;
  const distance = 100 + Math.random() * 200;
  const size = 4 + Math.random() * 8;
  const delay = Math.random() * 0.5;

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        background: colors[id % colors.length],
        boxShadow: `0 0 ${size * 2}px ${colors[id % colors.length]}`,
        animation: `sparkBurst 1.5s ease-out ${delay}s forwards`,
        "--tx": `${Math.cos(angle) * distance}px`,
        "--ty": `${Math.sin(angle) * distance}px`,
        opacity: 0,
      } as any}
    />
  );
};

// Fire particle for rocket trail
const FireParticle = ({ id }: { id: number }) => {
  const colors = ["#FF4500", "#FF6B00", "#FFD700", "#FF0000", "#FFA500", "#FFFF00"];
  const color = colors[id % colors.length];
  const offsetX = (Math.random() - 0.5) * 80;
  const delay = Math.random() * 0.3;
  const size = 8 + Math.random() * 16;
  const duration = 0.6 + Math.random() * 0.8;

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: `calc(50% + ${offsetX}px)`,
        top: "100%",
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        animation: `fireDown ${duration}s ease-out ${delay}s infinite`,
        opacity: 0,
      }}
    />
  );
};

const LaunchSequence = ({ onComplete }: LaunchSequenceProps) => {
  const [phase, setPhase] = useState<"launch" | "countdown" | "rocket" | "thanks" | "welcome">("launch");
  const [count, setCount] = useState(5);
  const [fadeOut, setFadeOut] = useState(false);
  const [rocketY, setRocketY] = useState(0);
  const rocketRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCountdown = useCallback(() => {
    setPhase("countdown");
    setCount(5);
    playBeep(600, 200);
  }, []);

  // Play Vikram BGM when rocket phase starts
  useEffect(() => {
    if (phase === "rocket") {
      try {
        const audio = new Audio("/vikram-bgm.mp3");
        audio.currentTime = 50; // Start from 0:50
        audio.volume = 0.7;
        audio.play().catch(() => {});
        audioRef.current = audio;
      } catch {}
    }
    // Fade out audio when leaving
    if (phase === "welcome" && audioRef.current) {
      const audio = audioRef.current;
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 200);
    }
  }, [phase]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const t = setTimeout(() => {
        setCount(c => c - 1);
        playBeep(count > 1 ? 700 + (5 - count + 1) * 100 : 1200, count > 1 ? 200 : 400);
      }, 1000);
      return () => clearTimeout(t);
    }
    if (phase === "countdown" && count === 0) {
      setTimeout(() => {
        setPhase("rocket");
        playLaunchSound();
      }, 600);
    }
  }, [phase, count]);

  // Rocket animation - 5 seconds
  useEffect(() => {
    if (phase === "rocket") {
      let start: number | null = null;
      const duration = 5000;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = progress * progress;
        setRocketY(eased * 140);
        if (progress < 1) {
          rocketRef.current = requestAnimationFrame(animate);
        } else {
          setPhase("thanks");
        }
      };
      rocketRef.current = requestAnimationFrame(animate);
      return () => { if (rocketRef.current) cancelAnimationFrame(rocketRef.current); };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "thanks") {
      setTimeout(() => setPhase("welcome"), 15000); // 15 seconds
    }
    if (phase === "welcome") {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 8000);
    }
  }, [phase, onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Great+Vibes&display=swap');
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0.6; }
        }
        @keyframes sparkBurst {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes fireDown {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(120px) scale(0.2); opacity: 0; }
        }
        @keyframes fireFlicker {
          0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.9; }
          25% { transform: scaleX(1.2) scaleY(0.8); opacity: 1; }
          50% { transform: scaleX(0.8) scaleY(1.2); opacity: 0.8; }
          75% { transform: scaleX(1.1) scaleY(0.9); opacity: 1; }
        }
        @keyframes countPop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes popperLeft {
          0% { transform: translate(0,0) rotate(0deg) scale(0); opacity: 0; }
          20% { transform: translate(-30px,-60px) rotate(-20deg) scale(1.2); opacity: 1; }
          100% { transform: translate(-80px,-120px) rotate(-45deg) scale(1); opacity: 1; }
        }
        @keyframes popperRight {
          0% { transform: translate(0,0) rotate(0deg) scale(0); opacity: 0; }
          20% { transform: translate(30px,-60px) rotate(20deg) scale(1.2); opacity: 1; }
          100% { transform: translate(80px,-120px) rotate(45deg) scale(1); opacity: 1; }
        }
        @keyframes nameGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3); }
          50% { text-shadow: 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.5), 0 0 120px rgba(255,100,0,0.3); }
        }
        @keyframes sparkleTrail {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(200px) scale(0); opacity: 0; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { opacity: 1; }
          100% { transform: translateY(-30px) translateX(15px); opacity: 0.3; }
        }
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        style={{ background: "radial-gradient(ellipse at center, hsl(270,30%,15%) 0%, hsl(260,40%,8%) 100%)" }}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-white/5 absolute animate-pulse" />
          <div className="w-[420px] h-[420px] rounded-full border border-white/10 absolute" />
          <div className="w-[260px] h-[260px] rounded-full border border-white/5 absolute" />
        </div>

        {/* Phase: Launch Button */}
        {phase === "launch" && (
          <div className="flex flex-col items-center gap-8 animate-fade-in z-10">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#FFD700",
                textShadow: "0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,165,0,0.2)",
              }}
            >
              Kalyanasuthra Matrimony
            </h1>
            <p className="text-white/60 text-sm md:text-base tracking-widest uppercase">
              Preparing to launch
            </p>
            <button
              onClick={startCountdown}
              className="relative mt-4 w-52 h-52 md:w-60 md:h-60 rounded-full flex items-center justify-center text-xl font-bold uppercase tracking-widest transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(340,70%,50%) 0%, hsl(280,60%,45%) 100%)",
                boxShadow: "0 0 60px hsl(340,70%,50%,0.4), 0 0 120px hsl(280,60%,45%,0.2)",
                color: "#fff",
              }}
            >
              <span className="relative z-10 text-2xl">LAUNCH</span>
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: "hsl(340,70%,50%)" }}
              />
            </button>
          </div>
        )}

        {/* Phase: Countdown */}
        {phase === "countdown" && (
          <div className="flex flex-col items-center gap-6 z-10">
            <p className="text-white/50 text-sm uppercase tracking-[0.3em]">Launching in</p>
            <div
              key={count}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(340,70%,50%) 0%, hsl(280,60%,45%) 100%)",
                boxShadow: `0 0 ${80 + (5 - count) * 20}px hsl(340,70%,50%,0.5)`,
                animation: "countPop 0.5s ease-out",
              }}
            >
              <span
                className="font-bold text-white"
                style={{ fontSize: "clamp(100px, 20vw, 160px)", lineHeight: 1 }}
              >
                {count}
              </span>
            </div>
          </div>
        )}

        {/* Phase: Rocket Launch - transparent rocket with fire */}
        {phase === "rocket" && (
          <div className="absolute inset-0 z-10">
            {/* Sparkle trails behind rocket */}
            {Array.from({ length: 20 }, (_, i) => {
              const offsetX = (Math.random() - 0.5) * 120;
              const delay = Math.random() * 2;
              const colors = ["#FFD700", "#FF6B35", "#FF4500", "#FFA500", "#FFFF00"];
              return (
                <div
                  key={`trail-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `calc(50% + ${offsetX}px)`,
                    bottom: `${Math.max(0, -10 + rocketY - 10)}%`,
                    width: 4 + Math.random() * 6,
                    height: 4 + Math.random() * 6,
                    background: colors[i % colors.length],
                    boxShadow: `0 0 10px ${colors[i % colors.length]}`,
                    animation: `sparkleTrail ${1 + Math.random()}s ease-out ${delay}s infinite`,
                  }}
                />
              );
            })}

            {/* Rocket with fire */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: `${-10 + rocketY}%`, transition: "none" }}
            >
              <div className="flex flex-col items-center relative">
                {/* The rocket image - transparent background */}
                <img
                  src={rocketImg}
                  alt="Rocket"
                  className="w-32 md:w-44 relative z-10"
                  style={{ filter: "drop-shadow(0 0 20px rgba(255,100,0,0.6))" }}
                  width={512}
                  height={1024}
                />
                {/* Fire trail below rocket */}
                <div className="relative -mt-2 flex flex-col items-center">
                  {/* Main fire */}
                  <div
                    className="w-16 md:w-20 h-32 md:h-44 rounded-b-full"
                    style={{
                      background: "linear-gradient(to bottom, #FF4500, #FF6B00, #FFD700, transparent)",
                      filter: "blur(4px)",
                      animation: "fireFlicker 0.15s ease-in-out infinite",
                    }}
                  />
                  {/* Inner fire */}
                  <div
                    className="absolute top-0 w-8 md:w-10 h-24 md:h-32 rounded-b-full"
                    style={{
                      background: "linear-gradient(to bottom, #FFFFFF, #FFD700, #FF6B00, transparent)",
                      filter: "blur(2px)",
                      animation: "fireFlicker 0.1s ease-in-out infinite",
                    }}
                  />
                  {/* Fire particles */}
                  {Array.from({ length: 15 }, (_, i) => (
                    <FireParticle key={`fire-${i}`} id={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* "Launching" text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h2
                className="text-4xl md:text-5xl font-bold text-white animate-pulse"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 0 30px rgba(255,100,0,0.5)" }}
              >
                Launching...
              </h2>
            </div>
          </div>
        )}

        {/* Phase: Thanks - Full screen party with Vikram Anna */}
        {phase === "thanks" && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {/* Full screen confetti */}
            {Array.from({ length: 100 }, (_, i) => (
              <Confetti key={i} id={i} />
            ))}

            {/* Spark bursts from center */}
            {Array.from({ length: 40 }, (_, i) => (
              <SparkBurst key={`spark-${i}`} id={i} />
            ))}

            {/* Party poppers */}
            <div className="absolute left-[15%] top-[40%]" style={{ animation: "popperLeft 0.8s ease-out forwards" }}>
              <span className="text-6xl md:text-8xl">🎉</span>
            </div>
            <div className="absolute right-[15%] top-[40%]" style={{ animation: "popperRight 0.8s ease-out forwards" }}>
              <span className="text-6xl md:text-8xl">🎊</span>
            </div>
            <div className="absolute left-[25%] top-[55%]" style={{ animation: "popperLeft 0.8s ease-out 0.3s forwards", opacity: 0 }}>
              <span className="text-5xl md:text-7xl">🎉</span>
            </div>
            <div className="absolute right-[25%] top-[55%]" style={{ animation: "popperRight 0.8s ease-out 0.3s forwards", opacity: 0 }}>
              <span className="text-5xl md:text-7xl">🎊</span>
            </div>
            <div className="absolute left-[10%] top-[25%]" style={{ animation: "popperLeft 0.8s ease-out 0.6s forwards", opacity: 0 }}>
              <span className="text-5xl md:text-6xl">✨</span>
            </div>
            <div className="absolute right-[10%] top-[25%]" style={{ animation: "popperRight 0.8s ease-out 0.6s forwards", opacity: 0 }}>
              <span className="text-5xl md:text-6xl">✨</span>
            </div>

            {/* Center text with Vikram Anna */}
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in text-center px-6">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: "linear-gradient(135deg, hsl(120,50%,45%) 0%, hsl(160,60%,40%) 100%)",
                  boxShadow: "0 0 80px hsl(120,50%,45%,0.4)",
                }}
              >
                <span className="text-5xl">🎆</span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "hsl(45,80%,75%)" }}
              >
                Thank You for Launching!
              </h2>
              {/* Vikram Anna name - attractive Great Vibes font */}
              <p
                className="text-4xl md:text-6xl mt-6"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  background: "linear-gradient(135deg, #FFD700, #FFA500, #FF6B35, #FFD700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "nameGlow 2s ease-in-out infinite",
                  filter: "drop-shadow(0 2px 10px rgba(255,215,0,0.4))",
                }}
              >
                Vikram Anna
              </p>
              <p className="text-white/60 text-base md:text-lg max-w-md mt-4">
                Your journey begins now
              </p>
            </div>
          </div>
        )}

        {/* Phase: Welcome - styled like reference with particles */}
        {phase === "welcome" && (
          <div className="absolute inset-0 z-10 overflow-hidden"
            style={{ background: "radial-gradient(ellipse at center, hsl(340,40%,18%) 0%, hsl(340,50%,8%) 60%, hsl(260,40%,5%) 100%)" }}
          >
            {/* Floating glow particles */}
            {Array.from({ length: 40 }, (_, i) => {
              const size = 3 + Math.random() * 8;
              const colors = ["#FFD700", "#FF6B35", "#FF1493", "#FFA500", "#FF4500", "#FFB6C1"];
              return (
                <div
                  key={`wp-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: size,
                    height: size,
                    background: colors[i % colors.length],
                    boxShadow: `0 0 ${size * 3}px ${colors[i % colors.length]}`,
                    animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite alternate`,
                    opacity: 0.6 + Math.random() * 0.4,
                  }}
                />
              );
            })}

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in text-center px-6">
              {/* Star/sparkle icon */}
              <div className="mb-4">
                <span className="text-3xl" style={{ color: "#FFD700" }}>✦</span>
              </div>
              {/* Decorative lines */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 md:w-24 h-[1px]" style={{ background: "linear-gradient(to right, transparent, #FFD700)" }} />
                <div className="w-16 md:w-24 h-[1px]" style={{ background: "linear-gradient(to left, transparent, #FFD700)" }} />
              </div>

              <h2
                className="text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "#E8D5C0" }}
              >
                Welcome To
              </h2>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mt-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#FFD700",
                  textShadow: "0 0 60px rgba(255,215,0,0.5), 0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                Kalyanasuthra Matrimony
              </h1>
              <p
                className="text-lg md:text-2xl mt-6 italic"
                style={{ fontFamily: "'Kaushan Script', cursive", color: "#E8C8A0" }}
              >
                Waiting for Someone Special...!
              </p>
              <p
                className="text-xs md:text-sm mt-4 tracking-[0.3em] uppercase"
                style={{ color: "#B89A7A" }}
              >
                Where Hearts Find Home 💕
              </p>
              {/* Hearts divider */}
              <div className="flex items-center gap-2 mt-4">
                <div className="w-12 md:w-20 h-[1px]" style={{ background: "linear-gradient(to right, transparent, #B89A7A)" }} />
                <span style={{ color: "#FFB6C1" }}>♥</span>
                <span style={{ color: "#FFD700" }}>♥</span>
                <span style={{ color: "#FF69B4" }}>♥</span>
                <div className="w-12 md:w-20 h-[1px]" style={{ background: "linear-gradient(to left, transparent, #B89A7A)" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LaunchSequence;
