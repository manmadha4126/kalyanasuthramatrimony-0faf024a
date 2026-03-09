import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, User, ChevronDown, ChevronUp } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

type Duration = "3months" | "6months" | "1year" | "premium";

const packages = [
  {
    title: "Support Matrimony",
    highlighted: false,
    plans: [
      { price: "₹13,000", duration: "3 Months", key: "3months" as Duration },
      { price: "₹20,000", duration: "6 Months", key: "6months" as Duration },
    ],
    features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"],
  },
  {
    title: "Affluent Matrimony",
    highlighted: true,
    badge: "MOST POPULAR",
    plans: [
      { price: "₹38,000", duration: "Premium", key: "premium" as Duration },
    ],
    features: ["Unlimited profiles", "Dedicated Relationship Manager", "Daily feedback", "Personal enquiry", "Up to settlement", "Well-settled profiles"],
    benefits: ["IAS / IPS / Scientists / Group 1 Officials", "IIT / IIM / CA / NIT / BITS Pilani", "NRI Matches", "Annual Package Above ₹13L", "Entrepreneurs", "Doctors"],
  },
  {
    title: "Online Services",
    highlighted: false,
    plans: [
      { price: "₹7,000", duration: "3 Months", key: "3months" as Duration },
      { price: "₹10,000", duration: "6 Months", key: "6months" as Duration },
      { price: "₹15,000", duration: "1 Year", key: "1year" as Duration },
    ],
    features: ["Full online access", "Profile browsing", "Direct connect"],
  },
];

const durationOptions: { key: Duration; label: string }[] = [
  { key: "3months", label: "3 Months" },
  { key: "6months", label: "6 Months" },
  { key: "1year", label: "1 Year" },
  { key: "premium", label: "Premium" },
];

