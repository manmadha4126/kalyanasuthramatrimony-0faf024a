import { motion } from "framer-motion";
import weddingPhoto1 from "@/assets/wedding-photo-1.jpeg";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={weddingPhoto1}
                alt="Happy wedding couple"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary uppercase tracking-wide">
              About Us
            </h2>
            <div className="w-16 h-1 rounded-full" style={{ background: "hsl(var(--gold-accent))" }} />
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Established in <strong className="text-foreground">2020 at Tirupati</strong>, Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing families together with trust, values, and modern technology. We believe that marriage is a sacred bond, and finding the right life partner is one of the most important decisions in life.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Our team of experienced relationship managers works closely with families to understand their preferences, values, and aspirations to find the perfect match.
            </p>
            <a
              href="#contact"
              className="btn-burgundy inline-block text-sm font-semibold px-6 py-3 rounded-lg"
            >
              Read More
            </a>

            <div className="pt-4 border-t border-border">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary leading-snug">
                Exclusive Service from<br />
                Kalyanasuthra Matrimony
              </h3>
              <a
                href="#contact"
                className="btn-burgundy inline-block text-sm font-semibold px-6 py-3 rounded-lg mt-4"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;