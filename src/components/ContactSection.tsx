import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Map } from "lucide-react";
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
      toast({ title: "Message Sent!", description: "Our relationship manager will contact you soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const darkBg = "hsl(220 15% 16%)";
  const accentPurple = "hsl(250 60% 50%)";
  const inputBg = "hsl(230 30% 96%)";
  const textDark = "hsl(220 15% 16%)";
  const textMuted = "hsl(220 10% 40%)";
  const iconColor = "hsl(220 15% 30%)";
  const fontSerif = "'DM Serif Display', serif";
  const fontSans = "'Lato', sans-serif";

  const formCard = (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full rounded-xl shadow-2xl p-4"
      style={{ background: "white", border: "2px solid white", width: 430, maxWidth: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-bold text-center mb-1" style={{ fontFamily: fontSerif, color: textDark }}>
        Schedule a Free Consultation
      </h3>
      <div className="flex justify-center mb-4">
        <span className="text-xl">✍</span>
      </div>
      <div className="w-full h-px mb-5" style={{ background: "hsl(220 10% 85%)" }} />
      <div className="space-y-3.5">
        {[
          { label: "Full Name", type: "text", key: "name" as const, color: textDark },
          { label: "Email", type: "email", key: "email" as const, color: "hsl(348 50% 35%)", required: true },
          { label: "Phone Number", type: "tel", key: "phone" as const, color: textDark },
        ].map((f) => (
          <div key={f.key}>
            <label className="block text-xs font-medium mb-1" style={{ color: f.color, fontFamily: fontSans }}>
              {f.label}{f.required && <span style={{ color: "hsl(0 70% 50%)" }}>*</span>}
            </label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full px-3 py-2 rounded-md text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              style={{ background: inputBg }}
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium mb-1" style={{ color: textDark, fontFamily: fontSans }}>Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-md text-sm border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            style={{ background: inputBg }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-md text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: accentPurple, fontFamily: fontSans }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </motion.form>
  );

  return (
    <section id="contact" className="overflow-hidden" style={{ background: "white", paddingTop: "60px", paddingBottom: "170px", paddingLeft: "240px", paddingRight: "240px" }}>
      {/* Inner frame with all content */}
      <div className="relative" style={{ border: "none" }}>
        {/* Dark top section - compact */}
        <div style={{ background: darkBg }} className="relative pb-2">
          <div className="container mx-auto px-4">
            <div className="py-8 lg:py-10 max-w-lg">
              <motion.span
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded mb-4"
                style={{ background: accentPurple, color: "white", fontFamily: fontSans }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Contact Us
              </motion.span>
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: fontSerif }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Connect with Us for<br />the Best &amp; Perfect Matches
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Social icons straddling the dark/light boundary */}
        <div className="relative z-30" style={{ height: 0 }}>
          <motion.div
            className="container mx-auto px-4 flex items-center gap-5"
            style={{ transform: "translateY(-50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <a
              href="https://www.instagram.com/kalyanasuthra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all hover:scale-110 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
                boxShadow: "0 6px 20px rgba(214, 41, 118, 0.5)",
              }}
              title="Follow us on Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.8" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
              </svg>
            </a>
            <a
              href="https://www.google.com/maps?q=13.64383,79.43141"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all hover:scale-110 hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #4285F4, #34A853)",
                boxShadow: "0 6px 20px rgba(66, 133, 244, 0.5)",
              }}
              title="Find us on Google Maps"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" opacity="0.9"/>
                <circle cx="12" cy="9" r="3" fill="#4285F4"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Light bottom section */}
        <div
          className="relative pt-10 pb-14"
          style={{ background: "linear-gradient(180deg, hsl(230 30% 96%) 0%, hsl(220 35% 90%) 100%)" }}
        >
          <div className="container mx-auto px-4">
            <div className="lg:max-w-[55%]">
              <motion.div
                className="space-y-5 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <Phone size={18} style={{ color: iconColor, marginTop: 3 }} />
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: textDark, fontFamily: fontSerif }}>Call us at:</h4>
                    <p className="text-sm mt-0.5" style={{ color: textMuted, fontFamily: fontSans }}>9553306667 | 9866288767</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} style={{ color: iconColor, marginTop: 3 }} />
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: textDark, fontFamily: fontSerif }}>Email:</h4>
                    <p className="text-sm mt-0.5" style={{ color: textMuted, fontFamily: fontSans }}>info@kalyanasuthra.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} style={{ color: iconColor, marginTop: 3 }} />
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: textDark, fontFamily: fontSerif }}>Office Address:</h4>
                    <p className="text-sm mt-0.5" style={{ color: textMuted, fontFamily: fontSans }}>4-23, Govinda Nagar, Karakambadi Road, Tirupati - 517501</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} style={{ color: iconColor, marginTop: 3 }} />
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: textDark, fontFamily: fontSerif }}>Working Hours:</h4>
                    <p className="text-sm mt-0.5" style={{ color: textMuted, fontFamily: fontSans }}>Mon – Sat: 10:30 AM – 6:30 PM | Sunday: Holiday</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Form card overlapping dark & light sections - positioned on the right, straddling the boundary */}
        <div className="hidden lg:flex absolute right-[8%] top-1/2 -translate-y-1/2 z-20">
          {formCard}
        </div>
      </div>

      {/* Mobile form - shown below on small screens */}
      <div className="lg:hidden px-4 pb-10" style={{ background: "hsl(220 35% 90%)" }}>
        <div className="flex justify-center">
          {formCard}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