const owners = [
  { name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
  { name: "Drakshayani", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" },
];

const ServicesSection = () => {
  const [selected, setSelected] = useState<Duration | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showOwners, setShowOwners] = useState(false);

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(220, 60%, 10%) 0%, hsl(240, 50%, 15%) 40%, hsl(210, 55%, 12%) 100%)" }}
    >
      {/* Decorative marriage-themed top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%))" }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)))" }} />

      {/* Decorative paisley corners */}
      <div className="absolute top-4 left-4 w-32 h-32 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="10" cy="10" r="40" stroke="hsl(var(--gold-accent))" strokeWidth="0.8"/><circle cx="10" cy="10" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="0.5"/></svg>
      </div>
      <div className="absolute top-4 right-4 w-32 h-32 opacity-[0.08] pointer-events-none" style={{ transform: "scaleX(-1)" }}>
        <svg viewBox="0 0 100 100" fill="none"><circle cx="10" cy="10" r="40" stroke="hsl(var(--gold-accent))" strokeWidth="0.8"/><circle cx="10" cy="10" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="0.5"/></svg>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--gold-accent)), transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(220, 80%, 60%), transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "hsl(var(--gold-accent))", fontFamily: "'Lato', sans-serif" }}>✦ Premium Assisted Services ✦</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'DM Serif Display', serif", color: "white" }}>Exclusive Services from Kalyanasuthra Matrimony</h2>
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
          <button onClick={() => setSelected(null)} className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200" style={selected === null ? { background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)", borderColor: "hsl(var(--gold-accent))" } : { background: "transparent", color: "hsl(var(--gold-accent))", borderColor: "hsl(var(--gold-accent) / 0.6)" }}>
            See All
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {packages.map((pkg, pi) => {
            const visiblePlans = selected ? pkg.plans.filter((p) => p.key === selected) : pkg.plans;
            if (selected && visiblePlans.length === 0) return null;
            const cardColors = [
              { bg: "hsl(200, 65%, 93%)", border: "hsl(200, 55%, 80%)", accent: "hsl(200, 55%, 35%)", dot: "hsl(200, 55%, 40%)" },
              { bg: "hsl(160, 55%, 92%)", border: "hsl(160, 45%, 76%)", accent: "hsl(160, 40%, 32%)", dot: "hsl(160, 40%, 35%)" },
              { bg: "hsl(270, 50%, 93%)", border: "hsl(270, 40%, 82%)", accent: "hsl(270, 45%, 40%)", dot: "hsl(270, 45%, 45%)" },
            ][pi];
            return (
              <motion.div
                key={pkg.title}
                className="rounded-2xl p-5 shadow-xl flex flex-col relative overflow-hidden"
                style={{
                  background: cardColors.bg,
                  border: `1.5px solid ${cardColors.border}`,
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: pi * 0.1 }}
              >
                {pkg.badge && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cardColors.accent }}>★ {pkg.badge}</span>
                  </div>
                )}

                <h3 className="text-lg font-bold mb-3" style={{ color: "hsl(220, 50%, 15%)", fontFamily: "system-ui, sans-serif" }}>{pkg.title}</h3>

                <div className="space-y-0.5 mb-4">
                  {visiblePlans.map((plan, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-xl font-bold" style={{ color: cardColors.accent, fontFamily: "system-ui, sans-serif" }}>{plan.price}</span>
                      <span className="text-xs" style={{ color: "hsl(220, 15%, 50%)", fontFamily: "system-ui, sans-serif" }}>/ {plan.duration}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "hsl(220, 20%, 30%)" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cardColors.dot }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {pkg.benefits && !selected && (
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider mb-1.5 font-semibold" style={{ color: cardColors.accent }}>Benefits For</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.benefits.map((b) => (
                        <span key={b} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${cardColors.border}`, color: cardColors.accent }}>{b}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* CTA bridging with Contact Us owner details */}
      <div className="relative z-20 px-4" style={{ marginBottom: "-40px", marginTop: "30px" }}>
        <motion.div
          className="max-w-3xl mx-auto text-center rounded-2xl py-8 px-8 shadow-2xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(220, 60%, 10%) 0%, hsl(240, 50%, 18%) 50%, hsl(210, 55%, 12%) 100%)",
            border: "2px solid hsl(var(--gold-accent) / 0.5)",
            boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          {/* Decorative marriage border line */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent)), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold-accent)), transparent)" }} />
          {/* Small decorative dots */}
          <div className="absolute top-3 left-6 w-2 h-2 rounded-full" style={{ background: "hsl(var(--gold-accent) / 0.5)" }} />
          <div className="absolute top-3 right-6 w-2 h-2 rounded-full" style={{ background: "hsl(var(--gold-accent) / 0.5)" }} />

          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "white", fontFamily: "'DM Serif Display', serif" }}>Want to know more about Assisted Service?</h3>
          {selected && (
            <p className="text-sm mb-4" style={{ color: "hsl(40, 30%, 80%)" }}>
              Selected: <span className="font-semibold" style={{ color: "hsl(var(--gold-accent))" }}>{durationOptions.find(d => d.key === selected)?.label}</span> plan
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <button
              onClick={() => setShowConsultation(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get Free Consultation
            </button>
            <button
              onClick={() => setShowOwners(!showOwners)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 border"
              style={{ borderColor: "hsl(var(--gold-accent) / 0.7)", color: "hsl(var(--gold-accent))", background: "transparent" }}
            >
              <Phone size={18} />
              Contact Us
              {showOwners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {showOwners && (
              <motion.div
                className="mt-6 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {owners.map((owner, i) => (
                  <div key={i} className="rounded-xl p-4 text-left" style={{ background: "hsla(0,0%,100%,0.1)", border: "1px solid hsl(var(--gold-accent) / 0.3)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--gold-accent))" }}>
                        <User size={14} style={{ color: "hsl(348, 56%, 22%)" }} />
                      </div>
                      <span className="text-base font-bold text-white">{owner.name}</span>
                    </div>
                    <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-sm mb-1 transition-colors" style={{ color: "hsl(var(--gold-accent))" }}>
                      <Phone size={14} /> {owner.phone}
                    </a>
                    <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-xs transition-colors" style={{ color: "hsl(40, 30%, 75%)" }}>
                      <Mail size={12} /> {owner.email}
                    </a>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ConsultationForm open={showConsultation} onClose={() => setShowConsultation(false)} />
    </section>
  );
};

export default ServicesSection;
