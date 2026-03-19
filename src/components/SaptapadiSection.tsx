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

        {/* Row 1 - 4 blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {steps.slice(0, 4).map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {/* Row 2 - 3 blocks centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-[75%] mx-auto">
          {steps.slice(4).map((step, index) => (
            <StepCard key={step.step} step={step} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaptapadiSection;
