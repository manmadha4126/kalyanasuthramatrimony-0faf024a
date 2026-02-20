import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import weddingPhoto1 from "@/assets/wedding-photo-1.jpeg";
import weddingPhoto2 from "@/assets/wedding-photo-2.jpg";
import wedding1 from "@/assets/wedding-1.jpeg";

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
      // identifier can be email or phone — try email first
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

  const decorativeCards = [
    { img: weddingPhoto1, name: "Priya & Arjun", year: "2024" },
    { img: weddingPhoto2, name: "Kavya & Rahul", year: "2024" },
    { img: wedding1, name: "Meena & Karthik", year: "2023" },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: "hsl(30, 33%, 97%)" }}>
      {/* Left Panel – Artistic */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex flex-col justify-center w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, hsl(348, 56%, 20%) 0%, hsl(340, 50%, 28%) 50%, hsl(30, 40%, 25%) 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(42,42%,57%), transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(42,42%,57%), transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 px-12 py-16">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsl(42, 42%, 57%)" }}>
              <span className="font-serif text-xl font-bold text-white">K</span>
            </div>
            <div>
              <span className="font-serif text-xl text-white font-bold block leading-tight">Kalyanasuthra</span>
              <span className="text-xs tracking-widest uppercase" style={{ color: "hsl(42, 42%, 70%)" }}>Matrimony</span>
            </div>
          </div>

          <h1 className="text-3xl font-serif font-bold text-white mb-3 leading-snug">
            The Wedding<br />Chapter Starts Here…
          </h1>
          <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-xs">
            Thousands of hearts found their perfect match. Your love story is waiting to begin.
          </p>

          {/* Stacked photo cards */}
          <div className="relative h-52">
            {decorativeCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  width: "140px",
                  height: "170px",
                  left: `${i * 90}px`,
                  top: `${i % 2 === 1 ? 20 : 0}px`,
                  zIndex: i,
                  transform: `rotate(${i === 0 ? -5 : i === 1 ? 0 : 5}deg)`,
                  border: "3px solid hsl(42, 42%, 57% / 0.6)",
                }}
              >
                <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "linear-gradient(transparent, hsl(0,0%,0% / 0.7))" }}>
                  <p className="text-white text-[10px] font-semibold">{card.name}</p>
                  <p className="text-white/60 text-[9px]">{card.year}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2">
            <Heart size={14} style={{ color: "hsl(42, 42%, 57%)" }} className="fill-current" />
            <span className="text-white/60 text-xs">Join 10,000+ happy families</span>
          </div>
        </div>
      </motion.div>

      {/* Right Panel – Login Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--burgundy))" }}>
              <span className="font-serif text-base font-bold text-white">K</span>
            </div>
            <span className="font-serif text-lg font-semibold" style={{ color: "hsl(var(--burgundy))" }}>Kalyanasuthra</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {!forgotMode ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} style={{ color: "hsl(42, 42%, 57%)" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Member Login</span>
                </div>
                <h2 className="font-serif text-2xl font-bold mb-1" style={{ color: "hsl(var(--burgundy))" }}>Welcome Back</h2>
                <p className="text-xs text-gray-400 mb-6">Sign in to explore your perfect match</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email or Phone Number</label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={e => setIdentifier(e.target.value)}
                      placeholder="your@email.com or 9876543210"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gray-600">Password</label>
                      <button type="button" onClick={() => setForgotMode(true)} className="text-xs font-medium hover:underline" style={{ color: "hsl(var(--burgundy))" }}>Forgot password?</button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10 transition-all"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60 hover:scale-[1.01]"
                    style={{ background: "linear-gradient(135deg, hsl(var(--burgundy)), hsl(var(--burgundy-deep)))" }}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-gray-100 text-center space-y-2">
                  <p className="text-xs text-gray-500">Don't have an account? <a href="/register" className="font-semibold hover:underline" style={{ color: "hsl(var(--burgundy))" }}>Register Free</a></p>
                  <p className="text-xs text-gray-400"><a href="/" className="hover:text-gray-600 transition-colors">← Back to Home</a></p>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => { setForgotMode(false); setError(""); setResetSent(false); }} className="flex items-center gap-1 text-xs text-gray-400 mb-5 hover:text-gray-600">
                  ← Back to login
                </button>
                <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "hsl(var(--burgundy))" }}>Reset Password</h2>
                <p className="text-xs text-gray-400 mb-5">Enter your email and we'll send a reset link</p>

                {resetSent ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📧</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Check your email!</p>
                    <p className="text-xs text-gray-400 mt-1">Reset link sent to {resetEmail}</p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                      <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="your@email.com" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60" style={{ background: "hsl(var(--burgundy))" }}>
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
