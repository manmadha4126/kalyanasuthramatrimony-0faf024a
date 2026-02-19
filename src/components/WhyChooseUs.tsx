import { motion } from "framer-motion";
import { ShieldCheck, Heart, Clock, Award, Headphones, Lock } from "lucide-react";
import weddingPhoto1 from "@/assets/wedding-photo-1.jpeg";
import weddingPhoto2 from "@/assets/wedding-photo-2.jpg";

const featureColors = [
  "hsl(340, 65%, 47%)",  // deep rose
  "hsl(25, 75%, 50%)",   // warm orange
  "hsl(45, 80%, 45%)",   // golden
  "hsl(160, 50%, 40%)",  // teal
  "hsl(220, 60%, 50%)",  // royal blue
  "hsl(280, 50%, 45%)",  // purple
];

const leftFeatures = [
  { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every profile undergoes strict verification to ensure authenticity and safety.", color: featureColors[0] },
  { icon: Heart, title: "Personalized Matches", desc: "Our advanced algorithm finds partners based on your preferences and compatibility.", color: featureColors[1] },
  { icon: Clock, title: "15+ Years Experience", desc: "Trusted by millions of families with a proven track record of successful matches.", color: featureColors[2] },
];

const rightFeatures = [
  { icon: Award, title: "Award Winning Service", desc: "Recognized as one of India's best matrimony services by leading publications.", color: featureColors[3] },
  { icon: Headphones, title: "24/7 Customer Support", desc: "Our dedicated team is always available to assist you on your journey.", color: featureColors[4] },
  { icon: Lock, title: "Privacy Guaranteed", desc: "Your personal information is protected with bank-grade security measures.", color: featureColors[5] },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-us"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(30 33% 97%) 0%, hsl(348 40% 94%) 40%, hsl(30 25% 92%) 100%)",
      }}
    >
      {/* Decorative Indian mandala-style pattern top right */}
      <div className="absolute top-0 right-0 w-56 h-56 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="0" r="100" stroke="hsl(var(--burgundy))" strokeWidth="1.5"/>
          <circle cx="200" cy="0" r="75" stroke="hsl(var(--burgundy))" strokeWidth="1"/>
          <circle cx="200" cy="0" r="50" stroke="hsl(var(--burgundy))" strokeWidth="0.8"/>
          <circle cx="200" cy="0" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Paisley-style bottom left */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="140" rx="55" ry="80" stroke="hsl(var(--burgundy))" strokeWidth="1.5" transform="rotate(-30 60 140)"/>
          <ellipse cx="60" cy="140" rx="38" ry="58" stroke="hsl(var(--burgundy))" strokeWidth="1" transform="rotate(-30 60 140)"/>
          <ellipse cx="60" cy="140" rx="20" ry="35" stroke="hsl(var(--gold-accent))" strokeWidth="1.2" transform="rotate(-30 60 140)"/>
        </svg>
      </div>

      {/* Subtle gold horizontal band */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.5), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.5), transparent)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
            ✦ Trusted Since 2020 ✦
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            India's Most Trusted <span style={{ color: "hsl(var(--gold-accent))" }}>Matrimony</span>
          </h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto mb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            We are committed to making your search for a life partner easier, safer, and more successful.
          </p>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* 3-column layout */}
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Left features */}
          <div className="space-y-10">
            {leftFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md" style={{ background: f.color }}>
                  <f.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-base font-medium leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center images */}
          <motion.div
            className="hidden lg:flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-80 h-[420px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-80 rounded-2xl overflow-hidden shadow-xl z-10 border-2 border-border">
                <img src={weddingPhoto1} alt="Wedding couple with rings" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-[25%] w-60 h-64 rounded-2xl overflow-hidden shadow-xl z-20 border-2 border-border">
                <img src={weddingPhoto2} alt="Wedding ceremony fire" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Right features */}
          <div className="space-y-10">
            {rightFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md" style={{ background: f.color }}>
                  <f.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-base font-medium leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
