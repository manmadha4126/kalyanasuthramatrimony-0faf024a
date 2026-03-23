import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, ChevronUp, User } from "lucide-react";
import scannerImg from "@/assets/phonepe-qr-new.jpeg";

const owners = [
  { name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
  { name: "Kavya", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" },
];

const PaymentSection = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <section className="py-20 px-4 relative" style={{ background: "hsl(195, 45%, 16%)" }}>
      <div className="container mx-auto max-w-5xl">
        {/* Rounded teal card background */}
        <div
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(195, 55%, 22%) 0%, hsl(190, 50%, 28%) 50%, hsl(195, 55%, 22%) 100%)",
          }}
        >
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Payment Details</h2>
            <div className="h-[2px] w-20 mx-auto" style={{ background: "hsl(var(--gold-accent))" }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
            {/* QR Scanner */}
            <motion.div
              className="flex flex-col items-center justify-center rounded-2xl p-6"
              style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={scannerImg} alt="Kalyanasuthra PhonePe QR" className="w-64 h-auto rounded-xl shadow-md mb-4" />
              <p className="text-base font-semibold text-muted-foreground">Scan & Pay with PhonePe / UPI / Cards</p>
            </motion.div>

            {/* Bank Details */}
            <motion.div
              className="rounded-2xl p-7 flex flex-col justify-center"
              style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h3 className="text-xl font-extrabold mb-5" style={{ color: "hsl(var(--burgundy))", fontFamily: "'DM Serif Display', serif" }}>Bank Details</h3>
              <div className="space-y-2.5">
                {[
                  ["Account Name", "Kalyanasuthra Matrimony"],
                  ["Bank", "HDFC Bank"],
                  ["Account No.", "50200115701238"],
                  ["Branch", "MANGALAM Branch, Tirupati"],
                  ["IFSC", "HDFC0007817"],
                  ["Account Type", "Current Account"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border last:border-0 gap-0.5">
                    <span className="text-sm sm:text-base font-extrabold text-foreground">{label}</span>
                    <span className="text-sm sm:text-base font-medium text-muted-foreground sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Us Button */}
          <motion.div
            className="mt-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)" }}
            >
              <Phone size={20} />
              Need Help? Contact Us
              {showContacts ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <AnimatePresence>
              {showContacts && (
                <motion.div
                  className="mt-6 grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {owners.map((owner, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5 text-left shadow-md"
                      style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
                          <User size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-extrabold" style={{ color: "hsl(var(--burgundy))" }}>{owner.name}</span>
                      </div>
                      <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-base font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                        <Phone size={16} style={{ color: "hsl(var(--burgundy))" }} />
                        {owner.phone}
                      </a>
                      <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={16} style={{ color: "hsl(var(--burgundy))" }} />
                        {owner.email}
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
