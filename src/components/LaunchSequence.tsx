import { useState, useEffect, useCallback } from "react";

interface LaunchSequenceProps {
  onComplete: () => void;
}

const LaunchSequence = ({ onComplete }: LaunchSequenceProps) => {
  const [phase, setPhase] = useState<"launch" | "countdown" | "launching" | "thanks" | "welcome">("launch");
  const [count, setCount] = useState(5);
  const [fadeOut, setFadeOut] = useState(false);

  const startCountdown = useCallback(() => {
    setPhase("countdown");
    setCount(5);
  }, []);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const t = setTimeout(() => setCount(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "countdown" && count === 0) {
      setPhase("launching");
      setTimeout(() => setPhase("thanks"), 2000);
    }
  }, [phase, count]);

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

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      style={{ background: "radial-gradient(ellipse at center, hsl(270,30%,15%) 0%, hsl(260,40%,8%) 100%)" }}
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-white/5 absolute animate-pulse" />
        <div className="w-[350px] h-[350px] rounded-full border border-white/10 absolute" />
        <div className="w-[200px] h-[200px] rounded-full border border-white/5 absolute" />
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
            className="relative mt-4 w-44 h-44 rounded-full flex items-center justify-center text-xl font-bold uppercase tracking-widest transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, hsl(340,70%,50%) 0%, hsl(280,60%,45%) 100%)",
              boxShadow: "0 0 60px hsl(340,70%,50%,0.4), 0 0 120px hsl(280,60%,45%,0.2)",
              color: "#fff",
            }}
          >
            <span className="relative z-10">LAUNCH</span>
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
            className="w-48 h-48 rounded-full flex items-center justify-center animate-scale-in"
            style={{
              background: "linear-gradient(135deg, hsl(340,70%,50%) 0%, hsl(280,60%,45%) 100%)",
              boxShadow: "0 0 80px hsl(340,70%,50%,0.5)",
            }}
          >
            <span className="text-7xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {count}
            </span>
          </div>
        </div>
      )}

      {/* Phase: Launching */}
      {phase === "launching" && (
        <div className="flex flex-col items-center gap-4 z-10 animate-fade-in">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse"
            style={{
              background: "linear-gradient(135deg, hsl(45,80%,60%) 0%, hsl(30,90%,55%) 100%)",
              boxShadow: "0 0 100px hsl(45,80%,60%,0.5)",
            }}
          >
            <span className="text-4xl">🚀</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mt-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Launching...
          </h2>
        </div>
      )}

      {/* Phase: Thanks */}
      {phase === "thanks" && (
        <div className="flex flex-col items-center gap-6 z-10 animate-fade-in text-center px-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center"
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
  );
};

export default LaunchSequence;
