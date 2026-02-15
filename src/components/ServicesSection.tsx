import { motion } from "framer-motion";

const packages = [
  {
    title: "Support Matrimony",
    highlighted: false,
    plans: [
      { price: "₹13,000", duration: "3 Months", features: ["Unlimited Profiles", "Weekly Mail Processing"] },
      { price: "₹20,000", duration: "6 Months", features: ["Unlimited Profiles", "Weekly Mail", "Normal Profiles"] },
    ],
  },
  {
    title: "Affluent Matrimony",
    highlighted: true,
    plans: [
      { price: "₹38,000", duration: "Premium", features: ["Dedicated Relationship Manager", "Daily Feedback", "Well Settled Profiles", "Up to Settlement Service", "Personal Enquiry"] },
    ],
    benefits: ["IAS / IPS / Scientists", "IIT / IIM / CA / NIT / BITS", "NRI Matches", "13L+ Annual Package", "Entrepreneurs", "Doctors"],
  },
  {
    title: "Online Services",
    highlighted: false,
    plans: [
      { price: "₹7,000", duration: "3 Months", features: ["Online Access"] },
      { price: "₹10,000", duration: "6 Months", features: ["Online Access"] },
      { price: "₹15,000", duration: "1 Year", features: ["Online Access"] },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">Assisted Matrimony Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-3">
            Our dedicated relationship managers provide profile handling, match filtering, feedback support, and direct communication management.
          </p>
          <div className="gold-divider" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: consultant placeholder */}
          <motion.div
            className="lg:w-1/3 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[3/4] rounded-xl bg-muted border border-border flex items-center justify-center">
              <p className="text-sm text-muted-foreground text-center px-4">Professional Consultant<br />Image Placeholder</p>
            </div>
          </motion.div>

          {/* Right: packages */}
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-6">
            {packages.map((pkg, pi) => (
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
                  {pkg.plans.map((plan, i) => (
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
                {pkg.benefits && (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
