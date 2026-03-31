import { motion } from "framer-motion";

const cardColors = [
  "linear-gradient(135deg, #1a1aff, #4444ff)",
  "linear-gradient(135deg, #2dd4a8, #5eecc0)",
  "linear-gradient(135deg, #f97316, #fbbf24)",
  "linear-gradient(135deg, #a855f7, #d946ef)",
  "linear-gradient(135deg, #e11d48, #f43f5e)",
  "linear-gradient(135deg, #0891b2, #22d3ee)",
  "linear-gradient(135deg, #16a34a, #4ade80)",
];

const steps = [
  { step: 1, title: "పోషణ", sanskrit: "మొదటి అడుగు", description: "మనం ఒకరికొకరు ఆహారం మరియు జీవనోపాధిని పంచుకుంటూ, జీవితాంతం ఒకరినొకరు పోషించుకుంటాము." },
  { step: 2, title: "బలం", sanskrit: "రెండవ అడుగు", description: "మనం శరీరంలో, మనసులో మరియు ఆత్మలో బలంగా ఎదుగుతాము, శారీరక, మానసిక మరియు ఆధ్యాత్మిక శక్తులను పెంపొందించుకుంటాము." },
  { step: 3, title: "సంపద", sanskrit: "మూడవ అడుగు", description: "మనం ధర్మబద్ధంగా సంపదను సంరక్షిస్తూ, ప్రాపంచిక ఆస్తులను పంచుకుంటూ అభివృద్ధి చెందుతాము." },
  { step: 4, title: "ఆనందం", sanskrit: "నాలుగవ అడుగు", description: "మనం పరస్పర ప్రేమ, గౌరవం మరియు నమ్మకం ద్వారా జ్ఞానం, ఆనందం మరియు సామరస్యాన్ని పొందుతాము." },
  { step: 5, title: "సంతానం", sanskrit: "ఐదవ అడుగు", description: "మనం బలమైన, సద్గుణ సంపన్నమైన మరియు వీరోచిత సంతానంతో ఆశీర్వదించబడతాము." },
  { step: 6, title: "దీర్ఘాయువు", sanskrit: "ఆరవ అడుగు", description: "మనం ప్రేమతో నిండిన సుదీర్ఘ, ఆరోగ్యకరమైన జీవితాన్ని గడుపుతాము." },
  { step: 7, title: "ఐక్యత", sanskrit: "ఏడవ అడుగు", description: "మనం జీవితాంతం సహచరులుగా ఉంటూ, అచంచలమైన విధేయత మరియు భక్తితో ఒకరికొకరు అంకితమవుతాము." },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => (
  <motion.div
    className="group relative rounded-2xl overflow-hidden cursor-pointer"
    style={{
      background: cardColors[index],
      boxShadow: "0 4px 20px hsla(0, 0%, 0%, 0.3)",
    }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{
      scale: 1.08,
      boxShadow: "0 16px 50px -10px hsla(0, 0%, 0%, 0.5)",
    }}
  >
    <div className="flex flex-col items-center text-center p-6 sm:p-7 transition-transform duration-300 group-hover:scale-105">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: "hsla(0, 0%, 100%, 0.25)" }}
      >
        <span className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {step.step}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-1 text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {step.title}
      </h3>
      <span className="text-xs tracking-wider uppercase mb-3" style={{ color: "hsla(0, 0%, 100%, 0.8)" }}>
        {step.sanskrit}
      </span>
      <p className="text-sm leading-relaxed" style={{ color: "hsla(0, 0%, 100%, 0.85)" }}>
        {step.description}
      </p>
    </div>
  </motion.div>
);

const SaptapadiSection = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#000000" }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
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
            className="tracking-widest uppercase text-sm"
            style={{
              color: "#8a8580",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Indian Wedding Matrimony
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {steps.slice(0, 4).map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 max-w-[75%] mx-auto">
          {steps.slice(4).map((step, index) => (
            <StepCard key={step.step} step={step} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaptapadiSection;