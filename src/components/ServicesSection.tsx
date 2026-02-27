import { useState } from "react";
import { motion } from "framer-motion";
import ConsultationForm from "@/components/ConsultationForm";

type Duration = "3months" | "6months" | "1year" | "premium";

const packages = [
  {
    title: "Support Matrimony",
    highlighted: false,
    plans: [
      { price: "₹13,000", duration: "3 Months", key: "3months" as Duration, features: ["Unlimited number of profiles will be provided", "Weekly once we will mail you & process the selected ones"] },
      { price: "₹20,000", duration: "6 Months", key: "6months" as Duration, features: ["Unlimited number of profiles will be provided", "Weekly once we will mail you & process the selected ones", "Normal profiles will be given in this package"] },
    ],
  },
  {
    title: "Affluent Matrimony",
    highlighted: true,
    plans: [
      { price: "₹38,000", duration: "Premium", key: "premium" as Duration, features: ["Unlimited number of profiles will be provided", "Weekly once we will mail you & process the selected ones", "A dedicated Relationship Manager will be allotted to oversee your profile", "Daily feedback will be provided", "Well settled profiles will be given", "Up to settlement the service will be provided", "We will personally make enquiry of full details of bride/groom"] },
    ],
    benefits: ["IAS / IPS / Scientists / Group 1 Officials", "IIT / IIM / CA / NIT / BITS Pilani", "NRI Matches", "Annual Package Above ₹13L", "Entrepreneurs", "Doctors"],
  },
  {
    title: "Online Services",
    highlighted: false,
    plans: [
      { price: "₹7,000", duration: "3 Months", key: "3months" as Duration, features: ["Full online access to profiles"] },
      { price: "₹10,000", duration: "6 Months", key: "6months" as Duration, features: ["Full online access to profiles"] },
      { price: "₹15,000", duration: "1 Year", key: "1year" as Duration, features: ["Full online access to profiles"] },
    ],
  },
];

const durationOptions: { key: Duration; label: string }[] = [
  { key: "3months", label: "3 Months" },
  { key: "6months", label: "6 Months" },
  { key: "1year", label: "1 Year" },
  { key: "premium", label: "Premium" },
];

const ServicesSection = () => {
  const [selected, setSelected] = useState<Duration | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(220, 60%, 10%) 0%, hsl(240, 50%, 15%) 40%, hsl(210, 55%, 12%) 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.6), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent) / 0.6), transparent)" }} />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--gold-accent)), transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(220, 80%, 60%), transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "hsl(var(--gold-accent))", fontFamily: "'Lato', sans-serif" }}>✦ Premium Assisted Services ✦</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: "white" }}>Assisted Matrimony Services</h2>
          <p className="max-w-xl mx-auto mb-3" style={{ color: "hsl(220, 20%, 75%)" }}>Our dedicated relationship managers provide profile handling, match filtering, feedback support, and direct communication management.</p>
          <div className="gold-divider" />
        </motion.div>

        {/* Duration Filter */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-10" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="self-center text-sm font-semibold mr-1" style={{ color: "hsl(220, 20%, 70%)" }}>Filter by duration:</span>
          {durationOptions.map((opt) => (
            <button key={opt.key} onClick={() => setSelected(selected === opt.key ? null : opt.key)} className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200" style={selected === opt.key ? { background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)", borderColor: "hsl(var(--gold-accent))" } : { background: "transparent", color: "hsl(var(--gold-accent))", borderColor: "hsl(var(--gold-accent) / 0.6)" }}>
              {opt.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, pi) => {
            const visiblePlans = selected ? pkg.plans.filter((p) => p.key === selected) : pkg.plans;
            if (selected && visiblePlans.length === 0) return null;
            return (
              <motion.div key={pkg.title} className="rounded-2xl p-6 shadow-xl" style={pkg.highlighted ? { background: "linear-gradient(135deg, hsl(var(--burgundy) / 0.9), hsl(var(--deep-rose) / 0.8))", border: "2px solid hsl(var(--gold-accent) / 0.8)" } : { background: "hsl(220, 40%, 18%)", border: "1px solid hsl(220, 30%, 28%)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: pi * 0.1 }}>
                <h3 className="font-serif text-lg font-bold mb-4" style={{ color: pkg.highlighted ? "hsl(var(--gold-accent))" : "white" }}>{pkg.title}</h3>
                <div className="space-y-4">
                  {visiblePlans.map((plan, i) => (
                    <div key={i} className="pb-3 last:border-0" style={{ borderBottom: "1px solid hsl(220, 30%, 30%)" }}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl font-bold" style={{ color: pkg.highlighted ? "white" : "hsl(var(--gold-accent))", fontFamily: "'Georgia', serif", letterSpacing: "0.02em", fontVariantNumeric: "oldstyle-nums" }}>{plan.price}</span>
                        <span className="text-xs" style={{ color: "hsl(220, 20%, 65%)" }}>/ {plan.duration}</span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs" style={{ color: pkg.highlighted ? "hsl(0, 0%, 90%)" : "hsl(220, 15%, 75%)" }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: "hsl(var(--gold-accent))" }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {pkg.benefits && !selected && (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: "hsl(var(--gold-accent))" }}>Benefits For</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.benefits.map((b) => (
                        <span key={b} className="text-[10px] px-2 py-1 rounded-full font-medium" style={{ background: "hsl(0, 0%, 100% / 0.15)", color: "hsl(0, 0%, 95%)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* CTA bridging into contact section - centered on the boundary */}
      <div className="relative z-20" style={{ marginBottom: "-60px", marginTop: "40px" }}>
        <motion.div className="max-w-3xl mx-auto text-center rounded-2xl py-8 px-8 shadow-2xl" style={{ background: "linear-gradient(135deg, hsl(220, 50%, 14%) 0%, hsl(230, 45%, 18%) 50%, hsl(220, 50%, 14%) 100%)", border: "1px solid hsl(var(--gold-accent) / 0.3)", boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)" }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "white", fontFamily: "'DM Serif Display', serif" }}>Want to know more about Assisted Service?</h3>
          {selected && (
            <p className="text-sm mb-4" style={{ color: "hsl(220, 20%, 70%)" }}>
              Selected: <span className="font-semibold" style={{ color: "hsl(var(--gold-accent))" }}>{durationOptions.find(d => d.key === selected)?.label}</span> plan
            </p>
          )}
          <button
            onClick={() => setShowConsultation(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 mt-3 hover:scale-105"
            style={{ background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Get Free Consultation
          </button>
        </motion.div>
      </div>

      <ConsultationForm open={showConsultation} onClose={() => setShowConsultation(false)} />
    </section>
  );
};

export default ServicesSection;
