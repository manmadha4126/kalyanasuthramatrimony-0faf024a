import { motion } from "framer-motion";
import aboutMain from "@/assets/about-main.png";
import wedding1 from "@/assets/wedding-1.jpeg";
import wedding2 from "@/assets/wedding-2.jpeg";
import wedding3 from "@/assets/wedding-3.jpeg";
import wedding4 from "@/assets/wedding-4.jpeg";
import wedding5 from "@/assets/wedding-5.jpeg";

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

    {/* Exclusive Service - Separate Section */}
    <section className="py-16 bg-primary/10">
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
    </section>

    {/* Wedding images gallery */}
    <section>
      {/* First row: 2 images on sides, full-frame image in center */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {/* Image 1 */}
        <motion.div
          className="overflow-hidden aspect-[3/4] cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={wedding1}
            alt="Wedding couple 1"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 2 - Full frame spanning 2 columns */}
        <motion.div
          className="overflow-hidden aspect-[3/4] md:aspect-auto md:col-span-2 cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <img
            src={wedding2}
            alt="Wedding couple 2"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 3 */}
        <motion.div
          className="overflow-hidden aspect-[3/4] cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img
            src={wedding3}
            alt="Wedding couple 3"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>
      </div>

      {/* Second row: 2 equal images */}
      <div className="grid grid-cols-2 gap-0">
        <motion.div
          className="overflow-hidden aspect-[3/4] cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <img
            src={wedding4}
            alt="Wedding couple 4"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>
        <motion.div
          className="overflow-hidden aspect-[3/4] cursor-pointer group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img
            src={wedding5}
            alt="Wedding couple 5"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default AboutSection;
