import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, ChevronUp, User } from "lucide-react";
import scannerImg from "@/assets/phonepe-qr-new.jpeg";
import phonepeLogo from "@/assets/phonepe-logo.png";
import googlepayLogo from "@/assets/googlepay-logo.png";
import upiLogo from "@/assets/upi-logo.png";
import cardsLogo from "@/assets/cards-logo.png";
import netbankingLogo from "@/assets/netbanking-logo.png";

const owners = [
  { name: "Sai", phone: "9553306667", email: "kalyanasuthramatrimonytpt@gmail.com" },
  { name: "Kavya", phone: "9866288767", email: "kalyanasuthramatrimonytpt@gmail.com" },
];

const paymentIcons = [
  { label: "PhonePe", img: phonepeLogo },
  { label: "Google Pay", img: googlepayLogo },
  { label: "UPI", img: upiLogo },
  { label: "Cards", img: cardsLogo },
  { label: "Net Banking", img: netbankingLogo },
];

const PaymentSection = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <section className="py-12 sm:py-20 px-3 sm:px-4 relative" style={{ background: "hsl(0, 0%, 5%)" }}>
      <div className="container mx-auto max-w-5xl">
        <div
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(195, 55%, 22%) 0%, hsl(190, 50%, 28%) 50%, hsl(195, 55%, 22%) 100%)",
          }}
        >
          <motion.div className="text-center mb-6 sm:mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'DM Serif Display', serif" }}>Payment Details</h2>
            <div className="h-[2px] w-20 mx-auto" style={{ background: "hsl(var(--gold-accent))" }} />
          </motion.div>

          {/* 5 Payment icons in a row */}
          <motion.div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {paymentIcons.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden p-1.5" style={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(0, 0%, 100% / 0.3)" }}>
                  <img src={p.img} alt={p.label} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold" style={{ color: "hsl(0, 0%, 85%)" }}>{p.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto items-stretch">
            {/* QR Scanner */}
            <motion.div
              className="flex flex-col items-center justify-center rounded-2xl p-4 sm:p-6"
              style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={scannerImg} alt="Kalyanasuthra PhonePe QR" className="w-44 sm:w-64 h-auto rounded-xl shadow-md mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base font-semibold text-muted-foreground text-center">Scan & Pay with PhonePe / UPI / Cards</p>
            </motion.div>

            {/* Bank Details */}
            <motion.div
              className="rounded-2xl p-4 sm:p-7 flex flex-col justify-center"
              style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h3 className="text-lg sm:text-xl font-extrabold mb-3 sm:mb-5" style={{ color: "hsl(var(--burgundy))", fontFamily: "'DM Serif Display', serif" }}>Bank Details</h3>
              <div className="space-y-1.5 sm:space-y-2.5">
                {[
                  ["Account Name", "Kalyanasuthra Matrimony"],
                  ["Bank", "HDFC Bank"],
                  ["Account No.", "50200115701238"],
                  ["Branch", "MANGALAM Branch, Tirupati"],
                  ["IFSC", "HDFC0007817"],
                  ["Account Type", "Current Account"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-1.5 sm:py-2 border-b border-border last:border-0 gap-1">
                    <span className="text-xs sm:text-base font-extrabold text-foreground">{label}</span>
                    <span className="text-xs sm:text-base font-medium text-muted-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Us Button */}
          <motion.div
            className="mt-6 sm:mt-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background: "hsl(var(--gold-accent))", color: "hsl(220, 60%, 10%)" }}
            >
              <Phone size={18} />
              Need Help? Contact Us
              {showContacts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <AnimatePresence>
              {showContacts && (
                <motion.div
                  className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {owners.map((owner, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 sm:p-5 text-left shadow-md"
                      style={{ background: "hsla(0,0%,100%,0.95)", border: "1px solid hsl(var(--gold-accent) / 0.4)" }}
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(280, 70%, 50%), hsl(320, 70%, 50%))" }}>
                          <User size={16} className="text-white" />
                        </div>
                        <span className="text-base sm:text-lg font-extrabold" style={{ color: "hsl(280, 70%, 45%)", fontFamily: "'Playfair Display', serif" }}>{owner.name}</span>
                      </div>
                      <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground mb-1.5 hover:text-primary transition-colors">
                        <Phone size={14} style={{ color: "hsl(280, 70%, 45%)" }} />
                        {owner.phone}
                      </a>
                      <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors break-all">
                        <Mail size={14} style={{ color: "hsl(280, 70%, 45%)" }} />
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
