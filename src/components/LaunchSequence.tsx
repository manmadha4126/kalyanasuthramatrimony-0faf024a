import { useState, useEffect, useCallback, useRef } from "react";

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

// Sparkle/particle component
const Particle = ({ delay, x, color, type }: { delay: number; x: number; color: string; type: "sparkle" | "thread" }) => {
  return type === "sparkle" ? (
    <div
      className="absolute rounded-full animate-pulse"
      style={{
        width: Math.random() * 6 + 3,
        height: Math.random() * 6 + 3,
        background: color,
        left: `${x}%`,
        bottom: `${Math.random() * 40 + 10}%`,
        animationDelay: `${delay}ms`,
        boxShadow: `0 0 8px ${color}`,
        animation: `sparkleUp ${1 + Math.random()}s ease-out ${delay}ms forwards`,
      }}
    />
  ) : (
    <div
      className="absolute"
      style={{
        width: 2,
        height: Math.random() * 60 + 30,
        background: `linear-gradient(to top, ${color}, transparent)`,
        left: `${x}%`,
        bottom: `${Math.random() * 20}%`,
        animation: `threadUp ${1.5 + Math.random()}s ease-out ${delay}ms forwards`,
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
        // Ease-in acceleration
        const eased = progress * progress * progress;
        setRocketY(eased * 120);
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
      setTimeout(() => setPhase("welcome"), 2500);
    }
    if (phase === "welcome") {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 3500);
    }
  }, [phase, onComplete]);

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: Math.random() * 800,
    x: 40 + Math.random() * 20,
    color: ["#FF6B35", "#FFD700", "#FF4500", "#FF1493", "#00BFFF", "#7B68EE", "#FF69B4", "#FFA500"][i % 8],
    type: (i % 3 === 0 ? "thread" : "sparkle") as "sparkle" | "thread",
  }));

  return (
    <>
      <style>{`
        @keyframes sparkleUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(0); opacity: 0; }
        }
        @keyframes threadUp {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-300px); opacity: 0; }
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

        {/* Phase: Rocket Launch */}
        {phase === "rocket" && (
          <div className="absolute inset-0 z-10">
            {/* Particles and sparkles behind rocket */}
            {particles.map(p => (
              <Particle key={p.id} delay={p.delay} x={p.x} color={p.color} type={p.type} />
            ))}

            {/* Rocket */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: `${-10 + rocketY}%`,
                transition: "none",
              }}
            >
              {/* Fire trail */}
              <div className="flex flex-col items-center">
                <span className="text-7xl md:text-8xl" style={{ filter: "drop-shadow(0 0 20px rgba(255,100,0,0.8))" }}>
                  🚀
                </span>
                {/* Fire */}
                <div
                  className="flex flex-col items-center -mt-2"
                  style={{ animation: "fireFlicker 0.15s infinite" }}
                >
                  <div
                    className="w-10 rounded-full"
                    style={{
                      height: 60 + rocketY * 0.8,
                      background: "linear-gradient(to bottom, #FF6B35, #FF4500, #FFD700, transparent)",
                      filter: "blur(4px)",
                    }}
                  />
                  <div
                    className="w-6 rounded-full -mt-8"
                    style={{
                      height: 40 + rocketY * 0.5,
                      background: "linear-gradient(to bottom, #FFD700, #FF69B4, transparent)",
                      filter: "blur(6px)",
                    }}
                  />
                </div>
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

        {/* Phase: Thanks */}
        {phase === "thanks" && (
          <div className="flex flex-col items-center gap-6 z-10 animate-fade-in text-center px-6">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(120,50%,45%) 0%, hsl(160,60%,40%) 100%)",
                boxShadow: "0 0 80px hsl(120,50%,45%,0.4)",
              }}
            >
              <span className="text-5xl">✨</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: "hsl(45,80%,75%)" }}
            >
              Thank You for Launching!
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-md">
              Your journey begins now
            </p>
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
