import { motion } from "framer-motion";

const FeaturedProfiles = () => {
  const placeholders = Array.from({ length: 6 });

  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: "linear-gradient(135deg, hsl(275, 40%, 15%) 0%, hsl(310, 35%, 22%) 25%, hsl(340, 30%, 18%) 50%, hsl(280, 45%, 20%) 75%, hsl(260, 50%, 12%) 100%)"
    }}>
      {/* Animated mandala-inspired geometric pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 120px 120px at 20% 20%, hsl(42, 60%, 65%) 1px, transparent 50%),
            radial-gradient(ellipse 80px 80px at 80% 30%, hsl(310, 50%, 55%) 1px, transparent 50%),
            radial-gradient(ellipse 100px 100px at 50% 80%, hsl(42, 60%, 65%) 1px, transparent 50%),
            radial-gradient(circle at 30% 60%, hsl(275, 40%, 50%) 2px, transparent 60px),
            radial-gradient(circle at 70% 50%, hsl(340, 40%, 45%) 2px, transparent 60px)
          `,
          backgroundSize: "200px 200px, 150px 150px, 180px 180px, 120px 120px, 160px 160px"
        }}
      />

      {/* Floating diamond shapes */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, hsl(42, 60%, 65%) 40%, hsl(42, 60%, 65%) 42%, transparent 42%),
            linear-gradient(-45deg, transparent 40%, hsl(42, 60%, 65%) 40%, hsl(42, 60%, 65%) 42%, transparent 42%)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(310, 60%, 45%), transparent 70%)" }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-[0.07] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(42, 70%, 55%), transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(275, 50%, 50%), transparent 60%)" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(42, 55%, 75%)" }}>Featured Profiles</h2>
          <div className="h-[2px] w-20 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(42, 60%, 65%), transparent)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Male */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-center" style={{ color: "hsl(310, 30%, 78%)" }}>Groom Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {placeholders.map((_, i) =>
              <motion.div
                key={`m${i}`}
                className="aspect-square rounded-xl overflow-hidden group cursor-pointer border"
                style={{ background: "hsl(275, 30%, 20%)", borderColor: "hsl(42, 40%, 40%)" }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px hsl(310, 40%, 35%)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}>
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full mb-2" style={{ background: "hsl(275, 25%, 30%)" }} />
                    <p className="text-xs font-semibold" style={{ color: "hsl(42, 55%, 75%)" }}>Profile {i + 1}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Female */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-center" style={{ color: "hsl(310, 30%, 78%)" }}>Bride Profiles</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {placeholders.map((_, i) =>
              <motion.div
                key={`f${i}`}
                className="aspect-square rounded-xl overflow-hidden group cursor-pointer border"
                style={{ background: "hsl(275, 30%, 20%)", borderColor: "hsl(42, 40%, 40%)" }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px hsl(310, 40%, 35%)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}>
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full mb-2" style={{ background: "hsl(275, 25%, 30%)" }} />
                    <p className="text-xs font-semibold" style={{ color: "hsl(42, 55%, 75%)" }}>Profile {i + 1}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 py-4 px-6 text-center rounded-3xl border-2" style={{ background: "linear-gradient(135deg, hsl(275, 35%, 25%), hsl(310, 30%, 28%))", borderColor: "hsl(42, 50%, 50%)" }}>
          <p className="text-sm font-medium" style={{ color: "hsl(42, 55%, 80%)" }}>
            Contact for more profiles: <span className="font-bold">📞 9553306667</span> | <span className="font-bold">📞 9866288767</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfiles;
