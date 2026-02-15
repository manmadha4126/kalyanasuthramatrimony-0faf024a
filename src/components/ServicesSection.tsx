import { motion } from "framer-motion";

const packages = [
  {
    title: "Support Matrimony",
    plans: [
      { price: "₹13,000", duration: "3 Months", features: ["Unlimited Profiles", "Weekly Mail Processing"] },
      { price: "₹20,000", duration: "6 Months", features: ["Unlimited Profiles", "Weekly Mail", "Normal Profiles"] },
    ],
  },
  {
    title: "Affluent Matrimony",
    plans: [
      {
        price: "₹38,000",
        duration: "Premium",
        features: [
          "Dedicated Relationship Manager",
          "Daily Feedback",
          "Well Settled Profiles",
          "Up to Settlement Service",
          "Personal Enquiry",
        ],
      },
    ],
    benefits: ["IAS / IPS / Scientists", "IIT / IIM / CA / NIT / BITS", "NRI Matches", "13L+ Annual Package", "Entrepreneurs", "Doctors"],
  },
  {
    title: "Online Services",
    plans: [
      { price: "₹7,000", duration: "3 Months", features: ["Online Access"] },
      { price: "₹10,000", duration: "6 Months", features: ["Online Access"] },
      { price: "₹15,000", duration: "1 Year", features: ["Online Access"] },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative overflow-hidden" style={{ background: "hsl(var(--cream))" }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "hsl(var(--gold))" }}>
            OUR SERVICES
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Assisted Matrimony Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our dedicated relationship managers provide profile handling, match filtering, feedback support, and direct
            communication management.
          </p>
          <div className="ornament-line mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, pi) => (
            <motion.div
              key={pkg.title}
              className="card-luxury"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pi * 0.15 }}
            >
              <h3 className="font-serif text-xl font-bold gold-text mb-6">{pkg.title}</h3>
              <div className="space-y-6">
                {pkg.plans.map((plan, i) => (
                  <div key={i} className="pb-4" style={{ borderBottom: "1px solid hsl(var(--gold)/0.15)" }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-serif text-2xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/ {plan.duration}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--gold))" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {pkg.benefits && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "hsl(var(--gold))" }}>
                    Benefits For
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "hsl(var(--gold)/0.1)",
                          color: "hsl(var(--gold-dark))",
                          border: "1px solid hsl(var(--gold)/0.2)",
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
