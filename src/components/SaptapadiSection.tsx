import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Nourishment",
    sanskrit: "First Step",
    description: "Together we will provide for and support each other, sharing food and sustenance throughout life."
  },
  {
    step: 2,
    title: "Strength",
    sanskrit: "Second Step",
    description: "Together we will grow strong in body, mind and spirit, developing physical, mental and spiritual powers."
  },
  {
    step: 3,
    title: "Prosperity",
    sanskrit: "Third Step",
    description: "Together we will prosper and share our worldly possessions, preserving our wealth through righteous means."
  },
  {
    step: 4,
    title: "Happiness",
    sanskrit: "Fourth Step",
    description: "Together we will acquire knowledge, happiness and harmony through mutual love, respect and trust."
  },
  {
    step: 5,
    title: "Progeny",
    sanskrit: "Fifth Step",
    description: "Together we will be blessed with strong, virtuous and heroic children who carry forward our legacy."
  },
  {
    step: 6,
    title: "Longevity",
    sanskrit: "Sixth Step",
    description: "Together we will live a long, healthy life filled with love, enjoying every season of existence."
  },
  {
    step: 7,
    title: "Unity",
    sanskrit: "Seventh Step",
    description: "Together we will remain lifelong companions, committed to each other with unwavering loyalty and devotion."
  },
];

const SaptapadiSection = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#2b2b2b" }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px"
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - matching the reference image */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4"
            style={{
              color: "#e8e4df",
              fontFamily: "'Playfair Display', 'DM Serif Display', Georgia, serif",
              letterSpacing: "0.01em",
            }}
          >
            Saptapadi – Seven Steps | Indian
            <br />
            Wedding Ceremony
          </h2>
          <p
            className="text-sm tracking-widest uppercase"
            style={{
              color: "#8a8580",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Indian Wedding Guide
          </p>
        </motion.div>

        {/* Seven Steps Blocks */}
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="group relative rounded-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(232,228,223,0.15)",
              }}
            >
              <div className="flex items-start sm:items-center gap-5 sm:gap-8 p-5 sm:p-7">
                {/* Step Number */}
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                  style={{
                    border: "1px solid rgba(232,228,223,0.2)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <span
                    className="text-xl sm:text-2xl font-light"
                    style={{
                      color: "#c9c3bb",
                      fontFamily: "'Playfair Display', 'DM Serif Display', Georgia, serif",
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1.5">
                    <h3
                      className="text-lg sm:text-xl font-light"
                      style={{
                        color: "#e8e4df",
                        fontFamily: "'Playfair Display', 'DM Serif Display', Georgia, serif",
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="text-xs tracking-wider uppercase"
                      style={{ color: "#6b6560", fontFamily: "system-ui, sans-serif" }}
                    >
                      {step.sanskrit}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#8a8580",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Decorative line */}
                <div
                  className="hidden md:block flex-shrink-0 w-16 h-[1px] self-center"
                  style={{ background: "linear-gradient(90deg, rgba(232,228,223,0.15), transparent)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaptapadiSection;
