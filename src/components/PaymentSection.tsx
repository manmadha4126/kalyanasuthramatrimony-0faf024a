import { motion } from "framer-motion";
import paymentBg from "@/assets/payment-bg.jpg";

const PaymentSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image at 50% opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={paymentBg} alt="" className="w-full h-full object-cover opacity-50" />
      </div>
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">Payment Details</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* QR */}
          <div className="card-clean flex flex-col items-center justify-center min-h-[250px]">
            <div className="w-48 h-48 rounded-xl bg-muted border border-border flex items-center justify-center mb-4">
              <p className="text-sm text-muted-foreground text-center">PhonePe QR<br />Placeholder</p>
            </div>
            <p className="text-sm text-muted-foreground">Scan to Pay via PhonePe</p>
          </div>

          {/* Bank Details */}
          <div className="card-clean">
            <h3 className="font-serif text-lg font-bold text-primary mb-4">Bank Details</h3>
            <div className="space-y-3 text-sm">
              {[
                ["Account Name", "Kalyanasuthra Matrimony"],
                ["Bank", "To be updated"],
                ["Account No.", "To be updated"],
                ["IFSC", "To be updated"],
                ["UPI ID", "kalyanasuthra@ybl"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
