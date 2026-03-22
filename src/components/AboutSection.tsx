import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Heart, ThumbsUp, Phone, Mail, User, ChevronDown, ChevronUp, Plus } from "lucide-react";
import aboutMain from "@/assets/about-main.png";
import exclusiveBg from "@/assets/exclusive-bg.png";
import findMatchBg from "@/assets/find-match-bg.png";
import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding5 from "@/assets/wedding-5.jpeg";

const features = [
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    desc: "We provide 100% privacy & security against miss use of member profile and other details.",
    gradient: "linear-gradient(180deg, hsl(220, 70%, 55%) 0%, hsl(190, 80%, 50%) 100%)",
  },
  {
    icon: Heart,
    title: "Best Matches",
    desc: "We provide many options for search member so that any member can meet the best matches according to his/her choice.",
    gradient: "linear-gradient(180deg, hsl(160, 50%, 45%) 0%, hsl(180, 60%, 55%) 100%)",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    desc: "We provide member to wider scope of search so that our member get 100% satisfied.",
    gradient: "linear-gradient(180deg, hsl(25, 85%, 55%) 0%, hsl(340, 70%, 55%) 100%)",
  },
];

const owners = [
  { name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
  { name: "Kavya", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" },
];

const AboutSection = () => {
  const [showContacts, setShowContacts] = useState(false);
  const navigate = useNavigate();
  return (
    <>
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "hsl(0, 0%, 100%)" }}>
      {/* Gold shimmer accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(40, 70%, 60%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, hsl(40, 70%, 55%) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(40, 60%, 50%) 0%, transparent 60%)" }} />
      </div>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, hsla(40, 60%, 60%, 0.3) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top row: main image + text side by side */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0">
          {/* Main image */}
          <motion.div
            className="lg:w-[48%] relative z-10 -mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl lg:-mr-8 relative" style={{ boxShadow: "0 25px 60px -15px hsla(345, 60%, 10%, 0.6)" }}>
              <img
                src={aboutMain}
                alt="Happy wedding couple"
                className="w-full h-[380px] lg:h-[460px] object-cover"
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: "1px solid hsla(40, 60%, 50%, 0.2)" }} />
            </div>
          </motion.div>

          {/* Text content - right side */}
          <motion.div
            className="lg:w-[58%] rounded-2xl shadow-lg p-8 md:p-10 lg:pl-14 flex flex-col justify-center relative z-0"
            style={{
              background: "linear-gradient(135deg, hsla(345, 45%, 16%, 0.95) 0%, hsla(345, 50%, 12%, 0.98) 100%)",
              border: "1px solid hsla(40, 50%, 45%, 0.15)",
              boxShadow: "0 20px 50px -10px hsla(345, 60%, 8%, 0.5)"
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-2"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                background: "linear-gradient(135deg, hsl(40, 65%, 60%) 0%, hsl(35, 70%, 50%) 50%, hsl(40, 65%, 60%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              About Us
            </h2>
            <p className="text-sm italic mb-4" style={{ color: "hsla(40, 40%, 65%, 0.8)", fontFamily: "system-ui, sans-serif" }}>
              India's Most Trusted Matrimony Service
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
              Established in <strong style={{ color: "hsl(0, 0%, 100%)" }}>2020 at Tirupati</strong>, Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing families together with trust, values, and modern technology. We believe that marriage is a sacred bond, and finding the right life partner is one of the most important decisions in life.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>
              Our team of experienced relationship managers works closely with families to understand their preferences, values, and aspirations to find the perfect match.
            </p>
            <div>
              <a
                href="#contact"
                className="inline-block text-sm font-semibold px-7 py-3 rounded-lg transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(40, 65%, 50%) 0%, hsl(35, 70%, 42%) 100%)",
                  color: "hsl(345, 50%, 10%)",
                  boxShadow: "0 4px 15px hsla(40, 60%, 40%, 0.3)"
                }}
              >
                Read More
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Exclusive Service - back to original light bg */}
    <section className="bg-muted/40 pb-0 pt-0">
      {/* Top divider line */}
      <div className="h-px bg-border mx-8 opacity-50" />



      {/* Three features */}
      <div className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-center text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(var(--primary))", letterSpacing: "1px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="relative flex flex-col items-center text-center pt-12 pb-6 px-5 rounded-[2rem] rounded-b-2xl shadow-xl overflow-hidden"
                style={{ background: f.gradient }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.04, y: -6 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-5 -mt-2" style={{ background: "white" }}>
                  <f.icon size={28} style={{ color: "hsl(220, 30%, 30%)" }} />
                </div>
                <h4 className="text-base font-bold text-white mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>{f.title}</h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsla(0, 0%, 100%, 0.88)", fontFamily: "system-ui, sans-serif" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Five wedding images */}
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0">
        {[wedding1, wedding2, wedding3, wedding4, wedding5].map((img, i) => (
          <motion.div
            key={i}
            className="overflow-hidden aspect-[3/4] cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <img
              src={img}
              alt={`Wedding couple ${i + 1}`}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out ${i === 1 ? 'scale-110 group-hover:scale-125' : 'group-hover:scale-110'}`}
            />
          </motion.div>
        ))}
      </div>
    </section>
    </>
  );
};

export default AboutSection;
