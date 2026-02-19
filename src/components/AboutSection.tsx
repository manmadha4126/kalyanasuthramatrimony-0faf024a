import { motion } from "framer-motion";
import { ShieldCheck, Heart, ThumbsUp } from "lucide-react";
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
  },
  {
    icon: Heart,
    title: "Best Matches",
    desc: "We provide many options for search member so that any member can meet the best matches according to his/her choice.",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    desc: "We provide member to wider scope of search so that our member get 100% satisfied.",
  },
];

const AboutSection = () => {
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
            className="lg:w-[58%] bg-background rounded-2xl shadow-lg p-8 md:p-10 lg:pl-14 flex flex-col justify-center relative z-0"
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
      <div className="py-16 bg-primary/10">
        <motion.div
          className="container mx-auto px-4 text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-snug">
            Exclusive Service from<br />
            Kalyanasuthra Matrimony
          </h3>
          <a
            href="#contact"
            className="btn-burgundy inline-block text-sm font-semibold px-6 py-3 rounded-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Three features below Contact Us */}
      <div className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-center font-serif text-2xl md:text-3xl font-bold text-primary mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex flex-col items-center text-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: "hsl(var(--burgundy))" }}
                >
                  <f.icon size={28} className="text-white" />
                </div>
                <h4 className="font-serif text-lg font-bold text-primary">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Five wedding images - full screen width, 3:4 ratio, hover zoom */}
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

export default AboutSection;
