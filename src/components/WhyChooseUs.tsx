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
    <section id="why-us" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            India's Most Trusted Matrimony
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            We are committed to making your search for a life partner easier, safer, and more successful.
          </p>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-clean"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="icon-burgundy-circle mb-4">
                <f.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
