import { motion } from "framer-motion";
import { ShieldCheck, Heart, ThumbsUp } from "lucide-react";
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

const OurFeaturesSection = () => {
  return (
    <>
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

      <section>
        <div className="grid grid-cols-5 gap-0">
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

export default OurFeaturesSection;
