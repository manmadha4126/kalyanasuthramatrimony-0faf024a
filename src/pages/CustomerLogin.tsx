import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Heart, Sparkles, MapPin, Users, Star, Shield, Phone, Mail, MessageCircle, Headphones, HelpCircle } from "lucide-react";
import logo from "@/assets/kalyanasuthra-logo.png";

export default function CustomerLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Support both email and phone login
      let emailToUse = identifier.trim();
      if (!emailToUse.includes("@")) {
        // Phone number: look up email from profiles table
        const cleaned = emailToUse.replace(/\D/g, "");
        const { data: profileData } = await supabase
          .from("profiles")
          .select("email")
          .or(`phone.eq.${cleaned},phone.eq.+91${cleaned},whatsapp.eq.${cleaned}`)
          .limit(1)
          .single();
        if (profileData?.email) {
          emailToUse = profileData.email;
        } else {
          setError("No account found with this phone number.");
          setLoading(false);
          return;
        }
      }
      const { error: authError } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
      if (authError) throw authError;
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please check your email/phone and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{ background: "linear-gradient(155deg, hsl(160, 25%, 95%) 0%, hsl(150, 20%, 92%) 40%, hsl(40, 30%, 95%) 100%)" }}>
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, hsl(160,40%,50%), transparent 70%)" }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, hsl(42,50%,60%), transparent 70%)" }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, hsl(160,35%,45%), transparent 70%)" }} />
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(160,30%,40%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 100px, hsl(160,30%,40%) 100px, hsl(160,30%,40%) 101px)" }} />
      {/* Floating decorative elements */}
      <div className="absolute top-16 right-20 animate-pulse" style={{ opacity: 0.15 }}>
        <Heart size={28} style={{ color: "hsl(160,35%,40%)" }} />
      </div>
      <div className="absolute bottom-20 left-20 animate-pulse" style={{ opacity: 0.12, animationDelay: "1s" }}>
        <Sparkles size={24} style={{ color: "hsl(42,50%,55%)" }} />
      </div>
      <div className="absolute top-1/2 left-12 animate-pulse" style={{ opacity: 0.1, animationDelay: "2s" }}>
        <Star size={20} style={{ color: "hsl(160,30%,45%)" }} />
      </div>
      <div className="absolute top-24 left-1/3 animate-pulse" style={{ opacity: 0.1, animationDelay: "1.5s" }}>
        <Heart size={16} style={{ color: "hsl(42,45%,55%)" }} className="fill-current" />
      </div>
      <div className="absolute bottom-32 right-1/3 animate-pulse" style={{ opacity: 0.08, animationDelay: "0.5s" }}>
        <Users size={22} style={{ color: "hsl(160,35%,42%)" }} />
      </div>
      {/* Decorative rings */}
      <div className="absolute top-32 right-40 w-20 h-20 rounded-full border-2 opacity-[0.06]" style={{ borderColor: "hsl(160,35%,40%)" }} />
      <div className="absolute bottom-40 left-40 w-16 h-16 rounded-full border-2 opacity-[0.05]" style={{ borderColor: "hsl(42,50%,55%)" }} />

      {/* Main content - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Logo above sign-in card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <img src={logo} alt="Kalyanasuthra Matrimony" className="h-24 md:h-28 w-auto object-contain" />
        </motion.div>

        {/* Sign-in card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8" style={{ border: "1px solid hsl(160, 20%, 88%)", boxShadow: "0 15px 50px hsl(160, 20%, 30% / 0.1)" }}>
            {!forgotMode ? (
              <>
                {/* Member Login heading - highlighted */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles size={18} style={{ color: "hsl(42, 42%, 57%)" }} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(42, 42%, 50%)", fontFamily: "'Noto Sans', sans-serif" }}>✦ Member Login ✦</span>
                    <Sparkles size={18} style={{ color: "hsl(42, 42%, 57%)" }} />
                  </div>
                  <div className="w-24 h-[2px] mx-auto mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(42, 42%, 57%), transparent)" }} />
                  <h2 className="font-serif text-3xl font-bold" style={{ color: "hsl(160, 30%, 25%)" }}>Welcome Back</h2>
                  <p className="text-sm mt-1" style={{ color: "hsl(160, 15%, 55%)", fontFamily: "'Noto Sans', sans-serif" }}>Sign in with your email or phone number</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "hsl(160, 15%, 35%)", fontFamily: "'Noto Sans', sans-serif" }}>Email or Phone Number</label>
                    <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="your@email.com or 9876543210" required className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all" style={{ borderColor: "hsl(160, 15%, 85%)", fontFamily: "'Noto Sans', sans-serif" }} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold" style={{ color: "hsl(160, 15%, 35%)", fontFamily: "'Noto Sans', sans-serif" }}>Password</label>
                      <button type="button" onClick={() => setForgotMode(true)} className="text-xs font-medium hover:underline" style={{ color: "hsl(160, 35%, 35%)" }}>Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 pr-10 transition-all" style={{ borderColor: "hsl(160, 15%, 85%)" }} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(160, 10%, 55%)" }}>
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-60 hover:scale-[1.01]" style={{ background: "linear-gradient(135deg, hsl(160, 30%, 30%), hsl(155, 35%, 38%))", fontFamily: "'Noto Sans', sans-serif" }}>
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t text-center space-y-2" style={{ borderColor: "hsl(160, 15%, 92%)" }}>
                  <p className="text-xs" style={{ color: "hsl(160, 10%, 50%)", fontFamily: "'Noto Sans', sans-serif" }}>
                    Don't have an account?{" "}
                    <a href="/register" className="font-bold hover:underline" style={{ color: "hsl(160, 35%, 35%)" }}>Register Free</a>
                  </p>
                  <button onClick={() => navigate("/")} className="text-xs font-medium hover:underline" style={{ color: "hsl(160, 10%, 55%)" }}>
                    ← Back to Home
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Forgot Password - Contact Support */}
                <button onClick={() => { setForgotMode(false); setError(""); }} className="flex items-center gap-1 text-xs mb-5 hover:underline" style={{ color: "hsl(160, 10%, 50%)" }}>← Back to login</button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "hsl(160, 25%, 93%)" }}>
                    <Headphones size={28} style={{ color: "hsl(160, 35%, 35%)" }} />
                  </div>
                  <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "hsl(160, 30%, 25%)" }}>Forgot Password?</h2>
                  <p className="text-xs" style={{ color: "hsl(160, 10%, 55%)", fontFamily: "'Noto Sans', sans-serif" }}>
                    Don't worry! Our customer support team will help you reset your password.
                  </p>
                </div>

                {/* Customer Support Option */}
                <div className="space-y-3 mb-5">
                  <div className="p-4 rounded-xl" style={{ background: "hsl(160, 25%, 96%)", border: "1px solid hsl(160, 20%, 90%)" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 30%, 88%)" }}>
                        <Headphones size={16} style={{ color: "hsl(160, 35%, 35%)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "hsl(160, 30%, 25%)", fontFamily: "'Noto Sans', sans-serif" }}>Customer Support</p>
                        <p className="text-xs" style={{ color: "hsl(160, 10%, 55%)" }}>Available Mon-Sat, 9AM - 7PM</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      <a href="tel:+919553306667" className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "hsl(160, 35%, 32%)" }}>
                        <Phone size={14} /> +91 95533 06667
                      </a>
                      <a href="https://wa.me/919553306667" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "hsl(160, 35%, 32%)" }}>
                        <MessageCircle size={14} /> WhatsApp Us
                      </a>
                    </div>
                  </div>

                  {/* Contact Us Option */}
                  <div className="p-4 rounded-xl" style={{ background: "hsl(42, 30%, 96%)", border: "1px solid hsl(42, 25%, 90%)" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(42, 30%, 88%)" }}>
                        <Mail size={16} style={{ color: "hsl(42, 42%, 45%)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "hsl(42, 30%, 30%)", fontFamily: "'Noto Sans', sans-serif" }}>Contact Us</p>
                        <p className="text-xs" style={{ color: "hsl(42, 15%, 50%)" }}>Email us for assistance</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      <a href="mailto:kalyanasuthra@gmail.com" className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "hsl(42, 40%, 35%)" }}>
                        <Mail size={14} /> kalyanasuthra@gmail.com
                      </a>
                      <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(42, 15%, 45%)" }}>
                        <MapPin size={14} /> Tirupati, Andhra Pradesh
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[11px]" style={{ color: "hsl(160, 10%, 60%)", fontFamily: "'Noto Sans', sans-serif" }}>
                    Our team will verify your identity and help you reset your password securely.
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
