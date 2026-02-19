import { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919553306667";

type Duration = "3months" | "6months" | "1year" | "premium";

const packages = [
  {
    title: "Support Matrimony",
    highlighted: false,
    plans: [
      { price: "₹13,000", duration: "3 Months", key: "3months" as Duration, features: ["Unlimited Profiles", "Weekly Mail Processing"] },
      { price: "₹20,000", duration: "6 Months", key: "6months" as Duration, features: ["Unlimited Profiles", "Weekly Mail", "Normal Profiles"] },
    ],
  },
  {
    title: "Affluent Matrimony",
    highlighted: true,
    plans: [
      { price: "₹38,000", duration: "Premium", key: "premium" as Duration, features: ["Dedicated Relationship Manager", "Daily Feedback", "Well Settled Profiles", "Up to Settlement Service", "Personal Enquiry"] },
    ],
    benefits: ["IAS / IPS / Scientists", "IIT / IIM / CA / NIT / BITS", "NRI Matches", "13L+ Annual Package", "Entrepreneurs", "Doctors"],
  },
  {
    title: "Online Services",
    highlighted: false,
    plans: [
      { price: "₹7,000", duration: "3 Months", key: "3months" as Duration, features: ["Online Access"] },
      { price: "₹10,000", duration: "6 Months", key: "6months" as Duration, features: ["Online Access"] },
      { price: "₹15,000", duration: "1 Year", key: "1year" as Duration, features: ["Online Access"] },
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

  const handleConsultation = () => {
    const msg = selected
      ? encodeURIComponent(`Hello! I'm interested in the Assisted Matrimony service (${durationOptions.find(d => d.key === selected)?.label} plan). Please provide more details.`)
      : encodeURIComponent("Hello! I'm interested in the Assisted Matrimony service. Please provide more details.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Assisted Matrimony Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            Our dedicated relationship managers provide profile handling, match filtering, feedback support, and direct communication management.
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* Duration Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="self-center text-sm font-semibold text-muted-foreground mr-1">Filter by duration:</span>
          {durationOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelected(selected === opt.key ? null : opt.key)}
              className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
              style={
                selected === opt.key
                  ? { background: "hsl(var(--burgundy))", color: "white", borderColor: "hsl(var(--burgundy))" }
                  : { background: "transparent", color: "hsl(var(--burgundy))", borderColor: "hsl(var(--burgundy))" }
              }
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, pi) => {
              const visiblePlans = selected
                ? pkg.plans.filter((p) => p.key === selected)
                : pkg.plans;

              if (selected && visiblePlans.length === 0) return null;

              return (
                <motion.div
                  key={pkg.title}
                  className="card-clean"
                  style={pkg.highlighted ? { borderColor: "hsl(var(--burgundy))", borderWidth: "2px" } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pi * 0.1 }}
                >
                  <h3 className="font-serif text-lg font-bold text-primary mb-4">{pkg.title}</h3>
                  <div className="space-y-4">
                    {visiblePlans.map((plan, i) => (
                      <div key={i} className="pb-3 border-b border-border last:border-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-serif text-xl font-bold text-primary">{plan.price}</span>
                          <span className="text-xs text-muted-foreground">/ {plan.duration}</span>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-accent" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {pkg.benefits && !selected && (
                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-accent mb-2 font-semibold">Benefits For</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.benefits.map((b) => (
                          <span key={b} className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">{b}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>

        <motion.div
          className="mt-10 max-w-2xl mx-auto text-center border-2 border-dashed border-primary/30 rounded-2xl py-10 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">
            Want to know more about Assisted Service?
          </h3>
          {selected && (
            <p className="text-sm text-muted-foreground mb-4">
              Selected: <span className="font-semibold text-primary">{durationOptions.find(d => d.key === selected)?.label}</span> plan
            </p>
          )}
          <button
            onClick={handleConsultation}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary rounded-lg text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors mt-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Get Free Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
