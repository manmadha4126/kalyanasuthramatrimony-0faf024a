import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus, Users, MessageCircleHeart } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Sign Up",
    description: "Register for free & create your Matrimony Profile with complete details",
    gradient: "linear-gradient(135deg, hsl(28, 90%, 52%), hsl(32, 92%, 58%))",
    shadow: "hsla(28, 90%, 52%, 0.4)",
    accent: "hsl(28, 90%, 52%)",
  },
  {
    number: 2,
    icon: Users,
    title: "Connect",
    description: "Browse & connect with verified matches that suit your preferences",
    gradient: "linear-gradient(135deg, hsl(280, 60%, 50%), hsl(280, 70%, 60%))",
    shadow: "hsla(280, 60%, 50%, 0.4)",
    accent: "hsl(280, 60%, 50%)",
  },
  {
    number: 3,
    icon: MessageCircleHeart,
    title: "Interact",
    description: "Become a Premium Member & start meaningful conversations",
    gradient: "linear-gradient(135deg, hsl(174, 70%, 42%), hsl(174, 80%, 50%))",
    shadow: "hsla(174, 70%, 42%, 0.4)",
    accent: "hsl(174, 70%, 42%)",
  },
];

const ACCENT = "hsl(220, 65%, 48%)";

const categories: Record<string, string[]> = {
  "Mother Tongue": ["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "Oriya", "Rajasthani", "Urdu"],
  "Caste": ["Brahmin", "Reddy", "Kamma", "Kapu", "Naidu", "Velama", "Vysya", "Yadav", "Mudaliar", "Chettiar"],
  "Religion": ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi"],
  "City": ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi", "Pune", "Kolkata", "Vizag", "Vijayawada", "Tirupati"],
  "Occupation": ["Software Engineer", "Doctor", "Business", "Government", "Teacher", "Lawyer", "CA", "Manager"],
  "State": ["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Maharashtra", "Kerala", "Delhi", "Gujarat"],
};

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Mother Tongue");

  return (
    <section
      id="about"
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: "hsl(0, 0%, 100%)" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              color: "hsl(220, 25%, 20%)",
            }}
          >
            The Wedding Chapter Starts Here...
          </h2>
          <p
            className="mt-3 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "hsl(220, 15%, 40%)" }}
          >
            Your journey to a beautiful marriage starts with three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <motion.div
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: step.gradient,
                  boxShadow: `0 10px 30px ${step.shadow}`,
                }}
                whileHover={{ scale: 1.1, boxShadow: `0 15px 40px ${step.shadow}` }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <step.icon size={44} color="white" strokeWidth={1.8} />
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "hsl(0, 0%, 100%)",
                    color: step.accent,
                    boxShadow: "0 3px 10px hsla(0, 0%, 0%, 0.12)",
                    border: `2px solid ${step.accent}33`,
                  }}
                >
                  {step.number}
                </span>
              </motion.div>

              <h3
                className="text-xl md:text-2xl font-bold mt-3 mb-2"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  color: step.accent,
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm md:text-base leading-relaxed max-w-[260px]"
                style={{ color: "hsl(220, 15%, 35%)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Browse Matrimonial Profiles By - moved here */}
        <div className="mt-20">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="tracking-[0.25em] uppercase font-semibold mb-2 text-lg text-accent">
              Browse
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "hsl(220, 30%, 18%)" }}>
              <span className="text-accent-foreground">Matrimonial</span> Profiles by
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(categories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === cat ? ACCENT : "hsl(220, 20%, 92%)",
                  color: activeTab === cat ? "white" : "hsl(220, 20%, 40%)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tags */}
          <motion.div
            key={activeTab}
            className="flex flex-wrap justify-center gap-x-1 gap-y-2 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories[activeTab].map((item, i) => (
              <span key={item} className="text-sm" style={{ color: "hsl(220, 20%, 35%)" }}>
                {item}
                {i < categories[activeTab].length - 1 && (
                  <span className="mx-2" style={{ color: "hsl(0, 0%, 75%)" }}>|</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
