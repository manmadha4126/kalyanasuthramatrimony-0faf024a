import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will connect to backend later
    alert("Thank you for your message! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 section-dark relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--burgundy)/0.3), transparent 60%), radial-gradient(ellipse at 70% 80%, hsl(var(--gold)/0.2), transparent 50%)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm tracking-[0.2em] uppercase font-sans mb-2" style={{ color: "hsl(var(--gold))" }}>GET IN TOUCH</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold gold-text mb-4">Contact Us</h2>
          <div className="ornament-line mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl p-8 gold-border"
            style={{ background: "hsl(var(--royal-black)/0.5)", backdropFilter: "blur(10px)" }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm mb-2 capitalize" style={{ color: "hsl(var(--cream)/0.7)" }}>{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{
                    background: "hsl(var(--royal-black)/0.6)",
                    border: "1px solid hsl(var(--gold)/0.2)",
                    color: "hsl(var(--cream))",
                  }}
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm mb-2" style={{ color: "hsl(var(--cream)/0.7)" }}>Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
                style={{
                  background: "hsl(var(--royal-black)/0.6)",
                  border: "1px solid hsl(var(--gold)/0.2)",
                  color: "hsl(var(--cream))",
                }}
                required
              />
            </div>
            <button type="submit" className="btn-gold w-full">Send Message</button>
          </motion.form>

          {/* Info */}
          <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[
              { icon: MapPin, label: "Office Address", value: "Tirupati, Andhra Pradesh, India" },
              { icon: Phone, label: "Phone Numbers", value: "📞 9553306667 | 📞 9866288767" },
              { icon: Mail, label: "Email", value: "kalyanasuthra@gmail.com" },
              { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="icon-gold-container flex-shrink-0">
                  <item.icon size={20} style={{ color: "hsl(var(--gold))" }} />
                </div>
                <div>
                  <h4 className="font-serif font-bold mb-1" style={{ color: "hsl(var(--cream))" }}>{item.label}</h4>
                  <p className="text-sm" style={{ color: "hsl(var(--cream)/0.7)" }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden gold-border h-52">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.8!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzQzLjciTiA3OcKwMjUnMDkuMSJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
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
