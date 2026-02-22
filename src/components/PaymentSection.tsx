import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import paymentBg from "@/assets/payment-bg.jpg";

const PaymentSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image at 50% opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={paymentBg} alt="" className="w-full h-full object-cover opacity-70" />
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

        {/* Find Us Here - Map */}
        <motion.div
          className="mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-clean">
            <h3 className="font-serif text-lg font-bold text-primary mb-4">Find Us Here</h3>
            <a
              href="https://www.google.com/maps?q=13.64383,79.43141"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-border relative cursor-pointer shadow-sm"
              style={{ height: 220 }}
            >
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=13.64383,79.43141&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                loading="lazy"
              />
              <div className="absolute inset-0" />
            </a>
          </div>
        </motion.div>

        {/* Need Help Contact Block */}
        <motion.div
          className="mt-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-clean text-center py-6 px-8">
            <h3 className="font-serif text-xl font-bold text-primary mb-3">Need Help? Contact Us</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a href="tel:9553306667" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" />
                <span>9553306667 | 9866288767</span>
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a href="mailto:info@kalyanasuthra.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                <span>info@kalyanasuthra.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentSection;
