import { motion } from "framer-motion";
import weddingPhoto1 from "@/assets/wedding-photo-1.jpeg";
import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Top row: overlapping large image + text */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-0">
          {/* Large image - overlaps slightly */}
          <motion.div
            className="lg:w-[48%] relative z-10 -mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl lg:-mr-8">
              <img
                src={weddingPhoto1}
                alt="Happy wedding couple"
                className="w-full h-[380px] lg:h-[460px] object-cover"
              />
            </div>
          </motion.div>

          {/* Text content - right side with background card */}
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

        {/* Three images row */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 mt-14 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[wedding1, wedding2, wedding3].map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
              <img
                src={img}
                alt={`Wedding couple ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>

        {/* Exclusive Service block */}
        <motion.div
          className="text-center mt-14 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
    </section>
  );
};

export default AboutSection;
