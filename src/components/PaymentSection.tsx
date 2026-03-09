import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronDown, ChevronUp, User, CreditCard, Wallet, Banknote } from "lucide-react";
import scannerImg from "@/assets/phonepe-qr-new.jpeg";

const owners = [
  { name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
  { name: "Drakshayani", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" },
];

const FloatingIcon = ({ icon: Icon, className, delay }: { icon: any; className: string; delay: number }) => (
  <motion.div
    className={`absolute opacity-10 ${className}`}
    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <Icon size={48} className="text-white" />
  </motion.div>
);

const PaymentSection = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic animated gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, hsla(280, 60%, 25%, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 60%, hsla(200, 70%, 30%, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse 50% 30% at 50% 80%, hsla(45, 80%, 50%, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, hsl(220, 50%, 12%) 0%, hsl(260, 45%, 18%) 35%, hsl(280, 40%, 20%) 65%, hsl(220, 55%, 15%) 100%)
        `
      }} />

      {/* Animated mesh overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px"
      }} />

      {/* Floating payment icons */}
      <FloatingIcon icon={CreditCard} className="top-16 left-[10%]" delay={0} />
      <FloatingIcon icon={Wallet} className="top-32 right-[15%]" delay={1.5} />
      <FloatingIcon icon={Banknote} className="bottom-24 left-[20%]" delay={3} />
      <FloatingIcon icon={CreditCard} className="bottom-16 right-[10%]" delay={2} />
      <FloatingIcon icon={Wallet} className="top-1/2 left-[5%]" delay={4} />
      <FloatingIcon icon={Banknote} className="top-20 right-[30%]" delay={2.5} />

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(45, 80%, 60%, 0.15) 0%, transparent 70%)", top: "10%", left: "60%" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(200, 70%, 50%, 0.1) 0%, transparent 70%)", bottom: "-10%", left: "-10%" }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
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
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-base font-extrabold text-foreground">{label}</span>
                  <span className="text-base font-medium text-muted-foreground text-right">{value}</span>
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
    </section>
  );
};

export default PaymentSection;
