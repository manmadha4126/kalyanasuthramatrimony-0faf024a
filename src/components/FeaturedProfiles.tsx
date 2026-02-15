import { motion } from "framer-motion";

const FeaturedProfiles = () => {
  const placeholders = Array.from({ length: 8 });

  return (
    <section className="py-20 section-rose relative overflow-hidden">
      {/* Subtle rose petal pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 25% 30%, hsl(var(--burgundy)) 2px, transparent 2px), radial-gradient(circle at 75% 70%, hsl(var(--burgundy)) 1.5px, transparent 1.5px)`, backgroundSize: "80px 80px" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">Featured Profiles</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Male */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-primary mb-6 text-center">Groom Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {placeholders.map((_, i) => (
                <motion.div
                  key={`m${i}`}
                  className="aspect-[3/4] rounded-xl bg-card border border-border overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-muted mb-2" />
                    <p className="text-xs text-primary font-semibold">Profile {i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Female */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-primary mb-6 text-center">Bride Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {placeholders.map((_, i) => (
                <motion.div
                  key={`f${i}`}
                  className="aspect-[3/4] rounded-xl bg-card border border-border overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-muted mb-2" />
                    <p className="text-xs text-primary font-semibold">Profile {i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 rounded-xl py-4 px-6 text-center" style={{ background: "hsl(var(--burgundy-light))" }}>
          <p className="text-sm font-medium text-primary">
            Contact for more profiles: <span className="font-bold">📞 9553306667</span> | <span className="font-bold">📞 9866288767</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
