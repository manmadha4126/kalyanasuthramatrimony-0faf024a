import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Heart, Sparkles, MapPin, Users, Star, Shield } from "lucide-react";
import BackButton from "@/components/BackButton";
import logo from "@/assets/kalyanasuthra-logo.png";

export default function CustomerLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const emailToUse = identifier.includes("@") ? identifier : `${identifier}@kalyanasuthra.in`;
      const { error: authError } = await supabase.auth.signInWithPassword({ email: emailToUse, password });
      if (authError) throw authError;
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please check your email/phone and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, { redirectTo: `${window.location.origin}/reset-password` });
      if (error) throw error;
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
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
    <div className="min-h-screen flex overflow-hidden" style={{ background: "hsl(30, 33%, 97%)" }}>
      {/* Left Panel - Redesigned with teal/sage green theme */}
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
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-20 w-auto object-contain" />
          </div>

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
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-sm">
          <div className="mb-4">
            <BackButton to="/" label="Back to Home" />
          </div>
          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <img src={logo} alt="Kalyanasuthra Matrimony" className="h-16 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {!forgotMode ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} style={{ color: "hsl(42, 42%, 57%)" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Member Login</span>
                </div>
                <h2 className="font-serif text-3xl font-bold mb-1" style={{ color: "hsl(160, 30%, 25%)" }}>Welcome Back</h2>
                <p className="text-sm text-gray-400 mb-6">Sign in to explore your perfect match</p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email or Phone Number</label>
                    <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="your@email.com or 9876543210" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all" />
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
                <button onClick={() => { setForgotMode(false); setError(""); setResetSent(false); }} className="flex items-center gap-1 text-xs text-gray-400 mb-5 hover:text-gray-600">← Back to login</button>
                <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "hsl(160, 30%, 25%)" }}>Reset Password</h2>
                <p className="text-xs text-gray-400 mb-5">Enter your email and we'll send a reset link</p>
                {resetSent ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3"><span className="text-2xl">📧</span></div>
                    <p className="text-sm font-semibold text-gray-700">Check your email!</p>
                    <p className="text-xs text-gray-400 mt-1">Reset link sent to {resetEmail}</p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="your@email.com" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200" />
                    </div>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "hsl(160, 30%, 35%)" }}>
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
