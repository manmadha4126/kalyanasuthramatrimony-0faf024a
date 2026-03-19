import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { consultationSchema, sanitizeInput, sanitizePhone, checkRateLimit } from "@/lib/security";

interface ConsultationFormProps {
  open: boolean;
  onClose: () => void;
}

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM",
];

const ConsultationForm = ({ open, onClose }: ConsultationFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("consultations").insert({
        name: name.trim(),
        phone: phone.trim(),
        preferred_date: date,
        preferred_time: time,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setSubmitted(false);
    onClose();
  };

  // Get min date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "hsl(0, 0%, 0% / 0.6)" }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(340, 50%, 35%))" }}>
              <div>
                <h3 className="text-white font-serif font-bold text-lg">Book Free Consultation</h3>
                <p className="text-white/70 text-xs">Our relationship manager will guide you</p>
              </div>
              <button onClick={handleClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors">
                <X size={16} className="text-white" />
              </button>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-serif font-bold text-gray-800 text-lg mb-2">Consultation Booked!</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our relationship manager will contact you soon at your consultation selected time.
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {date} at {time}
                </p>
                <button onClick={handleClose} className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-sm text-white" style={{ background: "hsl(var(--burgundy))" }}>
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                    <Phone size={12} /> Contact Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                    <Calendar size={12} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={today}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                    <Clock size={12} /> Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className="px-2 py-2 rounded-lg text-xs font-semibold border transition-all"
                        style={time === slot
                          ? { background: "hsl(var(--burgundy))", color: "white", borderColor: "hsl(var(--burgundy))" }
                          : { borderColor: "hsl(0, 0%, 88%)", color: "hsl(0, 0%, 40%)" }
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60 hover:scale-[1.01]"
                  style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(340, 50%, 35%))" }}
                >
                  {saving ? "Booking..." : "Book Consultation"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationForm;
