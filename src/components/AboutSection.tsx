import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Users } from "lucide-react";
import aboutCouple from "@/assets/about-couple.jpg";

const stats = [
  { value: "5000+", label: "Happy Couples", icon: Heart },
  { value: "10000+", label: "Registered Profiles", icon: Users },
  { value: "98%", label: "Success Rate", icon: Star },
  { value: "24/7", label: "Support Available", icon: Sparkles },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden" style={{ background: "hsl(0, 0%, 100%)" }}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-sm uppercase tracking-[5px] font-semibold mb-3 px-5 py-1.5 rounded-full"
            style={{
              background: "hsl(348, 56%, 95%)",
              color: "hsl(348, 56%, 40%)",
              border: "1px solid hsl(348, 56%, 85%)",
            }}
          >
            ✦ Who We Are ✦
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mt-3"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: "hsl(220, 40%, 15%)",
            }}
          >
            About Us
          </h2>
        </motion.div>

        {/* Main content - image + text side by side */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Left - Image */}
          <motion.div
            className="lg:w-[42%] relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{
              boxShadow: "0 20px 60px -15px hsla(348, 40%, 30%, 0.25)",
            }}>
              <img
                src={aboutCouple}
                alt="Happy wedding couple in traditional Indian attire"
                className="w-full h-[350px] lg:h-[420px] object-cover"
                loading="lazy"
                width={800}
                height={960}
              />
              {/* Floating badge */}
              <motion.div
                className="absolute bottom-5 left-5 px-4 py-2.5 rounded-xl backdrop-blur-md"
                style={{
                  background: "hsla(0, 0%, 100%, 0.9)",
                  border: "1px solid hsl(348, 40%, 85%)",
                  boxShadow: "0 8px 20px hsla(0, 0%, 0%, 0.1)",
                }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs font-semibold" style={{ color: "hsl(348, 56%, 40%)" }}>Since 2020</p>
                <p className="text-base font-bold" style={{ color: "hsl(220, 40%, 15%)" }}>Tirupati, India</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="lg:w-[58%]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p
              className="text-sm uppercase tracking-[3px] font-medium mb-2"
              style={{ color: "hsl(348, 56%, 45%)" }}
            >
              India's Most Trusted
            </p>

            <h3
              className="text-2xl md:text-3xl font-bold mb-5"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                color: "hsl(220, 40%, 15%)",
              }}
            >
              Kalyanasuthra Matrimony
            </h3>

            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "hsl(220, 15%, 35%)", lineHeight: 1.8 }}
            >
              Established in <strong style={{ color: "hsl(348, 56%, 40%)" }}>2020 at Tirupati</strong>,
              Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing
              families together with trust, values, and modern technology. We believe that marriage is
              a sacred bond, and finding the right life partner is one of the most important decisions in life.
            </p>

            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "hsl(220, 15%, 40%)", lineHeight: 1.8 }}
            >
              Our team of experienced relationship managers works closely with families to understand
              their preferences, values, and aspirations to find the perfect match.
            </p>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-xl transition-all"
              style={{
                background: "hsl(348, 56%, 42%)",
                color: "hsl(0, 0%, 100%)",
                boxShadow: "0 8px 20px hsla(348, 56%, 40%, 0.3)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px hsla(348, 56%, 40%, 0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles size={16} />
              Read More
            </motion.a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-5 px-3 rounded-xl"
              style={{
                background: "hsl(348, 56%, 97%)",
                border: "1px solid hsl(348, 40%, 90%)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px hsla(348, 40%, 40%, 0.1)" }}
            >
              <stat.icon size={20} className="mx-auto mb-2" style={{ color: "hsl(348, 56%, 45%)" }} />
              <p className="text-2xl md:text-3xl font-bold mb-1" style={{
                fontFamily: "'DM Serif Display', serif",
                color: "hsl(220, 40%, 15%)",
              }}>
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "hsl(220, 15%, 50%)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
