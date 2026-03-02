import { motion } from "framer-motion";
import { ShieldCheck, Heart, Clock, Award, Headphones, Lock } from "lucide-react";
import weddingPhoto1 from "@/assets/wedding-photo-1.jpeg";
import weddingPhoto2 from "@/assets/wedding-photo-2.jpg";
import colorfulBg from "@/assets/colorful-bg.png";

const leftFeatures = [
  {
    icon: ShieldCheck,
    title: "100% Verified Profiles",
    desc: "Every profile undergoes strict verification to ensure authenticity and safety.",
    gradient: "linear-gradient(135deg, hsl(348, 70%, 40%), hsl(0, 65%, 55%))",
    borderColor: "hsl(348, 65%, 50%)",
    iconBg: "hsl(348, 60%, 45%)",
  },
  {
    icon: Heart,
    title: "Personalized Matches",
    desc: "Our advanced algorithm finds partners based on your preferences and compatibility.",
    gradient: "linear-gradient(135deg, hsl(200, 70%, 42%), hsl(210, 60%, 55%))",
    borderColor: "hsl(200, 65%, 50%)",
    iconBg: "hsl(200, 60%, 48%)",
  },
  {
    icon: Clock,
    title: "15+ Years Experience",
    desc: "Trusted by millions of families with a proven track record of successful matches.",
    gradient: "linear-gradient(135deg, hsl(140, 50%, 38%), hsl(150, 45%, 48%))",
    borderColor: "hsl(140, 50%, 45%)",
    iconBg: "hsl(140, 45%, 42%)",
  },
];

const rightFeatures = [
  {
    icon: Award,
    title: "Award Winning Service",
    desc: "Recognized as one of India's best matrimony services by leading publications.",
    gradient: "linear-gradient(135deg, hsl(270, 55%, 45%), hsl(280, 50%, 58%))",
    borderColor: "hsl(270, 50%, 52%)",
    iconBg: "hsl(270, 50%, 48%)",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Our dedicated team is always available to assist you on your journey.",
    gradient: "linear-gradient(135deg, hsl(25, 75%, 48%), hsl(35, 65%, 55%))",
    borderColor: "hsl(25, 70%, 52%)",
    iconBg: "hsl(25, 65%, 50%)",
  },
  {
    icon: Lock,
    title: "Privacy Guaranteed",
    desc: "Your personal information is protected with bank-grade security measures.",
    gradient: "linear-gradient(135deg, hsl(220, 65%, 42%), hsl(230, 55%, 55%))",
    borderColor: "hsl(220, 60%, 50%)",
    iconBg: "hsl(220, 55%, 48%)",
  },
];

const floatingSymbols = Array.from({ length: 40 }, (_, i) => {
  const pool = ["❤", "🌹", "💕", "🩷", "💗", "🌸", "💐", "🌺", "♥", "💖", "🌷"];
  return {
    id: i,
    symbol: pool[i % pool.length],
    left: `${((i * 23 + 5) % 96) + 2}%`,
    top: `${((i * 11 + 7) % 28) + 1}%`,
    size: 12 + (i % 6) * 3,
    delay: (i % 10) * 0.5,
    duration: 5 + (i % 5) * 1.2,
  };
});

const FeatureCard = ({ f, i, fromLeft }: { f: typeof leftFeatures[0]; i: number; fromLeft: boolean }) => (
  <motion.div
    className="rounded-2xl p-6 shadow-xl cursor-default transition-transform duration-300"
    style={{
      background: f.gradient,
      border: `2px solid ${f.borderColor}`,
    }}
    initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    whileHover={{ scale: 1.06, y: -4 }}
  >
    <div className="flex items-start gap-4">
      <div
        className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md"
        style={{ background: "hsla(0,0%,100%,0.25)", backdropFilter: "blur(8px)" }}
      >
        <f.icon size={26} className="text-white" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Google Sans', 'Product Sans', system-ui, sans-serif" }}>
          {f.title}
        </h3>
        <p className="text-white/85 text-sm font-medium leading-relaxed" style={{ fontFamily: "'Google Sans', 'Product Sans', system-ui, sans-serif" }}>
          {f.desc}
        </p>
      </div>
    </div>
  </motion.div>
);

