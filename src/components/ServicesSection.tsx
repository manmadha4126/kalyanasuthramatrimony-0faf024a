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
  { price: "₹20,000", duration: "6 Months", key: "6months" as Duration }],

  features: ["Unlimited profiles", "Weekly mail updates", "Profile processing"]
},
{
  title: "Affluent Matrimony",
  highlighted: true,
  badge: "MOST POPULAR",
  plans: [
  { price: "₹38,000", duration: "Premium", key: "premium" as Duration }],

  features: ["Unlimited profiles", "Dedicated Relationship Manager", "Daily feedback", "Personal enquiry", "Up to settlement", "Well-settled profiles"],
  benefits: ["IAS / IPS / Scientists / Group 1 Officials", "IIT / IIM / CA / NIT / BITS Pilani", "NRI Matches", "Annual Package Above ₹13L", "Entrepreneurs", "Doctors"]
},
{
  title: "Online Services",
  highlighted: false,
  plans: [
  { price: "₹7,000", duration: "3 Months", key: "3months" as Duration },
  { price: "₹10,000", duration: "6 Months", key: "6months" as Duration },
  { price: "₹15,000", duration: "1 Year", key: "1year" as Duration }],

  features: ["Full online access", "Profile browsing", "Direct connect"]
}];


const durationOptions: {key: Duration;label: string;}[] = [
{ key: "3months", label: "3 Months" },
{ key: "6months", label: "6 Months" },
{ key: "1year", label: "1 Year" },
{ key: "premium", label: "Premium" }];


const owners = [
{ name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
{ name: "Kavya", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" }];


const ServicesSection = () => {
  const [selected, setSelected] = useState<Duration | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showOwners, setShowOwners] = useState(false);

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(220, 60%, 10%) 0%, hsl(240, 50%, 15%) 40%, hsl(210, 55%, 12%) 100%)" }}>
      
      {/* Decorative marriage-themed top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%))" }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)), hsl(348, 56%, 27%), hsl(var(--gold-accent)))" }} />

      {/* Decorative paisley corners */}
      <div className="absolute top-4 left-4 w-32 h-32 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="10" cy="10" r="40" stroke="hsl(var(--gold-accent))" strokeWidth="0.8" /><circle cx="10" cy="10" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="0.5" /></svg>
      </div>
      <div className="absolute top-4 right-4 w-32 h-32 opacity-[0.08] pointer-events-none" style={{ transform: "scaleX(-1)" }}>
        <svg viewBox="0 0 100 100" fill="none"><circle cx="10" cy="10" r="40" stroke="hsl(var(--gold-accent))" strokeWidth="0.8" /><circle cx="10" cy="10" r="25" stroke="hsl(var(--gold-accent))" strokeWidth="0.5" /></svg>
      </div>

      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--gold-accent)), transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(220, 80%, 60%), transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "hsl(var(--gold-accent))", fontFamily: "'Lato', sans-serif" }}>✦ Premium Assisted Services ✦</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 text-primary-foreground" style={{ fontFamily: "'Alex Brush', cursive", color: "white", textShadow: "2px 3px 6px hsla(0, 0%, 0%, 0.3)", letterSpacing: "0.02em" }}>Exclusive Services from <span style={{ color: "white" }}>Kalyanasuthra Matrimony</span></h2>
          <p className="max-w-xl mx-auto mb-3" style={{ color: "hsl(220, 20%, 75%)" }}>Our dedicated relationship managers provide profile handling, match filtering, feedback support, and direct communication management.</p>
          <div className="gold-divider" />
        </motion.div>

        {/* Duration Filter */}
        <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <span className="self-center text-sm font-semibold mr-1" style={{ color: "hsl(220, 20%, 70%)" }}>Filter by duration:</span>
          {durationOptions.map((opt) =>
          <button key={opt.key} onClick={() => setSelected(selected === opt.key ? null : opt.key)} className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200" style={selected === opt.key ? { background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)", borderColor: "hsl(var(--gold-accent))" } : { background: "transparent", color: "hsl(var(--gold-accent))", borderColor: "hsl(var(--gold-accent) / 0.6)" }}>
              {opt.label}
            </button>
          )}
          <button onClick={() => setSelected(null)} className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200" style={selected === null ? { background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)", borderColor: "hsl(var(--gold-accent))" } : { background: "transparent", color: "hsl(var(--gold-accent))", borderColor: "hsl(var(--gold-accent) / 0.6)" }}>
            See All
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {packages.map((pkg, pi) => {
            const visiblePlans = selected ? pkg.plans.filter((p) => p.key === selected) : pkg.plans;
            if (selected && visiblePlans.length === 0) return null;
            const cardColors = [
            { bg: "hsl(200, 65%, 93%)", border: "hsl(200, 55%, 80%)", accent: "hsl(200, 55%, 35%)", dot: "hsl(200, 55%, 40%)" },
            { bg: "hsl(160, 55%, 92%)", border: "hsl(160, 45%, 76%)", accent: "hsl(160, 40%, 32%)", dot: "hsl(160, 40%, 35%)" },
            { bg: "hsl(270, 50%, 93%)", border: "hsl(270, 40%, 82%)", accent: "hsl(270, 45%, 40%)", dot: "hsl(270, 45%, 45%)" }][
            pi];
            return (
              <motion.div
                key={pkg.title}
                className="rounded-2xl p-5 shadow-xl flex flex-col relative overflow-hidden"
                style={{
                  background: cardColors.bg,
                  border: `1.5px solid ${cardColors.border}`
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: pi * 0.1 }}>
                
                {pkg.badge &&
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: cardColors.accent }}>★ {pkg.badge}</span>
                  </div>
                }

                <h3 className="text-lg font-bold mb-3" style={{ color: "hsl(220, 50%, 15%)", fontFamily: "system-ui, sans-serif" }}>{pkg.title}</h3>

                <div className="space-y-0.5 mb-4">
                  {visiblePlans.map((plan, i) =>
                  <div key={i} className="flex items-baseline gap-2">
                      <span className="text-xl font-bold" style={{ color: cardColors.accent, fontFamily: "system-ui, sans-serif" }}>{plan.price}</span>
                      <span className="text-xs" style={{ color: "hsl(220, 15%, 50%)", fontFamily: "system-ui, sans-serif" }}>/ {plan.duration}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-2">
                  {pkg.features.map((f) =>
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "hsl(220, 20%, 30%)" }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cardColors.dot }} />
                      {f}
                    </li>
                  )}
                </ul>

                {pkg.benefits && !selected &&
                <div className="mt-3">
                    <p className="text-xs uppercase tracking-wider mb-1.5 font-semibold" style={{ color: cardColors.accent }}>Benefits For</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.benefits.map((b) =>
                    <span key={b} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${cardColors.border}`, color: cardColors.accent }}>{b}</span>
                    )}
                    </div>
                  </div>
                }
              </motion.div>);

          })}
        </div>

      </div>

      </div>

      <ConsultationForm open={showConsultation} onClose={() => setShowConsultation(false)} />
    </section>);

};

export default ServicesSection;