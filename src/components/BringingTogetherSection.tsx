import { motion } from "framer-motion";
import { Users, ShieldCheck, Lock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "100% Screened Profiles",
    description: "Search by location, community, profession & more from lakhs of active profiles",
  },
  {
    icon: ShieldCheck,
    title: "Verifications by Personal Visit",
    description: "Special listing for profiles verified by our agents through personal visits",
  },
  {
    icon: Lock,
    title: "Control over Privacy",
    description: "Restrict unwanted access to contact details & photos/videos",
  },
];

const BringingTogetherSection = () => {
  return (
    <section className="py-16" style={{ background: "hsl(0, 0%, 97%)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14"
          style={{ background: "hsl(0, 0%, 100%)", boxShadow: "0 8px 40px hsla(0, 0%, 0%, 0.06)" }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "hsl(0, 0%, 50%)" }}>
            MORE THAN 25 YEARS OF
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(220, 30%, 18%)" }}
          >
            Bringing People{" "}
            <span style={{ color: "hsl(190, 85%, 45%)" }}>Together</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "hsl(0, 0%, 95%)" }}
                >
                  <feature.icon size={28} style={{ color: "hsl(220, 30%, 25%)" }} />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "hsl(220, 30%, 18%)" }}>
                  {feature.title}
                </h3>
                <div className="h-[3px] w-10 rounded-full mb-3" style={{ background: "hsl(350, 70%, 50%)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 45%)" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BringingTogetherSection;
