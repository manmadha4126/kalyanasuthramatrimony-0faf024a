import { motion } from "framer-motion";
import { ShieldCheck, Heart, Clock, Award, Headphones, Lock } from "lucide-react";

const leftFeatures = [
  { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every profile undergoes strict verification to ensure authenticity and safety." },
  { icon: Heart, title: "Personalized Matches", desc: "Our advanced algorithm finds partners based on your preferences and compatibility." },
  { icon: Clock, title: "15+ Years Experience", desc: "Trusted by millions of families with a proven track record of successful matches." },
];

const rightFeatures = [
  { icon: Award, title: "Award Winning Service", desc: "Recognized as one of India's best matrimony services by leading publications." },
  { icon: Headphones, title: "24/7 Customer Support", desc: "Our dedicated team is always available to assist you on your journey." },
  { icon: Lock, title: "Privacy Guaranteed", desc: "Your personal information is protected with bank-grade security measures." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            India's Most Trusted <span style={{ color: "hsl(var(--burgundy))" }}>Matrimony</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            We are committed to making your search for a life partner easier, safer, and more successful.
          </p>
        </motion.div>

        {/* 3-column layout: left features | center images | right features */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left features */}
          <div className="space-y-10">
            {leftFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(var(--gold-accent))" }}>
                  <f.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
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
            <div className="relative w-64 h-80">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-64 rounded-2xl bg-muted border border-border overflow-hidden shadow-lg z-10">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Wedding Photo 1</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-[30%] w-48 h-56 rounded-2xl bg-muted border border-border overflow-hidden shadow-lg z-20">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Wedding Photo 2</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right features */}
          <div className="space-y-10">
            {rightFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(var(--gold-accent))" }}>
                  <f.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
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
