import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20" style={{ background: "linear-gradient(180deg, hsl(var(--cream)), hsl(var(--rose-tint)))" }}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">Get In Touch</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="card-clean space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-foreground mb-1.5 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg text-sm border border-border bg-background outline-none resize-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            <button type="submit" className="btn-burgundy w-full">Send Message</button>
          </motion.form>

          {/* Info */}
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="card-clean space-y-5">
              {[
                { icon: MapPin, label: "Office Address", value: "Tirupati, Andhra Pradesh, India" },
                { icon: Phone, label: "Phone", value: "9553306667 | 9866288767" },
                { icon: Mail, label: "Email", value: "kalyanasuthra@gmail.com" },
                { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="icon-burgundy-circle flex-shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-48">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.8!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzQzLjciTiA3OcKwMjUnMDkuMSJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
