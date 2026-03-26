import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Phone, Mail, User, ChevronDown, ChevronUp } from "lucide-react";
import findMatchBg from "@/assets/find-match-bg.png";
import ConsultationForm from "@/components/ConsultationForm";

const owners = [
  { name: "Sai", phone: "9553306667", email: "info@kalyanasuthramatrimony.com" },
  { name: "Kavya", phone: "9866288767", email: "info@kalyanasuthramatrimony.com" },
];

const FindMatchCTA = () => {
  const navigate = useNavigate();
  const [showConsultation, setShowConsultation] = useState(false);
  const [showOwners, setShowOwners] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <img src={findMatchBg} alt="Wedding venue with candles" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "hsla(0, 0%, 0%, 0.45)" }} />
      <div className="relative z-10 py-20">
        <motion.div
          className="container mx-auto px-4 text-center space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: "hsl(0, 0%, 100%)",
              textShadow: "2px 3px 8px hsla(0, 0%, 0%, 0.5)",
            }}
          >
            Find Your Match Today
          </h3>
          <p
            className="text-base sm:text-lg md:text-xl max-w-xl mx-auto"
            style={{
              color: "hsla(0, 0%, 100%, 0.9)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Get started today and meet people who truly matter.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 text-base font-bold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-xl"
            style={{ background: "hsl(24, 90%, 55%)", color: "hsl(0, 0%, 100%)" }}
          >
            Register Now
            <Plus size={18} />
          </button>
        </motion.div>

        {/* Want to know more - Assisted Services CTA */}
        <motion.div
          className="container mx-auto px-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="max-w-3xl mx-auto text-center rounded-2xl py-8 px-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(30, 50%, 90%) 0%, hsl(35, 60%, 85%) 50%, hsl(25, 45%, 88%) 100%)",
              border: "2px solid hsla(30, 40%, 70%, 0.6)",
              boxShadow: "0 20px 60px -15px hsla(0, 0%, 0%, 0.5)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(30, 40%, 70%), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, transparent, hsl(30, 40%, 70%), transparent)" }} />

            <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "hsl(220, 30%, 18%)", fontFamily: "'DM Serif Display', serif" }}>
              Want to know more about Assisted Service?
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <button
                onClick={() => setShowConsultation(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{ background: "hsl(348, 56%, 30%)", color: "hsl(0, 0%, 100%)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Get Free Consultation
              </button>
              <button
                onClick={() => setShowOwners(!showOwners)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 border"
                style={{ borderColor: "hsla(348, 56%, 30%, 0.7)", color: "hsl(348, 56%, 30%)", background: "transparent" }}
              >
                <Phone size={18} />
                Contact Us
                {showOwners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            <AnimatePresence>
              {showOwners && (
                <motion.div
                  className="mt-6 grid sm:grid-cols-2 gap-4 max-w-lg mx-auto"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {owners.map((owner, i) => (
                    <div key={i} className="rounded-xl p-4 text-left" style={{ background: "hsla(0, 0%, 100%, 0.1)", border: "1px solid hsla(40, 60%, 50%, 0.3)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(40, 60%, 50%)" }}>
                          <User size={14} style={{ color: "hsl(348, 56%, 22%)" }} />
                        </div>
                        <span className="text-base font-bold text-white">{owner.name}</span>
                      </div>
                      <a href={`tel:${owner.phone}`} className="flex items-center gap-2 text-sm mb-1 transition-colors" style={{ color: "hsl(40, 60%, 50%)" }}>
                        <Phone size={14} /> {owner.phone}
                      </a>
                      <a href={`mailto:${owner.email}`} className="flex items-center gap-2 text-xs transition-colors" style={{ color: "hsl(40, 30%, 75%)" }}>
                        <Mail size={12} /> {owner.email}
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <ConsultationForm open={showConsultation} onClose={() => setShowConsultation(false)} />
    </div>
  );
};

export default FindMatchCTA;
