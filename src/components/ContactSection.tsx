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
      className="w-full rounded-xl shadow-2xl p-3"
      style={{ background: "white", border: "2px solid white", width: 360, maxWidth: "100%" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-base font-bold text-center mb-1" style={{ fontFamily: fontSerif, color: textDark }}>
        Schedule a Free Consultation
      </h3>
      <div className="flex justify-center mb-3">
        <span className="text-lg">✍</span>
      </div>
      <div className="w-full h-px mb-3" style={{ background: "hsl(220 10% 85%)" }} />
      <div className="space-y-2.5">
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
        {/* Dark top section */}
        <div style={{ background: darkBg }} className="relative pb-10">
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
          {/* Icons sitting on the black/white border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-30 container mx-auto px-4"
            style={{ transform: "translateY(50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center gap-4">
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
              <a
                href="https://wa.me/919553306667?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20matrimony%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all hover:scale-110 hover:shadow-xl"
                style={{
                  background: "#25D366",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.5)",
                }}
                title="Chat on WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="tel:9553306667"
                className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all hover:scale-110 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(210, 80%, 50%), hsl(210, 80%, 40%))",
                  boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
                }}
                title="Call Us"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
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
