import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import findMatchBg from "@/assets/find-match-bg.png";

const FindMatchCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <img src={findMatchBg} alt="Wedding venue with candles" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "hsla(0, 0%, 0%, 0.65)" }} />
      <div className="relative z-10 py-20">
        <motion.div
          className="container mx-auto px-4 text-center space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: "hsl(0, 0%, 100%)",
              textShadow: "2px 3px 8px hsla(0, 0%, 0%, 0.5)",
            }}
          >
            Find Your Match Today
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xl mx-auto"
            style={{
              color: "hsla(0, 0%, 100%, 0.9)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Get started today and meet people who truly matter.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 text-base font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-xl"
            style={{ background: "hsl(24, 90%, 55%)", color: "hsl(0, 0%, 100%)" }}
          >
            Register Now
            <Plus size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FindMatchCTA;
