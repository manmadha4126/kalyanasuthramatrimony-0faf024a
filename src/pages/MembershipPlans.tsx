import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConsultationForm from "@/components/ConsultationForm";

const packages = [
  {
    name: "Online Services",
    color: "hsl(220, 55%, 45%)",
    plans: [
      { price: "₹7,000", duration: "3 Months" },
      { price: "₹10,000", duration: "6 Months" },
      { price: "₹15,000", duration: "1 Year" },
    ],
    features: ["Full online access", "Profile browsing", "Direct connect"],
  },
  {
    name: "Support Matrimony",
    color: "hsl(28, 70%, 45%)",
    plans: [
      { price: "₹13,000", duration: "3 Months" },
      { price: "₹20,000", duration: "6 Months" },
      { price: "₹30,000", duration: "1 Year" },
    ],
    features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"],
  },
  {
    name: "Affluent Matrimony",
    color: "hsl(160, 45%, 32%)",
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
  },
];

const MembershipPlans = () => {
  const navigate = useNavigate();
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, hsl(140, 30%, 85%) 0%, hsl(180, 25%, 88%) 50%, hsl(50, 40%, 90%) 100%)" }}>
      {/* Header */}
      <div className="py-6 px-4" style={{ background: "hsla(0,0%,0%,0.35)" }}>
        <div className="container mx-auto max-w-6xl flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white font-semibold hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="flex-1 text-center">
            <span className="text-xs text-white/70">Home » Select Membership Package</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(220, 30%, 18%)" }}
          >
            Select Membership Package
          </h1>
          <div className="h-[2px] w-20 mx-auto" style={{ background: "hsl(var(--gold-accent))" }} />
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, pi) => (
            <motion.div
              key={pkg.name}
              className="rounded-2xl bg-white shadow-xl overflow-hidden relative flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pi * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {pkg.badge && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 px-5 py-1 rounded-b-lg text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: "hsl(350, 70%, 55%)" }}
                >
                  {pkg.badge}
                </div>
              )}

              <div className="p-6 pt-8 text-center border-b" style={{ borderColor: "hsl(0, 0%, 90%)" }}>
                <h3 className="text-xl font-bold mb-1" style={{ color: pkg.color, fontFamily: "'DM Serif Display', serif" }}>
                  {pkg.name}
                </h3>
                <div className="h-[3px] w-12 mx-auto rounded-full mb-4" style={{ background: pkg.color }} />

                <div className="space-y-3">
                  {pkg.plans.map((plan, i) => (
                    <div key={i}>
                      <span className="text-3xl font-extrabold" style={{ color: pkg.color }}>{plan.price}</span>
                      <span className="text-sm font-medium ml-2" style={{ color: "hsl(0, 0%, 50%)" }}>/ {plan.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1">
                <ul className="space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "hsl(220, 20%, 25%)" }}>
                      <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: "hsl(140, 60%, 40%)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowConsultation(true)}
                  className="w-full py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
                  style={
                    pi === 0
                      ? { background: "hsl(350, 70%, 55%)", color: "white" }
                      : { background: "transparent", border: "2px solid hsl(350, 70%, 55%)", color: "hsl(350, 70%, 55%)" }
                  }
                >
                  Get Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Get a Call Back */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-semibold mb-4" style={{ color: "hsl(220, 20%, 30%)" }}>OR</p>
          <a
            href="tel:9553306667"
            className="inline-block px-10 py-3.5 rounded-full text-lg font-bold text-white transition-all hover:scale-105"
            style={{ background: "hsl(160, 45%, 35%)" }}
          >
            Get a Call Back
          </a>
        </motion.div>
      </div>

      <ConsultationForm open={showConsultation} onClose={() => setShowConsultation(false)} />
    </div>
  );
};

export default MembershipPlans;
