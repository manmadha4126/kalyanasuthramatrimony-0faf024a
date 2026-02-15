import { motion } from "framer-motion";
import { ShieldCheck, Heart, Clock, Award, Headphones, Lock } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "100% Verified Profiles", desc: "Every profile is manually verified for authenticity and trust." },
  { icon: Heart, title: "Personalized Matches", desc: "AI-powered matching combined with human expertise." },
  { icon: Clock, title: "15+ Years Experience", desc: "Decades of matchmaking excellence serving families." },
  { icon: Award, title: "Award Winning Service", desc: "Recognized for outstanding matrimonial services." },
  { icon: Headphones, title: "24/7 Customer Support", desc: "Round-the-clock assistance for all your needs." },
  { icon: Lock, title: "Privacy Guaranteed", desc: "Your data is fully encrypted and protected." },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20" style={{ background: "hsl(40 33% 97%)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "hsl(var(--gold))" }}>
            WHY CHOOSE US
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            India's Most Trusted Matrimony
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to making your search for a life partner easier, safer, and more successful.
          </p>
          <div className="ornament-line mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-luxury"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="icon-gold-container mb-5">
                <f.icon size={24} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
