import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Heart, ThumbsUp, Phone, Mail, User, ChevronDown, ChevronUp } from "lucide-react";
import aboutMain from "@/assets/about-main.png";
import exclusiveBg from "@/assets/exclusive-bg.png";
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
  return (
    <>
    <section id="about" className="py-20 bg-muted/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-20">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="150" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="120" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="0" cy="0" r="90" stroke="hsl(var(--primary))" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 opacity-15">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200 Q100 100 200 200" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
          <path d="M0 200 Q80 120 160 200" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
          <path d="M0 200 Q60 140 120 200" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-15">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="150" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="120" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="200" cy="200" r="90" stroke="hsl(var(--primary))" strokeWidth="0.8" />
        </svg>
      </div>

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
            <div className="rounded-2xl overflow-hidden shadow-2xl lg:-mr-8">
              <img
                src={aboutMain}
                alt="Happy wedding couple"
                className="w-full h-[380px] lg:h-[460px] object-cover"
              />
            </div>
          </motion.div>

          {/* Text content - right side */}
          <motion.div
            className="lg:w-[58%] rounded-2xl shadow-lg p-8 md:p-10 lg:pl-14 flex flex-col justify-center relative z-0"
            style={{ background: "hsl(140, 30%, 92%)" }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-wider mb-2">
              About Us
            </h2>
            <p className="text-sm text-muted-foreground italic mb-4">
              India's Most Trusted Matrimony Service
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mb-4">
              Established in <strong className="text-foreground">2020 at Tirupati</strong>, Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing families together with trust, values, and modern technology. We believe that marriage is a sacred bond, and finding the right life partner is one of the most important decisions in life.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mb-6">
              Our team of experienced relationship managers works closely with families to understand their preferences, values, and aspirations to find the perfect match.
            </p>
            <div>
              <a
                href="#contact"
                className="btn-burgundy inline-block text-sm font-semibold px-7 py-3 rounded-lg"
              >
                Read More
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>

    {/* Exclusive Service - Separate Section — same bg-muted/40 continued */}
    <section className="bg-muted/40 pb-0 pt-0">
      {/* Top divider line */}
      <div className="h-px bg-border mx-8 opacity-50" />

      {/* CTA block */}
      <div className="relative overflow-hidden">
        <img src={exclusiveBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "hsla(35, 40%, 20%, 0.25)" }} />
        <div className="relative z-10 py-16">
          <motion.div
            className="container mx-auto px-4 text-center space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <h3
               className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-snug"
              style={{
                fontFamily: "'Alex Brush', cursive",
                color: "hsl(0, 0%, 100%)",
                textShadow: "2px 3px 6px hsla(0, 0%, 0%, 0.4), 0 0 20px hsla(348, 56%, 27%, 0.3)",
                letterSpacing: "0.02em",
              }}
            >
              Exclusive Services from<br />
              <span style={{ color: "hsl(0, 0%, 0%)", fontSize: "1.15em" }}>Kalyanasuthra Matrimony</span>
            </h3>
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              style={{ background: "hsl(348, 56%, 27%)", color: "white" }}
            >
              <Phone size={16} />
              Contact Us
              {showContacts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <AnimatePresence>
              {showContacts && (
                <motion.div
                  className="mt-4 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {owners.map((owner, i) => (
                    <div key={i} className="rounded-xl p-4 text-left shadow-md" style={{ background: "hsla(0,0%,100%,0.92)", border: "1px solid hsl(35, 40%, 75%)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(348, 56%, 27%)" }}>
                          <User size={14} className="text-white" />
                        </div>
                        <span className="text-base font-bold" style={{ color: "hsl(348, 56%, 27%)" }}>{owner.name}</span>
                      </div>
                      <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-sm font-semibold mb-1 transition-colors" style={{ color: "hsl(220, 30%, 25%)" }}>
                        <Phone size={14} style={{ color: "hsl(348, 56%, 27%)" }} /> {owner.phone}
                      </a>
                      <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-xs transition-colors" style={{ color: "hsl(220, 15%, 45%)" }}>
                        <Mail size={12} style={{ color: "hsl(348, 56%, 27%)" }} /> {owner.email}
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Three features below Contact Us */}
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
                {/* Icon circle */}
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

    {/* Five wedding images - full screen width, 3:4 ratio, hover zoom */}
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
