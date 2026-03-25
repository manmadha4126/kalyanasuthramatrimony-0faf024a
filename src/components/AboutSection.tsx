import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, ThumbsUp, Sparkles, Star, Users } from "lucide-react";
import aboutMain from "@/assets/about-main.png";
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

const stats = [
  { value: "5000+", label: "Happy Couples", icon: Heart },
  { value: "10000+", label: "Registered Profiles", icon: Users },
  { value: "98%", label: "Success Rate", icon: Star },
  { value: "24/7", label: "Support Available", icon: Sparkles },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* About Us Section - Complete 3D Redesign */}
      <section id="about" className="py-0 relative overflow-hidden">
        {/* Deep gradient background */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% 0%, hsla(280, 60%, 20%, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 80% 100%, hsla(340, 50%, 18%, 0.5) 0%, transparent 50%),
            linear-gradient(180deg, hsl(260, 30%, 8%) 0%, hsl(280, 25%, 12%) 30%, hsl(320, 30%, 10%) 70%, hsl(340, 25%, 8%) 100%)
          `
        }} />

        {/* Animated floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: `radial-gradient(circle, hsla(${40 + i * 30}, 60%, 60%, 0.3) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          {/* Section header with 3D text effect */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block text-sm uppercase tracking-[6px] font-semibold mb-4 px-6 py-2 rounded-full"
              style={{
                background: "hsla(280, 40%, 40%, 0.2)",
                border: "1px solid hsla(280, 40%, 50%, 0.3)",
                color: "hsla(280, 50%, 75%, 1)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              ✦ Who We Are ✦
            </motion.span>
            <h2
              className="text-4xl md:text-6xl font-bold mt-4"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                background: "linear-gradient(135deg, hsl(40, 70%, 65%) 0%, hsl(30, 80%, 55%) 30%, hsl(350, 50%, 65%) 60%, hsl(280, 50%, 70%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 20px hsla(40, 60%, 50%, 0.3))",
              }}
            >
              About Us
            </h2>
          </motion.div>

          {/* Main content - 3D card layout */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Left - Image with 3D frame */}
            <motion.div
              className="lg:w-[45%] relative z-10"
              initial={{ opacity: 0, x: -60, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
            >
              <div className="relative" style={{ perspective: "1000px" }}>
                {/* Glowing border frame */}
                <motion.div
                  className="absolute -inset-3 rounded-3xl opacity-60"
                  style={{
                    background: "linear-gradient(135deg, hsla(280, 60%, 50%, 0.4), hsla(40, 70%, 55%, 0.4), hsla(340, 50%, 50%, 0.4))",
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="rounded-3xl overflow-hidden relative"
                  style={{
                    boxShadow: "0 30px 80px -20px hsla(280, 50%, 15%, 0.8), 0 0 40px hsla(280, 40%, 40%, 0.15)",
                    border: "2px solid hsla(40, 50%, 55%, 0.2)",
                  }}
                >
                  <img
                    src={aboutMain}
                    alt="Happy wedding couple"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, transparent 50%, hsla(280, 30%, 8%, 0.6) 100%)"
                  }} />
                  {/* Floating badge */}
                  <motion.div
                    className="absolute bottom-6 left-6 px-5 py-3 rounded-2xl backdrop-blur-md"
                    style={{
                      background: "hsla(280, 30%, 20%, 0.7)",
                      border: "1px solid hsla(40, 50%, 55%, 0.3)",
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="text-xs font-semibold" style={{ color: "hsla(40, 60%, 65%, 1)" }}>Since 2020</p>
                    <p className="text-lg font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>Tirupati, India</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content with glassmorphism */}
            <motion.div
              className="lg:w-[60%] lg:-ml-8 relative z-0"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="rounded-3xl p-8 md:p-12 lg:pl-16"
                style={{
                  background: "linear-gradient(135deg, hsla(280, 30%, 18%, 0.85) 0%, hsla(320, 25%, 14%, 0.9) 50%, hsla(340, 30%, 12%, 0.85) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsla(280, 40%, 40%, 0.2)",
                  boxShadow: `
                    0 25px 60px -15px hsla(280, 40%, 10%, 0.7),
                    inset 0 1px 0 hsla(280, 40%, 50%, 0.1),
                    inset 0 -1px 0 hsla(340, 30%, 30%, 0.1)
                  `,
                }}
                whileHover={{
                  rotateY: -2,
                  rotateX: 1,
                  transition: { duration: 0.4 },
                }}
              >
                {/* Decorative corner accents */}
                <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none" style={{
                  borderTop: "2px solid hsla(40, 60%, 55%, 0.3)",
                  borderRight: "2px solid hsla(40, 60%, 55%, 0.3)",
                  borderRadius: "0 12px 0 0",
                }} />
                <div className="absolute bottom-4 left-4 w-16 h-16 pointer-events-none" style={{
                  borderBottom: "2px solid hsla(40, 60%, 55%, 0.3)",
                  borderLeft: "2px solid hsla(40, 60%, 55%, 0.3)",
                  borderRadius: "0 0 0 12px",
                }} />

                <motion.p
                  className="text-sm uppercase tracking-[4px] font-medium mb-3"
                  style={{ color: "hsla(280, 50%, 70%, 0.9)" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  India's Most Trusted
                </motion.p>

                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    background: "linear-gradient(90deg, hsl(40, 65%, 65%) 0%, hsl(35, 70%, 55%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Kalyanasuthra Matrimony
                </motion.h3>

                <motion.p
                  className="text-base md:text-lg leading-relaxed mb-5"
                  style={{ color: "hsla(0, 0%, 100%, 0.9)", lineHeight: 1.8 }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Established in <strong style={{ color: "hsl(40, 60%, 65%)" }}>2020 at Tirupati</strong>, 
                  Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing 
                  families together with trust, values, and modern technology. We believe that marriage is 
                  a sacred bond, and finding the right life partner is one of the most important decisions in life.
                </motion.p>

                <motion.p
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ color: "hsla(0, 0%, 100%, 0.85)", lineHeight: 1.8 }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  Our team of experienced relationship managers works closely with families to understand 
                  their preferences, values, and aspirations to find the perfect match.
                </motion.p>

                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold px-8 py-3.5 rounded-xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(40, 65%, 55%) 0%, hsl(35, 70%, 45%) 100%)",
                    color: "hsl(280, 30%, 10%)",
                    boxShadow: "0 8px 25px hsla(40, 60%, 40%, 0.35), 0 0 20px hsla(40, 50%, 50%, 0.1)",
                  }}
                  whileHover={{ scale: 1.06, boxShadow: "0 12px 35px hsla(40, 60%, 40%, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <Sparkles size={16} />
                  Read More
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row - 3D floating cards */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative text-center py-7 px-4 rounded-2xl cursor-pointer group"
                style={{
                  background: "linear-gradient(160deg, hsla(280, 30%, 22%, 0.6) 0%, hsla(320, 25%, 16%, 0.6) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsla(280, 40%, 45%, 0.15)",
                  boxShadow: "0 10px 40px -10px hsla(280, 40%, 10%, 0.5)",
                }}
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 20px 50px -10px hsla(280, 40%, 20%, 0.6), 0 0 30px hsla(40, 50%, 50%, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <stat.icon
                  size={22}
                  className="mx-auto mb-3"
                  style={{ color: "hsla(40, 60%, 65%, 0.9)" }}
                />
                <p
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    background: "linear-gradient(135deg, hsl(40, 65%, 65%), hsl(280, 40%, 70%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "hsla(0, 0%, 100%, 0.6)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Features - keep separate bg */}
      <section className="bg-muted/40 pb-0 pt-0">
        <div className="h-px bg-border mx-8 opacity-50" />
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
