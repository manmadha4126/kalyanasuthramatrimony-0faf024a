import { motion } from "framer-motion";
import { Check, Star, Sparkles, Crown } from "lucide-react";

const packages = [
  {
    title: "Online Services",
    icon: Sparkles,
    plans: [
      { price: "₹7,000", duration: "3 Months" },
      { price: "₹10,000", duration: "6 Months" },
      { price: "₹15,000", duration: "1 Year" },
    ],
    features: ["Full online access", "Profile browsing", "Direct connect"],
    gradient: "linear-gradient(145deg, hsl(220, 55%, 96%), hsl(220, 60%, 92%))",
    border: "hsl(220, 50%, 85%)",
    accent: "hsl(220, 55%, 45%)",
    iconBg: "linear-gradient(135deg, hsl(220, 55%, 50%), hsl(220, 65%, 60%))",
  },
  {
    title: "Support Matrimony",
    icon: Star,
    plans: [
      { price: "₹13,000", duration: "3 Months" },
      { price: "₹20,000", duration: "6 Months" },
    ],
    features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"],
    gradient: "linear-gradient(145deg, hsl(28, 80%, 95%), hsl(28, 85%, 90%))",
    border: "hsl(28, 60%, 80%)",
    accent: "hsl(28, 70%, 42%)",
    iconBg: "linear-gradient(135deg, hsl(28, 80%, 52%), hsl(32, 85%, 58%))",
  },
  {
    title: "Affluent Matrimony",
    icon: Crown,
    badge: "MOST POPULAR",
    plans: [{ price: "₹38,000", duration: "Premium" }],
    features: [
      "Unlimited profiles",
      "Dedicated Relationship Manager",
      "Daily feedback",
      "Personal enquiry",
      "Up to settlement",
      "Well-settled profiles",
    ],
    benefits: [
      "IAS / IPS / Scientists / Group 1 Officials",
      "IIT / IIM / CA / NIT / BITS Pilani",
      "NRI Matches",
      "Annual Package Above ₹13L",
      "Entrepreneurs",
      "Doctors",
    ],
    gradient: "linear-gradient(145deg, hsl(160, 45%, 94%), hsl(160, 50%, 89%))",
    border: "hsl(160, 40%, 75%)",
    accent: "hsl(160, 45%, 32%)",
    iconBg: "linear-gradient(135deg, hsl(160, 50%, 38%), hsl(160, 60%, 45%))",
  },
];

const ServicesSection = () => {
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

      {/* Decorative glows */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--gold-accent)), transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220, 80%, 60%), transparent 70%)",
          transform: "translate(-30%, 30%)",
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

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, pi) => (
            <motion.div
              key={pkg.title}
              className="rounded-2xl p-6 shadow-2xl flex flex-col relative overflow-hidden"
              style={{
                background: pkg.gradient,
                border: `2px solid ${pkg.border}`,
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pi * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Badge */}
              {pkg.badge && (
                <div
                  className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: pkg.iconBg }}
                >
                  {pkg.badge}
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: pkg.iconBg }}
              >
                <pkg.icon size={22} color="white" />
              </div>

              <h3
                className="text-xl font-bold mb-4"
                style={{ color: pkg.accent, fontFamily: "'DM Serif Display', serif" }}
              >
                {pkg.title}
              </h3>

              {/* Pricing */}
              <div className="space-y-2 mb-5">
                {pkg.plans.map((plan, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-2 px-3 py-2 rounded-lg"
                    style={{ background: "hsla(0,0%,100%,0.6)" }}
                  >
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: pkg.accent, fontFamily: "system-ui, sans-serif" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "hsl(220, 15%, 45%)" }}
                    >
                      / {plan.duration}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px w-full mb-4" style={{ background: pkg.border }} />

              {/* Features */}
              <ul className="space-y-2.5 flex-1">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "hsl(220, 20%, 25%)" }}
                  >
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: pkg.accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Benefits */}
              {pkg.benefits && (
                <div className="mt-4 pt-3" style={{ borderTop: `1px dashed ${pkg.border}` }}>
                  <p
                    className="text-xs uppercase tracking-wider mb-2 font-bold"
                    style={{ color: pkg.accent }}
                  >
                    Benefits For
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          background: `${pkg.border}`,
                          color: pkg.accent,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
