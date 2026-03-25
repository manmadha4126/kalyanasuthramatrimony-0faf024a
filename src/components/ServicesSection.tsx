import { motion } from "framer-motion";
import { Check, X, Crown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const freeFeatures = [
  { text: "Send Express Interests", available: true },
  { text: "Send Photo Requests", available: true },
  { text: "Search Suitable Profiles", available: true },
  { text: "View Contact Detail of the Profile", available: false },
  { text: "Bold Listing of your profile", available: false },
  { text: "Send Unlimited Personalized Messages", available: false },
  { text: "Astro Matching Profiles", available: false },
  { text: "Initiate the Chat from your end", available: false },
  { text: "Dedicated Relationship Manager", available: false },
];

const paidFeatures = [
  { text: "Send Express Interests", available: true },
  { text: "Send Photo Requests", available: true },
  { text: "Search Suitable Profiles", available: true },
  { text: "View Contact Detail of the Profile", available: true },
  { text: "Bold Listing of your profile", available: true },
  { text: "Send Unlimited Personalized Messages", available: true },
  { text: "Astro Matching Profiles", available: true },
  { text: "Initiate the Chat from your end", available: true },
  { text: "Dedicated Relationship Manager", available: true },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(220, 60%, 10%) 0%, hsl(240, 50%, 15%) 40%, hsl(210, 55%, 12%) 100%)",
      }}
    >
      {/* Decorative borders */}
      <div
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background:
            "linear-gradient(90deg, hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%))",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-2"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)))",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-sm uppercase tracking-[0.2em] font-semibold mb-2"
            style={{ color: "hsl(var(--gold-accent))", fontFamily: "'Lato', sans-serif" }}
          >
            ✦ Premium Assisted Services ✦
          </p>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-3 text-primary-foreground"
            style={{
              fontFamily: "'Alex Brush', cursive",
              color: "white",
              textShadow: "2px 3px 6px hsla(0, 0%, 0%, 0.3)",
              letterSpacing: "0.02em",
            }}
          >
            Exclusive Services from{" "}
            <span style={{ color: "white" }}>Kalyanasuthra Matrimony</span>
          </h2>
          <p className="max-w-xl mx-auto mb-3" style={{ color: "hsl(220, 20%, 75%)" }}>
            Our dedicated relationship managers provide profile handling, match filtering,
            feedback support, and direct communication management.
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* Free & Paid Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Member */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            <div className="px-8 py-5" style={{ background: "linear-gradient(135deg, hsl(210, 70%, 50%), hsl(210, 80%, 60%))" }}>
              <div className="flex items-center gap-3">
                <Sparkles size={24} className="text-white" />
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Free Member
                </h3>
              </div>
            </div>
            <div className="bg-white p-6">
              <ul className="space-y-3.5 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.available ? (
                      <Check size={18} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(350, 70%, 55%)" }} />
                    ) : (
                      <X size={18} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(0, 0%, 70%)" }} />
                    )}
                    <span
                      className={`text-sm font-medium ${!f.available ? "line-through" : ""}`}
                      style={{ color: f.available ? "hsl(220, 20%, 20%)" : "hsl(0, 0%, 60%)" }}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-3 rounded-full text-base font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, hsl(350, 70%, 55%), hsl(350, 80%, 60%))" }}
              >
                Register FREE
              </button>
            </div>
          </motion.div>

          {/* Paid Member */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            <div className="px-8 py-5" style={{ background: "linear-gradient(135deg, hsl(210, 70%, 50%), hsl(210, 80%, 60%))" }}>
              <div className="flex items-center gap-3">
                <Crown size={24} className="text-white" />
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Paid Member
                </h3>
              </div>
            </div>
            <div className="bg-white p-6">
              <ul className="space-y-3.5 mb-8">
                {paidFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(350, 70%, 55%)" }} />
                    <span className="text-sm font-bold" style={{ color: "hsl(220, 20%, 20%)" }}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/membership-plans")}
                className="w-full py-3 rounded-full text-base font-bold transition-all hover:scale-105"
                style={{
                  background: "transparent",
                  border: "2px solid hsl(350, 70%, 55%)",
                  color: "hsl(350, 70%, 55%)",
                }}
              >
                View Membership Plans
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
