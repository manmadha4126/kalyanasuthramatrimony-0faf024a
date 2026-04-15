import { useState, useEffect, useCallback, useRef } from "react";
import rocketImg from "@/assets/rocket-launch.png";

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

// Confetti particle for the thanks screen
const Confetti = ({ id }: { id: number }) => {
  const colors = ["#FF6B35", "#FFD700", "#FF4500", "#FF1493", "#00BFFF", "#7B68EE", "#FF69B4", "#FFA500", "#00FF7F", "#FF0000", "#FFFF00", "#FF00FF"];
  const color = colors[id % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const size = 6 + Math.random() * 10;
  const rotation = Math.random() * 360;
  const shape = id % 3; // 0=circle, 1=square, 2=rectangle

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

// Sparkle burst particle
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

const LaunchSequence = ({ onComplete }: LaunchSequenceProps) => {
  const [phase, setPhase] = useState<"launch" | "countdown" | "rocket" | "thanks" | "welcome">("launch");
  const [count, setCount] = useState(5);
  const [fadeOut, setFadeOut] = useState(false);
  const [rocketY, setRocketY] = useState(0);
  const rocketRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    setPhase("countdown");
    setCount(5);
    playBeep(600, 200);
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

  // Rocket animation
  useEffect(() => {
    if (phase === "rocket") {
      let start: number | null = null;
      const duration = 2500;
      const animate = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = progress * progress * progress;
        setRocketY(eased * 130);
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
      setTimeout(() => setPhase("welcome"), 3000);
    }
    if (phase === "welcome") {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 3500);
    }
  }, [phase, onComplete]);

  const confettiCount = 80;
  const sparkCount = 30;

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0.6; }
        }
        @keyframes sparkBurst {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes fireFlicker {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          25% { transform: scaleX(1.1) scaleY(0.9); }
          50% { transform: scaleX(0.9) scaleY(1.1); }
          75% { transform: scaleX(1.05) scaleY(0.95); }
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
      `}</style>
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
              className="text-3xl md:text-5xl font-bold text-center"
              style={{ fontFamily: "'Playfair Display', serif", color: "hsl(45, 80%, 75%)" }}
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

        {/* Phase: Rocket Launch with uploaded image */}
        {phase === "rocket" && (
          <div className="absolute inset-0 z-10">
            {/* Rocket */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: `${-10 + rocketY}%`, transition: "none" }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={rocketImg}
                  alt="Rocket"
                  className="w-40 md:w-56"
                  style={{ filter: "drop-shadow(0 0 30px rgba(255,100,0,0.8))" }}
                />
              </div>
            </div>

            {/* "Launching" text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className="text-4xl md:text-5xl font-bold text-white animate-pulse"
                style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 0 30px rgba(255,100,0,0.5)" }}
              >
                Launching...
              </h2>
            </div>
          </div>
        )}

        {/* Phase: Thanks - Full screen party poppers & confetti */}
        {phase === "thanks" && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {/* Full screen confetti */}
            {Array.from({ length: confettiCount }, (_, i) => (
              <Confetti key={i} id={i} />
            ))}

            {/* Spark bursts from center */}
            {Array.from({ length: sparkCount }, (_, i) => (
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

            {/* Center text */}
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
              <p className="text-white/60 text-base md:text-lg max-w-md mt-3">
                Your journey begins now
              </p>
            </div>
          </div>
        )}

        {/* Phase: Welcome */}
        {phase === "welcome" && (
          <div className="flex flex-col items-center gap-6 z-10 animate-fade-in text-center px-6">
            <h2
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "hsl(45,80%,75%)" }}
            >
              Welcome to
            </h2>
            <h1
              className="text-4xl md:text-6xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, hsl(340,70%,60%), hsl(45,80%,70%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kalyanasuthra Matrimony
            </h1>
            <p
              className="text-lg md:text-xl mt-2 italic"
              style={{ fontFamily: "'Kaushan Script', cursive", color: "hsl(45,60%,70%)" }}
            >
              The Wedding Chapter Starts Here…
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default LaunchSequence;
