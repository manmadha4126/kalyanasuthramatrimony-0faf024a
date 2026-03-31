import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Heart, Sparkles, MapPin, Users, Star, Shield, Phone, Headphones } from "lucide-react";
import BackButton from "@/components/BackButton";
import logo from "@/assets/kalyanasuthra-logo.png";
import { loginSchema, checkRateLimit } from "@/lib/security";

export default function CustomerLogin() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkRateLimit("customer_login", 5, 300000)) {
      setError("Too many login attempts. Please wait 5 minutes.");
      return;
    }

    const validation = loginSchema.safeParse({ identifier, password });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Invalid input");
      return;
    }

    setLoading(true);
    setError("");
    try {
      let emailToUse = identifier;
      if (loginMethod === "phone") {
        // Look up the email from profiles table using the phone number
        const cleanPhone = identifier.replace(/\s+/g, "");
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .or(`phone.eq.${cleanPhone},whatsapp.eq.${cleanPhone}`)
          .limit(1)
          .maybeSingle();
        if (profileError || !profileData?.email) {
          throw new Error("No account found with this phone number. Please check and try again.");
        }
        emailToUse = profileData.email;
      }
      const { error: authError } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
      if (authError) throw authError;
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please check your email/phone and password.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Heart, label: "15,000+ Verified Profiles", desc: "Genuine matches from Telugu, Tamil & Kannada families" },
    { icon: Shield, label: "100% Safe & Secure", desc: "Privacy protected with verified profiles only" },
    { icon: Users, label: "Family-First Values", desc: "Traditional matchmaking with modern convenience" },
    { icon: Star, label: "Dedicated Support", desc: "Personal relationship managers for premium members" },
  ];

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "linear-gradient(155deg, hsl(160, 30%, 28%) 0%, hsl(155, 35%, 38%) 40%, hsl(165, 28%, 32%) 100%)" }}>
      {/* Left Panel - No logo, same theme */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, hsl(160, 30%, 28%) 0%, hsl(155, 35%, 38%) 40%, hsl(165, 28%, 32%) 100%)" }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(45,50%,70%), transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, hsl(160,40%,60%), transparent 70%)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 px-12 py-16">
          {/* Welcome message */}
          <h1 className="text-5xl font-serif font-bold text-white mb-4 leading-snug">
            The Wedding Chapter<br />
            <span style={{ color: "hsl(42, 50%, 75%)", fontStyle: "italic" }}>Starts Here…</span>
          </h1>
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-md">
            South India's most trusted matrimonial service. We've been uniting hearts and families since 2018, with thousands of successful matches across Telugu, Tamil, and Kannada communities.
          </p>

          {/* Feature cards */}
          <div className="space-y-3">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "hsl(0, 0%, 100% / 0.08)", border: "1px solid hsl(0, 0%, 100% / 0.1)" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "hsl(0, 0%, 100% / 0.12)" }}>
                  <item.icon size={16} className="text-white/80" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">{item.label}</p>
                  <p className="text-white/40 text-sm mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart size={13} style={{ color: "hsl(42, 50%, 65%)" }} className="fill-current" />
              <span className="text-white/50 text-xs">3,500+ Happy Weddings</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} style={{ color: "hsl(42, 50%, 65%)" }} />
              <span className="text-white/50 text-xs">Pan South India</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-sm">
          <div className="mb-4">
            <BackButton to="/" label="Back to Home" />
          </div>
          {/* Logo on right side */}
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-20 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {!forgotMode ? (
              <>
                {/* Highlighted Member Login badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, hsl(160, 30%, 28%), hsl(155, 35%, 38%))" }}>
                    <Sparkles size={14} className="text-white" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Member Login</span>
                  </div>
                </div>
                <h2 className="font-serif text-3xl font-bold mb-1" style={{ color: "hsl(160, 30%, 25%)" }}>Welcome Back</h2>
                <p className="text-sm text-gray-400 mb-5">Sign in to explore your perfect match</p>

                {/* Login method toggle */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-5">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod("phone"); setIdentifier(""); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${loginMethod === "phone" ? "text-white" : "text-gray-500 bg-gray-50"}`}
                    style={loginMethod === "phone" ? { background: "linear-gradient(135deg, hsl(160, 30%, 30%), hsl(155, 35%, 38%))" } : {}}
                  >
                    <Phone size={14} /> Phone Number
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginMethod("email"); setIdentifier(""); setError(""); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-all ${loginMethod === "email" ? "text-white" : "text-gray-500 bg-gray-50"}`}
                    style={loginMethod === "email" ? { background: "linear-gradient(135deg, hsl(160, 30%, 30%), hsl(155, 35%, 38%))" } : {}}
                  >
                    <Sparkles size={14} /> Email
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {loginMethod === "phone" ? "Phone Number" : "Email Address"}
                    </label>
                    <input
                      type={loginMethod === "phone" ? "tel" : "email"}
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      placeholder={loginMethod === "phone" ? "Enter your phone number" : "your@email.com"}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gray-600">Password</label>
                      <button type="button" onClick={() => setForgotMode(true)} className="text-xs font-medium hover:underline" style={{ color: "hsl(160, 35%, 35%)" }}>Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 pr-10 transition-all" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</motion.div>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60 hover:scale-[1.01]" style={{ background: "linear-gradient(135deg, hsl(160, 30%, 30%), hsl(155, 35%, 38%))" }}>
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
                <div className="mt-5 pt-4 border-t border-gray-100 text-center space-y-2">
                  <p className="text-xs text-gray-500">Don't have an account? <a href="/register" className="font-semibold hover:underline" style={{ color: "hsl(160, 35%, 35%)" }}>Register Free</a></p>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => { setForgotMode(false); setError(""); }} className="flex items-center gap-1 text-xs text-gray-400 mb-5 hover:text-gray-600">← Back to login</button>
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(160, 30%, 92%)" }}>
                    <Headphones size={28} style={{ color: "hsl(160, 30%, 30%)" }} />
                  </div>
                  <h2 className="font-serif text-xl font-bold mb-2" style={{ color: "hsl(160, 30%, 25%)" }}>Forgot Password?</h2>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Please contact our <strong>Customer Support</strong> team. They will help you reset your password.
                  </p>
                  <div className="rounded-xl p-4 mb-4" style={{ background: "hsl(160, 30%, 95%)", border: "1px solid hsl(160, 30%, 85%)" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "hsl(160, 30%, 30%)" }}>📞 Call / WhatsApp</p>
                    <a href="tel:+919876543210" className="text-lg font-bold" style={{ color: "hsl(160, 30%, 25%)" }}>+91 98765 43210</a>
                    <p className="text-xs text-gray-400 mt-2">Available Mon–Sat, 9 AM – 7 PM</p>
                  </div>
                  <p className="text-xs text-gray-400">Our team will verify your identity and help you reset your password securely.</p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
