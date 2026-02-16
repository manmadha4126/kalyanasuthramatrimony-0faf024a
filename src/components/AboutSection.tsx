import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-cream py-20 bg-slate-300">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            About Us – Kalyanasuthra Matrimony
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.div className="lg:w-1/2 space-y-5" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Established in <strong className="text-foreground">2020 at Tirupati</strong>, Kalyanasuthra Matrimony is a traditional marriage matching company dedicated to bringing families together with trust, values, and modern technology.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              We believe that marriage is a sacred bond, and finding the right life partner is one of the most important decisions in life. Our team of experienced relationship managers works closely with families to understand their preferences, values, and aspirations to find the perfect match.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              With a strong network across India and abroad, we specialize in connecting families from diverse communities, including NRI families seeking culturally compatible matches.
            </p>
            <ul className="space-y-3">
              {[
              "10+ years experienced relationship managers",
              "Strong expertise in NRI family match setting",
              "Traditional values combined with modern technology",
              "Personalized assistance for every client",
              "10,000+ successful matches across India",
              "Dedicated support from profile creation to wedding day"].
              map((item) =>
              <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "hsl(var(--gold-accent))" }} />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div className="lg:w-1/2" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) =>
              <div key={i} className="aspect-square rounded-xl bg-card border border-border flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Upload Photo {i}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;