const WhyChooseUs = () => {
  return (
    <section
      id="why-us"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(30 33% 97%) 0%, hsl(348 40% 94%) 40%, hsl(30 25% 92%) 100%)",
      }}
    >
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ top: "30%", backgroundImage: `url(${colorfulBg})`, backgroundSize: "cover", backgroundPosition: "center bottom", opacity: 0.9 }}
      />
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none" style={{ top: "30%", background: "hsl(30 33% 97% / 0.35)" }} />

      <div className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none overflow-hidden">
        {floatingSymbols.map((s) => (
          <motion.span key={s.id} className="absolute select-none" style={{ left: s.left, top: s.top, fontSize: `${s.size}px`, opacity: 0.5 }}
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, -12, 0, 8, 0], rotate: [0, 8, -8, 4, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >{s.symbol}</motion.span>
        ))}
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-56 h-56 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none"><circle cx="200" cy="0" r="100" stroke="hsl(var(--burgundy))" strokeWidth="1.5"/><circle cx="200" cy="0" r="75" stroke="hsl(var(--burgundy))" strokeWidth="1"/><circle cx="200" cy="0" r="50" stroke="hsl(var(--burgundy))" strokeWidth="0.8"/><circle cx="200" cy="0" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="1.5"/></svg>
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none"><ellipse cx="60" cy="140" rx="55" ry="80" stroke="hsl(var(--burgundy))" strokeWidth="1.5" transform="rotate(-30 60 140)"/><ellipse cx="60" cy="140" rx="38" ry="58" stroke="hsl(var(--burgundy))" strokeWidth="1" transform="rotate(-30 60 140)"/><ellipse cx="60" cy="140" rx="20" ry="35" stroke="hsl(var(--gold-accent))" strokeWidth="1.2" transform="rotate(-30 60 140)"/></svg>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.5), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.5), transparent)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
            ✦ Trusted Since 2020 ✦
          </p>
          <div className="flex items-center justify-center gap-0 mb-4">
            <div className="relative inline-flex items-center px-8 py-3" style={{ background: "hsl(var(--burgundy))", clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%)" }}>
              <h2 className="text-2xl md:text-4xl font-bold text-white pr-4" style={{ fontFamily: "'DM Serif Display', serif" }}>India's Most Trusted</h2>
            </div>
            <div className="relative inline-flex items-center px-8 py-3 -ml-1" style={{ background: "hsl(var(--gold-accent))", clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%, 24px 50%)" }}>
              <h2 className="text-2xl md:text-4xl font-bold pl-4" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--burgundy))" }}>Matrimony</h2>
            </div>
            <div className="w-0 h-0 -ml-1" style={{ borderTop: "28px solid transparent", borderBottom: "28px solid transparent", borderLeft: "20px solid hsl(var(--gold-accent))" }} />
          </div>
          <p className="text-foreground text-lg max-w-2xl mx-auto mb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            We are committed to making your search for a life partner easier, safer, and more successful.
          </p>
          <div className="gold-divider mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-6">
            {leftFeatures.map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} fromLeft />
            ))}
          </div>

          <motion.div className="hidden lg:flex flex-col items-center justify-center relative" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="relative w-80 h-[420px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-80 rounded-2xl overflow-hidden shadow-xl z-10 border-2 border-border">
                <img src={weddingPhoto1} alt="Wedding couple" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-[25%] w-60 h-64 rounded-2xl overflow-hidden shadow-xl z-20 border-2 border-border">
                <img src={weddingPhoto2} alt="Wedding ceremony" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {rightFeatures.map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} fromLeft={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
