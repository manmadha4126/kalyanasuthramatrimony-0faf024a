import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-cream py-20 relative overflow-hidden">
      {/* Subtle gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--gold)) 1px, transparent 1px), radial-gradient(circle at 80% 50%, hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "hsl(var(--gold))" }}>
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Us – Kalyanasuthra Matrimony
          </h2>
          <div className="ornament-line mt-4" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              Established in <strong className="text-foreground">2020 at Tirupati</strong>, Kalyanasuthra Matrimony is
              a traditional marriage matching company dedicated to bringing families together with trust, values, and
              modern technology.
            </p>
            <ul className="space-y-4">
              {[
                "10+ years experienced relationship managers",
                "Strong expertise in NRI family match setting",
                "Traditional values combined with modern technology",
                "Personalized assistance for every client",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: "hsl(var(--gold))" }}
                  />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl gold-border flex items-center justify-center"
                  style={{ background: "hsl(var(--cream-dark))" }}
                >
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Upload Photo {i}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
