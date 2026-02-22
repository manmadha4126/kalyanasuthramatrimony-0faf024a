import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("consultations").insert({
        name: form.name,
        phone: form.phone,
        preferred_date: new Date().toISOString().split("T")[0],
        preferred_time: "10:30 AM",
        notes: `Email: ${form.email}\nMessage: ${form.message}`,
      });
      if (error) throw error;
      toast({
        title: "Message Sent!",
        description: "Our relationship manager will contact you soon.",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden">
      {/* Dark top section */}
      <div style={{ background: "hsl(220 15% 16%)" }} className="relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* Left - heading area */}
            <div className="py-16 lg:py-24 pr-8">
              <motion.span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded mb-8"
                style={{ background: "hsl(250 60% 50%)", color: "white", fontFamily: "'Lato', sans-serif" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.span>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "'DM Serif Display', serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Connect with Us for<br />the Best &amp; Perfect Matches
              </motion.h2>
            </div>

            {/* Right - form card overlapping dark/light */}
            <div className="relative flex justify-end items-start lg:-mb-32 z-20">
              <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 lg:mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-center mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: "hsl(220 15% 16%)" }}>
                  Schedule a Free Consultation
                </h3>
                <div className="flex justify-center mb-6">
                  <span className="text-2xl">✍</span>
                </div>
                <div className="w-full h-px bg-gray-200 mb-6" />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220 15% 16%)", fontFamily: "'Lato', sans-serif" }}>Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: "hsl(230 30% 96%)" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(348 50% 35%)", fontFamily: "'Lato', sans-serif" }}>
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: "hsl(230 30% 96%)" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220 15% 16%)", fontFamily: "'Lato', sans-serif" }}>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: "hsl(230 30% 96%)" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220 15% 16%)", fontFamily: "'Lato', sans-serif" }}>Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: "hsl(230 30% 96%)" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "hsl(250 60% 50%)", fontFamily: "'Lato', sans-serif" }}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </div>

      {/* Light bottom section */}
      <div style={{ background: "linear-gradient(180deg, hsl(230 30% 96%) 0%, hsl(230 25% 92%) 100%)" }} className="relative pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - contact details */}
            <motion.div
              className="space-y-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Call us */}
              <div className="flex items-start gap-3">
                <Phone size={20} style={{ color: "hsl(220 15% 30%)", marginTop: 2 }} />
                <div>
                  <h4 className="text-base font-bold" style={{ color: "hsl(220 15% 16%)", fontFamily: "'DM Serif Display', serif" }}>
                    Call us at:
                  </h4>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(220 10% 40%)", fontFamily: "'Lato', sans-serif" }}>
                    9553306667 | 9866288767
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={20} style={{ color: "hsl(220 15% 30%)", marginTop: 2 }} />
                <div>
                  <h4 className="text-base font-bold" style={{ color: "hsl(220 15% 16%)", fontFamily: "'DM Serif Display', serif" }}>
                    Email:
                  </h4>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(220 10% 40%)", fontFamily: "'Lato', sans-serif" }}>
                    info@kalyanasuthra.com
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin size={20} style={{ color: "hsl(220 15% 30%)", marginTop: 2 }} />
                <div>
                  <h4 className="text-base font-bold" style={{ color: "hsl(220 15% 16%)", fontFamily: "'DM Serif Display', serif" }}>
                    Office Address:
                  </h4>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(220 10% 40%)", fontFamily: "'Lato', sans-serif" }}>
                    4-23, Govinda Nagar, Karakambadi Road, Tirupati - 517501
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock size={20} style={{ color: "hsl(220 15% 30%)", marginTop: 2 }} />
                <div>
                  <h4 className="text-base font-bold" style={{ color: "hsl(220 15% 16%)", fontFamily: "'DM Serif Display', serif" }}>
                    Working Hours:
                  </h4>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(220 10% 40%)", fontFamily: "'Lato', sans-serif" }}>
                    Mon – Sat: 10:30 AM – 6:30 PM | Sunday: Holiday
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Map (below the form card) */}
            <motion.div
              className="lg:pt-40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-base font-bold mb-3" style={{ color: "hsl(220 15% 16%)", fontFamily: "'DM Serif Display', serif" }}>
                Find Us Here
              </h4>
              <a
                href="https://www.google.com/maps?q=13.64383,79.43141"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-gray-200 h-52 relative group cursor-pointer shadow-md"
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
